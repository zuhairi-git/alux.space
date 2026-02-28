'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import AppArchitectureModal from './AppArchitectureModal';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection, { CaseStudyItem } from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';

export default function MarketIntelligenceClient() {
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

                    {/* Intro */}
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
                            }`}>
                            {content.intro}
                        </p>
                    </motion.div>

                    <CaseStudySection title={content.overviewTab} icon="visibility" number={1} accent="blue">
                        <CaseStudyItem>
                                {/* Problem vs Solution */}
                                <div className="grid md:grid-cols-2 gap-8 mb-14">
                                    {[
                                        { icon: 'warning', title: content.problemTitle, desc: content.problemDesc, colorful: 'bg-gradient-to-br from-red-500/8 to-orange-500/8 border border-red-500/15', light: 'bg-red-50/70', dark: 'bg-gray-800/40 border border-red-900/30', iconColor: 'text-red-500/80', titleColor: isColorful ? 'text-red-400' : isLight ? 'text-red-800' : 'text-red-400' },
                                        { icon: 'lightbulb', title: content.solutionTitle, desc: content.solutionDesc, colorful: 'bg-gradient-to-br from-emerald-500/8 to-teal-500/8 border border-emerald-500/15', light: 'bg-emerald-50/70', dark: 'bg-gray-800/40 border border-emerald-900/30', iconColor: 'text-emerald-500/80', titleColor: isColorful ? 'text-emerald-400' : isLight ? 'text-emerald-800' : 'text-emerald-400' },
                                    ].map((card, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-40px' }}
                                            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                            whileHover={{ y: -4 }}
                                            className={`p-6 rounded-2xl transition-shadow duration-300 ${isColorful ? card.colorful : isLight ? card.light : card.dark}`}
                                        >
                                            <span className={`material-symbols text-2xl ${card.iconColor} mb-3 block`}>{card.icon}</span>
                                            <h3 className={`text-xl font-semibold mb-3 ${card.titleColor}`}>{card.title}</h3>
                                            <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-700' : 'text-gray-300'}`}>{card.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                        </CaseStudyItem>

                        <CaseStudyItem>
                                    <h2 className={`text-xl font-semibold mb-6 ${isColorful
                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400'
                                        : isLight ? 'text-gray-900' : 'text-white'
                                        }`}>{content.objectivesTitle}</h2>

                                    <div className="space-y-4 max-w-3xl">
                                        {[
                                            { icon: "chat_bubble", text: content.objective1 },
                                            { icon: "gavel", text: content.objective2 },
                                            { icon: "feed", text: content.objective3 },
                                            { icon: "finance", text: content.objective4 },
                                            { icon: "security", text: content.objective5 }
                                        ].map((objective, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: '-20px' }}
                                                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                                className="flex items-start gap-4"
                                            >
                                                <span className={`material-symbols text-lg mt-0.5 flex-shrink-0 ${isColorful ? 'text-blue-400/70' : isLight ? 'text-indigo-400' : 'text-indigo-400/70'
                                                    }`}>{objective.icon}</span>
                                                <p className={`leading-relaxed ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>{objective.text}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    <CaseStudySection title={content.rationaleTitle} icon="lightbulb" number={2} accent="purple">
                        <CaseStudyItem>
                                        <p className={`text-lg max-w-3xl mx-auto mb-10 ${isColorful ? 'text-purple-200/80' : isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {content.rationaleSubtitle}
                                        </p>

                                    <div className="space-y-2">
                                        {[
                                            { index: "01", title: content.rationaleItem1Title, desc: content.rationaleItem1Desc, color: "text-blue-500" },
                                            { index: "02", title: content.rationaleItem2Title, desc: content.rationaleItem2Desc, color: "text-emerald-500" },
                                            { index: "03", title: content.rationaleItem3Title, desc: content.rationaleItem3Desc, color: "text-orange-500" },
                                            { index: "04", title: content.rationaleItem4Title, desc: content.rationaleItem4Desc, color: "text-purple-500" },
                                            { index: "05", title: content.rationaleItem5Title, desc: content.rationaleItem5Desc, color: "text-rose-500" }
                                        ].map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 16 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: "-30px" }}
                                                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                                whileHover={{ x: 6 }}
                                                className={`group flex gap-5 md:gap-6 items-start py-6 px-2 rounded-xl transition-colors duration-300 ${isLight ? 'hover:bg-gray-50/80' : 'hover:bg-white/[0.03]'}`}
                                            >
                                                <span className={`text-2xl font-bold ${item.color} opacity-60 shrink-0 pt-0.5 tabular-nums transition-opacity group-hover:opacity-100`}>
                                                    {item.index}
                                                </span>
                                                <div className={`flex-1 border-b pb-6 ${isColorful ? 'border-white/[0.06]' : isLight ? 'border-gray-100' : 'border-gray-800/60'}`}>
                                                    <h3 className={`text-lg font-semibold mb-1.5 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{item.title}</h3>
                                                    <p className={`leading-relaxed ${isColorful ? 'text-gray-400' : isLight ? 'text-gray-500' : 'text-gray-400'}`}>{item.desc}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    <CaseStudySection title={locale === 'fi' ? 'Interaktiiviset prototyypit' : 'Interactive Prototypes'} icon="smartphone" number={3} accent="indigo" id="interactive-prototypes">
                        <CaseStudyItem>
                                    <p className={`text-lg max-w-2xl mx-auto mb-8 ${isColorful ? 'text-indigo-200' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>Experience the AI-powered interface natively across iOS and Android side-by-side.</p>

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
                                                    <div className="w-full h-full overflow-hidden rounded-[2.5rem]">
                                                        <iframe
                                                            src={`/mobile?os=ios&theme=${theme}`}
                                                            title="iOS Prototype"
                                                            className="w-full h-[calc(100%+32px)] border-none"
                                                            style={{ marginTop: '-16px' }}
                                                            allow="payment; fullscreen"
                                                        />
                                                    </div>
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
                                                    <div className="w-full h-full overflow-hidden rounded-[2rem]">
                                                        <iframe
                                                            src={`/mobile?os=android&theme=${theme}`}
                                                            title="Android Prototype"
                                                            className="w-full h-[calc(100%+32px)] border-none"
                                                            style={{ marginTop: '-16px' }}
                                                            allow="payment; fullscreen"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* App Functionality Section */}
                                    <motion.div
                                        className="mt-24"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <div className="text-center mb-12">
                                            <h3 className={`text-2xl font-semibold mb-4 ${isColorful ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400' : isLight ? 'text-gray-900' : 'text-white'}`}>
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
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: '-30px' }}
                                                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                                    whileHover={{ y: -5 }}
                                                    className={`p-6 rounded-2xl transition-shadow duration-300 ${isColorful
                                                    ? 'bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20'
                                                    : isLight ? 'bg-white shadow-sm hover:shadow-md' : 'bg-gray-800/60 hover:bg-gray-800/80 border border-gray-700/30'}`}
                                                >
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isColorful ? 'bg-indigo-500/15 text-indigo-300' : isLight ? 'bg-indigo-50 text-indigo-500' : 'bg-indigo-900/40 text-indigo-400'}`}>
                                                        <span className="material-symbols text-lg">{feature.icon}</span>
                                                    </div>
                                                    <h4 className={`text-lg font-semibold mb-2 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'}`}>{feature.title}</h4>
                                                    <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-400'}`}>{feature.desc}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    <CaseStudySection title={content.uxTab} icon="devices" number={4} accent="green">
                        <CaseStudyItem>
                                <div className="grid md:grid-cols-2 gap-8 mb-14">
                                    {/* iOS Patterns */}
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${isColorful ? 'bg-gray-700/50 text-gray-300' : isLight ? 'bg-gray-100 text-gray-500' : 'bg-gray-800 text-gray-400'}`}>
                                            <span className="material-symbols text-xl">phone_iphone</span>
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-semibold mb-2 ${isColorful ? 'text-white' : isLight ? 'text-gray-900' : 'text-white'
                                                }`}>{content.iosPatternsTitle}</h3>
                                            <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                                }`}>{content.iosPatternsDesc}</p>
                                        </div>
                                    </div>

                                    {/* Android Patterns */}
                                    <div className="flex items-start gap-4">
                                        <div className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${isColorful ? 'bg-green-900/30 text-green-400' : isLight ? 'bg-green-50 text-green-500' : 'bg-green-900/30 text-green-400'}`}>
                                            <span className="material-symbols text-xl">android</span>
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-semibold mb-2 ${isColorful ? 'text-green-300' : isLight ? 'text-gray-900' : 'text-white'
                                                }`}>{content.androidPatternsTitle}</h3>
                                            <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'
                                                }`}>{content.androidPatternsDesc}</p>
                                        </div>
                                    </div>
                                </div>
                        </CaseStudyItem>

                        <CaseStudyItem>
                                    <h2 className={`text-xl font-semibold mb-6 ${isColorful
                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400'
                                        : isLight ? 'text-gray-900' : 'text-white'
                                        }`}>{content.coreFlowsTitle}</h2>

                                    <div className="space-y-4 max-w-3xl">
                                        {[
                                            { icon: "forum", text: content.flow1 },
                                            { icon: "summarize", text: content.flow2 },
                                            { icon: "rss_feed", text: content.flow3 },
                                            { icon: "dashboard", text: content.flow4 },
                                            { icon: "notifications_active", text: content.flow5 }
                                        ].map((flow, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true, margin: '-20px' }}
                                                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                                className="flex items-center gap-4 group"
                                            >
                                                <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isColorful ? 'bg-indigo-500/15 text-indigo-300 group-hover:bg-indigo-500/25' : isLight ? 'bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100' : 'bg-indigo-900/30 text-indigo-400 group-hover:bg-indigo-900/50'
                                                    }`}>
                                                    <span className="material-symbols text-lg">{flow.icon}</span>
                                                </div>
                                                <p className={`font-medium md:text-lg ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>{flow.text}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    <CaseStudySection title={content.systemTab} icon="shield" number={5} accent="orange">
                        <CaseStudyItem>
                                <div className="space-y-10">
                                    {[
                                        { icon: "construction", color: "blue", title: content.frameworkTitle, desc: content.frameworkDesc,
                                          titleColor: isColorful ? 'text-blue-300' : isLight ? 'text-gray-900' : 'text-white',
                                          iconStyle: isColorful ? 'bg-blue-500/15 text-blue-400' : isLight ? 'bg-blue-50 text-blue-500' : 'bg-blue-900/30 text-blue-400' },
                                        { icon: "hourglass_top", color: "orange", title: content.latencyStrategyTitle, desc: content.latencyStrategyDesc,
                                          titleColor: isColorful ? 'text-orange-300' : isLight ? 'text-gray-900' : 'text-white',
                                          iconStyle: isColorful ? 'bg-orange-500/15 text-orange-400' : isLight ? 'bg-orange-50 text-orange-500' : 'bg-orange-900/30 text-orange-400' },
                                        { icon: "psychology", color: "purple", title: content.aiPatternsTitle, desc: content.aiPatternsDesc,
                                          titleColor: isColorful ? 'text-purple-300' : isLight ? 'text-gray-900' : 'text-white',
                                          iconStyle: isColorful ? 'bg-purple-500/15 text-purple-400' : isLight ? 'bg-purple-50 text-purple-500' : 'bg-purple-900/30 text-purple-400' },
                                        { icon: "policy", color: "emerald", title: content.trustTitle, desc: content.trustDesc,
                                          titleColor: isColorful ? 'text-emerald-300' : isLight ? 'text-gray-900' : 'text-white',
                                          iconStyle: isColorful ? 'bg-emerald-500/15 text-emerald-400' : isLight ? 'bg-emerald-50 text-emerald-500' : 'bg-emerald-900/30 text-emerald-400' },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-30px' }}
                                            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex items-start gap-5"
                                        >
                                            <div className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${item.iconStyle}`}>
                                                <span className="material-symbols text-xl">{item.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className={`text-lg font-semibold mb-2 ${item.titleColor}`}>{item.title}</h3>
                                                <p className={`leading-relaxed ${isColorful ? 'text-gray-300' : isLight ? 'text-gray-600' : 'text-gray-300'}`}>{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                        </CaseStudyItem>
                    </CaseStudySection>

                    <CaseStudySection title={content.impactTab} icon="account_tree" number={6} accent="teal">
                        <CaseStudyItem>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { icon: "ads_click", text: content.captureMetric },
                                            { icon: "check_circle", text: content.trustMetric },
                                            { icon: "monitoring", text: content.engagementMetric },
                                            { icon: "event", text: content.retentionMetric },
                                        ].map((objective, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true, margin: '-30px' }}
                                                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                                whileHover={{ y: -5 }}
                                                className={`p-6 rounded-2xl transition-shadow duration-300 ${isColorful
                                                ? 'bg-gradient-to-br from-teal-900/20 to-emerald-900/20 border border-teal-400/20'
                                                : isLight ? 'bg-white shadow-sm hover:shadow-md' : 'bg-gray-800/60 border border-gray-700/30'
                                                }`}
                                            >
                                                <span className={`material-symbols text-2xl mb-4 block ${isColorful ? 'text-teal-400/80' : isLight ? 'text-teal-500' : 'text-teal-400/80'
                                                    }`}>{objective.icon}</span>
                                                <p className={`font-medium ${isColorful ? 'text-gray-200' : isLight ? 'text-gray-700' : 'text-gray-300'
                                                    }`}>{objective.text}</p>
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
