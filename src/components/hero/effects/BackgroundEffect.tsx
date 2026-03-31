'use client';

import React, { useEffect, useRef } from 'react';
import { Theme } from '@/context/ThemeContext';
import { palette, themeRgb } from '@/design-system';

interface Props {
  type: 'particles' | 'design-code' | 'gradient' | 'none' | 'abstract-modern' | 'modern-flow';
  theme?: Theme;
}

// Quantum particle interface
interface QuantumParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  entangledWith?: number;
  superpositionState: number; // 0-1 for wave function collapse
}

const BackgroundEffect = ({ theme = 'dark' }: Props) => {
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Quantum animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Initialize quantum particles
    const particleCount = 8;
    const particles: QuantumParticle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2,
        entangledWith: i % 2 === 0 ? i + 1 : i - 1, // Create entangled pairs
        superpositionState: Math.random(),
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += 0.02;
        particle.superpositionState = (Math.sin(particle.phase) + 1) / 2;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        if (isColorful) {
          ctx.fillStyle = `rgba(${themeRgb.colorful.particlePrimary}, ${0.6 + particle.superpositionState * 0.4})`; // primary-400
        } else if (isLight) {
          ctx.fillStyle = `rgba(${themeRgb.light.particlePrimary}, ${0.5 + particle.superpositionState * 0.5})`; // primary-500
        } else {
          ctx.fillStyle = `rgba(${themeRgb.dark.particlePrimary}, ${0.5 + particle.superpositionState * 0.5})`; // blue-500
        }
        ctx.fill();

        // Draw entanglement connections
        if (particle.entangledWith !== undefined && particle.entangledWith < particles.length) {
          const entangled = particles[particle.entangledWith];
          const distance = Math.hypot(entangled.x - particle.x, entangled.y - particle.y);
          
          // Only draw if particles are reasonably close
          if (distance < canvas.width * 0.6) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            
            // Create quantum wave effect in the connection
            const segments = 20;
            for (let i = 1; i <= segments; i++) {
              const t = i / segments;
              const x = particle.x + (entangled.x - particle.x) * t;
              const y = particle.y + (entangled.y - particle.y) * t;
              
              // Add wave oscillation
              const wave = Math.sin(t * Math.PI * 4 + particle.phase) * 15;
              const perpX = -(entangled.y - particle.y) / distance;
              const perpY = (entangled.x - particle.x) / distance;
              
              ctx.lineTo(x + perpX * wave, y + perpY * wave);
            }
            
            // Animated gradient along the connection
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              entangled.x, entangled.y
            );
            
            if (isColorful) {
              lineGradient.addColorStop(0, `rgba(${themeRgb.colorful.particlePrimary}, ${0.4 * particle.superpositionState})`); // primary-400
              lineGradient.addColorStop(0.5, `rgba(${themeRgb.colorful.particleSecondary}, ${0.6 * (particle.superpositionState + entangled.superpositionState) / 2})`); // primary-300
              lineGradient.addColorStop(1, `rgba(${themeRgb.colorful.particleTertiary}, ${0.4 * entangled.superpositionState})`); // pink-500
            } else if (isLight) {
              lineGradient.addColorStop(0, `rgba(${themeRgb.light.particlePrimary}, ${0.3 * particle.superpositionState})`); // primary-500
              lineGradient.addColorStop(0.5, `rgba(${themeRgb.light.particleSecondary}, ${0.5 * (particle.superpositionState + entangled.superpositionState) / 2})`); // blue-500
              lineGradient.addColorStop(1, `rgba(${themeRgb.light.particleTertiary}, ${0.3 * entangled.superpositionState})`); // pink-500
            } else {
              lineGradient.addColorStop(0, `rgba(${themeRgb.dark.particlePrimary}, ${0.3 * particle.superpositionState})`); // blue-500
              lineGradient.addColorStop(0.5, `rgba(${themeRgb.dark.particleSecondary}, ${0.5 * (particle.superpositionState + entangled.superpositionState) / 2})`); // indigo-500
              lineGradient.addColorStop(1, `rgba(${themeRgb.dark.particleTertiary}, ${0.3 * entangled.superpositionState})`); // violet-500
            }
            
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [isLight, isColorful]);

  if (isLight) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-white">
        {/* Quantum Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Rotating neural network */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <g className="animate-gentle-drift" style={{ transformOrigin: '500px 500px' }}>
            <circle cx="500" cy="200" r="3" fill={palette.purple[500]} />
            <circle cx="300" cy="400" r="3" fill={palette.yellow[500]} />
            <circle cx="700" cy="400" r="3" fill={palette.pink[500]} />
            <circle cx="400" cy="700" r="3" fill={palette.blue[500]} />
            <circle cx="600" cy="700" r="3" fill={palette.purple[500]} />
            <line x1="500" y1="200" x2="300" y2="400" stroke={palette.purple[500]} strokeWidth="0.5" opacity="0.4" />
            <line x1="500" y1="200" x2="700" y2="400" stroke={palette.yellow[500]} strokeWidth="0.5" opacity="0.4" />
            <line x1="300" y1="400" x2="400" y2="700" stroke={palette.pink[500]} strokeWidth="0.5" opacity="0.4" />
            <line x1="700" y1="400" x2="600" y2="700" stroke={palette.blue[500]} strokeWidth="0.5" opacity="0.4" />
            <line x1="300" y1="400" x2="700" y2="400" stroke={palette.purple[500]} strokeWidth="0.5" opacity="0.3" />
            <line x1="400" y1="700" x2="600" y2="700" stroke={palette.yellow[500]} strokeWidth="0.5" opacity="0.3" />
          </g>
        </svg>
        
        {/* Code blocks falling */}
        <div className="absolute top-0 left-1/4 text-primary-300 text-xs font-mono opacity-30 animate-matrix">const</div>
        <div className="absolute top-0 left-1/3 text-ds-gold-300 text-xs font-mono opacity-30 animate-matrix animation-delay-2000">func</div>
        <div className="absolute top-0 left-1/2 text-ds-pink-300 text-xs font-mono opacity-30 animate-matrix animation-delay-4000">{'=>'}</div>
        <div className="absolute top-0 left-2/3 text-ds-blue-300 text-xs font-mono opacity-30 animate-matrix animation-delay-1000">return</div>
        <div className="absolute top-0 right-1/4 text-primary-300 text-xs font-mono opacity-30 animate-matrix animation-delay-3000">async</div>
        
        {/* Pulsing nodes */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary-400 rounded-full animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-ds-gold-400 rounded-full animate-pulse-glow animation-delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-ds-pink-400 rounded-full animate-pulse-glow animation-delay-2000" />
      </div>
    );
  }

  if (isColorful) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-[var(--color-colorful-bg)]">
        {/* Quantum Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Matrix code rain - Left side */}
        <div className="absolute top-0 left-[5%] text-ds-cyan-400 text-sm font-mono opacity-40 animate-matrix">01</div>
        <div className="absolute top-0 left-[12%] text-primary-400 text-sm font-mono opacity-40 animate-matrix animation-delay-1000">10</div>
        <div className="absolute top-0 left-[18%] text-ds-pink-400 text-sm font-mono opacity-40 animate-matrix animation-delay-2000">11</div>
        <div className="absolute top-0 left-[25%] text-ds-cyan-400 text-sm font-mono opacity-40 animate-matrix animation-delay-3000">00</div>
        
        {/* Matrix code rain - Right side */}
        <div className="absolute top-0 right-[5%] text-primary-400 text-sm font-mono opacity-40 animate-matrix animation-delay-4000">01</div>
        <div className="absolute top-0 right-[12%] text-ds-pink-400 text-sm font-mono opacity-40 animate-matrix animation-delay-5000">10</div>
        <div className="absolute top-0 right-[18%] text-ds-cyan-400 text-sm font-mono opacity-40 animate-matrix animation-delay-6000">11</div>
        <div className="absolute top-0 right-[25%] text-primary-400 text-sm font-mono opacity-40 animate-matrix animation-delay-2000">00</div>
        
        {/* Glowing data nodes */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-ds-cyan-400 rounded-full animate-pulse-glow" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary-400 rounded-full animate-pulse-glow animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-ds-pink-400 rounded-full animate-pulse-glow animation-delay-4000" />
      </div>
    );
  }

  // Dark theme (default)
  return (
    <div className="absolute inset-0 overflow-hidden bg-ds-gray-950">
      {/* Quantum Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Subtle rotating constellation */}
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1000 1000">
        <g className="animate-gentle-drift" style={{ transformOrigin: '500px 500px' }}>
          <circle cx="500" cy="200" r="2" fill={palette.blue[500]} />
          <circle cx="300" cy="400" r="2" fill={palette.indigo[500]} />
          <circle cx="700" cy="400" r="2" fill={palette.violet[500]} />
          <circle cx="400" cy="700" r="2" fill={palette.blue[500]} />
          <circle cx="600" cy="700" r="2" fill={palette.indigo[500]} />
          <line x1="500" y1="200" x2="300" y2="400" stroke={palette.blue[500]} strokeWidth="0.5" opacity="0.3" />
          <line x1="500" y1="200" x2="700" y2="400" stroke={palette.indigo[500]} strokeWidth="0.5" opacity="0.3" />
          <line x1="300" y1="400" x2="400" y2="700" stroke={palette.violet[500]} strokeWidth="0.5" opacity="0.3" />
          <line x1="700" y1="400" x2="600" y2="700" stroke={palette.blue[500]} strokeWidth="0.5" opacity="0.3" />
          <line x1="300" y1="400" x2="700" y2="400" stroke={palette.indigo[500]} strokeWidth="0.5" opacity="0.2" />
          <line x1="400" y1="700" x2="600" y2="700" stroke={palette.violet[500]} strokeWidth="0.5" opacity="0.2" />
        </g>
      </svg>
      
      {/* Code symbols falling gently */}
      <div className="absolute top-0 left-1/4 text-ds-blue-800 text-xs font-mono opacity-20 animate-matrix">{'<>'}</div>
      <div className="absolute top-0 left-1/2 text-ds-indigo-800 text-xs font-mono opacity-20 animate-matrix animation-delay-3000">{'{}'}</div>
      <div className="absolute top-0 left-3/4 text-primary-800 text-xs font-mono opacity-20 animate-matrix animation-delay-5000">[]</div>
      
      {/* Subtle pulsing nodes */}
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-[var(--primary)] rounded-full animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-ds-indigo-600 rounded-full animate-pulse-glow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-primary-600 rounded-full animate-pulse-glow animation-delay-4000" />
    </div>
  );
};

export default BackgroundEffect;