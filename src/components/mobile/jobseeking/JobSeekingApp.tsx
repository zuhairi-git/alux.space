'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';
import { DashboardView } from './views/DashboardView';
import { JobsView } from './views/JobsView';
import { CopilotView } from './views/CopilotView';
import { NotificationsView } from './views/NotificationsView';
import { ProfileView } from './views/ProfileView';

export type JobTabType = 'dashboard' | 'jobs' | 'copilot' | 'notifications' | 'profile';

interface JobSeekingAppProps {
    theme: MobileTheme;
}

export function JobSeekingApp({ theme }: JobSeekingAppProps) {
    const [themeMode, setThemeMode] = useState('dark');
    const [activeTab, setActiveTab] = useState<JobTabType>('dashboard');
    const isLight = themeMode === 'light';
    const isColorful = themeMode === 'colorful';
    const bgClass = isLight ? theme.bg.light : isColorful ? theme.bg.colorful : theme.bg.dark;
    const card = isColorful ? theme.card.colorful : isLight ? theme.card.light : theme.card.dark;
    const headerStyle = isLight ? theme.header.light : isColorful ? theme.header.colorful : theme.header.dark;

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
        <div className={`flex flex-col h-full w-full relative ${bgClass} transition-colors duration-500 font-sans`}>
            {/* Header */}
            <header className={`absolute top-0 w-full ${theme.headerPaddingTop} pb-3 px-5 z-40 ${headerStyle}`}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-3.5">
                        <button onClick={() => setActiveTab('profile')} className="relative active:scale-95 transition-transform">
                            <div className={`w-11 h-11 ${theme.platform === 'ios' ? 'rounded-[16px]' : 'rounded-full'} overflow-hidden border-2 ${theme.accent.avatarBorder(isLight)} bg-gradient-to-tr from-blue-500 to-cyan-400`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="User" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=Ali&background=007AFF&color=fff` }} />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[2.5px] ${theme.accent.statusDot(isLight)}`} />
                        </button>
                        <div className="flex flex-col">
                            <AnimatePresence mode="wait"><motion.span key={activeTab + "-s"} initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 2 }} className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${isLight ? (theme.platform === 'ios' ? 'text-black/40' : 'text-[#49454F]') : 'text-white/40'}`}>{jobTitles[activeTab].sub}</motion.span></AnimatePresence>
                            <AnimatePresence mode="wait"><motion.h1 key={activeTab + "-t"} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} transition={{ delay: 0.05 }} className="text-[18px] font-extrabold tracking-tight leading-none">{jobTitles[activeTab].title}</motion.h1></AnimatePresence>
                        </div>
                    </div>
                    <button onClick={() => setActiveTab('copilot')} className={`relative w-10 h-10 rounded-full flex justify-center items-center active:scale-95 ${theme.accent.aiButton(isLight)}`}>
                        <Icon name="auto_awesome" className="text-[20px]" />
                        <span className={`absolute top-[9px] right-[9px] w-[5.5px] h-[5.5px] bg-[#FF9500] rounded-full animate-pulse ${theme.platform === 'ios' ? 'shadow-[0_0_8px_rgba(255,149,0,0.8)]' : ''}`} />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 relative w-full overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && <DashboardView key="d" card={card} isLight={isLight} onNav={(t: string) => setActiveTab(t as JobTabType)} theme={theme} />}
                    {activeTab === 'jobs' && <JobsView key="j" card={card} isLight={isLight} theme={theme} />}
                    {activeTab === 'copilot' && <CopilotView key="c" isLight={isLight} theme={theme} />}
                    {activeTab === 'notifications' && <NotificationsView key="n" card={card} isLight={isLight} theme={theme} />}
                    {activeTab === 'profile' && <ProfileView key="p" card={card} isLight={isLight} themeMode={themeMode} setThemeMode={setThemeMode} theme={theme} />}
                </AnimatePresence>
            </main>

            {/* Bottom Navigation */}
            <nav className={`absolute bottom-0 w-full flex justify-around ${theme.platform === 'ios' ? 'items-start px-2 h-[82px] pt-2' : 'items-center px-1 h-20 pb-2'} z-40 border-t ${isLight ? theme.nav.light : theme.nav.dark}`}>
                {jobTabs.map(([k, ic, lb]) => {
                    const a = activeTab === k;
                    return (
                        <button key={k} onClick={() => setActiveTab(k)} className={`flex flex-col items-center w-16 ${theme.platform === 'android' ? 'h-full pt-2' : ''} active:scale-95`}>
                            {theme.navTab.pill ? (
                                <div className={`w-14 h-8 rounded-full flex items-center justify-center transition-colors ${a ? theme.navTab.pill(isLight) : ''}`}>
                                    <span className={`material-symbols ${theme.navTab.iconSize} transition-colors ${a ? theme.navTab.active(isLight) : theme.navTab.inactive(isLight)}`}>{ic}</span>
                                </div>
                            ) : (
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
