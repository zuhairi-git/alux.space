'use client';

import React from 'react';
import { HeroConfig } from '@/types/hero';
import DefaultHero from './variants/DefaultHero';
import DesignHero from './variants/DesignHero';
import CreativeHero from './variants/CreativeHero';
import BackgroundEffect from './effects/BackgroundEffect';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  config: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const { isRTL } = useLanguage();
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
    <section className={`relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <BackgroundEffect type={backgroundEffect} />
      </div>
      
      {/* Hero Content */}
      {renderHeroVariant()}
    </section>
  );
}