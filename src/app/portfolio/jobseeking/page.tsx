'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function JobseekingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navigation />
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Job Seeking Application</h1>
            <p className="text-lg text-gray-300 mb-8">A mobile app designed to streamline job searches—especially for local, part-time, and weekend work. Created to make job hunting faster, easier, and more efficient.</p>
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/80 rounded-lg p-4">
                <h2 className="text-base font-semibold text-blue-400 mb-2">Project Type</h2>
                <p className="text-gray-300">Frontend Application for End Users</p>
              </div>
              <div className="bg-gray-800/80 rounded-lg p-4">
                <h2 className="text-base font-semibold text-blue-400 mb-2">Timeline</h2>
                <p className="text-gray-300">8 Weeks</p>
              </div>
              <div className="bg-gray-800/80 rounded-lg p-4">
                <h2 className="text-base font-semibold text-blue-400 mb-2">Roles</h2>
                <p className="text-gray-300">Product Designer · Product Manager · User Research · Testing · Behavior Analytics</p>
              </div>
              <div className="bg-gray-800/80 rounded-lg p-4">
                <h2 className="text-base font-semibold text-blue-400 mb-2">Tools</h2>
                <p className="text-gray-300">Figma · FigJam · Maze</p>
              </div>
            </div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Design Process</h2>
              <div className="mb-4 text-gray-300">Model: <span className="font-semibold text-pink-400">Double Diamond</span></div>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li><span className="font-semibold text-blue-300">Discover:</span> Research and interviews to understand user pain points</li>
                <li><span className="font-semibold text-blue-300">Define:</span> Analyze insights to frame clear design problems</li>
                <li><span className="font-semibold text-blue-300">Develop:</span> Ideate solutions and test prototypes</li>
                <li><span className="font-semibold text-blue-300">Deliver:</span> Finalize solution through iterative testing and feedback</li>
              </ol>
            </div>
            {/* Discover Phase */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Discover Phase</h2>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Challenge</h3>
              <p className="mb-4 text-gray-300">How can users quickly find trustworthy local jobs, either temporary or permanent?</p>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Discovery Insights</h3>
              <p className="mb-4 text-gray-300">Rising living costs are pushing people to seek extra income—weekend jobs being the most flexible option. A reliable job app helps users showcase their availability and skills efficiently.</p>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Initial Research</h3>
              <p className="mb-4 text-gray-300">Job platforms vary in usability and trust. One solution is to introduce job contracts post-match for more reliability and user trust.</p>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Hypothesis</h3>
              <p className="mb-4 text-gray-300">A locally-focused, easy-to-use job app with personalized profiles can better serve job seekers compared to global platforms.</p>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Primary Research</h3>
              <div className="mb-2 text-gray-300">Objectives:</div>
              <ul className="list-disc list-inside mb-2 text-gray-300">
                <li>Gauge app awareness and usage</li>
                <li>Identify user pain points</li>
                <li>Gather UX improvement suggestions</li>
              </ul>
              <div className="mb-2 text-gray-300">Methods:</div>
              <ul className="list-disc list-inside mb-2 text-gray-300">
                <li>Interviews (semi-structured)</li>
                <li>Surveys (mixed questions)</li>
                <li>App usage tracking</li>
                <li>Thematic and quantitative data analysis</li>
              </ul>
              <div className="mb-2 text-gray-300">Ethics:</div>
              <p className="text-gray-300">Informed consent, anonymity, voluntary participation</p>
            </div>
            {/* Define Phase */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Define Phase</h2>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Personas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800/80 rounded-lg p-4">
                  <div className="font-bold text-blue-300 mb-1">Allen (20, Student)</div>
                  <div className="text-gray-300 text-sm">Uses app infrequently for quick cash. Flexible with night/weekend shifts. Reliable when he works.</div>
                </div>
                <div className="bg-gray-800/80 rounded-lg p-4">
                  <div className="font-bold text-blue-300 mb-1">James (23, Uni Student)</div>
                  <div className="text-gray-300 text-sm">Works 2–3 shifts/week in hospitality. Prefers consistent roles at favorite venues.</div>
                </div>
                <div className="bg-gray-800/80 rounded-lg p-4">
                  <div className="font-bold text-blue-300 mb-1">Eeva (40, Regular User)</div>
                  <div className="text-gray-300 text-sm">Relies on app for 20–40% of income. Plans work in advance, highly dependable, no sector preference.</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">User Flow</h3>
              <p className="mb-4 text-gray-300">MVP supports quick ideation and development for early product maturity—ideal for independent designers and startups.</p>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Product Requirements</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>User Profiles: Sign-up, skills, experience, availability</li>
                <li>Job Search & Filters: Location, pay, industry, saved filters</li>
                <li>Notifications: New listings, deadlines, interviews</li>
                <li>Messaging: In-app chat for employer/job seeker interaction</li>
                <li>Recommendations: Tailored job suggestions</li>
                <li>Analytics: Application stats and job search insights</li>
              </ul>
            </div>
            {/* Develop Phase */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Develop Phase</h2>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">Epic Goal</h3>
              <p className="mb-4 text-gray-300">Enable fast income opportunities via local gigs</p>
              <h3 className="text-lg font-semibold text-pink-400 mb-2">User Testing</h3>
              <p className="text-gray-300">In progress</p>
            </div>
            {/* Deliver Phase */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Deliver Phase</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mb-2">
                <li><span className="font-semibold text-blue-300">High-Fidelity Prototype:</span> Visual walkthrough of the final UI, tested against user goals.</li>
                <li><span className="font-semibold text-blue-300">Design Reviews:</span> Structured feedback sessions to evaluate UI quality and usability. All feedback is documented.</li>
                <li><span className="font-semibold text-blue-300">Quality Assurance:</span> Covers usability, cross-device compatibility, and visual consistency</li>
                <li><span className="font-semibold text-blue-300">Design Documentation:</span> Finalized assets, design decisions, and handoff materials—ready for development collaboration.</li>
              </ul>
            </div>
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