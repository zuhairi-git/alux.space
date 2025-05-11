'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { useTheme } from '@/context/ThemeContext';
import Tooltip from './ui/Tooltip';
import { i18n } from '@/i18n';

export default function LanguageSwitcher() {  const { locale, setLocale } = useLanguage();
  const { theme } = useTheme();
  const { t } = useTranslations(locale);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Flag icons for language selection
  const languageFlags: Record<string, string> = {
    en: '🇬🇧',
    fi: '🇫🇮',
  };
  
  // Default language names to avoid hydration mismatch
  const defaultLanguageNames: Record<string, string> = {
    en: 'English',
    fi: 'Suomi',
  };
  
  // State to track if we're on the client side
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);
  }, []);

  // Get language names dynamically from translations
  const getLanguageName = (langCode: string) => {
    // During SSR or initial render, use default language names to avoid hydration mismatch
    if (!isClient) {
      return defaultLanguageNames[langCode];
    }
    
    // After hydration on client, we can safely use translations
    const key = `languageSwitcher.${langCode}`;
    return t(key);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  // Get dropdown button styles based on theme
  const getDropdownButtonClass = () => {
    return theme === 'light'
      ? 'text-gray-800 hover:text-primary'
      : 'text-gray-300 hover:text-white';
  };

  // Detect if it's mobile view based on screen width
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if window exists (client-side)
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
      };
      
      // Initial check
      checkMobile();
      
      // Add listener for resize
      window.addEventListener('resize', checkMobile);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Tooltip text={isClient ? t('languageSwitcher.title') : "Language"}>        <button
          onClick={toggleDropdown}
          className={`flex items-center px-3 py-2 rounded-lg ${
            theme === 'light' 
              ? 'bg-white/80 hover:bg-white border border-gray-200 shadow-sm' 
              : 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700 shadow-sm'
          } backdrop-blur-sm transition-all ${getDropdownButtonClass()}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Select language"
        >
          <span className="text-xl">{languageFlags[locale]}</span>
          <span className={`mx-2 truncate ${isMobile ? 'hidden' : 'inline-block'}`}>{getLanguageName(locale)}</span>
          <span className={`material-symbols material-symbols-rounded text-base transform transition-transform ml-1 ${isOpen ? 'rotate-180' : ''}`}>
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </Tooltip>      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut"
            }}
            className={`absolute left-0 mt-2 w-auto min-w-[180px] rounded-lg ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-900 border border-gray-700'} backdrop-blur-lg shadow-lg overflow-hidden z-50`}
          >
            <div className="py-2">
              {i18n.locales.map((langCode) => (
                <button
                  key={langCode}
                  onClick={() => handleLanguageChange(langCode)}
                  className={`flex items-center w-full px-4 py-3 text-sm ${
                    theme === 'light'
                      ? locale === langCode
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                      : locale === langCode
                      ? 'bg-blue-900/20 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  } transition-colors text-left`}
                  aria-current={locale === langCode ? "true" : "false"}
                >
                  <div className={`flex items-center justify-center text-xl w-8 h-8 rounded-full ${
                    locale === langCode
                      ? theme === 'light' ? 'bg-blue-100' : 'bg-blue-800/30' 
                      : theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
                  } mr-2`}>
                    {languageFlags[langCode]}
                  </div>
                  <span className="font-medium whitespace-nowrap">{getLanguageName(langCode)}</span>
                  
                  {/* Show indicator for current language */}
                  {locale === langCode && (
                    <motion.span 
                      layoutId="current-language-indicator" 
                      className={`material-symbols text-sm ml-auto ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                    >
                      check_circle
                    </motion.span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}