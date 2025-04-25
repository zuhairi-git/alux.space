'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface ImageSectionProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

const ImageSection: React.FC<ImageSectionProps> = ({ 
  src, 
  alt, 
  caption,
  aspectRatio = 'wide' 
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  // Define height based on aspect ratio
  const getHeightClass = () => {
    switch (aspectRatio) {
      case 'square': return 'aspect-square';
      case 'tall': return 'aspect-[3/4]';
      case 'wide': 
      default: return 'aspect-[16/9]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="my-12 max-w-4xl mx-auto"
    >
      <div className={`relative rounded-xl overflow-hidden ${getHeightClass()} ${
        isLight 
          ? 'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.2)]' 
          : 'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]'
      }`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
        
        {/* Gradient overlay for aesthetics */}
        <div 
          className={`absolute inset-0 ${
            isLight 
              ? 'bg-gradient-to-t from-black/10 to-transparent' 
              : 'bg-gradient-to-t from-black/30 to-transparent'
          }`} 
        />
        
        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl-md"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr-md"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl-md"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br-md"></div>
      </div>
      
      {caption && (
        <div className="mt-3 text-center">
          <p className={`text-sm italic ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
            {caption}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ImageSection; 