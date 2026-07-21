import fs from 'fs';

const code = fs.readFileSync('scratch/live_page.js', 'utf8');

const index = code.indexOf('variant:"center-bloom"');
if (index !== -1) {
  const start = Math.max(0, index - 800);
  const end = Math.min(code.length, index + 1500);
  fs.writeFileSync('scratch/center_bloom_details.js', code.slice(start, end));
  console.log("Saved center-bloom details to scratch/center_bloom_details.js");
  console.log("Snippet:");
  console.log(code.slice(start, start + 1000));
}
