'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';

export default function AccessibilityClient() {  const [activeTab, setActiveTab] = useState(0);
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  // Get localized text content
  const getLocalizedContent = () => {
    const content = {
      en: {
        title: "The Alux Design System",
        subtitle: "Accessibility-First Design Philosophy",
        intro: "Building the future of inclusive digital products—from research to implementation. This system powers applications used by millions while ensuring no one is left behind.",
        projectType: "Project Type",
        projectTypeValues: "Scalable Design System",
        timeline: "Timeline",
        timelineValue: "6 Months (Ongoing)",
        tools: "Tools & Technologies",
        toolsValue: "Figma, React, Tailwind CSS, Headless UI, axe DevTools",
        standards: "Compliance",
        standardsValue: "WCAG 2.2 AAA, ARIA 1.2",
        roles: "My Role",
        rolesValue: "Design System Lead & Accessibility Expert",
        
        // Navigation tabs
        overviewTab: "Overview",
        systemTab: "Design System",
        componentsTab: "Components",
        implementationTab: "Implementation",
        impactTab: "Impact",
          // Overview section  
        problemTitle: "The Problem",
        problemDesc: "Most design systems treat accessibility as an afterthought. We wanted to build one where inclusion is the foundation.",
        solutionTitle: "Our Solution", 
        solutionDesc: "An accessibility-first design system that makes creating inclusive products effortless for any team.",
        
        // Objectives
        objectivesTitle: "Objectives",
        objective1: "Build accessibility into the foundation",
        objective2: "Create intuitive, inclusive interfaces", 
        objective3: "Ensure WCAG 2.2 AAA compliance",
        objective4: "Enable seamless developer adoption",
        objective5: "Support multilingual experiences",
        
        // Research Insights
        researchTitle: "Research Insights",
        participantFeedback: "Participant Feedback",
        accessibilityValue: "Accessibility Value",
        usabilityScore: "Usability Score", 
        inclusionApproval: "Inclusion Approval",
        complianceRating: "Compliance Rating",
        keyRecommendations: "Key Recommendations",
        enhancedAccessibility: "Enhanced Accessibility",
        enhancedAccessibilityDesc: "Comprehensive ARIA labeling and semantic structure",
        keyboardNavigation: "Keyboard Navigation", 
        keyboardNavigationDesc: "Full keyboard support with visible focus indicators",
        colorContrast: "Color Contrast",
        colorContrastDesc: "AAA-level contrast ratios across all themes",
        
        // User Personas
        userPersonasTitle: "User Personas",
        persona1Name: "Sarah M.",
        persona1Role: "Frontend Developer",
        persona1Traits: ["Accessibility-focused", "Detail-oriented"],
        persona1Needs: ["Clear implementation guides", "Automated testing tools"],
        persona1Goals: ["Build inclusive interfaces", "Meet compliance standards"],
        persona1Pains: ["Complex accessibility rules", "Lack of clear guidelines"],
        
        persona2Name: "Alex Chen",
        persona2Role: "Product Designer", 
        persona2Traits: ["User-centered", "Quality-driven"],
        persona2Needs: ["Accessible design patterns", "Cross-platform consistency"],
        persona2Goals: ["Create universal designs", "Streamline design process"],
        persona2Pains: ["Accessibility knowledge gaps", "Time constraints"],
        
        // Requirements
        requirementsTitle: "System Requirements",
        requirement1: "Universal Design Principles",
        requirement1Desc: "Every component works for all users regardless of ability",
        requirement2: "Developer Experience", 
        requirement2Desc: "Simple integration with comprehensive documentation",
        requirement3: "Testing & Validation",
        requirement3Desc: "Automated accessibility testing and validation tools",
        requirement4: "Multi-language Support",
        requirement4Desc: "RTL support and internationalization capabilities",
        
        // User Testing
        userTestingTitle: "User Testing",
        testScenario: "Test Scenario",
        testScenarioDesc: "Navigate and interact with components using only keyboard and screen reader",
        focusAreas: "Focus Areas",
        usabilityFocus: "Usability",
        accessibilityFocus: "Accessibility", 
        performanceFocus: "Performance",
        consistencyFocus: "Consistency",
        
        // Key principles
        principlesTitle: "Core Principles",
        principle1: "Universal Access",
        principle1Desc: "Every component works for everyone",
        principle2: "Seamless Integration",
        principle2Desc: "Accessibility built into the system, not bolted on",
        principle3: "Developer-Friendly",
        principle3Desc: "Easy to implement, hard to break",
        
        // Design system features
        colorSystemTitle: "Adaptive Color System",
        colorSystemDesc: "Three carefully crafted themes with WCAG AAA contrast ratios",
        typographyTitle: "Typography Excellence",
        typographyDesc: "Bilingual support with perfect readability across languages",
        spacingTitle: "Harmonious Spacing",
        spacingDesc: "4px grid system with accessibility-compliant touch targets",
        
        // Components showcase
        componentsTitle: "Accessibility-First Components",
        buttonsTitle: "Intelligent Buttons",
        buttonsDesc: "Auto-adjusting contrast, proper focus states, keyboard navigation",
        tabsTitle: "Smart Navigation",
        tabsDesc: "ARIA-compliant tabs with keyboard support and screen reader optimization",
        accordionsTitle: "Inclusive Accordions",
        accordionsDesc: "Progressive disclosure with proper semantic markup",
        
        // Implementation
        headlessTitle: "Headless UI Integration",
        headlessDesc: "Built on Headless UI for bulletproof accessibility patterns",
        testingTitle: "Automated Testing",
        testingDesc: "CI/CD integration with axe-core for continuous accessibility monitoring",
        
        // Results
        metricsTitle: "Measurable Impact",
        complianceMetric: "100% WCAG Compliance",
        adoptionMetric: "50+ Components",
        performanceMetric: "Zero Accessibility Bugs",
        usageMetric: "Used by 10M+ Users",
        
        // Call to action
        exploreSystem: "Explore the System",
        viewDocs: "View Documentation",
        
        // Design system sections
        colorsTitle: "Colors That Work for Everyone",
        colorsDesc: "Our adaptive color system ensures perfect contrast ratios across all themes",
        lightTheme: "Light Theme",
        darkTheme: "Dark Theme",
        colorfulTheme: "Colorful Theme",
        contrastInfo: "All color combinations meet WCAG AAA standards (7:1 contrast ratio)",
          // Typography section
        inclusiveTypographyTitle: "Inclusive Typography",
        inclusiveTypographyDesc: "Designed for readability across cultures and abilities",
        englishType: "English Typography",
        arabicType: "Arabic Typography",
        rtlSupport: "Full RTL support with proper text alignment",
        
        // Components deep dive
        interactiveTitle: "Interactive Components",
        keyboardNav: "Full keyboard navigation",
        screenReader: "Screen reader optimized",
        focusManagement: "Smart focus management",
          // Technical implementation
        technicalTitle: "Technical Excellence",
        semanticHtml: "Semantic HTML structure",
        ariaLabels: "Comprehensive ARIA labeling",
        keyboardSupport: "Complete keyboard interaction",
        
        // Design process
        designProcess: "Our Design Process",
        designModel: "Design Model:",
        doubleD: "Double Diamond",
        discoverPhase: "Discover",
        definePhase: "Define", 
        developPhase: "Develop",
        deliverPhase: "Deliver",
        
        // Challenge and hypothesis
        challenge: "The Challenge",
        challengeDesc: "Creating a design system where accessibility isn't an afterthought but the foundation of every decision.",
        hypothesis: "Our Hypothesis", 
        hypothesisDesc: "If we build accessibility into the core of our design system, teams will naturally create more inclusive products.",
        
        // Discovery and research
        discoveryInsights: "Discovery Insights",
        discoveryDesc: "Through extensive user research, we identified key pain points in existing accessibility implementations.",
        initialResearch: "Initial Research",
        initialResearchDesc: "Comprehensive analysis of current design systems revealed critical gaps in accessibility support.",
        
        // Testing and implementation
        userTesting: "Implementation & Testing",
        hifiProto: "High-Fidelity Prototypes",
        hifiProtoDesc: "Created interactive prototypes with full accessibility implementation for user testing.",
        designReviews: "Design Reviews",
        designReviewsDesc: "Conducted thorough accessibility audits with disabled users and screen reader testing.",
        qa: "Quality Assurance",
        qaDesc: "Implemented automated testing pipeline with axe-core for continuous accessibility monitoring.",
        designDocs: "Design Documentation",
        designDocsDesc: "Comprehensive documentation including accessibility guidelines and implementation patterns.",
        
        // Impact and results
        impact: "Transformative Impact",
        impactDesc: "Our accessibility-first approach has fundamentally changed how teams think about inclusive design, resulting in products that work for everyone.",
        
        learnMore: "Learn More",
        nextSection: "Next Section"
      },
      fi: {
        title: "Alux-suunnittelujärjestelmä",
        subtitle: "Saavutettavuus-ensin filosofia",
        intro: "Rakennamme inklusiivisten digitaalisten tuotteiden tulevaisuutta—tutkimuksesta toteutukseen. Tämä järjestelmä voimistaa miljoonien käyttäjien sovelluksia varmistaen, että ketään ei jätetä jälkeen.",
        projectType: "Projektityyppi",
        projectTypeValues: "Skaalautuva suunnittelujärjestelmä",
        timeline: "Aikataulu",
        timelineValue: "6 kuukautta (jatkuva)",
        tools: "Työkalut & Teknologiat",
        toolsValue: "Figma, React, Tailwind CSS, Headless UI, axe DevTools",
        standards: "Vaatimustenmukaisuus",
        standardsValue: "WCAG 2.2 AAA, ARIA 1.2",
        roles: "Roolini",
        rolesValue: "Suunnittelujärjestelmän johtaja & Saavutettavuusasiantuntija",
        
        // Navigation tabs
        overviewTab: "Yleiskatsaus",
        systemTab: "Suunnittelujärjestelmä",
        componentsTab: "Komponentit",
        implementationTab: "Toteutus",
        impactTab: "Vaikutus",
          // Overview section
        problemTitle: "Ongelma",
        problemDesc: "Useimmat suunnittelujärjestelmät käsittelevät saavutettavuutta jälkikäteen. Halusimme rakentaa sellaisen, jossa inkluusio on perusta.",
        solutionTitle: "Ratkaisumme",
        solutionDesc: "Saavutettavuus-ensin suunnittelujärjestelmä, joka tekee inklusiivisten tuotteiden luomisesta vaivatonta mille tahansa tiimille.",
        
        // Objectives
        objectivesTitle: "Tavoitteet",
        objective1: "Rakentaa saavutettavuus perustaan",
        objective2: "Luoda intuitiivisia, inklusiivisia käyttöliittymiä",
        objective3: "Varmistaa WCAG 2.2 AAA -vaatimustenmukaisuus",
        objective4: "Mahdollistaa saumaton kehittäjien käyttöönotto",
        objective5: "Tukea monikielisiä kokemuksia",
        
        // Research Insights
        researchTitle: "Tutkimustulokset", 
        participantFeedback: "Osallistujien palaute",
        accessibilityValue: "Saavutettavuuden arvo",
        usabilityScore: "Käytettävyyspisteet",
        inclusionApproval: "Inkluusion hyväksyntä", 
        complianceRating: "Vaatimustenmukaisuusarvio",
        keyRecommendations: "Keskeiset suositukset",
        enhancedAccessibility: "Parannettu saavutettavuus",
        enhancedAccessibilityDesc: "Kattava ARIA-merkintä ja semanttinen rakenne",
        keyboardNavigation: "Näppäimistönavigaatio",
        keyboardNavigationDesc: "Täysi näppäimistötuki näkyvillä fokusindikaattoreilla",
        colorContrast: "Värikontrasti", 
        colorContrastDesc: "AAA-tason kontrastisuhteet kaikissa teemoissa",
        
        // User Personas 
        userPersonasTitle: "Käyttäjäpersoonat",
        persona1Name: "Sarah M.",
        persona1Role: "Frontend-kehittäjä",
        persona1Traits: ["Saavutettavuus-keskittynyt", "Yksityiskohtiin keskittyvä"],
        persona1Needs: ["Selkeät toteutusoppaat", "Automatisoituja testaustyökaluja"],
        persona1Goals: ["Rakentaa inklusiivisia käyttöliittymiä", "Täyttää vaatimustenmukaisuusstandardit"],
        persona1Pains: ["Monimutkaiset saavutettavuussäännöt", "Selkeiden ohjeiden puute"],
        
        persona2Name: "Alex Chen", 
        persona2Role: "Tuotesuunnittelija",
        persona2Traits: ["Käyttäjäkeskeinen", "Laatuorientoitunut"],
        persona2Needs: ["Saavutettavia suunnittelumalleja", "Alustojen välistä yhtenäisyyttä"],
        persona2Goals: ["Luoda universaaleja suunnitelmia", "Sujuvoittaa suunnitteluprosessia"],
        persona2Pains: ["Saavutettavuustiedon puutteet", "Aikarajoitteet"],
        
        // Requirements
        requirementsTitle: "Järjestelmävaatimukset",
        requirement1: "Universaalit suunnitteluperiaatteet", 
        requirement1Desc: "Jokainen komponentti toimii kaikille käyttäjille kyvystä riippumatta",
        requirement2: "Kehittäjäkokemus",
        requirement2Desc: "Yksinkertainen integraatio kattavalla dokumentaatiolla",
        requirement3: "Testaus ja validointi",
        requirement3Desc: "Automaattinen saavutettavuustestaus ja validointityökalut",
        requirement4: "Monikielituki",
        requirement4Desc: "RTL-tuki ja kansainvälistämismahdollisuudet",
        
        // User Testing
        userTestingTitle: "Käyttäjätestaus",
        testScenario: "Testiskenaario", 
        testScenarioDesc: "Navigoi ja käytä komponentteja käyttäen vain näppäimistöä ja näytönlukijaa",
        focusAreas: "Keskittymisalueet",
        usabilityFocus: "Käytettävyys",
        accessibilityFocus: "Saavutettavuus",
        performanceFocus: "Suorituskyky", 
        consistencyFocus: "Johdonmukaisuus",
        
        // Key principles
        principlesTitle: "Ydinperiaatteet",
        principle1: "Universaali pääsy",
        principle1Desc: "Jokainen komponentti toimii kaikille",
        principle2: "Saumaton integraatio",
        principle2Desc: "Saavutettavuus rakennettu järjestelmään, ei kiinnitetty päälle",
        principle3: "Kehittäjäystävällinen",
        principle3Desc: "Helppo toteuttaa, vaikea rikkoa",
        
        // Design system features
        colorSystemTitle: "Mukautuva värijärjestelmä",
        colorSystemDesc: "Kolme huolellisesti suunniteltua teemaa WCAG AAA -kontrastisuhteilla",
        typographyTitle: "Typografia-erinomaisuus",
        typographyDesc: "Kaksikielinen tuki täydellisellä luettavuudella eri kielillä",
        spacingTitle: "Harmoninen välistys",
        spacingDesc: "4px ruudukkojärjestelmä saavutettavuus-yhteensopivilla kosketustavoitteilla",
        
        // Components showcase
        componentsTitle: "Saavutettavuus-ensin komponentit",
        buttonsTitle: "Älykkäät painikkeet",
        buttonsDesc: "Automaattisesti säätyvä kontrasti, oikeat fokustilat, näppäimistönavigaatio",
        tabsTitle: "Älykäs navigaatio",
        tabsDesc: "ARIA-yhteensopivat välilehdet näppäimistötuella ja näytönlukijan optimoinnilla",
        accordionsTitle: "Inklusiiviset haitarit",
        accordionsDesc: "Progressiivinen paljastaminen oikealla semanttisella merkinnällä",
        
        // Implementation
        headlessTitle: "Headless UI -integraatio",
        headlessDesc: "Rakennettu Headless UI:n päälle luotettavien saavutettavuusmallien varassa",
        testingTitle: "Automaattinen testaus",
        testingDesc: "CI/CD-integraatio axe-core:n kanssa jatkuvaa saavutettavuusseurantaa varten",
        
        // Results
        metricsTitle: "Mitattava vaikutus",
        complianceMetric: "100% WCAG-vaatimustenmukaisuus",
        adoptionMetric: "50+ komponenttia",
        performanceMetric: "Nolla saavutettavuusbugia",
        usageMetric: "10M+ käyttäjän käyttämä",
        
        // Call to action
        exploreSystem: "Tutustu järjestelmään",
        viewDocs: "Katso dokumentaatio",
        
        // Design system sections
        colorsTitle: "Värit jotka toimivat kaikille",
        colorsDesc: "Mukautuva värijärjestelmämme varmistaa täydelliset kontrastisuhteet kaikissa teemoissa",
        lightTheme: "Vaalea teema",
        darkTheme: "Tumma teema",
        colorfulTheme: "Värikäs teema",
        contrastInfo: "Kaikki väriyhdistelmät täyttävät WCAG AAA -standardit (7:1 kontrastisuhde)",
          // Typography section
        inclusiveTypographyTitle: "Inklusiivinen typografia",
        inclusiveTypographyDesc: "Suunniteltu luettavuutta varten eri kulttuureissa ja kyvyissä",
        englishType: "Englannin typografia",
        arabicType: "Arabian typografia",
        rtlSupport: "Täysi RTL-tuki oikealla tekstin tasauksella",
        
        // Components deep dive
        interactiveTitle: "Interaktiiviset komponentit",
        keyboardNav: "Täysi näppäimistönavigaatio",
        screenReader: "Näytönlukijan optimoitu",
        focusManagement: "Älykäs fokuksen hallinta",
          // Technical implementation
        technicalTitle: "Tekninen erinomaisuus",
        semanticHtml: "Semanttinen HTML-rakenne",
        ariaLabels: "Kattava ARIA-merkintä",
        keyboardSupport: "Täydellinen näppäimistövuorovaikutus",
        
        // Design process
        designProcess: "Suunnitteluprosessimme",
        designModel: "Suunnittelumalli:",
        doubleD: "Kaksinkertainen timantti",
        discoverPhase: "Löytää",
        definePhase: "Määritellä", 
        developPhase: "Kehittää",
        deliverPhase: "Toimittaa",
        
        // Challenge and hypothesis
        challenge: "Haaste",
        challengeDesc: "Suunnittelujärjestelmän luominen, jossa saavutettavuus ei ole jälkiajatus vaan jokaisen päätöksen perusta.",
        hypothesis: "Hypoteesimme", 
        hypothesisDesc: "Jos rakennamme saavutettavuuden suunnittelujärjestelmämme ytimeen, tiimit luovat luonnollisesti inklusiivisempia tuotteita.",
        
        // Discovery and research
        discoveryInsights: "Löytöjen oivallukset",
        discoveryDesc: "Laajan käyttäjätutkimuksen kautta tunnistimme nykyisten saavutettavuustoteutusten keskeiset kipupisteet.",
        initialResearch: "Alkututkimus",
        initialResearchDesc: "Nykyisten suunnittelujärjestelmien kattava analyysi paljasti kriittiset puutteet saavutettavuustuessa.",
        
        // Testing and implementation
        userTesting: "Toteutus ja testaus",
        hifiProto: "Korkealaatuiset prototyypit",
        hifiProtoDesc: "Loimme interaktiivisia prototyyppejä täydellä saavutettavuustoteutuksella käyttäjätestausta varten.",
        designReviews: "Suunnittelukatselmukset",
        designReviewsDesc: "Teimme perusteelliset saavutettavuusauditoinnit vammaisten käyttäjien ja näytönlukijan testauksen kanssa.",
        qa: "Laadunvarmistus",
        qaDesc: "Toteutimme automaattisen testausputken axe-coren kanssa jatkuvaa saavutettavuusseurantaa varten.",
        designDocs: "Suunnitteludokumentaatio",
        designDocsDesc: "Kattava dokumentaatio sisältäen saavutettavuusohjeet ja toteutusmallit.",
        
        // Impact and results
        impact: "Muuttava vaikutus",
        impactDesc: "Saavutettavuus-ensin lähestymistapamme on muuttanut perusteellisesti tapaa, jolla tiimit ajattelevat inklusiivista suunnittelua, tuloksena tuotteita jotka toimivat kaikille.",
        
        learnMore: "Lue lisää",
        nextSection: "Seuraava osio"
      }
    };
    return content[locale as keyof typeof content] || content.en;
  };
  const content = getLocalizedContent();
  const tabs = [
    { id: 0, label: content.overviewTab, icon: "overview" },
    { id: 1, label: content.systemTab, icon: "design_services" },
    { id: 2, label: content.implementationTab, icon: "code" }
  ];

  const colorThemes = [
    {
      name: content.lightTheme,
      preview: "bg-gradient-to-r from-blue-50 to-indigo-50",
      contrast: "AAA"
    },
    {
      name: content.darkTheme,
      preview: "bg-gradient-to-r from-gray-900 to-black",
      contrast: "AAA"
    },
    {
      name: content.colorfulTheme,
      preview: "bg-gradient-to-r from-purple-500 to-pink-500",
      contrast: "AAA"
    }
  ];

  const designSystemFeatures = [
    {
      title: content.colorSystemTitle,
      description: content.colorSystemDesc,
      icon: "palette",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: content.inclusiveTypographyTitle,
      description: content.inclusiveTypographyDesc,
      icon: "text_fields",
      gradient: "from-green-500 to-teal-500"
    },
    {
      title: content.spacingTitle,
      description: content.spacingDesc,
      icon: "space_bar",
      gradient: "from-orange-500 to-red-500"
    }
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
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <div className="relative w-full h-[500px] mb-8 rounded-3xl overflow-hidden">
              <Image
                src="/images/portfolio/accessibility/accessiblity-showcase.jpg"
                alt={content.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {content.title}
                  </h1>
                  <p className="text-2xl mb-6 opacity-90 max-w-3xl">
                    {content.subtitle}
                  </p>
                  <p className="text-lg opacity-80 max-w-4xl leading-relaxed">
                    {content.intro}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Project Overview Cards */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={`p-6 rounded-2xl backdrop-blur-lg ${
              isColorful 
                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30' 
                : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
            }`}>
              <span className="material-symbols text-3xl text-cyan-400 mb-3 block">rocket_launch</span>
              <h3 className={`font-bold mb-2 ${
                isColorful ? 'text-cyan-300' : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.projectType}</h3>
              <p className={`text-sm ${
                isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>{content.projectTypeValues}</p>
            </div>
            
            <div className={`p-6 rounded-2xl backdrop-blur-lg ${
              isColorful 
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30' 
                : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
            }`}>
              <span className="material-symbols text-3xl text-purple-400 mb-3 block">schedule</span>
              <h3 className={`font-bold mb-2 ${
                isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.timeline}</h3>
              <p className={`text-sm ${
                isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>{content.timelineValue}</p>
            </div>
            
            <div className={`p-6 rounded-2xl backdrop-blur-lg ${
              isColorful 
                ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-400/30' 
                : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
            }`}>
              <span className="material-symbols text-3xl text-green-400 mb-3 block">verified</span>
              <h3 className={`font-bold mb-2 ${
                isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.standards}</h3>
              <p className={`text-sm ${
                isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>{content.standardsValue}</p>
            </div>
            
            <div className={`p-6 rounded-2xl backdrop-blur-lg ${
              isColorful 
                ? 'bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30' 
                : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
            }`}>
              <span className="material-symbols text-3xl text-orange-400 mb-3 block">person</span>
              <h3 className={`font-bold mb-2 ${
                isColorful ? 'text-orange-300' : isLight ? 'text-gray-900' : 'text-white'
              }`}>{content.roles}</h3>
              <p className={`text-sm ${
                isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>{content.rolesValue}</p>
            </div>
          </motion.div>          {/* Tab Navigation */}
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
                        ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-cyan-300 border border-cyan-400/50'
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
          </motion.div>          {/* Tab Content */}
          <div className="min-h-screen">
            {/* Overview Tab */}
            {activeTab === 0 && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >                {/* Objectives Section */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.objectivesTitle}</h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { icon: "foundation", text: content.objective1 },
                      { icon: "accessibility", text: content.objective2 },
                      { icon: "verified", text: content.objective3 },
                      { icon: "integration_instructions", text: content.objective4 },
                      { icon: "language", text: content.objective5 }
                    ].map((objective, index) => (
                      <div key={index} className={`p-6 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                        <span className={`material-symbols text-2xl mb-4 block ${
                          isColorful ? 'text-cyan-400' : isLight ? 'text-blue-500' : 'text-blue-400'
                        }`}>{objective.icon}</span>
                        <p className={`font-medium ${
                          isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                        }`}>{objective.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Design Process Section */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
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
                        { phase: content.discoverPhase, icon: "search", color: isColorful ? 'from-cyan-400 to-cyan-500' : 'from-indigo-400 to-indigo-500' },
                        { phase: content.definePhase, icon: "notes", color: isColorful ? 'from-fuchsia-400 to-purple-500' : 'from-purple-400 to-purple-500' },
                        { phase: content.developPhase, icon: "edit", color: isColorful ? 'from-purple-400 to-indigo-500' : 'from-pink-400 to-pink-500' },
                        { phase: content.deliverPhase, icon: "rocket_launch", color: isColorful ? 'from-blue-400 to-cyan-500' : 'from-rose-400 to-rose-500' },
                      ].map((item, index) => (
                        <div key={index} className="text-center">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold`}>
                            <span className="material-symbols text-lg">{item.icon}</span>
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

                {/* Research Insights */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.researchTitle}</h2>
                  
                  <div className={`p-8 rounded-2xl mb-8 ${
                    isColorful 
                      ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-400/30 backdrop-blur-lg' 
                      : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                  }`}>
                    <h3 className={`text-xl font-bold mb-6 ${
                      isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.participantFeedback}</h3>
                    
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                      {[
                        { label: content.accessibilityValue, value: "92%", icon: "accessibility" },
                        { label: content.usabilityScore, value: "88%", icon: "thumb_up" },
                        { label: content.inclusionApproval, value: "95%", icon: "diversity_3" },
                        { label: content.complianceRating, value: "100%", icon: "verified" }
                      ].map((metric, index) => (
                        <div key={index} className="text-center">
                          <span className={`material-symbols text-3xl mb-2 block ${
                            isColorful ? 'text-green-400' : isLight ? 'text-green-500' : 'text-green-400'
                          }`}>{metric.icon}</span>
                          <div className={`text-2xl font-bold mb-1 ${
                            isColorful 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent' 
                              : isLight ? 'text-gray-900' : 'text-white'
                          }`}>
                            {metric.value}
                          </div>
                          <p className={`text-sm ${
                            isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                          }`}>{metric.label}</p>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-6 ${
                      isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.keyRecommendations}</h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { 
                          icon: "person", 
                          title: content.enhancedAccessibility,
                          desc: content.enhancedAccessibilityDesc
                        },
                        { 
                          icon: "keyboard", 
                          title: content.keyboardNavigation,
                          desc: content.keyboardNavigationDesc
                        },
                        { 
                          icon: "palette", 
                          title: content.colorContrast,
                          desc: content.colorContrastDesc
                        }
                      ].map((item, index) => (
                        <div key={index} className={`p-4 rounded-xl ${
                          isColorful 
                            ? 'bg-green-900/20 border border-green-400/20' 
                            : isLight ? 'bg-green-50 border border-green-100' : 'bg-green-900/20 border border-green-800'
                        }`}>
                          <span className={`material-symbols text-xl mb-2 block ${
                            isColorful ? 'text-green-400' : isLight ? 'text-green-600' : 'text-green-400'
                          }`}>{item.icon}</span>
                          <h4 className={`font-semibold mb-2 ${
                            isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>{item.title}</h4>
                          <p className={`text-sm ${
                            isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                          }`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* User Personas */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.userPersonasTitle}</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        name: content.persona1Name,
                        role: content.persona1Role,
                        traits: content.persona1Traits,
                        needs: content.persona1Needs,
                        goals: content.persona1Goals,
                        pains: content.persona1Pains,
                        icon: "code",
                        gradient: "from-blue-500 to-purple-500"
                      },
                      {
                        name: content.persona2Name,
                        role: content.persona2Role,
                        traits: content.persona2Traits,
                        needs: content.persona2Needs,
                        goals: content.persona2Goals,
                        pains: content.persona2Pains,
                        icon: "design_services",
                        gradient: "from-purple-500 to-pink-500"
                      }
                    ].map((persona, index) => (
                      <div key={index} className={`p-8 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                        <div className="flex items-center mb-6">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${persona.gradient} flex items-center justify-center mr-4`}>
                            <span className="material-symbols text-white text-lg">{persona.icon}</span>
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold ${
                              isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>{persona.name}</h3>
                            <p className={`${
                              isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                            }`}>{persona.role}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className={`font-semibold mb-2 ${
                              isColorful ? 'text-cyan-300' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>Traits</h4>
                            <div className="flex flex-wrap gap-2">
                              {persona.traits.map((trait, i) => (
                                <span key={i} className={`px-3 py-1 rounded-full text-sm ${
                                  isColorful 
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' 
                                    : isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/30 text-blue-300'
                                }`}>{trait}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className={`font-semibold mb-2 ${
                              isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>Needs</h4>
                            {persona.needs.map((need, i) => (
                              <div key={i} className="flex items-center mb-1">
                                <span className={`material-symbols text-sm mr-2 ${
                                  isColorful ? 'text-green-400' : isLight ? 'text-green-500' : 'text-green-400'
                                }`}>check_circle</span>
                                <span className={`text-sm ${
                                  isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                }`}>{need}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div>
                            <h4 className={`font-semibold mb-2 ${
                              isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>Goals</h4>
                            {persona.goals.map((goal, i) => (
                              <div key={i} className="flex items-center mb-1">
                                <span className={`material-symbols text-sm mr-2 ${
                                  isColorful ? 'text-purple-400' : isLight ? 'text-purple-500' : 'text-purple-400'
                                }`}>arrow_forward</span>
                                <span className={`text-sm ${
                                  isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                }`}>{goal}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div>
                            <h4 className={`font-semibold mb-2 ${
                              isColorful ? 'text-orange-300' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>Pain Points</h4>
                            {persona.pains.map((pain, i) => (
                              <div key={i} className="flex items-center mb-1">
                                <span className={`material-symbols text-sm mr-2 ${
                                  isColorful ? 'text-orange-400' : isLight ? 'text-orange-500' : 'text-orange-400'
                                }`}>warning</span>
                                <span className={`text-sm ${
                                  isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                }`}>{pain}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* System Requirements */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.requirementsTitle}</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { 
                        icon: "group", 
                        title: content.requirement1,
                        desc: content.requirement1Desc,
                        gradient: "from-blue-500 to-cyan-500"
                      },
                      { 
                        icon: "feedback", 
                        title: content.requirement2,
                        desc: content.requirement2Desc,
                        gradient: "from-purple-500 to-pink-500"
                      },
                      { 
                        icon: "school", 
                        title: content.requirement3,
                        desc: content.requirement3Desc,
                        gradient: "from-green-500 to-emerald-500"
                      },
                      { 
                        icon: "description", 
                        title: content.requirement4,
                        desc: content.requirement4Desc,
                        gradient: "from-orange-500 to-red-500"
                      }
                    ].map((req, index) => (
                      <div key={index} className={`p-6 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${req.gradient} flex items-center justify-center mb-4`}>
                          <span className="material-symbols text-white text-lg">{req.icon}</span>
                        </div>
                        <h3 className={`text-lg font-bold mb-3 ${
                          isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{req.title}</h3>
                        <p className={`${
                          isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>{req.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* User Testing */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.userTestingTitle}</h2>
                  
                  <div className={`p-8 rounded-2xl mb-8 ${
                    isColorful 
                      ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-400/30 backdrop-blur-lg' 
                      : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                  }`}>
                    <h3 className={`text-xl font-bold mb-4 ${
                      isColorful ? 'text-indigo-300' : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.testScenario}</h3>
                    
                    <div className={`p-6 rounded-xl mb-6 ${
                      isColorful 
                        ? 'bg-indigo-900/20 border border-indigo-400/20' 
                        : isLight ? 'bg-indigo-50 border border-indigo-100' : 'bg-indigo-900/20 border border-indigo-800'
                    }`}>
                      <p className={`${
                        isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                      }`}>{content.testScenarioDesc}</p>
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-4 ${
                      isColorful ? 'text-indigo-300' : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.focusAreas}</h3>
                    
                    <div className="flex flex-wrap gap-4">
                      {[
                        { icon: "touch_app", label: content.usabilityFocus },
                        { icon: "accessibility", label: content.accessibilityFocus },
                        { icon: "speed", label: content.performanceFocus },
                        { icon: "check_circle", label: content.consistencyFocus }
                      ].map((area, index) => (
                        <div key={index} className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                          isColorful 
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30' 
                            : isLight ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-900/30 text-indigo-300'
                        }`}>
                          <span className="material-symbols text-sm">{area.icon}</span>
                          <span className="text-sm font-medium">{area.label}</span>
                        </div>
                      ))}                    </div>
                  </div>
                </motion.section>

                {/* System Solutions */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className={`p-8 rounded-2xl ${
                      isColorful 
                        ? 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-400/30 backdrop-blur-lg' 
                        : isLight ? 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-100' : 'bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-800'
                    }`}>
                      <h3 className={`text-xl font-bold mb-4 ${
                        isColorful 
                          ? 'text-red-300' 
                          : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.problemTitle}</h3>
                      <p className={`${
                        isColorful 
                          ? 'text-gray-200' 
                          : isLight ? 'text-gray-700' : 'text-gray-300'
                      }`}>{content.problemDesc}</p>
                    </div>
                    
                    <div className={`p-8 rounded-2xl ${
                      isColorful 
                        ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-400/30 backdrop-blur-lg' 
                        : isLight ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100' : 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800'
                    }`}>
                      <h3 className={`text-xl font-bold mb-4 ${
                        isColorful 
                          ? 'text-green-300' 
                          : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.solutionTitle}</h3>
                      <p className={`${
                        isColorful 
                          ? 'text-gray-200' 
                          : isLight ? 'text-gray-700' : 'text-gray-300'
                      }`}>{content.solutionDesc}</p>
                    </div>
                  </div>
                </motion.section>

                {/* Key Principles */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.principlesTitle}</h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { title: content.principle1, desc: content.principle1Desc, icon: 'universal_access' },
                      { title: content.principle2, desc: content.principle2Desc, icon: 'integration_instructions' },
                      { title: content.principle3, desc: content.principle3Desc, icon: 'developer_mode' }
                    ].map((principle, index) => (
                      <div key={index} className={`p-8 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                        <span className={`material-symbols text-4xl mb-4 block ${
                          isColorful ? 'text-purple-400' : isLight ? 'text-purple-500' : 'text-purple-400'
                        }`}>{principle.icon}</span>
                        <h3 className={`text-xl font-bold mb-4 ${
                          isColorful 
                            ? 'text-purple-300' 
                            : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{principle.title}</h3>
                        <p className={`${
                          isColorful 
                            ? 'text-gray-200' 
                            : isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>{principle.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </motion.div>
            )}

            {/* Design System Tab */}
            {activeTab === 1 && (
              <motion.div
                key="design-system"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Color System */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.colorsTitle}</h2>
                  <p className={`text-lg mb-8 ${
                    isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                  }`}>{content.colorsDesc}</p>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {colorThemes.map((colorTheme, index) => (
                      <div key={index} className={`p-6 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                        <div className={`h-32 rounded-xl mb-4 ${colorTheme.preview}`}></div>
                        <h3 className={`font-bold mb-2 ${
                          isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{colorTheme.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          isColorful 
                            ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                            : isLight ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'
                        }`}>
                          WCAG {colorTheme.contrast}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`p-6 rounded-2xl ${
                    isColorful 
                      ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-400/30 backdrop-blur-lg' 
                      : isLight ? 'bg-blue-50 border border-blue-100' : 'bg-blue-900/20 border border-blue-800'
                  }`}>
                    <span className="material-symbols text-2xl text-blue-400 mb-2 block">info</span>
                    <p className={`${
                      isColorful ? 'text-gray-200' : isLight ? 'text-blue-700' : 'text-blue-300'
                    }`}>{content.contrastInfo}</p>
                  </div>
                </motion.section>

                {/* Typography System */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.inclusiveTypographyTitle}</h2>
                  <p className={`text-lg mb-8 ${
                    isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                  }`}>{content.inclusiveTypographyDesc}</p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className={`p-8 rounded-2xl ${
                      isColorful 
                        ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-400/30 backdrop-blur-lg' 
                        : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                    }`}>
                      <h3 className={`text-xl font-bold mb-4 ${
                        isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.englishType}</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-3xl font-bold ${
                            isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>Heading Large</h4>
                          <p className="text-sm text-gray-400">Font Size: 48px, Line Height: 1.2</p>
                        </div>
                        <div>
                          <h5 className={`text-xl font-semibold ${
                            isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>Heading Medium</h5>
                          <p className="text-sm text-gray-400">Font Size: 24px, Line Height: 1.3</p>
                        </div>
                        <div>
                          <p className={`text-base ${
                            isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                          }`}>Body text optimized for readability</p>
                          <p className="text-sm text-gray-400">Font Size: 16px, Line Height: 1.6</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-8 rounded-2xl ${
                      isColorful 
                        ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-400/30 backdrop-blur-lg' 
                        : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                    }`}>
                      <h3 className={`text-xl font-bold mb-4 ${
                        isColorful ? 'text-orange-300' : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.arabicType}</h3>
                      <div className="space-y-4" dir="rtl">
                        <div>
                          <h4 className={`text-3xl font-bold ${
                            isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>عنوان كبير</h4>
                          <p className="text-sm text-gray-400" dir="ltr">Font Size: 48px, Line Height: 1.4</p>
                        </div>
                        <div>
                          <h5 className={`text-xl font-semibold ${
                            isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>عنوان متوسط</h5>
                          <p className="text-sm text-gray-400" dir="ltr">Font Size: 24px, Line Height: 1.5</p>
                        </div>
                        <div>
                          <p className={`text-base ${
                            isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                          }`}>نص محسن للقراءة والوضوح</p>
                          <p className="text-sm text-gray-400" dir="ltr">Font Size: 16px, Line Height: 1.7</p>
                        </div>
                      </div>
                      <div className={`mt-6 p-4 rounded-lg ${
                        isColorful 
                          ? 'bg-orange-500/20 border border-orange-400/30' 
                          : isLight ? 'bg-orange-50 border border-orange-200' : 'bg-orange-900/30 border border-orange-700'
                      }`}>
                        <span className="material-symbols text-orange-400 mr-2">language</span>
                        <span className={`text-sm ${
                          isColorful ? 'text-orange-300' : isLight ? 'text-orange-700' : 'text-orange-400'
                        }`}>{content.rtlSupport}</span>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Design System Features */}
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>Core System Features</h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {designSystemFeatures.map((feature, index) => (
                      <div key={index} className={`p-8 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                        <span className={`material-symbols text-4xl mb-4 block bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                          {feature.icon}
                        </span>
                        <h3 className={`text-xl font-bold mb-4 ${
                          isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{feature.title}</h3>
                        <p className={`${
                          isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>{feature.description}</p>
                      </div>
                    ))}
                  </div>                </motion.section>
              </motion.div>
            )}

            {/* Implementation Tab */}
            {activeTab === 2 && (
              <motion.div
                key="implementation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.section 
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className={`text-3xl font-bold mb-8 ${
                    isColorful 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400' 
                      : isLight ? 'text-gray-900' : 'text-white'
                  }`}>{content.technicalTitle}</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className={`p-8 rounded-2xl ${
                      isColorful 
                        ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-400/30 backdrop-blur-lg' 
                        : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                    }`}>
                      <h3 className={`text-xl font-bold mb-4 ${
                        isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.headlessTitle}</h3>
                      <p className={`mb-6 ${
                        isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                      }`}>{content.headlessDesc}</p>
                      
                      <div className={`p-4 rounded-lg font-mono text-sm ${
                        isLight ? 'bg-gray-100' : 'bg-gray-900'
                      }`}>                        <div className={`${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                          <span className="text-purple-500">import</span> {`{ Menu }`} <span className="text-purple-500">from</span> <span className="text-green-500">&apos;@headlessui/react&apos;</span><br/>
                          <span className="text-purple-500">import</span> {`{ ChevronDownIcon }`} <span className="text-purple-500">from</span> <span className="text-green-500">&apos;@heroicons/react/20/solid&apos;</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-8 rounded-2xl ${
                      isColorful 
                        ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-400/30 backdrop-blur-lg' 
                        : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                    }`}>
                      <h3 className={`text-xl font-bold mb-4 ${
                        isColorful ? 'text-blue-300' : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.testingTitle}</h3>
                      <p className={`mb-6 ${
                        isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                      }`}>{content.testingDesc}</p>
                      
                      <div className={`p-4 rounded-lg font-mono text-sm ${
                        isLight ? 'bg-gray-100' : 'bg-gray-900'
                      }`}>
                        <div className={`${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                          <span className="text-blue-400">npm run</span> <span className="text-green-500">test:a11y</span><br/>
                          <span className="text-gray-500"># ✅ 0 accessibility violations found</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Technical Standards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: content.semanticHtml, icon: 'code', desc: 'Proper HTML5 semantic structure' },
                      { title: content.ariaLabels, icon: 'accessibility', desc: 'Complete ARIA implementation' },
                      { title: content.keyboardSupport, icon: 'keyboard', desc: 'Full keyboard navigation' }
                    ].map((standard, index) => (
                      <div key={index} className={`p-6 rounded-2xl ${
                        isColorful 
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg' 
                          : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                        <span className={`material-symbols text-3xl mb-4 block ${
                          isColorful ? 'text-purple-400' : isLight ? 'text-blue-500' : 'text-blue-400'
                        }`}>{standard.icon}</span>
                        <h3 className={`font-bold mb-2 ${
                          isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{standard.title}</h3>
                        <p className={`text-sm ${
                          isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>{standard.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
