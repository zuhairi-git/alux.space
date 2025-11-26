'use client';

import React from 'react';
import { Theme } from '@/context/ThemeContext';

interface Props {
  type: 'particles' | 'design-code' | 'gradient' | 'none' | 'abstract-modern' | 'modern-flow';
  theme?: Theme;
}

const BackgroundEffect = ({ type, theme = 'dark' }: Props) => {
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  if (isLight) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-white">
        {/* Rotating neural network */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <g className="animate-rotate-slow" style={{ transformOrigin: '500px 500px' }}>
            <circle cx="500" cy="200" r="3" fill="#a855f7" />
            <circle cx="300" cy="400" r="3" fill="#eab308" />
            <circle cx="700" cy="400" r="3" fill="#ec4899" />
            <circle cx="400" cy="700" r="3" fill="#3b82f6" />
            <circle cx="600" cy="700" r="3" fill="#a855f7" />
            <line x1="500" y1="200" x2="300" y2="400" stroke="#a855f7" strokeWidth="0.5" opacity="0.4" />
            <line x1="500" y1="200" x2="700" y2="400" stroke="#eab308" strokeWidth="0.5" opacity="0.4" />
            <line x1="300" y1="400" x2="400" y2="700" stroke="#ec4899" strokeWidth="0.5" opacity="0.4" />
            <line x1="700" y1="400" x2="600" y2="700" stroke="#3b82f6" strokeWidth="0.5" opacity="0.4" />
            <line x1="300" y1="400" x2="700" y2="400" stroke="#a855f7" strokeWidth="0.5" opacity="0.3" />
            <line x1="400" y1="700" x2="600" y2="700" stroke="#eab308" strokeWidth="0.5" opacity="0.3" />
          </g>
        </svg>
        
        {/* Code blocks falling */}
        <div className="absolute top-0 left-1/4 text-purple-300 text-xs font-mono opacity-30 animate-matrix">const</div>
        <div className="absolute top-0 left-1/3 text-yellow-300 text-xs font-mono opacity-30 animate-matrix animation-delay-2000">func</div>
        <div className="absolute top-0 left-1/2 text-pink-300 text-xs font-mono opacity-30 animate-matrix animation-delay-4000">{'=>'}</div>
        <div className="absolute top-0 left-2/3 text-blue-300 text-xs font-mono opacity-30 animate-matrix animation-delay-1000">return</div>
        <div className="absolute top-0 right-1/4 text-purple-300 text-xs font-mono opacity-30 animate-matrix animation-delay-3000">async</div>
        
        {/* Pulsing nodes */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-pulse-glow animation-delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse-glow animation-delay-2000" />
      </div>
    );
  }

  if (isColorful) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[#050023]">
        {/* Animated neural mesh */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="line2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <g className="animate-rotate-slow" style={{ transformOrigin: '500px 500px' }}>
            {/* Main network nodes */}
            <circle cx="500" cy="150" r="4" fill="#00ffff" className="animate-pulse-glow" />
            <circle cx="250" cy="350" r="4" fill="#a855f7" className="animate-pulse-glow animation-delay-1000" />
            <circle cx="750" cy="350" r="4" fill="#ec4899" className="animate-pulse-glow animation-delay-2000" />
            <circle cx="350" cy="650" r="4" fill="#00ffff" className="animate-pulse-glow animation-delay-3000" />
            <circle cx="650" cy="650" r="4" fill="#a855f7" className="animate-pulse-glow animation-delay-4000" />
            <circle cx="500" cy="850" r="4" fill="#ec4899" className="animate-pulse-glow animation-delay-2000" />
            
            {/* Connection lines with gradients */}
            <line x1="500" y1="150" x2="250" y2="350" stroke="url(#line1)" strokeWidth="1" />
            <line x1="500" y1="150" x2="750" y2="350" stroke="url(#line2)" strokeWidth="1" />
            <line x1="250" y1="350" x2="350" y2="650" stroke="url(#line1)" strokeWidth="1" />
            <line x1="750" y1="350" x2="650" y2="650" stroke="url(#line2)" strokeWidth="1" />
            <line x1="350" y1="650" x2="500" y2="850" stroke="url(#line1)" strokeWidth="1" />
            <line x1="650" y1="650" x2="500" y2="850" stroke="url(#line2)" strokeWidth="1" />
            <line x1="250" y1="350" x2="750" y2="350" stroke="url(#line1)" strokeWidth="1" opacity="0.4" />
            <line x1="350" y1="650" x2="650" y2="650" stroke="url(#line2)" strokeWidth="1" opacity="0.4" />
          </g>
        </svg>
        
        {/* Matrix code rain */}
        <div className="absolute top-0 left-[10%] text-cyan-400 text-sm font-mono opacity-40 animate-matrix">01</div>
        <div className="absolute top-0 left-[20%] text-purple-400 text-sm font-mono opacity-40 animate-matrix animation-delay-1000">10</div>
        <div className="absolute top-0 left-[30%] text-pink-400 text-sm font-mono opacity-40 animate-matrix animation-delay-2000">11</div>
        <div className="absolute top-0 left-[40%] text-cyan-400 text-sm font-mono opacity-40 animate-matrix animation-delay-3000">00</div>
        <div className="absolute top-0 left-[50%] text-purple-400 text-sm font-mono opacity-40 animate-matrix animation-delay-4000">01</div>
        <div className="absolute top-0 left-[60%] text-pink-400 text-sm font-mono opacity-40 animate-matrix animation-delay-5000">10</div>
        <div className="absolute top-0 left-[70%] text-cyan-400 text-sm font-mono opacity-40 animate-matrix animation-delay-6000">11</div>
        <div className="absolute top-0 left-[80%] text-purple-400 text-sm font-mono opacity-40 animate-matrix animation-delay-2000">00</div>
        
        {/* Glowing data nodes */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse-glow" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse-glow animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-pink-400 rounded-full animate-pulse-glow animation-delay-4000" />
      </div>
    );
  }

  // Dark theme (default)
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-950">
      {/* Subtle rotating constellation */}
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1000 1000">
        <g className="animate-rotate-slow" style={{ transformOrigin: '500px 500px' }}>
          <circle cx="500" cy="200" r="2" fill="#3b82f6" />
          <circle cx="300" cy="400" r="2" fill="#6366f1" />
          <circle cx="700" cy="400" r="2" fill="#8b5cf6" />
          <circle cx="400" cy="700" r="2" fill="#3b82f6" />
          <circle cx="600" cy="700" r="2" fill="#6366f1" />
          <line x1="500" y1="200" x2="300" y2="400" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
          <line x1="500" y1="200" x2="700" y2="400" stroke="#6366f1" strokeWidth="0.5" opacity="0.3" />
          <line x1="300" y1="400" x2="400" y2="700" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
          <line x1="700" y1="400" x2="600" y2="700" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
          <line x1="300" y1="400" x2="700" y2="400" stroke="#6366f1" strokeWidth="0.5" opacity="0.2" />
          <line x1="400" y1="700" x2="600" y2="700" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.2" />
        </g>
      </svg>
      
      {/* Code symbols falling gently */}
      <div className="absolute top-0 left-1/4 text-blue-800 text-xs font-mono opacity-20 animate-matrix">{'<>'}</div>
      <div className="absolute top-0 left-1/2 text-indigo-800 text-xs font-mono opacity-20 animate-matrix animation-delay-3000">{'{}'}</div>
      <div className="absolute top-0 left-3/4 text-purple-800 text-xs font-mono opacity-20 animate-matrix animation-delay-5000">[]</div>
      
      {/* Subtle pulsing nodes */}
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse-glow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse-glow animation-delay-4000" />
    </div>
  );
};

export default BackgroundEffect;