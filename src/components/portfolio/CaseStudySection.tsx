'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { delaySeconds, stagger, transition as t } from '@/design-system';
import { useTheme } from '@/context/ThemeContext';

interface CaseStudySectionProps {
  title: string;
  icon?: string;
  number?: number;
  id?: string;
  children: React.ReactNode;
  accent?: 'purple' | 'blue' | 'green' | 'orange' | 'red' | 'teal' | 'pink' | 'indigo' | 'cyan';
  className?: string;
  showDivider?: boolean;
}

const accentMap: Record<string, { gradient: string; dot: string; line: string; glow: string; text: string; iconBg: string }> = {
  purple: {
    gradient: 'from-purple-400 to-pink-400',
    dot: 'bg-purple-400',
    line: 'from-purple-400/30 via-pink-400/20 to-transparent',
    glow: 'from-purple-500 to-pink-500',
    text: 'from-purple-400 to-pink-400',
    iconBg: 'bg-purple-500/15 text-purple-400',
  },
  blue: {
    gradient: 'from-blue-400 to-cyan-400',
    dot: 'bg-blue-400',
    line: 'from-blue-400/30 via-cyan-400/20 to-transparent',
    glow: 'from-blue-500 to-cyan-500',
    text: 'from-blue-400 to-cyan-400',
    iconBg: 'bg-blue-500/15 text-blue-400',
  },
  green: {
    gradient: 'from-emerald-400 to-green-400',
    dot: 'bg-emerald-400',
    line: 'from-emerald-400/30 via-green-400/20 to-transparent',
    glow: 'from-emerald-500 to-green-500',
    text: 'from-emerald-400 to-green-400',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  },
  orange: {
    gradient: 'from-orange-400 to-amber-400',
    dot: 'bg-orange-400',
    line: 'from-orange-400/30 via-amber-400/20 to-transparent',
    glow: 'from-orange-500 to-amber-500',
    text: 'from-orange-400 to-amber-400',
    iconBg: 'bg-orange-500/15 text-orange-400',
  },
  red: {
    gradient: 'from-red-400 to-rose-400',
    dot: 'bg-red-400',
    line: 'from-red-400/30 via-rose-400/20 to-transparent',
    glow: 'from-red-500 to-rose-500',
    text: 'from-red-400 to-rose-400',
    iconBg: 'bg-red-500/15 text-red-400',
  },
  teal: {
    gradient: 'from-teal-400 to-cyan-400',
    dot: 'bg-teal-400',
    line: 'from-teal-400/30 via-cyan-400/20 to-transparent',
    glow: 'from-teal-500 to-cyan-500',
    text: 'from-teal-400 to-cyan-400',
    iconBg: 'bg-teal-500/15 text-teal-400',
  },
  pink: {
    gradient: 'from-pink-400 to-rose-400',
    dot: 'bg-pink-400',
    line: 'from-pink-400/30 via-rose-400/20 to-transparent',
    glow: 'from-pink-500 to-rose-500',
    text: 'from-pink-400 to-rose-400',
    iconBg: 'bg-pink-500/15 text-pink-400',
  },
  indigo: {
    gradient: 'from-indigo-400 to-violet-400',
    dot: 'bg-indigo-400',
    line: 'from-indigo-400/30 via-violet-400/20 to-transparent',
    glow: 'from-indigo-500 to-violet-500',
    text: 'from-indigo-400 to-violet-400',
    iconBg: 'bg-indigo-500/15 text-indigo-400',
  },
  cyan: {
    gradient: 'from-cyan-400 to-sky-400',
    dot: 'bg-cyan-400',
    line: 'from-cyan-400/30 via-sky-400/20 to-transparent',
    glow: 'from-cyan-500 to-sky-500',
    text: 'from-cyan-400 to-sky-400',
    iconBg: 'bg-cyan-500/15 text-cyan-400',
  },
};

const CaseStudySection: React.FC<CaseStudySectionProps> = ({
  title,
  icon,
  number,
  id,
  children,
  accent = 'purple',
  className = '',
  showDivider = true,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const colors = accentMap[accent] || accentMap.purple;
  const sectionId = id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <motion.section
      id={sectionId}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={t.enterSlow}
      className={`mb-20 md:mb-24 relative ${className}`}
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none" aria-hidden="true">
        <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br ${colors.glow} blur-3xl`} />
        <div className={`absolute top-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-br ${colors.gradient} blur-3xl`} />
      </div>

      {/* Section Divider */}
      {showDivider && (
        <div className="relative mb-12">
          {/* Gradient line with animated dots */}
          <div className="flex items-center w-full max-w-xl mx-auto mb-8">
            <div className={`h-px flex-1 bg-gradient-to-r ${colors.gradient} opacity-30`} />
            <div className="px-3 flex items-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1 h-1 rounded-full ${colors.dot} mx-1`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
            <div className={`h-px flex-1 bg-gradient-to-l ${colors.gradient} opacity-30`} />
          </div>

          {/* Icon or step number */}
          {(icon || number !== undefined) && (
            <div className="relative mb-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ ...t.enterSlow, delay: delaySeconds.md }}
                className="relative"
              >
                {/* Subtle glow behind */}
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.glow} opacity-10 blur-xl rounded-full`} />

                <div className="relative z-10 flex items-center justify-center">
                  {icon ? (
                    <div className={`w-11 h-11 flex items-center justify-center rounded-full ${colors.iconBg} backdrop-blur-sm`}>
                      <span className="material-symbols text-lg">{icon}</span>
                    </div>
                  ) : (
                    <span className={`text-7xl font-bold bg-gradient-to-br ${colors.text} bg-clip-text text-transparent opacity-30`}>
                      {number}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Title with animated underline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...t.enterSlow, delay: delaySeconds.lg }}
            className="text-center mb-14 relative"
          >
            <h2 className={`text-2xl md:text-3xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {title}
            </h2>
          </motion.div>
        </div>
      )}

      {/* Content with staggered child animations */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger.normal,
            },
          },
        }}
        className="max-w-5xl mx-auto"
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

/**
 * Wrap individual animated children inside CaseStudySection.
 * Provides fade-up animation that triggers with the parent stagger.
 */
export const CaseStudyItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: t.enter,
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default CaseStudySection;
