'use client';

import React, { createContext, useContext, useEffect, useState, useInsertionEffect } from 'react';

type Theme = 'light' | 'dark' | 'colorful';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// This component is rendered on the server but executed only on the client
// to avoid hydration mismatches
function ThemeScript({ defaultTheme = 'colorful' }: { defaultTheme?: Theme }) {
  // Use a client-only insertion effect to inject the script
  useInsertionEffect(() => {
    // Get theme from localStorage or use default
    let theme;
    try {
      theme = localStorage.getItem('theme') as Theme || defaultTheme;
    } catch {
      theme = defaultTheme;
    }
    
    // Apply theme class to document
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-colorful');
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Make theme available globally
    (window as Window & { __theme?: Theme }).__theme = theme;
  }, []);
  
  // Return nothing from the component to avoid hydration mismatches
  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('colorful');
  const [mounted, setMounted] = useState(false);
  
  // Effect for initial client-side hydration
  useEffect(() => {
    setMounted(true);
    let initialTheme;
    try {
      initialTheme = localStorage.getItem('theme') as Theme;
    } catch {
      initialTheme = null;
    }
    
    if (initialTheme) {
      setTheme(initialTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-colorful');
    root.classList.add(`theme-${theme}`);
    
    // Store theme preference in local storage
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('Failed to save theme to localStorage:', e);
    }
    
    // Update window.__theme for any code that needs to know the current theme
    (window as Window & { __theme?: Theme }).__theme = theme;
  }, [theme, mounted]);

  // Apply the default theme class for SSR
  // This ensures the initial HTML includes the theme class
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeScript defaultTheme="colorful" />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 