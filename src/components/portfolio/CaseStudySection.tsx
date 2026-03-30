'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { delaySeconds, stagger, transition as t } from '@/design-system';
interface CaseStudySectionProps {
  title: string;
  icon?: string;
  number?: number;
  id?: string;
  children: React.ReactNode;
  accent?: string;
  className?: string;
  showDivider?: boolean;
}

const accentMap: Record<string, { gradient: string; dot: string; line: string; glow: string; text: string; iconBg: string }> = {
  primary: {
    gradient: 'from-[var(--primary)] to-[var(--gradient-start)]',
    dot: 'bg-[var(--primary)]',
    line: 'from-[var(--primary)]/30 via-[var(--primary)]/20 to-transparent',
    glow: 'from-[var(--primary)] to-[var(--primary-glow)]',
    text: 'text-[var(--foreground)]',
    iconBg: 'bg-[var(--card-from-bg)] text-[var(--primary)] border border-[var(--card-border)]',
  }
};


const CaseStudySection: React.FC<CaseStudySectionProps> = ({
  title,
  icon,
  number,
  id,
  children,
  accent = 'primary',
  className = '',
  showDivider = true,
}) => {
  const colors = accentMap[accent] || accentMap.primary;
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
                  {number !== undefined ? (
                    <span className={`text-[2rem] md:text-[2.75rem] leading-none font-bold bg-gradient-to-br ${colors.gradient} bg-clip-text text-transparent opacity-30`}>
                      {number}
                    </span>
                  ) : (
                    <span 
                      className={`material-symbols !text-[2rem] md:!text-[2.75rem] bg-gradient-to-br ${colors.gradient} bg-clip-text text-transparent opacity-40 leading-none`}
                      style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 40" }}
                    >
                      {icon || 'category'}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

          {/* Title with animated underline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...t.enterSlow, delay: delaySeconds.lg }}
            className="text-center mb-14 relative"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
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
  accent?: string;
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
