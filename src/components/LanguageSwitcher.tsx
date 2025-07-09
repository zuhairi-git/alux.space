'use client';

import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useScreenAwareDropdown } from '@/hooks/useScreenAwareDropdown';
import Tooltip from './ui/Tooltip';
import { LiveRegion } from './ui/LiveRegion';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { theme } = useTheme();
  const [announcement, setAnnouncement] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // Screen-aware dropdown positioning
  const { buttonRef, getPositionClasses, getPositionStyles } = useScreenAwareDropdown<HTMLButtonElement>({
    isOpen,
    dropdownWidth: 160,
    dropdownHeight: 100,
    offset: 8
  });

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
        return 'bg-white border border-gray-200';
      case 'dark':
        return 'bg-gray-900 border border-gray-700';
      case 'colorful':
        return 'bg-purple-900 border border-purple-700';
      default:
        return 'bg-white border border-gray-200';
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
        {({ open }) => {
          // Update open state for screen-aware positioning
          if (open !== isOpen) {
            setIsOpen(open);
          }
          
          return (
            <>
              <Tooltip text={`Current language: ${currentLanguage.label}`}>
                <Menu.Button
                  ref={buttonRef}
                  className={`flex items-center gap-2 py-2 px-3 rounded-lg ${getButtonStyles()} backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                >
                <div className="flex items-center">
                  {/* Current language code only */}
                  <span className="text-sm font-medium">{currentLanguage.shortLabel}</span>
                </div>
              </Menu.Button>
            </Tooltip>            {/* Dropdown menu */}
              {open && (
                <Menu.Items
                  className={`${getPositionClasses()} w-40 dropdown-screen-aware dropdown-mobile-responsive ${getMenuStyles()} shadow-lg rounded-lg overflow-hidden z-[70] focus:outline-none`}
                  style={getPositionStyles()}
                >
                  <div className="p-1">                    {languages.map((language) => (
                      <Menu.Item key={language.code}>
                        {() => (
                          <button
                            onClick={() => handleLanguageChange(language.code)}
                            className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg ${getItemStyles(locale === language.code)} focus:outline-none transition-all duration-200`}
                          >
                            {/* Language info */}
                            <div className="flex flex-col items-start">
                              <span className="font-medium">{language.label}</span>
                              <span className="text-xs opacity-60">{language.shortLabel}</span>
                            </div>
                            
                            {/* Selected indicator */}
                            {locale === language.code && (
                              <span className="material-symbols text-sm ml-auto text-primary">
                                check
                              </span>
                            )}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              )}
          </>
        );
        }}
      </Menu>
      <LiveRegion message={announcement} priority="polite" />
    </>
  );
}