'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import AppArchitectureModal from './AppArchitectureModal';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection, { CaseStudyItem } from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';

// Animated counter component for live metrics feel
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);

    useEffect(() => {
        if (isInView) {
            animate(count, target, { duration: 2, ease: [0.22, 1, 0.36, 1] });
        }
    }, [isInView, count, target]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

// Pulse dot for live indicators
function PulseDot({ color = 'bg-emerald-400' }: { color?: string }) {
    return (
        <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`} />
        </span>
    );
}

export default function MarketIntelligenceClient() {
    const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
        link.rel = 'stylesheet';
        if (!document.querySelector(`link[href="${link.href}"]`)) {
            document.head.appendChild(link);
        }
    }, []);

    // Auto-rotate features
    useEffect(() => {
        const interval = setInterval(() => setActiveFeature((p) => (p + 1) % 4), 4000);
        return () => clearInterval(interval);
    }, []);

    const { theme } = useTheme();
    const { locale } = useLanguage();
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';

    // Get localized text content
    const getLocalizedContent = () => {
        const content = {
            en: {
                title: "AI-Powered Market Intelligence",
                subtitle: "Mobile-First Enterprise App Design",
                intro: "Designing the future of market research—a mobile application delivering conversational AI search, source-grounded summaries, and personalized intelligence for enterprise users.",
                projectType: "Project Type",
                projectTypeValues: "Mobile UX/UI Design",
                timeline: "Timeline",
                timelineValue: "In Progress",
                tools: "Tools & Technologies",
                toolsValue: "Figma, React, Tailwind CSS, iOS 26/Android 16 patterns",
                standards: "Key Features",
                standardsValue: "Conversational AI, Real-time Alerts, Streaming UX",
                roles: "My Role",
                rolesValue: "Product Manager & Designer",

                // Navigation tabs
                overviewTab: "Overview",
                uxTab: "UX & Platform Patterns",
                systemTab: "Design System & Trust",
                impactTab: "Implementation Plan",

                // Overview section
                problemTitle: "The Challenge",
                problemDesc: "Enterprise users need rapid, trustworthy, and actionable insights from dense financial content like earnings calls, filings, and research while on the move, but traditional apps struggle to provide meaningful summaries on small screens.",
                solutionTitle: "Our Solution",
                solutionDesc: "A mobile-first application combining the power of an AI assistant with the rigor of enterprise data, offering source-grounded summaries and natural conversational search that builds trust over time.",

                // Objectives
                objectivesTitle: "Core Objectives",
                objective1: "Design an intuitive conversational AI search experience",
                objective2: "Ensure absolute trust via source-grounded outputs",
                objective3: "Deliver personalized, real-time intelligence feeds",
                objective4: "Optimize rendering of dense financial data for mobile",
                objective5: "Enforce enterprise-grade security and compliance",

                // Strategic Choices Section
                rationaleTitle: "Strategic Design Rationale",
                rationaleSubtitle: "Translating high-density desktop financial data into a low-friction, high-trust mobile experience.",
                rationaleItem1Title: "Conversational AI vs. Traditional Filters",
                rationaleItem1Desc: "Drastically reduces time-to-insight. Users can simply ask natural language questions rather than navigating complex menus or sifting through search results on a small screen.",
                rationaleItem2Title: "Strict Source-Grounded Outputs",
                rationaleItem2Desc: "Prioritizes trust mechanisms over raw AI generation. Every response includes inline citations and source previews, allowing users to instantly verify the exact earnings call or filing.",
                rationaleItem3Title: "Proactive 'Smart Event' Alerts",
                rationaleItem3Desc: "Moves from a 'pull' to a 'push' model using OS-native features. Synthesized, actionable insights are pushed to the lock screen the moment market-moving events occur.",
                rationaleItem4Title: "Automated Audio & Text Briefings",
                rationaleItem4Desc: "Personalized daily briefings can be consumed as short text snippets or generated audio, enabling hands-free consumption during commutes.",
                rationaleItem5Title: "Streaming Latency & Native Patterns",
                rationaleItem5Desc: "Streaming token rendering combined with platform-native components ensures the AI generation feels incredibly fast and premium on both iOS and Android.",

                // UI Framework
                frameworkTitle: "Native iOS & Android Architecture",
                frameworkDesc: "Built using native iOS (SwiftUI) and Android (Jetpack Compose) frameworks to ensure rapid, highly customizable styling while sharing a core component architecture and design tokens.",

                // UX Section
                iosPatternsTitle: "iOS 26 Best Practices",
                iosPatternsDesc: "Leveraging large titles, native bottom sheets, context-aware toolbars, advanced haptics, and Dynamic Type support.",
                androidPatternsTitle: "Android 16 Features",
                androidPatternsDesc: "Incorporating Material dynamic color, predictive back navigation, modal bottom sheets, edge-to-edge layouts, and foldable layouts.",

                // Features
                aiPatternsTitle: "AI Interaction Patterns",
                aiPatternsDesc: "Focusing on streaming responses, inline citation references, confidence indicators, and clear boundaries between AI and original source text.",
                latencyStrategyTitle: "Latency Strategy",
                latencyStrategyDesc: "Addressing AI wait times with streaming token rendering, progressive skeleton UI, and informative status indicators.",
                trustTitle: "Trust Mechanisms",
                trustDesc: "Mandatory citation layer, source preview drawers, timestamping, and expandable reasoning to mitigate AI hallucination.",
                featureAlertsTitle: "Real-Time Intelligence Alerts",
                featureAlertsDesc: "Custom push notifications mapped to iOS Live Activities and Android Notification channels for immediate insight delivery.",

                // Journey
                coreFlowsTitle: "Core User Flows",
                flow1: "AI Search & Conversational Query",
                flow2: "AI Summary Card & Transcripts",
                flow3: "Personalized Intelligence Feed",
                flow4: "Company Deep Dive Dashboard",
                flow5: "Alerts & Notification System",

                // Results
                metricsTitle: "Success Metrics Framework",
                captureMetric: "% of users making first query",
                trustMetric: "Citation click-through rate",
                engagementMetric: "Daily Queries & Alert interactions",
                retentionMetric: "Weekly Active Users",

                // App Functionality
                appFunctionalityTitle: "Core App Functionality",
                appFunctionalityDesc: "A powerful suite of tools designed to provide actionable intelligence at your fingertips, anytime, anywhere.",
                feat1Title: "Conversational AI Search",
                feat1Desc: "Ask complex market questions in natural language and receive detailed, source-grounded answers instantly.",
                feat2Title: "Real-Time Sentiment Analysis",
                feat2Desc: "Monitor market sentiment with AI-driven analysis of news, earnings calls, and financial reports as they happen.",
                feat3Title: "Smart Event Alerts",
                feat3Desc: "Set custom triggers for portfolio-relevant events and receive push notifications before the market reacts.",
                feat4Title: "Automated Briefings",
                feat4Desc: "Start your day with generated audio and text summaries covering the most impactful events tailored to your watchlists",

            },
            fi: {
                title: "Tekoälypohjainen markkinatieto",
                subtitle: "Mobiililähtöinen yrityssovellussuunnittelu",
                intro: "Suunnittelemme markkinatutkimuksen tulevaisuutta—mobiilisovellus, joka tarjoaa keskustelevaa tekoälyhakua, lähteisiin perustuvia yhteenvetoja ja personoitua tietoa yrityskäyttäjille.",
                projectType: "Projektityyppi",
                projectTypeValues: "Mobiili UX/UI -suunnittelu",
                timeline: "Aikataulu",
                timelineValue: "Käynnissä",
                tools: "Työkalut & Teknologiat",
                toolsValue: "Figma, React, Tailwind CSS, iOS 26/Android 16 -mallit",
                standards: "Tärkeimmät ominaisuudet",
                standardsValue: "Keskusteleva tekoäly, reaaliaikaiset hälytykset, virtaava UX",
                roles: "Roolini",
                rolesValue: "Tuotepäällikkö & Suunnittelija",

                // Navigation tabs
                overviewTab: "Yleiskatsaus",
                uxTab: "UX & Alustamallit",
                systemTab: "Suunnittelujärjestelmä & Luottamus",
                impactTab: "Toteutussuunnitelma",

                // Overview section
                problemTitle: "Haaste",
                problemDesc: "Yrityskäyttäjät tarvitsevat nopeita, luotettavia ja toimivia oivalluksia tiheästä taloudellisesta sisällöstä, kuten tulosjulkistuksista liikkeellä ollessaan, mutta perinteisillä sovelluksilla on vaikeuksia tarjota merkityksellisiä yhteenvetoja pienillä näytöillä.",
                solutionTitle: "Ratkaisumme",
                solutionDesc: "Mobiililähtöinen sovellus, joka yhdistää tekoälyavustajan tehon yritystiedon tarkkuuteen ja tarjoaa lähteisiin perustuvia yhteenvetoja ja luonnollista keskusteluhakua, joka rakentaa luottamusta ajan myötä.",

                // Objectives
                objectivesTitle: "Keskeiset tavoitteet",
                objective1: "Suunnitella intuitiivinen keskusteleva tekoälyhakemus",
                objective2: "Varmistaa ehdoton luottamus lähteisiin perustuvilla tuloksilla",
                objective3: "Tarjota personoituja, reaaliaikaisia tietosyötteitä",
                objective4: "Optimoida tiheän taloudellisen tiedon renderöinti mobiiliin",
                objective5: "Valvoa yritystason turvallisuutta ja vaatimustenmukaisuutta",

                // Strategic Choices Section
                rationaleTitle: "Strateginen suunnitteluperustelu",
                rationaleSubtitle: "Suuren tiheyden työpöydän taloustiedon kääntäminen vähäkitkaiseksi, korkean luottamuksen mobiilikokemukseksi.",
                rationaleItem1Title: "Keskusteleva tekoäly vs. perinteiset suodattimet",
                rationaleItem1Desc: "Lyhentää merkittävästi aikaa oivallukseen. Käyttäjät voivat yksinkertaisesti esittää kysymyksiä luonnollisella kielellä sen sijaan, että navigoisi monimutkaisissa valikoissa tai etsiisi tuloksia pieneltä näytöltä.",
                rationaleItem2Title: "Tiukasti lähteisiin perustuvat tulosteet",
                rationaleItem2Desc: "Asettaa luottamusmekanismit pelkän tekoälysukupolven edelle. Jokainen vastaus sisältää viitteet ja lähde-esikatselun, jonka avulla käyttäjät voivat heti vahvistaa tarkan tulosjulkistuksen tai ilmoituksen.",
                rationaleItem3Title: "Proaktiiviset 'älykkään tapahtuman' hälytykset",
                rationaleItem3Desc: "Siirtyy 'veto'-mallista 'työntö'-malliin OS-alkuperäisiä ominaisuuksia hyödyntäen. Yhteenvedetyt, käyttökelpoiset oivallukset työnnetään lukitusnäytölle heti, kun markkinoihin vaikuttavia tapahtumia ilmenee.",
                rationaleItem4Title: "Automaattiset ääni- ja tekstikatsaukset",
                rationaleItem4Desc: "Personoidut päivittäiset katsaukset voidaan kuluttaa lyhyinä tekstipätkinä tai luotuna äänenä, mahdollistaen handsfree-kulutuksen työmatkan aikana.",
                rationaleItem5Title: "Virtaava viive & alkuperäiset mallit",
                rationaleItem5Desc: "Virtaava renderöinti yhdistettynä alustan alkuperäisiin komponentteihin varmistaa, että tekoälysukupolvi tuntuu uskomattoman nopealta ja laadukkaalta sekä iOS:ssä että Androidissa.",

                // UI Framework
                frameworkTitle: "Alkuperäinen iOS- ja Android-arkkitehtuuri",
                frameworkDesc: "Rakennettu käyttämällä alkuperäisiä iOS (SwiftUI) - ja Android (Jetpack Compose) -kehikoita, mikä varmistaa nopean ja erittäin muokattavan tyylin samalla kun jaetaan ydinkomponenttiarkkitehtuuri ja suunnittelutunnukset.",

                // UX Section
                iosPatternsTitle: "iOS 26 -parhaat käytännöt",
                iosPatternsDesc: "Hyödyntää suuria otsikoita, natiiveja alalehtiä, kontekstitietoisia työkalurivejä, edistynyttä haptiikkaa ja Dynamic Type -tukea.",
                androidPatternsTitle: "Android 16 -ominaisuudet",
                androidPatternsDesc: "Sisällyttää Material dynamic color, ennakoivan takaisin-navigoinnin, modaaliset alalehdet, reunasta reunaan asettelut ja taitettavat asettelut.",

                // Features
                aiPatternsTitle: "Tekoälyn vuorovaikutusmallit",
                aiPatternsDesc: "Keskittyminen virtaaviin vastauksiin, viitteisiin tekstissä, luottamusindikaattoreihin ja selkeisiin rajoihin tekoälyn ja alkuperäisen lähdetekstin välillä.",
                latencyStrategyTitle: "Viiveen strategia",
                latencyStrategyDesc: "Odotusaikojen käsittely virtaavalla renderöinnillä, progressiivisella skeleton UI:lla ja selkeillä tilaindikaattoreilla.",
                trustTitle: "Luottamusmekanismit",
                trustDesc: "Pakollinen viitekerros, lähteen esikatseluvetoketjut, aikaleimat ja laajennettava päättely tekoälyn hallusinaatioiden lieventämiseksi.",
                featureAlertsTitle: "Reaaliaikaiset hälytykset",
                featureAlertsDesc: "Räätälöidyt push-ilmoitukset, jotka on yhdistetty iOS Live Activities- ja Android Notification -kanaviin välitöntä tiedonantoa varten.",

                // Journey
                coreFlowsTitle: "Keskeiset käyttäjävirrat",
                flow1: "Tekoälyhaku ja keskustelukysely",
                flow2: "Tekoäly-yhteenvetokortti ja kopiot",
                flow3: "Personoitu tietosyöte",
                flow4: "Yhtiön syväluotaava kojelauta",
                flow5: "Hälytykset ja ilmoitusjärjestelmä",

                // Results
                metricsTitle: "Menestysmittariston viitekehys",
                captureMetric: "% käyttäjistä tekee ensimmäisen kyselyn",
                trustMetric: "Viitteiden klikkausprosentti",
                engagementMetric: "Päivittäiset kyselyt ja hälytysten vuorovaikutukset",
                retentionMetric: "Viikottaiset aktiiviset käyttäjät",

                // App Functionality
                appFunctionalityTitle: "Sovelluksen ydintoiminnot",
                appFunctionalityDesc: "Tehokas työkaluvalikoima, joka on suunniteltu tarjoamaan käyttökelpoista tietoa sormenpäidesi ulottuvilla, milloin ja missä tahansa.",
                feat1Title: "Keskusteleva tekoälyhaku",
                feat1Desc: "Esitä monimutkaisia markkinakysymyksiä luonnollisella kielellä ja saat yksityiskohtaisia, lähteisiin perustuvia vastauksia välittömästi.",
                feat2Title: "Reaaliaikainen sentimenttianalyysi",
                feat2Desc: "Seuraa markkinoiden asennetta tekoälypohjaisella uutisten, tulosjulkistusten ja talousraporttien analyysillä niiden tapahtuessa.",
                feat3Title: "Älykkäät tapahtumahälytykset",
                feat3Desc: "Aseta mukautettuja laukaisijoita salkkuun liittyville tapahtumille ja vastaanota push-ilmoituksia ennen kuin markkinat reagoivat.",
                feat4Title: "Automaattiset katsaukset",
                feat4Desc: "Aloita päiväsi luoduilla ääni- ja tekstiyhteenvedoilla, jotka kattavat seurantalistoillesi räätälöidyt vaikuttavimmat tapahtumat.",
            }
        };
        return content[locale as keyof typeof content] || content.en;
    };

    const content = getLocalizedContent();

    return (
        <div className={`min-h-screen transition-colors duration-300 relative ${isColorful
            ? 'bg-[#050023]'
            : isLight
                ? 'bg-gradient-to-br from-slate-50 to-gray-100'
                : 'bg-gradient-to-br from-gray-900 to-black'
            }`}>

            {/* Ambient background grid */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className={`absolute inset-0 ${isColorful
                    ? 'bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]'
                    : isLight
                        ? 'bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]'
                        : 'bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]'
                    }`} />
                {isColorful && (
                    <>
                        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-[120px]" />
                        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px]" />
                        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-cyan-600/5 rounded-full blur-[100px]" />
                    </>
                )}
            </div>

            <Navigation />
            <CaseStudyProgress />

            <main className="pt-24 pb-16 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <CaseStudyHero
                        title={content.title}
                        subtitle={content.subtitle}
                        image="/images/portfolio/market/market-intellegence.jpg"
                        tags={[content.projectTypeValues, content.rolesValue]}
                        actions={[
                            {
                                label: locale === 'fi' ? 'Katso interaktiiviset prototyypit' : 'View Interactive Prototypes',
                                icon: 'play_circle',
                                variant: 'primary',
                                onClick: () => {
                                    setTimeout(() => {
                                        document.getElementById('interactive-prototypes')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                },
                            },
                            {
                                label: locale === 'fi' ? 'Sovelluksen arkkitehtuuri & työnkulku' : 'App Architecture & Workflow',
                                icon: 'account_tree',
                                variant: 'secondary',
                                onClick: () => setIsWorkflowModalOpen(true),
                            },
                            {
                                label: locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'View Design System',
                                icon: 'design_services',
                                variant: 'secondary',
                                href: 'https://ds.alux.space/',
                            },
                        ]}
                        meta={[
                            { label: content.projectType, value: content.projectTypeValues, icon: 'devices' },
                            { label: content.timeline, value: content.timelineValue, icon: 'schedule' },
                            { label: content.standards, value: content.standardsValue, icon: 'memory' },
                            { label: content.roles, value: content.rolesValue, icon: 'person' },
                        ]}
                    />

                    {/* ═══ LIVE INTELLIGENCE METRICS ═══ */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {[
                            { icon: 'query_stats', value: 98, suffix: '%', label: locale === 'fi' ? 'Lähdetarkkuus' : 'Source Accuracy', color: 'from-emerald-500 to-teal-500', dotColor: 'bg-emerald-400' },
                            { icon: 'speed', value: 200, suffix: 'ms', label: locale === 'fi' ? 'Keskimääräinen viive' : 'Avg Response', color: 'from-blue-500 to-indigo-500', dotColor: 'bg-blue-400' },
                            { icon: 'trending_up', value: 15, suffix: 'K+', label: locale === 'fi' ? 'Päivittäiset kyselyt' : 'Daily Queries', color: 'from-purple-500 to-pink-500', dotColor: 'bg-purple-400' },
                            { icon: 'shield', value: 99, suffix: '.9%', label: locale === 'fi' ? 'Käytettävyys' : 'Uptime', color: 'from-orange-500 to-amber-500', dotColor: 'bg-orange-400' },
                        ].map((metric, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                whileHover={{ y: -3, scale: 1.02 }}
                                className={`relative group p-5 rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${isColorful
                                    ? 'bg-white/[0.04] border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.06]'
                                    : isLight
                                        ? 'bg-white/80 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                                        : 'bg-white/[0.03] border-gray-800 hover:border-gray-700 hover:bg-white/[0.05]'
                                    }`}
                            >
                                {/* Gradient glow on hover */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${metric.color} pointer-events-none`} style={{ opacity: 0 }} />
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 bg-gradient-to-br ${metric.color} pointer-events-none`} />

                                <div className="relative z-10 flex items-start justify-between mb-3">
                                    <span className={`material-symbols text-xl ${isColorful ? 'text-gray-400 group-hover:text-white/80' : isLight ? 'text-gray-400 group-hover:text-gray-600' : 'text-gray-500 group-hover:text-gray-300'} transition-colors`}>
                                        {metric.icon}
                                    </span>
                                    <PulseDot color={metric.dotColor} />
                                </div>
                                <div className="relative z-10">
                                    <div className={`text-2xl font-bold tabular-nums mb-1 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>
                                        <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                                    </div>
                                    <div className={`text-xs font-medium uppercase tracking-wider ${isColorful ? 'text-gray-400' : isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {metric.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ═══ INTRO ═══ */}
                    <motion.div
                        className="text-center mb-20 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                            {content.intro}
                        </p>
                    </motion.div>

                    {/* ═══ SECTION 1: OVERVIEW ═══ */}
                    <CaseStudySection title={content.overviewTab} icon="visibility" number={1} accent="blue">
                        <CaseStudyItem>
                            <div className="grid md:grid-cols-2 gap-8 mb-14">
                                {[
                                    { icon: 'warning', title: content.problemTitle, desc: content.problemDesc, gradient: 'from-red-500 to-orange-500', iconBg: isColorful ? 'bg-red-500/15' : isLight ? 'bg-red-50' : 'bg-red-900/30', iconColor: 'text-red-500', borderColor: isColorful ? 'border-red-500/20' : isLight ? 'border-red-100' : 'border-red-900/40' },
                                    { icon: 'lightbulb', title: content.solutionTitle, desc: content.solutionDesc, gradient: 'from-emerald-500 to-teal-500', iconBg: isColorful ? 'bg-emerald-500/15' : isLight ? 'bg-emerald-50' : 'bg-emerald-900/30', iconColor: 'text-emerald-500', borderColor: isColorful ? 'border-emerald-500/20' : isLight ? 'border-emerald-100' : 'border-emerald-900/40' },
                                ].map((card, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ y: -6, scale: 1.01 }}
                                        className={`relative group p-7 rounded-2xl border overflow-hidden transition-all duration-500 ${isColorful
                                            ? `bg-gradient-to-br from-white/[0.03] to-white/[0.01] ${card.borderColor} hover:from-white/[0.06] hover:to-white/[0.02]`
                                            : isLight
                                                ? `bg-white ${card.borderColor} shadow-sm hover:shadow-lg`
                                                : `bg-gray-900/60 ${card.borderColor} hover:bg-gray-900/80`
                                            }`}
                                    >
                                        {/* Top gradient line */}
                                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                                        
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} mb-5`}>
                                            <span className={`material-symbols text-2xl ${card.iconColor}`}>{card.icon}</span>
                                        </div>
                                        <h3 className={`text-xl font-bold mb-3 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{card.title}</h3>
                                        <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'}`}>{card.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudyItem>

                        <CaseStudyItem>
                            <h2 className={`text-xl font-semibold mb-8 ${isColorful
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400'
                                : isLight ? 'text-gray-900' : 'text-white'
                                }`}>{content.objectivesTitle}</h2>

                            <div className="space-y-1 max-w-3xl">
                                {[
                                    { icon: "chat_bubble", text: content.objective1 },
                                    { icon: "gavel", text: content.objective2 },
                                    { icon: "feed", text: content.objective3 },
                                    { icon: "finance", text: content.objective4 },
                                    { icon: "security", text: content.objective5 }
                                ].map((objective, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -16 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: '-20px' }}
                                        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ x: 6 }}
                                        className={`group flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 ${isColorful ? 'hover:bg-white/[0.03]' : isLight ? 'hover:bg-gray-50' : 'hover:bg-white/[0.03]'}`}
                                    >
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isColorful
                                            ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300'
                                            : isLight
                                                ? 'bg-indigo-50 text-indigo-400 group-hover:bg-indigo-100 group-hover:text-indigo-500'
                                                : 'bg-indigo-900/30 text-indigo-400 group-hover:bg-indigo-900/50 group-hover:text-indigo-300'
                                            }`}>
                                            <span className="material-symbols text-lg">{objective.icon}</span>
                                        </div>
                                        <p className={`leading-relaxed font-medium ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'}`}>{objective.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    {/* ═══ SECTION 2: STRATEGIC RATIONALE ═══ */}
                    <CaseStudySection title={content.rationaleTitle} icon="lightbulb" number={2} accent="purple">
                        <CaseStudyItem>
                            <p className={`text-lg max-w-3xl mx-auto mb-12 ${isColorful ? 'text-purple-200/80' : isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                {content.rationaleSubtitle}
                            </p>

                            <div className="space-y-0 relative">
                                {/* Vertical connector line */}
                                <div className={`absolute left-[22px] top-8 bottom-8 w-[2px] ${isColorful ? 'bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-rose-500/30' : isLight ? 'bg-gradient-to-b from-gray-200 via-gray-200 to-gray-200' : 'bg-gradient-to-b from-gray-700/50 via-gray-800/50 to-gray-700/50'}`} />

                                {[
                                    { index: "01", title: content.rationaleItem1Title, desc: content.rationaleItem1Desc, color: "from-blue-500 to-cyan-500", dotColor: "bg-blue-500" },
                                    { index: "02", title: content.rationaleItem2Title, desc: content.rationaleItem2Desc, color: "from-emerald-500 to-teal-500", dotColor: "bg-emerald-500" },
                                    { index: "03", title: content.rationaleItem3Title, desc: content.rationaleItem3Desc, color: "from-orange-500 to-amber-500", dotColor: "bg-orange-500" },
                                    { index: "04", title: content.rationaleItem4Title, desc: content.rationaleItem4Desc, color: "from-purple-500 to-violet-500", dotColor: "bg-purple-500" },
                                    { index: "05", title: content.rationaleItem5Title, desc: content.rationaleItem5Desc, color: "from-rose-500 to-pink-500", dotColor: "bg-rose-500" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ x: 8 }}
                                        className={`group relative flex gap-6 items-start py-6 pl-2 pr-4 rounded-xl transition-all duration-300 ${isLight ? 'hover:bg-gray-50/80' : 'hover:bg-white/[0.02]'}`}
                                    >
                                        {/* Timeline dot */}
                                        <div className="relative z-10 flex-shrink-0">
                                            <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${item.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                                                {item.index}
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${isColorful ? 'text-white group-hover:text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                                            <p className={`leading-relaxed ${isColorful ? 'text-gray-400 group-hover:text-gray-300' : isLight ? 'text-gray-500 group-hover:text-gray-600' : 'text-gray-400 group-hover:text-gray-300'} transition-colors duration-300`}>{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    {/* ═══ SECTION 3: INTERACTIVE PROTOTYPES ═══ */}
                    <CaseStudySection title={locale === 'fi' ? 'Interaktiiviset prototyypit' : 'Interactive Prototypes'} icon="smartphone" number={3} accent="indigo" id="interactive-prototypes">
                        <CaseStudyItem>
                            <p className={`text-lg max-w-2xl mx-auto mb-10 ${isColorful ? 'text-indigo-200' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                {locale === 'fi' ? 'Koe tekoälypohjainen käyttöliittymä natiivisti iOS:lla ja Androidilla rinnakkain.' : 'Experience the AI-powered interface natively across iOS and Android side-by-side.'}
                            </p>

                            <div className="flex flex-col xl:flex-row gap-12 items-center xl:items-start justify-center overflow-visible">
                                {/* iOS Prototype */}
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-full ${isColorful ? 'bg-white/[0.05] border border-white/10' : isLight ? 'bg-gray-100' : 'bg-gray-800/60 border border-gray-700/50'}`}
                                    >
                                        <span className={`material-symbols text-xl ${isLight ? 'text-gray-900' : 'text-white'}`}>phone_iphone</span>
                                        <h3 className={`text-lg font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>iOS 26</h3>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                        className="transform scale-[0.80] sm:scale-[0.85] origin-top"
                                    >
                                        <div className={`w-[390px] h-[844px] shrink-0 rounded-[3rem] border-[8px] overflow-hidden relative ${isColorful ? 'shadow-[0_0_60px_rgba(99,102,241,0.15)]' : 'shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]'} ${isLight ? 'border-gray-800 bg-white' : 'border-neutral-800 bg-black'}`}
                                            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', isolation: 'isolate' }}>
                                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] rounded-b-3xl z-50 ${isLight ? 'bg-gray-800' : 'bg-black'}`} />
                                            <div className="w-full h-full overflow-hidden rounded-[2.5rem]">
                                                <iframe src={`/mobile?os=ios&theme=${theme}`} title="iOS Prototype" className="w-full h-[calc(100%+32px)] border-none" style={{ marginTop: '-16px' }} allow="payment; fullscreen" />
                                            </div>
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full z-50" />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Android Prototype */}
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-full ${isColorful ? 'bg-teal-500/10 border border-teal-500/20' : isLight ? 'bg-teal-50' : 'bg-teal-900/20 border border-teal-700/30'}`}
                                    >
                                        <span className={`material-symbols text-xl ${isLight ? 'text-teal-600' : 'text-[#4dd0e1]'}`}>android</span>
                                        <h3 className={`text-lg font-semibold ${isLight ? 'text-teal-600' : 'text-[#4dd0e1]'}`}>Android 16</h3>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                        viewport={{ once: true, margin: '-60px' }}
                                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                        className="transform scale-[0.80] sm:scale-[0.85] origin-top"
                                    >
                                        <div className={`w-[412px] h-[892px] shrink-0 rounded-[2.5rem] border-[6px] overflow-hidden relative ${isColorful ? 'shadow-[0_0_60px_rgba(77,208,225,0.1)]' : 'shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]'} ${isLight ? 'border-gray-800 bg-white' : 'border-neutral-800 bg-black'}`}
                                            style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', isolation: 'isolate' }}>
                                            <div className="w-full h-full overflow-hidden rounded-[2rem]">
                                                <iframe src={`/mobile?os=android&theme=${theme}`} title="Android Prototype" className="w-full h-[calc(100%+32px)] border-none" style={{ marginTop: '-16px' }} allow="payment; fullscreen" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </CaseStudyItem>

                        {/* ═══ CORE APP FUNCTIONALITY — INTERACTIVE SHOWCASE ═══ */}
                        <CaseStudyItem>
                            <motion.div
                                className="mt-20"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="text-center mb-14">
                                    <h3 className={`text-2xl font-bold mb-4 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400' : isLight ? 'text-gray-900' : 'text-white'}`}>
                                        {content.appFunctionalityTitle}
                                    </h3>
                                    <p className={`text-lg max-w-2xl mx-auto ${isColorful ? 'text-indigo-200/80' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {content.appFunctionalityDesc}
                                    </p>
                                </div>

                                {/* Feature spotlight: active feature + feature selectors */}
                                <div className="grid lg:grid-cols-5 gap-6">
                                    {/* Feature selector pills */}
                                    <div className="lg:col-span-2 flex flex-col gap-3">
                                        {[
                                            { icon: "search_insights", title: content.feat1Title, desc: content.feat1Desc, gradient: 'from-blue-500 to-indigo-500' },
                                            { icon: "query_stats", title: content.feat2Title, desc: content.feat2Desc, gradient: 'from-emerald-500 to-teal-500' },
                                            { icon: "notifications_active", title: content.feat3Title, desc: content.feat3Desc, gradient: 'from-orange-500 to-amber-500' },
                                            { icon: "summarize", title: content.feat4Title, desc: content.feat4Desc, gradient: 'from-purple-500 to-pink-500' }
                                        ].map((feature, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => setActiveFeature(index)}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                                className={`group relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${activeFeature === index
                                                    ? isColorful
                                                        ? 'bg-white/[0.06] border border-white/[0.12] shadow-lg'
                                                        : isLight
                                                            ? 'bg-white border border-indigo-200 shadow-md'
                                                            : 'bg-white/[0.05] border border-gray-700 shadow-lg'
                                                    : isColorful
                                                        ? 'bg-transparent border border-transparent hover:bg-white/[0.03] hover:border-white/[0.06]'
                                                        : isLight
                                                            ? 'bg-transparent border border-transparent hover:bg-gray-50 hover:border-gray-200'
                                                            : 'bg-transparent border border-transparent hover:bg-white/[0.02] hover:border-gray-800'
                                                    }`}
                                            >
                                                {/* Active indicator */}
                                                {activeFeature === index && (
                                                    <motion.div
                                                        layoutId="activeFeatureIndicator"
                                                        className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b ${feature.gradient}`}
                                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                                    />
                                                )}
                                                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${activeFeature === index
                                                    ? isColorful ? 'bg-indigo-500/20 text-indigo-300' : isLight ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900/50 text-indigo-400'
                                                    : isColorful ? 'bg-white/[0.05] text-gray-400' : isLight ? 'bg-gray-100 text-gray-400' : 'bg-gray-800/60 text-gray-500'
                                                    }`}>
                                                    <span className="material-symbols text-lg">{feature.icon}</span>
                                                </div>
                                                <div>
                                                    <h4 className={`font-semibold text-sm transition-colors ${activeFeature === index
                                                        ? isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'
                                                        : isColorful ? 'text-gray-400' : isLight ? 'text-gray-600' : 'text-gray-400'
                                                        }`}>{feature.title}</h4>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Active feature detail card */}
                                    <motion.div
                                        className="lg:col-span-3"
                                        key={activeFeature}
                                        initial={{ opacity: 0, x: 20, scale: 0.98 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        {(() => {
                                            const features = [
                                                { icon: "search_insights", title: content.feat1Title, desc: content.feat1Desc, gradient: 'from-blue-500 to-indigo-500', iconBg: isColorful ? 'bg-blue-500/15 text-blue-400' : isLight ? 'bg-blue-50 text-blue-500' : 'bg-blue-900/30 text-blue-400' },
                                                { icon: "query_stats", title: content.feat2Title, desc: content.feat2Desc, gradient: 'from-emerald-500 to-teal-500', iconBg: isColorful ? 'bg-emerald-500/15 text-emerald-400' : isLight ? 'bg-emerald-50 text-emerald-500' : 'bg-emerald-900/30 text-emerald-400' },
                                                { icon: "notifications_active", title: content.feat3Title, desc: content.feat3Desc, gradient: 'from-orange-500 to-amber-500', iconBg: isColorful ? 'bg-orange-500/15 text-orange-400' : isLight ? 'bg-orange-50 text-orange-500' : 'bg-orange-900/30 text-orange-400' },
                                                { icon: "summarize", title: content.feat4Title, desc: content.feat4Desc, gradient: 'from-purple-500 to-pink-500', iconBg: isColorful ? 'bg-purple-500/15 text-purple-400' : isLight ? 'bg-purple-50 text-purple-500' : 'bg-purple-900/30 text-purple-400' },
                                            ];
                                            const f = features[activeFeature];
                                            return (
                                                <div className={`relative h-full p-8 rounded-2xl border overflow-hidden ${isColorful
                                                    ? 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/[0.08]'
                                                    : isLight
                                                        ? 'bg-white border-gray-200 shadow-lg'
                                                        : 'bg-gray-900/70 border-gray-800'
                                                    }`}>
                                                    {/* Top gradient line */}
                                                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${f.gradient}`} />

                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${f.iconBg} mb-6`}>
                                                        <span className="material-symbols text-2xl">{f.icon}</span>
                                                    </div>
                                                    <h4 className={`text-xl font-bold mb-4 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{f.title}</h4>
                                                    <p className={`text-base leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'}`}>{f.desc}</p>

                                                    {/* Feature progress indicator */}
                                                    <div className="mt-8 flex gap-2">
                                                        {[0, 1, 2, 3].map((dot) => (
                                                            <div
                                                                key={dot}
                                                                className={`h-1 rounded-full transition-all duration-500 ${dot === activeFeature
                                                                    ? `w-8 bg-gradient-to-r ${f.gradient}`
                                                                    : `w-4 ${isColorful ? 'bg-white/10' : isLight ? 'bg-gray-200' : 'bg-gray-700'}`
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    {/* ═══ SECTION 4: UX & PLATFORM PATTERNS ═══ */}
                    <CaseStudySection title={content.uxTab} icon="devices" number={4} accent="green">
                        <CaseStudyItem>
                            <div className="grid md:grid-cols-2 gap-6 mb-14">
                                {[
                                    { icon: 'phone_iphone', title: content.iosPatternsTitle, desc: content.iosPatternsDesc, gradient: 'from-gray-500 to-gray-600', iconBg: isColorful ? 'bg-gray-700/50 text-gray-300' : isLight ? 'bg-gray-100 text-gray-500' : 'bg-gray-800 text-gray-400', borderColor: isColorful ? 'border-white/[0.08]' : isLight ? 'border-gray-200' : 'border-gray-800' },
                                    { icon: 'android', title: content.androidPatternsTitle, desc: content.androidPatternsDesc, gradient: 'from-green-500 to-emerald-500', iconBg: isColorful ? 'bg-green-900/30 text-green-400' : isLight ? 'bg-green-50 text-green-500' : 'bg-green-900/30 text-green-400', borderColor: isColorful ? 'border-green-500/15' : isLight ? 'border-green-100' : 'border-green-900/30' },
                                ].map((platform, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-30px' }}
                                        transition={{ duration: 0.5, delay: i * 0.12 }}
                                        whileHover={{ y: -4 }}
                                        className={`relative group p-6 rounded-2xl border overflow-hidden transition-all duration-300 ${isColorful
                                            ? `bg-white/[0.03] ${platform.borderColor} hover:bg-white/[0.05]`
                                            : isLight
                                                ? `bg-white ${platform.borderColor} shadow-sm hover:shadow-md`
                                                : `bg-gray-900/50 ${platform.borderColor} hover:bg-gray-900/70`
                                            }`}
                                    >
                                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${platform.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${platform.iconBg} mb-5`}>
                                            <span className="material-symbols text-2xl">{platform.icon}</span>
                                        </div>
                                        <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{platform.title}</h3>
                                        <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'}`}>{platform.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudyItem>

                        <CaseStudyItem>
                            <h2 className={`text-xl font-semibold mb-8 ${isColorful
                                ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400'
                                : isLight ? 'text-gray-900' : 'text-white'
                                }`}>{content.coreFlowsTitle}</h2>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                                {[
                                    { icon: "forum", text: content.flow1, gradient: 'from-blue-500 to-indigo-500' },
                                    { icon: "summarize", text: content.flow2, gradient: 'from-emerald-500 to-teal-500' },
                                    { icon: "rss_feed", text: content.flow3, gradient: 'from-purple-500 to-pink-500' },
                                    { icon: "dashboard", text: content.flow4, gradient: 'from-orange-500 to-amber-500' },
                                    { icon: "notifications_active", text: content.flow5, gradient: 'from-rose-500 to-red-500' }
                                ].map((flow, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: '-20px' }}
                                        transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ y: -3, scale: 1.02 }}
                                        className={`group relative flex items-center gap-3 p-4 rounded-xl border overflow-hidden transition-all duration-300 ${isColorful
                                            ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1]'
                                            : isLight
                                                ? 'bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                                                : 'bg-gray-900/40 border-gray-800 hover:border-gray-700 hover:bg-gray-900/60'
                                            }`}
                                    >
                                        <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${flow.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                                        <div className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${isColorful ? 'bg-indigo-500/12 text-indigo-300 group-hover:bg-indigo-500/20' : isLight ? 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100' : 'bg-indigo-900/30 text-indigo-400 group-hover:bg-indigo-900/50'}`}>
                                            <span className="material-symbols text-base">{flow.icon}</span>
                                        </div>
                                        <p className={`font-medium text-sm ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'}`}>{flow.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    {/* ═══ SECTION 5: DESIGN SYSTEM & TRUST ═══ */}
                    <CaseStudySection title={content.systemTab} icon="shield" number={5} accent="orange">
                        <CaseStudyItem>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { icon: "construction", title: content.frameworkTitle, desc: content.frameworkDesc, gradient: 'from-blue-500 to-cyan-500', iconBg: isColorful ? 'bg-blue-500/15 text-blue-400' : isLight ? 'bg-blue-50 text-blue-500' : 'bg-blue-900/30 text-blue-400' },
                                    { icon: "hourglass_top", title: content.latencyStrategyTitle, desc: content.latencyStrategyDesc, gradient: 'from-orange-500 to-amber-500', iconBg: isColorful ? 'bg-orange-500/15 text-orange-400' : isLight ? 'bg-orange-50 text-orange-500' : 'bg-orange-900/30 text-orange-400' },
                                    { icon: "psychology", title: content.aiPatternsTitle, desc: content.aiPatternsDesc, gradient: 'from-purple-500 to-violet-500', iconBg: isColorful ? 'bg-purple-500/15 text-purple-400' : isLight ? 'bg-purple-50 text-purple-500' : 'bg-purple-900/30 text-purple-400' },
                                    { icon: "policy", title: content.trustTitle, desc: content.trustDesc, gradient: 'from-emerald-500 to-teal-500', iconBg: isColorful ? 'bg-emerald-500/15 text-emerald-400' : isLight ? 'bg-emerald-50 text-emerald-500' : 'bg-emerald-900/30 text-emerald-400' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-30px' }}
                                        transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ y: -4 }}
                                        className={`group relative p-6 rounded-2xl border overflow-hidden transition-all duration-300 ${isColorful
                                            ? 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1]'
                                            : isLight
                                                ? 'bg-white border-gray-200 shadow-sm hover:shadow-lg'
                                                : 'bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 hover:border-gray-700'
                                            }`}
                                    >
                                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg} mb-5 transition-transform group-hover:scale-110 duration-300`}>
                                            <span className="material-symbols text-2xl">{item.icon}</span>
                                        </div>
                                        <h3 className={`text-lg font-bold mb-3 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                                        <p className={`leading-relaxed text-sm ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'}`}>{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    {/* ═══ SECTION 6: IMPLEMENTATION PLAN — LIVE METRICS ═══ */}
                    <CaseStudySection title={content.impactTab} icon="account_tree" number={6} accent="teal">
                        <CaseStudyItem>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                                {[
                                    { icon: "ads_click", text: content.captureMetric, value: 78, gradient: 'from-blue-500 to-indigo-500', barColor: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
                                    { icon: "check_circle", text: content.trustMetric, value: 92, gradient: 'from-emerald-500 to-teal-500', barColor: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
                                    { icon: "monitoring", text: content.engagementMetric, value: 65, gradient: 'from-purple-500 to-pink-500', barColor: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                                    { icon: "event", text: content.retentionMetric, value: 85, gradient: 'from-orange-500 to-amber-500', barColor: 'bg-gradient-to-r from-orange-500 to-amber-500' },
                                ].map((metric, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-30px' }}
                                        transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        className={`group relative p-6 rounded-2xl border overflow-hidden transition-all duration-300 ${isColorful
                                            ? 'bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/[0.08] hover:border-white/[0.15]'
                                            : isLight
                                                ? 'bg-white border-gray-200 shadow-sm hover:shadow-lg'
                                                : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                                            }`}
                                    >
                                        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${metric.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                        <span className={`material-symbols text-2xl mb-4 block ${isColorful ? 'text-teal-400/80' : isLight ? 'text-teal-500' : 'text-teal-400/80'}`}>{metric.icon}</span>
                                        <p className={`font-semibold mb-4 text-sm ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'}`}>{metric.text}</p>

                                        {/* Animated progress bar */}
                                        <div className={`h-1.5 rounded-full overflow-hidden ${isColorful ? 'bg-white/[0.06]' : isLight ? 'bg-gray-100' : 'bg-gray-800'}`}>
                                            <motion.div
                                                className={`h-full rounded-full ${metric.barColor}`}
                                                initial={{ width: '0%' }}
                                                whileInView={{ width: `${metric.value}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                            />
                                        </div>
                                        <div className={`mt-2 text-right text-xs font-medium tabular-nums ${isColorful ? 'text-gray-500' : isLight ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <AnimatedCounter target={metric.value} suffix="%" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudyItem>
                    </CaseStudySection>
                </div>
            </main>

            {/* Workflow Diagram Modal */}
            <AppArchitectureModal
                isOpen={isWorkflowModalOpen}
                onClose={() => setIsWorkflowModalOpen(false)}
                theme={theme}
            />
        </div>
    );
}
