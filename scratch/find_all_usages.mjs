import fs from 'fs';

const code = fs.readFileSync('scratch/live_page.js', 'utf8');

// The pattern component is imported as h=a(4063) or a similar variable.
// Let's search for the pattern component calls: (0,s.jsx)(h.default,
// Or we can search for all occurrences of 'variant:"' to see what patterns are used.
const regex = /variant:"([^"]+)"/g;
let match;
while ((match = regex.exec(code)) !== null) {
  const index = match.index;
  console.log(`\nFound pattern variant: "${match[1]}" at index ${index}`);
  const start = Math.max(0, index - 300);
  const end = Math.min(code.length, index + 500);
  console.log("Context:");
  console.log(code.slice(start, end));
}
