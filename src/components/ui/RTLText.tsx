'use client';

import React, { ReactNode, ElementType } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface RTLTextProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  forceLTR?: boolean;
  forceRTL?: boolean;
  preserveSpaces?: boolean;
}

/**
 * A component that handles proper text display in both RTL and LTR contexts
 * This ensures text appears correctly in RTL/LTR contexts and handles bidirectional
 * text issues properly.
 */
export default function RTLText({ 
  children, 
  className = '', 
  as: Component = 'span',
  forceLTR = false,
  forceRTL = false,
  preserveSpaces = false
}: RTLTextProps) {
  const { isRTL } = useLanguage();
  
  // Determine text direction
  const shouldUseRTL = forceRTL || (isRTL && !forceLTR);
  const fontClass = shouldUseRTL ? 'font-arabic' : '';
  
  // Preserve spaces in text for cases where whitespace is important
  const whiteSpaceStyle = preserveSpaces ? { whiteSpace: 'pre-wrap' } : {};
    return (
    <Component 
      className={`${className} ${fontClass} ${shouldUseRTL ? 'rtl-text' : ''}`} 
      style={{
        // These styles help with bidirectional text in RTL languages
        textAlign: shouldUseRTL ? 'right' : 'inherit',
        unicodeBidi: shouldUseRTL ? 'isolate' : 'normal', 
        direction: shouldUseRTL ? 'rtl' : 'inherit',
        ...whiteSpaceStyle
      }}
    >
      {children}
    </Component>
  );
}

/**
 * A component that preserves LTR direction for numbers within RTL text
 * This ensures numbers are displayed left-to-right even in RTL context
 */
export function RTLNumber({ 
  children, 
  className = '',
  as: Component = 'span'  
}: RTLTextProps) {
  const { isRTL } = useLanguage();
  
  if (!isRTL) {
    // In LTR context, just render normally
    return <Component className={className}>{children}</Component>
  }
  
  return (
    <Component className={className} style={{ 
      direction: 'ltr', 
      unicodeBidi: 'isolate',
      display: 'inline-block',
    }}>
      {children}
    </Component>
  );
}

/**
 * A component that ensures proper RTL formatting for dates
 * Dates should typically be displayed in the correct format for the locale
 */
export function RTLDate({ 
  children, 
  className = '', 
  as: Component = 'time',
  dateTime
}: RTLTextProps & { dateTime?: string }) {
  const { isRTL } = useLanguage();
  
  return (
    <Component 
      className={className} 
      dateTime={dateTime}
      style={{ 
        direction: 'ltr', 
        unicodeBidi: 'isolate',
        // In RTL layouts, we want dates to be displayed with proper spacing
        padding: isRTL ? '0 0.25rem' : undefined,
        display: 'inline-block',
      }}
    >
      {children}
    </Component>
  );
}

/**
 * A component that ensures proper direction for icons in RTL context
 * Some icons need to be flipped in RTL mode to maintain their meaning
 */
export function RTLIcon({ 
  children, 
  className = '',
  flip = true
}: RTLTextProps & { flip?: boolean }) {
  const { isRTL } = useLanguage();
  
  return (
    <span className={`${className} ${isRTL && flip ? 'rtl-flip' : ''}`}>
      {children}
    </span>
  );
}
