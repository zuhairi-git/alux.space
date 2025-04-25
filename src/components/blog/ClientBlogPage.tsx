'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { posts } from '@/app/blog/posts/data';
import BlogCard from '@/components/blog/BlogCard';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';
import { useTheme } from '@/context/ThemeContext';

const ClientBlogPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Extract all unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  
  // Filter posts by selected tag
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <main className="min-h-screen bg-theme text-theme">
      <Navigation />
      
      {/* Hero Section */}
      <section className={`relative min-h-[40vh] flex items-center justify-center overflow-hidden ${
        isLight ? 'bg-gray-50' : ''
      }`}>
        <BackgroundEffect type="gradient" theme={theme} />
        <div className={`absolute inset-0 ${
          isLight 
            ? 'bg-white/40 backdrop-blur-sm' 
            : 'bg-black/40 backdrop-blur-sm'
        } z-0`} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-center mt-20"
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
            Blog & Insights
          </h1>
          <p className={`text-xl ${isLight ? 'text-gray-700' : 'opacity-80'} max-w-2xl mx-auto mb-10`}>
            Thoughts, learnings, and perspectives on design leadership, 
            product management, and the intersection of creativity and technology.
          </p>
          
          {/* Tag filter */}
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors relative ${
                selectedTag === null 
                  ? `${isLight ? 'bg-gray-800 text-white' : 'bg-primary text-white'}`
                  : `${isLight ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-white/10 text-theme hover:bg-white/20'}`
              }`}
            >
              All
              {selectedTag === null && (
                <motion.span 
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </motion.button>
            
            {allTags.map(tag => (
              <motion.button
                key={tag}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm transition-colors relative ${
                  selectedTag === tag 
                    ? `${isLight ? 'bg-gray-800 text-white' : 'bg-primary text-white'}`
                    : `${isLight ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' : 'bg-white/10 text-theme hover:bg-white/20'}`
                }`}
              >
                {tag}
                {selectedTag === tag && (
                  <motion.span 
                    layoutId="activeFilterUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className={`py-16 ${isLight ? 'bg-white' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div key={post.slug} className="flex h-full">
                <BlogCard post={post} index={index} />
              </div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl opacity-70">No posts found for this tag.</p>
              <button 
                onClick={() => setSelectedTag(null)}
                className={`mt-4 px-6 py-2 ${
                  isLight 
                    ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                    : 'bg-primary/20 text-primary hover:bg-primary/30'
                } rounded-full transition-colors`}
              >
                Show all posts
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <footer className="bg-theme text-theme opacity-70 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default ClientBlogPage; 