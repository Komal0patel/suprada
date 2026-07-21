import fs from 'fs';

const code = fs.readFileSync('scratch/live_page.js', 'utf8');

const index = code.indexOf('g=()=>(0,s.jsxs)("section"');
if (index !== -1) {
  const snippet = code.slice(index, index + 3500);
  console.log(snippet);
}
