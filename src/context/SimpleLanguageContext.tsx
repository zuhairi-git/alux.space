'use client';

import React, { createContext, useContext, useState } from 'react';
import { i18n } from '../i18n';

type SimpleLanguageContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const SimpleLanguageContext = createContext<SimpleLanguageContextType>({
  locale: i18n.defaultLocale,
  setLocale: () => {},
});

export const useSimpleLanguage = () => {
  const context = useContext(SimpleLanguageContext);
  return context; // Return context even if undefined to prevent SSG errors
};

interface SimpleLanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: string;
}

export function SimpleLanguageProvider({ children, initialLocale }: SimpleLanguageProviderProps) {
  const [locale, setLocale] = useState(initialLocale || i18n.defaultLocale);
  
  const handleSetLocale = (newLocale: string) => {
    if (i18n.locales.includes(newLocale)) {
      setLocale(newLocale);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('locale', newLocale);
        } catch (error) {
          console.warn('Failed to save locale to localStorage:', error);
        }
      }
    }
  };
  
  return (
    <SimpleLanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </SimpleLanguageContext.Provider>
  );
}
