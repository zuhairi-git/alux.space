'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ReadingProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress(window.scrollY / scrollHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Call once to initialize
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <motion.div 
        className="h-full bg-gradient-to-r from-start to-end"
        style={{ 
          scaleX: scrollProgress, 
          transformOrigin: '0%',
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
} 