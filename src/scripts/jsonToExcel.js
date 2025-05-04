// Script to convert JSON translations to Excel
// Run this script with: node src/scripts/jsonToExcel.js

const { convertJsonToExcel } = require('../utils/jsonToExcel');

async function main() {
  try {
    const excelPath = await convertJsonToExcel();
    console.log(`Successfully created Excel translations file at: ${excelPath}`);
    console.log('You can now edit translations in the Excel file and the app will use these translations.');
  } catch (error) {
    console.error('Error converting JSON to Excel:', error);
    process.exit(1);
  }
}

main();