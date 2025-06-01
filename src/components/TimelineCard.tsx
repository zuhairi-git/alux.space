'use client';

import { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Timeline Card component with theme support
interface TimelineCardProps {
  icon?: React.ReactNode; // Optional icon when materialIcon is provided
  materialIcon?: React.ElementType; // Material UI icon component
  title: string;
  date: string;
  location: string;
  description: string;
  theme: 'light' | 'dark' | 'colorful';
}

export default function TimelineCard({ 
  icon, 
  materialIcon: MaterialIcon, 
  title, 
  date, 
  location, 
  description, 
  theme 
}: TimelineCardProps) {
  // State for particle effects and interaction
  const [isHovered, setIsHovered] = useState(false);
  const [particleCount] = useState(() => Math.floor(Math.random() * 3) + 3);
  const [particles, setParticles] = useState<{x: number, y: number, delay: number, size: number}[]>([]);
  
  // Generate particles on mount
  useEffect(() => {
    const newParticles = Array.from({length: particleCount}, () => ({
      x: Math.random() * 100,
      y: Math.random() * 20 + 80, // Position at bottom
      delay: Math.random() * 2,
      size: Math.random() * 4 + 2
    }));
    setParticles(newParticles);
  }, [particleCount]);

  // Get card styles based on theme with improved visibility for dark theme
  const getCardStyles = () => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-br from-[#120025] to-[#000428] border border-fuchsia-500/20 backdrop-blur-xl shadow-[0_12px_28px_-5px_rgba(255,0,204,0.4)]';
    } else if (theme === 'dark') {
      // Lightened the dark theme colors slightly to make animations more visible
      return 'bg-gradient-to-br from-[#0a1425] to-[#040a20] border border-blue-500/30 backdrop-blur-xl shadow-[0_12px_28px_-5px_rgba(59,130,246,0.35)]';
    } else {
      return 'bg-gradient-to-br from-white to-slate-100 border border-blue-500/20 backdrop-blur-xl shadow-[0_12px_28px_-5px_rgba(59,130,246,0.3)]';
    }
  };

  // Get icon background styles based on theme - holographic design with even brighter hover effect
  const getIconBgStyles = () => {
    if (theme === 'colorful') {
      return isHovered 
        ? 'bg-gradient-to-br from-fuchsia-400/70 to-purple-700/70 backdrop-blur-lg backdrop-filter border border-fuchsia-300/70'
        : 'bg-gradient-to-br from-fuchsia-500/30 to-purple-900/30 backdrop-blur-lg backdrop-filter border border-fuchsia-400/30';
    } else if (theme === 'dark') {
      return isHovered
        ? 'bg-gradient-to-br from-blue-400/60 to-indigo-700/60 backdrop-blur-lg backdrop-filter border border-blue-300/70'
        : 'bg-gradient-to-br from-blue-500/20 to-indigo-900/20 backdrop-blur-lg backdrop-filter border border-blue-400/30';
    } else {
      return isHovered
        ? 'bg-gradient-to-br from-blue-400/50 to-sky-400/50 backdrop-blur-lg backdrop-filter border border-blue-400/70'
        : 'bg-gradient-to-br from-blue-500/15 to-sky-500/15 backdrop-blur-lg backdrop-filter border border-blue-300/30';
    }
  };
  // Get icon color styles based on theme (no glow effect)
  const getIconColorStyles = () => {
    if (theme === 'colorful') {
      return isHovered
        ? 'text-white'
        : 'text-fuchsia-300';
    } else if (theme === 'dark') {
      return isHovered
        ? 'text-white'
        : 'text-blue-300';
    } else {
      return isHovered
        ? 'text-blue-600'
        : 'text-blue-500';
    }
  };
  // Get title style based on theme - with dimensional aesthetics (no glow)
  const getTitleStyles = () => {
    if (theme === 'colorful') {
      return 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-purple-200 to-cyan-200 group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-fuchsia-200 group-hover:to-blue-200 transition-all duration-700';
    } else if (theme === 'dark') {
      return 'text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-sky-200 group-hover:bg-gradient-to-r group-hover:from-sky-200 group-hover:via-blue-200 group-hover:to-indigo-200 transition-all duration-700';
    } else {
      return 'text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-700 group-hover:bg-gradient-to-r group-hover:from-indigo-700 group-hover:via-blue-600 group-hover:to-slate-700 transition-all duration-700';
    }
  };

  // Get date and location style based on theme - with enhanced dimensional contrast
  const getMetaStyles = () => {
    if (theme === 'colorful') {
      return 'text-cyan-300 group-hover:text-cyan-200 transition-all duration-300 tracking-wide';
    } else if (theme === 'dark') {
      return 'text-blue-300 group-hover:text-blue-200 transition-all duration-300 tracking-wide';
    } else {
      return 'text-blue-500 group-hover:text-blue-600 transition-all duration-300 tracking-wide';
    }
  };

  // Get description styles based on theme - with dimensionally improved readability
  const getDescriptionStyles = () => {
    if (theme === 'colorful') {
      return 'text-slate-200/90 group-hover:text-white/95 transition-all duration-500 tracking-wide leading-relaxed';
    } else if (theme === 'dark') {
      return 'text-slate-300/90 group-hover:text-slate-200 transition-all duration-500 tracking-wide leading-relaxed';
    } else {
      return 'text-slate-600/90 group-hover:text-slate-800 transition-all duration-500 tracking-wide leading-relaxed';
    }
  };

  // Get orbital particle color based on theme - enhanced visibility for dark theme
  const getParticleColor = () => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-br from-fuchsia-400 to-purple-600';
    } else if (theme === 'dark') {
      // Use brighter colors for dark theme particles for better visibility
      return 'bg-gradient-to-br from-blue-300 to-indigo-500';
    } else {
      return 'bg-gradient-to-br from-blue-400 to-sky-600';
    }
  };

  // Enhanced custom styles for the card with more visible hover effect
  const cardCustomStyles = {
    boxShadow: isHovered ? (
      theme === 'colorful' 
        ? '0 15px 35px -10px rgba(255,0,204,0.5), 0 0 0 1px rgba(217, 70, 239, 0.2), inset 0 0 25px rgba(217, 70, 239, 0.05)'
        : theme === 'dark'
          ? '0 15px 35px -10px rgba(59,130,246,0.4), 0 0 0 1px rgba(59,130,246, 0.2), inset 0 0 25px rgba(59,130,246, 0.05)'
          : '0 15px 35px -10px rgba(59,130,246,0.3), 0 0 0 1px rgba(59,130,246, 0.15), inset 0 0 25px rgba(59,130,246, 0.04)'
    ) : '',
    transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
  };
  return (
    <div className="group perspective-1000">      <article 
        className={`relative rounded-2xl overflow-hidden ${getCardStyles()} transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          theme === 'colorful' ? 'focus:ring-fuchsia-500' :
          theme === 'dark' ? 'focus:ring-blue-400' :
          'focus:ring-blue-500'
        }`}
        style={cardCustomStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="article"
        aria-label={`${title} - ${date} - ${location}`}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsHovered(!isHovered);
          }
        }}
      >
        {/* Floating particles (visible on hover) with enhanced visibility */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isHovered && particles.map((particle, index) => (
            <div 
              key={index} 
              className={`absolute rounded-full opacity-0 ${getParticleColor()} transition-all duration-300`}
              style={{
                left: `${particle.x}%`, 
                bottom: `${particle.y}%`,
                width: `${theme === 'dark' ? particle.size * 1.6 : particle.size}px`, // Larger particles for dark theme
                height: `${theme === 'dark' ? particle.size * 1.6 : particle.size}px`, // Larger particles for dark theme
                animation: `particle-float ${5 + particle.delay}s forwards cubic-bezier(0.165, 0.84, 0.44, 1)`, // Longer animation with easing
                animationDelay: `${particle.delay * 0.8}s`, // Slightly reduced delay for more dynamic feel
                boxShadow: theme === 'colorful' 
                  ? '0 0 14px rgba(217, 70, 239, 0.95)'
                  : theme === 'dark'
                    ? '0 0 20px rgba(147, 197, 253, 0.95), 0 0 30px rgba(59, 130, 246, 0.4)' // Much enhanced glow for dark theme
                    : '0 0 14px rgba(59, 130, 246, 0.85)'
              }}
            />
          ))}
        </div>

        <div className="px-6 pt-5 pb-6">
          {/* Icon with fixed positioning to prevent cutoff */}
          <div className="mb-4 flex justify-center mt-2">
            <div className={`relative flex items-center justify-center p-4 rounded-full w-16 h-16 ${getIconBgStyles()} transition-all duration-300`}>              {MaterialIcon ? (
                <MaterialIcon className={`h-6 w-6 ${getIconColorStyles()} transition-all duration-300`} />
              ) : icon ? (
                icon
              ) : null}
            </div>
          </div>          <div className="text-center mb-3">
            <h3 className={`font-heading text-xl font-bold ${getTitleStyles()}`} style={{ textShadow: 'none' }}>
              {title}
            </h3>
            <div className={`inline-flex items-center justify-center px-3 py-1.5 my-2 text-sm font-medium rounded-full ${
              theme === 'colorful' ? 'bg-fuchsia-900/30' : 
              theme === 'dark' ? 'bg-blue-900/30' : 
              'bg-blue-100'
            } transition-all duration-300`}>
              <span className={getMetaStyles()}>{date}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-4 text-center">
            <LocationOnIcon className={`h-4 w-4 mr-1 flex-shrink-0 ${getMetaStyles()}`} />
            <span className={getMetaStyles()}>{location}</span>
          </div>
          
          <div className={`relative px-4 py-3.5 rounded-lg backdrop-blur-md mx-1 ${
            theme === 'colorful' ? 'bg-gradient-to-br from-fuchsia-900/10 to-purple-900/10 border border-fuchsia-500/10' : 
            theme === 'dark' ? 'bg-gradient-to-br from-blue-900/10 to-indigo-900/10 border border-blue-500/10' : 
            'bg-gradient-to-br from-blue-50/60 to-white/60 border border-blue-200/20'
          } transition-all duration-300`}>
            <p className={getDescriptionStyles()}>
              {description}
            </p>          </div>
        </div>
      </article>
    </div>
  );
}
