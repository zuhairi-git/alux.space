'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface QuoteBlockProps {
  quote: string;
  author?: string;
  variant?: 'default' | 'simple' | 'minimal';
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, author, variant }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Determine the appropriate variant based on content if not explicitly provided
  const determinedVariant = variant || determineVariant(quote);

  // For minimal style, just render the text with minimal formatting
  if (determinedVariant === 'minimal') {
    return (
      <motion.div
        initial={{ opacity: 0.5, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="my-8 max-w-4xl mx-auto relative"
      >
        <blockquote className="text-xl md:text-2xl leading-relaxed italic text-theme">
          {quote}
        </blockquote>
        
        {author && (
          <footer className="text-right mt-2">
            <cite className="font-medium text-primary">— {author}</cite>
          </footer>
        )}
      </motion.div>
    );
  }
  
  // For simple style, use a cleaner blockquote without decorative elements
  if (determinedVariant === 'simple') {
    return (
      <motion.div
        initial={{ opacity: 0.5, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="my-10 max-w-4xl mx-auto relative"
      >
        <div className={`py-6 px-6 border-l-4 ${
          isLight 
            ? 'border-primary/30 bg-gray-50' 
            : 'border-primary/50 bg-gray-900/30'
        } rounded-r-md`}>
          <blockquote className="text-xl md:text-2xl leading-relaxed mb-3 text-theme">
            {quote}
          </blockquote>
          
          {author && (
            <footer className="text-right">
              <cite className="font-medium text-primary">— {author}</cite>
            </footer>
          )}
        </div>
      </motion.div>
    );
  }
  
  // Default variant (rich styling with decorative elements)
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`my-12 max-w-4xl mx-auto relative ${isLight ? 'text-gray-800' : 'text-gray-100'}`}
    >
      {/* Decorative elements */}
      <div className="absolute -top-6 -left-2 md:-left-8">
        <svg 
          className="w-12 h-12 md:w-16 md:h-16 text-primary opacity-20" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      
      <div 
        className={`py-8 px-7 md:px-12 border-l-4 ${
          isLight 
            ? 'border-primary/30 bg-gradient-to-r from-primary/5 to-transparent' 
            : 'border-primary/50 bg-gradient-to-r from-primary/10 to-transparent'
        } rounded-r-xl relative overflow-hidden`}
      >
        {/* Background decorative line */}
        <div 
          className={`absolute h-px w-full top-1/2 -right-4 ${
            isLight ? 'bg-gradient-to-l from-transparent via-primary/10 to-transparent' : 'bg-gradient-to-l from-transparent via-primary/20 to-transparent'
          }`}
        />
        
        <blockquote className="font-serif text-xl md:text-2xl leading-relaxed mb-4 relative z-10">
          {quote}
        </blockquote>
        
        {author && (
          <footer className="text-right">
            <cite className="flex items-center justify-end font-medium text-primary">
              <span className="mr-2 inline-block w-8 h-px bg-primary/50" />
              {author}
            </cite>
          </footer>
        )}
      </div>
      
      {/* Bottom decorative elements */}
      <div className="absolute -bottom-6 -right-2 md:-right-8 transform rotate-180">
        <svg 
          className="w-12 h-12 md:w-16 md:h-16 text-primary opacity-20" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </motion.div>
  );
};

// Helper function to intelligently determine the appropriate variant based on content
function determineVariant(quote: string): 'default' | 'simple' | 'minimal' {
  // If the quote already has quotation marks, use minimal styling
  if ((quote.startsWith('"') && quote.endsWith('"')) || 
      (quote.startsWith('\'') && quote.endsWith('\''))) {
    return 'minimal';
  }
  
  // If it starts with '>' (markdown blockquote syntax), use simple styling
  if (quote.startsWith('>')) {
    return 'simple';
  }
  
  // If the quote is very long (more than 150 chars), use simple styling
  if (quote.length > 150) {
    return 'simple';
  }
  
  // Default to rich styling for short, impactful quotes
  return 'default';
}

export default QuoteBlock; 