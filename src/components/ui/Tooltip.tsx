'use client';

import React, { useRef, useState, useEffect } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, className = '' }) => {
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current || !tooltipRef.current) return;
      
      // Check if RTL mode is active
      const isRTL = document.documentElement.dir === 'rtl';
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Default is top
      let newPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
      
      // Check if tooltip would go off the top
      if (containerRect.top - tooltipRect.height < 0) {
        newPosition = 'bottom';
      }
      
      // Check if tooltip would go off the bottom
      if (newPosition === 'bottom' && containerRect.bottom + tooltipRect.height > viewportHeight) {
        // Try left or right, accounting for RTL mode
        if (isRTL) {
          // In RTL mode, swap left and right logic
          if (containerRect.right + tooltipRect.width < viewportWidth) {
            newPosition = 'right';
          } else if (containerRect.left - tooltipRect.width > 0) {
            newPosition = 'left';
          }
        } else {
          // Normal LTR behavior
          if (containerRect.left - tooltipRect.width > 0) {
            newPosition = 'left';
          } else if (containerRect.right + tooltipRect.width < viewportWidth) {
            newPosition = 'right';
          }
        }
      }
      
      setPosition(newPosition);
    };

    // Update on mount
    updatePosition();
    
    // Update on window resize
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);
  const getPositionClasses = () => {
    // Get RTL state from the document
    const isRTL = document.documentElement.dir === 'rtl';
    
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        // Swap left and right in RTL mode
        return isRTL ? 'left-full top-1/2 -translate-y-1/2 ml-2' : 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        // Swap left and right in RTL mode
        return isRTL ? 'right-full top-1/2 -translate-y-1/2 mr-2' : 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };
  // Get RTL state from the document
  const isRTL = typeof document !== 'undefined' ? document.documentElement.dir === 'rtl' : false;
  
  return (
    <div ref={containerRef} className={`relative inline-block group ${className}`}>
      {children}
      <div 
        ref={tooltipRef}
        className={`absolute ${getPositionClasses()} px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 rtl:dir-rtl`}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip; 