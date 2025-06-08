'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
// Card components removed as they're not used in this file
import Hero from '@/components/hero/Hero';
import QuoteBlock from '@/components/ui/QuoteBlock';
import { HeroConfig } from '@/types/hero';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { WorkExperienceWizard } from '@/components/WorkExperienceWizard';
import { i18n } from '@/i18n';

// A clean, readable skill card component
const InteractiveSkillCard = ({ 
  skill
}: { 
  skill: { title: string, desc: string }
}) => {
  const { theme } = useTheme();

  // Get card styles based on theme
  const getCardStyles = () => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-br from-purple-900/20 via-fuchsia-900/10 to-pink-900/20 border-fuchsia-500/20 shadow-lg';
    } else if (theme === 'dark') {
      return 'bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-blue-900/30 border-blue-500/20 shadow-lg';
    } else {
      return 'bg-gradient-to-br from-white/90 via-blue-50/30 to-indigo-50/20 border-blue-200/40 shadow-lg';
    }
  };

  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl border backdrop-blur-xl
        ${getCardStyles()}
      `}
    >
      {/* Content */}
      <div className="p-6">
        <h4 className="text-xl font-semibold mb-3 leading-tight">
          {skill.title}
        </h4>
        
        <p className="text-sm leading-relaxed opacity-70">
          {skill.desc}
        </p>
      </div>
    </div>
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
    // State to track scroll position for parallax effects
  const [scrollY, setScrollY] = useState(0);
  // Mouse position state removed as it's not used
    // Refs for section tracking
  const workExperienceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // No longer tracking mouse movement
    window.addEventListener('scroll', handleScroll);
      return () => {
      // Mouse listener removed
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper function to add locale to paths
  const localizedHref = (path: string) => {
    // Check if the path already contains the locale
    if (path.startsWith('/') && i18n.locales.some(loc => path.startsWith(`/${loc}/`))) {
      return path; // Path already has locale, don't add it again
    }

    if (path.startsWith('#') || path.startsWith('/#')) {
      // For hash links, add locale to the base path
      return path.startsWith('/#') ? `/${locale}${path}` : `/${locale}/${path}`;
    }

    return `/${locale}${path}`;
  };
    
  // Hero configuration - no longer switches variants, smooth transitions handled internally
  const heroConfig: HeroConfig = {
    variant: 'default', // Using unified component, this doesn't matter anymore
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    backgroundEffect: theme === 'colorful' ? 'particles' : 'abstract-modern',
    cta: {
      text: t('home.hero.cta'),
      href: "/portfolio"
    },
    showPodcastPlayer: true
  };
  // Skills data with translations
  const getSkills = () => {
    const skills = {      en: [
        { title: 'AI Driven Product Designer', desc: 'Figma Make, VS Code Copilot, and Cursor' },
        { title: 'UI/UX Design', desc: 'Expertise in Figma & Adobe CC' },
        { title: 'Research', desc: 'Skilled in qualitative and quantitative research' },
        { title: 'Product Management', desc: 'Agile methodologies and roadmapping' },
        { title: 'Design Leadership', desc: 'Team mentoring and process development' },
        { title: 'Design Systems', desc: 'Creating consistent, scalable frameworks' },
        { title: 'Project Management', desc: 'Agile methodology (Jira, Scrum, Kanban)' },
        { title: 'Test Management', desc: 'Proficient with Maze and Zephyr Scale' },
        { title: 'Tech Stack', desc: 'Web/mobile UI, WordPress, HubSpot, React JS' }
      ],      fi: [
        { title: 'AI-Pohjainen Tuotesuunnittelija', desc: 'Figma Make, VS Code Copilot ja Cursor' },
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
    <main id="main-content" className="min-h-screen bg-theme">
      {/* Background effect for colorful theme */}
      {theme === 'colorful' && (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">          <div 
            className="absolute top-[30%] right-[10%] opacity-20 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-600 blur-3xl"
            style={{ 
              transform: `translateY(${scrollY * 0.2}px)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          />
          <div 
            className="absolute top-[50%] left-[5%] opacity-10 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-600 blur-3xl"
            style={{ 
              transform: `translateY(${scrollY * -0.15}px)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          />
        </div>
      )}
      <Navigation />
      <Hero config={heroConfig} />      {/* Work Experience Section - Wizard Experience */}
      <div ref={workExperienceRef} id="work-experience">
        <WorkExperienceWizard 
          workContent={workContent} 
          theme={theme} 
          t={t} 
        />
      </div>

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
      </motion.section>        {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-24 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent"
        id="strengths-skills"
      >
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-[0.03]"
            style={{
              background: theme === 'colorful' 
                ? 'radial-gradient(circle, #ec4899 0%, #8b5cf6 50%, transparent 70%)'
                : 'radial-gradient(circle, #3b82f6 0%, #6366f1 50%, transparent 70%)',
              filter: 'blur(40px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-[0.04]"
            style={{
              background: theme === 'colorful' 
                ? 'radial-gradient(circle, #f59e0b 0%, #ec4899 50%, transparent 70%)'
                : 'radial-gradient(circle, #06b6d4 0%, #3b82f6 50%, transparent 70%)',
              filter: 'blur(35px)'
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.04, 0.06, 0.04],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(${theme === 'colorful' ? '#ec4899' : '#3b82f6'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'colorful' ? '#ec4899' : '#3b82f6'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section header with enhanced typography */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <span className={`
                material-symbols text-4xl p-4 rounded-2xl
                ${theme === 'colorful' 
                  ? 'text-fuchsia-500 bg-fuchsia-500/10 border border-fuchsia-500/20' 
                  : theme === 'dark'
                  ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                  : 'text-blue-600 bg-blue-500/10 border border-blue-500/20'
                }
              `}>
                psychology
              </span>
            </motion.div>
            
            <motion.h3 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-current via-current to-current bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('home.skills.title')}
            </motion.h3>
            
            <motion.p
              className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {locale === 'fi' 
                ? 'Kattava valikoima taitoja ja osaamista, jotka mahdollistavat innovatiivisten ratkaisujen luomisen'
                : 'A comprehensive set of skills and expertise that enable the creation of innovative solutions'
              }
            </motion.p>
          </div>
          
          {/* Enhanced grid layout with staggered animations */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >            {skills.map((skill, index) => (
              <InteractiveSkillCard key={index} skill={skill} />
            ))}
          </motion.div>
          
          {/* Call-to-action section */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >            <p className="text-lg opacity-60 mb-6">
              {locale === 'fi' 
                ? 'Tutustu joihinkin töihini'
                : 'Check out some of my work'
              }
            </p><motion.a
              href={localizedHref('/portfolio')}
              className={`
                inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium
                transition-all duration-300 border backdrop-blur-sm
                ${theme === 'colorful'
                  ? 'bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 border-fuchsia-500/30 text-fuchsia-300 hover:from-fuchsia-500/20 hover:to-purple-500/20 hover:border-fuchsia-500/50'
                  : theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-300 hover:from-blue-500/20 hover:to-indigo-500/20 hover:border-blue-500/50'
                  : 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-600 hover:from-blue-500/20 hover:to-indigo-500/20 hover:border-blue-500/50'
                }
              `}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="material-symbols text-xl">work</span>
              {locale === 'fi' ? 'Tutustu portfolioon' : 'View Portfolio'}
              <span className="material-symbols text-xl">arrow_forward</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.section>{/* Testimonials Section */}
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
