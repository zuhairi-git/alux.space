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
    // During SSG, provide fallback values instead of throwing
    if (typeof window === 'undefined') {
      return { locale: i18n.defaultLocale, setLocale: () => {} };
    }
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale?: string;
}

export const LanguageProvider = ({ children, initialLocale }: LanguageProviderProps) => {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocaleState] = useState(initialLocale || defaultLanguage);
  
  // Always call hooks, but safely handle SSG
  const pathname = usePathname();
  const router = useRouter();
  
  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Detect locale from URL or use initialLocale or localStorage
  const detectLocale = useCallback((): string => {
    if (initialLocale && i18n.locales.includes(initialLocale)) {
      return initialLocale;
    }
    
    // Try to detect from URL path (only after mounting and if pathname exists)
    if (mounted && pathname) {
      try {
        const pathSegments = pathname.split('/').filter(Boolean);
        const firstSegment = pathSegments[0];
        if (firstSegment && i18n.locales.includes(firstSegment)) {
          return firstSegment;
        }
      } catch (error) {
        console.warn('Error parsing pathname:', error);
      }
    }
    
    // Check localStorage for saved language preference
    if (mounted && typeof window !== 'undefined') {
      try {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale && i18n.locales.includes(savedLocale)) {
          return savedLocale;
        }
      } catch (error) {
        console.warn('Error accessing localStorage:', error);
      }
    }
    
    return defaultLanguage;
  }, [initialLocale, pathname, mounted]);
  
  useEffect(() => {
    if (mounted) {
      const detectedLocale = detectLocale();
      setLocaleState(detectedLocale);
    }
  }, [mounted, detectLocale]);
  
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
  }, [locale]);  const setLocale = (newLocale: string) => {
    if (!i18n.locales.includes(newLocale)) {
      console.error(`Invalid locale: ${newLocale}`);
      return;
    }
    
    setLocaleState(newLocale);
    
    // Update URL to include locale (only if mounted and router/pathname are available)
    if (mounted && router && pathname) {
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