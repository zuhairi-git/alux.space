// Podcast data structure
export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioFile: string;
  publishDate: string;
  duration: string;
  tags?: string[];
  featured?: boolean;
}

// Podcast collection data
export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: 'episode-1',
    title: 'Introduction to AI Development',
    description: 'In this episode, we explore the fundamentals of AI development and its impact on modern technology.',
    audioFile: '/audio/podcasts/ai-development.mp3',
    publishDate: '2025-05-01',
    duration: '05:30', // Using the same audio file, so duration is the same
    tags: ['AI', 'Technology', 'Development'],
    featured: true
  },
  {
    id: 'episode-2',
    title: 'The Future of Web Design',
    description: 'Discussing emerging trends in web design and how they shape user experiences across platforms.',
    audioFile: '/audio/podcasts/web-design-future.mp3',
    publishDate: '2025-05-08',
    duration: '05:30', // Using the same audio file, so duration is the same
    tags: ['Design', 'Web', 'UX']
  },
  {
    id: 'episode-3',
    title: 'Machine Learning Basics',
    description: 'Understanding the core concepts of machine learning and practical applications in everyday technology.',
    audioFile: '/audio/podcasts/ml-basics.mp3',
    publishDate: '2025-05-15',
    duration: '05:30', // Using the same audio file, so duration is the same
    tags: ['Machine Learning', 'AI', 'Technology']
  },
  {
    id: 'example-audio',
    title: 'Example Audio from Blog',
    description: 'This is a sample episode using existing audio from the blog section.',
    audioFile: '/audio/blog/blog03.mp3',
    publishDate: '2025-04-15',
    duration: '05:30',
    tags: ['Sample', 'Demo']
  }
];
