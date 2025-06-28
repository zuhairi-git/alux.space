'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export default function Toggle({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  className = ''
}: ToggleProps) {
  const [isChecked, setIsChecked] = useState(checked);
  const { theme } = useTheme();

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          track: 'w-8 h-4',
          thumb: 'w-3 h-3',
          translate: 'translate-x-4'
        };
      case 'md':
        return {
          track: 'w-11 h-6',
          thumb: 'w-5 h-5',
          translate: 'translate-x-5'
        };
      case 'lg':
        return {
          track: 'w-14 h-7',
          thumb: 'w-6 h-6',
          translate: 'translate-x-7'
        };
      default:
        return {
          track: 'w-11 h-6',
          thumb: 'w-5 h-5',
          translate: 'translate-x-5'
        };
    }
  };

  const getTrackClasses = () => {
    const sizeClasses = getSizeClasses();
    const baseClasses = `relative inline-flex items-center rounded-full transition-colors duration-300 cursor-pointer ${sizeClasses.track}`;

    if (disabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed bg-gray-300`;
    }

    if (isChecked) {
      if (theme === 'light') {
        return `${baseClasses} bg-blue-500`;
      } else if (theme === 'colorful') {
        return `${baseClasses} bg-gradient-to-r from-fuchsia-500 to-purple-500`;
      } else {
        return `${baseClasses} bg-blue-600`;
      }
    } else {
      if (theme === 'light') {
        return `${baseClasses} bg-gray-200`;
      } else if (theme === 'colorful') {
        return `${baseClasses} bg-gray-700`;
      } else {
        return `${baseClasses} bg-gray-600`;
      }
    }
  };

  const getThumbClasses = () => {
    const sizeClasses = getSizeClasses();
    const baseClasses = `inline-block bg-white rounded-full shadow-lg transform transition-transform duration-300 ${sizeClasses.thumb}`;
    
    return isChecked 
      ? `${baseClasses} ${sizeClasses.translate}`
      : `${baseClasses} translate-x-0.5`;
  };
  return (
    <div className={`flex items-center ${className}`}>
      <motion.button
        className={getTrackClasses()}
        onClick={handleToggle}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        disabled={disabled}
        aria-checked={isChecked}
        role="switch"
        aria-label={label}
      >
        <motion.span
          className={getThumbClasses()}
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      </motion.button>
      
      {label && (
        <span 
          className={`ml-3 text-sm font-medium ${
            theme === 'light' 
              ? 'text-gray-700' 
              : theme === 'colorful' 
                ? 'text-gray-200' 
                : 'text-gray-300'
          } ${disabled ? 'opacity-50' : ''}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
