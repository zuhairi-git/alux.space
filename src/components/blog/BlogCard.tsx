'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { durationSeconds, transition as t } from '@/design-system';
import Badge from '@/components/ui/Badge';
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
  viewMode?: 'standard' | 'overlay' | 'featured';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, viewMode = 'standard' }) => {
  const { locale } = useLanguage();
  const { trackEvent } = useAnalyticsTracking();
  const localizedPostUrl = `/${locale}/blog/${post.slug}`;
  
  const displayDate = formatDate(post.publishedDate, locale);
  const isoDate = toISOString(post.publishedDate);

  const getArticleAriaLabel = () => {
    return `Read article: ${post.title}. Published on ${displayDate}. ${post.readTime} read. Tags: ${post.tags.join(', ')}.`;
  };

  // Featured view — full-width hero card for the latest post
  if (viewMode === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={t.enterSlow}
        viewport={{ once: true }}
        className="w-full"
        role="article"
        aria-labelledby={`blog-title-${post.slug}`}
        aria-describedby={`blog-desc-${post.slug}`}
      >
        <Link
          href={localizedPostUrl}
          className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
          aria-label={getArticleAriaLabel()}
          onClick={() => trackEvent('blog_card_click', 'blog', `featured_${post.slug}_${post.tags[0] || 'uncategorized'}`)}
        >
          <div className="theme-card-flex p-0 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative w-full md:w-[55%] h-64 md:h-[360px] overflow-hidden bg-black shrink-0">
                <motion.div
                  className="absolute inset-0 w-full h-full scale-[1.01]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 55vw"
                    priority
                  />
                </motion.div>
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="gradient">
                    {post.tags[0] || 'Blog'}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(1, 4).map((tag, idx) => (
                    <Badge key={idx} variant="default">{tag}</Badge>
                  ))}
                </div>

                <h3
                  id={`blog-title-${post.slug}`}
                  className="text-2xl md:text-3xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors duration-200"
                >
                  {post.title}
                </h3>

                <p
                  id={`blog-desc-${post.slug}`}
                  className="text-[var(--muted-foreground)] text-base leading-relaxed mb-6 line-clamp-3"
                >
                  {post.description}
                </p>

                <div className="flex items-center gap-5 text-sm text-[var(--muted-foreground)] mt-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols text-sm" aria-hidden="true">calendar_today</span>
                    <time dateTime={isoDate}>{displayDate}</time>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols text-sm" aria-hidden="true">schedule</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Overlay view
  if (viewMode === 'overlay') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={t.enterSlow}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="h-full w-full"
        role="article"
        aria-labelledby={`blog-title-${post.slug}`}
        aria-describedby={`blog-desc-${post.slug}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-ds-gray-200/30 dark:border-ds-gray-700/30 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
          {/* Background Image */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                duration: durationSeconds.brisk
              }}
            >
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Overlay gradient — stronger for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
          </div>

          <Link 
            href={localizedPostUrl} 
            className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
            aria-label={getArticleAriaLabel()}
            onClick={() => trackEvent('blog_card_click', 'blog', `overlay_${post.slug}_${post.tags[0] || 'uncategorized'}`)}
          >
            <div className="relative h-full flex flex-col justify-end p-7 z-10">
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <Badge variant="gradient" aria-label={`Category: ${post.tags[0] || 'Blog'}`}>
                  {post.tags[0] || 'Blog'}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(1, 3).map((tag, idx) => (
                  <Badge key={idx} variant="glass" aria-label={`Tag: ${tag}`}>{tag}</Badge>
                ))}
              </div>

              <h3 
                id={`blog-title-${post.slug}`}
                className="text-xl md:text-2xl font-bold text-on-dark mb-3 leading-snug"
              >
                {post.title}
              </h3>
              <p 
                id={`blog-desc-${post.slug}`}
                className="text-on-dark/75 text-sm leading-relaxed line-clamp-3"
              >
                {post.description}
              </p>

              <div className="flex justify-between items-center text-sm mt-5 pt-4 border-t border-on-dark/15">
                <time 
                  dateTime={isoDate}
                  className="text-on-dark/60"
                  aria-label={`Published on ${displayDate}`}
                >
                  {displayDate}
                </time>
                <span 
                  className="flex items-center text-on-dark/60"
                  aria-label={`Reading time: ${post.readTime}`}
                >
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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

  // Standard view (default) — clean, readable card
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={t.enterSlow}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full w-full"
      role="article"
      aria-labelledby={`blog-title-${post.slug}`}
      aria-describedby={`blog-desc-${post.slug}`}
    >
        <div className="theme-card-flex p-0 rounded-2xl h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-theme/70 hover:border-primary/30 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
        <Link 
          href={localizedPostUrl} 
          className="group h-full flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
          aria-label={getArticleAriaLabel()}
          onClick={() => trackEvent('blog_card_click', 'blog', `standard_${post.slug}_${post.tags[0] || 'uncategorized'}`)}
        >
          {/* Image Section */}
          <div className="relative w-full h-56 overflow-hidden bg-black shrink-0">
            <motion.div
              className="absolute inset-0 w-full h-full scale-[1.01]"
              whileHover={{ scale: 1.05 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15, 
                duration: durationSeconds.brisk
              }}
            >
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            
            {/* Category badge */}
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="gradient" aria-label={`Category: ${post.tags[0] || 'Blog'}`}>
                {post.tags[0] || 'Blog'}
              </Badge>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 
              id={`blog-title-${post.slug}`}
              className="text-lg font-semibold mb-2 leading-snug group-hover:text-primary transition-colors duration-200"
            >
              {post.title}
            </h3>
            <p 
              id={`blog-desc-${post.slug}`}
              className="text-[var(--muted-foreground)] text-sm leading-relaxed line-clamp-3 mb-4"
            >
              {post.description}
            </p>

            {/* Tags */}
            {post.tags.length > 1 && (
              <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Article tags">
                {post.tags.slice(1, 3).map((tag, idx) => (
                  <span key={idx} role="listitem">
                    <Badge variant="default" size="sm">{tag}</Badge>
                  </span>
                ))}
              </div>
            )}

            {/* Date and read time */}
            <div className="text-xs mt-auto pt-4 flex items-center justify-between border-t border-current/8">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols text-sm opacity-40" aria-hidden="true">calendar_today</span>
                <time 
                  dateTime={isoDate}
                  className="text-[var(--muted-foreground)]"
                >
                  {displayDate}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols text-sm opacity-40" aria-hidden="true">schedule</span>
                <span className="text-[var(--muted-foreground)]">
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