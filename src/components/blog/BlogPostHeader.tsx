'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useParams } from 'next/navigation';
import AudioPlayer from '../ui/AudioPlayer';

interface BlogPostHeaderProps {
  title: string;
  description: string;
  publishedDate: string;
  readTime: string;
  author: string;
  tags: string[];
  image: string;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  title,
  description,
  publishedDate,
  readTime,
  author,
  tags,
  image,
}) => {
  const { theme } = useTheme();
  const params = useParams();
  const slug = params.slug as string;
  
  // Only light theme should be treated differently, colorful theme remains dark
  const isLight = theme === 'light';
  
  // Map of blog posts with audio content
  const audioMap: Record<string, string> = {
    // Make sure the path matches exactly where the file is located
    'primitive-human': '/audio/blog/blog03.mp3',
    // Add more audio files here as they become available
    // 'other-post-slug': '/audio/blog/other-file.mp3',
  };
  
  // Check if this post has audio narration and if the audio file actually exists
  const hasAudio = slug in audioMap;
  const audioSrc = hasAudio ? audioMap[slug] : '';

  return (
    <div className="mb-12">
      {/* Back to blog link */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-hover transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all articles
        </Link>
      </motion.div>
      
      {/* Title and Meta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-3 py-1 ${isLight ? 'bg-primary/10' : 'bg-primary/10'} text-primary rounded-full text-sm`}
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>{title}</h1>
        
        <p className={`text-xl ${isLight ? 'text-gray-700' : 'text-theme opacity-80'} mb-6`}>{description}</p>
        
        <div className={`flex flex-wrap items-center gap-6 ${isLight ? 'text-gray-600' : 'text-theme opacity-70'} mb-8 border-b ${isLight ? 'border-gray-200' : 'border-primary/10'} pb-8`}>
          <div className="flex items-center gap-3">
            <div className="relative w-[40px] h-[40px] rounded-full overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <Image 
                src="/images/me/ali.png" 
                alt={author}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium">{author}</span>
          </div>
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            {publishedDate}
          </span>
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            {readTime}
          </span>
        </div>
      </motion.div>
      
      {/* Audio Player (if available) */}
      {hasAudio && audioSrc && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <AudioPlayer
            src={audioSrc}
            title="Listen to this article"
          />
        </motion.div>
      )}
      
      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`relative w-full h-[60vh] max-h-[500px] rounded-2xl overflow-hidden mb-10 ${isLight ? 'shadow-md' : ''}`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-black/20 to-transparent' : 'bg-gradient-to-t from-black/30 to-transparent'}`} />
      </motion.div>
    </div>
  );
};

export default BlogPostHeader; 