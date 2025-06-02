// Client-side only translation utilities
import generatedTranslations from '../translations/generatedTranslations.json';

// Define types for our translation system
type TranslationValue = string | number | boolean | null | TranslationObject;
type TranslationObject = { [key: string]: TranslationValue };

/**
 * Load translations for client-side use (browser only)
 * Always returns the pre-generated translations
 */
export async function loadExcelTranslations(): Promise<Record<string, TranslationObject>> {
  return generatedTranslations as Record<string, TranslationObject>;
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
