// This script helps to diagnose translation issues by showing the current translation state
const fs = require('fs');
const path = require('path');

// Function to read JSON file
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Function to compare translations
function compareFolderWithGenerated() {
  const localesDir = path.join(process.cwd(), 'src', 'locales');
  const generatedPath = path.join(process.cwd(), 'src', 'translations', 'generatedTranslations.json');
  
  // Read generated translations
  const generatedData = readJsonFile(generatedPath);
  if (!generatedData) {
    console.error('Could not read generated translations file');
    return;
  }
  
  // Check each language
  const languages = ['en', 'fi', 'ar'];
  languages.forEach(lang => {
    const localePath = path.join(localesDir, lang, 'common.json');
    const localeData = readJsonFile(localePath);
    
    if (!localeData) {
      console.error(`Could not read locale file for ${lang}`);
      return;
    }
    
    console.log(`\n==== Language: ${lang} ====`);
    
    // Check if footer section exists
    if (localeData.footer && generatedData[lang]?.footer) {
      console.log('Footer section exists in both files');
      
      // Compare footer sections
      const localeFooter = JSON.stringify(localeData.footer);
      const generatedFooter = JSON.stringify(generatedData[lang].footer);
      
      if (localeFooter === generatedFooter) {
        console.log('✅ Footer sections match');
      } else {
        console.log('❌ Footer sections do not match');
        console.log('Locale file footer:');
        console.log(localeData.footer);
        console.log('Generated file footer:');
        console.log(generatedData[lang].footer);
      }
    } else {
      console.log('❌ Footer section missing in one or both files:');
      console.log(`  Locale file has footer: ${Boolean(localeData.footer)}`);
      console.log(`  Generated file has footer: ${Boolean(generatedData[lang]?.footer)}`);
    }
  });
}

// Function to update generated translations from locale files
function updateGeneratedTranslations() {
  const localesDir = path.join(process.cwd(), 'src', 'locales');
  const outputPath = path.join(process.cwd(), 'src', 'translations', 'generatedTranslations.json');
  
  // Load all JSON files
  const languages = ['en', 'fi', 'ar'];
  const translations = {};
  
  // Load each language's translations
  languages.forEach(lang => {
    const filePath = path.join(localesDir, lang, 'common.json');
    if (fs.existsSync(filePath)) {
      console.log(`Processing ${filePath}`);
      const content = fs.readFileSync(filePath, 'utf8');
      translations[lang] = JSON.parse(content);
    } else {
      console.log(`File not found: ${filePath}`);
      translations[lang] = {};
    }
  });
  
  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');
  
  console.log(`Translations successfully updated and saved to: ${outputPath}`);
}

// Run the script
console.log('\n==== CURRENT TRANSLATION STATUS ====');
compareFolderWithGenerated();

console.log('\n==== UPDATING TRANSLATIONS ====');
updateGeneratedTranslations();

console.log('\n==== AFTER UPDATE STATUS ====');
compareFolderWithGenerated();
