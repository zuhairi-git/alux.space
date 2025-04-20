'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'next-share';

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
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-white/5"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
          
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.slice(0, 2).map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary-hover transition-colors">{post.title}</h3>
          <p className="text-gray-400 text-sm mb-3 flex items-center gap-4">
            <span>{post.publishedDate}</span>
            <span>•</span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              {post.readTime}
            </span>
          </p>
          <p className="text-theme line-clamp-2 mb-4">{post.description}</p>
          
          <motion.div 
            className="text-primary font-medium flex items-center"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Read more
            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.div>
        </div>
      </Link>
      
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <TwitterShareButton 
          url={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/blog/${post.slug}`}
          title={post.title}
        >
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors">
            <TwitterIcon size={20} round />
          </div>
        </TwitterShareButton>
        <LinkedinShareButton 
          url={`${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/blog/${post.slug}`}
          title={post.title}
        >
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-colors">
            <LinkedinIcon size={20} round />
          </div>
        </LinkedinShareButton>
      </div>
    </motion.article>
  );
};

export default BlogCard; 