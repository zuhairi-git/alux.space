'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import MediaCardsShowcase from '@/components/ui/MediaCardsShowcase';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import BackToTop from '@/components/ui/BackToTop';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';

export default function MediaCardsShowcasePage() {
  const router = useRouter();

  return (
    <ThemeProvider>
      <main className="min-h-screen bg-theme text-theme-text">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <BackgroundEffect type="gradient" />
        </div>
        <Navigation />
        <div className="relative z-10 pt-32 pb-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Media Cards</h1>            <p className="text-lg text-center max-w-3xl mx-auto mb-12 opacity-80">
              Showcase of different media card styles following our inclusive design system.
              These card components are designed for images, videos, and rich media content.
            </p>
            
            <MediaCardsShowcase />
            
            <div className="mt-16 text-center">
              <button 
                onClick={() => router.push('/portfolio')}
                className="inline-block px-8 py-4 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 hover:bg-gradient-to-l text-white"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
        <BackToTop />
      </main>
    </ThemeProvider>
  );
}
