'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import AudioPlayer from '../ui/AudioPlayer';

interface BlogPostHeaderProps {
  title: string;
  description: string;
  publishedDate: string;
  readTime: string;
  author: string;
  tags: string[];
  image: string;
  slug?: string; // Make slug optional
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  title,
  description,
  publishedDate,
  readTime,
  author,
  tags,
  image,
  slug,
}) => {  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const isLight = theme === 'light';
  // Get localized strings for UI elements
  const getBackToBlogText = (): string => {
    switch(locale) {
      case 'fi': return 'Takaisin blogiin';
      default: return 'Back to all articles';
    }
  };  // Map of blog posts with audio content
  const audioMap: Record<string, string> = {
    // Make sure the path matches exactly where the file is located
    'primitive-human': '/audio/blog/blog03.mp3',
    'sharpened-by-machine': '/audio/blog/Sharpened-by-the-Machine_ AI-and-Human-Development.wav',
    // Add more audio files here as they become available
    // 'other-post-slug': '/audio/blog/other-file.mp3',
  };

  // Map of audio categories for specific posts
  const audioCategoryMap: Record<string, string> = {
    'sharpened-by-machine': 'Deep Dive Podcast',
    // Add more categories here as needed
  };
  // Check if this post has audio narration and if the audio file actually exists
  const hasAudio = slug && slug in audioMap;
  const audioSrc = hasAudio ? audioMap[slug] : '';
  const audioCategory = slug && slug in audioCategoryMap ? audioCategoryMap[slug] : undefined;
  return (
    <header className="mb-12" role="banner">
      {/* Back to blog link */}
      <motion.nav 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
        role="navigation"
        aria-label={t('blog.aria.breadcrumb')}
      >
        <Link 
          href={`/${locale}/blog`} 
          className={`inline-flex items-center text-primary hover:text-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm p-1`}
          aria-label={t('blog.aria.backToBlog')}
        >
          <svg 
            className={`w-5 h-5 mr-2`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {getBackToBlogText()}
        </Link>
      </motion.nav>
        {/* Title and Meta */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        aria-labelledby="blog-title"
      >
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label={t('blog.aria.tags')}>
          {tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-3 py-1 ${isLight ? 'bg-primary/10' : 'bg-primary/10'} text-primary rounded-full text-sm`}
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h1 
          id="blog-title"
          className={`text-4xl md:text-5xl font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm`}
          tabIndex={-1}
        >
          {title}
        </h1>
        
        <p 
          className={`text-xl ${isLight ? 'text-gray-700' : 'text-theme opacity-80'} mb-6`}
          role="doc-subtitle"
        >
          {description}
        </p>
        
        <div 
          className={`flex flex-wrap items-center gap-6 ${isLight ? 'text-gray-600' : 'text-theme opacity-70'} mb-8 border-b ${isLight ? 'border-gray-200' : 'border-primary/10'} pb-8`}
          role="group"
          aria-label={t('blog.aria.articleMeta')}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <Image 
                src="/images/me/ali.png" 
                alt={`${t('blog.aria.authorPhoto')} ${author}`}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium" role="doc-author">{author}</span>
          </div>
          <span className="flex items-center" role="doc-dateline">
            <svg 
              className="w-5 h-5 mr-2 text-primary" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            <time dateTime={publishedDate}>{publishedDate}</time>
          </span>
          <span className="flex items-center">
            <svg 
              className="w-5 h-5 mr-2 text-primary" 
              fill="currentColor" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            <span aria-label={t('blog.aria.readTime')}>{readTime}</span>
          </span>
        </div>
      </motion.section>
        {/* Audio Player (if available) */}
      {hasAudio && audioSrc && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          aria-labelledby="audio-section"
        >
          <h2 id="audio-section" className="sr-only">{t('blog.aria.audioNarration')}</h2>          <AudioPlayer
            src={audioSrc}
            title={t('blog.aria.listenToArticle')}
            category={audioCategory}
          />
        </motion.section>
      )}
      
      {/* Featured Image */}
      <motion.figure
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`relative w-full h-[60vh] max-h-[500px] rounded-2xl overflow-hidden mb-10 ${isLight ? 'shadow-md' : ''}`}
        role="img"
        aria-labelledby="featured-image-caption"
      >
        <Image
          src={image}
          alt={`${t('blog.aria.featuredImage')} ${title}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-black/20 to-transparent' : 'bg-gradient-to-t from-black/30 to-transparent'}`} aria-hidden="true" />
        <figcaption id="featured-image-caption" className="sr-only">
          {t('blog.aria.featuredImageFor')} {title}
        </figcaption>
      </motion.figure>
    </header>
  );
};

export default BlogPostHeader;
