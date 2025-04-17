'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';

const DesignHero: React.FC<HeroConfig> = ({ title, subtitle, quote, cta }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 text-center relative z-10"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 mb-8">{subtitle}</p>
          )}
          {cta && (
            <Link 
              href={cta.href}
              className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
            >
              {cta.text}
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {quote && (
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <p className="text-lg text-gray-300 italic relative">
                <span className="absolute -left-4 top-0 text-blue-400 text-3xl">&ldquo;</span>
                {quote.text}
                <span className="absolute -bottom-4 right-0 text-blue-400 text-3xl">&rdquo;</span>
              </p>
              <p className="text-blue-400 mt-6 text-right">— {quote.author}</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DesignHero;