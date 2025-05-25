'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import QuoteBlock from '@/components/ui/QuoteBlock';
import { useLanguage } from '@/context/LanguageContext';
import PodcastPlayer from '@/components/PodcastPlayer';
import { i18n } from '@/i18n';

const CreativeHero: React.FC<HeroConfig> = ({ title, subtitle, quote, cta, showPodcastPlayer }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
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
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 relative z-10"
    >
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center my-8">
        {/* Geometric decorations */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Floating circle decoration */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
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
              duration: 20,
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
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: i * 0.2, 
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  className="inline-block mx-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-fuchsia-600 relative"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            
            {/* Decorative elements */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -z-10 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-600/10 blur-3xl"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </motion.div>
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className={`text-2xl md:text-3xl  ${isLight ? 'text-gray-700' : 'text-white'} mb-12 relative z-20`}
          >
            {subtitle}
          </motion.p>
        )}

        {quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative max-w-4xl mx-auto mb-12"
          >
            <QuoteBlock 
              quote={quote.text}
              author={quote.author}
              variant="default"
            />
          </motion.div>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center"
          >            <Link
              href={localizedHref(cta.href)}
              className={`inline-block px-8 py-4 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
                theme === 'colorful' 
                  ? 'text-white border border-transparent shadow-lg' 
                  : isLight                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-500 text-white'
              } cosmic-shimmer`}
              style={{
                ...(theme === 'colorful' ? {
                  backgroundImage: 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite',
                } : {})
              }}
            >              <motion.span
                className="relative z-10"
              >
                {cta.text}
              </motion.span>
              {theme === 'colorful' && (
                <motion.div 
                  className="absolute inset-0 bg-black/10"
                  transition={{ duration: 0.3 }}
                />
              )}
              
              {/* Animated glow effect */}              <motion.div 
                className="absolute -z-10 inset-0 bg-gradient-to-r from-cyan-500/30 via-fuchsia-500/30 to-blue-500/30 blur-lg opacity-30"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              />
            </Link>
          </motion.div>        )}
        
        {/* Podcast Player */}
        {showPodcastPlayer && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
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
