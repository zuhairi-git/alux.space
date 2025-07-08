'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { audioLibrary, audioLibraryConfig, getAudioCategories, getAudioTags, searchAudio } from '@/data/audioLibrary';
import { AudioMetadata } from '@/types/audio';
import AudioCard from './AudioCard';
import { useIsMobile } from '@/utils/deviceUtils';

interface AudioLibraryProps {
  onPlayAudio?: (audio: AudioMetadata) => void;
}

const AudioLibrary: React.FC<AudioLibraryProps> = ({ onPlayAudio }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isMobile = useIsMobile();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title' | 'duration'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  
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

  const getHeaderStyles = () => {
    if (isLight) {
      return 'bg-white/80 backdrop-blur-sm border-b border-gray-200';
    } else if (isColorful) {
      return 'bg-black/20 backdrop-blur-sm border-b border-purple-500/30';
    } else {
      return 'bg-gray-800/80 backdrop-blur-sm border-b border-gray-700';
    }
  };

  const getTextStyles = () => {
    if (isLight) {
      return {
        title: 'text-gray-900',
        subtitle: 'text-gray-600',
        text: 'text-gray-700',
        muted: 'text-gray-500'
      };
    } else if (isColorful) {
      return {
        title: 'text-white',
        subtitle: 'text-gray-200',
        text: 'text-gray-300',
        muted: 'text-gray-400'
      };
    } else {
      return {
        title: 'text-white',
        subtitle: 'text-gray-300',
        text: 'text-gray-300',
        muted: 'text-gray-400'
      };
    }
  };

  const getButtonStyles = () => {
    if (isLight) {
      return {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
        active: 'bg-blue-600 text-white',
        inactive: 'bg-gray-100 text-gray-700'
      };
    } else if (isColorful) {
      return {
        primary: 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white',
        secondary: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300',
        active: 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white',
        inactive: 'bg-purple-500/20 text-purple-300'
      };
    } else {
      return {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-300',
        active: 'bg-blue-600 text-white',
        inactive: 'bg-gray-700 text-gray-300'
      };
    }
  };

  const getFilterStyles = () => {
    if (isLight) {
      return 'bg-white border border-gray-200 rounded-lg p-4';
    } else if (isColorful) {
      return 'bg-black/20 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm';
    } else {
      return 'bg-gray-800 border border-gray-700 rounded-lg p-4';
    }
  };

  const textStyles = getTextStyles();
  const buttonStyles = getButtonStyles();
  const categories = getAudioCategories();
  const tags = getAudioTags();

  // Filter and sort audio
  const filteredAudio = useMemo(() => {
    let filtered = audioLibrary;

    // Apply search filter
    if (searchQuery) {
      filtered = searchAudio(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(audio => audio.category === selectedCategory);
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      filtered = filtered.filter(audio => 
        selectedTags.every(tag => audio.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case 'oldest':
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'duration':
          // Sort by duration if available
          if (a.duration && b.duration) {
            const aDuration = a.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
            const bDuration = b.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
            return bDuration - aDuration;
          }
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedTags.length > 0 || searchQuery;

  return (
    <div className={getContainerStyles()}>
      {/* Header */}
      <div className={`sticky top-16 z-10 ${getHeaderStyles()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Title and Description */}
            <div className="flex-1">
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${textStyles.title}`}>
                {audioLibraryConfig.title}
              </h1>
              <p className={`text-lg ${textStyles.subtitle}`}>
                {audioLibraryConfig.description}
              </p>
              <div className={`mt-2 flex items-center gap-4 text-sm ${textStyles.muted}`}>
                <span>{audioLibrary.length} audio files</span>
                <span>•</span>
                <span>{categories.length} categories</span>
                <span>•</span>
                <span>{tags.length} tags</span>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? buttonStyles.active 
                      : buttonStyles.inactive
                  }`}
                  aria-label="Grid view"
                >
                  <span className="material-symbols text-lg">grid_view</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? buttonStyles.active 
                      : buttonStyles.inactive
                  }`}
                  aria-label="List view"
                >
                  <span className="material-symbols text-lg">list</span>
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`${buttonStyles.secondary} px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
              >
                <span className="material-symbols text-lg">filter_list</span>
                <span className="hidden sm:inline">Filters</span>
                {hasActiveFilters && (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className={getFilterStyles()}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Search */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textStyles.text}`}>
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search audio files..."
                        className={`w-full px-4 py-2 pl-10 rounded-lg border ${
                          isLight 
                            ? 'bg-white border-gray-300 text-gray-900' 
                            : 'bg-black/20 border-gray-600 text-white'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      <span className="absolute left-3 top-2.5 material-symbols text-gray-400">
                        search
                      </span>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textStyles.text}`}>
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isLight 
                          ? 'bg-white border-gray-300 text-gray-900' 
                          : 'bg-black/20 border-gray-600 text-white'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${textStyles.text}`}>
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        isLight 
                          ? 'bg-white border-gray-300 text-gray-900' 
                          : 'bg-black/20 border-gray-600 text-white'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="title">Title A-Z</option>
                      <option value="duration">Duration</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6">
                  <label className={`block text-sm font-medium mb-3 ${textStyles.text}`}>
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? buttonStyles.active
                            : buttonStyles.inactive
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={clearAllFilters}
                      className={`${buttonStyles.secondary} px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                    >
                      <span className="material-symbols text-lg">clear</span>
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="mb-6">
          <p className={`text-sm ${textStyles.muted}`}>
            {filteredAudio.length === audioLibrary.length 
              ? `Showing all ${filteredAudio.length} audio files`
              : `Showing ${filteredAudio.length} of ${audioLibrary.length} audio files`
            }
          </p>
        </div>

        {/* Audio Grid/List */}
        <AnimatePresence mode="wait">
          {filteredAudio.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                <span className="material-symbols text-6xl text-gray-400">audio_file</span>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${textStyles.title}`}>
                No audio files found
              </h3>
              <p className={`${textStyles.muted} mb-4`}>
                Try adjusting your search or filter criteria.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className={`${buttonStyles.primary} px-6 py-2 rounded-lg`}
                >
                  Clear All Filters
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={
                viewMode === 'grid'
                  ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
                  : `space-y-4`
              }
            >
              {filteredAudio.map((audio, index) => (
                <motion.div
                  key={audio.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AudioCard
                    audio={audio}
                    variant={viewMode}
                    onPlay={onPlayAudio}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AudioLibrary;
