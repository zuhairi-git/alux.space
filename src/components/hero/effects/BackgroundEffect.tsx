'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  type: 'particles' | 'design-code' | 'gradient' | 'none';
}

const MaterialIcon = ({ icon, className = "", delay = 0 }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`material-symbols-outlined ${className}`}
  >
    {icon}
  </motion.span>
);

const DesignCodeEffect = () => {
  const designIcons = ['palette', 'brush', 'design_services', 'style'];
  const codeIcons = ['code', 'terminal', 'developer_mode', 'data_object'];
  const [showDesign, setShowDesign] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDesign(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <AnimatePresence mode="wait">
        {showDesign ? (
          <motion.div
            key="design"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {designIcons.map((icon, index) => (
              <MaterialIcon
                key={icon}
                icon={icon}
                delay={index * 0.2}
                className="text-6xl absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {codeIcons.map((icon, index) => (
              <MaterialIcon
                key={icon}
                icon={icon}
                delay={index * 0.2}
                className="text-6xl absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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