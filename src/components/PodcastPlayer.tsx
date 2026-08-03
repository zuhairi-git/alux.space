'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile, useAnimationsDisabled } from '@/utils/deviceUtils';
import { podcastEpisodes } from '@/data/podcasts';
import { SupportedLanguage } from '@/podcast/types/podcast';
import { getAudioFileForLanguage, filterEpisodesByLanguage, getEpisodeDisplayLanguage, shouldShowLanguageBadge, setMediaSessionMetadata } from '@/podcast/utils/languageUtils';
import EpisodeList from '@/podcast/components/EpisodeList';
import LanguageBadge from '@/podcast/components/LanguageBadge';
import { LiveRegion } from './ui/LiveRegion';
import { ButtonIcon } from './ui/Button';

interface PodcastPlayerProps {
  initialEpisodeId?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ initialEpisodeId }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isMobile = useIsMobile();
  const animationsDisabled = useAnimationsDisabled();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
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
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loadError, setLoadError] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  // Enhanced mobile states
  const [isTouching, setIsTouching] = useState(false);
  const [lastTap, setLastTap] = useState(0);

  // Find the current episode data
  const currentEpisode = podcastEpisodes.find(ep => ep.id === currentEpisodeId) || availableEpisodes[0];
  const currentAudioFile = currentEpisode ? getAudioFileForLanguage(currentEpisode, currentLanguage) : '';
  const episodeDisplayLanguage = currentEpisode ? getEpisodeDisplayLanguage(currentEpisode, currentLanguage) : 'en';
  const showLanguageBadge = currentEpisode ? shouldShowLanguageBadge(currentEpisode, currentLanguage) : false;  // Get theme-specific styles with modern mobile-first gradients and glass effects
  const getBgStyle = () => {
    if (isLight) {
      return 'bg-gradient-to-b from-white/95 via-white/90 to-ds-gray-50/95 backdrop-blur-xl border border-white/30 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]';
    } else if (isColorful) {
      return 'bg-[var(--card-from-bg)] backdrop-blur-xl border border-[var(--card-border)] shadow-2xl';
    } else {
      return 'bg-gradient-to-b from-ds-gray-900/95 via-ds-gray-800/90 to-ds-gray-900/95 backdrop-blur-xl border border-ds-gray-700/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]';
    }
  };
  
  const getTextStyle = () => {
    if (isLight) {
      return 'text-ds-gray-900';
    } else if (isColorful) {
      return 'text-white';
    } else {
      return 'text-ds-gray-100';
    }
  };
  
  const getAccentColor = () => {
    return 'from-[var(--primary-500)] via-[var(--gradient-mid)] to-[var(--gradient-end)]';
  };

  const iconControlClassName = `${isMobile ? 'w-12 h-12 min-w-[48px] min-h-[48px]' : 'w-11 h-11'} flex items-center justify-center rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] [background:color-mix(in_srgb,var(--card-from-bg)_88%,transparent)] [border-color:color-mix(in_srgb,var(--card-border)_92%,transparent)] text-[color:color-mix(in_srgb,var(--foreground)_76%,transparent)] hover:text-[var(--primary)] hover:[background:color-mix(in_srgb,var(--primary)_11%,var(--card-from-bg))] hover:[border-color:color-mix(in_srgb,var(--primary)_24%,var(--card-border))] shadow-[0_12px_24px_-20px_color-mix(in_srgb,var(--card-shadow-color)_75%,transparent)] disabled:opacity-40 disabled:cursor-not-allowed ${isMobile ? 'active:[background:color-mix(in_srgb,var(--primary)_14%,var(--card-from-bg))]' : ''}`;
  const pillControlClassName = `${isMobile ? 'px-3 py-2 min-w-[48px] min-h-[48px]' : 'px-3 py-1.5'} inline-flex items-center justify-center rounded-full border text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] [background:color-mix(in_srgb,var(--card-from-bg)_88%,transparent)] [border-color:color-mix(in_srgb,var(--card-border)_92%,transparent)] text-[var(--primary)] hover:[background:color-mix(in_srgb,var(--primary)_11%,var(--card-from-bg))] hover:[border-color:color-mix(in_srgb,var(--primary)_24%,var(--card-border))] shadow-[0_12px_24px_-20px_color-mix(in_srgb,var(--card-shadow-color)_75%,transparent)] disabled:opacity-40 disabled:cursor-not-allowed ${isMobile ? 'active:[background:color-mix(in_srgb,var(--primary)_14%,var(--card-from-bg))]' : ''}`;
  const primaryControlClassName = `${isMobile ? 'w-16 h-16 min-w-[64px] min-h-[64px]' : 'w-14 h-14 md:w-16 md:h-16'} flex items-center justify-center rounded-full text-[var(--text-on-primary)] transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[color:color-mix(in_srgb,var(--primary)_36%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] shadow-[0_20px_40px_-22px_color-mix(in_srgb,var(--primary)_72%,transparent)] disabled:opacity-50 ${isMobile ? 'active:shadow-[0_24px_44px_-18px_color-mix(in_srgb,var(--primary)_82%,transparent)]' : ''}`;
  const primaryControlStyle = {
    backgroundImage: 'linear-gradient(135deg, var(--primary-400) 0%, var(--primary) 52%, var(--primary-700) 100%)',
  } satisfies React.CSSProperties;

  // Audio control functions
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
      setAnnouncement(locale === 'fi' ? 'Podcast pysäytetty' : 'Podcast paused');
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
          setAnnouncement(locale === 'fi' ? 'Podcast toistetaan' : 'Podcast playing');
        })        .catch(error => {
          console.error('Error playing audio:', error);
          console.error('Audio source:', audioRef.current?.src);
          console.error('Current audio file:', currentAudioFile);
          console.error('Ready state:', audioRef.current?.readyState);
          console.error('Network state:', audioRef.current?.networkState);
          setLoadError(true);
          setIsPlaying(false);
          setAnnouncement(locale === 'fi' ? 'Virhe äänen toistossa' : 'Error playing audio');
        });
    }
  }, [isPlaying, currentAudioFile, currentEpisode, hasUserInteracted, locale]);
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
    setPlaybackRate(newRate);
    setAnnouncement(`${locale === 'fi' ? 'Toistonopeus muutettu' : 'Playback speed changed to'} ${newRate}x`);
  }, [playbackRate, locale]);
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
    const selectedEpisode = podcastEpisodes.find(ep => ep.id === episodeId);
    
    if (currentEpisodeId === episodeId && isPlaying) {
      // If clicking the current playing episode, pause it
      togglePlay();
    } else {
      // Otherwise, switch to the new episode
      stopAudio();
      setCurrentEpisodeId(episodeId);
      
      // Announce episode change
      if (selectedEpisode) {
        setAnnouncement(`${locale === 'fi' ? 'Valittu jakso:' : 'Selected episode:'} ${selectedEpisode.title}`);
      }
    }
  }, [currentEpisodeId, isPlaying, togglePlay, stopAudio, locale]);

  // Navigation functions for next/previous episodes
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
      setAnnouncement(`${locale === 'fi' ? 'Seuraava jakso:' : 'Next episode:'} ${nextEpisode.title}`);
      
      // Auto-play the next episode if something was playing before
      if (wasPlaying) {
        // Set a flag to auto-play when the new episode is ready
        const autoPlayWhenReady = () => {
          if (audioRef.current && audioRef.current.readyState >= 2) {
            console.log('Auto-playing next episode');
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setLoadError(false);
              })
              .catch(error => {
                console.error('Auto-play failed:', error);
              });
          } else {
            // Audio not ready yet, try again in a bit
            setTimeout(autoPlayWhenReady, 100);
          }
        };
        
        // Give the audio element time to load the new source
        setTimeout(autoPlayWhenReady, 300);
      }
    }
  }, [availableEpisodes, currentEpisodeId, isPlaying, locale]);  const goToPreviousEpisode = useCallback(() => {
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
      setAnnouncement(`${locale === 'fi' ? 'Edellinen jakso:' : 'Previous episode:'} ${previousEpisode.title}`);
      
      // Auto-play the previous episode if something was playing before
      if (wasPlaying) {
        // Set a flag to auto-play when the new episode is ready
        const autoPlayWhenReady = () => {
          if (audioRef.current && audioRef.current.readyState >= 2) {
            console.log('Auto-playing previous episode');
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setLoadError(false);
              })
              .catch(error => {
                console.error('Auto-play failed:', error);
              });
          } else {
            // Audio not ready yet, try again in a bit
            setTimeout(autoPlayWhenReady, 100);
          }
        };
          // Give the audio element time to load the new source
        setTimeout(autoPlayWhenReady, 300);
      }
    }
  }, [availableEpisodes, currentEpisodeId, isPlaying, locale]);
  // Check if next/previous buttons should be enabled
  const canGoNext = availableEpisodes.findIndex(ep => ep.id === currentEpisodeId) < availableEpisodes.length - 1;
  const canGoPrevious = availableEpisodes.findIndex(ep => ep.id === currentEpisodeId) > 0;
  // Set up media session action handlers for mobile
  useEffect(() => {
    if ('mediaSession' in navigator) {
      // Set media session metadata
      setMediaSessionMetadata(currentEpisode);
      
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
        if (canGoNext) goToNextEpisode();      });
    }
  }, [currentEpisode, isPlaying, duration, togglePlay, stopAudio, canGoNext, canGoPrevious, goToNextEpisode, goToPreviousEpisode]);

  // Keyboard shortcuts for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when not typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case ' ':
          event.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (canGoNext) goToNextEpisode();
          } else if (audioRef.current && duration) {
            event.preventDefault();
            const newTime = Math.min(duration, audioRef.current.currentTime + 10);
            audioRef.current.currentTime = newTime;
            setAnnouncement(`${locale === 'fi' ? 'Siirtyi kohtaan' : 'Seeked to'} ${formatTime(newTime)}`);
          }
          break;
        case 'ArrowLeft':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (canGoPrevious) goToPreviousEpisode();
          } else if (audioRef.current) {
            event.preventDefault();
            const newTime = Math.max(0, audioRef.current.currentTime - 10);
            audioRef.current.currentTime = newTime;
            setAnnouncement(`${locale === 'fi' ? 'Siirtyi kohtaan' : 'Seeked to'} ${formatTime(newTime)}`);
          }
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setAnnouncement(audioRef.current.muted 
              ? (locale === 'fi' ? 'Ääni mykistetty' : 'Audio muted')
              : (locale === 'fi' ? 'Ääni palautettu' : 'Audio unmuted')
            );
          }
          break;
        case 's':
        case 'S':
          event.preventDefault();
          stopAudio();
          setAnnouncement(locale === 'fi' ? 'Podcast pysäytetty' : 'Podcast stopped');
          break;
        case 'r':
        case 'R':
          event.preventDefault();
          changePlaybackRate();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, canGoNext, canGoPrevious, goToNextEpisode, goToPreviousEpisode, stopAudio, changePlaybackRate, duration, locale]);    return (    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-2xl overflow-hidden ${getBgStyle()} shadow-xl relative podcast-player`}
      style={{ zIndex: 100, position: 'relative' }}
      data-podcast-player="true"
    >
      {/* Hidden audio element with comprehensive event handlers */}
      <audio
        ref={audioRef}
        src={currentAudioFile}
        preload="metadata"
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onCanPlay={() => {
          console.log('Audio can play');
          setLoadError(false);
        }}
        onCanPlayThrough={() => {
          console.log('Audio can play through');
        }}
        onLoadStart={() => {
          console.log('Audio load started');
        }}
        onProgress={(e) => {
          const buffered = e.currentTarget.buffered;
          if (buffered.length > 0) {
            const bufferedEnd = buffered.end(buffered.length - 1);
            console.log(`Audio buffered: ${bufferedEnd}s`);
          }
        }}
        onError={(e) => {
          console.error('Audio error:', e);
          setLoadError(true);
        }}
        onPlay={() => {
          console.log('Audio started playing');
        }}
        onPause={() => {
          console.log('Audio paused');
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
          }
          console.log('Episode ended');
        }}
        onLoadedData={() => {
          console.log('Audio data loaded');
        }}
        onWaiting={() => {
          console.log('Audio waiting for data');
        }}
        onStalled={() => {
          console.log('Audio stalled');
        }}
      />      {/* Album Art Section - Mobile First */}
      <div className="relative p-4 pb-0 z-10">
        <div className="aspect-square w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] mx-auto relative z-10">          {/* Enhanced modern podcast cover background */}
          <motion.div 
            className={`w-full h-full rounded-xl md:rounded-2xl ${
              isLight 
                ? 'bg-gradient-to-br from-white via-primary-50/50 to-ds-blue-50/70' 
                : isColorful
                  ? 'bg-[var(--card-from-bg)] border-[var(--card-border)]'
                  : 'bg-gradient-to-br from-ds-gray-800/90 via-ds-gray-700/80 to-ds-gray-800/90'
            } shadow-2xl overflow-hidden relative border ${
              isLight 
                ? 'border-white/60 shadow-primary-200/30' 
                : isColorful
                  ? 'border-[var(--card-border)] shadow-[var(--primary)]/10'
                  : 'border-white/10 shadow-black/20'
            } backdrop-blur-sm`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >            {/* Refined animated background elements */}
            <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl">
              <motion.div 
                className={`absolute top-4 start-4 w-8 h-8 rounded-full ${
                  isLight ? 'bg-primary-300/40' : 'bg-[var(--primary)]/25'
                } blur-sm`}
                animate={{ 
                  scale: isPlaying ? [1, 1.3, 1] : 1,
                  opacity: isPlaying ? [0.4, 0.7, 0.4] : 0.4,
                  x: isPlaying ? [0, 5, 0] : 0
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className={`absolute bottom-6 end-5 w-6 h-6 rounded-full bg-[var(--primary)]/25 blur-sm`}
                animate={{ 
                  scale: isPlaying ? [1, 1.4, 1] : 1,
                  opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.3,
                  y: isPlaying ? [0, -3, 0] : 0
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.div 
                className={`absolute top-1/3 end-3 w-4 h-4 rounded-full ${
                  isLight ? 'bg-ds-pink-300/40' : 'bg-[var(--gradient-end)]/20'
                } blur-sm`}
                animate={{ 
                  scale: isPlaying ? [1, 1.2, 1] : 1,
                  opacity: isPlaying ? [0.4, 0.8, 0.4] : 0.4,
                  rotate: isPlaying ? [0, 90, 0] : 0
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
              />
            </div>{/* Enhanced modern podcast cover design */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
              
              {/* Elegant geometric background pattern */}
              <div className="absolute inset-0 overflow-hidden rounded-xl md:rounded-2xl">
                <div className={`absolute inset-0 ${
                  isLight 
                    ? 'bg-gradient-to-br from-primary-50/60 via-ds-blue-50/40 to-ds-pink-50/60' 
                    : 'bg-[var(--card-from-bg)]'
                } backdrop-blur-sm`} />
                
                {/* Subtle geometric shapes */}
                <motion.div 
                  className={`absolute -top-8 -end-8 w-24 h-24 rounded-full ${
                    isLight ? 'bg-primary-200/30' : 'bg-primary-400/20'
                  } blur-xl`}
                  animate={{ 
                    scale: isPlaying ? [1, 1.1, 1] : 1,
                    opacity: isPlaying ? [0.3, 0.5, 0.3] : 0.3 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className={`absolute -bottom-6 -start-6 w-20 h-20 rounded-full bg-[var(--primary-glow)] blur-lg`}
                  animate={{ 
                    scale: isPlaying ? [1, 1.2, 1] : 1,
                    opacity: isPlaying ? [0.2, 0.4, 0.2] : 0.2 
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                />
              </div>

              {/* Premium profile image with enhanced styling */}
              <motion.div 
                className="relative mb-4 z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className={`absolute inset-0 rounded-full ${
                  isLight 
                    ? 'bg-gradient-to-br from-primary-200 to-ds-blue-200' 
                    : 'bg-gradient-to-br from-[var(--primary)]/30 to-[var(--gradient-mid)]/30'
                } blur-md scale-110`} />
                
                <Image
                  src="/images/me/ali.png"
                  alt="Ali Al-Zuhairi"
                  width={96}
                  height={96}
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 ${
                    isLight 
                      ? 'border-white/95 shadow-2xl shadow-primary-200/50' 
                      : 'border-[var(--card-border)] shadow-2xl shadow-[var(--primary)]/20'
                  } backdrop-blur-sm ring-2 ${
                    isLight 
                      ? 'ring-primary-100/50' 
                      : 'ring-[var(--primary)]/20'
                  }`}
                  priority
                />
                
                {/* Subtle glow effect */}
                <div className={`absolute inset-0 rounded-full ${
                  isLight 
                    ? 'shadow-lg shadow-primary-300/30' 
                    : 'shadow-lg shadow-[var(--primary-glow)]'
                } pointer-events-none`} />
              </motion.div>

              {/* Modernized episode badge */}
              <motion.div 
                className={`mb-3 px-4 py-2 rounded-full text-sm font-bold ${
                  isLight 
                    ? 'bg-gradient-to-r from-white/95 to-ds-gray-50/95 text-primary-700 shadow-lg shadow-primary-200/30' 
                    : 'bg-gradient-to-r from-black/50 to-ds-gray-900/50 text-white backdrop-blur-lg shadow-lg shadow-black/20'
                } border ${
                  isLight 
                    ? 'border-primary-200/50' 
                    : 'border-white/20'
                } relative overflow-hidden`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`absolute inset-0 ${
                  isLight 
                    ? 'bg-gradient-to-r from-primary-50/50 to-ds-blue-50/50' 
                    : 'bg-gradient-to-r from-primary-900/20 to-ds-blue-900/20'
                } opacity-50`} />
                <span className="relative z-10">
                  EPISODE {availableEpisodes.findIndex(ep => ep.id === currentEpisodeId) + 1}
                </span>
              </motion.div>

              {/* Reserved space for playing indicator and status - Fixed height to prevent layout shifts - Enhanced for mobile */}
              <div className={`flex items-center justify-center mb-2 ${isMobile ? 'h-10' : 'h-8'} overflow-hidden`}>
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div 
                      key="playing"
                      className="flex items-center gap-1.5 h-full"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center h-full"
                          style={{ height: isMobile ? '40px' : '32px' }}
                        >
                          <motion.div
                            className={`${isMobile ? 'w-1.5' : 'w-1'} rounded-full ${
                              isLight ? 'bg-gradient-to-t from-primary-500 to-primary-400' : 'bg-gradient-to-t from-white to-ds-gray-200'
                            } shadow-sm origin-bottom`}
                            style={{ 
                              height: isMobile ? '8px' : '6px',
                              transformOrigin: 'bottom center'
                            }}
                            animate={{
                              scaleY: [1, 2, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: Infinity,
                              delay: i * 0.1,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="ready"
                      className={`${isMobile ? 'text-sm' : 'text-xs'} font-medium ${
                        isLight ? 'text-primary-600/60' : 'text-white/50'
                      } h-full flex items-center justify-center`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      READY TO PLAY
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>      {/* Episode Info Section - Compact with Metadata - Fixed layout to prevent shifts */}
      <div className="px-4 pt-4 pb-2 text-center">
        {/* Title section with fixed height container - Enhanced for mobile */}
        <div className={`flex items-center justify-center gap-2 mb-2 ${isMobile ? 'min-h-[2rem]' : 'min-h-[1.75rem]'}`}>
          <h3 className={`font-bold text-base md:text-lg ${getTextStyle()} truncate ${isMobile ? 'max-w-[180px]' : 'max-w-[160px] md:max-w-[220px]'}`}>
            {currentEpisode?.title || 'Loading...'}
          </h3>
          {showLanguageBadge && (
            <LanguageBadge language={episodeDisplayLanguage} />
          )}
        </div>
        
        {/* Author and Publish Date - Fixed height for mobile consistency */}
        <div className={`flex items-center justify-center gap-3 text-xs md:text-sm ${isLight ? 'text-ds-gray-600' : 'text-ds-gray-400'} mb-2 ${isMobile ? 'min-h-[1.25rem]' : ''}`}>
          <span className="font-medium">{currentEpisode?.metadata?.author || 'Ali Al-Zuhairi'}</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-50"></span>
          <span>{currentEpisode?.publishDate ? new Date(currentEpisode.publishDate).toLocaleDateString(locale === 'fi' ? 'fi-FI' : 'en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          }) : ''}</span>
        </div>
        
        {/* Episode Number only - Duration removed - Fixed height for mobile */}
        <div className={`flex items-center justify-center gap-3 text-xs md:text-sm ${isLight ? 'text-ds-gray-500' : 'text-ds-gray-400'} mb-2 ${isMobile ? 'min-h-[1.25rem]' : ''}`}>
          <span>{locale === 'fi' ? 'Jakso' : 'Episode'} {availableEpisodes.findIndex(ep => ep.id === currentEpisodeId) + 1}/{availableEpisodes.length}</span>
        </div>
        
        {/* Tags - Reserved space for mobile consistency */}
        <div className={`mb-3 ${isMobile ? 'min-h-[2rem]' : ''}`}>
          {currentEpisode?.tags && currentEpisode.tags.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-1">
              {currentEpisode.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className={`px-2 py-1 text-xs rounded-full ${
                    isLight 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'bg-[var(--card-border)] text-[var(--accent-text)]'
                  } border ${
                    isLight 
                      ? 'border-primary-200' 
                      : 'border-[var(--card-border)]'
                  }`}
                >
                  {tag}
                </span>
              ))}
              {currentEpisode.tags.length > 3 && (
                <span className={`text-xs ${isLight ? 'text-ds-gray-500' : 'text-ds-gray-400'}`}>
                  +{currentEpisode.tags.length - 3}
                </span>
              )}
            </div>
          ) : (
            /* Empty space placeholder for consistent spacing */
            <div className="w-full"></div>
          )}
        </div>
        
        {/* Description - Fixed height container for mobile */}
        <div className={`mb-3 ${isMobile ? 'min-h-[2.5rem]' : ''}`}>
          <p className={`text-xs md:text-sm ${isLight ? 'text-ds-gray-600' : 'text-ds-gray-400'} line-clamp-2 leading-relaxed max-w-prose mx-auto`}>
            {currentEpisode?.description || ''}
          </p>
        </div>
      </div>      {/* Progress Section - Modern Mobile Style */}
      {/*
        dir="ltr" is deliberate: the seek handlers below all compute position as
        `clientX - rect.left`, so mirroring the bar in RTL would make dragging
        seek in the opposite direction. Media timelines conventionally stay
        left-to-right in RTL interfaces.
      */}
      <div className="px-4 pb-3 relative z-15" dir="ltr">{/* Main progress bar - Enhanced for mobile touch */}
        <div className="relative w-full mb-3">
          <div 
            ref={progressRef}
            role="slider"
            aria-label={locale === 'fi' ? 'Äänen edistyminen' : 'Audio progress'}
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`}
            tabIndex={0}            className={`w-full ${isMobile ? 'h-4 py-2' : 'h-2'} rounded-full relative overflow-hidden cursor-pointer group ${
              isLight 
                ? 'bg-ds-gray-200' 
                : 'bg-ds-gray-700'
            } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
              isMobile ? 'active:bg-ds-gray-300 dark:active:bg-ds-gray-600 shadow-inner' : ''
            } relative z-10`}
            onClick={handleProgressClick}
            onMouseMove={!isMobile ? handleProgressMouseMove : undefined}
            onMouseEnter={!isMobile ? handleProgressMouseEnter : undefined}
            onMouseLeave={!isMobile ? handleProgressMouseLeave : undefined}
            onTouchStart={(e) => {
              setIsTouching(true);
              const touch = e.touches[0];
              const rect = e.currentTarget.getBoundingClientRect();
              const x = touch.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
              if (audioRef.current && duration > 0) {
                const newTime = (percentage / 100) * duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
                setAnnouncement(`${locale === 'fi' ? 'Siirtyi kohtaan' : 'Seeked to'} ${formatTime(newTime)}`);
              }
            }}
            onTouchMove={(e) => {
              if (!isTouching) return;
              e.preventDefault(); // Prevent scrolling
              const touch = e.touches[0];
              const rect = e.currentTarget.getBoundingClientRect();
              const x = touch.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
              if (audioRef.current && duration > 0) {
                const newTime = (percentage / 100) * duration;
                audioRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }
            }}
            onTouchEnd={() => {
              setIsTouching(false);
            }}
            onKeyDown={(e) => {
              if (!audioRef.current || !duration) return;
              
              let newTime = currentTime;
              const step = duration / 100;
              
              switch (e.key) {
                case 'ArrowLeft':
                  e.preventDefault();
                  newTime = Math.max(0, currentTime - step);
                  break;
                case 'ArrowRight':
                  e.preventDefault();
                  newTime = Math.min(duration, currentTime + step);
                  break;
                case 'Home':
                  e.preventDefault();
                  newTime = 0;
                  break;
                case 'End':
                  e.preventDefault();
                  newTime = duration;
                  break;
                default:
                  return;
              }
              
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
              setAnnouncement(`${locale === 'fi' ? 'Siirtyi kohtaan' : 'Seeked to'} ${formatTime(newTime)}`);
            }}
          >
            {/* Progress fill */}
            <motion.div 
              className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${getAccentColor()}`}
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />            {/* Interactive playhead - Enhanced for mobile */}
            <motion.div
              className={`absolute top-1/2 ${
                isMobile ? 'w-5 h-5' : 'w-4 h-4'
              } rounded-full bg-white shadow-lg border-2 border-[var(--primary)] ${
                isMobile ? 'opacity-100 shadow-xl' : 'opacity-0 group-hover:opacity-100'
              } transition-opacity ${
                isTouching ? 'scale-125 shadow-xl' : ''
              } relative z-20`}
              style={{ 
                left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`, 
                transform: 'translate(-50%, -50%)' 
              }}
              whileHover={!isMobile && !animationsDisabled ? { scale: 1.2 } : {}}
              animate={isTouching && !animationsDisabled ? { scale: 1.3 } : {}}
            />

            {/* Hover preview */}
            <motion.div 
              className="absolute top-0 h-full w-0.5 bg-[var(--primary)]/70 pointer-events-none rounded-full" 
              style={{ left: `${mousePosition}%` }}
              animate={{ opacity: isHovering ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isHovering && duration > 0 && (
                <motion.div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-mono ${
                    isLight ? 'bg-ds-gray-800 text-white' : 'bg-white text-ds-gray-800'
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

        {/* Time display - minimalist */}
        <div className="flex justify-between items-center text-xs font-mono">
          <span className={isLight ? 'text-ds-gray-600' : 'text-ds-gray-400'}>
            {formatTime(currentTime)}
          </span>
          <span className={isLight ? 'text-ds-gray-500' : 'text-ds-gray-500'}>
            {formatTime(duration)}
          </span>
        </div>
      </div>      {/* Controls Section - Compact Mobile Layout */}
      <div className="px-4 pb-3 relative z-20">{/* Main playback controls - Enhanced for mobile */}
        <div className={`flex items-center justify-center ${isMobile ? 'gap-6' : 'gap-4 md:gap-6'} mb-3`}>
          {/* Previous - Larger touch target for mobile */}
          <motion.button
            onClick={goToPreviousEpisode}
            whileTap={animationsDisabled ? {} : { scale: 0.9 }}
            whileHover={animationsDisabled || isMobile ? {} : { scale: 1.1 }}
            className={`${iconControlClassName} relative z-10`}
            disabled={loadError || !canGoPrevious}
            aria-label={locale === 'fi' ? 'Edellinen jakso' : 'Previous episode'}
            onTouchStart={() => setIsTouching(true)}
            onTouchEnd={() => setIsTouching(false)}
          >
            <ButtonIcon name="skip_previous" emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? '2xl' : 'xl'} tone="current" />
          </motion.button>

          {/* Play/Pause - Central button - Enhanced for mobile */}
          <motion.button
            ref={playButtonRef}
            onClick={togglePlay}
            whileTap={animationsDisabled ? {} : { scale: 0.95 }}
            whileHover={animationsDisabled || isMobile ? {} : { scale: 1.05 }}
            className={`${primaryControlClassName} relative z-20`}
            style={primaryControlStyle}
            disabled={loadError}
            aria-label={isPlaying ? (locale === 'fi' ? 'Pysäytä podcast' : 'Pause podcast') : (locale === 'fi' ? 'Toista podcast' : 'Play podcast')}
            onTouchStart={() => {
              setIsTouching(true);
            }}
            onTouchEnd={() => {
              setIsTouching(false);
              const now = Date.now();
              if (now - lastTap < 300) {
                // Double tap detected - could add special behavior
              }
              setLastTap(now);
            }}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.span
                  key="pause"
                  initial={animationsDisabled ? {} : { scale: 0.8, opacity: 0 }}
                  animate={animationsDisabled ? {} : { scale: 1, opacity: 1 }}
                  exit={animationsDisabled ? {} : { scale: 0.8, opacity: 0 }}
                >
                  <ButtonIcon name="pause" emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? '2xl' : 'xl'} tone="current" />
                </motion.span>
              ) : (
                <motion.span
                  key="play"
                  initial={animationsDisabled ? {} : { scale: 0.8, opacity: 0 }}
                  animate={animationsDisabled ? {} : { scale: 1, opacity: 1 }}
                  exit={animationsDisabled ? {} : { scale: 0.8, opacity: 0 }}
                >
                  <ButtonIcon name="play_arrow" emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? '2xl' : 'xl'} tone="current" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>          {/* Next - Enhanced for mobile */}
          <motion.button
            onClick={goToNextEpisode}
            whileTap={animationsDisabled ? {} : { scale: 0.9 }}
            whileHover={animationsDisabled || isMobile ? {} : { scale: 1.1 }}
            className={`${iconControlClassName} relative z-10`}
            disabled={loadError || !canGoNext}
            aria-label={locale === 'fi' ? 'Seuraava jakso' : 'Next episode'}
            onTouchStart={() => setIsTouching(true)}
            onTouchEnd={() => setIsTouching(false)}
          >
            <ButtonIcon name="skip_next" emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? '2xl' : 'xl'} tone="current" />
          </motion.button>
        </div>        {/* Secondary controls row - Enhanced for mobile */}
        <div className={`flex items-center justify-center ${isMobile ? 'gap-4' : 'gap-3'}`}>
          {/* Playback speed - Enhanced for mobile */}
          <motion.button
            onClick={changePlaybackRate}
            whileTap={animationsDisabled ? {} : { scale: 0.9 }}
            whileHover={animationsDisabled || isMobile ? {} : { scale: 1.1 }}
            className={`${pillControlClassName} ${isMobile ? 'text-sm' : 'text-xs'} relative z-10`}
            disabled={loadError}
            aria-label={`${locale === 'fi' ? 'Toistonopeus' : 'Playback speed'} ${playbackRate}x`}
            onTouchStart={() => setIsTouching(true)}
            onTouchEnd={() => setIsTouching(false)}
          >
            <motion.span 
              key={playbackRate}
              initial={animationsDisabled ? {} : { y: -10, opacity: 0 }}
              animate={animationsDisabled ? {} : { y: 0, opacity: 1 }}
            >
              {playbackRate}x
            </motion.span>
          </motion.button>

          {/* Episode list toggle - Enhanced for mobile */}
          <motion.button
            onClick={() => {
              setIsExpanded(!isExpanded);
              setAnnouncement(isExpanded 
                ? (locale === 'fi' ? 'Jaksolista piilotettu' : 'Episode list hidden')
                : (locale === 'fi' ? 'Jaksolista näytetään' : 'Episode list shown')
              );
            }}
            whileTap={animationsDisabled ? {} : { scale: 0.9 }}
            whileHover={animationsDisabled || isMobile ? {} : { scale: 1.1 }}
            className={iconControlClassName}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? (locale === 'fi' ? 'Piilota jaksot' : 'Hide episodes') : (locale === 'fi' ? 'Näytä jaksot' : 'Show episodes')}
            onTouchStart={() => setIsTouching(true)}
            onTouchEnd={() => setIsTouching(false)}
          >
            <motion.span
              animate={animationsDisabled ? {} : { rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ButtonIcon name="expand_more" emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? 'xl' : 'lg'} tone="current" />
            </motion.span>
          </motion.button>

          {/* Stop - Enhanced for mobile */}
          <motion.button
            onClick={stopAudio}
            whileTap={animationsDisabled ? {} : { scale: 0.9 }}
            whileHover={animationsDisabled || isMobile ? {} : { scale: 1.1 }}
            className={iconControlClassName}
            disabled={loadError}
            aria-label={locale === 'fi' ? 'Pysäytä podcast' : 'Stop podcast'}
            onTouchStart={() => setIsTouching(true)}
            onTouchEnd={() => setIsTouching(false)}
          >
            <ButtonIcon name="stop" emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? 'xl' : 'lg'} tone="current" />
          </motion.button>

          {/* Mute - Enhanced for mobile */}
          <motion.button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = !audioRef.current.muted;
                setAnnouncement(audioRef.current.muted 
                  ? (locale === 'fi' ? 'Ääni mykistetty' : 'Audio muted')
                  : (locale === 'fi' ? 'Ääni palautettu' : 'Audio unmuted')
                );
              }
            }}
            whileTap={animationsDisabled ? {} : { scale: 0.9 }}
            whileHover={animationsDisabled || isMobile ? {} : { scale: 1.1 }}
            className={iconControlClassName}
            aria-label={audioRef.current?.muted 
              ? (locale === 'fi' ? 'Poista mykistys' : 'Unmute audio')
              : (locale === 'fi' ? 'Mykistä ääni' : 'Mute audio')
            }
            onTouchStart={() => setIsTouching(true)}
            onTouchEnd={() => setIsTouching(false)}
          >
            <ButtonIcon
              name={audioRef.current?.muted ? 'volume_off' : 'volume_up'}
              emphasis="icon-only"
              buttonSize={isMobile ? 'lg' : 'md'}
              size={isMobile ? 'xl' : 'lg'}
              tone="current"
            />
          </motion.button>
        </div>
      </div>      {/* Episode list (expandable) - Bottom sheet style */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`border-t ${isLight ? 'border-ds-gray-200' : 'border-ds-gray-700'} p-4 pb-6`}>
              <h4 className={`font-semibold text-sm ${getTextStyle()} mb-3 text-center`}>
                {locale === 'fi' ? 'Kaikki jaksot' : 'All Episodes'}
              </h4>
              <EpisodeList
                episodes={podcastEpisodes}
                currentEpisodeId={currentEpisodeId}
                onEpisodeSelect={handleEpisodeSelect}
                className="max-h-64 overflow-y-auto rounded-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Messages Section */}
      {loadError && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`m-4 p-4 rounded-2xl ${
            isLight ? 'bg-ds-error/10 text-ds-error border border-ds-error/20' : 'bg-ds-error/10 text-ds-error border border-ds-error/20'
          } text-sm backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium mb-1">
                {locale === 'fi' ? 'Äänitiedoston latausvirhe' : 'Audio Loading Error'}
              </div>
              <div className="text-xs opacity-75">
                {locale === 'fi' 
                  ? 'Tiedosto voi puuttua tai olla väärässä muodossa'
                  : 'File may be missing or in unsupported format'}
              </div>
              <div className="text-xs mt-1 opacity-50 font-mono">
                {currentAudioFile}
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
              className={`px-3 py-2 text-xs rounded-xl font-medium transition-all duration-200 ${
                isLight 
                  ? 'bg-ds-error hover:bg-ds-error/80 text-white' 
                  : 'bg-ds-error/80 hover:bg-ds-error text-white'
              }`}
            >
              {locale === 'fi' ? 'Yritä uudelleen' : 'Retry'}
            </motion.button>
          </div>
        </motion.div>
      )}

      {!currentAudioFile && !loadError && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`m-4 p-4 rounded-2xl ${
            isLight ? 'bg-ds-gold-50 text-ds-gold-700 border border-ds-gold-200' : 'bg-ds-gold-900/20 text-ds-gold-400 border border-ds-gold-800/50'
          } text-sm backdrop-blur-sm text-center`}
        >
          <div className="font-medium mb-1">
            {locale === 'fi' ? 'Ei äänitiedostoa' : 'No Audio Available'}
          </div>
          <div className="text-xs opacity-75">
            {locale === 'fi' 
              ? 'Tälle jaksolle ei ole saatavilla äänitiedostoa valitulla kielellä'
              : 'No audio file available for this episode in the selected language'}
          </div>
        </motion.div>
      )}

      {/* LiveRegion for screen reader announcements */}
      <LiveRegion message={announcement} />
    </motion.div>
  );
};



export default PodcastPlayer;
