/**
 * Single source of truth for locale configuration.
 *
 * To enable a new language end-to-end:
 *   1. add its config to LOCALE_CONFIG below,
 *   2. create src/locales/<code>/common.json,
 *   3. add the code to `i18n.locales`.
 *
 * Everything else (html lang/dir, fonts, date formats, OG tags, hreflang,
 * static params, the language switcher) is derived from these two places.
 */

export type Locale = 'en' | 'fi' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface LocaleConfig {
  /** URL segment and locale file directory name. */
  code: Locale;
  /** Language name in its own language — what the switcher shows. */
  label: string;
  /** Language name in English — for aria-labels and dev tooling. */
  englishLabel: string;
  /** Writing direction, applied to <html dir>. */
  dir: Direction;
  /** BCP 47 tag for <html lang>. */
  htmlLang: string;
  /** Open Graph og:locale value. */
  ogLocale: string;
  /**
   * Locale tag handed to Intl.DateTimeFormat / NumberFormat.
   *
   * NOTE for Arabic: `ar-u-nu-latn` forces Western digits (2025) instead of
   * Eastern Arabic-Indic digits (٢٠٢٥). Chosen because the rest of the site
   * renders numerals in Latin script, and mixing the two reads as a bug.
   * Switch to plain `'ar'` if native numerals are preferred.
   */
  dateLocale: string;
  /** True when the copy is machine-translated — drives the disclosure badge. */
  machineTranslated: boolean;
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    label: 'English',
    englishLabel: 'English',
    dir: 'ltr',
    htmlLang: 'en',
    ogLocale: 'en_US',
    dateLocale: 'en-US',
    machineTranslated: false,
  },
  fi: {
    code: 'fi',
    label: 'Suomi',
    englishLabel: 'Finnish',
    dir: 'ltr',
    htmlLang: 'fi',
    ogLocale: 'fi_FI',
    dateLocale: 'fi-FI',
    machineTranslated: true,
  },
  ar: {
    code: 'ar',
    label: 'العربية',
    englishLabel: 'Arabic',
    dir: 'rtl',
    htmlLang: 'ar',
    ogLocale: 'ar_AR',
    dateLocale: 'ar-u-nu-latn',
    machineTranslated: true,
  },
};

/**
 * Locales that are actually built and linked.
 *
 * `ar` is configured above but deliberately not listed yet — add `'ar'` here
 * once src/locales/ar/common.json is populated and it ships everywhere.
 */
export const i18n = {
  locales: ['en', 'fi'] as string[],
  defaultLocale: 'en' as string,
  localeDetection: true,
};

/** Type guard: is this string one of the locales we currently build? */
export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === 'string' && i18n.locales.includes(value);
}

/** Config for a locale, falling back to the default locale's config. */
export function getLocaleConfig(locale: string | undefined | null): LocaleConfig {
  if (isLocale(locale)) {
    return LOCALE_CONFIG[locale];
  }
  return LOCALE_CONFIG[i18n.defaultLocale as Locale];
}

export function isRtl(locale: string | undefined | null): boolean {
  return getLocaleConfig(locale).dir === 'rtl';
}

/**
 * Pull the locale out of a pathname such as `/fi/blog/some-post`.
 * Returns null when the path carries no locale prefix.
 */
export function resolveLocaleFromPath(pathname: string | undefined | null): Locale | null {
  if (!pathname) return null;
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : null;
}

/**
 * Prefix a path with a locale, replacing an existing locale prefix if present.
 * Hash-only and absolute (http) links are returned untouched.
 */
export function localizePath(path: string, locale: string): string {
  if (!path || path.startsWith('http') || path.startsWith('#')) return path;

  const [pathPart, hash] = path.split('#');
  const segments = pathPart.split('/').filter(Boolean);

  if (isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  const rebuilt = `/${segments.join('/')}`;
  return hash ? `${rebuilt}#${hash}` : rebuilt;
}

/** hreflang map for a page, including the required x-default entry. */
export function alternateLanguages(baseUrl: string, path = ''): Record<string, string> {
  const suffix = path && !path.startsWith('/') ? `/${path}` : path;
  const alternates = i18n.locales.reduce((acc, locale) => {
    acc[getLocaleConfig(locale).htmlLang] = `${baseUrl}/${locale}${suffix}`;
    return acc;
  }, {} as Record<string, string>);

  alternates['x-default'] = `${baseUrl}/${i18n.defaultLocale}${suffix}`;
  return alternates;
}
