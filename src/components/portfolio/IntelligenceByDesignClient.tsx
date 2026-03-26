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

export default function IntelligenceByDesignClient() {
    const { theme } = useTheme();
    const { locale } = useLanguage();
    const isLight = theme === 'light';

    const getLocalizedContent = () => {
        const content = {
            en: {
                title: "Intelligence by Design",
                subtitle: "Documenting the real impact of AI integration in a live product",
                intro: "AI features are being bolted onto products without a coherent design strategy. At Webropol, the challenge was to integrate AI meaningfully — not as a gimmick, but as a genuine workflow accelerator for users who rely on survey and feedback data daily.",
                projectType: "Project Type",
                projectTypeValues: "Case Study",
                tools: "Tools",
                toolsValue: "Figma, Maze, Hotjar, ChatGPT, Jira, Confluence",
                roles: "Roles",
                rolesValue: "Product Owner & Lead Designer",
            },
            fi: {
                title: "Intelligence by Design",
                subtitle: "Documenting the real impact of AI integration in a live product",
                intro: "AI features are being bolted onto products without a coherent design strategy. At Webropol, the challenge was to integrate AI meaningfully — not as a gimmick, but as a genuine workflow accelerator for users who rely on survey and feedback data daily.",
                projectType: "Project Type",
                projectTypeValues: "Case Study",
                tools: "Tools",
                toolsValue: "Figma, Maze, Hotjar, ChatGPT, Jira, Confluence",
                roles: "Roles",
                rolesValue: "Product Owner & Lead Designer",
            }
        };
        return content[locale as keyof typeof content] || content.en;
    };

    const content = getLocalizedContent();

    const processSteps = [
        {
            phase: "1. Discovery",
            desc: "User interviews to find the highest-friction moments in the current workflow",
            icon: "search"
        },
        {
            phase: "2. Opportunity Mapping",
            desc: "Where could AI reduce cognitive load?",
            icon: "map"
        },
        {
            phase: "3. Design",
            desc: "AI-assisted features creation.",
            icon: "design_services",
            features: [
                "Smart survey builder (AI suggests question structure)",
                "Automated response analysis (pattern detection in open answers)",
                "Report summarization (AI drafts key findings)"
            ]
        },
        {
            phase: "4. Validation",
            desc: "Usability testing with 8 participants",
            icon: "fact_check"
        },
        {
            phase: "5. Outcome Measurement",
            desc: "Tracked time-on-task before and after",
            icon: "insert_chart"
        }
    ];

    const outcomes = [
        { value: "40%", label: "reduction in time-to-insight for report generation", icon: "timer" },
        { value: "3", label: "manual workflow steps eliminated", icon: "delete_sweep" },
        { value: "81", label: "Usability score improved from 67 (SUS scale)", icon: "trending_up" }
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
                            image="/images/portfolio/five-cases/IntelligencebyDesign.jpg"
                            tags={["Product Design", "AI", "UX Research"]}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {processSteps.map((item, index) => (
                                    <div key={index} className="theme-card-flex p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="h-11 w-11 flex items-center justify-center text-blue-400 bg-blue-400/10 rounded-full mb-4">
                                            <span className="material-symbols text-xl">{item.icon}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-primary mb-2">{item.phase}</h3>
                                        <p className="opacity-70 text-sm leading-relaxed">{item.desc}</p>

                                        {item.features && (
                                            <ul className="mt-4 pt-4 border-t border-current/[0.06] space-y-2 list-none">
                                                {item.features.map((feature, i) => (
                                                    <li key={i} className="text-xs opacity-80 flex items-start gap-2">
                                                        <span className="text-blue-400 mt-0.5">•</span>
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
                                    "Users don't want AI to think for them — they want it to handle the parts they find tedious.",
                                    "AI features without explainability create distrust, not efficiency.",
                                    "The biggest win wasn't the AI output — it was removing 3 manual steps from a daily workflow."
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
