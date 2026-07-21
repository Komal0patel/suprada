import fs from 'fs';

const code = fs.readFileSync('scratch/live_page.js', 'utf8');

// Find key pattern matching section g and its contents
const index = code.indexOf('variant:"half-inverted"');
if (index !== -1) {
  const start = Math.max(0, index - 800);
  const end = Math.min(code.length, index + 1500);
  fs.writeFileSync('scratch/section_g_details.js', code.slice(start, end));
  console.log("Saved section g details to scratch/section_g_details.js");
  console.log("Snippet:");
  console.log(code.slice(start, start + 1000));
}
