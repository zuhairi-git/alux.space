'use client';

import React, { ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface DirectionalContainerProps {
  children: ReactNode;
  className?: string;
  reversed?: boolean;
  preserveInRTL?: boolean;
}

/**
 * A container component that handles directional layout in RTL/LTR contexts
 * Automatically reverses flex direction in RTL mode unless specified otherwise
 */
export function DirectionalFlex({ 
  children, 
  className = '', 
  reversed = false,
  preserveInRTL = false 
}: DirectionalContainerProps) {
  const { isRTL } = useLanguage();
    // Determine flex direction
  let flexDirection = '';
  if (preserveInRTL) {
    // Keep the same direction regardless of RTL/LTR
    flexDirection = reversed ? 'flex-row-reverse' : 'flex-row';
  } else {
    // Automatically reverse in RTL mode to match reading direction
    const isReversed = isRTL ? !reversed : reversed;
    flexDirection = isReversed ? 'flex-row-reverse' : 'flex-row';
    if (isRTL) {
      flexDirection = reversed ? 'flex-row' : 'flex-row-reverse';
    } else {
      flexDirection = reversed ? 'flex-row-reverse' : 'flex-row';
    }
  }
  
  return (
    <div className={`flex ${flexDirection} ${className}`}>
      {children}
    </div>
  );
}

/**
 * A grid container that respects RTL direction
 */
export function DirectionalGrid({ 
  children, 
  className = '',
  reversed = false,
  preserveInRTL = false
}: DirectionalContainerProps) {
  const { isRTL } = useLanguage();
  
  // For grid, we might need to reverse the order of children in RTL mode
  const shouldReverseChildren = 
    (isRTL && !preserveInRTL && !reversed) || 
    (!isRTL && reversed) ||
    (isRTL && preserveInRTL && reversed);
  
  // Apply RTL-specific grid classes
  const rtlClass = isRTL && !preserveInRTL ? 'rtl:grid-flow-rtl' : '';
  
  return (
    <div className={`grid ${rtlClass} ${className}`}>
      {shouldReverseChildren 
        ? React.Children.toArray(children).reverse() 
        : children}
    </div>
  );
}

interface DirectionalIconProps {
  children: ReactNode;
  className?: string;
  flip?: boolean; // Whether to flip the icon in RTL mode
}

/**
 * A component for icons that may need to be flipped in RTL mode
 */
export function DirectionalIcon({ 
  children, 
  className = '', 
  flip = true 
}: DirectionalIconProps) {
  const { isRTL } = useLanguage();
  
  return (
    <span className={`${className} ${isRTL && flip ? 'rtl-flip' : ''}`}>
      {children}
    </span>
  );
}

interface DirectionalButtonProps {
  children: ReactNode;
  className?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  flipIcons?: boolean;
}

/**
 * A button component that handles proper RTL layout for text and icons
 */
export function DirectionalButton({ 
  children, 
  className = '', 
  iconStart, 
  iconEnd, 
  onClick,
  type = 'button',
  disabled = false,
  flipIcons = true
}: DirectionalButtonProps) {
  const { isRTL } = useLanguage();
  
  // We'll swap the icons in RTL mode to maintain semantic meaning
  const startIcon = isRTL ? iconEnd : iconStart;
  const endIcon = isRTL ? iconStart : iconEnd;
  
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && (
        <DirectionalIcon flip={flipIcons} className="mr-2">
          {startIcon}
        </DirectionalIcon>
      )}
      <span>{children}</span>
      {endIcon && (
        <DirectionalIcon flip={flipIcons} className="ml-2">
          {endIcon}
        </DirectionalIcon>
      )}
    </button>
  );
}
