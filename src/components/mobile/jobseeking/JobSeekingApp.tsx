'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, getTabDirection, getTabTransitionVariants, headerSubVariants, headerTitleVariants } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';
import { MobileIntroScreen, type MobileIntroConfig } from '@/app/mobile/components/MobileIntroScreen';
import { DashboardView } from './views/DashboardView';
import { JobsView } from './views/JobsView';
import { CopilotView } from './views/CopilotView';
import { NotificationsView } from './views/NotificationsView';
import { ProfileView } from './views/ProfileView';

export type JobTabType = 'dashboard' | 'jobs' | 'copilot' | 'notifications' | 'profile';
const JOB_TAB_ORDER: readonly JobTabType[] = ['dashboard', 'jobs', 'copilot', 'notifications', 'profile'] as const;

const JOB_SEEKING_INTRO: MobileIntroConfig = {
    appName: 'Job Seeker',
    tagline: 'Find trusted local, part-time, and weekend work Ã¢â‚¬â€ with an AI career coach that knows your skills.',
    appIcon: 'work_history',
    accentGradient: 'from-primary to-primary-dark',
    aiTips: [
        {
            icon: 'psychology',
            title: 'Your personal career coach',
            body: 'Ask Copilot "What jobs match my profile?" or "Help me write a cover letter for this barista role" Ã¢â‚¬â€ it tailors advice to you.',
        },
        {
            icon: 'manage_search',
            title: 'Smart job matching',
            body: 'Copilot analyses your skills and availability to surface the most relevant local gigs automatically.',
        },
        {
            icon: 'rate_review',
            title: 'Interview & application help',
            body: 'Need to prepare for an interview? Ask Copilot for common questions, salary benchmarks, and tips for your specific role.',
        },
    ],
    features: [
        { icon: 'space_dashboard', label: 'Home', desc: 'Your personalised job feed, match highlights, and activity overview.' },
        { icon: 'work', label: 'Local Jobs', desc: 'Browse gigs and positions near you, filtered by availability and pay.' },
        { icon: 'auto_awesome', label: 'Copilot', desc: 'AI career coach for applications, CVs, interview prep, and job advice.' },
        { icon: 'notifications', label: 'Alerts & Matches', desc: 'Instant notifications when a new job matches your profile.' },
        { icon: 'person', label: 'My Profile / CV', desc: 'Manage skills, availability, and your digital CV Ã¢â‚¬â€ all in one place.' },
    ],
};

interface JobSeekingAppProps {
    theme: MobileTheme;
}

export function JobSeekingApp({ theme }: JobSeekingAppProps) {
    const [showIntro, setShowIntro] = useState(true);
    const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'colorful'>('colorful');
    const [activeTab, setActiveTab] = useState<JobTabType>('dashboard');
    const prevTabRef = useRef<JobTabType>('dashboard');
    const directionRef = useRef(1);
    const isLight = themeMode === 'light';
    const isColorful = themeMode === 'colorful';
    const bgClass = theme.bg[themeMode];
    const card = theme.card[themeMode];
    const headerStyle = theme.header[themeMode];
    const themeClass = `theme-${themeMode}`;

    const handleTabChange = useCallback((newTab: JobTabType) => {
        directionRef.current = getTabDirection(JOB_TAB_ORDER, prevTabRef.current, newTab);
        prevTabRef.current = newTab;
        setActiveTab(newTab);
    }, []);

    // Override titles for Job Seeking
    const jobTitles: Record<JobTabType, { sub: string; title: string }> = {
        dashboard: { sub: 'Welcome Back', title: 'Job Seeker' },
        jobs: { sub: 'Find Work', title: 'Local Jobs' },
        copilot: { sub: 'AI Career Coach', title: 'Copilot' },
        notifications: { sub: 'Updates', title: 'Alerts & Matches' },
        profile: { sub: 'Your CV', title: 'My Profile' }
    };

    // Override tabs for Job Seeking
    const jobTabs: [JobTabType, string, string][] = [
        ['dashboard', 'space_dashboard', 'Home'],
        ['jobs', 'work', 'Jobs'],
        ['copilot', 'auto_awesome', 'Copilot'],
        ['notifications', 'notifications', 'Alerts'],
        ['profile', 'person', 'Profile']
    ];

    return (
        <div className={`flex flex-col h-full w-full relative ${bgClass} ${themeClass} transition-colors duration-500 font-sans`}>
            {/* Intro screen overlay */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        key="job-intro"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.06, filter: 'blur(8px)' }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute inset-0 z-50"
                    >
                        <MobileIntroScreen
                            config={JOB_SEEKING_INTRO}
                            theme={theme}
                            onComplete={(chosenTheme) => {
                                setThemeMode(chosenTheme);
                                setShowIntro(false);
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className={`absolute top-0 w-full ${theme.headerPaddingTop} pb-3 px-5 z-40 ${headerStyle}`}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-3.5">
                        <motion.button onClick={() => handleTabChange('profile')} className="relative" whileTap={{ scale: 0.92 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                            <div className={`w-11 h-11 ${theme.platform === 'ios' ? 'rounded-[16px]' : 'rounded-full'} overflow-hidden border-2 ${isColorful ? 'border-primary' : theme.accent.avatarBorder(isLight)} bg-gradient-to-tr from-gradient-start to-gradient-mid`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="User" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=Ali&background=${isColorful ? 'f59e0b' : theme.accent.fallbackAvatar}&color=fff` }} />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[2.5px] ${theme.accent.statusDot(isLight)}`} />
                        </motion.button>
                        <div className="flex flex-col">
                            <AnimatePresence mode="wait">
                                <motion.span key={activeTab + "-s"} variants={headerSubVariants} initial="initial" animate="animate" exit="exit" className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${isLight ? (theme.platform === 'ios' ? 'text-black/40' : 'text-ds-gray-500') : 'text-white/40'}`}>{jobTitles[activeTab].sub}</motion.span>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.h1 key={activeTab + "-t"} variants={headerTitleVariants} initial="initial" animate="animate" exit="exit" className="text-[18px] font-extrabold tracking-tight leading-none">{jobTitles[activeTab].title}</motion.h1>
                            </AnimatePresence>
                        </div>
                    </div>
                    <motion.button onClick={() => handleTabChange('copilot')} className={`relative w-10 h-10 rounded-full flex justify-center items-center ${theme.accent.aiButton(isLight)}`} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                        <Icon name="auto_awesome" className="text-[20px]" />
                        <span className={`absolute top-[9px] right-[9px] w-[5.5px] h-[5.5px] bg-ds-warning rounded-full animate-pulse ${theme.platform === 'ios' ? 'shadow-[0_0_8px_var(--color-warning)]' : ''}`} />
                    </motion.button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 relative w-full overflow-hidden">
                <AnimatePresence mode="wait" custom={directionRef.current}>
                    {activeTab === 'dashboard' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="d" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><DashboardView card={card} isLight={isLight} isColorful={isColorful} onNav={(t: string) => handleTabChange(t as JobTabType)} theme={theme} /></motion.div>; })()}
                    {activeTab === 'jobs' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="j" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><JobsView card={card} isLight={isLight} isColorful={isColorful} theme={theme} onNav={(t) => handleTabChange(t as JobTabType)} /></motion.div>; })()}
                    {activeTab === 'copilot' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="c" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><CopilotView isLight={isLight} isColorful={isColorful} theme={theme} /></motion.div>; })()}
                    {activeTab === 'notifications' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="n" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><NotificationsView card={card} isLight={isLight} isColorful={isColorful} theme={theme} onNav={(t) => handleTabChange(t as JobTabType)} /></motion.div>; })()}
                    {activeTab === 'profile' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="p" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><ProfileView card={card} isLight={isLight} isColorful={isColorful} themeMode={themeMode} setThemeMode={setThemeMode} theme={theme} /></motion.div>; })()}
                </AnimatePresence>
            </main>

            {/* Bottom Navigation */}
            <nav className={`absolute bottom-0 w-full flex justify-around ${theme.platform === 'ios' ? 'items-start px-2 h-[82px] pt-2' : 'items-center px-1 h-20 pb-2'} z-40 border-t ${theme.nav[themeMode]}`}>
                {jobTabs.map(([k, ic, lb]) => {
                    const a = activeTab === k;
                    return (
                        <motion.button
                            key={k}
                            onClick={() => handleTabChange(k)}
                            className={`flex flex-col items-center w-16 ${theme.platform === 'android' ? 'h-full pt-2' : ''}`}
                            whileTap={{ scale: 0.88 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                            {theme.navTab.pill ? (
                                <div className="relative w-14 h-8 rounded-full flex items-center justify-center">
                                    {a && (
                                        <motion.div
                                            layoutId="job-nav-pill"
                                            className={`absolute inset-0 rounded-full ${isColorful ? 'bg-primary/25' : theme.navTab.pill(isLight)}`}
                                            transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.8 }}
                                        />
                                    )}
                                    <motion.span
                                        animate={{ scale: a ? 1.1 : 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                                        className={`relative material-symbols-rounded ${theme.navTab.iconSize} transition-colors duration-200 ${a ? (isColorful ? 'text-accent' : theme.navTab.active(isLight)) : theme.navTab.inactive(isLight)}`}
                                    >
                                        {ic}
                                    </motion.span>
                                </div>
                            ) : (
                                <motion.span
                                    animate={{ scale: a ? 1.15 : 1, y: a ? -1 : 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                                    className={`material-symbols-rounded ${theme.navTab.iconSize} transition-colors duration-200 ${a ? (isColorful ? 'text-primary' : theme.navTab.active(isLight)) : theme.navTab.inactive(isLight)}`}
                                >
                                    {ic}
                                </motion.span>
                            )}
                            <motion.span
                                animate={{ opacity: a ? 1 : 0.6 }}
                                className={`${theme.navTab.labelSize} mt-0.5 font-medium transition-colors duration-200 ${a ? (isColorful ? (theme.platform === 'ios' ? 'text-primary' : 'text-accent') : theme.navTab.active(isLight)) : theme.navTab.inactive(isLight)}`}
                            >
                                {lb}
                            </motion.span>
                        </motion.button>
                    );
                })}
            </nav>
        </div>
    );
}

