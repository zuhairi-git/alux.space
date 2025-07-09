import { AudioMetadata, AudioLibraryConfig } from '@/types/audio';

// Default audio library configuration
export const audioLibraryConfig: AudioLibraryConfig = {
  title: 'Ali Al-Zuhairi Audio Library',
  description: 'A collection of audio content including podcasts, blog narrations, and insights on design, technology, and innovation.',
  author: 'Ali Al-Zuhairi',
  website: 'https://alux.space',
  coverImage: '/images/main.jpg',
  copyright: '© 2025 Ali Al-Zuhairi'
};

// Audio metadata collection
export const audioLibrary: AudioMetadata[] = [
  {
    id: 'embracing-ai-era',
    title: 'Embracing the Era of AI',
    description: 'Exploring how artificial intelligence is reshaping our world and how we can embrace this transformative era with purpose and intentionality.',
    fileName: 'embracing-the-era-of-ai-en.mp3',
    filePath: '/audio/blog/embracing-the-era-of-ai-en.mp3',
    duration: '8:45',
    category: 'AI & Technology',
    tags: ['Podcast', 'AI', 'Technology', 'Future', 'Innovation', 'Transformation'],
    publishedDate: '2023-06-20',
    author: 'Ali Al-Zuhairi',
    coverImage: '/images/blog/aivshuman.jpg',
    language: 'en',
    featured: true,
    slug: 'embracing-ai-era',
    seoTitle: 'Embracing the Era of AI - Audio Narration | Ali Al-Zuhairi',
    seoDescription: 'Listen to insights on how artificial intelligence is transforming our world and how to embrace this era with purpose.',
    socialImage: '/images/blog/aivshuman.jpg',
    format: 'MP3',
    bitrate: '128kbps'
  },
  {
    id: 'embracing-ai-alternative',
    title: 'Embracing AI - Original (2023)',
    description: 'An alternative perspective on embracing artificial intelligence in our daily lives and professional endeavors.',
    fileName: 'embracing-ai.mp3',
    filePath: '/audio/blog/embracing-ai.mp3',
    duration: '7:32',
    category: 'AI & Technology',
    tags: ['AI', 'Technology', 'Innovation', 'Future', 'Adaptation'],
    publishedDate: '2023-06-20',
    author: 'Ali Al-Zuhairi',
    coverImage: '/images/blog/aivshuman.jpg',
    language: 'en',
    featured: false,
    slug: 'embracing-ai-alternative',
    seoTitle: 'Embracing AI - Original (2023) | Ali Al-Zuhairi',
    seoDescription: 'An alternative take on integrating artificial intelligence into our daily lives and work.',
    socialImage: '/images/blog/aivshuman.jpg',
    format: 'MP3',
    bitrate: '128kbps'
  },
  {
    id: 'sharpened-by-machine',
    title: 'Sharpened by the Machine: AI and Human Development',
    description: 'A deep dive into how artificial intelligence is not just changing our tools, but fundamentally reshaping human capabilities and development.',
    fileName: 'Sharpened-by-the-Machine_ AI-and-Human-Development.mp3',
    filePath: '/audio/blog/Sharpened-by-the-Machine_ AI-and-Human-Development.mp3',
    duration: '12:15',
    category: 'Deep Dive',
    tags: ['Podcast', 'AI', 'Human Development', 'Technology', 'Philosophy', 'Future'],
    publishedDate: '2025-06-20',
    author: 'Ali Al-Zuhairi',
    coverImage: '/images/blog/AI/female-ai.jpg',
    language: 'en',
    featured: true,
    slug: 'sharpened-by-machine',
    seoTitle: 'Sharpened by the Machine: AI and Human Development | Ali Al-Zuhairi',
    seoDescription: 'Deep insights into how AI is fundamentally reshaping human capabilities and development.',
    socialImage: '/images/blog/AI/female-ai.jpg',
    format: 'MP3',
    bitrate: '128kbps'
  },
  {
    id: 'podcast-daily-rhythm',
    title: 'The Circle of Daily Rhythm',
    description: 'Understanding the importance of creating sustainable daily rhythms and how they form the foundation for personal and professional success.',
    fileName: 'the-circle-of-daily-rhythm-en.wav',
    filePath: '/podcasts/en/the-circle-of-daily-rhythm-en.wav',
    duration: '12:30',
    category: 'Podcast',
    tags: ['Podcast', 'Productivity', 'Habits', 'Wellness', 'Rhythm', 'Personal Development'],
    publishedDate: '2023-03-20',
    author: 'Ali Al-Zuhairi',
    coverImage: '/images/blog/circle-daily-rhythm.jpg',
    language: 'en',
    featured: false,
    slug: 'podcast-daily-rhythm',
    seoTitle: 'The Circle of Daily Rhythm (Podcast) | Ali Al-Zuhairi',
    seoDescription: 'Podcast episode on building sustainable daily rhythms.',
    socialImage: '/podcasts/podcast.png',
    format: 'WAV',
    bitrate: '128kbps'
  },
  {
    id: 'podcast-blog-insights',
    title: 'Blog & Insights',
    description: 'In this episode, we delve into the core principles of thought, learning, and perspective in design leadership, product management, and the dynamic intersection of creativity and technology.',
    fileName: 'blog-insights-en.wav',
    filePath: '/podcasts/en/blog-insights-en.wav',
    duration: '04:49',
    category: 'Podcast',
    tags: ['Podcast', 'Blog', 'Insights', 'AI', 'Technology', 'Development'],
    publishedDate: '2025-05-21',
    author: 'Ali Al-Zuhairi',
    coverImage: '/podcasts/podcast.png',
    language: 'en',
    featured: true,
    slug: 'podcast-blog-insights',
    seoTitle: 'Blog & Insights | Ali Al-Zuhairi',
    seoDescription: 'Podcast episode: Blog & Insights available in English and Finnish.',
    socialImage: '/podcasts/podcast.png',
    format: 'WAV',
    bitrate: '128kbps',
    isMultiLanguage: true,
    versions: [
      {
        language: 'en',
        fileName: 'blog-insights-en.wav',
        filePath: '/podcasts/en/blog-insights-en.wav',
        duration: '04:49',
        seoTitle: 'Blog & Insights (Podcast, EN) | Ali Al-Zuhairi',
        seoDescription: 'Podcast episode: Blog & Insights (English).'
      },
      {
        language: 'fi',
        fileName: 'blog-insights-fi.wav',
        filePath: '/podcasts/fi/blog-insights-fi.wav',
        duration: '04:49',
        seoTitle: 'Blog & Insights (Podcast, FI) | Ali Al-Zuhairi',
        seoDescription: 'Podcast episode: Blog & Insights (Finnish).'
      }
    ]
  }
];

// Get featured audio
export const getFeaturedAudio = (): AudioMetadata[] => {
  return audioLibrary.filter(audio => audio.featured);
};

// Get audio by category
export const getAudioByCategory = (category: string): AudioMetadata[] => {
  return audioLibrary.filter(audio => audio.category === category);
};

// Get audio by tag
export const getAudioByTag = (tag: string): AudioMetadata[] => {
  return audioLibrary.filter(audio => audio.tags.includes(tag));
};

// Get audio by slug
export const getAudioBySlug = (slug: string): AudioMetadata | null => {
  return audioLibrary.find(audio => audio.slug === slug) || null;
};

// Get audio by slug and language
export const getAudioBySlugAndLanguage = (slug: string, language: 'en' | 'fi' | 'ar'): AudioMetadata | null => {
  const audio = audioLibrary.find(audio => audio.slug === slug);
  if (!audio) return null;
  
  if (audio.isMultiLanguage && audio.versions) {
    const version = audio.versions.find(v => v.language === language);
    if (version) {
      return {
        ...audio,
        language: version.language,
        fileName: version.fileName,
        filePath: version.filePath,
        duration: version.duration || audio.duration,
        seoTitle: version.seoTitle || audio.seoTitle,
        seoDescription: version.seoDescription || audio.seoDescription
      };
    }
  }
  
  return audio;
};

// Get available languages for an audio
export const getAudioLanguages = (audio: AudioMetadata): string[] => {
  if (audio.isMultiLanguage && audio.versions) {
    return audio.versions.map(v => v.language);
  }
  return [audio.language];
};

// Get audio version by language
export const getAudioVersion = (audio: AudioMetadata, language: 'en' | 'fi' | 'ar'): AudioMetadata => {
  if (audio.isMultiLanguage && audio.versions) {
    const version = audio.versions.find(v => v.language === language);
    if (version) {
      return {
        ...audio,
        language: version.language,
        fileName: version.fileName,
        filePath: version.filePath,
        duration: version.duration || audio.duration,
        seoTitle: version.seoTitle || audio.seoTitle,
        seoDescription: version.seoDescription || audio.seoDescription
      };
    }
  }
  return audio;
};

// Get all categories
export const getAudioCategories = (): string[] => {
  return [...new Set(audioLibrary.map(audio => audio.category))];
};

// Get all tags
export const getAudioTags = (): string[] => {
  return [...new Set(audioLibrary.flatMap(audio => audio.tags))];
};

// Search audio
export const searchAudio = (query: string): AudioMetadata[] => {
  const searchTerm = query.toLowerCase();
  return audioLibrary.filter(audio => 
    audio.title.toLowerCase().includes(searchTerm) ||
    audio.description.toLowerCase().includes(searchTerm) ||
    audio.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    audio.category.toLowerCase().includes(searchTerm)
  );
};

// Get related audio
export const getRelatedAudio = (currentAudio: AudioMetadata, limit: number = 3): AudioMetadata[] => {
  return audioLibrary
    .filter(audio => audio.id !== currentAudio.id)
    .filter(audio => 
      audio.category === currentAudio.category ||
      audio.tags.some(tag => currentAudio.tags.includes(tag))
    )
    .slice(0, limit);
};
