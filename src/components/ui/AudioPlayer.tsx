'use client';

import React, { useState, useRef, useEffect, useMemo, useImperativeHandle, forwardRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { useIsMobile, useAnimationsDisabled } from '@/utils/deviceUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { durationSeconds, delaySeconds } from '@/design-system';
import Badge from '@/components/ui/Badge';
import Button, { ButtonIcon } from './Button';

interface AudioPlayerProps {
  src: string;
  title?: string;
  category?: string;
  language?: 'en' | 'fi' | 'ar';
  availableLanguages?: string[];
}

export interface AudioPlayerRef {
  play: () => void;
  pause: () => void;
  stop: () => void;
  togglePlay: () => void;
  isPlaying: boolean;
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(({ src, title, category, language = 'en', availableLanguages = [] }, ref) => {
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
  const [isMuted, setIsMuted] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    position: 'top' | 'bottom' | 'left' | 'right';
    alignment: 'start' | 'center' | 'end';
  }>({ position: 'top', alignment: 'end' });
  
  // Enhanced mobile states
  const [isTouching, setIsTouching] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const isMobile = useIsMobile();
  const animationsDisabled = useAnimationsDisabled();
  const circularControlClassName = `${isMobile ? 'w-12 h-12 min-w-[48px] min-h-[48px]' : 'w-12 h-12'} flex items-center justify-center rounded-full border transition-all duration-200 relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] [background:color-mix(in_srgb,var(--card-from-bg)_88%,transparent)] [border-color:color-mix(in_srgb,var(--card-border)_92%,transparent)] text-[color:color-mix(in_srgb,var(--foreground)_76%,transparent)] hover:text-[var(--primary)] hover:[background:color-mix(in_srgb,var(--primary)_11%,var(--card-from-bg))] hover:[border-color:color-mix(in_srgb,var(--primary)_24%,var(--card-border))] shadow-[0_12px_24px_-20px_color-mix(in_srgb,var(--card-shadow-color)_75%,transparent)] disabled:opacity-40 disabled:cursor-not-allowed ${isMobile ? 'active:[background:color-mix(in_srgb,var(--primary)_14%,var(--card-from-bg))]' : ''}`;
  const pillControlClassName = `${isMobile ? 'px-4 h-12 min-w-[64px] min-h-[48px]' : 'px-4 h-10'} flex items-center justify-center rounded-full border text-sm font-semibold transition-all duration-200 relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] [background:color-mix(in_srgb,var(--card-from-bg)_88%,transparent)] [border-color:color-mix(in_srgb,var(--card-border)_92%,transparent)] text-[var(--primary)] hover:[background:color-mix(in_srgb,var(--primary)_11%,var(--card-from-bg))] hover:[border-color:color-mix(in_srgb,var(--primary)_24%,var(--card-border))] shadow-[0_12px_24px_-20px_color-mix(in_srgb,var(--card-shadow-color)_75%,transparent)] disabled:opacity-40 disabled:cursor-not-allowed ${isMobile ? 'active:[background:color-mix(in_srgb,var(--primary)_14%,var(--card-from-bg))]' : ''}`;
  const primaryControlClassName = `${isMobile ? 'w-16 h-16 min-w-[64px] min-h-[64px]' : 'w-14 h-14'} flex items-center justify-center rounded-full text-[var(--text-on-primary)] shadow-[0_20px_40px_-20px_color-mix(in_srgb,var(--primary)_76%,transparent)] backdrop-blur-md overflow-hidden group transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[color:color-mix(in_srgb,var(--primary)_36%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${isMobile ? 'active:shadow-[0_24px_44px_-18px_color-mix(in_srgb,var(--primary)_82%,transparent)]' : ''}`;
  const primaryControlStyle = {
    backgroundImage: 'linear-gradient(135deg, var(--primary-400) 0%, var(--primary) 52%, var(--primary-700) 100%)',
  } satisfies React.CSSProperties;

  // Generate dynamic waveform data
  const waveformBars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      baseHeight: Math.random() * 20 + 8,
      delay: Math.random() * 0.5,
      duration: 0.8 + Math.random() * 0.7,
    }));
  }, []);

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

  const toggleMute = () => {
    if (!audioRef.current || loadError) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
    console.log(`AudioPlayer: ${newMuted ? 'Muted' : 'Unmuted'}`);
  };

  // Expose audio control functions via ref
  useImperativeHandle(ref, () => ({
    play: () => {
      if (!audioRef.current || loadError) return;
      if (!isPlaying) {
        togglePlay();
      }
    },
    pause: () => {
      if (!audioRef.current || loadError) return;
      if (isPlaying) {
        togglePlay();
      }
    },
    stop: stopAudio,
    togglePlay,
    isPlaying
  }));

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
  return (    <motion.div      initial={animationsDisabled ? {} : { opacity: 0, y: 20 }}
      animate={animationsDisabled ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}      className={`relative w-full rounded-2xl ${isMobile ? 'p-4' : 'p-6'} mb-6 backdrop-blur-2xl bg-[var(--card-from-bg)] border border-[var(--card-border)] shadow-2xl podcast-player`}
      aria-label="Enhanced Audio Player"
      style={{ overflow: 'visible', zIndex: 100, position: 'relative' }}
      data-podcast-player="true"
      data-audio-player="true"
    >      {/* Dynamic background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none rounded-2xl" style={{ zIndex: -1 }}>
        <motion.div 
          className={`absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-gradient-start/5 via-gradient-mid/5 to-gradient-end/5 blur-3xl`}
          animate={isPlaying && !animationsDisabled ? {
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
          className={`absolute bottom-16 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-gradient-start/5 via-gradient-mid/5 to-gradient-end/5 blur-3xl`}
          animate={isPlaying && !animationsDisabled ? {
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
          className="bg-[var(--color-error-bg)] border border-[var(--color-error-border)] text-[var(--color-error)] rounded-2xl p-4 mb-6 flex items-center space-x-3"
        >
          <svg className="w-6 h-6 text-ds-error flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="font-medium">Unable to load audio file</p>
            <p className="text-sm opacity-80 mt-1">Please check the file path and try again</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={retryLoading}
          >
            Retry
          </Button>
        </motion.div>
      )}      {/* Header section */}
      <div className="mb-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <motion.div 
              className="flex items-center space-x-3 mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delaySeconds.md }}
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--primary-500)] via-[var(--gradient-mid)] to-[var(--gradient-end)]" />
              <span className="text-sm uppercase tracking-wider font-medium text-foreground/60">
                {category || 'Audio Content'}
              </span>
            </motion.div>            <motion.h3 
              className="text-xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delaySeconds.lg }}
            >
              {title || 'Untitled Audio'}
            </motion.h3>
          </div>
          
          {/* Language indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delaySeconds['2xl'] }}
            whileHover={{ scale: 1.05 }}
            title={availableLanguages.length > 1 ? `Available in ${availableLanguages.length} languages` : `Audio language: ${language.toUpperCase()}`}
          >
            <Badge variant={availableLanguages.length > 1 ? 'info' : 'outline'}>
              {availableLanguages.length > 1
                ? availableLanguages.map(lang => lang.toUpperCase()).join('+')
                : language.toUpperCase()
              }
            </Badge>
          </motion.div>
        </div>
      </div>      {/* Dynamic waveform visualization */}
      <motion.div 
        className="h-12 flex items-end justify-center gap-1 mb-4 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delaySeconds['3xl'] }}
      >
        {waveformBars.map((bar) => (
          <motion.div
            key={bar.id}
            className={`w-1.5 rounded-full ${
              isPlaying 
                ? 'bg-gradient-to-t from-[var(--primary-500)] to-[var(--gradient-mid)]'
                : 'bg-[var(--card-border)]'
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
            className="absolute inset-0 bg-gradient-to-r from-[var(--primary-500)] to-[var(--gradient-mid)] opacity-20 blur-xl"
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
      </motion.div>      {/* Enhanced progress bar with buffering and preview - Mobile optimized */}
      <div className="relative mb-4 z-10">
        <motion.div 
          className={`relative ${isMobile ? 'h-4 py-2' : 'h-3'} bg-ds-gray-200 dark:bg-ds-gray-700 rounded-full overflow-hidden cursor-pointer group`}
          onMouseMove={!isMobile ? handleProgressBarHover : undefined}
          onMouseLeave={!isMobile ? handleProgressBarLeave : undefined}
          onClick={handleProgressBarClick}
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
          whileHover={!isMobile && !animationsDisabled ? { height: 16 } : {}}
          transition={{ duration: durationSeconds.brisk }}
        >
          {/* Buffered ranges */}
          {bufferedRanges.map((range, index) => (
            <div
              key={index}
              className="absolute top-0 h-full bg-ds-gray-300 dark:bg-ds-gray-600 opacity-50"
              style={{
                left: `${(range.start / duration) * 100}%`,
                width: `${((range.end - range.start) / duration) * 100}%`
              }}
            />
          ))}
            {/* Progress gradient - Enhanced visual feedback */}
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--primary-500)] via-[var(--gradient-mid)] to-[var(--gradient-end)] rounded-full"
            style={{ width: `${progressPercentage}%` }}
            animate={isPlaying && !animationsDisabled ? {
              boxShadow: [
                '0 0 10px rgba(var(--progress-color), 0.3)',
                '0 0 20px rgba(var(--progress-color), 0.6)',
                '0 0 10px rgba(var(--progress-color), 0.3)'
              ]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Touch-friendly playhead indicator for mobile */}
          {isMobile && (
            <motion.div
              className="absolute top-2/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-primary-500 opacity-100"
              style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)' }}
              animate={isTouching && !animationsDisabled ? { scale: 1.3 } : {}}
              transition={{ duration: durationSeconds.brisk }}
            />
          )}
          
          {/* Preview timestamp - Desktop only */}
          <AnimatePresence>
            {showPreview && !isMobile && (
              <motion.div
                initial={animationsDisabled ? {} : { opacity: 0, y: 10 }}
                animate={animationsDisabled ? {} : { opacity: 1, y: 0 }}
                exit={animationsDisabled ? {} : { opacity: 0, y: 10 }}
                className="absolute -top-10 px-2 py-1 rounded text-xs font-medium bg-foreground text-background shadow-lg"
                style={{ left: `${(previewTime / duration) * 100}%`, transform: 'translateX(-50%)' }}
              >
                {formatTime(previewTime)}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-foreground" />
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
      </div>

      {/* Enhanced control panel */}
      <div className="relative z-20 mb-4 flex items-center justify-between" style={{ overflow: 'visible' }}>
        <div className="relative z-10 flex items-center space-x-4" style={{ overflow: 'visible' }}>
          <motion.button
            onClick={togglePlay}
            whileTap={animationsDisabled ? {} : { scale: 0.9 }}
            whileHover={animationsDisabled || isMobile ? {} : { scale: 1.05 }}
            className={primaryControlClassName}
            style={primaryControlStyle}
            disabled={loadError}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            onTouchStart={() => {
              setIsTouching(true);
              const now = Date.now();
              if (now - lastTap < 300) {
                // Double tap detected - could add special behavior
              }
              setLastTap(now);
            }}
            onTouchEnd={() => setIsTouching(false)}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={
                isPlaying && !animationsDisabled
                  ? {
                      boxShadow: [
                        '0 0 20px var(--primary-glow)',
                        '0 0 40px var(--primary-glow)',
                        '0 0 20px var(--primary-glow)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={isPlaying ? 'pause' : 'play'}
                initial={animationsDisabled ? {} : { scale: 0.8, opacity: 0 }}
                animate={animationsDisabled ? {} : { scale: 1, opacity: 1 }}
                exit={animationsDisabled ? {} : { scale: 0.8, opacity: 0 }}
                className="relative z-20"
              >
                <ButtonIcon
                  name={isPlaying ? 'pause' : 'play_arrow'}
                  emphasis="icon-only"
                  buttonSize={isMobile ? 'lg' : 'md'}
                  size={isMobile ? '2xl' : 'xl'}
                  tone="current"
                />
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={isPlaying && !animationsDisabled ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            />
          </motion.button>

          <div className={`flex items-center ${isMobile ? 'space-x-4' : 'space-x-3'}`}>
            <motion.button
              onClick={stopAudio}
              whileTap={animationsDisabled ? {} : { scale: 0.9 }}
              whileHover={animationsDisabled || isMobile ? {} : { scale: 1.05 }}
              className={circularControlClassName}
              disabled={loadError}
              aria-label="Stop"
              onTouchStart={() => setIsTouching(true)}
              onTouchEnd={() => setIsTouching(false)}
            >
              <ButtonIcon name="stop" emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? 'xl' : 'lg'} tone="current" />
            </motion.button>

            <motion.button
              onClick={changePlaybackRate}
              whileTap={animationsDisabled ? {} : { scale: 0.9 }}
              whileHover={animationsDisabled || isMobile ? {} : { scale: 1.05 }}
              className={pillControlClassName}
              disabled={loadError}
              aria-label={`Change playback speed, currently ${playbackRate}x`}
              onTouchStart={() => setIsTouching(true)}
              onTouchEnd={() => setIsTouching(false)}
            >
              <motion.span
                key={playbackRate}
                initial={animationsDisabled ? {} : { y: -10, opacity: 0 }}
                animate={animationsDisabled ? {} : { y: 0, opacity: 1 }}
                exit={animationsDisabled ? {} : { y: 10, opacity: 0 }}
                className="text-[var(--primary)]"
              >
                {playbackRate}×
              </motion.span>
            </motion.button>

            <div className="relative">
              <motion.button
                ref={shareButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('AudioPlayer: Share button clicked, current state:', showShareMenu);
                  setShowShareMenu(!showShareMenu);
                }}
                whileTap={animationsDisabled ? {} : { scale: 0.9 }}
                whileHover={animationsDisabled || isMobile ? {} : { scale: 1.05 }}
                className={circularControlClassName}
                disabled={loadError}
                aria-label={t('blog.aria.shareAudio')}
                data-share-menu
                onTouchStart={() => setIsTouching(true)}
                onTouchEnd={() => setIsTouching(false)}
              >
                <ButtonIcon name="share" emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? 'xl' : 'lg'} tone="current" />
              </motion.button>

              <AnimatePresence>
                {showShareMenu && (
                  <>
                    <div className="fixed inset-0 z-[999998]" style={{ pointerEvents: 'none' }} />
                    <motion.div
                      {...getDropdownAnimation()}
                      className="absolute min-w-[250px] rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-4 backdrop-blur-2xl"
                      data-share-menu
                      transition={{
                        duration: durationSeconds.brisk,
                        ease: 'easeOut',
                        opacity: { duration: durationSeconds.fast },
                        scale: { duration: durationSeconds.brisk },
                      }}
                      style={{
                        zIndex: 999999,
                        position: 'absolute',
                        ...(() => {
                          const { position, alignment } = dropdownPosition;
                          const dropdownWidth = 250;
                          const dropdownHeight = 320;

                          switch (position) {
                            case 'top': {
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
                            }
                            case 'bottom': {
                              const bottomY = 60;
                              switch (alignment) {
                                case 'start':
                                  return { top: bottomY, left: 0 };
                                case 'center':
                                  return { top: bottomY, left: '50%', transform: 'translateX(-50%)' };
                                case 'end':
                                  return { top: bottomY, right: 0 };
                              }
                              break;
                            }
                            case 'left': {
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
                            }
                            case 'right': {
                              const rightX = 60;
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
                          }

                          return { top: 60, right: 0 };
                        })(),
                      }}
                    >
                      <div
                        className="absolute"
                        style={{
                          ...(() => {
                            const { position } = dropdownPosition;
                            switch (position) {
                              case 'top':
                                return { bottom: '-8px', left: '20px', transform: 'translateX(-50%)' };
                              case 'bottom':
                                return { top: '-8px', left: '20px', transform: 'translateX(-50%)' };
                              case 'left':
                                return { right: '-8px', top: '20px', transform: 'translateY(-50%)' };
                              case 'right':
                                return { left: '-8px', top: '20px', transform: 'translateY(-50%)' };
                            }
                          })(),
                        }}
                      >
                        <div
                          className="h-0 w-0 border-solid"
                          style={{
                            borderWidth:
                              dropdownPosition.position === 'top'
                                ? '0 6px 6px 6px'
                                : dropdownPosition.position === 'bottom'
                                  ? '6px 6px 0 6px'
                                  : dropdownPosition.position === 'left'
                                    ? '6px 0 6px 6px'
                                    : '6px 6px 6px 0',
                            borderColor:
                              dropdownPosition.position === 'top'
                                ? 'transparent transparent var(--card-from-bg) transparent'
                                : dropdownPosition.position === 'bottom'
                                  ? 'var(--card-from-bg) transparent transparent transparent'
                                  : dropdownPosition.position === 'left'
                                    ? 'transparent transparent transparent var(--card-from-bg)'
                                    : 'transparent var(--card-from-bg) transparent transparent',
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={copyAudioLink}
                          className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] px-4 py-3 text-left text-sm font-medium text-[var(--muted-foreground)] transition-all duration-200 hover:scale-105 hover:bg-[var(--card-to-bg)] hover:text-[var(--foreground)]"
                        >
                          {t('blog.aria.copyAudioLink')}
                        </button>

                        <button
                          onClick={() => shareToSocialMedia('twitter')}
                          className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] px-4 py-3 text-left text-sm font-medium text-[var(--muted-foreground)] transition-all duration-200 hover:scale-105 hover:bg-[var(--card-to-bg)] hover:text-[var(--foreground)]"
                        >
                          Share on Twitter
                        </button>

                        <button
                          onClick={() => shareToSocialMedia('whatsapp')}
                          className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] px-4 py-3 text-left text-sm font-medium text-[var(--muted-foreground)] transition-all duration-200 hover:scale-105 hover:bg-[var(--card-to-bg)] hover:text-[var(--foreground)]"
                        >
                          Share on WhatsApp
                        </button>

                        <button
                          onClick={() => shareToSocialMedia('linkedin')}
                          className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] px-4 py-3 text-left text-sm font-medium text-[var(--muted-foreground)] transition-all duration-200 hover:scale-105 hover:bg-[var(--card-to-bg)] hover:text-[var(--foreground)]"
                        >
                          Share on LinkedIn
                        </button>

                        <button
                          onClick={() => shareToSocialMedia('facebook')}
                          className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] px-4 py-3 text-left text-sm font-medium text-[var(--muted-foreground)] transition-all duration-200 hover:scale-105 hover:bg-[var(--card-to-bg)] hover:text-[var(--foreground)]"
                        >
                          Share on Facebook
                        </button>

                        <div className="my-2 border-t border-[var(--card-border)]" />

                        <button
                          onClick={downloadAudio}
                          className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] px-4 py-3 text-left text-sm font-medium text-[var(--muted-foreground)] transition-all duration-200 hover:scale-105 hover:bg-[var(--card-to-bg)] hover:text-[var(--foreground)]"
                        >
                          {t('blog.aria.downloadAudio')}
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={toggleMute}
              whileTap={animationsDisabled ? {} : { scale: 0.9 }}
              whileHover={animationsDisabled || isMobile ? {} : { scale: 1.05 }}
              className={circularControlClassName}
              disabled={loadError}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              onTouchStart={() => setIsTouching(true)}
              onTouchEnd={() => setIsTouching(false)}
            >
              <ButtonIcon name={isMuted ? 'volume_off' : 'volume_up'} emphasis="icon-only" buttonSize={isMobile ? 'lg' : 'md'} size={isMobile ? 'xl' : 'lg'} tone="current" />
            </motion.button>
          </div>
        </div>

        {!isMobile && (
          <motion.div
            className="flex items-center space-x-3 rounded-full border border-[var(--card-border)] bg-[var(--card-from-bg)] px-4 py-2 text-sm text-[var(--muted-foreground)] backdrop-blur-md hover:bg-[var(--card-to-bg)] hover:text-[var(--foreground)]"
            whileHover={!animationsDisabled ? { scale: 1.05 } : {}}
          >
            <div className="font-mono text-[var(--primary)]">{formatTime(currentTime)}</div>
            <div className="h-1 w-1 rounded-full bg-current/60" />
            <div className="font-mono text-foreground/60">{formatTime(duration)}</div>
          </motion.div>
        )}
      </div>

      {/* Mobile timer display */}
      {isMobile && (
        <div className="flex justify-center mt-3">
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[var(--card-from-bg)] hover:bg-[var(--card-to-bg)] border border-[var(--card-border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm font-mono`}>
            <span className="text-[var(--primary)]">
              {formatTime(currentTime)}
            </span>
            <span className="text-foreground/40">
              /
            </span>
            <span className="text-foreground/60">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      )}

      {/* Success message for copied link */}
      <AnimatePresence>
        {showCopiedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-4 right-4 px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-md bg-[var(--color-success-bg)] text-[var(--color-success)] border border-[var(--color-success-border)] shadow-xl z-50"
          >
            ✓ {t('blog.aria.audioLinkCopied')}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
