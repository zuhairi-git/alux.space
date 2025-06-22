'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation, useReducedMotion } from 'framer-motion';
import { useAnimationsDisabled, useOptimizedDuration, useOptimizedDelay } from '@/utils/deviceUtils';

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

export default function AnimatedSection({
  id,
  className,
  children,
  animation = 'fade-in',
  delay = 0.2,
  duration = 0.8,
  once = true,
  role,
  'aria-label': ariaLabel,
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px 0px' });
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const animationsDisabled = useAnimationsDisabled();
  
  // Get optimized timing values based on device type
  const optimizedDuration = useOptimizedDuration(duration);
  const optimizedDelay = useOptimizedDelay(delay);

  // Combine reduced motion preferences with mobile animation settings
  const disableAnimations = shouldReduceMotion || animationsDisabled;  // Define animation variants with reduced motion and mobile animation support
  const variants = {
    hidden: disableAnimations ? { opacity: 0.8 } : {
      opacity: 0,
      y: animation === 'slide-up' ? 50 : animation === 'slide-down' ? -50 : 0,
      x: animation === 'slide-left' ? -50 : animation === 'slide-right' ? 50 : 0,
    },
    visible: disableAnimations ? { opacity: 1 } : {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: optimizedDuration * 0.6, // Apply device-optimized duration
        delay: optimizedDelay * 0.5, // Apply device-optimized delay
        ease: [0.25, 0.1, 0.25, 1.0], // Custom easing curve
      },
    },
  };

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);
  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial={disableAnimations ? false : "hidden"}
      animate={controls}
      variants={disableAnimations ? undefined : variants}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </motion.section>
  );
}
