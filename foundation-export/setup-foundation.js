#!/usr/bin/env node

/**
 * Design System Foundation Setup Script
 * Run this script in your target Next.js project to set up the design system
 */

const fs = require('fs');
const path = require('path');

const foundationFiles = [
  {
    source: 'design-tokens.js',
    target: 'design-tokens.js',
    description: 'Design tokens (optional)'
  },
  {
    source: 'tailwind.config.js',
    target: 'tailwind.config.js',
    description: 'Tailwind CSS configuration'
  },
  {
    source: 'globals.css',
    target: 'app/globals.css',
    description: 'Global CSS styles',
    createDir: true
  }
];

function copyFile(source, target, createDir = false) {
  try {
    if (createDir) {
      const dir = path.dirname(target);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, target);
      console.log(`✅ Copied ${source} → ${target}`);
      return true;
    } else {
      console.log(`❌ Source file not found: ${source}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error copying ${source}: ${error.message}`);
    return false;
  }
}

function setupFoundation() {
  console.log('🎨 Setting up Design System Foundation...\n');
  
  // Check if we're in a Next.js project
  if (!fs.existsSync('package.json')) {
    console.log('❌ package.json not found. Make sure you\'re in a Next.js project directory.');
    process.exit(1);
  }
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (!packageJson.dependencies?.next && !packageJson.devDependencies?.next) {
    console.log('⚠️  This doesn\'t appear to be a Next.js project. Continuing anyway...\n');
  }
  
  let successCount = 0;
  
  foundationFiles.forEach(file => {
    console.log(`Copying ${file.description}...`);
    if (copyFile(file.source, file.target, file.createDir)) {
      successCount++;
    }
  });
  
  console.log(`\n✨ Setup complete! ${successCount}/${foundationFiles.length} files copied successfully.\n`);
  
  // Instructions
  console.log('📋 Next steps:');
  console.log('1. Install required dependencies:');
  console.log('   npm install tailwindcss @tailwindcss/postcss postcss autoprefixer');
  console.log('   npm install @headlessui/react @heroicons/react framer-motion\n');
  
  console.log('2. Create/update postcss.config.js:');
  console.log('   module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }\n');
  
  console.log('3. Import globals.css in your layout file\n');
  
  console.log('4. Read README.md for usage examples\n');
  
  console.log('🎉 Your design system foundation is ready to use!');
}

// Run the setup
setupFoundation();
