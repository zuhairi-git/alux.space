'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SupportedLanguage } from '../types/podcast';

interface LanguageBadgeProps {
  language: SupportedLanguage;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({ 
  language, 
  size = 'md',
  className = '' 
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-1.5 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1.5 text-sm';
      default:
        return 'px-2 py-1 text-xs';
    }
  };

  const getThemeClasses = () => {
    if (isLight) {
      return 'bg-gray-100 text-gray-800 border border-gray-300';
    } else if (isColorful) {
      return 'bg-purple-500/20 text-purple-300 border border-purple-500/40';
    } else {
      return 'bg-gray-700/50 text-gray-300 border border-gray-600';
    }
  };

  const languageLabels: Record<SupportedLanguage, string> = {
    en: 'EN',
    fi: 'FI'
  };

  return (
    <span 
      className={`
        inline-flex items-center justify-center 
        rounded-full font-medium uppercase tracking-wide
        ${getSizeClasses()}
        ${getThemeClasses()}
        ${className}
      `}
    >
      {languageLabels[language]}
    </span>
  );
};

export default LanguageBadge;
