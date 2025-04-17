'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navigation = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);

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

          <nav>
            <motion.ul 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex space-x-8"
            >
              {[
                { href: '/', text: 'Home' },
                { href: '/portfolio', text: 'Portfolio' },
                { href: '/blog', text: 'Blog' },
              ].map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link 
                    href={link.href} 
                    className="relative group"
                  >
                    <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors">
                      {link.text}
                    </span>
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
              ))}
            </motion.ul>
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