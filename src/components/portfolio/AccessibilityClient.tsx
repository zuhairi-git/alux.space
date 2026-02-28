'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection, { CaseStudyItem } from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';

export default function AccessibilityClient() {

  useEffect(() => {
    // Ensure Tajawal font is loaded
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }
  }, []);

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';

  // Get localized text content
  const getLocalizedContent = () => {
    const content = {
      en: {
        title: "Inclusive Design System",
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
        designProcess: "My Design Process",
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
      }, fi: {
        title: "Inklusiivinen suunnittelujärjestelmä",
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
        designProcess: "Suunnitteluprosessini",
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
    <div className={`min-h-screen transition-colors duration-300 ${isColorful
        ? 'bg-[#050023]'
        : isLight
          ? 'bg-gradient-to-br from-slate-50 to-gray-100'
          : 'bg-gradient-to-br from-gray-900 to-black'
      }`}>
      <Navigation />
      <CaseStudyProgress />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <CaseStudyHero
            title={content.title}
            subtitle={content.subtitle}
            image="/images/portfolio/accessibility/accessiblity-showcase.jpg"
            tags={[content.projectTypeValues, content.standardsValue]}
            actions={[
              {
                label: locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'View Design System',
                icon: 'design_services',
                variant: 'primary',
                href: 'https://ds.alux.space/',
              },
            ]}
            meta={[
              { label: content.projectType, value: content.projectTypeValues, icon: 'rocket_launch' },
              { label: content.timeline, value: content.timelineValue, icon: 'schedule' },
              { label: content.standards, value: content.standardsValue, icon: 'verified' },
              { label: content.roles, value: content.rolesValue, icon: 'person' },
            ]}
          />

          {/* Intro */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>
              {content.intro}
            </p>
          </motion.div>

          <CaseStudySection title={content.overviewTab} icon="visibility" number={1} accent="blue">            <CaseStudyItem>
                  <h2 className={`text-3xl font-bold mb-8 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.objectivesTitle}</h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[{ icon: "home_repair_service", text: content.objective1 },
                    { icon: "accessibility", text: content.objective2 },
                    { icon: "verified", text: content.objective3 },
                    { icon: "integration_instructions", text: content.objective4 },
                    { icon: "language", text: content.objective5 }
                    ].map((objective, index) => (
                      <div key={index} className={`p-5 rounded-2xl ${isColorful
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg'
                          : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                        }`}>
                        <span className={`material-symbols text-xl mb-3 block ${isColorful ? 'text-cyan-400' : isLight ? 'text-blue-500' : 'text-blue-400'
                          }`}>{objective.icon}</span>
                        <p className={`font-medium ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                          }`}>{objective.text}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.designProcess}</h2>

                  <div className={`p-6 rounded-2xl mb-6 ${isColorful
                      ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg'
                      : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                    }`}>                    <div className="flex items-center mb-6">
                      <span className={`text-sm font-medium mr-3 ${isColorful
                          ? 'text-cyan-300'
                          : isLight ? 'text-gray-700' : 'text-gray-300'
                        }`}>{content.designModel}</span>
                      <span className={`text-lg font-bold ${isColorful
                          ? 'bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent'
                          : 'bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent'
                        }`}>
                        {content.doubleD}
                      </span>
                    </div>                      {/* Interactive Double Diamond */}
                    <div className="relative mb-10 overflow-hidden">
                      {/* Ambient background */}
                      <div className={`absolute inset-0 ${isColorful
                          ? 'bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-pink-900/20'
                          : isLight ? 'bg-gradient-to-br from-blue-50/50 to-purple-50/50' : 'bg-gradient-to-br from-gray-900/50 to-indigo-900/30'
                        } blur-3xl`}></div>

                      <div className="relative">
                        {/* Phase labels */}
                        <div className="text-center mb-8">
                          <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border ${isColorful
                              ? 'bg-white/5 border-white/10'
                              : isLight ? 'bg-white/80 border-gray-200/50 shadow-sm' : 'bg-gray-800/80 border-gray-700/50'
                            }`}>
                            <span className={`text-xs font-medium ${isColorful ? 'text-cyan-300' : isLight ? 'text-blue-700' : 'text-blue-400'
                              }`}>Problem Discovery</span>

                            <div className={`w-px h-4 ${isColorful ? 'bg-gradient-to-b from-cyan-400 to-pink-400' : 'bg-gray-300'
                              }`}></div>

                            <span className={`text-xs font-medium ${isColorful ? 'text-pink-300' : isLight ? 'text-pink-700' : 'text-pink-400'
                              }`}>Solution Creation</span>
                          </div>
                        </div>

                        {/* Interactive Phase Cards */}
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mx-auto px-4">
                          {[
                            {
                              phase: content.discoverPhase,
                              icon: 'search',
                              color: isColorful ? 'cyan' : 'blue',
                              description: 'Research user needs, accessibility challenges, and current limitations in design systems.',
                              gradient: isColorful ? 'from-cyan-400/20 to-blue-400/10' : isLight ? 'from-blue-100 to-blue-50' : 'from-blue-900/30 to-blue-800/20'
                            },
                            {
                              phase: content.definePhase,
                              icon: 'target',
                              color: isColorful ? 'purple' : 'indigo',
                              description: 'Synthesize insights into clear accessibility requirements and design principles.',
                              gradient: isColorful ? 'from-purple-400/20 to-indigo-400/10' : isLight ? 'from-purple-100 to-indigo-50' : 'from-purple-900/30 to-indigo-800/20'
                            },
                            {
                              phase: content.developPhase,
                              icon: 'build',
                              color: isColorful ? 'fuchsia' : 'pink',
                              description: 'Create accessible components, test with users, and iterate based on feedback.',
                              gradient: isColorful ? 'from-fuchsia-400/20 to-pink-400/10' : isLight ? 'from-pink-100 to-rose-50' : 'from-pink-900/30 to-rose-800/20'
                            },
                            {
                              phase: content.deliverPhase,
                              icon: 'rocket_launch',
                              color: isColorful ? 'emerald' : 'green',
                              description: 'Launch the design system with comprehensive documentation and training.',
                              gradient: isColorful ? 'from-emerald-400/20 to-green-400/10' : isLight ? 'from-green-100 to-emerald-50' : 'from-green-900/30 to-emerald-800/20'
                            }
                          ].map((phase, index) => (
                            <div
                              key={index}
                              className={`group relative p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${isColorful
                                  ? `bg-gradient-to-br ${phase.gradient} border-white/10 hover:border-white/20`
                                  : isLight
                                    ? `bg-gradient-to-br ${phase.gradient} border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow-md`
                                    : `bg-gradient-to-br ${phase.gradient} border-gray-700/30 hover:border-gray-600/50`
                                }`}
                            >                              {/* Floating icon */}
                              <div className={`relative mb-4 ${index % 2 === 0 ? 'text-left' : 'text-right'
                                }`}>                                <div className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${isColorful
                                    ? `bg-gradient-to-br from-${phase.color}-400/30 to-${phase.color}-500/20 backdrop-blur-sm`
                                    : isLight
                                      ? phase.color === 'blue'
                                        ? 'bg-gradient-to-br from-blue-300 to-blue-400 shadow-lg'
                                        : phase.color === 'indigo'
                                          ? 'bg-gradient-to-br from-indigo-300 to-indigo-400 shadow-lg'
                                          : phase.color === 'pink'
                                            ? 'bg-gradient-to-br from-pink-300 to-pink-400 shadow-lg'
                                            : 'bg-gradient-to-br from-green-300 to-green-400 shadow-lg'
                                      : phase.color === 'blue'
                                        ? 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg'
                                        : phase.color === 'indigo'
                                          ? 'bg-gradient-to-br from-indigo-400 to-indigo-500 shadow-lg'
                                          : phase.color === 'pink'
                                            ? 'bg-gradient-to-br from-pink-400 to-pink-500 shadow-lg'
                                            : 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg'
                                  } group-hover:scale-105 transition-transform duration-300`}>
                                  <span className={`material-symbols text-lg font-bold ${isColorful
                                      ? `text-${phase.color}-300`
                                      : isLight
                                        ? 'text-white'
                                        : 'text-white'
                                    }`}>{phase.icon}</span>
                                </div>
                              </div>

                              {/* Phase title */}
                              <h3 className={`text-lg font-bold mb-2 ${isColorful
                                  ? `text-${phase.color}-200`
                                  : isLight
                                    ? `text-${phase.color}-800`
                                    : `text-${phase.color}-300`
                                }`}>
                                {phase.phase}
                              </h3>

                              {/* Description */}
                              <p className={`text-sm leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-400'
                                }`}>
                                {phase.description}
                              </p>

                              {/* Connection indicator */}
                              {index < 3 && (
                                <div className={`hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-5 h-0.5 ${isColorful
                                    ? 'bg-gradient-to-r from-white/30 to-transparent'
                                    : isLight
                                      ? 'bg-gradient-to-r from-gray-300 to-transparent'
                                      : 'bg-gradient-to-r from-gray-600 to-transparent'
                                  }`}>
                                  <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${isColorful ? 'bg-white/50' : isLight ? 'bg-gray-400' : 'bg-gray-500'
                                    }`}></div>
                                </div>
                              )}

                              {/* Hover glow effect */}
                              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isColorful
                                  ? `bg-gradient-to-br from-${phase.color}-400/5 to-transparent`
                                  : isLight
                                    ? `bg-gradient-to-br from-${phase.color}-200/20 to-transparent`
                                    : `bg-gradient-to-br from-${phase.color}-400/10 to-transparent`
                                }`}></div>
                            </div>
                          ))}
                        </div>

                        {/* Methodology indicator */}
                        <div className="text-center mt-8">
                          <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full ${isColorful
                              ? 'bg-white/5 border border-white/10'
                              : isLight
                                ? 'bg-white/60 border border-gray-200/50 shadow-sm'
                                : 'bg-gray-800/60 border border-gray-700/50'
                            }`}>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${isColorful ? 'bg-cyan-400' : 'bg-blue-500'
                                }`}></div>
                              <span className={`text-xs font-medium ${isColorful ? 'text-cyan-300' : isLight ? 'text-blue-700' : 'text-blue-400'
                                }`}>Divergent</span>
                            </div>

                            <div className={`w-6 h-px ${isColorful
                                ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
                                : 'bg-gradient-to-r from-blue-400 to-pink-400'
                              }`}></div>

                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-medium ${isColorful ? 'text-pink-300' : isLight ? 'text-pink-700' : 'text-pink-400'
                                }`}>Convergent</span>
                              <div className={`w-2 h-2 rounded-full ${isColorful ? 'bg-pink-400' : 'bg-pink-500'
                                }`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          <CaseStudySection title={content.researchTitle} icon="science" number={2} accent="green">
            <CaseStudyItem>
                  <div className={`p-6 rounded-2xl mb-6 ${isColorful
                      ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-400/30 backdrop-blur-lg'
                      : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                    }`}>
                    <h3 className={`text-lg font-bold mb-4 ${isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.participantFeedback}</h3>

                    <div className="grid md:grid-cols-4 gap-6 mb-6">
                      {[{ label: content.accessibilityValue, value: "92%", icon: "accessibility" },
                      { label: content.usabilityScore, value: "88%", icon: "thumb_up" },
                      { label: content.inclusionApproval, value: "95%", icon: "groups" },
                      { label: content.complianceRating, value: "100%", icon: "verified" }
                      ].map((metric, index) => (
                        <div key={index} className="text-center">
                          <span className={`material-symbols text-3xl mb-2 block ${isColorful ? 'text-green-400' : isLight ? 'text-green-500' : 'text-green-400'
                            }`}>{metric.icon}</span>
                          <div className={`text-2xl font-bold mb-1 ${isColorful
                              ? 'bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent'
                              : isLight ? 'text-gray-900' : 'text-white'
                            }`}>
                            {metric.value}
                          </div>
                          <p className={`text-sm ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                            }`}>{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    <h3 className={`text-lg font-bold mb-4 ${isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
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
                        <div key={index} className={`p-4 rounded-2xl ${isColorful
                            ? 'bg-green-900/20 border border-green-400/20'
                            : isLight ? 'bg-green-50 border border-green-100' : 'bg-green-900/20 border border-green-800'
                          }`}>
                          <span className={`material-symbols text-xl mb-2 block ${isColorful ? 'text-green-400' : isLight ? 'text-green-600' : 'text-green-400'
                            }`}>{item.icon}</span>
                          <h4 className={`font-semibold mb-2 ${isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>{item.title}</h4>
                          <p className={`text-sm ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                            }`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* User Personas */}
          <CaseStudySection title={locale === 'fi' ? "Käyttäjäpersoonat" : "User Personas"} icon="groups" number={3} accent="pink">
            <div className="space-y-10">
                    {[
                      {
                        name: content.persona1Name,
                        role: content.persona1Role,
                        traits: content.persona1Traits,
                        needs: content.persona1Needs,
                        goals: content.persona1Goals,
                        pains: content.persona1Pains,
                        photo: "/images/portfolio/profile-img/sara-m.jpg",
                        accent: "purple"
                      },
                      {
                        name: content.persona2Name,
                        role: content.persona2Role,
                        traits: content.persona2Traits,
                        needs: content.persona2Needs,
                        goals: content.persona2Goals,
                        pains: content.persona2Pains,
                        photo: "/images/portfolio/profile-img/alex-chen.jpg",
                        accent: "blue"
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
                              {/* Name & Role */}
                              <div className="mb-5">
                                <h3 className="text-2xl font-bold text-primary tracking-tight leading-tight">{persona.name}</h3>
                                <p className="text-xs font-mono uppercase tracking-widest opacity-40 mt-1">{persona.role}</p>
                              </div>

                              {/* Traits — inline text, not pills */}
                              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-current/[0.06]">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-500 flex-shrink-0">Traits</span>
                                <span className="text-sm opacity-60">{persona.traits.join(' · ')}</span>
                              </div>

                              {/* Detail columns — left-border accent, no boxes */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="border-l-2 border-emerald-500/30 pl-4">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-500 mb-3">Needs</h4>
                                  <ul className="space-y-1.5">
                                    {persona.needs.map((need, i) => (
                                      <li key={i} className="text-sm leading-relaxed opacity-70">{need}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="border-l-2 border-blue-500/30 pl-4">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-500 mb-3">Goals</h4>
                                  <ul className="space-y-1.5">
                                    {persona.goals.map((goal, i) => (
                                      <li key={i} className="text-sm leading-relaxed opacity-70">{goal}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="border-l-2 border-rose-500/30 pl-4">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-rose-500 mb-3">Pain Points</h4>
                                  <ul className="space-y-1.5">
                                    {persona.pains.map((pain, i) => (
                                      <li key={i} className="text-sm leading-relaxed opacity-70">{pain}</li>
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

          <CaseStudySection title={content.requirementsTitle} icon="checklist" number={4} accent="orange">
            <CaseStudyItem>
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
                      <div key={index} className={`p-5 rounded-2xl ${isColorful
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg'
                          : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                        }`}>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${req.gradient} flex items-center justify-center mb-3`}>
                          <span className="material-symbols text-white text-lg">{req.icon}</span>
                        </div>
                        <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>{req.title}</h3>
                        <p className={`${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                          }`}>{req.desc}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.userTestingTitle}</h2>

                  <div className={`p-6 rounded-2xl mb-6 ${isColorful
                      ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-400/30 backdrop-blur-lg'
                      : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                    }`}>
                    <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-indigo-300' : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.testScenario}</h3>

                    <div className={`p-4 rounded-lg mb-5 ${isColorful
                        ? 'bg-indigo-900/20 border border-indigo-400/20'
                        : isLight ? 'bg-indigo-50 border border-indigo-100' : 'bg-indigo-900/20 border border-indigo-800'
                      }`}>
                      <p className={`${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                        }`}>{content.testScenarioDesc}</p>
                    </div>

                    <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-indigo-300' : isLight ? 'text-gray-900' : 'text-white'
                      }`}>{content.focusAreas}</h3>

                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: "touch_app", label: content.usabilityFocus },
                        { icon: "accessibility", label: content.accessibilityFocus },
                        { icon: "speed", label: content.performanceFocus },
                        { icon: "check_circle", label: content.consistencyFocus }
                      ].map((area, index) => (
                        <div key={index} className={`px-4 py-2 rounded-full flex items-center space-x-2 ${isColorful
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30'
                            : isLight ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-900/30 text-indigo-300'
                          }`}>
                          <span className="material-symbols text-sm">{area.icon}</span>
                          <span className="text-sm font-medium">{area.label}</span>
                        </div>
                      ))}                    </div>
                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          <CaseStudySection title={content.principlesTitle} icon="lightbulb" number={5} accent="purple">
            <CaseStudyItem>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl ${isColorful
                        ? 'bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-400/30 backdrop-blur-lg'
                        : isLight ? 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-100' : 'bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-800'
                      }`}>
                      <h3 className={`text-lg font-bold mb-3 ${isColorful
                          ? 'text-red-300'
                          : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{content.problemTitle}</h3>
                      <p className={`${isColorful
                          ? 'text-gray-200'
                          : isLight ? 'text-gray-700' : 'text-gray-300'
                        }`}>{content.problemDesc}</p>
                    </div>

                    <div className={`p-6 rounded-2xl ${isColorful
                        ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-400/30 backdrop-blur-lg'
                        : isLight ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100' : 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-800'
                      }`}>
                      <h3 className={`text-lg font-bold mb-3 ${isColorful
                          ? 'text-green-300'
                          : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{content.solutionTitle}</h3>
                      <p className={`${isColorful
                          ? 'text-gray-200'
                          : isLight ? 'text-gray-700' : 'text-gray-300'
                        }`}>{content.solutionDesc}</p>
                    </div>
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.principlesTitle}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: content.principle1, desc: content.principle1Desc, icon: 'accessibility' },
                      { title: content.principle2, desc: content.principle2Desc, icon: 'integration_instructions' },
                      { title: content.principle3, desc: content.principle3Desc, icon: 'developer_mode' }
                    ].map((principle, index) => (
                      <div key={index} className={`p-6 rounded-2xl ${isColorful
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg'
                          : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                        }`}>
                        <span className={`material-symbols text-2xl mb-3 block ${isColorful ? 'text-purple-400' : isLight ? 'text-purple-500' : 'text-purple-400'
                          }`}>{principle.icon}</span>
                        <h3 className={`text-lg font-bold mb-3 ${isColorful
                            ? 'text-purple-300'
                            : isLight ? 'text-gray-900' : 'text-white'
                          }`}>{principle.title}</h3>
                        <p className={`${isColorful
                            ? 'text-gray-200'
                            : isLight ? 'text-gray-600' : 'text-gray-300'
                          }`}>{principle.desc}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          <CaseStudySection title={content.systemTab} icon="design_services" number={6} accent="cyan">
            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.colorsTitle}</h2>
                  <p className={`text-base mb-6 ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                    }`}>{content.colorsDesc}</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {colorThemes.map((colorTheme, index) => (
                      <div key={index} className={`p-5 rounded-2xl ${isColorful
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg'
                          : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                        }`}>
                        <div className={`h-24 rounded-lg mb-3 ${colorTheme.preview}`}></div>
                        <h3 className={`font-bold mb-2 ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>{colorTheme.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${isColorful
                            ? 'bg-green-500/20 text-green-300 border border-green-400/30'
                            : isLight ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'
                          }`}>
                          WCAG {colorTheme.contrast}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={`p-5 rounded-2xl ${isColorful
                      ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-400/30 backdrop-blur-lg'
                      : isLight ? 'bg-blue-50 border border-blue-100' : 'bg-blue-900/20 border border-blue-800'
                    }`}>
                    <span className="material-symbols text-xl text-blue-400 mb-2 block">info</span>
                    <p className={`${isColorful ? 'text-gray-200' : isLight ? 'text-blue-700' : 'text-blue-300'
                      }`}>{content.contrastInfo}</p>
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.inclusiveTypographyTitle}</h2>
                  <p className={`text-base mb-6 ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                    }`}>{content.inclusiveTypographyDesc}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl ${isColorful
                        ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-400/30 backdrop-blur-lg'
                        : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                      }`}>
                      <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{content.englishType}</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-3xl font-bold ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>Heading Large</h4>
                          <p className="text-sm text-gray-400">Font Size: 48px, Line Height: 1.2</p>
                        </div>
                        <div>
                          <h5 className={`text-xl font-semibold ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>Heading Medium</h5>
                          <p className="text-sm text-gray-400">Font Size: 24px, Line Height: 1.3</p>
                        </div>
                        <div>
                          <p className={`text-base ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                            }`}>Body text optimized for readability</p>
                          <p className="text-sm text-gray-400">Font Size: 16px, Line Height: 1.6</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-6 rounded-2xl ${isColorful
                        ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-400/30 backdrop-blur-lg'
                        : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                      }`}>
                      <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-orange-300' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{content.arabicType}</h3>
                      <div className="space-y-4" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                        <div>
                          <h4 className={`text-3xl font-bold ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>عنوان كبير</h4>
                          <p className="text-sm text-gray-400" dir="ltr">Font: Tajawal, Size: 48px, Line Height: 1.4</p>
                        </div>
                        <div>
                          <h5 className={`text-xl font-semibold ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                            }`}>عنوان متوسط</h5>
                          <p className="text-sm text-gray-400" dir="ltr">Font: Tajawal, Size: 24px, Line Height: 1.5</p>
                        </div>
                        <div>
                          <p className={`text-base ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                            }`}>نص محسن للقراءة والوضوح</p>
                          <p className="text-sm text-gray-400" dir="ltr">Font: Tajawal, Size: 16px, Line Height: 1.7</p>
                        </div>
                      </div>
                      <div className={`mt-6 p-4 rounded-lg ${isColorful
                          ? 'bg-orange-500/20 border border-orange-400/30'
                          : isLight ? 'bg-orange-50 border border-orange-200' : 'bg-orange-900/30 border border-orange-700'
                        }`}>
                        <span className="material-symbols text-orange-400 mr-2">language</span>
                        <span className={`text-sm ${isColorful ? 'text-orange-300' : isLight ? 'text-orange-700' : 'text-orange-400'
                          }`}>{content.rtlSupport}</span>
                      </div>
                    </div>
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>Core System Features</h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    {designSystemFeatures.map((feature, index) => (
                      <div key={index} className={`p-6 rounded-2xl ${isColorful
                          ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-400/30 backdrop-blur-lg'
                          : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                        }`}>
                        <span className={`material-symbols text-2xl mb-3 block bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                          {feature.icon}
                        </span>
                        <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>{feature.title}</h3>
                        <p className={`${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                          }`}>{feature.description}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          <CaseStudySection title={content.implementationTab} icon="code" number={7} accent="teal">
            <CaseStudyItem>
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className={`p-6 rounded-2xl ${isColorful
                        ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-400/30 backdrop-blur-lg'
                        : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                      }`}>
                      <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{content.headlessTitle}</h3>
                      <p className={`mb-4 ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>{content.headlessDesc}</p>

                      <div className={`p-4 rounded-lg font-mono text-sm ${isLight ? 'bg-gray-100' : 'bg-gray-900'
                        }`}>                        <div className={`${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                          <span className="text-purple-500">import</span> {`{ Menu }`} <span className="text-purple-500">from</span> <span className="text-green-500">&apos;@headlessui/react&apos;</span><br />
                          <span className="text-purple-500">import</span> {`{ ChevronDownIcon }`} <span className="text-purple-500">from</span> <span className="text-green-500">&apos;@heroicons/react/20/solid&apos;</span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${isColorful
                        ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-400/30 backdrop-blur-lg'
                        : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                      }`}>
                      <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-blue-300' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{content.testingTitle}</h3>
                      <p className={`mb-4 ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>{content.testingDesc}</p>

                      <div className={`p-4 rounded-lg font-mono text-sm ${isLight ? 'bg-gray-100' : 'bg-gray-900'
                        }`}>
                        <div className={`${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                          <span className="text-blue-400">npm run</span> <span className="text-green-500">test:a11y</span><br />
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
                      <div key={index} className={`p-5 rounded-2xl ${isColorful
                          ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-400/30 backdrop-blur-lg'
                          : isLight ? 'bg-white shadow-md' : 'bg-gray-800'
                        }`}>
                        <span className={`material-symbols text-xl mb-3 block ${isColorful ? 'text-purple-400' : isLight ? 'text-blue-500' : 'text-blue-400'
                          }`}>{standard.icon}</span>
                        <h3 className={`font-bold mb-2 ${isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white'
                          }`}>{standard.title}</h3>
                        <p className={`text-sm ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                          }`}>{standard.desc}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>
          </CaseStudySection>
        </div>
      </main>
    </div>
  );
}
