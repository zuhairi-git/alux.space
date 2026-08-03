'use client';

import React from 'react';
import Icon from '@/components/ui/Icon';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Shared "years of experience" stat tiles, used by both homepage designs.
 *
 * Each tile carries its own hue in the number and meter, an explicit
 * "years" word, and a 10-segment meter that fills to the year count —
 * the energy comes from color and composition, not animation (the only
 * motion is a CSS hover lift). Icons stay neutral and untilted.
 */

const MAX_YEARS = 10;

interface StatHue {
  /** Vivid gradient for the icon sticker and filled meter segments. */
  chip: string;
  /** Gradient for the big number (500/600-level for light-theme contrast). */
  number: string;
  /** Low-alpha wash laid over the card surface. */
  tint: string;
  /** Hover border accent. */
  border: string;
}

const HUES: Record<'violet' | 'pink' | 'cyan' | 'ember', StatHue> = {
  violet: {
    chip: 'bg-gradient-to-br from-[var(--color-violet-500)] to-[var(--color-fuchsia-500)]',
    number: 'from-[var(--color-violet-500)] to-[var(--color-fuchsia-600)]',
    tint: 'from-[var(--color-violet-500)]/10',
    border: 'hover:border-[var(--color-violet-400)]/60',
  },
  pink: {
    chip: 'bg-gradient-to-br from-[var(--color-pink-500)] to-[var(--color-rose-500)]',
    number: 'from-[var(--color-pink-500)] to-[var(--color-rose-500)]',
    tint: 'from-[var(--color-pink-500)]/10',
    border: 'hover:border-[var(--color-pink-400)]/60',
  },
  cyan: {
    chip: 'bg-gradient-to-br from-[var(--color-cyan-500)] to-[var(--color-blue-600)]',
    number: 'from-[var(--color-cyan-500)] to-[var(--color-blue-600)]',
    tint: 'from-[var(--color-cyan-500)]/10',
    border: 'hover:border-[var(--color-cyan-400)]/60',
  },
  ember: {
    chip: 'bg-gradient-to-br from-[var(--color-ember-500)] to-[var(--color-gold-600)]',
    number: 'from-[var(--color-ember-500)] to-[var(--color-ember-600)]',
    tint: 'from-[var(--color-ember-500)]/10',
    border: 'hover:border-[var(--color-ember-400)]/60',
  },
};

interface Stat {
  years: number;
  plus?: boolean;
  icon: string;
  hue: keyof typeof HUES;
  label: { en: string; fi: string };
}

const STATS: Stat[] = [
  { years: 10, plus: true, icon: 'palette', hue: 'violet', label: { en: 'Product Design', fi: 'Tuotesuunnittelu' } },
  { years: 8, icon: 'group', hue: 'pink', label: { en: 'Product Management', fi: 'Tuotehallinta' } },
  { years: 8, icon: 'psychology', hue: 'cyan', label: { en: 'UX Research', fi: 'UX-tutkimus' } },
  { years: 5, icon: 'code', hue: 'ember', label: { en: 'Frontend Development', fi: 'Frontend-kehitys' } },
];

export default function ExperienceStats() {
  const { locale } = useLanguage();
  const isFi = locale === 'fi';
  const yearsWord = isFi ? 'vuotta' : 'years';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {STATS.map((stat) => {
        const hue = HUES[stat.hue];
        const label = isFi ? stat.label.fi : stat.label.en;
        const value = `${stat.years}${stat.plus ? '+' : ''}`;
        return (
          <div
            key={stat.label.en}
            className={`group relative overflow-hidden rounded-2xl border bg-[var(--card-from-bg)] border-[var(--card-border)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--card-hover-shadow-color)] ${hue.border}`}
            aria-label={`${value} ${yearsWord} — ${label}`}
          >
            {/* Hue wash */}
            <div className={`absolute inset-0 bg-gradient-to-br ${hue.tint} to-transparent pointer-events-none`} aria-hidden="true" />

            {/* Icon badge — neutral, untilted */}
            <span
              className="absolute top-4 end-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--primary)]/10"
              aria-hidden="true"
            >
              <Icon name={stat.icon} size="md" className="text-[var(--accent-text)]" />
            </span>

            <div className="relative">
              <p className="flex items-baseline gap-1.5 pe-12">
                <span className={`text-4xl md:text-5xl font-extrabold leading-none tracking-tight bg-gradient-to-r ${hue.number} bg-clip-text text-transparent`}>
                  {value}
                </span>
                <span className="text-sm font-semibold text-[var(--muted-foreground)]">{yearsWord}</span>
              </p>
              <p className="mt-1.5 text-sm md:text-base font-semibold text-foreground">{label}</p>

              {/* Year meter — one segment per year, filled to the count */}
              <div className="flex gap-1 mt-4" aria-hidden="true">
                {Array.from({ length: MAX_YEARS }, (_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i < stat.years ? hue.chip : 'bg-[var(--stepper-inactive-color)]'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
