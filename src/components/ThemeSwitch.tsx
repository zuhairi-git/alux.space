'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'colorful') => {
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleThemeChange('light')}
        className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all ${
          theme === 'light' 
            ? 'bg-primary-glow text-primary' 
            : 'bg-transparent text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Switch to light theme"
      >
        <span className="material-symbols text-xl">light_mode</span>
        {theme === 'light' && (
          <motion.span
            layoutId="theme-indicator"
            className="absolute inset-0 rounded-full border border-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleThemeChange('dark')}
        className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all ${
          theme === 'dark' 
            ? 'bg-primary-glow text-primary' 
            : 'bg-transparent text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Switch to dark theme"
      >
        <span className="material-symbols text-xl">dark_mode</span>
        {theme === 'dark' && (
          <motion.span
            layoutId="theme-indicator"
            className="absolute inset-0 rounded-full border border-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleThemeChange('colorful')}
        className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all ${
          theme === 'colorful' 
            ? 'bg-primary-glow text-primary' 
            : 'bg-transparent text-gray-400 hover:text-gray-300'
        }`}
        aria-label="Switch to colorful theme"
      >
        <span className="material-symbols text-xl">palette</span>
        {theme === 'colorful' && (
          <motion.span
            layoutId="theme-indicator"
            className="absolute inset-0 rounded-full border border-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
    </div>
  );
} 