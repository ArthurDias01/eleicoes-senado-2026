# Fetch Senator Images Script

This script searches for images of each senator using DuckDuckGo Image Search (no API key required!) and updates the `senators.json` file with the image URLs.

## Setup

**No setup required!** This script uses DuckDuckGo's image search which doesn't require any API keys or credentials.

## Usage

Simply run:

```bash
pnpm run fetch-images
```

Or directly:

```bash
node scripts/fetch-senator-images.js
```

## Features

- ✅ **No API key required** - Uses DuckDuckGo Image Search
- Automatically determines "Candidato" vs "Candidata" based on name
- Skips senators that already have images
- Adds 2-second delay between requests to be respectful
- Updates `senators.json` with found image URLs
- Provides progress updates and summary
- Falls back to Google Images if DuckDuckGo fails

## How It Works

1. For each senator, searches DuckDuckGo Images with query: "Candidato [NAME]" or "Candidata [NAME]"
2. Extracts the first image URL from the results
3. Updates the JSON file with the image URL
4. If DuckDuckGo fails, tries Google Images as a fallback

## Rate Limits

- DuckDuckGo doesn't have strict rate limits, but we add delays to be respectful
- The script waits 2 seconds between requests
- Processing all 50 senators takes about 2 minutes

## Troubleshooting

**No images found for some senators**
- The script will continue and mark those as failed
- You can manually search and add those images later
- Try running the script again - sometimes different results appear
- Some names might need different search terms

**Script seems slow**
- This is normal - we add 2-second delays to avoid being blocked
- Processing 50 senators takes about 2 minutes

**Connection errors**
- Check your internet connection
- DuckDuckGo might be temporarily unavailable - try again later

