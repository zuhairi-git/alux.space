'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

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

  // Get gradient from item
  const gradientClasses = item.gradient || 'from-blue-400 to-purple-500';
  
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
          </div>
          
          <Link href={cardLink} className="block h-full">
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              {/* Badge */}
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${gradientClasses} text-white shadow-md`}>
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
              
              {/* Tags */}
              {cardTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {cardTags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full text-xs bg-white/20 text-white font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
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
    >
      <div className="theme-card-flex p-0 rounded-xl h-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-theme/70 border border-gray-200/30 dark:border-neutral-700/30 hover:border-primary/30">
        <Link href={cardLink} className="h-full flex flex-col">
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
            </div>
            
            {/* Display project type as a badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${gradientClasses} text-white shadow-md`}>
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
            
            {/* Tags Section */}
            {cardTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {cardTags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Date if available */}
            {item.date && (
              <div className="text-xs mt-auto pt-4 flex items-center gap-1 border-t border-current/10">
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
