'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

interface Achievement {
  title: string;
  description: string;
  metrics: string[];
  imageQuery: string;
  photo?: {
    url: string;
    author: {
      name: string;
      username: string;
      link: string;
    };
  };
}

interface Props {
  achievements: Achievement[];
}

export default function CollaborationClient({ achievements }: Props) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Collaboration & Leadership
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-300 mb-12"
            >
              Building bridges between design, development, and business through effective collaboration and leadership.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="grid gap-12"
            >
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="relative w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                      {achievement.photo ? (
                        <>
                          <Image
                            src={achievement.photo.url}
                            alt={achievement.title}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute bottom-2 right-2 text-xs text-white/70">
                            Photo by{' '}
                            <a
                              href={achievement.photo.author.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white"
                            >
                              {achievement.photo.author.name}
                            </a>
                            {' '}on{' '}
                            <a
                              href="https://unsplash.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white"
                            >
                              Unsplash
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <span className="text-gray-600">Image unavailable</span>
                        </div>
                      )}
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold mb-4 text-blue-400">{achievement.title}</h3>
                      <p className="text-gray-300 mb-4">{achievement.description}</p>
                      <ul className="space-y-2 text-gray-400">
                        {achievement.metrics.map((metric, idx) => (
                          <li key={idx} className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-black/40 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}