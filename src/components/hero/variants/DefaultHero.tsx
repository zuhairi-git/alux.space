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
      className={`container mx-auto px-4  relative z-10`}
    >
      <div className={` max-w-4xl `}>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          {subtitle}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        {cta && (
          <Link 
            href={cta.href} 
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {cta.text}
          </Link>
        )}
      </motion.div>

      {quote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-2xl mx-auto mt-12 p-6 rounded-lg bg-white/5 backdrop-blur-sm"
        >
          <p className="italic text-gray-300 relative">
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
    </motion.div>
  );
};

export default DefaultHero;
