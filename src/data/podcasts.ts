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
    title: 'Ali Al-Zuhairi: Blog & Insights',
    description: 'In this episode, we delve into the core principles of thought, learning, and perspective in design leadership, product management, and the dynamic intersection of creativity and technology.',
    audioFile: '/audio/podcasts/Blog-Insights.wav',
    publishDate: '2025-05-21',
    duration: '04:49', // Using the same audio file, so duration is the same
    tags: ['Blog', 'Insights', 'AI', 'Technology', 'Development'],
    featured: true
  },

];
