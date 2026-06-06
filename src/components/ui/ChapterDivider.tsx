'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { durationSeconds, delaySeconds, transition as t } from '@/design-system';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';

interface ChapterDividerProps {
  title: string;
  number?: number; // Optional since we can use icon
  icon?: string; // Semantic icon name (translated to Font Awesome glyph)
  id?: string;
}

const ChapterDivider: React.FC<ChapterDividerProps> = ({ title, number, icon, id }) => {
  const chapterId = id || title.toLowerCase().replace(/\s+/g, '-');
  const topWashStyle = {
    backgroundImage:
      'linear-gradient(to bottom, color-mix(in srgb, var(--primary) 18%, transparent) 0%, color-mix(in srgb, var(--primary-glow) 16%, transparent) 38%, transparent 100%)',
  } satisfies React.CSSProperties;
  const leadLineStyle = {
    backgroundImage:
      'linear-gradient(to right, transparent 0%, color-mix(in srgb, var(--primary) 42%, transparent) 52%, color-mix(in srgb, var(--primary-600) 72%, transparent) 100%)',
  } satisfies React.CSSProperties;
  const trailLineStyle = {
    backgroundImage:
      'linear-gradient(to left, transparent 0%, color-mix(in srgb, var(--primary) 42%, transparent) 52%, color-mix(in srgb, var(--primary-600) 72%, transparent) 100%)',
  } satisfies React.CSSProperties;
  const emblemSurfaceStyle = {
    backgroundImage:
      'linear-gradient(180deg, color-mix(in srgb, var(--primary) 14%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 94%, transparent) 100%)',
    border: '1px solid color-mix(in srgb, var(--primary) 22%, var(--card-border))',
    boxShadow: '0 20px 40px -28px color-mix(in srgb, var(--primary) 60%, transparent)',
  } satisfies React.CSSProperties;
  const titleAccentStyle = {
    backgroundImage:
      'linear-gradient(90deg, color-mix(in srgb, var(--primary-400) 48%, transparent) 0%, var(--primary) 48%, color-mix(in srgb, var(--primary-700) 58%, transparent) 100%)',
  } satisfies React.CSSProperties;
  const ornamentDots = ['var(--primary-300)', 'var(--primary)', 'var(--primary-700)'] as const;

  return (
    <motion.div
      id={chapterId}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: durationSeconds.dramatic }}
      className="my-20 relative"
    >
      <div className="absolute inset-x-0 top-0 h-24 rounded-t-[2rem] pointer-events-none opacity-80" style={topWashStyle}></div>

      <div className="flex flex-col items-center relative z-10">
        <div className="flex items-center w-full max-w-xl mx-auto mb-8">
          <div className="h-px flex-1" style={leadLineStyle}></div>
          <div className="px-3 flex items-center">
            {ornamentDots.map((dotColor, i) => (
              <motion.div
                key={dotColor}
                className="w-1.5 h-1.5 rounded-full mx-1"
                style={{ backgroundColor: dotColor }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.55, 0.85, 0.55] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * delaySeconds.lg,
                }}
              ></motion.div>
            ))}
          </div>
          <div className="h-px flex-1" style={trailLineStyle}></div>
        </div>

        <div className="relative mb-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...t.enterSlow, delay: delaySeconds.md }}
            className="relative"
          >
            <div
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[var(--icon-surface-radius-xl)]"
              style={emblemSurfaceStyle}
            >
              {icon ? (
                <Icon
                  name={icon}
                  size="xl"
                  tone="primary"
                  className="leading-none opacity-90"
                  style={{ lineHeight: 1 }}
                />
              ) : (
                <span
                  className="font-bold text-[var(--primary)] opacity-90 leading-none"
                  style={{ fontSize: 'calc(var(--icon-size-display) - 0.75rem)' }}
                >
                  {String(number ?? '').padStart(2, '0')}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...t.enterSlow, delay: delaySeconds.lg }}
          className="text-center mb-6 relative"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-[0.01em] text-foreground mb-2">
            {title}
          </h2>

          <motion.div
            className="h-[2px] w-0 rounded-full mx-auto"
            style={titleAccentStyle}
            initial={{ width: "0%" }}
            whileInView={{ width: "56%" }}
            viewport={{ once: true }}
            transition={{ duration: durationSeconds.dramatic, delay: delaySeconds['2xl'] }}
          ></motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...t.enterSlow, delay: delaySeconds['3xl'] }}
          className="text-center"
        >
          <Link
            href="#top"
            className="inline-flex items-center text-xs text-foreground/65 hover:text-[var(--primary)] transition duration-300"
          >
            <motion.svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </motion.svg>
            return to top
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChapterDivider;