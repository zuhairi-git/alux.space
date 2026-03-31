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
              ? 'bg-primary/20 text-accent hover:bg-primary/40 hover:text-foreground' 
              : theme === 'light'
                ? 'bg-ds-gray-100 text-ds-gray-700 hover:bg-ds-gray-200 hover:text-ds-gray-900'
                : 'bg-ds-gray-800 text-ds-gray-300 hover:bg-ds-gray-700 hover:text-white'
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
