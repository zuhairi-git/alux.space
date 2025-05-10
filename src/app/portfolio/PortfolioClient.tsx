'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { i18n } from '@/i18n';

interface PortfolioItem {
  title: {
    en: string;
    fi?: string;
    ar?: string;
  };
  type: {
    en: string;
    fi?: string;
    ar?: string;
  };
  desc: {
    en: string;
    fi?: string;
    ar?: string;
  };
  link: string;
  gradient: string;
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
  const { locale, isRTL } = useLanguage();
  const { t } = useTranslations(locale);
  
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
      case 'ar': return 'اقرأ المزيد';
      default: return 'Learn more';
    }
  };
  
  const getPortfolioTitle = (): string => {
    return t('portfolio.overview');
  };
  
  const getPortfolioDescription = (): string => {
    switch(locale) {
      case 'fi': 
        return 'Tarkastele matkaani designjohtajuuden, tiimin yhteistyön ja ammatillisen kasvun parissa.';
      case 'ar':
        return 'استكشاف رحلتي من خلال قيادة التصميم والتعاون الجماعي والنمو المهني.';
      default:
        return 'Exploring my journey through design leadership, team collaboration, and professional growth.';
    }
  };
  
  const getPhotoByText = (): string => {
    switch(locale) {
      case 'fi': return 'Kuva:';
      case 'ar': return 'صورة بواسطة:';
      default: return 'Photo by';
    }
  };
  
  const getOnText = (): string => {
    switch(locale) {
      case 'fi': return 'palvelussa';
      case 'ar': return 'على';
      default: return 'on';
    }
  };
  
  const getImageUnavailableText = (): string => {
    switch(locale) {
      case 'fi': return 'Kuva ei saatavilla';
      case 'ar': return 'الصورة غير متوفرة';
      default: return 'Image unavailable';
    }
  };

  return (
    <main className="min-h-screen bg-theme text-theme">
      <Navigation />

      <section className="min-h-screen pt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <div className={`max-w-4xl mb-16 ${isRTL ? 'text-right' : ''}`}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-6"
            >
              {getPortfolioTitle()}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl opacity-80"
            >
              {getPortfolioDescription()}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {items.map((item, index) => (
              <Card
                key={index}
                variant={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary'}
                slideDirection={index % 2 === 0 ? 'left' : 'right'}
              >
                <Link href={localizedHref(item.link)} className="block -m-8">
                  <div className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    <div className="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden">
                      {item.photo ? (
                        <>
                          <Image
                            src={item.photo.url}
                            alt={getTitle(item)}
                            fill
                            className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                          {item.photo.author && (
                            <div className={`absolute bottom-2 ${isRTL ? 'left-2 text-right' : 'right-2 text-left'} text-xs text-white/70`}>
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
                    <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center ${isRTL ? 'text-right' : ''}`}>
                      <span className={`text-sm font-medium bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-4`}>
                        {getType(item)}
                      </span>
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {getTitle(item)}
                      </h3>
                      <p className="opacity-80 mb-6">
                        {getDesc(item)}
                      </p>
                      <span className={`inline-flex items-center text-primary group-hover:opacity-80 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {getLearnMoreText()}
                        <svg className={`w-5 h-5 ${isRTL ? 'mr-2 transform group-hover:-translate-x-1 rotate-180' : 'ml-2 transform group-hover:translate-x-1'} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}