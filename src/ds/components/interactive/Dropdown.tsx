'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right';
  className?: string;
}

export default function Dropdown({
  trigger,
  children,
  position = 'bottom',
  className = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const getDropdownClasses = () => {
    const baseClasses = 'absolute z-50 min-w-[200px] rounded-lg border shadow-lg backdrop-blur-sm';

    if (theme === 'light') {
      return `${baseClasses} bg-white/95 border-gray-200 shadow-gray-200/50`;
    } else if (theme === 'colorful') {
      return `${baseClasses} bg-purple-900/90 border-purple-400/30 shadow-purple-500/20`;
    } else {
      return `${baseClasses} bg-gray-800/95 border-gray-600 shadow-gray-800/50`;
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full mb-2 left-0';
      case 'bottom':
        return 'top-full mt-2 left-0';
      case 'left':
        return 'right-full mr-2 top-0';
      case 'right':
        return 'left-full ml-2 top-0';
      default:
        return 'top-full mt-2 left-0';
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`${getDropdownClasses()} ${getPositionClasses()}`}
            >
              <div className="py-2">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function DropdownItem({
  children,
  onClick,
  disabled = false,
  className = ''
}: DropdownItemProps) {
  const { theme } = useTheme();

  const getItemClasses = () => {
    const baseClasses = 'w-full px-4 py-2 text-left transition-all duration-200 cursor-pointer';

    if (disabled) {
      return `${baseClasses} opacity-50 cursor-not-allowed`;
    }

    if (theme === 'light') {
      return `${baseClasses} text-gray-700 hover:bg-gray-50`;
    } else if (theme === 'colorful') {
      return `${baseClasses} text-gray-300 hover:bg-purple-500/20`;
    } else {
      return `${baseClasses} text-gray-300 hover:bg-gray-700`;
    }
  };

  return (
    <motion.button
      className={`${getItemClasses()} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={!disabled ? { backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
