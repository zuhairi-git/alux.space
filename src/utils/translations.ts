import { loadExcelTranslations, getExcelTranslation } from './excelTranslations';

// Define a recursive interface for translations without circular references
interface TranslationValue {
  [key: string]: string | TranslationValue;
}

// Translations will be loaded from Excel
let translations: Record<string, TranslationValue> = {
  en: {},
  fi: {},
  ar: {},
};

// Flag to track if translations are being loaded
let isLoadingTranslations = false;

// Flag to track if translations have been loaded
let translationsLoaded = false;

/**
 * Initialize translations from Excel file
 */
export async function initTranslations(): Promise<void> {
  if (isLoadingTranslations || translationsLoaded) return;
  
  isLoadingTranslations = true;
  try {
    translations = await loadExcelTranslations();
    translationsLoaded = true;
  } catch (error) {
    console.error('Failed to load translations from Excel:', error);
  } finally {
    isLoadingTranslations = false;
  }
}

/**
 * Get a translation for a specific key and locale
 */
export function getTranslation(locale: string, key: string, placeholders?: Record<string, string | number>): string {
  // If translations haven't been loaded yet, try to load them synchronously
  if (!translationsLoaded && typeof window !== 'undefined') {
    // In browser context, trigger async loading if not already loading
    if (!isLoadingTranslations) {
      initTranslations(); // Don't await, just trigger the loading
    }
    
    // Use fallback key while translations are loading
    return key;
  }
  
  return getExcelTranslation(translations, locale, key, placeholders);
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