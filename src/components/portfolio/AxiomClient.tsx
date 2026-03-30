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

export default function AxiomClient() {
        const { locale } = useLanguage();
        const getLocalizedContent = () => {
        const content = {
            en: {
                title: "Axiom",
                subtitle: "A design system where AI is part of the foundation, not an afterthought",
                intro: "Design systems are built once and maintained reluctantly. Naming conventions drift, accessibility is checked manually at the end, and token decisions are made inconsistently. Axiom explores what happens when AI is embedded into the design system process itself from day one.",
                projectType: "Project Type",
                projectTypeValues: "Case Study",
                tools: "Tools",
                toolsValue: "Figma, Tokens Studio, Storybook, axe DevTools, ChatGPT, Claude",
                roles: "Roles",
                rolesValue: "Design System Lead & Accessibility Advocate",
            },
            fi: {
                title: "Axiom",
                subtitle: "A design system where AI is part of the foundation, not an afterthought",
                intro: "Design systems are built once and maintained reluctantly. Naming conventions drift, accessibility is checked manually at the end, and token decisions are made inconsistently. Axiom explores what happens when AI is embedded into the design system process itself from day one.",
                projectType: "Project Type",
                projectTypeValues: "Case Study",
                tools: "Tools",
                toolsValue: "Figma, Tokens Studio, Storybook, axe DevTools, ChatGPT, Claude",
                roles: "Roles",
                rolesValue: "Design System Lead & Accessibility Advocate",
            }
        };
        return content[locale as keyof typeof content] || content.en;
    };

    const content = getLocalizedContent();

    const processSteps = [
        {
            phase: "1. Audit",
            desc: "Review of existing component libraries and where inconsistency crept in",
            icon: "fact_check"
        },
        {
            phase: "2. AI Integration Points",
            desc: "Deep integration of AI within the component pipeline.",
            icon: "hub",
            features: [
                "Token naming: AI suggests semantic, consistent naming conventions",
                "Accessibility: automated WCAG checks per component with AI-generated remediation suggestions",
                "Documentation: AI drafts component usage guidelines from Figma annotations",
                "Variants: AI suggests missing states based on component type"
            ]
        },
        {
            phase: "3. Build",
            desc: "Core component library with AI-assisted documentation",
            icon: "view_quilt"
        },
        {
            phase: "4. Testing",
            desc: "Accessibility audit across 3 simulated user types (low vision, motor impairment, cognitive load)",
            icon: "accessibility_new"
        }
    ];

    const outcomes = [
        { value: "40+", label: "components in the core library", icon: "widgets" },
        { value: "100%", label: "WCAG 2.1 AA compliant across all core components", icon: "verified" },
        { value: "AI", label: "assisted accessibility documentation", icon: "auto_awesome" }
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
                            image="/images/portfolio/five-cases/Axiom.jpg"
                            tags={["Design Systems", "Accessibility", "AI"]}
                            meta={[
                                { label: content.projectType, value: content.projectTypeValues, icon: 'category' },
                                { label: content.tools, value: content.toolsValue, icon: 'build' },
                                { label: content.roles, value: content.rolesValue, icon: 'person' },
                                { label: "Status", value: "In Progress", icon: 'clock' },
                            ]}
                        />

                        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...t.enterSlow, delay: delaySeconds.md }}>
                            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-foreground/80">
                                {content.intro}
                            </p>
                        </motion.div>

                        {/* Process */}
                        <CaseStudySection title="Process"  accent="primary" number={1}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {processSteps.map((item, index) => (
                                    <div key={index} className="theme-card-flex p-6 rounded-2xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-0.5" style={{ gridColumn: item.features ? 'span 2' : 'span 1' }}>
                                        
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
                                    "Accessibility isn't a checklist — it's a design constraint that makes everything better.",
                                    "AI-generated documentation is 80% there. The remaining 20% is where the real design thinking lives.",
                                    "Consistent token naming is the most underrated part of a scalable design system."
                                ].map((insight, index) => (
                                    <motion.div key={index} className="theme-card-flex p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                        <span className="material-symbols text-4xl text-[var(--primary)]/10 absolute -top-2 -right-2 transform group-hover:scale-110 transition-transform duration-500">format_quote</span>
                                        <p className="text-lg font-medium text-primary italic relative z-10">&quot;{insight}&quot;</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CaseStudySection>

                        {/* Outcome */}
                        <CaseStudySection title="Outcome"  accent="primary" number={3}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {outcomes.map((outcome, index) => (
                                    <motion.div key={index} className="theme-card-flex p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                        
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
