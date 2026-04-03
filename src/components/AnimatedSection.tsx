'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { delaySeconds, durationSeconds, easing, motionDistance, transition } from '@/design-system';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down';

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
  delay = delaySeconds.none,
  duration = durationSeconds.slow,
  once = true,
  role,
  'aria-label': ariaLabel,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const skip = useReducedMotion(); // respects MotionConfig.reducedMotion

  const revealOffset = motionDistance.reveal;
  const y = animation === 'slide-up' ? revealOffset : animation === 'slide-down' ? -revealOffset : 0;

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      {...(skip
        ? {}
        : {
            initial: { opacity: 0, y },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once, margin: '-60px 0px' },
            transition: {
              ...transition.enter,
              duration,
              delay,
              ease: easing.out.array,
            },
          })}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </motion.section>
  );
}
