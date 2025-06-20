'use client';

import { useState, useEffect } from 'react';
import { AnimationConfig } from '@/config/animations';

/**
 * Detect if the current device is mobile based on screen size
 * Uses the breakpoint defined in AnimationConfig
 */
export function useIsMobile(breakpoint: number = AnimationConfig.MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Set initial value
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook to determine if animations should be disabled
 * Combines mobile detection with animation settings and accessibility preferences
 */
export function useAnimationsDisabled(): boolean {
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  // Disable animations if:
  // 1. User prefers reduced motion (accessibility)
  // 2. On mobile and mobile animations are disabled via config
  return prefersReducedMotion || (isMobile && !AnimationConfig.ENABLE_MOBILE_ANIMATIONS);
}

/**
 * Static function to check if device is mobile (for server-side or one-time checks)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= AnimationConfig.MOBILE_BREAKPOINT;
}

/**
 * Static function to check if animations should be disabled (for server-side or one-time checks)
 */
export function shouldDisableAnimations(): boolean {
  if (typeof window === 'undefined') return false;
  
  const isMobile = isMobileDevice();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return prefersReducedMotion || (isMobile && !AnimationConfig.ENABLE_MOBILE_ANIMATIONS);
}

/**
 * Get optimized animation duration for the current device
 */
export function useOptimizedDuration(baseDuration: number): number {
  const isMobile = useIsMobile();
  const animationsDisabled = useAnimationsDisabled();
  
  if (animationsDisabled) {
    return AnimationConfig.REDUCED_MOTION.DURATION;
  }
  
  if (isMobile) {
    return baseDuration * AnimationConfig.MOBILE_DURATION_MULTIPLIER;
  }
  
  return baseDuration;
}

/**
 * Get optimized animation delay for the current device
 */
export function useOptimizedDelay(baseDelay: number): number {
  const isMobile = useIsMobile();
  const animationsDisabled = useAnimationsDisabled();
  
  if (animationsDisabled) {
    return baseDelay * 0.2; // Very short delay for reduced motion
  }
  
  if (isMobile) {
    return baseDelay * AnimationConfig.MOBILE_DELAY_MULTIPLIER;
  }
  
  return baseDelay;
}
