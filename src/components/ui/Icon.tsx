'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface IconProps {
  name: string;
  className?: string;
}

/**
 * Icon component
 * 
 * This component handles Material Symbols icons.
 */
export default function Icon({ name, className = '' }: IconProps) {
  const { locale } = useLanguage();
  
  return (
    <span className={`material-symbols ${className}`}>
      {name}
    </span>
  );
}
