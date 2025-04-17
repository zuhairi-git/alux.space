'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  type: 'particles' | 'design-code' | 'gradient' | 'none';
}

const DesignCodeEffect = () => {
  const designIcons = ['design_services', 'developer_board_chip', 'gesture', 'lens_blur', 'motion_photos_on', 'spatial_tracking'];
  const codeIcons = ['code', 'terminal', 'deployed_code', 'data_object', 'memory', 'integration_instructions'];
  const [showDesign, setShowDesign] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDesign(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Very light base overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent z-0" />
      
      <AnimatePresence mode="wait">
        {showDesign ? (
          <motion.div
            key="design"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            {designIcons.map((icon, index) => (
              <motion.div
                key={icon}
                className="absolute"
                initial={{ 
                  opacity: 0,
                  scale: 0.5,
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`
                }}
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.2, 1],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`
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
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            {codeIcons.map((icon, index) => (
              <motion.div
                key={icon}
                className="absolute"
                initial={{ 
                  opacity: 0,
                  scale: 0.5,
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`
                }}
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.2, 1],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`
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
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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

const ParticlesEffect = () => (
  <div className="absolute inset-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 w-1 bg-blue-400/30 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: [1, 2, 1],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}
  </div>
);

const GradientEffect = () => (
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/20 via-purple-500/20 to-transparent" />
);

const BackgroundEffect: React.FC<Props> = ({ type }) => {
  if (type === 'none') return null;

  const effects = {
    'particles': <ParticlesEffect />,
    'design-code': <DesignCodeEffect />,
    'gradient': <GradientEffect />,
  };

  return effects[type] || null;
};

export default BackgroundEffect;