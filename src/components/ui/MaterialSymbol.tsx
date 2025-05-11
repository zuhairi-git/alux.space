/**
 * MaterialSymbol component
 * 
 * This component wraps Material Symbols icons with proper RTL support.
 * It ensures that icons are displayed correctly regardless of text direction.
 */

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface MaterialSymbolProps {
  name: string;
  className?: string;
}

export default function MaterialSymbol({ name, className = '' }: MaterialSymbolProps) {
  const { isRTL } = useLanguage();
  
  // Apply specific RTL fixes if needed
  const rtlClass = isRTL ? 'rtl-icon' : '';
  
  return (
    <span className={`material-symbols ${rtlClass} ${className}`}>
      {name}
    </span>
  );
}
