// Podcast types and interfaces
export interface PodcastMetadata {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  website?: string;
  copyright?: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioFile: string | Record<string, string>; // Either a single file path or localized paths
  publishDate: string;
  duration: string;
  tags?: string[];
  featured?: boolean;
  language?: string | string[]; // Language(s) available for this episode
  metadata: PodcastMetadata;
}

export interface PodcastPlayerState {
  currentEpisodeId: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  isExpanded: boolean;
  loadError: boolean;
}

export type SupportedLanguage = 'en' | 'fi';
