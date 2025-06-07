'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '../i18n';
type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const defaultLanguage = i18n.defaultLocale;

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLanguage,
  setLocale: () => {},
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: string;
}

export const LanguageProvider = ({ children, initialLocale }: LanguageProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();
    // Detect locale from URL or use initialLocale or localStorage
  const detectLocale = useCallback((): string => {
    if (initialLocale && i18n.locales.includes(initialLocale)) {
      return initialLocale;
    }
    
    // Try to detect from URL path
    const pathSegments = pathname?.split('/').filter(Boolean) || [];
    const firstSegment = pathSegments[0];
    if (firstSegment && i18n.locales.includes(firstSegment)) {
      return firstSegment;
    }
    
    // Check localStorage for saved language preference
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale && i18n.locales.includes(savedLocale)) {
        return savedLocale;
      }
    }
    
    return defaultLanguage;
  }, [initialLocale, pathname]);
  const [locale, setLocaleState] = useState(defaultLanguage);
  useEffect(() => {
    const detectedLocale = detectLocale();
    setLocaleState(detectedLocale);
  }, [pathname, detectLocale]);
  
  useEffect(() => {
    // Set document language
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', locale);
      
      // Set the font
      document.documentElement.classList.add('ltr-mode');
      document.documentElement.classList.add('font-poppins');
    }

    // Save language preference to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('locale', locale);
    }
  }, [locale]);

  const setLocale = (newLocale: string) => {
    if (!i18n.locales.includes(newLocale)) {
      console.error(`Invalid locale: ${newLocale}`);
      return;
    }
    
    setLocaleState(newLocale);
    
    // Update URL to include locale
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      const isLocaleInPath = i18n.locales.includes(segments[0]);
      
      let newPath: string;
      if (isLocaleInPath) {
        // Replace existing locale in path
        segments[0] = newLocale;
        newPath = `/${segments.join('/')}`;
      } else {
        // Add locale to beginning of path
        newPath = `/${newLocale}${pathname}`;
      }
      
      router.push(newPath);
    }
  };
  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};