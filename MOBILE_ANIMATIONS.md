# Mobile Animation Control System

This system allows you to easily enable or disable animations on mobile devices through a simple configuration change. It provides a comprehensive solution for controlling animations across your entire application.

## Quick Start

### Disable All Mobile Animations

To disable all animations on mobile devices, simply change one line in the configuration file:

```typescript
// src/config/animations.ts
export const AnimationConfig = {
  ENABLE_MOBILE_ANIMATIONS: false, // Set to false to disable mobile animations
  // ... other config
};
```

### Enable Mobile Animations (Default)

```typescript
// src/config/animations.ts
export const AnimationConfig = {
  ENABLE_MOBILE_ANIMATIONS: true, // Set to true to enable mobile animations
  // ... other config
};
```

## Configuration Options

### Animation Settings (`src/config/animations.ts`)

```typescript
export const AnimationConfig = {
  // Enable/disable animations on mobile devices
  ENABLE_MOBILE_ANIMATIONS: true,

  // Mobile breakpoint (768px by default)
  MOBILE_BREAKPOINT: 768,

  // Speed multipliers for mobile devices
  MOBILE_DURATION_MULTIPLIER: 0.8, // 20% faster animations on mobile
  MOBILE_DELAY_MULTIPLIER: 0.5,    // 50% shorter delays on mobile

  // Reduced motion settings (for accessibility)
  REDUCED_MOTION: {
    ENABLE_OPACITY_TRANSITIONS: true,
    DURATION: 0.3,
  },
};
```

## How It Works

### 1. Device Detection

The system automatically detects mobile devices based on screen width:

```typescript
import { useIsMobile } from '@/utils/deviceUtils';

function MyComponent() {
  const isMobile = useIsMobile(); // true if screen width <= 768px
  // ...
}
```

### 2. Animation Control

The system combines multiple factors to determine if animations should be disabled:

- User's motion preferences (`prefers-reduced-motion`)
- Device type (mobile/desktop)
- Configuration settings

```typescript
import { useAnimationsDisabled } from '@/utils/deviceUtils';

function MyComponent() {
  const animationsDisabled = useAnimationsDisabled();
  // Returns true if animations should be disabled
}
```

### 3. Automatic Integration

The system automatically integrates with existing components:

#### AnimatedSection Component
```tsx
<AnimatedSection animation="slide-up" delay={0.2} duration={0.8}>
  <div>This content will respect mobile animation settings</div>
</AnimatedSection>
```

#### Custom Motion Components
```tsx
import { MotionDiv } from '@/components/ui/MotionWrapper';

<MotionDiv
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  This will automatically disable on mobile if configured
</MotionDiv>
```

## Usage Examples

### Method 1: Using Pre-configured Components

Replace regular motion components with the pre-configured ones:

```tsx
// Instead of:
import { motion } from 'framer-motion';

// Use:
import { MotionDiv, MotionButton } from '@/components/ui/MotionWrapper';

function MyComponent() {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MotionButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Click me
      </MotionButton>
    </MotionDiv>
  );
}
```

### Method 2: Using Conditional Animation Hook

For existing components, use the conditional animation hook:

```tsx
import { motion } from 'framer-motion';
import { useConditionalAnimation } from '@/components/ui/MotionWrapper';

function MyComponent() {
  const animationProps = useConditionalAnimation(
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    },
    {
      // Static props when animations are disabled
      style: { opacity: 1 },
    }
  );

  return (
    <motion.div {...animationProps}>
      Content here
    </motion.div>
  );
}
```

### Method 3: Using Optimized Timing Hooks

Get device-optimized animation timing:

```tsx
import { useOptimizedDuration, useOptimizedDelay } from '@/utils/deviceUtils';

function MyComponent() {
  const duration = useOptimizedDuration(0.8); // Automatically adjusted for mobile
  const delay = useOptimizedDelay(0.2);       // Automatically adjusted for mobile

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      Content
    </motion.div>
  );
}
```

## Testing Different Configurations

### Quick Testing

You can quickly test different animation states by uncommenting lines at the bottom of the config file:

```typescript
// src/config/animations.ts

// Disable all mobile animations
// AnimationConfig.ENABLE_MOBILE_ANIMATIONS = false;

// Make mobile animations faster
// AnimationConfig.MOBILE_DURATION_MULTIPLIER = 0.5;
// AnimationConfig.MOBILE_DELAY_MULTIPLIER = 0.3;
```

### Browser DevTools Testing

1. Open browser DevTools
2. Toggle device toolbar (mobile view)
3. Refresh the page
4. Animations will automatically adapt based on the viewport size

### Manual Testing

You can also manually test the hooks in your browser console:

```javascript
// Open console and run:
console.log('Is mobile:', window.innerWidth <= 768);
console.log('Prefers reduced motion:', window.matchMedia('(prefers-reduced-motion: reduce)').matches);
```

## Migration Guide

### Updating Existing Components

1. **For new components**: Use the pre-configured motion components from `MotionWrapper`
2. **For existing components**: Add the conditional animation hook
3. **For complex animations**: Use the device detection hooks to create custom logic

### Example Migration

Before:
```tsx
import { motion } from 'framer-motion';

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      Hero content
    </motion.div>
  );
}
```

After:
```tsx
import { MotionDiv } from '@/components/ui/MotionWrapper';

function HeroSection() {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      Hero content
    </MotionDiv>
  );
}
```

## Performance Benefits

When animations are disabled on mobile:

1. **Reduced CPU usage** - No complex calculations for transforms and transitions
2. **Better battery life** - Less GPU usage
3. **Improved perceived performance** - Content appears instantly
4. **Better accessibility** - Respects user motion preferences
5. **Faster page interactions** - No animation delays

## Accessibility Features

The system automatically respects:

- `prefers-reduced-motion: reduce` user settings
- Provides alternative visual feedback when animations are disabled
- Maintains opacity transitions for important visual cues
- Reduces cognitive load for motion-sensitive users

## Support

This system is designed to work seamlessly with:

- ✅ Framer Motion
- ✅ CSS animations (through utility classes)
- ✅ Server-side rendering
- ✅ All modern browsers
- ✅ TypeScript

## Troubleshooting

### Animations not disabling on mobile

1. Check that you're using the wrapped components or hooks
2. Verify the mobile breakpoint in the config matches your needs
3. Test with browser DevTools in mobile view

### Animations too fast/slow on mobile

Adjust the multipliers in the config:

```typescript
// Make animations faster
MOBILE_DURATION_MULTIPLIER: 0.5,  // 50% faster
MOBILE_DELAY_MULTIPLIER: 0.3,     // 70% shorter delays

// Make animations slower
MOBILE_DURATION_MULTIPLIER: 1.2,  // 20% slower
MOBILE_DELAY_MULTIPLIER: 0.8,     // 20% shorter delays
```
