'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '@/context/ThemeContext';

interface Props {
  type: 'particles' | 'design-code' | 'gradient' | 'none' | 'abstract-modern' | 'modern-flow';
  theme?: Theme;
}

const DesignCodeEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const isLight = theme === 'light';

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Very light base overlay - lighter for light theme */}
      <div className={`absolute inset-0 ${isLight ? 'bg-white/20' : 'bg-gradient-to-br from-black/40 via-black/20 to-transparent'} z-0`} />
      
      {/* Enhanced ambient light effect */}      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          background: isLight
            ? [
              'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)'
            ]
            : [
              'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.05) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)'
            ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Subtle accent gradient */}      <motion.div
        className="absolute inset-0 z-5"
        animate={{
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className={`w-full h-full ${
          isLight 
            ? 'bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20' 
            : 'bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10'
        }`} />
      </motion.div>
    </div>
  );
};

const ParticlesEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{x: number, y: number, duration: number}>>([]);
  const isLight = theme === 'light';  useEffect(() => {
    setMounted(true);
    // Generate particle data after mounting to avoid hydration mismatch - REDUCED
    const newParticles = Array(3).fill(0).map(() => ({ // Reduced from 10 to 3
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 8 // Slower animations
    }));
    setParticles(newParticles);
  }, []);
  
  if (!mounted) return <div className="absolute inset-0" />;
  
  return (    <div className="absolute inset-0">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute h-1 w-1 ${isLight ? 'bg-blue-500/15' : 'bg-blue-400/15'} rounded-full`}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 0.5
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const GradientEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Array<{size: number, posX: number, posY: number, duration: number}>>([]);
    useEffect(() => {
    setMounted(true);
    // Generate star data after mounting to avoid hydration mismatch - SIGNIFICANTLY REDUCED
    if (isColorful) {
      const newStars = Array.from({ length: 8 }).map(() => ({
        size: Math.random() * 1.5 + 0.5, // Smaller stars
        posX: Math.random() * 100,
        posY: Math.random() * 100,
        duration: Math.random() * 4 + 3 // Slower animations
      }));
      setStars(newStars);
    }
  }, [isColorful]);
  
  if (isColorful) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Cosmic background base */}
        <div className="absolute inset-0 bg-[#050023]" />
          {/* Animated cosmic nebula effect - MUCH MORE SUBTLE */}
        <motion.div
          className="absolute inset-0 opacity-20" 
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.2) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255, 0, 204, 0.2) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)'
          }}
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.2) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255, 0, 204, 0.2) 0%, transparent 40%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 60% 30%, rgba(0, 255, 255, 0.2) 0%, transparent 40%), radial-gradient(circle at 30% 40%, rgba(255, 0, 204, 0.2) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 70%, rgba(0, 255, 255, 0.2) 0%, transparent 40%), radial-gradient(circle at 60% 50%, rgba(255, 0, 204, 0.2) 0%, transparent 40%), radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Cosmic stars - only render on client side */}
        {mounted && (
          <div className="absolute inset-0">
            {stars.map((star, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: star.size,
                  height: star.size,
                  left: `${star.posX}%`,
                  top: `${star.posY}%`,
                }}                animate={{
                  opacity: [0.1, 0.4, 0.1], // Much more subtle
                  scale: [1, 1.1, 1], // Less scaling
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        )}
          {/* Floating cosmic objects - REDUCED */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 70%)',
            left: '10%',
            top: '20%'        }}
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute w-60 h-60 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 204, 0.05) 0%, transparent 70%)',
            right: '15%',
            bottom: '20%'
          }}
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Subtle overlay to enhance text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050023] via-transparent to-transparent" />
      </div>
    );
  }
  
  return (
    <div className={`absolute inset-0 ${
      isLight 
        ? 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-400/10 to-transparent'
        : 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/20 via-purple-500/20 to-transparent'
    }`} />
  );
};

const AbstractModernEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const isLight = theme === 'light';
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return <div className="absolute inset-0" />;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className={`absolute inset-0 ${
        isLight 
          ? 'bg-gradient-to-br from-white via-blue-50/30 to-white'
          : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
      }`} />
      
      {/* Abstract geometric shapes */}
      <div className="absolute inset-0">
        {/* Large circle - top right */}
        <motion.div
          className={`absolute rounded-full ${
            isLight 
              ? 'bg-gradient-to-br from-blue-100/20 to-purple-100/20'
              : 'bg-gradient-to-br from-blue-500/10 to-purple-500/10'
          }`}
          style={{
            width: '40vw',
            height: '40vw',
            right: '-10vw',
            top: '-10vw',
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Medium square - bottom left, rotated */}
        <motion.div
          className={`absolute ${
            isLight 
              ? 'bg-gradient-to-br from-blue-50/20 to-purple-50/20'
              : 'bg-gradient-to-br from-blue-800/10 to-purple-600/10'
          }`}
          style={{
            width: '30vw',
            height: '30vw',
            left: '-10vw',
            bottom: '-5vw',
            borderRadius: '4rem',
            transform: 'rotate(15deg)',
          }}
          animate={{
            rotate: [15, 20, 15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${isLight ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.03)'} 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Floating abstract elements */}
        <motion.div
          className={`absolute w-32 h-32 ${
            isLight 
              ? 'bg-gradient-to-br from-cyan-100/30 to-blue-100/20' 
              : 'bg-gradient-to-br from-cyan-800/10 to-blue-700/10'
          }`}
          style={{
            borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%',
            left: '20%',
            top: '15%',
          }}
          animate={{          borderRadius: ['38% 62% 63% 37% / 41% 44% 56% 59%', '45% 55% 57% 43% / 45% 48% 52% 55%', '38% 62% 63% 37% / 41% 44% 56% 59%'],
            x: [0, -10, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Another floating element - right side */}
        <motion.div
          className={`absolute w-48 h-48 ${
            isLight 
              ? 'bg-gradient-to-br from-indigo-100/20 to-purple-100/20' 
              : 'bg-gradient-to-br from-indigo-700/10 to-purple-800/10'
          }`}
          style={{
            borderRadius: '58% 42% 38% 62% / 42% 55% 45% 58%',
            right: '15%',
            bottom: '20%',
          }}
          animate={{
            borderRadius: ['58% 42% 38% 62% / 42% 55% 45% 58%', '52% 48% 44% 56% / 47% 50% 50% 53%', '58% 42% 38% 62% / 42% 55% 45% 58%'],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Thin line across page */}
        <motion.div
          className={`absolute h-px w-full ${isLight ? 'bg-gradient-to-r from-transparent via-blue-200/40 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500/20 to-transparent'}`}
          style={{
            top: '70%',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}        />
        
        {/* Subtle dot pattern - SIGNIFICANTLY REDUCED */}
        <div className="absolute inset-0 opacity-10">
          {mounted && Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${isLight ? 'bg-blue-300/20' : 'bg-blue-400/20'}`}
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 8 + 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 8,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ModernFlowEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const isLight = theme === 'light';
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return <div className="absolute inset-0" />;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base background with subtle gradient */}
      <div className={`absolute inset-0 ${
        isLight
          ? 'bg-gradient-to-b from-white via-blue-50/20 to-white'
          : 'bg-gradient-to-b from-gray-900 via-gray-800/90 to-gray-900'
      }`} style={{ zIndex: 0 }} />
      
      {/* Dynamic flowing background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: isLight
            ? 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)'
            : 'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)'
        }}
        animate={{
          background: isLight
            ? [
                'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)',
                'radial-gradient(circle at 40% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 40%), radial-gradient(circle at 60% 40%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)',
                'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 40%), radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)',
                'radial-gradient(circle at 40% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 40%), radial-gradient(circle at 60% 60%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)',
                'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.08) 0%, transparent 40%)'
              ]
            : [
                'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)',
                'radial-gradient(circle at 40% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 60% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)',
                'radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)',
                'radial-gradient(circle at 40% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 60% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)',
                'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)'
              ]
        }}        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Animated flowing blobs */}
      <div className="absolute inset-0">
        {/* Larger flowing shape - top right */}
        <motion.div
          className={`absolute ${
            isLight
              ? 'bg-gradient-to-br from-blue-100/60 to-indigo-200/50'
              : 'bg-gradient-to-br from-blue-500/30 to-indigo-600/30'
          }`}
          style={{
            width: '50vw',
            height: '50vw',
            right: '-15vw',
            top: '-15vw',
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            filter: 'blur(40px)'
          }}
          animate={{            borderRadius: [
              '63% 37% 54% 46% / 55% 48% 52% 45%',
              '42% 58% 60% 40% / 45% 58% 42% 55%',
              '56% 44% 67% 33% / 48% 46% 54% 52%',
              '63% 37% 54% 46% / 55% 48% 52% 45%'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
        
        {/* Medium flowing shape - bottom left */}
        <motion.div
          className={`absolute ${
            isLight
              ? 'bg-gradient-to-tl from-purple-100/60 to-cyan-200/50'
              : 'bg-gradient-to-tl from-purple-500/30 to-cyan-600/30'
          }`}
          style={{
            width: '40vw',
            height: '40vw',
            left: '-10vw',
            bottom: '-10vw',
            borderRadius: '53% 47% 47% 53% / 45% 45% 55% 55%',
            filter: 'blur(40px)'
          }}
          animate={{
            borderRadius: [
              '53% 47% 47% 53% / 45% 45% 55% 55%',
              '61% 39% 33% 67% / 60% 30% 70% 40%',
              '36% 64% 64% 36% / 40% 53% 47% 60%',
              '53% 47% 47% 53% / 45% 45% 55% 55%'
            ]
          }}          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
          {/* Small flowing shape - center removed */}

        {/* Additional decorative elements - geometric shapes */}        {/* Circle pattern top left - REDUCED */}
        <div className="absolute left-[10%] top-[15%] z-1">
          {mounted && Array.from({ length: 2 }).map((_, i) => (
            <motion.div 
              key={`circle-${i}`}
              className={`absolute rounded-full border ${
                isLight
                  ? 'border-blue-300/20'
                  : 'border-blue-400/15'
              }`}
              style={{
                width: `${(i + 1) * 40}px`,
                height: `${(i + 1) * 40}px`,
                left: `-${(i + 1) * 20}px`,
                top: `-${(i + 1) * 20}px`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 1,
              }}
            />
          ))}
        </div>
          {/* Square pattern bottom right - REDUCED */}
        <div className="absolute right-[15%] bottom-[20%] z-1">
          {mounted && Array.from({ length: 2 }).map((_, i) => (
            <motion.div 
              key={`square-${i}`}
              className={`absolute border ${
                isLight
                  ? 'border-purple-300/20'
                  : 'border-purple-400/15'
              }`}
              style={{
                width: `${(i + 1) * 30}px`,
                height: `${(i + 1) * 30}px`,
                right: `-${(i + 1) * 15}px`,
                bottom: `-${(i + 1) * 15}px`,
                borderRadius: '4px',
              }}
              animate={{
                rotate: [0, 20, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 1,
              }}
            />
          ))}
        </div>
          {/* Animated rings - removed */}
        
        {/* Abstract Line Decoration */}
        <div className="absolute bottom-[25%] left-[20%]">
          <motion.div
            className={`h-px ${
              isLight
                ? 'bg-gradient-to-r from-transparent via-blue-400/40 to-transparent'
                : 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent'
            }`}
            style={{ width: '150px' }}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <div className="absolute top-[40%] right-[15%]">
          <motion.div
            className={`h-px ${
              isLight
                ? 'bg-gradient-to-r from-transparent via-purple-400/40 to-transparent'
                : 'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent'
            }`}
            style={{ width: '120px' }}
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />
        </div>        {/* Subtle grid overlay - MUCH MORE SUBTLE */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${isLight ? 'rgba(0,0,0,0.005)' : 'rgba(255,255,255,0.01)'} 1px, transparent 1px), 
                             linear-gradient(to right, ${isLight ? 'rgba(0,0,0,0.005)' : 'rgba(255,255,255,0.01)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            zIndex: 1
          }}
        />
          {/* Moving particle dots - SIGNIFICANTLY REDUCED */}
        {mounted && Array.from({ length: 3 }).map((_, i) => {
          const size = Math.random() * 2 + 1; // Smaller particles
          return (
            <motion.div
              key={`particle-${i}`}
              className={`absolute rounded-full ${
                isLight 
                  ? i % 3 === 0 ? 'bg-blue-400/20' : i % 3 === 1 ? 'bg-purple-400/20' : 'bg-cyan-400/20'
                  : i % 3 === 0 ? 'bg-blue-400/20' : i % 3 === 1 ? 'bg-purple-400/20' : 'bg-cyan-400/20'
              }`}
              style={{
                width: size + 'px',
                height: size + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                boxShadow: `0 0 ${size}px ${size/4}px ${isLight ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)'}`, // Much subtler glow
              }}
              animate={{
                x: [0, Math.random() * 50 - 25, 0], // Much smaller movement
                y: [0, Math.random() * 50 - 25, 0], // Much smaller movement
                opacity: [0.1, 0.3, 0.1], // Much more subtle
                scale: [1, 1.1, 1] // Less scaling
              }}              transition={{
                duration: Math.random() * 6 + 5, // Slower
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Floating icons/symbols for visual interest */}
        {mounted && (
          <>            {/* Clock icon removed */}            {/* Triangle icon removed */}
              {/* Globe icon removed */}
          </>
        )}
      </div>
    </div>
  );
};

const BackgroundEffect = ({ type, theme = 'dark' }: Props) => {
  switch (type) {
    case 'particles':
      return <ParticlesEffect theme={theme} />;
    case 'design-code':
      return <DesignCodeEffect theme={theme} />;
    case 'gradient':
      return <GradientEffect theme={theme} />;
    case 'abstract-modern':
      return <AbstractModernEffect theme={theme} />;
    case 'modern-flow':
      return <ModernFlowEffect theme={theme} />;
    case 'none':
    default:
      return null;
  }
};

export default BackgroundEffect;