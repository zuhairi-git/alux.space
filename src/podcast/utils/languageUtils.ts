import { PodcastEpisode, SupportedLanguage } from '../types/podcast';

/**
 * Get the appropriate audio file URL for a given language
 * Falls back to English if the requested language is not available
 */
export const getAudioFileForLanguage = (
  episode: PodcastEpisode, 
  language: SupportedLanguage
): string => {
  if (typeof episode.audioFile === 'string') {
    return episode.audioFile;
  }

  // Try to get the audio file for the requested language
  if (episode.audioFile[language]) {
    return episode.audioFile[language];
  }

  // Fall back to English if available
  if (episode.audioFile.en) {
    return episode.audioFile.en;
  }

  // Return the first available language
  const firstAvailable = Object.values(episode.audioFile)[0];
  return firstAvailable || '';
};

/**
 * Get available languages for an episode
 */
export const getAvailableLanguages = (episode: PodcastEpisode): SupportedLanguage[] => {
  if (typeof episode.audioFile === 'string') {
    return episode.language ? 
      (Array.isArray(episode.language) ? episode.language as SupportedLanguage[] : [episode.language as SupportedLanguage]) :
      ['en']; // Default to English if no language specified
  }

  return Object.keys(episode.audioFile) as SupportedLanguage[];
};

/**
 * Check if an episode is available in a specific language
 */
export const isEpisodeAvailableInLanguage = (
  episode: PodcastEpisode, 
  language: SupportedLanguage
): boolean => {
  const availableLanguages = getAvailableLanguages(episode);
  return availableLanguages.includes(language);
};

/**
 * Filter episodes based on language preference
 * Includes English-only episodes as fallback for all languages
 */
export const filterEpisodesByLanguage = (
  episodes: PodcastEpisode[], 
  language: SupportedLanguage
): PodcastEpisode[] => {
  return episodes.filter(episode => {
    const availableLanguages = getAvailableLanguages(episode);
    
    // Include if episode is available in requested language
    if (availableLanguages.includes(language)) {
      return true;
    }
    
    // Include English-only episodes as fallback
    if (availableLanguages.length === 1 && availableLanguages[0] === 'en') {
      return true;
    }
    
    return false;
  });
};

/**
 * Get the display language for an episode badge based on UI language and availability
 * Shows UI language if episode is available in that language, otherwise shows 'en'
 */
export const getEpisodeDisplayLanguage = (
  episode: PodcastEpisode, 
  uiLanguage: SupportedLanguage
): SupportedLanguage => {
  const availableLanguages = getAvailableLanguages(episode);
  
  // If episode is available in UI language, show that
  if (availableLanguages.includes(uiLanguage)) {
    return uiLanguage;
  }
  
  // Otherwise fall back to English
  return 'en';
};

/**
 * Check if an episode should show a language badge
 * Show badge when: episode is not available in UI language OR it's English-only for non-English UI
 */
export const shouldShowLanguageBadge = (
  episode: PodcastEpisode, 
  uiLanguage: SupportedLanguage
): boolean => {
  const availableLanguages = getAvailableLanguages(episode);
  
  // Always show badge for English-only episodes when UI is not English
  if (availableLanguages.length === 1 && availableLanguages[0] === 'en' && uiLanguage !== 'en') {
    return true;
  }
  
  // Show badge for bilingual episodes to indicate available languages
  if (availableLanguages.length > 1) {
    return true;
  }
  
  // Hide badge when episode language matches UI language perfectly
  return false;
};

/**
 * Set media session metadata for native mobile players
 */
export const setMediaSessionMetadata = (episode: PodcastEpisode) => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: episode.title,
      artist: episode.metadata.author,
      album: 'Ali Al-Zuhairi Podcast',
      artwork: [
        {
          src: episode.metadata.coverImage,
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    });
  }
};
