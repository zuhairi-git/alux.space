'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg 
                      ${isLight ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'}
                      transition-all duration-300`}
          aria-label="Back to top"
        >
          <div className="relative">
            <span className="material-symbols text-2xl">arrow_upward</span>
            
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
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop; 