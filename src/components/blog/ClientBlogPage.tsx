'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';

// Blog post type
export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
  categories: string[];
};

interface ClientBlogPageProps {
  posts: BlogPost[];
}

export default function ClientBlogPage({ posts }: ClientBlogPageProps) {
  const { locale, isRTL } = useLanguage();
  const { t } = useTranslations(locale);
  const [filter, setFilter] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = Array.from(
    new Set(posts.flatMap(post => post.categories))
  );
  
  // Filter posts by category
  const filteredPosts = filter
    ? posts.filter(post => post.categories.includes(filter))
    : posts;
  
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
              All
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
                {category}
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
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <BlogCard 
                post={{
                  slug: post.slug,
                  title: post.title,
                  description: post.excerpt,
                  image: post.image,
                  publishedDate: post.date,
                  readTime: post.readTime,
                  tags: post.categories
                }}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Empty state when no posts match filter */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl opacity-60">No posts found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}