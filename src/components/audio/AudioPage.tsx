'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { AudioMetadata } from '@/types/audio';
import { getRelatedAudio } from '@/data/audioLibrary';
import AudioPlayer from '@/components/ui/AudioPlayer';
import AudioCard from './AudioCard';
import { formatTime } from '@/utils/formatTime';

interface AudioPageProps {
  audio: AudioMetadata;
  onPlayAudio?: (audio: AudioMetadata) => void;
}

const AudioPage: React.FC<AudioPageProps> = ({ audio, onPlayAudio }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const [imageError, setImageError] = useState(false);
  
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
  // Get related audio
  const relatedAudio = getRelatedAudio(audio, 3);
  
  // Get theme-specific styles
  const getContainerStyles = () => {
    if (isLight) {
      return 'bg-gray-50 min-h-screen pt-16';
    } else if (isColorful) {
      return 'bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 min-h-screen pt-16';
    } else {
      return 'bg-gray-900 min-h-screen pt-16';
    }
  };

  const getHeroStyles = () => {
    if (isLight) {
      return 'bg-white border-b border-gray-200';
    } else if (isColorful) {
      return 'bg-gradient-to-br from-purple-900/30 to-pink-900/20 border-b border-purple-500/30 backdrop-blur-lg';
    } else {
      return 'bg-gray-800 border-b border-gray-700';
    }
  };

  const getTextStyles = () => {
    if (isLight) {
      return {
        title: 'text-gray-900',
        subtitle: 'text-gray-600',
        text: 'text-gray-700',
        muted: 'text-gray-500',
        accent: 'text-blue-600'
      };
    } else if (isColorful) {
      return {
        title: 'text-white',
        subtitle: 'text-gray-200',
        text: 'text-gray-300',
        muted: 'text-gray-400',
        accent: 'text-cyan-400'
      };
    } else {
      return {
        title: 'text-white',
        subtitle: 'text-gray-300',
        text: 'text-gray-300',
        muted: 'text-gray-400',
        accent: 'text-blue-400'
      };
    }
  };

  const getCardStyles = () => {
    if (isLight) {
      return 'bg-white border border-gray-200 rounded-xl';
    } else if (isColorful) {
      return 'bg-black/20 border border-purple-500/30 rounded-xl backdrop-blur-sm';
    } else {
      return 'bg-gray-800 border border-gray-700 rounded-xl';
    }
  };

  const getButtonStyles = () => {
    if (isLight) {
      return {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
      };
    } else if (isColorful) {
      return {
        primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white',
        secondary: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30'
      };
    } else {
      return {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600'
      };
    }
  };

  const textStyles = getTextStyles();
  const buttonStyles = getButtonStyles();
  const fallbackImage = '/images/main.jpg';

  // Share functionality
  const handleShare = async () => {
    const url = `${window.location.origin}/audio/${audio.slug}`;
    const text = `Listen to "${audio.title}" by ${audio.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: audio.title,
          text: text,
          url: url,
        });
      } catch (error) {
        console.log('Share failed', error);
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Link copied to clipboard');
    });
  };

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audio.filePath;
    link.download = audio.fileName;
    link.click();
  };

  return (
    <div className={getContainerStyles()}>
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/audio"
          className={`inline-flex items-center gap-2 ${textStyles.accent} hover:underline transition-colors`}
        >
          <span className="material-symbols text-lg">arrow_back</span>
          Back to Audio Library
        </Link>
      </div>

      {/* Hero Section */}
      <div className={`${getHeroStyles()} py-12`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={imageError ? fallbackImage : audio.coverImage}
                alt={audio.title}
                fill
                className="object-cover"
                priority
                onError={() => setImageError(true)}
              />
              
              {audio.featured && (
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols text-sm">star</span>
                    Featured
                  </div>
                </div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Category */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${textStyles.accent} bg-blue-500/10`}>
                  {audio.category}
                </span>
              </div>

              {/* Title */}
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textStyles.title}`}>
                {audio.title}
              </h1>

              {/* Author & Meta */}
              <div className={`flex items-center gap-6 mb-6 ${textStyles.muted}`}>
                <span className="flex items-center gap-2">
                  <span className="material-symbols text-lg">person</span>
                  {audio.author}
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols text-lg">language</span>
                  {audio.language.toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <p className={`text-lg leading-relaxed mb-8 ${textStyles.text}`}>
                {audio.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {audio.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isLight 
                        ? 'bg-gray-100 text-gray-700' 
                        : isColorful 
                        ? 'bg-purple-500/20 text-purple-300' 
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onPlayAudio?.(audio)}
                  className={`${buttonStyles.primary} px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors`}
                >
                  <span className="material-symbols text-lg">play_arrow</span>
                  Play Audio
                </button>
                
                <button
                  onClick={handleShare}
                  className={`${buttonStyles.secondary} px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors`}
                >
                  <span className="material-symbols text-lg">share</span>
                  Share
                </button>
                
                <button
                  onClick={downloadAudio}
                  className={`${buttonStyles.secondary} px-6 py-3 rounded-lg flex items-center gap-2 font-semibold transition-colors`}
                >
                  <span className="material-symbols text-lg">download</span>
                  Download
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Audio Player Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${getCardStyles()} p-8`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${textStyles.title}`}>
            Listen Now
          </h2>
          <AudioPlayer
            src={audio.filePath}
            title={audio.title}
            category={audio.category}
          />
        </motion.div>
      </div>

      {/* Related Audio */}
      {relatedAudio.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className={`text-2xl font-bold mb-8 ${textStyles.title}`}>
              Related Audio
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedAudio.map((relatedItem, index) => (
                <motion.div
                  key={relatedItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <AudioCard
                    audio={relatedItem}
                    variant="grid"
                    onPlay={onPlayAudio}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AudioPage;
