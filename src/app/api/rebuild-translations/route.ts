export const dynamic = "force-static";
export const revalidate = 0;

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API endpoint to force rebuild translations from locale files to generatedTranslations.json
 * This is helpful during development when making changes to translations
 */
export async function GET() {
  try {
    // Only allow this in development mode for security
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ 
        error: 'This endpoint is only available in development mode' 
      }, { status: 403 });
    }
    
    // Define paths
    const localesDir = path.join(process.cwd(), 'src', 'locales');
    const outputPath = path.join(process.cwd(), 'src', 'translations', 'generatedTranslations.json');
      // Load all JSON files
    const languages = ['en', 'fi'];
    const translations: Record<string, Record<string, unknown>> = {};
    
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
    
    // Write to JSON file
    fs.writeFileSync(outputPath, JSON.stringify(translations, null, 2), 'utf8');
    
    return NextResponse.json({ 
      success: true,
      message: 'Translations successfully rebuilt',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error rebuilding translations:', error);
    return NextResponse.json(
      { error: 'Failed to rebuild translations' },
      { status: 500 }
    );
  }
}
