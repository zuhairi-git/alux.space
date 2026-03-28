'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
// Card components removed as they're not used in this file
import Hero from '@/components/hero/Hero';
import { QuoteBlock } from '@/design-system';
import { HeroConfig } from '@/types/hero';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { WorkExperienceWizard } from '@/components/WorkExperienceWizard';
import { i18n } from '@/i18n';
import { useAnalyticsTracking } from '../../seo/AnalyticsProvider';

// A clean, readable skill card component
const InteractiveSkillCard = ({ 
  skill
}: { 
  skill: { title: string, desc: string }
}) => {
  const { theme } = useTheme();
  const { trackEvent } = useAnalyticsTracking();

  // Track skill card interaction
  const handleSkillInteraction = () => {
    trackEvent('skill_hover', 'homepage', skill.title);
  };

  // Card styles — colorful via CSS vars, dark/light via card-from-bg token
  const getCardStyles = () => {
    if (theme === 'colorful') {
      return 'bg-gradient-to-br from-[var(--primary)]/5 via-[var(--gradient-mid)]/5 to-[var(--gradient-end)]/5 border-[var(--card-border)] hover:border-[var(--primary)]/40 hover:from-[var(--primary)]/10 hover:via-[var(--gradient-mid)]/10 hover:to-[var(--gradient-end)]/10';
    } else if (theme === 'dark') {
      return 'bg-gradient-to-br from-slate-800/40 via-slate-700/40 to-slate-800/40 border-slate-600/30 hover:border-blue-400/40 hover:from-slate-800/60 hover:via-slate-700/60 hover:to-slate-800/60';
    } else {
      return 'bg-white/80 border-slate-200/60 hover:border-blue-300/60 hover:bg-white hover:shadow-lg hover:shadow-blue-100/50';
    }
  };

  return (
    <motion.div
      className={`
        group relative overflow-hidden p-6 rounded-xl border backdrop-blur-sm 
        transition-all duration-300 cursor-pointer
        ${getCardStyles()}
      `}
      onMouseEnter={handleSkillInteraction}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Decorative gradient overlay on hover */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
        ${theme === 'colorful' 
          ? 'bg-gradient-to-br from-[var(--primary)]/5 to-[var(--gradient-mid)]/5' 
          : 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
        }
      `} />

      {/* Icon badge */}
      <div className={`
        inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg
        transition-all duration-300 group-hover:scale-110
        ${theme === 'colorful'
          ? 'bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20'
          : 'bg-blue-500/10 group-hover:bg-blue-500/20'
        }
      `}>
          <span className={`material-symbols text-2xl text-[var(--accent-text)]`}>
          {skill.title.toLowerCase().includes('leadership') ? 'groups' :
           skill.title.toLowerCase().includes('strategy') ? 'lightbulb' :
           skill.title.toLowerCase().includes('design') || skill.title.toLowerCase().includes('prototyp') ? 'palette' :
           skill.title.toLowerCase().includes('research') || skill.title.toLowerCase().includes('tutkimus') ? 'science' :
           skill.title.toLowerCase().includes('development') || skill.title.toLowerCase().includes('kehitys') ? 'code' :
           'settings'}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h4 className={`text-lg font-semibold mb-2 leading-tight text-foreground`}>
          {skill.title}
        </h4>
        
        <p className={`text-sm leading-relaxed text-[var(--muted-foreground)]`}>
          {skill.desc}
        </p>
      </div>

      {/* Bottom accent line - appears on hover */}
      <div className={`
        absolute bottom-0 left-0 right-0 h-0.5 transform origin-left scale-x-0 
        group-hover:scale-x-100 transition-transform duration-300
        ${theme === 'colorful' 
          ? 'bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)]' 
          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
        }
      `} />
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
  const { trackEvent } = useAnalyticsTracking();

  // Refs for section tracking
  const workExperienceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Track scroll position for animations and analytics
  useEffect(() => {
    const handleScroll = () => {
      // Track scroll engagement
      const scrollPercentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercentage > 0 && scrollPercentage % 25 === 0) {
        trackEvent('scroll_engagement', 'homepage', `${scrollPercentage}%`, scrollPercentage);
      }
    };
    
    // No longer tracking mouse movement
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      // Mouse listener removed
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackEvent]);

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
        { title: 'Team Leadership', desc: 'Leading cross-functional teams', isExperience: false },
        { title: 'Product Strategy', desc: 'Strategic planning and roadmapping', isExperience: false },
        { title: 'Design & Prototyping', desc: 'Figma, Adobe CC, Design Systems', isExperience: false },
        { title: 'User Research', desc: 'Research and test management', isExperience: false },
        { title: 'Development', desc: 'React, WordPress, HubSpot', isExperience: false },
        { title: 'Agile Management', desc: 'Scrum, Jira, Confluence, GitHub Copilot, GCP', isExperience: false }
      ],      fi: [
        { title: 'Tiimin johtaminen', desc: 'Poikkitoiminnallisten tiimien johtaminen', isExperience: false },
        { title: 'Tuotestrategia', desc: 'Strateginen suunnittelu ja tiekartat', isExperience: false },
        { title: 'Suunnittelu & Prototyypit', desc: 'Figma, Adobe CC, Designjärjestelmät', isExperience: false },
        { title: 'Käyttäjätutkimus', desc: 'Tutkimus- ja testinhallinta', isExperience: false },
        { title: 'Kehitys', desc: 'React, WordPress, HubSpot', isExperience: false },
        { title: 'Ketterä hallinta', desc: 'Scrum, Jira, Confluence, GitHub Copilot, GCP', isExperience: false }
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
            title: "Product Owner & Designer",
            company: "Webropol, Helsinki, Finland",
            description: "Led international, multi-team coordination. Owned end-to-end platform design. Introduced scalable product and design processes. Drove a feedback-driven approach to usability.",
            period: "2023 - Present"
          },
          {
            title: "Product Designer",
            company: "Reslink Solutions, Espoo, Finland",
            description: "Managed full-cycle product design for web and Android. Conducted usability testing and journey mapping. Mentored junior designers.",
            period: "2016 - 2023"
          },
          {
            title: "UI/UX Designer",
            company: "Reslink Solutions, Helsinki, Finland",
            description: "Created modern UI and design frameworks. Collaborated with developers.",
            period: "2014 - 2016"
          }
        ]
      },
      fi: {
        intro: "Matka ammattiurallani, joka osoittaa kasvuni ja asiantuntemukseni suunnittelussa ja teknologiassa.",
        positions: [
          {
            title: "Tuoteomistaja & Suunnittelija",
            company: "Webropol, Helsinki, Suomi",
            description: "Johdin kansainvälistä, monitiimistä koordinaatiota. Omistin alustan päästä päähän -suunnittelun. Esittelin skaalautuvia tuote- ja suunnitteluprosesseja. Edistin palautteeseen perustuvaa lähestymistapaa käytettävyyteen.",
            period: "2023 - Nykyhetki"
          },
          {
            title: "Tuotesuunnittelija",
            company: "Reslink Solutions, Espoo, Suomi",
            description: "Hallitsin kokonaisen syklin tuotesuunnittelua webille ja Androidille. Suoritin käytettävyystestauksen ja käyttäjäpolun kartoituksen. Mentoroin juniorsuunnittelijoita.",
            period: "2016 - 2023"
          },
          {
            title: "UI/UX-suunnittelija",
            company: "Reslink Solutions, Helsinki, Suomi",
            description: "Loin moderneja UI- ja suunnittelukehyksiä. Tein yhteistyötä kehittäjien kanssa.",
            period: "2014 - 2016"
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
      <section
        ref={aboutRef}
        className="py-20 relative overflow-hidden"
        id="digital-dreams"
      >
        <div id="about"></div>
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4 px-6 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--card-border)]"
            >
              <span className="material-symbols text-xl text-[var(--primary)]">auto_awesome</span>
              <span className={`text-sm font-medium text-[var(--accent-text)]`}>
                {locale === 'fi' ? 'PERUSTUKSEN RAKENTAMINEN' : 'FOUNDATION BUILDING'}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {t('home.about.title')}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg opacity-70 max-w-3xl mx-auto"
            >
              {t('home.about.intro')}
            </motion.p>
          </div>

          {/* Main Content Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Card 1: AI Integration */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`p-8 rounded-3xl border bg-[var(--card-from-bg)] border-[var(--card-border)]`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-[var(--primary)]/15 text-[var(--accent-text)]`}>
                  <span className="material-symbols text-2xl">psychology</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {locale === 'fi' ? 'Tekoälyn integrointi' : 'AI Integration'}
                  </h3>
                  <p className="opacity-70 leading-relaxed">
                    {t('home.about.second')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Creative Exploration */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`p-8 rounded-3xl border bg-[var(--card-from-bg)] border-[var(--card-border)]`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-[var(--gradient-mid)]/15 text-[var(--accent-text-2)]`}>
                  <span className="material-symbols text-2xl">explore</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {locale === 'fi' ? 'Luova tutkimus' : 'Creative Exploration'}
                  </h3>
                  <p className="opacity-70 leading-relaxed">
                    {t('home.about.third')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quote Block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <QuoteBlock 
              quote={t('home.about.quote')} 
              author="Ali"
              variant="default"
            />
          </motion.div>
        </div>
      </section>        {/* Skills Section */}
      <section 
        className="relative overflow-hidden py-24 bg-gradient-to-b from-transparent via-black/[0.02] to-transparent"
        id="strengths-skills"
      >
        {/* Enhanced background decorative elements - REMOVED */}
      
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Section header with enhanced typography */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <span className={`
                material-symbols text-4xl p-4 rounded-2xl
                text-[var(--accent-text)] bg-[var(--primary)]/10 border border-[var(--card-border)]
              `}>
                psychology
              </span>
            </motion.div>
            
            <motion.h3 
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-current via-current to-current bg-clip-text"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('home.skills.title')}
            </motion.h3>
            
            <motion.p
              className="text-lg opacity-70 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
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

          {/* Experience Overview Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="relative">
              {/* Decorative background blur orbs */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl bg-[var(--primary)]/20`} />
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl bg-[var(--gradient-mid)]/20`} />
              </div>

              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-8 md:p-10 rounded-3xl border-2 backdrop-blur-xl bg-gradient-to-br from-[var(--card-from-bg)] to-[var(--card-to-bg)] border-[var(--card-border)] shadow-2xl shadow-[var(--card-shadow-color)]">
                {[
                  { years: '10', title: locale === 'fi' ? 'Tuotesuunnittelu' : 'Product Design', icon: 'palette', color: 'fuchsia' },
                  { years: '8', title: locale === 'fi' ? 'Tuotehallinta' : 'Product Management', icon: 'group', color: 'purple' },
                  { years: '8', title: locale === 'fi' ? 'UX-tutkimus' : 'UX Research', icon: 'psychology', color: 'blue' },
                  { years: '5', title: locale === 'fi' ? 'Frontend-kehitys' : 'Frontend Development', icon: 'code', color: 'cyan' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.08 * index, duration: 0.4 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.2 } 
                    }}
                    className={`
                      group relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-300
                      ${theme === 'colorful'
                        ? 'bg-gradient-to-br from-[var(--primary)]/5 to-[var(--gradient-mid)]/5 hover:from-[var(--primary)]/10 hover:to-[var(--gradient-mid)]/10 border border-[var(--card-border)]'
                        : theme === 'dark'
                        ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/20'
                        : 'bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/50'
                      }
                    `}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      theme === 'colorful'
                        ? 'bg-gradient-to-br from-[var(--primary)]/5 to-[var(--gradient-mid)]/5'
                        : theme === 'dark'
                        ? 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5'
                        : 'bg-gradient-to-br from-blue-100/50 to-indigo-100/50'
                    }`} />

                    {/* Icon */}
                    <motion.div 
                      className={`
                        inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl mb-4 transition-all duration-300
                        ${theme === 'colorful'
                          ? 'bg-gradient-to-br from-[var(--primary)]/20 to-[var(--gradient-mid)]/20 group-hover:from-[var(--primary)]/30 group-hover:to-[var(--gradient-mid)]/30'
                          : theme === 'dark'
                          ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30'
                          : 'bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200'
                        }
                      `}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="material-symbols text-2xl md:text-3xl text-[var(--accent-text)]">
                        {item.icon}
                      </span>
                    </motion.div>

                    {/* Years */}
                    <div className="relative mb-2">
                      <div className={`
                        text-4xl md:text-5xl font-bold leading-none bg-gradient-to-r bg-clip-text text-transparent
                        ${theme === 'colorful'
                          ? 'from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]'
                          : theme === 'dark'
                          ? 'from-blue-400 via-cyan-400 to-indigo-400'
                          : 'from-blue-600 via-indigo-600 to-purple-600'
                        }
                      `}>
                        {item.years}
                        <span className="text-lg md:text-xl ml-1 text-[var(--muted-foreground)]">
                          {locale === 'fi' ? 'v' : 'yrs'}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="text-base md:text-lg font-semibold leading-tight text-foreground">
                      {item.title}
                    </div>

                    {/* Decorative element */}
                    <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl ${
                      theme === 'colorful'
                        ? 'bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]'
                        : 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'
                    }`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced grid layout with staggered animations */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >            {skills.map((skill, index) => (
              <InteractiveSkillCard key={index} skill={skill} />
            ))}
          </motion.div>
          
          {/* Call-to-action section */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >            <p className="text-lg opacity-60 mb-6">
              {locale === 'fi' 
                ? 'Tutustu joihinkin töihini'
                : 'Check out some of my work'
              }
            </p><motion.a
              href={localizedHref('/portfolio')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 border backdrop-blur-sm bg-gradient-to-r from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 border-[var(--card-border)] text-[var(--accent-text)] hover:from-[var(--primary)]/20 hover:to-[var(--gradient-mid)]/20 hover:border-[var(--primary)]/50"
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
      </section>{/* Testimonials Section */}
      <section 
        className="py-24 bg-black/5 relative overflow-hidden"
        id="testimonials"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-[var(--gradient-mid)]/10 to-[var(--gradient-end)]/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 blur-3xl"></div>
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
              animate={{}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {t('home.testimonials.title')}
            </motion.h3>
            
            <motion.div
              className="h-1 w-0 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mx-auto mt-6"
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
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-[var(--gradient-start)]/20 to-[var(--gradient-end)]/20 flex items-center justify-center p-1">
                        <div className="w-full h-full rounded-full bg-theme flex items-center justify-center">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
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
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)]"
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
      </section>
      
      {/* Footer */}
    </main>
  );
}
