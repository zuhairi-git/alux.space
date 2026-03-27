'use client';

import React from 'react';
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
  return (
    <div className={`bg-[var(--card-from-bg)] border border-[var(--card-border)] rounded-lg p-4 ${className}`}>
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
          <h4 className="font-semibold text-sm mb-1 text-[var(--foreground)]">
            {metadata.title}
          </h4>
          
          <p className="text-sm mb-2 text-[var(--muted-foreground)]">
            by {metadata.author}
          </p>
          
          <p className="text-xs mb-3 line-clamp-2 text-[var(--muted-foreground)]">
            {metadata.description}
          </p>
          
          {metadata.website && (
            <a
              href={metadata.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--primary)] hover:text-[var(--primary-hover)] hover:underline"
            >
              Visit Website →
            </a>
          )}
          
          {metadata.copyright && (
            <p className="text-xs mt-2 text-[var(--muted-foreground)]">
              {metadata.copyright}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PodcastMetadataDisplay;
