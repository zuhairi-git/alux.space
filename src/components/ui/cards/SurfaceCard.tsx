'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
  hoverEffect?: boolean;
  slideDirection?: 'left' | 'right' | null;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = true,
  slideDirection = null,
  className = '',
}) => {
  return (
    <motion.div
      initial={slideDirection ? { opacity: 0, x: slideDirection === 'left' ? -50 : 50 } : { opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`theme-card group overflow-hidden ${className}`}
      whileHover={hoverEffect ? { scale: 1.01 } : {}}
    >
      {/* Main content container */}
      <div className="theme-card-content p-10 overflow-hidden h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default Card; 