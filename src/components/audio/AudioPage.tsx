'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { AudioMetadata } from '@/types/audio';
import { getRelatedAudio, getAudioLanguages, getAudioVersion } from '@/data/audioLibrary';
import AudioPlayer from '@/components/ui/AudioPlayer';
import AudioCard from './AudioCard';

interface AudioPageProps {
  audio: AudioMetadata;
  onPlayAudio?: (audio: AudioMetadata) => void;
}

const AudioPage: React.FC<AudioPageProps> = ({ audio: originalAudio, onPlayAudio }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const params = useParams();
  const [imageError, setImageError] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'fi' | 'ar'>(originalAudio.language);
  const audioPlayerRef = useRef<{ play: () => void } | null>(null);
  
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
  // Get the audio version for the selected language
  const audio = getAudioVersion(originalAudio, selectedLanguage);
  const availableLanguages = getAudioLanguages(originalAudio);
  
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

  const getLinkStyles = () => {
    if (isLight) {
      return 'no-underline hover:bg-blue-50 px-1 py-0.5 rounded transition-colors duration-150';
    } else if (isColorful) {
      return 'no-underline hover:bg-cyan-500/10 px-1 py-0.5 rounded transition-colors duration-150';
    } else {
      return 'no-underline hover:bg-blue-900/20 px-1 py-0.5 rounded transition-colors duration-150';
    }
  };

  const getLanguageBadgeStyles = () => {
    if (isLight) {
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    } else if (isColorful) {
      return 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30';
    } else {
      return 'bg-blue-500/20 text-blue-300 border border-blue-400/30';
    }
  };

  const getLanguageButtonStyles = (isActive: boolean) => {
    if (isLight) {
      return isActive 
        ? 'bg-blue-600 text-white border-blue-600' 
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
    } else if (isColorful) {
      return isActive 
        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-transparent' 
        : 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30';
    } else {
      return isActive 
        ? 'bg-blue-600 text-white border-blue-600' 
        : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600';
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

  const handlePlayButtonClick = () => {
    // Scroll to the audio player section
    const audioPlayerElement = document.querySelector('[data-audio-player]');
    if (audioPlayerElement) {
      audioPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Try to trigger play on the audio player
      setTimeout(() => {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.play();
        } else {
          // Fallback to button click if ref is not available
          const playButton = audioPlayerElement.querySelector('button[aria-label*="Play"], button[aria-label*="play"]');
          if (playButton && !playButton.getAttribute('aria-label')?.includes('Pause')) {
            (playButton as HTMLButtonElement).click();
          }
        }
      }, 500);
    }
    
    // Also call the onPlayAudio callback if provided
    if (onPlayAudio) {
      onPlayAudio(audio);
    }
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
          href={`/${params.locale || locale}/audio`}
          className={`inline-flex items-center gap-2 ${textStyles.accent} ${getLinkStyles()}`}
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
                  <span className="material-symbols text-lg">calendar_today</span>
                  {new Date(audio.publishedDate).toLocaleDateString()}
                </span>
              </div>

              {/* Language Selection */}
              {availableLanguages.length > 1 && (
                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-3 ${textStyles.text}`}>
                    Select Language
                  </label>
                  <div className="flex gap-2">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang as 'en' | 'fi' | 'ar')}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${getLanguageButtonStyles(selectedLanguage === lang)}`}
                      >
                        {lang === 'en' ? 'English' : lang === 'fi' ? 'Suomi' : 'العربية'}
                      </button>
                    ))}
                  </div>
                </div>
              )}



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
                  onClick={handlePlayButtonClick}
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
            title={`${audio.title} (${selectedLanguage === 'en' ? 'English' : selectedLanguage === 'fi' ? 'Suomi' : 'العربية'})`}
            category={audio.category}
            language={selectedLanguage}
            availableLanguages={availableLanguages}
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
