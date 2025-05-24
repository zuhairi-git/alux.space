'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import Navigation from '@/components/Navigation';

interface Props {
  locale?: string;
}

export default function AccessibilityClient({ locale: initialLocale }: Props) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  // Get localized text content
  const getLocalizedContent = () => {
    const content = {
      en: {
        title: "Inclusive Design System",
        intro: "A comprehensive case study on creating an inclusive design system for a fintech startup—demonstrating how accessibility principles can be embedded into every design decision from research to implementation.",
        projectType: "Project Type",
        projectTypeValues: "Design System & Accessibility Framework",
        timeline: "Timeline",
        timelineValue: "12 Weeks",
        tools: "Tools",
        toolsValue: "Figma, axe DevTools, WAVE, Color Oracle, NVDA",
        standards: "Standards",
        standardsValue: "WCAG 2.2 AA, Section 508, ARIA Guidelines",
        roles: "Roles",
        rolesValue: "Lead UX Designer, Accessibility Consultant",
        designProcess: "Design Process",
        designModel: "Framework:",
        doubleD: "Inclusive Design Methodology",
        discoverPhase: "Research & Audit",
        definePhase: "Standards & Patterns",
        developPhase: "Implementation",
        deliverPhase: "Testing & Training",
        challenge: "Challenge",
        challengeDesc: "How might we create a design system that ensures all users, regardless of ability, can successfully complete financial transactions?",
        discoveryInsights: "Discovery Insights",
        discoveryDesc: "15% of users have some form of disability, yet most fintech apps fail basic accessibility tests. Users with visual impairments often abandon transactions due to poor contrast and screen reader support.",
        initialResearch: "Accessibility Audit",
        initialResearchDesc: "Conducted comprehensive audit of existing interface using automated tools and manual testing with assistive technologies. Identified 47 critical accessibility violations.",
        hypothesis: "Hypothesis",
        hypothesisDesc: "By integrating accessibility principles into our design system foundation, we can create inclusive financial products that improve usability for all users while meeting compliance standards.",
        primaryResearch: "User Research with Disabilities",
        objectives: "Objectives:",
        methods: "Methods:",
        ethics: "Ethics:",
        personas: "Inclusive Personas",
        userFlow: "Accessible User Flows",
        userFlowDesc: "Redesigned critical user journeys with accessibility considerations, ensuring keyboard navigation, screen reader compatibility, and clear visual hierarchy.",
        productRequirements: "Design System Requirements",
        epicGoal: "Epic Goal",
        epicGoalDesc: "Create an inclusive design system that enables equal access to financial services",
        userTesting: "Accessibility Testing",
        inProgress: "Continuous Improvement",
        hifiProto: "Accessible Components:",
        hifiProtoDesc: "Complete component library with built-in accessibility features, proper ARIA labels, and semantic markup.",
        designReviews: "Accessibility Reviews:",
        designReviewsDesc: "Regular audits using assistive technologies and compliance testing. All components tested with screen readers and keyboard navigation.",
        qa: "Quality Assurance:",
        qaDesc: "Automated accessibility testing integrated into CI/CD pipeline, manual testing with real users with disabilities",
        designDocs: "Implementation Guide:",
        designDocsDesc: "Comprehensive documentation including code examples, ARIA patterns, and accessibility best practices for development teams.",
        impact: "Impact & Results",
        impactDesc: "Achieved 100% WCAG 2.2 AA compliance, reduced user support tickets by 40%, and increased task completion rates among users with disabilities by 65%."
      },
      fi: {
        title: "Inklusiivinen suunnittelujärjestelmä",
        intro: "Kattava tapaustutkimus inklusiivisen suunnittelujärjestelmän luomisesta fintech-startupille—osoittaa miten saavutettavuusperiaatteet voidaan upottaa jokaiseen suunnittelupäätökseen tutkimuksesta toteutukseen.",
        projectType: "Projektityyppi",
        projectTypeValues: "Suunnittelujärjestelmä & Saavutettavuuskehys",
        timeline: "Aikataulu",
        timelineValue: "12 viikkoa",
        tools: "Työkalut",
        toolsValue: "Figma, axe DevTools, WAVE, Color Oracle, NVDA",
        standards: "Standardit",
        standardsValue: "WCAG 2.2 AA, Section 508, ARIA-ohjeet",
        roles: "Roolit",
        rolesValue: "Johtava UX-suunnittelija, Saavutettavuuskonsultti",
        designProcess: "Suunnitteluprosessi",
        designModel: "Kehys:",
        doubleD: "Inklusiivinen suunnittelumetodologia",
        discoverPhase: "Tutkimus & Auditointi",
        definePhase: "Standardit & Mallit",
        developPhase: "Toteutus",
        deliverPhase: "Testaus & Koulutus",
        challenge: "Haaste",
        challengeDesc: "Miten voimme luoda suunnittelujärjestelmän, joka varmistaa että kaikki käyttäjät kyvyistä riippumatta voivat onnistuneesti suorittaa rahoitustransaktioita?",
        discoveryInsights: "Löydökset",
        discoveryDesc: "15% käyttäjistä on jonkinlainen vamma, mutta useimmat fintech-sovellukset epäonnistuvat perus saavutettavuustesteissä. Näkövammaiset käyttäjät hylkäävät usein transaktioita huonon kontrastin ja näytönlukijan tuen vuoksi.",
        initialResearch: "Saavutettavuusauditointi",
        initialResearchDesc: "Suoritettiin kattava auditointi olemassa olevasta käyttöliittymästä käyttäen automaattisia työkaluja ja manuaalista testausta avustavien teknologioiden kanssa. Tunnistettiin 47 kriittistä saavutettavuusrikkomusta.",
        hypothesis: "Hypoteesi",
        hypothesisDesc: "Integroimalla saavutettavuusperiaatteet suunnittelujärjestelmämme perustaan, voimme luoda inklusiivisia rahoitustuotteita, jotka parantavat käytettävyyttä kaikille käyttäjille samalla täyttäen vaatimustenmukaisuusstandardit.",
        primaryResearch: "Käyttäjätutkimus vammaisten kanssa",
        objectives: "Tavoitteet:",
        methods: "Menetelmät:",
        ethics: "Etiikka:",
        personas: "Inklusiiviset henkilöt",
        userFlow: "Saavutettavat käyttäjävirrat",
        userFlowDesc: "Uudelleensuunniteltu kriittiset käyttäjämatkat saavutettavuusnäkökohdat huomioiden, varmistamalla näppäimistönavigaation, näytönlukijan yhteensopivuuden ja selkeän visuaalisen hierarkian.",
        productRequirements: "Suunnittelujärjestelmän vaatimukset",
        epicGoal: "Pääasiallinen tavoite",
        epicGoalDesc: "Luoda inklusiivinen suunnittelujärjestelmä, joka mahdollistaa tasavertaisen pääsyn rahoituspalveluihin",
        userTesting: "Saavutettavuustestaus",
        inProgress: "Jatkuva parantaminen",
        hifiProto: "Saavutettavat komponentit:",
        hifiProtoDesc: "Täydellinen komponenttikirjasto sisäänrakennetuilla saavutettavuusominaisuuksilla, asianmukaisilla ARIA-merkinnöillä ja semanttisella merkinnällä.",
        designReviews: "Saavutettavuuskatselmukset:",
        designReviewsDesc: "Säännölliset auditoinnit avustavien teknologioiden ja vaatimustenmukaisuustestauksen avulla. Kaikki komponentit testattu näytönlukijoiden ja näppäimistönavigaation kanssa.",
        qa: "Laadunvarmistus:",
        qaDesc: "Automaattinen saavutettavuustestaus integroitu CI/CD-putkeen, manuaalinen testaus todellisten vammaisten käyttäjien kanssa",
        designDocs: "Toteutusopas:",
        designDocsDesc: "Kattava dokumentaatio sisältäen koodiesimerkit, ARIA-mallit ja saavutettavuuden parhaat käytännöt kehitystiimeille.",
        impact: "Vaikutus & Tulokset",
        impactDesc: "Saavutettiin 100% WCAG 2.2 AA -vaatimustenmukaisuus, vähennettiin käyttäjätukipyyntöjä 40%, ja lisättiin tehtävien suorittamisastetta vammaisten käyttäjien keskuudessa 65%."
      }
    };
    return content[locale as keyof typeof content] || content.en;
  };

  const content = getLocalizedContent();

  return (    <div className={`min-h-screen transition-colors duration-300 ${
      isColorful 
        ? 'bg-[#050023]' 
        : isLight 
          ? 'bg-gradient-to-br from-slate-50 to-gray-100' 
          : 'bg-gradient-to-br from-gray-900 to-black'
    }`}>
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <div className="mb-8">              <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden">
                <Image
                  src="/images/portfolio/accessibility/accessiblity-showcase.jpg"
                  alt={content.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{content.title}</h1>
                  <p className="text-xl opacity-90 max-w-2xl">{content.intro}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Details Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}          >
            <div className={`p-6 rounded-xl ${
              isColorful 
                ? 'bg-gradient-to-br from-cyan-500/20 to-fuchsia-600/20 border border-cyan-400/30 backdrop-blur-lg' 
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                isColorful 
                  ? 'text-cyan-300' 
                  : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.projectType}</h3>
              <p className={`text-sm ${
                isColorful 
                  ? 'text-gray-300' 
                  : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>{content.projectTypeValues}</p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              isColorful 
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 backdrop-blur-lg' 
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                isColorful 
                  ? 'text-purple-300' 
                  : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.timeline}</h3>
              <p className={`text-sm ${
                isColorful 
                  ? 'text-gray-300' 
                  : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>{content.timelineValue}</p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              isColorful 
                ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-400/30 backdrop-blur-lg' 
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'            }`}>
              <h3 className={`font-semibold mb-2 ${
                isColorful 
                  ? 'text-blue-300' 
                  : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.tools}</h3>
              <p className={`text-sm ${
                isColorful 
                  ? 'text-gray-300' 
                  : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>{content.toolsValue}</p>
            </div>
            
            <div className={`p-6 rounded-xl ${
              isColorful 
                ? 'bg-gradient-to-br from-fuchsia-500/20 to-violet-600/20 border border-fuchsia-400/30 backdrop-blur-lg' 
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                isColorful 
                  ? 'text-fuchsia-300' 
                  : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.roles}</h3>
              <p className={`text-sm ${
                isColorful 
                  ? 'text-gray-300' 
                  : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>{content.rolesValue}</p>
            </div>
          </motion.div>

          {/* Design Process */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >            <h2 className={`text-3xl font-bold mb-8 ${
              isColorful 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400' 
                : isLight ? 'text-gray-900' : 'text-white'
            }`}>{content.designProcess}</h2>
            
            <div className={`p-8 rounded-2xl mb-8 ${
              isColorful 
                ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg' 
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
            }`}>
              <div className="flex items-center mb-6">
                <span className={`text-lg font-medium mr-4 ${
                  isColorful 
                    ? 'text-cyan-300' 
                    : isLight ? 'text-gray-700' : 'text-gray-300'
                }`}>{content.designModel}</span>
                <span className={`text-2xl font-bold ${
                  isColorful 
                    ? 'bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'
                }`}>
                  {content.doubleD}
                </span>
              </div>
                <div className="grid md:grid-cols-4 gap-6">
                {[
                  { phase: content.discoverPhase, color: isColorful ? 'from-cyan-400 to-cyan-500' : 'from-indigo-400 to-indigo-500' },
                  { phase: content.definePhase, color: isColorful ? 'from-fuchsia-400 to-purple-500' : 'from-purple-400 to-purple-500' },
                  { phase: content.developPhase, color: isColorful ? 'from-purple-400 to-indigo-500' : 'from-pink-400 to-pink-500' },
                  { phase: content.deliverPhase, color: isColorful ? 'from-blue-400 to-cyan-500' : 'from-rose-400 to-rose-500' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {index + 1}
                    </div>
                    <h3 className={`font-semibold ${
                      isColorful 
                        ? 'text-gray-200' 
                        : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{item.phase}</h3>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Challenge Section */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >            <div className={`p-8 rounded-2xl ${
              isColorful 
                ? 'bg-gradient-to-r from-cyan-900/30 to-fuchsia-900/30 border border-cyan-400/30 backdrop-blur-lg' 
                : isLight ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100' : 'bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-800'
            }`}>
              <h2 className={`text-2xl font-bold mb-4 ${
                isColorful 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400' 
                  : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.challenge}</h2>
              <p className={`text-lg ${
                isColorful 
                  ? 'text-gray-200' 
                  : isLight ? 'text-gray-700' : 'text-gray-300'
              }`}>{content.challengeDesc}</p>
            </div>
          </motion.section>

          {/* Discovery Insights */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >            <div className="grid md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl ${
                isColorful 
                  ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isColorful 
                    ? 'text-purple-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.discoveryInsights}</h3>
                <p className={`${
                  isColorful 
                    ? 'text-gray-200' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.discoveryDesc}</p>
              </div>
              
              <div className={`p-8 rounded-2xl ${
                isColorful 
                  ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isColorful 
                    ? 'text-blue-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.initialResearch}</h3>
                <p className={`${
                  isColorful 
                    ? 'text-gray-200' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.initialResearchDesc}</p>
              </div>
            </div>
          </motion.section>

          {/* Hypothesis */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >            <div className={`p-8 rounded-2xl ${
              isColorful 
                ? 'bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-400/30 backdrop-blur-lg' 
                : isLight ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100' : 'bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-800'
            }`}>
              <h2 className={`text-2xl font-bold mb-4 ${
                isColorful 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400' 
                  : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.hypothesis}</h2>
              <p className={`text-lg ${
                isColorful 
                  ? 'text-gray-200' 
                  : isLight ? 'text-gray-700' : 'text-gray-300'
              }`}>{content.hypothesisDesc}</p>
            </div>
          </motion.section>

          {/* Implementation & Testing */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >            <h2 className={`text-3xl font-bold mb-8 ${
              isColorful 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                : isLight ? 'text-gray-900' : 'text-white'
            }`}>{content.userTesting}</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`p-8 rounded-2xl ${
                isColorful 
                  ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isColorful 
                    ? 'text-cyan-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.hifiProto}</h3>
                <p className={`mb-4 ${
                  isColorful 
                    ? 'text-gray-200' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.hifiProtoDesc}</p>
              </div>
              
              <div className={`p-8 rounded-2xl ${
                isColorful 
                  ? 'bg-gradient-to-br from-fuchsia-900/30 to-purple-900/30 border border-fuchsia-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isColorful 
                    ? 'text-fuchsia-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.designReviews}</h3>
                <p className={`mb-4 ${
                  isColorful 
                    ? 'text-gray-200' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.designReviewsDesc}</p>
              </div>
              
              <div className={`p-8 rounded-2xl ${
                isColorful 
                  ? 'bg-gradient-to-br from-indigo-900/30 to-violet-900/30 border border-indigo-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isColorful 
                    ? 'text-indigo-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.qa}</h3>
                <p className={`${
                  isColorful 
                    ? 'text-gray-200' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.qaDesc}</p>
              </div>
              
              <div className={`p-8 rounded-2xl ${
                isColorful 
                  ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-400/30 backdrop-blur-lg' 
                  : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
              }`}>
                <h3 className={`text-xl font-bold mb-4 ${
                  isColorful 
                    ? 'text-purple-300' 
                    : isLight ? 'text-gray-900' : 'text-white'
                }`}>{content.designDocs}</h3>
                <p className={`${
                  isColorful 
                    ? 'text-gray-200' 
                    : isLight ? 'text-gray-600' : 'text-gray-300'
                }`}>{content.designDocsDesc}</p>
              </div>
            </div>
          </motion.section>

          {/* Impact & Results */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className={`p-8 rounded-2xl ${
              isLight ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100' : 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800'
            }`}>
              <h2 className={`text-2xl font-bold mb-4 ${
                isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.impact}</h2>
              <p className={`text-lg ${
                isLight ? 'text-gray-700' : 'text-gray-300'
              }`}>{content.impactDesc}</p>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
