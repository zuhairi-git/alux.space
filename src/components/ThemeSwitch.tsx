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
    <div className="flex items-center p-1 rounded-full gap-1 border transition-colors duration-300 bg-[var(--card-from-bg)] border-[var(--card-border)]">
      {themes.map((t) => {
        const isActive = theme === t.value;
        return (
          <Tooltip key={t.value} text={t.label}>
            {/* eslint-disable-next-line design-system/no-raw-html-elements -- theme picker with Framer Motion layoutId pill indicator */}
            <button
              onClick={() => handleThemeChange(t.value as Theme)}
              className={`
                relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                ${!isActive && 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}
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
                      ? 'bg-[var(--btn-primary-bg)]' 
                      : theme === 'light'
                        ? 'bg-white'
                        : 'bg-ds-gray-700'
                    }
                  `}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`
                material-symbols text-[18px] relative z-10 
                ${isActive 
                  ? (t.value === 'colorful' ? 'text-white' : t.value === 'light' ? 'text-[var(--primary)]' : 'text-[var(--primary)]') 
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
