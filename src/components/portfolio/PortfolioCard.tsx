'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';

interface PortfolioCardProps {
  item: {
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
  };
  index: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, index }) => {
  const variant = index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary';
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const isLight = theme === 'light';
  const slideDirection = index % 2 === 0 ? 'left' : 'right';
  
  // Helper functions to get localized content
  const getTitle = (): string => {
    return item.title[locale as keyof typeof item.title] || item.title.en;
  };
  
  const getType = (): string => {
    return item.type[locale as keyof typeof item.type] || item.type.en;
  };
  
  const getDesc = (): string => {
    return item.desc[locale as keyof typeof item.desc] || item.desc.en;
  };
  
  // Create localized URL
  const localizedHref = (path: string) => {
    if (path.startsWith('/') && path.split('/')[1] === locale) {
      return path; // Path already has locale
    }
    return `/${locale}${path}`;
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
  
  const getLearnMoreText = (): string => {
    switch(locale) {
      case 'fi': return 'Lue lisää';
      case 'ar': return 'اقرأ المزيد';
      default: return 'Learn more';
    }
  };
  
  return (
    <Card 
      variant={variant} 
      slideDirection={slideDirection}
      className="h-full transform-gpu"
    >
      <Link href={localizedHref(item.link)} className="block -m-8 rounded-xl overflow-hidden h-full">
        <div className="flex flex-col h-full">
          <div className="relative w-full h-64 overflow-hidden">
            {item.photo ? (
              <>
                <Image
                  src={item.photo.url}
                  alt={getTitle()}
                  fill
                  className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Add type tag on image */}
                <div className="absolute top-4 left-4 px-3 py-1 backdrop-blur-sm bg-black/30 text-white rounded-full text-xs">
                  {getType()}
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
                <span className="opacity-50">Image unavailable</span>
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
                      isLight 
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
              {getTitle()}
            </h3>
            
            <p className="opacity-80 mb-4 flex-grow">
              {getDesc()}
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
  );
};

export default PortfolioCard;
