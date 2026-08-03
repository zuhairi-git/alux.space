'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { delaySeconds, Icon, stagger, transition as t } from '@/design-system';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection, { CaseStudyItem } from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

export default function AccessibilityClient() {
  // Tajawal is self-hosted by next/font in the root layout and exposed as
  // --font-tajawal — no runtime <link> injection needed.
  const { locale } = useLanguage();

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
        intro: "Rakennamme inklusiivisten digitaalisten tuotteiden tulevaisuutta tutkimuksesta toteutukseen. Tämä järjestelmä voimistaa miljoonien käyttäjien sovelluksia varmistaen, että ketään ei jätetä jälkeen.",
        projectType: "Projektityyppi",
        projectTypeValues: "Skaalautuva suunnittelujärjestelmä",
        timeline: "Aikataulu",
        timelineValue: "6 kuukautta (jatkuva)",
        tools: "Työkalut & teknologiat",
        toolsValue: "Figma, React, Tailwind CSS, Headless UI, axe DevTools",
        standards: "Vaatimustenmukaisuus",
        standardsValue: "WCAG 2.2 AAA, ARIA 1.2",
        roles: "Roolini",
        rolesValue: "Suunnittelujärjestelmän johtaja & saavutettavuusasiantuntija",

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
                label: locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'Design System',
                icon: 'design_services',
                variant: 'primary',
                href: '/design/',
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
                      <span className={`text-sm font-medium me-3 opacity-80 text-[var(--foreground)]`}>{content.designModel}</span>
                      <span className={`text-lg font-bold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent`}>
                        {content.doubleD}
                      </span>
                    </div>                      {/* Interactive Double Diamond */}
                    <div className="mb-8">
                      <div className="relative rounded-[1.75rem] border border-[var(--card-border)] bg-[var(--background)]/30 px-4 py-5 sm:px-5">
                        <div className="text-center mb-8">
                          <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border bg-[var(--card-from-bg)] border-[var(--card-border)]`}>
                            <span className={`text-xs font-medium text-[var(--primary)]`}>Problem Discovery</span>

                            <div className={`w-px h-4 bg-[var(--card-border)]`}></div>

                            <span className={`text-xs font-medium text-[var(--primary)]`}>Solution Creation</span>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mx-auto">
                          {[
                            {
                              phase: content.discoverPhase,
                              icon: 'search',
                              description: 'Research user needs, accessibility challenges, and current limitations in design systems.',
                              surface: 'linear-gradient(180deg, color-mix(in srgb, var(--primary) 12%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 92%, transparent) 100%)',
                              iconSurface: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-500) 100%)',
                            },
                            {
                              phase: content.definePhase,
                              icon: 'target',
                              description: 'Synthesize insights into clear accessibility requirements and design principles.',
                              surface: 'linear-gradient(180deg, color-mix(in srgb, var(--gradient-start) 14%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 92%, transparent) 100%)',
                              iconSurface: 'linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-mid) 100%)',
                            },
                            {
                              phase: content.developPhase,
                              icon: 'build',
                              description: 'Create accessible components, test with users, and iterate based on feedback.',
                              surface: 'linear-gradient(180deg, color-mix(in srgb, var(--gradient-mid) 14%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 92%, transparent) 100%)',
                              iconSurface: 'linear-gradient(135deg, var(--gradient-mid) 0%, var(--gradient-end) 100%)',
                            },
                            {
                              phase: content.deliverPhase,
                              icon: 'rocket_launch',
                              description: 'Launch the design system with comprehensive documentation and training.',
                              surface: 'linear-gradient(180deg, color-mix(in srgb, var(--gradient-end) 14%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 92%, transparent) 100%)',
                              iconSurface: 'linear-gradient(135deg, var(--gradient-end) 0%, var(--primary) 100%)',
                            }
                          ].map((phase, index) => (
                            <div
                              key={index}
                              className="group relative p-5 rounded-2xl border border-[var(--card-border)] transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer"
                              style={{ backgroundImage: phase.surface }}
                            >
                              <div className={`relative mb-4 ${index % 2 === 0 ? 'text-start' : 'text-end'}`}>
                                <div
                                  className="inline-flex w-11 h-11 items-center justify-center rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300"
                                  style={{ backgroundImage: phase.iconSurface, boxShadow: '0 12px 28px -18px color-mix(in srgb, var(--primary) 45%, transparent)' }}
                                >
                                  <Icon name={phase.icon} size="lg" className="text-white" />
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
                                <div className={`hidden lg:block absolute -end-3 top-1/2 transform -translate-y-1/2 w-5 h-0.5 bg-gradient-to-r from-[var(--primary)] to-transparent opacity-30`}>
                                  <div className={`absolute end-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--primary)]`}></div>
                                </div>
                              )}
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

                              {/* Traits — inline text, not pills */}
                              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-current/[0.06]">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-ds-warning flex-shrink-0">Traits</span>
                                <span className="text-sm opacity-60">{persona.traits.join(' · ')}</span>
                              </div>

                              {/* Detail columns — inline-start border accent, no boxes */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="border-s-2 border-ds-emerald-600/30 ps-4">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-ds-success mb-3">Needs</h4>
                                  <ul className="space-y-1.5">
                                    {persona.needs.map((need, i) => (
                                      <li key={i} className="text-sm leading-relaxed opacity-70">{need}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="border-s-2 border-[var(--primary)]/30 ps-4">
                                  <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--primary)] mb-3">Goals</h4>
                                  <ul className="space-y-1.5">
                                    {persona.goals.map((goal, i) => (
                                      <li key={i} className="text-sm leading-relaxed opacity-70">{goal}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="border-s-2 border-ds-pink-500/30 ps-4">
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
                            <MaterialSymbol className="text-white text-xl">{req.icon}</MaterialSymbol>
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
                          <span className="text-ds-gray-500"># ✓ 0 accessibility violations found</span>
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
