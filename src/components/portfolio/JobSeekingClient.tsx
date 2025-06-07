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
        intro: "A mobile app designed to streamline job searches—especially for local, part-time, and weekend work. Created to make job hunting faster, easier, and more efficient for people seeking additional income opportunities.",
        projectType: "Project Type",
        projectTypeValues: "Frontend Application for End Users",
        timeline: "Timeline",
        timelineValue: "8 Weeks",
        tools: "Tools",
        toolsValue: "Figma, FigJam, Maze",
        roles: "Roles",
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
        objectives: "Objectives:",
        methods: "Methods:",
        ethics: "Ethics:",
        personas: "Personas",
        userFlow: "User Flow",
        userFlowDesc: "MVP supports quick ideation and development for early product maturity—ideal for independent designers and startups.",
        productRequirements: "Product Requirements",
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
      },
      fi: {
        title: "Työnhakusovellus",
        intro: "Mobiilisovellus, joka on suunniteltu virtaviivaistamaan työnhakua – erityisesti paikallisiin, osa-aikaisiin ja viikonlopputöihin. Luotu tekemään työnhausta nopeampaa, helpompaa ja tehokkaampaa ihmisille, jotka etsivät lisätuloja.",
        projectType: "Projektityyppi",
        projectTypeValues: "Frontend-sovellus loppukäyttäjille",
        timeline: "Aikataulu",
        timelineValue: "8 viikkoa",
        tools: "Työkalut",
        toolsValue: "Figma, FigJam, Maze",
        roles: "Roolit",
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
        objectives: "Tavoitteet:",
        methods: "Menetelmät:",
        ethics: "Eettiset periaatteet:",
        personas: "Käyttäjäpersoonat",
        userFlow: "Käyttäjäpolku",
        userFlowDesc: "MVP tukee nopeaa ideointia ja kehitystä varhaiselle tuotekypsyydelle – ihanteellinen itsenäisille suunnittelijoille ja startupeille.",
        productRequirements: "Tuotevaatimukset",
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
        designDocsDesc: "Viimeistellyt resurssit, suunnittelupäätökset ja luovutusmateriaalit – valmiina kehitysyhteistyöhön.",      }
    };
    
    return content[locale as keyof typeof content] || content.en;
  };

  const content = getLocalizedContent();
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'colorful' 
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
            <p className={`text-lg md:text-xl leading-relaxed max-w-4xl mx-auto ${
              theme === 'colorful' ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
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
          >            {/* Project Details Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`p-6 rounded-xl ${
                theme === 'colorful' 
                  ? 'bg-gradient-to-br from-cyan-500/20 to-fuchsia-600/20 border border-cyan-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'colorful' 
                    ? 'text-cyan-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.projectType}</h3>
                <p className={`text-sm ${
                  theme === 'colorful' 
                    ? 'text-gray-300' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.projectTypeValues}</p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'colorful' 
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'colorful' 
                    ? 'text-purple-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.timeline}</h3>
                <p className={`text-sm ${
                  theme === 'colorful' 
                    ? 'text-gray-300' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.timelineValue}</p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'colorful' 
                  ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'colorful' 
                    ? 'text-blue-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.tools}</h3>
                <p className={`text-sm ${
                  theme === 'colorful' 
                    ? 'text-gray-300' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.toolsValue}</p>
              </div>
              
              <div className={`p-6 rounded-xl ${
                theme === 'colorful' 
                  ? 'bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-fuchsia-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`font-semibold mb-2 ${
                  theme === 'colorful' 
                    ? 'text-fuchsia-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.roles}</h3>
                <div className={`text-sm ${
                  theme === 'colorful' 
                    ? 'text-gray-300' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  <div>{locale === 'fi' ? 'Tuotesuunnittelija' : 'Product Designer'}</div>
                  <div>{locale === 'fi' ? 'Tuotejohtaja' : 'Product Manager'}</div>
                  <div>{locale === 'fi' ? 'Käyttäjätutkimus' : 'User Research'}</div>
                  <div>{locale === 'fi' ? 'Testaus' : 'Testing'}</div>
                  <div>{locale === 'fi' ? 'Käyttäytymisanalytiikka' : 'Behavior Analytics'}</div>
                </div>
              </div>
            </motion.div>

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
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.challenge}</h3>
                      <p className="opacity-80">{content.challengeDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.discoveryInsights}</h3>
                      <p className="opacity-80">{content.discoveryDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.initialResearch}</h3>
                      <p className="opacity-80">{content.initialResearchDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.hypothesis}</h3>
                      <p className="opacity-80">{content.hypothesisDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.primaryResearch}</h3>
                      <div className="mb-2 font-medium">{content.objectives}</div>
                      <ul className="list-inside mb-4 opacity-80 space-y-1">                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">target</span>
                          {locale === 'fi' ? 'Mittaa sovellustietoisuutta ja käyttöä' : 'Gauge app awareness and usage'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">psychology</span>
                          {locale === 'fi' ? 'Tunnista käyttäjien kipupisteet' : 'Identify user pain points'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">lightbulb</span>
                          {locale === 'fi' ? 'Kerää käyttökokemuksen parannusehdotuksia' : 'Gather UX improvement suggestions'}
                        </li>
                      </ul>
                      <div className="mb-2 font-medium">{content.methods}</div>
                      <ul className="list-inside mb-4 opacity-80 space-y-1">                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">group</span>
                          {locale === 'fi' ? 'Haastattelut (puolistrukturoidut)' : 'Interviews (semi-structured)'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">list_alt</span>
                          {locale === 'fi' ? 'Kyselyt (sekalaiset kysymykset)' : 'Surveys (mixed questions)'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">trending_up</span>
                          {locale === 'fi' ? 'Sovelluksen käytön seuranta' : 'App usage tracking'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">data_object</span>
                          {locale === 'fi' ? 'Temaattinen ja kvantitatiivinen data-analyysi' : 'Thematic and quantitative data analysis'}
                        </li>
                      </ul>
                      <div className="mb-2 font-medium">{content.ethics}</div>                      <p className="opacity-80 flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">verified_user</span>
                        {locale === 'fi' ? 'Tietoinen suostumus, anonymiteetti, vapaaehtoinen osallistuminen' : 'Informed consent, anonymity, voluntary participation'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Define Phase */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.definePhase}</h2>
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-4">{content.personas}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-theme/20 p-4 rounded-lg">
                          <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                            <span className="material-symbols text-3xl text-purple-400">person</span>
                          </div>                          <div className="font-bold text-primary mb-2">{locale === 'fi' ? 'Allen (20, Opiskelija)' : 'Allen (20, Student)'}</div>
                          <p className="opacity-80 text-sm">{locale === 'fi' ? 'Käyttää sovellusta satunnaisesti saadakseen nopeasti rahaa. Joustava yö-/viikonloppuvuorojen suhteen. Luotettava työskennellessään.' : 'Uses app infrequently for quick cash. Flexible with night/weekend shifts. Reliable when he works.'}</p>
                        </div>
                        <div className="bg-theme/20 p-4 rounded-lg">
                          <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                            <span className="material-symbols text-3xl text-purple-400">school</span>
                          </div>                          <div className="font-bold text-primary mb-2">{locale === 'fi' ? 'James (23, Yliopisto-opiskelija)' : 'James (23, Uni Student)'}</div>
                          <p className="opacity-80 text-sm">{locale === 'fi' ? 'Työskentelee 2-3 vuoroa/viikko ravintola-alalla. Suosii säännöllisiä tehtäviä suosikkipaikoissaan.' : 'Works 2–3 shifts/week in hospitality. Prefers consistent roles at favorite venues.'}</p>
                        </div>
                        <div className="bg-theme/20 p-4 rounded-lg">
                          <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                            <span className="material-symbols text-3xl text-purple-400">work</span>
                          </div>                          <div className="font-bold text-primary mb-2">{locale === 'fi' ? 'Eeva (40, Säännöllinen käyttäjä)' : 'Eeva (40, Regular User)'}</div>
                          <p className="opacity-80 text-sm">{locale === 'fi' ? 'Sovellus tuottaa 20-40% tuloista. Suunnittelee työt etukäteen, erittäin luotettava, ei toimialapreferenssiä.' : 'Relies on app for 20–40% of income. Plans work in advance, highly dependable, no sector preference.'}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.userFlow}</h3>
                      <p className="opacity-80">{content.userFlowDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.productRequirements}</h3>
                      <ul className={`list-disc  opacity-80 space-y-2`}>                        <li>{locale === 'fi' ? 'Käyttäjäprofiilit: Rekisteröityminen, taidot, kokemus, saatavuus' : 'User Profiles: Sign-up, skills, experience, availability'}</li>
                        <li>{locale === 'fi' ? 'Työnhaku ja suodattimet: Sijainti, palkka, toimiala, tallennetut suodattimet' : 'Job Search & Filters: Location, pay, industry, saved filters'}</li>
                        <li>{locale === 'fi' ? 'Ilmoitukset: Uudet ilmoitukset, määräajat, haastattelut' : 'Notifications: New listings, deadlines, interviews'}</li>
                        <li>{locale === 'fi' ? 'Viestintä: Sovelluksen sisäinen keskustelu työnantajan/työnhakijan välillä' : 'Messaging: In-app chat for employer/job seeker interaction'}</li>
                        <li>{locale === 'fi' ? 'Suositukset: Räätälöidyt työehdotukset' : 'Recommendations: Tailored job suggestions'}</li>
                        <li>{locale === 'fi' ? 'Analytiikka: Hakemustilastot ja työnhakutiedot' : 'Analytics: Application stats and job search insights'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                </div>              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
