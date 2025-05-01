'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import Tooltip from './ui/Tooltip';

const portfolioDropdownItems = [
  { href: '/portfolio', textKey: 'portfolio.overview', type: 'overview' }, // Added overview page
  { href: '/portfolio/collaboration', textKey: 'portfolio.cases.collaboration', type: 'case' },
  { href: '/portfolio/jobseeking', textKey: 'portfolio.cases.jobseeking', type: 'case' },
];

const Navigation = () => {
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const { locale, isRTL } = useLanguage();
  const { t } = useTranslations(locale);
  
  // Use different background colors based on theme
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    theme === 'light' 
      ? ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"] 
      : ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(10px)"]
  );
  
  const scale = useTransform(
    scrollY,
    [0, 100],
    [1, 0.9]
  );
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const portfolioDropdownRef = useRef<HTMLDivElement>(null);
  
  // Close the portfolio dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        portfolioDropdownRef.current && 
        !portfolioDropdownRef.current.contains(event.target as Node)
      ) {
        setPortfolioOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Toggle portfolio dropdown
  const togglePortfolioDropdown = () => {
    setPortfolioOpen(!portfolioOpen);
  };
  
  // Get text color class based on theme
  const getTextColorClass = () => {
    return theme === 'light' 
      ? 'text-gray-700 hover:text-primary' 
      : 'text-gray-300 hover:text-white';
  };

  // Get dropdown button styles based on theme
  const getDropdownButtonClass = () => {
    return theme === 'light'
      ? 'text-gray-800 hover:text-primary'
      : 'text-gray-300 hover:text-white';
  };

  // Get mobile menu button color based on theme
  const getMobileMenuButtonClass = () => {
    return theme === 'light' 
      ? 'text-gray-800 hover:text-primary' 
      : 'text-gray-300 hover:text-white';
  };

  return (
    <motion.header 
      className="fixed w-full z-50"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
    >
      <motion.div 
        className="container mx-auto px-4 py-4"
        style={{ scale }}
      >
        <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold relative"
          >
            <Link href="/" className="block">
              <motion.span 
                className={`relative ${theme === 'light' ? 'text-gray-900' : 'text-white'} font-extrabold`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Ali Al-Zuhairi
              </motion.span>
            </Link>
          </motion.h1>

          {/* Hamburger for mobile */}
          <button
            className={`md:hidden focus:outline-none ml-auto ${getMobileMenuButtonClass()}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols material-symbols-rounded text-3xl">menu</span>
          </button>

          {/* Desktop nav */}
          <nav className={`hidden md:flex items-center ${isRTL ? 'flex-row-reverse' : ''} space-x-8`}>
            <motion.ul 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-8`}
            >
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <Link href="/" className="relative group">
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>{t('nav.home')}</span>
                  <motion.span
                    className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300`}
                    layoutId="underline"
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-start/10 to-end/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.li>
              
              {/* Portfolio dropdown using language switcher pattern */}
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <div className="relative" ref={portfolioDropdownRef}>
                  <Tooltip text={t('nav.portfolio')}>
                    <button
                      onClick={togglePortfolioDropdown}
                      className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} p-2 rounded-full ${getDropdownButtonClass()}`}
                      aria-expanded={portfolioOpen}
                      aria-haspopup="true"
                    >
                      <span className="relative z-10 transition-colors">{t('nav.portfolio')}</span>
                      <span className={`material-symbols material-symbols-rounded transform transition-transform ${portfolioOpen ? 'rotate-180' : ''} ${isRTL ? 'mr-1' : 'ml-1'}`}>
                        {portfolioOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </Tooltip>

                  {portfolioOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut"
                      }}
                      className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-2 w-64 rounded-lg ${theme === 'light' ? 'bg-white/90' : 'bg-black/90'} backdrop-blur-lg shadow-lg ring-1 ring-black/5 overflow-hidden z-50`}
                    >
                      <div className="py-2">
                        {portfolioDropdownItems.map((item, index) => (
                          <React.Fragment key={item.href}>
                            {/* Add a divider after the overview item */}
                            {index === 1 && (
                              <div className={`mx-4 my-2 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`} />
                            )}
                            
                            <Link
                              href={item.href}
                              className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} w-full px-4 py-2 text-sm ${
                                item.type === 'overview' 
                                ? `font-medium ${theme === 'light' ? 'text-primary' : 'text-primary-light'}` 
                                : theme === 'light'
                                  ? 'text-gray-700 hover:bg-gray-50'
                                  : 'text-gray-300 hover:bg-gray-800'
                              } transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                              onClick={() => setPortfolioOpen(false)}
                            >
                              {/* Add icon for overview item */}
                              {item.type === 'overview' && (
                                <span className={`material-symbols text-sm ${isRTL ? 'ml-2' : 'mr-2'}`}>
                                  grid_view
                                </span>
                              )}
                              {/* Add icon for case items */}
                              {item.type === 'case' && (
                                <span className={`material-symbols text-sm ${isRTL ? 'ml-2' : 'mr-2'}`}>
                                  article
                                </span>
                              )}
                              {t(item.textKey)}
                            </Link>
                          </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.li>

              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <Link href="/blog" className="relative group">
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>{t('nav.blog')}</span>
                  <motion.span
                    className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300`}
                    layoutId="underline"
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-start/10 to-end/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -2 }}
              >
                <Link href="/prompt" className="relative group">
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>{t('nav.prompts')}</span>
                  <motion.span
                    className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300`}
                    layoutId="underline"
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-start/10 to-end/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.li>
            </motion.ul>
            
            {/* Language Switcher - Desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mr-4"
            >
              <LanguageSwitcher />
            </motion.div>
            
            {/* Theme Switcher - Desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="ml-2"
            >
              <ThemeSwitch />
            </motion.div>
          </nav>

          {/* Mobile Menu - Conditionally rendered */}
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`md:hidden absolute top-full ${isRTL ? 'right-0' : 'left-0'} w-full mt-1 ${theme === 'light' ? 'bg-white/95' : 'bg-black/95'} shadow-lg backdrop-blur-md rounded-b-lg overflow-hidden`}
            >
              <ul className="flex flex-col items-center space-y-4 py-4">
                <li>
                  <Link href="/" className={`block py-2 ${getTextColorClass()}`} onClick={() => setMenuOpen(false)}>
                    {t('nav.home')}
                  </Link>
                </li>
                {/* Mobile Portfolio Item with Dropdown */}
                <li className="w-full text-center">
                  <button 
                    className={`flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''} w-full py-2 ${getTextColorClass()} focus:outline-none`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent closing the main menu
                      setMobilePortfolioOpen(!mobilePortfolioOpen);
                    }}
                    aria-expanded={mobilePortfolioOpen}
                    aria-controls="mobile-portfolio-menu"
                  >
                    <span>{t('nav.portfolio')}</span>
                    <span className={`material-symbols material-symbols-rounded transform transition-transform ${mobilePortfolioOpen ? 'rotate-180' : ''} ${isRTL ? 'mr-1' : 'ml-1'}`}>
                      {mobilePortfolioOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {/* Mobile Portfolio Submenu */}
                  {mobilePortfolioOpen && (
                    <motion.div
                      id="mobile-portfolio-menu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`mt-2 w-full rounded-lg ${theme === 'light' ? 'bg-white/50' : 'bg-black/50'} backdrop-blur-lg overflow-hidden`}
                    >
                      <div className="py-2">
                        {portfolioDropdownItems.map((item, index) => (
                          <React.Fragment key={item.href}>
                            {/* Add a divider after the overview item */}
                            {index === 1 && (
                              <div className={`mx-4 my-2 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`} />
                            )}
                            <Link
                              href={item.href}
                              className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} w-full px-4 py-2 text-sm ${
                                item.type === 'overview' 
                                ? `font-medium ${theme === 'light' ? 'text-primary' : 'text-primary-light'}` 
                                : getTextColorClass()
                              } hover:bg-primary/10 transition-colors ${isRTL ? 'justify-end' : 'justify-start'}`}
                              onClick={() => {
                                setMobilePortfolioOpen(false);
                                setMenuOpen(false); // Close main menu on navigation
                              }}
                            >
                              {/* Add icon for overview item */}
                              {item.type === 'overview' && (
                                <span className={`material-symbols text-sm ${isRTL ? 'ml-2' : 'mr-2'}`}>
                                  grid_view
                                </span>
                              )}
                              {/* Add icon for case items */}
                              {item.type === 'case' && (
                                <span className={`material-symbols text-sm ${isRTL ? 'ml-2' : 'mr-2'}`}>
                                  article
                                </span>
                              )}
                              {t(item.textKey)}
                            </Link>
                          </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </li>
                <li>
                  <Link href="/blog" className={`block py-2 ${getTextColorClass()}`} onClick={() => setMenuOpen(false)}>
                    {t('nav.blog')}
                  </Link>
                </li>
                <li>
                  <Link href="/prompt" className={`block py-2 ${getTextColorClass()}`} onClick={() => setMenuOpen(false)}>
                    {t('nav.prompts')}
                  </Link>
                </li>
                
                {/* Language Switcher - Mobile */}
                <li className="pt-4 border-t border-gray-500/30 mt-4 w-full flex justify-center">
                  <LanguageSwitcher />
                </li>
                
                {/* Theme Switcher - Mobile */}
                <li className="pt-4 w-full flex justify-center">
                  <ThemeSwitch />
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Fancy bottom border effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.header>
  );
};

export default Navigation;