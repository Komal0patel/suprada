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
    const url = 'https://supradawellness-v3.vercel.app/_next/static/chunks/4063-e75ee2b6ed00a9e7.js';
    console.log(`Fetching chunk: ${url}`);
    const code = await fetchUrl(url);
    
    // Save to scratch file for inspection
    fs.writeFileSync('scratch/live_chunk.js', code);
    console.log("Saved live chunk to scratch/live_chunk.js");
    
    // Let's find occurrences of M-277.825 and M555.825 with their surrounding context (about 200 characters before and after)
    const findContext = (searchStr) => {
      let index = 0;
      let matchCount = 0;
      while ((index = code.indexOf(searchStr, index)) !== -1) {
        matchCount++;
        console.log(`\n--- Match ${matchCount} for ${searchStr} ---`);
        const start = Math.max(0, index - 200);
        const end = Math.min(code.length, index + searchStr.length + 200);
        console.log(code.slice(start, end));
        index += searchStr.length;
      }
    };
    
    findContext("M-277.825");
    findContext("M555.825");
    
  } catch (err) {
    console.error("Error:", err);
  }
};

run();
