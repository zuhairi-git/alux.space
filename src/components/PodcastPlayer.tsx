'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { podcastEpisodes } from '@/data/podcasts';
import { SupportedLanguage } from '@/podcast/types/podcast';
import { getAudioFileForLanguage, setMediaSessionMetadata, filterEpisodesByLanguage, getEpisodeDisplayLanguage, shouldShowLanguageBadge } from '@/podcast/utils/languageUtils';
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
  const [debugInfo, setDebugInfo] = useState<string>('');
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
    setCurrentTime(0);
  }, []);  // Test function to verify audio loading
  const testAudioLoad = useCallback(async () => {
    if (!audioRef.current || !currentAudioFile) return;
    
    setDebugInfo('Testing audio load...');
    
    try {
      // Create a new audio element for testing
      const testAudio = new Audio(currentAudioFile);
      
      testAudio.addEventListener('loadeddata', () => {
        setDebugInfo(`✓ Audio loaded: ${testAudio.duration}s`);
      });
      
      testAudio.addEventListener('error', (e) => {
        setDebugInfo(`✗ Audio error: ${testAudio.error?.message || 'Unknown error'}`);
      });
      
      testAudio.load();
      
      // Test playing with user interaction
      const playPromise = testAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setDebugInfo('✓ Audio CAN play - audio system working!');
            testAudio.pause();
          })
          .catch((error) => {
            setDebugInfo(`✗ Audio play blocked: ${error.message}`);
          });
      }
    } catch (error) {
      setDebugInfo(`✗ Audio test failed: ${error}`);
    }
  }, [currentAudioFile]);// Audio functions
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
    };}, [currentEpisodeId, currentLanguage]); // Removed dependencies that were causing too many re-runs

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
    setPlaybackRate(newRate);
  }, [playbackRate]);
  
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
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
  }, [currentEpisodeId, isPlaying, togglePlay, stopAudio]);

  // Navigation functions for next/previous episodes
  const goToNextEpisode = useCallback(() => {
    const currentIndex = availableEpisodes.findIndex(ep => ep.id === currentEpisodeId);
    if (currentIndex < availableEpisodes.length - 1) {
      const nextEpisode = availableEpisodes[currentIndex + 1];
      setCurrentEpisodeId(nextEpisode.id);
    }
  }, [availableEpisodes, currentEpisodeId]);

  const goToPreviousEpisode = useCallback(() => {
    const currentIndex = availableEpisodes.findIndex(ep => ep.id === currentEpisodeId);
    if (currentIndex > 0) {
      const previousEpisode = availableEpisodes[currentIndex - 1];
      setCurrentEpisodeId(previousEpisode.id);
    }
  }, [availableEpisodes, currentEpisodeId]);
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
    }
  }, [isPlaying, duration, togglePlay, stopAudio, canGoNext, canGoPrevious, goToNextEpisode, goToPreviousEpisode]);
  
  // Calculate progress percentage for the progress bar
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-3xl mx-auto rounded-xl overflow-hidden ${getBgStyle()}`}
    >      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        preload="metadata"
        controls={false}
        onLoadStart={() => console.log('Audio load started')}
        onLoadedData={() => console.log('Audio loaded')}
        onLoadedMetadata={() => console.log('Audio metadata loaded')}
        onCanPlay={() => console.log('Audio can play')}
        onCanPlayThrough={() => console.log('Audio can play through')}
        onError={(e) => console.error('Audio error:', e)}
        onPlay={() => console.log('Audio started playing')}
        onPause={() => console.log('Audio paused')}
      />
      
      {/* Player header with current episode info */}      <div className={`p-4 ${getTextStyle()}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
              Podcast Player
            </h3>
            {showLanguageBadge && (
              <LanguageBadge language={episodeDisplayLanguage} size="sm" />
            )}
          </div>
          <p className={`text-sm mt-1 truncate ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            {locale === 'fi' ? 'Nyt toistetaan: ' : 'Now Playing: '}{currentEpisode?.title || 'No episode selected'}
          </p>
        </div>
          
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-full ${isLight ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              className={`w-5 h-5 ${isLight ? 'text-gray-600' : 'text-gray-300'} transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="px-4">
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
          <div 
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getAccentColor()} rounded-full transform-gpu`}
            style={{ width: `${progressPercentage}%` }}
          />
          <input
            type="range"
            value={currentTime}
            min="0"
            max={duration || 0}
            step="0.01"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleSeek}
            disabled={loadError}
          />
        </div>
      </div>
        {/* Player controls */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">          {/* Previous button */}
          <motion.button
            onClick={goToPreviousEpisode}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            } ${!canGoPrevious ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loadError || !canGoPrevious}
            title={locale === 'fi' ? 'Edellinen jakso' : 'Previous episode'}
          >
            <svg 
              className="w-5 h-5 text-purple-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
            </svg>
          </motion.button>

          {/* Play/Pause button */}
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-purple-100 hover:bg-purple-200' 
                : 'bg-purple-900/50 hover:bg-purple-800/50'
            } border-2 border-purple-500`}
            disabled={loadError}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.svg 
                  key="pause"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-6 h-6 text-purple-500" 
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
                  className="w-6 h-6 text-purple-500" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>          {/* Next button */}
          <motion.button
            onClick={goToNextEpisode}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            } ${!canGoNext ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loadError || !canGoNext}
            title={locale === 'fi' ? 'Seuraava jakso' : 'Next episode'}
          >
            <svg 
              className="w-5 h-5 text-purple-500" 
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
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            disabled={loadError}
            title={locale === 'fi' ? 'Pysäytä' : 'Stop'}
          >
            <svg 
              className="w-5 h-5 text-purple-500" 
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
            className={`px-2 h-8 rounded-full flex items-center ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            disabled={loadError}
            title={locale === 'fi' ? 'Toistonopeus' : 'Playback speed'}
          >
            <motion.span 
              key={playbackRate}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-purple-500 text-sm"
            >
              {playbackRate}x
            </motion.span>
          </motion.button>
        </div>
          {/* Episode counter and time display */}
        <div className="flex flex-col items-end">
          <div className={`text-xs mb-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
            {locale === 'fi' ? 'Jakso' : 'Episode'} {availableEpisodes.findIndex(ep => ep.id === currentEpisodeId) + 1} / {availableEpisodes.length}
          </div>
          <div className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            <span>{formatTime(currentTime)}</span>
            <span className="mx-1">/</span>
            <span>{formatTime(duration)}</span>          </div>
          
          {/* Volume control for debugging */}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-purple-500">Vol:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={audioRef.current?.volume || 1}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.volume = parseFloat(e.target.value);
                  console.log('Volume set to:', audioRef.current.volume);
                }
              }}
              className="w-16 h-1"
            />
            <motion.button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.muted = !audioRef.current.muted;
                  console.log('Muted:', audioRef.current.muted);
                }
              }}
              className="text-xs text-purple-500 ml-1"
            >
              {audioRef.current?.muted ? '🔇' : '🔊'}
            </motion.button>
          </div>
          
          {debugInfo && (
            <div className="text-xs mt-1 text-purple-500">
              {debugInfo}
            </div>
          )}
        </div>
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
