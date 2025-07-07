'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import SpeedIcon from '@mui/icons-material/Speed';

interface StandaloneAudioPlayerProps {
  src: string;
  title: string;
  description?: string;
  className?: string;
}

export default function StandaloneAudioPlayer({ 
  src, 
  title, 
  description, 
  className = '' 
}: StandaloneAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressWidth = rect.width;
    const clickTime = (clickX / progressWidth) * duration;
    
    audio.currentTime = clickTime;
    setCurrentTime(clickTime);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSpeedChange = (speed: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = speed;
    setPlaybackRate(speed);
    setShowSpeedOptions(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 ${className}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
      />
      
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      {/* Enhanced Waveform Visualization */}
      <div className="mb-8">
        <div className="relative h-24 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center space-x-1 p-4">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 rounded-full"
                style={{
                  width: '4px',
                  height: `${Math.random() * 40 + 10}px`,
                  opacity: i < (progressPercentage / 100) * 50 ? 1 : 0.2,
                }}
                animate={{
                  scaleY: isPlaying ? [1, 1.3, 1] : 1,
                  opacity: i < (progressPercentage / 100) * 50 ? [0.8, 1, 0.8] : 0.2,
                }}
                transition={{
                  duration: 0.6,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div 
          ref={progressBarRef}
          className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer overflow-hidden"
          onClick={handleProgressClick}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.1 }}
          />
          <motion.div
            className="absolute top-1/2 w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-lg cursor-pointer"
            style={{ 
              left: `${progressPercentage}%`,
              transform: 'translate(-50%, -50%)'
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-6 mb-8">
        <motion.button
          onClick={() => skip(-10)}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Replay10Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </motion.button>

        <motion.button
          onClick={togglePlayPause}
          className="p-6 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isLoading}
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"
              />
            ) : isPlaying ? (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <PauseIcon className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <PlayArrowIcon className="w-8 h-8 ml-1" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          onClick={() => skip(10)}
          className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Forward10Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between">
        {/* Volume Control */}
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted || volume === 0 ? (
              <VolumeOffIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <VolumeUpIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </motion.button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
          />
        </div>

        {/* Speed Control */}
        <div className="relative">
          <motion.button
            onClick={() => setShowSpeedOptions(!showSpeedOptions)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SpeedIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {playbackRate}x
            </span>
          </motion.button>

          <AnimatePresence>
            {showSpeedOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2"
              >
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      playbackRate === speed
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
