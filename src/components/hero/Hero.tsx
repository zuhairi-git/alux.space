'use client';

import React from 'react';
import { HeroConfig } from '@/types/hero';
import DefaultHero from './variants/DefaultHero';
import DesignHero from './variants/DesignHero';
import CreativeHero from './variants/CreativeHero';
import BackgroundEffect from './effects/BackgroundEffect';
import { useTheme } from '@/context/ThemeContext';

interface HeroProps {
  config: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const { theme } = useTheme();
  const { variant = 'default', backgroundEffect = 'none' } = config;
  
  const renderHeroVariant = () => {
    switch (variant) {
      case 'design':
        return <DesignHero {...config} />;
      case 'creative':
        return <CreativeHero {...config} />;
      case 'default':
      default:
        return <DefaultHero {...config} />;
    }
  };
  
  return (
    <section className={`relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center `}>
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <BackgroundEffect type={backgroundEffect} theme={theme} />
      </div>
      
      {/* Hero Content */}
      {renderHeroVariant()}
    </section>
  );
}
