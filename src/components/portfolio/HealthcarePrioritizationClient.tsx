'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';

export default function HealthcarePrioritizationClient() {
  const [activeTab, setActiveTab] = useState(0);
  
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  const getColorStyles = (color: string) => {
    const styles: Record<string, {
      cardBg: string;
      iconText: string;
      titleText: string;
      iconBg: string;
      takeawayBg: string;
      takeawayIconBg: string;
      borderColor: string;
    }> = {
      blue: {
        cardBg: isColorful ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30' : '',
        iconText: isColorful ? 'text-blue-400' : isLight ? 'text-blue-600' : 'text-blue-400',
        titleText: isColorful ? 'text-blue-300' : '',
        iconBg: isColorful ? 'bg-blue-500/20' : isLight ? 'bg-blue-100' : 'bg-blue-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-blue-500/20 text-blue-300' : '',
        borderColor: isColorful ? 'border-blue-500/30' : ''
      },
      purple: {
        cardBg: isColorful ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30' : '',
        iconText: isColorful ? 'text-purple-400' : isLight ? 'text-purple-600' : 'text-purple-400',
        titleText: isColorful ? 'text-purple-300' : '',
        iconBg: isColorful ? 'bg-purple-500/20' : isLight ? 'bg-purple-100' : 'bg-purple-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-purple-900/30 to-purple-800/30 border border-purple-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-purple-500/20 text-purple-300' : '',
        borderColor: isColorful ? 'border-purple-500/30' : ''
      },
      green: {
        cardBg: isColorful ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30' : '',
        iconText: isColorful ? 'text-green-400' : isLight ? 'text-green-600' : 'text-green-400',
        titleText: isColorful ? 'text-green-300' : '',
        iconBg: isColorful ? 'bg-green-500/20' : isLight ? 'bg-green-100' : 'bg-green-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-green-500/20 text-green-300' : '',
        borderColor: isColorful ? 'border-green-500/30' : ''
      },
      orange: {
        cardBg: isColorful ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-400/30' : '',
        iconText: isColorful ? 'text-orange-400' : isLight ? 'text-orange-600' : 'text-orange-400',
        titleText: isColorful ? 'text-orange-300' : '',
        iconBg: isColorful ? 'bg-orange-500/20' : isLight ? 'bg-orange-100' : 'bg-orange-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-orange-900/30 to-orange-800/30 border border-orange-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-orange-500/20 text-orange-300' : '',
        borderColor: isColorful ? 'border-orange-500/30' : ''
      },
      red: {
        cardBg: isColorful ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30' : '',
        iconText: isColorful ? 'text-red-400' : isLight ? 'text-red-600' : 'text-red-400',
        titleText: isColorful ? 'text-red-300' : '',
        iconBg: isColorful ? 'bg-red-500/20' : isLight ? 'bg-red-100' : 'bg-red-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-red-900/30 to-red-800/30 border border-red-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-red-500/20 text-red-300' : '',
        borderColor: isColorful ? 'border-red-500/30' : ''
      },
      yellow: {
        cardBg: isColorful ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/30' : '',
        iconText: isColorful ? 'text-yellow-400' : isLight ? 'text-yellow-600' : 'text-yellow-400',
        titleText: isColorful ? 'text-yellow-300' : '',
        iconBg: isColorful ? 'bg-yellow-500/20' : isLight ? 'bg-yellow-100' : 'bg-yellow-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-yellow-500/20 text-yellow-300' : '',
        borderColor: isColorful ? 'border-yellow-500/30' : ''
      },
      teal: {
        cardBg: isColorful ? 'bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-400/30' : '',
        iconText: isColorful ? 'text-teal-400' : isLight ? 'text-teal-600' : 'text-teal-400',
        titleText: isColorful ? 'text-teal-300' : '',
        iconBg: isColorful ? 'bg-teal-500/20' : isLight ? 'bg-teal-100' : 'bg-teal-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-teal-900/30 to-teal-800/30 border border-teal-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-teal-500/20 text-teal-300' : '',
        borderColor: isColorful ? 'border-teal-500/30' : ''
      }
    };
    return styles[color] || styles.blue;
  };

  // Get localized text content
  const getLocalizedContent = () => {
    const content = {
      en: {
        title: "Healthcare Product Prioritization",
        subtitle: "Strategic Conflict Resolution in SaaS",
        intro: "Navigating the complex balance between strict regulatory compliance and agile product delivery. A case study on prioritization, stakeholder management, and process optimization.",
        projectType: "Project Type",
        projectTypeValues: "Product Management Case Study",
        timeline: "Timeline",
        timelineValue: "2 Week Sprint Cycle",
        tools: "Tools & Methodologies",
        toolsValue: "Agile, Jira, Risk Matrix, Stakeholder Mapping",
        standards: "Compliance",
        standardsValue: "HIPAA, Medical Device Regulations",
        roles: "My Role",
        rolesValue: "Product Owner",
        
        // Navigation tabs
        overviewTab: "Overview",
        processTab: "Resolution Process",
        impactTab: "Outcomes & Learnings",
        
        // Overview section
        contextTitle: "The Contest",
        contextDesc: "In a healthcare SaaS platform supporting nurses and doctors, prioritization isn't just about business value—it's about patient safety. We faced a critical backlog containing a mix of safety issues, UX improvements, and strategic integrations.",
        conflictTitle: "The Conflict",
        conflictDesc: "A critical release standoff occurred: QA demanded a delay due to incomplete verification documentation, while the CTO pushed for release to maintain schedule commitments.",
        
        // Priorities
        prioritiesTitle: "Strategic Prioritization",
        priority1: "Patient Safety (Critical)",
        priority1Desc: "Fixing data-sync failures impacting 2% of appointments. Non-negotiable.",
        priority2: "Nurse UX (High)",
        priority2Desc: "Improving alert visibility to ensure clinical awareness.",
        priority3: "Strategic Growth (Medium)",
        priority3Desc: "HL7/FHIR export features—valuable but scoped for dedicated capacity.",
        priority4: "Marketing Analytics (Low)",
        priority4Desc: "Push notification stats—valuable for growth, but safe to defer.",
        
        // Decision Making
        decisionTitle: "Decision Framework",
        decisionDesc: "Using a risk-based approach to filter requests. Example: We rejected a request for 'automated urgent messages based on form answers' due to high clinical risk and lack of medical oversight/regulatory guardrails.",

        // Resolution Process
        resolutionTitle: "Conflict Resolution",
        resolutionStep1: "Alignment Reached",
        resolutionStep1Desc: "Acknowledged that regulatory compliance and safety are non-negotiable, but delivery momentum is also critical.",
        resolutionStep2: "Key Outcome",
        resolutionStep2Desc: "Foster collaboration rather than compromise. Maintain delivery discipline while respecting standards.",
        
        // Agreed Actions
        actionsTitle: "Agreed Actions",
        action1: "QA identifies minimum critical documentation required for compliance.",
        action2: "Development continues in parallel on non-risk areas.",
        action3: "Final readiness checkpoint established for QA sign-off.",

        // Prevention
        preventionTitle: "Prevention Strategy",
        preventionDesc: "To avoid future conflicts, we established a proactive coordination approach.",
        preventionStep1: "Mini-Team Meeting",
        preventionStep1Desc: "QA, Dev, and Product meet early to identify risks, blockers, and documentation gaps.",
        preventionStep2: "Leadership Alignment",
        preventionStep2Desc: "Ensure all leaders have unified information before formal release decisions.",

        // Outcomes
        takeawaysTitle: "Key Takeaways",
        takeaway1: "Impact-Driven",
        takeaway1Desc: "Patient safety and reliability always come first.",
        takeaway2: "Risk-Aware",
        takeaway2Desc: "Balancing speed with strict compliance requirements.",
        takeaway3: "Collaborative",
        takeaway3Desc: "Fostering alignment over authority.",
        
        summaryTitle: "Product Owner Excellence",
        summaryDesc: "Success means balancing stakeholder needs, technical constraints, and business value while maintaining focus on user outcomes and team collaboration."
      },
      fi: {
        title: "Terveydenhuollon tuotepriorisointi",
        subtitle: "Strateginen konfliktinratkaisu SaaS-palvelussa",
        intro: "Tasapainoilu tiukan sääntelyn noudattamisen ja ketterän tuotekehityksen välillä. Tapaustutkimus priorisoinnista, sidosryhmien hallinnasta ja prosessien optimoinnista.",
        projectType: "Projektityyppi",
        projectTypeValues: "Tuotehallinnan tapaustutkimus",
        timeline: "Aikataulu",
        timelineValue: "2 viikon sprinttisykli",
        tools: "Työkalut & Menetelmät",
        toolsValue: "Agile, Jira, Riskimatriisi, Sidosryhmäkartta",
        standards: "Vaatimustenmukaisuus",
        standardsValue: "HIPAA, Lääkinnällisten laitteiden säädökset",
        roles: "Roolini",
        rolesValue: "Tuoteomistaja (Product Owner)",
        
        // Navigation tabs
        overviewTab: "Yleiskatsaus",
        processTab: "Ratkaisuprosessi",
        impactTab: "Tulokset & Oppiminen",
        
        // Overview section
        contextTitle: "Konteksti",
        contextDesc: "Sairaanhoitajia ja lääkäreitä tukevassa terveydenhuollon SaaS-alustassa priorisointi ei ole vain liiketoiminta-arvoa – kyse on potilasturvallisuudesta. Kohtasimme kriittisen kehitysjonon, jossa oli sekoitus turvallisuusongelmia, UX-parannuksia ja strategisia integraatioita.",
        conflictTitle: "Konflikti",
        conflictDesc: "Syntyi kriittinen julkaisuristiriita: QA vaati viivästystä puutteellisen dokumentaation vuoksi, kun taas teknologiajohtaja vaati julkaisua aikataulussa pysymiseksi.",
        
        // Priorities
        prioritiesTitle: "Strateginen priorisointi",
        priority1: "Potilasturvallisuus (Kriittinen)",
        priority1Desc: "Tietojen synkronointivirheiden korjaaminen, jotka vaikuttavat 2%:iin tapaamisista. Ei neuvoteltavissa.",
        priority2: "Hoitaja-UX (Korkea)",
        priority2Desc: "Hälytysten näkyvyyden parantaminen kliinisen tietoisuuden varmistamiseksi.",
        priority3: "Strateginen kasvu (Keskitaso)",
        priority3Desc: "HL7/FHIR-vientitoiminnot – arvokkaita, mutta vaativat oman resursoinnin.",
        priority4: "Markkinointianalytiikka (Matala)",
        priority4Desc: "Push-ilmoitustilastot – arvokkaita kasvulle, mutta voidaan lykätä.",
        
        // Decision Making
        decisionTitle: "Päätöksentekokehys",
        decisionDesc: "Käytimme riskiperusteista lähestymistapaa pyyntöjen suodattamiseen. Esimerkki: Hylkäsimme pyynnön 'automaattisista kiireellisistä viesteistä lomakevastausten perusteella' korkean kliinisen riskin ja lääketieteellisen valvonnan puutteen vuoksi.",

        // Resolution Process
        resolutionTitle: "Konfliktinratkaisu",
        resolutionStep1: "Yhteisymmärrys saavutettu",
        resolutionStep1Desc: "Tunnustettiin, että sääntelyn noudattaminen ja turvallisuus eivät ole neuvoteltavissa, mutta toimitusvarmuus on myös kriittinen.",
        resolutionStep2: "Keskeinen tulos",
        resolutionStep2Desc: "Edistetään yhteistyötä kompromissien sijaan. Ylläpidetään toimituskuria standardeja kunnioittaen.",
        
        // Agreed Actions
        actionsTitle: "Sovitut toimenpiteet",
        action1: "QA määrittää vaatimustenmukaisuuden edellyttämän kriittisen minimidokumentaation.",
        action2: "Kehitys jatkuu rinnakkain ei-riskialttiilla alueilla.",
        action3: "Lopullinen valmiustarkistus QA:n hyväksyntää varten.",

        // Prevention
        preventionTitle: "Ennaltaehkäisystrategia",
        preventionDesc: "Tulevien konfliktien välttämiseksi loimme proaktiivisen koordinointimallin.",
        preventionStep1: "Minitiimipalaveri",
        preventionStep1Desc: "QA, Dev ja Tuote kohtaavat aikaisin tunnistaakseen riskit, esteet ja dokumentaatiopuutteet.",
        preventionStep2: "Johdon linjaus",
        preventionStep2Desc: "Varmistetaan, että kaikilla johtajilla on yhtenäinen tieto ennen virallisia julkaisupäätöksiä.",

        // Outcomes
        takeawaysTitle: "Keskeiset oivallukset",
        takeaway1: "Vaikutuslähtöinen",
        takeaway1Desc: "Potilasturvallisuus ja luotettavuus tulevat aina ensin.",
        takeaway2: "Riskitietoinen",
        takeaway2Desc: "Tasapaino nopeuden ja tiukkojen vaatimusten välillä.",
        takeaway3: "Yhteistyökeskeinen",
        takeaway3Desc: "Edistetään linjakkuutta auktoriteetin sijaan.",
        
        summaryTitle: "Tuoteomistajan erinomaisuus",
        summaryDesc: "Menestys tarkoittaa sidosryhmien tarpeiden, teknisten rajoitteiden ja liiketoiminta-arvon tasapainottamista keskittyen samalla käyttäjätuloksiin ja tiimiyhteistyöhön."
      }
    };
    return content[locale as keyof typeof content] || content.en;
  };

  const content = getLocalizedContent();
  const tabs = [
    { id: 0, label: content.overviewTab, icon: "analytics" },
    { id: 1, label: content.processTab, icon: "handshake" },
    { id: 2, label: content.impactTab, icon: "lightbulb" }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isColorful 
        ? 'bg-[#050023]' 
        : isLight 
          ? 'bg-gradient-to-br from-slate-50 to-gray-100' 
          : 'bg-gradient-to-br from-gray-900 to-black'
    }`}>
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden rounded-xl mb-16">
             {/* Using a gradient placeholder until a real image is provided/available, or reusing a generic office/meeting image */}
            <div className={`absolute inset-0 ${
                isColorful ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-teal-500'
            }`}></div>
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="material-symbols text-9xl text-white">health_and_safety</span>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  {content.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                  {content.subtitle}
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
              isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
            }`}>
              {content.intro}
            </p>
          </motion.div>

          {/* Project Overview Cards */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
             {[
                { label: content.projectType, value: content.projectTypeValues, icon: "assignment", color: "blue" },
                { label: content.timeline, value: content.timelineValue, icon: "schedule", color: "purple" },
                { label: content.tools, value: content.toolsValue, icon: "build", color: "green" },
                { label: content.standards, value: content.standardsValue, icon: "gavel", color: "orange" },
             ].map((item, index) => {
               const styles = getColorStyles(item.color);
               return (
                <div key={index} className={`p-6 rounded-2xl backdrop-blur-lg ${
                  isColorful 
                    ? styles.cardBg 
                    : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
                }`}>
                  <span className={`material-symbols text-3xl mb-3 block ${styles.iconText}`}>{item.icon}</span>
                  <h3 className={`font-bold mb-2 ${
                    isColorful ? styles.titleText : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{item.label}</h3>
                  <p className={`text-sm ${
                    isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                  }`}>{item.value}</p>
                </div>
               );
             })}
          </motion.div>

          {/* Tab Navigation */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={`flex overflow-x-auto rounded-2xl p-2 ${
              isColorful 
                ? 'bg-purple-900/30 backdrop-blur-lg border border-purple-400/30' 
                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
            }`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? isColorful
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 border border-blue-400/50'
                        : isLight
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : isColorful
                        ? 'text-gray-300 hover:bg-purple-500/20'
                        : isLight
                          ? 'text-gray-600 hover:bg-gray-50'
                          : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="material-symbols text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <div className="min-h-screen">
            {/* Overview Tab */}
            {activeTab === 0 && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Context & Conflict Row */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className={`p-8 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                         <h3 className={`text-2xl font-bold mb-4 ${
                            isColorful ? 'text-blue-300' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>{content.contextTitle}</h3>
                         <p className={`text-lg leading-relaxed ${
                            isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                          }`}>{content.contextDesc}</p>
                    </div>

                    <div className={`p-8 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                         <h3 className={`text-2xl font-bold mb-4 ${
                            isColorful ? 'text-red-300' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>{content.conflictTitle}</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`px-4 py-2 rounded-lg font-bold ${isLight ? 'bg-red-100 text-red-700' : 'bg-red-900/40 text-red-300'}`}>QA Team</div>
                            <span className="font-bold text-xl">VS</span>
                            <div className={`px-4 py-2 rounded-lg font-bold ${isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/40 text-blue-300'}`}>CTO</div>
                        </div>
                         <p className={`text-lg leading-relaxed ${
                            isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                          }`}>{content.conflictDesc}</p>
                    </div>
                </div>

                {/* Priorities Section */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.prioritiesTitle}</h2>
                  
                  <div className="grid gap-4">
                    {[
                        { title: content.priority1, desc: content.priority1Desc, icon: "health_and_safety", color: "red" },
                        { title: content.priority2, desc: content.priority2Desc, icon: "notifications_active", color: "orange" },
                        { title: content.priority3, desc: content.priority3Desc, icon: "sync", color: "yellow" },
                        { title: content.priority4, desc: content.priority4Desc, icon: "analytics", color: "blue" },
                    ].map((item, index) => {
                        const styles = getColorStyles(item.color);
                        return (
                        <div key={index} className={`p-6 rounded-xl flex items-start gap-4 ${
                            isColorful 
                              ? `bg-gray-800/50 border ${styles.borderColor}` 
                              : isLight ? 'bg-white shadow-md border border-gray-100' : 'bg-gray-800 border border-gray-700'
                          }`}>
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full shrink-0 ${
                                isColorful ? `${styles.iconBg} ${styles.iconText}` : isLight ? `${styles.iconBg} ${styles.iconText}` : `${styles.iconBg} ${styles.iconText}`
                            }`}>
                                <span className="material-symbols">{item.icon}</span>
                            </div>
                            <div>
                                <h4 className={`text-lg font-bold mb-1 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h4>
                                <p className={`${isColorful ? 'text-gray-400' : isLight ? 'text-gray-600' : 'text-gray-300'}`}>{item.desc}</p>
                            </div>
                        </div>
                        );
                    })}
                  </div>
                </motion.section>

                 {/* Decision Framework / Rejection */}
                 <div className={`p-8 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-gray-50 border border-gray-200' : 'bg-gray-800 border border-gray-700'
                      }`}>
                        <div className="flex items-start gap-4">
                            <span className={`material-symbols text-4xl ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>filter_alt_off</span>
                            <div>
                                <h3 className={`text-xl font-bold mb-2 ${
                                    isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white'
                                }`}>{content.decisionTitle}</h3>
                                <p className={`${
                                    isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                }`}>{content.decisionDesc}</p>
                            </div>
                        </div>
                  </div>
              </motion.div>
            )}

            {/* Process Tab */}
            {activeTab === 1 && (
              <motion.div
                key="process"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Resolution Process */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.resolutionTitle}</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                         <div className={`p-8 rounded-2xl ${
                            isColorful 
                              ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-400/30' 
                              : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                          }`}>
                             <span className="material-symbols text-4xl mb-4 text-green-500">handshake</span>
                             <h3 className={`text-xl font-bold mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>{content.resolutionStep1}</h3>
                             <p className={`${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{content.resolutionStep1Desc}</p>
                         </div>
                         <div className={`p-8 rounded-2xl ${
                            isColorful 
                              ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-400/30' 
                              : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                          }`}>
                            <span className="material-symbols text-4xl mb-4 text-blue-500">lightbulb</span>
                             <h3 className={`text-xl font-bold mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>{content.resolutionStep2}</h3>
                             <p className={`${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{content.resolutionStep2Desc}</p>
                         </div>
                    </div>

                    <div className={`p-8 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-400/20' 
                          : isLight ? 'bg-blue-50' : 'bg-blue-900/10'
                      }`}>
                        <h3 className={`text-xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>{content.actionsTitle}</h3>
                        <div className="space-y-4">
                            {[content.action1, content.action2, content.action3].map((action, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">{i+1}</span>
                                    <p className={`${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{action}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Prevention Strategy */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                     <h2 className={`text-3xl font-bold mb-8 ${
                        isColorful 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                        : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.preventionTitle}</h2>
                    <p className={`text-lg mb-8 ${isLight?'text-gray-600':'text-gray-300'}`}>{content.preventionDesc}</p>

                    <div className="relative">
                        <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-1 ${isLight ? 'bg-gray-200' : 'bg-gray-700'} -translate-x-1/2`}></div>
                        
                        <div className="grid gap-8">
                             {/* Step 1 */}
                             <div className="relative md:grid md:grid-cols-2 md:gap-8 items-center">
                                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold z-10 md:-translate-x-1/2 md:-translate-y-1/2 transform translate-y-2 md:translate-y-0 shadow-lg">1</div>
                                <div className="ml-10 md:ml-0 md:text-right p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
                                    <h4 className="text-xl font-bold mb-2 text-purple-500">{content.preventionStep1}</h4>
                                    <p className="text-gray-600 dark:text-gray-300">{content.preventionStep1Desc}</p>
                                </div>
                                <div className="hidden md:block"></div>
                             </div>

                             {/* Step 2 */}
                             <div className="relative md:grid md:grid-cols-2 md:gap-8 items-center">
                                <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold z-10 md:-translate-x-1/2 md:-translate-y-1/2 transform translate-y-2 md:translate-y-0 shadow-lg">2</div>
                                <div className="hidden md:block"></div>
                                <div className="ml-10 md:ml-0 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
                                    <h4 className="text-xl font-bold mb-2 text-pink-500">{content.preventionStep2}</h4>
                                    <p className="text-gray-600 dark:text-gray-300">{content.preventionStep2Desc}</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </motion.section>
              </motion.div>
            )}

            {/* Impact Tab */}
            {activeTab === 2 && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                  {/* Takeaways */}
                  <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {[
                        { title: content.takeaway1, desc: content.takeaway1Desc, icon: "ads_click", color: "blue" },
                        { title: content.takeaway2, desc: content.takeaway2Desc, icon: "balance", color: "purple" },
                        { title: content.takeaway3, desc: content.takeaway3Desc, icon: "groups", color: "teal" },
                    ].map((item, index) => {
                        const styles = getColorStyles(item.color);
                        return (
                        <div key={index} className={`p-8 rounded-2xl text-center ${
                             isColorful 
                              ? styles.takeawayBg
                              : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                        }`}>
                             <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                                 isColorful ? styles.takeawayIconBg : isLight ? `${styles.iconBg} ${styles.iconText}` : `${styles.iconBg} ${styles.iconText}`
                             }`}>
                                 <span className="material-symbols text-3xl">{item.icon}</span>
                             </div>
                             <h3 className={`text-xl font-bold mb-2 ${isLight?'text-gray-900':'text-white'}`}>{item.title}</h3>
                             <p className={`${isLight?'text-gray-600':'text-gray-300'}`}>{item.desc}</p>
                        </div>
                        );
                    })}
                  </div>

                  {/* Summary Box */}
                  <div className={`p-10 rounded-3xl text-center ${
                      isColorful 
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700'
                  }`}>
                      <div className="flex justify-center mb-4">
                           <span className="material-symbols text-4xl text-white">star</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">{content.summaryTitle}</h2>
                      <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">{content.summaryDesc}</p>
                  </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
