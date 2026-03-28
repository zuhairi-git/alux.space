'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { transition as t } from '@/design-system';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
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
    category?: 'case-study' | 'prototype';
    photo?: {
      url: string;
      author?: {
        name: string;
        username: string;
        link: string;
      };
    };
    displayState: 'published' | 'archived' | 'coming-soon';
  };
  index: number;
  viewMode?: 'standard' | 'overlay';
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, viewMode = 'standard' }) => {
  const { locale } = useLanguage();
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
    const baseClasses = 'px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap border transition-all duration-200';
    switch (item.status.type) {
      case 'in-progress':
        return `${baseClasses} bg-[var(--color-warning-bg)] text-[var(--color-warning)] border-[var(--color-warning-border)]`;
      case 'accomplished':
        return `${baseClasses} bg-[var(--color-success-bg)] text-[var(--color-success)] border-[var(--color-success-border)]`;
      default:
        return `${baseClasses} bg-[var(--card-from-bg)] text-[var(--foreground)] opacity-60 border-[var(--card-border)]`;
    }
  };
  
  const getTagClasses = (): string => {
    return 'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 bg-[var(--color-info-bg)] text-[var(--color-info)] border border-[var(--color-info-border)] hover:opacity-80';
  };
  
  const getTypeBadgeClasses = (): string => {
    return `px-3 py-1 rounded-full text-xs font-medium text-white shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-r ${item.gradient || 'from-blue-500 to-purple-500'}`;
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

  const getCategoryBadge = () => {
    if (!item.category) return null;
    if (item.category === 'case-study') {
      return (
        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-violet-500/15 text-purple-400 border-violet-500/30">
          <span className="material-symbols !text-[12px]">school</span>
          {locale === 'fi' ? 'Tapaustutkimus' : 'Case Study'}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border bg-cyan-500/15 text-cyan-400 border-cyan-500/30">
        <span className="material-symbols !text-[12px]">devices</span>
        {locale === 'fi' ? 'Prototyyppi' : 'Prototype'}
      </span>
    );
  };

  // Format link for navigation with proper localization
  const cardLink = localizedHref(item.link);
  
  // Render card based on view mode
  if (viewMode === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={t.enterSlow}
        viewport={{ once: true }}
        className="h-full w-full group"
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 w-full h-full"
              whileHover={{ scale: 1.06 }}
              transition={t.enterSlow}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          </div>

          <Link 
            href={cardLink} 
            className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
            aria-label={`${getTitle()} - ${getType()} - ${getStatus()}`}
            onClick={() => trackEvent('portfolio_card_click', 'portfolio', `overlay_${getTitle()}_${getType()}`)}
          >
            <div className="relative h-full flex flex-col justify-between p-6 z-10">
              {/* Top: Badges */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {item.category && getCategoryBadge()}
                </div>
                <span className={getStatusClasses()}>
                  {getStatus()}
                </span>
              </div>

              {/* Bottom: Content */}
              <div>
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold mb-3 bg-white/15 backdrop-blur-sm text-white/90 border border-white/10`}>
                    {getType()}
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-tight mb-2">{getTitle()}</h3>
                  <p className="text-white/70 text-sm line-clamp-2 leading-relaxed">{getDesc()}</p>
                </div>
                
                {/* Explore indicator */}
                <div className="flex items-center gap-2 text-white/50 text-xs font-medium group-hover:text-white/80 transition-colors">
                  <span>{locale === 'fi' ? 'Tutustu' : 'Explore project'}</span>
                  <span className="material-symbols text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                </div>
              </div>
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
      transition={t.enterSlow}
      viewport={{ once: true }}
      className="h-full w-full group"
    >
      <div className="theme-card-flex p-0 rounded-2xl h-full overflow-hidden transition-all duration-500 hover:shadow-xl border border-gray-200/20 dark:border-neutral-700/20 group-hover:border-primary/20">
        <Link 
          href={cardLink} 
          className="h-full flex flex-col"
          onClick={() => trackEvent('portfolio_card_click', 'portfolio', `standard_${getTitle()}_${getType()}`)}
        >
          {/* Image Section */}
          <div className="relative w-full h-52 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute inset-0 w-full h-full scale-[1.01]"
                whileHover={{ scale: 1.06 }}
                transition={t.enterSlow}
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
            
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            
            {/* Status badge - top right */}
            <div className="absolute top-3 right-3 z-10">
              <span className={getStatusClasses()}>
                {getStatus()}
              </span>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Type + Category */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={getTypeBadgeClasses()}>
                {getType()}
              </span>
              {item.category && getCategoryBadge()}
            </div>
            
            <h3 className="text-lg font-bold text-primary mb-2 leading-snug group-hover:opacity-80 transition-opacity">{getTitle()}</h3>
            <p className="opacity-60 text-sm line-clamp-2 leading-relaxed mb-4">{getDesc()}</p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-current/5">
              {/* Tags */}
              {cardTags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {cardTags.map((tag, idx) => (
                    <span key={idx} className={getTagClasses()}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : <div />}
              
              {/* Arrow */}
              <span className="material-symbols text-lg opacity-30 group-hover:opacity-70 transition-all group-hover:translate-x-0.5">arrow_forward</span>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
