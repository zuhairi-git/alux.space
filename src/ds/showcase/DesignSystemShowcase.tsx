'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, type Theme } from '@/context/ThemeContext';
import { colorTokens } from '@/ds/tokens/colors';
import { typographyTokens } from '@/ds/tokens/typography';
import { spacingTokens } from '@/ds/tokens/spacing';
import { shadowTokens } from '@/ds/tokens/shadows';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';

// Import interactive components
import { 
  Button, 
  Card as DSCard, 
  Badge, 
  Dropdown, 
  DropdownItem, 
  Toggle, 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/ds/components/interactive';

// Real Card Components from your site
interface RealCardProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
  children: React.ReactNode;
  [key: string]: unknown;
}

const RealCard = ({ variant = 'primary', children, ...props }: RealCardProps) => {
  return (
    <Card variant={variant} {...props}>
      {children}
    </Card>
  );
};

interface RealCardContentProps {
  icon?: string;
  title: string;
  location?: string;
  date?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

const RealCardContent = ({ icon, title, location, date, children, ...props }: RealCardContentProps) => {
  return (
    <CardContent 
      icon={icon}
      iconClassName="text-purple-400 bg-purple-400/10"
      title={title}
      location={location}
      date={date}
      {...props}
    >
      {children}
    </CardContent>
  );
};

// Timeline Card Component (matching your existing implementation)
const RealTimelineCard = ({ theme = 'light', title, date, location, description }: { theme?: 'light' | 'dark' | 'colorful'; title: string; date: string; location: string; description: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCardStyles = () => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-br from-[#120025] to-[#000428] border border-fuchsia-500/20 backdrop-blur-xl shadow-[0_12px_28px_-5px_rgba(255,0,204,0.4)]';
    } else if (theme === 'dark') {
      return 'bg-gradient-to-br from-[#0a1425] to-[#040a20] border border-blue-500/30 backdrop-blur-xl shadow-[0_12px_28px_-5px_rgba(59,130,246,0.35)]';
    } else {
      return 'bg-gradient-to-br from-white to-slate-100 border border-blue-500/20 backdrop-blur-xl shadow-[0_12px_28px_-5px_rgba(59,130,246,0.3)]';
    }
  };

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

  const getTitleStyles = () => {
    if (theme === 'colorful') {
      return 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-purple-200 to-cyan-200 group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:via-fuchsia-200 group-hover:to-blue-200 transition-all duration-700';
    } else if (theme === 'dark') {
      return 'text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-sky-200 group-hover:bg-gradient-to-r group-hover:from-sky-200 group-hover:via-blue-200 group-hover:to-indigo-200 transition-all duration-700';
    } else {
      return 'text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-blue-600 to-indigo-700 group-hover:bg-gradient-to-r group-hover:from-indigo-700 group-hover:via-blue-600 group-hover:to-slate-700 transition-all duration-700';
    }
  };

  return (
    <div className="group perspective-1000">
      <article 
        className={`relative rounded-2xl overflow-hidden ${getCardStyles()} transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 p-8`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-4 flex justify-center mt-2">
          <div className={`relative flex items-center justify-center p-4 rounded-full w-16 h-16 ${getIconBgStyles()} transition-all duration-300`}>
            <span className="material-symbols text-2xl">rocket_launch</span>
          </div>
        </div>

        <div className="text-center mb-3">
          <h3 className={`font-heading text-xl font-bold ${getTitleStyles()}`} style={{ textShadow: 'none' }}>
            {title}
          </h3>
          <div className={`inline-flex items-center justify-center px-3 py-1.5 my-2 text-sm font-medium rounded-full ${
            theme === 'colorful' ? 'bg-fuchsia-900/30' : 
            theme === 'dark' ? 'bg-blue-900/30' : 
            'bg-blue-100'
          } transition-all duration-300`}>
            <span>{date}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-4 text-center">
          <span className="material-symbols h-4 w-4 mr-1 flex-shrink-0">location_on</span>
          <span>{location}</span>
        </div>
        
        <div className={`relative px-4 py-3.5 rounded-lg backdrop-blur-md mx-1 ${
          theme === 'colorful' ? 'bg-gradient-to-br from-fuchsia-900/10 to-purple-900/10 border border-fuchsia-500/10' : 
          theme === 'dark' ? 'bg-gradient-to-br from-blue-900/10 to-indigo-900/10 border border-blue-500/10' : 
          'bg-gradient-to-br from-blue-50/60 to-white/60 border border-blue-200/20'
        } transition-all duration-300`}>
          <p className={`${
            theme === 'colorful' ? 'text-slate-200/90 group-hover:text-white/95' : 
            theme === 'dark' ? 'text-slate-300/90 group-hover:text-slate-200' : 
            'text-slate-600/90 group-hover:text-slate-800'
          } transition-all duration-500 tracking-wide leading-relaxed`}>
            {description}
          </p>
        </div>
      </article>
    </div>
  );
};

// Media Card Component (matching your existing implementation)
const RealMediaCard = ({ theme = 'light', variant = 'basic' }: { theme?: 'light' | 'dark' | 'colorful'; variant?: 'basic' | 'overlay' | 'horizontal' }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'light':
        return {
          card: 'bg-white/90 border border-gray-200/50 hover:border-blue-300/50 shadow-purple-500/10 hover:shadow-blue-300/30',
          text: 'text-neutral-800',
          primaryText: 'text-blue-500',
          tag: 'bg-blue-500/10 text-blue-600',
          date: 'text-neutral-500',
        };
      case 'dark':
        return {
          card: 'bg-neutral-800/90 border border-neutral-700/50 hover:border-blue-300/50 shadow-blue-500/20 hover:shadow-blue-500/30',
          text: 'text-neutral-100',
          primaryText: 'text-blue-400',
          tag: 'bg-blue-500/20 text-blue-400',
          date: 'text-neutral-400',
        };
      case 'colorful':
        return {
          card: 'bg-indigo-950/80 border border-purple-500/30 hover:border-cyan-400/60 shadow-fuchsia-500/30 hover:shadow-cyan-500/30',
          text: 'text-blue-50',
          primaryText: 'text-fuchsia-400',
          tag: 'bg-fuchsia-500/20 text-fuchsia-300',
          date: 'text-blue-200',
        };
      default:
        return {
          card: 'bg-white/90 border border-gray-200/50 hover:border-blue-300/50 shadow-purple-500/10 hover:shadow-blue-300/30',
          text: 'text-neutral-800',
          primaryText: 'text-blue-500',
          tag: 'bg-blue-500/10 text-blue-600',
          date: 'text-neutral-500',
        };
    }
  };

  const styles = getThemeStyles();

  if (variant === 'overlay') {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="h-full w-full"
      >
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 to-purple-600"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs bg-white/30 text-white font-medium">Technology</span>
              <span className="px-3 py-1 rounded-full text-xs bg-white/30 text-white font-medium">Design</span>
            </div>
            
            <div className="flex items-center gap-2 mb-2 text-white/80 text-sm">
              <span className="material-symbols text-sm">schedule</span>
              <span>May 15, 2025</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Overlay Media Card</h3>
            <p className="text-white/90 text-sm">This card overlays content on the image with a gradient background for better readability.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      className="h-full w-full"
    >
      <div className={`${styles.card} rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 overflow-hidden`}>
        <div className="aspect-video relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 to-purple-600"></div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.tag}`}>Technology</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.tag}`}>Design</span>
          </div>
          
          <div className={`flex items-center gap-2 mb-3 ${styles.date} text-sm`}>
            <span className="material-symbols text-sm">schedule</span>
            <span>May 15, 2025</span>
          </div>
          
          <h3 className={`text-xl font-bold mb-2 ${styles.primaryText}`}>Basic Media Card</h3>
          <p className={`${styles.text} text-sm leading-relaxed`}>This is a basic media card with image, tags, and content. Perfect for blog posts and articles.</p>
        </div>
      </div>
    </motion.div>
  );
};

// Navigation Components from your site
const RealThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  
  const themes = [
    { value: 'light', label: 'Light', icon: 'light_mode' },
    { value: 'dark', label: 'Dark', icon: 'dark_mode' },
    { value: 'colorful', label: 'Colorful', icon: 'auto_awesome' }
  ];

  const getSelectedStyles = (themeValue: string) => {
    switch (themeValue) {
      case 'light':
        return 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/30';
      case 'dark':
        return 'bg-gradient-to-br from-slate-700 to-gray-900 text-white shadow-lg shadow-slate-500/30';
      case 'colorful':
        return 'bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30';
      default:
        return 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg';
    }
  };

  const getUnselectedStyles = () => {
    const baseClasses = 'border-2 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200';
    switch (theme) {
      case 'light':
        return `${baseClasses} border-gray-200 bg-white/50 hover:bg-white/70`;
      case 'dark':
        return `${baseClasses} border-gray-600 bg-gray-800/50 hover:bg-gray-800/70 text-gray-400 hover:text-gray-200 hover:border-gray-500`;
      case 'colorful':
        return `${baseClasses} border-purple-200/30 bg-purple-900/20 hover:bg-purple-900/30 text-gray-300 hover:text-white hover:border-purple-300/50`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {themes.map((themeOption) => (
        <motion.div
          key={themeOption.value}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-12 h-12 md:w-10 md:h-10 flex items-center justify-center rounded-lg cursor-pointer overflow-hidden ${
            theme === themeOption.value 
              ? getSelectedStyles(themeOption.value)
              : getUnselectedStyles()
          }`}
          onClick={() => setTheme(themeOption.value as Theme)}
        >
          <span className="material-symbols material-symbols-rounded text-xl md:text-lg relative z-10">
            {themeOption.icon}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default function DesignSystemShowcase() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'colors', label: 'Colors', icon: 'palette' },
    { id: 'typography', label: 'Typography', icon: 'text_fields' },
    { id: 'spacing', label: 'Spacing', icon: 'space_bar' },
    { id: 'shadows', label: 'Shadows', icon: 'filter_drama' },
    { id: 'components', label: 'Components', icon: 'widgets' },
    { id: 'tokens', label: 'Design Tokens', icon: 'token' }
  ];

  const ColorSwatch = ({ colorName, colorScale }: { colorName: string, colorScale: Record<string, unknown> }) => (
    <div className="space-y-3">
      <h4 className="text-lg font-semibold capitalize">{colorName}</h4>
      <div className="grid grid-cols-11 gap-1 rounded-lg overflow-hidden shadow-md">
        {Object.entries(colorScale).map(([shade, value]) => (
          <div
            key={shade}
            className="aspect-square flex items-end p-1 text-xs font-mono"
            style={{ backgroundColor: value as string }}
            title={`${colorName}-${shade}: ${value}`}
          >
            <span 
              className={`text-xs leading-none ${
                parseInt(shade) > 400 ? 'text-white' : 'text-gray-900'
              }`}
            >
              {shade}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const GradientSwatch = ({ name, gradient }: { name: string, gradient: string }) => (
    <div className="space-y-2">
      <h5 className="text-sm font-medium capitalize">{name.replace(/([A-Z])/g, ' $1')}</h5>
      <div 
        className="h-16 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        style={{ background: gradient }}
        title={gradient}
      />
      <code className="text-xs text-gray-600 dark:text-gray-400 block truncate">
        {gradient}
      </code>
    </div>
  );

  interface TypographyScale {
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: string;
    letterSpacing?: string;
    fontFamily?: string;
  }

  const TypographyExample = ({ scale, example }: { scale: TypographyScale, example: string }) => (
    <div className="space-y-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div 
        style={{
          fontSize: scale.fontSize,
          lineHeight: scale.lineHeight,
          fontWeight: scale.fontWeight,
          letterSpacing: scale.letterSpacing,
          fontFamily: scale.fontFamily
        }}
      >
        {example}
      </div>
      <div className="text-xs text-gray-500 space-y-1">
        <div>Size: {scale.fontSize} | Weight: {scale.fontWeight}</div>
        <div>Line Height: {scale.lineHeight} | Letter Spacing: {scale.letterSpacing}</div>
      </div>
    </div>
  );

  const ShadowExample = ({ name, shadow }: { name: string, shadow: string }) => (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">{name}</h5>
      <div 
        className="h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        style={{ boxShadow: shadow }}
      />
      <code className="text-xs text-gray-600 dark:text-gray-400 block">
        {shadow}
      </code>
    </div>
  );


  return (
    <div className="min-h-screen bg-background text-foreground">      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary">Alux Design System</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive design tokens and component library
            </p>
          </div>
          <RealThemeSwitch />
        </div>
      </div>      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <nav className="lg:col-span-1">
          <div className="sticky top-24 space-y-1">{sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeSection === section.id
                    ? theme === 'light'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : theme === 'dark'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : theme === 'light'
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-300 hover:bg-purple-900/20 hover:text-white'
                }`}
              >
                <span className="material-symbols text-sm">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </nav>        {/* Main Content */}
        <main className="lg:col-span-3 space-y-12">
          {/* Overview Section */}
          {activeSection === 'overview' && (            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold">Design System Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">8 Base Colors</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Each with 11 shades (50-950) for comprehensive color options
                  </p>
                </div>
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">4 Gradient Combinations</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    2 same-color gradients and 2 different-color gradients
                  </p>
                </div>
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">                  <h3 className="text-lg font-semibold mb-2">8+ Components</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Accessible interactive components with comprehensive theming
                  </p>
                </div>
              </div>

              <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">
                  Three Theme Support
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  This design system supports Light, Dark, and Colorful themes with automatic 
                  component adaptation and WCAG AAA compliance across all variants.
                </p>
              </div>
            </motion.div>
          )}

          {/* Colors Section */}
          {activeSection === 'colors' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold">Color System</h2>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Base Colors</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(colorTokens)
                    .filter(([key]) => !['semantic', 'gradients'].includes(key))
                    .map(([colorName, colorScale]) => (
                      <ColorSwatch key={colorName} colorName={colorName} colorScale={colorScale} />
                    ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Gradient Combinations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                  {Object.entries(colorTokens.gradients)
                    .filter(([, gradient]) => typeof gradient === 'string')
                    .map(([name, gradient]) => (
                      <GradientSwatch key={name} name={name} gradient={gradient as string} />
                    ))}</div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Theme-Specific Gradients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                  {Object.entries(colorTokens.gradients)
                    .filter(([, gradient]) => typeof gradient === 'object')
                    .map(([name, gradientObj]) => (
                      <div key={name} className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium capitalize">{name.replace(/([A-Z])/g, ' $1')}</h4>
                        <div className="space-y-2">
                          {Object.entries(gradientObj as Record<string, string>).map(([themeName, gradient]) => (
                            <div key={themeName} className="space-y-1">
                              <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{themeName}</span>
                              <div 
                                className="h-12 rounded border border-gray-200 dark:border-gray-700"
                                style={{ background: gradient }}
                                title={gradient}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Semantic Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(colorTokens.semantic).map(([name, colors]) => (
                    <div key={name} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-3 capitalize">{name}</h4>
                      <div className="space-y-2">                        {Object.entries(colors).map(([themeName, color]) => (
                          <div key={themeName} className="flex items-center gap-3">
                            <div 
                              className="w-6 h-6 rounded border border-gray-300"
                              style={{ backgroundColor: color as string }}
                            />
                            <span className="text-sm">{themeName}: {color as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Typography Section */}
          {activeSection === 'typography' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold">Typography System</h2>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Heading Styles</h3>
                <div className="space-y-4">
                  {Object.entries(typographyTokens.scale)
                    .filter(([key]) => key.startsWith('h'))
                    .map(([key, scale]) => (
                      <TypographyExample 
                        key={key} 
                        scale={scale} 
                        example={`${key.toUpperCase()} - The quick brown fox jumps over the lazy dog`}
                      />
                    ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Body Text Styles</h3>
                <div className="space-y-4">
                  {Object.entries(typographyTokens.scale)
                    .filter(([key]) => key.includes('body') || key === 'caption' || key === 'label')
                    .map(([key, scale]) => (
                      <TypographyExample 
                        key={key} 
                        scale={scale} 
                        example="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                      />
                    ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Interactive Elements</h3>
                <div className="space-y-4">
                  {Object.entries(typographyTokens.scale)
                    .filter(([key]) => key.includes('button'))
                    .map(([key, scale]) => (
                      <TypographyExample 
                        key={key} 
                        scale={scale} 
                        example="Button Text Example"
                      />
                    ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">RTL Support (Arabic)</h3>
                <div className="space-y-4">
                  {Object.entries(typographyTokens.scale)
                    .filter(([key]) => key.includes('rtl'))
                    .map(([key, scale]) => (
                      <div key={key} className="space-y-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg" dir="rtl">
                        <div 
                          style={{
                            fontSize: scale.fontSize,
                            lineHeight: scale.lineHeight,
                            fontWeight: scale.fontWeight,
                            letterSpacing: scale.letterSpacing,
                            fontFamily: scale.fontFamily
                          }}
                        >
                          نص تجريبي باللغة العربية لإظهار دعم النظام للكتابة من اليمين إلى اليسار
                        </div>
                        <div className="text-xs text-gray-500 space-y-1" dir="ltr">
                          <div>Size: {scale.fontSize} | Weight: {scale.fontWeight}</div>
                          <div>Line Height: {scale.lineHeight} | Letter Spacing: {scale.letterSpacing}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Spacing Section */}
          {activeSection === 'spacing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold">Spacing System</h2>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">4px Grid System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(spacingTokens.spacing)
                    .slice(0, 20)
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded">
                        <div 
                          className="bg-blue-500 flex-shrink-0"
                          style={{ width: value, height: '16px' }}
                        />
                        <div className="text-sm">
                          <div className="font-mono">{key}</div>
                          <div className="text-gray-500">{value}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Semantic Spacing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(spacingTokens.semantic).map(([category, sizes]) => (
                    <div key={category} className="space-y-4">
                      <h4 className="font-semibold capitalize">{category.replace(/([A-Z])/g, ' $1')}</h4>
                      <div className="space-y-2">
                        {Object.entries(sizes).map(([size, value]) => (
                          <div key={size} className="flex items-center gap-3">
                            <div 
                              className="bg-purple-500"
                              style={{ width: value, height: '12px' }}
                            />
                            <span className="text-sm font-mono">{size}: {value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Border Radius</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(spacingTokens.borderRadius).map(([name, value]) => (
                    <div key={name} className="space-y-2">
                      <div 
                        className="h-16 bg-gradient-to-br from-blue-400 to-purple-400 border border-gray-300"
                        style={{ borderRadius: value }}
                      />
                      <div className="text-sm">
                        <div className="font-medium">{name}</div>
                        <div className="text-gray-500 font-mono">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Shadows Section */}
          {activeSection === 'shadows' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold">Shadow System</h2>
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Basic Shadows</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(shadowTokens.boxShadow)
                    .filter(([key]) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'].includes(key))
                    .map(([name, shadow]) => (
                      <ShadowExample key={name} name={name} shadow={shadow} />
                    ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Colored Shadows</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(shadowTokens.boxShadow)
                    .filter(([key]) => key.includes('-') && ['blue', 'purple', 'cyan', 'magenta'].some(color => key.includes(color)))
                    .map(([name, shadow]) => (
                      <ShadowExample key={name} name={name} shadow={shadow} />
                    ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Theme-Specific Shadows</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(shadowTokens.boxShadow)
                    .filter(([key]) => key.includes('card-') || key.includes('button-') || key.includes('focus-'))
                    .map(([name, shadow]) => (
                      <ShadowExample key={name} name={name} shadow={shadow} />
                    ))}
                </div>
              </div>
            </motion.div>
          )}          {/* Components Section */}
          {activeSection === 'components' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Interactive Component Library
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  A comprehensive collection of accessible, theme-aware components built with modern web standards. 
                  Each component supports light, dark, and colorful themes with consistent design patterns.
                </p>
              </div>
              
              {/* Component Categories Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Input & Action Components */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <span className="material-symbols text-blue-600 dark:text-blue-400 text-xl">touch_app</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Input & Actions</h3>
                  </div>

                  {/* Buttons */}
                  <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="material-symbols text-sm">smart_button</span>
                      Buttons
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Primary</span>
                          <div className="flex flex-col gap-2">
                            <Button variant="primary" size="sm">Small</Button>
                            <Button variant="primary" size="md">Medium</Button>
                            <Button variant="primary" size="lg">Large</Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Secondary</span>
                          <div className="flex flex-col gap-2">
                            <Button variant="secondary" size="sm">Small</Button>
                            <Button variant="secondary" size="md">Medium</Button>
                            <Button variant="secondary" size="lg">Large</Button>
                          </div>
                        </div>
                      </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex flex-wrap gap-2">
                          <Button variant="secondary" size="sm">Secondary</Button>
                          <Button variant="ghost" size="sm">Ghost</Button>
                          <Button variant="cosmic" size="sm">Cosmic</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Toggle & Controls */}
                  <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="material-symbols text-sm">toggle_on</span>
                      Interactive Controls
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium">Enable notifications</span>
                        <Toggle />
                      </div>                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <span className="text-sm font-medium">Dark mode (checked)</span>
                        <Toggle checked />
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="material-symbols text-sm">arrow_drop_down</span>
                      Dropdown Menu
                    </h4>                    <Dropdown trigger={<Button variant="secondary" className="w-full justify-between">
                      Select an option
                      <span className="material-symbols text-sm">expand_more</span>
                    </Button>}>
                      <DropdownItem>Dashboard</DropdownItem>
                      <DropdownItem>Settings</DropdownItem>
                      <DropdownItem>Profile</DropdownItem>
                      <DropdownItem>Logout</DropdownItem>
                    </Dropdown>
                  </div>
                </motion.div>

                {/* Display & Feedback Components */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <span className="material-symbols text-purple-600 dark:text-purple-400 text-xl">visibility</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Display & Feedback</h3>
                  </div>

                  {/* Badges & Status */}
                  <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="material-symbols text-sm">label</span>
                      Badges & Status
                    </h4>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="error">Error</Badge>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Use badges to display status, categories, or counts
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="material-symbols text-sm">progress_activity</span>
                      Progress Indicators
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Loading progress</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center py-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="material-symbols text-sm">tab</span>
                      Tabs Navigation
                    </h4>
                    <Tabs defaultTab="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview" className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm">Overview content with general information and key metrics.</p>
                      </TabsContent>
                      <TabsContent value="details" className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm">Detailed information and specific data points.</p>
                      </TabsContent>
                      <TabsContent value="settings" className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm">Configuration options and preferences.</p>
                      </TabsContent>
                    </Tabs>
                  </div>
                </motion.div>
              </div>

              {/* Card Components Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <span className="material-symbols text-green-600 dark:text-green-400 text-xl">dashboard</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Card Components</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Flexible card layouts for displaying content with consistent theming
                  </p>
                </div>

                {/* Basic Cards */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <span className="material-symbols text-sm">crop_portrait</span>
                    Basic Card Variants
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DSCard className="p-6 group hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                          <span className="material-symbols text-blue-600 dark:text-blue-400 text-lg">article</span>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Default Card</h5>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Basic card component with clean styling and subtle hover effects.
                          </p>
                        </div>
                      </div>
                    </DSCard>
                    
                    <DSCard className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800 group hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-200 dark:bg-blue-800/50 rounded-lg group-hover:bg-blue-300 dark:group-hover:bg-blue-700/70 transition-colors">
                          <span className="material-symbols text-blue-700 dark:text-blue-300 text-lg">palette</span>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">Themed Card</h5>
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            Card with custom theming and gradient backgrounds.
                          </p>
                        </div>
                      </div>
                    </DSCard>
                  </div>
                </div>

                {/* Real Application Cards */}
                <div className="space-y-6">
                  <h4 className="text-xl font-semibold flex items-center gap-2">
                    <span className="material-symbols text-sm">apps</span>
                    Real Application Cards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="h-80">
                      <RealCard variant="primary" className="h-full">
                        <RealCardContent
                          icon="brush"
                          title="Product Designer"
                          location="Remote"
                          date="2023 - Present"
                        >
                          Product vision, specifying features, prototyping, and handing off design system to developers.
                        </RealCardContent>
                      </RealCard>
                    </div>
                    
                    <div className="h-80">
                      <RealTimelineCard
                        theme={theme}
                        title="Timeline Card"
                        date="May 15, 2025"
                        location="San Francisco"
                        description="A timeline-style card with theme-aware styling and hover effects."
                      />
                    </div>
                    
                    <div className="h-80">
                      <RealMediaCard theme={theme} variant="overlay" />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Theme-aware cards that adapt to light, dark, and colorful themes
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Component Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold text-center mb-8">Component Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl inline-block">
                      <span className="material-symbols text-green-600 dark:text-green-400 text-2xl">accessibility</span>
                    </div>
                    <h4 className="font-semibold">Accessible</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Built with WCAG guidelines, keyboard navigation, and screen reader support
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl inline-block">
                      <span className="material-symbols text-blue-600 dark:text-blue-400 text-2xl">palette</span>
                    </div>
                    <h4 className="font-semibold">Theme Aware</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Seamlessly adapts to light, dark, and colorful themes
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl inline-block">
                      <span className="material-symbols text-purple-600 dark:text-purple-400 text-2xl">tune</span>
                    </div>
                    <h4 className="font-semibold">Customizable</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">                      Consistent design tokens with flexible styling options
                    </p>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          )}

          {/* Design Tokens Section */}
          {activeSection === 'tokens' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold">Design Tokens Integration</h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Tailwind CSS Integration</h3>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // All design tokens are available as CSS variables
      },
      spacing: {
        // 4px grid system spacing tokens
      },
      borderRadius: {
        'theme': '1rem',
        'theme-lg': '2rem',
      }
    }
  }
};`}
                  </pre>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">TypeScript Usage</h3>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`import { designTokens } from '@/ds/tokens';

// Use design tokens in components
const buttonStyles = {
  backgroundColor: designTokens.colors.blue[500],
  padding: designTokens.spacing.semantic.component.md,
  borderRadius: designTokens.spacing.borderRadius.button,
  boxShadow: designTokens.shadows.boxShadow.md
};

// Type-safe token access
type ColorName = keyof typeof designTokens.colors;
type SpacingSize = keyof typeof designTokens.spacing.spacing;`}
                  </pre>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">CSS Custom Properties</h3>
                  <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
{`:root {
  --primary: #3b82f6;
  --background: #ffffff;
  --foreground: #1f2937;
  --card-from-bg: rgba(253, 253, 253, 0.9);
  --card-to-bg: rgba(243, 244, 246, 0.9);
  --card-border: rgba(229, 231, 235, 0.5);
}

.theme-dark {
  --primary: #3b82f6;
  --background: #0a0a0a;
  --foreground: #ededed;
  /* Dark theme overrides */
}

.theme-colorful {
  --primary: #ff00cc;
  --background: #050023;
  --foreground: #f0f8ff;
  /* Colorful theme overrides */
}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
