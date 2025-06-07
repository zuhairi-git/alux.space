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
        title: "Collaboration Workflow Platform",
        intro: "A platform designed to simplify live collaboration, improve communication, and help teams deliver content more efficiently across devices, time zones, and locations.",
        projectType: "Project Type",
        projectTypeValues: "Landing Page, Web & Mobile Platform, Mobile Application",
        timeline: "Timeline",
        timelineValue: "18 Weeks",
        tools: "Tools",
        toolsValue: "Figma, FigJam, Maze",
        roles: "Roles",
        objectives: "Objectives",
        designProcess: "Design Process",
        researchInsights: "Research Insights",
        participantFeedback: "Participant Feedback",
        keyRecommendations: "Key Recommendations",
        userPersonas: "User Personas",
        productRequirements: "Product Requirements",
        userTesting: "User Testing",
        testScenario: "Test Scenario",
        testScenarioValue: "Configure a new device using the prototype",
        focusAreas: "Focus Areas",
        deliveryPhase: "Delivery Phase",
        completed: "Completed",
        learnMore: "Learn more",
      },
      fi: {
        title: "Yhteistyön työnkulkualusta",
        intro: "Alusta, joka on suunniteltu yksinkertaistamaan reaaliaikaista yhteistyötä, parantamaan viestintää ja auttamaan tiimejä toimittamaan sisältöä tehokkaammin eri laitteiden, aikavyöhykkeiden ja sijaintien välillä.",
        projectType: "Projektityyppi",
        projectTypeValues: "Laskeutumissivu, verkko- ja mobiilialusta, mobiilisovellus",
        timeline: "Aikataulu",
        timelineValue: "18 viikkoa",
        tools: "Työkalut",
        toolsValue: "Figma, FigJam, Maze",
        roles: "Roolit",
        objectives: "Tavoitteet",
        designProcess: "Suunnitteluprosessi",
        researchInsights: "Tutkimustulokset",
        participantFeedback: "Osallistujien palaute",
        keyRecommendations: "Tärkeimmät suositukset",
        userPersonas: "Käyttäjäpersoonat",
        productRequirements: "Tuotevaatimukset",
        userTesting: "Käyttäjätestaus",
        testScenario: "Testiskenaario",
        testScenarioValue: "Määritä uusi laite käyttäen prototyyppiä",
        focusAreas: "Keskittymisalueet",
        deliveryPhase: "Toimitusvaihe",
        completed: "Valmis",        learnMore: "Lue lisää",
      }
    };
    
    return content[locale as keyof typeof content] || content.en;
  };

  // Get localized objectives
  const getObjectives = () => {
    const objectives = {
      en: [
        "Clarify each step's purpose for better user understanding",
        "Communicate using business logic",
        "Offer UI customization",
        "Maintain consistent UI patterns",
        "Ensure mobile-first responsive design"
      ],
      fi: [
        "Selkeytä jokaisen vaiheen tarkoitus parempaa käyttäjäymmärrystä varten",
        "Kommunikoi käyttäen liiketoimintalogiikkaa",
        "Tarjoa käyttöliittymän mukauttamista",
        "Ylläpidä johdonmukaisia käyttöliittymäkuvioita",        "Varmista mobiilipainotteinen responsiivinen suunnittelu"
      ]
    };
    
    return objectives[locale as keyof typeof objectives] || objectives.en;
  };

  const content = getLocalizedContent();
  const objectives = getObjectives();
  const designProcessSteps = [
    { 
      phase: locale === 'fi' ? "Tutki" : "Discover",
      desc: locale === 'fi' ? "Tutki käyttäjien tarpeita ja kipupisteitä" : "Research user needs and pain points",
      icon: (
        <span className="material-symbols text-4xl">search</span>
      )
    },
    { 
      phase: locale === 'fi' ? "Määrittele" : "Define",
      desc: locale === 'fi' ? "Analysoi oivalluksia haasteen rajaamiseksi" : "Analyze insights to scope the challenge",
      icon: (
        <span className="material-symbols text-4xl">notes</span>
      )
    },
    { 
      phase: locale === 'fi' ? "Kehitä" : "Develop",
      desc: locale === 'fi' ? "Luo ratkaisukonsepteja" : "Create solution concepts",
      icon: (
        <span className="material-symbols text-4xl">edit</span>
      )
    },
    { 
      phase: locale === 'fi' ? "Toimita" : "Deliver",
      desc: locale === 'fi' ? "Testaa käyttäjillä ja iteroidu" : "Test with users and iterate",
      icon: (
        <span className="material-symbols text-4xl">rocket_launch</span>
      )
    }
  ];
    // Translation for roles
  const roles = locale === 'fi' ? 
    ["Tuotesuunnittelija", "Tuotepäällikkö", "Käyttäjätutkimus", "Testaus", "Analytiikka"] :
    ["Product Designer", "Product Manager", "User Research", "Testing", "Analytics"];
  // Localized metrics
  const metrics = [
    { 
      label: locale === 'fi' ? "Luovuuden arvo" : "Creativity Value", 
      value: 90 
    },
    { 
      label: locale === 'fi' ? "Käyttäjäystävällisyys" : "User-Friendliness", 
      value: 95 
    },
    { 
      label: locale === 'fi' ? "Värien hyväksyntä" : "Color Approval", 
      value: 80 
    },
    { 
      label: locale === 'fi' ? "Esteettömyys" : "Accessibility", 
      value: 85 
    }
  ];
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'colorful' 
        ? 'bg-[#050023]' 
        : isLight 
          ? 'bg-gradient-to-br from-slate-50 to-gray-100' 
          : 'bg-gradient-to-br from-gray-900 to-black'
    }`}>
      <Navigation /><article className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden rounded-xl mb-16">
            <Image
              src="/images/portfolio/collaboration/cover.jpg"
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
                  {locale === 'fi' ? 'Tehokas yhteistyöalusta tiimeille' : 'Efficient collaboration platform for teams'}
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
          >          {/* Project Details Grid */}
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
                {roles.map((role, index) => (
                  <div key={index}>{role}</div>
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
                    {[                      {
                        title: locale === 'fi' ? "Parannettu saavutettavuus" : "Enhanced Accessibility",
                        description: locale === 'fi' ? "Lisää selkeät etiketit kaikkiin kuvakkeisiin ja kuviin" : "Add clear labels to all icons and images",
                        icon: (
                          <span className="material-symbols text-4xl">person</span>
                        )
                      },                      {
                        title: locale === 'fi' ? "Näppäimistön navigointi" : "Keyboard Navigation",
                        description: locale === 'fi' ? "Paranna kohdistustiloja ja näppäimistön pikavalintoja" : "Improve focus states and keyboard shortcuts",
                        icon: (
                          <span className="material-symbols text-4xl">keyboard</span>
                        )
                      },                      {
                        title: locale === 'fi' ? "Värikontrasti" : "Color Contrast",
                        description: locale === 'fi' ? "Paranna kontrastisuhteita paremman luettavuuden vuoksi" : "Enhance contrast ratios for better readability",
                        icon: (
                          <span className="material-symbols text-4xl">palette</span>
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
                { [                  {
                    name: locale === 'fi' ? "John J." : "John J.",
                    role: locale === 'fi' ? "Markkinointipäällikkö" : "Marketing Manager",
                    traits: locale === 'fi' ? ["Teknologiaosaava", "Innovaatioihin keskittyvä"] : ["Tech-savvy", "Innovation-focused"],
                    needs: locale === 'fi' ? ["Yhteistyötyökalut", "Strategian yhdenmukaistaminen"] : ["Collaboration tools", "Strategy alignment"],
                    goals: locale === 'fi' ? ["Tehosta tiimiviestintää", "Ota käyttöön uusia markkinointistrategioita"] : ["Streamline team communication", "Implement new marketing strategies"],
                    painPoints: locale === 'fi' ? ["Monimutkaiset hyväksymisprosessit", "Hajautetut palautekanavat"] : ["Complex approval processes", "Scattered feedback channels"],
                    icon: (
                      <span className="material-symbols text-4xl">groups</span>
                    )
                  },                  {
                    name: locale === 'fi' ? "Julia Romes" : "Julia Romes",
                    role: locale === 'fi' ? "Myyntijohtaja" : "Sales Director",
                    traits: locale === 'fi' ? ["Tuloksiin keskittyvä", "Mobiilipainotteinen"] : ["Results-driven", "Mobile-first"],
                    needs: locale === 'fi' ? ["Nopea yhteistyö", "Liikkuva pääsy"] : ["Quick collaboration", "On-the-go access"],
                    goals: locale === 'fi' ? ["Sulje kaupat nopeammin", "Paranna tiimikoordinointia"] : ["Close deals faster", "Improve team coordination"],
                    painPoints: locale === 'fi' ? ["Rajoitettu mobiilitoiminnallisuus", "Viivästyneet vastaukset"] : ["Limited mobile functionality", "Delayed responses"],
                    icon: (
                      <span className="material-symbols text-4xl">groups</span>
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
                    {[                      {
                        title: locale === 'fi' ? "Tiimiviestintä" : "Team Communication",
                        description: locale === 'fi' ? "Mahdollista saumaton reaaliaikainen yhteistyö" : "Enable seamless real-time collaboration",
                        icon: (
                          <span className="material-symbols text-4xl">group</span>
                        )                      },
                      {
                        title: locale === 'fi' ? "Käyttäjäpalautesilmukka" : "User Feedback Loop",
                        description: locale === 'fi' ? "Jatkuva käyttäjäoivallusten kerääminen" : "Continuous collection of user insights",
                        icon: (
                          <span className="material-symbols text-4xl">feedback</span>
                        )
                      },
                      {
                        title: locale === 'fi' ? "Koulutusresurssit" : "Training Resources",
                        description: locale === 'fi' ? "Monitasoiset oppimateriaalit" : "Multi-level learning materials",
                        icon: (
                          <span className="material-symbols text-4xl">school</span>
                        )
                      },
                      {
                        title: locale === 'fi' ? "Dokumentaatio" : "Documentation",
                        description: locale === 'fi' ? "Kattavat tukiresurssit" : "Comprehensive support resources",
                        icon: (
                          <span className="material-symbols text-4xl">description</span>
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
                      { [                        {
                          area: locale === 'fi' ? "Käytettävyys" : "Usability",
                          icon: (
                            <span className="material-symbols text-4xl">touch_app</span>
                          )
                        },
                        {
                          area: locale === 'fi' ? "Luovuus" : "Creativity",
                          icon: (
                            <span className="material-symbols text-4xl">brush</span>
                          )
                        },
                        {
                          area: locale === 'fi' ? "Esteettömyys" : "Accessibility",
                          icon: (
                            <span className="material-symbols text-4xl">accessibility</span>
                          )
                        },
                        {
                          area: locale === 'fi' ? "Visuaalinen suunnittelu" : "Visual Design",
                          icon: (
                            <span className="material-symbols text-4xl">image</span>
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
                { [                  {
                    title: locale === 'fi' ? "Korkean tarkkuuden prototyyppi" : "High Fidelity Prototype",
                    description: locale === 'fi' ? "Vuorovaikutteiset suunnitelmat, jotka esittelevät keskeisiä ominaisuuksia käyttäjien tavoitteiden ja käytettävyyden periaatteiden mukaisesti" : "Interactive designs showcasing key features aligned with user goals and usability principles",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">devices</span>
                    )
                  },
                  {
                    title: locale === 'fi' ? "Suunnittelukatsaukset" : "Design Reviews",
                    description: locale === 'fi' ? "Rakenteelliset palautesessiot sidosryhmien kanssa dokumentoimaan keskeisiä päätöksiä ja parannuksia" : "Structured feedback sessions with stakeholders to document key decisions and improvements",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">reviews</span>
                    )
                  },
                  {
                    title: locale === 'fi' ? "Laadunvarmistus" : "Quality Assurance",
                    description: locale === 'fi' ? "Kattava testaus eri laitteilla varmistamaan johdonmukainen kokemus ja suorituskyky" : "Comprehensive testing across devices to ensure consistent experience and performance",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">verified</span>
                    )
                  },
                  {
                    title: locale === 'fi' ? "Dokumentaatio" : "Documentation",
                    description: locale === 'fi' ? "Selkeä dokumentaatio tulevaa kehitystä ja monitoimista yhteistyötä varten." : "Clear documentation for future development and cross-functional collaboration.",
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
          </motion.div>
        </div>
      </article>
    </div>
  );
}
