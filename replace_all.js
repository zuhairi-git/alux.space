const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) { 
          results = results.concat(walk(file));
      } else { 
          if (file.endsWith('.tsx') || file.endsWith('.ts')) {
              results.push(file);
          }
      }
  });
  return results;
}

const files = walk('./src');
let changed = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  // Match `ds-purple-XXX` or `purple-XXX` where XXX is 2 or 3 digits.
  // Be careful to match the prefix like `text-purple-` or `bg-purple-`.
  // Wait, if we just replace `ds-purple-` and `purple-` with `primary-` when followed by 50-950, it matches perfectly!
  
  // So: /\b(?:ds-)?purple-(\d{2,3})\b/g
  
  // Wait! Are there actual variables like `color-purple-500` we might break? We don't want to replace inside `tokens.css` (we filtered it to .tsx/.ts).
  // Is there things like `themes.ts`? Yes. `src/app/mobile/themes.ts`. In themes.ts, there were palettes like `teamColorMap: { purple: 'bg-ds-purple-500...' }`.
  // The user explicitly asked: "is there a way to convert them all with a script".
  
  const newContent = content.replace(/\b(?:ds-)?purple-(\d{2,3})\b/g, 'primary-$1');
  
  if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      changed++;
  }
}
console.log(`Replaced in ${changed} files.`);
