'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { podcastEpisodes, PodcastEpisode } from '@/data/podcasts';

interface PodcastPlayerProps {
  initialEpisodeId?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ initialEpisodeId }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentEpisodeId, setCurrentEpisodeId] = useState<string>(initialEpisodeId || podcastEpisodes[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loadError, setLoadError] = useState(false);
  
  // Find the current episode data
  const currentEpisode = podcastEpisodes.find(ep => ep.id === currentEpisodeId) || podcastEpisodes[0];
  
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
  };
  
  // Audio functions
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Reset player state when episode changes
    setIsPlaying(false);
    setCurrentTime(0);
    setLoadError(false);
    audio.src = currentEpisode.audioFile;
    audio.load();
    
    const handleLoadedData = () => {
      setDuration(audio.duration || 0);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleError = () => {
      setLoadError(true);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };
    
    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentEpisode]);
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Error playing audio:', error);
        });
    }
  };
  
  const stopAudio = () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  const changePlaybackRate = () => {
    if (!audioRef.current) return;
    
    const rates = [1, 1.5, 2, 3];
    const nextRateIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const newRate = rates[nextRateIndex];
    
    audioRef.current.playbackRate = newRate;
    setPlaybackRate(newRate);
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const handleEpisodeSelect = (episodeId: string) => {
    if (currentEpisodeId === episodeId && isPlaying) {
      // If clicking the current playing episode, pause it
      togglePlay();
    } else {
      // Otherwise, switch to the new episode
      stopAudio();
      setCurrentEpisodeId(episodeId);
    }
  };
  
  // Calculate progress percentage for the progress bar
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-3xl mx-auto rounded-xl overflow-hidden ${getBgStyle()}`}
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto" />
      
      {/* Player header with current episode info */}
      <div className={`p-4 ${getTextStyle()}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
              </svg>
              Podcast Player
            </h3>
            <p className={`text-sm mt-1 truncate ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
              Now Playing: {currentEpisode.title}
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
        <div className="flex items-center space-x-2">
          {/* Play/Pause button */}
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.95 }}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            disabled={loadError}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.svg 
                  key="pause"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-5 h-5 text-purple-500" 
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
                  className="w-5 h-5 text-purple-500" 
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
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isLight 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
            disabled={loadError}
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
        
        {/* Time display */}
        <div className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
          <span>{formatTime(currentTime)}</span>
          <span className="mx-1">/</span>
          <span>{formatTime(duration)}</span>
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
            <div className={`border-t ${isLight ? 'border-gray-200' : 'border-gray-700'}`}>
              <div className="max-h-72 overflow-y-auto">
                {podcastEpisodes.map(episode => (
                  <div 
                    key={episode.id}
                    onClick={() => handleEpisodeSelect(episode.id)}
                    className={`p-4 border-b ${isLight ? 'border-gray-100' : 'border-gray-800'} cursor-pointer transition-colors ${
                      currentEpisodeId === episode.id 
                        ? isLight 
                          ? 'bg-purple-50' 
                          : 'bg-purple-900/20' 
                        : ''
                    } ${
                      isLight 
                        ? 'hover:bg-gray-50' 
                        : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1 pr-4">
                        <h4 className={`font-medium text-sm ${getTextStyle()}`}>{episode.title}</h4>
                        <p className={`text-xs mt-1 line-clamp-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                          {episode.description}
                        </p>
                        
                        <div className="flex items-center mt-2 space-x-2">
                          <span className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(episode.publishDate).toLocaleDateString()}
                          </span>
                          <span className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                          <span className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                            {episode.duration}
                          </span>
                        </div>
                        
                        {episode.tags && episode.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {episode.tags.map(tag => (
                              <span 
                                key={tag} 
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  isLight 
                                    ? 'bg-gray-100 text-gray-600' 
                                    : isColorful
                                      ? 'bg-purple-500/20 text-purple-300'
                                      : 'bg-gray-800 text-gray-300'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        {currentEpisodeId === episode.id && isPlaying ? (
                          <div className="flex items-center space-x-1">
                            {Array.from({ length: 3 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className={`w-0.5 h-3 rounded-full ${
                                  isLight ? 'bg-purple-500' : 'bg-purple-400'
                                }`}
                                animate={{ 
                                  height: [3, 12, 3],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ 
                                  duration: 1.2,
                                  delay: i * 0.2,
                                  repeat: Infinity
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <svg className={`w-5 h-5 ${
                            isLight ? 'text-gray-400' : 'text-gray-500'
                          }`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Load error message */}
      {loadError && (
        <div className={`p-4 ${isLight ? 'bg-red-50 text-red-600' : 'bg-red-900/20 text-red-400'} text-sm`}>
          Could not load audio file. The file may be missing or in an unsupported format.
        </div>
      )}
    </motion.div>
  );
};

export default PodcastPlayer;
