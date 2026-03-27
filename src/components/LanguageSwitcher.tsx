'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import Tooltip from './ui/Tooltip';
import { LiveRegion } from './ui/LiveRegion';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { theme } = useTheme();
  const [announcement, setAnnouncement] = useState('');

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fi' : 'en';
    setLocale(newLocale);
    setAnnouncement(`Language changed to ${newLocale === 'en' ? 'English' : 'Finnish'}`);
  };

  return (
    <>
      <Tooltip text={locale === 'en' ? 'Switch to Finnish' : 'Switch to English'}>
        {/* eslint-disable-next-line design-system/no-raw-html-elements -- animated language toggle with AnimatePresence and custom round styling */}
        <button
          onClick={toggleLanguage}
          className={`
            relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 font-bold text-sm
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            ${theme === 'colorful' 
              ? 'bg-purple-900/20 text-purple-200 hover:bg-purple-900/40 hover:text-white' 
              : theme === 'light'
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }
          `}
          aria-label={locale === 'en' ? 'Switch to Finnish' : 'Switch to English'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={locale}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {locale.toUpperCase()}
            </motion.span>
          </AnimatePresence>
        </button>
      </Tooltip>
      <LiveRegion message={announcement} priority="polite" />
    </>
  );
}
