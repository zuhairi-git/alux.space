'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const portfolioDropdownItems = [
  { href: '/portfolio/collaboration', text: 'Collaboration & Leadership' },
  { href: '/portfolio/jobseeking', text: 'Career Development' },
];

const Navigation = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

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
            className="text-3xl font-bold relative group"
          >
            <Link href="/" className="block">
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Ali Al-Zuhairi
              </motion.span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </Link>
          </motion.h1>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center text-gray-300 focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols text-3xl">menu</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:block">
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
                  <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">Home</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </Link>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -2 }}
                className="relative"
                onMouseEnter={() => setPortfolioOpen(true)}
                onMouseLeave={() => setPortfolioOpen(false)}
              >
                <div className="flex items-center gap-1">
                  <Link
                    href="/portfolio"
                    className="relative group flex items-center gap-1 text-gray-300 hover:text-white transition-colors focus:outline-none"
                    onClick={() => setPortfolioOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <button
                    className="relative group flex items-center text-gray-300 hover:text-white transition-colors focus:outline-none"
                    onClick={e => { e.stopPropagation(); setPortfolioOpen(v => !v); }}
                    aria-haspopup="true"
                    aria-expanded={portfolioOpen}
                    type="button"
                    tabIndex={-1}
                  >
                    <span className="material-symbols text-base transition-transform duration-200" style={{ transform: portfolioOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                  </button>
                </div>
                {/* Dropdown */}
                <div
                  className={`absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-gray-900/95 ring-1 ring-black/10 transition-all duration-200 z-50 ${portfolioOpen ? 'block' : 'hidden'}`}
                  onMouseEnter={() => setPortfolioOpen(true)}
                  onMouseLeave={() => setPortfolioOpen(false)}
                >
                  <ul className="py-2">
                    {portfolioDropdownItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2 text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 rounded transition-colors"
                          onClick={() => setPortfolioOpen(false)}
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
              <motion.li 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <Link href="/blog" className="relative group">
                  <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">Blog</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </Link>
              </motion.li>
            </motion.ul>
          </nav>

          {/* Mobile nav */}
          <nav className={`md:hidden fixed top-0 left-0 w-full h-full bg-black/80 z-40 transition-opacity duration-300 ${menuOpen ? 'block' : 'hidden'}`}
            onClick={() => setMenuOpen(false)}
          >
            <div className="container mx-auto px-4 pt-24">
              <ul className="space-y-6 text-xl">
                <li>
                  <Link href="/" className="block text-gray-200 hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <button
                    className="flex items-center gap-1 text-gray-200 hover:text-blue-400 w-full text-left focus:outline-none"
                    onClick={(e) => { e.stopPropagation(); setPortfolioOpen((v) => !v); }}
                    aria-haspopup="true"
                    aria-expanded={portfolioOpen}
                    type="button"
                  >
                    Portfolio
                    <span className="material-symbols text-base transition-transform duration-200" style={{ transform: portfolioOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                  </button>
                  {/* Dropdown for mobile */}
                  <div className={`mt-2 ml-4 border-l border-blue-500/20 pl-4 ${portfolioOpen ? 'block' : 'hidden'}`}> 
                    <ul className="space-y-2">
                      {portfolioDropdownItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-gray-300 hover:text-blue-400 transition-colors"
                            onClick={() => { setMenuOpen(false); setPortfolioOpen(false); }}
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li>
                  <Link href="/blog" className="block text-gray-200 hover:text-blue-400 transition-colors" onClick={() => setMenuOpen(false)}>Blog</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </motion.div>

      {/* Fancy bottom border effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
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