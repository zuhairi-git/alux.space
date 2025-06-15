'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface DropdownPosition {
  horizontal: 'left' | 'right';
  vertical: 'top' | 'bottom';
}

interface UseScreenAwareDropdownProps {
  isOpen: boolean;
  dropdownWidth?: number;
  dropdownHeight?: number;
  offset?: number;
}

export function useScreenAwareDropdown<T extends HTMLElement = HTMLElement>({
  isOpen,
  dropdownWidth = 160, // Default width for language switcher
  dropdownHeight = 100, // Estimated height
  offset = 8
}: UseScreenAwareDropdownProps) {
  const buttonRef = useRef<T>(null);
  const [position, setPosition] = useState<DropdownPosition>({
    horizontal: 'right',
    vertical: 'bottom'
  });

  const calculatePosition = useCallback(() => {
    if (!buttonRef.current || !isOpen) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate horizontal position
    const spaceOnRight = viewportWidth - buttonRect.right;
    const spaceOnLeft = buttonRect.left;
    
    // Check if dropdown would overflow on the right
    const wouldOverflowRight = spaceOnRight < dropdownWidth + offset;
    // Check if there's enough space on the left
    const enoughSpaceOnLeft = spaceOnLeft >= dropdownWidth + offset;
    
    const horizontal: 'left' | 'right' = wouldOverflowRight && enoughSpaceOnLeft ? 'left' : 'right';

    // Calculate vertical position
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    
    // Check if dropdown would overflow below
    const wouldOverflowBelow = spaceBelow < dropdownHeight + offset;
    // Check if there's enough space above
    const enoughSpaceAbove = spaceAbove >= dropdownHeight + offset;
    
    const vertical: 'top' | 'bottom' = wouldOverflowBelow && enoughSpaceAbove ? 'top' : 'bottom';

    setPosition({ horizontal, vertical });
  }, [isOpen, dropdownWidth, dropdownHeight, offset]);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      
      // Recalculate on resize or scroll
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen, calculatePosition]);

  // Get CSS classes for positioning
  const getPositionClasses = () => {
    const classes = ['absolute'];
    
    // Horizontal positioning
    if (position.horizontal === 'left') {
      classes.push('right-0');
    } else {
      classes.push('left-0');
    }
    
    // Vertical positioning
    if (position.vertical === 'top') {
      classes.push('bottom-full', 'mb-2');
    } else {
      classes.push('top-full', 'mt-2');
    }
    
    return classes.join(' ');
  };
  // Get inline styles for more precise positioning if needed
  const getPositionStyles = () => {
    const styles: React.CSSProperties = {};
    
    if (!buttonRef.current) return styles;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const isMobile = viewportWidth <= 768;
    
    // For mobile devices, ensure dropdown doesn't go off-screen with better logic
    if (isMobile) {
      const spaceOnRight = viewportWidth - buttonRect.right;
      const spaceOnLeft = buttonRect.left;
      
      // If dropdown would overflow both sides, center it on the button
      if (spaceOnRight < dropdownWidth && spaceOnLeft < dropdownWidth) {
        const buttonCenter = buttonRect.left + (buttonRect.width / 2);
        const dropdownHalfWidth = dropdownWidth / 2;
        
        // Check if centering would still overflow
        if (buttonCenter - dropdownHalfWidth < 16) {
          // Align to left edge with padding
          styles.left = '16px';
          styles.right = 'auto';
          styles.transform = 'none';
        } else if (buttonCenter + dropdownHalfWidth > viewportWidth - 16) {
          // Align to right edge with padding
          styles.right = '16px';
          styles.left = 'auto';
          styles.transform = 'none';
        } else {
          // Center on button
          styles.left = '50%';
          styles.right = 'auto';
          styles.transform = 'translateX(-50%)';
        }
      }
      
      // Add max-width for very small screens
      if (viewportWidth < 480) {
        styles.maxWidth = `${viewportWidth - 32}px`;
      }
    }
    
    // Ensure dropdown doesn't go beyond viewport edges
    if (position.horizontal === 'right') {
      const rightEdge = buttonRect.right + dropdownWidth;
      if (rightEdge > viewportWidth - 16) {
        styles.right = '0';
        styles.left = 'auto';
      }
    }
    
    return styles;
  };

  return {
    buttonRef,
    position,
    getPositionClasses,
    getPositionStyles
  };
}
