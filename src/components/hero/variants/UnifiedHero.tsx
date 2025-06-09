'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import QuoteBlock from '@/components/ui/QuoteBlock';
import { useLanguage } from '@/context/LanguageContext';
import PodcastPlayer from '@/components/PodcastPlayer';
import { i18n } from '@/i18n';
import { useAnalyticsTracking } from '../../../../seo/AnalyticsProvider';

const UnifiedHero: React.FC<HeroConfig> = ({ title, subtitle, quote, cta, showPodcastPlayer }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { trackEvent } = useAnalyticsTracking();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
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
  
  // Split title into words for colorful theme staggered animation
  const words = title ? title.split(' ') : [];
  
  return (
    <motion.div 
      layout
      className="container mx-auto px-4 relative z-10"
    >
      {/* Decorative elements - show/hide based on theme */}
      <AnimatePresence mode="wait">
        {!isColorful && (
          <motion.div
            key="decorative-elements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Corner decorative accents */}            <motion.div
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
            
            {/* Side line decorations */}
            <motion.div 
              className="absolute -left-20 top-[40%] hidden md:block" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
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
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"></div>
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Colorful theme geometric decorations */}
      <AnimatePresence mode="wait">
        {isColorful && (
          <motion.div
            key="colorful-decorations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl mx-auto"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center my-8 relative">
        {/* Title Section with theme-aware rendering */}
        <motion.div 
          layout
          className={`relative z-10 mx-auto mb-12 ${isColorful ? 'text-center' : 'text-center max-w-4xl'}`}
        >
          {/* Subtle dot grid behind the title for non-colorful themes */}
          <AnimatePresence mode="wait">
            {!isColorful && (
              <motion.div
                key="dot-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 -z-10 opacity-20 overflow-hidden"
              >
                <div className="absolute top-0 left-[20%] w-3/5 h-full" 
                     style={{ backgroundImage: 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Dynamic title rendering based on theme */}
          <AnimatePresence mode="wait">
            {isColorful ? (
              <motion.h2 
                key="colorful-title"
                layout
                className="text-6xl md:text-7xl font-bold leading-tight tracking-tight relative z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
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
                
                {/* Decorative glow effect for colorful theme */}
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
              </motion.h2>
            ) : (
              <motion.h1 
                key="default-title"
                layout
                className="text-5xl md:text-6xl font-bold mb-6 text-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Decorative line above title */}
                <motion.span 
                  className="block mx-auto w-12 h-1 bg-gradient-to-r from-blue-400/50 to-purple-400/50 mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                {title}
                
                {/* Decorative underline highlight */}
                <motion.div
                  className="absolute -z-10 h-4 rounded-full bg-blue-400/10 bottom-1"
                  initial={{ width: 0, x: '50%' }}
                  animate={{ width: '70%', x: '15%' }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>        {/* Enhanced Subtitle */}
        {subtitle && (
          <motion.div
            layout
            key={`subtitle-${theme}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`relative z-20 ${
              isColorful 
                ? 'mb-16 max-w-5xl mx-auto' 
                : 'mb-12 max-w-4xl mx-auto'
            }`}
          >
            {/* Decorative accent line above subtitle */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`w-24 h-0.5 mx-auto mb-6 ${
                isColorful
                  ? 'bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-blue-500'
                  : isLight
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gradient-to-r from-blue-400 to-purple-400'
              } rounded-full`}
            />
              {/* Main subtitle text with enhanced typography */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`${
                isColorful 
                  ? 'text-2xl md:text-3xl lg:text-4xl leading-relaxed' 
                  : 'text-xl md:text-2xl lg:text-3xl leading-relaxed'
              } font-medium text-center relative subtitle-gradient-animated`}
              style={{
                background: isColorful
                  ? 'linear-gradient(135deg, #06b6d4 0%, #ec4899 50%, #3b82f6 100%)'
                  : isLight
                  ? 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)'
                  : 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.15))'
              }}
            >
              {/* Split subtitle into parts for better visual hierarchy */}
              <span className="block">
                {subtitle.split('—')[0]?.trim()}
              </span>
              {subtitle.includes('—') && (
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className={`block mt-4 ${
                    isColorful ? 'text-lg md:text-xl lg:text-2xl' : 'text-lg md:text-xl'
                  }`}
                  style={{
                    background: isLight
                      ? 'linear-gradient(135deg, #374151 0%, #6b7280 100%)'
                      : 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 0.85
                  }}
                >
                  — {subtitle.split('—')[1]?.trim()}
                </motion.span>
              )}
            </motion.p>
            
            {/* Subtle glow effect behind text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="absolute inset-0 -z-10 blur-2xl"
              style={{
                background: isColorful
                  ? 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, rgba(236, 72, 153, 0.08) 50%, rgba(59, 130, 246, 0.08) 100%)'
                  : isLight
                  ? 'radial-gradient(ellipse at center, rgba(30, 64, 175, 0.06) 0%, rgba(124, 58, 237, 0.06) 100%)'
                  : 'radial-gradient(ellipse at center, rgba(96, 165, 250, 0.08) 0%, rgba(167, 139, 250, 0.08) 100%)',
              }}
            />
            
            {/* Floating accent elements */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className={`absolute -top-4 -left-4 w-2 h-2 rounded-full ${
                isColorful
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'bg-gradient-to-r from-blue-400 to-purple-400'
              } shadow-lg`}
            />
            
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1
              }}
              className={`absolute -bottom-4 -right-4 w-2 h-2 rounded-full ${
                isColorful
                  ? 'bg-gradient-to-r from-fuchsia-400 to-pink-500'
                  : 'bg-gradient-to-r from-purple-400 to-pink-400'
              } shadow-lg`}
            />
          </motion.div>
        )}

        {/* Quote Section */}
        {quote && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isColorful ? 0.8 : 0.6, duration: 0.8 }}
            className={`relative ${isColorful ? 'max-w-4xl mx-auto mb-12' : 'max-w-2xl mx-auto mt-16 p-8 rounded-lg bg-white/5 backdrop-blur-sm border-t border-l border-white/10'}`}
          >
            {isColorful ? (
              <QuoteBlock 
                quote={quote.text}
                author={quote.author}
                variant="default"
              />
            ) : (
              <>
                {/* Decorative elements for default theme */}
                <motion.div 
                  className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 4,
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
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                />
                
                <p className="italic text-gray-300 relative text-center">
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
                  }}
                />
              </>
            )}
          </motion.div>
        )}

        {/* CTA Button */}
        {cta && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isColorful ? 1.4 : 0.8, duration: 0.8 }}
            className="text-center relative"
          >
            <AnimatePresence mode="wait">
              {isColorful ? (
                <motion.div
                  key="colorful-cta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >                  <Link
                    href={localizedHref(cta.href)}
                    className="inline-block px-8 py-4 rounded-full font-medium transition-all duration-300 relative overflow-hidden text-white border border-transparent shadow-lg cosmic-shimmer"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)',
                      backgroundSize: '200% 200%',
                      animation: 'gradientShift 3s ease infinite',
                    }}
                    onClick={() => trackEvent('hero_cta_click', 'hero', `colorful_theme_${cta.text}`)}
                  >
                    <motion.span className="relative z-10">
                      {cta.text}
                    </motion.span>
                    
                    <motion.div 
                      className="absolute inset-0 bg-black/10"
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Animated glow effect */}
                    <motion.div 
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
                </motion.div>
              ) : (
                <motion.div
                  key="default-cta"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block relative"
                >
                  <motion.div 
                    className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-indigo-500/40 blur-md opacity-70"
                    animate={{
                      background: [
                        'linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.4), rgba(99, 102, 241, 0.4))',
                        'linear-gradient(to right, rgba(99, 102, 241, 0.4), rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.4))',
                        'linear-gradient(to right, rgba(168, 85, 247, 0.4), rgba(99, 102, 241, 0.4), rgba(59, 130, 246, 0.4))',
                        'linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.4), rgba(99, 102, 241, 0.4))'
                      ]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />                  <Link 
                    href={localizedHref(cta.href)} 
                    className="relative inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg z-10"
                    onClick={() => trackEvent('hero_cta_click', 'hero', `default_theme_${cta.text}`)}
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
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* Podcast Player */}
        {showPodcastPlayer && (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isColorful ? 1.6 : 0.8 }}
            className={`mt-16 ${isColorful ? 'max-w-3xl mx-auto' : ''}`}
          >
            <PodcastPlayer />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default UnifiedHero;
