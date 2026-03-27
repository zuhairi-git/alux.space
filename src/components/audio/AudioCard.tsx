'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { AudioMetadata } from '@/types/audio';

interface AudioCardProps {
  audio: AudioMetadata;
  variant?: 'grid' | 'list';
  showPlayButton?: boolean;
  className?: string;
}

const CARD_BASE = 'bg-[var(--card-from-bg)] border border-[var(--card-border)] hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300';
const TAG_CLS   = 'px-2 py-1 rounded-full text-xs font-medium transition-colors bg-[var(--card-from-bg)] border border-[var(--card-border)] text-[var(--foreground)] opacity-70 hover:opacity-100';
const PLAY_CLS  = 'bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-hover)] text-white shadow-lg flex items-center justify-center transition-all duration-200';

const AudioCard: React.FC<AudioCardProps> = ({
  audio,
  variant = 'grid',
  showPlayButton = true,
  className = ''
}) => {
  const { locale } = useLanguage();
  const params = useParams();
  const [imageError, setImageError] = useState(false);

  const fallbackImage = '/images/main.jpg';

  const langBadgeText = audio.isMultiLanguage && audio.versions
    ? audio.versions.map(v => v.language.toUpperCase()).join('+')
    : audio.language.toUpperCase();

  const langBadgeCls = audio.isMultiLanguage
    ? 'bg-[var(--color-info-bg)] text-[var(--color-info)] border border-[var(--color-info-border)]'
    : 'bg-[var(--card-from-bg)] border border-[var(--card-border)] text-[var(--foreground)] opacity-70';

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className={`${CARD_BASE} rounded-xl overflow-hidden ${className}`}
      >
        <Link href={`/${params.locale || locale}/audio/${audio.slug}`} className="block no-underline">
          <div className="flex items-center gap-4 p-4">
            {/* Cover Image */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={imageError ? fallbackImage : audio.coverImage}
                alt={audio.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                onError={() => setImageError(true)}
              />
              {audio.featured && (
                <div className="absolute top-1 right-1">
                  <span className="material-symbols text-yellow-400 text-sm">star</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 truncate text-[var(--foreground)]">
                    {audio.title}
                  </h3>
                  <p className="text-sm mb-2 line-clamp-2 text-[var(--foreground)] opacity-70">
                    {audio.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <span className="text-[var(--primary)]">{audio.category}</span>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${langBadgeCls}`}>
                      {langBadgeText}
                    </span>
                  </div>
                </div>

                {/* Play Icon Visual Indicator */}
                {showPlayButton && (
                  <div className={`${PLAY_CLS} w-12 h-12 rounded-full`}>
                    <span className="material-symbols text-xl">play_arrow</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`${CARD_BASE} rounded-2xl overflow-hidden group ${className}`}
    >
      <Link href={`/${params.locale || locale}/audio/${audio.slug}`} className="block no-underline">
        {/* Cover Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageError ? fallbackImage : audio.coverImage}
            alt={audio.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
          />

          {/* Play Icon Overlay */}
          {showPlayButton && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className={`${PLAY_CLS} w-16 h-16 rounded-full`}>
                <span className="material-symbols text-2xl">play_arrow</span>
              </div>
            </div>
          )}

          {/* Featured Badge */}
          {audio.featured && (
            <div className="absolute top-3 right-3">
              <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <span className="material-symbols text-sm">star</span>
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-2">
            <span className="text-sm font-medium text-[var(--primary)]">
              {audio.category}
            </span>
          </div>

          <h3 className="font-bold text-xl mb-3 line-clamp-2 text-[var(--foreground)]">
            {audio.title}
          </h3>

          <p className="text-sm mb-4 line-clamp-3 text-[var(--foreground)] opacity-70">
            {audio.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {audio.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className={TAG_CLS}>{tag}</span>
            ))}
            {audio.tags.length > 3 && (
              <span className="px-2 py-1 rounded-full text-xs font-medium text-[var(--foreground)] opacity-50">
                +{audio.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-[var(--foreground)] opacity-50">
            <span className="flex items-center gap-1">
              <span className="material-symbols text-sm">calendar_today</span>
              {new Date(audio.publishedDate).toLocaleDateString()}
            </span>
            <span className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${langBadgeCls}`}>
              {langBadgeText}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AudioCard;
