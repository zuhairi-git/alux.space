'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  src: string;
  title?: string;
  category?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, category }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loadError, setLoadError] = useState(false);  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTime, setPreviewTime] = useState(0);
  const [bufferedRanges, setBufferedRanges] = useState<{start: number, end: number}[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState<{
    position: 'top' | 'bottom' | 'left' | 'right';
    alignment: 'start' | 'center' | 'end';
  }>({ position: 'top', alignment: 'end' });
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  
  // Theme-aware styling
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  // Generate dynamic waveform data
  const waveformBars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      baseHeight: Math.random() * 20 + 8,
      delay: Math.random() * 0.5,
      duration: 0.8 + Math.random() * 0.7,
    }));  }, []);

  // Theme-specific colors and styles
  const getThemeStyles = (): {
    container: string;
    waveformActive: string;
    waveformInactive: string;
    progressGradient: string;
    playButton: string;
    controlButton: string;
    backgroundGlow: string;
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
  } => {
    switch (theme) {
      case 'light':
        return {
          container: 'bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-200/80',
          waveformActive: 'from-blue-500 to-indigo-600',
          waveformInactive: 'bg-gray-300/50',
          progressGradient: 'from-blue-500 via-indigo-500 to-purple-500',
          playButton: 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25',
          controlButton: 'bg-white/80 hover:bg-white border border-gray-200 text-gray-700 hover:text-blue-600 shadow-sm hover:shadow-md',
          backgroundGlow: 'from-blue-500/5 via-indigo-500/5 to-purple-500/5',
          textPrimary: 'text-gray-900',
          textSecondary: 'text-gray-600',
          textAccent: 'text-blue-600',
        };
      case 'dark':
        return {
          container: 'bg-gray-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-gray-700/50',
          waveformActive: 'from-blue-400 to-purple-500',
          waveformInactive: 'bg-gray-600/30',
          progressGradient: 'from-blue-400 via-purple-500 to-pink-500',
          playButton: 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-purple-500/25',
          controlButton: 'bg-gray-800/80 hover:bg-gray-700 border border-gray-600 text-gray-300 hover:text-white shadow-sm hover:shadow-lg',
          backgroundGlow: 'from-blue-500/10 via-purple-500/10 to-pink-500/10',
          textPrimary: 'text-white',
          textSecondary: 'text-gray-300',
          textAccent: 'text-purple-400',
        };
      case 'colorful':
        return {
          container: 'bg-gray-900/80 shadow-[0_20px_60px_rgba(255,0,204,0.15)] border border-purple-500/30',
          waveformActive: 'from-cyan-400 to-fuchsia-500',
          waveformInactive: 'bg-purple-500/20',
          progressGradient: 'from-cyan-400 via-fuchsia-500 to-blue-500',
          playButton: 'bg-gradient-to-br from-cyan-400 to-fuchsia-500 hover:from-cyan-500 hover:to-fuchsia-600 shadow-lg shadow-fuchsia-500/30',
          controlButton: 'bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/40 text-gray-200 hover:text-white shadow-sm hover:shadow-lg hover:shadow-purple-500/20',
          backgroundGlow: 'from-cyan-500/15 via-fuchsia-500/15 to-blue-500/15',
          textPrimary: 'text-white',
          textSecondary: 'text-gray-300',
          textAccent: 'text-fuchsia-400',        };
      default:
        // Default to colorful theme
        return {
          container: 'bg-gray-900/80 shadow-[0_20px_60px_rgba(255,0,204,0.15)] border border-purple-500/30',
          waveformActive: 'from-cyan-400 to-fuchsia-500',
          waveformInactive: 'bg-purple-500/20',
          progressGradient: 'from-cyan-400 via-fuchsia-500 to-blue-500',
          playButton: 'bg-gradient-to-br from-cyan-400 to-fuchsia-500 hover:from-cyan-500 hover:to-fuchsia-600 shadow-lg shadow-fuchsia-500/30',
          controlButton: 'bg-purple-900/50 hover:bg-purple-800/60 border border-purple-500/40 text-gray-200 hover:text-white shadow-sm hover:shadow-lg hover:shadow-purple-500/20',
          backgroundGlow: 'from-cyan-500/15 via-fuchsia-500/15 to-blue-500/15',
          textPrimary: 'text-white',
          textSecondary: 'text-gray-300',
          textAccent: 'text-fuchsia-400',
        };
    }
  };

  const styles = getThemeStyles();
  // Audio loading and event handling
  useEffect(() => {
    console.log('AudioPlayer: Initializing with src:', src);
    const audio = audioRef.current;
    if (!audio) {
      console.error('AudioPlayer: Audio ref is null');
      return;
    }

    if (!src) {
      console.error("AudioPlayer: Failed to load audio file", { src: "Source is empty or undefined" });
      setLoadError(true);
      return;
    }

    // Reset state on mount
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadError(false);
    setBufferedRanges([]);
    console.log('AudioPlayer: State reset');
    
    const handleLoadedData = () => {
      console.log('AudioPlayer: Audio loaded successfully, duration:', audio.duration);
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleProgress = () => {
      const buffered = audio.buffered;
      const ranges: {start: number, end: number}[] = [];
      for (let i = 0; i < buffered.length; i++) {
        ranges.push({
          start: buffered.start(i),
          end: buffered.end(i)
        });
      }
      setBufferedRanges(ranges);
    };
    
    const handleError = (e: ErrorEvent) => {
      console.error("AudioPlayer: Failed to load audio file", {
        src,
        error: e,
        audioElement: audio,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      setLoadError(true);
    };
    
    const handleEnded = () => {
      console.log('AudioPlayer: Playback ended');
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    // Add event listeners
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('error', handleError as EventListener);
    audio.addEventListener('ended', handleEnded);
    
    console.log('AudioPlayer: Event listeners attached');

    // Attempt to load
    audio.src = src;
    audio.load();
    console.log('AudioPlayer: Load method called');

    // Cleanup
    return () => {
      console.log('AudioPlayer: Cleaning up event listeners');
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('error', handleError as EventListener);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);
  // Audio control functions
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!audioRef.current || loadError) return;
    
    console.log('AudioPlayer: Toggle play, current state:', isPlaying ? 'playing' : 'paused');
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      console.log('AudioPlayer: Paused');
    } else {
      console.log('AudioPlayer: Attempting to play');
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log('AudioPlayer: Playing successfully');
          })
          .catch((error) => {
            console.error("AudioPlayer: Play failed:", error);
            setTimeout(() => {
              if (audioRef.current) {
                console.log('AudioPlayer: Attempting to play again after delay');
                audioRef.current.play()
                  .then(() => {
                    setIsPlaying(true);
                    console.log('AudioPlayer: Second attempt succeeded');
                  })
                  .catch((error) => {
                    console.error("AudioPlayer: Second play attempt failed:", error);
                  });
              }
            }, 300);
          });
      }
    }
  };

  const stopAudio = () => {
    if (!audioRef.current || loadError) return;
    
    console.log('AudioPlayer: Stopping audio');
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const changePlaybackRate = () => {
    if (!audioRef.current || loadError) return;
    
    const rates = [1, 1.5, 2, 3];
    const nextRateIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const newRate = rates[nextRateIndex];
    
    console.log(`AudioPlayer: Changing playback rate from ${playbackRate}x to ${newRate}x`);
    audioRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current || loadError) return;
    
    const newTime = parseFloat(e.target.value);
    console.log(`AudioPlayer: Seeking to ${newTime}s`);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressBarHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;
    setPreviewTime(time);
    setShowPreview(true);
  };

  const handleProgressBarLeave = () => {
    setShowPreview(false);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration || loadError) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  // Share functionality
  const getFullAudioUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
    return `${baseUrl}${src}`;
  };

  const getShareableUrl = () => {
    return getFullAudioUrl();
  };

  const copyAudioLink = async () => {
    try {
      const shareUrl = getShareableUrl();
      await navigator.clipboard.writeText(shareUrl);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy audio link:', err);
      const shareUrl = getShareableUrl();
      prompt('Copy this audio link:', shareUrl);
    }
  };

  const shareToSocialMedia = (platform: string) => {
    const shareUrl = getShareableUrl();
    const text = `${category ? `${category}: ` : ''}${title || 'Audio'}`;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`,
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  const downloadAudio = () => {
    const audioUrl = getFullAudioUrl();
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = audioUrl.split('/').pop() || 'audio.wav';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateDropdownPosition = () => {
    if (!shareButtonRef.current) return;

    const button = shareButtonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Dropdown dimensions (estimated)
    const dropdownWidth = 250;
    const dropdownHeight = 320; // Approximate height based on number of menu items

    // Calculate available space in each direction
    const spaceAbove = buttonRect.top;
    const spaceBelow = viewport.height - buttonRect.bottom;
    const spaceLeft = buttonRect.left;
    const spaceRight = viewport.width - buttonRect.right;

    let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
    let alignment: 'start' | 'center' | 'end' = 'end';

    // Prioritize vertical positioning (top/bottom) first
    if (spaceAbove >= dropdownHeight) {
      position = 'top';
    } else if (spaceBelow >= dropdownHeight) {
      position = 'bottom';
    } else if (spaceRight >= dropdownWidth) {
      position = 'right';
      // For right positioning, check vertical alignment
      if (buttonRect.top + dropdownHeight > viewport.height) {
        alignment = 'end';
      } else if (buttonRect.bottom - dropdownHeight < 0) {
        alignment = 'start';
      } else {
        alignment = 'center';
      }
    } else if (spaceLeft >= dropdownWidth) {
      position = 'left';
      // For left positioning, check vertical alignment
      if (buttonRect.top + dropdownHeight > viewport.height) {
        alignment = 'end';
      } else if (buttonRect.bottom - dropdownHeight < 0) {
        alignment = 'start';
      } else {
        alignment = 'center';
      }
    } else {
      // Fallback: use the direction with most space
      const maxSpace = Math.max(spaceAbove, spaceBelow, spaceLeft, spaceRight);
      if (maxSpace === spaceAbove) {
        position = 'top';
      } else if (maxSpace === spaceBelow) {
        position = 'bottom';
      } else if (maxSpace === spaceRight) {
        position = 'right';
        alignment = 'center';
      } else {
        position = 'left';
        alignment = 'center';
      }
    }

    // For top/bottom positioning, check horizontal alignment
    if (position === 'top' || position === 'bottom') {
      if (buttonRect.right - dropdownWidth < 0) {
        alignment = 'start';
      } else if (buttonRect.left + dropdownWidth > viewport.width) {
        alignment = 'end';
      } else {
        alignment = 'end'; // Default to end alignment
      }
    }

    setDropdownPosition({ position, alignment });
  };  // Calculate dropdown position when opening
  useEffect(() => {
    if (showShareMenu) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        calculateDropdownPosition();
      }, 10);
      
      // Recalculate on window resize and orientation change
      const handleResize = () => {
        setTimeout(() => {
          calculateDropdownPosition();
        }, 100); // Debounce resize events
      };
      
      const handleOrientationChange = () => {
        setTimeout(() => {
          calculateDropdownPosition();
        }, 300); // Wait for orientation change to complete
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientationChange);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }
  }, [showShareMenu]);// Get animation direction based on dropdown position
  const getDropdownAnimation = () => {
    const { position } = dropdownPosition;
    
    const animations = {
      top: { initial: { opacity: 0, y: 10, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 10, scale: 0.9 } },
      bottom: { initial: { opacity: 0, y: -10, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -10, scale: 0.9 } },
      left: { initial: { opacity: 0, x: 10, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 10, scale: 0.9 } },
      right: { initial: { opacity: 0, x: -10, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -10, scale: 0.9 } }
    };

    return animations[position];
  };

  const retryLoading = () => {
    if (!audioRef.current) return;
    
    console.log('AudioPlayer: Retrying audio load');
    setLoadError(false);
    
    try {
      audioRef.current.src = src;
      audioRef.current.load();
      console.log('AudioPlayer: Retry load initiated');
    } catch (err) {
      console.error("AudioPlayer: Retry loading failed:", err);
      setLoadError(true);
    }
  };  // Component lifecycle effects
  useEffect(() => {
    console.log('AudioPlayer: Component mounted');
    return () => {
      console.log('AudioPlayer: Component unmounted');
    };
  }, []);  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showShareMenu && !(event.target as Element).closest('[data-share-menu]')) {
        console.log('AudioPlayer: Closing share menu - clicked outside');
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      // Add a small delay to prevent immediate closure when opening
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [showShareMenu]);

  // Calculate progress percentage for visual elements
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}      className={`relative w-full rounded-2xl p-6 mb-6 backdrop-blur-2xl ${styles.container}`}
      aria-label="Enhanced Audio Player"
      style={{ overflow: 'visible', zIndex: 1 }}
    >      {/* Dynamic background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none rounded-2xl">
        <motion.div 
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br ${styles.backgroundGlow} blur-3xl`}
          animate={isPlaying ? {
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className={`absolute bottom-16 -right-32 w-80 h-80 rounded-full bg-gradient-to-br ${styles.backgroundGlow} blur-3xl`}
          animate={isPlaying ? {
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0],
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto" />
      
      {/* Error state */}
      {loadError && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${isLight ? 'bg-red-50 border-red-200 text-red-700' : 'bg-red-900/20 border-red-800 text-red-300'} border rounded-2xl p-4 mb-6 flex items-center space-x-3`}
        >
          <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="font-medium">Unable to load audio file</p>
            <p className="text-sm opacity-80 mt-1">Please check the file path and try again</p>
          </div>
          <button 
            onClick={retryLoading}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isLight 
                ? 'bg-red-100 hover:bg-red-200 text-red-700' 
                : 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
            }`}
          >
            Retry
          </button>
        </motion.div>
      )}      {/* Header section */}
      <div className="mb-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <motion.div 
              className="flex items-center space-x-3 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${styles.progressGradient}`} />
              <span className={`text-sm uppercase tracking-wider font-medium ${styles.textSecondary}`}>
                {category || 'Audio Content'}
              </span>
            </motion.div>            <motion.h3 
              className={`text-xl font-bold ${styles.textPrimary}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title || 'Untitled Audio'}
            </motion.h3>
          </div>
          
          {/* Language indicator */}
          <motion.div 
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              isLight 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : isColorful
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-blue-900/30 text-blue-300 border border-blue-800'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            title={t('blog.aria.audioLanguage')}
          >
            EN
          </motion.div>
        </div>
      </div>      {/* Dynamic waveform visualization */}
      <motion.div 
        className="h-12 flex items-end justify-center gap-1 mb-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {waveformBars.map((bar) => (
          <motion.div
            key={bar.id}
            className={`w-1.5 rounded-full ${
              isPlaying 
                ? `bg-gradient-to-t ${styles.waveformActive}` 
                : styles.waveformInactive
            }`}
            animate={isPlaying ? {
              height: [
                bar.baseHeight,
                Math.random() * 40 + 8,
                bar.baseHeight,
                Math.random() * 35 + 10,
                bar.baseHeight
              ],
              opacity: [0.6, 1, 0.8, 1, 0.6]
            } : {
              height: bar.baseHeight * 0.3,
              opacity: 0.3
            }}
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: bar.delay,
              ease: "easeInOut"
            }}
            style={{ height: bar.baseHeight }}
          />
        ))}
        
        {/* Waveform glow effect */}
        {isPlaying && (
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${styles.waveformActive} opacity-20 blur-xl`}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>      {/* Enhanced progress bar with buffering and preview */}
      <div className="relative mb-4 z-10">
        <motion.div 
          className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer group"
          onMouseMove={handleProgressBarHover}
          onMouseLeave={handleProgressBarLeave}
          onClick={handleProgressBarClick}
          whileHover={{ height: 16 }}
          transition={{ duration: 0.2 }}
        >
          {/* Buffered ranges */}
          {bufferedRanges.map((range, index) => (
            <div
              key={index}
              className="absolute top-0 h-full bg-gray-300 dark:bg-gray-600 opacity-50"
              style={{
                left: `${(range.start / duration) * 100}%`,
                width: `${((range.end - range.start) / duration) * 100}%`
              }}
            />
          ))}
          
          {/* Progress gradient */}
          <motion.div 
            className={`absolute top-0 left-0 h-full bg-gradient-to-r ${styles.progressGradient} rounded-full`}
            style={{ width: `${progressPercentage}%` }}
            animate={isPlaying ? {
              boxShadow: [
                '0 0 10px rgba(var(--progress-color), 0.3)',
                '0 0 20px rgba(var(--progress-color), 0.6)',
                '0 0 10px rgba(var(--progress-color), 0.3)'
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Preview timestamp */}
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`absolute -top-10 px-2 py-1 rounded text-xs font-medium ${
                  isLight 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-900'
                } shadow-lg`}
                style={{ left: `${(previewTime / duration) * 100}%`, transform: 'translateX(-50%)' }}
              >
                {formatTime(previewTime)}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent ${
                  isLight ? 'border-t-gray-900' : 'border-t-white'
                }`} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Hidden range input for accessibility */}
          <input
            type="range"
            value={currentTime}
            min="0"
            max={duration || 0}
            step="0.01"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleSeek}
            aria-label="Seek audio timeline"
            disabled={loadError}
          />
        </motion.div>
      </div>      {/* Enhanced control panel */}
      <div className="flex items-center justify-between relative z-10" style={{ overflow: 'visible' }}>
        <div className="flex items-center space-x-4 relative" style={{ overflow: 'visible' }}>          {/* Main play/pause button */}
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className={`relative w-14 h-14 flex items-center justify-center rounded-full ${styles.playButton} backdrop-blur-md overflow-hidden group transition-all duration-300`}
            disabled={loadError}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {/* Button glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              animate={isPlaying ? {
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.6)',
                  '0 0 20px rgba(59, 130, 246, 0.3)'
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <AnimatePresence mode="wait">
              {isPlaying ? (                <motion.svg 
                  key="pause"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-7 h-7 text-white relative z-10" 
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
                  className="w-7 h-7 text-white relative z-10" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </motion.svg>
              )}
            </AnimatePresence>
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={isPlaying ? {
                scale: [1, 1.5],
                opacity: [0.5, 0]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.button>
          
          {/* Secondary controls */}
          <div className="flex items-center space-x-3">
            {/* Stop button */}
            <motion.button
              onClick={stopAudio}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`w-12 h-12 flex items-center justify-center rounded-full ${styles.controlButton} backdrop-blur-md transition-all duration-200`}
              disabled={loadError}
              aria-label="Stop"
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </motion.svg>
            </motion.button>
            
            {/* Playback rate */}
            <motion.button
              onClick={changePlaybackRate}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center justify-center px-4 h-10 rounded-full ${styles.controlButton} backdrop-blur-md text-sm font-semibold transition-all duration-200`}
              disabled={loadError}
              aria-label={`Change playback speed, currently ${playbackRate}x`}
            >
              <motion.span 
                key={playbackRate}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className={styles.textAccent}
              >
                {playbackRate}×
              </motion.span>
            </motion.button>
              {/* Share button */}
            <div className="relative">              <motion.button
                ref={shareButtonRef}                onClick={(e) => {
                  e.stopPropagation();
                  console.log('AudioPlayer: Share button clicked, current state:', showShareMenu);
                  setShowShareMenu(!showShareMenu);
                }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className={`w-12 h-12 flex items-center justify-center rounded-full ${styles.controlButton} backdrop-blur-md transition-all duration-200`}
                disabled={loadError}
                aria-label={t('blog.aria.shareAudio')}
                data-share-menu
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showShareMenu ? 15 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </motion.svg>
              </motion.button>              {/* Enhanced share menu with screen-aware positioning */}              <AnimatePresence>
                {showShareMenu && (
                  <>
                    {/* Invisible backdrop for better layering */}
                    <div className="fixed inset-0 z-[999998]" style={{ pointerEvents: 'none' }} />
                    
                    <motion.div
                      {...getDropdownAnimation()}
                      className={`absolute ${styles.container} rounded-2xl backdrop-blur-2xl p-4 min-w-[250px] shadow-2xl`}
                      data-share-menu
                      transition={{ 
                        duration: 0.2, 
                        ease: "easeOut",
                        opacity: { duration: 0.15 },
                        scale: { duration: 0.2 }
                      }}style={{
                      zIndex: 999999,
                      position: 'absolute',
                      ...((() => {
                        const { position, alignment } = dropdownPosition;
                        const dropdownWidth = 250;
                        const dropdownHeight = 320;
                        
                        switch (position) {
                          case 'top':
                            const topY = -dropdownHeight - 16;
                            switch (alignment) {
                              case 'start':
                                return { top: topY, left: 0 };
                              case 'center':
                                return { top: topY, left: '50%', transform: 'translateX(-50%)' };
                              case 'end':
                                return { top: topY, right: 0 };
                            }
                            break;
                            
                          case 'bottom':
                            const bottomY = 60; // Height of button + margin
                            switch (alignment) {
                              case 'start':
                                return { top: bottomY, left: 0 };
                              case 'center':
                                return { top: bottomY, left: '50%', transform: 'translateX(-50%)' };
                              case 'end':
                                return { top: bottomY, right: 0 };
                            }
                            break;
                            
                          case 'left':
                            const leftX = -dropdownWidth - 16;
                            switch (alignment) {
                              case 'start':
                                return { top: 0, left: leftX };
                              case 'center':
                                return { top: '50%', left: leftX, transform: 'translateY(-50%)' };
                              case 'end':
                                return { bottom: 0, left: leftX };
                            }
                            break;
                            
                          case 'right':
                            const rightX = 60; // Width of button + margin
                            switch (alignment) {
                              case 'start':
                                return { top: 0, left: rightX };
                              case 'center':
                                return { top: '50%', left: rightX, transform: 'translateY(-50%)' };
                              case 'end':
                                return { bottom: 0, left: rightX };
                            }
                            break;
                        }
                        return { top: 60, right: 0 }; // Default fallback
                      })())                    }}
                  >
                    {/* Dynamic arrow indicator pointing to share button */}
                    <div 
                      className="absolute"
                      style={{
                        ...((() => {
                          const { position } = dropdownPosition;
                          switch (position) {
                            case 'top':
                              return {
                                bottom: '-8px',
                                left: '20px',
                                transform: 'translateX(-50%)'
                              };
                            case 'bottom':
                              return {
                                top: '-8px',
                                left: '20px',
                                transform: 'translateX(-50%)'
                              };
                            case 'left':
                              return {
                                right: '-8px',
                                top: '20px',
                                transform: 'translateY(-50%)'
                              };
                            case 'right':
                              return {
                                left: '-8px',
                                top: '20px',
                                transform: 'translateY(-50%)'
                              };
                          }
                        })())
                      }}
                    >
                      <div className={`w-0 h-0 ${
                        dropdownPosition.position === 'top' ? `border-l-2 border-r-2 border-t-4 border-transparent ${isLight ? 'border-t-white' : 'border-t-gray-800'}` :
                        dropdownPosition.position === 'bottom' ? `border-l-2 border-r-2 border-b-4 border-transparent ${isLight ? 'border-b-white' : 'border-b-gray-800'}` :
                        dropdownPosition.position === 'left' ? `border-t-2 border-b-2 border-l-4 border-transparent ${isLight ? 'border-l-white' : 'border-l-gray-800'}` :
                        `border-t-2 border-b-2 border-r-4 border-transparent ${isLight ? 'border-r-white' : 'border-r-gray-800'}`
                      }`} />
                    </div>
                    
                    <div className="space-y-2">
                        <button
                          onClick={copyAudioLink}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${styles.controlButton} transition-all duration-200 hover:scale-105`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {t('blog.aria.copyAudioLink')}
                        </button>
                        
                        <button
                          onClick={() => shareToSocialMedia('twitter')}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${styles.controlButton} transition-all duration-200 hover:scale-105`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          Share on Twitter
                        </button>
                          <button
                          onClick={() => shareToSocialMedia('whatsapp')}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${styles.controlButton} transition-all duration-200 hover:scale-105`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                          Share on WhatsApp
                        </button>
                        
                        <button
                          onClick={() => shareToSocialMedia('linkedin')}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${styles.controlButton} transition-all duration-200 hover:scale-105`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          Share on LinkedIn
                        </button>
                        
                        <button
                          onClick={() => shareToSocialMedia('facebook')}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${styles.controlButton} transition-all duration-200 hover:scale-105`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          Share on Facebook
                        </button>
                        
                        <div className={`border-t ${isLight ? 'border-gray-200' : 'border-gray-700'} my-2`} />
                        
                        <button
                          onClick={downloadAudio}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${styles.controlButton} transition-all duration-200 hover:scale-105`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>                          {t('blog.aria.downloadAudio')}                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>{/* Enhanced time display with duration counter */}
        <motion.div 
          className={`flex items-center space-x-3 px-4 py-2 rounded-full backdrop-blur-md ${styles.controlButton}`}
          whileHover={{ scale: 1.05 }}
        >
          <div className={`text-sm font-mono ${styles.textAccent}`}>
            {formatTime(currentTime)}
          </div>
          <div className={`w-1 h-1 rounded-full ${styles.textSecondary}`} />
          <div className={`text-sm font-mono ${styles.textSecondary}`}>
            {formatTime(duration)}
          </div>
        </motion.div>
      </div>

      {/* Success message for copied link */}
      <AnimatePresence>
        {showCopiedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={`absolute top-4 right-4 px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-md ${
              isLight 
                ? 'bg-green-100/90 text-green-700 border border-green-200' 
                : 'bg-green-900/30 text-green-300 border border-green-800'
            } shadow-xl z-50`}
          >
            ✓ {t('blog.aria.audioLinkCopied')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AudioPlayer;