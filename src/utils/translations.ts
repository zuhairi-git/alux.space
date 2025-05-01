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

export function getTranslation(locale: string, key: string): string {
  const keys = key.split('.');
  let currentObj: unknown = translations[locale] || translations.en; // Fallback to English
  
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
          return key; // If English translation also missing, return key
        }
      }
      return typeof enObj === 'string' ? enObj : key;
    }
  }
  
  return typeof currentObj === 'string' ? currentObj : key;
}

export function useTranslations(locale: string) {
  return {
    t: (key: string) => getTranslation(locale, key),
  };
}