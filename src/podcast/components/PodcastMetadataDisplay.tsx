'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { PodcastMetadata } from '../types/podcast';
import Image from 'next/image';

interface PodcastMetadataDisplayProps {
  metadata: PodcastMetadata;
  className?: string;
}

const PodcastMetadataDisplay: React.FC<PodcastMetadataDisplayProps> = ({
  metadata,
  className = ''
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  const getTextStyle = () => {
    if (isLight) {
      return 'text-gray-800';
    } else if (isColorful) {
      return 'text-white';
    } else {
      return 'text-gray-100';
    }
  };

  const getSecondaryTextStyle = () => {
    if (isLight) {
      return 'text-gray-600';
    } else if (isColorful) {
      return 'text-purple-200';
    } else {
      return 'text-gray-400';
    }
  };

  const getBgStyle = () => {
    if (isLight) {
      return 'bg-gray-50 border border-gray-200';
    } else if (isColorful) {
      return 'bg-purple-500/10 border border-purple-500/30';
    } else {
      return 'bg-gray-800/50 border border-gray-700';
    }
  };

  return (
    <div className={`${getBgStyle()} rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-4">
        {/* Cover Image */}
        <div className="flex-shrink-0">
          <Image
            src={metadata.coverImage}
            alt={metadata.title}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        </div>
        
        {/* Metadata */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-sm mb-1 ${getTextStyle()}`}>
            {metadata.title}
          </h4>
          
          <p className={`text-sm mb-2 ${getSecondaryTextStyle()}`}>
            by {metadata.author}
          </p>
          
          <p className={`text-xs mb-3 line-clamp-2 ${getSecondaryTextStyle()}`}>
            {metadata.description}
          </p>
          
          {metadata.website && (
            <a
              href={metadata.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs hover:underline ${
                isLight ? 'text-blue-600 hover:text-blue-800' :
                isColorful ? 'text-cyan-400 hover:text-cyan-300' :
                'text-blue-400 hover:text-blue-300'
              }`}
            >
              Visit Website →
            </a>
          )}
          
          {metadata.copyright && (
            <p className={`text-xs mt-2 ${getSecondaryTextStyle()}`}>
              {metadata.copyright}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastMetadataDisplay;
