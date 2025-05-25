'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeSwitch from '@/components/ThemeSwitch';

export default function ComingSoonPage() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Something amazing is coming soon';
  const [typingComplete, setTypingComplete] = useState(false);
    // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTypingComplete(true);
    }
  }, [typedText, fullText]);
    return (
    <div className="coming-soon-page">      <motion.div 
        className="theme-switcher-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <ThemeSwitch />
      </motion.div>
      
      <motion.a 
        href="/"
        className="back-button"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ x: -5 }}
      >
        <span className="material-symbols material-symbols-rounded">arrow_back</span>
        <span>Back to Home</span>
      </motion.a>
      
      <motion.div 
        className="content-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >        <motion.div 
          className="logo"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="logo-text">ALUX</div>
          <div className="logo-dot"></div>
        </motion.div>
          <motion.h1 
          className="title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="material-symbols material-symbols-rounded icon-rocket">rocket_launch</span>
          <span className="typing-text">{typedText}</span>
          {!typingComplete && <span className="cursor">|</span>}
        </motion.h1>        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          We&apos;re working hard to bring you something extraordinary. Stay tuned!
        </motion.p>
      </motion.div>
        <div className="background-elements">
        <div className="animated-shape shape-1"></div>
        <div className="animated-shape shape-2"></div>
        <div className="animated-shape shape-3"></div>
        <div className="animated-shape shape-4"></div>
        <div className="animated-shape shape-5"></div>
      </div>
    </div>
  );
}
