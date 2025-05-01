'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Hero from '@/components/hero/Hero';
import QuoteBlock from '@/components/ui/QuoteBlock';
import { HeroConfig } from '@/types/hero';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';

// A helper component for skill cards
const InteractiveSkillCard = ({ 
  skill,
  index
}: { 
  skill: { title: string, desc: string },
  index: number 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="theme-card"
    >
      <div className="theme-card-glow theme-card-glow-secondary"></div>
      <div className="theme-card-content p-6">
        <h4 className="text-xl font-medium mb-2">{skill.title}</h4>
        <p className="opacity-75 text-sm">{skill.desc}</p>
      </div>
    </motion.div>
  );
};

// Icon component to simplify icon usage
const Icon = ({ name, className = "" }: { name: string, className?: string }) => {
  return <span className={`material-symbols ${className}`}>{name}</span>;
};

export default function Home() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  
  // State to track scroll position and mouse position for parallax effects
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Refs for section tracking
  const workExperienceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -0.5 and 0.5 for subtle movement
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 0.1,
        y: (e.clientY / window.innerHeight - 0.5) * 0.1
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Hero configuration
  const heroConfig: HeroConfig = {
    variant: theme === 'colorful' ? 'creative' : 'default',
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    backgroundEffect: theme === 'colorful' ? 'particles' : 'gradient',
    cta: {
      text: t('home.hero.cta'),
      href: "/portfolio"
    }
  };
  
  return (
    <main className="min-h-screen bg-theme">
      {/* Background effect for colorful theme */}
      {theme === 'colorful' && (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-[30%] right-[10%] opacity-20 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-600 blur-3xl"
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
      )}
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
            <motion.h3 
              className="text-3xl font-bold"
              animate={{ 
                textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(168, 85, 247, 0.5)", "0 0 0px rgba(0,0,0,0)"] 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {t('home.workExperience.title')}
            </motion.h3>
            
            <motion.div
              className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mt-4"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-theme-text/70 max-w-2xl mx-auto"
            >
              A journey through my professional career, showcasing my growth and expertise in design and technology.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Current Position */}
            <Card>
              <CardContent 
                icon="rocket_launch" 
                iconClassName="text-purple-400 bg-purple-400/10"
                title="Product Designer | Product Owner"
                date="2023 - Present"
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 opacity-80 mb-2">
                      <span className="material-symbols material-symbols-rounded text-sm">location_on</span>
                      <p>Webropol, Helsinki, Finland</p>
                    </div>
                    <p className="opacity-70">Product vision, specifying features, prototyping, and handing off design system to developers.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Previous Positions */}
            <Card>
              <CardContent 
                icon="insights" 
                iconClassName="text-blue-400 bg-blue-400/10"
                title="Professional Product Designer"
                date="2017 - 2023"
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 opacity-80 mb-2">
                      <span className="material-symbols material-symbols-rounded text-sm">location_on</span>
                      <p>Reslink, Espoo, Finland</p>
                    </div>
                    <p className="opacity-70">Workflow and Cloud Management, WebApp (SaaS), and Mobile.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent 
                icon="grid_view" 
                iconClassName="text-cyan-400 bg-cyan-400/10"
                title="Senior UI/UX Designer & IT Expert"
                date="2016 - 2023"
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 opacity-80 mb-2">
                      <span className="material-symbols material-symbols-rounded text-sm">location_on</span>
                      <p>Reslink, Helsinki, Finland</p>
                    </div>
                    <p className="opacity-70">Web Application, Android UI Development, and VPN Management.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Earlier Positions */}
            <Card>
              <CardContent 
                icon="history" 
                iconClassName="text-gray-400 bg-gray-400/10"
                title="Earlier Positions"
                date="2000 - 2016"
              >
                <div className="space-y-4">
                  <div>
                    <h5 className="text-lg opacity-80 mb-1">Graphic Designer UI/UX & IT Expert</h5>
                    <p className="opacity-60">Reslink, Helsinki, Finland (2014 - 2016)</p>
                  </div>
                  <div>
                    <h5 className="text-lg opacity-80 mb-1">Freelance IT Expert & UI Developer</h5>
                    <p className="opacity-60">From Damascus to Espoo (2000 - 2014)</p>
                  </div>
                  <div>
                    <h5 className="text-lg opacity-80 mb-1">Graphic Designer & IT Expert</h5>
                    <p className="opacity-60">Various Magazines and Newspapers — Tehran, Iran</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
      
      {/* About Section */}
      <motion.section
        ref={aboutRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 relative overflow-hidden"
        id="about"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-10 text-center"
            >
              {t('home.about.title')}
            </motion.h2>
            
            <div className="space-y-6 text-lg text-theme opacity-80 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {t('home.about.intro')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <QuoteBlock 
                  quote={t('home.about.quote')} 
                  author="Ali"
                  variant="default"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('home.about.second')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-4"
              >
                <span className="opacity-70">{t('home.about.third')}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden pb-20"
        id="skills"
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNNTYgNDRDNTYgNTQuNjM3IDQ3LjI5MjYgNjMgMzYgNjNDMjQuNzA3NCA2MyAxNiA1NC42MzcgMTYgNDQiIHN0cm9rZT0iIzY1NzZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMTYgNDRDMTYgMzMuMzYzIDI0LjcwNzQgMjUgMzYgMjVDNDcuMjkyNiAyNSA1NiAzMy4zNjMgNTYgNDQiIHN0cm9rZT0iIzY1NzZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')",
            backgroundPosition: "center center",
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
            {t('home.skills.title')}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'UI/UX Design', desc: 'Expertise in Figma & Adobe CC' },
              { title: 'Research', desc: 'Skilled in qualitative and quantitative research' },
              { title: 'Product Management', desc: 'Agile methodologies and roadmapping' },
              { title: 'Design Leadership', desc: 'Team mentoring and process development' },
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
            {t('home.testimonials.title')}
          </motion.h3>
          
          <div className="space-y-12 max-w-4xl mx-auto">
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
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
    </main>
  );
}
