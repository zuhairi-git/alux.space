'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  type: 'particles' | 'design-code' | 'gradient' | 'none';
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

const DesignCodeEffect = () => {
  const designIcons = ['design_services', 'developer_board_chip', 'gesture', 'lens_blur', 'motion_photos_on', 'spatial_tracking'];
  const codeIcons = ['code', 'terminal', 'deployed_code', 'data_object', 'memory', 'integration_instructions'];
  const [showDesign, setShowDesign] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setShowDesign(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Very light base overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent z-0" />
      
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
                    <span className="material-symbols text-6xl text-blue-400/20">
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
                    <span className="material-symbols text-6xl text-purple-400/20">
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
          background: [
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

const ParticlesEffect = () => {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{x: number, y: number, duration: number}>>([]);
  
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
          className="absolute h-1 w-1 bg-blue-400/30 rounded-full"
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

const GradientEffect = () => (
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/20 via-purple-500/20 to-transparent" />
);

const BackgroundEffect = ({ type }: Props) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Return a simple div for SSR to avoid hydration mismatches
  if (!mounted) {
    return type === 'none' ? null : <div className="absolute inset-0" />;
  }
  
  if (type === 'none') return null;

  const effects = {
    'particles': <ParticlesEffect />,
    'design-code': <DesignCodeEffect />,
    'gradient': <GradientEffect />,
  };

  return effects[type] || null;
};

export default BackgroundEffect;