'use client';

import React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'colorful'
      ? 'bg-[#050023]'
      : isLight
        ? 'bg-gradient-to-br from-slate-50 to-gray-100'
        : 'bg-gradient-to-br from-gray-900 to-black'
      }`}>
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
                label: locale === 'fi' ? 'Katso interaktiiviset prototyypit' : 'View Interactive Prototypes',
                icon: 'play_circle',
                onClick: () => document.getElementById('live-prototypes')?.scrollIntoView({ behavior: 'smooth' }),
              },
              {
                label: locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'View Design System',
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
                    {locale === 'fi' ? "Löydä" : "Discover"}
                  </h3>
                  <p className="opacity-80 text-sm">
                    {locale === 'fi' ? "Tutkimukset ja haastattelut käyttäjien kipupisteiden ymmärtämiseksi" : "Research and interviews to understand user pain points"}
                  </p>
                </div>
              </div>

              <div className="theme-card">
                <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300">
                  <div className="h-11 w-11 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mb-3">
                    <span className="material-symbols text-2xl text-purple-400">notes</span>
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
                  <div className="h-11 w-11 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-full mb-3">
                    <span className="material-symbols text-2xl text-purple-400">edit</span>
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
          <CaseStudySection title={locale === 'fi' ? "Käyttäjäpersoonat" : "User Personas"} icon="groups" accent="pink" number={5}>
            <div className="space-y-8">
                  {[
                    {
                      name: locale === 'fi' ? "Allen (20, Opiskelija)" : "Allen (20, Student)",
                      role: locale === 'fi' ? "Satunnainen käyttäjä" : "Casual User",
                      traits: locale === 'fi' ? ["Satunnainen", "Joustava"] : ["Infrequent", "Flexible"],
                      needs: locale === 'fi' ? ["Nopea raha", "Luotettavat työvuorot"] : ["Quick cash", "Reliable shifts"],
                      painPoints: locale === 'fi' ? ["Sitoutumispaine", "Epäselvä aikataulu"] : ["Commitment pressure", "Unclear scheduling"],
                      photo: "/images/portfolio/profile-img/allen-student.jpg",
                      gradient: "from-emerald-500 via-teal-500 to-cyan-500"
                    },
                    {
                      name: locale === 'fi' ? "James (23, Yliopisto-opiskelija)" : "James (23, Uni Student)",
                      role: locale === 'fi' ? "Viikonlopputyöntekijä" : "Weekend Worker",
                      traits: locale === 'fi' ? ["Johdonmukainen", "Säännöllinen"] : ["Consistent", "Regular"],
                      needs: locale === 'fi' ? ["2-3 vuoroa/vko", "Tuttuja paikkoja"] : ["2-3 shifts/week", "Familiar venues"],
                      painPoints: locale === 'fi' ? ["Kilpailevat vuorot", "Opiskelu tasapaino"] : ["Competing shifts", "Study balance"],
                      photo: "/images/portfolio/profile-img/james-uni.jpg",
                      gradient: "from-violet-500 via-purple-500 to-fuchsia-500"
                    },
                    {
                      name: locale === 'fi' ? "Eeva (40, Säännöllinen)" : "Eeva (40, Regular)",
                      role: locale === 'fi' ? "Kokenut keikkailija" : "Pro Gig Worker",
                      traits: locale === 'fi' ? ["Luotettava", "Suunnitelmallinen"] : ["Dependable", "Planner"],
                      needs: locale === 'fi' ? ["Säännölliset tulot", "Joustavat toimet"] : ["Steady income", "Flexible roles"],
                      painPoints: locale === 'fi' ? ["Viivästynyt palkka", "Huonot varaukset"] : ["Delayed payout", "Poor booking UX"],
                      photo: "/images/portfolio/profile-img/eva-pro.jpg",
                      gradient: "from-amber-500 via-orange-500 to-red-500"
                    }
                  ].map((persona, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                      <div className="theme-card overflow-hidden">
                        <div className="theme-card-content p-0">
                          <div className={`h-1.5 bg-gradient-to-r ${persona.gradient}`} />
                          <div className="p-7 md:p-9">
                            <div className="flex items-center gap-5 mb-7">
                              <div className={`relative p-[3px] rounded-full bg-gradient-to-br ${persona.gradient}`}>
                                <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden ring-2 ring-black/20">
                                  <Image src={persona.photo} alt={persona.name} fill className="object-cover" />
                                </div>
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-primary tracking-tight">{persona.name}</h3>
                                <p className="text-sm font-medium uppercase tracking-widest opacity-50 mt-0.5">{persona.role}</p>
                              </div>
                            </div>
                            <div className="mb-7">
                              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-500 mb-3 flex items-center gap-2">
                                <span className="material-symbols text-[15px]">stars</span>
                                {locale === 'fi' ? "Piirteet" : "Traits"}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {persona.traits.map((trait, i) => (
                                  <span key={i} className="px-3 py-1.5 bg-amber-500/8 border border-amber-500/15 text-amber-500 rounded-full text-xs font-medium">{trait}</span>
                                ))}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="rounded-2xl bg-emerald-500/[0.04] border border-emerald-500/10 p-5">
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-500 mb-4 flex items-center gap-2">
                                  <span className="material-symbols text-[15px]">check_circle</span>
                                  {locale === 'fi' ? "Tarpeet" : "Needs"}
                                </h4>
                                <ul className="space-y-2.5">
                                  {persona.needs.map((need, i) => (
                                    <li key={i} className="text-sm leading-relaxed opacity-75">{need}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="rounded-2xl bg-rose-500/[0.04] border border-rose-500/10 p-5">
                                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-rose-500 mb-4 flex items-center gap-2">
                                  <span className="material-symbols text-[15px]">warning</span>
                                  {locale === 'fi' ? "Kipupisteet" : "Pain Points"}
                                </h4>
                                <ul className="space-y-2.5">
                                  {persona.painPoints.map((point, i) => (
                                    <li key={i} className="text-sm leading-relaxed opacity-75">{point}</li>
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
    </div>
  );
}
