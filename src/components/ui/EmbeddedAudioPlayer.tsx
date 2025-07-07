'use client';

import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import ShareIcon from '@mui/icons-material/Share';
import { AudioFile } from '@/utils/audioUtils';

interface EmbeddedAudioPlayerProps {
  audioFile: AudioFile;
  className?: string;
}

export default function EmbeddedAudioPlayer({ audioFile, className = '' }: EmbeddedAudioPlayerProps) {

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {audioFile.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {audioFile.description}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Link
            href={`/audio/${audioFile.slug}`}
            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
          >
            <LaunchIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </Link>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: audioFile.title,
                  text: audioFile.description,
                  url: `/audio/${audioFile.slug}`,
                });
              } else {
                // Fallback to copying URL
                navigator.clipboard.writeText(`${window.location.origin}/audio/${audioFile.slug}`);
              }
            }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ShareIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Mini Waveform */}
      <div className="mb-4">
        <div className="h-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg flex items-end justify-center space-x-1 p-2">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-full opacity-60"
              style={{
                width: '3px',
                height: `${Math.random() * 16 + 8}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>{new Date(audioFile.publishedAt).toLocaleDateString()}</span>
        <span>{audioFile.category}</span>
      </div>

      {/* Call to Action */}
      <div className="flex items-center justify-between">
        <Link
          href={`/audio/${audioFile.slug}`}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
        >
          Listen on dedicated page →
        </Link>
        
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          {audioFile.tags.slice(0, 2).map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
