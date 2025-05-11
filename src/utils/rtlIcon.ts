/**
 * RTL Icon Utilities
 * 
 * This file contains utilities for handling RTL-specific icon display.
 */

import { isRTLLocale } from './rtl';

/**
 * Gets the appropriate CSS class for an icon based on RTL context
 * 
 * @param locale - The current locale/language code
 * @param additionalClasses - Optional additional classes to add
 * @returns The appropriate CSS classes for the icon
 */
export function getIconRTLClass(locale: string, additionalClasses = ''): string {
  const rtlClass = isRTLLocale(locale) ? 'rtl-icon' : '';
  return `material-symbols ${rtlClass} ${additionalClasses}`.trim();
}

/**
 * Determines if an icon should be flipped in RTL mode
 * Many icons should remain in their original orientation regardless of text direction
 * 
 * @param iconName - The name of the icon
 * @returns Boolean indicating if the icon should be flipped in RTL
 */
export function shouldFlipIconInRTL(iconName: string): boolean {
  // Icons that should be flipped in RTL (e.g., directional arrows)
  const flippableIcons = [
    'arrow_back',
    'arrow_forward',
    'chevron_left',
    'chevron_right',
    'first_page',
    'last_page',
    'navigate_before',
    'navigate_next',
    'trending_flat'
  ];
  
  return flippableIcons.includes(iconName);
}

/**
 * Gets the appropriate icon name based on RTL context
 * For example, arrow_forward in LTR should be arrow_back in RTL
 * 
 * @param iconName - The original icon name
 * @param locale - The current locale/language code
 * @returns The appropriate icon name based on direction
 */
export function getRTLAwareIconName(iconName: string, locale: string): string {
  if (!isRTLLocale(locale)) return iconName;
  
  // Map of LTR icons to their RTL equivalents
  const rtlIconMap: Record<string, string> = {
    'arrow_forward': 'arrow_back',
    'arrow_back': 'arrow_forward',
    'chevron_right': 'chevron_left',
    'chevron_left': 'chevron_right',
    'first_page': 'last_page',
    'last_page': 'first_page',
    'navigate_next': 'navigate_before',
    'navigate_before': 'navigate_next',
  };
  
  return rtlIconMap[iconName] || iconName;
}
