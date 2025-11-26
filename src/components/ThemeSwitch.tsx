'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import type { Theme } from '@/context/ThemeContext';
import Tooltip from './ui/Tooltip';
import { LiveRegion } from './ui/LiveRegion';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [announcement, setAnnouncement] = useState('');

  const themes = [
    { value: 'light', label: 'Light', icon: 'light_mode' },
    { value: 'dark', label: 'Dark', icon: 'dark_mode' },
    { value: 'colorful', label: 'Colorful', icon: 'palette' }
  ] as const;

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setAnnouncement(`Theme changed to ${newTheme}`);
  };

  return (
    <div className={`
      flex items-center p-1 rounded-full gap-1 border transition-colors duration-300
      ${theme === 'colorful' 
        ? 'bg-purple-900/20 border-purple-500/30' 
        : theme === 'light'
          ? 'bg-gray-100 border-gray-200'
          : 'bg-gray-800/50 border-gray-700'
      }
    `}>
      {themes.map((t) => {
        const isActive = theme === t.value;
        return (
          <Tooltip key={t.value} text={t.label}>
            <button
              onClick={() => handleThemeChange(t.value as Theme)}
              className={`
                relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                ${!isActive && (theme === 'colorful' ? 'text-purple-300 hover:text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200')}
              `}
              aria-label={`Switch to ${t.label} theme`}
              aria-pressed={isActive}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTheme"
                  className={`
                    absolute inset-0 rounded-full shadow-sm
                    ${theme === 'colorful' 
                      ? 'bg-purple-600' 
                      : theme === 'light'
                        ? 'bg-white'
                        : 'bg-gray-700'
                    }
                  `}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`
                material-symbols text-[18px] relative z-10 
                ${isActive 
                  ? (t.value === 'colorful' ? 'text-white' : t.value === 'light' ? 'text-orange-500' : 'text-blue-400') 
                  : ''
                }
              `}>
                {t.icon}
              </span>
            </button>
          </Tooltip>
        );
      })}
      <LiveRegion message={announcement} priority="polite" />
    </div>
  );
}
