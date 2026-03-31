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

export default function PromptForgeClient() {
        const { locale } = useLanguage();
        // Content for PromptForge
    const getLocalizedContent = () => {
        const content = {
            en: {
                title: "PromptForge",
                subtitle: "An AI-powered design workflow tool that turns prompts into UI concepts",
                intro: "Designers waste hours in the ideation phase — sketching, iterating, and discarding ideas before a single pixel is placed. PromptForge explores how prompt engineering can compress that phase dramatically, turning a well-crafted prompt into a structured UI concept in minutes.",
                projectType: "Project Type",
                projectTypeValues: "Prototype",
                tools: "Tools",
                toolsValue: "Figma, ChatGPT, Claude, Midjourney, Prompt Engineering",
                roles: "Roles",
                rolesValue: "Lead Designer & AI Workflow Architect",
                processParams: "Process",
                keyInsights: "Key Insights",
                outcome: "Outcome",
                outcomeValue: "A working prototype of an AI-assisted ideation tool. Reduced concept generation time by ~60% in personal workflow testing."
            },
            fi: {
                title: "PromptForge",
                subtitle: "An AI-powered design workflow tool that turns prompts into UI concepts",
                intro: "Designers waste hours in the ideation phase — sketching, iterating, and discarding ideas before a single pixel is placed. PromptForge explores how prompt engineering can compress that phase dramatically, turning a well-crafted prompt into a structured UI concept in minutes.",
                projectType: "Project Type",
                projectTypeValues: "Prototype",
                tools: "Tools",
                toolsValue: "Figma, ChatGPT, Claude, Midjourney, Prompt Engineering",
                roles: "Roles",
                rolesValue: "Lead Designer & AI Workflow Architect",
                processParams: "Process",
                keyInsights: "Key Insights",
                outcome: "Outcome",
                outcomeValue: "A working prototype of an AI-assisted ideation tool. Reduced concept generation time by ~60% in personal workflow testing."
            }
        };
        return content[locale as keyof typeof content] || content.en;
    };

    const content = getLocalizedContent();

    const processSteps = [
        {
            phase: "1. Research",
            desc: "How designers currently ideate. Where time is lost.",
            icon: "search"
        },
        {
            phase: "2. Define",
            desc: "What inputs does a designer have at ideation stage? (brief, user persona, platform, tone)",
            icon: "notes"
        },
        {
            phase: "3. Design",
            desc: "A prompt-to-UI concept generator interface. Input form, AI output, and specific Iteration panel.",
            icon: "design_services"
        },
        {
            phase: "4. Prototype",
            desc: "Interactive Figma prototype.",
            icon: "smart_display"
        },
        {
            phase: "5. Reflection",
            desc: "What this changes about the early design phase.",
            icon: "lightbulb"
        }
    ];

    const pathname = usePathname();
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        // Add all new portfolio pages to this ROUTES list to have proper transitions between them too
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
                            image="/images/portfolio/five-cases/PromptForge.jpg"
                            tags={["AI", "Workflow", "Prototyping"]}
                            meta={[
                                { label: content.projectType, value: content.projectTypeValues, icon: 'category' },
                                { label: content.tools, value: content.toolsValue, icon: 'build' },
                                { label: content.roles, value: content.rolesValue, icon: 'person' },
                            ]}
                            actions={[
                                {
                                    label: 'View Prototype',
                                    icon: 'smart_display',
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
                        <CaseStudySection title={content.processParams}  accent="primary" number={1}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {processSteps.map((item, index) => (
                                    <div key={index} className="theme-card-flex p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5">
                                        
                                        <h3 className="text-lg font-semibold text-primary mb-2">{item.phase}</h3>
                                        <p className="opacity-70 text-sm leading-relaxed">{item.desc}</p>

                                        {index === 2 && (
                                            <div className="mt-4 pt-4 border-t border-current/[0.06] space-y-2">
                                                <p className="text-xs opacity-80"><span className="text-accent font-semibold">• Input form:</span> brief, platform, design style, goal</p>
                                                <p className="text-xs opacity-80"><span className="text-accent font-semibold">• AI output:</span> wireframe desc, component suggestions, tone, mood</p>
                                                <p className="text-xs opacity-80"><span className="text-accent font-semibold">• Iteration:</span> refine, regenerate, compare</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CaseStudySection>

                        {/* Key Insights */}
                        <CaseStudySection title={content.keyInsights}  accent="primary" number={2}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    "A good prompt is a design brief in disguise.",
                                    "AI doesn't replace ideation — it removes the blank page.",
                                    "The real skill is knowing what to ask, not what to draw."
                                ].map((insight, index) => (
                                    <motion.div key={index} className="theme-card-flex p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                        <span className="material-symbols text-4xl text-[var(--primary)]/10 absolute -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-500">format_quote</span>
                                        <p className="text-lg font-medium text-primary italic relative z-10">&quot;{insight}&quot;</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudySection>

                        {/* Prototype Section Placeholder */}
                        {/* TODO: Embed Figma prototype */}
                        <CaseStudySection title="Interactive Prototype"  accent="primary" number={3} id="prototype-embed">
                            <div className="w-full h-[600px] rounded-2xl border-2 border-dashed border-ds-gray-500/30 flex flex-col items-center justify-center bg-black/5">
                                <span className="material-symbols text-6xl text-ds-gray-400 mb-4">design_services</span>
                                <p className="text-lg text-primary font-medium">Figma Prototype Placeholder</p>
                                <p className="text-sm opacity-60 mt-2">Replace with actual Figma embed iframe</p>
                            </div>
                        </CaseStudySection>

                        {/* Outcome */}
                        <CaseStudySection title={content.outcome}  accent="primary" number={4}>
                            <div className="theme-card-flex p-8 rounded-2xl">
                                <div className="flex items-center gap-4 mb-4">
                                    
                                    <h3 className="text-2xl font-bold text-primary">Result</h3>
                                </div>
                                <p className="text-lg opacity-80 leading-relaxed max-w-4xl">{content.outcomeValue}</p>
                            </div>
                        </CaseStudySection>

                    </div>
                </article>
            </motion.div>
        </AnimatePresence>
    );
}
