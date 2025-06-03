'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu } from '@headlessui/react';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';
import FocusTrap from './ui/FocusTrap';
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
  const { theme } = useTheme();  const { locale } = useLanguage();
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
  );    const [menuOpen, setMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    // Announce menu state changes to screen readers
  const handleMenuToggle = useCallback((isOpen: boolean) => {
    setMenuOpen(isOpen);
    // Note: Screen reader announcements could be implemented here with LiveRegion
  }, []);
  
  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        if (menuOpen) {
          handleMenuToggle(false);
        }
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };  }, [menuOpen, handleMenuToggle]);
  
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
  };  return (
    <motion.header 
      id="navigation"
      className="fixed w-full z-50"
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
          </motion.h1>          
          {/* Hamburger for mobile */}
          <button
            onClick={() => handleMenuToggle(!menuOpen)}
            className={`md:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 ${getMobileMenuButtonClass()} flex items-center`}
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
          {/* Desktop nav */}          
          <nav className={`hidden md:flex items-center `} role="navigation" aria-label={locale === 'fi' ? 'Päänavigaatio' : 'Main navigation'}>
            <motion.ul 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center px-4`}
            >              {/* Home item with dropdown */}
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Tooltip text={t('nav.home')}>
                        <Menu.Button 
                          className={`flex items-center gap-1 p-2 rounded-lg ${getDropdownButtonClass()} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                          aria-expanded={open}
                          aria-haspopup="true"
                          aria-label={`${t('nav.home')} ${locale === 'fi' ? 'alavalikko' : 'submenu'}`}
                        >
                          <span className="relative z-10 transition-colors">
                            {t('nav.home')}
                          </span>
                          <span className="material-symbols material-symbols-rounded transform transition-transform ui-open:rotate-180 ml-1">
                            expand_more
                          </span>
                        </Menu.Button>
                      </Tooltip>                      <Menu.Items 
                        className={`absolute mt-2 w-64 ${getDropdownMenuClass()} focus:outline-none`}
                        aria-orientation="vertical"
                        aria-labelledby="home-menu-button"
                      >
                        <div className="py-2">
                          {homeDropdownItems.map((item, index) => (
                            <React.Fragment key={item.href}>
                              {index === 1 && (
                                <div className={`mx-4 my-2 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`} />
                              )}
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href={localizedHref(item.href)}
                                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                                      item.type === 'overview' 
                                        ? `font-medium ${theme === 'light' ? 'text-primary' : 'text-primary-light'}` 
                                        : active 
                                          ? `${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-800 text-gray-100'}`
                                          : getDropdownItemClass(false)
                                    }`}
                                    role="menuitem"
                                    tabIndex={-1}
                                  >
                                    {item.type === 'overview' && (
                                      <span className="material-symbols text-sm">
                                        grid_view
                                      </span>
                                    )}
                                    {item.type === 'section' && (
                                      <span className="material-symbols text-sm">
                                        {item.icon || ''}
                                      </span>
                                    )}
                                    {item.type === 'overview' ? (item.textKey ? t(item.textKey) : '') : item.text}
                                  </Link>
                                )}
                              </Menu.Item>
                            </React.Fragment>
                          ))}
                        </div>
                      </Menu.Items>
                    </>
                  )}
                </Menu>
              </motion.li>                {/* Portfolio dropdown */}
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Menu as="div" className="relative">
                  {({ open }) => (
                    <>
                      <Tooltip text={t('nav.portfolio')}>
                        <Menu.Button 
                          className={`flex items-center gap-1 p-2 rounded-lg ${getDropdownButtonClass()} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                          aria-expanded={open}
                          aria-haspopup="true"
                          aria-label={`${t('nav.portfolio')} ${locale === 'fi' ? 'alavalikko' : 'submenu'}`}
                        >
                          <span className="relative z-10 transition-colors">{t('nav.portfolio')}</span>
                          <span className="material-symbols material-symbols-rounded transform transition-transform ui-open:rotate-180 ml-1">
                            expand_more
                          </span>
                        </Menu.Button>
                      </Tooltip>                      <Menu.Items 
                        className={`absolute mt-2 w-64 ${getDropdownMenuClass()} focus:outline-none`}
                        aria-orientation="vertical"
                        aria-labelledby="portfolio-menu-button"
                      >
                        <div className="py-2">
                          {portfolioDropdownItems.map((item, index) => (
                            <React.Fragment key={item.href}>
                              {index === 1 && (
                                <div className={`mx-4 my-2 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`} />
                              )}
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href={localizedHref(item.href)}
                                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${
                                      item.type === 'overview' 
                                        ? `font-medium ${theme === 'light' ? 'text-primary' : 'text-primary-light'}` 
                                        : active 
                                          ? `${theme === 'light' ? 'bg-gray-50 text-gray-900' : 'bg-gray-800 text-gray-100'}`
                                          : getDropdownItemClass(false)
                                    }`}
                                    role="menuitem"
                                    tabIndex={-1}
                                  >
                                    {item.type === 'overview' && (
                                      <span className="material-symbols text-sm">
                                        grid_view
                                      </span>
                                    )}
                                    {item.type === 'case' && (
                                      <span className="material-symbols text-sm">
                                        article
                                      </span>
                                    )}
                                    {t(item.textKey)}
                                  </Link>
                                )}
                              </Menu.Item>
                            </React.Fragment>
                          ))}
                        </div>
                      </Menu.Items>
                    </>
                  )}
                </Menu>
              </motion.li>              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -2 }}
              >                
                <Link 
                  href={localizedHref('/coming-soon')} 
                  className="relative group p-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={locale === 'fi' ? 'Siirry suunnittelusivulle' : 'Go to design page'}
                >
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
                <Link 
                  href={localizedHref('/blog')} 
                  className="relative group p-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={locale === 'fi' ? 'Siirry blogisivulle' : 'Go to blog page'}
                >
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>{t('nav.blog')}</span>
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
                transition={{ delay: 0.7 }}
                whileHover={{ y: -2 }}
              >
                <Link 
                  href={localizedHref('/prompt')} 
                  className="relative group p-2 rounded-lg block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={locale === 'fi' ? 'Siirry promptisivulle' : 'Go to prompts page'}
                >
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
            <ul className={`p-4 space-y-2`}>              
              {/* Home with dropdown - Mobile */}              
              <li className="relative">
                <div className="flex items-center">                        
                  <Link
                    href={localizedHref('/')}
                    onClick={() => handleMenuToggle(false)}
                    className={`flex-grow flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                    aria-label={locale === 'fi' ? 'Siirry etusivulle' : 'Go to homepage'}
                  >
                    <span className={`material-symbols `} aria-hidden="true">home</span>
                    <span className="font-medium">{t('nav.home')}</span>
                  </Link>
                </div>
                  {/* Home submenu items */}
                <div className={`${getDropdownMenuClass()} mx-2 mb-2 border-t-0 rounded-t-none`}>
                  {homeDropdownItems.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={localizedHref(item.href)}
                      className={`flex items-center gap-2 w-full px-6 py-2 text-sm ${getDropdownItemClass(false)} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded`}
                      onClick={() => handleMenuToggle(false)}
                    >
                      <span className={`material-symbols text-sm `} aria-hidden="true">
                        {item.icon || ''}
                      </span>
                      {item.text}
                    </Link>
                  ))}
                </div>
              </li>              

              {/* Portfolio with dropdown - Mobile */}
              <li className="relative">
                <div className="flex items-center">                        
                  <Link
                    href={localizedHref('/portfolio')}
                    onClick={() => handleMenuToggle(false)}
                    className={`flex-grow flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                    aria-label={locale === 'fi' ? 'Siirry portfoliosivulle' : 'Go to portfolio page'}
                  >
                    <span className={`material-symbols `} aria-hidden="true">work</span>
                    <span className="font-medium">{t('nav.portfolio')}</span>
                  </Link>
                </div>
                  {/* Portfolio submenu items */}
                <div className={`${getDropdownMenuClass()} mx-2 mb-2 border-t-0 rounded-t-none`}>
                  {portfolioDropdownItems.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={localizedHref(item.href)}
                      className={`flex items-center gap-2 w-full px-6 py-2 text-sm ${getDropdownItemClass(false)}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className={`material-symbols text-sm `}>
                        article
                      </span>
                      {t(item.textKey)}
                    </Link>
                  ))}
                </div>
              </li>

              {/* Design link - Mobile */}              
              <li>                  
                <Link
                  href={localizedHref('/coming-soon')}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                >
                  <span className={`material-symbols `}>design_services</span>
                  <span className="font-medium">Design</span>
                </Link>
              </li>

              {/* Blog link - Mobile */}
              <li>                  
                <Link
                  href={localizedHref('/blog')}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                >
                  <span className={`material-symbols `}>article</span>
                  <span className="font-medium">{t('nav.blog')}</span>
                </Link>
              </li>

              {/* Prompts link - Mobile */}
              <li>                
                <Link
                  href={localizedHref('/prompt')}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full flex items-center gap-2 py-3 px-4 rounded-lg ${theme === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} ${getTextColorClass()}`}
                >
                  <span className={`material-symbols `}>smart_toy</span>
                  <span className="font-medium">{t('nav.prompts')}</span>
                </Link>
              </li>
            </ul>

            {/* Close button */}            <div className="sticky bottom-4 left-0 right-0 mt-8 px-4 flex justify-center">
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
