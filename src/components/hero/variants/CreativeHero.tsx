'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import { Theme } from '@/context/ThemeContext';

interface CreativeHeroProps extends HeroConfig {
  theme?: Theme;
}

const CreativeHero: React.FC<CreativeHeroProps> = ({ title, subtitle, quote, cta, theme = 'dark' }) => {
  const words = title.split(' ');
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
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
            className="text-center mt-8"
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
            className={`text-2xl md:text-3xl text-center ${isLight ? 'text-gray-700' : 'text-white'} mb-12 relative z-20`}
          >
            {subtitle}
          </motion.p>
        )}

        {quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative max-w-3xl mx-auto mb-12"
          >
            <div className={`relative ${isLight ? 'bg-gray-100/70' : 'bg-black/20'} backdrop-blur-sm ${isColorful ? 'rounded-2xl' : 'rounded-xl'} p-8`}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className={`text-xl italic ${isLight ? 'text-gray-700' : 'text-white'} relative z-20`}
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
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-center"
          >
            <Link
              href={cta.href}
              className={`inline-block px-8 py-4 rounded-full font-medium transition-all duration-300 relative overflow-hidden ${
                theme === 'colorful' 
                  ? 'text-white border border-transparent shadow-lg' 
                  : isLight 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              style={{
                ...(theme === 'colorful' ? {
                  backgroundImage: 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite',
                } : {})
              }}
            >
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {cta.text}
              </motion.span>
              {theme === 'colorful' && (
                <motion.div 
                  className="absolute inset-0 bg-black/10"
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            <style jsx global>{`
              @keyframes gradientShift {
                0% { background-position: 0% 50% }
                50% { background-position: 100% 50% }
                100% { background-position: 0% 50% }
              }
            `}</style>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CreativeHero;