'use client';

import React from 'react';
import { HeroConfig } from '@/types/hero';
import DefaultHero from './variants/DefaultHero';
import DesignHero from './variants/DesignHero';
import MinimalHero from './variants/MinimalHero';
import CreativeHero from './variants/CreativeHero';
import BackgroundEffect from './effects/BackgroundEffect';

interface HeroProps {
  config: HeroConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  const HeroComponent = {
    default: DefaultHero,
    design: DesignHero,
    minimal: MinimalHero,
    creative: CreativeHero,
  }[config.variant];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <BackgroundEffect type={config.backgroundEffect || 'gradient'} />
      <HeroComponent {...config} />
    </section>
  );
};

export default Hero;