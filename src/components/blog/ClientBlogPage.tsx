'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadioGroup } from '@headlessui/react';
import BlogCard from './BlogCard';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { Post } from '@/app/blog/posts/data';

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
  
  // Translate category names
  const translateCategory = (category: string): string => {
    // You can add translations for categories here if needed
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
      // Add more category translations as needed
    };
    
    return categoryTranslations[category]?.[locale] || category;
  };
  
  // Translate "All" button text
  const getAllText = (): string => {
    switch(locale) {
      case 'fi': return 'Kaikki';
      default: return 'All';
    }
  };
  
  // Translate "No posts found" text
  const getNoPostsText = (): string => {
    switch(locale) {
      case 'fi': return 'Ei artikkeleita tässä kategoriassa.';
      default: return 'No posts found in this category.';
    }
  };
  
  // Translate view mode labels
  const getViewModeText = (mode: 'standard' | 'overlay'): string => {
    if (mode === 'standard') {
      return locale === 'fi' ? 'Tavallinen' : 'Standard';
    } else {
      return locale === 'fi' ? 'Peite' : 'Overlay';
    }
  };
    return (
    <main className="min-h-screen pt-32 pb-16" role="main">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm"
            tabIndex={-1}
            id="blog-page-title"
          >
            {t('blogPage.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl opacity-60 mb-12"
            role="doc-subtitle"
          >
            {t('blogPage.description')}
          </motion.p>
          
          {/* Filters and View Mode Toggle */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12" role="region" aria-labelledby="blog-controls">
            <h2 id="blog-controls" className="sr-only">{t('blog.aria.filterControls')}</h2>
            
            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap gap-2 flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <RadioGroup 
                value={filter} 
                onChange={setFilter} 
                className="flex flex-wrap gap-2"
                aria-label={t('blog.aria.categoryFilter')}
              >
                <RadioGroup.Label className="sr-only">{t('blog.aria.categoryFilterDescription')}</RadioGroup.Label>
                
                <RadioGroup.Option value={null}>
                  {({ checked }) => (
                    <button
                      className={`px-4 py-2 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        checked
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                          : 'bg-gray-200/10 text-gray-400 hover:bg-gray-200/20'
                      }`}
                      aria-pressed={checked}
                      aria-label={`${t('blog.aria.showAllPosts')} ${getAllText()}`}
                    >
                      {getAllText()}
                    </button>
                  )}
                </RadioGroup.Option>
                
                {categories.map((category) => (
                  <RadioGroup.Option key={category} value={category}>
                    {({ checked }) => (
                      <button
                        className={`px-4 py-2 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 ${
                          checked
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                            : 'bg-gray-200/10 text-gray-400 hover:bg-gray-200/20'
                        }`}
                        aria-pressed={checked}
                        aria-label={`${t('blog.aria.filterByCategory')} ${translateCategory(category)}`}
                      >
                        {translateCategory(category)}
                      </button>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </motion.div>
            
            {/* View Mode Toggle */}
            <motion.div 
              className="flex items-center bg-theme-card rounded-full p-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <RadioGroup 
                value={viewMode} 
                onChange={setViewMode} 
                className="flex items-center"
                aria-label={t('blog.aria.viewMode')}
              >
                <RadioGroup.Label className="sr-only">{t('blog.aria.viewModeDescription')}</RadioGroup.Label>
                
                <RadioGroup.Option value="standard">
                  {({ checked }) => (
                    <motion.button
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        checked
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                          : 'text-gray-400 hover:text-gray-100'
                      }`}
                      whileHover={{ scale: checked ? 1 : 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      aria-pressed={checked}
                      aria-label={`${t('blog.aria.switchToViewMode')} ${getViewModeText('standard')}`}
                    >
                      <span className="material-symbols-rounded text-sm" aria-hidden="true">grid_view</span>
                      <span>{getViewModeText('standard')}</span>
                    </motion.button>
                  )}
                </RadioGroup.Option>
                
                <RadioGroup.Option value="overlay">
                  {({ checked }) => (
                    <motion.button
                      className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        checked
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                          : 'text-gray-400 hover:text-gray-100'
                      }`}
                      whileHover={{ scale: checked ? 1 : 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      aria-pressed={checked}
                      aria-label={`${t('blog.aria.switchToViewMode')} ${getViewModeText('overlay')}`}
                    >
                      <span className="material-symbols-rounded text-sm" aria-hidden="true">layers</span>
                      <span>{getViewModeText('overlay')}</span>
                    </motion.button>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
            </motion.div>
          </div>
        </div>          {/* Blog Posts Grid */}
        <motion.section 
          className={`grid grid-cols-1 ${
            viewMode === 'standard' 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
          } gap-8`}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
          key={viewMode} // This forces re-render animation when view mode changes
          role="region"
          aria-label={t('blog.aria.blogPosts')}
          aria-live="polite"
          aria-atomic="false"
        >
          {filteredPosts.map((post, index) => {
            // Get the content for the current locale or fall back to English
            const localeContent = post.content[locale as keyof typeof post.content] || post.content.en;
            
            return (
              <motion.article
                key={post.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className={`h-full ${viewMode === 'overlay' ? 'aspect-[3/4]' : ''}`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
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
        
        {/* Empty state when no posts match filter */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
            role="status"
            aria-live="polite"
          >
            <p className="text-xl opacity-60">{getNoPostsText()}</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
