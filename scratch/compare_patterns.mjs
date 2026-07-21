import fs from 'fs';

const localCode = fs.readFileSync('src/AnimatedPatterns.jsx', 'utf8');
const liveCode = fs.readFileSync('scratch/live_chunk.js', 'utf8');

// Extract local patterns
// We've seen local patterns are Pattern24, Pattern25, Pattern27, Pattern28.
// Let's find their SVG path data (d="...")
const extractPath = (code, patternName) => {
  const index = code.indexOf(patternName);
  if (index === -1) return null;
  const dIndex = code.indexOf('d="', index);
  if (dIndex === -1) return null;
  const dEnd = code.indexOf('"', dIndex + 3);
  return code.slice(dIndex + 3, dEnd);
};

const local24 = extractPath(localCode, 'Pattern24');
const local25 = extractPath(localCode, 'Pattern25');
const local27 = extractPath(localCode, 'Pattern27');
const local28 = extractPath(localCode, 'Pattern28');

console.log("Local 24 path prefix:", local24 ? local24.slice(0, 50) : "null");
console.log("Local 25 path prefix:", local25 ? local25.slice(0, 50) : "null");
console.log("Local 27 path prefix:", local27 ? local27.slice(0, 50) : "null");
console.log("Local 28 path prefix:", local28 ? local28.slice(0, 50) : "null");

// Extract live patterns from object r
const extractLivePath = (code, keyName) => {
  const index = code.indexOf(`"${keyName}":`);
  const index2 = code.indexOf(`${keyName}:`, index - 20) === -1 ? index : code.indexOf(`${keyName}:`, index - 20);
  const targetIndex = index !== -1 ? index : index2;
  if (targetIndex === -1) return null;
  const dIndex = code.indexOf('d:"', targetIndex);
  if (dIndex === -1) return null;
  const dEnd = code.indexOf('"', dIndex + 3);
  return code.slice(dIndex + 3, dEnd);
};

const liveHalf = extractLivePath(liveCode, 'half');
const liveHalfInverted = extractLivePath(liveCode, 'half-inverted');
const liveQuarter = extractLivePath(liveCode, 'quarter');
const liveCenterBloom = extractLivePath(liveCode, 'center-bloom');

console.log("\nLive half path prefix:", liveHalf ? liveHalf.slice(0, 50) : "null");
console.log("Live half-inverted path prefix:", liveHalfInverted ? liveHalfInverted.slice(0, 50) : "null");
console.log("Live quarter path prefix:", liveQuarter ? liveQuarter.slice(0, 50) : "null");
console.log("Live center-bloom path prefix:", liveCenterBloom ? liveCenterBloom.slice(0, 50) : "null");

// Let's check matches
const checkMatch = (localName, localPath, liveName, livePath) => {
  if (!localPath || !livePath) return;
  if (localPath.trim() === livePath.trim()) {
    console.log(`>>> ${localName} matches live ${liveName} exactly!`);
  } else {
    // Check if one is a substring of another or very similar
    const lengthDiff = Math.abs(localPath.length - livePath.length);
    if (lengthDiff < 100) {
      console.log(`>>> ${localName} is VERY SIMILAR to live ${liveName} (length diff: ${lengthDiff})`);
    }
  }
};

checkMatch('Pattern24', local24, 'half', liveHalf);
checkMatch('Pattern24', local24, 'half-inverted', liveHalfInverted);
checkMatch('Pattern24', local24, 'quarter', liveQuarter);
checkMatch('Pattern24', local24, 'center-bloom', liveCenterBloom);

checkMatch('Pattern25', local25, 'half', liveHalf);
checkMatch('Pattern25', local25, 'half-inverted', liveHalfInverted);
checkMatch('Pattern25', local25, 'quarter', liveQuarter);
checkMatch('Pattern25', local25, 'center-bloom', liveCenterBloom);

checkMatch('Pattern27', local27, 'half', liveHalf);
checkMatch('Pattern27', local27, 'half-inverted', liveHalfInverted);
checkMatch('Pattern27', local27, 'quarter', liveQuarter);
checkMatch('Pattern27', local27, 'center-bloom', liveCenterBloom);

checkMatch('Pattern28', local28, 'half', liveHalf);
checkMatch('Pattern28', local28, 'half-inverted', liveHalfInverted);
checkMatch('Pattern28', local28, 'quarter', liveQuarter);
checkMatch('Pattern28', local28, 'center-bloom', liveCenterBloom);
