'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Icon = ({ name, className = "" }: { name: string, className?: string }) => (
    <span className={`material-symbols ${className}`}>{name}</span>
);

type Section = 'start' | 'dashboard' | 'users' | 'workspaces' | 'copilot-logs' | 'alerts-config' | 'analytics' | 'settings';

const sections: { key: Section, icon: string, label: string }[] = [
    { key: 'start', icon: 'home', label: 'Start' },
    { key: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { key: 'users', icon: 'group', label: 'Users' },
    { key: 'workspaces', icon: 'workspaces', label: 'Workspaces' },
    { key: 'copilot-logs', icon: 'smart_toy', label: 'Copilot Logs' },
    { key: 'alerts-config', icon: 'notifications_active', label: 'Alerts Config' },
    { key: 'analytics', icon: 'analytics', label: 'Analytics' },
    { key: 'settings', icon: 'settings', label: 'Settings' },
];

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
export default function PortalPanel() {
    const [activeSection, setActiveSection] = useState<Section>('start');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState('dark');

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showCopilot, setShowCopilot] = useState(false);
    const [copilotMsg, setCopilotMsg] = useState('');
    const [copilotHistory, setCopilotHistory] = useState<{ role: 'user' | 'ai', msg: string }[]>([
        { role: 'ai', msg: "Hello! I am Copilot. I'm ready to analyze metrics, audit components, or configure alerts for you." }
    ]);

    // Prevent background scrolling when modals/menus are open to stop layout shift
    useEffect(() => {
        if (showCopilot || showProfileMenu) {
            document.body.style.overflow = 'hidden';
            // Only add padding if the window width is larger than the client width (meaning a scrollbar exists)
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
            }
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [showCopilot, showProfileMenu]);

    const isLight = theme === 'light';

    const bg = isLight ? 'bg-[#F8F9FA] text-[#1C1B1F]' : 'bg-[#0A0A0F] text-[#E2E2E6]';
    const sidebarBg = isLight ? 'bg-white border-r border-gray-200' : 'bg-[#12121A] border-r border-white/5';
    const cardClass = isLight
        ? 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6'
        : 'bg-[#1A1A24]/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/5 p-6';

    const handleCopilotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!copilotMsg.trim()) return;
        setCopilotHistory(prev => [...prev, { role: 'user', msg: copilotMsg }]);
        setCopilotMsg('');
        // Mock AI response
        setTimeout(() => {
            setCopilotHistory(prev => [...prev, { role: 'ai', msg: 'I received your request. Integrating more insights shortly.' }]);
        }, 1000);
    };

    return (
        <div className={`flex min-h-screen w-full ${bg} transition-colors duration-300`}>
            {/* Sidebar */}
            <aside className={`${sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'} ${sidebarBg} flex flex-col shrink-0 transition-all duration-300 sticky top-0 h-screen overflow-hidden`}>
                <div className={`flex items-center h-16 px-4 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!sidebarCollapsed && <span className="text-lg font-bold bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent">Portal</span>}
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/5 ${isLight ? 'hover:bg-black/5' : ''}`}>
                        <Icon name={sidebarCollapsed ? "menu" : "menu_open"} className="text-lg opacity-60" />
                    </button>
                </div>

                <nav className="flex-1 py-2 px-2 space-y-1">
                    <div className="pt-2 pb-1 px-3">
                        {!sidebarCollapsed && <span className="text-lg font-bold bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent">Workflow</span>}
                    </div>

                    {sections.map(s => {
                        const active = activeSection === s.key;
                        return (
                            <button key={s.key} onClick={() => setActiveSection(s.key)}
                                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2.5 rounded-xl transition-all text-[14px] ${active
                                    ? (isLight ? 'bg-[#7C3AED]/10 text-[#7C3AED] font-semibold' : 'bg-[#A78BFA]/10 text-[#A78BFA] font-semibold')
                                    : (isLight ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/5')}`}>
                                <Icon name={s.icon} className={`text-xl ${sidebarCollapsed ? '' : 'mr-3'} ${active ? '' : 'opacity-60'}`} />
                                {!sidebarCollapsed && <span>{s.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* Theme Toggle has been moved to top bar profile dropdown */}
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                {/* Top Bar */}
                <header className={`h-16 flex items-center justify-between px-8 sticky top-0 z-30 ${isLight ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200' : 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5'}`}>
                    <h1 className="text-xl font-bold capitalize">{activeSection.replace('-', ' ')}</h1>
                    <div className="flex items-center space-x-3">
                        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm ${isLight ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10'} transition-colors cursor-text`}>
                            <Icon name="search" className="text-base opacity-40" />
                            <span className="opacity-40">AI Commands&hellip; (⌘K)</span>
                        </motion.button>
                        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`relative w-9 h-9 rounded-xl flex items-center justify-center ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                            <Icon name="notifications" className="text-lg opacity-60" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                        </motion.button>
                        <div className="relative">
                            <motion.button onClick={() => setShowProfileMenu(!showProfileMenu)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all ${isLight ? 'border-gray-200 hover:border-[#7C3AED]' : 'border-white/10 hover:border-[#A78BFA]'}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover" alt="Portal" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Portal&background=7C3AED&color=fff" }} />
                            </motion.button>
                            <AnimatePresence>
                                {showProfileMenu && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl overflow-hidden z-50 border ${isLight ? 'bg-white border-gray-100 shadow-gray-200/50' : 'bg-[#1A1A24] border-white/5 shadow-black/50'}`}>
                                            <div className={`p-4 border-b ${isLight ? 'border-gray-100' : 'border-white/5'}`}>
                                                <p className="font-semibold text-sm">Ali Al-Zuhairi</p>
                                                <p className="text-xs opacity-60 mt-0.5">admin@alux.space</p>
                                            </div>
                                            <div className="p-2 space-y-1">
                                                <button onClick={() => { setActiveSection('settings'); setShowProfileMenu(false); }} className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm transition-colors ${isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5'}`}>
                                                    <Icon name="settings" className={`mr-3 opacity-60 text-lg ${isLight ? 'text-gray-600' : 'text-gray-300'}`} />
                                                    Settings
                                                </button>
                                                <button onClick={() => { setTheme(isLight ? 'dark' : 'light'); setShowProfileMenu(false); }} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${isLight ? 'hover:bg-gray-50 text-gray-800' : 'hover:bg-white/5 text-gray-200'}`}>
                                                    <div className="flex items-center">
                                                        <Icon name={isLight ? 'dark_mode' : 'light_mode'} className="mr-3 opacity-60 text-lg" />
                                                        Theme
                                                    </div>
                                                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-40">{isLight ? 'Light' : 'Dark'}</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8">
                    <AnimatePresence mode="wait">
                        {activeSection === 'start' && <StartSection key="start" card={cardClass} isLight={isLight} />}
                        {activeSection === 'dashboard' && <DashboardSection key="dash" card={cardClass} isLight={isLight} />}
                        {activeSection === 'users' && <UsersSection key="users" card={cardClass} isLight={isLight} />}
                        {activeSection === 'workspaces' && <WorkspacesSection key="ws" card={cardClass} isLight={isLight} />}
                        {activeSection === 'copilot-logs' && <PortalLogsSection key="logs" card={cardClass} isLight={isLight} />}
                        {activeSection === 'alerts-config' && <AlertsConfigSection key="alerts" card={cardClass} isLight={isLight} />}
                        {activeSection === 'analytics' && <AnalyticsSection key="analytics" card={cardClass} isLight={isLight} />}
                        {activeSection === 'settings' && <SettingsSection key="settings" card={cardClass} isLight={isLight} setTheme={setTheme} />}
                    </AnimatePresence>
                </main>
            </div>

            {/* Global AI Copilot Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCopilot(true)}
                className="fixed bottom-8 right-8 w-14 h-14 z-50 group"
            >
                <div className="absolute inset-0 rounded-full bg-[#7C3AED] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-[1.25rem] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] shadow-2xl overflow-hidden before:absolute before:inset-0 before:bg-[url('https://grainy-gradients.vercel.app/noise.svg')] before:opacity-20 before:mix-blend-overlay">
                    <div className={`w-full h-full rounded-[1.25rem] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#1A1A24]'}`}>
                        <Icon name="auto_awesome" className="text-2xl bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                    </div>
                </div>
            </motion.button>

            {/* Global AI Copilot Slide-over */}
            <AnimatePresence>
                {showCopilot && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm"
                        onClick={() => setShowCopilot(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full max-w-md h-full shadow-2xl flex flex-col relative ${isLight ? 'bg-[#F8F9FA] border-l border-gray-200' : 'bg-[#0A0A0F] border-l border-white/10'}`}
                        >
                            <div className={`flex items-center justify-between p-5 border-b relative overflow-hidden z-10 ${isLight ? 'border-gray-200 bg-white/50 backdrop-blur-xl' : 'border-white/10 bg-[#12121A]/80 backdrop-blur-xl'}`}>
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A78BFA] via-[#7C3AED] to-[#A78BFA]" />
                                <div className="flex items-center space-x-3">
                                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1.5px] shadow-lg overflow-hidden before:absolute before:inset-0 before:bg-[url('https://grainy-gradients.vercel.app/noise.svg')] before:opacity-20 before:mix-blend-overlay">
                                        <div className={`w-full h-full rounded-xl flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#12121A]'}`}>
                                            <Icon name="auto_awesome" className="text-lg bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                                        </div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#12121A] rounded-full z-20" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent">Copilot</h3>
                                        <p className="text-[11px] font-medium opacity-60 flex items-center mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" /> Always active</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isLight ? 'hover:bg-gray-200' : 'hover:bg-white/10'}`} title="History">
                                        <Icon name="history" className="text-[18px] opacity-60" />
                                    </button>
                                    <button onClick={() => setShowCopilot(false)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isLight ? 'hover:bg-gray-200' : 'hover:bg-white/10'}`}>
                                        <Icon name="close" className="opacity-60" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 space-y-5 z-0 relative">
                                {/* Subtle background glow */}
                                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7C3AED]/10 blur-[80px] rounded-full pointer-events-none" />

                                {copilotHistory.map((h, i) => (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} key={i} className={`flex flex-col ${h.role === 'user' ? 'items-end' : 'items-start'} relative z-10`}>
                                        <div className="flex w-full items-end justify-start">
                                            {h.role === 'ai' && (
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[1px] shadow-sm overflow-hidden flex-shrink-0 mr-3">
                                                    <div className={`w-full h-full rounded-lg flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#1A1A24]'}`}>
                                                        <Icon name="auto_awesome" className="text-[14px] bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
                                                    </div>
                                                </div>
                                            )}
                                            <div className={`flex flex-col ${h.role === 'user' ? 'items-end ml-auto' : 'items-start'}`}>
                                                {h.role === 'ai' && <span className="text-[10px] font-semibold opacity-50 mb-1 ml-1 tracking-wider uppercase">Portal AI</span>}
                                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${h.role === 'user' ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white rounded-br-sm shadow-[#7C3AED]/20' : isLight ? 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-gray-200/50' : 'bg-[#1A1A24] border border-white/5 text-gray-200 rounded-bl-sm shadow-black/50'} relative`}>
                                                    {h.msg}
                                                    {h.role === 'ai' && i === copilotHistory.length - 1 && (
                                                        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-current/10">
                                                            <button className="flex items-center space-x-1 text-[10px] opacity-70 hover:opacity-100 transition-opacity"><Icon name="content_copy" className="text-[12px]" /> <span>Copy</span></button>
                                                            <button className="flex items-center space-x-1 text-[10px] opacity-70 hover:opacity-100 transition-opacity"><Icon name="ios_share" className="text-[12px]" /> <span>Share</span></button>
                                                            <button className="flex items-center space-x-1 text-[10px] opacity-70 hover:opacity-100 transition-opacity"><Icon name="thumb_up" className="text-[12px]" /></button>
                                                            <button className="flex items-center space-x-1 text-[10px] opacity-70 hover:opacity-100 transition-opacity"><Icon name="thumb_down" className="text-[12px]" /></button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {copilotHistory.length === 1 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pt-4 grid grid-cols-1 gap-2">
                                        {[
                                            { icon: 'analytics', label: 'Analyze weekly engagement' },
                                            { icon: 'security', label: 'Audit recent admin actions' },
                                            { icon: 'speed', label: 'Optimize query performance' }
                                        ].map(opt => (
                                            <button key={opt.label} onClick={() => { setCopilotMsg(opt.label); }} className={`flex items-center space-x-3 p-3 text-left rounded-xl transition-all ${isLight ? 'bg-white border border-gray-200 hover:border-[#7C3AED] hover:shadow-md' : 'bg-[#1A1A24] border border-white/10 hover:border-[#A78BFA] hover:bg-white/5'} text-[13px]`}>
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isLight ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'bg-[#A78BFA]/10 text-[#A78BFA]'}`}>
                                                    <Icon name={opt.icon} className="text-[16px]" />
                                                </div>
                                                <span className="font-medium">{opt.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            <div className={`p-4 border-t relative z-10 ${isLight ? 'border-gray-200 bg-white/80 backdrop-blur-md' : 'border-white/10 bg-[#12121A]/80 backdrop-blur-md'}`}>
                                <form onSubmit={handleCopilotSubmit} className={`flex items-center space-x-2 px-2 py-1.5 rounded-2xl border shadow-sm transition-all duration-300 ${isLight ? 'bg-gray-50 border-gray-200 focus-within:bg-white focus-within:border-[#7C3AED] focus-within:shadow-[#7C3AED]/10' : 'bg-[#1A1A24]/50 border-white/10 focus-within:bg-[#1A1A24] focus-within:border-[#A78BFA] focus-within:shadow-[#A78BFA]/10'}`}>
                                    <button type="button" className={`w-9 h-9 flex shrink-0 items-center justify-center rounded-xl transition-colors ${isLight ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-white/10 text-gray-400'}`}>
                                        <Icon name="attach_file" className="text-[18px]" />
                                    </button>
                                    <input
                                        type="text"
                                        value={copilotMsg}
                                        onChange={(e) => setCopilotMsg(e.target.value)}
                                        placeholder="Ask Copilot anything..."
                                        className="flex-1 bg-transparent border-none outline-none text-[13px] py-2 w-full min-w-0"
                                    />
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={!copilotMsg.trim()} className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-xl transition-all ${copilotMsg.trim() ? 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-md shadow-[#7C3AED]/30' : isLight ? 'bg-gray-200 text-gray-400' : 'bg-white/10 text-gray-500'}`}>
                                        <Icon name="arrow_upward" className="text-base font-bold" />
                                    </motion.button>
                                </form>
                                <div className="text-center mt-3 flex justify-center w-full">
                                    <span className="text-[10px] opacity-40">AI can make mistakes. Check important info.</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// SHARED
// ═══════════════════════════════════════════════════════════
const pageVariants = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.06 } }, exit: { opacity: 0, y: -12 } };
const itemVariants = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

function KPICard({ icon, label, value, trend, trendUp, isLight }: { icon: string, label: string, value: string, trend: string, trendUp: boolean, isLight: boolean }) {
    const [showInsight, setShowInsight] = useState(false);

    return (
        <motion.div variants={itemVariants} whileHover={{ y: -4, scale: 1.02 }} onClick={() => setShowInsight(!showInsight)} className={`${isLight ? 'bg-white border border-gray-100 shadow-sm' : 'bg-[#1A1A24]/80 border border-white/5'} rounded-2xl p-5 flex flex-col cursor-pointer transition-colors hover:border-[#7C3AED]/30`}>
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLight ? 'bg-[#7C3AED]/10' : 'bg-[#A78BFA]/10'}`}>
                    <Icon name={icon} className={`text-lg ${isLight ? 'text-[#7C3AED]' : 'text-[#A78BFA]'}`} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center space-x-1 ${trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                    <Icon name={trendUp ? "trending_up" : "trending_down"} className="text-[12px]" />
                    <span>{trend}</span>
                </span>
            </div>
            <span className="text-2xl font-bold">{value}</span>
            <span className={`text-sm mt-1 flex justify-between items-center ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                {label}
                <Icon name="info" className="text-[14px] opacity-40 hover:opacity-100 transition-opacity" />
            </span>

            <AnimatePresence>
                {showInsight && (
                    <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: 12 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
                        <div className={`p-3 rounded-xl text-xs flex items-start space-x-2 ${isLight ? 'bg-[#7C3AED]/5 text-[#7C3AED]' : 'bg-[#A78BFA]/10 text-[#A78BFA]'}`}>
                            <Icon name="auto_awesome" className="text-[14px] shrink-0 mt-0.5" />
                            <span>AI predicts this will increase by another 2% in the coming week based on current marketing campaigns.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════
function DashboardSection({ card, isLight }: { card: string, isLight: boolean }) {
    const recentActivity = [
        { user: 'Sara K.', action: 'Updated design system tokens', time: '5 min ago', icon: 'palette' },
        { user: 'James L.', action: 'Added 3 comments to Sprint Review', time: '12 min ago', icon: 'chat' },
        { user: 'Mia C.', action: 'Completed UX research report', time: '28 min ago', icon: 'description' },
        { user: 'Alex R.', action: 'Created Q1 Planning workspace', time: '1h ago', icon: 'add_circle' },
        { user: 'Lena T.', action: 'Asked Copilot about metrics', time: '2h ago', icon: 'auto_awesome' },
    ];

    const activityChartTops = useMemo(() => Array.from({ length: 30 }, (_, i) => 20 + Math.sin(i * 0.5) * 30 + Math.random() * 30), []);
    const heatmapData = useMemo(() => Array.from({ length: 35 }, () => Math.random()), []);

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <KPICard icon="group" label="Total Users" value="1,247" trend="+12.4%" trendUp={true} isLight={isLight} />
                <KPICard icon="workspaces" label="Active Workspaces" value="38" trend="+8.2%" trendUp={true} isLight={isLight} />
                <KPICard icon="auto_awesome" label="AI Queries Today" value="2,891" trend="+24.1%" trendUp={true} isLight={isLight} />
                <KPICard icon="speed" label="Platform Uptime" value="99.97%" trend="+0.02%" trendUp={true} isLight={isLight} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Activity Chart */}
                <motion.div variants={itemVariants} className={`${card} col-span-2`}>
                    <h3 className="font-semibold text-lg mb-4">User Activity (30 Days)</h3>
                    <div className="h-48 flex items-end justify-between gap-1 px-2">
                        {activityChartTops.map((h: number, i: number) => (
                            <motion.div key={i} className="relative w-full h-full flex items-end group">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: i * 0.02 }}
                                    whileHover={{ backgroundColor: isLight ? '#6D28D9' : '#8B5CF6' }}
                                    className={`w-full rounded-t-sm ${isLight ? 'bg-[#7C3AED]/60' : 'bg-[#A78BFA]/40'} transition-colors cursor-pointer relative z-10`} />
                                {/* Tooltip */}
                                <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none ${isLight ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 shadow-xl'}`}>
                                    {Math.round(h * 15)} Interactions
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] opacity-40 px-2">
                        <span>Jan 23</span><span>Feb 1</span><span>Feb 8</span><span>Feb 15</span><span>Feb 22</span>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.map((a, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 4, backgroundColor: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)' }}
                                className="flex items-start space-x-3 p-2 -mx-2 rounded-xl cursor-pointer transition-colors"
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                                    <Icon name={a.icon} className="text-sm opacity-60" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[13px]"><span className="font-semibold">{a.user}</span> {a.action}</p>
                                    <span className="text-[11px] opacity-40">{a.time}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* AI Usage Donut + Workspace Heatmap */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">AI Copilot Usage</h3>
                    <div className="flex items-center space-x-8">
                        <motion.div whileHover={{ scale: 1.05 }} className="relative w-32 h-32 flex items-center justify-center shrink-0 cursor-pointer">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path className={isLight ? "text-gray-100" : "text-white/5"} stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "35, 100" }} transition={{ duration: 1.2 }} strokeLinecap="round" className="text-[#A78BFA] hover:opacity-80 transition-opacity" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "25, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-35" strokeLinecap="round" className="text-emerald-500 hover:opacity-80 transition-opacity" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "20, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-60" strokeLinecap="round" className="text-amber-500 hover:opacity-80 transition-opacity" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "20, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-80" strokeLinecap="round" className="text-rose-500 hover:opacity-80 transition-opacity" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <span className="absolute text-xl font-bold">2,891</span>
                        </motion.div>
                        <div className="flex-1 space-y-2">
                            {[{ label: 'Sprint Queries', pct: '35%', color: 'bg-[#A78BFA]' }, { label: 'Design Reviews', pct: '25%', color: 'bg-emerald-500' }, { label: 'Analytics', pct: '20%', color: 'bg-amber-500' }, { label: 'General', pct: '20%', color: 'bg-rose-500' }].map(s => (
                                <motion.div key={s.label} whileHover={{ scale: 1.02, x: 2 }} className={`flex justify-between text-sm items-center p-2 rounded-lg cursor-pointer ${isLight ? 'bg-gray-50 hover:bg-gray-100' : 'bg-white/[0.03] hover:bg-white/[0.06]'} transition-colors`}>
                                    <span className="flex items-center opacity-70"><span className={`w-2.5 h-2.5 rounded-full mr-2.5 ${s.color}`} />{s.label}</span>
                                    <span className="font-semibold">{s.pct}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">Workspace Activity Heatmap</h3>
                    <div className="grid grid-cols-7 gap-1.5">
                        {heatmapData.map((intensity: number, i: number) => {
                            const bg = intensity > 0.7 ? (isLight ? 'bg-[#7C3AED]' : 'bg-[#A78BFA]') : intensity > 0.4 ? (isLight ? 'bg-[#7C3AED]/50' : 'bg-[#A78BFA]/40') : intensity > 0.1 ? (isLight ? 'bg-[#7C3AED]/20' : 'bg-[#A78BFA]/15') : (isLight ? 'bg-gray-100' : 'bg-white/5');
                            return <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.01 }} whileHover={{ scale: 1.2, zIndex: 10 }} className={`aspect-square rounded-md ${bg} cursor-pointer hover:shadow-lg transition-shadow relative group`}>
                                {/* Tooltip */}
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none ${isLight ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 shadow-xl'}`}>
                                    Score: {Math.round(intensity * 100)}
                                </div>
                            </motion.div>;
                        })}
                    </div>
                    <div className="flex justify-between items-center mt-3 text-[11px] opacity-40">
                        <span>Less active</span>
                        <div className="flex space-x-1">
                            {[isLight ? 'bg-gray-100' : 'bg-white/5', isLight ? 'bg-[#7C3AED]/20' : 'bg-[#A78BFA]/15', isLight ? 'bg-[#7C3AED]/50' : 'bg-[#A78BFA]/40', isLight ? 'bg-[#7C3AED]' : 'bg-[#A78BFA]'].map((c, i) => (
                                <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                            ))}
                        </div>
                        <span>More active</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════════════════════
function UsersSection({ card, isLight }: { card: string, isLight: boolean }) {
    const users = [
        { name: 'Sara Kim', email: 'sara@company.com', role: 'Admin', status: 'Active', lastActive: '5 min ago' },
        { name: 'James Lee', email: 'james@company.com', role: 'Editor', status: 'Active', lastActive: '12 min ago' },
        { name: 'Mia Chen', email: 'mia@company.com', role: 'Editor', status: 'Active', lastActive: '28 min ago' },
        { name: 'Alex Rivera', email: 'alex@company.com', role: 'Viewer', status: 'Active', lastActive: '1h ago' },
        { name: 'Lena Torres', email: 'lena@company.com', role: 'Editor', status: 'Inactive', lastActive: '3 days ago' },
        { name: 'Noah Park', email: 'noah@company.com', role: 'Viewer', status: 'Active', lastActive: '2h ago' },
        { name: 'Isla Wang', email: 'isla@company.com', role: 'Admin', status: 'Active', lastActive: '15 min ago' },
        { name: 'Ethan Patel', email: 'ethan@company.com', role: 'Editor', status: 'Invited', lastActive: 'Never' },
    ];

    const roleBadge = (r: string) => r === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : r === 'Editor' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    const statusDot = (s: string) => s === 'Active' ? 'bg-emerald-500' : s === 'Invited' ? 'bg-amber-500' : 'bg-gray-400';

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold">Portal User Management</h2>
                    <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{users.length} total users</p>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors flex items-center space-x-2 shadow-lg shadow-[#7C3AED]/20">
                    <Icon name="person_add" className="text-base" /><span>Add User</span>
                </motion.button>
            </div>

            <motion.div variants={itemVariants} className={card}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className={`text-left text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                <th className="pb-4 font-medium">User</th>
                                <th className="pb-4 font-medium">Role</th>
                                <th className="pb-4 font-medium">Status</th>
                                <th className="pb-4 font-medium">Last Active</th>
                                <th className="pb-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((u, i) => {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const [expanded, setExpanded] = useState(false);
                                return (
                                    <React.Fragment key={i}>
                                        <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                            onClick={() => setExpanded(!expanded)}
                                            className={`${isLight ? 'hover:bg-gray-50 divide-gray-100' : 'hover:bg-white/[0.02]'} transition-colors cursor-pointer group`}>
                                            <td className="py-3">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${isLight ? 'bg-[#7C3AED]/10 text-[#7C3AED] group-hover:bg-[#7C3AED]/20' : 'bg-[#A78BFA]/10 text-[#A78BFA] group-hover:bg-[#A78BFA]/20'} transition-colors`}>
                                                        {u.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-sm block">{u.name}</span>
                                                        <span className="text-xs opacity-50">{u.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${roleBadge(u.role)}`}>{u.role}</span></td>
                                            <td className="py-3"><span className="flex items-center text-sm"><span className={`w-2 h-2 rounded-full mr-2 ${statusDot(u.status)}`} />{u.status}</span></td>
                                            <td className="py-3 text-sm opacity-60">{u.lastActive}</td>
                                            <td className="py-3 text-right">
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={`w-8 h-8 rounded-lg inline-flex items-center justify-center ${isLight ? 'hover:bg-gray-200' : 'hover:bg-white/10'} transition-colors`}>
                                                    <Icon name={expanded ? "expand_less" : "expand_more"} className="text-base opacity-50" />
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                        <AnimatePresence>
                                            {expanded && (
                                                <tr>
                                                    <td colSpan={5} className="p-0 border-0">
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                            <div className={`m-2 p-4 rounded-xl flex items-start space-x-4 ${isLight ? 'bg-gray-50' : 'bg-white/[0.02]'}`}>
                                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isLight ? 'bg-white shadow-sm' : 'bg-white/5'}`}>
                                                                    <Icon name="auto_awesome" className={isLight ? 'text-[#7C3AED]' : 'text-[#A78BFA]'} />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-sm font-semibold mb-1">AI Portal Summary</h4>
                                                                    <p className="text-xs opacity-70 leading-relaxed max-w-2xl">{u.name} is highly engaged with design system components. They frequently use the AI Copilot for syntax validation. Consider offering them early access to the new Design Tokens beta feature.</p>
                                                                    <div className="flex space-x-3 mt-3">
                                                                        <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${isLight ? 'bg-white border border-gray-200 hover:bg-gray-50' : 'bg-white/5 border border-white/5 hover:bg-white/10'} transition-colors`}>View Full Profile</button>
                                                                        <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg text-[#7C3AED] ${isLight ? 'bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20' : 'bg-[#A78BFA]/10 hover:bg-[#A78BFA]/20'} transition-colors flex items-center`}><Icon name="mail" className="text-[14px] mr-1.5" /> Message</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </td>
                                                </tr>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// WORKSPACES
// ═══════════════════════════════════════════════════════════
function WorkspacesSection({ card, isLight }: { card: string, isLight: boolean }) {
    const workspaces = [
        { name: 'Design System v3', members: 8, docs: 24, queries: 156, status: 'Active' },
        { name: 'UX Research Q4', members: 5, docs: 12, queries: 89, status: 'Active' },
        { name: 'Marketing Launch', members: 12, docs: 36, queries: 234, status: 'Active' },
        { name: 'Product Roadmap', members: 6, docs: 8, queries: 45, status: 'Review' },
        { name: 'QA Testing Sprint', members: 4, docs: 15, queries: 67, status: 'Paused' },
        { name: 'Q1 Planning 2026', members: 6, docs: 3, queries: 12, status: 'Active' },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Portal Administration</h2>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors flex items-center space-x-2 shadow-lg shadow-[#7C3AED]/20">
                    <Icon name="add" className="text-base" /><span>New Workspace</span>
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {workspaces.map((ws, i) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [showDetails, setShowDetails] = useState(false);
                    return (
                        <motion.div key={i} variants={itemVariants} whileHover={{ y: -4, scale: 1.02 }} onClick={() => setShowDetails(!showDetails)} className={`${card} cursor-pointer transition-colors hover:border-[#7C3AED]/30`}>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold">{ws.name}</h3>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${ws.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : ws.status === 'Review' ? 'bg-amber-500/10 text-amber-500' : 'bg-gray-500/10 text-gray-400'}`}>{ws.status}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3 text-center mb-1">
                                {[{ v: ws.members, l: 'Members' }, { v: ws.docs, l: 'Docs' }, { v: ws.queries, l: 'AI Queries' }].map(s => (
                                    <div key={s.l} className={`p-2 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/[0.03]'}`}>
                                        <span className="text-lg font-bold block">{s.v}</span>
                                        <span className="text-[10px] opacity-50">{s.l}</span>
                                    </div>
                                ))}
                            </div>
                            <AnimatePresence>
                                {showDetails && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4 pt-4 border-t border-gray-200/20 dark:border-white/10">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Icon name="insights" className={isLight ? 'text-[#7C3AED]' : 'text-[#A78BFA]'} />
                                            <span className="text-xs font-semibold">Workspace Health: Excellent</span>
                                        </div>
                                        <p className="text-xs opacity-70 mb-3">Participation is up 12% this week. Most activity is centered around the new requirements document.</p>
                                        <button className={`w-full py-2 rounded-xl text-xs font-semibold ${isLight ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10'} transition-colors`}>View Dashboard</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// COPILOT LOGS
// ═══════════════════════════════════════════════════════════
function PortalLogsSection({ card, isLight }: { card: string, isLight: boolean }) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const logs = [
        { id: 1, user: 'Sara K.', query: 'What are the latest design system changes?', response: 'The Design System v3 has 14 new component updates including typography scale, elevation tokens, and color palette adjustments aligned with WCAG 2.2 AA.', confidence: 94, time: '10 min ago', citations: 2 },
        { id: 2, user: 'James L.', query: 'Summarize sprint review feedback', response: 'The sprint review received positive feedback on navigation improvements. 3 action items were created for the next sprint related to mobile responsiveness.', confidence: 88, time: '32 min ago', citations: 3 },
        { id: 3, user: 'Mia C.', query: 'Show UX research completion status', response: 'Q4 UX research is 100% complete with 24 participants. Key findings: 78% prefer card-based views, accessibility scores improved 22%.', confidence: 96, time: '1h ago', citations: 1 },
        { id: 4, user: 'Alex R.', query: 'What metrics should I track for Q1?', response: 'Recommended Q1 metrics: user engagement rate, workspace creation frequency, AI query volume, and collaboration session duration.', confidence: 82, time: '3h ago', citations: 2 },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h2 className="text-lg font-bold">Portal AI Conversation Logs</h2>

            <div className="space-y-3">
                {logs.map((log) => (
                    <motion.div key={log.id} variants={itemVariants} onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                        className={`${card} cursor-pointer hover:scale-[1.005] transition-transform`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${isLight ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'bg-[#A78BFA]/10 text-[#A78BFA]'}`}>
                                    {log.user.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <span className="font-medium text-sm">{log.user}</span>
                                    <span className="text-xs opacity-40 ml-2">{log.time}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${log.confidence >= 90 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{log.confidence}% conf.</span>
                                <span className={`text-xs px-2 py-1 rounded-lg ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>{log.citations} sources</span>
                            </div>
                        </div>
                        <p className={`mt-3 text-sm font-medium ${isLight ? 'text-[#7C3AED]' : 'text-[#A78BFA]'}`}>&ldquo;{log.query}&rdquo;</p>
                        <AnimatePresence>
                            {expanded === log.id && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                    <p className={`mt-3 pt-3 text-sm border-t ${isLight ? 'text-gray-600 border-gray-200' : 'text-gray-300 border-white/5'}`}>{log.response}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// ALERTS CONFIG
// ═══════════════════════════════════════════════════════════
function AlertsConfigSection({ card, isLight }: { card: string, isLight: boolean }) {
    const [toggles, setToggles] = useState<Record<string, boolean>>({ overdue: true, sprint: true, workspace: false, copilot: true, system: true });

    const rules = [
        { id: 'overdue', name: 'Overdue Reviews', desc: 'Trigger when design reviews exceed deadline', trigger: '> 24 hours', channel: 'Email + Push', priority: 'Critical' },
        { id: 'sprint', name: 'Sprint Ending', desc: 'Alert before sprint deadline', trigger: '24 hours before', channel: 'Push', priority: 'Warning' },
        { id: 'workspace', name: 'Workspace Inactivity', desc: 'Alert on workspace with no activity', trigger: '> 7 days', channel: 'Email', priority: 'Info' },
        { id: 'copilot', name: 'Low Confidence Response', desc: 'Flag AI responses below threshold', trigger: '< 80% confidence', channel: 'Dashboard', priority: 'Warning' },
        { id: 'system', name: 'System Health', desc: 'Monitor uptime and performance', trigger: '< 99.5% uptime', channel: 'Email + Webhook', priority: 'Critical' },
    ];

    const priorityColor = (p: string) => p === 'Critical' ? 'text-red-400 bg-red-500/10' : p === 'Warning' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10';

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h2 className="text-lg font-bold">Alert Configuration</h2>

            <div className="space-y-3">
                {rules.map((r) => (
                    <motion.div key={r.id} variants={itemVariants} className={card}>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                    <h3 className="font-semibold text-sm">{r.name}</h3>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColor(r.priority)}`}>{r.priority}</span>
                                </div>
                                <p className="text-xs opacity-50 mb-2">{r.desc}</p>
                                <div className="flex items-center space-x-4 text-xs opacity-60">
                                    <span className="flex items-center"><Icon name="bolt" className="text-xs mr-1" />{r.trigger}</span>
                                    <span className="flex items-center"><Icon name="send" className="text-xs mr-1" />{r.channel}</span>
                                </div>
                            </div>
                            <button onClick={() => setToggles(prev => ({ ...prev, [r.id]: !prev[r.id] }))}
                                className={`w-12 h-7 rounded-full transition-colors relative ${toggles[r.id] ? 'bg-[#7C3AED]' : (isLight ? 'bg-gray-300' : 'bg-white/10')}`}>
                                <motion.div animate={{ x: toggles[r.id] ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════════════════════════
function AnalyticsSection({ card, isLight }: { card: string, isLight: boolean }) {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Usage Analytics</h2>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center space-x-2 ${isLight ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10'}`}>
                    <Icon name="download" className="text-base" /><span>Export Data</span>
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <KPICard icon="visibility" label="Page Views" value="48.2K" trend="+18%" trendUp={true} isLight={isLight} />
                <KPICard icon="schedule" label="Avg. Session" value="12m 34s" trend="+8%" trendUp={true} isLight={isLight} />
                <KPICard icon="thumb_up" label="Satisfaction" value="4.7/5" trend="+0.3" trendUp={true} isLight={isLight} />
                <KPICard icon="bolt" label="Avg. Response" value="1.2s" trend="-15%" trendUp={true} isLight={isLight} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">Engagement by Feature</h3>
                    <div className="space-y-3">
                        {[
                            { feature: 'AI Copilot', usage: 82 },
                            { feature: 'Workspaces', usage: 74 },
                            { feature: 'Document Editor', usage: 68 },
                            { feature: 'Notifications', usage: 56 },
                            { feature: 'Analytics', usage: 42 },
                        ].map((f, i) => (
                            <div key={f.feature}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{f.feature}</span>
                                    <span className="font-semibold">{f.usage}%</span>
                                </div>
                                <div className={`h-2 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${f.usage}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">Weekly Active Users</h3>
                    <div className="h-48 flex items-end justify-between gap-3 px-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                            const h = [65, 78, 82, 90, 85, 40, 35][i];
                            return (
                                <div key={day} className="flex-1 flex flex-col items-center group relative">
                                    <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: i * 0.06 }}
                                        whileHover={{ backgroundColor: isLight ? '#6D28D9' : '#8B5CF6' }}
                                        className={`w-full max-w-[32px] rounded-t-lg ${isLight ? 'bg-[#7C3AED]/60' : 'bg-[#A78BFA]/40'} transition-colors cursor-pointer relative z-10`} />
                                    <span className="text-[10px] mt-2 opacity-40">{day}</span>

                                    {/* Tooltip */}
                                    <div className={`absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none ${isLight ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 shadow-xl'}`}>
                                        {Math.round(h * 123)} Active
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// START SECTION (OVERVIEW)
// ═══════════════════════════════════════════════════════════
function StartSection({ card, isLight }: { card: string, isLight: boolean }) {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const greeting = () => {
        if (!currentTime) return 'Hello';
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Hero Greeting Section */}
            <motion.div variants={itemVariants} className="text-center mb-10 pt-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="inline-flex items-center justify-center w-24 h-24 mb-6 relative group cursor-pointer"
                >
                    {/* Glowing AI Orb */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-cyan-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-[2px] shadow-xl overflow-hidden before:absolute before:inset-0 before:bg-[url('https://grainy-gradients.vercel.app/noise.svg')] before:opacity-20 before:mix-blend-overlay">
                        <div className={`w-full h-full rounded-[2rem] flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#1A1A24]'}`}>
                            <Icon name="auto_awesome" className={`text-4xl bg-clip-text text-transparent bg-gradient-to-br from-indigo-500 to-fuchsia-500`} />
                        </div>
                    </div>
                </motion.div>

                <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {greeting()}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-500">Ali</span>
                </h1>
                <p className={`text-base font-medium ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                    Today is {currentTime ? currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'loading...'}
                </p>
            </motion.div>

            {/* AI Daily Summary Block */}
            <motion.div variants={itemVariants} className={`${card} relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-[0.03] blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none`} />

                <div className="flex items-start md:items-center space-x-4 mb-5 relative z-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-indigo-500/10 text-indigo-500 shadow-inner">
                        <Icon name="auto_awesome" className="text-[20px]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Your Daily Briefing</h2>
                        <p className={`text-xs ${isLight ? 'text-gray-500' : 'opacity-60'}`}>AI-generated summary of your workspace</p>
                    </div>
                </div>

                <div className={`space-y-3 text-[14px] leading-relaxed relative z-10 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                    <p>Good morning! You have <strong className={isLight ? 'text-indigo-600' : 'text-indigo-400'}>3 overdue sprint reviews</strong> waiting for your approval. In the <span className="underline decoration-indigo-500/30 underline-offset-4 cursor-pointer hover:text-indigo-500 transition-colors">Design System v3</span> workspace, 5 new comments were left regarding the new elevation tokens.</p>
                    <p>Also, I noticed a <strong>12% drop in workflow completion</strong> yesterday. Would you like me to analyze the bottleneck?</p>
                </div>
            </motion.div>

            {/* Quick AI Starters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { icon: 'task_alt', title: 'Review Sprints', desc: '3 tasks need your sign-off', color: 'from-emerald-400 to-emerald-600', hue: 'emerald' },
                    { icon: 'forum', title: 'Catch up', desc: '5 unread comments', color: 'from-fuchsia-400 to-fuchsia-600', hue: 'fuchsia' },
                    { icon: 'troubleshoot', title: 'Analyze Drop', desc: 'Investigate 12% drop', color: 'from-indigo-400 to-indigo-600', hue: 'indigo' },
                ].map((action, i) => (
                    <motion.div key={i} variants={itemVariants} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className={`group p-4 ${card} cursor-pointer relative overflow-hidden transition-all duration-300 hover:border-[#7C3AED]/30`}>
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-full -mr-8 -mt-8 pointer-events-none`} />

                        <div className={`w-9 h-9 rounded-xl mb-3 flex items-center justify-center text-white bg-gradient-to-br ${action.color} shadow-sm`}>
                            <Icon name={action.icon} className="text-[18px]" />
                        </div>
                        <h3 className="font-bold text-[14px] mb-0.5">{action.title}</h3>
                        <p className={`text-[11px] ${isLight ? 'text-gray-500' : 'opacity-50'}`}>{action.desc}</p>

                        <div className={`mt-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${isLight ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white'}`}>
                            <Icon name="arrow_forward" className="text-[12px]" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Input */}
            <motion.div variants={itemVariants} className="pt-4">
                <div className={`relative flex items-center p-1.5 rounded-2xl shadow-sm transition-all duration-300 border ${isLight ? 'bg-white shadow-gray-200/50 border-gray-200 focus-within:border-indigo-500/50 focus-within:shadow-indigo-500/10' : 'bg-[#1A1A24]/90 border-white/10 focus-within:border-[#A78BFA]/50 focus-within:shadow-[#A78BFA]/10'}`}>
                    <div className="pl-3 pr-2 opacity-50">
                        <Icon name="auto_awesome" className="text-[18px]" />
                    </div>
                    <input
                        type="text"
                        placeholder="Ask AI to find a file, summarize a workspace, or draft an email&hellip;"
                        className={`w-full bg-transparent py-2.5 outline-none text-[13px] ${isLight ? 'text-gray-900 placeholder-gray-400' : 'text-white placeholder-white/30'}`}
                    />
                    <button className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center hover:shadow-md hover:shadow-indigo-500/30 transition-all shrink-0 ml-2">
                        <Icon name="arrow_upward" className="text-[16px]" />
                    </button>
                </div>
                <div className="text-center mt-3">
                    <span className="text-[10px] opacity-40">AI can make mistakes. Check important info.</span>
                </div>
            </motion.div>

        </motion.div>
    );
}
// SETTINGS
// ═══════════════════════════════════════════════════════════
function SettingsSection({ card, isLight, setTheme }: { card: string, isLight: boolean, setTheme: (val: string) => void }) {
    const [toggles, setToggles] = useState<Record<string, boolean>>({ sso: true, '2fa': true, copilot: true, analytics: true, beta: false });

    const settingGroups: { title: string, items: { id: string, name?: string, desc?: string, custom?: boolean }[] }[] = [
        {
            title: 'Appearance', items: [
                { id: 'theme-toggle', custom: true }
            ]
        },
        {
            title: 'Authentication', items: [
                { id: 'sso', name: 'SSO Provider', desc: 'Enable Single Sign-On via SAML/OIDC' },
                { id: 'twofa', name: 'Two-Factor Authentication', desc: 'Require 2FA for all admin users' },
            ]
        },
        {
            title: 'Features', items: [
                { id: 'copilot', name: 'AI Copilot', desc: 'Enable AI-powered collaboration assistant' },
                { id: 'analytics', name: 'Usage Analytics', desc: 'Collect anonymous usage data for insights' },
                { id: 'beta', name: 'Beta Features', desc: 'Enable experimental features for testing' },
            ]
        },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 max-w-3xl">
            <h2 className="text-lg font-bold">Portal Settings</h2>

            {settingGroups.map((group) => (
                <motion.div key={group.title} variants={itemVariants} className={card}>
                    <h3 className="font-semibold mb-4">{group.title}</h3>
                    <div className={`space-y-0 divide-y ${isLight ? 'divide-gray-100' : 'divide-white/5'}`}>
                        {group.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                {item.custom && item.id === 'theme-toggle' ? (
                                    <>
                                        <div>
                                            <span className="font-medium text-sm block">Theme Preference</span>
                                            <span className="text-xs opacity-50">Choose between light and dark mode</span>
                                        </div>
                                        <div className={`flex rounded-xl p-1 bg-opacity-50 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                                            <button onClick={() => setTheme('light')} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${isLight ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-white'}`}>
                                                Light
                                            </button>
                                            <button onClick={() => setTheme('dark')} className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${!isLight ? 'bg-[#1A1A24] shadow-sm text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                                                Dark
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <span className="font-medium text-sm block">{item.name}</span>
                                            <span className="text-xs opacity-50">{item.desc}</span>
                                        </div>
                                        <button onClick={() => setToggles(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                            className={`w-12 h-7 rounded-full transition-colors relative shrink-0 ml-4 ${toggles[item.id] ? 'bg-[#7C3AED]' : (isLight ? 'bg-gray-300' : 'bg-white/10')}`}>
                                            <motion.div animate={{ x: toggles[item.id] ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm" />
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}

            <motion.div variants={itemVariants} className={card}>
                <h3 className="font-semibold mb-4">Platform</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-1.5">Platform Name</label>
                        <input type="text" defaultValue="Workflow Platform" className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${isLight ? 'bg-gray-50 border border-gray-200 focus:border-[#7C3AED]' : 'bg-white/5 border border-white/10 focus:border-[#A78BFA]'} transition-colors`} />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-1.5">Support Email</label>
                        <input type="email" defaultValue="admin@collabplatform.com" className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${isLight ? 'bg-gray-50 border border-gray-200 focus:border-[#7C3AED]' : 'bg-white/5 border border-white/10 focus:border-[#A78BFA]'} transition-colors`} />
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors shadow-lg shadow-[#7C3AED]/20 mt-2">Save Platform Configuration</motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
