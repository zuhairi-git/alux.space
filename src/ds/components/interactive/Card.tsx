'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted' | 'cosmic';
  hoverEffect?: boolean;
  slideDirection?: 'left' | 'right' | null;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  variant = 'primary',
  hoverEffect = true,
  slideDirection = null,
  className = '',
  onClick
}: CardProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  const getCardStyles = () => {
    if (isColorful) {
      switch (variant) {
        case 'cosmic':
          return 'bg-gradient-to-br from-[#120025] to-[#000428] border border-fuchsia-500/20 backdrop-blur-xl shadow-[0_12px_28px_-5px_rgba(255,0,204,0.4)]';
        case 'primary':
          return 'bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border border-fuchsia-500/30 backdrop-blur-lg shadow-lg';
        case 'secondary':
          return 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 backdrop-blur-lg shadow-lg';
        case 'tertiary':
          return 'bg-gradient-to-br from-violet-900/30 to-purple-900/30 border border-violet-500/30 backdrop-blur-lg shadow-lg';
        case 'muted':
          return 'bg-gradient-to-br from-gray-900/30 to-slate-900/30 border border-gray-500/30 backdrop-blur-lg shadow-lg';
        default:
          return 'bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30 border border-fuchsia-500/30 backdrop-blur-lg shadow-lg';
      }
    } else if (isLight) {
      switch (variant) {
        case 'primary':
          return 'bg-white/95 border border-gray-300/60 shadow-md shadow-gray-200/50 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-200/40';
        case 'secondary':
          return 'bg-white/95 border border-blue-300/60 shadow-md shadow-blue-200/50 hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-300/40';
        case 'tertiary':
          return 'bg-white/95 border border-purple-300/60 shadow-md shadow-purple-200/50 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-300/40';
        case 'muted':
          return 'bg-white/95 border border-gray-200/60 shadow-md shadow-gray-100/50 hover:border-gray-400/60 hover:shadow-lg hover:shadow-gray-200/40';
        default:
          return 'bg-white/95 border border-gray-300/60 shadow-md shadow-gray-200/50 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-200/40';
      }
    } else {
      switch (variant) {
        case 'primary':
          return 'bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 hover:shadow-lg hover:shadow-blue-500/10';
        case 'secondary':
          return 'bg-gradient-to-br from-blue-800/50 to-blue-700/50 border border-blue-600/30 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20';
        case 'tertiary':
          return 'bg-gradient-to-br from-purple-800/50 to-purple-700/50 border border-purple-600/30 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20';
        case 'muted':
          return 'bg-gradient-to-br from-gray-700/50 to-gray-600/50 border border-gray-500/30 hover:border-gray-400/50 hover:shadow-lg hover:shadow-gray-500/10';
        default:
          return 'bg-gradient-to-br from-gray-800/50 to-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 hover:shadow-lg hover:shadow-blue-500/10';
      }
    }
  };

  return (
    <motion.div
      initial={slideDirection ? { opacity: 0, x: slideDirection === 'left' ? -50 : 50 } : { opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${getCardStyles()} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hoverEffect && !isColorful ? { scale: 1.02 } : {}}
      onClick={onClick}
    >
      <div className="p-6 h-full">
        {children}
      </div>
    </motion.div>
  );
}
