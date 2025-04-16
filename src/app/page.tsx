'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/20 via-purple-500/20 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">Product Owner & Design Leader</h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            "A reminder from Ali to always seek inspiration from the world, pushing the boundaries of creativity and imagination without fear."
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-black/30"
      >
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">About Me</h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            With 10 years of experience in product design, Ali specializes in the Double Diamond design model, 
            focusing on divergent thinking and innovative product creation. His design philosophy revolves around 
            simplicity, elegance, and functionality. Ali is also a skilled problem-solver, adept at turning complex 
            challenges into intuitive, user-centric solutions.
          </p>
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
