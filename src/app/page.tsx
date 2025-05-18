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
import AnimatedSection from '@/components/AnimatedSection';
import TimelineCard from '@/components/TimelineCard';
// Material UI Icons
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GridViewIcon from '@mui/icons-material/GridView';
import InsightsIcon from '@mui/icons-material/Insights';
import HistoryIcon from '@mui/icons-material/History';

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
    backgroundEffect: theme === 'colorful' ? 'particles' : 'abstract-modern',
    cta: {
      text: t('home.hero.cta'),
      href: "/portfolio"
    }
  };
  // Skills data with translations
  const getSkills = () => {
    const skills = {
      en: [
        { title: 'UI/UX Design', desc: 'Expertise in Figma & Adobe CC' },
        { title: 'Research', desc: 'Skilled in qualitative and quantitative research' },
        { title: 'Product Management', desc: 'Agile methodologies and roadmapping' },
        { title: 'Design Leadership', desc: 'Team mentoring and process development' },
        { title: 'Design Systems', desc: 'Creating consistent, scalable frameworks' },
        { title: 'Project Management', desc: 'Agile methodology (Jira, Scrum, Kanban)' },
        { title: 'Test Management', desc: 'Proficient with Maze and Zephyr Scale' },
        { title: 'Tech Stack', desc: 'Web/mobile UI, WordPress, HubSpot, React JS' }
      ],
      fi: [
        { title: 'UI/UX Suunnittelu', desc: 'Asiantuntemus Figma & Adobe CC:ssä' },
        { title: 'Tutkimus', desc: 'Taitava kvalitatiivisessa ja kvantitatiivisessa tutkimuksessa' },
        { title: 'Tuotehallinta', desc: 'Ketterät menetelmät ja tiekartat' },
        { title: 'Designjohtajuus', desc: 'Tiimin mentorointi ja prosessien kehittäminen' },
        { title: 'Designjärjestelmät', desc: 'Johdonmukaisten, skaalautuvien kehysten luominen' },
        { title: 'Projektinhallinta', desc: 'Ketterä metodologia (Jira, Scrum, Kanban)' },
        { title: 'Testinhallinta', desc: 'Taitava Maze ja Zephyr Scale -työkaluissa' },
        { title: 'Teknologiat', desc: 'Web/mobiili UI, WordPress, HubSpot, React JS' }
      ]
    };
    
    return skills[locale as keyof typeof skills] || skills.en;
  };
  // Get work experience content by locale
  const getWorkExperience = () => {
    const workExperience = {
      en: {
        intro: "A journey through my professional career, showcasing my growth and expertise in design and technology.",
        positions: [
          {
            title: "Product Designer | Product Owner",
            company: "Webropol, Helsinki, Finland",
            description: "Product vision, specifying features, prototyping, and handing off design system to developers.",
            period: "2023 - Present"
          },
          {
            title: "Professional Product Designer",
            company: "Reslink, Espoo, Finland",
            description: "Workflow and Cloud Management, WebApp (SaaS), and Mobile.",
            period: "2017 - 2023"
          },
          {
            title: "Senior UI/UX Designer & IT Expert",
            company: "Reslink, Helsinki, Finland",
            description: "Web Application, Android UI Development, and VPN Management.",
            period: "2016 - 2023"
          },
          {
            title: "Earlier Positions",
            positions: [
              {
                title: "Graphic Designer UI/UX & IT Expert",
                company: "Reslink, Helsinki, Finland",
                period: "2014 - 2016"
              },
              {
                title: "Freelance IT Expert & UI Developer",
                company: "From Damascus to Espoo",
                period: "2000 - 2014"
              },
              {
                title: "Graphic Designer & IT Expert",
                company: "Various Magazines and Newspapers — Tehran, Iran",
                period: ""
              }
            ],
            period: "2000 - 2016"
          }
        ]
      },
      fi: {
        intro: "Matka ammattiurallani, joka osoittaa kasvuni ja asiantuntemukseni suunnittelussa ja teknologiassa.",
        positions: [
          {
            title: "Tuotesuunnittelija | Tuoteomistaja",
            company: "Webropol, Helsinki, Suomi",
            description: "Tuotevisio, ominaisuuksien määrittely, prototyyppien luonti ja suunnittelujärjestelmän luovuttaminen kehittäjille.",
            period: "2023 - Nykyhetki"
          },
          {
            title: "Ammattimainen tuotesuunnittelija",
            company: "Reslink, Espoo, Suomi",
            description: "Työnkulun ja pilvipalvelun hallinta, verkkosovellus (SaaS) ja mobiili.",
            period: "2017 - 2023"
          },
          {
            title: "Senior UI/UX-suunnittelija & IT-asiantuntija",
            company: "Reslink, Helsinki, Suomi",
            description: "Verkkosovellus, Android-käyttöliittymäkehitys ja VPN-hallinta.",
            period: "2016 - 2023"
          },
          {
            title: "Aikaisemmat tehtävät",
            positions: [
              {
                title: "Graafinen suunnittelija UI/UX & IT-asiantuntija",
                company: "Reslink, Helsinki, Suomi",
                period: "2014 - 2016"
              },
              {
                title: "Freelance IT-asiantuntija & UI-kehittäjä",
                company: "Damaskoksesta Espooseen",
                period: "2000 - 2014"
              },
              {
                title: "Graafinen suunnittelija & IT-asiantuntija",
                company: "Eri lehdet ja sanomalehdet — Teheran, Iran",
                period: ""
              }
            ],
            period: "2000 - 2016"
          }
        ]
      }
    };
    
    return workExperience[locale as keyof typeof workExperience] || workExperience.en;
  };
  // Get translated testimonials
  const getTestimonials = () => {
    const testimonials = {
      en: [
        {
          text: "Ali is a creative product designer. You will find a lot of artists with too busy layouts and art forms. But Ali takes a lead in impressive yet simple and relevant product designs. He has this cunning ability to solve complex problem with simple solutions using his design skills. His arts speaks visually, does the job perfectly and leaves a long lasting impression. I've worked with Ali in past and it was truly a fun experience. Would love to do that again and I highly recommend Ali too.",
          name: "Fahad M",
          position: "IT Contractor | Travelodge Hotels Limited"
        },
        {
          text: "Ali is an exceptional and experienced UI/UX designer with more than ten years of professional experience specialising in product design for technology companies. Ali believes that design is not about deliverables and beautiful pixels but about solving problems and achieving business and user goals. As a product designer, Ali focuses on usability, user experience, and user research in his designs. He has worked with small and large teams as well as a freelancer and enjoys the challenge of solving user problems. He always delivers on time and on budget.",
          name: "Constantin Buda",
          position: "CMO at Vidalico Digital | Hubspot Agency Partner | SicTic Member"
        }
      ],
      fi: [
        {
          text: "Ali on luova tuotesuunnittelija. Löydät paljon taiteilijoita, joilla on liian kiireisiä taiteen muotoja. Mutta Ali on edelläkävijä vaikuttavissa mutta yksinkertaisissa ja merkityksellisissä tuotesuunnitteluissa. Hänellä on tämä ovela kyky ratkaista monimutkaisia ongelmia yksinkertaisilla ratkaisuilla käyttäen suunnittelutaitojaan. Hänen taiteensa puhuu visuaalisesti, tekee työn täydellisesti ja jättää pitkäaikaisen vaikutelman. Olen työskennellyt Alin kanssa aiemmin ja se oli todella hauska kokemus. Haluaisin tehdä sen uudestaan ja suosittelen myös Alia.",
          name: "Fahad M",
          position: "IT-urakoitsija | Travelodge Hotels Limited"
        },
        {
          text: "Ali on poikkeuksellinen ja kokenut UI/UX-suunnittelija, jolla on yli kymmenen vuoden ammattikokemus erikoistuen tuotesuunnitteluun teknologiayrityksissä. Ali uskoo, että suunnittelu ei ole kyse toimitettavista ja kauniista pikseleistä, vaan ongelmien ratkaisemisesta ja liiketoiminnan ja käyttäjien tavoitteiden saavuttamisesta. Tuotesuunnittelijana Ali keskittyy käytettävyyteen, käyttäjäkokemukseen ja käyttäjätutkimukseen suunnittelussaan. Hän on työskennellyt pienissä ja suurissa tiimeissä sekä freelancerina ja nauttii käyttäjäongelmien ratkaisun haasteesta. Hän toimittaa aina ajallaan ja budjetissa.",
          name: "Constantin Buda",
          position: "CMO Vidalico Digitalissa | Hubspot Agency Partner | SicTic-jäsen"
        }
      ]
    };
    
    return testimonials[locale as keyof typeof testimonials] || testimonials.en;
  };
  
  const workContent = getWorkExperience();
  const skills = getSkills();
  const testimonials = getTestimonials();
  
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
        {/* Work Experience Section - New Timeline Cards */}
      <AnimatedSection 
        ref={workExperienceRef}
        id="work-experience"
        className="py-20 bg-black/5 relative overflow-hidden"
        animation="fade-in"
        duration={0.8}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              className="material-symbols text-3xl p-3 mb-5 rounded-lg text-purple-400 bg-purple-400/10 inline-block"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              work_history
            </motion.span>
            <h3 className="text-center text-3xl font-bold">
              {t('home.workExperience.title')}
            </h3>
            
            <motion.div
              className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mt-4"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-center mt-4 text-theme-text/70 max-w-2xl mx-auto">
              {workContent.intro}
            </p>
          </div>
            {/* Vertical Timeline Cards */}
          <div className="relative max-w-5xl mx-auto">            {/* Central timeline line with animated gradient - thicker on mobile for visibility */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 md:w-1.5 bg-gradient-to-b from-purple-500/80 via-blue-500/80 to-transparent rounded-full animate-pulse shadow-sm shadow-blue-500/30"></div>
            
            {/* Visual indicator for timeline progress - animate on scroll */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-gradient-to-t from-transparent to-primary/70 rounded-full"
              style={{ height: '0%', top: 0 }}
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Decorative floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-xl"
                initial={{ x: -100, y: 100, opacity: 0 }}
                animate={{ x: 0, y: 150, opacity: 0.5 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                style={{ left: '5%', top: '10%' }}
              />
              <motion.div 
                className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-xl"
                initial={{ x: 100, y: -100, opacity: 0 }}
                animate={{ x: 0, y: -150, opacity: 0.5 }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
                style={{ right: '5%', top: '40%' }}
              />
            </div>

            {workContent.positions.map((position, index) => {
              const isFirst = index === 0;
              const isLast = index === workContent.positions.length - 1;
              const isEven = index % 2 === 0;
              
              // For regular positions
              if (!position.positions) {
                // Determine which icon to use based on position
                let IconComponent = isFirst ? RocketLaunchIcon : (index % 2 === 0 ? GridViewIcon : InsightsIcon);
                
                return (
                  <div className="relative mb-24" key={index}>                    {/* Timeline dot with pulsing effect */}
                    <motion.div 
                      className={`absolute left-1/2 top-12 transform -translate-x-1/2 w-8 h-8 rounded-full z-10
                        ${isFirst 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-500' 
                          : isLast
                            ? 'bg-gradient-to-r from-gray-500 to-blue-500/50'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        }
                        flex items-center justify-center shadow-lg
                        ${isFirst ? 'shadow-purple-500/30' : isLast ? 'shadow-gray-500/30' : 'shadow-blue-500/30'}
                      `}
                      whileHover={{ scale: 1.3, boxShadow: `0 0 20px 0 rgba(56, 189, 248, 0.5)` }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Pulsing ring effect */}
                      <div className={`absolute inset-0 rounded-full 
                        ${isFirst 
                          ? 'bg-purple-500/30' 
                          : isLast
                            ? 'bg-gray-500/30'
                            : 'bg-blue-500/30'
                        } animate-ping opacity-75`}></div>
                        
                      {/* Inner dot for depth effect */}
                      <div className="w-3 h-3 rounded-full bg-white/90"></div>
                    </motion.div>
                      {/* Connector line from timeline to card (horizontal line) - hidden on smaller screens */}
                    <div className={`absolute top-14 hidden md:block ${isEven ? 'right-1/2' : 'left-1/2'} h-0.5 w-[calc(25%-1rem)]
                      ${isFirst 
                        ? 'bg-gradient-to-r from-purple-400/70 to-blue-400/70'
                        : isLast 
                          ? 'bg-gradient-to-r from-gray-400/70 to-blue-400/50'
                          : 'bg-gradient-to-r from-blue-500/70 to-cyan-400/70'
                      }`}>
                    </div>
                    
                    {/* Mobile connector line (always to the right) */}
                    <div className={`absolute top-14 md:hidden left-1/2 h-0.5 w-[15%]
                      ${isFirst 
                        ? 'bg-gradient-to-r from-purple-400/70 to-blue-400/70'
                        : isLast 
                          ? 'bg-gradient-to-r from-gray-400/70 to-blue-400/50'
                          : 'bg-gradient-to-r from-blue-500/70 to-cyan-400/70'
                      }`}>
                    </div>
                      {/* Card positioning with alternating sides on desktop, stacked on mobile */}
                    <div className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}>
                      <div className={`w-full sm:w-[85%] md:w-[48%] ${isEven ? 'md:ml-[4%]' : 'md:mr-[4%]'} sm:ml-[15%] md:ml-0`}>
                        <AnimatedSection 
                          animation={isEven ? "slide-right" : "slide-left"}
                          delay={0.1 + (index * 0.1)}
                        >
                          <TimelineCard
                            theme={theme === 'colorful' ? 'colorful' : theme === 'dark' ? 'dark' : 'light'}
                            materialIcon={IconComponent}
                            title={position.title}
                            date={position.period}
                            location={position.company}
                            description={position.description}
                          />
                        </AnimatedSection>
                      </div>
                    </div>
                  </div>
                );
              } 
              // For "Earlier Positions" with nested positions
              else {
                return (
                  <div className="relative mb-24" key={index}>                    {/* Timeline dot for earlier positions section with matching pulsing effect */}
                    <motion.div 
                      className="absolute left-1/2 top-12 transform -translate-x-1/2 w-10 h-10 rounded-full z-10
                        bg-gradient-to-r from-gray-500 to-blue-500/50 flex items-center justify-center shadow-lg shadow-gray-500/30"
                      whileHover={{ scale: 1.3, boxShadow: `0 0 20px 0 rgba(56, 189, 248, 0.5)` }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Pulsing ring effect */}
                      <div className="absolute inset-0 rounded-full bg-gray-500/30 animate-ping opacity-75"></div>
                      
                      {/* Icon */}
                      <HistoryIcon className="w-5 h-5 text-white z-10" />
                    </motion.div>                    {/* Horizontal connector for center card - responsive version */}
                    <div className="absolute top-14 hidden md:block left-1/2 h-0.5 w-[calc(25%-1rem)]
                      bg-gradient-to-r from-gray-400/70 to-blue-400/50">
                    </div>
                    
                    {/* Mobile horizontal connector */}
                    <div className="absolute top-14 md:hidden left-1/2 h-0.5 w-[15%]
                      bg-gradient-to-r from-gray-400/70 to-blue-400/50">
                    </div>
                  
                    <AnimatedSection 
                      animation="fade-in" 
                      delay={0.1 + (index * 0.1)}
                      className="md:mx-auto md:w-[75%]"
                    >
                      <div className="bg-black/10 backdrop-blur-md rounded-xl p-6 border border-primary/10">
                        <h4 className="text-xl font-semibold mb-6 text-center">
                          {position.title} <span className="text-base font-medium text-theme-text/70 ml-2">{position.period}</span>
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {position.positions.map((subPosition, subIndex) => (
                            <AnimatedSection 
                              key={subIndex} 
                              animation="fade-in"
                              delay={0.3 + (subIndex * 0.1)}
                            >
                              <TimelineCard
                                theme={theme === 'colorful' ? 'colorful' : theme === 'dark' ? 'dark' : 'light'}
                                materialIcon={HistoryIcon}
                                title={subPosition.title}
                                date={subPosition.period || "Unspecified"}
                                location={subPosition.company}
                                description="Early career position developing design and technical skills."
                              />
                            </AnimatedSection>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </AnimatedSection>
        {/* About Section with Digital Dreams anchor */}
      <motion.section
        ref={aboutRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 relative overflow-hidden"
        id="digital-dreams"
      >
        <div id="about"></div>
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
        id="strengths-skills"
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
            {skills.map((skill, index) => (
              <InteractiveSkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </motion.section>      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-black/5 relative overflow-hidden"
        id="testimonials"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <motion.span 
              className="material-symbols inline-block text-3xl p-4 mb-5 rounded-full text-primary bg-primary/10"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 8 }}
            >
              format_quote
            </motion.span>
            <motion.h3 
              className="text-3xl text-center md:text-4xl font-bold"
              animate={{ 
                textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(56, 189, 248, 0.5)", "0 0 0px rgba(0,0,0,0)"] 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {t('home.testimonials.title')}
            </motion.h3>
            
            <motion.div
              className="h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"
              initial={{ width: "0%" }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
          
          <div className="space-y-16 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="theme-card relative overflow-hidden"
              >                <div className="theme-card-content p-8 md:p-10">                  {/* Quote icon */}
                  <div className="absolute -top-16 -left-16 text-8xl opacity-20 text-primary">
                    <Icon name="format_quote" className="" />
                  </div>
                    {/* Main testimonial content */}
                  <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    {/* Avatar */}
                    <div className="flex-shrink-0 md:ml-0 md:mr-8">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-fuchsia-600/20 to-cyan-500/20 flex items-center justify-center p-1">
                        <div className="w-full h-full rounded-full bg-theme flex items-center justify-center">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                            {index === 0 ? 'FM' : 'CB'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Testimonial text content */}
                    <div className="flex-grow">
                      {/* Testimonial text */}
                      <div className="mb-6">
                        <p className="text-theme-text/80 text-lg leading-relaxed">
                          {testimonial.text}
                        </p>
                      </div>
                      
                      {/* Author information */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-primary text-xl">{testimonial.name}</div>
                          <div className="text-sm text-theme-text/60 mt-1">{testimonial.position}</div>
                        </div>
                      </div>
                    </div>
                  </div>                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600 to-cyan-500"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
    </main>
  );
}
