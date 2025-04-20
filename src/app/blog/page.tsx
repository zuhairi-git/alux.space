'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { posts } from './posts/data';
import BlogCard from '@/components/blog/BlogCard';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Extract all unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  
  // Filter posts by selected tag
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  return (
    <main className="min-h-screen bg-theme">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <BackgroundEffect type="gradient" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-start via-mid to-end bg-clip-text text-transparent">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Thoughts, learnings, and perspectives on design leadership, 
            product management, and the intersection of creativity and technology.
          </p>
          
          {/* Tag filter */}
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                selectedTag === null 
                  ? 'bg-primary text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              All
            </motion.button>
            
            {allTags.map(tag => (
              <motion.button
                key={tag}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedTag === tag 
                    ? 'bg-primary text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-400">No posts found for this tag.</p>
              <button 
                onClick={() => setSelectedTag(null)}
                className="mt-4 px-6 py-2 bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors"
              >
                Show all posts
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <footer className="bg-black/40 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default BlogPage;