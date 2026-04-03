'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { delaySeconds, stagger, transition as t } from '@/design-system';
import Icon from '@/components/ui/Icon';
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

const accentMap: Record<string, { gradient: string; dot: string; line: string; wash: string; text: string; iconBg: string }> = {
  primary: {
    gradient: 'from-[var(--primary)] to-[var(--gradient-start)]',
    dot: 'bg-[var(--primary)]',
    line: 'from-[var(--primary)]/30 via-[var(--primary)]/20 to-transparent',
    wash: 'linear-gradient(to bottom, color-mix(in srgb, var(--primary) 7%, transparent) 0%, color-mix(in srgb, var(--gradient-start) 4%, transparent) 42%, transparent 100%)',
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
      <div
        className="absolute inset-x-0 top-0 h-20 rounded-t-[2rem] pointer-events-none opacity-60"
        aria-hidden="true"
        style={{ backgroundImage: colors.wash }}
      />

      {showDivider && (
        <div className="relative mb-12">
          <div className="flex items-center w-full max-w-xl mx-auto mb-8">
            <div className={`h-px flex-1 bg-gradient-to-r from-transparent ${colors.line}`} />
            <div className="px-3 flex items-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1 h-1 rounded-full ${colors.dot} mx-1`}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse' as const,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
            <div className={`h-px flex-1 bg-gradient-to-l from-transparent ${colors.line}`} />
          </div>

          <div className="relative mb-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ...t.enterSlow, delay: delaySeconds.md }}
              className="relative"
            >
              <div className="relative z-10 flex items-center justify-center">
                {number !== undefined ? (
                  <span
                    className={`leading-none font-bold bg-gradient-to-br ${colors.gradient} bg-clip-text text-transparent opacity-70`}
                    style={{ fontSize: 'var(--icon-size-display)' }}
                  >
                    {number}
                  </span>
                ) : (
                  <Icon
                    name={icon || 'category'}
                    size="display"
                    className={`bg-gradient-to-br ${colors.gradient} bg-clip-text text-transparent leading-none opacity-70`}
                    style={{ lineHeight: 1 }}
                  />
                )}
              </div>
            </motion.div>
          </div>

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
