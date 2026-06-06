'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { durationSeconds, delaySeconds, stagger, easing, transition as t } from '@/design-system';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

export default function HealthcarePrioritizationClient() {
  const { locale } = useLanguage();

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
        contextTitle: "The Context",
        contextDesc: "In a healthcare SaaS platform supporting nurses and doctors, prioritization isn't just about business value—it's about patient safety. We faced a critical backlog containing a mix of safety issues, UX improvements, and strategic integrations.",
        conflictTitle: "The Conflict",
        conflictDesc: "A critical release standoff occurred: QA demanded a delay due to incomplete verification documentation, while the CTO pushed for release to maintain schedule commitments.",

        // Priorities
        prioritiesTitle: "Strategic Prioritization",
        priority1: "Patient Safety",
        priority1Desc: "Fixing data-sync failures impacting 2% of appointments. Non-negotiable.",
        priority2: "Nurse UX",
        priority2Desc: "Improving alert visibility to ensure clinical awareness.",
        priority3: "Strategic Growth",
        priority3Desc: "HL7/FHIR export features—valuable but scoped for dedicated capacity.",
        priority4: "Marketing Analytics",
        priority4Desc: "Push notification stats—valuable for growth, but safe to defer.",
        priority5: "Automated Urgent Messages",
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
    <div className="min-h-screen transition-colors duration-300 bg-[var(--background)] text-[var(--foreground)]">
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
                href: '/design/',
                variant: 'secondary',
              },
            ]}
            meta={[
              { label: content.projectType, value: content.projectTypeValues, icon: 'category' },
              { label: content.timeline, value: content.timelineValue, icon: 'schedule' },
              { label: content.tools, value: content.toolsValue, icon: 'build' },
              { label: content.standards, value: content.standardsValue, icon: 'rule' },
            ]}
          />

          {/* Intro Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.enterSlow, delay: delaySeconds.md }}
          >
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-[var(--foreground)] opacity-80">
              {content.intro}
            </p>
          </motion.div>

          {/* Case Study Sections */}
          <CaseStudySection title={content.overviewTab} number={1}>
                {/* Context & Conflict Row */}
                <div className="grid md:grid-cols-2 gap-8 mb-14">
                  {[
                    { title: content.contextTitle, desc: content.contextDesc, extra: null },
                    { title: content.conflictTitle, desc: content.conflictDesc, extra: 'conflict' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ ...t.enter, delay: i * stagger.relaxed }}
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-2xl transition-all duration-300 bg-[var(--card-from-bg)] border border-[var(--card-border)] hover:border-[var(--primary)] shadow-[0_4px_24px_var(--card-shadow-color)]"
                    >
                      <h3 className="text-xl font-semibold mb-3 text-[var(--primary)]">{card.title}</h3>
                      {card.extra === 'conflict' && (
                        <div className="flex items-center gap-4 mb-4">
                          <div className="px-4 py-2 rounded-lg font-bold bg-ds-error/10 text-ds-error">QA Team</div>
                          <span className="font-bold text-xl opacity-50">VS</span>
                          <div className="px-4 py-2 rounded-lg font-bold bg-[var(--primary-glow)] text-[var(--primary)]">CTO</div>
                        </div>
                      )}
                      <p className="leading-relaxed opacity-90">{card.desc}</p>
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
                  <h2 className="text-xl font-semibold mb-6 text-[var(--primary)]">{content.prioritiesTitle}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { id: "HC-134", title: content.priority1, desc: content.priority1Desc, status: "Active", priorityLevel: "Critical" },
                      { id: "HC-142", title: content.priority2, desc: content.priority2Desc, status: "Active", priorityLevel: "Critical" },
                      { id: "HC-156", title: content.priority3, desc: content.priority3Desc, status: "Backlog", priorityLevel: "Medium" },
                      { id: "HC-161", title: content.priority4, desc: content.priority4Desc, status: "Backlog", priorityLevel: "Low" },
                      { id: "HC-168", title: content.priority5, desc: content.priority5Desc, status: "Rejected", priorityLevel: "Rejected" },
                    ].map((item, index) => {
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-20px' }}
                          transition={{ duration: durationSeconds.ease, delay: index * stagger.normal, ease: easing.out.array }}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="p-5 rounded-xl flex flex-col gap-3 transition-all duration-300 hover:shadow-lg bg-[var(--card-from-bg)] border border-[var(--card-border)] hover:border-[var(--primary)]/30"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                                <MaterialSymbol className="text-[14px] opacity-60">sell</MaterialSymbol>
                                <span className="text-xs font-mono font-medium opacity-60">{item.id}</span>
                            </div>
                            <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full ${
                                item.priorityLevel === 'Critical' ? 'bg-ds-error/10 text-ds-error border border-ds-error/20' : 
                                item.priorityLevel === 'Medium' ? 'bg-ds-warning/10 text-ds-warning border border-ds-warning/20' : 
                                item.priorityLevel === 'Low' ? 'bg-ds-success/10 text-ds-success border border-ds-success/20' : 
                                'bg-[var(--card-border)]/50 text-[var(--muted-foreground)] border border-[var(--card-border)]'
                            }`}>{item.priorityLevel}</span>
                          </div>

                          <div>
                            <h4 className="text-base font-bold mb-2 leading-tight text-[var(--foreground)]">{item.title}</h4>
                            <p className="text-sm opacity-70 leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
                          </div>

                          <div className="mt-auto pt-3 flex items-center justify-between border-t border-[var(--card-border)]/50">
                            <div className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
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
                  className="p-6 rounded-2xl bg-[var(--card-from-bg)] border border-[var(--card-border)]"
                >
                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">{content.decisionTitle}</h3>
                      <p className="opacity-90">{content.decisionDesc}</p>
                    </div>
                  </div>
                </motion.div>
          </CaseStudySection>

          {/* Resolution Process Section */}
          <CaseStudySection title={content.processTab} number={2}>
                {/* Resolution Process */}
                <motion.section
                  className="mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...t.enterSlow, delay: delaySeconds.md }}
                >
                  <h2 className="text-xl font-semibold mb-6 text-[var(--primary)]">{content.resolutionTitle}</h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {[
                      { title: content.resolutionStep1, desc: content.resolutionStep1Desc },
                      { title: content.resolutionStep2, desc: content.resolutionStep2Desc },
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ ...t.enter, delay: i * stagger.relaxed }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--primary-glow)] text-[var(--primary)] font-bold shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                          <p className="leading-relaxed opacity-80">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-[var(--card-from-bg)] border border-[var(--card-border)]">
                    <h3 className="text-lg font-semibold mb-4 text-[var(--primary)]">{content.actionsTitle}</h3>
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
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--foreground)] text-sm font-bold">✓</span>
                          <p className="opacity-90">{action}</p>
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
                  <h2 className="text-xl font-semibold mb-6 text-[var(--primary)]">{content.preventionTitle}</h2>
                  <p className="text-base mb-10 max-w-3xl opacity-80">{content.preventionDesc}</p>

                  <div className="grid md:grid-cols-2 gap-8 relative">
                    {/* Connecting Arrow for Desktop */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center z-10 bg-[var(--card-from-bg)] border border-[var(--primary)] text-[var(--primary)]">
                      <span className="opacity-80">→</span>
                    </div>

                    {/* Step 1 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={t.enter}
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-2xl relative border transition-shadow duration-300 bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-[var(--primary)]">
                          {content.preventionStep1}
                        </h4>
                      </div>
                      
                      <div className="mb-4 text-sm p-3 rounded bg-[var(--background)] border border-[var(--card-border)] opacity-80 italic">
                        {content.shiftLeftInfo}
                      </div>

                      <p className="opacity-90">{content.preventionStep1Desc}</p>
                    </motion.div>

                    {/* Step 2 */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ ...t.enter, delay: stagger.relaxed }}
                      whileHover={{ y: -4 }}
                      className="p-6 rounded-2xl relative border transition-shadow duration-300 bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)]"
                    >
                      <h4 className="text-lg font-semibold mb-3 text-[var(--primary)]">{content.preventionStep2}</h4>
                      <p className="opacity-90">{content.preventionStep2Desc}</p>
                    </motion.div>
                  </div>
                </motion.section>
            </CaseStudySection>

          {/* Outcomes Section */}
          <CaseStudySection title={content.impactTab} number={3}>
                {/* Takeaways */}
                <div className="grid md:grid-cols-3 gap-8 mb-14">
                  {[
                    { title: content.takeaway1, desc: content.takeaway1Desc },
                    { title: content.takeaway2, desc: content.takeaway2Desc },
                    { title: content.takeaway3, desc: content.takeaway3Desc },
                  ].map((item, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ ...t.enter, delay: index * stagger.slow }}
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-2xl text-center transition-shadow duration-300 bg-[var(--card-from-bg)] border border-[var(--card-border)] hover:border-[var(--primary)]"
                      >
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="opacity-80">{item.desc}</p>
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
                  <div className="mx-auto w-px h-12 mb-8 bg-[var(--card-border)]" />
                  <h2 className="text-xl font-semibold mb-3 text-[var(--primary)]">{content.summaryTitle}</h2>
                  <p className="text-lg leading-relaxed opacity-80">{content.summaryDesc}</p>
                </motion.div>
              </CaseStudySection>
        </div>
      </main>
    </div>
  );
}
