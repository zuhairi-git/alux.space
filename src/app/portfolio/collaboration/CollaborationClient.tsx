'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Image from 'next/image';

export default function CollaborationClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      <article className="pt-24 pb-16">
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
            {/* Hero Image */}
            <motion.div 
              variants={fadeInUp}
              className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/portfolio/collaboration/cover.jpg"
                alt="Collaboration Workflow Platform"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Rest of the content */}
            {/* Header Section */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Collaboration Workflow Platform
            </motion.h1>

            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-xl text-gray-300 leading-relaxed">
                At the heart of the Collaboration Workflow Platform is a commitment to creativity, 
                interconnectivity, and real-time teamwork. This platform is designed to simplify 
                live collaboration, improve communication, and help teams deliver content more 
                efficiently across devices, time zones, and locations.
              </p>
            </motion.div>

            {/* Project Overview */}
            <motion.section variants={fadeInUp} className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Project Type</h3>
                    <p className="text-gray-300">Landing Page, Web & Mobile Platform, Mobile Application</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Timeline</h3>
                    <p className="text-gray-300">18 Weeks</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Tools</h3>
                    <p className="text-gray-300">Figma, FigJam, Maze</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">Roles</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Product Designer</li>
                    <li>Product Manager</li>
                    <li>User Research</li>
                    <li>Testing</li>
                    <li>Analytics</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Objectives */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Objectives</h2>
              <ul className="list-none space-y-4">
                {[
                  "Clarify each step's purpose for better user understanding",
                  "Communicate using business logic",
                  "Offer UI customization",
                  "Maintain consistent UI patterns",
                  "Ensure mobile-first responsive design"
                ].map((objective: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Design Process */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Design Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    phase: "Discover",
                    desc: "Research user needs and pain points",
                    icon: (
                      <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    )
                  },
                  { 
                    phase: "Define",
                    desc: "Analyze insights to scope the challenge",
                    icon: (
                      <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    )
                  },
                  { 
                    phase: "Develop",
                    desc: "Create solution concepts",
                    icon: (
                      <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    )
                  },
                  { 
                    phase: "Deliver",
                    desc: "Test with users and iterate",
                    icon: (
                      <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105"
                    whileHover={{ y: -5 }}
                  >
                    {item.icon}
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">{item.phase}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Research Findings */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Research Insights</h2>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-8 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-6">Participant Feedback</h3>
                    <div className="space-y-6">
                      {[
                        { label: "Creativity Value", value: 90 },
                        { label: "User-Friendliness", value: 95 },
                        { label: "Color Approval", value: 80 },
                        { label: "Accessibility", value: 85 }
                      ].map((metric, index) => (
                        <motion.div
                          key={index}
                          className="relative pt-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-300">{metric.label}</span>
                            <span className="text-blue-400 font-semibold">{metric.value}%</span>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-700">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-6">Key Recommendations</h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Enhanced Accessibility",
                          description: "Add clear labels to all icons and images",
                          icon: (
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )
                        },
                        {
                          title: "Keyboard Navigation",
                          description: "Improve focus states and keyboard shortcuts",
                          icon: (
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10H9m3-3v6m0-6V7" />
                            </svg>
                          )
                        },
                        {
                          title: "Color Contrast",
                          description: "Enhance contrast ratios for better readability",
                          icon: (
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          )
                        }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex-shrink-0">{item.icon}</div>
                          <div>
                            <h4 className="text-lg font-medium text-blue-400">{item.title}</h4>
                            <p className="text-gray-300">{item.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Personas */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">User Personas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                { [
                  {
                    name: "John J.",
                    role: "Marketing Manager",
                    traits: ["Tech-savvy", "Innovation-focused"],
                    needs: ["Collaboration tools", "Strategy alignment"],
                    goals: ["Streamline team communication", "Implement new marketing strategies"],
                    painPoints: ["Complex approval processes", "Scattered feedback channels"],
                    icon: (
                      <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )
                  },
                  {
                    name: "Julia Romes",
                    role: "Sales Director",
                    traits: ["Results-driven", "Mobile-first"],
                    needs: ["Quick collaboration", "On-the-go access"],
                    goals: ["Close deals faster", "Improve team coordination"],
                    painPoints: ["Limited mobile functionality", "Delayed responses"],
                    icon: (
                      <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  }
                ].map((persona, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-gray-700/30 rounded-lg mr-4">
                        {persona.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-blue-400">{persona.name}</h3>
                        <p className="text-gray-300">{persona.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-blue-400 mb-2">Traits</h4>
                        <div className="flex flex-wrap gap-2">
                          {persona.traits.map((trait, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-sm">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-blue-400 mb-2">Needs</h4>
                        <ul className="space-y-2">
                          {persona.needs.map((need, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {need}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-blue-400 mb-2">Goals</h4>
                        <ul className="space-y-2">
                          {persona.goals.map((goal, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-blue-400 mb-2">Pain Points</h4>
                        <ul className="space-y-2">
                          {persona.painPoints.map((point, i) => (
                            <li key={i} className="flex items-center text-gray-300">
                              <svg className="w-4 h-4 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Requirements & Testing */}
            <motion.section variants={fadeInUp} className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-blue-400">Product Requirements</h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Team Communication",
                        description: "Enable seamless real-time collaboration",
                        icon: (
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        )
                      },
                      {
                        title: "User Feedback Loop",
                        description: "Continuous collection of user insights",
                        icon: (
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        )
                      },
                      {
                        title: "Training Resources",
                        description: "Multi-level learning materials",
                        icon: (
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        )
                      },
                      {
                        title: "Documentation",
                        description: "Comprehensive support resources",
                        icon: (
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )
                      }
                    ].map((req, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        <div className="flex-shrink-0 p-2 bg-gray-700/30 rounded-lg">
                          {req.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-blue-400">{req.title}</h3>
                          <p className="text-gray-300">{req.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-6 text-blue-400">User Testing</h2>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-6">
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">Test Scenario</h3>
                      <div className="p-4 bg-gray-800/30 rounded-lg">
                        <p className="text-gray-300">Configure a new device using the prototype</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">Focus Areas</h3>
                      <div className="grid grid-cols-2 gap-4">
                        { [
                          {
                            area: "Usability",
                            icon: (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                              </svg>
                            )
                          },
                          {
                            area: "Creativity",
                            icon: (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            )
                          },
                          {
                            area: "Accessibility",
                            icon: (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )
                          },
                          {
                            area: "Visual Design",
                            icon: (
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )
                          }
                        ].map((focus, index) => (
                          <motion.div
                            key={index}
                            className="flex flex-col items-center p-4 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="p-2 bg-blue-400/10 rounded-lg mb-2">
                              <div className="text-blue-400">
                                {focus.icon}
                              </div>
                            </div>
                            <span className="text-gray-300 text-sm text-center">{focus.area}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Delivery Phase */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">Delivery Phase</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                { [
                  {
                    title: "High Fidelity Prototype",
                    description: "Interactive designs showcasing key features aligned with user goals and usability principles",
                    progress: 100,
                    icon: (
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  {
                    title: "Design Reviews",
                    description: "Structured feedback sessions with stakeholders to document key decisions and improvements",
                    progress: 100,
                    icon: (
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    )
                  },
                  {
                    title: "Quality Assurance",
                    description: "Comprehensive testing across devices to ensure consistent experience and performance",
                    progress: 100,
                    icon: (
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  },
                  {
                    title: "Documentation",
                    description: "Comprehensive documentation for future development and cross-functional collaboration",
                    progress: 100,
                    icon: (
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-3 bg-gray-700/30 rounded-lg">
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-blue-400 mb-2">{item.title}</h3>
                        <p className="text-gray-300 mb-4">{item.description}</p>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-400 bg-blue-400/10">
                                Completed
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-blue-400">
                                {item.progress}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-700">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </article>
    </main>
  );
}