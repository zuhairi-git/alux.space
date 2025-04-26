'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/hero/Hero';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import type { HeroConfig } from '@/types/hero';
import QuoteBlock from "@/components/ui/QuoteBlock";

const heroConfig: HeroConfig = {
  variant: 'creative',
  title: 'Product Owner & Design Leader',
  subtitle: '',
  quote: {
    text: 'The universe around you is a boundless canvas — from the tiniest wonders to the grandest stars, every detail holds the power to ignite brilliance within you. Let your imagination drift among galaxies, unchained and fearless, pushing beyond the edges of the possible. Dare to dream across the infinite, and you will create what was once thought unreachable.',
    author: 'Ali'
  },
  backgroundEffect: 'design-code',
  cta: {
    text: 'Explore My Work',
    href: '/portfolio'
  }
};

// Cursor follower effect component
const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  return (
    <motion.div
      className="hidden lg:block fixed w-64 h-64 pointer-events-none z-50"
      animate={{ 
        x: position.x - 128, 
        y: position.y - 128,
        opacity: isVisible ? 0.15 : 0
      }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-violet-500 rounded-full filter blur-3xl"></div>
    </motion.div>
  );
};

const InteractiveSkillCard = ({ skill, index }: { skill: { title: string, desc: string }, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="theme-card relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="theme-card-content p-6 relative z-10 transition-all duration-300"
        whileHover={{ 
          y: 0,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        <motion.h4 
          className="text-xl font-semibold mb-2 text-primary"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {skill.title}
        </motion.h4>
        <p className="opacity-70">{skill.desc}</p>
        
        {isHovered && (
          <motion.div 
            className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-primary/5 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
    </motion.div>
  );
};

const HomePage = () => {
  // Parallax effect for background elements
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    // Smooth mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      // Using lerp (linear interpolation) for smoother movement
      const newX = e.clientX / window.innerWidth - 0.5;
      const newY = e.clientY / window.innerHeight - 0.5;
      
      setMousePos(prev => ({
        x: prev.x + (newX - prev.x) * 0.1, // Adjust 0.1 for different smoothness
        y: prev.y + (newY - prev.y) * 0.1
      }));
    };
    
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    // Animation frame for smoother updates
    let animationFrameId: number;
    const updateMousePosition = () => {
      animationFrameId = requestAnimationFrame(updateMousePosition);
    };
    updateMousePosition();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="min-h-screen bg-theme text-theme overflow-hidden">
      {/* Cursor follower effect */}
      <CursorFollower />
      
      {/* Interactive background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div 
          className="absolute top-[20%] right-[10%] opacity-10 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-600 blur-3xl"
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${mousePos.x * 40}px)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        />
        <div 
          className="absolute top-[50%] left-[5%] opacity-10 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-600 blur-3xl"
          style={{ 
            transform: `translateY(${scrollY * -0.15}px) translateX(${mousePos.x * -40}px)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
          }}
        />
      </div>
      
      <Navigation />
      <Hero config={heroConfig} />
      
      {/* Work Experience Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black/5 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        <div className="absolute h-full w-1 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent left-1/2 transform -translate-x-1/2 md:left-[20%] md:top-[25%]" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              className="material-symbols text-3xl p-3 mb-5 rounded-lg text-purple-400 bg-purple-400/10"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              work_history
            </motion.span>
            <h3 className="text-3xl font-bold mb-4">Work Experience</h3>
            <p className="opacity-70 max-w-2xl mx-auto">A journey through my professional career, showcasing my growth and expertise in design and technology.</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {/* Current role */}
            <Card 
              variant="primary" 
              slideDirection="left"
            >
              <CardContent
                icon="rocket_launch"
                iconClassName="text-purple-400 bg-purple-400/10"
                title="Product Designer | Product Owner"
                location="Webropol, Helsinki, Finland"
                date="2023 - Present"
              >
                <p className="opacity-70">Product vision, specifying features, prototyping, and handing off design system to developers.</p>
              </CardContent>
            </Card>

            {/* Professional Product Designer */}
            <Card 
              variant="secondary" 
              slideDirection="right"
            >
              <CardContent
                icon="insights"
                iconClassName="text-blue-400 bg-blue-400/10"
                title="Professional Product Designer"
                location="Reslink, Espoo, Finland"
                date="2017 - 2023"
              >
                <p className="opacity-70">Workflow and Cloud Management, WebApp (SaaS), and Mobile.</p>
              </CardContent>
            </Card>

            {/* Senior UI/UX */}
            <Card 
              variant="tertiary" 
              slideDirection="left"
            >
              <CardContent
                icon="grid_view"
                iconClassName="text-blue-400 bg-blue-400/10"
                title="Senior UI/UX Designer & IT Expert"
                location="Reslink, Helsinki, Finland"
                date="2016 - 2023"
              >
                <p className="opacity-70">Web Application, Android UI Development, and VPN Management.</p>
              </CardContent>
            </Card>

            {/* Earlier Positions */}
            <Card 
              variant="muted" 
              slideDirection="right"
            >
              <CardContent
                icon="history"
                iconClassName="text-gray-400 bg-gray-400/10"
                title="Earlier Positions"
                date="2000 - 2016"
              >
                <div className="space-y-4">
                  <div>
                    <h5 className="text-lg opacity-70 mb-1">Graphic Designer UI/UX & IT Expert</h5>
                    <p className="opacity-50">Reslink, Helsinki, Finland (2014 - 2016)</p>
                  </div>
                  <div>
                    <h5 className="text-lg opacity-70 mb-1">Freelance IT Expert & UI Developer</h5>
                    <p className="opacity-50">From Damascus to Espoo (2000 - 2014)</p>
                  </div>
                  <div>
                    <h5 className="text-lg opacity-70 mb-1">Graphic Designer & IT Expert</h5>
                    <p className="opacity-50">Various Magazines and Newspapers — Tehran, Iran</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>


      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black/5 relative overflow-hidden"
      >
        <motion.div 
          className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-cyan-500/20 to-fuchsia-600/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h3 
                className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-500 to-fuchsia-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Crafting Digital Dreams into Reality
              </motion.h3>
              
              <div className="space-y-6 text-lg text-theme opacity-80 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Hey there! I&apos;m Ali, a passionate dreamer and creative soul who believes in the power of design to transform ideas into meaningful experiences. With my journey spanning across continents &ndash; from Damascus to Helsinki &ndash; I&apos;ve learned that great design is about more than just aesthetics; it&apos;s about touching hearts and solving real problems.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <QuoteBlock 
                    quote="Every pixel has a purpose, every interaction tells a story." 
                    author="Ali"
                    variant="default"
                  />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Over the past decade, I&apos;ve had the joy of breathing life into countless digital products, always guided by the Double Diamond approach but colored with my own creative flair. I believe in making technology feel more human, more accessible, and maybe even a little magical.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="pt-4"
                >
                  <span className="opacity-70">When I&apos;m not designing, you&apos;ll find me exploring new technologies, sharing knowledge with fellow designers, or simply dreaming up the next big idea that could make someone&apos;s digital life a little bit better.</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-r from-fuchsia-600/20 to-cyan-500/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
        />
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, cyan 0%, transparent 70%)',
            backgroundSize: '80% 80%',
            backgroundRepeat: 'no-repeat'
          }}
        />
      
        <div className="container mx-auto px-4">
          <motion.h3 
            className="text-3xl font-bold mb-12 text-center"
            animate={{ 
              textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(56, 189, 248, 0.5)", "0 0 0px rgba(0,0,0,0)"] 
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            Strengths & Skills
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'UI/UX Design', desc: 'Expertise in Figma & Adobe CC' },
              { title: 'Research', desc: 'Skilled in qualitative and quantitative research' },
              { title: 'Design Systems', desc: 'Creating consistent, scalable frameworks' },
              { title: 'Project Management', desc: 'Agile methodology (Jira, Scrum, Kanban)' },
              { title: 'Test Management', desc: 'Proficient with Maze and Zephyr Scale' },
              { title: 'Tech Stack', desc: 'Web/mobile UI, WordPress, HubSpot, React JS' },
            ].map((skill, index) => (
              <InteractiveSkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Additional Info with 3D cards */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black/5 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                rotateX: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="theme-card transform perspective-1000"
            >
              <div className="theme-card-content p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-fuchsia-600/5 rounded-lg transform -z-10" />
                <h4 className="text-xl font-semibold mb-4 text-primary">Experience & Achievements</h4>
                <ul className="space-y-2 opacity-80">
                  <li>• Professional journey and roles</li>
                  <li>• Key milestones and successes</li>
                </ul>
                <div className="absolute -bottom-4 -right-4 text-4xl opacity-20">🏆</div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ 
                scale: 1.02,
                rotateY: -5,
                rotateX: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="theme-card transform perspective-1000"
            >
              <div className="theme-card-content p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/5 to-cyan-500/5 rounded-lg transform -z-10" />
                <h4 className="text-xl font-semibold mb-4 text-primary">Connect & Learn More</h4>
                <ul className="space-y-2 opacity-80">
                  <li>• Social Media connections</li>
                  <li>• Recommendations and testimonials</li>
                  <li>• Blog insights and updates</li>
                </ul>
                <div className="absolute -bottom-4 -right-4 text-4xl opacity-20">🔗</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Interactive footer with glowing effect */}
      <footer className="bg-theme py-8 relative overflow-hidden">
        <motion.div 
          className="container mx-auto px-4 text-center relative z-10"
          animate={{ 
            textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 10px rgba(56, 189, 248, 0.3)", "0 0 0px rgba(0,0,0,0)"] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="opacity-70">&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
          <motion.div 
            className="mt-4 opacity-50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
          >
            <p>Made with ✨ imagination and 💻 code</p>
          </motion.div>
        </motion.div>
        
        {/* Footer glow effect */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1px]" 
          style={{
            background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3) 50%, transparent)",
          }}
          animate={{ left: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </footer>
      
      {/* Add styles for perspective and other effects */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .shadow-glow {
          box-shadow: 0 0 8px rgba(255, 255, 200, 0.8);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .cursor-none {
          cursor: none !important;
        }
      `}</style>
    </main>
  );
};

export default HomePage;
