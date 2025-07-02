'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { PodcastEpisode, SupportedLanguage } from '../types/podcast';
import { filterEpisodesByLanguage, getEpisodeDisplayLanguage, shouldShowLanguageBadge } from '../utils/languageUtils';
import LanguageBadge from './LanguageBadge';

interface EpisodeListProps {
  episodes: PodcastEpisode[];
  currentEpisodeId: string;
  onEpisodeSelect: (episodeId: string) => void;
  className?: string;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  currentEpisodeId,
  onEpisodeSelect,
  className = ''
}) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  // Filter episodes based on current language
  const currentLanguage = locale as SupportedLanguage;
  const filteredEpisodes = filterEpisodesByLanguage(episodes, currentLanguage);
  const getCardStyle = (isSelected: boolean) => {
    const baseStyle = 'p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-200 border';
    
    if (isSelected) {
      if (isLight) {
        return `${baseStyle} bg-blue-50 border-blue-200 shadow-md`;
      } else if (isColorful) {
        return `${baseStyle} bg-purple-500/20 border-purple-500/40 shadow-lg`;
      } else {
        return `${baseStyle} bg-gray-700/50 border-gray-600 shadow-lg`;
      }
    } else {
      if (isLight) {
        return `${baseStyle} bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300`;
      } else if (isColorful) {
        return `${baseStyle} bg-black/20 border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/30`;
      } else {
        return `${baseStyle} bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-gray-600`;
      }
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

  const getSecondaryTextStyle = () => {
    if (isLight) {
      return 'text-gray-600';
    } else if (isColorful) {
      return 'text-purple-200';
    } else {
      return 'text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (    <div className={`space-y-2 sm:space-y-3 ${className}`}>
      <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${getTextStyle()}`}>
        Episodes
      </h3>
        {filteredEpisodes.map((episode, index) => {
        const isSelected = episode.id === currentEpisodeId;
        const displayLanguage = getEpisodeDisplayLanguage(episode, currentLanguage);
        const showLanguageBadge = shouldShowLanguageBadge(episode, currentLanguage);

        return (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={getCardStyle(isSelected)}
            onClick={() => onEpisodeSelect(episode.id)}
          >            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className={`font-medium text-sm sm:text-base truncate ${getTextStyle()}`}>
                    {episode.title}
                  </h4>
                  {showLanguageBadge && (
                    <LanguageBadge 
                      language={displayLanguage} 
                      size="sm"
                    />
                  )}
                </div>
                
                <p className={`text-xs sm:text-sm mb-2 line-clamp-2 ${getSecondaryTextStyle()}`}>
                  {episode.description}
                </p>
                
                <div className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs ${getSecondaryTextStyle()}`}>
                  <span>{formatDate(episode.publishDate)}</span>
                  {episode.featured && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${
                      isLight ? 'bg-yellow-100 text-yellow-800' :
                      isColorful ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
      
      {filteredEpisodes.length === 0 && (
        <div className={`text-center py-8 ${getSecondaryTextStyle()}`}>
          <p>No episodes available in the selected language.</p>
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
