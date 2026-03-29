'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { durationSeconds, delaySeconds, stagger, easing, transition as t } from '@/design-system';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';

export default function HealthcarePrioritizationClient() {

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
        cardBg: isColorful ? 'bg-gradient-to-br from-[var(--color-indigo-400)]/15 to-[var(--color-indigo-500)]/15 border border-[var(--color-indigo-400)]/25' : '',
        iconText: isColorful ? 'text-[var(--color-indigo-400)]' : isLight ? 'text-accent' : 'text-accent',
        titleText: isColorful ? 'text-[var(--color-indigo-400)]' : '',
        iconBg: isColorful ? 'bg-[var(--color-indigo-400)]/15' : isLight ? 'bg-primary/10' : 'bg-primary/20',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-[var(--color-indigo-500)]/20 to-[var(--color-indigo-400)]/15 border border-[var(--color-indigo-400)]/25' : '',
        takeawayIconBg: isColorful ? 'bg-[var(--color-indigo-400)]/15 text-[var(--color-indigo-400)]' : '',
        borderColor: isColorful ? 'border-[var(--color-indigo-400)]/25' : ''
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
        cardBg: isColorful ? 'bg-gradient-to-br from-green-600/20 to-green-600/20 border border-green-400/30' : '',
        iconText: isColorful ? 'text-green-400' : isLight ? 'text-ds-success' : 'text-green-400',
        titleText: isColorful ? 'text-green-300' : '',
        iconBg: isColorful ? 'bg-green-600/20' : isLight ? 'bg-green-600/10' : 'bg-green-600/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border border-green-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-green-600/20 text-green-300' : '',
        borderColor: isColorful ? 'border-green-600/30' : ''
      },
      orange: {
        cardBg: isColorful ? 'bg-gradient-to-br from-[var(--color-ember)]/20 to-[var(--color-ember-dark)]/20 border border-[var(--color-ember-light)]/30' : '',
        iconText: isColorful ? 'text-[var(--color-ember-light)]' : isLight ? 'text-ds-ember' : 'text-[var(--color-ember-light)]',
        titleText: isColorful ? 'text-[var(--color-ember-light)]' : '',
        iconBg: isColorful ? 'bg-ds-ember/50/20' : isLight ? 'bg-ds-ember/10' : 'bg-ds-ember/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-[var(--color-ember)]/30 to-[var(--color-ember-dark)]/30 border border-[var(--color-ember-light)]/30' : '',
        takeawayIconBg: isColorful ? 'bg-ds-ember/50/20 text-[var(--color-ember-light)]' : '',
        borderColor: isColorful ? 'border-ds-ember/30' : ''
      },
      red: {
        cardBg: isColorful ? 'bg-gradient-to-br from-red-600/20 to-red-600/20 border border-red-400/30' : '',
        iconText: isColorful ? 'text-red-400' : isLight ? 'text-ds-error' : 'text-red-400',
        titleText: isColorful ? 'text-red-300' : '',
        iconBg: isColorful ? 'bg-red-600/20' : isLight ? 'bg-red-600/10' : 'bg-red-600/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-red-900/30 to-red-800/30 border border-red-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-red-600/20 text-red-300' : '',
        borderColor: isColorful ? 'border-red-600/30' : ''
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
        cardBg: isColorful ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-500/20 border border-cyan-400/30' : '',
        iconText: isColorful ? 'text-cyan-400' : isLight ? 'text-cyan-500' : 'text-cyan-400',
        titleText: isColorful ? 'text-cyan-400' : '',
        iconBg: isColorful ? 'bg-cyan-400/50/20' : isLight ? 'bg-cyan-400/10' : 'bg-cyan-500/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-cyan-500/30 to-cyan-500/30 border border-cyan-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-cyan-400/50/20 text-cyan-400' : '',
        borderColor: isColorful ? 'border-cyan-500/30' : ''
      },
      gray: {
        cardBg: isColorful ? 'bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-400/30' : '',
        iconText: isColorful ? 'text-gray-400' : isLight ? 'text-gray-600' : 'text-gray-400',
        titleText: isColorful ? 'text-gray-300' : '',
        iconBg: isColorful ? 'bg-gray-500/20' : isLight ? 'bg-gray-100' : 'bg-gray-900/40',
        takeawayBg: isColorful ? 'bg-gradient-to-br from-gray-900/30 to-gray-800/30 border border-gray-400/30' : '',
        takeawayIconBg: isColorful ? 'bg-gray-500/20 text-gray-300' : '',
        borderColor: isColorful ? 'border-gray-500/30' : ''
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
        priority2: "Nurse UX (Critical)",
        priority2Desc: "Improving alert visibility to ensure clinical awareness.",
        priority3: "Strategic Growth (Medium)",
        priority3Desc: "HL7/FHIR export features—valuable but scoped for dedicated capacity.",
        priority4: "Marketing Analytics (Low)",
        priority4Desc: "Push notification stats—valuable for growth, but safe to defer.",
        priority5: "Automated Urgent Messages (Rejected)",
        priority5Desc: "High clinical risk and lack of medical oversight.",

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
        preventionDesc: "To permanently resolve the friction between speed and safety, we re-engineered our delivery process.",
        preventionStep1: "Shift-Left Compliance",
        preventionStep1Desc: "Integrated QA verification requirements into the user story 'Definition of Ready'. We moved compliance checks to the grooming phase, preventing documentation debt from accumulating.",
        shiftLeftInfo: "Shift-Left Concept: Moving critical testing and compliance activities earlier in the development lifecycle (to the 'left') rather than waiting for the final validation phase.",
        preventionStep2: "Unified Release Protocol",
        preventionStep2Desc: "Established a formal 'Go/No-Go' council where Product, Engineering, and QA leads must unanimously review evidence 48h before release.",

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
        priority2: "Hoitaja-UX (Kriittinen)",
        priority2Desc: "Hälytysten näkyvyyden parantaminen kliinisen tietoisuuden varmistamiseksi.",
        priority3: "Strateginen kasvu (Keskitaso)",
        priority3Desc: "HL7/FHIR-vientitoiminnot – arvokkaita, mutta vaativat oman resursoinnin.",
        priority4: "Markkinointianalytiikka (Matala)",
        priority4Desc: "Push-ilmoitustilastot – arvokkaita kasvulle, mutta voidaan lykätä.",
        priority5: "Automaattiset viestit (Hylätty)",
        priority5Desc: "Korkea kliininen riski ja valvonnan puute.",

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
        preventionDesc: "Ratkaistaksemme pysyvästi nopeuden ja turvallisuuden välisen ristiriidan, suunnittelimme toimitusprosessimme uudelleen.",
        preventionStep1: "Laadunvarmistuksen aikaistaminen",
        preventionStep1Desc: "Integroimme QA-vaatimukset käyttäjätarinoiden 'Definition of Ready' -määritelmään. Siirsimme tarkistukset grooming-vaiheeseen, estäen dokumentaatiovelan kertymisen.",
        shiftLeftInfo: "Shift-Left -käsite: Kriittisten testaus- ja vaatimustenmukaisuustoimien siirtäminen kehityskaaren aikaisempaan vaiheeseen ('vasemmalle') sen sijaan, että odotettaisiin lopputarkistuksia.",
        preventionStep2: "Yhtenäistetty julkaisukäytäntö",
        preventionStep2Desc: "Perustimme virallisen 'Go/No-Go' -neuvoston, jossa Tuote-, Tekniikka- ja QA-johdon on hyväksyttävä julkaisu 48h etukäteen.",

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isColorful
        ? 'bg-[var(--color-colorful-bg)]'
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
            subtitle={content.subtitle}
            image="/images/portfolio/healthcare/healthcare.jpg"
            tags={[content.rolesValue]}
            actions={[
              {
                label: locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'Design System',
                icon: 'design_services',
                href: 'https://ds.alux.space/',
                variant: 'secondary',
              },
            ]}
            meta={[
              { label: content.projectType, value: content.projectTypeValues, icon: 'assignment' },
              { label: content.timeline, value: content.timelineValue, icon: 'schedule' },
              { label: content.tools, value: content.toolsValue, icon: 'build' },
              { label: content.standards, value: content.standardsValue, icon: 'gavel' },
            ]}
          />

          {/* Intro Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.enterSlow, delay: delaySeconds.md }}
          >
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
              }`}>
              {content.intro}
            </p>
          </motion.div>

          {/* Case Study Sections */}
          <CaseStudySection title={content.overviewTab} icon="visibility" accent="blue" number={1}>
                {/* Context & Conflict Row */}
                <div className="grid md:grid-cols-2 gap-8 mb-14">
                  {[
                    { title: content.contextTitle, desc: content.contextDesc, colorful: 'bg-gradient-to-br from-[var(--color-indigo-400)]/15 to-cyan-900/20 border border-[var(--color-indigo-400)]/20', light: 'bg-white shadow-sm', dark: 'bg-gray-800/60 border border-gray-700/30', titleColor: isColorful ? 'text-[var(--color-indigo-400)]' : isLight ? 'text-gray-900' : 'text-white', extra: null },
                    { title: content.conflictTitle, desc: content.conflictDesc, colorful: 'bg-gradient-to-br from-red-900/20 to-[var(--color-ember)]/20 border border-red-400/20', light: 'bg-white shadow-sm', dark: 'bg-gray-800/60 border border-gray-700/30', titleColor: isColorful ? 'text-red-300' : isLight ? 'text-gray-900' : 'text-white', extra: 'conflict' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ ...t.enter, delay: i * stagger.relaxed }}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-2xl transition-shadow duration-300 ${isColorful ? card.colorful : isLight ? card.light : card.dark}`}
                    >
                      <h3 className={`text-xl font-semibold mb-3 ${card.titleColor}`}>{card.title}</h3>
                      {card.extra === 'conflict' && (
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`px-4 py-2 rounded-lg font-bold ${isLight ? 'bg-red-600/10 text-red-700' : 'bg-red-600/40 text-red-300'}`}>QA Team</div>
                          <span className="font-bold text-xl">VS</span>
                          <div className={`px-4 py-2 rounded-lg font-bold ${isLight ? 'bg-primary/10 text-accent' : 'bg-primary/20 text-accent'}`}>CTO</div>
                        </div>
                      )}
                      <p className={`leading-relaxed ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'}`}>{card.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Priorities Section */}
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.enterSlow, delay: delaySeconds.md }}
                >
                  <h2 className={`text-xl font-semibold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.prioritiesTitle}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        id: "HC-134",
                        title: content.priority1,
                        desc: content.priority1Desc,
                        priorityIcon: "keyboard_double_arrow_up",
                        typeIcon: "bug_report",
                        color: "red",
                        status: "Active"
                      },
                      {
                        id: "HC-142",
                        title: content.priority2,
                        desc: content.priority2Desc,
                        priorityIcon: "keyboard_double_arrow_up",
                        typeIcon: "check_box",
                        color: "red",
                        status: "Active"
                      },
                      {
                        id: "HC-156",
                        title: content.priority3,
                        desc: content.priority3Desc,
                        priorityIcon: "drag_handle",
                        typeIcon: "bookmark",
                        color: "yellow",
                        status: "Backlog"
                      },
                      {
                        id: "HC-161",
                        title: content.priority4,
                        desc: content.priority4Desc,
                        priorityIcon: "keyboard_arrow_down",
                        typeIcon: "bookmark",
                        color: "blue",
                        status: "Backlog"
                      },
                      {
                        id: "HC-168",
                        title: content.priority5,
                        desc: content.priority5Desc,
                        priorityIcon: "block",
                        typeIcon: "dangerous",
                        color: "gray",
                        status: "Rejected"
                      },
                    ].map((item, index) => {
                      const styles = getColorStyles(item.color);
                      // Extract just the color part for border-l (e.g., border-red-500)
                      // A bit hacky but works given the consistent naming in getColorStyles if we look at iconText 'text-red-400' etc.
                      // Better to hardcode the border-l class based on color prop since dynamic literals don't work well
                      const borderLeftClass = {
                        red: 'border-l-red-600',
                        orange: 'border-l-[var(--color-ember)]',
                        yellow: 'border-l-yellow-500',
                        blue: 'border-l-blue-500',
                        gray: 'border-l-gray-500',
                        purple: 'border-l-purple-500',
                        green: 'border-l-green-600',
                        teal: 'border-l-cyan-500'
                      }[item.color] || 'border-l-gray-500';

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{ duration: durationSeconds.ease, delay: index * stagger.normal, ease: easing.out.array }}
                          whileHover={{ y: -3 }}
                          className={`p-4 rounded-lg flex flex-col gap-3 border-l-4 transition-shadow duration-300 hover:shadow-md ${borderLeftClass
                          } ${isColorful
                            ? 'bg-gray-800/80 backdrop-blur-sm border-y border-r border-white/10'
                            : isLight ? 'bg-white border-y border-r border-gray-100 shadow-sm' : 'bg-gray-800 border-y border-r border-gray-700'
                          }`}>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className={`material-symbols text-lg ${styles.iconText}`}>{item.typeIcon}</span>
                              <span className={`text-xs font-mono font-medium ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{item.id}</span>
                            </div>
                            <div className={`flex items-center justify-center w-6 h-6 rounded ${isLight ? 'bg-gray-100' : 'bg-gray-700'}`}>
                              <span className={`material-symbols text-lg ${styles.iconText}`}>{item.priorityIcon}</span>
                            </div>
                          </div>

                          <div>
                            <h4 className={`text-sm font-bold mb-1 leading-tight ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h4>
                            <p className={`text-xs ${isColorful ? 'text-gray-400' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>{item.desc}</p>
                          </div>

                          <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-500/10">
                            <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${item.status === 'Rejected'
                                ? (isLight ? 'bg-gray-100 text-gray-600' : 'bg-gray-700 text-gray-300')
                                : item.status === 'Backlog'
                                  ? (isLight ? 'bg-amber-600/5 text-ds-warning' : 'bg-amber-600/20 text-amber-400')
                                : (isLight ? 'bg-primary/5 text-accent' : 'bg-primary/15 text-accent')
                              }`}>
                              {item.status}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>

                {/* Decision Framework / Rejection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={t.enter}
                  className={`p-6 rounded-2xl ${isColorful
                    ? 'bg-gradient-to-br from-purple-900/15 to-pink-900/15 border border-purple-400/15'
                    : isLight ? 'bg-gray-50/80 border border-gray-200/60' : 'bg-gray-800/40 border border-gray-700/30'
                  }`}>
                  <div className="flex items-start gap-3">
                    <span className={`material-symbols text-2xl ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>filter_alt_off</span>
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white'
                        }`}>{content.decisionTitle}</h3>
                      <p className={`${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                        }`}>{content.decisionDesc}</p>
                    </div>
                  </div>
                </motion.div>
          </CaseStudySection>

          {/* Resolution Process Section */}
          <CaseStudySection title={content.processTab} icon="handshake" accent="green" number={2}>
                {/* Resolution Process */}
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.enterSlow, delay: delaySeconds.md }}
                >
                  <h2 className={`text-xl font-semibold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-indigo-400)] to-cyan-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.resolutionTitle}</h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {[
                      { icon: 'handshake', color: isColorful ? 'bg-green-600/50/15 text-green-400' : isLight ? 'bg-green-600/5 text-ds-success' : 'bg-green-900/30 text-green-400', title: content.resolutionStep1, desc: content.resolutionStep1Desc },
                      { icon: 'lightbulb', color: isColorful ? 'bg-[var(--color-indigo-400)]/15 text-[var(--color-indigo-400)]' : isLight ? 'bg-primary/5 text-accent' : 'bg-primary/15 text-accent', title: content.resolutionStep2, desc: content.resolutionStep2Desc },
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ ...t.enter, delay: i * stagger.relaxed }}
                        className="flex items-start gap-4"
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${step.color}`}>
                          <span className="material-symbols text-lg">{step.icon}</span>
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{step.title}</h3>
                          <p className={`leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className={`p-6 rounded-2xl ${isColorful
                      ? 'bg-gradient-to-br from-primary/5 to-[var(--gradient-mid)]/5 border border-[var(--primary)]/12'
                      : isLight ? 'bg-blue-50/60' : 'bg-primary/5'
                    }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isLight ? 'text-gray-900' : 'text-white'}`}>{content.actionsTitle}</h3>
                    <div className="space-y-4">
                      {[content.action1, content.action2, content.action3].map((action, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{ duration: durationSeconds.ease, delay: i * stagger.normal, ease: easing.out.array }}
                          className="flex items-start gap-3"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold">{i + 1}</span>
                          <p className={`${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{action}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* Prevention Strategy */}
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.enterSlow, delay: delaySeconds.lg }}
                >
                  <h2 className={`text-xl font-semibold mb-6 ${isColorful
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400'
                      : isLight ? 'text-gray-900' : 'text-white'
                    }`}>{content.preventionTitle}</h2>
                  <p className={`text-base mb-10 max-w-3xl ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{content.preventionDesc}</p>

                  <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* Connecting Arrow for Desktop */}
                    <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center z-10 ${isColorful ? 'bg-purple-500/15 text-purple-300' : isLight ? 'bg-white shadow-sm text-gray-400' : 'bg-gray-700/80 text-gray-300'
                      }`}>
                      <span className="material-symbols text-lg">arrow_forward</span>
                    </div>

                    {/* Step 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={t.enter}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-2xl relative border transition-shadow duration-300 ${isColorful
                        ? 'bg-gradient-to-br from-indigo-600/20 to-purple-900/20 border-indigo-400/20'
                        : isLight ? 'bg-white shadow-sm hover:shadow-md border-gray-100' : 'bg-gray-800/60 border-gray-700/30'
                      }`}>
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 text-xl ${isColorful ? 'bg-indigo-400/50/20 text-indigo-400' : isLight ? 'bg-indigo-400/5 text-indigo-600' : 'bg-indigo-600/40 text-indigo-400'
                        }`}>
                        <span className="material-symbols">fact_check</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <h4 className={`text-lg font-semibold ${isColorful ? 'text-indigo-400' : isLight ? 'text-gray-900' : 'text-white'}`}>
                          {content.preventionStep1}
                        </h4>
                        <div className="relative group/info">
                          <span className={`material-symbols text-lg cursor-help transition-colors ${isColorful ? 'text-indigo-400 hover:text-indigo-400' : isLight ? 'text-indigo-400 hover:text-indigo-600' : 'text-indigo-400 hover:text-indigo-400'
                            }`}>info</span>

                          {/* Tooltip */}
                          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3 rounded-lg text-xs shadow-xl opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-50 ${isColorful ? 'bg-indigo-600 text-indigo-400 border border-indigo-500/30' : isLight ? 'bg-gray-900 text-white' : 'bg-gray-700 text-gray-100'
                            }`}>
                            {content.shiftLeftInfo}
                            {/* Arrow */}
                            <div className={`absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent ${isColorful ? 'border-t-indigo-950' : isLight ? 'border-t-gray-900' : 'border-t-gray-700'
                              }`}></div>
                          </div>
                        </div>
                      </div>

                      <p className={`${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>{content.preventionStep1Desc}</p>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ ...t.enter, delay: stagger.relaxed }}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-2xl relative border transition-shadow duration-300 ${isColorful
                        ? 'bg-gradient-to-br from-pink-500/20 to-pink-500/20 border-pink-400/20'
                        : isLight ? 'bg-white shadow-sm hover:shadow-md border-gray-100' : 'bg-gray-800/60 border-gray-700/30'
                      }`}>
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 text-xl ${isColorful ? 'bg-pink-500/20 text-pink-300' : isLight ? 'bg-pink-50 text-pink-600' : 'bg-pink-900/40 text-pink-300'
                        }`}>
                        <span className="material-symbols">gavel</span>
                      </div>
                      <h4 className={`text-lg font-semibold mb-2 ${isColorful ? 'text-pink-200' : isLight ? 'text-gray-900' : 'text-white'}`}>{content.preventionStep2}</h4>
                      <p className={`${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>{content.preventionStep2Desc}</p>
                    </motion.div>
                  </div>
                </motion.section>
            </CaseStudySection>

          {/* Outcomes Section */}
          <CaseStudySection title={content.impactTab} icon="lightbulb" accent="teal" number={3}>
                {/* Takeaways */}
                <div className="grid md:grid-cols-3 gap-8 mb-14">
                  {[
                    { title: content.takeaway1, desc: content.takeaway1Desc, icon: "ads_click", color: "blue" },
                    { title: content.takeaway2, desc: content.takeaway2Desc, icon: "balance", color: "purple" },
                    { title: content.takeaway3, desc: content.takeaway3Desc, icon: "groups", color: "teal" },
                  ].map((item, index) => {
                    const styles = getColorStyles(item.color);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ ...t.enter, delay: index * stagger.slow }}
                        whileHover={{ y: -5 }}
                        className={`p-6 rounded-2xl text-center transition-shadow duration-300 ${isColorful
                          ? styles.takeawayBg
                          : isLight ? 'bg-white shadow-sm hover:shadow-md' : 'bg-gray-800/60 border border-gray-700/30'
                        }`}
                      >
                        <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3 ${isColorful ? styles.takeawayIconBg : isLight ? `${styles.iconBg} ${styles.iconText}` : `${styles.iconBg} ${styles.iconText}`
                          }`}>
                          <span className="material-symbols text-xl">{item.icon}</span>
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                        <p className={`${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{item.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={t.enterSlow}
                  className="text-center max-w-2xl mx-auto pt-10"
                >
                  <div className={`mx-auto w-px h-12 mb-8 ${isColorful ? 'bg-gradient-to-b from-transparent via-purple-400/40 to-transparent' : isLight ? 'bg-gray-200' : 'bg-gray-700/60'}`} />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...t.enter, delay: delaySeconds.sm }}
                    className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-5 ${isColorful ? 'bg-purple-500/15 text-purple-300' : isLight ? 'bg-primary/5 text-accent' : 'bg-primary/15 text-accent'}`}
                  >
                    <span className="material-symbols text-xl">star</span>
                  </motion.div>
                  <h2 className={`text-xl font-semibold mb-3 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-indigo-400)] via-purple-300 to-cyan-400' : isLight ? 'text-gray-900' : 'text-white'}`}>{content.summaryTitle}</h2>
                  <p className={`text-lg leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-500' : 'text-gray-400'}`}>{content.summaryDesc}</p>
                </motion.div>
              </CaseStudySection>
        </div>
      </main>
    </div>
  );
}
