'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CollaborationClient() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

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
        adminPortal: "Admin Portal",
        adminPortalDesc: "Enterprise-grade admin dashboard with collapsible sidebar, KPI cards, data tables, AI copilot logs, and usage analytics.",
        openPrototype: "Open Prototype",
      },
      fi: {
        title: "Työnkulkualusta",
        intro: "Tekoälyllä toimiva alusta, joka tehostaa tiimien yhteistyötä älykkäiden työtilojen, tekoälyavustajan ja reaaliaikaisen toiminnan seurannan avulla — rakennettu saumattomiin kokemuksiin iOS:lle, Androidille ja hallintaportaalille.",
        projectType: "Projektityyppi",
        projectTypeValues: "Laskeutumissivu, verkko- ja mobiilialusta, tekoälypohjainen hallintaportaali",
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
        adminPortal: "Hallintapaneeli",
        adminPortalDesc: "Yritystason hallintapaneeli sivupalkilla, KPI-korteilla, datataulukoilla, tekoälylokilla ja käyttöanalytiikalla.",
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
        "Tue alustojen välistä johdonmukaisuutta (iOS, Android, Web-hallinta)",
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
      desc: locale === 'fi' ? "Tutki tiimien yhteistyön kipupisteitä ja tekoälymahdollisuuksia" : "Research team collaboration pain points and AI opportunities",
      icon: (
        <span className="material-symbols text-4xl">search</span>
      )
    },
    {
      phase: locale === 'fi' ? "Määrittele" : "Define",
      desc: locale === 'fi' ? "Määrittele tekoälyavustajan laajuus ja työtila-arkkitehtuuri" : "Define AI copilot scope and workspace architecture",
      icon: (
        <span className="material-symbols text-4xl">notes</span>
      )
    },
    {
      phase: locale === 'fi' ? "Kehitä" : "Develop",
      desc: locale === 'fi' ? "Rakenna tekoälypohjaiset prototyypit mobiili- ja hallinta-alustoille" : "Build AI-powered prototypes across mobile and admin platforms",
      icon: (
        <span className="material-symbols text-4xl">edit</span>
      )
    },
    {
      phase: locale === 'fi' ? "Toimita" : "Deliver",
      desc: locale === 'fi' ? "Validoi käyttäjillä kaikilla alustoilla ja iteroi" : "Validate with users across all platforms and iterate",
      icon: (
        <span className="material-symbols text-4xl">rocket_launch</span>
      )
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
  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'colorful'
      ? 'bg-[#050023]'
      : isLight
        ? 'bg-gradient-to-br from-slate-50 to-gray-100'
        : 'bg-gradient-to-br from-gray-900 to-black'
      }`}>
      <Navigation /><article className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden rounded-xl mb-16">
            <Image
              src="/images/portfolio/workflow/cover.jpg"
              alt={content.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  {content.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                  {locale === 'fi' ? 'Tekoälyllä toimiva yhteistyöalusta tiimeille' : 'AI-powered collaboration platform for teams'}
                </p>
              </div>
            </div>
          </div>

          {/* Intro Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={`text-lg md:text-xl leading-relaxed max-w-4xl mx-auto ${theme === 'colorful' ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>
              {content.intro}
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >          {/* Project Details Grid */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Project Type Card */}
              <div className={`p-6 rounded-xl ${theme === 'colorful'
                ? 'bg-gradient-to-br from-cyan-500/20 to-fuchsia-600/20 border border-cyan-400/30 backdrop-blur-lg'
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-lg ${theme === 'colorful' ? 'bg-cyan-400/15 text-cyan-300' : isLight ? 'bg-purple-100 text-purple-600' : 'bg-purple-400/10 text-purple-400'}`}>
                    <span className="material-symbols text-xl">category</span>
                  </div>
                  <h3 className={`font-semibold ${theme === 'colorful'
                    ? 'text-cyan-300'
                    : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.projectType}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.projectTypeValues.split(', ').map((item: string, i: number) => (
                    <span key={i} className={`text-xs px-2.5 py-1 rounded-full font-medium ${theme === 'colorful'
                      ? 'bg-cyan-400/10 text-cyan-200 border border-cyan-400/20'
                      : isLight ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-purple-400/10 text-purple-300 border border-purple-400/20'
                      }`}>{item}</span>
                  ))}
                </div>
              </div>

              {/* Timeline Card */}
              <div className={`p-6 rounded-xl ${theme === 'colorful'
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 backdrop-blur-lg'
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-lg ${theme === 'colorful' ? 'bg-purple-400/15 text-purple-300' : isLight ? 'bg-blue-100 text-blue-600' : 'bg-blue-400/10 text-blue-400'}`}>
                    <span className="material-symbols text-xl">schedule</span>
                  </div>
                  <h3 className={`font-semibold ${theme === 'colorful'
                    ? 'text-purple-300'
                    : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.timeline}</h3>
                </div>
                <p className={`text-2xl font-bold ${theme === 'colorful'
                  ? 'text-white'
                  : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.timelineValue}</p>
              </div>

              {/* Tools Card */}
              <div className={`p-6 rounded-xl ${theme === 'colorful'
                ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-400/30 backdrop-blur-lg'
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-lg ${theme === 'colorful' ? 'bg-blue-400/15 text-blue-300' : isLight ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-400/10 text-emerald-400'}`}>
                    <span className="material-symbols text-xl">build</span>
                  </div>
                  <h3 className={`font-semibold ${theme === 'colorful'
                    ? 'text-blue-300'
                    : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.tools}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.toolsValue.split(', ').map((tool: string, i: number) => (
                    <span key={i} className={`text-xs px-2.5 py-1 rounded-full font-medium ${theme === 'colorful'
                      ? 'bg-blue-400/10 text-blue-200 border border-blue-400/20'
                      : isLight ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20'
                      }`}>{tool}</span>
                  ))}
                </div>
              </div>

              {/* Roles Card */}
              <div className={`p-6 rounded-xl ${theme === 'colorful'
                ? 'bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-fuchsia-400/30 backdrop-blur-lg'
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-lg ${theme === 'colorful' ? 'bg-fuchsia-400/15 text-fuchsia-300' : isLight ? 'bg-amber-100 text-amber-600' : 'bg-amber-400/10 text-amber-400'}`}>
                    <span className="material-symbols text-xl">groups</span>
                  </div>
                  <h3 className={`font-semibold ${theme === 'colorful'
                    ? 'text-fuchsia-300'
                    : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.roles}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role, index) => (
                    <span key={index} className={`text-xs px-2.5 py-1 rounded-full font-medium ${theme === 'colorful'
                      ? 'bg-fuchsia-400/10 text-fuchsia-200 border border-fuchsia-400/20'
                      : isLight ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-amber-400/10 text-amber-300 border border-amber-400/20'
                      }`}>{role}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Objectives */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.objectives}</h2>
              <ul className="list-none space-y-4">
                {objectives.map((objective: string, index: number) => (
                  <li key={index} className={`flex items-start `}>
                    <span className={`inline-block w-2 h-2 mt-2  bg-primary rounded-full`}></span>
                    <span className="opacity-80">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Design Process */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.designProcess}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {designProcessSteps.map((item, index) => (
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
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.researchInsights}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-lg5">
                  <h3 className="text-xl font-semibold text-primary mb-6">{content.participantFeedback}</h3>
                  <div className="space-y-6">
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
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-400/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-400 `}
                            style={{
                              width: `${metric.value}%`
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary mb-6">{content.keyRecommendations}</h3>
                  <div className="space-y-4">
                    {[{
                      title: locale === 'fi' ? "Tekoälypohjaiset näkemykset" : "AI-Powered Insights",
                      description: locale === 'fi' ? "Hyödynnä tekoälyavustajaa sprintti- ja suunnittelukatsausten näkemysten esiin tuomiseen" : "Leverage AI copilot to surface actionable sprint and design review insights",
                      icon: (
                        <span className="material-symbols text-4xl">auto_awesome</span>
                      )
                    }, {
                      title: locale === 'fi' ? "Älykkäät ilmoitukset" : "Smart Notifications",
                      description: locale === 'fi' ? "Tekoälyn priorisoimat hälytykset työtilan toiminnan ja määräaikojen perusteella" : "AI-prioritized alerts based on workspace activity and deadlines",
                      icon: (
                        <span className="material-symbols text-4xl">notifications_active</span>
                      )
                    }, {
                      title: locale === 'fi' ? "Alustasynkronointi" : "Cross-Platform Sync",
                      description: locale === 'fi' ? "Saumaton työtilan jatkuvuus iOS:n, Androidin ja hallintaportaalin välillä" : "Seamless workspace continuity across iOS, Android, and Admin Portal",
                      icon: (
                        <span className="material-symbols text-4xl">devices</span>
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
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.userPersonas}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[{
                  name: locale === 'fi' ? "Sara K." : "Sara K.",
                  role: locale === 'fi' ? "Vanhempi tuotesuunnittelija" : "Senior Product Designer",
                  traits: locale === 'fi' ? ["Teknologiaosaava", "Suunnittelukeskeinen"] : ["Tech-savvy", "Design-focused"],
                  needs: locale === 'fi' ? ["Tekoälyavusteiset katselmukset", "Suunnittelujärjestelmätyökalut"] : ["AI-assisted reviews", "Design system tools"],
                  goals: locale === 'fi' ? ["Tehosta suunnittelun luovutusta", "Hyödynnä tekoälyä saavutettavuustarkistuksissa"] : ["Streamline design handoff", "Leverage AI for accessibility audits"],
                  painPoints: locale === 'fi' ? ["Hajautettu palaute", "Manuaaliset katselmusprosessit"] : ["Scattered feedback channels", "Manual review processes"],
                  icon: (
                    <span className="material-symbols text-4xl">palette</span>
                  )
                }, {
                  name: locale === 'fi' ? "James L." : "James L.",
                  role: locale === 'fi' ? "Tiimipäällikkö" : "Engineering Team Lead",
                  traits: locale === 'fi' ? ["Tuloksiin keskittyvä", "Datalähtöinen"] : ["Results-driven", "Data-oriented"],
                  needs: locale === 'fi' ? ["Sprinttimittarit", "Työtilan koordinointi"] : ["Sprint metrics", "Workspace coordination"],
                  goals: locale === 'fi' ? ["Paranna tiimin nopeutta", "Vähennä kokousaikaa"] : ["Improve team velocity", "Reduce meeting overhead"],
                  painPoints: locale === 'fi' ? ["Kontekstin vaihtaminen", "Viivästyneet hyväksynnät"] : ["Context switching between tools", "Delayed approvals"],
                  icon: (
                    <span className="material-symbols text-4xl">engineering</span>
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
                        <h4 className="text-sm font-medium text-primary mb-2">{locale === 'fi' ? "Ominaisuudet" : "Traits"}</h4>
                        <div className="flex flex-wrap gap-2">
                          {persona.traits.map((trait, i) => (
                            <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">{locale === 'fi' ? "Tarpeet" : "Needs"}</h4>
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
                        <h4 className="text-sm font-medium text-primary mb-2">{locale === 'fi' ? "Tavoitteet" : "Goals"}</h4>
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
                        <h4 className="text-sm font-medium text-primary mb-2">{locale === 'fi' ? "Kipupisteet" : "Pain Points"}</h4>
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
                  <h2 className="text-3xl font-bold mb-6 text-primary">{content.productRequirements}</h2>
                  <div className="space-y-4">
                    {[{
                      title: locale === 'fi' ? "Tekoälyavustaja" : "AI Copilot",
                      description: locale === 'fi' ? "Kontekstitietoinen tekoälyavustaja työtilakysymyksiin ja sprinttien tilaan" : "Context-aware AI assistant for workspace queries and sprint status",
                      icon: (
                        <span className="material-symbols text-4xl">auto_awesome</span>
                      )
                    },
                    {
                      title: locale === 'fi' ? "Älykkäät työtilat" : "Smart Workspaces",
                      description: locale === 'fi' ? "Organisoidut yhteistyötilat reaaliaikaisen toiminnan seurannalla" : "Organized collaboration spaces with real-time activity tracking",
                      icon: (
                        <span className="material-symbols text-4xl">workspaces</span>
                      )
                    },
                    {
                      title: locale === 'fi' ? "Älykkäät hälytykset" : "Intelligent Alerts",
                      description: locale === 'fi' ? "Tekoälyn priorisoimat ilmoitukset kiireellisyyden ja kontekstin perusteella" : "AI-prioritized notifications based on urgency and context",
                      icon: (
                        <span className="material-symbols text-4xl">notifications_active</span>
                      )
                    },
                    {
                      title: locale === 'fi' ? "Käyttöanalytiikka" : "Usage Analytics",
                      description: locale === 'fi' ? "Kattava alustan analytiikka sitoutumistiedoilla" : "Comprehensive platform analytics with engagement insights",
                      icon: (
                        <span className="material-symbols text-4xl">analytics</span>
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
                  <h2 className="text-3xl font-bold mb-6 text-primary">{content.userTesting}</h2>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-primary mb-4">{content.testScenario}</h3>
                    <div className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 self-start">
                      <p className="text-opacity-80">{content.testScenarioValue}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">{content.focusAreas}</h3>
                    <div className="grid grid-cols-2 gap-4 grid-flow-row auto-rows-auto">
                      {[{
                        area: locale === 'fi' ? "Tekoälyintegraatio" : "AI Integration",
                        icon: (
                          <span className="material-symbols text-4xl">auto_awesome</span>
                        )
                      },
                      {
                        area: locale === 'fi' ? "Monialustaisuus" : "Cross-Platform",
                        icon: (
                          <span className="material-symbols text-4xl">devices</span>
                        )
                      },
                      {
                        area: locale === 'fi' ? "Saavutettavuus" : "Accessibility",
                        icon: (
                          <span className="material-symbols text-4xl">accessibility</span>
                        )
                      },
                      {
                        area: locale === 'fi' ? "Reaaliaikainen yhteistyö" : "Real-Time Collab",
                        icon: (
                          <span className="material-symbols text-4xl">groups</span>
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
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.deliveryPhase}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[{
                  title: locale === 'fi' ? "Tekoälypohjaiset prototyypit" : "AI-Powered Prototypes",
                  description: locale === 'fi' ? "Interaktiiviset tekoälypohjaiset prototyypit iOS:lle, Androidille ja hallintaportaalille" : "Interactive AI-powered prototypes for iOS, Android, and Admin portal with copilot integration",
                  progress: 100,
                  icon: (
                    <span className="material-symbols text-4xl">devices</span>
                  )
                },
                {
                  title: locale === 'fi' ? "Suunnittelukatsaukset" : "Design Reviews",
                  description: locale === 'fi' ? "Tekoälyavusteiset suunnittelukatsaukset ja rakenteelliset palautesessiot" : "AI-assisted design review workflows with structured feedback sessions across stakeholders",
                  progress: 100,
                  icon: (
                    <span className="material-symbols text-4xl">reviews</span>
                  )
                },
                {
                  title: locale === 'fi' ? "Laadunvarmistus" : "Quality Assurance",
                  description: locale === 'fi' ? "Monialustainen testaus mobiilissa ja hallinnassa johdonmukaisen tekoälyavustajakokemuksen varmistamiseksi" : "Cross-platform testing across mobile and admin to ensure consistent AI copilot experience",
                  progress: 100,
                  icon: (
                    <span className="material-symbols text-4xl">verified</span>
                  )
                },
                {
                  title: locale === 'fi' ? "Dokumentaatio" : "Documentation",
                  description: locale === 'fi' ? "Kattava alustadokumentaatio tekoälyavustajan käyttäytymisspesifikaatioineen" : "Comprehensive platform docs including AI copilot behavior specifications and integration guides",
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
                                {content.completed}
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

            {/* Live Prototypes */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-3 text-primary">{content.livePrototypes}</h2>
              <p className="text-opacity-80 mb-8 max-w-2xl">{content.livePrototypesIntro}</p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: content.iosPrototype,
                    description: content.iosPrototypeDesc,
                    href: "/mobile/ios",
                    icon: (<span className="material-symbols text-4xl">phone_iphone</span>),
                    gradient: "from-blue-500/20 to-indigo-500/20",
                    borderColor: "border-blue-500/30",
                    iconBg: "bg-blue-500/10 text-blue-400",
                    buttonBg: "bg-blue-600 hover:bg-blue-700",
                  },
                  {
                    title: content.androidPrototype,
                    description: content.androidPrototypeDesc,
                    href: "/mobile/android",
                    icon: (<span className="material-symbols text-4xl">phone_android</span>),
                    gradient: "from-green-500/20 to-emerald-500/20",
                    borderColor: "border-green-500/30",
                    iconBg: "bg-green-500/10 text-green-400",
                    buttonBg: "bg-green-600 hover:bg-green-700",
                  },
                  {
                    title: content.adminPortal,
                    description: content.adminPortalDesc,
                    href: "/admin",
                    icon: (<span className="material-symbols text-4xl">admin_panel_settings</span>),
                    gradient: "from-purple-500/20 to-fuchsia-500/20",
                    borderColor: "border-purple-500/30",
                    iconBg: "bg-purple-500/10 text-purple-400",
                    buttonBg: "bg-purple-600 hover:bg-purple-700",
                  },
                ].map((proto, index) => (
                  <motion.a
                    key={index}
                    href={proto.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group theme-card-flex p-6 rounded-xl hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 border ${proto.borderColor} bg-gradient-to-br ${proto.gradient} flex flex-col`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`h-[68px] w-[68px] flex items-center justify-center rounded-lg mb-4 ${proto.iconBg}`}>
                      {proto.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{proto.title}</h3>
                    <p className="text-opacity-80 text-sm mb-6 flex-grow">{proto.description}</p>
                    <div className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors self-start ${proto.buttonBg}`}>
                      <span>{content.openPrototype}</span>
                      <span className="material-symbols text-base group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
