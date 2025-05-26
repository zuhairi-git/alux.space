'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { podcastEpisodes } from '@/data/podcasts';
import { SupportedLanguage } from '@/podcast/types/podcast';
import { getAudioFileForLanguage, filterEpisodesByLanguage, getEpisodeDisplayLanguage, shouldShowLanguageBadge } from '@/podcast/utils/languageUtils';
import EpisodeList from '@/podcast/components/EpisodeList';
import LanguageBadge from '@/podcast/components/LanguageBadge';

interface PodcastPlayerProps {
  initialEpisodeId?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ initialEpisodeId }) => {  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentLanguage = locale as SupportedLanguage;
  
  // Filter episodes based on current language
  const availableEpisodes = filterEpisodesByLanguage(podcastEpisodes, currentLanguage);
  
  const [currentEpisodeId, setCurrentEpisodeId] = useState<string>(
    initialEpisodeId || availableEpisodes[0]?.id || ''
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);  const [loadError, setLoadError] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
    // Find the current episode data
  const currentEpisode = podcastEpisodes.find(ep => ep.id === currentEpisodeId) || availableEpisodes[0];
  const currentAudioFile = currentEpisode ? getAudioFileForLanguage(currentEpisode, currentLanguage) : '';
  const episodeDisplayLanguage = currentEpisode ? getEpisodeDisplayLanguage(currentEpisode, currentLanguage) : 'en';
  const showLanguageBadge = currentEpisode ? shouldShowLanguageBadge(currentEpisode, currentLanguage) : false;
  
  // Get theme-specific styles
  const getBgStyle = () => {
    if (isLight) {
      return 'bg-white/90 border border-gray-200 shadow-md';
    } else if (isColorful) {
      return 'bg-black/40 border border-purple-500/30 shadow-lg backdrop-blur-md';
    } else {
      return 'bg-gray-900/80 border border-gray-800 shadow-lg backdrop-blur-md';
    }
  };
  
  const getTextStyle = () => {
    if (isLight) {
      return 'text-gray-800';
    } else if (isColorful) {
      return 'text-white';
    } else {
      return 'text-gray-100';
    }
  };
  
  const getAccentColor = () => {
    if (isLight) {
      return 'from-blue-500 to-purple-500';
    } else if (isColorful) {
      return 'from-cyan-500 to-fuchsia-500';
    } else {
      return 'from-blue-500 to-purple-500';
    }
  };  // Audio control functions
  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      console.error('Audio ref is not available');
      return;
    }
    
    // Mark that user has interacted
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    
    console.log('Toggle play called. Current state:', { 
      isPlaying, 
      audioSrc: audioRef.current.src,
      currentAudioFile,
      currentEpisode: currentEpisode?.title,
      readyState: audioRef.current.readyState,
      networkState: audioRef.current.networkState
    });
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure audio is loaded before trying to play
      if (audioRef.current.readyState < 2) {
        console.log('Audio not ready, loading...');
        audioRef.current.load();
      }
        // Ensure audio volume is not muted
      audioRef.current.volume = 1.0;
      audioRef.current.muted = false;
      
      audioRef.current.play()
        .then(() => {
          console.log('Audio started playing successfully');
          console.log('Audio volume:', audioRef.current?.volume);
          console.log('Audio muted:', audioRef.current?.muted);
          console.log('Audio paused:', audioRef.current?.paused);
          setIsPlaying(true);
          setLoadError(false);
        })
        .catch(error => {
          console.error('Error playing audio:', error);
          console.error('Audio source:', audioRef.current?.src);
          console.error('Current audio file:', currentAudioFile);
          console.error('Ready state:', audioRef.current?.readyState);
          console.error('Network state:', audioRef.current?.networkState);
          setLoadError(true);
          setIsPlaying(false);
        });
    }
  }, [isPlaying, currentAudioFile, currentEpisode, hasUserInteracted]);
    const stopAudio = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);  }, []);

// Audio functions
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentEpisode) {
      console.warn('Missing audio ref or current episode:', { 
        hasAudio: !!audio, 
        hasEpisode: !!currentEpisode 
      });
      return;
    }
    
    console.log('Setting up audio for episode:', {
      episodeId: currentEpisode.id,
      episodeTitle: currentEpisode.title,
      currentLanguage,
      currentAudioFile,
      fullAudioPath: window.location.origin + currentAudioFile
    });
    
    // Reset player state when episode changes
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadError(false);
    
    // Ensure we have a valid audio file path
    if (!currentAudioFile) {
      console.error('No audio file available for current episode and language');
      setLoadError(true);
      return;
    }
    
    // Set audio source using language-aware utility
    audio.src = currentAudioFile;
    console.log('Audio source set to:', audio.src);
    
    // Force reload the audio element
    audio.load();
      const handleLoadedData = () => {
      console.log('Audio loaded successfully:', {
        duration: audio.duration,
        readyState: audio.readyState,
        networkState: audio.networkState
      });
      setDuration(audio.duration || 0);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleError = (event: Event) => {
      console.error('Audio loading error:', {
        error: audio.error,
        code: audio.error?.code,
        message: audio.error?.message,
        networkState: audio.networkState,
        readyState: audio.readyState,
        src: audio.src,
        event
      });
      setLoadError(true);
    };
    
    const handleCanPlay = () => {
      console.log('Audio can start playing:', {
        readyState: audio.readyState,
        duration: audio.duration
      });
    };
    
    const handleLoadStart = () => {
      console.log('Audio load started:', audio.src);
    };    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
      
      // Episode ended - no autoplay to next episode
      console.log('Episode ended');
    };
      audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
    };}, [currentEpisodeId, currentLanguage, currentAudioFile, currentEpisode]); // Added missing dependencies

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const changePlaybackRate = useCallback(() => {
    if (!audioRef.current) return;
    
    const rates = [1, 1.5, 2, 3];
    const nextRateIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const newRate = rates[nextRateIndex];
    
    audioRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);  }, [playbackRate]);
  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressBarWidth = rect.width;
    const clickPercentage = clickX / progressBarWidth;
    const newTime = clickPercentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  // Mouse tracking for progress bar hover preview
  const [mousePosition, setMousePosition] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleProgressMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const progressBarWidth = rect.width;
    const mousePercentage = Math.max(0, Math.min(100, (mouseX / progressBarWidth) * 100));
    
    setMousePosition(mousePercentage);
  }, [duration]);

  const handleProgressMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleProgressMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);
    const handleEpisodeSelect = useCallback((episodeId: string) => {
    if (currentEpisodeId === episodeId && isPlaying) {
      // If clicking the current playing episode, pause it
      togglePlay();
    } else {
      // Otherwise, switch to the new episode
      stopAudio();
      setCurrentEpisodeId(episodeId);
    }
  }, [currentEpisodeId, isPlaying, togglePlay, stopAudio]);  // Navigation functions for next/previous episodes
  const goToNextEpisode = useCallback(() => {
    const currentIndex = availableEpisodes.findIndex(ep => ep.id === currentEpisodeId);
    if (currentIndex < availableEpisodes.length - 1) {
      const nextEpisode = availableEpisodes[currentIndex + 1];
      const wasPlaying = isPlaying;
      
      // Stop current audio first
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      
      // Change to next episode
      setCurrentEpisodeId(nextEpisode.id);
      
      // Auto-play the next episode if something was playing before
      if (wasPlaying) {
        setTimeout(() => {
          if (audioRef.current) {
            // Wait for the audio to be ready
            const tryPlay = () => {
              if (audioRef.current && audioRef.current.readyState >= 2) {
                togglePlay();
              } else {
                // Audio not ready yet, try again in a bit
                setTimeout(tryPlay, 100);
              }
            };
            tryPlay();
          }
        }, 200);
      }
    }
  }, [availableEpisodes, currentEpisodeId, isPlaying, togglePlay]);

  const goToPreviousEpisode = useCallback(() => {
    const currentIndex = availableEpisodes.findIndex(ep => ep.id === currentEpisodeId);
    if (currentIndex > 0) {
      const previousEpisode = availableEpisodes[currentIndex - 1];
      const wasPlaying = isPlaying;
      
      // Stop current audio first
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      
      // Change to previous episode
      setCurrentEpisodeId(previousEpisode.id);
      
      // Auto-play the previous episode if something was playing before
      if (wasPlaying) {
        setTimeout(() => {
          if (audioRef.current) {
            // Wait for the audio to be ready
            const tryPlay = () => {
              if (audioRef.current && audioRef.current.readyState >= 2) {
                togglePlay();
              } else {
                // Audio not ready yet, try again in a bit
                setTimeout(tryPlay, 100);
              }
            };
            tryPlay();
          }
        }, 200);
      }
    }
  }, [availableEpisodes, currentEpisodeId, isPlaying, togglePlay]);
  // Check if next/previous buttons should be enabled
  const canGoNext = availableEpisodes.findIndex(ep => ep.id === currentEpisodeId) < availableEpisodes.length - 1;
  const canGoPrevious = availableEpisodes.findIndex(ep => ep.id === currentEpisodeId) > 0;

  // Set up media session action handlers for mobile
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        if (!isPlaying) togglePlay();
      });
      
      navigator.mediaSession.setActionHandler('pause', () => {
        if (isPlaying) togglePlay();
      });
      
      navigator.mediaSession.setActionHandler('stop', () => {
        stopAudio();
      });
      
      navigator.mediaSession.setActionHandler('seekbackward', () => {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
        }
      });
      
      navigator.mediaSession.setActionHandler('seekforward', () => {
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
        }
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (canGoPrevious) goToPreviousEpisode();
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (canGoNext) goToNextEpisode();
      });
    }  }, [isPlaying, duration, togglePlay, stopAudio, canGoNext, canGoPrevious, goToNextEpisode, goToPreviousEpisode]);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-3xl mx-auto rounded-2xl overflow-hidden ${getBgStyle()}`}
    >
      {/* Hidden audio element with comprehensive event handlers */}      <audio
        ref={audioRef}
        src={currentAudioFile}
        preload="metadata"
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}        onCanPlay={() => {
          console.log('Audio can play');
          setLoadError(false);
        }}        onCanPlayThrough={() => {
          console.log('Audio can play through');
        }}        onLoadStart={() => {
          console.log('Audio load started');
        }}        onProgress={(e) => {
          const buffered = e.currentTarget.buffered;
          if (buffered.length > 0) {
            const bufferedEnd = buffered.end(buffered.length - 1);
            console.log(`Audio buffered: ${bufferedEnd}s`);
          }
        }}        onError={(e) => {
          console.error('Audio error:', e);
          setLoadError(true);
        }}        onPlay={() => {
          console.log('Audio started playing');
        }}        onPause={() => {
          console.log('Audio paused');
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
          }
          console.log('Episode ended');
        }}        onLoadedData={() => {
          console.log('Audio data loaded');
        }}        onWaiting={() => {
          console.log('Audio waiting for data');
        }}        onStalled={() => {
          console.log('Audio stalled');
        }}
      />      {/* Main player content with generous padding */}
      <div className="p-6">
        {/* Header section with episode info and expand button */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-3 mb-4">
              <h3 className={`font-bold text-2xl ${getTextStyle()} truncate`}>
                {currentEpisode?.title || 'Loading...'}
              </h3>              {showLanguageBadge && (
                <LanguageBadge 
                  language={episodeDisplayLanguage} 
                />
              )}
            </div>
            <p className={`text-base leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'} line-clamp-3 mb-4`}>
              {currentEpisode?.description || ''}
            </p>
            
            {/* Episode counter */}
            <div className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
              {locale === 'fi' ? 'Jakso' : 'Episode'} {availableEpisodes.findIndex(ep => ep.id === currentEpisodeId) + 1} / {availableEpisodes.length}
            </div>
          </div>
          
          {/* Expand/collapse button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-xl ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            } transition-all duration-200 shadow-lg`}
            title={isExpanded ? (locale === 'fi' ? 'Piilota jaksot' : 'Hide episodes') : (locale === 'fi' ? 'Näytä jaksot' : 'Show episodes')}
          >
            <motion.span 
              className="material-symbols-rounded text-xl text-purple-500"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              expand_more
            </motion.span>
          </motion.button>
        </div>        {/* Modern Progress Bar with Time Ruler */}
        <div className="mb-8">
          {/* Time markers above progress bar */}
          <div className="relative w-full h-6 mb-2">
            {/* Generate time ruler marks */}
            <div className="absolute inset-x-0 bottom-0 h-4 flex justify-between items-end">
              {duration > 0 && Array.from({ length: 11 }).map((_, i) => {
                const timeAtMark = (duration * i) / 10;
                const isQuarterMark = i % 2.5 === 0; // Marks at 0%, 25%, 50%, 75%, 100%
                const isMajorMark = i === 0 || i === 5 || i === 10; // Start, middle, end
                
                return (
                  <div key={i} className="flex flex-col items-center">
                    {/* Tick mark */}
                    <div 
                      className={`${
                        isMajorMark 
                          ? `w-0.5 h-3 ${isLight ? 'bg-gray-400' : 'bg-gray-500'}` 
                          : isQuarterMark 
                            ? `w-0.5 h-2 ${isLight ? 'bg-gray-300' : 'bg-gray-600'}` 
                            : `w-px h-1.5 ${isLight ? 'bg-gray-200' : 'bg-gray-700'}`
                      } transition-colors duration-200`}
                    />
                    {/* Time label for major marks */}
                    {isMajorMark && (
                      <span className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-gray-400'} font-mono`}>
                        {formatTime(timeAtMark)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main progress bar container */}
          <div className="relative w-full">            {/* Background track with subtle gradient */}
            <div 
              className={`w-full h-4 rounded-lg relative overflow-hidden cursor-pointer group ${
                isLight 
                  ? 'bg-gradient-to-r from-gray-100 via-gray-150 to-gray-100 border border-gray-200' 
                  : 'bg-gradient-to-r from-gray-800 via-gray-750 to-gray-800 border border-gray-600'
              } shadow-inner transition-all duration-200 hover:shadow-md`}
              onClick={handleProgressClick}
              onMouseMove={handleProgressMouseMove}
              onMouseEnter={handleProgressMouseEnter}
              onMouseLeave={handleProgressMouseLeave}
            >              {/* Subtle inner shadow for depth */}
              <div className={`absolute inset-0 rounded-lg ${
                isLight ? 'shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]' : 'shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]'
              }`} />
              
              {/* Buffering indicator (behind progress) */}
              <div className={`absolute left-0 top-0 h-full w-full ${
                isLight ? 'bg-gray-300/30' : 'bg-gray-600/30'
              } rounded-lg opacity-0 animate-pulse`} 
              style={{ 
                opacity: audioRef.current?.readyState && audioRef.current.readyState < 4 ? 0.5 : 0,
                transition: 'opacity 0.3s ease'
              }} />
              
              {/* Progress fill with glass effect */}
              <motion.div 
                className={`absolute left-0 top-0 h-full rounded-lg overflow-hidden`}
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Main gradient fill */}
                <div className={`w-full h-full bg-gradient-to-r ${getAccentColor()} relative`}>
                  {/* Glass overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 rounded-lg" />
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg" />
                </div>
              </motion.div>

              {/* Interactive playhead */}
              <motion.div
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-200"
                style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                animate={{ 
                  x: "-50%",
                  scale: 1
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div className={`w-6 h-6 rounded-full shadow-lg border-3 border-white transition-all duration-200 group-hover:shadow-xl ${
                  isLight 
                    ? 'bg-gradient-to-b from-purple-400 to-purple-600' 
                    : 'bg-gradient-to-b from-purple-500 to-purple-700'
                } opacity-0 group-hover:opacity-100`}>
                  {/* Inner highlight */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/30 to-transparent" />
                </div>
              </motion.div>              {/* Hover preview line */}
              <motion.div 
                className="absolute top-0 h-full w-0.5 bg-purple-400/70 transition-opacity pointer-events-none rounded-full shadow-sm" 
                style={{ left: `${mousePosition}%` }}
                animate={{ 
                  opacity: isHovering ? 1 : 0,
                  scale: isHovering ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
              >
                {/* Preview time tooltip */}
                {isHovering && duration > 0 && (
                  <motion.div
                    className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-mono ${
                      isLight 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-white text-gray-800'
                    } shadow-lg whitespace-nowrap z-10`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatTime((mousePosition / 100) * duration)}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
            {/* Enhanced time display */}
          <div className="flex justify-between items-center mt-4">
            <div className={`flex items-center gap-2`}>
              <div className={`text-lg font-bold font-mono ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                {formatTime(currentTime)}
              </div>
              <div className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                /
              </div>
            </div>
            <div className={`text-lg font-bold font-mono ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              {formatTime(duration)}
            </div>
          </div>
        </div>{/* All controls in one row */}
        <div className="flex items-center justify-center gap-6 mb-6">
          {/* Previous button */}
          <motion.button
            onClick={goToPreviousEpisode}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            } ${!canGoPrevious ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-200 shadow-lg`}
            disabled={loadError || !canGoPrevious}
            title={locale === 'fi' ? 'Edellinen jakso' : 'Previous episode'}
          >
            <svg 
              className="w-7 h-7 text-purple-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </motion.button>

          {/* Play/Pause button - Large and prominent */}
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`w-24 h-24 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-purple-100 hover:bg-purple-200' 
                : 'bg-purple-900/50 hover:bg-purple-800/50'
            } border-4 border-purple-500 shadow-2xl transition-all duration-200`}
            disabled={loadError}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.svg 
                  key="pause"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-10 h-10 text-purple-500" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </motion.svg>
              ) : (
                <motion.svg 
                  key="play"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-10 h-10 text-purple-500" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Next button */}
          <motion.button
            onClick={goToNextEpisode}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`w-16 h-16 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            } ${!canGoNext ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-200 shadow-lg`}
            disabled={loadError || !canGoNext}
            title={locale === 'fi' ? 'Seuraava jakso' : 'Next episode'}
          >
            <svg 
              className="w-7 h-7 text-purple-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
            </svg>
          </motion.button>

          {/* Stop button */}
          <motion.button
            onClick={stopAudio}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`w-14 h-14 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            } transition-all duration-200 shadow-md`}
            disabled={loadError}
            title={locale === 'fi' ? 'Pysäytä' : 'Stop'}
          >
            <svg 
              className="w-6 h-6 text-purple-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
            </svg>
          </motion.button>
          
          {/* Playback rate button */}
          <motion.button
            onClick={changePlaybackRate}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`px-4 h-14 rounded-full flex items-center gap-2 ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            } transition-all duration-200 shadow-md`}
            disabled={loadError}
            title={locale === 'fi' ? 'Toistonopeus' : 'Playback speed'}
          >
            <span className="material-symbols-rounded text-purple-500 text-xl">speed</span>
            <motion.span 
              key={playbackRate}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-purple-500 font-semibold text-lg"
            >
              {playbackRate}x
            </motion.span>
          </motion.button>          {/* Volume controls - vintage radio dial style */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.muted = !audioRef.current.muted;
                  console.log('Muted:', audioRef.current.muted);
                }
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                isLight 
                  ? 'bg-gray-100 hover:bg-gray-200' 
                  : 'bg-gray-800 hover:bg-gray-700'
              } transition-all duration-200 shadow-md`}
              title={locale === 'fi' ? 'Mykistä/poista mykistys' : 'Mute/unmute'}
            >
              <span className="text-xl">
                {audioRef.current?.muted ? '🔇' : '🔊'}
              </span>
            </motion.button>              {/* Vintage Radio Frequency Display - Reduced Height */}
            <div className="relative w-40 h-10 ml-1">
              {/* Radio frequency display body */}
              <div className={`absolute inset-0 rounded-lg ${
                isLight ? 'border-gray-400 bg-gradient-to-b from-gray-50 to-gray-100 transition-all duration-200 shadow-md' : 'bg-gradient-to-b from-gray-800 to-gray-900'
              } shadow-inner overflow-hidden`}>
                
                {/* Main frequency scale */}
                <div className="absolute inset-0 p-0.5">
                  {/* Frequency lines */}
                  <div className="relative w-full h-full">
                    {/* Horizontal frequency measurement lines */}
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
                      {/* Upper frequency band */}
                      <div className={`h-1/2 w-full border-b ${isLight ? 'border-gray-300' : 'border-gray-600'} flex items-end`}>
                        <div className="w-full flex justify-between px-1 text-[5px] font-mono">
                          <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>88</span>
                          <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>92</span>
                          <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>96</span>
                          <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>100</span>
                          <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>104</span>
                          <span className={isLight ? 'text-gray-500' : 'text-gray-400'}>108</span>
                        </div>
                      </div>
                      
                      {/* Lower frequency band - ticker marks */}
                      <div className="h-1/2 w-full flex items-center">
                        <div className="w-full flex justify-between px-1">
                          {Array.from({ length: 15 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`${
                                isLight ? 'bg-gray-400' : 'bg-gray-500'
                              } ${i % 5 === 0 ? 'h-[3px]' : 'h-[2px]'}`}
                              style={{ width: '1px' }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Red frequency indicator */}
                    <div 
                      className="absolute h-full w-0.5 bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.7)] z-10 transition-all duration-150"
                      style={{ 
                        left: `${(audioRef.current?.volume || 1) * 100}%`, 
                        transform: 'translateX(-50%)' 
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Volume slider - hidden but functional */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={audioRef.current?.volume || 1}
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.volume = parseFloat(e.target.value);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              
              {/* Volume labels */}
              <div className={`absolute -bottom-3 left-0 text-[9px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                MIN
              </div>
              <div className={`absolute -bottom-3 right-0 text-[9px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                MAX
              </div>
            </div>
          </div></div>
      </div>
        {/* Episode list (expandable) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className={`border-t ${isLight ? 'border-gray-200' : 'border-gray-700'} p-4`}>
              <EpisodeList
                episodes={podcastEpisodes}
                currentEpisodeId={currentEpisodeId}
                onEpisodeSelect={handleEpisodeSelect}
                className="max-h-64 overflow-y-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>        {/* Load error message */}
      {loadError && (
        <div className={`p-4 ${isLight ? 'bg-red-50 text-red-600' : 'bg-red-900/20 text-red-400'} text-sm`}>
          <div className="flex items-center justify-between">
            <div>
              {locale === 'fi' 
                ? 'Äänitiedostoa ei voitu ladata. Tiedosto voi puuttua tai olla väärässä muodossa.'
                : 'Could not load audio file. The file may be missing or in an unsupported format.'}
              <div className="text-xs mt-1 opacity-75">
                {locale === 'fi' ? 'Tiedosto: ' : 'File: '}{currentAudioFile}
              </div>
            </div>
            <motion.button
              onClick={() => {
                setLoadError(false);
                if (audioRef.current) {
                  audioRef.current.load();
                }
              }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
            >
              {locale === 'fi' ? 'Yritä uudelleen' : 'Retry'}
            </motion.button>
          </div>
        </div>
      )}

      {/* No audio file available message */}
      {!currentAudioFile && !loadError && (
        <div className={`p-4 ${isLight ? 'bg-yellow-50 text-yellow-600' : 'bg-yellow-900/20 text-yellow-400'} text-sm`}>
          {locale === 'fi' 
            ? 'Tälle jaksolle ei ole saatavilla äänitiedostoa valitulla kielellä.'
            : 'No audio file available for this episode in the selected language.'}
        </div>
      )}
    </motion.div>
  );
};

export default PodcastPlayer;
