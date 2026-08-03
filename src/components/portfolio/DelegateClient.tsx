'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { delaySeconds, stagger, transition as t } from '@/design-system';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

export default function DelegateClient() {
        const { locale } = useLanguage();
        const getLocalizedContent = () => {
        const content = {
            en: {
                title: "Delegate",
                subtitle: "Designing trust, transparency, and control for agentic AI workflows",
                intro: "AI agents can now autonomously complete multi-step tasks — but the UX for delegating to and monitoring these agents barely exists. Users either over-trust (and get burned) or under-trust (and micromanage). Delegate is a conceptual UX framework for the space in between.",
                projectType: "Project Type",
                projectTypeValues: "Case Study",
                tools: "Tools",
                toolsValue: "Figma, FigJam, Claude, ChatGPT, Maze",
                roles: "Roles",
                rolesValue: "Lead UX Designer & Product Strategist",
            },
            fi: {
                title: "Delegate",
                subtitle: "Designing trust, transparency, and control for agentic AI workflows",
                intro: "AI agents can now autonomously complete multi-step tasks — but the UX for delegating to and monitoring these agents barely exists. Users either over-trust (and get burned) or under-trust (and micromanage). Delegate is a conceptual UX framework for the space in between.",
                projectType: "Project Type",
                projectTypeValues: "Case Study",
                tools: "Tools",
                toolsValue: "Figma, FigJam, Claude, ChatGPT, Maze",
                roles: "Roles",
                rolesValue: "Lead UX Designer & Product Strategist",
            }
        };
        return content[locale as keyof typeof content] || content.en;
    };

    const content = getLocalizedContent();

    const processSteps = [
        {
            phase: "1. Research",
            desc: "Audit of existing agent interfaces: ChatGPT, Copilot, Devin, AutoGPT, Replit Agent. What builds trust? What breaks it?",
            icon: "search"
        },
        {
            phase: "2. Define",
            desc: "Mapping the 4 core UX challenges.",
            icon: "notes",
            features: [
                "Transparency: what is the agent doing right now?",
                "Control: how does the user pause, redirect, or stop?",
                "Error recovery: agent failed — what does the user see?",
                "Trust calibration: how does confidence get communicated?"
            ]
        },
        {
            phase: "3. Design",
            desc: "Key screens and interaction patterns.",
            icon: "design_services",
            features: [
                "Task delegation flow",
                "Live progress feed with plain-language step summaries",
                "Intervention panel (pause / redirect / abort)",
                "Error state with explanation and suggested next action",
                "Audit trail — full log of what the agent did and why"
            ]
        },
        {
            phase: "4. Prototype",
            desc: "Interactive Figma prototype.",
            icon: "smart_display"
        },
        {
            phase: "5. Principles",
            desc: "5 design principles for agentic UX distilled from the process.",
            icon: "checklist"
        }
    ];

    const pathname = usePathname();
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const ROUTES = [
            '/portfolio/workflow',
            '/portfolio/jobseeking',
            '/portfolio/market-intelligence',
            '/portfolio/accessibility',
            '/portfolio/game-strategy',
            '/portfolio/healthcare-prioritization',
            '/portfolio/promptforge',
            '/portfolio/intelligence-by-design',
            '/portfolio/axiom',
            '/portfolio/prompt-as-ux',
            '/portfolio/delegate'
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
        initial: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.98 }),
        animate: { opacity: 1, x: 0, scale: 1, transition: { ...t.enter, staggerChildren: stagger.slow } },
        exit: (dir: number) => ({ opacity: 0, x: dir * -40, scale: 0.98, transition: t.snap })
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
                className="min-h-screen bg-[var(--background)] text-foreground transition-colors duration-300"
            >
                <Navigation />
                <CaseStudyProgress />
                <article className="pt-24 pb-16">
                    <div className="max-w-6xl mx-auto px-6">
                        <CaseStudyHero
                            title={content.title}
                            subtitle={content.subtitle}
                            // TODO: Add image placeholder
                            image="/images/portfolio/five-cases/Delegate.jpg"
                            tags={["AI Agents", "UX", "Product Strategy"]}
                            meta={[
                                { label: content.projectType, value: content.projectTypeValues, icon: 'category' },
                                { label: content.tools, value: content.toolsValue, icon: 'build' },
                                { label: content.roles, value: content.rolesValue, icon: 'person' },
                                { label: "Status", value: "In Progress", icon: 'clock' },
                            ]}
                            actions={[
                                {
                                    label: 'View Prototype',
                                    icon: 'smart_display',
                                    variant: 'prototype',
                                    onClick: () => document.getElementById('prototype-embed')?.scrollIntoView({ behavior: 'smooth' }),
                                }
                            ]}
                        />

                        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t.enterSlow, delay: delaySeconds.md }}>
                            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-foreground/80">
                                {content.intro}
                            </p>
                        </motion.div>

                        {/* Process */}
                        <CaseStudySection title="Process"  accent="primary" number={1}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {processSteps.map((item, index) => (
                                    <div key={index} className="theme-card-flex p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5">
                                        
                                        <h3 className="text-lg font-semibold text-primary mb-2">{item.phase}</h3>
                                        <p className="opacity-70 text-sm leading-relaxed">{item.desc}</p>

                                        {item.features && (
                                            <ul className="mt-4 pt-4 border-t border-current/[0.06] space-y-2 list-none">
                                                {item.features.map((feature, i) => (
                                                    <li key={i} className="text-xs opacity-80 flex items-start gap-2">
                                                        <span className="text-accent mt-0.5">•</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CaseStudySection>

                        {/* Key Insights */}
                        <CaseStudySection title="Key Insights"  accent="primary" number={2}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    "Users don't need to see every step — they need to know they can take control at any moment.",
                                    "Trust in AI agents is built through transparency, not capability.",
                                    "Error states are the most important screens to design — they define whether a user will ever delegate again."
                                ].map((insight, index) => (
                                    <motion.div key={index} className="theme-card-flex p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                        <MaterialSymbol className="text-4xl text-[var(--primary)]/10 absolute -top-2 -end-2 transform group-hover:scale-110 transition-transform duration-500">format_quote</MaterialSymbol>
                                        <p className="text-lg font-medium text-primary italic relative z-10">&quot;{insight}&quot;</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudySection>

                        {/* Prototype Section Placeholder */}
                        {/* TODO: Embed Figma prototype */}
                        <CaseStudySection title="Interactive Prototype"  accent="primary" number={3} id="prototype-embed">
                            <div className="w-full h-[600px] rounded-2xl border-2 border-dashed border-ds-gray-500/30 flex flex-col items-center justify-center bg-black/5">
                                <MaterialSymbol className="text-6xl text-ds-gray-400 mb-4">design_services</MaterialSymbol>
                                <p className="text-lg text-primary font-medium">Figma Prototype Placeholder</p>
                                <p className="text-sm opacity-60 mt-2">Replace with actual Figma embed iframe</p>
                            </div>
                        </CaseStudySection>

                        {/* Outcome */}
                        <CaseStudySection title="Outcome"  accent="primary" number={4}>
                            <div className="theme-card-flex p-8 rounded-2xl">
                                <div className="flex items-center gap-4 mb-4">
                                    
                                    <h3 className="text-2xl font-bold text-primary">Result</h3>
                                </div>
                                <p className="text-lg opacity-80 leading-relaxed max-w-4xl">Conceptual UX framework and prototype for an agentic task interface. 5 reusable design principles for teams building with AI agents. Positioned as a thought leadership piece in the AI design space.</p>
                            </div>
                        </CaseStudySection>

                    </div>
                </article>
            </motion.div>
        </AnimatePresence>
    );
}
