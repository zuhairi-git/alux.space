'use client';
import React, { useState, useEffect, useRef, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/hero/Hero';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import type { HeroConfig } from '@/types/hero';
import QuoteBlock from "@/components/ui/QuoteBlock";
import Link from 'next/link';

// Icon component for simple SVG icons
const Icon = ({ name, className = "" }: { name: string, className?: string }) => {
  // Simple SVG icons map
  const icons: { [key: string]: JSX.Element } = {
    award: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
    work: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    ),
    milestone: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
      </svg>
    ),
    connect: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    share: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
    ),
    quote: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
      </svg>
    ),
    article: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    close: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    trophy: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    ),
    link: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-full h-full text-primary/40 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    ),
    github: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
    dribbble: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
      </svg>
    ),
    behance: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12h6c.55 0 1-.47 1-1.05V10c0-.58-.45-1.05-1-1.05H1z"></path>
        <path d="M16 6H1v12h6.79c.97 0 1.61-.42 1.86-1.05.23-.59.15-1.22-.26-1.87-.56-.89-.82-1.8.26-3.08.42-.51 1.12-1.05 2.28-1.05H16"></path>
        <path d="M14.5 6v6"></path>
        <path d="M14.5 10h4c.55 0 1 .45 1 1v2.5c0 .55-.45 1-1 1h-1.5"></path>
        <path d="M17 10v4c0 .55.45 1 1 1h1"></path>
      </svg>
    ),
    medium: (
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="8" y1="10" x2="16" y2="10"></line>
        <line x1="8" y1="14" x2="16" y2="14"></line>
        <line x1="8" y1="18" x2="12" y2="18"></line>
      </svg>
    ),
  };

  // Return the icon or a fallback
  return icons[name] || (
    <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
};

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
  
  // Popup states
  const [socialMediaPopupOpen, setSocialMediaPopupOpen] = useState(false);
  
  // Ref for the Work Experience section
  const workExperienceRef = useRef<HTMLElement>(null);
  
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

  // Scroll to Work Experience section
  const scrollToWorkExperience = () => {
    workExperienceRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

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
        ref={workExperienceRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black/5 relative overflow-hidden"
        id="work-experience"
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
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-600/20"
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
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600/20 to-cyan-500/20"
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

      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black/5 relative overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.h3 
            className="text-3xl font-bold mb-12 text-center"
            animate={{ 
              textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(56, 189, 248, 0.5)", "0 0 0px rgba(0,0,0,0)"] 
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            Client Testimonials
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="theme-card relative overflow-hidden p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-cyan-500/20 to-fuchsia-600/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">CB</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="mb-4 text-primary/40">
                    <Icon name="quote" className="text-3xl" />
                  </div>
                  <p className="text-theme-text/80 mb-4 leading-relaxed">
                    Ali is an exceptional and experienced UI/UX designer with more than ten years of professional experience specialising in product design for technology companies. Ali believes that design is not about deliverables and beautiful pixels but about solving problems and achieving business and user goals. As a product designer, Ali focuses on usability, user experience, and user research in his designs. He has worked with small and large teams as well as a freelancer and enjoys the challenge of solving user problems. He always delivers on time and on budget.
                  </p>
                  <div className="mt-4">
                    <div className="font-medium text-primary">Constantin Buda</div>
                    <div className="text-sm text-theme-text/60">CMO at Vidalico Digital | Hubspot Agency Partner | SicTic Member</div>
                  </div>
                </div>
              </div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-600"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="theme-card relative overflow-hidden p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-fuchsia-600/20 to-cyan-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">FM</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="mb-4 text-primary/40">
                    <Icon name="quote" className="text-3xl" />
                  </div>
                  <p className="text-theme-text/80 mb-4 leading-relaxed">
                    Ali is a creative product designer. You will find a lot of artists with too busy layouts and art forms. But Ali takes a lead in impressive yet simple and relevant product designs. He has this cunning ability to solve complex problem with simple solutions using his design skills. His arts speaks visually, does the job perfectly and leaves a long lasting impression. I&apos;ve worked with Ali in past and it was truly a fun experience. Would love to do that again and I highly recommend Ali too.
                  </p>
                  <div className="mt-4">
                    <div className="font-medium text-primary">Fahad M</div>
                    <div className="text-sm text-theme-text/60">IT Contractor | Travelodge Hotels Limited</div>
                  </div>
                </div>
              </div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600 to-cyan-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
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
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="theme-card transform perspective-1000"
            >
              <div className="theme-card-content p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-fuchsia-600/5 rounded-lg transform -z-10" />
                <h4 className="text-xl font-semibold mb-4 text-primary flex items-center">
                  <Icon name="award" className="mr-2 text-cyan-500" />
                  Experience & Achievements
                </h4>
                <ul className="space-y-3 opacity-80">
                  <li>
                    <button 
                      onClick={scrollToWorkExperience}
                      className="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300 flex items-center w-full text-left cursor-pointer"
                      role="link"
                    >
                      <Icon name="work" className="mr-2" />
                      Professional journey and roles
                    </button>
                  </li>
                  <li>
                    <a 
                      href="/portfolio" 
                      className="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300 flex items-center w-full cursor-pointer"
                    >
                      <Icon name="milestone" className="mr-2" />
                      Key milestones and successes
                    </a>
                  </li>
                </ul>
                <div className="absolute -bottom-4 -right-8 opacity-20 w-20 h-20">
                  <Icon name="trophy" className="text-primary/40" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="theme-card transform perspective-1000"
            >
              <div className="theme-card-content p-6 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/5 to-cyan-500/5 rounded-lg transform -z-10" />
                <h4 className="text-xl font-semibold mb-4 text-primary flex items-center">
                  <Icon name="connect" className="mr-2 text-fuchsia-500" />
                  Connect & Learn More
                </h4>
                <ul className="space-y-3 opacity-80">
                  <li>
                    <button 
                      onClick={() => setSocialMediaPopupOpen(true)}
                      className="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300 flex items-center w-full text-left cursor-pointer"
                      role="link"
                      aria-haspopup="dialog"
                    >
                      <Icon name="share" className="mr-2" />
                      Social Media connections
                    </button>
                  </li>
                  <li>
                    <Link 
                      href="/blog"
                      className="text-blue-500 hover:text-blue-600 hover:underline transition-colors duration-300 flex items-center w-full cursor-pointer"
                    >
                      <Icon name="article" className="mr-2" />
                      Blog insights and updates
                    </Link>
                  </li>
                </ul>
                <div className="absolute -bottom-4 -right-8 opacity-20 w-20 h-20">
                  <Icon name="link" className="text-primary/40" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Popup Components */}
      <AnimatePresence>
        {socialMediaPopupOpen && (
          <ThemePopup onClose={() => setSocialMediaPopupOpen(false)} title="Connect With Me">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SocialMediaButton icon="linkedin" url="https://linkedin.com/in/yourprofile" label="LinkedIn" />
              <SocialMediaButton icon="twitter" url="https://twitter.com/yourhandle" label="Twitter" />
              <SocialMediaButton icon="github" url="https://github.com/yourusername" label="GitHub" />
              <SocialMediaButton icon="dribbble" url="https://dribbble.com/yourusername" label="Dribbble" />
              <SocialMediaButton icon="behance" url="https://behance.net/yourusername" label="Behance" />
              <SocialMediaButton icon="medium" url="https://medium.com/@yourusername" label="Medium" />
            </div>
          </ThemePopup>
        )}
        
      </AnimatePresence>

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

// Popup component
const ThemePopup = ({ children, onClose, title }: { children: React.ReactNode, onClose: () => void, title: string }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Focus trap and ref for the modal
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Focus the modal when it opens
    modalRef.current?.focus();
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div 
        ref={modalRef}
        className="bg-theme rounded-lg shadow-xl max-w-lg w-full overflow-hidden focus:outline-none"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-primary">{title}</h4>
            <button 
              onClick={onClose}
              className="text-theme opacity-60 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
              aria-label="Close popup"
            >
              <Icon name="close" />
            </button>
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// Social Media Button Component
const SocialMediaButton = ({ icon, url, label }: { icon: string, url: string, label: string }) => {
  return (
    <motion.a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-3 bg-theme hover:bg-primary/10 transition-colors duration-300 rounded-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-cyan-500/20 to-fuchsia-600/20 mr-3">
        <Icon name={icon} />
      </div>
      <span>{label}</span>
    </motion.a>
  );
};


export default HomePage;
