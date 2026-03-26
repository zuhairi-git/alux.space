'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection, { CaseStudyItem } from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';

export default function JobSeekingClient() {

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
        discoveryDesc: "Rising living costs are pushing people to seek extra incomeâ€”weekend jobs being the most flexible option. A reliable job app helps users showcase their availability and skills efficiently.",
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
        userFlowDesc: "MVP supports quick ideation and development for early product maturityâ€”ideal for independent designers and startups.",
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
        designDocsDesc: "Finalized assets, design decisions, and handoff materialsâ€”ready for development collaboration.",
        aiCapabilities: "AI Capabilities",
        aiResume: "AI Resume Tailoring",
        aiResumeDesc: "Instantly optimize your resume for specific job descriptions.",
        aiMatch: "Smart Matchmaking",
        aiMatchDesc: "AI-driven job suggestions based on your unique skills and availability.",
        aiCoach: "Interview Prep",
        aiCoachDesc: "Converse with an AI coach to prepare for upcoming interviews.",
        livePrototypes: "Live Prototypes",
        livePrototypesIntro: "Explore the interactive prototypes built for this platform â€” each designed to follow native design guidelines for their target platform.",
        iosPrototype: "iOS Prototype",
        iosPrototypeDesc: "Built with iOS 26 Human Interface Guidelines â€” frosted glass vibrancy, SF system colors, and native tab bar navigation.",
        androidPrototype: "Android Prototype",
        androidPrototypeDesc: "Built with Material You (Android 16) â€” dynamic color, pill navigation, rounded containers, and Material Symbols.",
        openPrototype: "Open Prototype",
      },
      fi: {
        title: "TyÃ¶nhakusovellus",
        intro: "Monialustainen mobiilisovellus, joka on suunniteltu tehostamaan tyÃ¶nhakua paikallisiin, osa-aikaisiin ja viikonlopputÃ¶ihin. Varustettu Ã¤lykkÃ¤Ã¤llÃ¤ AI Copilotilla ja mukautetuilla iOS/Android-teemoilla nopeampaa ja Ã¤lykkÃ¤Ã¤mpÃ¤Ã¤ keikkatyÃ¶n lÃ¶ytÃ¤mistÃ¤ varten.",
        projectType: "Projektityyppi",
        projectTypeValues: "Mobiilialusta, TekoÃ¤lypohjainen uravalmentaja",
        timeline: "Aikataulu",
        timelineValue: "8 viikkoa",
        tools: "TyÃ¶kalut",
        toolsValue: "Next.js, Figma, FigJam",
        roles: "Roolit",
        objectives: "Tavoitteet",
        designProcess: "Suunnitteluprosessi",
        designModel: "Malli:",
        doubleD: "Double Diamond",
        discoverPhase: "LÃ¶ytÃ¤misvaihe",
        definePhase: "MÃ¤Ã¤rittelyvaihe",
        developPhase: "Kehitysvaihe",
        deliverPhase: "Toimitusvaihe",
        challenge: "Haaste",
        challengeDesc: "Miten kÃ¤yttÃ¤jÃ¤t voivat nopeasti lÃ¶ytÃ¤Ã¤ luotettavia paikallisia tyÃ¶paikkoja, joko tilapÃ¤isiÃ¤ tai pysyviÃ¤?",
        discoveryInsights: "LÃ¶ydÃ¶kset",
        discoveryDesc: "Nousevat elinkustannukset ajavat ihmisiÃ¤ etsimÃ¤Ã¤n lisÃ¤tuloja â€“ viikonlopputyÃ¶t ovat joustavin vaihtoehto. Luotettava tyÃ¶nhakusovellus auttaa kÃ¤yttÃ¤jiÃ¤ esittelemÃ¤Ã¤n saatavuutensa ja taitonsa tehokkaasti.",
        initialResearch: "Alustava tutkimus",
        initialResearchDesc: "TyÃ¶alustat vaihtelevat kÃ¤ytettÃ¤vyydessÃ¤ ja luotettavuudessa. Yksi ratkaisu on ottaa kÃ¤yttÃ¶Ã¶n tyÃ¶sopimukset sovittelun jÃ¤lkeen paremman luotettavuuden ja kÃ¤yttÃ¤jien luottamuksen varmistamiseksi.",
        hypothesis: "Hypoteesi",
        hypothesisDesc: "Paikallisesti keskittynyt, helppokÃ¤yttÃ¶inen tyÃ¶nhakusovellus personoiduilla profiileilla voi palvella tyÃ¶nhakijoita paremmin verrattuna globaaleihin alustoihin.",
        primaryResearch: "Ensisijainen tutkimus",
        objectivesLabel: "Tavoitteet:",
        methods: "MenetelmÃ¤t:",
        ethics: "Eettiset periaatteet:",
        personas: "KÃ¤yttÃ¤jÃ¤persoonat",
        userFlow: "KÃ¤yttÃ¤jÃ¤polku",
        userFlowDesc: "MVP tukee nopeaa ideointia ja kehitystÃ¤ varhaiselle tuotekypsyydelle â€“ ihanteellinen itsenÃ¤isille suunnittelijoille ja startupeille.",
        appFeatures: "Sovelluksen Ominaisuudet",
        epicGoal: "Epiiinen tavoite",
        epicGoalDesc: "Mahdollistaa nopeat tulomahdollisuudet paikallisten keikkatÃ¶iden kautta",
        userTesting: "KÃ¤yttÃ¤jÃ¤testaus",
        inProgress: "KÃ¤ynnissÃ¤",
        hifiProto: "Korkean tarkkuuden prototyyppi:",
        hifiProtoDesc: "Visuaalinen lÃ¤pikÃ¤ynti lopullisesta kÃ¤yttÃ¶liittymÃ¤stÃ¤, testattu kÃ¤yttÃ¤jien tavoitteita vastaan.",
        designReviews: "Suunnittelukatsaukset:",
        designReviewsDesc: "Strukturoidut palautesessiot kÃ¤yttÃ¶liittymÃ¤n laadun ja kÃ¤ytettÃ¤vyyden arvioimiseksi. Kaikki palaute dokumentoidaan.",
        qa: "Laadunvarmistus:",
        qaDesc: "Kattaa kÃ¤ytettÃ¤vyyden, laiteyhteensopivuuden ja visuaalisen johdonmukaisuuden",
        designDocs: "Suunnitteludokumentaatio:",
        designDocsDesc: "Viimeistellyt resurssit, suunnittelupÃ¤Ã¤tÃ¶kset ja luovutusmateriaalit â€“ valmiina kehitysyhteistyÃ¶hÃ¶n.",
        aiCapabilities: "TekoÃ¤lyominaisuudet",
        aiResume: "Ansioluettelon rÃ¤Ã¤tÃ¤lÃ¶inti",
        aiResumeDesc: "Optimoi ansioluettelosi vÃ¤littÃ¶mÃ¤sti tiettyyn tyÃ¶paikkailmoitukseen.",
        aiMatch: "Ã„lykÃ¤s tÃ¤smÃ¤ys",
        aiMatchDesc: "TekoÃ¤lypohjaiset tyÃ¶paikkasuositukset perustuen taitoihisi ja saatavuuteesi.",
        aiCoach: "Haastatteluvalmennus",
        aiCoachDesc: "Keskustele tekoÃ¤lyvalmentajan kanssa valmistautuaksesi tuleviin haastatteluihin.",
        livePrototypes: "Interaktiiviset prototyypit",
        livePrototypesIntro: "Tutustu alustan interaktiivisiin prototyyppeihin â€” jokainen suunniteltu noudattamaan kohdealustan natiiveja suunnitteluohjeita.",
        iosPrototype: "iOS-prototyyppi",
        iosPrototypeDesc: "Rakennettu iOS 26 Human Interface Guidelines -standardin mukaan â€” lasiset efektit, jÃ¤rjestelmÃ¤vÃ¤rit ja natiivi vÃ¤lilehtipalkkinavigointi.",
        androidPrototype: "Android-prototyyppi",
        androidPrototypeDesc: "Rakennettu Material You (Android 16) -standardin mukaan â€” dynaaminen vÃ¤ri, pillerinavigointi ja Material Symbols.",
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
        "Toimita AI Copilot interaktiiviseen tyÃ¶haastatteluihin valmistautumiseen",
        "Toteuta saumaton paikallisten osa-aika- ja viikonlopputÃ¶iden haku",
        "Mahdollista mukaansatempaavat vuorovaikutukset dynaamisilla Kojelaudoilla",
        "Varmista natiivin tuntuinen kokemus niin iOS- kuin Android-laitteille",
        "YllÃ¤pidÃ¤ saavutettavuutta Ã¤lykkÃ¤illÃ¤ pikatoiminnoilla"
      ]
    };
    return objectives[locale as keyof typeof objectives] || objectives.en;
  };

  const content = getLocalizedContent();
  const objectives = getObjectives();
  const roles = locale === 'fi' ?
    ["Tuotesuunnittelija", "Frontend-kehittÃ¤jÃ¤", "TekoÃ¤ly-integraatio", "Prototypointi"] :
    ["Product Designer", "Frontend Developer", "AI Integration", "Prototyping"];

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
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1
      }
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir * -40,
      scale: 0.98,
      transition: { duration: 0.3 }
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
            ? 'bg-gradient-to-br from-slate-50 to-gray-100'
            : 'bg-gradient-to-br from-gray-900 to-black'
          }`}
      >
        <Navigation />
        <CaseStudyProgress />

        <main className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            {/* Hero Section */}
            <CaseStudyHero
              title={content.title}
              subtitle={locale === 'fi' ? 'TyÃ¶nhakusovellus tehokkaaseen tyÃ¶paikan etsintÃ¤Ã¤n' : 'Job seeking app for efficient job searching'}
              image="/images/portfolio/jobseeking/cover.jpg"
              tags={roles}
              actions={[
                {
                  label: locale === 'fi' ? 'Katso interaktiiviset prototyypit' : 'Play prototype',
                  icon: 'play_circle',
                  onClick: () => document.getElementById('live-prototypes')?.scrollIntoView({ behavior: 'smooth' }),
                },
                {
                  label: locale === 'fi' ? 'Tarkastele suunnittelujÃ¤rjestelmÃ¤Ã¤' : 'Design System',
                  icon: 'design_services',
                  href: 'https://ds.alux.space/',
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
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${theme === 'colorful' ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>
                {content.intro}
              </p>
            </motion.div>

            {/* Objectives */}
            <CaseStudySection title={content.objectives} icon="flag" accent="purple" number={1}>
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
            <CaseStudySection title={content.designProcess} icon="design_services" accent="blue" number={2}>
              <div className="mb-4 opacity-80">{content.designModel} <span className="font-semibold text-primary">{content.doubleD}</span></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                    <div className="h-11 w-11 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mb-3">
                      <span className="material-symbols text-2xl text-purple-400">search</span>
                    </div>                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {locale === 'fi' ? "LÃ¶ydÃ¤" : "Discover"}
                    </h3>
                    <p className="opacity-80 text-sm">
                      {locale === 'fi' ? "Tutkimukset ja haastattelut kÃ¤yttÃ¤jien kipupisteiden ymmÃ¤rtÃ¤miseksi" : "Research and interviews to understand user pain points"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                    <div className="h-11 w-11 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mb-3">
                      <span className="material-symbols text-2xl text-purple-400">notes</span>
                    </div>                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {locale === 'fi' ? "MÃ¤Ã¤rittele" : "Define"}
                    </h3>
                    <p className="opacity-80 text-sm">
                      {locale === 'fi' ? "Analysoi oivalluksia selkeiden suunnitteluongelmien mÃ¤Ã¤rittÃ¤miseksi" : "Analyze insights to frame clear design problems"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                    <div className="h-11 w-11 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mb-3">
                      <span className="material-symbols text-2xl text-purple-400">edit</span>
                    </div>                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {locale === 'fi' ? "KehitÃ¤" : "Develop"}
                    </h3>
                    <p className="opacity-80 text-sm">
                      {locale === 'fi' ? "Ideoi ratkaisuja ja testaa prototyyppejÃ¤" : "Ideate solutions and test prototypes"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                    <div className="h-11 w-11 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mb-3">
                      <span className="material-symbols text-2xl text-purple-400">rocket_launch</span>
                    </div>                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {locale === 'fi' ? "Toimita" : "Deliver"}
                    </h3>
                    <p className="opacity-80 text-sm">
                      {locale === 'fi' ? "Viimeistele ratkaisu iteratiivisen testauksen ja palautteen avulla" : "Finalize solution through iterative testing and feedback"}
                    </p>
                  </div>
                </div>
              </div>
            </CaseStudySection>

            {/* Discover Phase */}
            <CaseStudySection title={content.discoverPhase} icon="search" accent="green" number={3}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 flex items-start space-x-4 self-start"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full">
                    <span className="material-symbols text-2xl">warning</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{content.challenge}</h3>
                    <p className="opacity-80 text-sm leading-relaxed">{content.challengeDesc}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 flex items-start space-x-4 self-start"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full">
                    <span className="material-symbols text-2xl">travel_explore</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{content.discoveryInsights}</h3>
                    <p className="opacity-80 text-sm leading-relaxed">{content.discoveryDesc}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 flex items-start space-x-4 self-start"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full">
                    <span className="material-symbols text-2xl">search_insights</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{content.initialResearch}</h3>
                    <p className="opacity-80 text-sm leading-relaxed">{content.initialResearchDesc}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 flex items-start space-x-4 self-start"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full">
                    <span className="material-symbols text-2xl">lightbulb</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{content.hypothesis}</h3>
                    <p className="opacity-80 text-sm leading-relaxed">{content.hypothesisDesc}</p>
                  </div>
                </motion.div>
              </div>

              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <h3 className="text-2xl font-semibold text-primary mb-6">{content.primaryResearch}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="mb-4 font-bold text-lg text-primary">{content.objectivesLabel}</div>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="material-symbols text-purple-400 mr-3 mt-0.5">target</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Mittaa sovellustietoisuutta ja kÃ¤yttÃ¶Ã¤' : 'Gauge app awareness and usage'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-symbols text-purple-400 mr-3 mt-0.5">psychology</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Tunnista kÃ¤yttÃ¤jien kipupisteet' : 'Identify user pain points'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-symbols text-purple-400 mr-3 mt-0.5">tips_and_updates</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'KerÃ¤Ã¤ kÃ¤yttÃ¶kokemuksen parannusehdotuksia' : 'Gather UX improvement suggestions'}</span>
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
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Sovelluksen kÃ¤ytÃ¶n seuranta' : 'App usage tracking'}</span>
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
            </CaseStudySection>

            {/* Define Phase */}
            <CaseStudySection title={content.definePhase} icon="notes" accent="orange" number={4}>
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mr-4">
                      <span className="material-symbols text-2xl text-purple-400">route</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">{content.userFlow}</h3>
                  </div>
                  <p className="opacity-80 text-lg">{content.userFlowDesc}</p>
                </div>
              </div>
            </CaseStudySection>

            {/* User Personas */}
            <CaseStudySection title={locale === 'fi' ? "KÃ¤yttÃ¤jÃ¤persoonat" : "User Personas"} icon="groups" accent="pink" number={5}>
              <div className="space-y-10">
                {[
                  {
                    name: locale === 'fi' ? "Allen (20, Opiskelija)" : "Allen (20, Student)",
                    role: locale === 'fi' ? "Satunnainen kÃ¤yttÃ¤jÃ¤" : "Casual User",
                    traits: locale === 'fi' ? ["Satunnainen", "Joustava"] : ["Infrequent", "Flexible"],
                    needs: locale === 'fi' ? ["Nopea raha", "Luotettavat tyÃ¶vuorot"] : ["Quick cash", "Reliable shifts"],
                    painPoints: locale === 'fi' ? ["Sitoutumispaine", "EpÃ¤selvÃ¤ aikataulu"] : ["Commitment pressure", "Unclear scheduling"],
                    photo: "/images/portfolio/profile-img/allen-student.jpg"
                  },
                  {
                    name: locale === 'fi' ? "James (23, Yliopisto-opiskelija)" : "James (23, Uni Student)",
                    role: locale === 'fi' ? "ViikonlopputyÃ¶ntekijÃ¤" : "Weekend Worker",
                    traits: locale === 'fi' ? ["Johdonmukainen", "SÃ¤Ã¤nnÃ¶llinen"] : ["Consistent", "Regular"],
                    needs: locale === 'fi' ? ["2-3 vuoroa/vko", "Tuttuja paikkoja"] : ["2-3 shifts/week", "Familiar venues"],
                    painPoints: locale === 'fi' ? ["Kilpailevat vuorot", "Opiskelu tasapaino"] : ["Competing shifts", "Study balance"],
                    photo: "/images/portfolio/profile-img/james-uni.jpg"
                  },
                  {
                    name: locale === 'fi' ? "Eeva (40, SÃ¤Ã¤nnÃ¶llinen)" : "Eeva (40, Regular)",
                    role: locale === 'fi' ? "Kokenut keikkailija" : "Pro Gig Worker",
                    traits: locale === 'fi' ? ["Luotettava", "Suunnitelmallinen"] : ["Dependable", "Planner"],
                    needs: locale === 'fi' ? ["SÃ¤Ã¤nnÃ¶lliset tulot", "Joustavat toimet"] : ["Steady income", "Flexible roles"],
                    painPoints: locale === 'fi' ? ["ViivÃ¤stynyt palkka", "Huonot varaukset"] : ["Delayed payout", "Poor booking UX"],
                    photo: "/images/portfolio/profile-img/eva-pro.jpg"
                  }
                ].map((persona, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
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
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-500 flex-shrink-0">{locale === 'fi' ? "Piirteet" : "Traits"}</span>
                            <span className="text-sm opacity-60">{persona.traits.join(' Â· ')}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="border-l-2 border-emerald-500/30 pl-4">
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-500 mb-3">{locale === 'fi' ? "Tarpeet" : "Needs"}</h4>
                              <ul className="space-y-1.5">
                                {persona.needs.map((need, i) => (
                                  <li key={i} className="text-sm leading-relaxed opacity-70">{need}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="border-l-2 border-rose-500/30 pl-4">
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-rose-500 mb-3">{locale === 'fi' ? "Kipupisteet" : "Pain Points"}</h4>
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

            {/* AI Capabilities Section */}
            <CaseStudySection title={content.aiCapabilities} icon="auto_awesome" accent="purple" number={6}>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: 'edit_document', title: content.aiResume, desc: content.aiResumeDesc, glow: 'theme-card-glow-primary' },
                  { icon: 'target', title: content.aiMatch, desc: content.aiMatchDesc, glow: 'theme-card-glow-secondary' },
                  { icon: 'psychology', title: content.aiCoach, desc: content.aiCoachDesc, glow: 'theme-card-glow-tertiary' }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="theme-card h-full group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="theme-card-content p-6 hover:bg-theme/80 transition-all duration-300 flex flex-col items-center text-center h-full">
                      <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center text-primary bg-primary/10 rounded-full mb-5 group-hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols text-2xl">{feature.icon}</span>
                      </div>
                      <div className="flex-grow flex flex-col">
                        <h3 className="text-lg font-bold mb-3 text-primary">{feature.title}</h3>
                        <p className="opacity-80 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CaseStudySection>

            {/* Develop & Deliver Phases */}
            <CaseStudySection title={content.developPhase + ' & ' + content.deliverPhase} icon="rocket_launch" accent="teal" number={7}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="theme-card">
                  <div className="theme-card-content p-6">
                    <h2 className="text-xl font-bold mb-5 text-primary">{content.developPhase}</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">{content.epicGoal}</h3>
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mr-3">
                            <span className="material-symbols text-2xl text-purple-400">flight_takeoff</span>
                          </div>
                          <p className="opacity-80">{content.epicGoalDesc}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">{content.userTesting}</h3>
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mr-3">
                            <span className="material-symbols text-2xl text-purple-400">checklist</span>
                          </div>
                          <p className="opacity-80">{content.inProgress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6">
                    <h2 className="text-xl font-bold mb-5 text-primary">{content.deliverPhase}</h2>
                    <ul className={`list-disc  opacity-80 space-y-3`}>
                      <li><span className="font-semibold text-primary">{content.hifiProto}</span> {content.hifiProtoDesc}</li>
                      <li><span className="font-semibold text-primary">{content.designReviews}</span> {content.designReviewsDesc}</li>
                      <li><span className="font-semibold text-primary">{content.qa}</span> {content.qaDesc}</li>
                      <li><span className="font-semibold text-primary">{content.designDocs}</span> {content.designDocsDesc}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CaseStudySection>

            {/* Live Prototypes */}
            <CaseStudySection title={content.livePrototypes} icon="devices" accent="cyan" number={8} id="live-prototypes">
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
                    className={`group theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 border ${proto.borderColor} bg-gradient-to-br ${proto.gradient} flex flex-col`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className={`h-10 w-10 flex items-center justify-center rounded-full mb-3 ${proto.iconBg}`}>
                      {proto.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{proto.title}</h3>
                    <p className="text-opacity-80 text-sm mb-6 flex-grow">{proto.description}</p>
                    <div className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors self-start ${proto.buttonBg}`}>
                      <span>{content.openPrototype}</span>
                      <span className="material-symbols text-base group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </CaseStudySection>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
