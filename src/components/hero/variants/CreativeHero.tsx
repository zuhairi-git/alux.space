'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import { Theme } from '@/context/ThemeContext';
import QuoteBlock from '@/components/ui/QuoteBlock';

interface CreativeHeroProps extends HeroConfig {
  theme?: Theme;
}

// Interactive particles component
const ParticleField = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            opacity: 0.1 + Math.random() * 0.3
          }}
          animate={{ 
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0.1 + Math.random() * 0.3, 0.5, 0.1 + Math.random() * 0.3]
          }}
          transition={{ 
            duration: 5 + Math.random() * 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

const CreativeHero: React.FC<CreativeHeroProps> = ({ title, subtitle, quote, cta, theme = 'dark' }) => {
  const words = title.split(' ');
  const isLight = theme === 'light';
  
  // Mouse-follow effect for 3D perspective
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 relative z-30"
      ref={containerRef}
    >
      <ParticleField />
      
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 overflow-hidden relative">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-8"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)`
            }}
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
                  className="inline-block mx-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-fuchsia-600 relative"
                >
                  {word}
                </motion.span>
              ))}
            </h2>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -z-10 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-fuchsia-600/10 blur-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
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
            className="relative max-w-4xl mx-auto mb-12"
          >
            <QuoteBlock 
              quote={quote.text}
              author={quote.author}
              variant="default"
            />
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
              } cosmic-shimmer`}
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
              
              {/* Animated glow effect */}
              <motion.div 
                className="absolute -inset-2 blur-md bg-gradient-to-r from-cyan-500/30 to-fuchsia-600/30 rounded-full opacity-0"
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              />
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