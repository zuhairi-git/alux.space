'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { durationSeconds, delaySeconds, stagger, transition as t, getButtonClassName } from '@/design-system';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection, { CaseStudyItem } from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';
import Icon from '@/components/ui/Icon';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

export default function WorkflowClient() {

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';

  // Get localized text content
  const getLocalizedContent = () => {
    const content = {
      en: {
        title: "Workflow Platform",
        intro: "An AI-powered platform designed to streamline team collaboration through intelligent workspaces, an AI copilot assistant, and real-time activity tracking — built for seamless experiences across iOS, Android, and a dedicated admin portal.",
        projectType: "Project Type",
        projectTypeValues: "Landing Page, Web & Mobile Platform, AI-Powered Admin Portal",
        timeline: "Timeline",
        timelineValue: "18 Weeks",
        tools: "Tools",
        toolsValue: "Next.js, Figma, FigJam, Maze",
        roles: "Roles",
        objectives: "Objectives",
        designProcess: "Design Process",
        researchInsights: "Research Insights",
        participantFeedback: "Platform Metrics",
        keyRecommendations: "Key Recommendations",
        userPersonas: "User Personas",
        productRequirements: "Product Requirements",
        userTesting: "User Testing",
        testScenario: "Test Scenario",
        testScenarioValue: "Collaborate on a design review using AI Copilot assistance",
        focusAreas: "Focus Areas",
        deliveryPhase: "Delivery Phase",
        completed: "Completed",
        learnMore: "Learn more",
        livePrototypes: "Live Prototypes",
        livePrototypesIntro: "Explore the interactive prototypes built for this platform — each designed to follow native design guidelines for their target platform.",
        iosPrototype: "iOS Prototype",
        iosPrototypeDesc: "Built with iOS 26 Human Interface Guidelines — frosted glass vibrancy, SF system colors, and native tab bar navigation.",
        androidPrototype: "Android Prototype",
        androidPrototypeDesc: "Built with Material You (Android 16) — dynamic color, pill navigation, rounded containers, and Material Symbols.",
        adminPortal: "Collaboration Portal",
        adminPortalDesc: "Enterprise-grade collaboration dashboard with collapsible sidebar, KPI cards, data tables, AI portal logs, and usage analytics.",
        openPrototype: "Open Prototype",
      },
      fi: {
        title: "Työnkulkualusta",
        intro: "Tekoälyllä toimiva alusta, joka tehostaa tiimien yhteistyötä älykkäiden työtilojen, tekoälyavustajan ja reaaliaikaisen toiminnan seurannan avulla — rakennettu saumattomiin kokemuksiin iOS:lle, Androidille ja portaalille.",
        projectType: "Projektityyppi",
        projectTypeValues: "Laskeutumissivu, verkko- ja mobiilialusta, tekoälypohjainen yhteistyöportaali",
        timeline: "Aikataulu",
        timelineValue: "18 viikkoa",
        tools: "Työkalut",
        toolsValue: "Next.js, Figma, FigJam, Maze",
        roles: "Roolit",
        objectives: "Tavoitteet",
        designProcess: "Suunnitteluprosessi",
        researchInsights: "Tutkimustulokset",
        participantFeedback: "Alustan mittarit",
        keyRecommendations: "Tärkeimmät suositukset",
        userPersonas: "Käyttäjäpersoonat",
        productRequirements: "Tuotevaatimukset",
        userTesting: "Käyttäjätestaus",
        testScenario: "Testiskenaario",
        testScenarioValue: "Tee suunnittelukatselmus tekoälyavustajan tuella",
        focusAreas: "Keskittymisalueet",
        deliveryPhase: "Toimitusvaihe",
        completed: "Valmis",
        learnMore: "Lue lisää",
        livePrototypes: "Interaktiiviset prototyypit",
        livePrototypesIntro: "Tutustu alustan interaktiivisiin prototyyppeihin — jokainen suunniteltu noudattamaan kohdealustan natiiveja suunnitteluohjeita.",
        iosPrototype: "iOS-prototyyppi",
        iosPrototypeDesc: "Rakennettu iOS 26 Human Interface Guidelines -standardin mukaan — lasiset efektit, järjestelmävärit ja natiivi välilehtipalkkinavigointi.",
        androidPrototype: "Android-prototyyppi",
        androidPrototypeDesc: "Rakennettu Material You (Android 16) -standardin mukaan — dynaaminen väri, pillerinavigointi ja Material Symbols.",
        adminPortal: "Yhteistyöportaali",
        adminPortalDesc: "Yritystason portaali sivupalkilla, KPI-korteilla, datataulukoilla, tekoälylokilla ja käyttöanalytiikalla.",
        openPrototype: "Avaa prototyyppi",
      }
    };

    return content[locale as keyof typeof content] || content.en;
  };

  // Get localized objectives
  const getObjectives = () => {
    const objectives = {
      en: [
        "Integrate AI Copilot for intelligent workspace assistance",
        "Enable real-time team collaboration across workspaces",
        "Provide actionable AI-driven insights and analytics",
        "Support cross-platform consistency (iOS, Android, Web Admin)",
        "Ensure accessible, mobile-first responsive design"
      ],
      fi: [
        "Integroi tekoälyavustaja älykkääseen työtila-avustukseen",
        "Mahdollista tiimien reaaliaikainen yhteistyö työtiloissa",
        "Tarjoa käytännöllisiä tekoälypohjaisia näkemyksiä ja analytiikkaa",
        "Tue alustojen välistä johdonmukaisuutta (iOS, Android, Web-portaali)",
        "Varmista saavutettava, mobiilipainotteinen responsiivinen suunnittelu"
      ]
    };

    return objectives[locale as keyof typeof objectives] || objectives.en;
  };

  const content = getLocalizedContent();
  const objectives = getObjectives();
  const designProcessSteps = [
    {
      phase: locale === 'fi' ? "Tutki" : "Discover",
      desc: locale === 'fi' ? "Tutki tiimien yhteistyön kipupisteitä ja tekoälymahdollisuuksia" : "Research team collaboration pain points and AI opportunities"
    },
    {
      phase: locale === 'fi' ? "Määrittele" : "Define",
      desc: locale === 'fi' ? "Määrittele tekoälyavustajan laajuus ja työtila-arkkitehtuuri" : "Define AI copilot scope and workspace architecture"
    },
    {
      phase: locale === 'fi' ? "Kehitä" : "Develop",
      desc: locale === 'fi' ? "Rakenna tekoälypohjaiset prototyypit mobiili- ja portaalialustoille" : "Build AI-powered prototypes across mobile and admin platforms"
    },
    {
      phase: locale === 'fi' ? "Toimita" : "Deliver",
      desc: locale === 'fi' ? "Validoi käyttäjillä kaikilla alustoilla ja iteroi" : "Validate with users across all platforms and iterate"
    }
  ];
  // Translation for roles
  const roles = locale === 'fi' ?
    ["Tuotesuunnittelija", "AI/UX-strategi", "Käyttäjätutkimus", "Prototypointi", "Analytiikka"] :
    ["Product Designer", "AI/UX Strategist", "User Research", "Prototyping", "Analytics"];
  // Localized metrics
  const metrics = [
    {
      label: locale === 'fi' ? "Tekoälyavustajan käyttöaste" : "AI Copilot Adoption",
      value: 92
    },
    {
      label: locale === 'fi' ? "Työtilan sitoutuminen" : "Workspace Engagement",
      value: 88
    },
    {
      label: locale === 'fi' ? "Alustayhtenäisyys" : "Cross-Platform Consistency",
      value: 95
    },
    {
      label: locale === 'fi' ? "Tehtävien suoritusaste" : "Task Completion Rate",
      value: 89
    }
  ];
  const pathname = usePathname();
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const ROUTES = [
      '/portfolio/workflow',
      '/portfolio/jobseeking',
      '/portfolio/market-intelligence',
      '/portfolio/accessibility',
      '/portfolio/game-strategy',
      '/portfolio/healthcare-prioritization'
    ];
    const prevPath = sessionStorage.getItem('prevPath');
    if (prevPath) {
      const prevIdx = ROUTES.findIndex(r => pathname.includes(r.split('/').pop()!));
      const currIdx = ROUTES.findIndex(r => prevPath.includes(r.split('/').pop()!));
      // Inverse logic: if we came from a high index to low, we slide right (1)
      setDirection(prevIdx > currIdx ? 1 : -1);
    }
    sessionStorage.setItem('prevPath', pathname);
  }, [pathname]);

  const pageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir * 60,
      scale: 0.98
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: durationSeconds.slow,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: stagger.slow
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir * -40,
      scale: 0.98,
      transition: t.snap
    })
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={pathname}
        custom={direction}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className={`min-h-screen transition-colors duration-300 ${theme === 'colorful'
          ? 'bg-[var(--color-colorful-bg)]'
          : isLight
            ? 'bg-gradient-to-br from-ds-gray-50 to-ds-gray-100'
            : 'bg-gradient-to-br from-ds-gray-900 to-black'
          }`}
      >
        <Navigation />
        <CaseStudyProgress />
        <article className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            {/* Hero Section */}
            <CaseStudyHero
              title={content.title}
              subtitle={locale === 'fi' ? 'Tekoälyllä toimiva yhteistyöalusta tiimeille' : 'AI-powered collaboration platform for teams'}
              image="/images/portfolio/workflow/cover.jpg"
              tags={roles}
              actions={[
                {
                  label: locale === 'fi' ? 'Katso interaktiiviset prototyypit' : 'Play prototype',
                  icon: 'play_circle',
                  variant: 'prototype',
                  onClick: () => document.getElementById('live-prototypes')?.scrollIntoView({ behavior: 'smooth' }),
                },
                {
                  label: locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'Design System',
                  icon: 'design_services',
                  href: '/design/',
                  variant: 'secondary',
                },
              ]}
              meta={[
                { label: content.projectType, value: content.projectTypeValues, icon: 'category' },
                { label: content.timeline, value: content.timelineValue, icon: 'schedule' },
                { label: content.tools, value: content.toolsValue, icon: 'build' },
                { label: content.roles, value: roles.join(', '), icon: 'groups' },
              ]}
            />

            {/* Intro Section */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t.enterSlow, delay: delaySeconds.md }}
            >
              <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${theme === 'colorful' ? 'text-ds-gray-200' : isLight ? 'text-ds-gray-600' : 'text-ds-gray-300'
                }`}>
                {content.intro}
              </p>
            </motion.div>

            {/* Objectives */}
            <CaseStudySection title={content.objectives} number={1}>
              <ul className="list-none space-y-4 max-w-3xl mx-auto">
                {objectives.map((objective: string, index: number) => (
                  <CaseStudyItem key={index}>
                    <li className="flex items-start gap-3">
                      <span className="inline-block w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="opacity-80">{objective}</span>
                    </li>
                  </CaseStudyItem>
                ))}
              </ul>
            </CaseStudySection>

            {/* Design Process */}
            <CaseStudySection title={content.designProcess} number={2}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {designProcessSteps.map((item, index) => (
                  <div
                    key={index}
                    className="theme-card-flex p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="text-primary/50 text-sm font-bold tracking-widest uppercase mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{item.phase}</h3>
                    <p className="opacity-70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CaseStudySection>

            {/* Research Findings */}
            <CaseStudySection title={content.researchInsights} number={3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-6">{content.participantFeedback}</h3>
                  <div className="space-y-7">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        className="relative pt-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`flex items-center justify-between mb-2 `}>
                          <span className="text-opacity-80">{metric.label}</span>
                          <span className="text-primary font-semibold">{metric.value}%</span>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: durationSeconds.glacial, ease: "easeOut" }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary `}
                            style={{
                              width: `${metric.value}%`
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-6">{content.keyRecommendations}</h3>
                  <div className="space-y-6">
                    {[{
                      title: locale === 'fi' ? "Tekoälypohjaiset näkemykset" : "AI-Powered Insights",
                      description: locale === 'fi' ? "Hyödynnä tekoälyavustajaa sprintti- ja suunnittelukatsausten näkemysten esiin tuomiseen" : "Leverage AI copilot to surface actionable sprint and design review insights",
                      icon: "auto_awesome"
                    }, {
                      title: locale === 'fi' ? "Älykkäät ilmoitukset" : "Smart Notifications",
                      description: locale === 'fi' ? "Tekoälyn priorisoimat hälytykset työtilan toiminnan ja määräaikojen perusteella" : "AI-prioritized alerts based on workspace activity and deadlines",
                      icon: "notifications_active"
                    }, {
                      title: locale === 'fi' ? "Alustasynkronointi" : "Cross-Platform Sync",
                      description: locale === 'fi' ? "Saumaton työtilan jatkuvuus iOS:n, Androidin ja portaalin välillä" : "Seamless workspace continuity across iOS, Android, and Admin Portal",
                      icon: "devices"
                    }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 group"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-primary bg-primary/10 rounded-full group-hover:bg-primary/15 transition-colors">
                          <MaterialSymbol className="text-xl">{item.icon}</MaterialSymbol>
                        </div>
                        <div>
                          <h4 className="text-base font-medium text-primary mb-1">{item.title}</h4>
                          <p className="opacity-70 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CaseStudySection>

            {/* User Personas */}
            <CaseStudySection title={locale === 'fi' ? "Käyttäjäpersoonat" : "User Personas"} number={4}>
              <div className="space-y-10">
                {[{
                  name: locale === 'fi' ? "Sara K." : "Sara K.",
                  role: locale === 'fi' ? "Vanhempi tuotesuunnittelija" : "Senior Product Designer",
                  traits: locale === 'fi' ? ["Teknologiaosaava", "Suunnittelukeskeinen"] : ["Tech-savvy", "Design-focused"],
                  needs: locale === 'fi' ? ["Tekoälyavusteiset katselmukset", "Suunnittelujärjestelmätyökalut"] : ["AI-assisted reviews", "Design system tools"],
                  goals: locale === 'fi' ? ["Tehosta suunnittelun luovutusta", "Hyödynnä tekoälyä saavutettavuustarkistuksissa"] : ["Streamline design handoff", "Leverage AI for accessibility audits"],
                  painPoints: locale === 'fi' ? ["Hajautettu palaute", "Manuaaliset katselmusprosessit"] : ["Scattered feedback channels", "Manual review processes"],
                  photo: "/images/portfolio/profile-img/sara-k.jpg"
                }, {
                  name: locale === 'fi' ? "James L." : "James L.",
                  role: locale === 'fi' ? "Tiimipäällikkö" : "Engineering Team Lead",
                  traits: locale === 'fi' ? ["Tuloksiin keskittyvä", "Datalähtöinen"] : ["Results-driven", "Data-oriented"],
                  needs: locale === 'fi' ? ["Sprinttimittarit", "Työtilan koordinointi"] : ["Sprint metrics", "Workspace coordination"],
                  goals: locale === 'fi' ? ["Paranna tiimin nopeutta", "Vähennä kokousaikaa"] : ["Improve team velocity", "Reduce meeting overhead"],
                  painPoints: locale === 'fi' ? ["Kontekstin vaihtaminen", "Viivästyneet hyväksynnät"] : ["Context switching between tools", "Delayed approvals"],
                  photo: "/images/portfolio/profile-img/james-l.jpg"
                }
                ].map((persona, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...t.enterSlow, delay: index * stagger.dramatic }}
                    className="theme-card overflow-hidden"
                  >
                    <div className="theme-card-content p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Photo column */}
                        <div className="relative w-full md:w-56 flex-shrink-0">
                          <div className="relative h-56 md:h-full w-full">
                            <Image src={persona.photo} alt={persona.name} fill className="object-cover" />
                          </div>
                        </div>

                        {/* Content column */}
                        <div className="flex-1 p-6 md:p-8">
                          <div className="mb-5">
                            <h3 className="text-2xl font-bold text-primary tracking-tight leading-tight">{persona.name}</h3>
                            <p className="text-xs font-mono uppercase tracking-widest opacity-40 mt-1">{persona.role}</p>
                          </div>

                          <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-current/[0.06]">
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/80 flex-shrink-0">{locale === 'fi' ? "Piirteet" : "Traits"}</span>
                            <span className="text-sm opacity-60">{persona.traits.join(' · ')}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="border-l-2 border-primary/20 pl-4">
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/80 mb-3">{locale === 'fi' ? "Tarpeet" : "Needs"}</h4>
                              <ul className="space-y-1.5">
                                {persona.needs.map((need, i) => (
                                  <li key={i} className="text-sm leading-relaxed opacity-70">{need}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="border-l-2 border-primary/20 pl-4">
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/80 mb-3">{locale === 'fi' ? "Tavoitteet" : "Goals"}</h4>
                              <ul className="space-y-1.5">
                                {persona.goals.map((goal, i) => (
                                  <li key={i} className="text-sm leading-relaxed opacity-70">{goal}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="border-l-2 border-primary/20 pl-4">
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/80 mb-3">{locale === 'fi' ? "Kipupisteet" : "Pain Points"}</h4>
                              <ul className="space-y-1.5">
                                {persona.painPoints.map((point, i) => (
                                  <li key={i} className="text-sm leading-relaxed opacity-70">{point}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CaseStudySection>

            {/* Requirements & Testing */}
            <CaseStudySection title={content.productRequirements} number={5} showDivider={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-5">{content.productRequirements}</h3>
                  <div className="space-y-5">
                    {[{
                      title: locale === 'fi' ? "Tekoälyavustaja" : "AI Copilot",
                      description: locale === 'fi' ? "Kontekstitietoinen tekoälyavustaja työtilakysymyksiin ja sprinttien tilaan" : "Context-aware AI assistant for workspace queries and sprint status",
                      icon: "auto_awesome"
                    },
                    {
                      title: locale === 'fi' ? "Älykkäät työtilat" : "Smart Workspaces",
                      description: locale === 'fi' ? "Organisoidut yhteistyötilat reaaliaikaisen toiminnan seurannalla" : "Organized collaboration spaces with real-time activity tracking",
                      icon: "workspaces"
                    },
                    {
                      title: locale === 'fi' ? "Älykkäät hälytykset" : "Intelligent Alerts",
                      description: locale === 'fi' ? "Tekoälyn priorisoimat ilmoitukset kiireellisyyden ja kontekstin perusteella" : "AI-prioritized notifications based on urgency and context",
                      icon: "notifications_active"
                    },
                    {
                      title: locale === 'fi' ? "Käyttöanalytiikka" : "Usage Analytics",
                      description: locale === 'fi' ? "Kattava alustan analytiikka sitoutumistiedoilla" : "Comprehensive platform analytics with engagement insights",
                      icon: "analytics"
                    }
                    ].map((req, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 group"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-primary bg-primary/10 rounded-full group-hover:bg-primary/15 transition-colors">
                          <MaterialSymbol className="text-xl">{req.icon}</MaterialSymbol>
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-primary mb-1">{req.title}</h4>
                          <p className="opacity-70 text-sm leading-relaxed">{req.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-5">{content.userTesting}</h3>
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-primary mb-3">{content.testScenario}</h4>
                    <p className="opacity-70 text-sm leading-relaxed pl-3 border-l-2 border-primary/20">{content.testScenarioValue}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-primary mb-4">{content.focusAreas}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[{
                        area: locale === 'fi' ? "Tekoälyintegraatio" : "AI Integration",
                        icon: "auto_awesome"
                      },
                      {
                        area: locale === 'fi' ? "Monialustaisuus" : "Cross-Platform",
                        icon: "devices"
                      },
                      {
                        area: locale === 'fi' ? "Saavutettavuus" : "Accessibility",
                        icon: "accessibility"
                      },
                      {
                        area: locale === 'fi' ? "Reaaliaikainen yhteistyö" : "Real-Time Collab",
                        icon: "groups"
                      }
                      ].map((focus, index) => (
                        <div
                          key={index}
                          className="theme-card-flex p-3 rounded-lg flex items-center gap-3 hover:border-primary/20 transition-colors"
                        >
                          <div className="h-8 w-8 flex items-center justify-center text-primary bg-primary/10 rounded-full flex-shrink-0">
                            <MaterialSymbol className="text-base">{focus.icon}</MaterialSymbol>
                          </div>
                          <span className="opacity-80 text-sm">{focus.area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CaseStudySection>

            {/* Delivery Phase */}
            <CaseStudySection title={content.deliveryPhase} number={6}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[{
                  title: locale === 'fi' ? "Tekoälypohjaiset prototyypit" : "AI-Powered Prototypes",
                  description: locale === 'fi' ? "Interaktiiviset tekoälypohjaiset prototyypit iOS:lle, Androidille ja yhteistyöportaalille" : "Interactive AI-powered prototypes for iOS, Android, and Admin portal with copilot integration",
                  progress: 100,
                  icon: "devices"
                },
                {
                  title: locale === 'fi' ? "Suunnittelukatsaukset" : "Design Reviews",
                  description: locale === 'fi' ? "Tekoälyavusteiset suunnittelukatsaukset ja rakenteelliset palautesessiot" : "AI-assisted design review workflows with structured feedback sessions across stakeholders",
                  progress: 100,
                  icon: "reviews"
                },
                {
                  title: locale === 'fi' ? "Laadunvarmistus" : "Quality Assurance",
                  description: locale === 'fi' ? "Monialustainen testaus mobiilissa ja portaalissa johdonmukaisen tekoälyavustajakokemuksen varmistamiseksi" : "Cross-platform testing across mobile and admin to ensure consistent AI copilot experience",
                  progress: 100,
                  icon: "verified"
                },
                {
                  title: locale === 'fi' ? "Dokumentaatio" : "Documentation",
                  description: locale === 'fi' ? "Kattava alustadokumentaatio tekoälyavustajan käyttäytymisspesifikaatioineen" : "Comprehensive platform docs including AI copilot behavior specifications and integration guides",
                  progress: 100,
                  icon: "folder"
                }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="theme-card-flex p-6 rounded-2xl hover:border-primary/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-primary bg-primary/10 rounded-full">
                        <MaterialSymbol className="text-xl">{item.icon}</MaterialSymbol>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-base font-semibold text-primary mb-1">{item.title}</h3>
                        <p className="opacity-70 text-sm leading-relaxed mb-3">{item.description}</p>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                                {content.completed}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-primary">
                                {item.progress}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-primary/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: durationSeconds.glacial, ease: "easeOut" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CaseStudySection>

            {/* Live Prototypes */}
            <CaseStudySection title={content.livePrototypes} number={7} id="live-prototypes">
              <p className="text-opacity-80 mb-8 max-w-2xl">{content.livePrototypesIntro}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: content.iosPrototype,
                    description: content.iosPrototypeDesc,
                    href: "/mobile/workflow/ios",
                    icon: (<Icon name="ios" size="lg" variant="outline" />),
                    badge: 'iOS 26',
                    gradient: "from-[var(--primary)]/8 to-[var(--primary)]/5",
                    borderColor: "border-[var(--primary)]/25 hover:border-[var(--primary)]/50",
                    iconBg: "bg-[var(--primary)]/10 text-[var(--primary)]",
                    badgeClass: "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30",
                    buttonVariant: 'cosmic' as const,
                  },
                  {
                    title: content.androidPrototype,
                    description: content.androidPrototypeDesc,
                    href: "/mobile/workflow/android",
                    icon: (<Icon name="android" size="lg" variant="outline" />),
                    badge: 'Android 16',
                    gradient: "from-[var(--primary)]/8 to-[var(--primary)]/5",
                    borderColor: "border-[var(--primary)]/25 hover:border-[var(--primary)]/50",
                    iconBg: "bg-[var(--primary)]/10 text-[var(--primary)]",
                    badgeClass: "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30",
                    buttonVariant: 'cosmic' as const,
                  },
                  {
                    title: content.adminPortal,
                    description: content.adminPortalDesc,
                    href: "/portfolio/workflow/admin",
                    icon: (<Icon name="laptop_windows" size="lg" variant="outline" />),
                    badge: 'Web Portal',
                    gradient: "from-[var(--primary)]/15 to-[var(--gradient-mid)]/15",
                    borderColor: "border-[var(--primary)]/20 hover:border-[var(--primary)]/40",
                    iconBg: "bg-[var(--primary)]/10 text-accent",
                    badgeClass: "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/25",
                    buttonVariant: 'cosmic' as const,
                  },
                ].map((proto, index) => (
                  <motion.a
                    key={index}
                    href={proto.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group theme-card-flex p-5 rounded-xl transition-all duration-300 border ${proto.borderColor} bg-gradient-to-br ${proto.gradient} flex flex-col`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.12 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`h-11 w-11 flex items-center justify-center rounded-2xl ${proto.iconBg}`}>
                        {proto.icon}
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${proto.badgeClass}`}>{proto.badge}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{proto.title}</h3>
                    <p className="opacity-70 text-sm leading-relaxed mb-5 flex-grow">{proto.description}</p>
                    <span className={getButtonClassName({ variant: proto.buttonVariant, size: 'sm', className: 'pointer-events-none self-start gap-2' })}>
                      <span>{content.openPrototype}</span>
                      <Icon name="open_in_new" size="sm" variant="outline" className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </motion.a>
                ))}
              </div>
            </CaseStudySection>
          </div>
        </article>
      </motion.div>
    </AnimatePresence>
  );
}
