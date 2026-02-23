'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';

export default function MarketIntelligenceClient() {
    const [activeTab, setActiveTab] = useState(0);
    const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);

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

    const tabs = [
        { id: 0, label: content.overviewTab, icon: "visibility" },
        { id: 1, label: content.uxTab, icon: "smartphone" },
        { id: 2, label: content.systemTab, icon: "shield" },
        { id: 3, label: content.impactTab, icon: "account_tree" }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isColorful
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
                        <Image
                            src="/images/portfolio/market/market-intellegence.jpg"
                            alt={content.title}
                            fill
                            className="object-cover"
                            priority
                            onError={(e) => {
                                // Fallback mechanism in case cover doesn't exist
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/portfolio/workflow/cover.jpg';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="text-white">
                                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                                    {content.title}
                                </h1>
                                <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                                    {content.subtitle}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                    <button
                                        onClick={() => {
                                            setActiveTab(0);
                                            setTimeout(() => {
                                                document.getElementById('interactive-prototypes')?.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }}
                                        className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/30 w-full sm:w-auto"
                                    >
                                        <span className="material-symbols text-2xl">play_circle</span>
                                        <span>{locale === 'fi' ? 'Katso interaktiiviset prototyypit' : 'View Interactive Prototypes'}</span>
                                    </button>
                                    <button
                                        onClick={() => setIsWorkflowModalOpen(true)}
                                        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg w-full sm:w-auto ${isColorful
                                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/30'
                                            : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
                                            }`}
                                    >
                                        <span className="material-symbols text-2xl">account_tree</span>
                                        <span>{locale === 'fi' ? 'Sovelluksen arkkitehtuuri & työnkulku' : 'App Architecture & Workflow'}</span>
                                    </button>
                                    <a
                                        href="https://ds.alux.space/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all shadow-lg w-full sm:w-auto ${isColorful
                                            ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-500/30'
                                            : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20'
                                            }`}
                                    >
                                        <span className="material-symbols text-2xl">design_services</span>
                                        <span>{locale === 'fi' ? 'Tarkastele suunnittelujärjestelmää' : 'View Design System'}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Intro Section */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        <p className={`text-lg md:text-xl leading-relaxed max-w-4xl mx-auto ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                            }`}>
                            {content.intro}
                        </p>
                    </motion.div>

                    {/* Project Overview Cards */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <div className={`p-6 rounded-2xl backdrop-blur-lg ${isColorful
                            ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-400/30'
                            : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
                            }`}>
                            <span className="material-symbols text-3xl text-blue-400 mb-3 block">devices</span>
                            <h3 className={`font-bold mb-2 ${isColorful ? 'text-blue-300' : isLight ? 'text-gray-900' : 'text-white'
                                }`}>{content.projectType}</h3>
                            <p className={`text-sm ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                }`}>{content.projectTypeValues}</p>
                        </div>

                        <div className={`p-6 rounded-2xl backdrop-blur-lg ${isColorful
                            ? 'bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-400/30'
                            : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
                            }`}>
                            <span className="material-symbols text-3xl text-violet-400 mb-3 block">schedule</span>
                            <h3 className={`font-bold mb-2 ${isColorful ? 'text-violet-300' : isLight ? 'text-gray-900' : 'text-white'
                                }`}>{content.timeline}</h3>
                            <p className={`text-sm ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                }`}>{content.timelineValue}</p>
                        </div>

                        <div className={`p-6 rounded-2xl backdrop-blur-lg ${isColorful
                            ? 'bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-400/30'
                            : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
                            }`}>
                            <span className="material-symbols text-3xl text-emerald-400 mb-3 block">memory</span>
                            <h3 className={`font-bold mb-2 ${isColorful ? 'text-emerald-300' : isLight ? 'text-gray-900' : 'text-white'
                                }`}>{content.standards}</h3>
                            <p className={`text-sm ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                }`}>{content.standardsValue}</p>
                        </div>

                        <div className={`p-6 rounded-2xl backdrop-blur-lg ${isColorful
                            ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400/30'
                            : isLight ? 'bg-white shadow-xl' : 'bg-gray-800/80'
                            }`}>
                            <span className="material-symbols text-3xl text-amber-400 mb-3 block">person</span>
                            <h3 className={`font-bold mb-2 ${isColorful ? 'text-amber-300' : isLight ? 'text-gray-900' : 'text-white'
                                }`}>{content.roles}</h3>
                            <p className={`text-sm ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                }`}>{content.rolesValue}</p>
                        </div>
                    </motion.div>

                    {/* Tab Navigation */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >
                        <div className={`flex overflow-x-auto rounded-2xl p-2 scrollbar-none ${isColorful
                            ? 'bg-blue-900/30 backdrop-blur-lg border border-blue-400/30'
                            : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                            }`}>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                        ? isColorful
                                            ? 'bg-gradient-to-r from-blue-500/40 to-indigo-500/40 text-blue-300 border border-blue-400/50'
                                            : isLight
                                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                                        : isColorful
                                            ? 'text-gray-300 hover:bg-blue-500/20'
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
                                {/* Problem vs Solution */}
                                <div className="grid md:grid-cols-2 gap-8 mb-16">
                                    <div className={`p-8 rounded-3xl ${isColorful
                                        ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20'
                                        : isLight ? 'bg-red-50' : 'bg-gray-800/50 border border-red-900/50'
                                        }`}>
                                        <span className="material-symbols text-4xl text-red-500 mb-4 block">warning</span>
                                        <h3 className={`text-2xl font-bold mb-4 ${isColorful ? 'text-red-400' : isLight ? 'text-red-900' : 'text-red-400'
                                            }`}>{content.problemTitle}</h3>
                                        <p className={`text-lg leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-700' : 'text-gray-300'
                                            }`}>{content.problemDesc}</p>
                                    </div>

                                    <div className={`p-8 rounded-3xl ${isColorful
                                        ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20'
                                        : isLight ? 'bg-emerald-50' : 'bg-gray-800/50 border border-emerald-900/50'
                                        }`}>
                                        <span className="material-symbols text-4xl text-emerald-500 mb-4 block">lightbulb</span>
                                        <h3 className={`text-2xl font-bold mb-4 ${isColorful ? 'text-emerald-400' : isLight ? 'text-emerald-900' : 'text-emerald-400'
                                            }`}>{content.solutionTitle}</h3>
                                        <p className={`text-lg leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-700' : 'text-gray-300'
                                            }`}>{content.solutionDesc}</p>
                                    </div>
                                </div>

                                {/* Objectives Section */}
                                <motion.section
                                    className="mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                >
                                    <h2 className={`text-3xl font-bold mb-8 ${isColorful
                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400'
                                        : isLight ? 'text-gray-900' : 'text-white'
                                        }`}>{content.objectivesTitle}</h2>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[
                                            { icon: "chat_bubble", text: content.objective1 },
                                            { icon: "gavel", text: content.objective2 },
                                            { icon: "feed", text: content.objective3 },
                                            { icon: "finance", text: content.objective4 },
                                            { icon: "security", text: content.objective5 }
                                        ].map((objective, index) => (
                                            <div key={index} className={`p-6 rounded-2xl ${isColorful
                                                ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-400/30 backdrop-blur-lg'
                                                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                                                }`}>
                                                <span className={`material-symbols text-2xl mb-4 block ${isColorful ? 'text-blue-400' : isLight ? 'text-indigo-500' : 'text-indigo-400'
                                                    }`}>{objective.icon}</span>
                                                <p className={`font-medium ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>{objective.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>

                                {/* Strategic Choices Section */}
                                <motion.section
                                    className="mb-16 pt-16 border-t border-gray-200 dark:border-gray-800"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <div className="text-center mb-12">
                                        <h2 className={`text-3xl font-bold mb-4 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : isLight ? 'text-gray-900' : 'text-white'}`}>
                                            {content.rationaleTitle}
                                        </h2>
                                        <p className={`text-lg max-w-2xl mx-auto ${isColorful ? 'text-purple-200' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {content.rationaleSubtitle}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { index: "01", title: content.rationaleItem1Title, desc: content.rationaleItem1Desc, color: "text-blue-500", bg: isColorful ? "from-blue-900/40 to-indigo-900/40 border-blue-500/30" : isLight ? "from-blue-50 to-indigo-50" : "from-blue-900/20 to-indigo-900/20 border-blue-800/50" },
                                            { index: "02", title: content.rationaleItem2Title, desc: content.rationaleItem2Desc, color: "text-emerald-500", bg: isColorful ? "from-emerald-900/40 to-teal-900/40 border-emerald-500/30" : isLight ? "from-emerald-50 to-teal-50" : "from-emerald-900/20 to-teal-900/20 border-emerald-800/50" },
                                            { index: "03", title: content.rationaleItem3Title, desc: content.rationaleItem3Desc, color: "text-orange-500", bg: isColorful ? "from-orange-900/40 to-red-900/40 border-orange-500/30" : isLight ? "from-orange-50 to-red-50" : "from-orange-900/20 to-red-900/20 border-orange-800/50" },
                                            { index: "04", title: content.rationaleItem4Title, desc: content.rationaleItem4Desc, color: "text-purple-500", bg: isColorful ? "from-purple-900/40 to-fuchsia-900/40 border-purple-500/30" : isLight ? "from-purple-50 to-fuchsia-50" : "from-purple-900/20 to-fuchsia-900/20 border-purple-800/50" },
                                            { index: "05", title: content.rationaleItem5Title, desc: content.rationaleItem5Desc, color: "text-rose-500", bg: isColorful ? "from-rose-900/40 to-pink-900/40 border-rose-500/30" : isLight ? "from-rose-50 to-pink-50" : "from-rose-900/20 to-pink-900/20 border-rose-800/50" }
                                        ].map((item, i) => (
                                            <div key={i} className={`p-8 rounded-3xl flex flex-col md:flex-row gap-6 md:items-center ${isColorful ? `bg-gradient-to-r border backdrop-blur-md ${item.bg}` : isLight ? `bg-gradient-to-r ${item.bg} border border-transparent` : `bg-gradient-to-r border ${item.bg}`}`}>
                                                <div className={`text-4xl md:text-5xl font-black ${item.color} opacity-80 shrink-0`}>
                                                    {item.index}
                                                </div>
                                                <div>
                                                    <h3 className={`text-xl font-bold mb-2 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                                                    <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-700' : 'text-gray-400'}`}>{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>

                                {/* Embedded Mobile Prototypes */}
                                <motion.section
                                    id="interactive-prototypes"
                                    className="pt-16 mt-16 border-t border-gray-200 dark:border-gray-800"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                >
                                    <div className="text-center mb-12">
                                        <h2 className={`text-3xl font-bold mb-4 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400' : isLight ? 'text-gray-900' : 'text-white'}`}>Interactive Prototypes</h2>
                                        <p className={`text-lg max-w-2xl mx-auto ${isColorful ? 'text-indigo-200' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>Experience the AI-powered interface natively across iOS and Android side-by-side.</p>
                                    </div>

                                    <div className="flex flex-col xl:flex-row gap-12 items-center xl:items-start justify-center overflow-visible">
                                        {/* iOS Prototype */}
                                        <div className="flex flex-col items-center">
                                            <div className={`flex items-center space-x-2 mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                                                <span className="material-symbols text-2xl">phone_iphone</span>
                                                <h3 className="text-xl font-medium">iOS 26 Style</h3>
                                            </div>
                                            <div className="transform scale-[0.80] sm:scale-[0.85] origin-top">
                                                <div
                                                    className={`w-[390px] h-[844px] shrink-0 rounded-[3rem] border-[8px] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isLight ? 'border-gray-800 bg-white' : 'border-neutral-800 bg-black'}`}
                                                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', isolation: 'isolate' }}
                                                >
                                                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] rounded-b-3xl z-50 ${isLight ? 'bg-gray-800' : 'bg-black'}`}></div>
                                                    <iframe
                                                        src={`/mobile?os=ios&theme=${theme}`}
                                                        title="iOS Prototype"
                                                        className="w-full h-full border-none rounded-[2.5rem]"
                                                        allow="payment; fullscreen"
                                                    />
                                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full z-50"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Android Prototype */}
                                        <div className="flex flex-col items-center">
                                            <div className={`flex items-center space-x-2 mb-6 ${isLight ? 'text-teal-600' : 'text-[#4dd0e1]'}`}>
                                                <span className="material-symbols text-2xl">android</span>
                                                <h3 className="text-xl font-medium font-sans">Android 16 Style</h3>
                                            </div>
                                            <div className="transform scale-[0.80] sm:scale-[0.85] origin-top">
                                                <div
                                                    className={`w-[412px] h-[892px] shrink-0 rounded-[2.5rem] border-[6px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] relative ${isLight ? 'border-gray-800 bg-white' : 'border-neutral-800 bg-black'}`}
                                                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)', isolation: 'isolate' }}
                                                >
                                                    <iframe
                                                        src={`/mobile?os=android&theme=${theme}`}
                                                        title="Android Prototype"
                                                        className="w-full h-full border-none rounded-[2rem]"
                                                        allow="payment; fullscreen"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* App Functionality Section */}
                                    <motion.div
                                        className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-16"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <div className="text-center mb-12">
                                            <h3 className={`text-3xl font-bold mb-4 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400' : isLight ? 'text-gray-900' : 'text-white'}`}>
                                                {content.appFunctionalityTitle}
                                            </h3>
                                            <p className={`text-lg max-w-2xl mx-auto ${isColorful ? 'text-indigo-200' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                                {content.appFunctionalityDesc}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {[
                                                { icon: "search_insights", title: content.feat1Title, desc: content.feat1Desc },
                                                { icon: "query_stats", title: content.feat2Title, desc: content.feat2Desc },
                                                { icon: "notifications_active", title: content.feat3Title, desc: content.feat3Desc },
                                                { icon: "summarize", title: content.feat4Title, desc: content.feat4Desc }
                                            ].map((feature, index) => (
                                                <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${isColorful
                                                    ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
                                                    : isLight ? 'bg-white shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10' : 'bg-gray-800/80 hover:bg-gray-800 hover:shadow-xl hover:shadow-indigo-500/10 border border-gray-700/50'}`}>
                                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${isColorful ? 'bg-indigo-500/20 text-indigo-300' : isLight ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900/50 text-indigo-400'}`}>
                                                        <span className="material-symbols text-3xl">{feature.icon}</span>
                                                    </div>
                                                    <h4 className={`text-xl font-bold mb-3 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{feature.title}</h4>
                                                    <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>{feature.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </motion.section>
                            </motion.div>
                        )}

                        {/* UX & Patterns Tab */}
                        {activeTab === 1 && (
                            <motion.div
                                key="system"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="grid md:grid-cols-2 gap-8 mb-16">
                                    {/* iOS Patterns */}
                                    <div className={`p-8 rounded-2xl ${isColorful
                                        ? 'bg-gradient-to-br from-zinc-800/80 to-stone-900/80 border border-zinc-600/50'
                                        : isLight ? 'bg-white shadow-xl' : 'bg-gray-800'
                                        }`}>
                                        <div className="flex items-center mb-6">
                                            <span className="material-symbols text-3xl text-gray-400 mr-4">phone_iphone</span>
                                            <h3 className={`text-2xl font-bold ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'
                                                }`}>{content.iosPatternsTitle}</h3>
                                        </div>
                                        <p className={`text-lg mb-6 ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                            }`}>{content.iosPatternsDesc}</p>
                                    </div>

                                    {/* Android Patterns */}
                                    <div className={`p-8 rounded-2xl ${isColorful
                                        ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-500/30'
                                        : isLight ? 'bg-white shadow-xl' : 'bg-gray-800'
                                        }`}>
                                        <div className="flex items-center mb-6">
                                            <span className="material-symbols text-3xl text-green-500 mr-4">android</span>
                                            <h3 className={`text-2xl font-bold ${isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                                                }`}>{content.androidPatternsTitle}</h3>
                                        </div>
                                        <p className={`text-lg mb-6 ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                            }`}>{content.androidPatternsDesc}</p>
                                    </div>
                                </div>

                                <motion.section
                                    className="mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                >
                                    <h2 className={`text-3xl font-bold mb-8 ${isColorful
                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400'
                                        : isLight ? 'text-gray-900' : 'text-white'
                                        }`}>{content.coreFlowsTitle}</h2>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[
                                            { icon: "forum", text: content.flow1 },
                                            { icon: "summarize", text: content.flow2 },
                                            { icon: "rss_feed", text: content.flow3 },
                                            { icon: "dashboard", text: content.flow4 },
                                            { icon: "notifications_active", text: content.flow5 }
                                        ].map((flow, index) => (
                                            <div key={index} className={`p-6 rounded-2xl flex items-center space-x-4 ${isColorful
                                                ? 'bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-400/30 backdrop-blur-lg'
                                                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                                                }`}>
                                                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${isColorful ? 'bg-indigo-500/20 text-indigo-300' : isLight ? 'bg-indigo-100 text-indigo-600' : 'bg-indigo-900/50 text-indigo-400'
                                                    }`}>
                                                    <span className="material-symbols text-xl">{flow.icon}</span>
                                                </div>
                                                <p className={`font-medium md:text-lg ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>{flow.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>
                            </motion.div>
                        )}

                        {/* Design System & Trust Tab */}
                        {activeTab === 2 && (
                            <motion.div
                                key="system2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="grid md:grid-cols-2 gap-8 mb-16">
                                    {/* Frame & Latency */}
                                    <div>
                                        <div className={`p-8 rounded-2xl mb-8 ${isColorful
                                            ? 'bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/30'
                                            : isLight ? 'bg-white shadow-xl' : 'bg-gray-800'
                                            }`}>
                                            <div className="flex items-center mb-6">
                                                <span className="material-symbols text-3xl text-blue-500 mr-4">construction</span>
                                                <h3 className={`text-2xl font-bold ${isColorful ? 'text-blue-300' : isLight ? 'text-gray-900' : 'text-white'
                                                    }`}>{content.frameworkTitle}</h3>
                                            </div>
                                            <p className={`text-lg mb-6 ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                                }`}>{content.frameworkDesc}</p>
                                        </div>

                                        <div className={`p-8 rounded-2xl ${isColorful
                                            ? 'bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-500/30'
                                            : isLight ? 'bg-white shadow-xl' : 'bg-gray-800'
                                            }`}>
                                            <div className="flex items-center mb-6">
                                                <span className="material-symbols text-3xl text-orange-500 mr-4">hourglass_top</span>
                                                <h3 className={`text-2xl font-bold ${isColorful ? 'text-orange-300' : isLight ? 'text-gray-900' : 'text-white'
                                                    }`}>{content.latencyStrategyTitle}</h3>
                                            </div>
                                            <p className={`text-lg mb-6 ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                                }`}>{content.latencyStrategyDesc}</p>
                                        </div>
                                    </div>

                                    {/* AI Patterns & Trust */}
                                    <div>
                                        <div className={`p-8 rounded-2xl mb-8 ${isColorful
                                            ? 'bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 border border-purple-500/30'
                                            : isLight ? 'bg-white shadow-xl' : 'bg-gray-800'
                                            }`}>
                                            <div className="flex items-center mb-6">
                                                <span className="material-symbols text-3xl text-purple-500 mr-4">psychology</span>
                                                <h3 className={`text-2xl font-bold ${isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white'
                                                    }`}>{content.aiPatternsTitle}</h3>
                                            </div>
                                            <p className={`text-lg mb-6 ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                                }`}>{content.aiPatternsDesc}</p>
                                        </div>

                                        <div className={`p-8 rounded-2xl ${isColorful
                                            ? 'bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border border-emerald-500/30'
                                            : isLight ? 'bg-white shadow-xl' : 'bg-gray-800'
                                            }`}>
                                            <div className="flex items-center mb-6">
                                                <span className="material-symbols text-3xl text-emerald-500 mr-4">policy</span>
                                                <h3 className={`text-2xl font-bold ${isColorful ? 'text-emerald-300' : isLight ? 'text-gray-900' : 'text-white'
                                                    }`}>{content.trustTitle}</h3>
                                            </div>
                                            <p className={`text-lg mb-6 ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                                }`}>{content.trustDesc}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Implementation Tab */}
                        {activeTab === 3 && (
                            <motion.div
                                key="impact"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.section
                                    className="mb-16"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                >
                                    <h2 className={`text-3xl font-bold mb-8 ${isColorful
                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400'
                                        : isLight ? 'text-gray-900' : 'text-white'
                                        }`}>{content.metricsTitle}</h2>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { icon: "ads_click", text: content.captureMetric },
                                            { icon: "check_circle", text: content.trustMetric },
                                            { icon: "monitoring", text: content.engagementMetric },
                                            { icon: "event", text: content.retentionMetric },
                                        ].map((objective, index) => (
                                            <div key={index} className={`p-6 rounded-2xl ${isColorful
                                                ? 'bg-gradient-to-br from-teal-900/30 to-emerald-900/30 border border-teal-400/30 backdrop-blur-lg'
                                                : isLight ? 'bg-white shadow-lg' : 'bg-gray-800'
                                                }`}>
                                                <span className={`material-symbols text-3xl mb-4 block ${isColorful ? 'text-teal-400' : isLight ? 'text-teal-500' : 'text-teal-400'
                                                    }`}>{objective.icon}</span>
                                                <p className={`font-medium ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>{objective.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>

                            </motion.div>
                        )}

                    </div>
                </div>
            </main>

            {/* Workflow Diagram Modal */}
            <AnimatePresence>
                {isWorkflowModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsWorkflowModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className={`relative w-full max-w-6xl h-[90vh] sm:h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border ${isLight ? 'bg-[#FAFAFA] border-gray-300' : 'bg-[#111114] border-gray-800'}`}
                        >
                            {/* Modal Header */}
                            <div className={`flex justify-between items-center p-4 sm:p-6 border-b shrink-0 ${isLight ? 'bg-white/80 border-gray-200' : 'bg-black/40 border-gray-800'} backdrop-blur-md z-20 relative`}>
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isColorful ? 'bg-purple-500/20 text-purple-400' : isLight ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/50 text-purple-400'}`}>
                                        <span className="material-symbols text-2xl">account_tree</span>
                                    </div>
                                    <div>
                                        <h3 className={`text-lg sm:text-xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>App Architecture</h3>
                                        <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>System Workflow Diagram</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setIsWorkflowModalOpen(false)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isLight ? 'bg-gray-200 hover:bg-gray-300 text-gray-600' : 'bg-gray-800 hover:bg-gray-700 text-gray-400'}`}
                                    >
                                        <span className="material-symbols">close</span>
                                    </button>
                                </div>
                            </div>

                            {/* Diagram Content */}
                            <div className="flex-1 overflow-auto relative custom-scrollbar">
                                {/* Ambient Background Glows */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                                    <div className={`absolute top-0 -left-64 w-96 h-96 rounded-full blur-3xl opacity-20 ${isColorful ? 'bg-purple-600' : 'bg-indigo-600'}`}></div>
                                    <div className={`absolute bottom-0 -right-64 w-96 h-96 rounded-full blur-3xl opacity-20 ${isColorful ? 'bg-emerald-600' : 'bg-teal-600'}`}></div>
                                </div>

                                <WorkflowDiagram theme={theme} />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ------------------------------------------------------------------------------------------------
// Workflow Diagram Component (FigJam Style)
// ------------------------------------------------------------------------------------------------
function WorkflowDiagram({ theme }: { theme: string }) {
    const isLight = theme === 'light';

    const FlowNode = ({ icon, title, desc, bg, color, delay = 0, isLarge = false }: { icon: string, title: string, desc: string, bg: string, color: string, delay?: number, isLarge?: boolean }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ delay, duration: 0.5, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className={`flex items-start gap-4 p-5 sm:p-6 rounded-3xl shadow-md border border-black/5 dark:border-white/5 backdrop-blur-md w-full ${bg} ${isLarge ? 'md:w-[450px] mx-auto' : ''} z-10 relative`}
        >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${color}`}>
                <span className="material-symbols text-2xl">{icon}</span>
            </div>
            <div>
                <h3 className={`font-bold text-[15px] mb-1.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>{title}</h3>
                <p className={`text-[13px] leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{desc}</p>
            </div>
        </motion.div>
    );

    const connectorsColor = isLight ? 'border-gray-300' : 'border-gray-600';
    const arrowColor = isLight ? 'text-gray-400' : 'text-gray-500';

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative py-10 px-4 sm:px-8 z-10">

            {/* 1. Data Integrations */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <FlowNode delay={0.1} icon="article" title="News & Media" desc="Real-time global financial news streams via APIs." bg="bg-blue-50 dark:bg-blue-900/30" color="bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200" />
                <FlowNode delay={0.2} icon="account_balance" title="SEC Filings" desc="Automated parsing of 10-K, 10-Q & 8-K reports." bg="bg-indigo-50 dark:bg-indigo-900/30" color="bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-200" />
                <FlowNode delay={0.3} icon="record_voice_over" title="Earnings Calls" desc="Live audio transcriptions & NLP semantic extraction." bg="bg-purple-50 dark:bg-purple-900/30" color="bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-200" />
            </div>

            {/* Connector 1 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 left-[16.66%] right-[16.66%] border-t-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-[16.66%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-1/2 h-full border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 right-[16.66%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 left-1/2 -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 2. Core Engine */}
            <div className="relative z-10 w-full flex justify-center">
                <FlowNode isLarge delay={0.4} icon="psychology" title="AI Orchestration Engine" desc="RAG pipeline that retrieves market data, summarizes dense content, and cross-references citations using LLMs." bg="bg-fuchsia-50 dark:bg-fuchsia-900/30" color="bg-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-800 dark:text-fuchsia-200" />
            </div>

            {/* Connector 2 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 left-[12.5%] right-[12.5%] border-t-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-1/2 h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>

                <div className={`absolute top-1/2 left-[12.5%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 left-[37.5%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 right-[37.5%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 right-[12.5%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>

                <div className={`absolute bottom-0 left-[12.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 left-[37.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 right-[37.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 right-[12.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 3. Features */}
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
                <FlowNode delay={0.5} icon="space_dashboard" title="Dashboard & Watchlist" desc="AI morning briefing, sparkline charts, market movers." bg="bg-teal-50 dark:bg-teal-900/30" color="bg-teal-100 text-teal-600 dark:bg-teal-800 dark:text-teal-200" />
                <FlowNode delay={0.6} icon="candlestick_chart" title="Live Markets" desc="Index tracking, sector heatmap, trending tickers." bg="bg-emerald-50 dark:bg-emerald-900/30" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-800 dark:text-emerald-200" />
                <FlowNode delay={0.7} icon="auto_awesome" title="AI Copilot" desc="Streaming responses with verified citation cards." bg="bg-orange-50 dark:bg-orange-900/30" color="bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-200" />
                <FlowNode delay={0.8} icon="notifications_active" title="Smart Alerts" desc="Priority-coded, expandable, with AI follow-up." bg="bg-rose-50 dark:bg-rose-900/30" color="bg-rose-100 text-rose-600 dark:bg-rose-800 dark:text-rose-200" />
            </div>

            {/* Connector 3 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 left-[12.5%] right-[12.5%] border-t-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute top-0 left-[12.5%] h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-[37.5%] h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 right-[37.5%] h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 right-[12.5%] h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute top-1/2 left-1/2 h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute bottom-0 left-1/2 -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-l-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 4. End User App */}
            <div className="relative z-10 w-full flex justify-center pb-8">
                <FlowNode isLarge delay={0.9} icon="smartphone" title="Mobile Client (5-Tab Architecture)" desc="Dashboard, Markets, Copilot, Alerts & Profile — corporate-grade iOS & Android experience." bg="bg-slate-100 dark:bg-zinc-800/90" color="bg-white text-slate-700 dark:bg-zinc-700 dark:text-slate-200 shadow-md" />
            </div>

        </div>
    );
}
