'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { durationSeconds } from '@/design-system';
import { useLanguage } from '@/context/LanguageContext';
import { LiveRegion } from '../ui/LiveRegion';

export function ReadingProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const { locale, isRtl } = useLanguage();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        const progress = window.scrollY / scrollHeight;
        setScrollProgress(progress);
        
        // Announce progress at 25%, 50%, 75%, and 100%
        const progressPercent = Math.round(progress * 100);
        if (progressPercent === 25 || progressPercent === 50 || progressPercent === 75 || progressPercent === 100) {
          setAnnouncement(`${locale === 'fi' ? 'Lukeminen edennyt' : 'Reading progress'} ${progressPercent}%`);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Call once to initialize
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [locale]);
  
  if (!mounted) return null;
  
  return (
    <>
      <div 
        className="fixed top-0 start-0 w-full h-1 z-50"
        role="progressbar"
        aria-label={locale === 'fi' ? 'Lukemisen edistyminen' : 'Reading progress'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuetext={`${Math.round(scrollProgress * 100)}% ${locale === 'fi' ? 'luettu' : 'read'}`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-start to-end"
          style={{
            scaleX: scrollProgress,
            // transform-origin is resolved against the box, not the writing
            // direction, so RTL has to anchor the bar to the right edge itself.
            transformOrigin: isRtl ? '100%' : '0%',
          }}
          transition={{ duration: durationSeconds.instant }}
        />
      </div>
      <LiveRegion message={announcement} />
    </>
  );
}