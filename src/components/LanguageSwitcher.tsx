'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslations } from '@/hooks/useTranslations';
import { i18n, getLocaleConfig } from '@/i18n';
import Tooltip from './ui/Tooltip';
import { LiveRegion } from './ui/LiveRegion';

/**
 * Language picker.
 *
 * A menu rather than a two-way toggle: the site is built for an arbitrary
 * number of locales, and a toggle can only ever express two. Each language is
 * labelled with its own endonym ("Suomi", "العربية") because that is what a
 * speaker scanning for their language actually looks for.
 */
export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { theme } = useTheme();
  const { t } = useTranslations(locale);
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeConfig = getLocaleConfig(locale);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // Move focus into the menu so keyboard users aren't stranded on the trigger.
  useEffect(() => {
    if (open) {
      const activeIndex = Math.max(0, i18n.locales.indexOf(locale));
      itemRefs.current[activeIndex]?.focus();
    }
  }, [open, locale]);

  const choose = (next: string) => {
    setOpen(false);
    triggerRef.current?.focus();
    if (next === locale) return;

    setLocale(next);
    setAnnouncement(`Language changed to ${getLocaleConfig(next).englishLabel}`);
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();

    const delta = event.key === 'ArrowDown' ? 1 : -1;
    const count = i18n.locales.length;
    const next = (index + delta + count) % count;
    itemRefs.current[next]?.focus();
  };

  const triggerStyles =
    theme === 'colorful'
      ? 'bg-primary/20 text-accent hover:bg-primary/40 hover:text-foreground'
      : theme === 'light'
        ? 'bg-ds-gray-100 text-ds-gray-700 hover:bg-ds-gray-200 hover:text-ds-gray-900'
        : 'bg-ds-gray-800 text-ds-gray-300 hover:bg-ds-gray-700 hover:text-white';

  const menuStyles =
    theme === 'light' ? 'bg-white border-ds-gray-200' : 'bg-ds-gray-900 border-ds-gray-700';

  return (
    <>
      <div ref={containerRef} className="relative">
        <Tooltip text={t('languageSwitcher.title')}>
          {/* eslint-disable-next-line design-system/no-raw-html-elements -- animated language menu trigger with AnimatePresence and custom round styling */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={`${t('languageSwitcher.title')}: ${activeConfig.englishLabel}`}
            className={`
              relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 font-bold text-sm
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              ${triggerStyles}
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={locale}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {locale.toUpperCase()}
              </motion.span>
            </AnimatePresence>
          </button>
        </Tooltip>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              aria-label={t('languageSwitcher.title')}
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className={`absolute end-0 top-full mt-2 min-w-[10rem] overflow-hidden rounded-xl border shadow-lg z-50 ${menuStyles}`}
            >
              {i18n.locales.map((code, index) => {
                const config = getLocaleConfig(code);
                const isActive = code === locale;

                return (
                  // eslint-disable-next-line design-system/no-raw-html-elements -- menu item inside a custom popover
                  <button
                    key={code}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    lang={config.htmlLang}
                    onClick={() => choose(code)}
                    onKeyDown={(event) => handleMenuKeyDown(event, index)}
                    className={`
                      flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm text-start transition-colors
                      focus:outline-none focus:bg-primary/10
                      ${isActive
                        ? 'font-semibold text-[var(--primary)] bg-primary/5'
                        : theme === 'light'
                          ? 'text-ds-gray-700 hover:bg-ds-gray-100'
                          : 'text-ds-gray-300 hover:bg-ds-gray-800'
                      }
                    `}
                  >
                    <span dir={config.dir}>{config.label}</span>
                    <span className="text-xs opacity-60">{code.toUpperCase()}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <LiveRegion message={announcement} priority="polite" />
    </>
  );
}
