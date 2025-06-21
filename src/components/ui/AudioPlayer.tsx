'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  src: string;
  title?: string;
  category?: string;
  slug?: string; // Add slug for generating shareable URLs
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, category, slug }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);  const [loadError, setLoadError] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  
  // Only light theme should be treated differently
  const isLight = theme === 'light';

  // Simplified audio loading approach with extensive console logging
  useEffect(() => {
    console.log('AudioPlayer: Initializing with src:', src);
    const audio = audioRef.current;
    if (!audio) {
      console.error('AudioPlayer: Audio ref is null');
      return;
    }

    // Check if src is empty or undefined
    if (!src) {
      console.error("AudioPlayer: Failed to load audio file", { src: "Source is empty or undefined" });
      setLoadError(true);
      return;
    }

    // Reset state on mount
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadError(false);
    console.log('AudioPlayer: State reset');
    
    const handleLoadedData = () => {
      console.log('AudioPlayer: Audio loaded successfully, duration:', audio.duration);
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
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
    audio.addEventListener('error', handleError as EventListener);
    audio.addEventListener('ended', handleEnded);
    
    console.log('AudioPlayer: Event listeners attached');

    // Attempt to load - simplified approach
    audio.src = src;
    audio.load();
    console.log('AudioPlayer: Load method called');

    // Cleanup
    return () => {
      console.log('AudioPlayer: Cleaning up event listeners');
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleError as EventListener);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  // Format time in MM:SS
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
            // Try one more time after a short delay
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
    
    // Cycle through playback rates: 1x, 1.5x, 2x, 3x, back to 1x
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

  // Calculate progress percentage for visual elements
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  const retryLoading = () => {
    if (!audioRef.current) return;
    
    console.log('AudioPlayer: Retrying audio load');
    setLoadError(false);
    
    try {
      audioRef.current.src = src; // Explicitly reset the source
      audioRef.current.load();
      console.log('AudioPlayer: Retry load initiated');
    } catch (err) {
      console.error("AudioPlayer: Retry loading failed:", err);
      setLoadError(true);
    }  };
  // Share functionality
  const getFullAudioUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
    return `${baseUrl}${src}`;
  };

  const getShareableUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
    // Use metadata-rich URL if slug is available, otherwise fallback to direct audio
    return slug ? `${baseUrl}/api/audio/${slug}` : getFullAudioUrl();
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
  // Log when component mounts and unmounts for better debugging
  useEffect(() => {
    console.log('AudioPlayer: Component mounted');
    return () => {
      console.log('AudioPlayer: Component unmounted');
    };
  }, []);
  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // This is now handled by the backdrop div, but keep for additional safety
      if (showShareMenu && !(event.target as Element).closest('[data-share-menu]')) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative w-full rounded-2xl p-6 mb-8 ${
        isLight 
          ? 'bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' 
          : 'bg-gray-900/80 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
      } border ${isLight ? 'border-gray-600' : 'border-gray-800'}`}
      aria-label="Audio player"
      style={{ overflow: 'visible' }}
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-3xl"></div>
      </div>
      
      {/* ERROR MESSAGE */}
      {loadError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-3 flex items-center space-x-2">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-700 dark:text-red-300">Unable to load audio. Please try again later.</p>
        </div>
      )}      {/* Title and abstract shapes */}
      <div className="mb-4 relative">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-purple-500">
            <span className="block text-sm uppercase tracking-wider mb-1 opacity-100 text-gray500 dark:text-gray-300">{category || 'Now Playing'}</span>
            <span className="block relative">
              <span className="relative z-10">{title || 'Untitled Audio'}</span>
            </span>
          </h3>          {/* Language Badge */}
          <div className="flex-shrink-0 ml-3">
            <span 
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                isLight 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-blue-900/30 text-blue-300 border border-blue-800'
              }`}
              title={t('blog.aria.audioLanguage')}
              aria-label={t('blog.aria.audioLanguage')}
            >
              EN
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 relative z-10">
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          preload="auto"
        />
        
        {/* Error message */}
        {loadError && (
          <div className="bg-red-500/10 text-red-500 dark:text-red-400 p-3 rounded-lg text-sm mb-2">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Failed to load audio file</span>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs opacity-80">Check file path: {src}</span>
              <button 
                onClick={retryLoading}
                className="px-3 py-1 bg-purple-500/20 text-purple-500 rounded-full text-xs hover:bg-purple-500/30 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {/* Visualizer */}
        {isPlaying && !loadError && (
          <div className="h-2 flex items-center justify-center gap-1 mb-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-purple-500 rounded-full"
                animate={{ 
                  height: [8, Math.random() * 16 + 4, 8],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ 
                  duration: 0.8 + Math.random() * 0.5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            ))}
          </div>
        )}
        
        {/* Progress bar */}
        <div className="w-full flex items-center">
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform-gpu"
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
              aria-label="Seek audio timeline"
              disabled={loadError}
            />
          </div>
        </div>
          {/* Controls and time display */}
        <div className="flex items-center justify-between relative" style={{ overflow: 'visible' }}>
          <div className="flex items-center space-x-3 relative" style={{ overflow: 'visible' }}>
            {/* Play/Pause button */}
            <motion.button
              onClick={togglePlay}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`w-14 h-14 flex items-center justify-center rounded-full ${
                isLight 
                  ? 'bg-white/90 shadow-md hover:shadow-lg' 
                  : 'bg-gray-800/90 shadow-md hover:shadow-lg'
              } border ${isLight ? 'border-purple-100' : 'border-purple-900/30'} relative overflow-hidden backdrop-blur-sm ${loadError ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={loadError}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.svg 
                    key="pause"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="w-7 h-7 text-purple-500" 
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
                    className="w-7 h-7 text-purple-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Stop button */}
            <motion.button
              onClick={stopAudio}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`w-12 h-12 flex items-center justify-center rounded-full ${
                isLight 
                  ? 'bg-white/90 shadow-md hover:shadow-lg' 
                  : 'bg-gray-800/90 shadow-md hover:shadow-lg'
              } border ${isLight ? 'border-purple-100' : 'border-purple-900/30'} backdrop-blur-sm ${loadError ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label="Stop"
              disabled={loadError}
            >
              <motion.svg 
                className="w-6 h-6 text-purple-500" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </motion.svg>
            </motion.button>
            
            {/* Playback rate button */}
            <motion.button
              onClick={changePlaybackRate}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`flex items-center justify-center px-4 h-10 rounded-full ${
                isLight 
                  ? 'bg-white/90 shadow-md hover:shadow-lg' 
                  : 'bg-gray-800/90 shadow-md hover:shadow-lg'
              } border ${isLight ? 'border-purple-100' : 'border-purple-900/30'} backdrop-blur-sm text-sm font-medium ${loadError ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={`Change playback speed, currently ${playbackRate}x`}
              disabled={loadError}
            >              <motion.span 
                key={playbackRate}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className="text-purple-500"
              >
                {playbackRate}x
              </motion.span>
            </motion.button>            {/* Share button */}
            <div className="relative">
              <motion.button
                onClick={() => setShowShareMenu(!showShareMenu)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  isLight 
                    ? 'bg-white/90 shadow-md hover:shadow-lg' 
                    : 'bg-gray-800/90 shadow:shadow-lg'
                } border ${isLight ? 'border-purple-100' : 'border-purple-900/30'} backdrop-blur-sm relative ${loadError ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={t('blog.aria.shareAudio')}
                disabled={loadError}
              >
                <motion.svg 
                  className="w-5 h-5 text-purple-500" 
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: showShareMenu ? 15 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </motion.svg>
              </motion.button>              {/* Share Menu */}
              <AnimatePresence>
                {showShareMenu && (
                  <>
                    {/* Backdrop to catch clicks */}
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setShowShareMenu(false)}
                    />                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className={`absolute bottom-full right-0 mb-3 ${
                        isLight 
                          ? 'bg-white/98 shadow-2xl border border-gray-200' 
                          : 'bg-gray-900/98 shadow-2xl border border-gray-700'
                      } rounded-lg backdrop-blur-md p-2 min-w-[200px] z-50`}
                      style={{ 
                        zIndex: 9999,
                        position: 'absolute',
                        bottom: '100%',
                        right: 0,
                        marginBottom: '12px'
                      }}
                      data-share-menu
                    >
                    <div className="space-y-1">
                      <button
                        onClick={copyAudioLink}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                          isLight 
                            ? 'hover:bg-gray-100 text-gray-700' 
                            : 'hover:bg-gray-800 text-gray-300'
                        } transition-colors`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {t('blog.aria.copyAudioLink')}
                      </button>
                      
                      <button
                        onClick={() => shareToSocialMedia('twitter')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                          isLight 
                            ? 'hover:bg-blue-50 text-gray-700' 
                            : 'hover:bg-blue-900/20 text-gray-300'
                        } transition-colors`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Share on Twitter
                      </button>
                      
                      <button
                        onClick={() => shareToSocialMedia('facebook')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                          isLight 
                            ? 'hover:bg-blue-50 text-gray-700' 
                            : 'hover:bg-blue-900/20 text-gray-300'
                        } transition-colors`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Share on Facebook
                      </button>
                      
                      <button
                        onClick={() => shareToSocialMedia('linkedin')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                          isLight 
                            ? 'hover:bg-blue-50 text-gray-700' 
                            : 'hover:bg-blue-900/20 text-gray-300'
                        } transition-colors`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Share on LinkedIn
                      </button>
                      
                      <button
                        onClick={() => shareToSocialMedia('whatsapp')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                          isLight 
                            ? 'hover:bg-green-50 text-gray-700' 
                            : 'hover:bg-green-900/20 text-gray-300'
                        } transition-colors`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        Share on WhatsApp
                      </button>
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      
                      <button
                        onClick={downloadAudio}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                          isLight 
                            ? 'hover:bg-gray-100 text-gray-700' 
                            : 'hover:bg-gray-800 text-gray-300'
                        } transition-colors`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {t('blog.aria.downloadAudio')}
                      </button>                    </div>
                  </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Copied message */}
          <AnimatePresence>
            {showCopiedMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute top-4 right-4 px-3 py-2 rounded-lg text-sm font-medium ${
                  isLight 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-green-900/30 text-green-300 border border-green-800'
                } shadow-lg backdrop-blur-sm`}
              >
                {t('blog.aria.audioLinkCopied')}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Time display */}
          <div className="text-sm flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="tabular-nums text-purple-500">{formatTime(currentTime)}</span>
            <span className="mx-1 opacity-50">/</span>
            <span className="tabular-nums text-purple-400">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer; 