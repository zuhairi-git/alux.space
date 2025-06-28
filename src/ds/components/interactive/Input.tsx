'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 
  | 'onDrag' 
  | 'onDragStart' 
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onTransitionEnd'
> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: string;
}

export default function Input({
  label,
  error,
  helper,
  icon,
  className = '',
  ...props
}: InputProps) {
  const { theme } = useTheme();

  const getInputClasses = () => {
    const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

    if (theme === 'light') {
      return `${baseClasses} bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500`;
    } else if (theme === 'colorful') {
      return `${baseClasses} bg-purple-900/20 border-purple-400/30 text-gray-200 placeholder-gray-400 focus:border-fuchsia-400 focus:ring-fuchsia-400 backdrop-blur-sm`;
    } else {
      return `${baseClasses} bg-gray-800 border-gray-600 text-gray-200 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400`;
    }
  };

  const getLabelClasses = () => {
    if (theme === 'light') {
      return 'block text-sm font-medium text-gray-700 mb-2';
    } else if (theme === 'colorful') {
      return 'block text-sm font-medium text-gray-200 mb-2';
    } else {
      return 'block text-sm font-medium text-gray-300 mb-2';
    }
  };

  const getHelperClasses = () => {
    if (error) {
      return 'mt-2 text-sm text-red-500';
    }
    if (theme === 'light') {
      return 'mt-2 text-sm text-gray-600';
    } else if (theme === 'colorful') {
      return 'mt-2 text-sm text-gray-300';
    } else {
      return 'mt-2 text-sm text-gray-400';
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className={getLabelClasses()}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <span className="material-symbols text-gray-400">{icon}</span>
          </div>
        )}
        <motion.input
          className={`${getInputClasses()} ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
      </div>
      {(error || helper) && (
        <p className={getHelperClasses()}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
