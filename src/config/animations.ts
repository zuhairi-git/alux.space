/**
 * Animation Configuration
 * 
 * This file contains global animation settings for the application.
 * Change these values to control animation behavior across the entire site.
 */

export const AnimationConfig = {
  /**
   * Enable/Disable animations on mobile devices
   * Set to false to disable all animations on mobile devices (screen width <= 768px)
   * Set to true to enable animations on all devices
   */
  ENABLE_MOBILE_ANIMATIONS: false,

  /**
   * Mobile breakpoint in pixels
   * Devices with screen width less than or equal to this value are considered mobile
   */
  MOBILE_BREAKPOINT: 768,

  /**
   * Animation duration multiplier for mobile devices
   * When mobile animations are enabled, multiply all durations by this value
   * Use values < 1 to make animations faster on mobile (e.g., 0.7 for 30% faster)
   */
  MOBILE_DURATION_MULTIPLIER: 0.8,

  /**
   * Animation delay multiplier for mobile devices
   * When mobile animations are enabled, multiply all delays by this value
   * Use values < 1 to reduce delays on mobile (e.g., 0.5 for 50% shorter delays)
   */
  MOBILE_DELAY_MULTIPLIER: 0.5,

  /**
   * Reduced motion settings
   * These settings are applied when user has "prefers-reduced-motion: reduce" enabled
   */
  REDUCED_MOTION: {
    // Still show subtle opacity transitions even with reduced motion
    ENABLE_OPACITY_TRANSITIONS: true,
    // Duration for reduced motion animations (in seconds)
    DURATION: 0.3,
  },

  /**
   * Performance settings
   * These settings help optimize animations for better performance
   */
  PERFORMANCE: {
    // Use GPU acceleration for animations
    USE_GPU_ACCELERATION: true,
    // Reduce animations on lower-end devices (based on devicePixelRatio and hardwareConcurrency)
    AUTO_REDUCE_ON_LOW_END_DEVICES: true,
  },
} as const;

/**
 * Quick toggle functions for development
 * Uncomment these to quickly test different animation states
 */

// Disable all mobile animations
// AnimationConfig.ENABLE_MOBILE_ANIMATIONS = false;

// Make mobile animations faster
// AnimationConfig.MOBILE_DURATION_MULTIPLIER = 0.5;
// AnimationConfig.MOBILE_DELAY_MULTIPLIER = 0.3;

// Enable only minimal animations
// AnimationConfig.ENABLE_MOBILE_ANIMATIONS = true;
// AnimationConfig.MOBILE_DURATION_MULTIPLIER = 0.6;
// AnimationConfig.MOBILE_DELAY_MULTIPLIER = 0.2;
