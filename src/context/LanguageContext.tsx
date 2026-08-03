'use client';

import React, { createContext, useContext, useEffect, useMemo, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  i18n,
  getLocaleConfig,
  isLocale,
  localizePath,
  resolveLocaleFromPath,
  type Direction,
  type LocaleConfig,
} from '../i18n';

type LanguageContextType = {
  locale: string;
  /** Full config for the active locale (dir, date locale, labels). */
  config: LocaleConfig;
  /** Writing direction — shorthand for config.dir. */
  dir: Direction;
  isRtl: boolean;
  setLocale: (locale: string) => void;
};

const defaultConfig = getLocaleConfig(i18n.defaultLocale);

const LanguageContext = createContext<LanguageContextType>({
  locale: i18n.defaultLocale,
  config: defaultConfig,
  dir: defaultConfig.dir,
  isRtl: defaultConfig.dir === 'rtl',
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: string;
}

export const LanguageProvider = ({ children, initialLocale }: LanguageProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  // Resolved during render rather than in a post-mount effect. Every page is a
  // separate static HTML file, so the URL is authoritative and identical on
  // server and client — which means no first-paint flash of the wrong
  // direction when an RTL locale loads.
  const locale = useMemo(
    () =>
      resolveLocaleFromPath(pathname) ??
      (isLocale(initialLocale) ? initialLocale : i18n.defaultLocale),
    [pathname, initialLocale]
  );

  const config = useMemo(() => getLocaleConfig(locale), [locale]);

  useEffect(() => {
    // Keeps <html> correct across client-side navigation between locales. The
    // initial values are already in the served markup — see the pre-paint
    // script in src/app/layout.tsx and scripts/inject-html-lang.js.
    document.documentElement.setAttribute('lang', config.htmlLang);
    document.documentElement.setAttribute('dir', config.dir);

    try {
      localStorage.setItem('locale', locale);
    } catch {
      // Private browsing / storage disabled — the preference just isn't persisted.
    }
  }, [locale, config]);

  const setLocale = useMemo(() => {
    return (newLocale: string) => {
      if (!isLocale(newLocale)) {
        console.error(`Invalid locale: ${newLocale}`);
        return;
      }
      if (newLocale === locale) return;

      try {
        localStorage.setItem('locale', newLocale);
      } catch {
        // ignore
      }

      // The URL is the source of truth, so navigating is what changes the
      // language — there is no separate local state to keep in sync.
      router.push(localizePath(pathname || '/', newLocale));
    };
  }, [locale, pathname, router]);

  const value = useMemo(
    () => ({
      locale,
      config,
      dir: config.dir,
      isRtl: config.dir === 'rtl',
      setLocale,
    }),
    [locale, config, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
