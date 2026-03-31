'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import { durationSeconds, delaySeconds, transition as t, Button } from '@/design-system';
import { useLanguage } from '@/context/LanguageContext';
import PodcastPlayer from '@/components/PodcastPlayer';
import { i18n } from '@/i18n';
import { useAnalyticsTracking } from '../../../../seo/AnalyticsProvider';

const MinimalHero: React.FC<HeroConfig> = ({ title, subtitle, cta, showPodcastPlayer }) => {
  const { locale } = useLanguage();
  const { trackEvent } = useAnalyticsTracking();
  
  // Helper function to add locale to paths
  const localizedHref = (path: string) => {
    // Check if the path already contains the locale
    if (path.startsWith('/') && i18n.locales.some(loc => path.startsWith(`/${loc}/`))) {
      return path; // Path already has locale, don't add it again
    }
    
    if (path.startsWith('#') || path.startsWith('/#')) {
      // For hash links, add locale to the base path
      return path.startsWith('/#') ? `/${locale}${path}` : `/${locale}/${path}`;
    }
    
    return `/${locale}${path}`;
  };
  return (    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: durationSeconds.ease }}
      className="container mx-auto px-4 relative z-10"
    >
      <div className="max-w-3xl mx-auto">        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={t.snap}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...t.snap, delay: delaySeconds.xs }}
            className="text-xl text-ds-gray-300 mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...t.snap, delay: delaySeconds.md }}
          >
            <Link
              href={localizedHref(cta.href)}
              onClick={() => trackEvent('hero_cta_click', 'hero', `minimal_variant_${cta.text}`)}
            >
              <Button variant="primary" size="lg">
                {cta.text}
              </Button>
            </Link>
          </motion.div>
        )}
        
        {/* Podcast Player */}
        {showPodcastPlayer && (          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.snap, delay: delaySeconds.lg }}
            className="mt-16 max-w-3xl"
          >
            <PodcastPlayer />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MinimalHero;