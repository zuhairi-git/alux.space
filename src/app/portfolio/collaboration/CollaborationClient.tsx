'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

export default function CollaborationClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <main className="min-h-screen bg-theme text-theme">
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
              className={`text-5xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}
            >
              Collaboration Workflow Platform
            </motion.h1>

            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-xl opacity-80 leading-relaxed">
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
                    <h3 className="text-lg font-semibold text-primary">Project Type</h3>
                    <p className="opacity-80">Landing Page, Web & Mobile Platform, Mobile Application</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Timeline</h3>
                    <p className="opacity-80">18 Weeks</p>
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
                    <li>Analytics</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Objectives */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Objectives</h2>
              <ul className="list-none space-y-4">
                {[
                  "Clarify each step's purpose for better user understanding",
                  "Communicate using business logic",
                  "Offer UI customization",
                  "Maintain consistent UI patterns",
                  "Ensure mobile-first responsive design"
                ].map((objective: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-3 bg-primary rounded-full"></span>
                    <span className="opacity-80">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Design Process */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Design Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    phase: "Discover",
                    desc: "Research user needs and pain points",
                    icon: (
                      <span className="material-symbols text-4xl">search</span>
                    )
                  },
                  { 
                    phase: "Define",
                    desc: "Analyze insights to scope the challenge",
                    icon: (
                      <span className="material-symbols text-4xl">notes</span>
                    )
                  },
                  { 
                    phase: "Develop",
                    desc: "Create solution concepts",
                    icon: (
                      <span className="material-symbols text-4xl">edit</span>
                    )
                  },
                  { 
                    phase: "Deliver",
                    desc: "Test with users and iterate",
                    icon: (
                      <span className="material-symbols text-4xl">rocket_launch</span>
                    )
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="theme-card-flex p-6 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.phase}</h3>
                    <p className="opacity-80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Research Findings */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Research Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-lg5">
                  <h3 className="text-xl font-semibold text-primary mb-6">Participant Feedback</h3>
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
                          <span className="text-opacity-80">{metric.label}</span>
                          <span className="text-primary font-semibold">{metric.value}%</span>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-400/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-400"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary mb-6">Key Recommendations</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Enhanced Accessibility",
                        description: "Add clear labels to all icons and images",
                        icon: (
                          <span className="material-symbols text-4xl">person</span>
                        )
                      },
                      {
                        title: "Keyboard Navigation",
                        description: "Improve focus states and keyboard shortcuts",
                        icon: (
                          <span className="material-symbols text-4xl">keyboard</span>
                        )
                      },
                      {
                        title: "Color Contrast",
                        description: "Enhance contrast ratios for better readability",
                        icon: (
                          <span className="material-symbols text-4xl">palette</span>
                        )
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex items-start space-x-4 self-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0">
                          <div className="h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                            {item.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-primary">{item.title}</h4>
                          <p className="text-opacity-80">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Personas */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">User Personas</h2>
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
                      <span className="material-symbols text-4xl">groups</span>
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
                      <span className="material-symbols text-4xl">groups</span>
                    )
                  }
                ].map((persona, index) => (
                  <motion.div
                    key={index}
                    className="theme-card-flex p-6 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-4">
                        {persona.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{persona.name}</h3>
                        <p className="text-opacity-80">{persona.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">Traits</h4>
                        <div className="flex flex-wrap gap-2">
                          {persona.traits.map((trait, i) => (
                            <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">Needs</h4>
                        <ul className="space-y-2">
                          {persona.needs.map((need, i) => (
                            <li key={i} className="flex items-center text-opacity-80">
                              <span className="material-symbols text-sm mr-2">check_circle</span>
                              {need}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">Goals</h4>
                        <ul className="space-y-2">
                          {persona.goals.map((goal, i) => (
                            <li key={i} className="flex items-center text-opacity-80">
                              <span className="material-symbols text-sm mr-2">arrow_forward</span>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">Pain Points</h4>
                        <ul className="space-y-2">
                          {persona.painPoints.map((point, i) => (
                            <li key={i} className="flex items-center text-opacity-80">
                              <span className="material-symbols text-sm mr-2">warning</span>
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
                <div className="p-6 rounded-lg">
                  <h2 className="text-3xl font-bold mb-6 text-primary">Product Requirements</h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Team Communication",
                        description: "Enable seamless real-time collaboration",
                        icon: (
                          <span className="material-symbols text-4xl">group</span>
                        )
                      },
                      {
                        title: "User Feedback Loop",
                        description: "Continuous collection of user insights",
                        icon: (
                          <span className="material-symbols text-4xl">feedback</span>
                        )
                      },
                      {
                        title: "Training Resources",
                        description: "Multi-level learning materials",
                        icon: (
                          <span className="material-symbols text-4xl">school</span>
                        )
                      },
                      {
                        title: "Documentation",
                        description: "Comprehensive support resources",
                        icon: (
                          <span className="material-symbols text-4xl">description</span>
                        )
                      }
                    ].map((req, index) => (
                      <motion.div
                        key={index}
                        className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex items-start space-x-4 self-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                          {req.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary">{req.title}</h3>
                          <p className="text-opacity-80">{req.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-lg">
                  <h2 className="text-3xl font-bold mb-6 text-primary">User Testing</h2>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-primary mb-4">Test Scenario</h3>
                    <div className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 self-start">
                      <p className="text-opacity-80">Configure a new device using the prototype</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">Focus Areas</h3>
                    <div className="grid grid-cols-2 gap-4 grid-flow-row auto-rows-auto">
                      { [
                        {
                          area: "Usability",
                          icon: (
                            <span className="material-symbols text-4xl">touch_app</span>
                          )
                        },
                        {
                          area: "Creativity",
                          icon: (
                            <span className="material-symbols text-4xl">brush</span>
                          )
                        },
                        {
                          area: "Accessibility",
                          icon: (
                            <span className="material-symbols text-4xl">accessibility</span>
                          )
                        },
                        {
                          area: "Visual Design",
                          icon: (
                            <span className="material-symbols text-4xl">image</span>
                          )
                        }
                      ].map((focus, index) => (
                        <div
                          key={index}
                          className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
                        >
                          <div className="h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-2">
                            <div className="text-purple-400">
                              {focus.icon}
                            </div>
                          </div>
                          <span className="text-opacity-80 text-sm text-center">{focus.area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Delivery Phase */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">Delivery Phase</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                { [
                  {
                    title: "High Fidelity Prototype",
                    description: "Interactive designs showcasing key features aligned with user goals and usability principles",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">devices</span>
                    )
                  },
                  {
                    title: "Design Reviews",
                    description: "Structured feedback sessions with stakeholders to document key decisions and improvements",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">reviews</span>
                    )
                  },
                  {
                    title: "Quality Assurance",
                    description: "Comprehensive testing across devices to ensure consistent experience and performance",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">verified</span>
                    )
                  },
                  {
                    title: "Documentation",
                    description: "Comprehensive documentation for future development and cross-functional collaboration",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">folder</span>
                    )
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="theme-card-flex p-6 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                        <p className="text-opacity-80 mb-4">{item.description}</p>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                                Completed
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-primary">
                                {item.progress}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-400/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-400"
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