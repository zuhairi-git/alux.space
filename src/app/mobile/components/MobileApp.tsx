'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, type TabType } from '../shared';
import type { MobileTheme } from '../themes';
import { DashboardView } from './DashboardView';
import { WorkspacesView } from './WorkspacesView';
import { CopilotView } from './CopilotView';
import { NotificationsView } from './NotificationsView';
import { ProfileView } from './ProfileView';
import { MobileIntroScreen, type MobileIntroConfig } from './MobileIntroScreen';

const WORKFLOW_PLATFORM_INTRO: MobileIntroConfig = {
    appName: 'Workflow Platform',
    tagline: 'Your AI-powered team collaboration hub — manage workspaces, projects, and insights all in one place.',
    appIcon: 'blur_on',
    accentGradient: 'from-indigo-500 to-violet-600',
    aiTips: [
        {
            icon: 'query_stats',
            title: 'Ask about your team',
            body: 'Ask Copilot "Which workspaces are most active?" or "Who needs a review reminder?" and get instant, context-aware answers.',
        },
        {
            icon: 'edit_document',
            title: 'Surface key decisions fast',
            body: 'Copilot reads your workspace docs and highlights open items, blockers, and decisions — no more digging through threads.',
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
        { icon: 'notifications', label: 'Notifications', desc: 'Critical alerts, sprint reminders, and team activity — automatically prioritised by AI.' },
        { icon: 'person', label: 'My Profile', desc: 'Your contributions, engagement stats, and app appearance settings.' },
    ],
};

interface MobileAppProps {
    theme: MobileTheme;
}

export function MobileApp({ theme }: MobileAppProps) {
    const [showIntro, setShowIntro] = useState(true);
    const [themeMode, setThemeMode] = useState('colorful');
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const isLight = themeMode === 'light';
    const isColorful = themeMode === 'colorful';
    const bgClass = isLight ? theme.bg.light : isColorful ? theme.bg.colorful : theme.bg.dark;
    const card = isColorful ? theme.card.colorful : isLight ? theme.card.light : theme.card.dark;
    const headerStyle = isLight ? theme.header.light : isColorful ? theme.header.colorful : theme.header.dark;

    return (
        <div className={`flex flex-col h-full w-full relative ${bgClass} transition-colors duration-500 font-sans`}>
            {/* Intro screen overlay */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
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

            {/* Header — Liquid Glass (iOS 26) / M3 Expressive (Android 16) */}
            <header className={`absolute top-0 w-full ${theme.headerPaddingTop} pb-4 px-6 z-40 transition-all duration-300 ${headerStyle}`}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setActiveTab('profile')} className="relative active:scale-95 transition-transform">
                            <div className={`w-11 h-11 ${theme.platform === 'ios' ? 'rounded-[14px]' : 'rounded-full'} overflow-hidden border-2 ${theme.accent.avatarBorder(isLight)} ${theme.accent.avatarGradient}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="User" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=Ali&background=${theme.accent.fallbackAvatar}&color=fff` }} />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-[2px] ${theme.accent.statusDot(isLight)}`} />
                        </button>
                        <div className="flex flex-col">
                            <AnimatePresence mode="wait"><motion.span key={activeTab + "-s"} initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 2 }} className={`text-[10px] font-semibold uppercase tracking-widest mb-0.5 ${isLight ? (theme.platform === 'ios' ? 'text-black/35' : 'text-[#49454F]') : 'text-white/35'}`}>{theme.titles[activeTab].sub}</motion.span></AnimatePresence>
                            <AnimatePresence mode="wait"><motion.h1 key={activeTab + "-t"} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} transition={{ delay: 0.05 }} className={`text-[19px] font-bold tracking-tight leading-none ${theme.platform === 'ios' ? '' : 'font-medium'}`}>{theme.titles[activeTab].title}</motion.h1></AnimatePresence>
                        </div>
                    </div>
                    <button onClick={() => setActiveTab('copilot')} className={`relative w-10 h-10 rounded-full flex justify-center items-center active:scale-95 transition-transform ${theme.accent.aiButton(isLight)}`}>
                        <Icon name="auto_awesome" className="text-[20px]" />
                        <span className={`absolute top-[8px] right-[8px] w-[5px] h-[5px] bg-[#FF9500] rounded-full animate-pulse ${theme.platform === 'ios' ? 'shadow-[0_0_6px_rgba(255,149,0,0.7)]' : ''}`} />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 relative w-full">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && <DashboardView key="d" card={card} isLight={isLight} isColorful={isColorful} onNav={setActiveTab} theme={theme} />}
                    {activeTab === 'workspaces' && <WorkspacesView key="w" card={card} isLight={isLight} isColorful={isColorful} theme={theme} onNav={(t) => setActiveTab(t as TabType)} />}
                    {activeTab === 'copilot' && <CopilotView key="c" isLight={isLight} isColorful={isColorful} theme={theme} />}
                    {activeTab === 'notifications' && <NotificationsView key="n" card={card} isLight={isLight} isColorful={isColorful} theme={theme} />}
                    {activeTab === 'profile' && <ProfileView key="p" card={card} isLight={isLight} isColorful={isColorful} themeMode={themeMode} setThemeMode={setThemeMode} theme={theme} />}
                </AnimatePresence>
            </main>

            {/* Bottom Navigation — iOS 26 Liquid Glass floating / Android 16 M3 Expressive */}
            <nav className={`absolute bottom-0 w-full z-40 ${theme.platform === 'ios'
                ? `flex justify-around items-start px-3 h-[80px] pt-1.5 border-t ${isLight ? theme.nav.light : isColorful && theme.nav.colorful ? theme.nav.colorful : theme.nav.dark}`
                : `flex justify-around items-center px-2 h-[80px] pb-1 border-t ${isLight ? theme.nav.light : isColorful && theme.nav.colorful ? theme.nav.colorful : theme.nav.dark}`
            }`}>
                {theme.tabs.map(([k, ic, lb]) => {
                    const a = activeTab === k;
                    return (
                        <button key={k} onClick={() => setActiveTab(k)} className={`flex flex-col items-center ${theme.platform === 'android' ? 'w-[68px] h-full pt-3 gap-0.5' : 'w-16 pt-1'} active:scale-95 transition-transform`}>
                            {theme.navTab.pill ? (
                                /* Android M3: Wider pill indicator for active state */
                                <div className={`relative flex items-center justify-center transition-all duration-300 ${a ? `w-16 h-8 rounded-full ${theme.navTab.pill(isLight)}` : 'w-14 h-8 rounded-full'}`}>
                                    <span className={`material-symbols ${theme.navTab.iconSize} transition-colors ${a ? theme.navTab.active(isLight) : theme.navTab.inactive(isLight)}`}>{ic}</span>
                                </div>
                            ) : (
                                /* iOS 26: Clean icon, no pill — Liquid Glass tab bar handles visual weight */
                                <span className={`material-symbols ${theme.navTab.iconSize} transition-colors ${a ? theme.navTab.active(isLight) : theme.navTab.inactive(isLight)}`}>{ic}</span>
                            )}
                            <span className={`${theme.navTab.labelSize} mt-0.5 font-medium transition-colors ${a ? theme.navTab.active(isLight) : theme.navTab.inactive(isLight)}`}>{lb}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
