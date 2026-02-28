'use client';

import { MotionConfig } from 'framer-motion';
import { useSyncExternalStore } from 'react';

/**
 * Read the flag set by the blocking <script> in layout.tsx.
 * This runs synchronously during hydration — before the first paint —
 * so framer-motion gets the correct reducedMotion value instantly.
 */
const noopSubscribe = () => () => {};
const getDisabled = () => !!(window as unknown as Record<string, unknown>).__ALUX_DISABLE_ANIM;
const serverFalse = () => false;

export default function SmoothMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useSyncExternalStore triggers a synchronous re-render BEFORE the
  // browser paints when the client snapshot differs from the server
  // snapshot, so there is zero visual gap on mobile.
  const disabled = useSyncExternalStore(noopSubscribe, getDisabled, serverFalse);

  return (
    <MotionConfig
      transition={{
        type: 'tween',
        ease: [0.22, 1, 0.36, 1],
        duration: 0.4,
      }}
      reducedMotion={disabled ? 'always' : 'user'}
    >
      {children}
    </MotionConfig>
  );
}
