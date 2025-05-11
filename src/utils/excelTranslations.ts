import generatedTranslations from '../translations/generatedTranslations.json';

// Define types for our translation system
type TranslationValue = string | number | boolean | null | TranslationObject;
type TranslationObject = { [key: string]: TranslationValue };

/**
 * Load translations from pre-generated JSON (converted from Excel)
 * or from local JSON files if the Excel-generated file is not available
 */
export async function loadExcelTranslations(): Promise<Record<string, TranslationObject>> {
  try {
    // First try to load from imported JSON
    const translations = generatedTranslations as Record<string, TranslationObject>;
    
    // Check if we're running in the browser where dynamic imports aren't available
    if (typeof window !== 'undefined') {
      return translations;
    }
    
    // In Node.js environment, we can try to load from actual JSON files for fresher content
    try {
      const fs = require('fs');
      const path = require('path');
      const localesDir = path.join(process.cwd(), 'src', 'locales');
      
      // Load each language
      const languages = ['en', 'fi', 'ar'];
      const updatedTranslations: Record<string, TranslationObject> = {};
      
      languages.forEach(lang => {
        const filePath = path.join(localesDir, lang, 'common.json');
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          updatedTranslations[lang] = JSON.parse(content);
        } else {
          updatedTranslations[lang] = translations[lang] || {};
        }
      });
      
      // Merge with imported translations to ensure we have all keys
      const result = { ...translations };
      languages.forEach(lang => {
        result[lang] = { ...result[lang], ...updatedTranslations[lang] };
      });
      
      return result;
    } catch (fsError) {
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
      ar: {},
    };
  }
}

/**
 * Get a translation value by traversing the nested keys
 */
function getNestedTranslation(obj: any, keys: string[]): string | null {
  let current = obj;
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
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
  
  // Only log warning when in development and only if neither translation nor fallback was found
  if (!translation && !fallback && typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn(`Translation missing for key: ${key} in locale: ${locale}`);
  }
  
  // Handle placeholder replacements if provided
  if (placeholders && typeof result === 'string') {
    Object.entries(placeholders).forEach(([placeholder, value]) => {
      result = result.replace(new RegExp(`{{${placeholder}}}`, 'g'), String(value));
    });
  }
  
  return result;
}