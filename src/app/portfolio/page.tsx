'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
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
                <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href="/" className="hover:text-blue-400 transition-colors">CV</Link>
              </motion.li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="min-h-screen pt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Project 1', type: 'UX Design', desc: 'Redesigning user experience for a major e-commerce platform' },
              { title: 'Project 2', type: 'Product Management', desc: 'Leading agile development of a fintech solution' },
              { title: 'Project 3', type: 'Design System', desc: 'Creating a scalable design system for enterprise applications' }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-400">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{project.type}</p>
                <p className="text-gray-300">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <footer className="bg-black/40 text-gray-400 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default PortfolioPage;