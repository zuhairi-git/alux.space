'use client';

import React, { useRef, useState, useEffect } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, className = '', id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipId = id || `tooltip-${Math.random().toString(36).substr(2, 9)}`;  

  useEffect(() => {
    // Detect mobile devices (pointer: coarse covers most touch devices)
    const checkMobile = () => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        setIsMobile(window.matchMedia('(pointer: coarse)').matches);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      if (!containerRef.current || !tooltipRef.current) return;
      
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
        // Try left or right
        if (containerRect.left - tooltipRect.width > 0) {
          newPosition = 'left';
        } else if (containerRect.right + tooltipRect.width < viewportWidth) {
          newPosition = 'right';
        }
      }
      
      setPosition(newPosition);
    };

    // Update on mount and when tooltip becomes visible
    if (isVisible) {
      updatePosition();
    }
    
    // Update on window resize
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [isVisible]);

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isVisible) {
      setIsVisible(false);
    }
  };
  const showTooltip = () => {
    if (!isMobile) setIsVisible(true);
  };
  const hideTooltip = () => setIsVisible(false);
  
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };
  return (
    <div 
      ref={containerRef} 
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onKeyDown={handleKeyDown}
    >
      {/* Enhanced children with proper ARIA attributes */}
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
            'aria-describedby': isVisible && !isMobile ? tooltipId : undefined,
            'aria-expanded': isVisible && !isMobile
          });
        }
        return child;
      })}
      {/* Tooltip with enhanced accessibility */}
      {!isMobile && (
        <div 
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          aria-hidden={!isVisible}
          className={`absolute ${getPositionClasses()} px-3 py-2 bg-gray-900 text-white text-sm rounded-md pointer-events-none transition-all duration-200 z-50 max-w-xs ${
            isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}
        >
          {text}
          {/* Add arrow indicator */}
          <div 
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${getArrowPositionClasses(position)}`}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

// Helper function for arrow positioning
const getArrowPositionClasses = (position: string) => {
  switch (position) {
    case 'top':
      return 'bottom-[-4px] left-1/2 -translate-x-1/2';
    case 'bottom':
      return 'top-[-4px] left-1/2 -translate-x-1/2';
    case 'left':
      return 'right-[-4px] top-1/2 -translate-y-1/2';
    case 'right':
      return 'left-[-4px] top-1/2 -translate-y-1/2';
    default:
      return 'bottom-[-4px] left-1/2 -translate-x-1/2';
  }
};

export default Tooltip;
