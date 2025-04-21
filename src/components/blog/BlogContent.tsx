'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BlogContentProps {
  content: string;
}

// Helper function to convert markdown-style content to JSX
function formatContent(content: string) {
  return content.split('\n\n').map((block, index) => {
    const trimmedBlock = block.trim();
    
    // Headings
    if (trimmedBlock.startsWith('##') && !trimmedBlock.startsWith('###')) {
      return (
        <motion.h2 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold mt-10 mb-5 text-primary"
        >
          {trimmedBlock.replace('## ', '')}
        </motion.h2>
      );
    }
    
    if (trimmedBlock.startsWith('###')) {
      return (
        <motion.h3 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold mt-8 mb-4 text-primary"
        >
          {trimmedBlock.replace('### ', '')}
        </motion.h3>
      );
    }
    
    // Lists
    if (trimmedBlock.startsWith('*')) {
      return (
        <motion.ul 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="list-disc pl-6 mb-6 space-y-2"
        >
          {trimmedBlock.split('\n').map((item, i) => (
            <li key={i} className="text-theme">
              {item.replace('* ', '')}
            </li>
          ))}
        </motion.ul>
      );
    }
    
    // Numbered points
    if (trimmedBlock.match(/^\d\./)) {
      return (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <strong className="text-primary">{trimmedBlock.split('\n')[0]}</strong>
          <p className="text-theme mt-2">{trimmedBlock.split('\n')[1]}</p>
        </motion.div>
      );
    }
    
    // Code blocks
    if (trimmedBlock.startsWith('```')) {
      const code = trimmedBlock.replace(/```(.*)\n/, '').replace(/```$/, '');
      return (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <pre className="bg-theme/30 backdrop-blur-sm p-4 rounded-lg overflow-x-auto text-sm text-theme border border-primary/10">
            <code>{code}</code>
          </pre>
        </motion.div>
      );
    }
    
    // Blockquotes
    if (trimmedBlock.startsWith('>')) {
      return (
        <motion.blockquote 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="pl-4 border-l-4 border-primary italic my-6 text-lg text-theme"
        >
          {trimmedBlock.replace('> ', '')}
        </motion.blockquote>
      );
    }
    
    // Default paragraph
    return (
      <motion.p 
        key={index} 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-6 text-lg text-theme leading-relaxed"
      >
        {trimmedBlock}
      </motion.p>
    );
  });
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
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
  
  return (
    <article className="prose prose-invert max-w-none">
      {formatContent(content)}
      
      {/* Reading progress indicator - only rendered on client side */}
      {mounted && (
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
      )}
    </article>
  );
};

export default BlogContent; 