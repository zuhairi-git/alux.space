const fs = require('fs');

let config = fs.readFileSync('tailwind.config.js', 'utf8');

// Looking for:
/*
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          dark: 'var(--primary-dark)',
          glow: 'var(--primary-glow)',
*/

const newKeys = `        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          dark: 'var(--primary-dark)',
          glow: 'var(--primary-glow)',
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)',`;


config = config.replace(/primary:\s*\{\s*DEFAULT:\s*'var\(--primary\)',\s*hover:\s*'var\(--primary-hover\)',\s*dark:\s*'var\(--primary-dark\)',\s*glow:\s*'var\(--primary-glow\)',/, newKeys);

fs.writeFileSync('tailwind.config.js', config);
console.log('done modifying tw config');
