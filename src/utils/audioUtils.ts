// Audio file interface
export interface AudioFile {
  id: string;
  title: string;
  description: string;
  filePath: string;
  category: string;
  tags: string[];
  publishedAt: string;
  slug: string;
}

// Client-side utility functions
export function getAudioFileUrl(filePath: string): string {
  return filePath.startsWith('/') ? filePath : `/${filePath}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
