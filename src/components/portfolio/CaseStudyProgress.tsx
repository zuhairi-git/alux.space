'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { durationSeconds } from '@/design-system';
import { useLanguage } from '@/context/LanguageContext';

export default function CaseStudyProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress(window.scrollY / scrollHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-1 z-50"
      role="progressbar"
      aria-label={locale === 'fi' ? 'Lukemisen edistyminen' : 'Reading progress'}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(scrollProgress * 100)}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-primary-500 to-ds-pink-500"
        style={{ scaleX: scrollProgress, transformOrigin: '0%' }}
        transition={{ duration: durationSeconds.instant }}
      />
    </div>
  );
}
