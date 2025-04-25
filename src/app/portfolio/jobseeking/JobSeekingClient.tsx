'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export default function JobSeekingClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <article className="pt-24 pb-16 relative z-10">
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
              src="/images/portfolio/jobseeking/cover.jpeg"
              alt="Job Seeking Application"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Header Section */}
          <motion.h1 
            variants={fadeInUp}
            className={`text-5xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}
          >
            Job Seeking Application
          </motion.h1>

          <motion.div variants={fadeInUp} className="mb-12">
            <p className="text-xl opacity-80 leading-relaxed">
              A mobile app designed to streamline job searches—especially for local, part-time, and weekend work. 
              Created to make job hunting faster, easier, and more efficient for people seeking additional income opportunities.
            </p>
          </motion.div>

          {/* Project Overview */}
          <motion.section variants={fadeInUp} className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary">Project Type</h3>
                  <p className="opacity-80">Frontend Application for End Users</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Timeline</h3>
                  <p className="opacity-80">8 Weeks</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Tools</h3>
                  <p className="opacity-80">Figma, FigJam, Maze</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Roles</h3>
                <ul className="list-disc list-inside opacity-80 space-y-2">
                  <li>Product Designer</li>
                  <li>Product Manager</li>
                  <li>User Research</li>
                  <li>Testing</li>
                  <li>Behavior Analytics</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Design Process */}
          <motion.section variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-primary">Design Process</h2>
            <div className="mb-4 opacity-80">Model: <span className="font-semibold text-primary">Double Diamond</span></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  phase: "Discover",
                  desc: "Research and interviews to understand user pain points",
                  icon: (
                    <span className="material-symbols text-3xl text-purple-400">search</span>
                  )
                },
                { 
                  phase: "Define",
                  desc: "Analyze insights to frame clear design problems",
                  icon: (
                    <span className="material-symbols text-3xl text-purple-400">notes</span>
                  )
                },
                { 
                  phase: "Develop",
                  desc: "Ideate solutions and test prototypes",
                  icon: (
                    <span className="material-symbols text-3xl text-purple-400">edit</span>
                  )
                },
                { 
                  phase: "Deliver",
                  desc: "Finalize solution through iterative testing and feedback",
                  icon: (
                    <span className="material-symbols text-3xl text-purple-400">rocket_launch</span>
                  )
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="theme-card"
                >
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                    <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.phase}</h3>
                    <p className="opacity-80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Discover Phase */}
          <motion.section variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-primary">Discover Phase</h2>
            <div className="theme-card">
              <div className="theme-card-content p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Challenge</h3>
                    <p className="opacity-80">How can users quickly find trustworthy local jobs, either temporary or permanent?</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Discovery Insights</h3>
                    <p className="opacity-80">Rising living costs are pushing people to seek extra income—weekend jobs being the most flexible option. A reliable job app helps users showcase their availability and skills efficiently.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Initial Research</h3>
                    <p className="opacity-80">Job platforms vary in usability and trust. One solution is to introduce job contracts post-match for more reliability and user trust.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Hypothesis</h3>
                    <p className="opacity-80">A locally-focused, easy-to-use job app with personalized profiles can better serve job seekers compared to global platforms.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Primary Research</h3>
                    <div className="mb-2 font-medium">Objectives:</div>
                    <ul className="list-inside mb-4 opacity-80 space-y-1">
                      <li className="flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">target</span>
                        Gauge app awareness and usage
                      </li>
                      <li className="flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">psychology</span>
                        Identify user pain points
                      </li>
                      <li className="flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">lightbulb</span>
                        Gather UX improvement suggestions
                      </li>
                    </ul>
                    <div className="mb-2 font-medium">Methods:</div>
                    <ul className="list-inside mb-4 opacity-80 space-y-1">
                      <li className="flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">group</span>
                        Interviews (semi-structured)
                      </li>
                      <li className="flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">list_alt</span>
                        Surveys (mixed questions)
                      </li>
                      <li className="flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">trending_up</span>
                        App usage tracking
                      </li>
                      <li className="flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">data_object</span>
                        Thematic and quantitative data analysis
                      </li>
                    </ul>
                    <div className="mb-2 font-medium">Ethics:</div>
                    <p className="opacity-80 flex items-center">
                      <span className="material-symbols text-sm text-purple-400 mr-2">verified_user</span>
                      Informed consent, anonymity, voluntary participation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Define Phase */}
          <motion.section variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-primary">Define Phase</h2>
            <div className="theme-card">
              <div className="theme-card-content p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Personas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-theme/20 p-4 rounded-lg">
                        <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                          <span className="material-symbols text-3xl text-purple-400">person</span>
                        </div>
                        <div className="font-bold text-primary mb-2">Allen (20, Student)</div>
                        <p className="opacity-80 text-sm">Uses app infrequently for quick cash. Flexible with night/weekend shifts. Reliable when he works.</p>
                      </div>
                      <div className="bg-theme/20 p-4 rounded-lg">
                        <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                          <span className="material-symbols text-3xl text-purple-400">school</span>
                        </div>
                        <div className="font-bold text-primary mb-2">James (23, Uni Student)</div>
                        <p className="opacity-80 text-sm">Works 2–3 shifts/week in hospitality. Prefers consistent roles at favorite venues.</p>
                      </div>
                      <div className="bg-theme/20 p-4 rounded-lg">
                        <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                          <span className="material-symbols text-3xl text-purple-400">work</span>
                        </div>
                        <div className="font-bold text-primary mb-2">Eeva (40, Regular User)</div>
                        <p className="opacity-80 text-sm">Relies on app for 20–40% of income. Plans work in advance, highly dependable, no sector preference.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">User Flow</h3>
                    <p className="opacity-80">MVP supports quick ideation and development for early product maturity—ideal for independent designers and startups.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Product Requirements</h3>
                    <ul className="list-disc list-inside opacity-80 space-y-2">
                      <li>User Profiles: Sign-up, skills, experience, availability</li>
                      <li>Job Search & Filters: Location, pay, industry, saved filters</li>
                      <li>Notifications: New listings, deadlines, interviews</li>
                      <li>Messaging: In-app chat for employer/job seeker interaction</li>
                      <li>Recommendations: Tailored job suggestions</li>
                      <li>Analytics: Application stats and job search insights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Develop & Deliver Phases */}
          <motion.section variants={fadeInUp} className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <h2 className="text-2xl font-bold mb-6 text-primary">Develop Phase</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">Epic Goal</h3>
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-3">
                          <span className="material-symbols text-3xl text-purple-400">flight_takeoff</span>
                        </div>
                        <p className="opacity-80">Enable fast income opportunities via local gigs</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">User Testing</h3>
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-3">
                          <span className="material-symbols text-3xl text-purple-400">checklist</span>
                        </div>
                        <p className="opacity-80">In progress</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <h2 className="text-2xl font-bold mb-6 text-primary">Deliver Phase</h2>
                  <ul className="list-disc list-inside opacity-80 space-y-3">
                    <li><span className="font-semibold text-primary">High-Fidelity Prototype:</span> Visual walkthrough of the final UI, tested against user goals.</li>
                    <li><span className="font-semibold text-primary">Design Reviews:</span> Structured feedback sessions to evaluate UI quality and usability. All feedback is documented.</li>
                    <li><span className="font-semibold text-primary">Quality Assurance:</span> Covers usability, cross-device compatibility, and visual consistency</li>
                    <li><span className="font-semibold text-primary">Design Documentation:</span> Finalized assets, design decisions, and handoff materials—ready for development collaboration.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
      
      <footer className="mt-16 py-8 opacity-70">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </article>
  );
} 