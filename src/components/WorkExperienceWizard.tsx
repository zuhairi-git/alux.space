'use client';

import React, { useState, useRef } from 'react';
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
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSteps = workContent.positions.length;

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
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
        cardBg: 'bg-gradient-to-br from-[var(--card-from-bg)] to-[var(--card-to-bg)]',
        cardBorder: 'border-[var(--card-border)]',
        cardGlow: 'shadow-2xl shadow-[var(--primary)]/20',
        accentGradient: 'from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]',
        buttonBg: 'bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20',
        buttonActive: 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)]',
        iconColor: 'text-[var(--primary)]',
        progressBg: 'bg-[var(--primary)]/20',
        progressFill: 'from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]',
      };
    } else if (theme === 'dark') {
      return {
        cardBg: 'bg-gradient-to-br from-ds-gray-800/80 via-ds-gray-900/70 to-[var(--primary)]/20',
        cardBorder: 'border-primary/20',
        cardGlow: 'shadow-2xl shadow-[var(--primary)]/10',
        accentGradient: 'from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]',
        buttonBg: 'bg-primary/20 hover:bg-primary/30',
        buttonActive: 'bg-gradient-to-r from-[var(--btn-primary-bg)] to-[var(--gradient-mid)]',
        iconColor: 'text-accent',
        progressBg: 'bg-primary/20',
        progressFill: 'from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]',
      };
    } else {
      return {
        cardBg: 'bg-white/90',
        cardBorder: 'border-primary/20',
        cardGlow: 'shadow-xl shadow-[var(--primary)]/10',
        accentGradient: 'from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]',
        buttonBg: 'bg-primary/10 hover:bg-primary/20',
        buttonActive: 'bg-gradient-to-r from-[var(--btn-primary-bg)] to-[var(--gradient-mid)]',
        iconColor: 'text-accent',
        progressBg: 'bg-primary/10',
        progressFill: 'from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]',
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
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--gradient-start)]/5 via-[var(--gradient-mid)]/5 to-[var(--gradient-end)]/5" />
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-[var(--gradient-mid)]/10 to-[var(--gradient-end)]/10 blur-3xl"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ left: '10%', top: '20%' }}
      />
      <motion.div 
        className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 blur-3xl"
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
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]">
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
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--gradient-mid)]/10 to-transparent rounded-bl-full" />
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[var(--gradient-end)]/10 to-transparent rounded-tr-full" />
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Timeline visualization */}
          <div className="mt-0">
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
