'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';

export default function MarketIntelligenceClient() {
    const [activeTab, setActiveTab] = useState(0);
    const [isPrototypeModalOpen, setIsPrototypeModalOpen] = useState(false);

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
                timelineValue: "18+ Weeks",
                tools: "Tools & Technologies",
                toolsValue: "Figma, React, Tailwind CSS, iOS 26/Android 16 patterns",
                standards: "Key Features",
                standardsValue: "Conversational AI, Real-time Alerts, Streaming UX",
                roles: "My Role",
                rolesValue: "Lead UX/UI Designer",

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

                // UI Framework
                frameworkTitle: "Tailwind CSS & Architecture",
                frameworkDesc: "Built on Tailwind CSS to ensure rapid, highly customizable iOS and Android styling while sharing a core component architecture and design tokens.",

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

            },
            fi: {
                title: "Tekoälypohjainen markkinatieto",
                subtitle: "Mobiililähtöinen yrityssovellussuunnittelu",
                intro: "Suunnittelemme markkinatutkimuksen tulevaisuutta—mobiilisovellus, joka tarjoaa keskustelevaa tekoälyhakua, lähteisiin perustuvia yhteenvetoja ja personoitua tietoa yrityskäyttäjille.",
                projectType: "Projektityyppi",
                projectTypeValues: "Mobiili UX/UI -suunnittelu",
                timeline: "Aikataulu",
                timelineValue: "Yli 18 viikkoa",
                tools: "Työkalut & Teknologiat",
                toolsValue: "Figma, React, Tailwind CSS, iOS 26/Android 16 -mallit",
                standards: "Tärkeimmät ominaisuudet",
                standardsValue: "Keskusteleva tekoäly, reaaliaikaiset hälytykset, virtaava UX",
                roles: "Roolini",
                rolesValue: "Johtava UX/UI -suunnittelija",

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

                // UI Framework
                frameworkTitle: "Tailwind CSS ja arkkitehtuuri",
                frameworkDesc: "Rakennettu Tailwind CSS:n päälle varmistaakseen nopean ja erittäin mukautettavan iOS- ja Android-tyylin samalla kun jaetaan ydinkomponenttiarkkitehtuuri ja suunnittelutokenit.",

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
                            src="/images/portfolio/market-intelligence/cover.jpg"
                            alt={content.title}
                            fill
                            className="object-cover"
                            priority
                            onError={(e) => {
                                // Fallback mechanism in case cover doesn't exist
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/portfolio/collaboration/cover.jpg';
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
                                <button
                                    onClick={() => setIsPrototypeModalOpen(true)}
                                    className="mt-6 flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/30"
                                >
                                    <span className="material-symbols text-2xl">play_circle</span>
                                    <span>View Interactive Prototypes</span>
                                </button>
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
                        transition={{ duration: 0.6, delay: 0.3 }}
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
                        transition={{ duration: 0.6, delay: 0.4 }}
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
                                    transition={{ duration: 0.6, delay: 0.2 }}
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
                                    transition={{ duration: 0.6, delay: 0.2 }}
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
                                    transition={{ duration: 0.6, delay: 0.2 }}
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

            {/* Full Screen Prototype Modal */}
            <AnimatePresence>
                {isPrototypeModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
                    >
                        <div className="relative w-full max-w-7xl h-full max-h-[90vh] flex flex-col bg-gray-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-white/10 shrink-0">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Interactive Prototypes</h2>
                                    <p className="text-gray-400">Experience the AI-powered interface natively across iOS and Android</p>
                                </div>
                                <button
                                    onClick={() => setIsPrototypeModalOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="material-symbols text-3xl">close</span>
                                </button>
                            </div>

                            {/* Modal Content - Side by Side Iframes */}
                            <div className="flex-1 flex flex-col md:flex-row gap-8 p-6 md:p-8 overflow-y-auto bg-black/50">
                                {/* iOS Prototype */}
                                <div className="flex-1 flex flex-col items-center">
                                    <div className="flex items-center space-x-2 mb-4 text-white">
                                        <span className="material-symbols text-2xl">phone_iphone</span>
                                        <h3 className="text-xl font-medium">iOS 26 Style</h3>
                                    </div>
                                    <div className="w-full max-w-[390px] h-[844px] shrink-0 rounded-[3rem] border-[8px] border-neutral-800 bg-black overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-50"></div>
                                        <iframe
                                            src="/mobile?os=ios"
                                            title="iOS Prototype"
                                            className="w-full h-full border-none"
                                            allow="payment; fullscreen"
                                        />
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full z-50"></div>
                                    </div>
                                </div>

                                {/* Android Prototype */}
                                <div className="flex-1 flex flex-col items-center">
                                    <div className="flex items-center space-x-2 mb-4 text-[#4dd0e1]">
                                        <span className="material-symbols text-2xl">android</span>
                                        <h3 className="text-xl font-medium font-sans">Android 16 Style</h3>
                                    </div>
                                    <div className="w-full max-w-[412px] h-[892px] shrink-0 rounded-[2.5rem] border-[6px] border-neutral-800 bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
                                        <iframe
                                            src="/mobile?os=android"
                                            title="Android Prototype"
                                            className="w-full h-full border-none"
                                            allow="payment; fullscreen"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
