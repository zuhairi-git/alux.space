'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon';

export default function TranslationBadge() {
  const { locale } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  // Only show on Finnish pages - moved after all hooks
  if (locale !== 'fi') {
    return null;
  }

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150); // Small delay to prevent flickering
  };

  const handleTouchStart = () => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    touchTimeoutRef.current = setTimeout(() => {
      setIsTouched(false);
    }, 2000); // Show for 2 seconds on mobile after touch
  };

  // Check if badge should be expanded (either hovered on desktop or touched on mobile)
  const isExpanded = isHovered || isTouched;

  const badgeStyles = 'bg-[var(--badge-overlay-bg)] backdrop-blur-sm text-white border border-[var(--badge-overlay-border)]';
  return (
    <div 
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={`
          flex items-center justify-center
          ${badgeStyles}
          text-sm font-medium
          transition-all duration-300 ease-out
          cursor-default
          shadow-lg
          ${isExpanded 
            ? 'px-4 py-2 rounded-full min-w-[160px]' 
            : 'w-10 h-10 rounded-full'
          }
        `}
      >
        {isExpanded ? (
          <span className="whitespace-nowrap flex items-center gap-2">
            <Icon name="auto_awesome" size="sm" />
            Translated with AI
          </span>
        ) : (
          <Icon name="auto_awesome" size="sm" />
        )}
      </div>
    </div>
  );
}
