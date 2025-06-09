'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { useAnalyticsTracking } from '../../../seo/AnalyticsProvider';

interface PortfolioCardProps {
  item: {
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
  viewMode?: 'standard' | 'overlay';
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, viewMode = 'standard' }) => {
  const { locale } = useLanguage();
  const { theme } = useTheme();
  const { trackEvent } = useAnalyticsTracking();
  
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
  
  const getStatus = (): string => {
    return item.status[locale as keyof typeof item.status] || item.status.en;
  };  const getStatusClasses = (): string => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-all duration-200';
    
    switch (item.status.type) {
      case 'in-progress':
        if (theme === 'light') {
          return `${baseClasses} bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100`;
        } else if (theme === 'colorful') {
          return `${baseClasses} bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30`;
        } else {
          return `${baseClasses} bg-amber-900/30 text-amber-300 border-amber-500/40 hover:bg-amber-900/50`;
        }
      case 'accomplished':
        if (theme === 'light') {
          return `${baseClasses} bg-green-50 text-green-700 border-green-200 hover:bg-green-100`;
        } else if (theme === 'colorful') {
          return `${baseClasses} bg-green-500/20 text-green-300 border-green-500/40 hover:bg-green-500/30`;
        } else {
          return `${baseClasses} bg-green-900/30 text-green-300 border-green-500/40 hover:bg-green-900/50`;
        }
      default:
        if (theme === 'light') {
          return `${baseClasses} bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100`;
        } else if (theme === 'colorful') {
          return `${baseClasses} bg-gray-500/20 text-gray-300 border-gray-500/40 hover:bg-gray-500/30`;
        } else {
          return `${baseClasses} bg-gray-800/50 text-gray-300 border-gray-600/40 hover:bg-gray-800/70`;        }
    }
  };
  
  const getTagClasses = (): string => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200';
    
    if (theme === 'light') {
      return `${baseClasses} bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100`;
    } else if (theme === 'colorful') {
      return `${baseClasses} bg-blue-500/20 text-blue-300 border border-blue-500/40 hover:bg-blue-500/30`;
    } else {
      return `${baseClasses} bg-blue-900/30 text-blue-300 border border-blue-500/40 hover:bg-blue-900/50`;
    }  };
  
  const getTypeBadgeClasses = (): string => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium shadow-md transition-all duration-200';
    
    if (theme === 'light') {
      return `${baseClasses} bg-gradient-to-r ${item.gradient || 'from-blue-600 to-purple-600'} text-white hover:shadow-lg`;
    } else if (theme === 'colorful') {
      return `${baseClasses} bg-gradient-to-r ${item.gradient || 'from-cyan-400 to-fuchsia-500'} text-white hover:shadow-lg hover:shadow-fuchsia-500/25`;
    } else {
      return `${baseClasses} bg-gradient-to-r ${item.gradient || 'from-blue-500 to-purple-500'} text-white hover:shadow-lg hover:shadow-blue-500/25`;
    }
  };
  
  // Create localized URL
  const localizedHref = (path: string) => {
    if (path.startsWith('/') && path.split('/')[1] === locale) {
      return path; // Path already has locale
    }
    return `/${locale}${path}`;
  };

  // Create tags array that includes the type as first tag
  const cardTags = item.tags?.length ? item.tags.slice(0, 2) : [];

  // Format link for navigation with proper localization
  const cardLink = localizedHref(item.link);
  
  // Get icon based on project type
  const getTypeIcon = () => {
    const type = getType().toLowerCase();
    
    if (type.includes('team') || type.includes('management')) {
      return 'groups';
    } else if (type.includes('growth') || type.includes('professional')) {
      return 'trending_up';
    } else if (type.includes('ux') || type.includes('design')) {
      return 'brush';
    } else if (type.includes('development') || type.includes('programming')) {
      return 'code';
    } else {
      return 'folder'; // Default icon
    }
  };
  // Render card based on view mode
  if (viewMode === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="h-full w-full"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-gray-200/30 dark:border-neutral-700/30 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Background Image */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15, 
                duration: 0.2
              }}
            >
              <Image
                src={item.photo?.url || '/images/placeholder.jpg'}
                alt={getTitle()}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>
          </div>          <Link 
            href={cardLink} 
            className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
            aria-label={`${getTitle()} - ${getType()} - ${getStatus()}`}
            onClick={() => trackEvent('portfolio_card_click', 'portfolio', `overlay_${getTitle()}_${getType()}`)}
          >
            <div className="relative h-full flex flex-col justify-end p-6 z-10">              {/* Project Type Badge - Top Right */}
              <div className="absolute top-3 right-3">
                <span className={getTypeBadgeClasses()}>
                  {getType()}
                </span>
              </div>
              
              {/* Icon and Title Section */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <span className="material-symbols text-3xl text-white">
                    {getTypeIcon()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{getTitle()}</h3>
                  <p className="text-white/80 text-sm line-clamp-3">{getDesc()}</p>
                </div>
              </div>
                {/* Footer with Tags and Status */}
              <div className="flex flex-wrap items-center justify-between gap-2">                {/* Tags */}
                {cardTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cardTags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs bg-white/30 text-white font-medium border border-white/20 hover:bg-white/40 transition-all duration-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Status Badge - Aligned Right */}
                <div className="flex-shrink-0 ml-auto">
                  <span className={getStatusClasses()}>
                    {getStatus()}
                  </span>
                </div>
              </div>
              
              {/* Date */}
              {item.date && (
                <div className="text-xs mt-4 flex items-center gap-1 text-white/60">
                  <span className="material-symbols text-sm">schedule</span>
                  <span>{item.date}</span>
                </div>
              )}
            </div>
          </Link>
        </div>
      </motion.div>
    );
  }
  
  // Standard view (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full w-full"
    >      <div className="theme-card-flex p-0 rounded-xl h-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-theme/70 border border-gray-200/30 dark:border-neutral-700/30 hover:border-primary/30">
        <Link 
          href={cardLink} 
          className="h-full flex flex-col"
          onClick={() => trackEvent('portfolio_card_click', 'portfolio', `standard_${getTitle()}_${getType()}`)}
        >
          {/* Image Section */}
          <div className="relative w-full h-48 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden bg-black">
              <motion.div
                className="absolute inset-0 w-full h-full scale-[1.01]"
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15, 
                  duration: 0.2
                }}
              >
                <Image
                  src={item.photo?.url || '/images/placeholder.jpg'}
                  alt={getTitle()}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            </div>            {/* Display project type as badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className={getTypeBadgeClasses()}>
                {getType()}
              </span>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start mb-4 gap-4">
              <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-primary bg-primary/10 rounded-lg">
                <span className="material-symbols text-4xl">
                  {getTypeIcon()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary mb-1">{getTitle()}</h3>
                <div className="opacity-80 text-sm line-clamp-2">{getDesc()}</div>
              </div>
            </div>
              {/* Footer with Tags and Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
              {/* Tags */}              {cardTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cardTags.map((tag, idx) => (
                    <span key={idx} className={getTagClasses()}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Status Badge - Aligned Right */}
              <div className="flex-shrink-0 ml-auto">
                <span className={getStatusClasses()}>
                  {getStatus()}
                </span>
              </div>
            </div>
            
            {/* Date if available */}
            {item.date && (
              <div className="text-xs mt-4 pt-4 flex items-center gap-1 border-t border-current/10">
                <span className="material-symbols text-sm text-primary">schedule</span>
                <span className="opacity-80">{item.date}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
