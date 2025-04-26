'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';
import { useTheme } from '@/context/ThemeContext';

const portfolioDropdownItems = [
  { href: '/portfolio/collaboration', text: 'Collaboration & Leadership' },
  { href: '/portfolio/jobseeking', text: 'Career Development' },
];

const Navigation = () => {
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  
  // Use different background colors based on theme
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    theme === 'light' 
      ? ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"] 
      : ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const portfolioTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const portfolioMenuRef = useRef<HTMLDivElement>(null);
  const portfolioButtonRef = useRef<HTMLLIElement>(null);
  // State for mobile portfolio dropdown
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);

  // Handle portfolio dropdown timeout
  const handleMenuOpen = () => {
    // Clear any existing timeout
    if (portfolioTimeoutRef.current) {
      clearTimeout(portfolioTimeoutRef.current);
      portfolioTimeoutRef.current = null;
    }
    setPortfolioOpen(true);
  };

  const handleMenuClose = () => {
    // Set a timeout to close the menu after 3 seconds
    portfolioTimeoutRef.current = setTimeout(() => {
      setPortfolioOpen(false);
    }, 3000);
  };

  // Handle clicks outside the portfolio dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        portfolioOpen && 
        portfolioMenuRef.current && 
        portfolioButtonRef.current && 
        !portfolioMenuRef.current.contains(event.target as Node) &&
        !portfolioButtonRef.current.contains(event.target as Node)
      ) {
        setPortfolioOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (portfolioTimeoutRef.current) {
        clearTimeout(portfolioTimeoutRef.current);
      }
    };
  }, [portfolioOpen]);

  // Determine text color based on theme
  const getTextColorClass = (isActive = false) => {
    if (theme === 'light') {
      return isActive ? 'text-primary' : 'text-gray-800 hover:text-primary';
    }
    return isActive ? 'text-white' : 'text-gray-300 hover:text-white';
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
        <div className="flex justify-between items-center">
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
            <span className="material-symbols text-3xl">menu</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.ul 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex space-x-8"
            >
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <Link href="/" className="relative group">
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>Home</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-start/10 to-end/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.li>
              <motion.li 
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                ref={portfolioButtonRef}
              >
                <Link 
                  href="/portfolio" 
                  className={`flex items-center space-x-1 transition-colors ${getTextColorClass()}`}
                  onMouseEnter={handleMenuOpen}
                  onMouseLeave={handleMenuClose}
                >
                  <span>Portfolio</span>
                  <span className={`material-symbols transform transition-transform ${portfolioOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </Link>
                
                {portfolioOpen && (
                  <motion.div
                    ref={portfolioMenuRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ 
                      duration: portfolioOpen ? 0.2 : 0.5, // Longer fade out
                      ease: "easeInOut" 
                    }}
                    className={`absolute left-0 mt-2 w-64 rounded-lg ${theme === 'light' ? 'bg-white/90' : 'bg-black/90'} backdrop-blur-lg shadow-lg ring-1 ring-black/5 overflow-hidden`}
                    onMouseEnter={handleMenuOpen}
                    onMouseLeave={handleMenuClose}
                  >
                    <div className="py-2">
                      {portfolioDropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-3 ${getTextColorClass()} hover:bg-primary/10 transition-colors`}
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <Link href="/blog" className="relative group">
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>Blog</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300"
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
                  <span className={`relative z-10 transition-colors ${getTextColorClass()}`}>Prompts</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-start to-end group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-start/10 to-end/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </Link>
              </motion.li>
            </motion.ul>
            
            {/* Theme Switcher - Desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="ml-6"
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
              className={`md:hidden absolute top-full left-0 w-full mt-1 ${theme === 'light' ? 'bg-white/95' : 'bg-black/95'} shadow-lg backdrop-blur-md rounded-b-lg overflow-hidden`}
            >
              <ul className="flex flex-col items-center space-y-4 py-4">
                <li>
                  <Link href="/" className={`block py-2 ${getTextColorClass()}`} onClick={() => setMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                {/* Mobile Portfolio Item with Dropdown */}
                <li className="w-full text-center">
                  <button 
                    className={`flex items-center justify-center w-full py-2 ${getTextColorClass()} focus:outline-none`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent closing the main menu
                      setMobilePortfolioOpen(!mobilePortfolioOpen);
                    }}
                    aria-expanded={mobilePortfolioOpen}
                    aria-controls="mobile-portfolio-menu"
                  >
                    <span>Portfolio</span>
                    <span className={`material-symbols transform transition-transform ml-1 ${mobilePortfolioOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>
                  {/* Mobile Portfolio Submenu */}
                  {mobilePortfolioOpen && (
                    <motion.ul
                      id="mobile-portfolio-menu"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-2 space-y-2 overflow-hidden"
                    >
                      {portfolioDropdownItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`block py-2 text-sm ${getTextColorClass()} hover:bg-primary/10 transition-colors`}
                            onClick={() => {
                              setMobilePortfolioOpen(false);
                              setMenuOpen(false); // Close main menu on navigation
                            }}
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
                <li>
                  <Link href="/blog" className={`block py-2 ${getTextColorClass()}`} onClick={() => setMenuOpen(false)}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/prompt" className={`block py-2 ${getTextColorClass()}`} onClick={() => setMenuOpen(false)}>
                    Prompts
                  </Link>
                </li>
                 {/* Theme Switcher - Mobile */}
                 <li className="pt-4 border-t border-gray-500/30 mt-4 w-full flex justify-center">
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