import { loadExcelTranslations, getExcelTranslation } from './excelTranslations';
import generatedTranslations from '../translations/generatedTranslations.json';

// Define a recursive interface for translations without circular references
interface TranslationValue {
  [key: string]: string | TranslationValue;
}

// Load translations directly from the JSON file for immediate availability
let translations: Record<string, TranslationValue> = generatedTranslations as Record<string, TranslationValue>;

/**
 * Initialize translations by loading them from Excel
 * This ensures the translations are up-to-date with the latest data
 */
export async function initTranslations(): Promise<void> {
  try {
    translations = await loadExcelTranslations();
  } catch (error) {
    console.error('Failed to initialize translations from Excel:', error);
  }
}

/**
 * Get a translation for a specific key and locale
 */
export function getTranslation(locale: string, key: string, placeholders?: Record<string, string | number>): string {
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