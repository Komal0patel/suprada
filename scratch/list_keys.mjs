import fs from 'fs';

const code = fs.readFileSync('scratch/live_chunk.js', 'utf8');

// Find all matches of keyName: { viewBox:
const regex = /"?([a-zA-Z0-9_-]+)"?:\s*\{\s*viewBox:/g;
let match;
let keys = [];
while ((match = regex.exec(code)) !== null) {
  keys.push(match[1]);
}

console.log("Found keys in chunk:", keys);
