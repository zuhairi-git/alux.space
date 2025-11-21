'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkPosition {
  title: string;
  period: string;
  company?: string;
  description?: string;
  positions?: WorkPosition[];
}

interface WorkContent {
  intro: string;
  positions: WorkPosition[];
}

interface WorkExperienceWizardProps {
  workContent: WorkContent;
  theme: string;
  t: (key: string) => string;
}


export function WorkExperienceWizard({ workContent, theme, t }: WorkExperienceWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSteps = workContent.positions.length;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentStep((prev) => (prev + 1) % totalSteps);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, totalSteps]);

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
    setIsAutoPlay(false);
  };

  const nextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => (prev + 1) % totalSteps);
    setIsAutoPlay(false);
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => (prev - 1 + totalSteps) % totalSteps);
    setIsAutoPlay(false);
  };

  const getCurrentPosition = () => {
    return workContent.positions[currentStep];
  };

  const getStepIcon = (index: number) => {
    const position = workContent.positions[index];
    
    if (position.positions) {
      return 'history';
    }
    
    const icons = ['rocket_launch', 'insights', 'grid_view', 'psychology', 'code'];
    return icons[index % icons.length];
  };

  const getThemeColors = () => {
    if (theme === 'colorful') {
      return {
        cardBg: 'bg-gradient-to-br from-purple-900/40 via-fuchsia-900/30 to-blue-900/40',
        cardBorder: 'border-purple-500/30',
        cardGlow: 'shadow-2xl shadow-purple-500/20',
        accentGradient: 'from-purple-400 via-fuchsia-400 to-blue-400',
        buttonBg: 'bg-purple-500/20 hover:bg-purple-500/30',
        buttonActive: 'bg-gradient-to-r from-purple-500 to-fuchsia-500',
        iconColor: 'text-purple-400',
        progressBg: 'bg-purple-500/20',
        progressFill: 'from-purple-500 via-fuchsia-500 to-blue-500',
      };
    } else if (theme === 'dark') {
      return {
        cardBg: 'bg-gradient-to-br from-gray-800/80 via-gray-900/70 to-blue-900/40',
        cardBorder: 'border-blue-500/20',
        cardGlow: 'shadow-2xl shadow-blue-500/10',
        accentGradient: 'from-blue-400 via-cyan-400 to-indigo-400',
        buttonBg: 'bg-blue-500/20 hover:bg-blue-500/30',
        buttonActive: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        iconColor: 'text-blue-400',
        progressBg: 'bg-blue-500/20',
        progressFill: 'from-blue-500 via-cyan-500 to-indigo-500',
      };
    } else {
      return {
        cardBg: 'bg-white/90',
        cardBorder: 'border-blue-200/50',
        cardGlow: 'shadow-xl shadow-blue-200/20',
        accentGradient: 'from-blue-500 via-indigo-500 to-purple-500',
        buttonBg: 'bg-blue-100/50 hover:bg-blue-200/50',
        buttonActive: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        iconColor: 'text-blue-500',
        progressBg: 'bg-blue-200/30',
        progressFill: 'from-blue-500 via-indigo-500 to-purple-500',
      };
    }
  };

  const colors = getThemeColors();

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  return (
    <div ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-3xl"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: '10%', top: '20%' }}
      />
      <motion.div 
        className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl"
        animate={{ 
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{ right: '10%', bottom: '20%' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className={`material-symbols text-4xl p-4 rounded-2xl ${colors.iconColor} bg-gradient-to-br ${colors.buttonBg} backdrop-blur-sm border ${colors.cardBorder}`}
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
            >
              work_history
            </motion.span>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-purple-600 via-blue-600 to-pink-600">
              {t('home.workExperience.title')}
            </h3>
          </motion.div>
          
          <motion.div
            className={`mx-auto h-1.5 w-32 rounded-full bg-gradient-to-r ${colors.accentGradient}`}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <motion.p 
            className="text-center mt-6 text-theme-text/70 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {workContent.intro}
          </motion.p>
        </div>

        {/* Main Card Container */}
        <div className="max-w-5xl mx-auto">
          {/* Experience Card */}
          <div className="relative min-h-[500px] perspective-1000">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 },
                  rotateY: { duration: 0.5 },
                }}
                className="w-full"
              >
                {(() => {
                  const position = getCurrentPosition();
                  
                  return (
                    <div className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-xl ${colors.cardBg} border-2 ${colors.cardBorder} ${colors.cardGlow} overflow-hidden group`}>
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.accentGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      {/* Icon badge */}
                      <motion.div 
                        className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${colors.buttonBg} backdrop-blur-sm border ${colors.cardBorder} mb-6`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <span className={`material-symbols text-3xl md:text-4xl ${colors.iconColor}`}>
                          {getStepIcon(currentStep)}
                        </span>
                      </motion.div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Title */}
                        <motion.h4 
                          className="text-2xl md:text-3xl font-bold text-theme-text mb-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {position.title}
                        </motion.h4>

                        {/* Company & Period */}
                        <motion.div 
                          className="flex flex-wrap items-center gap-4 mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {position.company && (
                            <div className="flex items-center gap-2">
                              <span className={`material-symbols text-xl ${colors.iconColor}`}>business</span>
                              <span className="text-theme-text/80 font-medium">{position.company}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className={`material-symbols text-xl ${colors.iconColor}`}>schedule</span>
                            <span className="text-theme-text/70">{position.period}</span>
                          </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {!position.positions ? (
                            <p className="text-theme-text/80 text-lg leading-relaxed">
                              {position.description}
                            </p>
                          ) : (
                            <div className="space-y-3">
                              {position.positions.map((subPosition, idx) => (
                                <motion.div
                                  key={idx}
                                  className={`p-4 rounded-xl backdrop-blur-sm ${colors.buttonBg} border ${colors.cardBorder}`}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + idx * 0.1 }}
                                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                >
                                  <div className="font-semibold text-theme-text mb-1">{subPosition.title}</div>
                                  <div className="text-sm text-theme-text/70">{subPosition.company}</div>
                                  {subPosition.period && (
                                    <div className="text-xs text-theme-text/60 mt-1">{subPosition.period}</div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </motion.div>

                        {/* Step indicator */}
                        <motion.div 
                          className="mt-8 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${colors.accentGradient} text-white font-semibold text-sm backdrop-blur-sm`}>
                            {currentStep + 1} / {totalSteps}
                          </div>
                        </motion.div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full" />
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full" />
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {/* Previous Button */}
            <motion.button
              onClick={prevStep}
              className={`p-4 rounded-full ${colors.buttonBg} backdrop-blur-sm border ${colors.cardBorder} ${colors.iconColor} hover:scale-110 transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous"
            >
              <span className="material-symbols text-2xl">chevron_left</span>
            </motion.button>

            {/* Dot Navigation */}
            <div className="flex items-center gap-3">
              {workContent.positions.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`relative transition-all duration-300 ${
                    index === currentStep
                      ? `w-12 h-3 rounded-full bg-gradient-to-r ${colors.accentGradient}`
                      : `w-3 h-3 rounded-full ${colors.progressBg} hover:scale-125`
                  }`}
                  whileHover={{ scale: index === currentStep ? 1 : 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to position ${index + 1}`}
                >
                  {index === currentStep && (
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.accentGradient}`}
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextStep}
              className={`p-4 rounded-full ${colors.buttonBg} backdrop-blur-sm border ${colors.cardBorder} ${colors.iconColor} hover:scale-110 transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next"
            >
              <span className="material-symbols text-2xl">chevron_right</span>
            </motion.button>
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-6 py-3 rounded-full backdrop-blur-sm border ${colors.cardBorder} transition-all duration-300 flex items-center gap-2 ${
                isAutoPlay 
                  ? `${colors.buttonActive} text-white shadow-lg` 
                  : `${colors.buttonBg} text-theme-text/70`
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-symbols text-xl">
                {isAutoPlay ? 'pause' : 'play_arrow'}
              </span>
              <span className="font-medium">
                {isAutoPlay ? 'Pause' : 'Auto Play'}
              </span>
            </motion.button>
          </div>

          {/* Timeline visualization */}
          <div className="mt-16">
            <div className="relative">
              {/* Progress line */}
              <div className={`h-2 rounded-full ${colors.progressBg} overflow-hidden`}>
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${colors.progressFill}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              
              {/* Timeline markers */}
              <div className="flex justify-between mt-4">
                {workContent.positions.map((pos, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => goToStep(index)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                      index <= currentStep
                        ? `bg-gradient-to-r ${colors.accentGradient} ${colors.cardGlow}`
                        : `${colors.buttonBg} border ${colors.cardBorder}`
                    }`}>
                      <span className={`material-symbols text-lg ${
                        index <= currentStep ? 'text-white' : colors.iconColor
                      }`}>
                        {getStepIcon(index)}
                      </span>
                    </div>
                    <div className="text-xs text-center text-theme-text/60 max-w-[80px] group-hover:text-theme-text/80 transition-colors">
                      {pos.period.split(' - ')[0]}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
