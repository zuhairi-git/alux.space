'use client';

import { useSyncExternalStore, useCallback } from 'react';
import { AnimationConfig } from '@/config/animations';

// ──────────────────────────────────────────────────────────────────
// Stable subscribe functions (module-level so references never change)
// ──────────────────────────────────────────────────────────────────

function subscribeResize(cb: () => void) {
  window.addEventListener('resize', cb);
  return () => window.removeEventListener('resize', cb);
}

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

const serverFalse = () => false;

// ──────────────────────────────────────────────────────────────────
// Hooks — powered by useSyncExternalStore for ZERO hydration gap.
// The client snapshot is read synchronously during hydration and,
// if it differs from the server snapshot, React re-renders before
// the browser ever paints. Result: no flicker.
// ──────────────────────────────────────────────────────────────────

/**
 * Returns `true` when the viewport is at or below the mobile breakpoint.
 */
export function useIsMobile(breakpoint: number = AnimationConfig.MOBILE_BREAKPOINT): boolean {
  const getSnapshot = useCallback(
    () => window.innerWidth <= breakpoint,
    [breakpoint],
  );
  return useSyncExternalStore(subscribeResize, getSnapshot, serverFalse);
}

/**
 * Returns `true` when animations should be completely disabled
 * (mobile with config off, or OS reduced-motion preference).
 */
export function useAnimationsDisabled(): boolean {
  const isMobile = useIsMobile();
  const prefersReduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    serverFalse,
  );
  return prefersReduced || (isMobile && !AnimationConfig.ENABLE_MOBILE_ANIMATIONS);
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
