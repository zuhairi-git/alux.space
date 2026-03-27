'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { durationSeconds, delaySeconds, transition as t } from '@/design-system';
import { useTheme } from '@/context/ThemeContext';
import QuoteBlock from '@/components/ui/QuoteBlock';
import { useLanguage } from '@/context/LanguageContext';
import PodcastPlayer from '@/components/PodcastPlayer';
import { i18n } from '@/i18n';
import { useAnalyticsTracking } from '../../../../seo/AnalyticsProvider';

const CreativeHero: React.FC<HeroConfig> = ({ title, subtitle, quote, cta, showPodcastPlayer }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { trackEvent } = useAnalyticsTracking();
  const isLight = theme === 'light';
  
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
  
  // Split title into words for staggered animation
  const words = title ? title.split(' ') : [];
  
  return (    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: durationSeconds.ease }}
      className="container mx-auto px-4 relative z-10"
    >
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center my-8">
        {/* Geometric decorations */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Floating circle decoration */}          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -top-20 -left-10 md:-left-20 w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-500/30 blur-sm"
          />
          
          {/* Rotating square decoration */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 -right-10 md:-right-20 w-20 h-20 md:w-32 md:h-32 rounded-md bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 blur-sm"
          />
          
          {/* Main Title with 3D Effect */}
          <motion.div 
            className={`relative z-10 mx-auto  mb-12`}            style={{
              transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)` // Fixed position instead of mouse-based rotation
            }}
          >
            <h2 className={`text-6xl text-center md:text-7xl font-bold leading-tight tracking-tight relative z-20 `}>
              {words.map((word, i) => (                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: i * delaySeconds.xs, 
                    duration: durationSeconds.ease,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  className="inline-block mx-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-fuchsia-600 relative"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            
            {/* Decorative elements */}            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ delay: delaySeconds.md, duration: durationSeconds.slow }}
              className="absolute -z-10 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-600/10 blur-3xl"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </motion.div>
        </div>

        {subtitle && (          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationSeconds.ease, delay: delaySeconds.lg }}
            className={`text-2xl md:text-3xl  ${isLight ? 'text-gray-700' : 'text-white'} mb-12 relative z-20`}
          >
            {subtitle}
          </motion.p>
        )}

        {quote && (          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delaySeconds.xl, duration: durationSeconds.ease }}
            className="relative max-w-4xl mx-auto mb-12"
          >
            <QuoteBlock 
              quote={quote.text}
              author={quote.author}
              variant="default"
            />
          </motion.div>
        )}

        {cta && (          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delaySeconds['2xl'], duration: durationSeconds.ease }}
            className="text-center"
          ><Link
              href={localizedHref(cta.href)}
              onClick={() => trackEvent('hero_cta_click', 'hero', `creative_variant_${cta.text}`)}
            >
              <Button size="lg" variant={theme === 'colorful' ? 'cosmic' : 'primary'}>
                {cta.text}
              </Button>
            </Link>
          </motion.div>        )}
        
        {/* Podcast Player */}
        {showPodcastPlayer && (          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delaySeconds['3xl'], duration: durationSeconds.ease }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <PodcastPlayer />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CreativeHero;
