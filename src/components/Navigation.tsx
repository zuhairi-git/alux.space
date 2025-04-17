'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navigation = () => {
  return (
    <header className="fixed w-full bg-black/20 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          <Link href="/">Ali Al-Zuhairi</Link>
        </motion.h1>
        <nav>
          <ul className="flex space-x-6">
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
            </motion.li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;