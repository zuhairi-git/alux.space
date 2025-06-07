// Simple script to convert JSON translations to Excel
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Helper function to flatten nested JSON objects into dot notation
function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    const value = obj[k];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, `${pre}${k}`));
    } else {
      acc[`${pre}${k}`] = String(value);
    }
    return acc;
  }, {});
}

// Convert JSON translation files to Excel
async function convertJsonToExcel() {
  try {
    // Define paths
    const localesDir = path.join(process.cwd(), 'src', 'locales');
    const excelDir = path.join(process.cwd(), 'src', 'translations', 'excel');
    const excelPath = path.join(excelDir, 'translations.xlsx');
    
    // Ensure Excel directory exists
    if (!fs.existsSync(excelDir)) {
      fs.mkdirSync(excelDir, { recursive: true });
    }
    
    // Load all JSON files
    const languages = ['en', 'fi']; // Add more languages as needed
    const translations = {};
    
    // Load each language's translations
    languages.forEach(lang => {
      const filePath = path.join(localesDir, lang, 'common.json');
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        translations[lang] = JSON.parse(content);
      } else {
        translations[lang] = {};
      }
    });
    
    // Flatten all translations
    const flattened = {};
    languages.forEach(lang => {
      flattened[lang] = flattenObject(translations[lang]);
    });
    
    // Get all unique keys across all languages
    const allKeys = new Set();
    languages.forEach(lang => {
      Object.keys(flattened[lang]).forEach(key => allKeys.add(key));
    });
    
    // Create Excel worksheet data
    const worksheetData = [];
    Array.from(allKeys).sort().forEach(key => {
      const row = { key };
      languages.forEach(lang => {
        row[lang] = flattened[lang][key] || '';
      });
      worksheetData.push(row);
    });
    
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Translations');
    
    // Write workbook to file
    XLSX.writeFile(workbook, excelPath);
    
    return excelPath;
  } catch (error) {
    console.error('Error converting JSON to Excel:', error);
    throw error;
  }
}

// Run the conversion
convertJsonToExcel()
  .then(path => {
    console.log(`Successfully created Excel translations file at: ${path}`);
    console.log('You can now edit translations in the Excel file and the app will use these translations.');
  })
  .catch(err => {
    console.error('Failed to convert to Excel:', err);
    process.exit(1);
  });
