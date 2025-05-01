'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { useTheme } from '@/context/ThemeContext';
import Tooltip from './ui/Tooltip';

export default function LanguageSwitcher() {
  const { locale, setLocale, isRTL } = useLanguage();
  const { theme } = useTheme();
  const { t } = useTranslations(locale);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Flag icons for language selection
  const languageFlags: Record<string, string> = {
    en: '🇬🇧',
    fi: '🇫🇮',
    ar: '🇸🇦',
  };

  // Language names
  const languageNames: Record<string, string> = {
    en: t('languageSwitcher.en'),
    fi: t('languageSwitcher.fi'),
    ar: t('languageSwitcher.ar'),
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

  return (
    <div className="relative" ref={dropdownRef}>
      <Tooltip text={t('languageSwitcher.title')}>
        <button
          onClick={toggleDropdown}
          className={`flex items-center space-x-1 p-2 rounded-full ${getDropdownButtonClass()}`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="text-xl">{languageFlags[locale]}</span>
          <span className="material-symbols transform transition-transform">
            {isOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </Tooltip>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
          className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-40 rounded-lg ${theme === 'light' ? 'bg-white/90' : 'bg-black/90'} backdrop-blur-lg shadow-lg ring-1 ring-black/5 overflow-hidden z-50`}
        >
          <div className="py-2">
            {Object.keys(languageFlags).map((langCode) => (
              <button
                key={langCode}
                onClick={() => handleLanguageChange(langCode)}
                className={`flex items-center w-full px-4 py-2 text-sm ${
                  theme === 'light'
                    ? locale === langCode
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    : locale === langCode
                    ? 'bg-gray-800 text-blue-400'
                    : 'text-gray-300 hover:bg-gray-800'
                } transition-colors ${isRTL ? 'text-right' : 'text-left'} rtl:space-x-reverse`}
              >
                <span className="text-xl mr-2">{languageFlags[langCode]}</span>
                <span>{languageNames[langCode]}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}