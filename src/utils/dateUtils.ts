/**
 * Date formatting utilities
 */

/**
 * Format a date string or Date object to a human-readable format
 * @param date - ISO date string or Date object
 * @param locale - Locale code (e.g., 'en', 'fi')
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Handle invalid dates
  if (isNaN(dateObj.getTime())) {
    return date.toString();
  }
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  try {
    return new Intl.DateTimeFormat(locale === 'fi' ? 'fi-FI' : 'en-US', options).format(dateObj);
  } catch {
    // Fallback to English if locale is not supported
    return new Intl.DateTimeFormat('en-US', options).format(dateObj);
  }
}

/**
 * Convert a date to ISO string format for metadata
 * @param date - Date string or Date object
 * @returns ISO string
 */
export function toISOString(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Handle invalid dates
  if (isNaN(dateObj.getTime())) {
    return new Date().toISOString();
  }
  
  return dateObj.toISOString();
}

/**
 * Check if a date string is in ISO format
 * @param dateString - Date string to check
 * @returns True if ISO format, false otherwise
 */
export function isISOFormat(dateString: string): boolean {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
  return isoRegex.test(dateString);
}
