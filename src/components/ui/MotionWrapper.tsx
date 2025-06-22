'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useAnimationsDisabled } from '@/utils/deviceUtils';

// Animation-related prop names that should be filtered out when animations are disabled
const ANIMATION_PROPS = new Set([
  'initial',
  'animate',
  'exit',
  'variants',
  'transition',
  'whileHover',
  'whileTap',
  'whileInView',
  'whileFocus',
  'whileDrag',
  'drag',
  'onAnimationComplete',
  'onAnimationStart',
  'onUpdate',
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'layout',
  'layoutId',
  'layoutRoot',
  'layoutScroll',
  'layoutDependency',
]);

/**
 * Filter out animation-related props when animations are disabled
 */
function filterAnimationProps(props: Record<string, unknown>): Record<string, unknown> {
  const filteredProps: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(props)) {
    if (!ANIMATION_PROPS.has(key)) {
      filteredProps[key] = value;
    }
  }
  
  return filteredProps;
}

/**
 * Higher-order component that wraps motion components with mobile animation settings
 * This ensures consistent animation behavior across all motion components
 */
export function withMobileAnimationControl<T extends keyof HTMLElementTagNameMap>(
  Component: typeof motion[T]
) {
  return React.forwardRef<
    HTMLElementTagNameMap[T],
    HTMLMotionProps<T>
  >(function WrappedMotionComponent(props, ref) {
    const animationsDisabled = useAnimationsDisabled();
    
    // If animations are disabled, strip out motion-specific props and render as regular element
    if (animationsDisabled) {
      const filteredProps = filterAnimationProps(props as Record<string, unknown>);
      
      // Ensure opacity is visible if it was hidden by initial animation
      const staticProps = {
        ...filteredProps,
        ref,
        style: {
          ...(filteredProps.style as Record<string, unknown>),
          opacity: (filteredProps.style as Record<string, unknown>)?.opacity !== undefined 
            ? (filteredProps.style as Record<string, unknown>).opacity 
            : 1,
        },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return React.createElement(Component as any, staticProps);
    }

    // If animations are enabled, render normally
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.createElement(Component as any, { ...props, ref });
  });
}

/**
 * Pre-wrapped motion components with mobile animation control
 * Use these instead of the regular motion components throughout your app
 */
export const MotionDiv = withMobileAnimationControl(motion.div);
export const MotionSection = withMobileAnimationControl(motion.section);
export const MotionSpan = withMobileAnimationControl(motion.span);
export const MotionP = withMobileAnimationControl(motion.p);
export const MotionH1 = withMobileAnimationControl(motion.h1);
export const MotionH2 = withMobileAnimationControl(motion.h2);
export const MotionH3 = withMobileAnimationControl(motion.h3);
export const MotionButton = withMobileAnimationControl(motion.button);
export const MotionA = withMobileAnimationControl(motion.a);
export const MotionImg = withMobileAnimationControl(motion.img);

/**
 * Hook for conditional animation properties
 * Use this in existing components to conditionally apply animations
 */
export function useConditionalAnimation<T extends Record<string, unknown>>(
  animationProps: T,
  staticProps: Partial<T> = {}
): T {
  const animationsDisabled = useAnimationsDisabled();
  
  if (animationsDisabled) {
    const filteredProps = filterAnimationProps(animationProps);
    
    return {
      ...filteredProps,
      ...staticProps,
      style: {
        ...(filteredProps.style as Record<string, unknown>),
        ...(staticProps.style as Record<string, unknown>),
        opacity: (staticProps.style as Record<string, unknown>)?.opacity !== undefined 
          ? (staticProps.style as Record<string, unknown>).opacity 
          : 1,
      },
    } as unknown as T;
  }
  
  return animationProps;
}

/**
 * Utility function to get animation variants that respect mobile settings
 */
export function useResponsiveVariants(variants: Record<string, unknown>) {
  const animationsDisabled = useAnimationsDisabled();
  
  if (animationsDisabled) {
    // Return simplified variants that only preserve opacity
    const responsiveVariants: Record<string, unknown> = {};
    Object.keys(variants).forEach(key => {
      const originalVariant = variants[key] as Record<string, unknown>;
      responsiveVariants[key] = {
        opacity: originalVariant?.opacity !== undefined ? originalVariant.opacity : 1,
      };
    });
    return responsiveVariants;
  }
  
  return variants;
}
