const fs = require('fs');
const path = require('path');

// Read the Navigation.tsx file
const navigationPath = path.join(__dirname, 'components', 'Navigation.tsx');
const content = fs.readFileSync(navigationPath, 'utf8');

// Remove the media-cards item from portfolioDropdownItems
const updatedContent = content.replace(
  /const portfolioDropdownItems = \[\s*\{ href: '\/portfolio', textKey: 'portfolio\.overview', type: 'overview' \},\s*\{ href: '\/portfolio\/collaboration', textKey: 'portfolio\.cases\.collaboration', type: 'case' \},\s*\{ href: '\/portfolio\/jobseeking', textKey: 'portfolio\.cases\.jobseeking', type: 'case' \},\s*\{ href: '\/design\/media-cards', textKey: 'design\.media-cards', type: 'design', icon: 'grid_view' \},\s*\];/,
  `const portfolioDropdownItems = [
  { href: '/portfolio', textKey: 'portfolio.overview', type: 'overview' }, 
  { href: '/portfolio/collaboration', textKey: 'portfolio.cases.collaboration', type: 'case' },
  { href: '/portfolio/jobseeking', textKey: 'portfolio.cases.jobseeking', type: 'case' },
];`
);

// Remove the design item handling from both desktop and mobile menu
const withoutDesignHandling = updatedContent.replace(/\{item\.type === 'design' && \(\s*<span className=\{\`material-symbols text-sm \`\}>\s*\{item\.icon \|\| 'palette'\}\s*<\/span>\s*\)\}/g, '');

// Write back to the file
fs.writeFileSync(navigationPath, withoutDesignHandling);

console.log('Successfully removed media-cards from navigation');
