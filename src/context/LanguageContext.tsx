'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { i18n } from '../i18n';
import { initTranslations } from '@/utils/translations';
import { initRTLDebug } from '@/utils/rtlDebug';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  isRTL: boolean;
};

const defaultLanguage = i18n.defaultLocale;

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLanguage,
  setLocale: () => {},
  isRTL: false,
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
  const detectLocale = (): string => {
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
  };
  
  const [locale, setLocaleState] = useState(defaultLanguage);
  const [isRTL, setIsRTL] = useState(locale === 'ar');  useEffect(() => {
    const detectedLocale = detectLocale();
    setLocaleState(detectedLocale);
    
    // Initialize translations from Excel when component mounts
    // or when the pathname changes (which might indicate a language change)
    initTranslations().catch(err => {
      console.error('Failed to initialize translations:', err);
    });
  }, [pathname]);
  
  useEffect(() => {
    // Update RTL state when locale changes
    const rtlLocale = locale === 'ar';
    setIsRTL(rtlLocale);
    
    // Apply RTL attribute to document for proper text direction
    if (typeof document !== 'undefined') {
      // Set the dir attribute for RTL/LTR text direction
      document.documentElement.setAttribute('dir', rtlLocale ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', locale);
      
      // Add or remove CSS classes to help with specific RTL styling
      if (rtlLocale) {
        document.documentElement.classList.add('rtl-mode');
        document.documentElement.classList.remove('ltr-mode');
        // Set the font for Arabic
        document.documentElement.classList.add('font-tajawal');
        document.documentElement.classList.remove('font-poppins');
      } else {
        document.documentElement.classList.remove('rtl-mode');
        document.documentElement.classList.add('ltr-mode');
        // Set the font for non-Arabic
        document.documentElement.classList.remove('font-tajawal');
        document.documentElement.classList.add('font-poppins');
      }      // Force update on layout to fix any RTL rendering issues
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 0);
      
      // Initialize RTL debugging if URL parameter is present
      initRTLDebug();
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
    <LanguageContext.Provider value={{ locale, setLocale, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};