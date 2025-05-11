'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getRTLAwareIconName, getIconRTLClass, shouldFlipIconInRTL } from '@/utils/rtlIcon';

interface IconProps {
  name: string;
  className?: string;
  flipInRTL?: boolean; // Override default flip behavior
}

/**
 * RTL-aware Icon component
 * 
 * This component handles Material Symbols icons with proper RTL support.
 * It automatically handles icon direction and displays correctly in both LTR and RTL modes.
 */
export default function Icon({ name, className = '', flipInRTL }: IconProps) {
  const { locale, isRTL } = useLanguage();
  
  // Determine if icon should be flipped (either explicitly set or determined automatically)
  const shouldFlip = flipInRTL !== undefined ? flipInRTL : shouldFlipIconInRTL(name);
  
  // Get RTL-aware icon name
  const iconName = shouldFlip ? getRTLAwareIconName(name, locale) : name;
  
  // Apply appropriate RTL classes
  const iconClasses = getIconRTLClass(locale, className);
  
  return (
    <span className={iconClasses}>
      {iconName}
    </span>
  );
}
