'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import PodcastPlayer from '@/components/PodcastPlayer';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/i18n';
import { useAnalyticsTracking } from '../../../../seo/AnalyticsProvider';

const DefaultHero: React.FC<HeroConfig> = ({ title, subtitle, quote, cta, showPodcastPlayer }) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`container mx-auto px-4 relative z-10`}
    >
      {/* Decorative accents */}      <motion.div
        className="absolute top-4 left-4 md:top-10 md:left-10 w-16 h-16 md:w-24 md:h-24"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-full h-full border-t-2 border-l-2 border-blue-400/30 rounded-tl-lg" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-16 h-16 md:w-24 md:h-24"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-full h-full border-b-2 border-r-2 border-purple-400/30 rounded-br-lg" />
      </motion.div>
        <motion.div 
        className="absolute -left-20 top-[40%] hidden md:block" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"></div>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute -right-20 top-[40%] hidden md:block" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"></div>
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
        </div>
      </motion.div>

      <div className={`flex flex-col items-center justify-center my-8 text-center max-w-4xl mx-auto relative`}>
        {/* Subtle dot grid behind the title */}
        <div className="absolute inset-0 -z-10 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-[20%] w-3/5 h-full" 
               style={{ backgroundImage: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          </div>
        </div>
          <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Decorative line above title */}
          <motion.span 
            className="block mx-auto w-12 h-1 bg-gradient-to-r from-blue-400/50 to-purple-400/50 mb-6"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          ></motion.span>
          
          {title}
            {/* Decorative underline highlight */}
          <motion.div
            className="absolute -z-10 h-4 rounded-full bg-blue-400/10 bottom-1"
            initial={{ width: 0, x: '50%' }}
            animate={{ width: '70%', x: '15%' }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />
        </motion.h1>
          <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 text-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      </div>      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-center relative"
      >{cta && (
          <motion.div
            className="inline-block relative"
          >            <motion.div 
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-indigo-500/40 blur-md opacity-70"
              animate={{
                background: [
                  'linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.4), rgba(99, 102, 241, 0.4))',
                  'linear-gradient(to right, rgba(99, 102, 241, 0.4), rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.4))',
                  'linear-gradient(to right, rgba(168, 85, 247, 0.4), rgba(99, 102, 241, 0.4), rgba(59, 130, 246, 0.4))',
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div><Link 
              href={localizedHref(cta.href)} 
              className="relative inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg z-10"
              onClick={() => trackEvent('hero_cta_click', 'hero', `default_variant_${cta.text}`)}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{cta.text}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          </motion.div>
        )}
          {/* Decorative radar-like icon removed */}
          {/* Decorative square icon removed */}
      </motion.div>
      
      {quote && (        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative max-w-2xl mx-auto mt-16 p-8 rounded-lg bg-white/5 backdrop-blur-sm text-center border-t border-l border-white/10"
        >
          {/* Decorative elements */}          <motion.div 
            className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          />
          
          <p className="italic text-gray-300 relative">
            <span className="absolute -left-4 top-0 text-blue-400 text-4xl opacity-80">&ldquo;</span>
            {quote.text}
            <span className="absolute -bottom-4 right-0 text-blue-400 text-4xl opacity-80">&rdquo;</span>
            <motion.span 
              className="block text-blue-400 mt-6 text-center"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              — {quote.author}
            </motion.span>
          </p>
          
          <motion.div 
            className="absolute inset-0 -z-10 opacity-20"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%, rgba(168, 85, 247, 0.1) 100%)',
                'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%)',
                'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%, rgba(168, 85, 247, 0.1) 100%)'
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}          />
        </motion.div>
      )}
      
      {/* Podcast Player */}
      {showPodcastPlayer && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <PodcastPlayer />
        </motion.div>
      )}
    </motion.div>
  );
};

export default DefaultHero;
