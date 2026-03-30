'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { durationSeconds, delaySeconds, stagger, transition as t } from '@/design-system';
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
              subtitle={locale === 'fi' ? 'Työnhakusovellus tehokkaaseen työpaikan etsintään' : 'Job seeking app for efficient job searching'}
              image="/images/portfolio/jobseeking/cover.jpg"
              tags={roles}
              actions={[
                {
                  label: locale === 'fi' ? 'Katso interaktiiviset prototyypit' : 'Play prototype',
                  icon: 'play_circle',
                  onClick: () => document.getElementById('live-prototypes')?.scrollIntoView({ behavior: 'smooth' }),
                },
                {
                  label: locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'Design System',
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
              transition={{ ...t.enterSlow, delay: delaySeconds.md }}
            >
              <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${theme === 'colorful' ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>
                {content.intro}
              </p>
            </motion.div>

            {/* Objectives */}
            <CaseStudySection title={content.objectives} icon="flag" accent="primary" number={1}>
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
            <CaseStudySection title={content.designProcess} icon="design_services" accent="primary" number={2}>
              <div className="mb-4 opacity-80">{content.designModel} <span className="font-semibold text-primary">{content.doubleD}</span></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                    <div className="h-11 w-11 flex items-center justify-center text-primary bg-primary/10 rounded-full mb-3">
                      <span className="material-symbols text-2xl text-primary">search</span>
                    </div>                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {locale === 'fi' ? "Löydä" : "Discover"}
                    </h3>
                    <p className="opacity-80 text-sm">
                      {locale === 'fi' ? "Tutkimukset ja haastattelut käyttäjien kipupisteiden ymmärtämiseksi" : "Research and interviews to understand user pain points"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                    <div className="h-11 w-11 flex items-center justify-center text-primary bg-primary/10 rounded-full mb-3">
                      <span className="material-symbols text-2xl text-primary">notes</span>
                    </div>                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {locale === 'fi' ? "Määrittele" : "Define"}
                    </h3>
                    <p className="opacity-80 text-sm">
                      {locale === 'fi' ? "Analysoi oivalluksia selkeiden suunnitteluongelmien määrittämiseksi" : "Analyze insights to frame clear design problems"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                    <div className="h-11 w-11 flex items-center justify-center text-primary bg-primary/10 rounded-full mb-3">
                      <span className="material-symbols text-2xl text-primary">edit</span>
                    </div>                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {locale === 'fi' ? "Kehitä" : "Develop"}
                    </h3>
                    <p className="opacity-80 text-sm">
                      {locale === 'fi' ? "Ideoi ratkaisuja ja testaa prototyyppejä" : "Ideate solutions and test prototypes"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                    <div className="h-11 w-11 flex items-center justify-center text-primary bg-primary/10 rounded-full mb-3">
                      <span className="material-symbols text-2xl text-primary">rocket_launch</span>
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
            <CaseStudySection title={content.discoverPhase} icon="search" accent="primary" number={3}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  className="theme-card-flex p-6 hover:bg-theme/70 transition-all duration-300 flex items-start space-x-4 self-start"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-primary bg-primary/10 rounded-full">
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
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-primary bg-primary/10 rounded-full">
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
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-primary bg-primary/10 rounded-full">
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
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-primary bg-primary/10 rounded-full">
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
                          <span className="mr-2 opacity-60">•</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Mittaa sovellustietoisuutta ja käyttöä' : 'Gauge app awareness and usage'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 opacity-60">•</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Tunnista käyttäjien kipupisteet' : 'Identify user pain points'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 opacity-60">•</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Kerää käyttökokemuksen parannusehdotuksia' : 'Gather UX improvement suggestions'}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="mb-4 font-bold text-lg text-primary">{content.methods}</div>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="mr-2 opacity-60">•</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Haastattelut (puolistrukturoidut)' : 'Interviews (semi-structured)'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 opacity-60">•</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Kyselyt (sekalaiset kysymykset)' : 'Surveys (mixed questions)'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 opacity-60">•</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Sovelluksen käytön seuranta' : 'App usage tracking'}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 opacity-60">•</span>
                          <span className="opacity-80 leading-relaxed">{locale === 'fi' ? 'Temaattinen ja kvantitatiivinen data-analyysi' : 'Thematic and quantitative data analysis'}</span>
                        </li>
                      </ul>

                      <div className="mt-6 pt-6 border-t border-primary/10">
                        <div className="mb-2 font-bold text-primary">{content.ethics}</div>
                        <p className="opacity-80 flex items-center text-sm">
                          {locale === 'fi' ? 'Tietoinen suostumus, anonymiteetti, vapaaehtoinen osallistuminen' : 'Informed consent, anonymity, voluntary participation'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CaseStudySection>

            {/* Define Phase */}
            <CaseStudySection title={content.definePhase} icon="notes" accent="primary" number={4}>
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 flex items-center justify-center text-primary bg-primary/10 rounded-full mr-4">
                      <span className="material-symbols text-2xl text-primary">route</span>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">{content.userFlow}</h3>
                  </div>
                  <p className="opacity-80 text-lg">{content.userFlowDesc}</p>
                </div>
              </div>
            </CaseStudySection>

            {/* User Personas */}
            <CaseStudySection title={locale === 'fi' ? "Käyttäjäpersoonat" : "User Personas"} icon="groups" accent="primary" number={5}>
              <div className="space-y-10">
                {[
                  {
                    name: locale === 'fi' ? "Allen (20, Opiskelija)" : "Allen (20, Student)",
                    role: locale === 'fi' ? "Satunnainen käyttäjä" : "Casual User",
                    traits: locale === 'fi' ? ["Satunnainen", "Joustava"] : ["Infrequent", "Flexible"],
                    needs: locale === 'fi' ? ["Nopea raha", "Luotettavat työvuorot"] : ["Quick cash", "Reliable shifts"],
                    painPoints: locale === 'fi' ? ["Sitoutumispaine", "Epäselvä aikataulu"] : ["Commitment pressure", "Unclear scheduling"],
                    photo: "/images/portfolio/profile-img/allen-student.jpg"
                  },
                  {
                    name: locale === 'fi' ? "James (23, Yliopisto-opiskelija)" : "James (23, Uni Student)",
                    role: locale === 'fi' ? "Viikonlopputyöntekijä" : "Weekend Worker",
                    traits: locale === 'fi' ? ["Johdonmukainen", "Säännöllinen"] : ["Consistent", "Regular"],
                    needs: locale === 'fi' ? ["2-3 vuoroa/vko", "Tuttuja paikkoja"] : ["2-3 shifts/week", "Familiar venues"],
                    painPoints: locale === 'fi' ? ["Kilpailevat vuorot", "Opiskelu tasapaino"] : ["Competing shifts", "Study balance"],
                    photo: "/images/portfolio/profile-img/james-uni.jpg"
                  },
                  {
                    name: locale === 'fi' ? "Eeva (40, Säännöllinen)" : "Eeva (40, Regular)",
                    role: locale === 'fi' ? "Kokenut keikkailija" : "Pro Gig Worker",
                    traits: locale === 'fi' ? ["Luotettava", "Suunnitelmallinen"] : ["Dependable", "Planner"],
                    needs: locale === 'fi' ? ["Säännölliset tulot", "Joustavat toimet"] : ["Steady income", "Flexible roles"],
                    painPoints: locale === 'fi' ? ["Viivästynyt palkka", "Huonot varaukset"] : ["Delayed payout", "Poor booking UX"],
                    photo: "/images/portfolio/profile-img/eva-pro.jpg"
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
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ds-warning flex-shrink-0">{locale === 'fi' ? "Piirteet" : "Traits"}</span>
                            <span className="text-sm opacity-60">{persona.traits.join(' · ')}</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="border-l-2 border-green-600/30 pl-4">
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ds-success mb-3">{locale === 'fi' ? "Tarpeet" : "Needs"}</h4>
                              <ul className="space-y-1.5">
                                {persona.needs.map((need, i) => (
                                  <li key={i} className="text-sm leading-relaxed opacity-70">{need}</li>
                                ))}
                              </ul>
                            </div>

                            <div className="border-l-2 border-pink-500/30 pl-4">
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-pink-500 mb-3">{locale === 'fi' ? "Kipupisteet" : "Pain Points"}</h4>
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
            <CaseStudySection title={content.aiCapabilities} icon="auto_awesome" accent="primary" number={6}>

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
            <CaseStudySection title={content.developPhase + ' & ' + content.deliverPhase} icon="rocket_launch" accent="primary" number={7}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="theme-card">
                  <div className="theme-card-content p-6">
                    <h2 className="text-xl font-bold mb-5 text-primary">{content.developPhase}</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">{content.epicGoal}</h3>
                        <div className="flex items-center">
                          <p className="opacity-80">{content.epicGoalDesc}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-2">{content.userTesting}</h3>
                        <div className="flex items-center">
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
            <CaseStudySection title={content.livePrototypes} icon="devices" accent="primary" number={8} id="live-prototypes">
              <p className="text-opacity-80 mb-8 max-w-2xl">{content.livePrototypesIntro}</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    title: content.iosPrototype,
                    description: content.iosPrototypeDesc,
                    href: "/mobile/jobseeking/ios",
                    icon: (<span className="material-symbols text-4xl">phone_iphone</span>),
                    gradient: "from-[var(--primary)]/20 to-[var(--gradient-mid)]/20",
                    borderColor: "border-[var(--primary)]/30",
                    iconBg: "bg-[var(--primary)]/10 text-[var(--primary)]",
                    buttonBg: "bg-gradient-to-r from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 border border-[var(--card-border)] hover:from-[var(--primary)]/20 hover:to-[var(--gradient-mid)]/20 hover:border-[var(--primary)]/50",
                  },
                  {
                    title: content.androidPrototype,
                    description: content.androidPrototypeDesc,
                    href: "/mobile/jobseeking/android",
                    icon: (<span className="material-symbols text-4xl">phone_android</span>),
                    gradient: "from-[var(--primary)]/20 to-[var(--gradient-mid)]/20",
                    borderColor: "border-[var(--primary)]/30",
                    iconBg: "bg-[var(--primary)]/10 text-[var(--primary)]",
                    buttonBg: "bg-gradient-to-r from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 border border-[var(--card-border)] hover:from-[var(--primary)]/20 hover:to-[var(--gradient-mid)]/20 hover:border-[var(--primary)]/50",
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
                    <div className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-[var(--primary)] text-sm font-semibold transition-colors self-start ${proto.buttonBg}`}>
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
