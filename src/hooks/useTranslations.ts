'use client';

import { getTranslation, formatDate } from '../utils/translations';

type DateFormatOptions = Intl.DateTimeFormatOptions;

/**
 * React hook for translations - client-side wrapper
 */
export function useTranslations(locale: string) {
  const t = (key: string, placeholders?: Record<string, string | number>) => {
    return getTranslation(locale, key, placeholders);
  };

  return {
    t,
    formatDate: (date: Date | string | number, format?: string | DateFormatOptions) => 
      formatDate(locale, date, format)
  };
}
