'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
  | 'onDrag' 
  | 'onDragStart' 
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onTransitionEnd'
> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'cosmic';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      case 'xl':
        return 'px-10 py-5 text-xl';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const getVariantClasses = () => {
    const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    switch (variant) {
      case 'primary':
        if (theme === 'light') {
          return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-blue-500`;
        } else if (theme === 'colorful') {
          return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-purple-500`;
        } else {
          return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-blue-500`;
        }

      case 'secondary':
        if (theme === 'light') {
          return `${baseClasses} border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500`;
        } else if (theme === 'colorful') {
          return `${baseClasses} border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20 focus:ring-purple-400`;
        } else {
          return `${baseClasses} border-2 border-blue-400 text-blue-400 hover:bg-blue-500/20 focus:ring-blue-400`;
        }

      case 'ghost':
        if (theme === 'light') {
          return `${baseClasses} text-gray-700 hover:bg-gray-100 focus:ring-gray-500`;
        } else if (theme === 'colorful') {
          return `${baseClasses} text-gray-300 hover:bg-purple-500/20 focus:ring-purple-400`;
        } else {
          return `${baseClasses} text-gray-300 hover:bg-gray-700 focus:ring-gray-500`;
        }

      case 'cosmic':
        if (theme === 'colorful') {
          return `${baseClasses} text-white border border-transparent shadow-lg cosmic-shimmer bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-blue-500 focus:ring-fuchsia-400`;
        }
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-purple-500`;

      default:
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-blue-500`;
    }
  };

  return (
    <motion.button
      className={`${getSizeClasses()} ${getVariantClasses()} ${className}`}
      whileHover={!disabled && !loading ? { scale: variant === 'cosmic' ? 1.02 : 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <motion.div
          className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {children}
    </motion.button>
  );
}
