'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

/**
 * Higher-order component that wraps motion components.
 *
 * When the global SmoothMotionProvider sets `reducedMotion=\"always\"` (on mobile),
 * framer-motion's own `useReducedMotion()` returns `true`. In that case we strip
 * animation props and render the element fully visible — no flash, no flicker.
 *
 * On desktop, the component passes through all props untouched.
 */
export function withMobileAnimationControl<T extends keyof HTMLElementTagNameMap>(
  Component: typeof motion[T]
) {
  return React.forwardRef<
    HTMLElementTagNameMap[T],
    HTMLMotionProps<T>
  >(function WrappedMotionComponent(props, ref) {
    // MotionConfig with reducedMotion="always" handles mobile/reduced-motion
    // at the framer-motion engine level — no manual detection needed.
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
