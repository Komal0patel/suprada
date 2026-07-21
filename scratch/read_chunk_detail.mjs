import fs from 'fs';

const code = fs.readFileSync('scratch/live_chunk.js', 'utf8');

// Let's locate the object `r={` or `r = {`
// By searching for `"half-inverted"` in the code and formatting the surrounding JS.
const keyword = '"half-inverted"';
const index = code.indexOf(keyword);
if (index !== -1) {
  console.log("Found half-inverted at index:", index);
  // Let's grab 2000 characters before and 2000 characters after
  const start = Math.max(0, index - 1000);
  const end = Math.min(code.length, index + 3000);
  const snippet = code.slice(start, end);
  fs.writeFileSync('scratch/snippet.js', snippet);
  console.log("Saved snippet to scratch/snippet.js");
  
  // Let's try to extract the keys of the object `r`
  // We can find where the definition of r starts and ends
  const rStart = code.lastIndexOf('let r={', index);
  if (rStart !== -1) {
    const rEnd = code.indexOf('};', rStart);
    console.log(`Object r snippet length: ${rEnd - rStart}`);
    const rContent = code.slice(rStart, rEnd + 2);
    // Let's parse or print the keys by looking for key patterns like `name:{` or `"name":{` or `name:`
    console.log("First 300 chars of object r:");
    console.log(rContent.slice(0, 300));
    console.log("\nLast 300 chars of object r:");
    console.log(rContent.slice(-300));
  }
} else {
  console.log("Could not find keyword 'half-inverted'");
}
