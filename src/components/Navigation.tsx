'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import Tooltip from './ui/Tooltip';
import { i18n } from '@/i18n';

const portfolioDropdownItems = [
  { href: '/portfolio', textKey: 'portfolio.overview', type: 'overview' }, 
  { href: '/portfolio/accessibility', textKey: 'portfolio.cases.accessibility', type: 'case' },
  { href: '/portfolio/collaboration', textKey: 'portfolio.cases.collaboration', type: 'case' },
  { href: '/portfolio/jobseeking', textKey: 'portfolio.cases.jobseeking', type: 'case' },
];

// Home dropdown items
const homeDropdownItems = [
  { href: '/', textKey: 'nav.home', type: 'overview', icon: 'home' },
  { href: '/#work-experience', text: 'Work Experience', type: 'section', icon: 'work' },
  { href: '/#digital-dreams', text: 'Digital Dreams', type: 'section', icon: 'auto_awesome' },
  { href: '/#strengths-skills', text: 'Strengths & Skills', type: 'section', icon: 'psychology' },
  { href: '/#testimonials', text: 'Testimonials', type: 'section', icon: 'format_quote' },
];

const Navigation = () => {
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const { locale } = useLanguage();
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
  );
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  
  const portfolioDropdownRef = useRef<HTMLDivElement>(null);
  const homeDropdownRef = useRef<HTMLDivElement>(null);
  const mobilePortfolioRef = useRef<HTMLDivElement>(null);
  const mobileHomeRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  // Close the dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        portfolioDropdownRef.current && 
        !portfolioDropdownRef.current.contains(event.target as Node)
      ) {
        setPortfolioOpen(false);
      }
      
      if (
        homeDropdownRef.current && 
        !homeDropdownRef.current.contains(event.target as Node)
      ) {
        setHomeOpen(false);
      }
      
      if (
        mobilePortfolioRef.current && 
        !mobilePortfolioRef.current.contains(event.target as Node)
      ) {
        setMobilePortfolioOpen(false);
      }
      
      if (
        mobileHomeRef.current && 
        !mobileHomeRef.current.contains(event.target as Node)
      ) {
        setMobileHomeOpen(false);
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
  
  // Toggle home dropdown
  const toggleHomeDropdown = () => {
    setHomeOpen(!homeOpen);
  };
  
  // Toggle mobile portfolio dropdown
  const toggleMobilePortfolioDropdown = () => {
    setMobilePortfolioOpen(!mobilePortfolioOpen);
    // Close other mobile dropdowns when opening this one
    if (!mobilePortfolioOpen) {
      setMobileHomeOpen(false);
    }
  };
  
  // Toggle mobile home dropdown
  const toggleMobileHomeDropdown = () => {
    setMobileHomeOpen(!mobileHomeOpen);
    // Close other mobile dropdowns when opening this one
    if (!mobileHomeOpen) {
      setMobilePortfolioOpen(false);
    }
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

  // Get common dropdown styles to maintain consistency
  const getDropdownMenuClass = () => {
    return `rounded-lg ${theme === 'light' ? 'bg-white/95 border border-gray-200' : 'bg-gray-900/95 border border-gray-700'} backdrop-blur-sm shadow-lg overflow-hidden z-50`;
  };
  
  // Get common dropdown item styles
  const getDropdownItemClass = (isActive = false) => {
    return `${
      theme === 'light'
        ? isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-700 hover:bg-gray-50'
        : isActive 
          ? 'bg-blue-900/20 text-blue-400' 
          : 'text-gray-300 hover:bg-gray-800'
    } transition-colors`;
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
        className="container mx-auto px-4 py-3"
        style={{ scale }}
      >
        <div className={`flex justify-between items-center `}>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl md:text-3xl font-bold relative`}
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
            className={`md:hidden focus:outline-none ${getMobileMenuButtonClass()} flex items-center`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols material-symbols-rounded text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>          {/* Desktop nav */}          <nav className={`hidden md:flex items-center `}>
            <motion.ul 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center px-4`}
            >
              {/* Home item with dropdown */}              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
                className="relative"
              >                <div className="relative" ref={homeDropdownRef}>
                  <Tooltip text={t('nav.home')}>                    <button
                      onClick={toggleHomeDropdown}
                      className={`flex items-center gap-1 p-2 rounded-lg ${getDropdownButtonClass()}`}aria-expanded={homeOpen}
                      aria-haspopup="true"
                    >                      <span className="relative z-10 transition-colors">
                        {t('nav.home')}
                      </span>
                      <span className={`material-symbols material-symbols-rounded transform transition-transform ${homeOpen ? 'rotate-180' : ''} ml-1`}>
                        {homeOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </Tooltip>

                  <AnimatePresence>
                    {homeOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut"
                        }}
                        className={`absolute  mt-2 w-64 ${getDropdownMenuClass()}`}
                      >
                        <div className="py-2">
                          {homeDropdownItems.map((item, index) => (
                            <React.Fragment key={item.href}>
                              {index === 1 && (
                                <div className={`mx-4 my-2 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`} />
                              )}                                <Link
                                href={localizedHref(item.href)}
                                className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                                  item.type === 'overview' 
                                  ? `font-medium ${theme === 'light' ? 'text-primary' : 'text-primary-light'}` 
                                  : getDropdownItemClass(false)
                                } `}
                                onClick={() => setHomeOpen(false)}
                              >
                                {item.type === 'overview' && (
                                  <span className={`material-symbols text-sm `}>
                                    grid_view
                                  </span>
                                )}
                                {item.type === 'section' && (
                                  <span className={`material-symbols text-sm `}>
                                    {item.icon || ''}
                                  </span>
                                )}
                                {item.type === 'overview' ? (item.textKey ? t(item.textKey) : '') : item.text}
                              </Link>
                            </React.Fragment>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
              
              {/* Portfolio dropdown */}
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <div className="relative" ref={portfolioDropdownRef}>
                  <Tooltip text={t('nav.portfolio')}>                    <button
                      onClick={togglePortfolioDropdown}
                      className={`flex items-center gap-1 p-2 rounded-lg ${getDropdownButtonClass()}`}
                      aria-expanded={portfolioOpen}
                      aria-haspopup="true"
                    >                      <span className="relative z-10 transition-colors">{t('nav.portfolio')}</span>                    <span className={`material-symbols material-symbols-rounded transform transition-transform ${portfolioOpen ? 'rotate-180' : ''} ml-1`}>
                        {portfolioOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </Tooltip>

                  <AnimatePresence>
                    {portfolioOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut"
                        }}
                        className={`absolute  mt-2 w-64 ${getDropdownMenuClass()}`}
                      >
                        <div className="py-2">
                          {portfolioDropdownItems.map((item, index) => (
                            <React.Fragment key={item.href}>
                              {index === 1 && (
                                <div className={`mx-4 my-2 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`} />
                              )}
                                <Link
                                href={localizedHref(item.href)}
                                className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                                  item.type === 'overview' 
                                  ? `font-medium ${theme === 'light' ? 'text-primary' : 'text-primary-light'}` 
                                  : getDropdownItemClass(false)
                                } `}                                onClick={() => setPortfolioOpen(false)}
                              >
                                {item.type === 'overview' && (
                                  <span className={`material-symbols text-sm `}>
                                    grid_view
                                  </span>
                                )}
                                {item.type === 'case' && (
                                  <span className={`material-symbols text-sm `}>
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
                  </AnimatePresence>
                </div>
              </motion.li>              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -2 }}
              >                <Link href={localizedHref('/coming-soon')} className="relative group p-2 rounded-lg block">
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>Design</span>
                  <motion.span
                    className={`absolute bottom-0  w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300`}
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
                <Link href={localizedHref('/blog')} className="relative group p-2 rounded-lg block">
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>{t('nav.blog')}</span>
                  <motion.span
                    className={`absolute bottom-0  w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300`}
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-start/10 to-end/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.li>              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -2 }}
              >
                <Link href={localizedHref('/prompt')} className="relative group p-2 rounded-lg block">
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>{t('nav.prompts')}</span>
                  <motion.span
                    className={`absolute bottom-0  w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300`}
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
              className="mr-4 ml-4"
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
        </div>
      </motion.div>

      {/* Mobile Menu Overlay - Fixed position */}
      <AnimatePresence>
        {menuOpen && (
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
            </div>

            {/* Navigation links */}
            <ul className={`p-4 space-y-2`}>
              {/* Home with dropdown - Mobile */}              <li className="relative">
                <div ref={mobileHomeRef}>
                  <div className="flex items-center">                    <Link
                      href={localizedHref('/')}
                      onClick={() => setMenuOpen(false)}
                      className={`flex-grow flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                    >
                      <span className={`material-symbols `}>home</span>
                      <span className="font-medium">{t('nav.home')}</span>
                    </Link><button
                      onClick={toggleMobileHomeDropdown}
                      className={`py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                      aria-expanded={mobileHomeOpen}
                      aria-haspopup="true"
                    >                      <span className={`material-symbols material-symbols-rounded transform transition-transform ${mobileHomeOpen ? 'rotate-180' : ''}`}>
                        {mobileHomeOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {mobileHomeOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${getDropdownMenuClass()} mx-2 mb-2 border-t-0 rounded-t-none`}
                      >
                        {homeDropdownItems.map((item, index) => (
                          <React.Fragment key={item.href}>
                            {index === 1 && (
                              <div className={`mx-4 my-1 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`} />
                            )}                              <Link
                              href={localizedHref(item.href)}
                              className={`flex items-center gap-2 w-full px-6 py-2 text-sm ${
                                item.type === 'overview' 
                                  ? `font-medium ${theme === 'light' ? 'text-primary' : 'text-primary-light'}` 
                                  : getDropdownItemClass(false)
                              } `}
                              onClick={() => {
                                setMobileHomeOpen(false);
                                setMenuOpen(false);
                              }}
                            >
                              {item.type === 'overview' && (
                                <span className={`material-symbols text-sm `}>
                                  grid_view
                                </span>
                              )}
                              {item.type === 'section' && (
                                <span className={`material-symbols text-sm `}>
                                  {item.icon || ''}
                                </span>
                              )}
                              {item.type === 'overview' ? (item.textKey ? t(item.textKey) : '') : item.text}
                            </Link>
                          </React.Fragment>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>

              {/* Portfolio with dropdown - Mobile */}
              <li className="relative">
                <div ref={mobilePortfolioRef}>
                  <div className="flex items-center">                    <Link
                      href={localizedHref('/portfolio')}
                      onClick={() => setMenuOpen(false)}
                      className={`flex-grow flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                    >
                      <span className={`material-symbols `}>work</span>
                      <span className="font-medium">{t('nav.portfolio')}</span>
                    </Link><button
                      onClick={toggleMobilePortfolioDropdown}
                      className={`py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                      aria-expanded={mobilePortfolioOpen}
                      aria-haspopup="true"
                    >                      <span className={`material-symbols material-symbols-rounded transform transition-transform ${mobilePortfolioOpen ? 'rotate-180' : ''}`}>
                        {mobilePortfolioOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {mobilePortfolioOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${getDropdownMenuClass()} mx-2 mb-2 border-t-0 rounded-t-none`}
                      >
                        {portfolioDropdownItems.map((item, index) => (
                          <React.Fragment key={item.href}>
                            {index === 1 && (
                              <div className={`mx-4 my-1 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`} />
                            )}                              <Link
                              href={localizedHref(item.href)}
                              className={`flex items-center gap-2 w-full px-6 py-2 text-sm ${
                                item.type === 'overview' 
                                  ? `font-medium ${theme === 'light' ? 'text-primary' : 'text-primary-light'}` 
                                  : getDropdownItemClass(false)
                              } `}
                              onClick={() => {
                                setMobilePortfolioOpen(false);
                                setMenuOpen(false);
                              }}
                            >                              {item.type === 'overview' && (
                                <span className={`material-symbols text-sm `}>
                                  grid_view
                                </span>
                              )}
                              {item.type === 'case' && (
                                <span className={`material-symbols text-sm `}>
                                  article
                                </span>
                              )}
                              {t(item.textKey)}
                            </Link>
                          </React.Fragment>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>              {/* Design link - Mobile */}              <li>                  <Link
                  href={localizedHref('/coming-soon')}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                >
                  <span className={`material-symbols `}>design_services</span>
                  <span className="font-medium">Design</span>
                </Link>
              </li>

              {/* Blog link - Mobile */}
              <li>                  <Link
                  href={localizedHref('/blog')}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                >
                  <span className={`material-symbols `}>article</span>
                  <span className="font-medium">{t('nav.blog')}</span>
                </Link>
              </li>

              {/* Prompts link - Mobile */}
              <li>                <Link
                  href={localizedHref('/prompt')}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                >
                  <span className={`material-symbols `}>smart_toy</span>
                  <span className="font-medium">{t('nav.prompts')}</span>
                </Link>
              </li>
            </ul>

            {/* Close button */}
            <div className="sticky bottom-4 left-0 right-0 mt-8 px-4 flex justify-center">
              <button
                onClick={() => setMenuOpen(false)}
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
