'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'next-share';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';

interface BlogPostClientProps {
  children: React.ReactNode;
  shareUrl: string;
  title: string;
}

export default function BlogPostClient({ children, shareUrl, title }: BlogPostClientProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  
  // Keep colorful theme dark, only light theme is treated differently
  const isLight = theme === 'light';

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <div className="relative">      {/* Social share sidebar - visible once scrolled */}
      {scrollPosition > 300 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-3 z-10"
          role="complementary"
          aria-label={t('blog.aria.socialShare')}
        >
          <div className={`w-px h-12 bg-gradient-to-b from-transparent ${isLight ? 'via-primary/20' : 'via-primary/30'} to-transparent mx-auto`} aria-hidden="true" />
          
          <nav 
            className="flex flex-col gap-2 items-center"
            role="navigation"
            aria-label={t('blog.aria.shareButtons')}
          >
            <TwitterShareButton 
              url={shareUrl} 
              title={title}
              aria-label={`${t('blog.aria.shareOn')} Twitter`}
            >
              <div className={`p-2 ${isLight ? 'bg-white/60' : 'bg-theme/30'} backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900`}>
                <TwitterIcon size={24} round />
              </div>
            </TwitterShareButton>
            
            <LinkedinShareButton 
              url={shareUrl} 
              title={title}
              aria-label={`${t('blog.aria.shareOn')} LinkedIn`}
            >
              <div className={`p-2 ${isLight ? 'bg-white/60' : 'bg-theme/30'} backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900`}>
                <LinkedinIcon size={24} round />
              </div>
            </LinkedinShareButton>
            
            <FacebookShareButton 
              url={shareUrl} 
              quote={title}
              aria-label={`${t('blog.aria.shareOn')} Facebook`}
            >
              <div className={`p-2 ${isLight ? 'bg-white/60' : 'bg-theme/30'} backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900`}>
                <FacebookIcon size={24} round />
              </div>
            </FacebookShareButton>
          </nav>
          
          <div className={`w-px h-12 bg-gradient-to-b from-transparent ${isLight ? 'via-primary/20' : 'via-primary/30'} to-transparent mx-auto`} aria-hidden="true" />
        </motion.div>
      )}
        {/* Mobile share buttons - at the top */}
      <nav 
        className="flex gap-3 mb-8 lg:hidden"
        role="navigation"
        aria-label={t('blog.aria.mobileShareButtons')}
      >
        <TwitterShareButton 
          url={shareUrl} 
          title={title}
          aria-label={`${t('blog.aria.shareOn')} Twitter`}
        >
          <div className={`p-2 ${isLight ? 'bg-white/60' : 'bg-theme/30'} backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900`}>
            <TwitterIcon size={28} round />
          </div>
        </TwitterShareButton>
        
        <LinkedinShareButton 
          url={shareUrl} 
          title={title}
          aria-label={`${t('blog.aria.shareOn')} LinkedIn`}
        >
          <div className={`p-2 ${isLight ? 'bg-white/60' : 'bg-theme/30'} backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900`}>
            <LinkedinIcon size={28} round />
          </div>
        </LinkedinShareButton>
        
        <FacebookShareButton 
          url={shareUrl} 
          quote={title}
          aria-label={`${t('blog.aria.shareOn')} Facebook`}
        >
          <div className={`p-2 ${isLight ? 'bg-white/60' : 'bg-theme/30'} backdrop-blur-md rounded-full hover:bg-primary/20 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900`}>
            <FacebookIcon size={28} round />
          </div>
        </FacebookShareButton>
      </nav>
      
      {children}
    </div>
  );
}