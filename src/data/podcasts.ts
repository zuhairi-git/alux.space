import { PodcastEpisode, PodcastMetadata } from '@/podcast/types/podcast';

// Default podcast metadata
const defaultMetadata: PodcastMetadata = {
  title: 'Ali Al-Zuhairi Podcast',
  author: 'Ali Al-Zuhairi',
  description: 'Insights on design leadership, product management, and the intersection of creativity and technology.',
  coverImage: '/images/me/ali.png',
  website: 'https://alux.space',
  copyright: '© 2025 Ali Al-Zuhairi'
};

// Podcast collection data
export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 'episode-1',
    title: 'Ali Al-Zuhairi: Blog & Insights',
    description: 'In this episode, we delve into the core principles of thought, learning, and perspective in design leadership, product management, and the dynamic intersection of creativity and technology.',
    audioFile: {
      en: '/podcasts/en/blog-insights-en.wav',
      fi: '/podcasts/fi/blog-insights-fi.wav'
    },
    publishDate: '2025-05-21',
    duration: '04:49',
    tags: ['Blog', 'Insights', 'AI', 'Technology', 'Development'],
    featured: true,
    language: ['en', 'fi'],
    metadata: {
      ...defaultMetadata,
      title: 'Blog & Insights - Ali Al-Zuhairi Podcast',
      description: 'Deep dive into design leadership, product management, and the creative intersection of technology and innovation.'
    }
  },  // English-only episodes
  {
    id: 'episode-2',
    title: 'Embracing the Era of AI',
    description: 'Exploring how artificial intelligence is reshaping our world and how we can embrace this transformative era with purpose and intentionality.',
    audioFile: '/podcasts/en/embracing-the-era-of-ai-en.wav',
    publishDate: '2025-05-20',
    duration: '08:45',
    tags: ['AI', 'Future', 'Technology', 'Innovation', 'Transformation'],
    featured: true,
    language: 'en',
    metadata: {
      ...defaultMetadata,
      title: 'Embracing the Era of AI - Ali Al-Zuhairi Podcast',
      description: 'Navigate the transformative age of artificial intelligence with purpose and clarity.'
    }
  },
  {
    id: 'episode-3',
    title: 'The Circle of Daily Rhythm',
    description: 'Understanding the importance of creating sustainable daily rhythms and how they form the foundation for personal and professional success.',
    audioFile: '/podcasts/en/the-circle-of-daily-rhythm-en.wav',
    publishDate: '2025-05-19',
    duration: '12:30',
    tags: ['Productivity', 'Habits', 'Wellness', 'Rhythm', 'Personal Development'],
    featured: false,
    language: 'en',
    metadata: {
      ...defaultMetadata,
      title: 'The Circle of Daily Rhythm - Ali Al-Zuhairi Podcast',
      description: 'Build sustainable daily rhythms that support long-term success and well-being.'
    }
  }
];
