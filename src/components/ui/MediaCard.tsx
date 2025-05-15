'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface MediaCardProps {
  theme?: 'light' | 'dark' | 'colorful';
  variant?: 'basic' | 'overlay' | 'horizontal';
  title: string;
  description: string;
  imagePath: string;
  imageAlt?: string;
  link?: string;
  tags?: string[];
  date?: string;
  icon?: React.ReactNode;
  className?: string;
  imageAttribution?: {
    name: string;
    username: string;
    link: string;
  };
}

const MediaCard: React.FC<MediaCardProps> = ({
  theme: cardTheme,
  variant = 'basic',
  title,
  description,
  imagePath,
  imageAlt,
  link,
  tags,
  date,
  icon,
  className = '',
  imageAttribution
}) => {
  const { theme: contextTheme } = useTheme();
  const theme = cardTheme || contextTheme;
  
  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          card: 'bg-white/90 border border-gray-200/50 hover:border-blue-300/50 shadow-purple-500/10 hover:shadow-blue-300/30',
          text: 'text-neutral-800',
          primaryText: 'text-blue-500',
          tag: 'bg-blue-500/10 text-blue-600',
          date: 'text-neutral-500',
          iconBg: 'bg-blue-500/10',
          iconText: 'text-blue-500',
        };
      case 'dark':
        return {
          card: 'bg-neutral-800/90 border border-neutral-700/50 hover:border-blue-300/50 shadow-blue-500/20 hover:shadow-blue-500/30',
          text: 'text-neutral-100',
          primaryText: 'text-blue-400',
          tag: 'bg-blue-500/20 text-blue-400',
          date: 'text-neutral-400',
          iconBg: 'bg-blue-500/20',
          iconText: 'text-blue-400',
        };
      case 'colorful':
        return {
          card: 'bg-indigo-950/80 border border-purple-500/30 hover:border-cyan-400/60 shadow-fuchsia-500/30 hover:shadow-cyan-500/30',
          text: 'text-blue-50',
          primaryText: 'text-fuchsia-400',
          tag: 'bg-fuchsia-500/20 text-fuchsia-300',
          date: 'text-blue-200',
          iconBg: 'bg-fuchsia-500/20',
          iconText: 'text-fuchsia-400',
        };
      default:
        return {
          card: 'bg-white/90 border border-gray-200/50 hover:border-blue-300/50 shadow-purple-500/10 hover:shadow-blue-300/30',
          text: 'text-neutral-800',
          primaryText: 'text-blue-500',
          tag: 'bg-blue-500/10 text-blue-600',
          date: 'text-neutral-500',
          iconBg: 'bg-blue-500/10',
          iconText: 'text-blue-500',
        };
    }
  };
    // Animation variants with optimized spring physics for smooth hover
  const cardAnimation = {
    hover: { 
      y: -5, 
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 15,
        mass: 0.8,
        duration: 0.15 
      } 
    },
  };
  
  const styles = getThemeStyles();
  
  // Element depending on variant
  const renderCardContent = () => {
    switch (variant) {
      case 'overlay':
        return (
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            {/* Image */}
            <Image
              src={imagePath}
              alt={imageAlt || title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-full text-xs ${styles.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-white/80 text-sm mb-4">{description}</p>
              
              {date && (
                <div className="text-xs text-white/60 mt-2">{date}</div>
              )}
              
              {/* Attribution */}
              {imageAttribution && (
                <div className="absolute bottom-2 left-4 text-xs text-white/70">
                  Photo by{' '}
                  <a
                    href={imageAttribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {imageAttribution.name}
                  </a>
                  {' '}on{' '}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Unsplash
                  </a>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'horizontal':
        return (
          <div className="flex flex-col md:flex-row overflow-hidden rounded-xl h-full">            {/* Image (left side on desktop) */}            <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
              <div className="absolute inset-0 overflow-hidden bg-black">
                <motion.div
                  className="absolute inset-0 w-full h-full scale-[1.01]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15, 
                    duration: 0.2
                  }}
                >
                  <Image
                    src={imagePath}
                    alt={imageAlt || title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>
              </div>
            </div>
            
            {/* Content (right side on desktop) */}
            <div className="p-6 md:w-2/3 flex flex-col">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-full text-xs ${styles.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${styles.text}`}>{title}</h3>
              <p className={`${styles.text} opacity-80 text-sm mb-4 flex-grow`}>{description}</p>
              
              {date && (
                <div className={`text-xs ${styles.date} mt-auto pt-4 border-t border-current/10`}>{date}</div>
              )}
              
              {/* Attribution */}
              {imageAttribution && (
                <div className={`text-xs ${styles.date} mt-2`}>
                  Photo by{' '}
                  <a
                    href={imageAttribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryText}
                  >
                    {imageAttribution.name}
                  </a>
                  {' '}on{' '}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryText}
                  >
                    Unsplash
                  </a>
                </div>
              )}
            </div>
          </div>
        );
        
      default: // basic variant
        return (
          <div className="flex flex-col overflow-hidden rounded-xl h-full">            {/* Image on top */}            <div className="relative w-full h-48 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden bg-black">
                <motion.div
                  className="absolute inset-0 w-full h-full scale-[1.01]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15, 
                    duration: 0.2
                  }}
                >
                  <Image
                    src={imagePath}
                    alt={imageAlt || title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              </div>
            </div>
            
            {/* Content below */}
            <div className="p-6 flex flex-col flex-grow">
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className={`px-3 py-1 rounded-full text-xs ${styles.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${styles.text}`}>{title}</h3>
              <p className={`${styles.text} opacity-80 text-sm mb-4 flex-grow`}>{description}</p>
              
              {date && (
                <div className={`text-xs ${styles.date} mt-auto pt-4 border-t border-current/10`}>{date}</div>
              )}
              
              {/* Attribution */}
              {imageAttribution && (
                <div className={`text-xs ${styles.date} mt-2`}>
                  Photo by{' '}
                  <a
                    href={imageAttribution.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryText}
                  >
                    {imageAttribution.name}
                  </a>
                  {' '}on{' '}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryText}
                  >
                    Unsplash
                  </a>
                </div>
              )}
            </div>
          </div>
        );
    }
  };
  
  const cardContent = renderCardContent();
  
  // Wrap content in Link if link is provided
  const wrappedContent = link ? (
    <Link href={link} className="block h-full">
      <div className="group h-full">{cardContent}</div>
    </Link>
  ) : (
    <div className="group h-full">{cardContent}</div>
  );
    return (
    <motion.div
      className={`rounded-xl overflow-hidden shadow-md h-full ${styles.card} ${className}`}
      whileHover={cardAnimation.hover}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] // Smooth cubic-bezier easing
      }}
      style={{ 
        willChange: "transform",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden"
      }}
    >
      {wrappedContent}
    </motion.div>
  );
};

export default MediaCard;
