'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { LiveRegion } from './LiveRegion';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Get localized text
  const getLocalizedText = () => {
    switch(locale) {
      case 'fi':
        return {
          label: 'Takaisin ylös',
          announcement: 'Siirretty sivun alkuun'
        };
      default:
        return {
          label: 'Back to top',
          announcement: 'Scrolled to top of page'
        };
    }
  };

  const text = getLocalizedText();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Announce to screen readers
    setAnnouncement(text.announcement);
    
    // Clear announcement after a delay
    setTimeout(() => setAnnouncement(''), 1000);
  };

  // Handle keyboard interaction
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            whileFocus={{ scale: 1.1 }}
            className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg 
                        ${isLight ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'}
                        transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50 focus:ring-offset-2`}
            aria-label={text.label}
            title={text.label}
            type="button"
          >
            <div className="relative">
              <span className="material-symbols text-2xl" aria-hidden="true">arrow_upward</span>
              
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-30 bg-white"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      
      <LiveRegion message={announcement} priority="polite" />
    </>
  );
};

export default BackToTop;