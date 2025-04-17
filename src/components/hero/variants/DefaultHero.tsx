'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';

const DefaultHero: React.FC<HeroConfig> = ({ title, subtitle, quote, cta }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 text-center relative z-10"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Hi, I&apos;m Ali Al-Zuhairi
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          I&apos;m a designer and developer who loves creating beautiful digital experiences.
        </p>
      </div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-300">{subtitle}</p>
        )}
      </motion.div>
      
      {quote && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto relative">
            <span className="absolute -left-4 top-0 text-blue-400 text-3xl">&ldquo;</span>
            {quote.text}
            <span className="absolute -bottom-4 right-0 text-blue-400 text-3xl">&rdquo;</span>
            <motion.span 
              className="block text-blue-400 mt-4"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              — {quote.author}
            </motion.span>
          </p>
        </motion.div>
      )}

      {cta && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Link 
            href={cta.href}
            className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
          >
            {cta.text}
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DefaultHero;