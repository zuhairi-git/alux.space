'use client';

import { useState, useMemo, useEffect } from 'react';
import { AudioFile } from '@/utils/audioUtils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDate } from '@/utils/audioUtils';
import { useTheme } from '@/context/ThemeContext';

// Simple icon components to avoid Material-UI loading issues
const PlayArrowIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const LabelIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
  </svg>
);

const CalendarTodayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const GridViewIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/>
  </svg>
);

const ViewListIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
  </svg>
);

interface AudioLibraryProps {
  audioFiles: AudioFile[];
}

type SortOption = 'newest' | 'oldest' | 'title' | 'category';
type ViewMode = 'grid' | 'list';

export default function AudioLibrary({ audioFiles }: AudioLibraryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Theme-aware styling classes with proper memoization
  const cardBgClass = useMemo(() => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-800 dark:to-purple-900/10 border border-purple-200/20 dark:border-purple-700/20';
    } else if (theme === 'dark') {
      return 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50';
    } else {
      return 'bg-white border border-gray-200/50';
    }
  }, [theme]);

  const filterBgClass = useMemo(() => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/20 border border-purple-200/30 dark:border-purple-700/30';
    } else if (theme === 'dark') {
      return 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/50';
    } else {
      return 'bg-white border border-gray-200/50';
    }
  }, [theme]);

  const waveformGradient = useMemo(() => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-purple-900/30 dark:to-fuchsia-900/30';
    } else if (theme === 'dark') {
      return 'bg-gradient-to-r from-gray-700 to-gray-600';
    } else {
      return 'bg-gradient-to-r from-blue-100 to-purple-100';
    }
  }, [theme]);

  const waveformBarGradient = useMemo(() => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-t from-purple-500 to-fuchsia-500';
    } else if (theme === 'dark') {
      return 'bg-gradient-to-t from-gray-400 to-gray-300';
    } else {
      return 'bg-gradient-to-t from-blue-500 to-purple-500';
    }
  }, [theme]);

  const categoryBadgeClass = useMemo(() => {
    if (theme === 'colorful') {
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    } else if (theme === 'dark') {
      return 'bg-gray-700 text-gray-300';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  }, [theme]);

  const hoverTextColor = useMemo(() => {
    if (theme === 'colorful') {
      return 'group-hover:text-purple-600 dark:group-hover:text-purple-400';
    } else if (theme === 'dark') {
      return 'group-hover:text-gray-300';
    } else {
      return 'group-hover:text-blue-600';
    }
  }, [theme]);

  const playButtonClass = useMemo(() => {
    if (theme === 'colorful') {
      return 'text-purple-600 dark:text-purple-400';
    } else if (theme === 'dark') {
      return 'text-gray-300';
    } else {
      return 'text-blue-600 dark:text-blue-400';
    }
  }, [theme]);

  const searchFocusClass = useMemo(() => {
    return theme === 'colorful' 
      ? 'focus:ring-2 focus:ring-purple-500 focus:border-purple-500' 
      : 'focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  }, [theme]);

  const viewModeToggleClass = useMemo(() => {
    return theme === 'colorful' ? 'bg-purple-100 dark:bg-purple-900/20' : 'bg-gray-100 dark:bg-gray-700';
  }, [theme]);

  const viewModeActiveClass = useMemo(() => {
    return theme === 'colorful' 
      ? 'bg-white dark:bg-purple-800/50 text-purple-600 dark:text-purple-400 shadow-sm'
      : 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm';
  }, [theme]);

  const tagClass = useMemo(() => {
    return theme === 'colorful' 
      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
  }, [theme]);

  const emptyStateIconBg = useMemo(() => {
    return theme === 'colorful' 
      ? 'bg-purple-100 dark:bg-purple-900/30'
      : 'bg-gray-100 dark:bg-gray-800';
  }, [theme]);

  const emptyStateIconColor = useMemo(() => {
    return theme === 'colorful' 
      ? 'text-purple-400'
      : 'text-gray-400';
  }, [theme]);

  const calendarIconColor = useMemo(() => {
    return theme === 'colorful' ? 'text-purple-500 dark:text-purple-400' : '';
  }, [theme]);

  // Prevent hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug theme changes
  useEffect(() => {
    console.log('AudioLibrary: Theme changed to:', theme);
  }, [theme]);

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = Array.from(new Set(audioFiles.map(file => file.category)));
    return ['all', ...cats];
  }, [audioFiles]);

  const tags = useMemo(() => {
    const allTags = audioFiles.flatMap(file => file.tags);
    const uniqueTags = Array.from(new Set(allTags));
    return ['all', ...uniqueTags];
  }, [audioFiles]);

  // Filter and sort audio files
  const filteredAndSortedFiles = useMemo(() => {
    const filtered = audioFiles.filter(file => {
      const matchesSearch = file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           file.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || file.tags.includes(selectedTag);
      
      return matchesSearch && matchesCategory && matchesTag;
    });

    // Sort files
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [audioFiles, searchTerm, selectedCategory, selectedTag, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className={`rounded-2xl shadow-lg p-6 ${filterBgClass}`}>
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
            <div className="flex gap-4">
              <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`rounded-2xl shadow-lg p-6 ${cardBgClass}`}>
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className={`rounded-2xl shadow-lg p-6 ${filterBgClass}`}>
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search audio files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors ${searchFocusClass} bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
            />
          </div>

          {/* View Mode Toggle */}
          <div className={`flex rounded-lg p-1 ${viewModeToggleClass}`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? viewModeActiveClass
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <GridViewIcon className="w-5 h-5 flex-shrink-0" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? viewModeActiveClass
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ViewListIcon className="w-5 h-5 flex-shrink-0" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors ${searchFocusClass} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Filter */}
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tag
            </label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors ${searchFocusClass} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            >
              {tags.map(tag => (
                <option key={tag} value={tag}>
                  {tag === 'all' ? 'All Tags' : tag}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors ${searchFocusClass} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredAndSortedFiles.length} audio file{filteredAndSortedFiles.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Audio Files Grid/List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredAndSortedFiles.map((file) => (
          <motion.div
            key={file.id}
            variants={itemVariants}
            className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 will-change-transform ${cardBgClass} ${
              viewMode === 'list' ? 'flex items-center' : ''
            }`}
          >
              <Link href={`/audio/${file.slug}`} className="block group">
                <div className={`p-6 ${viewMode === 'list' ? 'flex items-center space-x-6 flex-1' : ''}`}>
                  {/* Waveform Visualization */}
                  <div className={`rounded-lg flex items-center justify-center transition-transform ${waveformGradient} ${
                    viewMode === 'list' ? 'w-24 h-16 flex-shrink-0' : 'h-32 mb-4'
                  }`}>
                    <div className="flex items-end space-x-1">
                      {[12, 8, 16, 10, 14, 6, 18, 12, 10, 16, 8, 14, 12, 16, 10, 8, 14, 12, 16, 10].slice(0, viewMode === 'list' ? 12 : 20).map((height, i) => (
                        <div
                          key={i}
                          className={`rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300 ${waveformBarGradient}`}
                          style={{
                            width: '3px',
                            height: `${height}px`,
                          }}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors duration-300">
                        <PlayArrowIcon className={`w-6 h-6 ml-0.5 flex-shrink-0 ${playButtonClass}`} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300 line-clamp-2 ${hoverTextColor}`}>
                        {file.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {file.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryBadgeClass}`}>
                        <LabelIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                        {file.category}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {file.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className={`inline-block px-2 py-1 text-xs rounded-md ${tagClass}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {file.tags.length > 3 && (
                        <span className={`inline-block px-2 py-1 text-xs rounded-md ${tagClass}`}>
                          +{file.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <CalendarTodayIcon className={`w-3 h-3 mr-1 flex-shrink-0 ${calendarIconColor}`} />
                      {formatDate(file.publishedAt)}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
      </motion.div>

      {/* Empty State */}
      {filteredAndSortedFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${emptyStateIconBg}`}>
            <SearchIcon className={`w-8 h-8 ${emptyStateIconColor}`} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No audio files found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search criteria or filters
          </p>
        </motion.div>
      )}
    </div>
  );
}
