'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';

const CreativeHero: React.FC<HeroConfig> = ({ title, subtitle, quote, cta }) => {
  const words = title.split(' ');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 relative z-30"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 overflow-hidden relative">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight relative z-20">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: i * 0.2, 
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1]
                  }}
                  className="inline-block mx-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 relative"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </motion.div>
        </div>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl md:text-3xl text-center text-white mb-12 relative z-20"
          >
            {subtitle}
          </motion.p>
        )}

        {quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative max-w-3xl mx-auto mb-12 px-8 z-20"
          >
            <div className="relative bg-black/20 backdrop-blur-sm rounded-xl p-8">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-xl italic text-white relative z-20"
              >
                {quote.text}
              </motion.p>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="block text-blue-400 mt-4 text-right relative z-20"
              >
                — {quote.author}
              </motion.span>
            </div>
          </motion.div>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="relative text-center z-20"
          >
            <Link 
              href={cta.href}
              className="relative inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                {cta.text}
                <motion.span
                  className="material-symbols"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  arrow_forward
                </motion.span>
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CreativeHero;