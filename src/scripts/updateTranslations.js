// Script to manually update translations from JSON files to generatedTranslations.json
const fs = require('fs');
const path = require('path');

async function updateTranslations() {
  try {
    // Define paths
    const localesDir = path.join(process.cwd(), 'src', 'locales');
    const outputPath = path.join(process.cwd(), 'src', 'translations', 'generatedTranslations.json');
    
    console.log('Updating translations from locale JSON files');
      // Load all JSON files
    const languages = ['en', 'fi'];
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
    return outputPath;
  } catch (error) {
    console.error('Error updating translations:', error);
    process.exit(1);
  }
}

// Run the script
updateTranslations()
  .then(path => console.log(`Process complete!`))
  .catch(err => {
    console.error('Failed to update translations:', err);
    process.exit(1);
  });
