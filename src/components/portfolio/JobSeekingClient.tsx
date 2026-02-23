'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';

export default function JobSeekingClient() {
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
        title: "Job Seeking Application",
        intro: "A cross-platform mobile app designed to streamline job searches for local, part-time, and weekend work. Built with an intelligent AI Copilot and custom iOS/Android themes to make finding trusted gig opportunities faster and smarter.",
        projectType: "Project Type",
        projectTypeValues: "Mobile Platform, AI-Powered Career Coach",
        timeline: "Timeline",
        timelineValue: "8 Weeks",
        tools: "Tools",
        toolsValue: "Next.js, Figma, FigJam",
        roles: "Roles",
        objectives: "Objectives",
        designProcess: "Design Process",
        designModel: "Model:",
        doubleD: "Double Diamond",
        discoverPhase: "Discover Phase",
        definePhase: "Define Phase",
        developPhase: "Develop Phase",
        deliverPhase: "Deliver Phase",
        challenge: "Challenge",
        challengeDesc: "How can users quickly find trustworthy local jobs, either temporary or permanent?",
        discoveryInsights: "Discovery Insights",
        discoveryDesc: "Rising living costs are pushing people to seek extra income—weekend jobs being the most flexible option. A reliable job app helps users showcase their availability and skills efficiently.",
        initialResearch: "Initial Research",
        initialResearchDesc: "Job platforms vary in usability and trust. One solution is to introduce job contracts post-match for more reliability and user trust.",
        hypothesis: "Hypothesis",
        hypothesisDesc: "A locally-focused, easy-to-use job app with personalized profiles can better serve job seekers compared to global platforms.",
        primaryResearch: "Primary Research",
        objectivesLabel: "Objectives:",
        methods: "Methods:",
        ethics: "Ethics:",
        personas: "Personas",
        userFlow: "User Flow",
        userFlowDesc: "MVP supports quick ideation and development for early product maturity—ideal for independent designers and startups.",
        appFeatures: "App Features",
        epicGoal: "Epic Goal",
        epicGoalDesc: "Enable fast income opportunities via local gigs",
        userTesting: "User Testing",
        inProgress: "In progress",
        hifiProto: "High-Fidelity Prototype:",
        hifiProtoDesc: "Visual walkthrough of the final UI, tested against user goals.",
        designReviews: "Design Reviews:",
        designReviewsDesc: "Structured feedback sessions to evaluate UI quality and usability. All feedback is documented.",
        qa: "Quality Assurance:",
        qaDesc: "Covers usability, cross-device compatibility, and visual consistency",
        designDocs: "Design Documentation:",
        designDocsDesc: "Finalized assets, design decisions, and handoff materials—ready for development collaboration.",
        aiCapabilities: "AI Capabilities",
        aiResume: "AI Resume Tailoring",
        aiResumeDesc: "Instantly optimize your resume for specific job descriptions.",
        aiMatch: "Smart Matchmaking",
        aiMatchDesc: "AI-driven job suggestions based on your unique skills and availability.",
        aiCoach: "Interview Prep",
        aiCoachDesc: "Converse with an AI coach to prepare for upcoming interviews.",
        livePrototypes: "Live Prototypes",
        livePrototypesIntro: "Explore the interactive prototypes built for this platform — each designed to follow native design guidelines for their target platform.",
        iosPrototype: "iOS Prototype",
        iosPrototypeDesc: "Built with iOS 26 Human Interface Guidelines — frosted glass vibrancy, SF system colors, and native tab bar navigation.",
        androidPrototype: "Android Prototype",
        androidPrototypeDesc: "Built with Material You (Android 16) — dynamic color, pill navigation, rounded containers, and Material Symbols.",
        openPrototype: "Open Prototype",
      },
      fi: {
        title: "Työnhakusovellus",
        intro: "Monialustainen mobiilisovellus, joka on suunniteltu tehostamaan työnhakua paikallisiin, osa-aikaisiin ja viikonlopputöihin. Varustettu älykkäällä AI Copilotilla ja mukautetuilla iOS/Android-teemoilla nopeampaa ja älykkäämpää keikkatyön löytämistä varten.",
        projectType: "Projektityyppi",
        projectTypeValues: "Mobiilialusta, Tekoälypohjainen uravalmentaja",
        timeline: "Aikataulu",
        timelineValue: "8 viikkoa",
        tools: "Työkalut",
        toolsValue: "Next.js, Figma, FigJam",
        roles: "Roolit",
        objectives: "Tavoitteet",
        designProcess: "Suunnitteluprosessi",
        designModel: "Malli:",
        doubleD: "Double Diamond",
        discoverPhase: "Löytämisvaihe",
        definePhase: "Määrittelyvaihe",
        developPhase: "Kehitysvaihe",
        deliverPhase: "Toimitusvaihe",
        challenge: "Haaste",
        challengeDesc: "Miten käyttäjät voivat nopeasti löytää luotettavia paikallisia työpaikkoja, joko tilapäisiä tai pysyviä?",
        discoveryInsights: "Löydökset",
        discoveryDesc: "Nousevat elinkustannukset ajavat ihmisiä etsimään lisätuloja – viikonlopputyöt ovat joustavin vaihtoehto. Luotettava työnhakusovellus auttaa käyttäjiä esittelemään saatavuutensa ja taitonsa tehokkaasti.",
        initialResearch: "Alustava tutkimus",
        initialResearchDesc: "Työalustat vaihtelevat käytettävyydessä ja luotettavuudessa. Yksi ratkaisu on ottaa käyttöön työsopimukset sovittelun jälkeen paremman luotettavuuden ja käyttäjien luottamuksen varmistamiseksi.",
        hypothesis: "Hypoteesi",
        hypothesisDesc: "Paikallisesti keskittynyt, helppokäyttöinen työnhakusovellus personoiduilla profiileilla voi palvella työnhakijoita paremmin verrattuna globaaleihin alustoihin.",
        primaryResearch: "Ensisijainen tutkimus",
        objectivesLabel: "Tavoitteet:",
        methods: "Menetelmät:",
        ethics: "Eettiset periaatteet:",
        personas: "Käyttäjäpersoonat",
        userFlow: "Käyttäjäpolku",
        userFlowDesc: "MVP tukee nopeaa ideointia ja kehitystä varhaiselle tuotekypsyydelle – ihanteellinen itsenäisille suunnittelijoille ja startupeille.",
        appFeatures: "Sovelluksen Ominaisuudet",
        epicGoal: "Epiiinen tavoite",
        epicGoalDesc: "Mahdollistaa nopeat tulomahdollisuudet paikallisten keikkatöiden kautta",
        userTesting: "Käyttäjätestaus",
        inProgress: "Käynnissä",
        hifiProto: "Korkean tarkkuuden prototyyppi:",
        hifiProtoDesc: "Visuaalinen läpikäynti lopullisesta käyttöliittymästä, testattu käyttäjien tavoitteita vastaan.",
        designReviews: "Suunnittelukatsaukset:",
        designReviewsDesc: "Strukturoidut palautesessiot käyttöliittymän laadun ja käytettävyyden arvioimiseksi. Kaikki palaute dokumentoidaan.",
        qa: "Laadunvarmistus:",
        qaDesc: "Kattaa käytettävyyden, laiteyhteensopivuuden ja visuaalisen johdonmukaisuuden",
        designDocs: "Suunnitteludokumentaatio:",
        designDocsDesc: "Viimeistellyt resurssit, suunnittelupäätökset ja luovutusmateriaalit – valmiina kehitysyhteistyöhön.",
        aiCapabilities: "Tekoälyominaisuudet",
        aiResume: "Ansioluettelon räätälöinti",
        aiResumeDesc: "Optimoi ansioluettelosi välittömästi tiettyyn työpaikkailmoitukseen.",
        aiMatch: "Älykäs täsmäys",
        aiMatchDesc: "Tekoälypohjaiset työpaikkasuositukset perustuen taitoihisi ja saatavuuteesi.",
        aiCoach: "Haastatteluvalmennus",
        aiCoachDesc: "Keskustele tekoälyvalmentajan kanssa valmistautuaksesi tuleviin haastatteluihin.",
        livePrototypes: "Interaktiiviset prototyypit",
        livePrototypesIntro: "Tutustu alustan interaktiivisiin prototyyppeihin — jokainen suunniteltu noudattamaan kohdealustan natiiveja suunnitteluohjeita.",
        iosPrototype: "iOS-prototyyppi",
        iosPrototypeDesc: "Rakennettu iOS 26 Human Interface Guidelines -standardin mukaan — lasiset efektit, järjestelmävärit ja natiivi välilehtipalkkinavigointi.",
        androidPrototype: "Android-prototyyppi",
        androidPrototypeDesc: "Rakennettu Material You (Android 16) -standardin mukaan — dynaaminen väri, pillerinavigointi ja Material Symbols.",
        openPrototype: "Avaa prototyyppi",
      }
    };

    return content[locale as keyof typeof content] || content.en;
  };

  const getObjectives = () => {
    const objectives = {
      en: [
        "Deliver an AI Copilot for interactive interview prep and resume tailoring",
        "Implement seamless job discovery localized for weekend and part-time gigs",
        "Enable engaging interactions through dynamic Dashboards and Notifications",
        "Ensure high-fidelity, native-feeling experiences on both iOS and Android",
        "Maintain accessible design paradigms with intelligent quick-actions"
      ],
      fi: [
        "Toimita AI Copilot interaktiiviseen työhaastatteluihin valmistautumiseen",
        "Toteuta saumaton paikallisten osa-aika- ja viikonlopputöiden haku",
        "Mahdollista mukaansatempaavat vuorovaikutukset dynaamisilla Kojelaudoilla",
        "Varmista natiivin tuntuinen kokemus niin iOS- kuin Android-laitteille",
        "Ylläpidä saavutettavuutta älykkäillä pikatoiminnoilla"
      ]
    };
    return objectives[locale as keyof typeof objectives] || objectives.en;
  };

  const content = getLocalizedContent();
  const objectives = getObjectives();
  const roles = locale === 'fi' ?
    ["Tuotesuunnittelija", "Frontend-kehittäjä", "Tekoäly-integraatio", "Prototypointi"] :
    ["Product Designer", "Frontend Developer", "AI Integration", "Prototyping"];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'colorful'
      ? 'bg-[#050023]'
      : isLight
        ? 'bg-gradient-to-br from-slate-50 to-gray-100'
        : 'bg-gradient-to-br from-gray-900 to-black'
      }`}>
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden rounded-xl mb-16">
            <Image
              src="/images/portfolio/jobseeking/cover.jpg"
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
                  {locale === 'fi' ? 'Työnhakusovellus tehokkaaseen työpaikan etsintään' : 'Job seeking app for efficient job searching'}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      document.getElementById('live-prototypes')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/30 w-full sm:w-auto"
                  >
                    <span className="material-symbols text-2xl">play_circle</span>
                    <span>{locale === 'fi' ? 'Katso interaktiiviset prototyypit' : 'View Interactive Prototypes'}</span>
                  </button>
                  <a
                    href="https://ds.alux.space/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg w-full sm:w-auto ${theme === 'colorful'
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/30'
                      : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
                      }`}
                  >
                    <span className="material-symbols text-2xl">design_services</span>
                    <span>{locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'View Design System'}</span>
                  </a>
                </div>
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

          {/* Project Details Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Project Type */}
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

            {/* Timeline */}
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

            {/* Tools */}
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

            {/* Roles */}
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
                  <span className="opacity-80 ml-3">{objective}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Design Process */}
          <motion.section variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-primary">{content.designProcess}</h2>
            <div className="mb-4 opacity-80">{content.designModel} <span className="font-semibold text-primary">{content.doubleD}</span></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="theme-card">
                <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                  <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                    <span className="material-symbols text-3xl text-purple-400">search</span>
                  </div>                    <h3 className="text-xl font-semibold text-primary mb-2">
                    {locale === 'fi' ? "Löydä" : "Discover"}
                  </h3>
                  <p className="opacity-80">
                    {locale === 'fi' ? "Tutkimukset ja haastattelut käyttäjien kipupisteiden ymmärtämiseksi" : "Research and interviews to understand user pain points"}
                  </p>
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                  <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                    <span className="material-symbols text-3xl text-purple-400">notes</span>
                  </div>                    <h3 className="text-xl font-semibold text-primary mb-2">
                    {locale === 'fi' ? "Määrittele" : "Define"}
                  </h3>
                  <p className="opacity-80">
                    {locale === 'fi' ? "Analysoi oivalluksia selkeiden suunnitteluongelmien määrittämiseksi" : "Analyze insights to frame clear design problems"}
                  </p>
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                  <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                    <span className="material-symbols text-3xl text-purple-400">edit</span>
                  </div>                    <h3 className="text-xl font-semibold text-primary mb-2">
                    {locale === 'fi' ? "Kehitä" : "Develop"}
                  </h3>
                  <p className="opacity-80">
                    {locale === 'fi' ? "Ideoi ratkaisuja ja testaa prototyyppejä" : "Ideate solutions and test prototypes"}
                  </p>
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                  <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                    <span className="material-symbols text-3xl text-purple-400">rocket_launch</span>
                  </div>                    <h3 className="text-xl font-semibold text-primary mb-2">
                    {locale === 'fi' ? "Toimita" : "Deliver"}
                  </h3>
                  <p className="opacity-80">
                    {locale === 'fi' ? "Viimeistele ratkaisu iteratiivisen testauksen ja palautteen avulla" : "Finalize solution through iterative testing and feedback"}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Discover Phase */}
          <motion.section variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-primary">{content.discoverPhase}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex items-start space-x-4 self-start"
                whileHover={{ y: -5 }}
              >
                <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                  <span className="material-symbols text-4xl">warning</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{content.challenge}</h3>
                  <p className="opacity-80 text-sm leading-relaxed">{content.challengeDesc}</p>
                </div>
              </motion.div>

              <motion.div
                className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex items-start space-x-4 self-start"
                whileHover={{ y: -5 }}
              >
                <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                  <span className="material-symbols text-4xl">travel_explore</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{content.discoveryInsights}</h3>
                  <p className="opacity-80 text-sm leading-relaxed">{content.discoveryDesc}</p>
                </div>
              </motion.div>

              <motion.div
                className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex items-start space-x-4 self-start"
                whileHover={{ y: -5 }}
              >
                <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                  <span className="material-symbols text-4xl">search_insights</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{content.initialResearch}</h3>
                  <p className="opacity-80 text-sm leading-relaxed">{content.initialResearchDesc}</p>
                </div>
              </motion.div>

              <motion.div
                className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex items-start space-x-4 self-start"
                whileHover={{ y: -5 }}
              >
                <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                  <span className="material-symbols text-4xl">lightbulb</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">{content.hypothesis}</h3>
                  <p className="opacity-80 text-sm leading-relaxed">{content.hypothesisDesc}</p>
                </div>
              </motion.div>
            </div>

            <div className="theme-card">
              <div className="theme-card-content p-8">
                <h3 className="text-2xl font-semibold text-primary mb-6">{content.primaryResearch}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-4 font-bold text-lg text-primary">{content.objectivesLabel}</div>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="material-symbols text-purple-400 mr-3 mt-0.5">target</span>
                        <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Mittaa sovellustietoisuutta ja käyttöä' : 'Gauge app awareness and usage'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-symbols text-purple-400 mr-3 mt-0.5">psychology</span>
                        <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Tunnista käyttäjien kipupisteet' : 'Identify user pain points'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-symbols text-purple-400 mr-3 mt-0.5">tips_and_updates</span>
                        <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Kerää käyttökokemuksen parannusehdotuksia' : 'Gather UX improvement suggestions'}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="mb-4 font-bold text-lg text-primary">{content.methods}</div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <span className="material-symbols text-purple-400 mr-3 mt-0.5">forum</span>
                        <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Haastattelut (puolistrukturoidut)' : 'Interviews (semi-structured)'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-symbols text-purple-400 mr-3 mt-0.5">checklist</span>
                        <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Kyselyt (sekalaiset kysymykset)' : 'Surveys (mixed questions)'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-symbols text-purple-400 mr-3 mt-0.5">monitoring</span>
                        <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Sovelluksen käytön seuranta' : 'App usage tracking'}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-symbols text-purple-400 mr-3 mt-0.5">analytics</span>
                        <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Temaattinen ja kvantitatiivinen data-analyysi' : 'Thematic and quantitative data analysis'}</span>
                      </li>
                    </ul>

                    <div className="mt-6 pt-6 border-t border-purple-500/10">
                      <div className="mb-2 font-bold text-primary">{content.ethics}</div>
                      <p className="opacity-80 flex items-center text-sm">
                        <span className="material-symbols text-purple-400 mr-2">verified_user</span>
                        {locale === 'fi' ? 'Tietoinen suostumus, anonymiteetti, vapaaehtoinen osallistuminen' : 'Informed consent, anonymity, voluntary participation'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Define Phase */}
          <motion.section variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-primary">{content.definePhase}</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">{content.personas}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: locale === 'fi' ? "Allen (20, Opiskelija)" : "Allen (20, Student)",
                      role: locale === 'fi' ? "Satunnainen käyttäjä" : "Casual User",
                      traits: locale === 'fi' ? ["Satunnainen", "Joustava"] : ["Infrequent", "Flexible"],
                      needs: locale === 'fi' ? ["Nopea raha", "Luotettavat työvuorot"] : ["Quick cash", "Reliable shifts"],
                      painPoints: locale === 'fi' ? ["Sitoutumispaine", "Epäselvä aikataulu"] : ["Commitment pressure", "Unclear scheduling"],
                      icon: (
                        <span className="material-symbols text-4xl">person</span>
                      )
                    },
                    {
                      name: locale === 'fi' ? "James (23, Yliopisto-opiskelija)" : "James (23, Uni Student)",
                      role: locale === 'fi' ? "Viikonlopputyöntekijä" : "Weekend Worker",
                      traits: locale === 'fi' ? ["Johdonmukainen", "Säännöllinen"] : ["Consistent", "Regular"],
                      needs: locale === 'fi' ? ["2-3 vuoroa/vko", "Tuttuja paikkoja"] : ["2-3 shifts/week", "Familiar venues"],
                      painPoints: locale === 'fi' ? ["Kilpailevat vuorot", "Opiskelu tasapaino"] : ["Competing shifts", "Study balance"],
                      icon: (
                        <span className="material-symbols text-4xl">school</span>
                      )
                    },
                    {
                      name: locale === 'fi' ? "Eeva (40, Säännöllinen)" : "Eeva (40, Regular)",
                      role: locale === 'fi' ? "Kokenut keikkailija" : "Pro Gig Worker",
                      traits: locale === 'fi' ? ["Luotettava", "Suunnitelmallinen"] : ["Dependable", "Planner"],
                      needs: locale === 'fi' ? ["Säännölliset tulot", "Joustavat toimet"] : ["Steady income", "Flexible roles"],
                      painPoints: locale === 'fi' ? ["Viivästynyt palkka", "Huonot varaukset"] : ["Delayed payout", "Poor booking UX"],
                      icon: (
                        <span className="material-symbols text-4xl">work</span>
                      )
                    }
                  ].map((persona, index) => (
                    <motion.div
                      key={index}
                      className="theme-card h-full"
                      whileHover={{ y: -5 }}
                    >
                      <div className="theme-card-glow theme-card-glow-secondary"></div>
                      <div className="theme-card-content p-8 hover:bg-theme/70 transition-all duration-300 flex flex-col h-full border-t-4 border-t-purple-500/50">
                        <div className="flex flex-col items-center text-center mb-6">
                          <div className="flex-shrink-0 h-20 w-20 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mb-4 shadow-lg shadow-purple-500/20">
                            {persona.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-primary mb-1">{persona.name}</h3>
                            <p className="text-opacity-80 text-sm font-medium uppercase tracking-wider">{persona.role}</p>
                          </div>
                        </div>

                        <div className="space-y-5 flex-grow flex flex-col">
                          <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/10">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-3 opacity-80 flex items-center justify-center gap-2"><span className="material-symbols text-sm">stars</span>{locale === 'fi' ? "Ominaisuudet" : "Traits"}</h4>
                            <div className="flex flex-wrap justify-center gap-2">
                              {persona.traits.map((trait, i) => (
                                <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold shadow-sm">
                                  {trait}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-4 flex-grow">
                            <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3 flex items-center gap-1"><span className="material-symbols text-sm">check_circle</span>{locale === 'fi' ? "Tarpeet" : "Needs"}</h4>
                              <ul className="space-y-2">
                                {persona.needs.map((need, i) => (
                                  <li key={i} className="flex items-start text-[14px] leading-snug">
                                    <span className="material-symbols text-[16px] text-emerald-500 mr-2 mt-0.5">done</span>
                                    <span className="opacity-90">{need}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/10">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-3 flex items-center gap-1"><span className="material-symbols text-sm">warning</span>{locale === 'fi' ? "Kipupisteet" : "Pain Points"}</h4>
                              <ul className="space-y-2">
                                {persona.painPoints.map((point, i) => (
                                  <li key={i} className="flex items-start text-[14px] leading-snug">
                                    <span className="material-symbols text-[16px] text-rose-500 mr-2 mt-0.5">close</span>
                                    <span className="opacity-90">{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-4">
                      <span className="material-symbols text-2xl text-purple-400">route</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">{content.userFlow}</h3>
                  </div>
                  <p className="opacity-80 text-lg">{content.userFlowDesc}</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* AI Capabilities Section */}
          <motion.section variants={fadeInUp} className="mb-20">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-2xl text-purple-500 mb-2">
                <span className="material-symbols text-4xl">auto_awesome</span>
              </div>
              <h2 className="text-4xl font-extrabold text-primary">{content.aiCapabilities}</h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full opacity-80" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: 'edit_document', title: content.aiResume, desc: content.aiResumeDesc, glow: 'theme-card-glow-primary' },
                { icon: 'target', title: content.aiMatch, desc: content.aiMatchDesc, glow: 'theme-card-glow-secondary' },
                { icon: 'psychology', title: content.aiCoach, desc: content.aiCoachDesc, glow: 'theme-card-glow-tertiary' }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="theme-card h-full group perspective-1000"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`theme-card-glow ${feature.glow}`}></div>
                  <div className="theme-card-content p-8 hover:bg-theme/80 transition-all duration-500 transform hover:-translate-y-2 flex flex-col items-center text-center h-full">
                    <div className="flex-shrink-0 h-24 w-24 flex items-center justify-center text-primary bg-primary/10 rounded-[2rem] mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-primary/20">
                      <span className="material-symbols text-5xl">{feature.icon}</span>
                    </div>
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold mb-4 text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">{feature.title}</h3>
                      <p className="opacity-80 text-base leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Develop & Deliver Phases */}
          <motion.section variants={fadeInUp} className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <h2 className="text-2xl font-bold mb-6 text-primary">{content.developPhase}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.epicGoal}</h3>
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-3">
                          <span className="material-symbols text-3xl text-purple-400">flight_takeoff</span>
                        </div>
                        <p className="opacity-80">{content.epicGoalDesc}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.userTesting}</h3>
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-3">
                          <span className="material-symbols text-3xl text-purple-400">checklist</span>
                        </div>
                        <p className="opacity-80">{content.inProgress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <h2 className="text-2xl font-bold mb-6 text-primary">{content.deliverPhase}</h2>
                  <ul className={`list-disc  opacity-80 space-y-3`}>
                    <li><span className="font-semibold text-primary">{content.hifiProto}</span> {content.hifiProtoDesc}</li>
                    <li><span className="font-semibold text-primary">{content.designReviews}</span> {content.designReviewsDesc}</li>
                    <li><span className="font-semibold text-primary">{content.qa}</span> {content.qaDesc}</li>
                    <li><span className="font-semibold text-primary">{content.designDocs}</span> {content.designDocsDesc}</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section >

          {/* Live Prototypes */}
          <motion.section variants={fadeInUp} className="mb-16" id="live-prototypes">
            <h2 className="text-3xl font-bold mb-3 text-primary">{content.livePrototypes}</h2>
            <p className="text-opacity-80 mb-8 max-w-2xl">{content.livePrototypesIntro}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  title: content.iosPrototype,
                  description: content.iosPrototypeDesc,
                  href: "/mobile/jobseeking/ios",
                  icon: (<span className="material-symbols text-4xl">phone_iphone</span>),
                  gradient: "from-blue-500/20 to-indigo-500/20",
                  borderColor: "border-blue-500/30",
                  iconBg: "bg-blue-500/10 text-blue-400",
                  buttonBg: "bg-blue-600 hover:bg-blue-700",
                },
                {
                  title: content.androidPrototype,
                  description: content.androidPrototypeDesc,
                  href: "/mobile/jobseeking/android",
                  icon: (<span className="material-symbols text-4xl">phone_android</span>),
                  gradient: "from-green-500/20 to-emerald-500/20",
                  borderColor: "border-green-500/30",
                  iconBg: "bg-green-500/10 text-green-400",
                  buttonBg: "bg-green-600 hover:bg-green-700",
                },
              ].map((proto, index) => (
                <motion.a
                  key={index}
                  href={proto.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 border ${proto.borderColor} bg-gradient-to-br ${proto.gradient} flex flex-col`}
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
        </div>
      </main>
    </div>
  );
}
