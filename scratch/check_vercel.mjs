import https from 'https';

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
    console.log("Fetching Vercel homepage...");
    const html = await fetchUrl('https://supradawellness-v3.vercel.app/');
    
    // Find all script tags
    const scriptRegex = /<script[^>]*src="([^"]+)"[^>]*>/g;
    let match;
    let scripts = [];
    while ((match = scriptRegex.exec(html)) !== null) {
      scripts.push(match[1]);
    }
    
    console.log("Found scripts:", scripts.length);
    
    // Let's search for unique path coordinates
    const path24_coord = "M-277.825";
    const path25_coord = "M555.825";
    
    for (const src of scripts) {
      const url = src.startsWith('http') ? src : `https://supradawellness-v3.vercel.app${src}`;
      try {
        const code = await fetchUrl(url);
        const has24 = code.includes(path24_coord);
        const has25 = code.includes(path25_coord);
        if (has24 || has25) {
          console.log(`>>> MATCH FOUND IN ${url}`);
          console.log(`    has M-277.825: ${has24}`);
          console.log(`    has M555.825: ${has25}`);
          // Let's count how many times they appear
          const count24 = (code.match(new RegExp(path24_coord, 'g')) || []).length;
          const count25 = (code.match(new RegExp(path25_coord, 'g')) || []).length;
          console.log(`    Occurrences: M-277.825 = ${count24}, M555.825 = ${count25}`);
        }
      } catch (e) {
        console.error(`Failed to fetch ${url}`);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

run();
