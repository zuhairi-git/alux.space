const fs = require('fs');
const path = require('path');

// Windows-1252 to byte value mapping (for chars 0x80-0x9F that differ from Latin-1)
const win1252ToByteMap = new Map([
  [0x20AC, 0x80], // €
  [0x201A, 0x82], // ‚
  [0x0192, 0x83], // ƒ
  [0x201E, 0x84], // „
  [0x2026, 0x85], // …
  [0x2020, 0x86], // †
  [0x2021, 0x87], // ‡
  [0x02C6, 0x88], // ˆ
  [0x2030, 0x89], // ‰
  [0x0160, 0x8A], // Š
  [0x2039, 0x8B], // ‹
  [0x0152, 0x8C], // Œ
  [0x017D, 0x8E], // Ž
  [0x2018, 0x91], // '
  [0x2019, 0x92], // '
  [0x201C, 0x93], // "
  [0x201D, 0x94], // "
  [0x2022, 0x95], // •
  [0x2013, 0x96], // –
  [0x2014, 0x97], // —
  [0x02DC, 0x98], // ˜
  [0x2122, 0x99], // ™
  [0x0161, 0x9A], // š
  [0x203A, 0x9B], // ›
  [0x0153, 0x9C], // œ
  [0x017E, 0x9E], // ž
  [0x0178, 0x9F], // Ÿ
]);

// All chars that could be Win-1252 mappings
const win1252Chars = new Set([...win1252ToByteMap.keys()].map(k => String.fromCharCode(k)));

function charToByte(ch) {
  const code = ch.charCodeAt(0);
  if (code <= 0xFF) return code;
  const mapped = win1252ToByteMap.get(code);
  return mapped !== undefined ? mapped : -1;
}

function isMojibakeChar(code) {
  return (code >= 0x80 && code <= 0xFF) || win1252ToByteMap.has(code);
}

function tryDecodeOnce(text) {
  const bytes = [];
  for (const ch of text) {
    const b = charToByte(ch);
    if (b < 0) return null; // Can't map
    bytes.push(b);
  }
  try {
    const buf = Buffer.from(bytes);
    const decoded = buf.toString('utf8');
    if (decoded.includes('\ufffd')) return null; // Invalid UTF-8
    return decoded;
  } catch { return null; }
}

function fixMojibakeSegment(segment) {
  // Try up to 3 rounds of decoding
  let current = segment;
  for (let round = 0; round < 3; round++) {
    const decoded = tryDecodeOnce(current);
    if (!decoded || decoded === current) break;
    current = decoded;
    // Check if result still has mojibake indicators
    const hasMojibake = [...current].some(ch => isMojibakeChar(ch.charCodeAt(0)) && ch.charCodeAt(0) > 0x7F);
    if (!hasMojibake) break;
  }
  return current !== segment ? current : null;
}

function fixLine(line) {
  // Find mojibake segments: sequences of chars that are all in the high Latin-1 or Win-1252 range
  // A mojibake segment starts with a char >= 0xC0 (typical UTF-8 start byte) 
  // and is followed by more high chars
  const mojibakePattern = /[\u00c0-\u00ff](?:[\u0080-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u02c6\u02dc\u2013\u2014\u2018\u2019\u201a\u201c\u201d\u201e\u2020\u2021\u2022\u2026\u2030\u2039\u203a\u20ac\u2122])+/g;
  
  return line.replace(mojibakePattern, (match) => {
    const fixed = fixMojibakeSegment(match);
    return fixed !== null ? fixed : match;
  });
}

function walk(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(walk(fullPath));
    else if (/\.(tsx?|ts)$/.test(entry.name)) results.push(fullPath);
  }
  return results;
}

const root = path.join(__dirname, 'src', 'app', 'mobile');
const files = walk(root);

let totalFixes = 0;
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  const original = content;

  const lines = content.split('\n');
  const fixed = lines.map(line => fixLine(line));
  content = fixed.join('\n');

  // Note: Comment separator cleanup removed — it was causing function declarations to be consumed

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    totalFixes++;
    console.log('Fixed:', path.relative(root, f));
  }
}
console.log('\nTotal files fixed:', totalFixes);

// Check remaining
console.log('\n--- Remaining mojibake check ---');
let remaining = 0;
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  let found = false;
  for (let i = 0; i < lines.length; i++) {
    if (/[\u00c0-\u00ff][\u0080-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u02c6\u02dc\u2013\u2014\u2018\u2019\u201a\u201c\u201d\u201e\u2020\u2021\u2022\u2026\u2030\u2039\u203a\u20ac\u2122]/.test(lines[i])) {
      if (!found) { console.log('\n' + path.relative(root, f) + ':'); found = true; }
      remaining++;
      console.log('  L' + (i+1) + ': ' + lines[i].trim().substring(0, 120));
    }
  }
}
if (remaining === 0) console.log('All clean!');
else console.log('\n' + remaining + ' lines with potential mojibake remaining');
