'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { durationSeconds, delaySeconds, stagger, transition as mt } from '@/design-system';
import BlogCard from './BlogCard';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { Post } from '@/app/blog/posts/data';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

interface ClientBlogPageProps {
  posts: Post[];
}

export default function ClientBlogPage({ posts }: ClientBlogPageProps) {
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const [filter, setFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'overlay'>('standard');
  
  // Extract unique categories from all posts
  const categories = Array.from(
    new Set(posts.flatMap(post => post.tags))
  );
  
  // Filter posts by category
  const filteredPosts = filter
    ? posts.filter(post => post.tags.includes(filter))
    : posts;
  
  // Split into featured + rest for standard mode
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.slice(1);
  
  // Translate category names
  const translateCategory = (category: string): string => {
  const categoryTranslations: Record<string, Record<string, string>> = {
      'Artificial Intelligence': {
        en: 'Artificial Intelligence',
        fi: 'Tekoäly'
      },
      'Technology': {
        en: 'Technology',
        fi: 'Teknologia'
      },
      'Productivity': {
        en: 'Productivity',
        fi: 'Tuottavuus'
      },
      'Future': {
        'en': 'Future',
        'fi': 'Tulevaisuus'
      },
      'Ethics': {
        'en': 'Ethics',
        'fi': 'Etiikka'
      },
      'Education': {
        'en': 'Education',
        'fi': 'Koulutus'
      },
      'Innovation': {
        'en': 'Innovation',
        'fi': 'Innovaatio'
      },
      'iOS': {
        'en': 'iOS',
        'fi': 'iOS'
      },
      'Mobile': {
        'en': 'Mobile',
        'fi': 'Mobiili'
      },      'Focus': {
        'en': 'Focus',
        'fi': 'Keskittyminen'
      },
      'Design Process': {
        'en': 'Design Process',
        'fi': 'Suunnitteluprosessi'
      },
      'Work-Life Balance': {
        'en': 'Work-Life Balance',
        'fi': 'Työelämän ja vapaa-ajan tasapaino'
      },
      'Creativity': {
        'en': 'Creativity',
        'fi': 'Luovuus'
      }
    };
    
    return categoryTranslations[category]?.[locale] || category;
  };
  
  const getAllText = (): string => {
    switch(locale) {
      case 'fi': return 'Kaikki';
      default: return 'All';
    }
  };
  
  const getNoPostsText = (): string => {
    switch(locale) {
      case 'fi': return 'Ei artikkeleita tässä kategoriassa.';
      default: return 'No posts found in this category.';
    }
  };
  
  const getViewModeText = (mode: 'standard' | 'overlay'): string => {
    if (mode === 'standard') {
      return locale === 'fi' ? 'Tavallinen' : 'Standard';
    } else {
      return locale === 'fi' ? 'Peite' : 'Overlay';
    }
  };

  const renderFeaturedPost = () => {
    if (!featuredPost || viewMode !== 'standard') return null;
    const localeContent = featuredPost.content[locale as keyof typeof featuredPost.content] || featuredPost.content.en;
    return (
      <motion.div
        className="mb-10"
        variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
        initial="hidden"
        animate="show"
        key={`featured-${featuredPost.slug}-${filter}`}
      >
        <BlogCard
          post={{
            slug: featuredPost.slug,
            title: localeContent.title,
            description: localeContent.description,
            image: featuredPost.image,
            publishedDate: localeContent.publishedDate,
            readTime: localeContent.readTime,
            tags: featuredPost.tags
          }}
          index={0}
          viewMode="featured"
        />
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen pt-32 pb-16" role="main">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-14">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationSeconds.slow }}
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            tabIndex={-1}
            id="blog-page-title"
          >
            {t('blogPage.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...mt.enter, delay: delaySeconds.md }}
            className="text-lg opacity-50 max-w-2xl leading-relaxed"
            role="doc-subtitle"
          >
            {t('blogPage.description')}
          </motion.p>
        </div>

        {/* Controls Bar */}
        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-current/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: durationSeconds.ease, delay: delaySeconds.lg }}
          role="region" 
          aria-labelledby="blog-controls"
        >
          <h2 id="blog-controls" className="sr-only">{t('blog.aria.filterControls')}</h2>
          
          {/* Category Dropdown */}
          <div className="flex items-center gap-3">
            <MaterialSymbol className="text-lg opacity-40">filter_list</MaterialSymbol>
            {/* eslint-disable-next-line design-system/no-raw-html-elements -- native select with option children and custom appearance styling */}
            <select
              value={filter || ''}
              onChange={(e) => setFilter(e.target.value || null)}
              className="bg-transparent border border-current/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none cursor-pointer pr-8 min-w-[180px]"
              aria-label={t('blog.aria.categoryFilter')}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              <option value="">{getAllText()}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {translateCategory(category)}
                </option>
              ))}
            </select>
            
            {filter && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs opacity-50"
              >
                {filteredPosts.length} {filteredPosts.length === 1 ? (locale === 'fi' ? 'artikkeli' : 'post') : (locale === 'fi' ? 'artikkelia' : 'posts')}
              </motion.span>
            )}
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-current/10 p-1" role="radiogroup" aria-label={t('blog.aria.viewMode')}>
            {/* eslint-disable-next-line design-system/no-raw-html-elements -- radio group view mode toggle with custom active/inactive styling */}
            <button
              onClick={() => setViewMode('standard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all ${
                viewMode === 'standard'
                  ? 'bg-primary/15 text-primary font-medium'
                  : 'opacity-50 hover:opacity-80'
              }`}
              role="radio"
              aria-checked={viewMode === 'standard'}
              aria-label={`${t('blog.aria.switchToViewMode')} ${getViewModeText('standard')}`}
            >
              <MaterialSymbol className="text-base">grid_view</MaterialSymbol>
              <span>{getViewModeText('standard')}</span>
            </button>
            {/* eslint-disable-next-line design-system/no-raw-html-elements -- radio group view mode toggle with custom active/inactive styling */}
            <button
              onClick={() => setViewMode('overlay')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all ${
                viewMode === 'overlay'
                  ? 'bg-primary/15 text-primary font-medium'
                  : 'opacity-50 hover:opacity-80'
              }`}
              role="radio"
              aria-checked={viewMode === 'overlay'}
              aria-label={`${t('blog.aria.switchToViewMode')} ${getViewModeText('overlay')}`}
            >
              <MaterialSymbol className="text-base">layers</MaterialSymbol>
              <span>{getViewModeText('overlay')}</span>
            </button>
          </div>
        </motion.div>

        {/* Featured Post (standard mode only) */}
        {renderFeaturedPost()}

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.section 
            className={`grid grid-cols-1 ${
              viewMode === 'standard' 
                ? 'md:grid-cols-2 gap-8' 
                : 'md:grid-cols-2 gap-6'
            }`}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: stagger.normal
                }
              }
            }}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            key={`${viewMode}-${filter}`}
            role="region"
            aria-label={t('blog.aria.blogPosts')}
            aria-live="polite"
            aria-atomic="false"
          >
            {(viewMode === 'standard' ? remainingPosts : filteredPosts).map((post, index) => {
              const localeContent = post.content[locale as keyof typeof post.content] || post.content.en;
              
              return (
                <motion.article
                  key={post.slug}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className={`h-full ${viewMode === 'overlay' ? 'aspect-[3/4]' : ''}`}
                  whileHover={{ y: -4 }}
                  transition={{ duration: durationSeconds.brisk }}
                  role="article"
                  aria-labelledby={`post-title-${post.slug}`}
                >
                  <BlogCard 
                    post={{
                      slug: post.slug,
                      title: localeContent.title,
                      description: localeContent.description,
                      image: post.image,
                      publishedDate: localeContent.publishedDate,
                      readTime: localeContent.readTime,
                      tags: post.tags
                    }}
                    index={index}
                    viewMode={viewMode}
                  />
                </motion.article>
              );
            })}
          </motion.section>
        </AnimatePresence>
        
        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
            role="status"
            aria-live="polite"
          >
            <MaterialSymbol className="text-5xl opacity-15 mb-4 block">search_off</MaterialSymbol>
            <p className="text-lg opacity-50">{getNoPostsText()}</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
