'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTabDirection } from '@/app/mobile/shared';

import Navigation from '@/components/Navigation';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { useTheme } from '@/context/ThemeContext';

interface PortfolioItem {
  title: {
    en: string;
    fi?: string;
  };
  type: {
    en: string;
    fi?: string;
  };
  desc: {
    en: string;
    fi?: string;
  };
  link: string;
  gradient: string;
  status: {
    en: string;
    fi?: string;
    type: 'in-progress' | 'accomplished';
  };
  tags?: string[];
  date?: string;
  category?: 'case-study' | 'prototype';
  photo?: {
    url: string;
    author?: {
      name: string;
      username: string;
      link: string;
    };
  };
}

interface Props {
  items: PortfolioItem[];
}

export default function PortfolioClient({ items }: Props) {
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const { theme } = useTheme();
  const [filter, setFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'overlay'>('standard');
  const prevFilterRef = useRef<string | null>(null);
  const directionRef = useRef(1);

  const FILTER_ORDER = [null, 'case-study', 'prototype'] as const;

  const handleFilterChange = (newFilter: string | null) => {
    directionRef.current = getTabDirection(
      FILTER_ORDER as unknown as string[],
      prevFilterRef.current as string,
      newFilter as string
    );
    prevFilterRef.current = newFilter;
    setFilter(newFilter);
  };

  // Filter items by type or category
  const filteredItems = filter
    ? (filter === 'case-study' || filter === 'prototype')
      ? items.filter(item => item.category === filter)
      : items.filter(item => item.type.en === filter)
    : items;

  // Count items per category
  const caseStudyCount = items.filter(i => i.category === 'case-study').length;
  const prototypeCount = items.filter(i => i.category === 'prototype').length;

  // Translate static UI text
  const getPortfolioTitle = (): string => {
    return t('portfolio.overview');
  };

  const getPortfolioDescription = (): string => {
    switch (locale) {
      case 'fi':
        return 'Jokainen projekti on luku suunnittelutarinaani—todellisten ongelmien ratkaisemista, tiimityötä ja kasvua käytännön johtajuuden sekä luovan tutkimisen kautta.';
      default:
        return 'Each project is a chapter in my design story—solving real problems, collaborating with teams, and evolving through hands-on leadership and creative exploration.';
    }
  };

  // Translate "All" button text
  const getAllText = (): string => {
    switch (locale) {
      case 'fi': return 'Kaikki';
      default: return 'All';
    }
  };

  // Translate "No items found" text
  const getNoItemsText = (): string => {
    switch (locale) {
      case 'fi': return 'Ei projekteja tässä kategoriassa.';
      default: return 'No projects found in this category.';
    }
  };

  // Translate view mode labels
  const getViewModeText = (mode: 'standard' | 'overlay'): string => {
    if (mode === 'standard') {
      return locale === 'fi' ? 'Tavallinen' : 'Standard';
    } else {
      return locale === 'fi' ? 'Peite' : 'Overlay';
    }
  };

  const getToggleBgClass = (): string => {
    if (theme === 'light') return 'bg-gray-100';
    if (theme === 'colorful') return 'bg-white/[0.06] border border-white/[0.06]';
    return 'bg-white/[0.06]';
  };

  const getToggleInactiveText = (): string => {
    if (theme === 'light') return 'text-gray-500 hover:text-gray-700';
    return 'text-gray-400 hover:text-gray-200';
  };

  const getDividerClass = (): string => {
    if (theme === 'light') return 'border-gray-200';
    if (theme === 'colorful') return 'border-white/[0.06]';
    return 'border-white/[0.06]';
  };

  return (
    <main className="min-h-screen bg-theme text-theme">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3"
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] opacity-40 mb-4">
              <span className="material-symbols text-sm">work</span>
              {locale === 'fi' ? 'Valitut teokset' : 'Selected Works'}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              {getPortfolioTitle()}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl opacity-50 max-w-2xl leading-relaxed"
          >
            {getPortfolioDescription()}
          </motion.p>
        </div>
      </section>

      {/* Filter & View Controls */}
      <section className="pt-10 pb-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
          >
            {/* Filter Tabs */}
            <div className="flex items-center gap-1">
              {[
                { value: null, label: getAllText(), count: items.length },
                { value: 'case-study' as const, label: locale === 'fi' ? 'Tapaustutkimus' : 'Case Study', count: caseStudyCount },
                { value: 'prototype' as const, label: locale === 'fi' ? 'Prototyyppi' : 'Prototype', count: prototypeCount },
              ].map((tab) => {
                const isActive = filter === tab.value;
                return (
                  <button
                    key={tab.label}
                    onClick={() => handleFilterChange(tab.value)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap rounded-lg ${isActive
                        ? theme === 'light'
                          ? 'text-gray-900'
                          : 'text-white'
                        : theme === 'light'
                          ? 'text-gray-400 hover:text-gray-600'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                  >
                    {tab.label}
                    <span className={`ml-1.5 text-xs tabular-nums ${isActive ? 'opacity-50' : 'opacity-30'}`}>
                      {tab.count}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterIndicator"
                        className={`absolute inset-0 rounded-lg -z-10 ${theme === 'light'
                            ? 'bg-gray-100'
                            : theme === 'colorful'
                              ? 'bg-white/[0.08]'
                              : 'bg-white/[0.08]'
                          }`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className={`flex items-center rounded-lg p-1 shrink-0 ${getToggleBgClass()}`}>
              {(['standard', 'overlay'] as const).map((mode) => {
                const isActive = viewMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive
                        ? theme === 'light' ? 'text-gray-900' : 'text-white'
                        : getToggleInactiveText()
                      }`}
                  >
                    <span className="material-symbols text-[16px]">{mode === 'standard' ? 'grid_view' : 'layers'}</span>
                    <span className="hidden sm:inline">{getViewModeText(mode)}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeViewIndicator"
                        className={`absolute inset-0 rounded-md -z-10 ${theme === 'light'
                            ? 'bg-white shadow-sm'
                            : theme === 'colorful'
                              ? 'bg-white/[0.12]'
                              : 'bg-white/[0.12]'
                          }`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Subtle divider */}
          <div className={`mt-5 border-b ${getDividerClass()}`} />
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-16 pt-6">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            <p className="text-sm opacity-40 font-medium">
              {locale === 'fi'
                ? `Näytetään ${filteredItems.length} projektia`
                : `Showing ${filteredItems.length} project${filteredItems.length !== 1 ? 's' : ''}`}
            </p>
          </motion.div>

          {/* Portfolio Items Grid */}
          <AnimatePresence mode="wait" custom={directionRef.current}>
            {filteredItems.length > 0 ? (
              <motion.div
                key={`${viewMode}-${filter}`}
                className={`grid grid-cols-1 ${viewMode === 'standard' ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'} gap-6 lg:gap-8`}
                custom={directionRef.current}
                variants={{
                  hidden: (direction: number) => ({
                    opacity: 0,
                    x: direction * 50,
                    scale: 0.98
                  }),
                  show: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: {
                      staggerChildren: 0.06,
                      when: "beforeChildren",
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  },
                  exit: (direction: number) => ({
                    opacity: 0,
                    x: direction * -40,
                    scale: 0.98,
                    transition: { duration: 0.3 }
                  })
                }}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.link}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                          mass: 0.8
                        }
                      },
                      exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
                    }}
                    className={`h-full ${viewMode === 'overlay' ? 'aspect-[3/4]' : ''}`}
                  >
                    <PortfolioCard item={item} index={index} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <span className="material-symbols text-5xl opacity-20 mb-4 block">folder_open</span>
                <p className="text-lg opacity-50">{getNoItemsText()}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
