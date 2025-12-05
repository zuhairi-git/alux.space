'use client';

import React from 'react';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';
import { useTheme } from '@/context/ThemeContext';

export default function BlogPostBackground() {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Light theme background - only visible in light theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0"></div>
      </div>

      {/* Dark/Colorful theme background - visible in dark and colorful themes */}
      <div className="absolute inset-0 z-0">
        <BackgroundEffect type="gradient" theme={theme} />
        <div className="absolute inset-0 pointer-events-none"></div>
      </div>
    </>
  );
}
