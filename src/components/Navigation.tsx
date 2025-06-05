'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';
import FocusTrap from './ui/FocusTrap';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { i18n } from '@/i18n';

// Define types for dropdown items
interface DropdownItem {
  href: string;
  textKey?: string;
  text?: string;
  type: 'overview' | 'case' | 'section';
  icon?: string;
}

const portfolioDropdownItems: DropdownItem[] = [
  { href: '/portfolio', textKey: 'portfolio.overview', type: 'overview' },
  { href: '/portfolio/accessibility', textKey: 'portfolio.cases.accessibility', type: 'case' },
  { href: '/portfolio/collaboration', textKey: 'portfolio.cases.collaboration', type: 'case' },
  { href: '/portfolio/jobseeking', textKey: 'portfolio.cases.jobseeking', type: 'case' },
];

// Home dropdown items
const homeDropdownItems: DropdownItem[] = [
  { href: '/', textKey: 'nav.home', type: 'overview', icon: 'home' },
  { href: '/#work-experience', text: 'Work Experience', type: 'section', icon: 'work' },
  { href: '/#digital-dreams', text: 'Digital Dreams', type: 'section', icon: 'auto_awesome' },
  { href: '/#strengths-skills', text: 'Strengths & Skills', type: 'section', icon: 'psychology' },
  { href: '/#testimonials', text: 'Testimonials', type: 'section', icon: 'format_quote' },
];

// Mobile Menu Section Component
interface MobileMenuSectionProps {
  title: string;
  icon: string;
  href: string;
  items: DropdownItem[];
  theme: string;
  onLinkClick: () => void;
  getDropdownItemClass: (isActive: boolean) => string;
  getTextColorClass: () => string;
  localizedHref: (path: string) => string;
  locale: string;
  isPortfolio?: boolean;
  t?: (key: string) => string;
}

const MobileMenuSection: React.FC<MobileMenuSectionProps> = ({
  title,
  icon,
  href,
  items,
  theme,
  onLinkClick,
  getDropdownItemClass,
  getTextColorClass,
  localizedHref,
  locale,
  isPortfolio = false,
  t
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBgClass = () => {
    return theme === 'light' 
      ? 'bg-white/50 hover:bg-white/70 border border-gray-200/50' 
      : theme === 'dark'
      ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50'
      : 'bg-purple-900/20 hover:bg-purple-900/30 border border-purple-200/20';
  };

  const getExpandedBgClass = () => {
    return theme === 'light' 
      ? 'bg-blue-50/50 border-blue-200/50' 
      : theme === 'dark'
      ? 'bg-blue-900/20 border-blue-700/50'
      : 'bg-purple-500/10 border-purple-400/30';
  };

  const getSubmenuBgClass = () => {
    return theme === 'light' 
      ? 'bg-gray-50/80' 
      : theme === 'dark'
      ? 'bg-gray-800/80'
      : 'bg-purple-900/30';
  };

  return (
    <motion.div
      className={`rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${
        isExpanded ? getExpandedBgClass() : getBgClass()
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >      {/* Main section header */}
      <div className="flex items-center">
        {/* Navigation link - takes up most of the space */}
        <Link
          href={href}
          onClick={onLinkClick}
          className={`flex-grow flex items-center gap-3 py-4 px-4 ${getTextColorClass()} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors rounded-l-xl`}
          aria-label={locale === 'fi' 
            ? (isPortfolio ? 'Siirry portfoliosivulle' : 'Siirry etusivulle') 
            : (isPortfolio ? 'Go to portfolio page' : 'Go to homepage')
          }
        >
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols text-xl" aria-hidden="true">{icon}</span>
          </motion.div>
          <span className="font-semibold text-lg">{title}</span>
        </Link>
        
        {/* Expand/Collapse button - separate from navigation */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-3 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 border-l ${
            theme === 'light' 
              ? 'text-gray-600 hover:text-gray-800 bg-gray-100/50 hover:bg-gray-200/70 border-gray-200/30' 
              : theme === 'dark'
              ? 'text-gray-400 hover:text-gray-200 bg-gray-700/50 hover:bg-gray-600/70 border-gray-600/30'
              : 'text-gray-300 hover:text-white bg-purple-900/30 hover:bg-purple-800/50 border-purple-700/30'
          }`}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="material-symbols text-lg"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            expand_more
          </motion.span>
        </motion.button>
      </div>

      {/* Submenu items */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`overflow-hidden ${getSubmenuBgClass()}`}
          >
            <div className="px-2 pb-3 space-y-1">
              {items.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={localizedHref(item.href)}
                    className={`flex items-center gap-3 w-full px-4 py-3 text-sm rounded-lg ${getDropdownItemClass(false)} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 hover:translate-x-1`}
                    onClick={onLinkClick}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                      <span className="material-symbols text-sm" aria-hidden="true">
                        {item.icon || 'article'}
                      </span>
                    </div>                    <span className="font-medium">
                      {isPortfolio && t && item.textKey ? t(item.textKey) : item.text || item.textKey}
                    </span><span className="material-symbols text-xs ml-auto opacity-50">
                      chevron_right
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}      </AnimatePresence>
    </motion.div>
  );
};

// Mobile Menu Item Component (for simple items without dropdown)
interface MobileMenuItemProps {
  href: string;
  icon: string;
  title: string;
  theme: string;
  onLinkClick: () => void;
  getTextColorClass: () => string;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  href,
  icon,
  title,
  theme,
  onLinkClick,
  getTextColorClass
}) => {
  const getBgClass = () => {
    return theme === 'light' 
      ? 'bg-white/50 hover:bg-white/70 border border-gray-200/50' 
      : theme === 'dark'
      ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50'
      : 'bg-purple-900/20 hover:bg-purple-900/30 border border-purple-200/20';
  };

  return (
    <motion.div
      className={`rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 ${getBgClass()}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        onClick={onLinkClick}
        className={`flex items-center gap-3 w-full py-4 px-4 ${getTextColorClass()} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors group`}
      >
        <motion.div
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
        >
          <span className="material-symbols text-xl" aria-hidden="true">{icon}</span>
        </motion.div>        <span className="font-semibold text-lg group-hover:translate-x-1 transition-transform duration-200">{title}</span>        <span className="material-symbols text-xs ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
          arrow_forward
        </span>
      </Link>
    </motion.div>
  );
};

const Navigation = () => {
  const { scrollY } = useScroll();
  const { theme } = useTheme(); const { locale } = useLanguage();
  const { t } = useTranslations(locale);

  // Helper function to add locale to paths
  const localizedHref = (path: string) => {
    // Check if the path already contains the locale
    if (path.startsWith('/') && i18n.locales.some(loc => path.startsWith(`/${loc}/`))) {
      return path; // Path already has locale, don't add it again
    }

    if (path.startsWith('#') || path.startsWith('/#')) {
      // For hash links, add locale to the base path
      return path.startsWith('/#') ? `/${locale}${path}` : `/${locale}/${path}`;
    }

    return `/${locale}${path}`;
  };

  // Use different background colors based on theme
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    theme === 'light'
      ? ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
      : ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.9)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );

  const scale = useTransform(
    scrollY,
    [0, 100],
    [1, 0.95]
  );  const [menuOpen, setMenuOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  // Announce menu state changes to screen readers
  const handleMenuToggle = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
    // Note: Screen reader announcements could be implemented here with LiveRegion
  }, []);  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Don't close if clicking the hamburger button or if clicking inside the menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(target)
      ) {
        if (menuOpen) {
          handleMenuToggle(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, handleMenuToggle]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        handleMenuToggle(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen, handleMenuToggle]);
  // Get text color class based on theme
  const getTextColorClass = () => {
    return theme === 'light'
      ? 'text-gray-700 hover:text-primary'
      : 'text-gray-300 hover:text-white';
  };
  // Get mobile menu button color based on theme
  const getMobileMenuButtonClass = () => {
    return theme === 'light'
      ? 'text-gray-800 hover:text-primary'
      : 'text-gray-300 hover:text-white';
  };

  // Get common dropdown item styles
  const getDropdownItemClass = (isActive = false) => {
    return `${theme === 'light'
        ? isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-700 hover:bg-gray-50'
        : isActive
          ? 'bg-blue-900/20 text-blue-400'
          : 'text-gray-300 hover:bg-gray-800'
      } transition-colors`;
  }; return (
    <motion.header
      id="navigation"
      className="fixed w-full z-[60]"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      role="banner"
    >
      <motion.div
        className="container mx-auto px-4 py-3"
        style={{ scale }}
      >
        <div className={`flex justify-between items-center `}>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl md:text-3xl font-bold relative`}
          >
            <Link
              href="/"
              className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label={locale === 'fi' ? 'Siirry etusivulle' : 'Go to homepage'}
            >
              <motion.span
                className={`relative ${theme === 'light' ? 'text-gray-900' : 'text-white'} font-extrabold`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Ali Al-Zuhairi
              </motion.span>
            </Link>
          </motion.h1>          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">            {/* Home with dropdown */}
            <div className="relative group">
              <div
                className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                  theme === 'light' 
                    ? 'bg-white/50 hover:bg-white/70 border border-gray-200/50' 
                    : theme === 'dark'
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-600/50'
                    : 'bg-purple-900/20 hover:bg-purple-900/30 border border-purple-200/30'
                } backdrop-blur-sm transition-all duration-200`}
                onMouseEnter={() => setHomeDropdownOpen(true)}
                onMouseLeave={() => setHomeDropdownOpen(false)}
              >
                {/* Home navigation link */}
                <Link
                  href={localizedHref('/')}
                  className={`flex items-center gap-2 ${
                    theme === 'light' 
                      ? 'text-gray-700 hover:text-primary' 
                      : theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-300 hover:text-white'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors`}
                >                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    theme === 'light' 
                      ? 'bg-blue-100'
                      : theme === 'dark' 
                      ? 'bg-blue-900/50' 
                      : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20'
                  }`}>
                    <span className="material-symbols text-xs text-blue-500">home</span>
                  </div>
                  <span className="font-medium text-sm">{t('nav.home')}</span>
                </Link>
                
                {/* Dropdown toggle button */}
                <button
                  onClick={() => setHomeDropdownOpen(!homeDropdownOpen)}
                  className={`ml-1 p-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    theme === 'light' 
                      ? 'bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600' 
                      : theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-blue-900/50 text-gray-400 hover:text-blue-400' 
                      : 'bg-purple-800/30 hover:bg-blue-600/30 text-gray-400 hover:text-blue-400'
                  } ${homeDropdownOpen ? 'rotate-180' : ''}`}
                  aria-expanded={homeDropdownOpen}
                  aria-label="Toggle home menu"
                >
                  <span className="material-symbols text-sm">expand_more</span>
                </button>
              </div>

              {/* Home dropdown */}
              <div 
                className={`absolute top-full left-0 mt-2 w-64 ${
                  theme === 'light' 
                    ? 'bg-white/95 border border-gray-200' 
                    : 'bg-gray-900/95 border border-gray-700'
                } backdrop-blur-lg shadow-lg rounded-lg overflow-hidden z-50 transition-all duration-200 ${
                  homeDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setHomeDropdownOpen(true)}
                onMouseLeave={() => setHomeDropdownOpen(false)}
              >
                <div className="p-2 space-y-1">
                  {homeDropdownItems.slice(1).map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        href={localizedHref(item.href)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          theme === 'light'
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'text-gray-300 hover:bg-gray-800'
                        } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                        onClick={() => setHomeDropdownOpen(false)}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          theme === 'light' 
                            ? 'bg-gray-100' 
                            : 'bg-gray-700/50'
                        }`}>
                          <span className="material-symbols text-sm" aria-hidden="true">
                            {item.icon || 'article'}
                          </span>
                        </div>
                        <span className="font-medium">{item.text}</span>
                        <span className="material-symbols text-xs ml-auto opacity-50">
                          chevron_right
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>            {/* Portfolio with dropdown */}
            <div className="relative group">
              <div
                className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                  theme === 'light' 
                    ? 'bg-white/50 hover:bg-white/70 border border-gray-200/50' 
                    : theme === 'dark'
                    ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-600/50'
                    : 'bg-purple-900/20 hover:bg-purple-900/30 border border-purple-200/30'
                } backdrop-blur-sm transition-all duration-200`}
                onMouseEnter={() => setPortfolioDropdownOpen(true)}
                onMouseLeave={() => setPortfolioDropdownOpen(false)}
              >
                {/* Portfolio navigation link */}
                <Link
                  href={localizedHref('/portfolio')}
                  className={`flex items-center gap-2 ${
                    theme === 'light' 
                      ? 'text-gray-700 hover:text-primary' 
                      : theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-300 hover:text-white'
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-colors`}
                >                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    theme === 'light' 
                      ? 'bg-purple-100' 
                      : theme === 'dark' 
                      ? 'bg-purple-900/50' 
                      : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                  }`}>
                    <span className="material-symbols text-xs text-purple-500">work</span>
                  </div>
                  <span className="font-medium text-sm">{t('nav.portfolio')}</span>
                </Link>
                
                {/* Dropdown toggle button */}
                <button
                  onClick={() => setPortfolioDropdownOpen(!portfolioDropdownOpen)}
                  className={`ml-1 p-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    theme === 'light' 
                      ? 'bg-gray-100 hover:bg-purple-100 text-gray-600 hover:text-purple-600' 
                      : theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-purple-900/50 text-gray-400 hover:text-purple-400' 
                      : 'bg-purple-800/30 hover:bg-purple-600/30 text-gray-400 hover:text-purple-400'
                  } ${portfolioDropdownOpen ? 'rotate-180' : ''}`}
                  aria-expanded={portfolioDropdownOpen}
                  aria-label="Toggle portfolio menu"
                >
                  <span className="material-symbols text-sm">expand_more</span>
                </button>
              </div>

              {/* Portfolio dropdown */}
              <div 
                className={`absolute top-full left-0 mt-2 w-64 ${
                  theme === 'light' 
                    ? 'bg-white/95 border border-gray-200' 
                    : 'bg-gray-900/95 border border-gray-700'
                } backdrop-blur-lg shadow-lg rounded-lg overflow-hidden z-50 transition-all duration-200 ${
                  portfolioDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setPortfolioDropdownOpen(true)}
                onMouseLeave={() => setPortfolioDropdownOpen(false)}
              >
                <div className="p-2 space-y-1">
                  {portfolioDropdownItems.slice(1).map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        href={localizedHref(item.href)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          theme === 'light'
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'text-gray-300 hover:bg-gray-800'
                        } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                        onClick={() => setPortfolioDropdownOpen(false)}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          theme === 'light' 
                            ? 'bg-gray-100' 
                            : 'bg-gray-700/50'
                        }`}>
                          <span className="material-symbols text-sm">article</span>
                        </div>
                        <span className="font-medium">{item.textKey ? t(item.textKey) : item.text}</span>
                        <span className="material-symbols text-xs ml-auto opacity-50">
                          chevron_right
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>            {/* Design link */}
            <Link
              href={localizedHref('/coming-soon')}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                theme === 'light' 
                  ? 'bg-white/50 hover:bg-white/70 border border-gray-200/50 text-gray-700 hover:text-primary' 
                  : theme === 'dark'
                  ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-600/50 text-gray-300 hover:text-white'
                  : 'bg-purple-900/20 hover:bg-purple-900/30 border border-purple-200/30 text-gray-300 hover:text-white'
              } backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            ><div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-green-100' 
                  : theme === 'dark' 
                  ? 'bg-green-900/50' 
                  : 'bg-gradient-to-br from-green-500/20 to-teal-500/20'
              }`}>
                <span className="material-symbols text-xs text-green-500">design_services</span>
              </div>
              <span className="font-medium text-sm">Design</span>
              <span className="material-symbols text-xs ml-auto opacity-50">
                arrow_forward
              </span>
            </Link>            {/* Blog link */}
            <Link
              href={localizedHref('/blog')}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                theme === 'light' 
                  ? 'bg-white/50 hover:bg-white/70 border border-gray-200/50 text-gray-700 hover:text-primary' 
                  : theme === 'dark'
                  ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-600/50 text-gray-300 hover:text-white'
                  : 'bg-purple-900/20 hover:bg-purple-900/30 border border-purple-200/30 text-gray-300 hover:text-white'
              } backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            ><div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-orange-100' 
                  : theme === 'dark' 
                  ? 'bg-orange-900/50' 
                  : 'bg-gradient-to-br from-orange-500/20 to-red-500/20'
              }`}>
                <span className="material-symbols text-xs text-orange-500">article</span>
              </div>
              <span className="font-medium text-sm">{t('nav.blog')}</span>
              <span className="material-symbols text-xs ml-auto opacity-50">
                arrow_forward
              </span>
            </Link>            {/* Prompts link */}
            <Link
              href={localizedHref('/prompt')}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg ${
                theme === 'light' 
                  ? 'bg-white/50 hover:bg-white/70 border border-gray-200/50 text-gray-700 hover:text-primary' 
                  : theme === 'dark'
                  ? 'bg-gray-800/50 hover:bg-gray-800/70 border border-gray-600/50 text-gray-300 hover:text-white'
                  : 'bg-purple-900/20 hover:bg-purple-900/30 border border-purple-200/30 text-gray-300 hover:text-white'
              } backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            ><div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-pink-100' 
                  : theme === 'dark' 
                  ? 'bg-pink-900/50' 
                  : 'bg-gradient-to-br from-pink-500/20 to-rose-500/20'
              }`}>
                <span className="material-symbols text-xs text-pink-500">smart_toy</span>
              </div>
              <span className="font-medium text-sm">{t('nav.prompts')}</span>
              <span className="material-symbols text-xs ml-auto opacity-50">
                arrow_forward
              </span>
            </Link>

            {/* Theme and Language Switchers */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-300/50 dark:border-gray-600/50">
              <LanguageSwitcher />
              <ThemeSwitch />
            </div>
          </nav>

          {/* Hamburger for mobile */}
          <button
            ref={hamburgerButtonRef}
            onClick={() => handleMenuToggle(!menuOpen)}
            className={`md:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 ${getMobileMenuButtonClass()} flex items-center relative z-[60]`}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={menuOpen
              ? (locale === 'fi' ? 'Sulje päävalikko' : 'Close main menu')
              : (locale === 'fi' ? 'Avaa päävalikko' : 'Open main menu')
            }
          >
            <span className="material-symbols material-symbols-rounded text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </motion.div>      {/* Mobile Menu Overlay - Fixed position */}
      <AnimatePresence>
        {menuOpen && (
          <FocusTrap active={menuOpen} restoreFocus={true}>
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`md:hidden fixed inset-0 top-[60px] z-50 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} shadow-xl overflow-y-auto`}
              style={{
                height: 'calc(100vh - 60px)'
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Mobile header - removed duplicate name */}
              <div className={`p-4 flex  border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
                {/* Empty div to maintain spacing */}
              </div>

              {/* Top controls - Language and Theme */}
              <div className={`py-4 px-4 flex items-center justify-between border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
                {/* Mobile Language Switcher */}
                <div>
                  <LanguageSwitcher />
                </div>

                {/* Mobile Theme Switcher */}
                <div>
                  <ThemeSwitch />
                </div>
              </div>            {/* Navigation links */}
            <ul className={`p-4 space-y-3`}>
              {/* Home with collapsible dropdown - Mobile */}
              <li className="relative">
                <MobileMenuSection
                  title={t('nav.home')}
                  icon="home"
                  href={localizedHref('/')}
                  items={homeDropdownItems.slice(1)}
                  theme={theme}
                  onLinkClick={() => handleMenuToggle(false)}
                  getDropdownItemClass={getDropdownItemClass}
                  getTextColorClass={getTextColorClass}
                  localizedHref={localizedHref}
                  locale={locale}
                />
              </li>

              {/* Portfolio with collapsible dropdown - Mobile */}
              <li className="relative">
                <MobileMenuSection
                  title={t('nav.portfolio')}
                  icon="work"
                  href={localizedHref('/portfolio')}
                  items={portfolioDropdownItems.slice(1)}
                  theme={theme}
                  onLinkClick={() => handleMenuToggle(false)}
                  getDropdownItemClass={getDropdownItemClass}
                  getTextColorClass={getTextColorClass}
                  localizedHref={localizedHref}
                  locale={locale}
                  isPortfolio={true}
                  t={t}
                />
              </li>              {/* Design link - Mobile */}
              <li>
                <MobileMenuItem
                  href={localizedHref('/coming-soon')}
                  icon="design_services"
                  title="Design"
                  theme={theme}
                  onLinkClick={() => handleMenuToggle(false)}
                  getTextColorClass={getTextColorClass}
                />
              </li>

              {/* Blog link - Mobile */}
              <li>
                <MobileMenuItem
                  href={localizedHref('/blog')}
                  icon="article"
                  title={t('nav.blog')}
                  theme={theme}
                  onLinkClick={() => handleMenuToggle(false)}
                  getTextColorClass={getTextColorClass}
                />
              </li>

              {/* Prompts link - Mobile */}
              <li>
                <MobileMenuItem
                  href={localizedHref('/prompt')}
                  icon="smart_toy"
                  title={t('nav.prompts')}
                  theme={theme}
                  onLinkClick={() => handleMenuToggle(false)}
                  getTextColorClass={getTextColorClass}
                />
              </li>
              </ul>

              {/* Close button */}
              <div className="sticky bottom-4 left-0 right-0 mt-8 px-4 flex justify-center">
                <button
                  onClick={() => handleMenuToggle(false)}
                  className={`px-6 py-2 rounded-full ${theme === 'light'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    } transition-colors flex items-center gap-2`}
                  aria-label="Close menu"
                >
                  <span className="material-symbols text-sm">close</span>
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </FocusTrap>
        )}
      </AnimatePresence>

      {/* Enhanced bottom border effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </motion.header>
  );
};

export default Navigation;
