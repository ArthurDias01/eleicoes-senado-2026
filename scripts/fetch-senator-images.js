const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Read senators from JSON file
const senatorsPath = path.join(__dirname, '..', 'senators.json');
const data = JSON.parse(fs.readFileSync(senatorsPath, 'utf-8'));

const females = new Set([
  'MÁRCIA BITTAR',
  'RAYSSA FURLAN',
  'DRA. SILVANA',
  'MICHELLE BOLSONARO',
  'BIA KICIS',
  'GRACINHA CAIADO',
  'CRISTINA GRAEML',
  'CAROLINE DE TONI',
  'JÚLIA ZANATTA'
]);

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if URL is a valid image format (not SVG)
function isValidImageFormat(url) {
  if (!url || !url.startsWith('http')) {
    return false;
  }

  // Reject SVG files
  if (url.includes('.svg') || url.toLowerCase().includes('/svg') || url.includes('svg')) {
    return false;
  }

  // Check for valid image extensions
  const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];
  const urlLower = url.toLowerCase();
  
  // Check if URL ends with a valid extension or contains image format indicators
  const hasValidExtension = validExtensions.some(ext => 
    urlLower.includes(ext) || urlLower.endsWith(ext)
  );

  // Also check for image format in query params or path
  const hasImageIndicator = urlLower.match(/\.(png|jpg|jpeg|webp|avif)(\?|$|#)/i);

  return hasValidExtension || hasImageIndicator;
}

// Validate if a URL actually returns a valid image
async function validateImageUrl(page, url, debug = false) {
  if (!url || !url.startsWith('http')) {
    return false;
  }

  // First check format
  if (!isValidImageFormat(url)) {
    if (debug) {
      console.log(`  [DEBUG] URL rejected (not a valid image format): ${url.substring(0, 80)}...`);
    }
    return false;
  }

  try {
    // Try to load the image in the page
    const isValid = await page.evaluate(async (imageUrl) => {
      return new Promise((resolve) => {
        const img = new Image();
        const timeout = setTimeout(() => {
          resolve(false);
        }, 5000); // 5 second timeout

        img.onload = () => {
          clearTimeout(timeout);
          // Check if image actually loaded (not empty/error)
          if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        };

        img.onerror = () => {
          clearTimeout(timeout);
          resolve(false);
        };

        img.src = imageUrl;
      });
    }, url);

    if (debug && !isValid) {
      console.log(`  [DEBUG] URL validation failed: ${url.substring(0, 80)}...`);
    }

    return isValid;
  } catch (error) {
    if (debug) {
      console.log(`  [DEBUG] URL validation error: ${error.message}`);
    }
    return false;
  }
}

async function getImageUrl(page, name, debug = false) {
  const query = `"${name}"`; // Use quotes for exact match - search directly by name
  const encodedQuery = encodeURIComponent(query);
  const searchUrl = `https://www.google.com/search?q=${encodedQuery}&tbm=isch`;

  try {
    if (debug) {
      console.log(`  [DEBUG] Searching Google Images for: ${query}`);
    }

    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(4000); // Wait for images to load

    // Scroll down to trigger lazy loading
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await delay(2000);

    // Extract image URLs from the page with multiple strategies
    const imageUrls = await page.evaluate(() => {
      const urls = new Set(); // Use Set to avoid duplicates
      
      // Strategy 1: Get all img elements
      const images = document.querySelectorAll('img');
      for (const img of images) {
        let src = img.getAttribute('src') || 
                  img.getAttribute('data-src') || 
                  img.getAttribute('data-lazy-src') ||
                  img.getAttribute('data-imgsrc');
        
        if (src && src.startsWith('http')) {
          const srcLower = src.toLowerCase();
          // Filter out invalid images
          if (!srcLower.includes('encrypted-tbn') &&
              !srcLower.includes('logo') &&
              !srcLower.includes('icon') &&
              !srcLower.includes('.svg') &&
              !srcLower.includes('data:image') &&
              !srcLower.includes('gstatic.com/s/i/productlogos')) {
            urls.add(src);
          }
        }
      }

      // Strategy 2: Look for images in div containers (Google Images uses divs with data attributes)
      const imageContainers = document.querySelectorAll('div[data-ri], div[jsname], div[data-ved]');
      for (const container of imageContainers) {
        const img = container.querySelector('img');
        if (img) {
          let src = img.getAttribute('src') || 
                    img.getAttribute('data-src') || 
                    img.getAttribute('data-lazy-src');
          if (src && src.startsWith('http')) {
            const srcLower = src.toLowerCase();
            if (!srcLower.includes('encrypted-tbn') &&
                !srcLower.includes('logo') &&
                !srcLower.includes('icon') &&
                !srcLower.includes('.svg') &&
                !srcLower.includes('data:image')) {
              urls.add(src);
            }
          }
        }
      }

      // Strategy 3: Extract from JavaScript data (Google embeds image data in script tags)
      const scripts = document.querySelectorAll('script');
      for (const script of scripts) {
        const content = script.textContent || '';
        // Look for image URLs in various formats
        const patterns = [
          /"(https?:\/\/[^"]*\.(jpg|jpeg|png|webp|avif)[^"]*)"/gi,
          /"(https?:\/\/[^"]*googleusercontent[^"]*)"[^"]*\.(jpg|jpeg|png|webp|avif)/gi,
          /"(https?:\/\/[^"]*wikimedia[^"]*)"[^"]*\.(jpg|jpeg|png|webp|avif)/gi,
          /"(https?:\/\/[^"]*glbimg[^"]*)"[^"]*\.(jpg|jpeg|png|webp|avif)/gi,
        ];
        
        for (const pattern of patterns) {
          const matches = content.matchAll(pattern);
          for (const match of matches) {
            const url = match[1] || match[0].replace(/"/g, '');
            if (url && !url.includes('encrypted-tbn') && !url.includes('logo') && !url.includes('icon')) {
              urls.add(url);
            }
          }
        }
      }

      return Array.from(urls);
    });

    if (debug) {
      console.log(`  [DEBUG] Found ${imageUrls.length} potential image URLs`);
      if (imageUrls.length > 0) {
        console.log(`  [DEBUG] First few URLs: ${imageUrls.slice(0, 3).join(', ')}`);
      }
    }

    // Try each URL until we find a valid one
    for (const url of imageUrls.slice(0, 15)) { // Try first 15 URLs
      if (!isValidImageFormat(url)) {
        if (debug) {
          console.log(`  [DEBUG] Skipping invalid format: ${url.substring(0, 60)}...`);
        }
        continue;
      }

      const isValid = await validateImageUrl(page, url, debug);
      if (isValid) {
        if (debug) {
          console.log(`  [DEBUG] Found valid image URL: ${url.substring(0, 80)}...`);
        }
        return url;
      }
    }

    // If direct extraction didn't work, try clicking first thumbnail
    if (imageUrls.length === 0 || imageUrls.every(url => !isValidImageFormat(url))) {
      if (debug) {
        console.log(`  [DEBUG] No valid URLs found, trying to click first thumbnail...`);
      }
      try {
        // Try multiple selectors for the first thumbnail
        let firstThumbnail = await page.$('img[data-src]') ||
                            await page.$('img[src*="googleusercontent"]') ||
                            await page.$('div[data-ri] img') ||
                            await page.$('div[jsname] img') ||
                            await page.$('img.rg_i');
        
        if (!firstThumbnail) {
          // Try to find any clickable image container
          firstThumbnail = await page.$('div[data-ri], div[jsname]');
        }

        if (firstThumbnail) {
          // Scroll to element and click
          await page.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), firstThumbnail);
          await delay(1000);
          
          // Try JavaScript click first
          await page.evaluate(el => {
            if (el.click) el.click();
            else if (el.parentElement && el.parentElement.click) el.parentElement.click();
          }, firstThumbnail);
          
          await delay(3000); // Wait for image panel to load

          // Try to get the full image URL
          const fullImageUrl = await page.evaluate(() => {
            // Look for the full image
            const fullImg = document.querySelector('img.n3VNCb[src*="http"]:not([src*="encrypted-tbn"])') ||
                           document.querySelector('img[data-iml][src*="http"]:not([src*="encrypted-tbn"])');
            
            if (fullImg) {
              const src = fullImg.getAttribute('src');
              if (src && src.startsWith('http') && !src.includes('encrypted-tbn')) {
                return src;
              }
            }

            // Try "View image" button
            const viewImageBtn = document.querySelector('a[href*="imgurl="]');
            if (viewImageBtn) {
              const href = viewImageBtn.getAttribute('href');
              const match = href.match(/imgurl=([^&]+)/);
              if (match) {
                return decodeURIComponent(match[1]);
              }
            }

            return null;
          });

          if (fullImageUrl && isValidImageFormat(fullImageUrl)) {
            const isValid = await validateImageUrl(page, fullImageUrl, debug);
            if (isValid) {
              await page.goBack();
              await delay(1000);
              return fullImageUrl;
            }
          }

          await page.goBack();
          await delay(1000);
        }
      } catch (e) {
        if (debug) {
          console.log(`  [DEBUG] Error clicking thumbnail: ${e.message}`);
        }
      }
    }

    return null;
  } catch (error) {
    if (debug) {
      console.log(`  [DEBUG] Error in getImageUrl: ${error.message}`);
    }
    return null;
  }
}

(async () => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Set viewport to avoid mobile layout
  await page.setViewport({ width: 1920, height: 1080 });

  // Set a realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  // Filter out senators that already have images
  const senatorsToProcess = data.filter(item => !item.image || item.image.trim() === '');
  const skippedCount = data.length - senatorsToProcess.length;

  if (skippedCount > 0) {
    console.log(`Skipping ${skippedCount} senators that already have images\n`);
  }

  console.log(`Found ${senatorsToProcess.length} senators to process\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < senatorsToProcess.length; i++) {
    const item = senatorsToProcess[i];

    console.log(`[${i + 1}/${senatorsToProcess.length}] Fetching image for ${item.name}...`);

    try {
      // Enable debug for first few items
      const debug = i < 3;
      const url = await getImageUrl(page, item.name, debug);
      
      // Final check: reject invalid formats
      if (url && url.includes('encrypted-tbn')) {
        console.log(`  ✗ Rejected encrypted-tbn URL (not a real image)`);
        failed++;
        item.image = '';
      } else if (url && !isValidImageFormat(url)) {
        console.log(`  ✗ Rejected URL (not a valid image format - SVG or other): ${url.substring(0, 60)}...`);
        failed++;
        item.image = '';
      } else if (url) {
        // Final validation before saving
        const isValid = await validateImageUrl(page, url, false);
        if (isValid) {
          item.image = url;
          updated++;
          console.log(`  ✓ Found: ${url.substring(0, 100)}${url.length > 100 ? '...' : ''}`);
        } else {
          console.log(`  ✗ URL failed validation (400/empty/invalid format): ${url.substring(0, 60)}...`);
          failed++;
          item.image = '';
        }
      } else {
        failed++;
        console.log(`  ✗ No image found`);
      }
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
      item.image = '';
      failed++;
    }

    // Add delay to avoid rate limiting (3 seconds between requests)
    if (i < senatorsToProcess.length - 1) {
      await delay(3000);
    }
  }

  await browser.close();

  // Write updated JSON back to file (write the full data array, not just processed items)
  fs.writeFileSync(senatorsPath, JSON.stringify(data, null, 2), 'utf-8');

  console.log('\n=== Summary ===');
  console.log(`Total senators: ${data.length}`);
  console.log(`Skipped (already had image): ${skippedCount}`);
  console.log(`Processed: ${senatorsToProcess.length}`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed: ${failed}`);
  console.log(`\nResults saved to ${senatorsPath}`);
})();
