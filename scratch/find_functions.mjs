import fs from 'fs';

const code = fs.readFileSync('src/AnimatedPatterns.jsx', 'utf8');

const regex = /export\s+function\s+([a-zA-Z0-9_-]+)/g;
let match;
while ((match = regex.exec(code)) !== null) {
  console.log(`Function defined: ${match[1]}`);
}
