'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '@/context/ThemeContext';

interface Props {
  type: 'particles' | 'design-code' | 'gradient' | 'none';
  theme?: Theme;
}

// Fixed initial positions to avoid hydration mismatches
const FIXED_POSITIONS = [
  { x: 20, y: 30 },
  { x: 80, y: 45 },
  { x: 50, y: 70 },
  { x: 30, y: 20 },
  { x: 70, y: 80 },
  { x: 40, y: 60 },
  { x: 60, y: 25 },
  { x: 25, y: 85 },
  { x: 85, y: 35 },
  { x: 45, y: 50 },
  { x: 65, y: 75 },
  { x: 35, y: 40 },
];

const DesignCodeEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const designIcons = ['design_services', 'developer_board_chip', 'gesture', 'lens_blur', 'motion_photos_on', 'spatial_tracking'];
  const codeIcons = ['code', 'terminal', 'deployed_code', 'data_object', 'memory', 'integration_instructions'];
  const [showDesign, setShowDesign] = useState(true);
  const [mounted, setMounted] = useState(false);

  const isLight = theme === 'light';

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setShowDesign(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Very light base overlay - lighter for light theme */}
      <div className={`absolute inset-0 ${isLight ? 'bg-white/20' : 'bg-gradient-to-br from-black/40 via-black/20 to-transparent'} z-0`} />
      
      {mounted && (
        <AnimatePresence mode="wait">
          {showDesign ? (
            <motion.div
              key="design"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              {designIcons.map((icon, index) => {
                // Use predictable positions for server rendering
                const position = FIXED_POSITIONS[index % FIXED_POSITIONS.length];
                
                return (
                  <motion.div
                    key={icon}
                    className="absolute"
                    initial={{ 
                      opacity: 0,
                      scale: 0.5,
                      x: `${position.x}%`,
                      y: `${position.y}%`
                    }}
                    animate={{ 
                      opacity: [0.1, 0.2, 0.1],
                      scale: [1, 1.2, 1],
                      x: `${position.x}%`,
                      y: `${position.y}%`
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2
                    }}
                  >
                    <span className={`material-symbols text-6xl ${isLight ? 'text-blue-500/30' : 'text-blue-400/20'}`}>
                      {icon}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              {codeIcons.map((icon, index) => {
                // Use predictable positions for server rendering
                const position = FIXED_POSITIONS[index % FIXED_POSITIONS.length];
                
                return (
                  <motion.div
                    key={icon}
                    className="absolute"
                    initial={{ 
                      opacity: 0,
                      scale: 0.5,
                      x: `${position.x}%`,
                      y: `${position.y}%`
                    }}
                    animate={{ 
                      opacity: [0.1, 0.2, 0.1],
                      scale: [1, 1.2, 1],
                      x: `${position.x}%`,
                      y: `${position.y}%`
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2
                    }}
                  >
                    <span className={`material-symbols text-6xl ${isLight ? 'text-purple-500/30' : 'text-purple-400/20'}`}>
                      {icon}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Subtle ambient light */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{
          background: isLight
            ? [
              'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.05) 0%, transparent 70%)'
            ]
            : [
              'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.03) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.03) 0%, transparent 70%)'
            ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
};

const ParticlesEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{x: number, y: number, duration: number}>>([]);
  const isLight = theme === 'light';
  
  useEffect(() => {
    setMounted(true);
    // Generate particle data after mounting to avoid hydration mismatch
    const newParticles = Array(20).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);
  }, []);
  
  if (!mounted) return <div className="absolute inset-0" />;
  
  return (
    <div className="absolute inset-0">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute h-1 w-1 ${isLight ? 'bg-blue-500/30' : 'bg-blue-400/30'} rounded-full`}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 1
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [1, 2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

const GradientEffect = ({ theme = 'dark' }: { theme?: Theme }) => {
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
  if (isColorful) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {/* Cosmic background base */}
        <div className="absolute inset-0 bg-[#050023]" />
        
        {/* Animated cosmic nebula effect */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.4) 0%, transparent 25%), radial-gradient(circle at 80% 30%, rgba(255, 0, 204, 0.4) 0%, transparent 30%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)'
          }}
          animate={{
            background: [
              'radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.4) 0%, transparent 25%), radial-gradient(circle at 80% 30%, rgba(255, 0, 204, 0.4) 0%, transparent 30%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)',
              'radial-gradient(circle at 60% 30%, rgba(0, 255, 255, 0.4) 0%, transparent 25%), radial-gradient(circle at 30% 40%, rgba(255, 0, 204, 0.4) 0%, transparent 30%), radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)',
              'radial-gradient(circle at 40% 70%, rgba(0, 255, 255, 0.4) 0%, transparent 25%), radial-gradient(circle at 60% 50%, rgba(255, 0, 204, 0.4) 0%, transparent 30%), radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Cosmic stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 2 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  left: `${posX}%`,
                  top: `${posY}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 2,
                }}
              />
            );
          })}
        </div>
        
        {/* Floating cosmic objects */}
        <motion.div 
          className="absolute w-40 h-40 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
            left: '10%',
            top: '20%'
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute w-60 h-60 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 0, 204, 0.1) 0%, transparent 70%)',
            right: '15%',
            bottom: '20%'
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Subtle overlay to enhance text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050023] via-transparent to-transparent" />
      </div>
    );
  }
  
  return (
    <div className={`absolute inset-0 ${
      isLight 
        ? 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/10 via-purple-400/10 to-transparent'
        : 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/20 via-purple-500/20 to-transparent'
    }`} />
  );
};

const BackgroundEffect = ({ type, theme = 'dark' }: Props) => {
  switch (type) {
    case 'particles':
      return <ParticlesEffect theme={theme} />;
    case 'design-code':
      return <DesignCodeEffect theme={theme} />;
    case 'gradient':
      return <GradientEffect theme={theme} />;
    case 'none':
    default:
      return null;
  }
};

export default BackgroundEffect;