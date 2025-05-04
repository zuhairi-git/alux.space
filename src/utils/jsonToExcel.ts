import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

// Helper function to flatten nested JSON objects into dot notation
function flattenObject(obj: any, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc: Record<string, any>, k: string) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], `${pre}${k}`));
    } else {
      acc[`${pre}${k}`] = obj[k];
    }
    return acc;
  }, {});
}

// Convert JSON translation files to Excel
export async function convertJsonToExcel(): Promise<string> {
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
    const languages = ['en', 'fi', 'ar']; // Add more languages as needed
    const translations: Record<string, any> = {};
    
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
    const flattened: Record<string, Record<string, any>> = {};
    languages.forEach(lang => {
      flattened[lang] = flattenObject(translations[lang]);
    });
    
    // Get all unique keys across all languages
    const allKeys = new Set<string>();
    languages.forEach(lang => {
      Object.keys(flattened[lang]).forEach(key => allKeys.add(key));
    });
    
    // Create Excel worksheet data
    const worksheetData: Array<Record<string, any>> = [];
    Array.from(allKeys).sort().forEach(key => {
      const row: Record<string, any> = { key };
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

// Command line execution
if (require.main === module) {
  convertJsonToExcel()
    .then(path => console.log(`Excel file created at: ${path}`))
    .catch(err => console.error(err));
}