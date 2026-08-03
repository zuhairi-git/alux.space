'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { useTranslations } from '@/hooks/useTranslations';

/**
 * Discloses that the current language is machine-translated.
 *
 * Which locales get the badge comes from `machineTranslated` in src/i18n.ts,
 * so a new language declares its own status instead of being hard-coded here.
 */
export default function TranslationBadge() {
  const { locale, config } = useLanguage();
  const { t } = useTranslations(locale);
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

  // Placed after all hooks so hook order stays stable across locales.
  if (!config.machineTranslated) {
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
            {t('translationBadge.machineTranslated')}
          </span>
        ) : (
          <Icon name="auto_awesome" size="sm" />
        )}
      </div>
    </div>
  );
}
