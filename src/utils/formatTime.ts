/**
 * Format time duration in seconds to MM:SS format
 * @param time - Time in seconds
 * @returns Formatted time string (MM:SS)
 */
export function formatTime(time: number): string {
  if (isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Format time duration in seconds to human-readable format
 * @param time - Time in seconds
 * @returns Human-readable time string (e.g., "5 min 30 sec")
 */
export function formatTimeHuman(time: number): string {
  if (isNaN(time)) return '0 seconds';
  
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  
  const parts = [];
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`);
  if (seconds > 0) parts.push(`${seconds} sec${seconds > 1 ? 's' : ''}`);
  
  return parts.length > 0 ? parts.join(' ') : '0 seconds';
}

/**
 * Parse time string (MM:SS or HH:MM:SS) to seconds
 * @param timeString - Time string in MM:SS or HH:MM:SS format
 * @returns Time in seconds
 */
export function parseTimeToSeconds(timeString: string): number {
  const parts = timeString.split(':').map(part => parseInt(part, 10));
  
  if (parts.length === 2) {
    // MM:SS format
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  } else if (parts.length === 3) {
    // HH:MM:SS format
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }
  
  return 0;
}

/**
 * Convert seconds to percentage of total duration
 * @param currentTime - Current time in seconds
 * @param duration - Total duration in seconds
 * @returns Percentage (0-100)
 */
export function timeToPercentage(currentTime: number, duration: number): number {
  if (duration === 0) return 0;
  return Math.min(100, Math.max(0, (currentTime / duration) * 100));
}

/**
 * Convert percentage to time in seconds
 * @param percentage - Percentage (0-100)
 * @param duration - Total duration in seconds
 * @returns Time in seconds
 */
export function percentageToTime(percentage: number, duration: number): number {
  return Math.min(duration, Math.max(0, (percentage / 100) * duration));
}
