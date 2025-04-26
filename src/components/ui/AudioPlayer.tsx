'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loadError, setLoadError] = useState(false);
  const { theme } = useTheme();
  
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
    }
  };

  // Log when component mounts and unmounts for better debugging
  useEffect(() => {
    console.log('AudioPlayer: Component mounted');
    return () => {
      console.log('AudioPlayer: Component unmounted');
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative w-full backdrop-blur-md rounded-2xl p-6 mb-8 overflow-hidden ${
        isLight 
          ? 'bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.05)]' 
          : 'bg-gray-900/80 shadow-[0_8px_30px_rgba(0,0,0,0.15)]'
      } border border-opacity-10 ${isLight ? 'border-purple-200' : 'border-purple-800'}`}
      aria-label="Audio player"
    >
      {/* Abstract background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 blur-3xl"></div>
      </div>
      
      {/* ERROR MESSAGE */}
      {loadError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-3 flex items-center space-x-2">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-red-700 dark:text-red-300">Unable to load audio. Please try again later.</p>
        </div>
      )}

      {/* Title and abstract shapes */}
      <div className="mb-4 relative">
        {/* Abstract decorative shapes */}
        <div className="absolute top-0 right-0 -mt-4 mr-2 opacity-60 dark:opacity-60">
          <svg width="50" height="50" viewBox="0 0 100 100" className="text-purple-500">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="60" cy="40" r="10" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
        
        <h3 className="font-medium text-purple-500">
          <span className="block text-sm uppercase tracking-wider mb-1 opacity-70 text-gray500 dark:text-gray-300">Now Playing</span>
          <span className="block relative">
            <span className="relative z-10">{title || 'Untitled Audio'}</span>
            <motion.span 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </span>
        </h3>
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
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
            >
              <motion.span 
                key={playbackRate}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                className="text-purple-500"
              >
                {playbackRate}x
              </motion.span>
            </motion.button>
          </div>
          
          {/* Time display */}
          <div className="text-sm flex items-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="tabular-nums text-purple-500">{formatTime(currentTime)}</span>
            <span className="mx-1 opacity-50">/</span>
            <span className="tabular-nums text-gray-500 dark:text-gray-300 opacity-70">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer; 