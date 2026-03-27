'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { durationSeconds, delaySeconds, transition as t } from '@/design-system';
import Link from 'next/link';

interface ChapterDividerProps {
  title: string;
  number: number;
  id?: string;
}

const ChapterDivider: React.FC<ChapterDividerProps> = ({ title, number, id }) => {
  // Generate ID from title if not provided
  const chapterId = id || title.toLowerCase().replace(/\s+/g, '-');

  return (
    <motion.div
      id={chapterId}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: durationSeconds.dramatic }}
      className="my-20 relative"
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-gradient-start to-gradient-mid blur-3xl"></div>
        <div className="absolute top-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-br from-gradient-mid to-gradient-end blur-3xl"></div>
      </div>
      
      <div className="flex flex-col items-center relative z-10">
        {/* Top design element - gradient line with dots */}
        <div className="flex items-center w-full max-w-xl mx-auto mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-gradient-start to-gradient-mid opacity-30"></div>
          <div className="px-3 flex items-center">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i} 
                className="w-1 h-1 rounded-full bg-gradient-to-r from-gradient-start to-gradient-mid mx-1"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: i * delaySeconds.lg
                }}
              ></motion.div>
            ))}
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-gradient-start to-gradient-mid opacity-30"></div>
        </div>
        
        {/* Chapter number with unique styling */}
        <div className="relative mb-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...t.enterSlow, delay: delaySeconds.md }}
            className="relative"
          >
            {/* Subtle glow behind number */}
            <div className="absolute inset-0 bg-gradient-to-r from-gradient-start to-gradient-mid opacity-10 blur-xl rounded-full"></div>
            
            {/* Chapter number */}
            <div className="relative z-10 flex items-center justify-center">
              <span className="text-7xl font-bold bg-gradient-to-br from-gradient-start to-gradient-mid bg-clip-text text-transparent opacity-30">
                {number}
              </span>
            </div>
          </motion.div>
        </div>
        
        {/* Chapter title with animated underline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...t.enterSlow, delay: delaySeconds.lg }}
          className="text-center mb-6 relative"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {title}
          </h2>
          
          {/* Animated underline */}
          <motion.div 
            className="h-px w-0 bg-gradient-to-r from-gradient-mid to-gradient-end mx-auto"
            initial={{ width: "0%" }}
            whileInView={{ width: "50%" }}
            viewport={{ once: true }}
            transition={{ duration: durationSeconds.dramatic, delay: delaySeconds['2xl'] }}
          ></motion.div>
        </motion.div>
        
        {/* Back to top link with subtle styling */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...t.enterSlow, delay: delaySeconds['3xl'] }}
          className="text-center"
        >
          <Link 
            href="#top" 
            className="inline-flex items-center text-xs text-foreground/60 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gradient-start hover:to-gradient-mid transition duration-300"
          >
            <motion.svg 
              className="w-3 h-3 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, -2, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop" 
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </motion.svg>
            return to top
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChapterDivider;