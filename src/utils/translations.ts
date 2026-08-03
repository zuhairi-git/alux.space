import type { TranslationObject } from '../types/translations';
import { i18n, getLocaleConfig } from '../i18n';

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
  const fallbackLocale = i18n.defaultLocale;

  const safeLocale = translations[locale] ? locale : fallbackLocale;
  const keys = key.split('.');

  // First try in the specified locale
  const translation = getNestedTranslation(translations[safeLocale], keys);

  // Then fall back to the default locale so a partially translated language
  // degrades to readable text rather than to a raw dotted key.
  const fallback =
    !translation && safeLocale !== fallbackLocale
      ? getNestedTranslation(translations[fallbackLocale], keys)
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
  // The Intl tag (and, for Arabic, the numbering system) comes from
  // LOCALE_CONFIG so adding a language never means editing a second map.
  const intlLocale = getLocaleConfig(locale).dateLocale;

  const dateObj = date instanceof Date ? date : new Date(date);
  const options: DateFormatOptions = typeof format === 'string' ? dateFormats[format] : format;

  try {
    return new Intl.DateTimeFormat(intlLocale, options).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  }
}

/**
 * Locale-aware number formatting, so counts and stats match the numbering
 * system the date formatter uses instead of always rendering as en-US.
 */
export function formatNumber(
  locale: string,
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(getLocaleConfig(locale).dateLocale, options).format(value);
  } catch (error) {
    console.error('Error formatting number:', error);
    return new Intl.NumberFormat('en-US', options).format(value);
  }
}