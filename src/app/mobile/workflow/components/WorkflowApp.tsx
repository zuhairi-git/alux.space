'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, type TabType, getTabDirection, getTabTransitionVariants, headerSubVariants, headerTitleVariants, MobileIntroScreen, type MobileIntroConfig } from '../../shared';
import type { MobileTheme } from '../../shared';
import { DashboardView } from './DashboardView';
import { WorkspacesView } from './WorkspacesView';
import { CopilotView } from './CopilotView';
import { NotificationsView } from './NotificationsView';
import { ProfileView } from './ProfileView';

const WORKFLOW_PLATFORM_INTRO: MobileIntroConfig = {
    appName: 'Workflow Platform',
    tagline: 'Your AI-powered team collaboration hub — manage workspaces, projects, and insights all in one place.',
    appIcon: 'blur_on',
    accentGradient: 'from-gradient-start to-gradient-mid',
    aiTips: [
        {
            icon: 'query_stats',
            title: 'Ask about your team',
            body: 'Ask Copilot "Which workspaces are most active?" or "Who needs a review reminder?" and get instant, context-aware answers.',
        },
        {
            icon: 'edit_document',
            title: 'Surface key decisions fast',
            body: 'Copilot reads your workspace docs and highlights open items, blockers, and decisions — no more digging through threads.',
        },
        {
            icon: 'schedule',
            title: 'Stay ahead of deadlines',
            body: 'Ask "What is due this sprint?" and Copilot cross-references all workspaces to give you a prioritised rundown.',
        },
    ],
    features: [
        { icon: 'space_dashboard', label: 'Dashboard', desc: 'Team activity feed, AI morning briefing, and your most urgent workspaces at a glance.' },
        { icon: 'workspaces', label: 'Workspaces', desc: 'Browse and manage all project workspaces, docs, timelines, and team members.' },
        { icon: 'auto_awesome', label: 'Copilot', desc: 'Conversational AI with full workspace context for smart recommendations and summaries.' },
        { icon: 'notifications', label: 'Notifications', desc: 'Critical alerts, sprint reminders, and team activity — automatically prioritised by AI.' },
        { icon: 'person', label: 'My Profile', desc: 'Your contributions, engagement stats, and app appearance settings.' },
    ],
};

interface WorkflowAppProps {
    theme: MobileTheme;
}

const TAB_ORDER: readonly TabType[] = ['dashboard', 'workspaces', 'copilot', 'notifications', 'profile'] as const;

export function WorkflowApp({ theme }: WorkflowAppProps) {
    const [showIntro, setShowIntro] = useState(true);
    const [themeMode, setThemeMode] = useState<'dark' | 'light' | 'colorful'>('colorful');
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const prevTabRef = useRef<TabType>('dashboard');
    const directionRef = useRef(1);
    const isLight = themeMode === 'light';
    const isColorful = themeMode === 'colorful';
    const bgClass = theme.bg[themeMode];
    const card = theme.card[themeMode];
    const headerStyle = theme.header[themeMode];

    const handleTabChange = useCallback((newTab: TabType) => {
        directionRef.current = getTabDirection(TAB_ORDER, prevTabRef.current, newTab);
        prevTabRef.current = newTab;
        setActiveTab(newTab);
    }, []);

    const tabVariants = getTabTransitionVariants(directionRef.current);

    return (
        <div className={`flex flex-col h-full w-full relative ${bgClass} transition-colors duration-500 font-sans theme-${themeMode}`}>
            {/* Intro screen overlay */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.06 }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute inset-0 z-50"
                    >
                        <MobileIntroScreen
                            config={WORKFLOW_PLATFORM_INTRO}
                            theme={theme}
                            onComplete={(chosenTheme) => {
                                setThemeMode(chosenTheme);
                                setShowIntro(false);
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header — Liquid Glass (iOS 27) / M3 Expressive (Android 16/17) */}
            <header className={`absolute top-0 w-full ${theme.headerPaddingTop} pb-4 px-6 z-40 transition-all duration-300 ${headerStyle}`}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4">
                        <motion.button
                            onClick={() => handleTabChange('profile')}
                            className="relative"
                            whileTap={{ scale: 0.92 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                            <div className={`w-11 h-11 ${theme.platform === 'ios' ? 'rounded-[14px]' : 'rounded-full'} overflow-hidden border-2 ${theme.accent.avatarBorder(isLight)} ${theme.accent.avatarGradient}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="User" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=Ali&background=${theme.accent.fallbackAvatar}&color=fff` }} />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-[2px] ${theme.accent.statusDot(isLight)}`} />
                        </motion.button>
                        <div className="flex flex-col">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeTab + "-s"}
                                    variants={headerSubVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className={`text-[10px] font-semibold uppercase tracking-widest mb-0.5 ${isLight ? (theme.platform === 'ios' ? 'text-ds-gray-400' : 'text-ds-gray-600') : 'text-ds-gray-500'}`}
                                >
                                    {theme.titles[activeTab].sub}
                                </motion.span>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={activeTab + "-t"}
                                    variants={headerTitleVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className={`text-[19px] font-bold tracking-tight leading-none ${theme.platform === 'ios' ? '' : 'font-medium'}`}
                                >
                                    {theme.titles[activeTab].title}
                                </motion.h1>
                            </AnimatePresence>
                        </div>
                    </div>
                    <motion.button
                        onClick={() => handleTabChange('copilot')}
                        className={`relative w-10 h-10 rounded-full flex justify-center items-center ${isColorful ? 'bg-primary/20 text-primary' : theme.accent.aiButton(isLight)}`}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                        <Icon name="auto_awesome" className="text-[20px]" />
                        <span className={`absolute top-[8px] right-[8px] w-[5px] h-[5px] bg-ds-warning rounded-full animate-pulse ${theme.platform === 'ios' ? 'shadow-sm' : ''}`} />
                    </motion.button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 relative w-full">
                <AnimatePresence mode="wait" custom={directionRef.current}>
                    {activeTab === 'dashboard' && <motion.div key="d" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><DashboardView card={card} isLight={isLight} isColorful={isColorful} onNav={handleTabChange} theme={theme} /></motion.div>}
                    {activeTab === 'workspaces' && <motion.div key="w" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><WorkspacesView card={card} isLight={isLight} isColorful={isColorful} theme={theme} onNav={(t) => handleTabChange(t as TabType)} /></motion.div>}
                    {activeTab === 'copilot' && <motion.div key="c" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><CopilotView isLight={isLight} isColorful={isColorful} theme={theme} /></motion.div>}
                    {activeTab === 'notifications' && <motion.div key="n" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><NotificationsView card={card} isLight={isLight} isColorful={isColorful} theme={theme} /></motion.div>}
                    {activeTab === 'profile' && <motion.div key="p" variants={tabVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><ProfileView card={card} isLight={isLight} isColorful={isColorful} themeMode={themeMode} setThemeMode={setThemeMode} theme={theme} /></motion.div>}
                </AnimatePresence>
            </main>

            {/* Bottom Navigation — iOS 27 Liquid Glass floating / Android 16/17 M3 Expressive */}
            <nav className={`absolute bottom-0 w-full z-40 ${theme.platform === 'ios'
                ? `flex justify-around items-start px-3 h-[80px] pt-1.5 border-t ${theme.nav[themeMode]}`
                : `flex justify-around items-center px-2 h-[80px] pb-1 border-t ${theme.nav[themeMode]}`
            }`}>
                {theme.tabs.map(([k, ic, lb]) => {
                    const a = activeTab === k;
                    return (
                        <motion.button
                            key={k}
                            onClick={() => handleTabChange(k)}
                            className={`flex flex-col items-center ${theme.platform === 'android' ? 'w-[68px] h-full pt-3 gap-0.5' : 'w-16 pt-1'}`}
                            whileTap={{ scale: 0.88 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        >
                            {theme.navTab.pill ? (
                                /* Android M3: Animated pill indicator */
                                <div className="relative flex items-center justify-center">
                                    {a && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className={`absolute inset-0 w-16 h-8 rounded-full ${isColorful ? 'bg-primary/25' : theme.navTab.pill!(isLight)}`}
                                            transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.8 }}
                                        />
                                    )}
                                    <div className="relative w-16 h-8 rounded-full flex items-center justify-center">
                                        <motion.span
                                            animate={{ scale: a ? 1.1 : 1 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                                            className={`material-symbols ${theme.navTab.iconSize} transition-colors duration-200 ${a ? (isColorful ? 'text-accent' : theme.navTab.active(isLight)) : theme.navTab.inactive(isLight)}`}
                                        >
                                            {ic}
                                        </motion.span>
                                    </div>
                                </div>
                            ) : (
                                /* iOS 27: Clean icon with scale animation */
                                <motion.span
                                    animate={{ scale: a ? 1.12 : 1, y: a ? -1 : 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                                    className={`material-symbols ${theme.navTab.iconSize} transition-colors duration-200 ${a ? (isColorful ? 'text-primary' : theme.navTab.active(isLight)) : theme.navTab.inactive(isLight)}`}
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
