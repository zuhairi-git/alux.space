'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import PodcastPlayer from '@/components/PodcastPlayer';
import { i18n } from '@/i18n';
import { useAnalyticsTracking } from '../../../../seo/AnalyticsProvider';
import { durationSeconds, delaySeconds, transition as t, palette, Button, Icon, QuoteBlock, MotionDiv, MotionH1, MotionH2, MotionP, MotionSpan } from '@/design-system';

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
    <MotionDiv 
      layout
      className="container mx-auto px-4 relative z-10"
    >
      {/* Decorative elements - show/hide based on theme */}
      <AnimatePresence mode="wait">
        <MotionDiv
          key="decorative-elements"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={t.snap}
        >            {/* Corner decorative accents */}            <MotionDiv
              className="absolute top-4 left-4 md:top-10 md:left-10 w-16 h-16 md:w-24 md:h-24"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...t.snap, delay: delaySeconds.xs }}
            >
              <div className={`w-full h-full border-t-2 border-l-2 ${isColorful ? 'border-cyan-400/30' : 'border-blue-400/30'} rounded-tl-lg`} />
            </MotionDiv>
            
            <MotionDiv
              className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-16 h-16 md:w-24 md:h-24"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...t.snap, delay: delaySeconds.xs }}
            >
              <div className={`w-full h-full border-b-2 border-r-2 ${isColorful ? 'border-[var(--primary)]/30' : 'border-purple-400/30'} rounded-br-lg`} />
            </MotionDiv>
              {/* Side line decorations */}
            <MotionDiv 
              className="absolute -left-20 top-[40%] hidden md:block" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: durationSeconds.glacial, delay: delaySeconds['2xl'] }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`w-[1px] h-16 bg-gradient-to-b ${isColorful ? 'from-transparent via-cyan-400/30 to-transparent' : 'from-transparent via-blue-400/30 to-transparent'}`}></div>
                <div className={`w-[1px] h-16 bg-gradient-to-b ${isColorful ? 'from-transparent via-[var(--primary)]/30 to-transparent' : 'from-transparent via-purple-400/30 to-transparent'}`}></div>
              </div>
            </MotionDiv>
            
            <MotionDiv 
              className="absolute -right-20 top-[40%] hidden md:block" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: durationSeconds.glacial, delay: delaySeconds['2xl'] }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`w-[1px] h-16 bg-gradient-to-b ${isColorful ? 'from-transparent via-cyan-400/30 to-transparent' : 'from-transparent via-blue-400/30 to-transparent'}`}></div>
                <div className={`w-[1px] h-16 bg-gradient-to-b ${isColorful ? 'from-transparent via-[var(--primary)]/30 to-transparent' : 'from-transparent via-purple-400/30 to-transparent'}`}></div>
              </div>
            </MotionDiv>
          </MotionDiv>
      </AnimatePresence>

      {/* Colorful theme geometric decorations - REMOVED */}

      {/* Main content container */}
      <div className="flex flex-col items-center justify-center my-8 relative">
        {/* Title Section with theme-aware rendering */}
        <MotionDiv 
          layout
          className={`relative z-10 mx-auto mb-12 ${isColorful ? 'text-center' : 'text-center max-w-4xl'}`}
        >
          {/* Subtle dot grid behind the title */}
          <AnimatePresence mode="wait">
            <MotionDiv
              key="dot-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={t.snap}
              className="absolute inset-0 -z-10 opacity-20 overflow-hidden"
            >
              <div className="absolute top-0 left-[20%] w-3/5 h-full" 
                   style={{ backgroundImage: `radial-gradient(circle, ${isColorful ? 'rgba(236, 72, 153, 0.2)' : 'rgba(96, 165, 250, 0.2)'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
              </div>
            </MotionDiv>
          </AnimatePresence>
          
          {/* Dynamic title rendering based on theme */}
          <AnimatePresence mode="wait">
            {isColorful ? (
              <MotionH2 
                key="colorful-title"
                layout
                className="text-6xl md:text-7xl font-bold leading-tight tracking-tight relative z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: durationSeconds.slow }}
              >
                {words.map((word, i) => (
                  <MotionSpan
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: i * delaySeconds.md, 
                      duration: durationSeconds.dramatic,
                      ease: [0.19, 1, 0.22, 1]
                    }}
                    className="inline-block mx-2 bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] relative"
                  >
                    {word}
                  </MotionSpan>
                ))}
                
                {/* Decorative glow effect for colorful theme - REMOVED */}
              </MotionH2>
            ) : (
              <MotionH1 
                key="default-title"
                layout
                className="text-5xl md:text-6xl font-bold mb-6 text-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: durationSeconds.slow }}
              >
                {/* Decorative line above title */}
                <MotionSpan 
                  className="block mx-auto w-12 h-1 bg-gradient-to-r from-blue-400/50 to-purple-400/50 mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: durationSeconds.dramatic, delay: delaySeconds['2xl'] }}
                />
                
                {title}
                
                {/* Decorative underline highlight */}
                <MotionDiv
                  className="absolute -z-10 h-4 rounded-full bg-blue-400/10 bottom-1"
                  initial={{ width: 0, x: '50%' }}
                  animate={{ width: '70%', x: '15%' }}
                  transition={{ duration: durationSeconds.dramatic, delay: 1.2 }}
                />
              </MotionH1>
            )}
          </AnimatePresence>
        </MotionDiv>        {/* Enhanced Subtitle */}
        {subtitle && (
          <MotionDiv
            layout
            key={`subtitle-${theme}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: durationSeconds.dramatic, delay: delaySeconds.lg }}
            className={`relative z-20 ${
              isColorful 
                ? 'mb-16 max-w-5xl mx-auto' 
                : 'mb-12 max-w-4xl mx-auto'
            }`}
          >
            {/* Decorative accent line above subtitle */}
            <MotionDiv
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: durationSeconds.dramatic, delay: delaySeconds['2xl'] }}
              className={`w-24 h-0.5 mx-auto mb-6 ${
                isColorful
                  ? 'bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]'
                  : isLight
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-gradient-to-r from-blue-400 to-purple-400'
              } rounded-full`}
            />
              {/* Main subtitle text with enhanced typography */}
            <MotionP
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: durationSeconds.dramatic, delay: delaySeconds['3xl'] }}
              className={`${
                isColorful 
                  ? 'text-2xl md:text-3xl lg:text-4xl leading-relaxed' 
                  : 'text-xl md:text-2xl lg:text-3xl leading-relaxed'
              } font-medium text-center relative subtitle-gradient-animated`}
              style={{
                background: isColorful
                  ? `linear-gradient(135deg, ${palette.cyan[500]} 0%, ${palette.pink[500]} 50%, ${palette.blue[500]} 100%)`
                  : isLight
                  ? `linear-gradient(135deg, ${palette.blue[700]} 0%, ${palette.purple[700]} 100%)`
                  : `linear-gradient(135deg, ${palette.blue[400]} 0%, ${palette.purple[400]} 100%)`,
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
                <MotionSpan 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: durationSeconds.dramatic, delay: 0.9 }}
                  className={`block mt-4 ${
                    isColorful ? 'text-lg md:text-xl lg:text-2xl' : 'text-lg md:text-xl'
                  }`}
                  style={{
                    background: isLight
                      ? `linear-gradient(135deg, ${palette.gray[700]} 0%, ${palette.gray[500]} 100%)`
                      : `linear-gradient(135deg, ${palette.gray[300]} 0%, ${palette.gray[400]} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 0.85
                  }}
                >
                  — {subtitle.split('—')[1]?.trim()}
                </MotionSpan>
              )}
            </MotionP>
            
            {/* Subtle glow effect behind text */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: delaySeconds['4xl'] }}
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
            <MotionDiv
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
            
            <MotionDiv
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
                  ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--gradient-mid)]'
                  : 'bg-gradient-to-r from-purple-400 to-pink-400'
              } shadow-lg`}
            />
          </MotionDiv>
        )}

        {/* Quote Section */}
        {quote && (
          <MotionDiv
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isColorful ? delaySeconds['4xl'] : delaySeconds['3xl'], duration: durationSeconds.dramatic }}
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
                <MotionDiv 
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
                
                <MotionDiv 
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
                  <MotionSpan 
                    className="block text-blue-400 mt-6 text-center"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: delaySeconds['5xl'] }}
                  >
                    — {quote.author}
                  </MotionSpan>
                </p>
                
                <MotionDiv 
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
          </MotionDiv>
        )}

        {/* CTA Button */}
        {cta && (
          <MotionDiv
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delaySeconds['4xl'], duration: durationSeconds.dramatic }}
            className="text-center relative"
          >
            <MotionDiv
              key="default-cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={t.snap}
              className="inline-block relative"
            >
              <MotionDiv 
                className={`absolute -inset-1 rounded-lg bg-gradient-to-r ${isColorful ? 'from-cyan-500/40 via-fuchsia-500/40 to-blue-500/40' : 'from-blue-500/40 via-purple-500/40 to-indigo-500/40'} blur-md opacity-70`}
                animate={{
                  background: isColorful 
                    ? [
                      'linear-gradient(to right, rgba(6, 182, 212, 0.4), rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4))',
                      'linear-gradient(to right, rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.4), rgba(236, 72, 153, 0.4))',
                      'linear-gradient(to right, rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.4))',
                      'linear-gradient(to right, rgba(6, 182, 212, 0.4), rgba(236, 72, 153, 0.4), rgba(59, 130, 246, 0.4))'
                    ]
                    : [
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
              />
              <Link 
                href={localizedHref(cta.href)} 
                onClick={() => trackEvent('hero_cta_click', 'hero', `${isColorful ? 'colorful' : 'default'}_theme_${cta.text}`)}
              >
                <Button variant="primary" size="lg" rightIcon={<Icon name="arrow_forward" />}>
                  {cta.text}
                </Button>
              </Link>
            </MotionDiv>
          </MotionDiv>
        )}
          {/* Podcast Player */}
        {showPodcastPlayer && (
          <MotionDiv 
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isColorful ? 1.6 : 0.8 }}
            className={`mt-16 ${isColorful ? 'max-w-3xl mx-auto' : ''}`}
          ><PodcastPlayer />
          </MotionDiv>
        )}
      </div>
    </MotionDiv>
  );
};

export default UnifiedHero;

