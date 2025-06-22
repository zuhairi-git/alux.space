'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MotionDiv, MotionButton } from '@/components/ui/MotionWrapper';
import { useIsMobile, useAnimationsDisabled } from '@/utils/deviceUtils';
import { AnimationConfig } from '@/config/animations';

/**
 * Demo component to test mobile animation controls
 * This component shows how animations behave on different devices
 */
export default function MobileAnimationDemo() {
  const isMobile = useIsMobile();
  const animationsDisabled = useAnimationsDisabled();

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Status Display */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Animation Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className={`p-3 rounded ${isMobile ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <strong>Device Type:</strong> {isMobile ? 'Mobile' : 'Desktop'}
          </div>
          <div className={`p-3 rounded ${AnimationConfig.ENABLE_MOBILE_ANIMATIONS ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <strong>Mobile Animations:</strong> {AnimationConfig.ENABLE_MOBILE_ANIMATIONS ? 'Enabled' : 'Disabled'}
          </div>
          <div className={`p-3 rounded ${animationsDisabled ? 'bg-orange-100 dark:bg-orange-900' : 'bg-green-100 dark:bg-green-900'}`}>
            <strong>Current State:</strong> {animationsDisabled ? 'Disabled' : 'Enabled'}
          </div>
        </div>
      </div>

      {/* Animation Examples */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Animation Examples</h3>

        {/* Slide Up Animation */}
        <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Slide Up Animation (using MotionDiv)</h4>
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-blue-500 text-white p-4 rounded"
          >
            This box slides up from below. On mobile with animations disabled, it appears instantly.
          </MotionDiv>
        </div>

        {/* Hover Animation */}
        <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Hover Animation (using MotionButton)</h4>
          <MotionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Hover/tap me to see animation
          </MotionButton>
        </div>

        {/* Scale Animation */}
        <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Scale Animation (using regular motion with conditional props)</h4>
          <motion.div
            initial={animationsDisabled ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
            animate={animationsDisabled ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={animationsDisabled ? { duration: 0 } : { duration: 0.6 }}
            className="bg-green-500 text-white p-4 rounded w-32 h-32 flex items-center justify-center"
          >
            Scale Effect
          </motion.div>
        </div>

        {/* Stagger Animation */}
        <div className="border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
          <h4 className="font-semibold mb-4">Stagger Animation</h4>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((item, index) => (
              <MotionDiv
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-orange-500 text-white p-4 rounded w-16 h-16 flex items-center justify-center"
              >
                {item}
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>

      {/* Configuration Display */}
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Current Configuration</h3>
        <pre className="text-sm bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto">
          {JSON.stringify(AnimationConfig, null, 2)}
        </pre>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">How to Test</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">          <li>
            <strong>Change device type:</strong> Use browser DevTools to toggle between desktop and mobile view
          </li>
          <li>
            <strong>Disable mobile animations:</strong> Set <code>ENABLE_MOBILE_ANIMATIONS: false</code> in{' '}
            <code>src/config/animations.ts</code>
          </li>
          <li>
            <strong>Test reduced motion:</strong> Enable &quot;Prefers reduced motion&quot; in your browser accessibility settings
          </li>
          <li>
            <strong>Adjust timing:</strong> Modify <code>MOBILE_DURATION_MULTIPLIER</code> and{' '}
            <code>MOBILE_DELAY_MULTIPLIER</code> in the config
          </li>
        </ol>
      </div>
    </div>
  );
}
