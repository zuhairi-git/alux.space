'use client';

import React from 'react';
import Badge, { BadgeSize } from '@/components/ui/Badge';
import { SupportedLanguage } from '../types/podcast';

interface LanguageBadgeProps {
  language: SupportedLanguage;
  size?: BadgeSize;
  className?: string;
}

const languageLabels: Record<SupportedLanguage, string> = {
  en: 'EN',
  fi: 'FI',
};

const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  language,
  size = 'md',
  className = '',
}) => (
  <Badge variant="outline" size={size} className={className}>
    {languageLabels[language]}
  </Badge>
);

export default LanguageBadge;
