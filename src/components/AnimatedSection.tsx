'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimatedSection({
  id,
  className,
  children,
  animation = 'fade-in',
  delay = 0.2,
  duration = 0.8,
  once = true,
}: AnimatedSectionProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px 0px' });
  const [hasAnimated, setHasAnimated] = useState(false);
  // Define animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === 'slide-up' ? 50 : animation === 'slide-down' ? -50 : 0,
      x: animation === 'slide-left' ? -50 : animation === 'slide-right' ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
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
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}
