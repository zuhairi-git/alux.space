import type { TranslationObject } from '../types/translations';

// Import translation data
import enTranslations from '../locales/en/common.json';
import fiTranslations from '../locales/fi/common.json';

// Static translations object
const staticTranslations: Record<string, TranslationObject> = {
  en: enTranslations as TranslationObject,
  fi: fiTranslations as TranslationObject,
};

/**
 * Load translations from static imports
 */
export function loadTranslations(): Record<string, TranslationObject> {
  return staticTranslations;
}

/**
 * Get a nested translation value using dot notation
 */
function getNestedTranslation(obj: Record<string, unknown>, keys: string[]): string | null {
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && current !== null && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return null; // Key not found
    }
  }
  
  return typeof current === 'string' ? current : null;
}

/**
 * Get a translation for a specific key and locale
 */
export function getTranslation(
  locale: string, 
  key: string, 
  placeholders?: Record<string, string | number>
): string {
  const translations = loadTranslations();
  
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
  
  // Log warning in development if no translation found
  if (!translation && !fallback && process.env.NODE_ENV === 'development') {
    console.warn(`Translation missing for key: ${key} in locale: ${locale}`);
  }
  
  return result;
}

export type DateFormatOptions = Intl.DateTimeFormatOptions;

// Common date format presets
const dateFormats: Record<string, DateFormatOptions> = {
  short: { year: 'numeric', month: 'short', day: 'numeric' },
  long: { year: 'numeric', month: 'long', day: 'numeric' },
  relative: { year: 'numeric', month: 'long', day: 'numeric' },
  time: { hour: 'numeric', minute: 'numeric' },
  datetime: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
};

export function formatDate(
  locale: string, 
  date: Date | string | number,
  format: keyof typeof dateFormats | DateFormatOptions = 'short'
): string {
  // Map locale codes to those expected by Intl
  const localeMap: Record<string, string> = {
    en: 'en-US',
    fi: 'fi-FI',
  };
  
  const dateObj = date instanceof Date ? date : new Date(date);
  const options: DateFormatOptions = typeof format === 'string' ? dateFormats[format] : format;
  
  try {
    return new Intl.DateTimeFormat(localeMap[locale] || locale, options).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  }
}