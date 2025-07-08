export interface AudioMetadata {
  id: string;
  title: string;
  description: string;
  fileName: string;
  filePath: string;
  duration?: string;
  category: string;
  tags: string[];
  publishedDate: string;
  author: string;
  coverImage: string;
  language: 'en' | 'fi' | 'ar';
  featured?: boolean;
  size?: number;
  bitrate?: string;
  format?: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  socialImage?: string;
}

export interface AudioLibraryConfig {
  title: string;
  description: string;
  author: string;
  website: string;
  coverImage: string;
  copyright: string;
}

export interface AudioCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface AudioSearchFilters {
  category?: string;
  tags?: string[];
  language?: string;
  featured?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface AudioPlayerState {
  currentAudio: AudioMetadata | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  queue: AudioMetadata[];
  currentIndex: number;
  isShuffled: boolean;
  isLooping: boolean;
}
