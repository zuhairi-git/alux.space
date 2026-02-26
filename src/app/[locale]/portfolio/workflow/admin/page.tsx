'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import type { Theme } from '@/context/ThemeContext';

const Icon = ({ name, className = "", style }: { name: string, className?: string, style?: React.CSSProperties }) => (
    <span className={`material-symbols ${className}`} style={style}>{name}</span>
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

type NotificationItem = {
    id: string;
    title: string;
    detail: string;
    time: string;
    read: boolean;
};

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
export default function PortalPanel() {
    const [activeSection, setActiveSection] = useState<Section>('start');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [showIntro, setShowIntro] = useState(true);

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationsRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCopilot, setShowCopilot] = useState(false);
    const [copilotMsg, setCopilotMsg] = useState('');
    const [notifications, setNotifications] = useState<NotificationItem[]>([
        { id: 'n1', title: 'Sprint Review Overdue', detail: '3 reviews need approval in Design System v3', time: '5 min ago', read: false },
        { id: 'n2', title: 'New Workspace Created', detail: 'Mia created Q1 Marketing Launch workspace', time: '19 min ago', read: false },
        { id: 'n3', title: 'Copilot Weekly Insights', detail: 'Engagement increased by 12% this week', time: '1 hour ago', read: true }
    ]);
    const [copilotHistory, setCopilotHistory] = useState<{ role: 'user' | 'ai', msg: string }[]>([
        { role: 'ai', msg: "Hello! I am Copilot. I'm ready to analyze metrics, audit components, or configure alerts for you." }
    ]);

    const unreadNotifications = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

    // Close menus on outside click via refs
    useEffect(() => {
        if (!showNotifications && !showProfileMenu) return;
        const handleOutsideClick = (e: MouseEvent) => {
            if (showNotifications && notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
                setShowNotifications(false);
            }
            if (showProfileMenu && profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [showNotifications, showProfileMenu]);

    const toggleNotifications = () => {
        setShowProfileMenu(false);
        setShowNotifications(prev => !prev);
    };

    const toggleProfileMenu = () => {
        setShowNotifications(false);
        setShowProfileMenu(prev => !prev);
    };

    const filteredSections = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return sections;
        return sections.filter(section => section.label.toLowerCase().includes(query));
    }, [searchQuery]);

    useEffect(() => {
        if (showCopilot || showProfileMenu || showSearch) {
            document.body.style.overflow = 'hidden';
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
    }, [showCopilot, showProfileMenu, showSearch]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
                event.preventDefault();
                setShowSearch(true);
            }
            if (event.key === 'Escape') {
                setShowNotifications(false);
                setShowProfileMenu(false);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const markNotificationAsRead = (id: string) => {
        setNotifications(prev => prev.map(item => item.id === id ? { ...item, read: true } : item));
    };

    const markAllNotificationsAsRead = () => {
        setNotifications(prev => prev.map(item => ({ ...item, read: true })));
    };

    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';

    const bg = isLight
        ? 'bg-white text-slate-800'
        : isColorful
            ? 'bg-[#050023] text-purple-100'
            : 'bg-gray-900 text-slate-100';
    const sidebarBg = isLight
        ? 'bg-white/40 backdrop-blur-3xl border-r border-white/60 shadow-[4px_0_24px_0_rgba(0,0,0,0.02)]'
        : isColorful
            ? 'bg-[#050023]/80 backdrop-blur-3xl border-r border-fuchsia-500/30 shadow-[4px_0_24px_0_rgba(255,0,204,0.18)]'
            : 'bg-white/[0.02] backdrop-blur-3xl border-r border-white/10 shadow-[4px_0_24px_0_rgba(0,0,0,0.2)]';
    const headerBg = isLight
        ? 'bg-white/40 backdrop-blur-2xl border-b border-white/60'
        : isColorful
            ? 'bg-[#050023]/80 backdrop-blur-2xl border-b border-fuchsia-500/30'
            : 'bg-white/[0.02] backdrop-blur-2xl border-b border-white/10';
    const cardClass = isLight
        ? 'bg-white rounded-3xl border border-slate-200 shadow-[0_12px_34px_rgba(15,23,42,0.08)] p-5 md:p-7'
        : isColorful
            ? 'bg-[#0A0138]/95 rounded-3xl border border-fuchsia-500/35 shadow-[0_14px_36px_rgba(255,0,204,0.20)] p-5 md:p-7'
            : 'bg-[#111827] rounded-3xl border border-slate-700 shadow-[0_12px_34px_rgba(0,0,0,0.45)] p-5 md:p-7';
    const aiGradientStrong = 'from-fuchsia-500 via-violet-500 to-sky-400';
    const aiGradientSoft = 'from-violet-500 to-sky-400';
    const aiGradientGlow = 'from-fuchsia-500 to-sky-400';
    const aiHoverBorder = 'hover:border-violet-300 hover:shadow-violet-500/10';

    const handleCopilotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!copilotMsg.trim()) return;
        setCopilotHistory(prev => [...prev, { role: 'user', msg: copilotMsg }]);
        setCopilotMsg('');
        setTimeout(() => {
            setCopilotHistory(prev => [...prev, { role: 'ai', msg: 'I received your request. Integrating more insights shortly.' }]);
        }, 1000);
    };

    return (
        <div className={`flex min-h-screen w-full ${bg} transition-colors duration-500 relative overflow-hidden font-sans`}>
            {/* Portal Intro Overlay */}
            <AnimatePresence>
                {showIntro && (
                    <PortalIntroOverlay
                        onComplete={(chosenTheme) => {
                            setTheme(chosenTheme as Theme);
                            setShowIntro(false);
                        }}
                        currentTheme={theme}
                    />
                )}
            </AnimatePresence>

            {/* Animated Mesh Gradient Background (Colorful Only) */}
            {isColorful && (
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse bg-fuchsia-500/40" style={{ animationDuration: '15s' }} />
                    <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse bg-purple-500/35" style={{ animationDuration: '20s', animationDelay: '2s' }} />
                    <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse bg-fuchsia-600/30" style={{ animationDuration: '18s', animationDelay: '4s' }} />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex ${sidebarCollapsed ? 'w-[80px]' : 'w-[280px]'} ${sidebarBg} flex-col shrink-0 transition-all duration-500 fixed left-0 top-0 h-screen z-40`}>
                <div className={`flex items-center h-20 px-5 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!sidebarCollapsed && (
                        <div className="flex items-center space-x-2">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${isColorful ? 'from-fuchsia-500 to-purple-600 shadow-fuchsia-500/20' : isLight ? 'from-blue-500 to-indigo-600 shadow-blue-500/20' : 'from-blue-400 to-purple-500 shadow-blue-400/20'} flex items-center justify-center shadow-lg`}>
                                <Icon name="blur_on" className="text-white text-lg" />
                            </div>
                            <span className={`text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${isColorful ? 'from-fuchsia-500 to-purple-500' : 'from-blue-500 to-indigo-500'}`}>Portal</span>
                        </div>
                    )}
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isLight ? 'hover:bg-white/60 text-slate-600' : 'hover:bg-white/10 text-slate-300'}`}>
                        <Icon name={sidebarCollapsed ? "menu" : "menu_open"} className="text-xl" />
                    </button>
                </div>

                <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto no-scrollbar">
                    <div className="pt-2 pb-3 px-3">
                        {!sidebarCollapsed && <span className="text-xs font-bold uppercase tracking-widest opacity-50">Menu</span>}
                    </div>

                    {sections.map(s => {
                        const active = activeSection === s.key;
                        return (
                            <button key={s.key} onClick={() => setActiveSection(s.key)}
                                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 text-[14px] font-medium relative group overflow-hidden ${active
                                    ? (isColorful ? 'text-fuchsia-300 shadow-lg shadow-fuchsia-500/10' : isLight ? 'text-blue-600 shadow-sm' : 'text-blue-300 shadow-lg shadow-blue-500/10')
                                    : (isColorful ? 'text-purple-200 hover:bg-purple-900/40' : isLight ? 'text-slate-600 hover:bg-white/50' : 'text-slate-400 hover:bg-gray-800/70')}`}>
                                {active && (
                                    <motion.div layoutId="activeNav" className={`absolute inset-0 ${isColorful ? 'bg-fuchsia-500/20 border border-fuchsia-500/30' : isLight ? 'bg-white/80 border border-white' : 'bg-blue-500/20 border border-blue-400/20'} rounded-2xl -z-10`} />
                                )}
                                <Icon name={s.icon} className={`text-[22px] ${sidebarCollapsed ? '' : 'mr-3'} ${active ? (isColorful ? 'text-fuchsia-400' : isLight ? 'text-blue-500' : 'text-blue-400') : 'opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all'}`} />
                                {!sidebarCollapsed && <span className="relative z-10">{s.label}</span>}
                            </button>
                        );
                    })}
                </nav>
                <div className={`px-3 py-4 border-t ${isLight ? 'border-slate-200/60' : isColorful ? 'border-fuchsia-500/20' : 'border-white/5'}`}>
                    <a href="../" className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'px-4'} py-3 rounded-2xl transition-all duration-300 text-[13px] font-medium group ${isColorful ? 'text-purple-300 hover:bg-purple-900/40' : isLight ? 'text-slate-500 hover:bg-white/50' : 'text-slate-500 hover:bg-white/5'}`}>
                        <Icon name="arrow_back" className={`text-[20px] ${sidebarCollapsed ? '' : 'mr-3'} opacity-60 group-hover:opacity-100 transition-opacity`} />
                        {!sidebarCollapsed && <span>Back to Case Study</span>}
                    </a>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileSidebarOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed inset-y-0 left-0 z-50 w-[280px] ${sidebarBg} flex flex-col md:hidden`}
                        >
                            <div className="flex items-center justify-between h-20 px-5">
                                <div className="flex items-center space-x-2">
                                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${isColorful ? 'from-fuchsia-500 to-purple-600 shadow-fuchsia-500/20' : isLight ? 'from-blue-500 to-indigo-600 shadow-blue-500/20' : 'from-blue-400 to-purple-500 shadow-blue-400/20'} flex items-center justify-center shadow-lg`}>
                                        <Icon name="blur_on" className="text-white text-lg" />
                                    </div>
                                    <span className={`text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${isColorful ? 'from-fuchsia-500 to-purple-500' : 'from-blue-500 to-indigo-500'}`}>Portal</span>
                                </div>
                                <button onClick={() => setMobileSidebarOpen(false)} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isLight ? 'hover:bg-white/60 text-slate-600' : 'hover:bg-white/10 text-slate-300'}`}>
                                    <Icon name="close" className="text-xl" />
                                </button>
                            </div>
                            <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
                                <div className="pt-2 pb-3 px-3">
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-50">Menu</span>
                                </div>
                                {sections.map(s => {
                                    const active = activeSection === s.key;
                                    return (
                                        <button key={s.key} onClick={() => { setActiveSection(s.key); setMobileSidebarOpen(false); }}
                                            className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-300 text-[14px] font-medium relative group overflow-hidden ${active
                                                ? (isColorful ? 'text-fuchsia-300 shadow-lg shadow-fuchsia-500/10' : isLight ? 'text-blue-600 shadow-sm' : 'text-blue-300 shadow-lg shadow-blue-500/10')
                                                : (isColorful ? 'text-purple-200 hover:bg-purple-900/40' : isLight ? 'text-slate-600 hover:bg-white/50' : 'text-slate-400 hover:bg-gray-800/70')}`}>
                                            {active && (
                                                <motion.div layoutId="activeNavMobile" className={`absolute inset-0 ${isColorful ? 'bg-fuchsia-500/20 border border-fuchsia-500/30' : isLight ? 'bg-white/80 border border-white' : 'bg-blue-500/20 border border-blue-400/20'} rounded-2xl -z-10`} />
                                            )}
                                            <Icon name={s.icon} className={`text-[22px] mr-3 ${active ? (isColorful ? 'text-fuchsia-400' : isLight ? 'text-blue-500' : 'text-blue-400') : 'opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all'}`} />
                                            <span className="relative z-10">{s.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                            <div className={`px-3 py-4 border-t ${isLight ? 'border-slate-200/60' : isColorful ? 'border-fuchsia-500/20' : 'border-white/5'}`}>
                                <a href="../" onClick={() => setMobileSidebarOpen(false)} className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-300 text-[13px] font-medium group ${isColorful ? 'text-purple-300 hover:bg-purple-900/40' : isLight ? 'text-slate-500 hover:bg-white/50' : 'text-slate-500 hover:bg-white/5'}`}>
                                    <Icon name="arrow_back" className="text-[20px] mr-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span>Back to Case Study</span>
                                </a>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col min-h-screen overflow-x-hidden min-w-0 relative z-10 ${sidebarCollapsed ? 'md:ml-[80px]' : 'md:ml-[280px]'}`}>
                {/* Top Bar */}
                <header className={`h-20 flex items-center justify-between px-5 md:px-10 fixed top-0 left-0 right-0 z-30 ${sidebarCollapsed ? 'md:left-[80px]' : 'md:left-[280px]'} ${headerBg}`}>
                    <div className="flex items-center">
                        <button onClick={() => setMobileSidebarOpen(true)} className={`md:hidden mr-4 w-10 h-10 flex items-center justify-center rounded-2xl ${isLight ? 'bg-white/60 hover:bg-white shadow-sm' : isColorful ? 'bg-[#050023]/80 hover:bg-[#050023] border border-fuchsia-500/30' : 'bg-white/5 hover:bg-white/10'} transition-all`}>
                            <Icon name="menu" className="text-xl" />
                        </button>
                        <h1 className="text-xl md:text-2xl font-black capitalize tracking-tight">{activeSection.replace('-', ' ')}</h1>
                    </div>
                    <div className="flex items-center space-x-3 md:space-x-4 shrink-0">
                        <motion.button onClick={() => setShowSearch(true)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`hidden md:flex items-center space-x-3 px-4 py-2.5 rounded-2xl text-sm font-medium ${isLight ? 'bg-white/60 hover:bg-white shadow-sm border border-white' : isColorful ? 'bg-[#050023]/80 hover:bg-[#050023] border border-fuchsia-500/30 text-purple-100' : 'bg-white/5 hover:bg-white/10 border border-white/5'} transition-all cursor-pointer`}>
                            <Icon name="search" className="text-lg opacity-50" />
                            <span className="opacity-50">Search anything... (Ctrl/⌘K)</span>
                        </motion.button>
                        <motion.button onClick={() => setShowSearch(true)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`flex md:hidden items-center justify-center w-10 h-10 rounded-2xl ${isLight ? 'bg-white/60 hover:bg-white shadow-sm' : isColorful ? 'bg-[#050023]/80 hover:bg-[#050023] border border-fuchsia-500/30 text-purple-100' : 'bg-white/5 hover:bg-white/10'} transition-all`}>
                            <Icon name="search" className="text-xl opacity-70" />
                        </motion.button>
                        <div className="relative">
                            <motion.button onClick={toggleNotifications} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`relative w-10 h-10 rounded-2xl flex items-center justify-center ${isLight ? 'bg-white/60 hover:bg-white shadow-sm' : isColorful ? 'bg-[#050023]/80 hover:bg-[#050023] border border-fuchsia-500/30 text-purple-100' : 'bg-white/5 hover:bg-white/10'} transition-all`}>
                                <Icon name="notifications" className="text-xl opacity-70" />
                                {unreadNotifications > 0 && <span className={`absolute top-2 right-2 w-2.5 h-2.5 border-2 border-transparent rounded-full animate-pulse ${isColorful ? 'bg-fuchsia-500' : 'bg-blue-500'}`} />}
                            </motion.button>
                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div ref={notificationsRef} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} className={`absolute right-0 top-full mt-2 w-[22rem] rounded-3xl shadow-2xl overflow-hidden z-50 border backdrop-blur-3xl ${isLight ? 'bg-white/90 border-white shadow-slate-200/50' : isColorful ? 'bg-[#050023]/90 border-fuchsia-500/30 shadow-fuchsia-900/50 text-purple-100' : 'bg-[#1A1A24]/90 border-white/10 shadow-black/50'}`}>
                                        <div className={`p-4 border-b flex items-center justify-between ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
                                            <h3 className="font-bold">Notifications</h3>
                                            <button onClick={markAllNotificationsAsRead} className="text-xs font-bold opacity-70 hover:opacity-100 transition-opacity">Mark all read</button>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                                            {notifications.map(item => (
                                                <button key={item.id} onClick={() => markNotificationAsRead(item.id)} className={`w-full text-left p-3 rounded-2xl transition-all ${item.read ? (isLight ? 'hover:bg-slate-50' : isColorful ? 'hover:bg-purple-900/40' : 'hover:bg-white/5') : (isLight ? 'bg-fuchsia-50 hover:bg-fuchsia-100/70' : isColorful ? 'bg-fuchsia-500/20 hover:bg-fuchsia-500/25' : 'bg-fuchsia-500/10 hover:bg-fuchsia-500/15')}`}>
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="text-sm font-bold">{item.title}</p>
                                                            <p className="text-xs opacity-70 mt-1 leading-relaxed">{item.detail}</p>
                                                        </div>
                                                        {!item.read && <span className="w-2 h-2 rounded-full bg-fuchsia-500 shrink-0 mt-2" />}
                                                    </div>
                                                    <p className="text-[11px] opacity-50 mt-2">{item.time}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="relative translate-y-[2px]">
                            <motion.button onClick={toggleProfileMenu} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`w-10 h-10 rounded-2xl overflow-hidden border-2 transition-all shadow-md ${isLight ? 'border-white hover:border-blue-400' : isColorful ? 'border-fuchsia-500/30 hover:border-fuchsia-400' : 'border-white/10 hover:border-blue-400'}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover" alt="Portal" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Portal&background=d946ef&color=fff" }} />
                            </motion.button>
                            <AnimatePresence>
                                {showProfileMenu && (
                                    <motion.div ref={profileMenuRef} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className={`absolute right-0 mt-3 w-64 rounded-3xl shadow-2xl overflow-hidden z-50 border backdrop-blur-3xl ${isLight ? 'bg-white/90 border-white shadow-slate-200/50' : isColorful ? 'bg-[#050023]/90 border-fuchsia-500/30 shadow-fuchsia-900/50 text-purple-100' : 'bg-[#1A1A24]/90 border-white/10 shadow-black/50'}`}>
                                            <div className={`p-5 border-b ${isLight ? 'border-slate-100' : isColorful ? 'border-fuchsia-500/30' : 'border-white/5'}`}>
                                                <p className="font-bold text-base">Ali Al-Zuhairi</p>
                                                <p className="text-xs font-medium opacity-60 mt-1">admin@alux.space</p>
                                            </div>
                                            <div className="p-3 space-y-1">
                                                <button onClick={() => { setActiveSection('settings'); setShowProfileMenu(false); }} className={`w-full flex items-center px-4 py-3 rounded-2xl text-sm font-medium transition-all ${isLight ? 'hover:bg-slate-50' : isColorful ? 'hover:bg-purple-900/40' : 'hover:bg-white/5'}`}>
                                                    <Icon name="settings" className={`mr-3 text-xl ${isLight ? 'text-slate-400' : isColorful ? 'text-purple-300' : 'text-slate-400'}`} />
                                                    Settings
                                                </button>
                                                <div className={`px-3 py-3 rounded-2xl ${isLight ? 'bg-slate-50' : isColorful ? 'bg-purple-900/30 border border-fuchsia-500/30' : 'bg-white/5'}`}>
                                                    <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2 block">Theme</span>
                                                    <div className={`flex rounded-2xl p-1 ${isLight ? 'bg-white' : isColorful ? 'bg-[#050023]/80' : 'bg-black/20'}`}>
                                                        {([
                                                            { value: 'light', label: 'Light', icon: 'light_mode' },
                                                            { value: 'dark', label: 'Dark', icon: 'dark_mode' },
                                                            { value: 'colorful', label: 'Colorful', icon: 'palette' }
                                                        ] as { value: Theme, label: string, icon: string }[]).map(mode => (
                                                            <button key={mode.value} aria-label={`Switch to ${mode.label} theme`} title={mode.label} onClick={() => { setTheme(mode.value); setShowProfileMenu(false); }} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${theme === mode.value ? (isLight ? 'bg-slate-900 text-white' : isColorful ? 'bg-fuchsia-500/20 text-white border border-fuchsia-500/40' : 'bg-white/10 text-white border border-white/20') : (isLight ? 'text-slate-500 hover:text-slate-900' : isColorful ? 'text-purple-200 hover:text-white' : 'text-slate-300 hover:text-white')}`}>
                                                                <Icon name={mode.icon} className="text-sm" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-5 pt-24 md:p-10 md:pt-24">
                    <AnimatePresence mode="wait">
                        {activeSection === 'start' && <StartSection key="start" card={cardClass} isLight={isLight} setActiveSection={setActiveSection} />}
                        {activeSection === 'dashboard' && <DashboardSection key="dash" card={cardClass} isLight={isLight} isColorful={isColorful} />}
                        {activeSection === 'users' && <UsersSection key="users" card={cardClass} isLight={isLight} />}
                        {activeSection === 'workspaces' && <WorkspacesSection key="ws" card={cardClass} isLight={isLight} />}
                        {activeSection === 'copilot-logs' && <PortalLogsSection key="logs" card={cardClass} isLight={isLight} />}
                        {activeSection === 'alerts-config' && <AlertsConfigSection key="alerts" card={cardClass} isLight={isLight} />}
                        {activeSection === 'analytics' && <AnalyticsSection key="analytics" card={cardClass} isLight={isLight} isColorful={isColorful} />}
                        {activeSection === 'settings' && <SettingsSection key="settings" card={cardClass} isLight={isLight} theme={theme} setTheme={setTheme} />}
                    </AnimatePresence>
                </main>
            </div>

            <AnimatePresence>
                {showSearch && (
                    <div className="fixed inset-0 z-[70] p-4 sm:p-8 flex items-start justify-center">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowSearch(false)} />
                        <motion.div initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} className={`relative mt-10 w-full max-w-2xl rounded-3xl overflow-hidden border backdrop-blur-3xl ${isLight ? 'bg-white/95 border-white shadow-2xl shadow-slate-300/50' : isColorful ? 'bg-[#050023]/95 border-fuchsia-500/30 shadow-2xl shadow-fuchsia-900/50 text-purple-100' : 'bg-[#12121A]/95 border-white/10 shadow-2xl shadow-black/50'}`}>
                            <div className={`px-5 py-4 border-b flex items-center gap-3 ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
                                <Icon name="search" className="text-xl opacity-60" />
                                <input
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search sections..."
                                    className="w-full bg-transparent outline-none text-sm font-medium"
                                />
                                <button onClick={() => setShowSearch(false)} className="text-xs font-bold opacity-60 hover:opacity-100 transition-opacity">ESC</button>
                            </div>
                            <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
                                {filteredSections.length > 0 ? filteredSections.map(section => (
                                    <button
                                        key={section.key}
                                        onClick={() => {
                                            setActiveSection(section.key);
                                            setShowSearch(false);
                                            setSearchQuery('');
                                        }}
                                        className={`w-full text-left p-3 rounded-2xl flex items-center justify-between transition-colors ${isLight ? 'hover:bg-slate-100' : isColorful ? 'hover:bg-purple-900/40' : 'hover:bg-white/10'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon name={section.icon} className="text-lg opacity-70" />
                                            <span className="text-sm font-bold">{section.label}</span>
                                        </div>
                                        <span className="text-[11px] opacity-50">Open</span>
                                    </button>
                                )) : <div className="p-4 text-sm opacity-60">No matching section found.</div>}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Global AI Copilot Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCopilot(true)}
                className="fixed bottom-24 right-6 w-16 h-16 z-50 group overflow-visible"
            >
                <span className={`absolute inset-0 rounded-[1.6rem] opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500 animate-pulse bg-gradient-to-r ${aiGradientGlow}`} />
                <AIStamp isLight={isLight} size="lg" className="relative shadow-2xl" />
            </motion.button>

            {/* Global AI Copilot Slide-over */}
            <AnimatePresence>
                {showCopilot && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm"
                        onClick={() => setShowCopilot(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full sm:max-w-md h-full shadow-2xl flex flex-col relative backdrop-blur-3xl ${isLight ? 'bg-white/80 border-l border-white' : isColorful ? 'bg-[#050023]/90 border-l border-fuchsia-500/30 text-purple-100' : 'bg-[#0B0B13]/80 border-l border-white/10'}`}
                        >
                            <div className={`flex items-center justify-between p-5 md:p-6 border-b relative overflow-hidden z-10 ${isLight ? 'border-slate-200/50' : 'border-white/10'}`}>
                                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${aiGradientStrong}`} />
                                <div className="flex items-center space-x-4">
                                    <AIStamp isLight={isLight} size="md" className="shadow-lg" />
                                    <div>
                                        <h3 className={`font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${aiGradientSoft}`}>Copilot</h3>
                                        <p className="text-xs font-medium opacity-60 flex items-center mt-1"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> Online & Ready</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`} title="History">
                                        <Icon name="history" className="text-xl opacity-60" />
                                    </button>
                                    <button onClick={() => setShowCopilot(false)} className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}>
                                        <Icon name="close" className="text-xl opacity-60" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 z-0 relative no-scrollbar">
                                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/10 blur-[80px] rounded-full pointer-events-none" />

                                {copilotHistory.map((h, i) => (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} key={i} className={`flex flex-col ${h.role === 'user' ? 'items-end' : 'items-start'} relative z-10`}>
                                        <div className={`flex w-full ${h.role === 'user' ? 'items-end justify-end' : 'items-start justify-start'}`}>
                                            {h.role === 'ai' && (
                                                <AIStamp isLight={isLight} size="md" variant="secondary" className="mr-3 mt-1" />
                                            )}
                                            <div className={`flex flex-col ${h.role === 'user' ? 'items-end ml-auto' : 'items-start'}`}>
                                                {h.role === 'ai' && <span className="text-[11px] font-bold opacity-50 mb-1.5 ml-1 tracking-wider uppercase">Portal AI</span>}
                                                <div className={`max-w-[85%] p-4 rounded-3xl text-[14px] font-medium leading-relaxed shadow-sm ${h.role === 'user' ? `bg-gradient-to-r ${aiGradientSoft} text-white rounded-br-sm ${isColorful ? 'shadow-fuchsia-500/20' : 'shadow-blue-500/20'}` : isLight ? 'bg-white border border-slate-100 text-slate-800 rounded-bl-sm shadow-slate-200/50' : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-sm shadow-black/50 backdrop-blur-xl'} relative`}>
                                                    {h.msg}
                                                    {h.role === 'ai' && i === copilotHistory.length - 1 && (
                                                        <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-current/10">
                                                            <button className="flex items-center space-x-1.5 text-xs opacity-60 hover:opacity-100 transition-opacity"><Icon name="content_copy" className="text-[14px]" /> <span>Copy</span></button>
                                                            <button className="flex items-center space-x-1.5 text-xs opacity-60 hover:opacity-100 transition-opacity"><Icon name="ios_share" className="text-[14px]" /> <span>Share</span></button>
                                                            <button className="flex items-center space-x-1.5 text-xs opacity-60 hover:opacity-100 transition-opacity"><Icon name="thumb_up" className="text-[14px]" /></button>
                                                            <button className="flex items-center space-x-1.5 text-xs opacity-60 hover:opacity-100 transition-opacity"><Icon name="thumb_down" className="text-[14px]" /></button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {copilotHistory.length === 1 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pt-6 grid grid-cols-1 gap-3">
                                        {[
                                            { icon: 'analytics', label: 'Analyze weekly engagement', color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
                                            { icon: 'security', label: 'Audit recent admin actions', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
                                            { icon: 'speed', label: 'Optimize query performance', color: 'text-amber-500', bg: 'bg-amber-500/10' }
                                        ].map(opt => (
                                            <button key={opt.label} onClick={() => { setCopilotMsg(opt.label); }} className={`flex items-center space-x-4 p-4 text-left rounded-2xl transition-all duration-300 ${isLight ? `bg-white/60 border border-white ${aiHoverBorder} hover:shadow-lg` : `bg-white/5 border border-white/5 ${isColorful ? 'hover:border-cyan-500/50' : 'hover:border-blue-400/50'} hover:bg-white/10`} text-[14px] font-medium backdrop-blur-xl`}>
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${opt.bg} ${opt.color}`}>
                                                    <Icon name={opt.icon} className="text-xl" />
                                                </div>
                                                <span>{opt.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </div>

                            <div className={`p-5 border-t relative z-10 ${isLight ? 'border-slate-200/50 bg-white/80 backdrop-blur-2xl' : 'border-white/10 bg-[#0B0B13]/80 backdrop-blur-2xl'}`}>
                                <form onSubmit={handleCopilotSubmit} className={`flex items-center space-x-2 px-2 py-2 rounded-3xl border shadow-sm transition-all duration-300 ${isLight ? `bg-white border-slate-200 ${isColorful ? 'focus-within:border-fuchsia-400 focus-within:shadow-fuchsia-500/10' : 'focus-within:border-blue-400 focus-within:shadow-blue-500/10'}` : `bg-white/5 border-white/10 focus-within:bg-white/10 ${isColorful ? 'focus-within:border-cyan-400 focus-within:shadow-cyan-500/10' : 'focus-within:border-blue-400 focus-within:shadow-blue-500/10'}`}`}>
                                    <button type="button" className={`w-10 h-10 flex shrink-0 items-center justify-center rounded-2xl transition-colors ${isLight ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/10 text-slate-400'}`}>
                                        <Icon name="attach_file" className="text-xl" />
                                    </button>
                                    <input
                                        type="text"
                                        value={copilotMsg}
                                        onChange={(e) => setCopilotMsg(e.target.value)}
                                        placeholder="Ask Copilot anything..."
                                        className="flex-1 bg-transparent border-none outline-none text-[14px] font-medium py-2 w-full min-w-0"
                                    />
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" disabled={!copilotMsg.trim()} className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-2xl transition-all ${copilotMsg.trim() ? `bg-gradient-to-r ${aiGradientSoft} text-white shadow-lg shadow-violet-500/30` : isLight ? 'bg-slate-100 text-slate-400' : 'bg-white/10 text-slate-500'}`}>
                                        <Icon name="arrow_upward" className="text-lg font-bold" />
                                    </motion.button>
                                </form>
                                <div className="text-center mt-4 flex justify-center w-full">
                                    <span className="text-[11px] font-medium opacity-40">AI can make mistakes. Check important info.</span>
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
type AIStampSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AIStampVariant = 'primary' | 'secondary';

function AIStamp({ isLight, size = 'md', icon = 'auto_awesome', className = '', variant = 'primary' }: { isLight: boolean, size?: AIStampSize, icon?: string, className?: string, variant?: AIStampVariant }) {
    if (variant === 'secondary') {
        const sec: Record<AIStampSize, { outer: string, icon: string }> = {
            xs: { outer: 'w-7 h-7 rounded-xl',    icon: '!text-[12px]' },
            sm: { outer: 'w-9 h-9 rounded-xl',    icon: '!text-[13px]' },
            md: { outer: 'w-10 h-10 rounded-2xl', icon: '!text-[13px]' },
            lg: { outer: 'w-12 h-12 rounded-2xl', icon: '!text-[14px]' },
            xl: { outer: 'w-16 h-16 rounded-3xl', icon: '!text-[16px]' },
        };
        const s = sec[size];
        return (
            <div className={`${s.outer} flex items-center justify-center shrink-0 ${isLight ? 'bg-violet-100 text-violet-500' : 'bg-violet-500/15 text-violet-400'} ${className}`}>
                <Icon name={icon} className={s.icon} />
            </div>
        );
    }

    const sizeClasses: Record<AIStampSize, { outer: string, inner: string, icon: string }> = {
        xs: { outer: 'w-7 h-7 rounded-xl p-[2px]', inner: 'rounded-[calc(0.75rem-2px)]', icon: 'text-[14px]' },
        sm: { outer: 'w-10 h-10 rounded-2xl p-[2px]', inner: 'rounded-[calc(1rem-2px)]', icon: 'text-lg' },
        md: { outer: 'w-12 h-12 rounded-2xl p-[2px]', inner: 'rounded-[calc(1rem-2px)]', icon: 'text-2xl' },
        lg: { outer: 'w-16 h-16 rounded-[1.6rem] p-[2px]', inner: 'rounded-[calc(1.6rem-2px)]', icon: 'text-3xl' },
        xl: { outer: 'w-28 h-28 rounded-[2.5rem] p-[3px]', inner: 'rounded-[calc(2.5rem-3px)]', icon: 'text-5xl' },
    };

    const stamp = sizeClasses[size];

    return (
        <div className={`${stamp.outer} bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-sky-400 ${className}`}>
            <div className={`w-full h-full ${stamp.inner} border ${isLight ? 'border-white/80 bg-[#EAE6F8]/95' : 'border-white/25 bg-[#1C1730]/85'} flex items-center justify-center backdrop-blur-xl`}>
                <Icon name={icon} className={`${stamp.icon} bg-clip-text text-transparent bg-gradient-to-br from-violet-500 to-sky-400`} />
            </div>
        </div>
    );
}

const pageVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }, exit: { opacity: 0, y: -20 } };
const itemVariants = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function KPICard({ icon, label, value, trend, trendUp, isLight, isColorful = false }: { icon: string, label: string, value: string, trend: string, trendUp: boolean, isLight: boolean, isColorful?: boolean }) {
    const [showInsight, setShowInsight] = useState(false);

    return (
        <motion.div variants={itemVariants} whileHover={{ y: -6, scale: 1.02 }} onClick={() => setShowInsight(!showInsight)} className={`${isLight ? 'bg-white border border-slate-200 shadow-[0_10px_28px_rgba(15,23,42,0.08)]' : isColorful ? 'bg-[#0A0138]/95 border border-fuchsia-500/35 shadow-[0_10px_28px_rgba(255,0,204,0.18)]' : 'bg-[#111827] border border-slate-700 shadow-[0_10px_28px_rgba(0,0,0,0.45)]'} rounded-3xl p-6 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${isLight ? 'from-blue-100 to-indigo-100' : isColorful ? 'from-fuchsia-500/25 to-purple-500/25' : 'from-blue-500/20 to-indigo-500/20'}`}>
                    <Icon name={icon} className={`text-2xl ${isLight ? 'text-blue-600' : isColorful ? 'text-fuchsia-400' : 'text-blue-400'}`} />
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1 ${trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    <Icon name={trendUp ? "trending_up" : "trending_down"} className="text-[14px]" />
                    <span>{trend}</span>
                </span>
            </div>
            <span className="text-3xl font-black tracking-tight">{value}</span>
            <span className={`text-sm font-medium mt-1 flex justify-between items-center ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {label}
                <Icon name="info" className="text-[16px] opacity-40 hover:opacity-100 transition-opacity" />
            </span>

            <AnimatePresence>
                {showInsight && (
                    <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: 16 }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
                        <div className={`p-4 rounded-2xl text-xs font-medium flex items-start space-x-3 ${isLight ? 'bg-blue-50 text-blue-700' : isColorful ? 'bg-fuchsia-500/10 text-fuchsia-300' : 'bg-blue-500/10 text-blue-300'}`}>
                            <AIStamp isLight={isLight} size="xs" variant="secondary" className="mt-0.5" />
                            <span className="leading-relaxed">AI predicts this will increase by another 2% in the coming week based on current marketing campaigns.</span>
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
function DashboardSection({ card, isLight, isColorful = false }: { card: string, isLight: boolean, isColorful?: boolean }) {
    const recentActivity = [
        { user: 'Sara K.', action: 'Updated design system tokens', time: '5 min ago', icon: 'palette', color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
        { user: 'James L.', action: 'Added 3 comments to Sprint Review', time: '12 min ago', icon: 'chat', color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
        { user: 'Mia C.', action: 'Completed UX research report', time: '28 min ago', icon: 'description', color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { user: 'Alex R.', action: 'Created Q1 Planning workspace', time: '1h ago', icon: 'add_circle', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { user: 'Lena T.', action: 'Asked Copilot about metrics', time: '2h ago', icon: 'auto_awesome', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    ];

    const activityChartTops = useMemo(() => Array.from({ length: 30 }, (_, i) => 20 + Math.sin(i * 0.5) * 30 + Math.random() * 30), []);
    const heatmapData = useMemo(() => Array.from({ length: 35 }, () => Math.random()), []);

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <KPICard icon="group" label="Total Users" value="1,247" trend="+12.4%" trendUp={true} isLight={isLight} isColorful={isColorful} />
                <KPICard icon="workspaces" label="Active Workspaces" value="38" trend="+8.2%" trendUp={true} isLight={isLight} isColorful={isColorful} />
                <KPICard icon="auto_awesome" label="AI Queries Today" value="2,891" trend="+24.1%" trendUp={true} isLight={isLight} isColorful={isColorful} />
                <KPICard icon="speed" label="Platform Uptime" value="99.97%" trend="+0.02%" trendUp={true} isLight={isLight} isColorful={isColorful} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Activity Chart */}
                <motion.div variants={itemVariants} className={`${card} xl:col-span-2`}>
                    <h3 className="font-bold text-xl mb-6">User Activity (30 Days)</h3>
                    <div className="h-56 flex items-end justify-between gap-1.5 px-2">
                        {activityChartTops.map((h: number, i: number) => (
                            <motion.div key={i} className="relative w-full h-full flex items-end group">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: i * 0.02 }}
                                    whileHover={{ backgroundColor: isLight ? '#d946ef' : '#c026d3' }}
                                    className={`w-full rounded-t-md ${isLight ? 'bg-fuchsia-400/60' : isColorful ? 'bg-fuchsia-500/50' : 'bg-cyan-400/40'} transition-colors cursor-pointer relative z-10`} />
                                {/* Tooltip */}
                                <div className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap pointer-events-none shadow-xl ${isLight ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
                                    {Math.round(h * 15)} Interactions
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs font-medium opacity-50 px-2">
                        <span>Jan 23</span><span>Feb 1</span><span>Feb 8</span><span>Feb 15</span><span>Feb 22</span>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-bold text-xl mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivity.map((a, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 6, backgroundColor: isLight ? 'rgba(255,255,255,0.5)' : isColorful ? 'rgba(147,51,234,0.12)' : 'rgba(255,255,255,0.05)' }}
                                className="flex items-start space-x-4 p-3 -mx-3 rounded-2xl cursor-pointer transition-all duration-300"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.bg} ${a.color}`}>
                                    <Icon name={a.icon} className="text-lg" />
                                </div>
                                <div className="min-w-0 pt-0.5">
                                    <p className="text-[14px] font-medium leading-snug"><span className="font-bold">{a.user}</span> {a.action}</p>
                                    <span className="text-xs font-medium opacity-50 mt-1 block">{a.time}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* AI Usage Donut + Workspace Heatmap */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-bold text-xl mb-6">AI Copilot Usage</h3>
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-10 space-y-8 sm:space-y-0">
                        <motion.div whileHover={{ scale: 1.05 }} className="relative w-40 h-40 flex items-center justify-center shrink-0 cursor-pointer">
                            <svg className="w-full h-full transform -rotate-90 drop-shadow-xl" viewBox="0 0 36 36">
                                <path className={isLight ? "text-slate-100" : "text-white/5"} stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "35, 100" }} transition={{ duration: 1.5, ease: "easeOut" }} strokeLinecap="round" className="text-fuchsia-500 hover:opacity-80 transition-opacity" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "25, 100" }} transition={{ duration: 1.5, ease: "easeOut" }} strokeDashoffset="-35" strokeLinecap="round" className="text-cyan-400 hover:opacity-80 transition-opacity" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "20, 100" }} transition={{ duration: 1.5, ease: "easeOut" }} strokeDashoffset="-60" strokeLinecap="round" className="text-amber-400 hover:opacity-80 transition-opacity" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "20, 100" }} transition={{ duration: 1.5, ease: "easeOut" }} strokeDashoffset="-80" strokeLinecap="round" className="text-rose-400 hover:opacity-80 transition-opacity" stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-2xl font-black">2,891</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">Queries</span>
                            </div>
                        </motion.div>
                        <div className="flex-1 w-full space-y-3">
                            {[{ label: 'Sprint Queries', pct: '35%', color: 'bg-fuchsia-500' }, { label: 'Design Reviews', pct: '25%', color: 'bg-cyan-400' }, { label: 'Analytics', pct: '20%', color: 'bg-amber-400' }, { label: 'General', pct: '20%', color: 'bg-rose-400' }].map(s => (
                                <motion.div key={s.label} whileHover={{ scale: 1.02, x: 4 }} className={`flex justify-between text-sm font-medium items-center p-3 rounded-xl cursor-pointer ${isLight ? 'bg-white/50 hover:bg-white shadow-sm' : isColorful ? 'bg-fuchsia-500/5 hover:bg-fuchsia-500/10' : 'bg-white/[0.03] hover:bg-white/[0.08]'} transition-all`}>
                                    <span className="flex items-center"><span className={`w-3 h-3 rounded-full mr-3 shadow-sm ${s.color}`} />{s.label}</span>
                                    <span className="font-bold">{s.pct}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-bold text-xl mb-6">Workspace Activity Heatmap</h3>
                    <div className="grid grid-cols-7 gap-2">
                        {heatmapData.map((intensity: number, i: number) => {
                            const bg = intensity > 0.7 ? (isLight ? 'bg-fuchsia-500' : isColorful ? 'bg-fuchsia-500' : 'bg-cyan-400') : intensity > 0.4 ? (isLight ? 'bg-fuchsia-400/60' : isColorful ? 'bg-fuchsia-500/60' : 'bg-cyan-400/60') : intensity > 0.1 ? (isLight ? 'bg-fuchsia-300/30' : isColorful ? 'bg-fuchsia-500/25' : 'bg-cyan-400/20') : (isLight ? 'bg-slate-100' : isColorful ? 'bg-fuchsia-900/30' : 'bg-white/5');
                            return <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.01 }} whileHover={{ scale: 1.2, zIndex: 10 }} className={`aspect-square rounded-lg ${bg} cursor-pointer hover:shadow-lg transition-shadow relative group`}>
                                {/* Tooltip */}
                                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap pointer-events-none shadow-xl ${isLight ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
                                    Score: {Math.round(intensity * 100)}
                                </div>
                            </motion.div>;
                        })}
                    </div>
                    <div className="flex justify-between items-center mt-5 text-xs font-medium opacity-50">
                        <span>Less active</span>
                        <div className="flex space-x-1.5">
                            {[isLight ? 'bg-slate-100' : isColorful ? 'bg-fuchsia-900/30' : 'bg-white/5', isLight ? 'bg-fuchsia-300/30' : isColorful ? 'bg-fuchsia-500/25' : 'bg-cyan-400/20', isLight ? 'bg-fuchsia-400/60' : isColorful ? 'bg-fuchsia-500/60' : 'bg-cyan-400/60', isLight ? 'bg-fuchsia-500' : isColorful ? 'bg-fuchsia-500' : 'bg-cyan-400'].map((c, i) => (
                                <div key={i} className={`w-4 h-4 rounded-md ${c}`} />
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
    const [showWizard, setShowWizard] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Viewer' });

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

    const roleBadge = (r: string) => r === 'Admin' ? 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20' : r === 'Editor' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    const statusDot = (s: string) => s === 'Active' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : s === 'Invited' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-slate-400';

    const handleNext = () => setWizardStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setWizardStep(prev => Math.max(prev - 1, 1));
    const handleClose = () => { setShowWizard(false); setTimeout(() => { setWizardStep(1); setNewUser({ name: '', email: '', role: 'Viewer' }); }, 300); };

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Portal User Management</h2>
                    <p className={`text-sm font-medium mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{users.length} total users</p>
                </div>
                <motion.button onClick={() => setShowWizard(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto justify-center px-5 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center space-x-2 shadow-lg shadow-fuchsia-500/20">
                    <Icon name="person_add" className="text-lg" /><span>Add User</span>
                </motion.button>
            </div>

            <motion.div variants={itemVariants} className={card}>
                <div className="overflow-x-auto -mx-5 md:mx-0 px-5 md:px-0">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className={`text-left text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                                <th className="pb-5">User</th>
                                <th className="pb-5">Role</th>
                                <th className="pb-5">Status</th>
                                <th className="pb-5">Last Active</th>
                                <th className="pb-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {users.map((u, i) => {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const [expanded, setExpanded] = useState(false);
                                return (
                                    <React.Fragment key={i}>
                                        <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                            onClick={() => setExpanded(!expanded)}
                                            className={`${isLight ? 'hover:bg-white/50 divide-slate-100' : 'hover:bg-white/[0.02]'} transition-colors cursor-pointer group`}>
                                            <td className="py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black ${isLight ? 'bg-fuchsia-500/10 text-fuchsia-600 group-hover:bg-fuchsia-500/20' : 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20'} transition-colors`}>
                                                        {u.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-[15px] block">{u.name}</span>
                                                        <span className="text-xs font-medium opacity-60">{u.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4"><span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${roleBadge(u.role)}`}>{u.role}</span></td>
                                            <td className="py-4"><span className="flex items-center text-sm font-medium"><span className={`w-2.5 h-2.5 rounded-full mr-3 ${statusDot(u.status)}`} />{u.status}</span></td>
                                            <td className="py-4 text-sm font-medium opacity-60">{u.lastActive}</td>
                                            <td className="py-4 text-right">
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={`w-9 h-9 rounded-xl inline-flex items-center justify-center ${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'} transition-colors`}>
                                                    <Icon name={expanded ? "expand_less" : "expand_more"} className="text-xl opacity-60" />
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                        <AnimatePresence>
                                            {expanded && (
                                                <tr>
                                                    <td colSpan={5} className="p-0 border-0">
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                            <div className={`m-3 p-5 rounded-2xl flex items-start space-x-5 ${isLight ? 'bg-white/80 shadow-sm border border-white' : 'bg-white/[0.03] border border-white/5'}`}>
                                                                <AIStamp isLight={isLight} size="md" variant="secondary" />
                                                                <div>
                                                                    <h4 className="text-[15px] font-bold mb-1.5">AI Portal Summary</h4>
                                                                    <p className="text-[13px] font-medium opacity-70 leading-relaxed max-w-3xl">{u.name} is highly engaged with design system components. They frequently use the AI Copilot for syntax validation. Consider offering them early access to the new Design Tokens beta feature.</p>
                                                                    <div className="flex space-x-3 mt-4">
                                                                        <button className={`text-xs font-bold px-4 py-2 rounded-xl ${isLight ? 'bg-white border border-slate-200 hover:bg-slate-50' : 'bg-white/5 border border-white/10 hover:bg-white/10'} transition-colors`}>View Full Profile</button>
                                                                        <button className={`text-xs font-bold px-4 py-2 rounded-xl text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all flex items-center`}><Icon name="mail" className="text-[16px] mr-2" /> Message</button>
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

            {/* Add User Wizard Modal */}
            <AnimatePresence>
                {showWizard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className={`relative w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-3xl flex flex-col ${isLight ? 'bg-white/90 border border-white' : 'bg-[#0B0B13]/90 border border-white/10'}`}>
                            {/* Header */}
                            <div className={`px-6 py-5 border-b flex items-center justify-between ${isLight ? 'border-slate-200/50' : 'border-white/10'}`}>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight">Add New User</h3>
                                    <p className="text-xs font-medium opacity-60 mt-1">Step {wizardStep} of 3</p>
                                </div>
                                <button onClick={handleClose} className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}>
                                    <Icon name="close" className="text-xl opacity-60" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {wizardStep === 1 && (
                                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                            <div>
                                                <label className="text-sm font-bold block mb-2">Full Name</label>
                                                <input type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} placeholder="e.g. Jane Doe" className={`w-full px-5 py-3.5 rounded-2xl text-[15px] font-medium outline-none ${isLight ? 'bg-white/50 border border-slate-200 focus:border-fuchsia-400 focus:shadow-[0_0_0_4px_rgba(217,70,239,0.1)]' : 'bg-white/5 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]'} transition-all`} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold block mb-2">Email Address</label>
                                                <input type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} placeholder="jane@company.com" className={`w-full px-5 py-3.5 rounded-2xl text-[15px] font-medium outline-none ${isLight ? 'bg-white/50 border border-slate-200 focus:border-fuchsia-400 focus:shadow-[0_0_0_4px_rgba(217,70,239,0.1)]' : 'bg-white/5 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]'} transition-all`} />
                                            </div>
                                        </motion.div>
                                    )}
                                    {wizardStep === 2 && (
                                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                                            <label className="text-sm font-bold block mb-2">Select Role</label>
                                            {[
                                                { role: 'Admin', desc: 'Full access to all settings and workspaces', icon: 'shield' },
                                                { role: 'Editor', desc: 'Can create and edit workspaces', icon: 'edit' },
                                                { role: 'Viewer', desc: 'Read-only access to assigned workspaces', icon: 'visibility' }
                                            ].map(r => (
                                                <div key={r.role} onClick={() => setNewUser({...newUser, role: r.role})} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${newUser.role === r.role ? (isLight ? 'border-fuchsia-500 bg-fuchsia-50' : 'border-cyan-400 bg-cyan-500/10') : (isLight ? 'border-slate-200 hover:border-fuchsia-300' : 'border-white/10 hover:border-cyan-500/50')}`}>
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${newUser.role === r.role ? (isLight ? 'bg-fuchsia-500 text-white' : 'bg-cyan-400 text-[#0B0B13]') : (isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/10 text-slate-400')}`}>
                                                        <Icon name={r.icon} className="text-xl" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-[15px]">{r.role}</h4>
                                                        <p className="text-xs font-medium opacity-60 mt-0.5">{r.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                    {wizardStep === 3 && (
                                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center py-4">
                                            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 p-[2px] shadow-xl">
                                                <div className={`w-full h-full rounded-3xl flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#0B0B13]'}`}>
                                                    <Icon name="mail" className="text-3xl bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black mb-2">Ready to Invite?</h3>
                                                <p className="text-[14px] font-medium opacity-70 leading-relaxed">An invitation email will be sent to <strong className={isLight ? 'text-fuchsia-600' : 'text-cyan-400'}>{newUser.email || 'the user'}</strong> to join the portal as a <strong>{newUser.role}</strong>.</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className={`px-6 py-5 border-t flex items-center justify-between ${isLight ? 'border-slate-200/50 bg-slate-50/50' : 'border-white/10 bg-black/20'}`}>
                                <button onClick={wizardStep === 1 ? handleClose : handleBack} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-300'}`}>
                                    {wizardStep === 1 ? 'Cancel' : 'Back'}
                                </button>
                                <button onClick={wizardStep === 3 ? handleClose : handleNext} disabled={wizardStep === 1 && (!newUser.name || !newUser.email)} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${wizardStep === 1 && (!newUser.name || !newUser.email) ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white' : 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white hover:shadow-fuchsia-500/30 hover:scale-105'}`}>
                                    {wizardStep === 3 ? 'Send Invitation' : 'Continue'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// WORKSPACES
// ═══════════════════════════════════════════════════════════
function WorkspacesSection({ card, isLight }: { card: string, isLight: boolean }) {
    const [showWizard, setShowWizard] = useState(false);
    const [wizardStep, setWizardStep] = useState(1);
    const [newWorkspace, setNewWorkspace] = useState({ name: '', desc: '', template: 'Blank' });

    const workspaces = [
        { name: 'Design System v3', members: 8, docs: 24, queries: 156, status: 'Active' },
        { name: 'UX Research Q4', members: 5, docs: 12, queries: 89, status: 'Active' },
        { name: 'Marketing Launch', members: 12, docs: 36, queries: 234, status: 'Active' },
        { name: 'Product Roadmap', members: 6, docs: 8, queries: 45, status: 'Review' },
        { name: 'QA Testing Sprint', members: 4, docs: 15, queries: 67, status: 'Paused' },
        { name: 'Q1 Planning 2026', members: 6, docs: 3, queries: 12, status: 'Active' },
    ];

    const handleNext = () => setWizardStep(prev => Math.min(prev + 1, 3));
    const handleBack = () => setWizardStep(prev => Math.max(prev - 1, 1));
    const handleClose = () => { setShowWizard(false); setTimeout(() => { setWizardStep(1); setNewWorkspace({ name: '', desc: '', template: 'Blank' }); }, 300); };

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-black tracking-tight">Portal Administration</h2>
                <motion.button onClick={() => setShowWizard(true)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto justify-center px-5 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white rounded-2xl text-sm font-bold transition-all flex items-center space-x-2 shadow-lg shadow-fuchsia-500/20">
                    <Icon name="add" className="text-lg" /><span>New Workspace</span>
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {workspaces.map((ws, i) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const [showDetails, setShowDetails] = useState(false);
                    return (
                        <motion.div key={i} variants={itemVariants} whileHover={{ y: -6, scale: 1.02 }} onClick={() => setShowDetails(!showDetails)} className={`${card} cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-fuchsia-500/5`}>
                            <div className="flex justify-between items-start mb-5">
                                <h3 className="font-bold text-lg">{ws.name}</h3>
                                <span className={`text-xs font-bold px-3 py-1 rounded-xl ${ws.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : ws.status === 'Review' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'}`}>{ws.status}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center mb-2">
                                {[{ v: ws.members, l: 'Members' }, { v: ws.docs, l: 'Docs' }, { v: ws.queries, l: 'AI Queries' }].map(s => (
                                    <div key={s.l} className={`p-3 rounded-2xl ${isLight ? 'bg-white/50 border border-white' : 'bg-white/[0.03] border border-white/5'}`}>
                                        <span className="text-xl font-black block">{s.v}</span>
                                        <span className="text-[11px] font-bold uppercase tracking-wider opacity-50 mt-1 block">{s.l}</span>
                                    </div>
                                ))}
                            </div>
                            <AnimatePresence>
                                {showDetails && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-5 pt-5 border-t border-white/10">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <Icon name="insights" className={`text-lg ${isLight ? 'text-fuchsia-600' : 'text-cyan-400'}`} />
                                            <span className="text-sm font-bold">Workspace Health: Excellent</span>
                                        </div>
                                        <p className="text-[13px] font-medium opacity-70 mb-4 leading-relaxed">Participation is up 12% this week. Most activity is centered around the new requirements document.</p>
                                        <button className={`w-full py-2.5 rounded-xl text-sm font-bold ${isLight ? 'bg-white hover:bg-slate-50 shadow-sm border border-slate-100' : 'bg-white/5 hover:bg-white/10 border border-white/5'} transition-colors`}>View Dashboard</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>

            {/* New Workspace Wizard Modal */}
            <AnimatePresence>
                {showWizard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleClose} />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className={`relative w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-3xl flex flex-col ${isLight ? 'bg-white/90 border border-white' : 'bg-[#0B0B13]/90 border border-white/10'}`}>
                            {/* Header */}
                            <div className={`px-6 py-5 border-b flex items-center justify-between ${isLight ? 'border-slate-200/50' : 'border-white/10'}`}>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight">Create Workspace</h3>
                                    <p className="text-xs font-medium opacity-60 mt-1">Step {wizardStep} of 3</p>
                                </div>
                                <button onClick={handleClose} className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}>
                                    <Icon name="close" className="text-xl opacity-60" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {wizardStep === 1 && (
                                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                            <div>
                                                <label className="text-sm font-bold block mb-2">Workspace Name</label>
                                                <input type="text" value={newWorkspace.name} onChange={e => setNewWorkspace({...newWorkspace, name: e.target.value})} placeholder="e.g. Q1 Marketing Launch" className={`w-full px-5 py-3.5 rounded-2xl text-[15px] font-medium outline-none ${isLight ? 'bg-white/50 border border-slate-200 focus:border-fuchsia-400 focus:shadow-[0_0_0_4px_rgba(217,70,239,0.1)]' : 'bg-white/5 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]'} transition-all`} />
                                            </div>
                                            <div>
                                                <label className="text-sm font-bold block mb-2">Description (Optional)</label>
                                                <textarea value={newWorkspace.desc} onChange={e => setNewWorkspace({...newWorkspace, desc: e.target.value})} placeholder="What is this workspace for?" rows={3} className={`w-full px-5 py-3.5 rounded-2xl text-[15px] font-medium outline-none resize-none ${isLight ? 'bg-white/50 border border-slate-200 focus:border-fuchsia-400 focus:shadow-[0_0_0_4px_rgba(217,70,239,0.1)]' : 'bg-white/5 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]'} transition-all`} />
                                            </div>
                                        </motion.div>
                                    )}
                                    {wizardStep === 2 && (
                                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                                            <label className="text-sm font-bold block mb-2">Choose a Template</label>
                                            {[
                                                { name: 'Blank', desc: 'Start from scratch', icon: 'check_box_outline_blank' },
                                                { name: 'Design System', desc: 'Pre-configured for UI/UX teams', icon: 'palette' },
                                                { name: 'Sprint Planning', desc: 'Agile boards and task tracking', icon: 'view_kanban' }
                                            ].map(t => (
                                                <div key={t.name} onClick={() => setNewWorkspace({...newWorkspace, template: t.name})} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${newWorkspace.template === t.name ? (isLight ? 'border-fuchsia-500 bg-fuchsia-50' : 'border-cyan-400 bg-cyan-500/10') : (isLight ? 'border-slate-200 hover:border-fuchsia-300' : 'border-white/10 hover:border-cyan-500/50')}`}>
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${newWorkspace.template === t.name ? (isLight ? 'bg-fuchsia-500 text-white' : 'bg-cyan-400 text-[#0B0B13]') : (isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/10 text-slate-400')}`}>
                                                        <Icon name={t.icon} className="text-xl" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-[15px]">{t.name}</h4>
                                                        <p className="text-xs font-medium opacity-60 mt-0.5">{t.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                    {wizardStep === 3 && (
                                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center py-4">
                                            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 p-[2px] shadow-xl">
                                                <div className={`w-full h-full rounded-3xl flex items-center justify-center ${isLight ? 'bg-white' : 'bg-[#0B0B13]'}`}>
                                                    <Icon name="rocket_launch" className="text-3xl bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 to-cyan-500" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black mb-2">Ready for Liftoff!</h3>
                                                <p className="text-[14px] font-medium opacity-70 leading-relaxed">Your new workspace <strong className={isLight ? 'text-fuchsia-600' : 'text-cyan-400'}>{newWorkspace.name || 'Untitled'}</strong> will be created using the <strong>{newWorkspace.template}</strong> template.</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className={`px-6 py-5 border-t flex items-center justify-between ${isLight ? 'border-slate-200/50 bg-slate-50/50' : 'border-white/10 bg-black/20'}`}>
                                <button onClick={wizardStep === 1 ? handleClose : handleBack} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-300'}`}>
                                    {wizardStep === 1 ? 'Cancel' : 'Back'}
                                </button>
                                <button onClick={wizardStep === 3 ? handleClose : handleNext} disabled={wizardStep === 1 && !newWorkspace.name} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${wizardStep === 1 && !newWorkspace.name ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white' : 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white hover:shadow-fuchsia-500/30 hover:scale-105'}`}>
                                    {wizardStep === 3 ? 'Create Workspace' : 'Continue'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
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
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
            <h2 className="text-2xl font-black tracking-tight">Portal AI Conversation Logs</h2>

            <div className="space-y-4">
                {logs.map((log) => (
                    <motion.div key={log.id} variants={itemVariants} onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                        className={`${card} cursor-pointer hover:scale-[1.01] transition-transform duration-300`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black ${isLight ? 'bg-fuchsia-500/10 text-fuchsia-600' : 'bg-cyan-500/10 text-cyan-400'}`}>
                                    {log.user.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <span className="font-bold text-[15px]">{log.user}</span>
                                    <span className="text-xs font-medium opacity-50 ml-3">{log.time}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${log.confidence >= 90 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{log.confidence}% conf.</span>
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl ${isLight ? 'bg-white/80 border border-slate-100' : 'bg-white/5 border border-white/5'}`}>{log.citations} sources</span>
                            </div>
                        </div>
                        <p className={`mt-4 text-[15px] font-bold ${isLight ? 'text-fuchsia-600' : 'text-cyan-400'}`}>&ldquo;{log.query}&rdquo;</p>
                        <AnimatePresence>
                            {expanded === log.id && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                    <p className={`mt-4 pt-4 text-[14px] font-medium leading-relaxed border-t ${isLight ? 'text-slate-600 border-slate-200/50' : 'text-slate-300 border-white/10'}`}>{log.response}</p>
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

    const priorityColor = (p: string) => p === 'Critical' ? 'text-rose-500 bg-rose-500/10' : p === 'Warning' ? 'text-amber-500 bg-amber-500/10' : 'text-cyan-500 bg-cyan-500/10';

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
            <h2 className="text-2xl font-black tracking-tight">Alert Configuration</h2>

            <div className="space-y-4">
                {rules.map((r) => (
                    <motion.div key={r.id} variants={itemVariants} className={card}>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-2">
                                    <h3 className="font-bold text-lg">{r.name}</h3>
                                    <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-xl ${priorityColor(r.priority)}`}>{r.priority}</span>
                                </div>
                                <p className="text-[14px] font-medium opacity-60 mb-3">{r.desc}</p>
                                <div className="flex items-center space-x-6 text-xs font-bold opacity-70">
                                    <span className="flex items-center"><Icon name="bolt" className="text-[16px] mr-1.5" />{r.trigger}</span>
                                    <span className="flex items-center"><Icon name="send" className="text-[16px] mr-1.5" />{r.channel}</span>
                                </div>
                            </div>
                            <button onClick={() => setToggles(prev => ({ ...prev, [r.id]: !prev[r.id] }))}
                                className={`w-14 h-8 rounded-full transition-colors relative ${toggles[r.id] ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500' : (isLight ? 'bg-slate-200' : 'bg-white/10')}`}>
                                <motion.div animate={{ x: toggles[r.id] ? 26 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md" />
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
function AnalyticsSection({ card, isLight, isColorful = false }: { card: string, isLight: boolean, isColorful?: boolean }) {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-black tracking-tight">Usage Analytics</h2>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full sm:w-auto justify-center px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center space-x-2 ${isLight ? 'bg-white hover:bg-slate-50 shadow-sm border border-slate-100' : 'bg-white/5 hover:bg-white/10 border border-white/5'}`}>
                    <Icon name="download" className="text-lg" /><span>Export Data</span>
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <KPICard icon="visibility" label="Page Views" value="48.2K" trend="+18%" trendUp={true} isLight={isLight} isColorful={isColorful} />
                <KPICard icon="schedule" label="Avg. Session" value="12m 34s" trend="+8%" trendUp={true} isLight={isLight} isColorful={isColorful} />
                <KPICard icon="thumb_up" label="Satisfaction" value="4.7/5" trend="+0.3" trendUp={true} isLight={isLight} isColorful={isColorful} />
                <KPICard icon="bolt" label="Avg. Response" value="1.2s" trend="-15%" trendUp={true} isLight={isLight} isColorful={isColorful} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-bold text-xl mb-6">Engagement by Feature</h3>
                    <div className="space-y-5">
                        {[
                            { feature: 'AI Copilot', usage: 82 },
                            { feature: 'Workspaces', usage: 74 },
                            { feature: 'Document Editor', usage: 68 },
                            { feature: 'Notifications', usage: 56 },
                            { feature: 'Analytics', usage: 42 },
                        ].map((f, i) => (
                            <div key={f.feature}>
                                <div className="flex justify-between text-[14px] font-bold mb-2">
                                    <span>{f.feature}</span>
                                    <span className="text-fuchsia-500">{f.usage}%</span>
                                </div>
                                <div className={`h-3 rounded-full overflow-hidden ${isLight ? 'bg-slate-100' : isColorful ? 'bg-fuchsia-900/40' : 'bg-white/5'}`}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${f.usage}%` }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                        className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-bold text-xl mb-6">Weekly Active Users</h3>
                    <div className="h-56 flex items-end justify-between gap-4 px-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                            const h = [65, 78, 82, 90, 85, 40, 35][i];
                            return (
                                <div key={day} className="flex-1 flex flex-col items-center group relative">
                                    <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                                        whileHover={{ backgroundColor: isLight ? '#d946ef' : '#c026d3' }}
                                        className={`w-full max-w-[40px] rounded-t-xl ${isLight ? 'bg-fuchsia-400/60' : isColorful ? 'bg-fuchsia-500/50' : 'bg-cyan-400/40'} transition-colors cursor-pointer relative z-10`} />
                                    <span className="text-xs font-bold mt-3 opacity-50">{day}</span>

                                    {/* Tooltip */}
                                    <div className={`absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap pointer-events-none shadow-xl ${isLight ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}`}>
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
function StartSection({ card, isLight, setActiveSection }: { card: string, isLight: boolean, setActiveSection: (s: Section) => void }) {
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
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="max-w-5xl mx-auto space-y-10 pb-12">
            {/* Hero Greeting Section */}
            <motion.div variants={itemVariants} className="text-center mb-12 pt-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="inline-flex items-center justify-center w-28 h-28 mb-8 relative group cursor-pointer"
                >
                    {/* Glowing AI Orb */}
                    <span className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-fuchsia-500 to-sky-400 opacity-40 blur-2xl group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
                    <AIStamp isLight={isLight} size="xl" className="relative shadow-2xl" />
                </motion.div>

                <h1 className={`text-5xl md:text-6xl font-black tracking-tight mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {greeting()}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-400">Ali</span>
                </h1>
                <p className={`text-lg font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Today is {currentTime ? currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'loading...'}
                </p>
            </motion.div>

            {/* AI Daily Summary Block */}
            <motion.div variants={itemVariants} className={`${card} relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-80 h-80 bg-fuchsia-500 opacity-10 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none`} />

                <div className="flex items-start md:items-center space-x-5 mb-6 relative z-10">
                    <AIStamp isLight={isLight} size="md" variant="secondary" />
                    <div>
                        <h2 className="text-xl font-black tracking-tight">Your Daily Briefing</h2>
                        <p className={`text-sm font-medium mt-1 ${isLight ? 'text-slate-500' : 'opacity-60'}`}>AI-generated summary of your workspace</p>
                    </div>
                </div>

                <div className={`space-y-4 text-[15px] font-medium leading-relaxed relative z-10 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <p>Good morning! You have <strong className={isLight ? 'text-fuchsia-600' : 'text-fuchsia-400'}>3 overdue sprint reviews</strong> waiting for your approval. In the <span className="underline decoration-fuchsia-500/50 underline-offset-4 cursor-pointer hover:text-fuchsia-500 transition-colors">Design System v3</span> workspace, 5 new comments were left regarding the new elevation tokens.</p>
                    <p>Also, I noticed a <strong>12% drop in workflow completion</strong> yesterday. Would you like me to analyze the bottleneck?</p>
                </div>
            </motion.div>

            {/* Quick AI Starters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: 'workspaces', title: 'Review Sprints', desc: '3 tasks need your sign-off', color: 'from-emerald-400 to-emerald-600', hue: 'emerald', nav: 'workspaces' as Section },
                    { icon: 'smart_toy', title: 'Catch up', desc: '5 unread comments', color: 'from-fuchsia-400 to-fuchsia-600', hue: 'fuchsia', nav: 'copilot-logs' as Section },
                    { icon: 'analytics', title: 'Analyze Drop', desc: 'Investigate 12% drop', color: 'from-cyan-400 to-cyan-600', hue: 'cyan', nav: 'analytics' as Section },
                ].map((action, i) => (
                    <motion.div key={i} variants={itemVariants} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSection(action.nav)}
                        className={`group flex items-center gap-4 px-4 py-3 ${card} cursor-pointer relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-${action.hue}-500/10`}>
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-15 blur-3xl transition-opacity duration-500 rounded-full -mr-6 -mt-6 pointer-events-none`} />

                        <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${action.color} shadow-md`}>
                            <Icon name={action.icon} className="text-[18px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[14px] leading-tight">{action.title}</h3>
                            <p className={`text-xs font-medium truncate ${isLight ? 'text-slate-500' : 'opacity-60'}`}>{action.desc}</p>
                        </div>
                        <Icon name="arrow_forward" className={`text-sm shrink-0 opacity-0 group-hover:opacity-60 transition-opacity`} />
                    </motion.div>
                ))}
            </div>

            {/* Floating Input */}
            <motion.div variants={itemVariants} className="pt-6">
                <div className={`relative flex items-center p-2 rounded-3xl shadow-lg transition-all duration-300 border backdrop-blur-2xl ${isLight ? 'bg-white/80 shadow-slate-200/50 border-white focus-within:border-fuchsia-400 focus-within:shadow-fuchsia-500/20' : 'bg-white/5 border-white/10 focus-within:border-cyan-400 focus-within:shadow-cyan-500/20'}`}>
                    <div className="pl-3 pr-2">
                        <AIStamp isLight={isLight} size="sm" variant="secondary" />
                    </div>
                    <input
                        type="text"
                        placeholder="Ask AI to find a file, summarize a workspace, or draft an email&hellip;"
                        className={`w-full bg-transparent py-3 outline-none text-[15px] font-medium ${isLight ? 'text-slate-900 placeholder-slate-400' : 'text-white placeholder-white/40'}`}
                    />
                    <button className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-violet-500 to-sky-400 text-white flex items-center justify-center hover:shadow-lg hover:shadow-violet-500/30 transition-all shrink-0 ml-2">
                        <Icon name="arrow_upward" className="text-xl" />
                    </button>
                </div>
                <div className="text-center mt-4">
                    <span className="text-xs font-medium opacity-50">AI can make mistakes. Check important info.</span>
                </div>
            </motion.div>

        </motion.div>
    );
}
// SETTINGS
// ═══════════════════════════════════════════════════════════
function SettingsSection({ card, isLight, theme, setTheme }: { card: string, isLight: boolean, theme: Theme, setTheme: (val: Theme) => void }) {
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
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8 max-w-4xl">
            <h2 className="text-2xl font-black tracking-tight">Portal Settings</h2>

            {settingGroups.map((group) => (
                <motion.div key={group.title} variants={itemVariants} className={card}>
                    <h3 className="font-bold text-lg mb-6">{group.title}</h3>
                    <div className={`space-y-0 divide-y ${isLight ? 'divide-slate-100' : 'divide-white/10'}`}>
                        {group.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
                                {item.custom && item.id === 'theme-toggle' ? (
                                    <>
                                        <div>
                                            <span className="font-bold text-[15px] block">Theme Preference</span>
                                            <span className="text-[13px] font-medium opacity-60 mt-1 block">Choose between light, dark, and colorful mode</span>
                                        </div>
                                        <div className={`flex rounded-2xl p-1.5 ${isLight ? 'bg-slate-100' : 'bg-white/10'}`}>
                                            <button aria-label="Switch to light theme" title="Light" onClick={() => setTheme('light')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${theme === 'light' ? (isLight ? 'bg-white shadow-sm text-slate-900' : 'bg-white/20 text-white') : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')}`}>
                                                <Icon name="light_mode" className="text-lg" />
                                            </button>
                                            <button aria-label="Switch to dark theme" title="Dark" onClick={() => setTheme('dark')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${theme === 'dark' ? 'bg-[#1A1A24] shadow-sm text-white' : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')}`}>
                                                <Icon name="dark_mode" className="text-lg" />
                                            </button>
                                            <button aria-label="Switch to colorful theme" title="Colorful" onClick={() => setTheme('colorful')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${theme === 'colorful' ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-sm' : (isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')}`}>
                                                <Icon name="palette" className="text-lg" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <span className="font-bold text-[15px] block">{item.name}</span>
                                            <span className="text-[13px] font-medium opacity-60 mt-1 block">{item.desc}</span>
                                        </div>
                                        <button onClick={() => setToggles(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                            className={`w-14 h-8 rounded-full transition-colors relative shrink-0 ml-6 ${toggles[item.id] ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500' : (isLight ? 'bg-slate-200' : 'bg-white/10')}`}>
                                            <motion.div animate={{ x: toggles[item.id] ? 26 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-md" />
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}

            <motion.div variants={itemVariants} className={card}>
                <h3 className="font-bold text-lg mb-6">Platform</h3>
                <div className="space-y-5">
                    <div>
                        <label className="text-sm font-bold block mb-2">Platform Name</label>
                        <input type="text" defaultValue="Workflow Platform" className={`w-full px-5 py-3 rounded-2xl text-[15px] font-medium outline-none ${isLight ? 'bg-white/50 border border-slate-200 focus:border-fuchsia-400 focus:shadow-[0_0_0_4px_rgba(217,70,239,0.1)]' : 'bg-white/5 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]'} transition-all`} />
                    </div>
                    <div>
                        <label className="text-sm font-bold block mb-2">Support Email</label>
                        <input type="email" defaultValue="admin@collabplatform.com" className={`w-full px-5 py-3 rounded-2xl text-[15px] font-medium outline-none ${isLight ? 'bg-white/50 border border-slate-200 focus:border-fuchsia-400 focus:shadow-[0_0_0_4px_rgba(217,70,239,0.1)]' : 'bg-white/5 border border-white/10 focus:border-cyan-400 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.1)]'} transition-all`} />
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-8 py-3.5 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-fuchsia-500/20 mt-4">Save Platform Configuration</motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// PORTAL INTRO OVERLAY
// ═══════════════════════════════════════════════════════════
const PORTAL_STEPS = [
    {
        id: 'welcome',
        icon: 'blur_on',
        title: 'Workflow Portal',
        subtitle: 'Your AI-powered collaboration hub',
        body: 'Manage your entire team, workspaces, and platform health from a single intelligent dashboard — designed for platform admins and power users.',
    },
    {
        id: 'ai',
        icon: 'smart_toy',
        title: 'Meet Your Copilot',
        subtitle: 'AI that watches your platform so you don\'t have to',
        body: 'Ask Copilot anything about your team or platform in plain English.',
    },
    {
        id: 'features',
        icon: 'apps',
        title: 'What\'s Inside',
        subtitle: 'Everything at your fingertips',
        body: 'Eight fully interactive sections to manage and analyse your platform.',
    },
    {
        id: 'theme',
        icon: 'palette',
        title: 'Choose Your Theme',
        subtitle: 'Make it yours',
        body: 'Pick the look that works best for your environment.',
    },
];

const AI_TIPS = [
    { icon: 'query_stats', title: 'Ask about metrics', body: '"Which workspaces are declining in engagement this week?" — get instant, data-backed answers.' },
    { icon: 'group', title: 'Analyse your team', body: '"Who hasn\'t been active in Design System v3?" surfaces team health issues before they become blockers.' },
    { icon: 'notifications_active', title: 'Configure smart alerts', body: '"Notify me when sprint reviews are overdue by more than 24 hours" — set it once, rely on it always.' },
    { icon: 'trending_up', title: 'Forecast & compare', body: '"Compare workspace activity in Q3 vs Q4" for trend analysis and executive reporting.' },
];

const PORTAL_FEATURES = [
    { icon: 'home', label: 'Start', desc: 'Quick-access launchpad with KPIs, recent activity, and AI highlights.' },
    { icon: 'dashboard', label: 'Dashboard', desc: 'Live platform metrics — workspace health, team velocity, and AI-driven insights.' },
    { icon: 'group', label: 'Users', desc: 'Manage members, roles, permissions, and team engagement at scale.' },
    { icon: 'workspaces', label: 'Workspaces', desc: 'Monitor all project workspaces, docs, and collaboration activity.' },
    { icon: 'smart_toy', label: 'Copilot Logs', desc: 'Audit all AI interactions across the platform with full transparency.' },
    { icon: 'notifications_active', label: 'Alerts Config', desc: 'Create and tune intelligent alerts for critical platform events.' },
    { icon: 'analytics', label: 'Analytics', desc: 'Deep-dive reports on productivity, engagement, and usage trends.' },
    { icon: 'settings', label: 'Settings', desc: 'Platform configuration, appearance, integrations, and admin controls.' },
];

const PORTAL_THEMES = [
    { v: 'dark' as Theme, label: 'Dark', icon: 'dark_mode', desc: 'Low-glare, great for long sessions', bg: 'bg-gray-900', border: 'border-blue-500' },
    { v: 'light' as Theme, label: 'Light', icon: 'light_mode', desc: 'Clean and presentation-ready', bg: 'bg-white', border: 'border-amber-400' },
    { v: 'colorful' as Theme, label: 'Colorful', icon: 'palette', desc: 'Vivid cosmic gradient look', bg: 'bg-[#050023]', border: 'border-fuchsia-500' },
];

const portalPageVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 56 : -56 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.32, 0.72, 0, 1] as [number,number,number,number] } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -56 : 56, transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] as [number,number,number,number] } }),
};

interface PortalIntroOverlayProps {
    onComplete: (theme: string) => void;
    currentTheme: Theme;
}

function PortalIntroOverlay({ onComplete, currentTheme }: PortalIntroOverlayProps) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);
    const TOTAL = PORTAL_STEPS.length;
    const isLast = step === TOTAL - 1;

    const overlayBg =
        selectedTheme === 'light'
            ? 'bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900'
            : selectedTheme === 'colorful'
                ? 'bg-[#050023] text-white'
                : 'bg-[#0D0D14] text-white';

    const muted = selectedTheme === 'light' ? 'text-slate-500' : 'text-white/50';

    const cardClass =
        selectedTheme === 'light'
            ? 'bg-white border border-slate-200/80 shadow-sm'
            : selectedTheme === 'colorful'
                ? 'bg-white/[0.06] border border-fuchsia-500/15'
                : 'bg-white/[0.05] border border-white/[0.07]';

    const accentGradient = selectedTheme === 'colorful'
        ? 'from-fuchsia-500 to-purple-600'
        : selectedTheme === 'light'
            ? 'from-blue-500 to-indigo-600'
            : 'from-blue-400 to-indigo-600';

    const accentColor = selectedTheme === 'colorful' ? '#d946ef' : selectedTheme === 'light' ? '#3b82f6' : '#60a5fa';

    const handleNext = () => {
        if (isLast) {
            onComplete(selectedTheme);
        } else {
            setDirection(1);
            setStep((s) => s + 1);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep((s) => Math.max(s - 1, 0));
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className={`fixed inset-0 z-[200] flex flex-col ${overlayBg} transition-colors duration-500 overflow-hidden`}
        >
            {/* Colorful ambient glows */}
            {selectedTheme === 'colorful' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-fuchsia-600/20 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
                    <div className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full bg-purple-600/15 blur-[120px] animate-pulse" style={{ animationDuration: '14s', animationDelay: '4s' }} />
                </div>
            )}

            {/* ── DESKTOP SPLIT LAYOUT ── */}
            <div className="hidden md:flex flex-1 min-h-0">
                {/* Left panel — fixed hero */}
                <div className={`w-[380px] xl:w-[420px] shrink-0 flex flex-col items-center justify-center px-12 py-16 relative ${selectedTheme === 'light' ? 'border-r border-slate-200/60' : selectedTheme === 'colorful' ? 'border-r border-fuchsia-500/20' : 'border-r border-white/[0.06]'}`}>
                    <motion.div
                        key={selectedTheme + '-icon'}
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                        className={`w-24 h-24 rounded-[30px] bg-gradient-to-br ${accentGradient} flex items-center justify-center mb-8 shadow-2xl`}
                        style={{ boxShadow: `0 24px 72px ${accentColor}50` }}
                    >
                        <Icon name="blur_on" className="text-white text-[48px]" />
                    </motion.div>
                    <motion.h1
                        key={selectedTheme + '-name'}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[32px] font-extrabold tracking-tight text-center mb-3"
                    >
                        Workflow Portal
                    </motion.h1>
                    <motion.p
                        key={selectedTheme + '-sub'}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className={`text-[15px] text-center leading-relaxed ${muted}`}
                    >
                        AI-powered team collaboration and platform management — designed for admins who move fast.
                    </motion.p>

                    {/* Step indicators */}
                    <div className="flex gap-2 mt-10">
                        {Array.from({ length: TOTAL }).map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ width: i === step ? '2rem' : '0.5rem', opacity: i <= step ? 1 : 0.3 }}
                                transition={{ duration: 0.3 }}
                                className="h-1.5 rounded-full"
                                style={{ backgroundColor: accentColor }}
                            />
                        ))}
                    </div>

                    {/* Step labels */}
                    <div className="mt-6 space-y-2 w-full">
                        {PORTAL_STEPS.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => { setDirection(i > step ? 1 : -1); setStep(i); }}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${i === step
                                    ? (selectedTheme === 'light' ? 'bg-white shadow-sm border border-slate-200' : selectedTheme === 'colorful' ? 'bg-white/10 border border-fuchsia-500/30' : 'bg-white/10 border border-white/10')
                                    : (selectedTheme === 'light' ? 'text-slate-400 hover:bg-white/60' : 'text-white/40 hover:bg-white/5')
                                }`}
                            >
                                <Icon name={s.icon} className={`text-[18px] ${i === step ? '' : 'opacity-40'}`} style={i === step ? { color: accentColor } as React.CSSProperties : {}} />
                                <span className={i === step ? 'font-bold' : ''}>{s.title}</span>
                                {i < step && <Icon name="check" className="ml-auto text-[16px]" style={{ color: accentColor } as React.CSSProperties} />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right panel — dynamic content */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto px-10 xl:px-16 py-14 no-scrollbar relative">
                        <AnimatePresence custom={direction} mode="wait">
                            {/* ── Step 0: Welcome ── */}
                            {step === 0 && (
                                <motion.div key="portal-step0" custom={direction} variants={portalPageVariants} initial="enter" animate="center" exit="exit" className="max-w-2xl">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                                        <span className={`inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full ${selectedTheme === 'light' ? 'bg-blue-50 text-blue-600' : selectedTheme === 'colorful' ? 'bg-fuchsia-500/15 text-fuchsia-300' : 'bg-blue-500/15 text-blue-300'}`}>
                                            <Icon name="waving_hand" className="text-[14px]" />
                                            Welcome to the Portal
                                        </span>
                                        <h2 className="text-4xl font-extrabold tracking-tight leading-tight mt-3 mb-4">
                                            Your team&apos;s command <br />centre
                                        </h2>
                                        <p className={`text-[16px] leading-relaxed ${muted}`}>
                                            This portal gives you full visibility and control over your platform — from workspace health to individual team performance. Everything is interactive: click, explore, and drill down.
                                        </p>
                                    </motion.div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: 'groups', label: '24 Team Members', sub: 'Across 5 active workspaces' },
                                            { icon: 'bolt', label: '88% Activity Rate', sub: 'Up 12% this quarter' },
                                            { icon: 'smart_toy', label: 'AI-Powered', sub: 'Copilot analyses everything' },
                                            { icon: 'shield', label: 'Admin Access', sub: 'Full platform controls' },
                                        ].map((stat, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 300, damping: 24 }}
                                                className={`p-5 rounded-2xl flex gap-4 items-start ${cardClass}`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accentGradient}`}>
                                                    <Icon name={stat.icon} className="text-white text-[18px]" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[15px]">{stat.label}</div>
                                                    <div className={`text-[12px] mt-0.5 ${muted}`}>{stat.sub}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Step 1: AI Tips ── */}
                            {step === 1 && (
                                <motion.div key="portal-step1" custom={direction} variants={portalPageVariants} initial="enter" animate="center" exit="exit" className="max-w-2xl">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                                        <span className={`inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full ${selectedTheme === 'light' ? 'bg-violet-50 text-violet-600' : 'bg-violet-500/15 text-violet-300'}`}>
                                            <Icon name="auto_awesome" className="text-[14px]" />
                                            AI Copilot
                                        </span>
                                        <h2 className="text-4xl font-extrabold tracking-tight leading-tight mt-3 mb-4">
                                            Ask anything, <br />get answers instantly
                                        </h2>
                                        <p className={`text-[16px] leading-relaxed ${muted}`}>
                                            Click the <strong>✦ sparkle button</strong> in the top-right header to open Copilot at any time. It has full context of your platform data.
                                        </p>
                                    </motion.div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {AI_TIPS.map((tip, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.08 + 0.15, type: 'spring', stiffness: 300, damping: 24 }}
                                                className={`p-5 rounded-2xl flex gap-4 ${cardClass}`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accentGradient}`}>
                                                    <Icon name={tip.icon} className="text-white text-[18px]" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-[14px] mb-1">{tip.title}</h4>
                                                    <p className={`text-[13px] leading-relaxed ${muted}`}>{tip.body}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Step 2: Features ── */}
                            {step === 2 && (
                                <motion.div key="portal-step2" custom={direction} variants={portalPageVariants} initial="enter" animate="center" exit="exit" className="max-w-2xl">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                                        <span className={`inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full ${selectedTheme === 'light' ? 'bg-emerald-50 text-emerald-700' : 'bg-emerald-500/15 text-emerald-300'}`}>
                                            <Icon name="grid_view" className="text-[14px]" />
                                            8 Sections
                                        </span>
                                        <h2 className="text-4xl font-extrabold tracking-tight leading-tight mt-3 mb-4">
                                            Everything you <br />need to run your platform
                                        </h2>
                                    </motion.div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {PORTAL_FEATURES.map((f, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 14 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.06 + 0.12, type: 'spring', stiffness: 340, damping: 26 }}
                                                className={`flex items-center gap-3 p-4 rounded-2xl ${cardClass}`}
                                            >
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accentGradient}`}>
                                                    <Icon name={f.icon} className="text-white text-[16px]" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[13px]">{f.label}</div>
                                                    <div className={`text-[11px] leading-snug mt-0.5 ${muted}`}>{f.desc}</div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* ── Step 3: Theme ── */}
                            {step === 3 && (
                                <motion.div key="portal-step3" custom={direction} variants={portalPageVariants} initial="enter" animate="center" exit="exit" className="max-w-2xl">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                                        <span className={`inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full ${selectedTheme === 'light' ? 'bg-pink-50 text-pink-600' : 'bg-pink-500/15 text-pink-300'}`}>
                                            <Icon name="palette" className="text-[14px]" />
                                            Appearance
                                        </span>
                                        <h2 className="text-4xl font-extrabold tracking-tight leading-tight mt-3 mb-4">
                                            Make it look <br />exactly right
                                        </h2>
                                        <p className={`text-[16px] leading-relaxed ${muted}`}>
                                            Choose your preferred theme. The portal adapts its entire colour system and chrome immediately. You can switch anytime from the profile menu.
                                        </p>
                                    </motion.div>

                                    <div className="space-y-4">
                                        {PORTAL_THEMES.map((t, i) => {
                                            const selected = selectedTheme === t.v;
                                            return (
                                                <motion.button
                                                    key={t.v}
                                                    initial={{ opacity: 0, y: 14 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 + 0.1 }}
                                                    onClick={() => setSelectedTheme(t.v)}
                                                    className={`w-full flex items-center gap-5 p-5 rounded-2xl border-2 transition-all duration-200 text-left ${selected
                                                        ? (selectedTheme === 'light' ? 'border-blue-500 bg-blue-50' : selectedTheme === 'colorful' ? 'border-fuchsia-500 bg-fuchsia-500/10' : 'border-blue-400 bg-blue-500/10')
                                                        : (selectedTheme === 'light' ? 'border-slate-200 bg-white hover:border-slate-300' : selectedTheme === 'colorful' ? 'border-white/10 bg-white/5 hover:border-white/20' : 'border-white/8 bg-white/[0.03] hover:border-white/15')
                                                    }`}
                                                >
                                                    {/* Swatch */}
                                                    <div className={`w-[80px] h-[52px] rounded-xl ${t.bg} shrink-0 flex flex-col justify-between p-2.5 shadow-md overflow-hidden relative`}>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-4 h-4 rounded-md bg-white/20" />
                                                            <div className="flex-1 h-1.5 rounded-full bg-white/15" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="h-1.5 rounded-full bg-white/25 w-full" />
                                                            <div className="h-1.5 rounded-full bg-white/15 w-2/3" />
                                                        </div>
                                                        {t.v === 'colorful' && <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/30 to-purple-600/20 rounded-xl" />}
                                                        {t.v === 'light' && <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl" />}
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Icon name={t.icon} className="text-[18px]" style={selected ? { color: accentColor } as React.CSSProperties : {}} />
                                                            <span className="font-bold text-[16px]">{t.label}</span>
                                                        </div>
                                                        <p className={`text-[13px] ${muted}`}>{t.desc}</p>
                                                    </div>

                                                    <motion.div
                                                        animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
                                                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                                                    >
                                                        <Icon name="check_circle" className="text-[28px]" style={{ color: accentColor } as React.CSSProperties} />
                                                    </motion.div>
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className={`text-center text-[13px] mt-6 ${muted}`}
                                    >
                                        Your selection applies immediately when you click &ldquo;Launch Portal&rdquo;
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop bottom bar */}
                    <div className={`px-10 xl:px-16 py-6 flex items-center justify-between border-t ${selectedTheme === 'light' ? 'border-slate-200/60' : selectedTheme === 'colorful' ? 'border-fuchsia-500/20' : 'border-white/[0.06]'}`}>
                        <div className={`text-sm ${muted}`}>
                            Step {step + 1} of {TOTAL}
                        </div>
                        <div className="flex gap-3">
                            {step > 0 && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={handleBack}
                                    className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${selectedTheme === 'light' ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/15'}`}
                                >
                                    Back
                                </motion.button>
                            )}
                            <motion.button
                                onClick={handleNext}
                                whileTap={{ scale: 0.97 }}
                                className={`px-8 py-3 rounded-2xl font-bold text-sm text-white flex items-center gap-2 bg-gradient-to-r ${accentGradient} shadow-lg transition-all`}
                                style={{ boxShadow: `0 8px 28px ${accentColor}40` }}
                            >
                                {isLast ? (
                                    <>
                                        <Icon name="rocket_launch" className="text-[17px]" />
                                        Launch Portal
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <Icon name="arrow_forward" className="text-[17px]" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MOBILE STACKED LAYOUT ── */}
            <div className="flex md:hidden flex-col flex-1 min-h-0">
                {/* Progress */}
                <div className="flex justify-center gap-2 px-6 pt-14 pb-4">
                    {Array.from({ length: TOTAL }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ width: i === step ? '1.75rem' : '0.5rem' }}
                            transition={{ duration: 0.3 }}
                            className="h-1.5 rounded-full"
                            style={{ backgroundColor: i <= step ? accentColor : (selectedTheme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)') }}
                        />
                    ))}
                </div>

                {/* Mobile content */}
                <div className="flex-1 overflow-hidden relative">
                    <AnimatePresence custom={direction} mode="wait">
                        {step === 0 && (
                            <motion.div key="m-step0" custom={direction} variants={portalPageVariants} initial="enter" animate="center" exit="exit"
                                className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
                                    className={`w-20 h-20 rounded-[26px] bg-gradient-to-br ${accentGradient} flex items-center justify-center mb-7 shadow-2xl`}
                                    style={{ boxShadow: `0 20px 60px ${accentColor}50` }}>
                                    <Icon name="blur_on" className="text-white text-[40px]" />
                                </motion.div>
                                <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="text-[26px] font-extrabold tracking-tight mb-3">Workflow Portal</motion.h1>
                                <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className={`text-[14px] leading-relaxed ${muted}`}>
                                    AI-powered team collaboration and platform management for admins who move fast.
                                </motion.p>
                            </motion.div>
                        )}
                        {step === 1 && (
                            <motion.div key="m-step1" custom={direction} variants={portalPageVariants} initial="enter" animate="center" exit="exit"
                                className="absolute inset-0 overflow-y-auto no-scrollbar px-5 pt-2 pb-4">
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5 mb-1">
                                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center`}><Icon name="auto_awesome" className="text-white text-[16px]" /></div>
                                    <h2 className="text-[20px] font-extrabold tracking-tight">AI Copilot</h2>
                                </motion.div>
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} className={`text-[13px] mb-5 pl-1 ${muted}`}>Get the most from your AI assistant</motion.p>
                                <div className="space-y-3">
                                    {AI_TIPS.map((tip, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.12, type: 'spring', stiffness: 300, damping: 24 }} className={`p-4 rounded-2xl flex gap-4 ${cardClass}`}>
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accentGradient}`}><Icon name={tip.icon} className="text-white text-[18px]" /></div>
                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-[14px] mb-0.5">{tip.title}</h4>
                                                <p className={`text-[12px] leading-relaxed ${muted}`}>{tip.body}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div key="m-step2" custom={direction} variants={portalPageVariants} initial="enter" animate="center" exit="exit"
                                className="absolute inset-0 overflow-y-auto no-scrollbar px-5 pt-2 pb-4">
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5 mb-1">
                                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center`}><Icon name="apps" className="text-white text-[16px]" /></div>
                                    <h2 className="text-[20px] font-extrabold tracking-tight">What&apos;s Inside</h2>
                                </motion.div>
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} className={`text-[13px] mb-5 pl-1 ${muted}`}>8 fully interactive sections</motion.p>
                                <div className="space-y-2.5">
                                    {PORTAL_FEATURES.map((f, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 + 0.1, type: 'spring', stiffness: 340, damping: 26 }} className={`flex items-center gap-4 p-4 rounded-2xl ${cardClass}`}>
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accentGradient}`} style={{ boxShadow: `0 4px 12px ${accentColor}35` }}><Icon name={f.icon} className="text-white text-[16px]" /></div>
                                            <div>
                                                <div className="font-bold text-[14px]">{f.label}</div>
                                                <div className={`text-[12px] ${muted}`}>{f.desc}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {step === 3 && (
                            <motion.div key="m-step3" custom={direction} variants={portalPageVariants} initial="enter" animate="center" exit="exit"
                                className="absolute inset-0 overflow-y-auto no-scrollbar px-5 pt-2 pb-4">
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5 mb-1">
                                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center`}><Icon name="palette" className="text-white text-[16px]" /></div>
                                    <h2 className="text-[20px] font-extrabold tracking-tight">Choose Your Look</h2>
                                </motion.div>
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }} className={`text-[13px] mb-5 pl-1 ${muted}`}>Pick a theme — changeable anytime from the profile menu</motion.p>
                                <div className="space-y-3">
                                    {PORTAL_THEMES.map((t, i) => {
                                        const selected = selectedTheme === t.v;
                                        return (
                                            <motion.button key={t.v} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.1 }} onClick={() => setSelectedTheme(t.v)}
                                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${selected ? '' : (selectedTheme === 'light' ? 'border-gray-100 bg-white' : 'border-white/8 bg-white/[0.05]')}`}
                                                style={selected ? { borderColor: accentColor, backgroundColor: `${accentColor}12` } : {}}>
                                                <div className={`w-12 h-12 rounded-xl ${t.bg} flex flex-col justify-between p-2 shadow shrink-0 overflow-hidden relative`}>
                                                    <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-white/20" /><div className="flex-1 h-1.5 rounded-full bg-white/15" /></div>
                                                    <div className="space-y-1"><div className="h-1.5 rounded-full bg-white/25 w-full" /><div className="h-1.5 rounded-full bg-white/15 w-3/4" /></div>
                                                    {t.v === 'colorful' && <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/30 to-purple-600/20 rounded-xl" />}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <Icon name={t.icon} className="text-[18px]" style={selected ? { color: accentColor } as React.CSSProperties : {}} />
                                                        <span className="font-bold text-[15px]">{t.label}</span>
                                                    </div>
                                                    <p className={`text-[12px] ${muted}`}>{t.desc}</p>
                                                </div>
                                                <motion.div animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                                                    <Icon name="check_circle" className="text-[26px]" style={{ color: accentColor } as React.CSSProperties} />
                                                </motion.div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile bottom nav */}
                <div className="px-5 pb-10 pt-3 flex gap-3">
                    {step > 0 && (
                        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} onClick={handleBack}
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedTheme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-white/10 text-white'}`}>
                            <Icon name="arrow_back" className="text-[20px]" />
                        </motion.button>
                    )}
                    <motion.button layout onClick={handleNext} whileTap={{ scale: 0.97 }}
                        className={`flex-1 h-12 rounded-full flex items-center justify-center gap-2 font-bold text-[15px] text-white bg-gradient-to-r ${accentGradient} shadow-lg`}
                        style={{ boxShadow: `0 8px 28px ${accentColor}45` }}>
                        {isLast ? <><Icon name="rocket_launch" className="text-[18px]" />Launch Portal</> : <>Continue<Icon name="arrow_forward" className="text-[18px]" /></>}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
