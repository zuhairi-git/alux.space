'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import { SimpleThemeProvider } from './SimpleThemeContext';
import { SimpleLanguageProvider } from './SimpleLanguageContext';

interface SafeProvidersProps {
  children: React.ReactNode;
  initialLocale?: string;
}

export function SafeProviders({ children, initialLocale }: SafeProvidersProps) {
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Error boundary-like behavior for providers
  if (hasError || !mounted) {
    return (
      <SimpleThemeProvider>
        <SimpleLanguageProvider initialLocale={initialLocale}>
          {children}
        </SimpleLanguageProvider>
      </SimpleThemeProvider>
    );
  }
  
  try {
    return (
      <ThemeProvider>
        <LanguageProvider initialLocale={initialLocale}>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    );
  } catch (error) {
    console.warn('Provider error, falling back to simple providers:', error);
    setHasError(true);
    return (
      <SimpleThemeProvider>
        <SimpleLanguageProvider initialLocale={initialLocale}>
          {children}
        </SimpleLanguageProvider>
      </SimpleThemeProvider>
    );
  }
}
