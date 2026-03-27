'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { durationSeconds, delaySeconds } from '@/design-system';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/i18n';
import PodcastPlayer from '@/components/PodcastPlayer';
import { useAnalyticsTracking } from '../../../../seo/AnalyticsProvider';

const DesignHero: React.FC<HeroConfig> = ({ title, subtitle, quote, cta, showPodcastPlayer }) => {
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
      className="container mx-auto px-4 text-center relative z-10"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: durationSeconds.ease, delay: delaySeconds.xs }}
          className="text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 mb-8">{subtitle}</p>
          )}

          {cta && (
            <Link
              href={localizedHref(cta.href)}
              onClick={() => trackEvent('hero_cta_click', 'hero', `design_variant_${cta.text}`)}
            >
              <Button variant="primary" size="md">
                {cta.text}
              </Button>
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: durationSeconds.ease, delay: delaySeconds.md }}
          className="relative"
        >
          {quote && (
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <p className="text-lg text-gray-300 italic relative">
                <span className="absolute -left-4 top-0 text-blue-400 text-3xl">&ldquo;</span>
                {quote.text}
                <span className="absolute -bottom-4 right-0 text-blue-400 text-3xl">&rdquo;</span>
              </p>
              <p className="text-blue-400 mt-6 text-right">— {quote.author}</p>
            </div>
          )}        </motion.div>
      </div>
      
      {/* Podcast Player */}
      {showPodcastPlayer && (        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delaySeconds.lg }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <PodcastPlayer />
        </motion.div>
      )}
    </motion.div>
  );
};

export default DesignHero;