'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'next-share';
import { useLanguage } from '@/context/LanguageContext';
import { useAnalyticsTracking } from '../../../seo/AnalyticsProvider';
import { formatDate, toISOString } from '@/utils/dateUtils';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    description: string;
    image: string;
    publishedDate: string;
    readTime: string;
    tags: string[];
  };
  index: number;
  viewMode?: 'standard' | 'overlay';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, viewMode = 'standard' }) => {
  const { locale } = useLanguage();
  const { trackEvent } = useAnalyticsTracking();
  // Create localized blog post URL
  const localizedPostUrl = `/${locale}/blog/${post.slug}`;
  
  // Format the date for display while keeping ISO format for dateTime attribute
  const displayDate = formatDate(post.publishedDate, locale);
  const isoDate = toISOString(post.publishedDate);

  // Helper function to format aria-label for links
  const getArticleAriaLabel = () => {
    return `Read article: ${post.title}. Published on ${displayDate}. ${post.readTime} read. Tags: ${post.tags.join(', ')}.`;
  };

  // Helper function for share button aria-labels
  const getShareAriaLabel = (platform: string) => {
    return `Share "${post.title}" on ${platform}`;
  };

  // Render card based on view mode
  if (viewMode === 'overlay') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="h-full w-full"
        role="article"
        aria-labelledby={`blog-title-${post.slug}`}
        aria-describedby={`blog-desc-${post.slug}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-gray-200/30 dark:border-neutral-700/30 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
          {/* Background Image */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                duration: 0.2
              }}
            >
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>
          </div>          <Link 
            href={localizedPostUrl} 
            className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
            aria-label={getArticleAriaLabel()}
            onClick={() => trackEvent('blog_card_click', 'blog', `overlay_${post.slug}_${post.tags[0] || 'uncategorized'}`)}
          >
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              {/* Badge */}
              <div className="absolute top-3 right-3">
                <span 
                  className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  aria-label={`Category: ${post.tags[0] || 'Blog'}`}
                >
                  {post.tags[0] || 'Blog'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(1, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs bg-white/20 text-white font-medium"
                    aria-label={`Tag: ${tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 
                id={`blog-title-${post.slug}`}
                className="text-xl font-bold text-white mb-2"
              >
                {post.title}
              </h3>
              <p 
                id={`blog-desc-${post.slug}`}
                className="text-white/80 text-sm line-clamp-3"
              >
                {post.description}
              </p>

              <div className="flex justify-between items-center text-sm mt-4 pt-4 border-t border-white/20">
                <time 
                  dateTime={isoDate}
                  className="text-white/60"
                  aria-label={`Published on ${displayDate}`}
                >
                  {displayDate}
                </time>
                <span 
                  className="flex items-center text-white/60"
                  aria-label={`Reading time: ${post.readTime}`}
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </motion.article>
    );
  }

  // Standard view (default)
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full w-full"
      role="article"
      aria-labelledby={`blog-title-${post.slug}`}
      aria-describedby={`blog-desc-${post.slug}`}
    >
      <div className="theme-card-flex p-0 rounded-xl h-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-theme/70 border border-gray-200/30 dark:border-neutral-700/30 hover:border-primary/30 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">        <Link 
          href={localizedPostUrl} 
          className="h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
          aria-label={getArticleAriaLabel()}
          onClick={() => trackEvent('blog_card_click', 'blog', `standard_${post.slug}_${post.tags[0] || 'uncategorized'}`)}
        >
          {/* Image Section */}
          <div className="relative w-full h-48 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden bg-black">
              <motion.div
                className="absolute inset-0 w-full h-full scale-[1.01]"
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15, 
                  duration: 0.2
                }}
              >
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            </div>
            
            {/* Display post main category as a badge */}
            <div className="absolute top-3 right-3 z-10">
              <span 
                className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                aria-label={`Category: ${post.tags[0] || 'Blog'}`}
              >
                {post.tags[0] || 'Blog'}
              </span>
            </div>
            
            {/* Social sharing buttons */}
            <div className="absolute top-3 left-3 z-10 flex gap-2">
              <TwitterShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : '')}${localizedPostUrl}`}
                title={post.title}
              >
                <motion.div
                  className={`backdrop-blur-sm p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  role="button"
                  aria-label={getShareAriaLabel('Twitter')}
                  tabIndex={0}
                >
                  <TwitterIcon size={20} round />
                </motion.div>
              </TwitterShareButton>
              <LinkedinShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : '')}${localizedPostUrl}`}
                title={post.title}
              >
                <motion.div
                  className={`backdrop-blur-sm p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  role="button"
                  aria-label={getShareAriaLabel('LinkedIn')}
                  tabIndex={0}
                >
                  <LinkedinIcon size={20} round />
                </motion.div>
              </LinkedinShareButton>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start mb-4 gap-4">
              <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-primary bg-primary/10 rounded-lg" aria-hidden="true">
                <span className="material-symbols-rounded text-4xl">
                  article
                </span>
              </div>
              <div className="flex-1">
                <h3 
                  id={`blog-title-${post.slug}`}
                  className={`text-xl font-semibold text-primary mb-1`}
                >
                  {post.title}
                </h3>
                <div 
                  id={`blog-desc-${post.slug}`}
                  className="opacity-80 text-sm line-clamp-2"
                >
                  {post.description}
                </div>
              </div>
            </div>

            {/* Tags Section */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 mb-4" role="list" aria-label="Article tags">
                {post.tags.slice(0, 2).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 rounded-full text-xs bg-primary/10 text-primary font-medium"
                    role="listitem"
                    aria-label={`Tag: ${tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Date and read time section */}
            <div className="text-xs mt-auto pt-4 flex items-center justify-between border-t border-current/10">
              <div className="flex items-center gap-1">
                <span className="material-symbols-rounded text-sm text-primary" aria-hidden="true">calendar_today</span>
                <time 
                  dateTime={isoDate}
                  className="opacity-80"
                  aria-label={`Published on ${displayDate}`}
                >
                  {displayDate}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-rounded text-sm text-primary" aria-hidden="true">schedule</span>
                <span 
                  className="opacity-80"
                  aria-label={`Reading time: ${post.readTime}`}
                >
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;