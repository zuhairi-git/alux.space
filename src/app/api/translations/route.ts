import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API endpoint that returns the most up-to-date translations
 * This helps ensure we're using the latest translations, especially in development mode
 */
export async function GET() {
  try {
    // Define paths and default translations object
    const localesDir = path.join(process.cwd(), 'src', 'locales');
    const generatedPath = path.join(process.cwd(), 'src', 'translations', 'generatedTranslations.json');
    let translations: Record<string, any> = { en: {}, fi: {}, ar: {} };
    
    // In production, return the static translations if possible
    if (process.env.NODE_ENV !== 'development') {
      try {
        const fileContent = fs.readFileSync(generatedPath, 'utf8');
        translations = JSON.parse(fileContent);
        return NextResponse.json(translations);
      } catch (err) {
        console.error('Error reading generated translations file in production:', err);
        return NextResponse.json(translations);
      }
    }
    
    // In development, first try to load from the generated file as fallback
    try {
      const fileContent = fs.readFileSync(generatedPath, 'utf8');
      translations = JSON.parse(fileContent);
    } catch (err) {
      console.error('Error reading generated translations file:', err);
    }
    
    // Then try to load from actual JSON files for fresher content
    try {
      // Load each language
      const languages = ['en', 'fi', 'ar'];
      const freshTranslations: Record<string, any> = {};
      
      languages.forEach(lang => {
        const filePath = path.join(localesDir, lang, 'common.json');
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          freshTranslations[lang] = JSON.parse(content);
        } else {
          freshTranslations[lang] = translations[lang] || {};
        }
      });
      
      // Use the fresh translations
      translations = freshTranslations;
      
      // Also update the generatedTranslations.json file for future use
      fs.writeFileSync(generatedPath, JSON.stringify(translations, null, 2), 'utf8');
    } catch (fsError) {
      console.warn('Could not load translations from filesystem, using pre-generated translations');
    }
    
    return NextResponse.json(translations);
  } catch (error) {
    console.error('Error serving translations:', error);
    return NextResponse.json(
      { error: 'Failed to load translations' },
      { status: 500 }
    );
  }
}
