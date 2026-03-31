'use client';;
import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { delaySeconds, stagger, transition as t } from '@/design-system';
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

  
  const { locale } = useLanguage();

  // Get localized text content
  const getLocalizedContent = () => {
    const content = {
      en: {
        title: "Inclusive Design System",
        subtitle: "Accessibility-First Design Philosophy",
        intro: "Building the future of inclusive digital productsÃ¢â‚¬â€from research to implementation. This system powers applications used by millions while ensuring no one is left behind.",
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
        title: "Inklusiivinen suunnittelujÃƒÂ¤rjestelmÃƒÂ¤",
        subtitle: "Saavutettavuus-ensin filosofia",
        intro: "Rakennamme inklusiivisten digitaalisten tuotteiden tulevaisuuttaÃ¢â‚¬â€tutkimuksesta toteutukseen. TÃƒÂ¤mÃƒÂ¤ jÃƒÂ¤rjestelmÃƒÂ¤ voimistaa miljoonien kÃƒÂ¤yttÃƒÂ¤jien sovelluksia varmistaen, ettÃƒÂ¤ ketÃƒÂ¤ÃƒÂ¤n ei jÃƒÂ¤tetÃƒÂ¤ jÃƒÂ¤lkeen.",
        projectType: "Projektityyppi",
        projectTypeValues: "Skaalautuva suunnittelujÃƒÂ¤rjestelmÃƒÂ¤",
        timeline: "Aikataulu",
        timelineValue: "6 kuukautta (jatkuva)",
        tools: "TyÃƒÂ¶kalut & Teknologiat",
        toolsValue: "Figma, React, Tailwind CSS, Headless UI, axe DevTools",
        standards: "Vaatimustenmukaisuus",
        standardsValue: "WCAG 2.2 AAA, ARIA 1.2",
        roles: "Roolini",
        rolesValue: "SuunnittelujÃƒÂ¤rjestelmÃƒÂ¤n johtaja & Saavutettavuusasiantuntija",

        // Navigation tabs
        overviewTab: "Yleiskatsaus",
        systemTab: "SuunnittelujÃƒÂ¤rjestelmÃƒÂ¤",
        componentsTab: "Komponentit",
        implementationTab: "Toteutus",
        impactTab: "Vaikutus",
        // Overview section
        problemTitle: "Ongelma",
        problemDesc: "Useimmat suunnittelujÃƒÂ¤rjestelmÃƒÂ¤t kÃƒÂ¤sittelevÃƒÂ¤t saavutettavuutta jÃƒÂ¤lkikÃƒÂ¤teen. Halusimme rakentaa sellaisen, jossa inkluusio on perusta.",
        solutionTitle: "Ratkaisumme",
        solutionDesc: "Saavutettavuus-ensin suunnittelujÃƒÂ¤rjestelmÃƒÂ¤, joka tekee inklusiivisten tuotteiden luomisesta vaivatonta mille tahansa tiimille.",

        // Objectives
        objectivesTitle: "Tavoitteet",
        objective1: "Rakentaa saavutettavuus perustaan",
        objective2: "Luoda intuitiivisia, inklusiivisia kÃƒÂ¤yttÃƒÂ¶liittymiÃƒÂ¤",
        objective3: "Varmistaa WCAG 2.2 AAA -vaatimustenmukaisuus",
        objective4: "Mahdollistaa saumaton kehittÃƒÂ¤jien kÃƒÂ¤yttÃƒÂ¶ÃƒÂ¶notto",
        objective5: "Tukea monikielisiÃƒÂ¤ kokemuksia",

        // Research Insights
        researchTitle: "Tutkimustulokset",
        participantFeedback: "Osallistujien palaute",
        accessibilityValue: "Saavutettavuuden arvo",
        usabilityScore: "KÃƒÂ¤ytettÃƒÂ¤vyyspisteet",
        inclusionApproval: "Inkluusion hyvÃƒÂ¤ksyntÃƒÂ¤",
        complianceRating: "Vaatimustenmukaisuusarvio",
        keyRecommendations: "Keskeiset suositukset",
        enhancedAccessibility: "Parannettu saavutettavuus",
        enhancedAccessibilityDesc: "Kattava ARIA-merkintÃƒÂ¤ ja semanttinen rakenne",
        keyboardNavigation: "NÃƒÂ¤ppÃƒÂ¤imistÃƒÂ¶navigaatio",
        keyboardNavigationDesc: "TÃƒÂ¤ysi nÃƒÂ¤ppÃƒÂ¤imistÃƒÂ¶tuki nÃƒÂ¤kyvillÃƒÂ¤ fokusindikaattoreilla",
        colorContrast: "VÃƒÂ¤rikontrasti",
        colorContrastDesc: "AAA-tason kontrastisuhteet kaikissa teemoissa",

        // User Personas 
        userPersonasTitle: "KÃƒÂ¤yttÃƒÂ¤jÃƒÂ¤persoonat",
        persona1Name: "Sarah M.",
        persona1Role: "Frontend-kehittÃƒÂ¤jÃƒÂ¤",
        persona1Traits: ["Saavutettavuus-keskittynyt", "Yksityiskohtiin keskittyvÃƒÂ¤"],
        persona1Needs: ["SelkeÃƒÂ¤t toteutusoppaat", "Automatisoituja testaustyÃƒÂ¶kaluja"],
        persona1Goals: ["Rakentaa inklusiivisia kÃƒÂ¤yttÃƒÂ¶liittymiÃƒÂ¤", "TÃƒÂ¤yttÃƒÂ¤ÃƒÂ¤ vaatimustenmukaisuusstandardit"],
        persona1Pains: ["Monimutkaiset saavutettavuussÃƒÂ¤ÃƒÂ¤nnÃƒÂ¶t", "Selkeiden ohjeiden puute"],

        persona2Name: "Alex Chen",
        persona2Role: "Tuotesuunnittelija",
        persona2Traits: ["KÃƒÂ¤yttÃƒÂ¤jÃƒÂ¤keskeinen", "Laatuorientoitunut"],
        persona2Needs: ["Saavutettavia suunnittelumalleja", "Alustojen vÃƒÂ¤listÃƒÂ¤ yhtenÃƒÂ¤isyyttÃƒÂ¤"],
        persona2Goals: ["Luoda universaaleja suunnitelmia", "Sujuvoittaa suunnitteluprosessia"],
        persona2Pains: ["Saavutettavuustiedon puutteet", "Aikarajoitteet"],

        // Requirements
        requirementsTitle: "JÃƒÂ¤rjestelmÃƒÂ¤vaatimukset",
        requirement1: "Universaalit suunnitteluperiaatteet",
        requirement1Desc: "Jokainen komponentti toimii kaikille kÃƒÂ¤yttÃƒÂ¤jille kyvystÃƒÂ¤ riippumatta",
        requirement2: "KehittÃƒÂ¤jÃƒÂ¤kokemus",
        requirement2Desc: "Yksinkertainen integraatio kattavalla dokumentaatiolla",
        requirement3: "Testaus ja validointi",
        requirement3Desc: "Automaattinen saavutettavuustestaus ja validointityÃƒÂ¶kalut",
        requirement4: "Monikielituki",
        requirement4Desc: "RTL-tuki ja kansainvÃƒÂ¤listÃƒÂ¤mismahdollisuudet",

        // User Testing
        userTestingTitle: "KÃƒÂ¤yttÃƒÂ¤jÃƒÂ¤testaus",
        testScenario: "Testiskenaario",
        testScenarioDesc: "Navigoi ja kÃƒÂ¤ytÃƒÂ¤ komponentteja kÃƒÂ¤yttÃƒÂ¤en vain nÃƒÂ¤ppÃƒÂ¤imistÃƒÂ¶ÃƒÂ¤ ja nÃƒÂ¤ytÃƒÂ¶nlukijaa",
        focusAreas: "Keskittymisalueet",
        usabilityFocus: "KÃƒÂ¤ytettÃƒÂ¤vyys",
        accessibilityFocus: "Saavutettavuus",
        performanceFocus: "Suorituskyky",
        consistencyFocus: "Johdonmukaisuus",

        // Key principles
        principlesTitle: "Ydinperiaatteet",
        principle1: "Universaali pÃƒÂ¤ÃƒÂ¤sy",
        principle1Desc: "Jokainen komponentti toimii kaikille",
        principle2: "Saumaton integraatio",
        principle2Desc: "Saavutettavuus rakennettu jÃƒÂ¤rjestelmÃƒÂ¤ÃƒÂ¤n, ei kiinnitetty pÃƒÂ¤ÃƒÂ¤lle",
        principle3: "KehittÃƒÂ¤jÃƒÂ¤ystÃƒÂ¤vÃƒÂ¤llinen",
        principle3Desc: "Helppo toteuttaa, vaikea rikkoa",

        // Design system features
        colorSystemTitle: "Mukautuva vÃƒÂ¤rijÃƒÂ¤rjestelmÃƒÂ¤",
        colorSystemDesc: "Kolme huolellisesti suunniteltua teemaa WCAG AAA -kontrastisuhteilla",
        typographyTitle: "Typografia-erinomaisuus",
        typographyDesc: "Kaksikielinen tuki tÃƒÂ¤ydellisellÃƒÂ¤ luettavuudella eri kielillÃƒÂ¤",
        spacingTitle: "Harmoninen vÃƒÂ¤listys",
        spacingDesc: "4px ruudukkojÃƒÂ¤rjestelmÃƒÂ¤ saavutettavuus-yhteensopivilla kosketustavoitteilla",

        // Components showcase
        componentsTitle: "Saavutettavuus-ensin komponentit",
        buttonsTitle: "Ãƒâ€žlykkÃƒÂ¤ÃƒÂ¤t painikkeet",
        buttonsDesc: "Automaattisesti sÃƒÂ¤ÃƒÂ¤tyvÃƒÂ¤ kontrasti, oikeat fokustilat, nÃƒÂ¤ppÃƒÂ¤imistÃƒÂ¶navigaatio",
        tabsTitle: "Ãƒâ€žlykÃƒÂ¤s navigaatio",
        tabsDesc: "ARIA-yhteensopivat vÃƒÂ¤lilehdet nÃƒÂ¤ppÃƒÂ¤imistÃƒÂ¶tuella ja nÃƒÂ¤ytÃƒÂ¶nlukijan optimoinnilla",
        accordionsTitle: "Inklusiiviset haitarit",
        accordionsDesc: "Progressiivinen paljastaminen oikealla semanttisella merkinnÃƒÂ¤llÃƒÂ¤",

        // Implementation
        headlessTitle: "Headless UI -integraatio",
        headlessDesc: "Rakennettu Headless UI:n pÃƒÂ¤ÃƒÂ¤lle luotettavien saavutettavuusmallien varassa",
        testingTitle: "Automaattinen testaus",
        testingDesc: "CI/CD-integraatio axe-core:n kanssa jatkuvaa saavutettavuusseurantaa varten",

        // Results
        metricsTitle: "Mitattava vaikutus",
        complianceMetric: "100% WCAG-vaatimustenmukaisuus",
        adoptionMetric: "50+ komponenttia",
        performanceMetric: "Nolla saavutettavuusbugia",
        usageMetric: "10M+ kÃƒÂ¤yttÃƒÂ¤jÃƒÂ¤n kÃƒÂ¤yttÃƒÂ¤mÃƒÂ¤",

        // Call to action
        exploreSystem: "Tutustu jÃƒÂ¤rjestelmÃƒÂ¤ÃƒÂ¤n",
        viewDocs: "Katso dokumentaatio",

        // Design system sections
        colorsTitle: "VÃƒÂ¤rit jotka toimivat kaikille",
        colorsDesc: "Mukautuva vÃƒÂ¤rijÃƒÂ¤rjestelmÃƒÂ¤mme varmistaa tÃƒÂ¤ydelliset kontrastisuhteet kaikissa teemoissa",
        lightTheme: "Vaalea teema",
        darkTheme: "Tumma teema",
        colorfulTheme: "VÃƒÂ¤rikÃƒÂ¤s teema",
        contrastInfo: "Kaikki vÃƒÂ¤riyhdistelmÃƒÂ¤t tÃƒÂ¤yttÃƒÂ¤vÃƒÂ¤t WCAG AAA -standardit (7:1 kontrastisuhde)",
        // Typography section
        inclusiveTypographyTitle: "Inklusiivinen typografia",
        inclusiveTypographyDesc: "Suunniteltu luettavuutta varten eri kulttuureissa ja kyvyissÃƒÂ¤",
        englishType: "Englannin typografia",
        arabicType: "Arabian typografia",
        rtlSupport: "TÃƒÂ¤ysi RTL-tuki oikealla tekstin tasauksella",

        // Components deep dive
        interactiveTitle: "Interaktiiviset komponentit",
        keyboardNav: "TÃƒÂ¤ysi nÃƒÂ¤ppÃƒÂ¤imistÃƒÂ¶navigaatio",
        screenReader: "NÃƒÂ¤ytÃƒÂ¶nlukijan optimoitu",
        focusManagement: "Ãƒâ€žlykÃƒÂ¤s fokuksen hallinta",
        // Technical implementation
        technicalTitle: "Tekninen erinomaisuus",
        semanticHtml: "Semanttinen HTML-rakenne",
        ariaLabels: "Kattava ARIA-merkintÃƒÂ¤",
        keyboardSupport: "TÃƒÂ¤ydellinen nÃƒÂ¤ppÃƒÂ¤imistÃƒÂ¶vuorovaikutus",
        // Design process
        designProcess: "Suunnitteluprosessini",
        designModel: "Suunnittelumalli:",
        doubleD: "Kaksinkertainen timantti",
        discoverPhase: "LÃƒÂ¶ytÃƒÂ¤ÃƒÂ¤",
        definePhase: "MÃƒÂ¤ÃƒÂ¤ritellÃƒÂ¤",
        developPhase: "KehittÃƒÂ¤ÃƒÂ¤",
        deliverPhase: "Toimittaa",

        // Challenge and hypothesis
        challenge: "Haaste",
        challengeDesc: "SuunnittelujÃƒÂ¤rjestelmÃƒÂ¤n luominen, jossa saavutettavuus ei ole jÃƒÂ¤lkiajatus vaan jokaisen pÃƒÂ¤ÃƒÂ¤tÃƒÂ¶ksen perusta.",
        hypothesis: "Hypoteesimme",
        hypothesisDesc: "Jos rakennamme saavutettavuuden suunnittelujÃƒÂ¤rjestelmÃƒÂ¤mme ytimeen, tiimit luovat luonnollisesti inklusiivisempia tuotteita.",

        // Discovery and research
        discoveryInsights: "LÃƒÂ¶ytÃƒÂ¶jen oivallukset",
        discoveryDesc: "Laajan kÃƒÂ¤yttÃƒÂ¤jÃƒÂ¤tutkimuksen kautta tunnistimme nykyisten saavutettavuustoteutusten keskeiset kipupisteet.",
        initialResearch: "Alkututkimus",
        initialResearchDesc: "Nykyisten suunnittelujÃƒÂ¤rjestelmien kattava analyysi paljasti kriittiset puutteet saavutettavuustuessa.",

        // Testing and implementation
        userTesting: "Toteutus ja testaus",
        hifiProto: "Korkealaatuiset prototyypit",
        hifiProtoDesc: "Loimme interaktiivisia prototyyppejÃƒÂ¤ tÃƒÂ¤ydellÃƒÂ¤ saavutettavuustoteutuksella kÃƒÂ¤yttÃƒÂ¤jÃƒÂ¤testausta varten.",
        designReviews: "Suunnittelukatselmukset",
        designReviewsDesc: "Teimme perusteelliset saavutettavuusauditoinnit vammaisten kÃƒÂ¤yttÃƒÂ¤jien ja nÃƒÂ¤ytÃƒÂ¶nlukijan testauksen kanssa.",
        qa: "Laadunvarmistus",
        qaDesc: "Toteutimme automaattisen testausputken axe-coren kanssa jatkuvaa saavutettavuusseurantaa varten.",
        designDocs: "Suunnitteludokumentaatio",
        designDocsDesc: "Kattava dokumentaatio sisÃƒÂ¤ltÃƒÂ¤en saavutettavuusohjeet ja toteutusmallit.",

        // Impact and results
        impact: "Muuttava vaikutus",
        impactDesc: "Saavutettavuus-ensin lÃƒÂ¤hestymistapamme on muuttanut perusteellisesti tapaa, jolla tiimit ajattelevat inklusiivista suunnittelua, tuloksena tuotteita jotka toimivat kaikille.",

        learnMore: "Lue lisÃƒÂ¤ÃƒÂ¤",
        nextSection: "Seuraava osio"
      }
    };
    return content[locale as keyof typeof content] || content.en;
  };
  const content = getLocalizedContent();
  const colorThemes = [
    {
      name: content.lightTheme,
      preview: "bg-gradient-to-r from-ds-blue-50 to-[var(--gradient-end)]/5",
      contrast: "AAA"
    },
    {
      name: content.darkTheme,
      preview: "bg-[var(--background)]",
      contrast: "AAA"
    },
    {
      name: content.colorfulTheme,
      preview: "bg-gradient-to-r from-primary-500 to-ds-pink-500",
      contrast: "AAA"
    }
  ];

  const designSystemFeatures = [
    {
      title: content.colorSystemTitle,
      description: content.colorSystemDesc,
      
      gradient: "from-[var(--gradient-start)] to-[var(--gradient-end)]"
    },
    {
      title: content.inclusiveTypographyTitle,
      description: content.inclusiveTypographyDesc,
      
      gradient: "from-ds-emerald-600 to-ds-cyan-500"
    },
    {
      title: content.spacingTitle,
      description: content.spacingDesc,
      
      gradient: "from-primary to-ds-error"
    }
  ];


  return (
    <div className="min-h-screen transition-colors duration-300 bg-[var(--background)] text-[var(--foreground)]">
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
                label: locale === 'fi' ? 'Tarkastele suunnittelujÃƒÂ¤rjestelmÃƒÂ¤ÃƒÂ¤' : 'Design System',
                icon: 'design_services',
                variant: 'primary',
                href: 'https://ds.alux.space/',
              },
            ]}
            meta={[
              { label: content.projectType, value: content.projectTypeValues, icon: 'category' },
              { label: content.timeline, value: content.timelineValue, icon: 'schedule' },
              { label: content.standards, value: content.standardsValue, icon: 'rule' },
              { label: content.roles, value: content.rolesValue, icon: 'badge' },
            ]}
          />

          {/* Intro */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.enterSlow, delay: delaySeconds.md }}
          >
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto opacity-80 text-[var(--foreground)]`}>
              {content.intro}
            </p>
          </motion.div>

          <CaseStudySection title={content.overviewTab} icon="visibility" number={1} accent="blue">            <CaseStudyItem>
                  <h2 className={`text-3xl font-bold mt-16 mb-8 text-[var(--foreground)]`}>{content.objectivesTitle}</h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[{  text: content.objective1 },
                    {  text: content.objective2 },
                    {  text: content.objective3 },
                    {  text: content.objective4 },
                    {  text: content.objective5 }
                    ].map((objective, index) => (
                      <div key={index} className={`p-5 rounded-2xl bg-[var(--card-from-bg)]`}>
                        
                        <p className={`font-medium opacity-80 text-[var(--foreground)]`}>{objective.text}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mt-16 mb-6 text-[var(--foreground)]`}>{content.designProcess}</h2>

                  <div className={`p-6 rounded-2xl mb-6 bg-[var(--card-from-bg)]`}>                    <div className="flex items-center mb-6">
                      <span className={`text-sm font-medium mr-3 opacity-80 text-[var(--foreground)]`}>{content.designModel}</span>
                      <span className={`text-lg font-bold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent`}>
                        {content.doubleD}
                      </span>
                    </div>                      {/* Interactive Double Diamond */}
                    <div className="relative mb-10 overflow-hidden">
                      {/* Ambient background */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-[var(--primary-glow)] to-transparent blur-3xl`}></div>

                      <div className="relative">
                        {/* Phase labels */}
                        <div className="text-center mb-8">
                          <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border bg-[var(--card-from-bg)] border-[var(--card-border)]`}>
                            <span className={`text-xs font-medium text-[var(--primary)]`}>Problem Discovery</span>

                            <div className={`w-px h-4 bg-[var(--card-border)]`}></div>

                            <span className={`text-xs font-medium text-[var(--primary)]`}>Solution Creation</span>
                          </div>
                        </div>

                        {/* Interactive Phase Cards */}
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mx-auto px-4">
                          {[
                            {
                              phase: content.discoverPhase,
                              icon: 'search',
                              color: 'blue',
                              description: 'Research user needs, accessibility challenges, and current limitations in design systems.',
                              gradient: 'from-primary/20 to-primary/12'
                            },
                            {
                              phase: content.definePhase,
                              icon: 'target',
                              color: 'indigo',
                              description: 'Synthesize insights into clear accessibility requirements and design principles.',
                              gradient: 'from-primary-600/30 to-ds-indigo-800/20'
                            },
                            {
                              phase: content.developPhase,
                              icon: 'build',
                              color: 'pink',
                              description: 'Create accessible components, test with users, and iterate based on feedback.',
                              gradient: 'from-ds-pink-900/30 to-ds-pink-500/20'
                            },
                            {
                              phase: content.deliverPhase,
                              icon: 'rocket_launch',
                              color: 'green',
                              description: 'Launch the design system with comprehensive documentation and training.',
                              gradient: 'from-ds-emerald-600/30 to-ds-emerald-600/20'
                            }
                          ].map((phase, index) => (
                            <div
                              key={index}
                              className={`group relative p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${`bg-gradient-to-br ${phase.gradient} border-[var(--card-border)] hover:border-[var(--card-border)]/50`
                                }`}
                            >                              {/* Floating icon */}
                              <div className={`relative mb-4 ${index % 2 === 0 ? 'text-left' : 'text-right'
                                }`}>                                <div className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${phase.color === 'blue'
                                        ? 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)] shadow-lg'
                                        : phase.color === 'indigo'
                                          ? 'bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]/50 shadow-lg'
                                          : phase.color === 'pink'
                                            ? 'bg-gradient-to-br from-ds-pink-400 to-ds-pink-500 shadow-lg'
                                            : 'bg-gradient-to-br from-ds-emerald-400 to-ds-emerald-600 shadow-lg'
                                  } group-hover:scale-105 transition-transform duration-300`}>
                                  <span className="material-symbols text-2xl text-white">{phase.icon}</span>
                                  
                                </div>
                              </div>

                              {/* Phase title */}
                              <h3 className={`text-lg font-bold mb-2 ${`text-[var(--foreground)]`
                                }`}>
                                {phase.phase}
                              </h3>

                              {/* Description */}
                              <p className={`text-sm leading-relaxed opacity-80 text-[var(--foreground)]`}>
                                {phase.description}
                              </p>

                              {/* Connection indicator */}
                              {index < 3 && (
                                <div className={`hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-5 h-0.5 bg-gradient-to-r from-[var(--primary)] to-transparent opacity-30`}>
                                  <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--primary)]`}></div>
                                </div>
                              )}

                              {/* Hover glow effect */}
                              <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${`bg-gradient-to-br from-${phase.color}-400/10 to-transparent`
                                }`}></div>
                            </div>
                          ))}
                        </div>

                        {/* Methodology indicator */}
                        <div className="text-center mt-8">
                          <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full bg-[var(--card-from-bg)] border border-[var(--card-border)]`}>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full bg-[var(--primary)]`}></div>
                              <span className={`text-xs font-medium text-[var(--primary)]`}>Divergent</span>
                            </div>

                            <div className={`w-6 h-px bg-gradient-to-r from-[var(--primary)] to-ds-pink-400`}></div>

                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-medium text-[var(--primary)]`}>Convergent</span>
                              <div className={`w-2 h-2 rounded-full bg-ds-pink-500`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          <CaseStudySection title={content.researchTitle} icon="science" number={2} accent="green">
            <CaseStudyItem>
                  <div className={`p-6 rounded-2xl mb-6 bg-[var(--card-from-bg)]`}>
                    <h3 className={`text-lg font-bold mb-4 text-[var(--foreground)]`}>{content.participantFeedback}</h3>

                    <div className="grid md:grid-cols-4 gap-6 mb-6">
                      {[{ label: content.accessibilityValue, value: "92%",  },
                      { label: content.usabilityScore, value: "88%",  },
                      { label: content.inclusionApproval, value: "95%",  },
                      { label: content.complianceRating, value: "100%",  }
                      ].map((metric, index) => (
                        <div key={index} className="text-center">
                          
                          <div className={`text-2xl font-bold mb-1 text-[var(--foreground)]`}>
                            {metric.value}
                          </div>
                          <p className={`text-sm opacity-80 text-[var(--foreground)]`}>{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    <h3 className={`text-lg font-bold mb-4 text-[var(--foreground)]`}>{content.keyRecommendations}</h3>

                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          
                          title: content.enhancedAccessibility,
                          desc: content.enhancedAccessibilityDesc
                        },
                        {
                          
                          title: content.keyboardNavigation,
                          desc: content.keyboardNavigationDesc
                        },
                        {
                          
                          title: content.colorContrast,
                          desc: content.colorContrastDesc
                        }
                      ].map((item, index) => (
                        <div key={index} className={`p-4 rounded-2xl bg-[var(--card-from-bg)] border border-[var(--card-border)]`}>
                          
                          <h4 className={`font-semibold mb-2 text-[var(--foreground)]`}>{item.title}</h4>
                          <p className={`text-sm opacity-80 text-[var(--foreground)]`}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* User Personas */}
          <CaseStudySection title={locale === 'fi' ? "KÃƒÂ¤yttÃƒÂ¤jÃƒÂ¤persoonat" : "User Personas"} icon="groups" number={3} accent="pink">
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
                              {/* Name & Role */}
                              <div className="mb-5">
                                <h3 className="text-2xl font-bold text-[var(--primary)] tracking-tight leading-tight">{persona.name}</h3>
                                <p className="text-xs font-mono uppercase tracking-widest opacity-40 mt-1">{persona.role}</p>
                              </div>

                              {/* Traits Ã¢â‚¬â€ inline text, not pills */}
                              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-current/[0.06]">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ds-warning flex-shrink-0">Traits</span>
                                <span className="text-sm opacity-60">{persona.traits.join(' Ã‚Â· ')}</span>
                              </div>

                              {/* Detail columns Ã¢â‚¬â€ left-border accent, no boxes */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="border-l-2 border-ds-emerald-600/30 pl-4">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ds-success mb-3">Needs</h4>
                                  <ul className="space-y-1.5">
                                    {persona.needs.map((need, i) => (
                                      <li key={i} className="text-sm leading-relaxed opacity-70">{need}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="border-l-2 border-[var(--primary)]/30 pl-4">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--primary)] mb-3">Goals</h4>
                                  <ul className="space-y-1.5">
                                    {persona.goals.map((goal, i) => (
                                      <li key={i} className="text-sm leading-relaxed opacity-70">{goal}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="border-l-2 border-ds-pink-500/30 pl-4">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ds-pink-500 mb-3">Pain Points</h4>
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
                        
                        icon: "public",
                        title: content.requirement1,
                        desc: content.requirement1Desc,
                        gradient: "from-[var(--gradient-start)] to-[var(--color-cyan-500)]"
                      },
                      {
                        
                        icon: "code",
                        title: content.requirement2,
                        desc: content.requirement2Desc,
                        gradient: "from-primary-500 to-ds-pink-500"
                      },
                      {
                        
                        icon: "bug_report",
                        title: content.requirement3,
                        desc: content.requirement3Desc,
                        gradient: "from-ds-emerald-600 to-ds-emerald-600/50"
                      },
                      {
                        
                        icon: "translate",
                        title: content.requirement4,
                        desc: content.requirement4Desc,
                        gradient: "from-primary to-ds-error"
                      }
                    ].map((req, index) => (
                      <div key={index} className={`p-5 rounded-2xl bg-[var(--card-from-bg)]`}>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${req.gradient} flex items-center justify-center mb-3`}>
                            <span className="material-symbols text-white text-xl">{req.icon}</span>
                          </div>
                        <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{req.title}</h3>
                        <p className={`opacity-80 text-[var(--foreground)]`}>{req.desc}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mt-16 mb-6 text-[var(--foreground)]`}>{content.userTestingTitle}</h2>

                  <div className={`p-6 rounded-2xl mb-6 bg-[var(--card-from-bg)]`}>
                    <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{content.testScenario}</h3>

                    <div className={`p-4 rounded-lg mb-5 bg-[var(--card-from-bg)] border border-[var(--card-border)]`}>
                      <p className={`opacity-80 text-[var(--foreground)]`}>{content.testScenarioDesc}</p>
                    </div>

                    <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{content.focusAreas}</h3>

                    <div className="flex flex-wrap gap-3">
                      {[
                        {  label: content.usabilityFocus },
                        {  label: content.accessibilityFocus },
                        {  label: content.performanceFocus },
                        {  label: content.consistencyFocus }
                      ].map((area, index) => (
                        <div key={index} className={`px-4 py-2 rounded-full flex items-center space-x-2 bg-[var(--primary-glow)] text-[var(--primary)]`}>
                          
                          <span className="text-sm font-medium">{area.label}</span>
                        </div>
                      ))}                    </div>
                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          <CaseStudySection title={content.principlesTitle} icon="lightbulb" number={5} accent="purple">
            <CaseStudyItem>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl bg-ds-error/10 border border-ds-error/30`}>
                      <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{content.problemTitle}</h3>
                      <p className={`opacity-80 text-[var(--foreground)]`}>{content.problemDesc}</p>
                    </div>

                    <div className={`p-6 rounded-2xl bg-ds-success/10 border border-ds-success/30`}>
                      <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{content.solutionTitle}</h3>
                      <p className={`opacity-80 text-[var(--foreground)]`}>{content.solutionDesc}</p>
                    </div>
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mt-16 mb-6 text-[var(--foreground)]`}>{content.principlesTitle}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: content.principle1, desc: content.principle1Desc,  },
                      { title: content.principle2, desc: content.principle2Desc,  },
                      { title: content.principle3, desc: content.principle3Desc,  }
                    ].map((principle, index) => (
                      <div key={index} className={`p-6 rounded-2xl bg-[var(--card-from-bg)]`}>
                        
                        <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{principle.title}</h3>
                        <p className={`opacity-80 text-[var(--foreground)]`}>{principle.desc}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          <CaseStudySection title={content.systemTab} icon="design_services" number={6} accent="cyan">
            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mt-16 mb-6 text-[var(--foreground)]`}>{content.colorsTitle}</h2>
                  <p className={`text-base mb-6 opacity-80 text-[var(--foreground)]`}>{content.colorsDesc}</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {colorThemes.map((colorTheme, index) => (
                      <div key={index} className={`p-5 rounded-2xl bg-[var(--card-from-bg)]`}>
                        <div className={`h-24 rounded-lg mb-3 ${colorTheme.preview}`}></div>
                        <h3 className={`font-bold mb-2 text-[var(--foreground)]`}>{colorTheme.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-[var(--card-border)] text-[var(--foreground)]`}>
                          WCAG {colorTheme.contrast}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={`p-5 rounded-2xl bg-[var(--primary-glow)] border border-[var(--card-border)]`}>
                    
                    <p className={`text-[var(--accent-text)]`}>{content.contrastInfo}</p>
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mt-16 mb-6 text-[var(--foreground)]`}>{content.inclusiveTypographyTitle}</h2>
                  <p className={`text-base mb-6 opacity-80 text-[var(--foreground)]`}>{content.inclusiveTypographyDesc}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className={`p-6 rounded-2xl bg-[var(--card-from-bg)]`}>
                      <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{content.englishType}</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-3xl font-bold text-[var(--foreground)]`}>Heading Large</h4>
                          <p className="text-sm opacity-80 text-[var(--foreground)]">Font Size: 48px, Line Height: 1.2</p>
                        </div>
                        <div>
                          <h5 className={`text-xl font-semibold text-[var(--foreground)]`}>Heading Medium</h5>
                          <p className="text-sm opacity-80 text-[var(--foreground)]">Font Size: 24px, Line Height: 1.3</p>
                        </div>
                        <div>
                          <p className={`text-base opacity-80 text-[var(--foreground)]`}>Body text optimized for readability</p>
                          <p className="text-sm opacity-80 text-[var(--foreground)]">Font Size: 16px, Line Height: 1.6</p>
                        </div>
                      </div>
                    </div>
                    <div className={`p-6 rounded-2xl bg-[var(--card-from-bg)]`}>
                      <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{content.arabicType}</h3>
                      <div className="space-y-4" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                        <div>
                          <h4 className={`text-3xl font-bold text-[var(--foreground)]`}>Ã˜Â¹Ã™â€ Ã™Ë†Ã˜Â§Ã™â€  Ã™Æ’Ã˜Â¨Ã™Å Ã˜Â±</h4>
                          <p className="text-sm opacity-80 text-[var(--foreground)]" dir="ltr">Font: Tajawal, Size: 48px, Line Height: 1.4</p>
                        </div>
                        <div>
                          <h5 className={`text-xl font-semibold text-[var(--foreground)]`}>Ã˜Â¹Ã™â€ Ã™Ë†Ã˜Â§Ã™â€  Ã™â€¦Ã˜ÂªÃ™Ë†Ã˜Â³Ã˜Â·</h5>
                          <p className="text-sm opacity-80 text-[var(--foreground)]" dir="ltr">Font: Tajawal, Size: 24px, Line Height: 1.5</p>
                        </div>
                        <div>
                          <p className={`text-base opacity-80 text-[var(--foreground)]`}>Ã™â€ Ã˜Âµ Ã™â€¦Ã˜Â­Ã˜Â³Ã™â€  Ã™â€žÃ™â€žÃ™â€šÃ˜Â±Ã˜Â§Ã˜Â¡Ã˜Â© Ã™Ë†Ã˜Â§Ã™â€žÃ™Ë†Ã˜Â¶Ã™Ë†Ã˜Â­</p>
                          <p className="text-sm opacity-80 text-[var(--foreground)]" dir="ltr">Font: Tajawal, Size: 16px, Line Height: 1.7</p>
                        </div>
                      </div>
                      <div className={`mt-6 p-4 rounded-lg bg-primary/30 border border-primary-dark`}>
                        
                        <span className={`text-sm text-accent`}>{content.rtlSupport}</span>
                      </div>
                    </div>
                  </div>
            </CaseStudyItem>

            <CaseStudyItem>
                  <h2 className={`text-2xl font-bold mt-16 mb-6 text-[var(--foreground)]`}>Core System Features</h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    {designSystemFeatures.map((feature, index) => (
                      <div key={index} className={`p-6 rounded-2xl bg-[var(--card-from-bg)]`}>
                        
                        <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{feature.title}</h3>
                        <p className={`opacity-80 text-[var(--foreground)]`}>{feature.description}</p>
                      </div>
                    ))}
                  </div>
            </CaseStudyItem>
          </CaseStudySection>

          <CaseStudySection title={content.implementationTab} icon="code" number={7} accent="teal">
            <CaseStudyItem>
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className={`p-6 rounded-2xl bg-[var(--card-from-bg)]`}>
                      <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{content.headlessTitle}</h3>
                      <p className={`mb-4 opacity-80 text-[var(--foreground)]`}>{content.headlessDesc}</p>

                      <div className={`p-4 rounded-lg font-mono text-sm bg-[var(--background)]`}>                        <div className={`text-[var(--foreground)]`}>
                          <span className="text-primary-500">import</span> {`{ Menu }`} <span className="text-primary-500">from</span> <span className="text-ds-success">&apos;@headlessui/react&apos;</span><br />
                          <span className="text-primary-500">import</span> {`{ ChevronDownIcon }`} <span className="text-primary-500">from</span> <span className="text-ds-success">&apos;@heroicons/react/20/solid&apos;</span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl bg-[var(--card-from-bg)]`}>
                      <h3 className={`text-lg font-bold mb-3 text-[var(--foreground)]`}>{content.testingTitle}</h3>
                      <p className={`mb-4 opacity-80 text-[var(--foreground)]`}>{content.testingDesc}</p>

                      <div className={`p-4 rounded-lg font-mono text-sm bg-[var(--background)]`}>
                        <div className={`text-[var(--foreground)]`}>
                          <span className="text-[var(--primary)]">npm run</span> <span className="text-ds-success">test:a11y</span><br />
                          <span className="text-ds-gray-500"># Ã¢Å“â€¦ 0 accessibility violations found</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Standards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: content.semanticHtml,  desc: 'Proper HTML5 semantic structure' },
                      { title: content.ariaLabels,  desc: 'Complete ARIA implementation' },
                      { title: content.keyboardSupport,  desc: 'Full keyboard navigation' }
                    ].map((standard, index) => (
                      <div key={index} className={`p-5 rounded-2xl bg-[var(--card-from-bg)]`}>
                        
                        <h3 className={`font-bold mb-2 text-[var(--foreground)]`}>{standard.title}</h3>
                        <p className={`text-sm opacity-80 text-[var(--foreground)]`}>{standard.desc}</p>
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
