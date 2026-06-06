'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { transition as t } from '@/design-system';
import Badge, { BadgeVariant } from '@/components/ui/Badge';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAnalyticsTracking } from '../../../seo/AnalyticsProvider';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

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
  };  const getStatusVariant = (): BadgeVariant => {
    switch (item.status.type) {
      case 'in-progress': return 'warning';
      case 'accomplished': return 'success';
      default: return 'outline';
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

  const getCategoryBadge = () => {
    if (!item.category) return null;
    if (item.category === 'case-study') {
      return (
        <Badge variant="accent">
          <MaterialSymbol className="!text-[12px]">school</MaterialSymbol>
          {locale === 'fi' ? 'Tapaustutkimus' : 'Case Study'}
        </Badge>
      );
    }
    return (
      <Badge variant="info">
        <MaterialSymbol className="!text-[12px]">devices</MaterialSymbol>
        {locale === 'fi' ? 'Prototyyppi' : 'Prototype'}
      </Badge>
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
              {/* Top: Category badge */}
              <div className="flex items-start">
                <div className="flex items-center gap-2">
                  {item.category && getCategoryBadge()}
                </div>
              </div>

              {/* Bottom: Content + Status */}
              <div>
                <div className="mb-3">
                  <Badge variant="glass" className="mb-3">
                    {getType()}
                  </Badge>
                  <h3 className="text-2xl font-bold text-on-dark leading-tight mb-2">{getTitle()}</h3>
                  <p className="text-on-dark/70 text-sm line-clamp-2 leading-relaxed">{getDesc()}</p>
                </div>
                {/* Footer row: status + explore */}
                <div className="flex items-center justify-between pt-3 border-t border-on-dark/10">
                  <Badge
                    variant={getStatusVariant()}
                    size="sm"
                    dot={item.status.type === 'in-progress'}
                    animateDot={item.status.type === 'in-progress'}
                    className="uppercase tracking-widest"
                  >
                    {item.status.type === 'accomplished' && (
                      <MaterialSymbol className="!text-[10px]">verified</MaterialSymbol>
                    )}
                    {getStatus()}
                  </Badge>
                  <div className="flex items-center gap-2 text-on-dark/60 text-xs font-medium group-hover:text-on-dark transition-colors duration-200">
                    <span>{locale === 'fi' ? 'Tutustu' : 'Explore project'}</span>
                    <MaterialSymbol className="text-sm transition-transform duration-200 group-hover:translate-x-1">arrow_forward</MaterialSymbol>
                  </div>
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
      <div className="theme-card-flex p-0 rounded-2xl h-full overflow-hidden transition-all duration-500 hover:shadow-xl">
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
          </div>
          
          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Type + Category */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="gradient" className="hover:shadow-lg transition-shadow">
                {getType()}
              </Badge>
              {item.category && getCategoryBadge()}
            </div>
            
            <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-primary transition-colors duration-200">{getTitle()}</h3>
            <p className="text-[var(--muted-foreground)] text-sm line-clamp-2 leading-relaxed mb-4">{getDesc()}</p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--card-border)]">
              {/* Tags or status badge */}
              <div className="flex flex-wrap items-center gap-1.5">
                {cardTags.length > 0 ? (
                  cardTags.map((tag, idx) => (
                    <Badge key={idx} variant="info" size="sm">{tag}</Badge>
                  ))
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={getStatusVariant()}
                  size="sm"
                  dot={item.status.type === 'in-progress'}
                  animateDot={item.status.type === 'in-progress'}
                  className="uppercase tracking-widest"
                >
                  {item.status.type === 'accomplished' && (
                    <MaterialSymbol className="!text-[10px]">verified</MaterialSymbol>
                  )}
                  {getStatus()}
                </Badge>
                <MaterialSymbol className="text-lg text-[var(--muted-foreground)] group-hover:text-primary transition-all duration-200 group-hover:translate-x-0.5">arrow_forward</MaterialSymbol>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
