'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { durationSeconds, delaySeconds, stagger, transition as t } from '@/design-system';
import { usePathname } from 'next/navigation';
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
            animate(count, target, { duration: durationSeconds.cinematic, ease: [0.22, 1, 0.36, 1] });
        }
    }, [isInView, count, target]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

// Pulse dot for live indicators
function PulseDot({ color = 'bg-green-400' }: { color?: string }) {
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

    const pathname = usePathname();
    const [direction, setDirection] = useState(0);

    // Define route order for directional transitions
    useEffect(() => {
        const ROUTES = [
            '/portfolio/workflow',
            '/portfolio/jobseeking',
            '/portfolio/market-intelligence',
            '/portfolio/accessibility',
            '/portfolio/game-strategy',
            '/portfolio/healthcare-prioritization'
        ];
        const prevPath = sessionStorage.getItem('prevPath');
        if (prevPath) {
            const prevIdx = ROUTES.findIndex(r => pathname.includes(r.split('/').pop()!));
            const currIdx = ROUTES.findIndex(r => prevPath.includes(r.split('/').pop()!));
            setDirection(prevIdx > currIdx ? 1 : -1);
        }
        sessionStorage.setItem('prevPath', pathname);
    }, [pathname]);

    const pageVariants = {
        initial: (dir: number) => ({
            opacity: 0,
            x: dir * 60,
            scale: 0.98
        }),
        animate: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: durationSeconds.slow,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: stagger.slow
            }
        },
        exit: (dir: number) => ({
            opacity: 0,
            x: dir * -40,
            scale: 0.98,
            transition: t.snap
        })
    };

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={pathname}
                custom={direction}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                className="min-h-screen bg-[var(--background)] transition-colors duration-300 relative"
            >

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
                            <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px]" />
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
                                    label: locale === 'fi' ? 'Katso interaktiiviset prototyypit' : 'Play prototype',
                                    icon: 'play_circle',
                                    variant: 'primary',
                                    onClick: () => {
                                        setTimeout(() => {
                                            document.getElementById('interactive-prototypes')?.scrollIntoView({ behavior: 'smooth' });
                                        }, 100);
                                    },
                                },
                                {
                                    label: locale === 'fi' ? 'Sovelluksen arkkitehtuuri & työnkulku' : 'Architect & Workflow',
                                    icon: 'account_tree',
                                    variant: 'secondary',
                                    onClick: () => setIsWorkflowModalOpen(true),
                                },
                                {
                                    label: locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'Design System',
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
                            initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8, delay: delaySeconds.lg }}
                        >
                            {[
                                { icon: 'query_stats', value: 98, suffix: '%', label: locale === 'fi' ? 'Lähdetarkkuus' : 'Source Accuracy', color: 'from-green-600 to-cyan-500', dotColor: 'bg-green-400' },
                                { icon: 'speed', value: 200, suffix: 'ms', label: locale === 'fi' ? 'Keskimääräinen viive' : 'Avg Response', color: 'from-blue-500 to-indigo-500', dotColor: 'bg-blue-400' },
                                { icon: 'trending_up', value: 15, suffix: 'K+', label: locale === 'fi' ? 'Päivittäiset kyselyt' : 'Daily Queries', color: 'from-purple-500 to-pink-500', dotColor: 'bg-purple-400' },
                                { icon: 'shield', value: 99, suffix: '.9%', label: locale === 'fi' ? 'Käytettävyys' : 'Uptime', color: 'from-[var(--color-ember)] to-amber-600', dotColor: 'bg-[var(--color-ember-light)]' },
                            ].map((metric, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16, scale: 0.94 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 340, damping: 26, mass: 0.8, delay: delaySeconds.xl + i * stagger.normal }}
                                    whileHover={{ y: -4, scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                                    className="relative group p-5 rounded-2xl border backdrop-blur-sm overflow-hidden transition-all duration-300 bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)] shadow-sm"
                                >
                                    {/* Gradient glow on hover */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${metric.color} pointer-events-none`} style={{ opacity: 0 }} />
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 bg-gradient-to-br ${metric.color} pointer-events-none`} />

                                    <div className="relative z-10 flex items-start justify-between mb-3">
                                        <span className="material-symbols text-xl text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors" aria-hidden="true">
                                            {metric.icon}
                                        </span>
                                        <PulseDot color={metric.dotColor} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-2xl font-bold tabular-nums mb-1 text-[var(--foreground)]">
                                            <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                                        </div>
                                        <div className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                                            {metric.label}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* ═══ INTRO ═══ */}
                        <motion.div
                            className="text-center mb-20 relative"
                            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ type: "spring", stiffness: 260, damping: 28, delay: delaySeconds.xs }}
                        >
                            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-[var(--muted-foreground)]">
                                {content.intro}
                            </p>
                        </motion.div>

                        {/* ═══ SECTION 1: OVERVIEW ═══ */}
                        <CaseStudySection title={content.overviewTab} icon="visibility" number={1} accent="blue">
                            <CaseStudyItem>
                                <div className="grid md:grid-cols-2 gap-8 mb-14">
                                    {[
                                        { icon: 'warning', title: content.problemTitle, desc: content.problemDesc, gradient: 'from-red-600 to-[var(--color-ember)]', iconBg: 'bg-red-500/10', iconColor: 'text-ds-error', borderColor: 'border-red-500/20' },
                                        { icon: 'lightbulb', title: content.solutionTitle, desc: content.solutionDesc, gradient: 'from-green-600 to-cyan-500', iconBg: 'bg-green-600/10', iconColor: 'text-ds-success', borderColor: 'border-green-600/20' },
                                    ].map((card, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 28, scale: 0.96, filter: 'blur(4px)' }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                            viewport={{ once: true, margin: '-40px' }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.8, delay: i * 0.12 }}
                                            whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                                            className={`relative group p-7 rounded-2xl border overflow-hidden transition-all duration-500 bg-[var(--card-from-bg)] ${card.borderColor} hover:shadow-lg`}
                                        >
                                            {/* Top gradient line */}
                                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.iconBg} mb-5`}>
                                                <span className={`material-symbols text-2xl ${card.iconColor}`}>{card.icon}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-[var(--foreground)]">{card.title}</h3>
                                            <p className="leading-relaxed text-[var(--muted-foreground)]">{card.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </CaseStudyItem>

                            <CaseStudyItem>
                                <h2 className="text-xl font-semibold mb-8 text-[var(--foreground)]">{content.objectivesTitle}</h2>

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
                                            transition={{ type: 'spring', stiffness: 360, damping: 28, delay: index * 0.06 }}
                                            whileHover={{ x: 6, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                                            className="group flex items-center gap-4 py-4 px-4 rounded-xl transition-all duration-300 hover:bg-[var(--card-from-bg)]"
                                        >
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 bg-[var(--primary)]/10 text-[var(--accent-text)] group-hover:bg-[var(--primary)]/20">
                                                <span className="material-symbols text-lg">{objective.icon}</span>
                                            </div>
                                            <p className="leading-relaxed font-medium text-[var(--foreground)]/80">{objective.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </CaseStudyItem>
                        </CaseStudySection>

                        {/* ═══ SECTION 2: STRATEGIC RATIONALE ═══ */}
                        <CaseStudySection title={content.rationaleTitle} icon="lightbulb" number={2} accent="purple">
                            <CaseStudyItem>
                                <p className="text-lg max-w-3xl mx-auto mb-12 text-[var(--muted-foreground)]">
                                    {content.rationaleSubtitle}
                                </p>

                                <div className="space-y-0 relative">
                                    {/* Vertical connector line */}
                                    <div className="absolute left-[22px] top-8 bottom-8 w-[2px] bg-[var(--card-border)]" />

                                    {[
                                        { index: "01", title: content.rationaleItem1Title, desc: content.rationaleItem1Desc, color: "from-[var(--color-blue-vivid)] to-cyan-500", dotColor: "bg-[var(--primary)]" },
                                        { index: "02", title: content.rationaleItem2Title, desc: content.rationaleItem2Desc, color: "from-green-600 to-cyan-500", dotColor: "bg-ds-success" },
                                        { index: "03", title: content.rationaleItem3Title, desc: content.rationaleItem3Desc, color: "from-[var(--color-ember)] to-amber-600", dotColor: "bg-ds-ember" },
                                        { index: "04", title: content.rationaleItem4Title, desc: content.rationaleItem4Desc, color: "from-purple-500 to-violet-500", dotColor: "bg-purple-400/50" },
                                        { index: "05", title: content.rationaleItem5Title, desc: content.rationaleItem5Desc, color: "from-pink-500 to-pink-500", dotColor: "bg-pink-500" }
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-40px" }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 28, delay: i * 0.08 }}
                                            whileHover={{ x: 8, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                                            className="group relative flex gap-6 items-start py-6 pl-2 pr-4 rounded-xl transition-all duration-300 hover:bg-[var(--card-from-bg)]/50"
                                        >
                                            {/* Timeline dot */}
                                            <div className="relative z-10 flex-shrink-0">
                                                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${item.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                                                    {item.index}
                                                </div>
                                            </div>
                                            <div className="flex-1 pt-1">
                                            <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">{item.title}</h3>
                                            <p className="leading-relaxed text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]/70 transition-colors duration-300">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CaseStudyItem>
                        </CaseStudySection>

                        {/* ═══ SECTION 3: INTERACTIVE PROTOTYPES ═══ */}
                        <CaseStudySection title={locale === 'fi' ? 'Interaktiiviset prototyypit' : 'Interactive Prototypes'} icon="smartphone" number={3} accent="indigo" id="interactive-prototypes">
                            <CaseStudyItem>
                                <p className="text-lg max-w-2xl mx-auto mb-10 text-[var(--muted-foreground)]">
                                    {locale === 'fi' ? 'Tutustu tekoälypohjaisen käyttöliittymän interaktiivisiin prototyyppeihin — jokainen suunniteltu noudattamaan kohdealustan natiiveja suunnitteluohjeita.' : 'Explore the interactive prototypes built for this platform — each designed to follow native design guidelines for their target platform.'}
                                </p>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {[
                                        {
                                            title: locale === 'fi' ? 'iOS-prototyyppi' : 'iOS Prototype',
                                            description: locale === 'fi' ? 'Rakennettu iOS 26 Human Interface Guidelines -standardin mukaan — lasiset efektit, järjestelmävärit ja natiivi välilehtipalkkinavigointi.' : 'Built with iOS 26 Human Interface Guidelines — frosted glass vibrancy, SF system colors, and native tab bar navigation.',
                                            href: "/mobile/market-intelligence/ios",
                                            icon: (<span className="material-symbols text-4xl">phone_iphone</span>),
                                            gradient: "from-[var(--primary)]/15 to-[var(--gradient-mid)]/15",
                                            borderColor: "border-[var(--primary)]/20",
                                            iconBg: "bg-[var(--primary)]/10 text-accent",
                                            buttonBg: "bg-gradient-to-r from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 border border-[var(--card-border)] hover:from-[var(--primary)]/20 hover:to-[var(--gradient-mid)]/20 hover:border-[var(--primary)]/50",
                                        },
                                        {
                                            title: locale === 'fi' ? 'Android-prototyyppi' : 'Android Prototype',
                                            description: locale === 'fi' ? 'Rakennettu Material You (Android 16) -standardin mukaan — dynaaminen väri, pillerinavigointi ja Material Symbols.' : 'Built with Material You (Android 16) — dynamic color, pill navigation, rounded containers, and Material Symbols.',
                                            href: "/mobile/market-intelligence/android",
                                            icon: (<span className="material-symbols text-4xl">phone_android</span>),
                                            gradient: "from-[var(--primary)]/15 to-[var(--gradient-mid)]/15",
                                            borderColor: "border-[var(--primary)]/20",
                                            iconBg: "bg-[var(--primary)]/10 text-accent",
                                            buttonBg: "bg-gradient-to-r from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 border border-[var(--card-border)] hover:from-[var(--primary)]/20 hover:to-[var(--gradient-mid)]/20 hover:border-[var(--primary)]/50",
                                        },
                                    ].map((proto, index) => (
                                        <motion.a
                                            key={index}
                                            href={proto.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`group p-6 rounded-2xl transition-all duration-300 border ${proto.borderColor} bg-gradient-to-br ${proto.gradient} flex flex-col hover:shadow-lg`}
                                            initial={{ opacity: 0, y: 14 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15 }}
                                            whileHover={{ y: -2 }}
                                        >
                                            <div className={`h-10 w-10 flex items-center justify-center rounded-full mb-3 ${proto.iconBg}`}>
                                                {proto.icon}
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2 text-[var(--foreground)]">{proto.title}</h3>
                                            <p className="text-sm mb-6 flex-grow text-[var(--muted-foreground)]">{proto.description}</p>
                                            <div className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg text-[var(--primary)] text-sm font-semibold transition-colors self-start ${proto.buttonBg}`}>
                                                <span>{locale === 'fi' ? 'Avaa prototyyppi' : 'Open Prototype'}</span>
                                                <span className="material-symbols text-base group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </CaseStudyItem>

                            {/* ═══ CORE APP FUNCTIONALITY — INTERACTIVE SHOWCASE ═══ */}
                            <CaseStudyItem>
                                <motion.div
                                    className="mt-20"
                                    initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
                                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                                >
                                    <div className="text-center mb-14">
                                        <h3 className="text-2xl font-bold mb-4 text-[var(--foreground)]">
                                            {content.appFunctionalityTitle}
                                        </h3>
                                        <p className="text-lg max-w-2xl mx-auto text-[var(--muted-foreground)]">
                                            {content.appFunctionalityDesc}
                                        </p>
                                    </div>

                                    {/* 2×2 Bento Feature Grid */}
                                    <div className="grid sm:grid-cols-2 gap-5">

                                        {/* Feature 1 — Conversational AI Search */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0 }}
                                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 24 } }}
                                            className="group relative p-6 rounded-2xl border overflow-hidden bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all duration-300"
                                        >
                                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--primary)] to-[var(--gradient-mid)]" />
                                            <div className="flex items-start gap-3 mb-5">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--primary)]/10 text-[var(--accent-text)] shrink-0">
                                                    <span className="material-symbols text-xl" aria-hidden="true">search_insights</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[var(--foreground)]">{content.feat1Title}</h4>
                                                    <p className="text-sm text-[var(--muted-foreground)] mt-1 leading-relaxed">{content.feat1Desc}</p>
                                                </div>
                                            </div>
                                            {/* Mini chat mockup */}
                                            <div className="space-y-2.5">
                                                <div className="flex justify-end">
                                                    <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--accent-text)] text-xs px-3 py-1.5 rounded-2xl rounded-tr-sm font-medium max-w-[85%]">
                                                        {locale === 'fi' ? 'Näytä AAPL Q3 tulokset' : 'Show AAPL Q3 earnings highlights'}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 items-start">
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center shrink-0 mt-0.5">
                                                        <span className="material-symbols text-[10px] text-white" aria-hidden="true">smart_toy</span>
                                                    </div>
                                                    <div className="bg-[var(--card-to-bg)] border border-[var(--card-border)] text-[var(--foreground)] text-xs px-3 py-1.5 rounded-2xl rounded-tl-sm max-w-[85%]">
                                                        <span className="opacity-80">{locale === 'fi' ? 'Liikevaihto kasvoi 8 % YoY...' : 'Revenue grew 8% YoY to $94.9B...'}</span>
                                                        <span className="ml-1 text-[var(--accent-text)] font-semibold">[1]</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-1.5 pl-8">
                                                    <span className="text-[10px] text-[var(--muted-foreground)] bg-[var(--card-to-bg)] border border-[var(--card-border)] px-2 py-0.5 rounded-full">Apple 10-Q ↗</span>
                                                    <span className="text-[10px] text-[var(--muted-foreground)] bg-[var(--card-to-bg)] border border-[var(--card-border)] px-2 py-0.5 rounded-full">Earnings Call ↗</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Feature 2 — Real-Time Sentiment Analysis */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.08 }}
                                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 24 } }}
                                            className="group relative p-6 rounded-2xl border overflow-hidden bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all duration-300"
                                        >
                                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-500 to-cyan-500" />
                                            <div className="flex items-start gap-3 mb-5">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-500/10 text-green-500 shrink-0">
                                                    <span className="material-symbols text-xl" aria-hidden="true">query_stats</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[var(--foreground)]">{content.feat2Title}</h4>
                                                    <p className="text-sm text-[var(--muted-foreground)] mt-1 leading-relaxed">{content.feat2Desc}</p>
                                                </div>
                                            </div>
                                            {/* Sentiment bars */}
                                            <div className="space-y-2.5">
                                                {[
                                                    { label: locale === 'fi' ? 'Positiivinen' : 'Bullish', pct: 72, color: 'bg-green-500' },
                                                    { label: locale === 'fi' ? 'Neutraali'    : 'Neutral',  pct: 18, color: 'bg-[var(--muted-foreground)]/40' },
                                                    { label: locale === 'fi' ? 'Negatiivinen' : 'Bearish', pct: 10, color: 'bg-red-400' },
                                                ].map((s) => (
                                                    <div key={s.label} className="flex items-center gap-2">
                                                        <span className="text-[11px] text-[var(--muted-foreground)] w-16 shrink-0">{s.label}</span>
                                                        <div className="flex-1 h-1.5 rounded-full bg-[var(--card-border)] overflow-hidden">
                                                            <motion.div
                                                                className={`h-full rounded-full ${s.color}`}
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${s.pct}%` }}
                                                                viewport={{ once: true }}
                                                                transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.3 }}
                                                            />
                                                        </div>
                                                        <span className="text-[11px] font-semibold text-[var(--foreground)] tabular-nums w-8 text-right">{s.pct}%</span>
                                                    </div>
                                                ))}
                                                <p className="text-[10px] text-[var(--muted-foreground)] flex items-center gap-1.5 pt-1">
                                                    <PulseDot color="bg-green-400" />
                                                    <span>{locale === 'fi' ? 'Päivitetty juuri nyt' : 'Updated just now'}</span>
                                                </p>
                                            </div>
                                        </motion.div>

                                        {/* Feature 3 — Smart Event Alerts */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.14 }}
                                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 24 } }}
                                            className="group relative p-6 rounded-2xl border overflow-hidden bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all duration-300"
                                        >
                                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500" />
                                            <div className="flex items-start gap-3 mb-5">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-500 shrink-0">
                                                    <span className="material-symbols text-xl" aria-hidden="true">notifications_active</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[var(--foreground)]">{content.feat3Title}</h4>
                                                    <p className="text-sm text-[var(--muted-foreground)] mt-1 leading-relaxed">{content.feat3Desc}</p>
                                                </div>
                                            </div>
                                            {/* Mock notification cards */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                                    <span className="material-symbols text-base text-amber-500 shrink-0" aria-hidden="true">trending_up</span>
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-semibold text-[var(--foreground)] truncate">MSFT earnings beat — +4.2%</p>
                                                        <p className="text-[10px] text-[var(--muted-foreground)]">2 min ago · {locale === 'fi' ? 'Korkea' : 'High priority'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[var(--card-to-bg)] border border-[var(--card-border)]">
                                                    <span className="material-symbols text-base text-[var(--muted-foreground)] shrink-0" aria-hidden="true">article</span>
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-medium text-[var(--muted-foreground)] truncate">Fed holds rates at 4.5%</p>
                                                        <p className="text-[10px] text-[var(--muted-foreground)]/60">18 min ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Feature 4 — Automated Briefings */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 26, delay: 0.20 }}
                                            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 24 } }}
                                            className="group relative p-6 rounded-2xl border overflow-hidden bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)] transition-all duration-300"
                                        >
                                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500" />
                                            <div className="flex items-start gap-3 mb-5">
                                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 text-purple-500 shrink-0">
                                                    <span className="material-symbols text-xl" aria-hidden="true">summarize</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[var(--foreground)]">{content.feat4Title}</h4>
                                                    <p className="text-sm text-[var(--muted-foreground)] mt-1 leading-relaxed">{content.feat4Desc}</p>
                                                </div>
                                            </div>
                                            {/* Mini audio briefing card */}
                                            <div className="px-3.5 py-3 rounded-xl bg-[var(--card-to-bg)] border border-[var(--card-border)] flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">
                                                    <span className="material-symbols text-sm text-white" aria-hidden="true">play_arrow</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-[var(--foreground)] truncate">
                                                        {locale === 'fi' ? 'Aamu-katsaus — 29.3.2026' : 'Morning Briefing — Mar 29, 2026'}
                                                    </p>
                                                    <div className="flex items-end gap-[2px] mt-1.5 h-5">
                                                        {[3,5,7,4,6,8,5,7,4,6,7,5,8,6,4,7,5,6,8,4,6,5,7,4].map((h, i) => (
                                                            <div key={i} className="w-[2px] rounded-full bg-purple-400/60" style={{ height: `${h}px` }} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-[var(--muted-foreground)] tabular-nums shrink-0">3:42</span>
                                            </div>
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
                                        { icon: 'phone_iphone', title: content.iosPatternsTitle, desc: content.iosPatternsDesc, gradient: 'from-gray-500 to-gray-600', iconBg: 'bg-[var(--muted-foreground)]/10 text-[var(--muted-foreground)]', borderColor: 'border-[var(--card-border)]' },
                                        { icon: 'android', title: content.androidPatternsTitle, desc: content.androidPatternsDesc, gradient: 'from-green-600 to-green-600', iconBg: 'bg-green-600/10 text-green-500', borderColor: 'border-green-600/20' },
                                    ].map((platform, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            viewport={{ once: true, margin: '-30px' }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 26, delay: i * 0.1 }}
                                            whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                                            className={`relative group p-6 rounded-2xl border overflow-hidden transition-all duration-300 bg-[var(--card-from-bg)] ${platform.borderColor} hover:shadow-md`}
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${platform.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${platform.iconBg} mb-5`}>
                                                <span className="material-symbols text-2xl">{platform.icon}</span>
                                            </div>
                                            <h3 className="text-lg font-bold mb-3 text-[var(--foreground)]">{platform.title}</h3>
                                            <p className="leading-relaxed text-[var(--muted-foreground)]">{platform.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </CaseStudyItem>

                            <CaseStudyItem>
                                <h2 className="text-xl font-semibold mb-8 text-[var(--foreground)]">{content.coreFlowsTitle}</h2>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                                    {[
                                        { icon: "forum", text: content.flow1, gradient: 'from-[var(--color-blue-vivid)] to-[var(--color-indigo-500)]' },
                                        { icon: "summarize", text: content.flow2, gradient: 'from-green-600 to-cyan-500' },
                                        { icon: "rss_feed", text: content.flow3, gradient: 'from-purple-500 to-pink-500' },
                                        { icon: "dashboard", text: content.flow4, gradient: 'from-[var(--color-ember)] to-amber-600' },
                                        { icon: "notifications_active", text: content.flow5, gradient: 'from-pink-500 to-red-500' }
                                    ].map((flow, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.94 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: '-20px' }}
                                            transition={{ type: 'spring', stiffness: 360, damping: 26, delay: index * 0.06 }}
                                            whileHover={{ y: -3, scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                                            className="group relative flex items-center gap-3 p-4 rounded-xl border overflow-hidden transition-all duration-300 bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)] shadow-sm hover:shadow-md"
                                        >
                                            <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${flow.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
                                            <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-colors bg-[var(--primary)]/10 text-[var(--accent-text)] group-hover:bg-[var(--primary)]/20">
                                                <span className="material-symbols text-base">{flow.icon}</span>
                                            </div>
                                            <p className="font-medium text-sm text-[var(--foreground)]/80">{flow.text}</p>
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
                                        { icon: "construction", title: content.frameworkTitle, desc: content.frameworkDesc, gradient: 'from-[var(--color-blue-vivid)] to-cyan-500', iconBg: 'bg-[var(--primary)]/10 text-[var(--accent-text)]' },
                                        { icon: "hourglass_top", title: content.latencyStrategyTitle, desc: content.latencyStrategyDesc, gradient: 'from-[var(--color-ember)] to-amber-600', iconBg: 'bg-amber-500/10 text-amber-500' },
                                        { icon: "psychology", title: content.aiPatternsTitle, desc: content.aiPatternsDesc, gradient: 'from-purple-500 to-violet-500', iconBg: 'bg-purple-500/10 text-purple-500' },
                                        { icon: "policy", title: content.trustTitle, desc: content.trustDesc, gradient: 'from-green-600 to-cyan-500', iconBg: 'bg-green-600/10 text-green-500' },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            viewport={{ once: true, margin: '-30px' }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 26, delay: i * 0.08 }}
                                            whileHover={{ y: -4, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                                            className="group relative p-6 rounded-2xl border overflow-hidden transition-all duration-300 bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)] hover:shadow-lg"
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                                            <motion.div whileHover={{ scale: 1.12, rotate: 3 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg} mb-5`}>
                                                <span className="material-symbols text-2xl">{item.icon}</span>
                                            </motion.div>
                                            <h3 className="text-lg font-bold mb-3 text-[var(--foreground)]">{item.title}</h3>
                                            <p className="leading-relaxed text-sm text-[var(--muted-foreground)]">{item.desc}</p>
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
                                        { icon: "ads_click", text: content.captureMetric, value: 78, gradient: 'from-[var(--color-blue-vivid)] to-[var(--color-indigo-500)]', barColor: 'bg-gradient-to-r from-[var(--color-blue-vivid)] to-[var(--color-indigo-500)]' },
                                        { icon: "check_circle", text: content.trustMetric, value: 92, gradient: 'from-green-600 to-cyan-500', barColor: 'bg-gradient-to-r from-green-600 to-cyan-500' },
                                        { icon: "monitoring", text: content.engagementMetric, value: 65, gradient: 'from-purple-500 to-pink-500', barColor: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                                        { icon: "event", text: content.retentionMetric, value: 85, gradient: 'from-[var(--color-ember)] to-amber-600', barColor: 'bg-gradient-to-r from-[var(--color-ember)] to-amber-600' },
                                    ].map((metric, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            viewport={{ once: true, margin: '-30px' }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.8, delay: index * 0.1 }}
                                            whileHover={{ y: -6, scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                                            className="group relative p-6 rounded-2xl border overflow-hidden transition-all duration-300 bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--card-border-hover)] hover:shadow-lg"
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${metric.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                            <span className="material-symbols text-2xl mb-4 block text-[var(--accent-text)]" aria-hidden="true">{metric.icon}</span>
                                            <p className="font-semibold mb-4 text-sm text-[var(--foreground)]/80">{metric.text}</p>

                                            {/* Animated progress bar */}
                                            <div className="h-1.5 rounded-full overflow-hidden bg-[var(--card-border)]">
                                                <motion.div
                                                    className={`h-full rounded-full ${metric.barColor}`}
                                                    initial={{ width: '0%' }}
                                                    whileInView={{ width: `${metric.value}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ type: "spring", stiffness: 60, damping: 18, mass: 1, delay: delaySeconds.md + index * stagger.relaxed }}
                                                />
                                            </div>
                                            <div className="mt-2 text-right text-xs font-medium tabular-nums text-[var(--muted-foreground)]">
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
            </motion.div>
        </AnimatePresence>
    );
}
