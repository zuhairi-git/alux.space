'use client';

import { useRef, useCallback } from 'react';

/**
 * Touch gesture utilities for enhanced mobile interaction
 */

export interface TouchGestureHandlers {
  onTap?: (e: TouchEvent) => void;
  onDoubleTap?: (e: TouchEvent) => void;
  onLongPress?: (e: TouchEvent) => void;
  onSwipeLeft?: (e: TouchEvent) => void;
  onSwipeRight?: (e: TouchEvent) => void;
  onSwipeUp?: (e: TouchEvent) => void;
  onSwipeDown?: (e: TouchEvent) => void;
}

export interface TouchGestureOptions {
  doubleTapDelay?: number;
  longPressDelay?: number;
  swipeThreshold?: number;
  preventScroll?: boolean;
}

/**
 * Hook for handling touch gestures on mobile devices
 */
export function useTouchGestures(
  handlers: TouchGestureHandlers,
  options: TouchGestureOptions = {}
) {
  const {
    doubleTapDelay = 300,
    longPressDelay = 500,
    swipeThreshold = 50,
    preventScroll = true
  } = options;

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastTapRef = useRef<number>(0);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    // Clear any existing long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    // Set up long press detection
    if (handlers.onLongPress) {
      longPressTimerRef.current = setTimeout(() => {
        handlers.onLongPress?.(e);
      }, longPressDelay);
    }

    if (preventScroll) {
      e.preventDefault();
    }
  }, [handlers, longPressDelay, preventScroll]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Cancel long press if finger moves
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (preventScroll) {
      e.preventDefault();
    }
  }, [preventScroll]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const endTime = Date.now();
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = endTime - touchStartRef.current.time;

    // Check for swipe gestures
    if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.(e);
        } else {
          handlers.onSwipeLeft?.(e);
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.(e);
        } else {
          handlers.onSwipeUp?.(e);
        }
      }
      touchStartRef.current = null;
      return;
    }

    // Check for tap gestures (only if no significant movement)
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 500) {
      const currentTime = Date.now();
      const timeSinceLastTap = currentTime - lastTapRef.current;

      if (timeSinceLastTap < doubleTapDelay && handlers.onDoubleTap) {
        // Double tap detected
        handlers.onDoubleTap(e);
        lastTapRef.current = 0; // Reset to prevent triple tap
      } else {
        // Single tap
        handlers.onTap?.(e);
        lastTapRef.current = currentTime;
      }
    }

    touchStartRef.current = null;
  }, [handlers, doubleTapDelay, swipeThreshold]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get recommended touch target size based on platform
 */
export function getRecommendedTouchSize(): number {
  if (typeof window === 'undefined') return 48;
  
  // iOS recommends 44pt, Android recommends 48dp
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  return isIOS ? 44 : 48;
}

/**
 * Enhanced accessibility utilities for mobile
 */
export class MobileAccessibility {
  /**
   * Announce to screen readers
   */
  static announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (typeof window === 'undefined') return;

    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Improve focus visibility for mobile
   */
  static enhanceFocusVisibility(element: HTMLElement) {
    if (!element) return;

    const style = element.style;
    style.outline = '3px solid #6366f1';
    style.outlineOffset = '2px';
    style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.2)';
  }

  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Vibrate for haptic feedback (if supported)
   */
  static vibrate(pattern: number | number[] = 10) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }
}

/**
 * Focus management utilities for mobile
 */
export class FocusManager {
  private static focusStack: HTMLElement[] = [];

  /**
   * Trap focus within a container (useful for modals)
   */
  static trapFocus(container: HTMLElement) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    firstElement.focus();

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }

  /**
   * Save current focus and restore later
   */
  static saveFocus() {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      this.focusStack.push(activeElement);
    }
  }

  /**
   * Restore previously saved focus
   */
  static restoreFocus() {
    const element = this.focusStack.pop();
    if (element && element.focus) {
      element.focus();
    }
  }
}
