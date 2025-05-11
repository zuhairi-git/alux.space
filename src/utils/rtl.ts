/**
 * RTL Support Utilities for Arabic language
 * 
 * This file provides utility functions for handling Right-to-Left (RTL) text direction
 * for Arabic language support in the application.
 */

/**
 * Applies the correct direction class based on the current locale
 * 
 * @param locale - The current locale/language code
 * @returns A string with the appropriate direction class
 */
export function getDirectionClass(locale: string): string {
  return locale === 'ar' ? 'dir-rtl' : 'dir-ltr';
}

/**
 * Returns the correct CSS class for text alignment based on locale
 * 
 * @param locale - The current locale/language code
 * @param defaultLeft - Whether the default alignment for LTR is left (true) or right (false)
 * @returns The appropriate text alignment class
 */
export function getTextAlignClass(locale: string, defaultLeft: boolean = true): string {
  if (defaultLeft) {
    // For elements that should be left-aligned in LTR languages and right-aligned in RTL
    return locale === 'ar' ? 'text-right' : 'text-left';
  } else {
    // For elements that should be right-aligned in LTR languages and left-aligned in RTL
    return locale === 'ar' ? 'text-left' : 'text-right';
  }
}

/**
 * Gets the appropriate flex direction class for RTL support
 * 
 * @param locale - The current locale/language code
 * @param reverse - Whether to reverse the default behavior
 * @returns The appropriate flex direction class
 */
export function getFlexDirectionClass(locale: string, reverse: boolean = false): string {
  if (!reverse) {
    // Normal behavior: row for LTR, row-reverse for RTL
    return locale === 'ar' ? 'flex-row-reverse' : 'flex-row';
  } else {
    // Reversed behavior: row-reverse for LTR, row for RTL
    return locale === 'ar' ? 'flex-row' : 'flex-row-reverse';
  }
}

/**
 * Applies correct spacing classes for flex containers in both RTL and LTR modes
 * 
 * @param locale - The current locale/language code
 * @param size - The size of the space (1-12 following tailwind sizing)
 * @returns Appropriate spacing class that works in both directions
 */
export function getSpacingClass(locale: string, size: number = 4): string {
  return `space-x-${size} ${locale === 'ar' ? 'rtl:space-x-reverse' : ''}`;
}

/**
 * Apply correct margin class based on direction
 * 
 * @param locale - The current locale/language code
 * @param size - The size of the margin
 * @param side - Which side the margin should be on in LTR ('start'|'end')
 * @returns The appropriate margin class
 */
export function getMarginClass(locale: string, size: number, side: 'start' | 'end'): string {
  if (side === 'start') {
    // For margins that should be on the start side (left in LTR, right in RTL)
    return locale === 'ar' ? `mr-${size}` : `ml-${size}`;
  } else {
    // For margins that should be on the end side (right in LTR, left in RTL)
    return locale === 'ar' ? `ml-${size}` : `mr-${size}`;
  }
}

/**
 * Apply correct padding class based on direction
 * 
 * @param locale - The current locale/language code
 * @param size - The size of the padding
 * @param side - Which side the padding should be on in LTR ('start'|'end')
 * @returns The appropriate padding class
 */
export function getPaddingClass(locale: string, size: number, side: 'start' | 'end'): string {
  if (side === 'start') {
    // For padding that should be on the start side (left in LTR, right in RTL)
    return locale === 'ar' ? `pr-${size}` : `pl-${size}`;
  } else {
    // For padding that should be on the end side (right in LTR, left in RTL)
    return locale === 'ar' ? `pl-${size}` : `pr-${size}`;
  }
}
