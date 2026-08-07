/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Read both files
const senatorsJsonPath = path.join(__dirname, '..', 'senators.json');
const senateDataPath = path.join(__dirname, '..', 'lib', 'senate-data.ts');

const senatorsData = JSON.parse(fs.readFileSync(senatorsJsonPath, 'utf-8'));
const senateDataContent = fs.readFileSync(senateDataPath, 'utf-8');

// Create a mapping from senators.json (name -> image)
const imageMap = new Map();
for (const senator of senatorsData) {
  if (senator.image && senator.image.trim() !== '') {
    // Normalize name for matching (uppercase, remove extra spaces)
    const normalizedName = senator.name.toUpperCase().trim();
    imageMap.set(normalizedName, senator.image);
  }
}

// Normalize function for matching names
function normalizeName(name) {
  return name
    .toUpperCase()
    .trim()
    .replace(/\s+/g, ' '); // Normalize multiple spaces to single space
}

// Find all senators with empty images and update them
let updatedCount = 0;
let notFoundCount = 0;
const notFound = [];

// Match pattern: image: '' or image: ""
const lines = senateDataContent.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this line has an empty image
  if (line.includes("image: ''") || line.includes('image: ""')) {
    // First try to find the name on the same line
    let nameMatch = line.match(/name:\s*["']([^"']+)["']/);
    let name = nameMatch ? nameMatch[1] : null;
    
    // If not found on same line, try to find the name in the previous lines (look back up to 10 lines)
    if (!name) {
      for (let j = Math.max(0, i - 10); j < i; j++) {
        const match = lines[j].match(/name:\s*["']([^"']+)["']/);
        if (match) {
          name = match[1];
          break;
        }
      }
    }
    
    if (name) {
      const normalizedName = normalizeName(name);
      const imageUrl = imageMap.get(normalizedName);
      
      if (imageUrl) {
        // Update the image line - handle both single-line and multi-line formats
        const updatedLine = line.replace(/image:\s*['"]\s*['"]/, `image: '${imageUrl}'`);
        lines[i] = updatedLine;
        updatedCount++;
        console.log(`✓ Updated ${name}: ${imageUrl.substring(0, 60)}...`);
      } else {
        notFoundCount++;
        notFound.push(name);
        console.log(`✗ Not found in senators.json: ${name}`);
      }
    }
  }
}

// Write the updated content back
fs.writeFileSync(senateDataPath, lines.join('\n'), 'utf-8');

console.log('\n=== Summary ===');
console.log(`Updated: ${updatedCount}`);
console.log(`Not found: ${notFoundCount}`);
if (notFound.length > 0) {
  console.log(`\nNot found names: ${notFound.join(', ')}`);
}

