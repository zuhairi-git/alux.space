'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'next-share';
import Card from '@/components/Card';
import { useTheme } from '@/context/ThemeContext';

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
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const variant = index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary';
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const slideDirection = index % 2 === 0 ? 'left' : 'right';
  
  return (
    <Card 
      variant={variant} 
      slideDirection={slideDirection}
      className="h-full w-full transform-gpu"
    >
      <Link href={`/blog/${post.slug}`} className="block -m-8 rounded-xl overflow-hidden">
        <div className="flex flex-col h-full">
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
                url={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/blog/${post.slug}`}
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
                url={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/blog/${post.slug}`}
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
          
          <div className="p-8 flex flex-col flex-grow">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((tag, idx) => (
                <span 
                  key={idx}
                  className={`px-3 py-1 ${
                    isLight 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-primary/20 text-primary'
                  } rounded-full text-xs`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            <p className="opacity-80 mb-4 flex-grow">
              {post.description}
            </p>
            
            <div className="flex justify-between items-center text-sm opacity-70 mt-auto pt-4 border-t border-primary/10">
              <span>{post.publishedDate}</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
                {post.readTime}
              </span>
            </div>
            
            <div className="mt-4 inline-flex items-center text-primary group-hover:opacity-80 transition-colors">
              Read more
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default BlogCard; 