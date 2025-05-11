// Script to build translations from Excel to JSON during build time
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

/**
 * Convert Excel translations to a JSON file that can be imported in the browser
 */
async function buildTranslationsFromExcel() {
  try {
    // Define paths
    const excelPath = path.join(process.cwd(), 'src', 'translations', 'excel', 'translations.xlsx');
    const outputPath = path.join(process.cwd(), 'src', 'translations', 'generatedTranslations.json');
    
    console.log('Building translations from Excel file:', excelPath);
    
    // Check if Excel file exists
    if (!fs.existsSync(excelPath)) {
      console.error('Excel translations file not found. Please run the jsonToExcel script first.');
      process.exit(1);
    }
    
    // Read the Excel file
    const workbook = XLSX.readFile(excelPath);
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON
    const rows = XLSX.utils.sheet_to_json(worksheet);
    
    // Initialize translations object with supported languages
    const translations = {
      en: {},
      fi: {},
    };
    
    // Process each row in the Excel file
    rows.forEach(row => {
      if (!row.key) return; // Skip rows without keys
      
      // Split the key by dots to create nested objects
      const keyParts = row.key.split('.');
      
      // Process each language
      Object.keys(translations).forEach(lang => {
        if (row[lang] !== undefined) {
          // Set the translation in the correct nested location
          setNestedValue(translations[lang], keyParts, row[lang]);
        }
      });
    });
    
    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');
    
    console.log(`Translations successfully built and saved to: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('Error building translations:', error);
    process.exit(1);
  }
}

/**
 * Helper function to set a nested value in an object
 */
function setNestedValue(obj, keyParts, value) {
  const [first, ...rest] = keyParts;
  
  if (rest.length === 0) {
    // This is the final key part, set the value
    obj[first] = value;
  } else {
    // Create the nested object if it doesn't exist
    if (!obj[first] || typeof obj[first] !== 'object') {
      obj[first] = {};
    }
    
    // Recursively set the value in the nested object
    setNestedValue(obj[first], rest, value);
  }
}

// Run the script if it's called directly
if (require.main === module) {
  buildTranslationsFromExcel()
    .then(path => console.log(`Process complete!`))
    .catch(err => {
      console.error('Failed to build translations:', err);
      process.exit(1);
    });
}

module.exports = {
  buildTranslationsFromExcel
};