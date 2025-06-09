'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'colorful';

interface SimpleThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const SimpleThemeContext = createContext<SimpleThemeContextType>({
  theme: 'colorful',
  setTheme: () => {},
});

export const useSimpleTheme = () => {
  const context = useContext(SimpleThemeContext);
  return context; // Return context even if undefined to prevent SSG errors
};

export function SimpleThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('colorful');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.warn('Failed to load theme from localStorage:', error);
      }
    }
  }, []);
  
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-colorful');
        document.documentElement.classList.add(`theme-${newTheme}`);
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }
  };
  
  return (
    <SimpleThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </SimpleThemeContext.Provider>
  );
}
