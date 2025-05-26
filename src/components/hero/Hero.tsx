'use client';

import React from 'react';
import { HeroConfig } from '@/types/hero';
import UnifiedHero from './variants/UnifiedHero';
import BackgroundEffect from './effects/BackgroundEffect';
import { useTheme } from '@/context/ThemeContext';

interface HeroProps {
  config: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const { theme } = useTheme();
  // Use modern-flow for light/dark themes regardless of the configured background effect
  const backgroundEffect = (theme === 'light' || theme === 'dark') ? 'modern-flow' : config.backgroundEffect || 'none';
  
  return (
    <section className={`relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center `}>
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <BackgroundEffect type={backgroundEffect} theme={theme} />
      </div>
      
      {/* Hero Content - Now uses unified component that smoothly transitions between themes */}
      <UnifiedHero {...config} />
    </section>
  );
}
