'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadioGroup } from '@headlessui/react';
import { useTheme } from '@/context/ThemeContext';
import type { Theme } from '@/context/ThemeContext';
import Tooltip from './ui/Tooltip';
import { LiveRegion } from './ui/LiveRegion';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [announcement, setAnnouncement] = useState('');
  const themes = [
    { value: 'light', label: 'Light Theme', icon: 'light_mode' },
    { value: 'dark', label: 'Dark Theme', icon: 'dark_mode' },
    { value: 'colorful', label: 'Colorful Theme', icon: 'palette' }
  ] as const;

  // Get theme-specific styling for selected state
  const getSelectedStyles = (themeValue: Theme) => {
    switch (themeValue) {
      case 'light':
        return 'bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 text-white shadow-lg shadow-yellow-500/30';
      case 'dark':
        return 'bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white shadow-lg shadow-slate-500/30';
      case 'colorful':
        return 'bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30';
      default:
        return 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg';
    }
  };

  // Get unselected theme styling
  const getUnselectedStyles = (currentTheme: Theme) => {
    const baseClasses = 'border-2 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200';
    switch (currentTheme) {
      case 'light':
        return `${baseClasses} border-gray-200 bg-white/50 hover:bg-white/70`;
      case 'dark':
        return `${baseClasses} border-gray-600 bg-gray-800/50 hover:bg-gray-800/70 text-gray-400 hover:text-gray-200 hover:border-gray-500`;
      case 'colorful':
        return `${baseClasses} border-purple-200/30 bg-purple-900/20 hover:bg-purple-900/30 text-gray-300 hover:text-white hover:border-purple-300/50`;
      default:
        return baseClasses;
    }
  };
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    const selectedTheme = themes.find(t => t.value === newTheme);
    if (selectedTheme) {
      setAnnouncement(`Theme changed to ${selectedTheme.label}`);
    }
  };  return (
    <>
      <RadioGroup value={theme} onChange={handleThemeChange} className="flex items-center space-x-3">
        <RadioGroup.Label className="sr-only">Choose theme</RadioGroup.Label>
        {themes.map((themeOption) => (
          <RadioGroup.Option
            key={themeOption.value}
            value={themeOption.value}
            className="focus:outline-none"
          >
            {({ checked }) => (
              <Tooltip text={themeOption.label}>                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-12 h-12 md:w-10 md:h-10 flex items-center justify-center rounded-lg cursor-pointer overflow-hidden ${
                    checked 
                      ? getSelectedStyles(themeOption.value as Theme)
                      : getUnselectedStyles(theme)
                  }`}
                  role="button"
                  aria-label={themeOption.label}
                  aria-pressed={checked}
                >
                  {/* Background gradient animation for selected state */}
                  {checked && (
                    <motion.div
                      layoutId="theme-bg-gradient"
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.3) 100%)',
                        backgroundSize: '200% 200%'
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
                    {/* Icon with enhanced animations */}
                  <motion.span 
                    className="material-symbols material-symbols-rounded text-xl md:text-lg relative z-10"
                    animate={checked ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    {themeOption.icon}
                  </motion.span>
                  
                  {/* Selection indicator - subtle inner glow */}
                  {checked && (
                    <motion.div
                      layoutId="theme-selection-glow"
                      className="absolute inset-1 rounded-lg border border-white/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                  
                  {/* Pulse effect for active theme */}
                  {checked && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: themeOption.value === 'light' 
                          ? 'rgba(251, 191, 36, 0.3)' 
                          : themeOption.value === 'dark'
                          ? 'rgba(71, 85, 105, 0.3)'
                          : 'rgba(147, 51, 234, 0.3)'
                      }}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.1, 0.3],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              </Tooltip>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
      <LiveRegion message={announcement} priority="polite" />
    </>
  );
}