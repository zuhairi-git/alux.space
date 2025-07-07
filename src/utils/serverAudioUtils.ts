import { promises as fs } from 'fs';
import path from 'path';
import { AudioFile } from './audioUtils';

// Import audio data statically for better performance
import audioData from '../data/audio.json';

export async function getAllAudioFiles(): Promise<AudioFile[]> {
  // Use static import for better performance in production
  return audioData as AudioFile[];
}

export async function getAudioFileBySlug(slug: string): Promise<AudioFile | undefined> {
  const audioFiles = await getAllAudioFiles();
  return audioFiles.find((file) => file.slug === slug);
}

export async function getAudioFilesByCategory(category: string): Promise<AudioFile[]> {
  const audioFiles = await getAllAudioFiles();
  return audioFiles.filter((file) => file.category === category);
}

export async function getAudioFilesByTag(tag: string): Promise<AudioFile[]> {
  const audioFiles = await getAllAudioFiles();
  return audioFiles.filter((file) => file.tags.includes(tag));
}

// Alternative method using file system (for development/dynamic content)
export async function getAllAudioFilesFromFS(): Promise<AudioFile[]> {
  const audioDataPath = path.join(process.cwd(), 'src', 'data', 'audio.json');
  const fileContents = await fs.readFile(audioDataPath, 'utf8');
  return JSON.parse(fileContents);
}
