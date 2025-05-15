'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { useTheme } from '@/context/ThemeContext';
import { i18n } from '@/i18n';

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
  tags?: string[];
  date?: string;
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
  locale: string;
}

export default function PortfolioClient({ items, locale: initialLocale }: Props) {
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const { theme } = useTheme();
  const [filter, setFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'overlay'>('standard');
  
  // Extract all item types for filtering
  const itemTypes = Array.from(
    new Set(items.map(item => item.type.en))
  );
  
  // Filter items by type
  const filteredItems = filter
    ? items.filter(item => item.type.en === filter)
    : items;
  
  // Translate static UI text
  const getPortfolioTitle = (): string => {
    return t('portfolio.overview');
  };
  
  const getPortfolioDescription = (): string => {
    switch(locale) {
      case 'fi': 
        return 'Jokainen projekti on luku suunnittelutarinaani—todellisten ongelmien ratkaisemista, tiimityötä ja kasvua käytännön johtajuuden sekä luovan tutkimisen kautta.';
      default:
        return 'Each project is a chapter in my design story—solving real problems, collaborating with teams, and evolving through hands-on leadership and creative exploration.';
    }
  };
  
  // Translate "All" button text
  const getAllText = (): string => {
    switch(locale) {
      case 'fi': return 'Kaikki';
      default: return 'All';
    }
  };
  
  // Get type in the user's language
  const getType = (item: PortfolioItem): string => {
    return item.type[locale as keyof typeof item.type] || item.type.en;
  };
    
  // Translate "No items found" text
  const getNoItemsText = (): string => {
    switch(locale) {
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

  return (
    <main className="min-h-screen bg-theme text-theme">      
      <Navigation />

      <section className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {getPortfolioTitle()}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl opacity-60 mb-12"
            >
              {getPortfolioDescription()}
            </motion.p>
            
            {/* Filters and View Mode Toggle */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
              {/* Type Filters */}
              <motion.div 
                className="flex flex-wrap gap-2 flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  onClick={() => setFilter(null)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    filter === null
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-200/10 text-gray-400 hover:bg-gray-200/20'
                  }`}
                >
                  {getAllText()}
                </button>
                {itemTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      filter === type
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                        : 'bg-gray-200/10 text-gray-400 hover:bg-gray-200/20'
                    }`}
                  >
                    {getType({ type: { en: type } } as PortfolioItem)}
                  </button>
                ))}
              </motion.div>
              
              {/* View Mode Toggle */}
              <motion.div 
                className="flex items-center bg-theme-card rounded-full p-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <button
                  onClick={() => setViewMode('standard')}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all ${
                    viewMode === 'standard'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-400 hover:text-gray-100'
                  }`}
                >
                  <span className="material-symbols text-sm">grid_view</span>
                  <span>{getViewModeText('standard')}</span>
                </button>
                <button
                  onClick={() => setViewMode('overlay')}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all ${
                    viewMode === 'overlay'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-400 hover:text-gray-100'
                  }`}
                >
                  <span className="material-symbols text-sm">layers</span>
                  <span>{getViewModeText('overlay')}</span>
                </button>
              </motion.div>
            </div>
          </div>
          
          {/* Portfolio Items Grid */}
          {filteredItems.length > 0 ? (
            <motion.div 
              className={`grid grid-cols-1 ${viewMode === 'standard' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'} gap-8`}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
              key={viewMode} // This forces re-render animation when view mode changes
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.link}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className={`h-full ${viewMode === 'overlay' ? 'aspect-[3/4]' : ''}`}
                >
                  <PortfolioCard item={item} index={index} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl opacity-60">{getNoItemsText()}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
