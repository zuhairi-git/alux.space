import generatedTranslations from '../translations/generatedTranslations.json';

// Define types for our translation system
type TranslationValue = string | number | boolean | null | TranslationObject;
type TranslationObject = { [key: string]: TranslationValue };

/**
 * Load translations from pre-generated JSON (converted from Excel)
 */
export async function loadExcelTranslations(): Promise<Record<string, TranslationObject>> {
  try {
    // Return the imported translations
    return generatedTranslations as Record<string, TranslationObject>;
  } catch (error) {
    console.error('Error loading Excel translations:', error);
    // Fallback to empty translations
    return {
      en: {},
      fi: {},
      ar: {},
    };
  }
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
  let currentObj: any = translations[safeLocale];
  
  // Try to get translation from specified locale
  for (const k of keys) {
    if (currentObj && typeof currentObj === 'object' && k in currentObj) {
      currentObj = currentObj[k];
    } else {
      // If translation is missing, try to get it from English
      let enObj: any = translations.en;
      for (const enK of keys) {
        if (enObj && typeof enObj === 'object' && enK in enObj) {
          enObj = enObj[enK];
        } else {
          console.warn(`Translation missing for key: ${key} in locale: ${locale}`);
          return key; // Return key as last resort
        }
      }
      currentObj = enObj;
      break;
    }
  }
  
  if (typeof currentObj !== 'string') {
    return key;
  }
  
  // Handle placeholder replacements if provided
  let result = currentObj;
  if (placeholders) {
    Object.entries(placeholders).forEach(([placeholder, value]) => {
      result = result.replace(new RegExp(`{{${placeholder}}}`, 'g'), String(value));
    });
  }
  
  return result;
}