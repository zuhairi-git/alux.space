// Server-side only translation utilities
import { promises as fs } from 'fs';
import path from 'path';
import generatedTranslations from '../translations/generatedTranslations.json';

// Define types for our translation system
type TranslationValue = string | number | boolean | null | TranslationObject;
type TranslationObject = { [key: string]: TranslationValue };

/**
 * Load translations for server-side use (Node.js only)
 * Attempts to load fresh files from filesystem, falls back to pre-generated
 */
export async function loadExcelTranslations(): Promise<Record<string, TranslationObject>> {
  try {
    const translations = generatedTranslations as Record<string, TranslationObject>;
    
    // Try to load from actual JSON files for fresher content
    try {
      const localesDir = path.join(process.cwd(), 'src', 'locales');
      
      // Load each language
      const languages = ['en', 'fi'];
      const updatedTranslations: Record<string, TranslationObject> = {};
      
      for (const lang of languages) {
        const filePath = path.join(localesDir, lang, 'common.json');
        try {
          const content = await fs.readFile(filePath, 'utf8');
          updatedTranslations[lang] = JSON.parse(content);
        } catch {
          updatedTranslations[lang] = translations[lang] || {};
        }
      }
      
      // Merge with imported translations to ensure we have all keys
      const result = { ...translations };
      languages.forEach(lang => {
        result[lang] = { ...result[lang], ...updatedTranslations[lang] };
      });
      
      return result;
    } catch {
      // If we can't load from filesystem, use the imported translations
      console.warn('Could not load translations from filesystem, using pre-generated translations');
      return translations;
    }
  } catch (error) {
    console.error('Error loading translations:', error);
    // Fallback to empty translations
    return {
      en: {},
      fi: {},
    };
  }
}

/**
 * Get a translation value by traversing the nested keys
 */
function getNestedTranslation(obj: Record<string, unknown>, keys: string[]): string | null {
  let current: unknown = obj;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && current !== null && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return null; // Key not found at some level
    }
  }
  
  return typeof current === 'string' ? current : null;
}

/**
 * Get a translation for a specific key and locale
 */
export function getExcelTranslation(
  translations: Record<string, TranslationObject>,
  locale: string, 
  key: string, 
  placeholders?: Record<string, string | number>
): string {
  // Default to English if locale doesn't exist
  const safeLocale = translations[locale] ? locale : 'en';
  const keys = key.split('.');
  
  // First try in the specified locale
  const translation = getNestedTranslation(translations[safeLocale], keys);
  
  // If not found and locale isn't English, try English as fallback
  const fallback = 
    !translation && safeLocale !== 'en' 
      ? getNestedTranslation(translations.en, keys) 
      : null;
  
  // Use translation, fallback, or key as last resort
  let result = translation || fallback || key;
  
  // Handle placeholder replacements if provided
  if (placeholders && typeof result === 'string') {
    Object.entries(placeholders).forEach(([placeholder, value]) => {
      result = result.replace(new RegExp(`{{${placeholder}}}`, 'g'), String(value));
    });
  }
  
  return result;
}
