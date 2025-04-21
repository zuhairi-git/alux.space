'use client';

import React from 'react';
import { HeroConfig } from '@/types/hero';
import DefaultHero from './variants/DefaultHero';
import DesignHero from './variants/DesignHero';
import MinimalHero from './variants/MinimalHero';
import CreativeHero from './variants/CreativeHero';
import BackgroundEffect from './effects/BackgroundEffect';
import { useTheme } from '@/context/ThemeContext';

interface HeroProps {
  config: HeroConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  const { theme } = useTheme();
  const HeroComponent = {
    default: DefaultHero,
    design: DesignHero,
    minimal: MinimalHero,
    creative: CreativeHero,
  }[config.variant];

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-16 ${
      theme === 'light' ? 'bg-gray-50/50' : ''
    }`}>
      <BackgroundEffect type={config.backgroundEffect || 'gradient'} theme={theme} />
      <HeroComponent {...config} theme={theme} />
    </section>
  );
};

export default Hero;