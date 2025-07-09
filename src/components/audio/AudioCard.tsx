'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { AudioMetadata } from '@/types/audio';

interface AudioCardProps {
  audio: AudioMetadata;
  variant?: 'grid' | 'list';
  showPlayButton?: boolean;
  className?: string;
}

const AudioCard: React.FC<AudioCardProps> = ({
  audio,
  variant = 'grid',
  showPlayButton = true,
  className = ''
}) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const params = useParams();
  const [imageError, setImageError] = useState(false);
  
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
  // Get theme-specific styles
  const getCardStyles = () => {
    if (isLight) {
      return 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg';
    } else if (isColorful) {
      return 'bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 hover:border-cyan-400/60 backdrop-blur-lg';
    } else {
      return 'bg-gray-800/90 border border-gray-700 hover:border-blue-400 hover:shadow-xl';
    }
  };

  const getTextStyles = () => {
    if (isLight) {
      return {
        title: 'text-gray-900',
        description: 'text-gray-600',
        category: 'text-blue-600',
        meta: 'text-gray-500'
      };
    } else if (isColorful) {
      return {
        title: 'text-white',
        description: 'text-gray-200',
        category: 'text-cyan-400',
        meta: 'text-gray-300'
      };
    } else {
      return {
        title: 'text-white',
        description: 'text-gray-300',
        category: 'text-blue-400',
        meta: 'text-gray-400'
      };
    }
  };

  const getPlayButtonStyles = () => {
    if (isLight) {
      return 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg';
    } else if (isColorful) {
      return 'bg-gradient-to-br from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white shadow-lg shadow-cyan-500/30';
    } else {
      return 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg';
    }
  };

  const getTagStyles = () => {
    if (isLight) {
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    } else if (isColorful) {
      return 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30';
    } else {
      return 'bg-gray-700 text-gray-300 hover:bg-gray-600';
    }
  };

  const getLanguageBadgeStyles = () => {
    if (isLight) {
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    } else if (isColorful) {
      return 'bg-white/10 text-white/80 hover:bg-white/20';
    } else {
      return 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50';
    }
  };

  const getMultiLanguageBadgeStyles = () => {
    if (isLight) {
      return 'bg-blue-50 text-blue-700 hover:bg-blue-100';
    } else if (isColorful) {
      return 'bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20';
    } else {
      return 'bg-blue-500/10 text-blue-300 hover:bg-blue-500/20';
    }
  };

  const getLanguageBadgeContent = () => {
    if (audio.isMultiLanguage && audio.versions) {
      const languages = audio.versions.map(v => v.language.toUpperCase()).join('+');
      return {
        text: languages,
        style: getMultiLanguageBadgeStyles(),
        hasIcon: false
      };
    }
    return {
      text: audio.language.toUpperCase(),
      style: getLanguageBadgeStyles(),
      hasIcon: false
    };
  };

  const languageBadge = getLanguageBadgeContent();

  const textStyles = getTextStyles();
  const fallbackImage = '/images/main.jpg';

  const getLinkStyles = () => {
    if (isLight) {
      return 'no-underline hover:bg-blue-50 rounded transition-colors duration-150';
    } else if (isColorful) {
      return 'no-underline hover:bg-purple-500/10 rounded transition-colors duration-150';
    } else {
      return 'no-underline hover:bg-blue-900/20 rounded transition-colors duration-150';
    }
  };

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className={`${getCardStyles()} rounded-xl overflow-hidden transition-all duration-300 ${className}`}
      >
        <Link href={`/${params.locale || locale}/audio/${audio.slug}`} className={`block ${getLinkStyles()}`}>
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
                  <h3 className={`font-semibold text-lg mb-1 truncate ${textStyles.title}`}>
                    {audio.title}
                  </h3>
                  <p className={`text-sm mb-2 line-clamp-2 ${textStyles.description}`}>
                    {audio.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm flex-wrap">
                    <span className={textStyles.category}>{audio.category}</span>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${languageBadge.style}`}>
                      {languageBadge.text}
                    </span>
                    {/* Removed duration from list card */}
                  </div>
                </div>

                {/* Play Icon Visual Indicator */}
                {showPlayButton && (
                  <div className={`${getPlayButtonStyles()} w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200`}>
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
      className={`${getCardStyles()} rounded-2xl overflow-hidden transition-all duration-300 group ${className}`}
    >
      <Link href={`/${params.locale || locale}/audio/${audio.slug}`} className={`block ${getLinkStyles()}`}>
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
              <div className={`${getPlayButtonStyles()} w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200`}>
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
            <span className={`text-sm font-medium ${textStyles.category}`}>
              {audio.category}
            </span>
          </div>
          
          <h3 className={`font-bold text-xl mb-3 line-clamp-2 ${textStyles.title}`}>
            {audio.title}
          </h3>
          
          <p className={`text-sm mb-4 line-clamp-3 ${textStyles.description}`}>
            {audio.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {audio.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${getTagStyles()}`}
              >
                {tag}
              </span>
            ))}
            {audio.tags.length > 3 && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${textStyles.meta}`}>
                +{audio.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className={`flex items-center justify-between text-sm ${textStyles.meta}`}>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="material-symbols text-sm">calendar_today</span>
                {new Date(audio.publishedDate).toLocaleDateString()}
              </span>
              {/* Removed duration from grid card */}
            </div>
            <span className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${languageBadge.style}`}>
              {languageBadge.text}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default AudioCard;
