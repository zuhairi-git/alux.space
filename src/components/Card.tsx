'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
  hoverEffect?: boolean;
  slideDirection?: 'left' | 'right' | null;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'primary',
  hoverEffect = true,
  slideDirection = null,
  className = '',
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  const getGlowClassName = () => {
    switch (variant) {
      case 'primary':
        return 'theme-card-glow theme-card-glow-primary';
      case 'secondary':
        return 'theme-card-glow theme-card-glow-secondary';
      case 'tertiary':
        return 'theme-card-glow theme-card-glow-tertiary';
      case 'muted':
        return 'theme-card-glow theme-card-glow-muted';
      default:
        return 'theme-card-glow theme-card-glow-primary';
    }
  };

  const getShadowClassName = () => {
    if (!isLight) return '';
    
    switch (variant) {
      case 'primary':
        return 'shadow-md shadow-primary/5 hover:shadow-lg hover:shadow-primary/10';
      case 'secondary':
        return 'shadow-md shadow-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10';
      case 'tertiary':
        return 'shadow-md shadow-purple-500/5 hover:shadow-lg hover:shadow-purple-500/10';
      case 'muted':
        return 'shadow-md shadow-gray-400/10 hover:shadow-lg hover:shadow-gray-400/15';
      default:
        return 'shadow-md shadow-primary/5 hover:shadow-lg hover:shadow-primary/10';
    }
  };

  return (
    <motion.div
      initial={slideDirection ? { opacity: 0, x: slideDirection === 'left' ? -50 : 50 } : { opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`theme-card group ${getShadowClassName()} transform-gpu transition-all overflow-hidden ${className}`}
      whileHover={hoverEffect ? { scale: 1.01 } : {}}
    >
      {/* Glow effect that changes with theme */}
      <div className={getGlowClassName()} />
      
      {/* Main content container with background that adapts to theme */}
      <div className="theme-card-content p-8 overflow-hidden h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default Card; 