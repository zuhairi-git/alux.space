'use client';

import React, { ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface RTLTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * A component that handles proper text display in both RTL and LTR contexts
 * This ensures numbers appear correctly in RTL text and handles bidirectional
 * text issues properly.
 */
export default function RTLText({ children, className = '' }: RTLTextProps) {
  const { isRTL } = useLanguage();
  
  return (
    <span 
      className={`${className} ${isRTL ? 'font-arabic' : ''}`} 
      style={isRTL ? { 
        // These styles help with bidirectional text in RTL languages
        unicodeBidi: 'isolate', 
        direction: 'rtl',
      } : {}}
    >
      {children}
    </span>
  );
}

/**
 * A component that preserves LTR direction for numbers within RTL text
 * This ensures numbers are displayed left-to-right even in RTL context
 */
export function RTLNumber({ children, className = '' }: RTLTextProps) {
  const { isRTL } = useLanguage();
  
  if (!isRTL) {
    // In LTR context, just render normally
    return <span className={className}>{children}</span>
  }
  
  return (
    <span className={className} style={{ 
      direction: 'ltr', 
      unicodeBidi: 'isolate',
      display: 'inline-block',
    }}>
      {children}
    </span>
  );
}
