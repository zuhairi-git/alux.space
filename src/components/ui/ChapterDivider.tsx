'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

interface ChapterDividerProps {
  title: string;
  number: number;
  id?: string;
}

const ChapterDivider: React.FC<ChapterDividerProps> = ({ title, number, id }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Generate ID from title if not provided
  const chapterId = id || title.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.div
      id={chapterId}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="my-16 relative"
    >
      <div className="flex items-center">
        {/* Decorative line left */}
        <div className={`flex-grow h-px ${isLight ? 'bg-gradient-to-r from-transparent via-primary/20 to-primary/30' : 'bg-gradient-to-r from-transparent via-primary/30 to-primary/40'}`}></div>
        
        {/* Chapter number badge */}
        <div className="mx-4 relative">
          <div 
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isLight 
                ? 'bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05),_inset_0_-2px_5px_rgba(0,0,0,0.03)]' 
                : 'bg-gray-800 shadow-[0_4px_15px_rgba(0,0,0,0.2),_inset_0_-2px_5px_rgba(255,255,255,0.02)]'
            } border-2 ${isLight ? 'border-primary/10' : 'border-primary/30'}`}
          >
            <span className="text-3xl font-bold bg-gradient-to-br from-primary to-violet-400 text-transparent bg-clip-text">{number}</span>
          </div>
          
          {/* Small decorative elements */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/20"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-primary/30"></div>
        </div>
        
        {/* Decorative line right */}
        <div className={`flex-grow h-px ${isLight ? 'bg-gradient-to-l from-transparent via-primary/20 to-primary/30' : 'bg-gradient-to-l from-transparent via-primary/30 to-primary/40'}`}></div>
      </div>
      
      {/* Chapter title */}
      <h2 className={`text-3xl md:text-4xl font-bold text-center mt-6 mb-10 ${isLight ? 'text-gray-900' : 'text-white'}`}>
        {title}
      </h2>
      
      {/* Back to top link */}
      <div className="text-center">
        <Link 
          href="#top" 
          className={`inline-flex items-center text-sm ${isLight ? 'text-gray-500 hover:text-primary' : 'text-gray-400 hover:text-primary'} transition duration-300`}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          Back to top
        </Link>
      </div>
    </motion.div>
  );
};

export default ChapterDivider; 