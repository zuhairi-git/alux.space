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
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    const selectedTheme = themes.find(t => t.value === newTheme);
    if (selectedTheme) {
      setAnnouncement(`Theme changed to ${selectedTheme.label}`);
    }
  };
  return (
    <>
      <RadioGroup value={theme} onChange={handleThemeChange} className="flex items-center space-x-2">
        <RadioGroup.Label className="sr-only">Choose theme</RadioGroup.Label>
        {themes.map((themeOption) => (
          <RadioGroup.Option
            key={themeOption.value}
            value={themeOption.value}
            className="focus:outline-none"
          >
            {({ checked }) => (
              <Tooltip text={themeOption.label}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-8 h-8 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                    checked 
                      ? 'bg-primary-glow text-primary' 
                      : 'bg-transparent text-gray-400 hover:text-gray-300'
                  }`}
                  role="button"
                  aria-label={themeOption.label}
                >
                  <span className="material-symbols material-symbols-rounded text-xl">
                    {themeOption.icon}
                  </span>
                  {checked && (
                    <motion.span
                      layoutId="theme-indicator"
                      className="absolute inset-0 rounded-full border border-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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