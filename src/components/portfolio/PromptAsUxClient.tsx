'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { delaySeconds, stagger, transition as t } from '@/design-system';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';

export default function PromptAsUxClient() {
    const { theme } = useTheme();
    const { locale } = useLanguage();
    const isLight = theme === 'light';

    const getLocalizedContent = () => {
        const content = {
            en: {
                title: "Prompt as UX",
                subtitle: "What if writing prompts is the most important UX skill of the next decade?",
                intro: "Most designers treat prompt engineering as a productivity hack. This project makes the case that prompt design IS UX design — that structuring human intent for an AI system requires the same empathy, clarity, and iteration as designing any user interface.",
                projectType: "Project Type",
                projectTypeValues: "Case Study",
                tools: "Tools",
                toolsValue: "ChatGPT, Claude, Midjourney, Notion, Figma",
                roles: "Roles",
                rolesValue: "UX Researcher & Prompt Design Strategist",
            },
            fi: {
                title: "Prompt as UX",
                subtitle: "What if writing prompts is the most important UX skill of the next decade?",
                intro: "Most designers treat prompt engineering as a productivity hack. This project makes the case that prompt design IS UX design — that structuring human intent for an AI system requires the same empathy, clarity, and iteration as designing any user interface.",
                projectType: "Project Type",
                projectTypeValues: "Case Study",
                tools: "Tools",
                toolsValue: "ChatGPT, Claude, Midjourney, Notion, Figma",
                roles: "Roles",
                rolesValue: "UX Researcher & Prompt Design Strategist",
            }
        };
        return content[locale as keyof typeof content] || content.en;
    };

    const content = getLocalizedContent();

    const processSteps = [
        {
            phase: "1. Reframe",
            desc: "Map the parallels between UX design and prompt engineering.",
            icon: "transform",
            features: [
                "User research → context setting in prompts",
                "Information architecture → prompt structure",
                "Microcopy → instruction clarity",
                "Usability testing → prompt iteration and evaluation"
            ]
        },
        {
            phase: "2. Framework",
            desc: "Build a prompt design framework with 5 core principles.",
            icon: "architecture",
            features: [
                "Clarity of intent",
                "Context completeness",
                "Constraint definition",
                "Output format specification",
                "Iteration loop"
            ]
        },
        {
            phase: "3. Library",
            desc: "Document 30+ real prompts used across design, research, and product work — each with annotation explaining the UX decisions behind it.",
            icon: "collections_bookmark"
        },
        {
            phase: "4. Showcase",
            desc: "Before/after examples of weak vs strong prompts and their outputs.",
            icon: "compare"
        }
    ];

    const outcomes = [
        { value: "30+", label: "annotated prompts in public library", icon: "menu_book" },
        { value: "Adopted", label: "internally for onboarding new team members to AI tools", icon: "how_to_reg" },
        { value: "400+", label: "reads on personal blog feature", icon: "visibility" }
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
                className={`min-h-screen transition-colors duration-300 ${theme === 'colorful' ? 'bg-[var(--color-colorful-bg)]' : isLight ? 'bg-gradient-to-br from-slate-50 to-gray-100' : 'bg-gradient-to-br from-gray-900 to-black'}`}
            >
                <Navigation />
                <CaseStudyProgress />
                <article className="pt-24 pb-16">
                    <div className="max-w-6xl mx-auto px-6">
                        <CaseStudyHero
                            title={content.title}
                            subtitle={content.subtitle}
                            // TODO: Add image placeholder
                            image="/images/portfolio/five-cases/PromptasUX.jpg"
                            tags={["Prompt Engineering", "UX", "AI"]}
                            meta={[
                                { label: content.projectType, value: content.projectTypeValues, icon: 'category' },
                                { label: content.tools, value: content.toolsValue, icon: 'build' },
                                { label: content.roles, value: content.rolesValue, icon: 'person' },
                            ]}
                        />

                        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t.enterSlow, delay: delaySeconds.md }}>
                            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${theme === 'colorful' ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                                {content.intro}
                            </p>
                        </motion.div>

                        {/* Process */}
                        <CaseStudySection title="Process" icon="account_tree" accent="blue" number={1}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {processSteps.map((item, index) => (
                                    <div key={index} className="theme-card-flex p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="h-11 w-11 flex items-center justify-center text-accent bg-[var(--primary)]/10 rounded-full mb-4">
                                            <span className="material-symbols text-xl">{item.icon}</span>
                                        </div>
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
                        <CaseStudySection title="Key Insights" icon="lightbulb" accent="purple" number={2}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    "A poorly designed prompt is a poorly designed user flow — both produce confusion.",
                                    "Prompt engineering is the new microcopy.",
                                    "The best prompts are invisible — the user just gets what they needed."
                                ].map((insight, index) => (
                                    <motion.div key={index} className="theme-card-flex p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                        <span className="material-symbols text-4xl text-purple-400/20 absolute -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-500">format_quote</span>
                                        <p className="text-lg font-medium text-primary italic relative z-10">&quot;{insight}&quot;</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudySection>

                        {/* Outcome */}
                        <CaseStudySection title="Outcome" icon="task_alt" accent="green" number={3}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {outcomes.map((outcome, index) => (
                                    <motion.div key={index} className="theme-card-flex p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                        <span className="material-symbols text-4xl text-green-500 mb-4">{outcome.icon}</span>
                                        <h4 className="text-4xl font-bold text-primary mb-2">{outcome.value}</h4>
                                        <p className="opacity-80 text-sm leading-relaxed">{outcome.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudySection>

                    </div>
                </article>
            </motion.div>
        </AnimatePresence>
    );
}
