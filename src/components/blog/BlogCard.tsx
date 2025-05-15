'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'next-share';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

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

const BlogCard: React.FC<BlogCardProps> = ({ post, index, viewMode = 'standard' }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  const slideDirection = index % 2 === 0 ? 'left' : 'right';

  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          card: 'bg-white/90 border border-gray-200/50 hover:border-blue-300/50 shadow-purple-500/10 hover:shadow-blue-300/30',
          text: 'text-neutral-800',
          primaryText: 'text-blue-500',
          tag: 'bg-blue-500/10 text-blue-600',
          date: 'text-neutral-500',
        };
      case 'dark':
        return {
          card: 'bg-neutral-800/90 border border-neutral-700/50 hover:border-blue-300/50 shadow-blue-500/20 hover:shadow-blue-500/30',
          text: 'text-neutral-100',
          primaryText: 'text-blue-400',
          tag: 'bg-blue-500/20 text-blue-400',
          date: 'text-neutral-400',
        };
      case 'colorful':
        return {
          card: 'bg-indigo-950/80 border border-purple-500/30 hover:border-cyan-400/60 shadow-fuchsia-500/30 hover:shadow-cyan-500/30',
          text: 'text-blue-50',
          primaryText: 'text-fuchsia-400',
          tag: 'bg-fuchsia-500/20 text-fuchsia-300',
          date: 'text-blue-200',
        };
      default:
        return {
          card: 'bg-white/90 border border-gray-200/50 hover:border-blue-300/50 shadow-purple-500/10 hover:shadow-blue-300/30',
          text: 'text-neutral-800',
          primaryText: 'text-blue-500',
          tag: 'bg-blue-500/10 text-blue-600',
          date: 'text-neutral-500',
        };
    }
  };

  const styles = getThemeStyles();

  // Create localized blog post URL
  const localizedPostUrl = `/${locale}/blog/${post.slug}`;

  // Render card based on view mode
  if (viewMode === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="h-full w-full"
      >
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-gray-200/30 dark:border-neutral-700/30 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
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
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>
          </div>

          <Link href={localizedPostUrl} className="block h-full">
            <div className="relative h-full flex flex-col justify-end p-6 z-10">
              {/* Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
                  {post.tags[0] || 'Blog'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(1, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs bg-white/20 text-white font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-white/80 text-sm line-clamp-3">{post.description}</p>

              <div className="flex justify-between items-center text-sm mt-4 pt-4 border-t border-white/20">
                <span className="text-white/60">{post.publishedDate}</span>
                <span className="flex items-center text-white/60">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    );  }
  
  // Standard view (default)
  return (
    <motion.div
      initial={{ opacity: 0, x: slideDirection === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`rounded-xl overflow-hidden shadow-md h-full transition-all duration-300 ${styles.card}`}
    >
      <Link href={localizedPostUrl} className="block h-full">
        <div className="group flex flex-col h-full">
          <div className="relative w-full h-64 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transform transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <TwitterShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : '')}${localizedPostUrl}`}
                title={post.title}
              >
                <motion.div
                  className={`backdrop-blur-sm p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <TwitterIcon size={20} round />
                </motion.div>
              </TwitterShareButton>
              <LinkedinShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : '')}${localizedPostUrl}`}
                title={post.title}
              >
                <motion.div
                  className={`backdrop-blur-sm p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <LinkedinIcon size={20} round />
                </motion.div>
              </LinkedinShareButton>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-xs ${styles.tag}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className={`text-xl font-bold mb-2 group-hover:${styles.primaryText} transition-colors ${styles.text}`}>
              {post.title}
            </h3>

            <p className={`${styles.text} opacity-80 text-sm mb-4 flex-grow`}>
              {post.description}
            </p>

            <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t border-current/10">
              <span className={styles.date}>{post.publishedDate}</span>
              <span className={`flex items-center ${styles.date}`}>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {post.readTime}
              </span>
            </div>

            <div className={`mt-4 inline-flex items-center ${styles.primaryText} group-hover:opacity-80 transition-colors`}>
              Read more
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;