'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/hero/Hero';
import type { HeroConfig } from '@/types/hero';

const heroConfig: HeroConfig = {
  variant: 'creative',
  title: 'Product Owner & Design Leader',
  subtitle: 'Transforming Ideas into Exceptional Digital Experiences',
  quote: {
    text: 'Always remember to seek inspiration from the world around you. The smallest details and the foremost wonders can ignite a spark within your mind and lead you to create something exceptional. Allow your imagination to roam freely, unbound by limitations, and be fearless in pushing the boundaries of what is possible.',
    author: 'Ali'
  },
  backgroundEffect: 'design-code',
  cta: {
    text: 'Explore My Work',
    href: '/portfolio'
  }
};

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navigation />
      <Hero config={heroConfig} />

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-black/30 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Crafting Digital Dreams into Reality
              </h3>
              
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Hey there! I&apos;m Ali, a passionate dreamer and creative soul who believes in the power of design to transform ideas into meaningful experiences. With my journey spanning across continents &ndash; from Damascus to Helsinki &ndash; I&apos;ve learned that great design is about more than just aesthetics; it&apos;s about touching hearts and solving real problems.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-blue-400 italic"
                >
                  &ldquo;Every pixel has a purpose, every interaction tells a story.&rdquo;
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Over the past decade, I&apos;ve had the joy of breathing life into countless digital products, always guided by the Double Diamond approach but colored with my own creative flair. I believe in making technology feel more human, more accessible, and maybe even a little magical. ✨
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-4"
                >
                  <span className="text-gray-400">When I&apos;m not designing, you&apos;ll find me exploring new technologies, sharing knowledge with fellow designers, or simply dreaming up the next big idea that could make someone&apos;s digital life a little bit better.</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">Strengths & Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'UI/UX Design', desc: 'Expertise in Figma & Adobe CC' },
              { title: 'Research', desc: 'Skilled in qualitative and quantitative research' },
              { title: 'Design Systems', desc: 'Creating consistent, scalable frameworks' },
              { title: 'Project Management', desc: 'Agile methodology (Jira, Scrum, Kanban)' },
              { title: 'Test Management', desc: 'Proficient with Maze and Zephyr Scale' },
              { title: 'Tech Stack', desc: 'Web/mobile UI, WordPress, HubSpot, React JS' },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
              >
                <h4 className="text-xl font-semibold mb-2 text-blue-400">{skill.title}</h4>
                <p className="text-gray-400">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work Experience Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-black/30 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="absolute h-full w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent left-1/2 transform -translate-x-1/2 md:left-[20%] top-0" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              className="material-symbols text-4xl text-blue-400 mb-4 inline-block"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              work_history
            </motion.span>
            <h3 className="text-3xl font-bold mb-4">Work Experience</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">A journey through my professional career, showcasing my growth and expertise in design and technology.</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70" />
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <span className="material-symbols text-3xl text-purple-400 p-3 bg-purple-400/10 rounded-lg">
                    rocket_launch
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <h4 className="text-xl font-semibold text-purple-400 mb-2 md:mb-0">Product Designer | Product Owner</h4>
                      <span className="text-gray-400 flex items-center gap-2">
                        <span className="material-symbols text-sm">schedule</span>
                        2023 - Present
                      </span>
                    </div>
                    <h5 className="text-lg text-gray-300 mb-3 flex items-center gap-2">
                      <span className="material-symbols text-sm">location_on</span>
                      Webropol, Helsinki, Finland
                    </h5>
                    <p className="text-gray-400">Product vision, specifying features, prototyping, and handing off design system to developers.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70" />
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <span className="material-symbols text-3xl text-blue-400 p-3 bg-blue-400/10 rounded-lg">
                    insights
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <h4 className="text-xl font-semibold text-blue-400 mb-2 md:mb-0">Professional Product Designer</h4>
                      <span className="text-gray-400 flex items-center gap-2">
                        <span className="material-symbols text-sm">schedule</span>
                        2017 - 2023
                      </span>
                    </div>
                    <h5 className="text-lg text-gray-300 mb-3 flex items-center gap-2">
                      <span className="material-symbols text-sm">location_on</span>
                      Reslink, Espoo, Finland
                    </h5>
                    <p className="text-gray-400">Workflow and Cloud Management, WebApp (SaaS), and Mobile.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70" />
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <span className="material-symbols text-3xl text-blue-400 p-3 bg-blue-400/10 rounded-lg">
                    grid_view
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <h4 className="text-xl font-semibold text-blue-400 mb-2 md:mb-0">Senior UI/UX Designer & IT Expert</h4>
                      <span className="text-gray-400 flex items-center gap-2">
                        <span className="material-symbols text-sm">schedule</span>
                        2016 - 2023
                      </span>
                    </div>
                    <h5 className="text-lg text-gray-300 mb-3 flex items-center gap-2">
                      <span className="material-symbols text-sm">location_on</span>
                      Reslink, Helsinki, Finland
                    </h5>
                    <p className="text-gray-400">Web Application, Android UI Development, and VPN Management.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group opacity-90 hover:opacity-100"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70" />
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-8 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-gray-400/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <span className="material-symbols text-3xl text-gray-400 p-3 bg-gray-400/10 rounded-lg">
                    history
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <h4 className="text-xl font-semibold text-gray-300 mb-2 md:mb-0">Earlier Positions</h4>
                      <span className="text-gray-400 flex items-center gap-2">
                        <span className="material-symbols text-sm">schedule</span>
                        2000 - 2016
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-lg text-gray-400 mb-1">Graphic Designer UI/UX & IT Expert</h5>
                        <p className="text-gray-500">Reslink, Helsinki, Finland (2014 - 2016)</p>
                      </div>
                      <div>
                        <h5 className="text-lg text-gray-400 mb-1">Freelance IT Expert & UI Developer</h5>
                        <p className="text-gray-500">From Damascus to Espoo (2000 - 2014)</p>
                      </div>
                      <div>
                        <h5 className="text-lg text-gray-400 mb-1">Graphic Designer & IT Expert</h5>
                        <p className="text-gray-500">Various Magazines and Newspapers — Tehran, Iran</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Additional Sections */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-black/30"
      >
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl"
            >
              <h4 className="text-xl font-semibold mb-4 text-blue-400">Experience & Achievements</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Professional journey and roles</li>
                <li>• Key milestones and successes</li>
              </ul>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl"
            >
              <h4 className="text-xl font-semibold mb-4 text-blue-400">Connect & Learn More</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Social Media connections</li>
                <li>• Recommendations and testimonials</li>
                <li>• Blog insights and updates</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <footer className="bg-black/40 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
