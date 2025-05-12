'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
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
  
  // Extract all item types for filtering
  const itemTypes = Array.from(
    new Set(items.map(item => item.type.en))
  );
  
  // Filter items by type
  const filteredItems = filter
    ? items.filter(item => item.type.en === filter)
    : items;
    
  // Helper function to add locale to paths
  const localizedHref = (path: string) => {
    // Check if the path already contains the locale
    if (path.startsWith('/') && i18n.locales.some(loc => path.startsWith(`/${loc}/`))) {
      return path; // Path already has locale, don't add it again
    }
    return `/${locale}${path}`;
  };
  
  // Get localized text content
  const getTitle = (item: PortfolioItem): string => {
    return item.title[locale as keyof typeof item.title] || item.title.en;
  };
  
  const getType = (item: PortfolioItem): string => {
    return item.type[locale as keyof typeof item.type] || item.type.en;
  };
  
  const getDesc = (item: PortfolioItem): string => {
    return item.desc[locale as keyof typeof item.desc] || item.desc.en;
  };
  
  // Translate static UI text
  const getLearnMoreText = (): string => {
    switch(locale) {
      case 'fi': return 'Lue lisää';
      default: return 'Learn more';
    }
  };
  
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
  
  const getPhotoByText = (): string => {
    switch(locale) {
      case 'fi': return 'Kuva:';
      default: return 'Photo by';
    }
  };
  
  const getOnText = (): string => {
    switch(locale) {
      case 'fi': return 'palvelussa';
      default: return 'on';
    }
  };
    const getImageUnavailableText = (): string => {
    switch(locale) {
      case 'fi': return 'Kuva ei saatavilla';
      default: return 'Image unavailable';
    }
  };
  
  // Translate "All" button text
  const getAllText = (): string => {
    switch(locale) {
      case 'fi': return 'Kaikki';
      default: return 'All';
    }
  };
  
  // Translate "No items found" text
  const getNoItemsText = (): string => {
    switch(locale) {
      case 'fi': return 'Ei projekteja tässä kategoriassa.';
      default: return 'No projects found in this category.';
    }
  };

  return (
    <main className="min-h-screen bg-theme text-theme">      <Navigation />

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
            
            {/* Type Filters */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-12"
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
          </div>          {/* Portfolio Items Grid */}
          {filteredItems.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.link}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="h-full"
                >
                  <Card 
                    variant={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'} 
                    slideDirection={index % 2 === 0 ? 'left' : 'right'}
                    className="h-full transform-gpu"
                  >
                    <Link href={localizedHref(item.link)} className="block -m-8 rounded-xl overflow-hidden h-full">
                      <div className="flex flex-col h-full">
                        <div className="relative w-full h-64 overflow-hidden">
                          {item.photo ? (
                            <>
                              <Image
                                src={item.photo.url}
                                alt={getTitle(item)}
                                fill
                                className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                              
                              {/* Add type tag on image */}
                              <div className="absolute top-4 left-4 px-3 py-1 backdrop-blur-sm bg-black/30 text-white rounded-full text-xs">
                                {getType(item)}
                              </div>
                              
                              {/* Photo attribution if available */}
                              {item.photo.author && (
                                <div className="absolute bottom-2 left-4 text-xs text-white/70">
                                  {getPhotoByText()}{' '}
                                  <a
                                    href={item.photo.author.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white"
                                  >
                                    {item.photo.author.name}
                                  </a>
                                  {' '}{getOnText()}{' '}
                                  <a
                                    href="https://unsplash.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white"
                                  >
                                    Unsplash
                                  </a>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full bg-theme flex items-center justify-center">
                              <span className="opacity-50">{getImageUnavailableText()}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-8 flex flex-col flex-grow">
                          {/* Tags if available */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.tags.slice(0, 3).map((tag, idx) => (
                                <span 
                                  key={idx}
                                  className={`px-3 py-1 ${
                                    theme === 'light' 
                                      ? 'bg-primary/10 text-primary' 
                                      : 'bg-primary/20 text-primary'
                                  } rounded-full text-xs`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {getTitle(item)}
                          </h3>
                          
                          <p className="opacity-80 mb-4 flex-grow">
                            {getDesc(item)}
                          </p>
                          
                          {item.date && (
                            <div className="flex justify-start items-center text-sm opacity-70 mt-auto pt-4 border-t border-primary/10">
                              <span>{item.date}</span>
                            </div>
                          )}
                          
                          <div className="mt-4 inline-flex items-center text-primary group-hover:opacity-80 transition-colors">
                            {getLearnMoreText()}
                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
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
