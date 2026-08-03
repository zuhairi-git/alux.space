'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Icon from '@/components/ui/Icon';
import { LiveRegion } from '@/components/ui/LiveRegion';
import { useAnalyticsTracking } from '../../../seo/AnalyticsProvider';

export type HomeDesign = 'classic' | 'modern';

interface HomeDesignSwitchProps {
  design: HomeDesign;
  onChange: (design: HomeDesign) => void;
}

/**
 * Floating segmented control that flips the homepage between the
 * classic design and the modern profile-first design. The choice is
 * persisted by the HomePage wrapper (localStorage `home-design`).
 *
 * Positioned bottom-start so it never collides with BackToTop
 * (bottom-end) or the mobile dock (raised above it on small screens).
 */
export default function HomeDesignSwitch({ design, onChange }: HomeDesignSwitchProps) {
  const { locale } = useLanguage();
  const { trackEvent } = useAnalyticsTracking();
  const [announcement, setAnnouncement] = useState('');

  const isFi = locale === 'fi';

  const options: { value: HomeDesign; label: string; ariaLabel: string; icon: string }[] = [
    {
      value: 'classic',
      label: isFi ? 'Klassinen' : 'Classic',
      ariaLabel: isFi ? 'Vaihda klassiseen ulkoasuun' : 'Switch to the classic look',
      icon: 'history',
    },
    {
      value: 'modern',
      label: isFi ? 'Uusi ilme' : 'New look',
      ariaLabel: isFi ? 'Vaihda uuteen ulkoasuun' : 'Switch to the new look',
      icon: 'auto_awesome',
    },
  ];

  const handleChange = (next: HomeDesign) => {
    if (next === design) return;
    onChange(next);
    trackEvent('home_design_switch', 'homepage', next);
    setAnnouncement(
      isFi
        ? `Etusivun ulkoasu vaihdettu: ${next === 'modern' ? 'uusi ilme' : 'klassinen'}`
        : `Homepage design switched to ${next === 'modern' ? 'the new look' : 'the classic look'}`
    );
  };

  return (
    <div
      className="fixed bottom-24 start-4 md:bottom-8 md:start-8 z-30"
      role="group"
      aria-label={isFi ? 'Etusivun ulkoasun valinta' : 'Homepage design picker'}
    >
      <div className="flex items-center gap-1 p-1 rounded-full border shadow-lg shadow-black/10 backdrop-blur-xl bg-[var(--nav-bg)] border-[var(--nav-border)]">
        {options.map((option) => {
          const isActive = design === option.value;
          return (
            /* eslint-disable-next-line design-system/no-raw-html-elements -- segmented pill toggle, same pattern as ThemeSwitch */
            <button
              key={option.value}
              onClick={() => handleChange(option.value)}
              className={`
                relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1
                ${isActive
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--text-on-primary)] shadow-sm'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--primary)]/10'
                }
              `}
              aria-label={option.ariaLabel}
              aria-pressed={isActive}
            >
              <Icon name={option.icon} size="xs" className="shrink-0" />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
      <LiveRegion message={announcement} priority="polite" />
    </div>
  );
}
