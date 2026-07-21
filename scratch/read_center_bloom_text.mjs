import fs from 'fs';

const code = fs.readFileSync('scratch/live_page.js', 'utf8');

const index = code.indexOf('variant:"center-bloom"');
if (index !== -1) {
  const sectionIndex = code.lastIndexOf('return(0,s.jsxs)("section"', index);
  if (sectionIndex !== -1) {
    const snippet = code.slice(sectionIndex, sectionIndex + 3000);
    console.log(snippet);
  }
}
