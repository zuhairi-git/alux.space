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
    const baseShadow = 'shadow-md';
    const hoverShadow = 'hover:shadow-lg';

    let colorShadow = '';
    let hoverColorShadow = '';

    if (isLight) {
      // Light theme shadows (Subtle)
      switch (variant) {
        case 'primary': colorShadow = 'shadow-primary/5'; hoverColorShadow = 'hover:shadow-primary/10'; break;
        case 'secondary': colorShadow = 'shadow-blue-500/5'; hoverColorShadow = 'hover:shadow-blue-500/10'; break;
        case 'tertiary': colorShadow = 'shadow-purple-500/5'; hoverColorShadow = 'hover:shadow-purple-500/10'; break;
        case 'muted': colorShadow = 'shadow-gray-400/10'; hoverColorShadow = 'hover:shadow-gray-400/15'; break;
        default: colorShadow = 'shadow-primary/5'; hoverColorShadow = 'hover:shadow-primary/10'; break;
      }
      return `${baseShadow} ${colorShadow} ${hoverShadow} ${hoverColorShadow}`;
    } else if (isColorful) {
      // Colorful theme: No shadow by default, only on hover
      switch (variant) {
        case 'primary': hoverColorShadow = 'hover:shadow-fuchsia-500/20'; break;
        case 'secondary': hoverColorShadow = 'hover:shadow-cyan-500/20'; break;
        case 'tertiary': hoverColorShadow = 'hover:shadow-violet-500/20'; break;
        case 'muted': hoverColorShadow = 'hover:shadow-sky-400/20'; break;
        default: hoverColorShadow = 'hover:shadow-fuchsia-500/20'; break;
      }
      // Colorful theme: No base shadow, only hover shadow
      return `shadow-none ${hoverShadow} ${hoverColorShadow}`;
    } else {
      // Dark theme shadows (Standard)
      switch (variant) {
        case 'primary': colorShadow = 'shadow-primary/10'; hoverColorShadow = 'hover:shadow-primary/20'; break;
        case 'secondary': colorShadow = 'shadow-blue-500/10'; hoverColorShadow = 'hover:shadow-blue-500/20'; break;
        case 'tertiary': colorShadow = 'shadow-purple-500/10'; hoverColorShadow = 'hover:shadow-purple-500/20'; break;
        case 'muted': colorShadow = 'shadow-gray-500/10'; hoverColorShadow = 'hover:shadow-gray-500/20'; break;
        default: colorShadow = 'shadow-primary/10'; hoverColorShadow = 'hover:shadow-primary/20'; break;
      }
      return `${baseShadow} ${colorShadow} ${hoverShadow} ${hoverColorShadow}`;
    }
  };

  return (
    <motion.div
      initial={slideDirection ? { opacity: 0, x: slideDirection === 'left' ? -50 : 50 } : { opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`theme-card group ${getShadowClassName()} transform-gpu transition-shadow duration-300 ease-in-out overflow-hidden ${className}`}
      whileHover={hoverEffect && !isColorful ? { scale: 1.01 } : {}}
    >
      {/* Glow effect layer - only render for non-colorful themes */}
      {!isColorful && <div className={getGlowClassName()} />}
      
      {/* Main content container */}
      <div className="theme-card-content p-8 overflow-hidden h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default Card; 