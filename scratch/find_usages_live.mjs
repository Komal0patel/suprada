import https from 'https';
import fs from 'fs';

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', reject);
  });
};

const run = async () => {
  try {
    const url = 'https://supradawellness-v3.vercel.app/_next/static/chunks/app/page-67032bca7e0c5316.js';
    console.log(`Fetching homepage chunk: ${url}`);
    const code = await fetchUrl(url);
    
    fs.writeFileSync('scratch/live_page.js', code);
    console.log("Saved live page to scratch/live_page.js");
    
    // Search for pattern keys
    const keys = ['half', 'half-inverted', 'quarter', 'center-bloom'];
    for (const key of keys) {
      const index = code.indexOf(key);
      if (index !== -1) {
        console.log(`\n>>> FOUND ${key} in live page chunk at index ${index}!`);
        // Grab context
        const start = Math.max(0, index - 200);
        const end = Math.min(code.length, index + key.length + 300);
        console.log(code.slice(start, end));
      } else {
        console.log(`\n>>> NOT FOUND: ${key}`);
      }
    }
    
  } catch (err) {
    console.error("Error:", err);
  }
};

run();
