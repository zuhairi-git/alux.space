'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = ''
}: BadgeProps) {
  const { theme } = useTheme();

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'md':
        return 'px-3 py-1 text-sm';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  const getVariantClasses = () => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full border transition-all duration-200';

    if (theme === 'light') {
      switch (variant) {
        case 'primary':
          return `${baseClasses} bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100`;
        case 'secondary':
          return `${baseClasses} bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100`;
        case 'success':
          return `${baseClasses} bg-green-50 text-green-700 border-green-200 hover:bg-green-100`;
        case 'warning':
          return `${baseClasses} bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100`;
        case 'error':
          return `${baseClasses} bg-red-50 text-red-700 border-red-200 hover:bg-red-100`;
        case 'info':
          return `${baseClasses} bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100`;
        default:
          return `${baseClasses} bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100`;
      }
    } else if (theme === 'colorful') {
      switch (variant) {
        case 'primary':
          return `${baseClasses} bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40 hover:bg-fuchsia-500/30`;
        case 'secondary':
          return `${baseClasses} bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30`;
        case 'success':
          return `${baseClasses} bg-green-500/20 text-green-300 border-green-500/40 hover:bg-green-500/30`;
        case 'warning':
          return `${baseClasses} bg-yellow-500/20 text-yellow-300 border-yellow-500/40 hover:bg-yellow-500/30`;
        case 'error':
          return `${baseClasses} bg-red-500/20 text-red-300 border-red-500/40 hover:bg-red-500/30`;
        case 'info':
          return `${baseClasses} bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30`;
        default:
          return `${baseClasses} bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40 hover:bg-fuchsia-500/30`;
      }
    } else {
      switch (variant) {
        case 'primary':
          return `${baseClasses} bg-blue-900/30 text-blue-300 border-blue-500/40 hover:bg-blue-900/50`;
        case 'secondary':
          return `${baseClasses} bg-gray-900/30 text-gray-300 border-gray-500/40 hover:bg-gray-900/50`;
        case 'success':
          return `${baseClasses} bg-green-900/30 text-green-300 border-green-500/40 hover:bg-green-900/50`;
        case 'warning':
          return `${baseClasses} bg-yellow-900/30 text-yellow-300 border-yellow-500/40 hover:bg-yellow-900/50`;
        case 'error':
          return `${baseClasses} bg-red-900/30 text-red-300 border-red-500/40 hover:bg-red-900/50`;
        case 'info':
          return `${baseClasses} bg-cyan-900/30 text-cyan-300 border-cyan-500/40 hover:bg-cyan-900/50`;
        default:
          return `${baseClasses} bg-blue-900/30 text-blue-300 border-blue-500/40 hover:bg-blue-900/50`;
      }
    }
  };

  return (
    <motion.span
      className={`${getSizeClasses()} ${getVariantClasses()} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );
}
