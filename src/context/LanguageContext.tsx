'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  isRTL: boolean;
};

const defaultLanguage = 'en';

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
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocaleState] = useState(defaultLanguage);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLocale = localStorage.getItem('locale') || defaultLanguage;
    setLocaleState(savedLocale);
  }, []);

  useEffect(() => {
    // Update RTL state when locale changes
    setIsRTL(locale === 'ar');
    
    // Apply RTL attribute to document for proper text direction
    document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', locale);

    // Save language preference to localStorage
    localStorage.setItem('locale', locale);
  }, [locale]);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};