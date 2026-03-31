const fs = require('fs');

const hex = {
  emerald: {
    50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399',
    500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22'
  },
  purple: {
    50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#c4b5fd', 400: '#a78bfa',
    500: '#a855f7', 600: '#9333ea', 700: '#7c3aed', 800: '#6d28d9', 900: '#581c87', 950: '#3b0764'
  },
  blue: {
    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa',
    500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
  }
};

let css = fs.readFileSync('src/design-system/tokens.css', 'utf8');
const scales = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

if (!css.includes('--color-emerald-500')) {
  let emeraldStr = '\n  /* Emeralds */\n';
  for (let k of scales) emeraldStr += `  --color-emerald-${k}: ${hex.emerald[k]};\n`;
  css = css.replace(/:root\s*\{/, ':root {' + emeraldStr);
}

for (let k of scales) {
  if (!css.includes(`--color-purple-${k}:`)) {
    css = css.replace(/(--color-purple-300:)/, `--color-purple-${k}: ${hex.purple[k]};\n  $1`);
  }
  if (!css.includes(`--color-blue-${k}:`)) {
    css = css.replace(/(--color-blue-50:)/, `--color-blue-${k}: ${hex.blue[k]};\n  $1`);
  }
}

const themeMap = {
  ':root': 'blue',
  '.theme-light': 'blue',
  '.theme-dark': 'blue',
  '.theme-colorful': 'purple',
  '.theme-green': 'emerald'
};

for (const [theme, color] of Object.entries(themeMap)) {
  let toAdd = '';
  // match start of block and exactly --primary:
  const regex = new RegExp(`(\\s*${theme.replace('.', '\\.')}\\s*\\{[^}]*?\\s--primary:\\s*var\\([^)]+\\);\\n?)`, 's');
  for (let k of scales) {
      toAdd += `  --primary-${k}: var(--color-${color}-${k});\n`;
  }
  if (toAdd !== '') {
      css = css.replace(regex, `$1${toAdd}`);
  }
}

fs.writeFileSync('src/design-system/tokens.css', css);
console.log('Done modifying tokens.css');
