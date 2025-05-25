import { loadExcelTranslations, getExcelTranslation } from './excelTranslations';
import generatedTranslations from '../translations/generatedTranslations.json';
import { useEffect } from 'react';

// Define types (matching those in excelTranslations.ts)
type TranslationValue = string | number | boolean | null | TranslationObject;
type TranslationObject = { [key: string]: TranslationValue };

// Load translations directly from the JSON file for immediate availability
let translations: Record<string, TranslationObject> = generatedTranslations as Record<string, TranslationObject>;

// Flag to track if in development mode for more detailed logging
const isDev = process.env.NODE_ENV === 'development';

/**
 * Initialize translations by loading them from Excel
 * This ensures the translations are up-to-date with the latest data
 */
export async function initTranslations(): Promise<void> {
  try {
    // Force reload the generated translations in development mode
    if (typeof window !== 'undefined' && isDev) {
      try {
        // Add cache-busting parameter for development
        const cacheBuster = Date.now();
        const response = await fetch(`/api/translations?t=${cacheBuster}`);
        if (response.ok) {
          const freshTranslations = await response.json();
          translations = freshTranslations;
          console.log('Loaded fresh translations from API');
          return;
        }      } catch {
        console.warn('Could not fetch fresh translations, using cached ones');
      }
    }
    
    try {
      // Use type assertion to ensure compatibility
      const excelTranslations = await loadExcelTranslations();
      translations = excelTranslations as typeof translations;
    } catch (loadError) {
      console.error('Error loading Excel translations, using generated translations instead:', loadError);
    }
  } catch (error) {
    console.error('Failed to initialize translations:', error);
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
  // Trigger a re-initialization of translations on first client-side render
  // but only in development to ensure freshest translations
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      initTranslations().catch(err => {
        console.warn('Failed to refresh translations on component mount', err);
      });
    }
  }, []);

  return {
    t: (key: string, placeholders?: Record<string, string | number>) => {
      try {
        return getTranslation(locale, key, placeholders);
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error);
        return key; // Fallback to the key itself
      }
    },
    formatDate: (date: Date | string | number, format?: keyof typeof dateFormats | DateFormatOptions) => 
      formatDate(locale, date, format)
  };
}