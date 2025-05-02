import enTranslations from '../locales/en/common.json';
import fiTranslations from '../locales/fi/common.json';
import arTranslations from '../locales/ar/common.json';

// Define a recursive interface for translations without circular references
interface TranslationValue {
  [key: string]: string | TranslationValue;
}

const translations: Record<string, TranslationValue> = {
  en: enTranslations as unknown as TranslationValue,
  fi: fiTranslations as unknown as TranslationValue,
  ar: arTranslations as unknown as TranslationValue,
};

export function getTranslation(locale: string, key: string, placeholders?: Record<string, string | number>): string {
  // Default to English if locale doesn't exist
  const safeLocale = translations[locale] ? locale : 'en';
  
  const keys = key.split('.');
  let currentObj: unknown = translations[safeLocale];
  
  // Try to get translation from specified locale
  for (const k of keys) {
    if (currentObj && typeof currentObj === 'object' && k in currentObj) {
      currentObj = (currentObj as Record<string, unknown>)[k];
    } else {
      // If translation is missing, try to get it from English
      let enObj: unknown = translations.en;
      for (const enK of keys) {
        if (enObj && typeof enObj === 'object' && enK in enObj) {
          enObj = (enObj as Record<string, unknown>)[enK];
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

type DateFormatOptions = Intl.DateTimeFormatOptions;

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
    ar: 'ar-SA',
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

export function useTranslations(locale: string) {
  return {
    t: (key: string, placeholders?: Record<string, string | number>) => 
      getTranslation(locale, key, placeholders),
    formatDate: (date: Date | string | number, format?: keyof typeof dateFormats | DateFormatOptions) => 
      formatDate(locale, date, format)
  };
}