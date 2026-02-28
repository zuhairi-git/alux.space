'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  role?: string;
  'aria-label'?: string;
}

/**
 * Scroll-reveal section.
 *
 * On mobile / reduced-motion the global SmoothMotionProvider sets
 * `reducedMotion="always"` on the MotionConfig, so framer-motion
 * automatically skips initial states and renders the final value.
 * No custom disabling logic needed — zero flicker.
 *
 * On desktop the element starts slightly offset and fades in when
 * it enters the viewport.
 */
export default function AnimatedSection({
  id,
  className,
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 0.45,
  once = true,
  role,
  'aria-label': ariaLabel,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const skip = useReducedMotion(); // respects MotionConfig.reducedMotion

  const y = animation === 'slide-up' ? 16 : animation === 'slide-down' ? -16 : 0;
  const x = animation === 'slide-left' ? -16 : animation === 'slide-right' ? 16 : 0;

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      {...(skip
        ? {}
        : {
            initial: { opacity: 0, y, x },
            whileInView: { opacity: 1, y: 0, x: 0 },
            viewport: { once, margin: '-60px 0px' },
            transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
          })}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </motion.section>
  );
}
