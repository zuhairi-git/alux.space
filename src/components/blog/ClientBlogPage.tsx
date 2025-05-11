'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { Post } from '@/app/blog/posts/data';

interface ClientBlogPageProps {
  posts: Post[];
  locale: string;
}

export default function ClientBlogPage({ posts, locale: initialLocale }: ClientBlogPageProps) {
  const { locale, isRTL } = useLanguage();
  const { t } = useTranslations(locale);
  const [filter, setFilter] = useState<string | null>(null);
  
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
        fi: 'Tekoäly',
        ar: 'الذكاء الاصطناعي'
      },
      'Technology': {
        en: 'Technology',
        fi: 'Teknologia',
        ar: 'التكنولوجيا'
      },
      'Productivity': {
        en: 'Productivity',
        fi: 'Tuottavuus',
        ar: 'الإنتاجية'
      },
      'Future': {
        'en': 'Future',
        'fi': 'Tulevaisuus',
        'ar': 'المستقبل'
      },
      'Ethics': {
        'en': 'Ethics',
        'fi': 'Etiikka',
        'ar': 'الأخلاقيات'
      },
      'Education': {
        'en': 'Education',
        'fi': 'Koulutus',
        'ar': 'التعليم'
      },
      'Innovation': {
        'en': 'Innovation',
        'fi': 'Innovaatio',
        'ar': 'الابتكار'
      },
      'iOS': {
        'en': 'iOS',
        'fi': 'iOS',
        'ar': 'iOS'
      },
      'Mobile': {
        'en': 'Mobile',
        'fi': 'Mobiili',
        'ar': 'الجوال'
      },
      'Focus': {
        'en': 'Focus',
        'fi': 'Keskittyminen',
        'ar': 'التركيز'
      },
      'Design Process': {
        'en': 'Design Process',
        'fi': 'Suunnitteluprosessi',
        'ar': 'عملية التصميم'
      },
      'Work-Life Balance': {
        'en': 'Work-Life Balance',
        'fi': 'Työelämän ja vapaa-ajan tasapaino',
        'ar': 'التوازن بين العمل والحياة'
      },
      'Creativity': {
        'en': 'Creativity',
        'fi': 'Luovuus',
        'ar': 'الإبداع'
      }
      // Add more category translations as needed
    };
    
    return categoryTranslations[category]?.[locale] || category;
  };
  
  // Translate "All" button text
  const getAllText = (): string => {
    switch(locale) {
      case 'fi': return 'Kaikki';
      case 'ar': return 'الكل';
      default: return 'All';
    }
  };
  
  // Translate "No posts found" text
  const getNoPostsText = (): string => {
    switch(locale) {
      case 'fi': return 'Ei artikkeleita tässä kategoriassa.';
      case 'ar': return 'لا توجد مقالات في هذه الفئة.';
      default: return 'No posts found in this category.';
    }
  };
  
  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl ${isRTL ? 'mr-auto' : 'mx-auto'} ${isRTL ? 'text-right' : 'text-center'}`}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t('blogPage.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl opacity-60 mb-12"
          >
            {t('blogPage.description')}
          </motion.p>
          
          {/* Category Filters */}
          <motion.div 
            className={`flex ${isRTL ? 'justify-end' : 'justify-center'} flex-wrap gap-2 mb-12`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => setFilter(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === null
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-gray-200/10 text-gray-400 hover:bg-gray-200/20'
              }`}
            >
              {getAllText()}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'bg-gray-200/10 text-gray-400 hover:bg-gray-200/20'
                }`}
              >
                {translateCategory(category)}
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Blog Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
        >
          {filteredPosts.map((post, index) => {
            // Get the content for the current locale or fall back to English
            const localeContent = post.content[locale as keyof typeof post.content] || post.content.en;
            
            return (
              <motion.div
                key={post.slug}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
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
                />
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Empty state when no posts match filter */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl opacity-60">{getNoPostsText()}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}