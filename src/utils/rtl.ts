/**
 * RTL Support Utilities for Arabic language
 * 
 * This file provides utility functions for handling Right-to-Left (RTL) text direction
 * for Arabic language support in the application.
 */

/**
 * Returns whether the given locale is RTL
 * 
 * @param locale - The current locale/language code
 * @returns True if the locale is RTL
 */
export function isRTLLocale(locale: string): boolean {
  return locale === 'ar'; // Add other RTL languages as needed
}

/**
 * Applies the correct direction class based on the current locale
 * 
 * @param locale - The current locale/language code
 * @returns A string with the appropriate direction class
 */
export function getDirectionClass(locale: string): string {
  return isRTLLocale(locale) ? 'dir-rtl' : 'dir-ltr';
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
    return isRTLLocale(locale) ? 'text-right' : 'text-left';
  } else {
    // For elements that should be right-aligned in LTR languages and left-aligned in RTL
    return isRTLLocale(locale) ? 'text-left' : 'text-right';
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
    return isRTLLocale(locale) ? 'flex-row-reverse' : 'flex-row';
  } else {
    // Reversed behavior: row-reverse for LTR, row for RTL
    return isRTLLocale(locale) ? 'flex-row' : 'flex-row-reverse';
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
  return `space-x-${size} ${isRTLLocale(locale) ? 'rtl:space-x-reverse' : ''}`;
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
    return isRTLLocale(locale) ? `mr-${size}` : `ml-${size}`;
  } else {
    // For margins that should be on the end side (right in LTR, left in RTL)
    return isRTLLocale(locale) ? `ml-${size}` : `mr-${size}`;
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
    return isRTLLocale(locale) ? `pr-${size}` : `pl-${size}`;
  } else {
    // For padding that should be on the end side (right in LTR, left in RTL)
    return isRTLLocale(locale) ? `pl-${size}` : `pr-${size}`;
  }
}

/**
 * Get the correct right or left positioning class based on locale
 * 
 * @param locale - The current locale/language code
 * @param size - The size of the position value
 * @param side - Which side the position should be on in LTR ('start'|'end')
 * @returns The appropriate position class (left or right)
 */
export function getPositionClass(locale: string, size: number, side: 'start' | 'end'): string {
  if (side === 'start') {
    // For positioning that should be on the start side (left in LTR, right in RTL)
    return isRTLLocale(locale) ? `right-${size}` : `left-${size}`;
  } else {
    // For positioning that should be on the end side (right in LTR, left in RTL)
    return isRTLLocale(locale) ? `left-${size}` : `right-${size}`;
  }
}

/**
 * Get border classes that respect RTL direction
 * 
 * @param locale - The current locale/language code
 * @param side - Which side the border should be on in LTR ('start'|'end')
 * @param width - The border width (default: 1)
 * @param color - The border color class (optional)
 * @returns The appropriate border class
 */
export function getBorderClass(locale: string, side: 'start' | 'end', width: number = 1, color?: string): string {
  const widthClass = width === 1 ? '' : `-${width}`;
  const colorClass = color ? ` ${color}` : '';
  
  if (side === 'start') {
    // For borders that should be on the start side (left in LTR, right in RTL)
    return isRTLLocale(locale) ? `border-r${widthClass}${colorClass}` : `border-l${widthClass}${colorClass}`;
  } else {
    // For borders that should be on the end side (right in LTR, left in RTL)
    return isRTLLocale(locale) ? `border-l${widthClass}${colorClass}` : `border-r${widthClass}${colorClass}`;
  }
}

/**
 * Get the class for ensuring icons are properly flipped in RTL
 * 
 * @param locale - The current locale/language code
 * @param shouldFlip - Whether the icon should be flipped in RTL (default: true)
 * @returns The appropriate transform class if needed
 */
export function getIconFlipClass(locale: string, shouldFlip: boolean = true): string {
  return isRTLLocale(locale) && shouldFlip ? 'rtl-flip' : '';
}
