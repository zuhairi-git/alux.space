'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default function Textarea({
  label,
  error,
  helper,
  className = '',
  ...props
}: TextareaProps) {
  const { theme } = useTheme();

  const getTextareaClasses = () => {
    const baseClasses = 'w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 resize-vertical min-h-[120px]';

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
      )}      <textarea
        className={`${getTextareaClasses()} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
        {...props}
      />
      {(error || helper) && (
        <p className={getHelperClasses()}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
