'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from '@headlessui/react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { useTheme } from '@/context/ThemeContext';
import Tooltip from './ui/Tooltip';
import { LiveRegion } from './ui/LiveRegion';
import { i18n } from '@/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { theme } = useTheme();
  const { t } = useTranslations(locale);
  const [announcement, setAnnouncement] = useState('');

  // Language configurations with flags and labels
  const languages = [
    { code: 'en', flag: '🇬🇧', label: 'English', shortLabel: 'EN' },
    { code: 'fi', flag: '🇫🇮', label: 'Suomi', shortLabel: 'FI' }
  ] as const;

  // Get current language
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  // Get theme-specific styling for dropdown button
  const getButtonStyles = () => {
    switch (theme) {
      case 'light':
        return 'bg-white/50 hover:bg-white/70 border border-gray-200/50 text-gray-700 hover:text-primary';
      case 'dark':
        return 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-600/50 text-gray-300 hover:text-white';
      case 'colorful':
        return 'bg-purple-900/20 hover:bg-purple-900/30 border border-purple-200/30 text-gray-300 hover:text-white';
      default:
        return 'bg-white/50 hover:bg-white/70 border border-gray-200/50 text-gray-700 hover:text-primary';
    }
  };

  // Get theme-specific styling for dropdown menu
  const getMenuStyles = () => {
    switch (theme) {
      case 'light':
        return 'bg-white/95 border border-gray-200';
      case 'dark':
        return 'bg-gray-900/95 border border-gray-700';
      case 'colorful':
        return 'bg-purple-900/95 border border-purple-700';
      default:
        return 'bg-white/95 border border-gray-200';
    }
  };

  // Get theme-specific styling for menu items
  const getItemStyles = (isActive: boolean = false) => {
    const baseClasses = 'transition-all duration-200';
    switch (theme) {
      case 'light':
        return `${baseClasses} ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`;
      case 'dark':
        return `${baseClasses} ${isActive ? 'bg-blue-900/20 text-blue-400' : 'text-gray-300 hover:bg-gray-800'}`;
      case 'colorful':
        return `${baseClasses} ${isActive ? 'bg-purple-500/20 text-purple-300' : 'text-gray-300 hover:bg-purple-800/30'}`;
      default:
        return `${baseClasses} ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`;
    }
  };

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    const selectedLanguage = languages.find(lang => lang.code === newLocale);
    if (selectedLanguage) {
      setAnnouncement(`Language changed to ${selectedLanguage.label}`);
    }
  };  return (
    <>
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Tooltip text={`Current language: ${currentLanguage.label}`}>
              <Menu.Button
                className={`flex items-center gap-2 py-2 px-3 rounded-lg ${getButtonStyles()} backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Current language flag and code */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg leading-none">{currentLanguage.flag}</span>
                    <span className="text-sm font-medium">{currentLanguage.shortLabel}</span>
                  </div>
                  
                  {/* Dropdown arrow */}
                  <motion.span
                    className="material-symbols text-sm"
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    expand_more
                  </motion.span>
                </motion.div>
              </Menu.Button>
            </Tooltip>

            {/* Dropdown menu */}
            <AnimatePresence>
              {open && (                <Menu.Items
                  as={motion.div}
                  static
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`absolute top-full right-0 mt-2 w-40 ${getMenuStyles()} backdrop-blur-lg shadow-lg rounded-lg overflow-hidden z-50 focus:outline-none`}
                  style={{
                    transition: 'all 0.2s ease-out'
                  }}
                >
                  <div className="p-1">
                    {languages.map((language, index) => (
                      <Menu.Item key={language.code}>
                        {({ active }) => (
                          <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            onClick={() => handleLanguageChange(language.code)}
                            className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg ${getItemStyles(locale === language.code)} focus:outline-none transition-all duration-200`}
                          >
                            {/* Language flag */}
                            <span className="text-base leading-none">{language.flag}</span>
                            
                            {/* Language info */}
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{language.label}</span>
                              <span className="text-xs opacity-60">{language.shortLabel}</span>
                            </div>
                            
                            {/* Selected indicator */}
                            {locale === language.code && (
                              <motion.span
                                className="material-symbols text-sm ml-auto text-primary"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                              >
                                check
                              </motion.span>
                            )}
                          </motion.button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
      <LiveRegion message={announcement} priority="polite" />
    </>
  );
}