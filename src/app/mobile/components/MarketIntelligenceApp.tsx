'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { MobileIntroScreen, type MobileIntroConfig } from './MobileIntroScreen';
import { iosTheme, androidTheme } from '../themes';
import { getTabDirection, getTabTransitionVariants, headerSubVariants, headerTitleVariants } from '../shared';

const MARKET_INTELLIGENCE_INTRO: MobileIntroConfig = {
    appName: 'Market Intelligence',
    tagline: 'Real-time market insights, AI-powered summaries, and personalised alerts — all in your pocket.',
    appIcon: 'candlestick_chart',
    accentGradient: 'from-ds-blue-500 to-ds-indigo-500',
    aiTips: [
        {
            icon: 'chat',
            title: 'Ask anything in plain English',
            body: 'Type "Why did NVDA surge today?" or "Summarise Apple\'s last earnings call" and get a grounded, cited answer in seconds.',
        },
        {
            icon: 'source',
            title: 'Every answer is source-backed',
            body: 'Copilot attaches citations from filings, earnings transcripts, and research so you can verify every insight.',
        },
        {
            icon: 'notifications_active',
            title: 'Set smart AI alerts',
            body: 'Ask Copilot to monitor a ticker or theme — it will proactively surface breaking news and notable price moves just for you.',
        },
    ],
    features: [
        { icon: 'space_dashboard', label: 'Dashboard', desc: 'Live watchlist, AI briefing, and top market movers at a glance.' },
        { icon: 'show_chart', label: 'Markets', desc: 'Deep-dive into stocks, sectors, and macro trends with interactive charts.' },
        { icon: 'auto_awesome', label: 'Copilot', desc: 'Conversational AI for research — ask follow-ups, compare companies, and more.' },
        { icon: 'notifications', label: 'Alerts', desc: 'Customisable real-time alerts for price, volatility, and news events.' },
        { icon: 'person', label: 'My Space', desc: 'Manage your watchlist, app theme, and account preferences.' },
    ],
};

const Icon = ({ name, className = "" }: { name: string, className?: string }) => (
    <span className={`material-symbols ${className}`}>{name}</span>
);

// Sparkline SVG component for mini charts
const Sparkline = ({ data, color, width = 80, height = 32 }: { data: number[], color: string, width?: number, height?: number }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
    return (
        <svg width={width} height={height} className="overflow-visible">
            <defs>
                <linearGradient id={`grad-${color.replace(/[^a-z]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#grad-${color.replace(/[^a-z]/g, '')})`} />
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

// Animated counter that smoothly counts to a target value
function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0, className = '' }: { value: number, prefix?: string, suffix?: string, decimals?: number, className?: string }) {
    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);
    const [display, setDisplay] = useState(`${prefix}${(0).toFixed(decimals)}${suffix}`);
    useEffect(() => {
        const unsub = rounded.on('change', (v) => setDisplay(v));
        const ctrl = animate(motionValue, value, { duration: 1.5, ease: [0.25, 1, 0.5, 1] });
        return () => { unsub(); ctrl.stop(); };
    }, [value, motionValue, rounded]);
    return <span className={className}>{display}</span>;
}

// Live pulse beacon for real-time indicators
function PulseBeacon({ color = 'green', size = 'sm' }: { color?: string, size?: 'sm' | 'md' }) {
    const s = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';
    const ps = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    const colorMap: Record<string, string> = { green: 'bg-ds-success', red: 'bg-ds-error', amber: 'bg-ds-warning', blue: 'bg-ds-blue-500', purple: 'bg-ds-purple-400' };
    return (
        <span className="relative inline-flex items-center justify-center">
            <span className={`absolute ${ps} rounded-full ${colorMap[color] || colorMap.green} animate-ping opacity-30`} />
            <span className={`relative ${s} rounded-full ${colorMap[color] || colorMap.green}`} />
        </span>
    );
}

// Interactive area chart with hover crosshair
function AreaChart({ data, color, width = 300, height = 100, className = '' }: { data: number[], color: string, width?: number, height?: number, className?: string }) {
    const [hoverIdx, setHoverIdx] = useState<number | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => ({ x: (i / (data.length - 1)) * width, y: height - ((v - min) / range) * (height * 0.85) }));
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const areaData = `${pathData} L${width},${height} L0,${height} Z`;

    const handleMouse = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const idx = Math.round((x / width) * (data.length - 1));
        setHoverIdx(Math.max(0, Math.min(data.length - 1, idx)));
    }, [data.length, width]);

    return (
        <svg ref={svgRef} width={width} height={height} className={`overflow-visible ${className}`} onMouseMove={handleMouse} onMouseLeave={() => setHoverIdx(null)}>
            <defs>
                <linearGradient id={`area-${color.replace(/[^a-z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                </linearGradient>
            </defs>
            <path d={areaData} fill={`url(#area-${color.replace(/[^a-z0-9]/g, '')})`} />
            <path d={pathData} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {hoverIdx !== null && points[hoverIdx] && (
                <>
                    <line x1={points[hoverIdx].x} y1={0} x2={points[hoverIdx].x} y2={height} stroke={color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
                    <circle cx={points[hoverIdx].x} cy={points[hoverIdx].y} r="4" fill={color} stroke="white" strokeWidth="2" />
                    <rect x={points[hoverIdx].x - 25} y={Math.max(0, points[hoverIdx].y - 24)} width="50" height="18" rx="6" fill="rgba(0,0,0,0.75)" />
                    <text x={points[hoverIdx].x} y={Math.max(0, points[hoverIdx].y - 24) + 13} fill="white" fontSize="10" fontWeight="600" textAnchor="middle">{data[hoverIdx].toLocaleString()}</text>
                </>
            )}
        </svg>
    );
}

type TabType = 'dashboard' | 'markets' | 'copilot' | 'alerts' | 'profile';
const MI_TAB_ORDER: readonly TabType[] = ['dashboard', 'markets', 'copilot', 'alerts', 'profile'] as const;

export function MarketIntelligenceApp({ os: initialOs }: { os: 'ios' | 'android' }) {
    const os = initialOs;
    const [theme, setTheme] = useState(initialOs === 'ios' ? 'colorful' : 'colorful');
    const [showIntro, setShowIntro] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const prevTabRef = useRef<TabType>('dashboard');
    const directionRef = useRef(1);

    const handleTabChange = useCallback((newTab: TabType) => {
        directionRef.current = getTabDirection(MI_TAB_ORDER, prevTabRef.current, newTab);
        prevTabRef.current = newTab;
        setActiveTab(newTab);
    }, []);

    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';

    const bgClass = isLight
        ? (isIOS ? 'bg-ds-gray-100 text-black' : 'bg-ds-gray-50 text-ds-gray-900')
        : isColorful
            ? 'bg-ds-colorful-bg text-white'
            : (isIOS ? 'bg-black text-white' : 'bg-ds-dark-1 text-ds-gray-200');

    const headerTitles: Record<TabType, { sub: string, title: string }> = {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' },
        markets: { sub: 'Live Data', title: 'Markets' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' },
        alerts: { sub: 'Real-Time', title: 'Alerts' },
        profile: { sub: 'Settings', title: 'My Space' },
    };

    return (
        <div className={`flex flex-col h-full w-full relative ${bgClass} transition-colors duration-500 font-sans`}>
            {/* Ambient Background Effects - all themes */}
            {!showIntro && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {isColorful ? (
                        <>
                            <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
                            <div className={`absolute top-1/3 -right-16 w-48 h-48 ${isColorful ? 'bg-ds-ember/8' : 'bg-blue-600/8'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '8s', animationDelay: '2s' }} />
                            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-fuchsia-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
                            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-indigo-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '6s' }} />
                        </>
                    ) : isLight ? (
                        <>
                            <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-400/[0.04] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                            <div className="absolute bottom-20 -right-16 w-48 h-48 bg-purple-400/[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '3s' }} />
                        </>
                    ) : (
                        <>
                            <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-600/[0.06] rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                            <div className={`absolute bottom-20 -right-16 w-48 h-48 ${isColorful ? 'bg-ds-ember/[0.04]' : 'bg-blue-600/[0.04]'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '10s', animationDelay: '3s' }} />
                        </>
                    )}
                </div>
            )}
            {/* Intro screen overlay */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.2, y: -30 }}
                        transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute inset-0 z-50"
                    >
                        <MobileIntroScreen
                            config={MARKET_INTELLIGENCE_INTRO}
                            theme={os === 'ios' ? iosTheme : androidTheme}
                            onComplete={(chosenTheme) => {
                                setTheme(chosenTheme);
                                setShowIntro(false);
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <header className={`absolute top-0 w-full pt-12 pb-3 px-5 z-40 transition-all duration-300 ${isIOS
                ? (isLight ? 'bg-white/40 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-black/5' : isColorful ? 'bg-ds-card-colorful-from/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-ds-ember/15' : 'bg-ds-dark-3/45 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-white/5')
                : (isLight ? 'bg-ds-gray-50/90 backdrop-blur-2xl border-b border-ds-blue-100/50 shadow-sm' : isColorful ? 'bg-ds-card-colorful-from/80 backdrop-blur-2xl border-b border-ds-ember/20' : 'bg-ds-dark-3/90 backdrop-blur-2xl border-b border-ds-gray-600/50 shadow-md')
                }`}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-3.5">
                        <motion.button onClick={() => handleTabChange('profile')} className="relative group" whileTap={{ scale: 0.92 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                            <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center overflow-hidden border-2 mb-0.5 ${isLight ? 'border-white shadow-sm' : 'border-ds-dark-3 shadow-md'} bg-gradient-to-tr from-gray-50 to-gray-200 dark:from-white/10 dark:to-white/20`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="User" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=User&background=f3f4f6" }} />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[2.5px] ${isLight ? 'border-white bg-ds-success' : 'border-ds-dark-2 bg-ds-success'}`}></div>
                        </motion.button>
                        <div className="flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span key={activeTab + "-sub"} variants={headerSubVariants} initial="initial" animate="animate" exit="exit" className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${isLight ? 'text-black/40' : 'text-white/40'}`}>
                                    {headerTitles[activeTab].sub}
                                </motion.span>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.h1 key={activeTab + "-title"} variants={headerTitleVariants} initial="initial" animate="animate" exit="exit" className={`text-[18px] font-extrabold tracking-tight leading-none ${isLight ? 'text-black' : 'text-white'}`}>
                                    {headerTitles[activeTab].title}
                                </motion.h1>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <motion.button onClick={() => handleTabChange('copilot')} className={`relative w-10 h-10 rounded-full flex justify-center items-center ${isColorful ? 'bg-ds-ember/20 text-ds-ember-light' : isIOS ? (isLight ? 'bg-black/5 text-black' : 'bg-white/10 text-white') : (isLight ? 'bg-ds-blue-100/50 text-ds-blue-900' : 'bg-ds-blue-800/50 text-ds-blue-200')}`} whileTap={{ scale: 0.9 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}>
                            <Icon name="auto_awesome" className="text-[20px]" />
                            <span className="absolute top-[9px] right-[9px] w-[5.5px] h-[5.5px] bg-ds-warning rounded-full animate-pulse shadow-[0_0_8px_rgba(255,149,0,0.8)]" />
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative overflow-hidden w-full z-10" style={{ perspective: '1200px' }}>
                <AnimatePresence mode="wait" custom={directionRef.current}>
                    {activeTab === 'dashboard' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="dash" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><DashboardView os={os} theme={theme} onNavigate={handleTabChange} /></motion.div>; })()}
                    {activeTab === 'markets' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="markets" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><MarketsView os={os} theme={theme} onNavigate={handleTabChange} /></motion.div>; })()}
                    {activeTab === 'copilot' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="copilot" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><CopilotView os={os} theme={theme} /></motion.div>; })()}
                    {activeTab === 'alerts' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="alerts" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><AlertsView os={os} theme={theme} /></motion.div>; })()}
                    {activeTab === 'profile' && (() => { const v = getTabTransitionVariants(directionRef.current); return <motion.div key="profile" variants={v} initial="initial" animate="animate" exit="exit" className="absolute inset-0"><ProfileView os={os} theme={theme} setTheme={setTheme} /></motion.div>; })()}
                </AnimatePresence>
            </main>

            <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} os={os} theme={theme} />
        </div>
    );
}

// Views follow below — exported from same file for colocation

// ═══════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════
function DashboardView({ os, theme, onNavigate }: { os: string, theme: string, onNavigate: (t: TabType) => void }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    const [selectedTimeRange, setSelectedTimeRange] = useState('1D');
    const card = isIOS
        ? (isLight ? 'bg-white/50 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/50 rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : isColorful ? 'bg-ds-card-colorful-from/35 backdrop-blur-[30px] backdrop-saturate-[200%] border border-ds-ember/20 rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]' : 'bg-ds-dark-2/55 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/8 rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-ds-gray-50/90 backdrop-blur-xl rounded-[28px] shadow-sm border border-ds-blue-100/50' : isColorful ? 'bg-ds-card-colorful-from/60 backdrop-blur-xl rounded-[28px] shadow-lg border border-ds-ember/20' : 'bg-ds-dark-3/90 backdrop-blur-xl rounded-[28px] shadow-lg border border-ds-gray-600/40');

    const watchlist = [
        { ticker: 'AAPL', name: 'Apple', price: '$198.11', numPrice: 198.11, change: '+2.4%', up: true, data: [140, 145, 142, 155, 160, 158, 170, 175, 180, 190, 185, 198] },
        { ticker: 'NVDA', name: 'NVIDIA', price: '$878.37', numPrice: 878.37, change: '+5.1%', up: true, data: [500, 520, 540, 580, 620, 700, 750, 800, 820, 860, 850, 878] },
        { ticker: 'TSLA', name: 'Tesla', price: '$175.22', numPrice: 175.22, change: '-3.2%', up: false, data: [220, 210, 200, 195, 190, 185, 180, 175, 178, 172, 170, 175] },
        { ticker: 'MSFT', name: 'Microsoft', price: '$415.60', numPrice: 415.60, change: '+1.8%', up: true, data: [370, 375, 380, 385, 390, 395, 400, 405, 410, 408, 412, 415] },
    ];

    const movers = [
        { ticker: 'SMCI', change: '+18.2%', up: true }, { ticker: 'ARM', change: '+12.4%', up: true },
        { ticker: 'PLTR', change: '+8.7%', up: true }, { ticker: 'RIVN', change: '-7.3%', up: false },
    ];

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } } };
    const fadeUp = { hidden: { opacity: 0, y: 36, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24, mass: 0.85 } } };

    return (
        <motion.div initial="hidden" animate="show" variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[110px] px-4 space-y-5">
            {/* ── Portfolio Value Hero ── */}
            <motion.div variants={fadeUp} className={`relative overflow-hidden p-5 ${card}`}>
                {/* Gradient accent line */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r opacity-70 ${isColorful ? 'from-ds-ember to-ds-ember-dark' : isIOS ? 'from-ds-blue-500 to-ds-indigo-500' : 'from-ds-blue-500 to-ds-blue-300'}`} />
                {/* Shimmer sweep on card */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)' }}
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4, delay: 1 }}
                />
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                        <PulseBeacon color="green" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-ds-success">Markets Open</span>
                    </div>
                    <div className="flex space-x-1">
                        {['1D', '1W', '1M'].map(t => (
                            <button key={t} onClick={() => setSelectedTimeRange(t)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${selectedTimeRange === t ? (isIOS ? 'bg-ds-blue-500 text-white' : isColorful ? 'bg-ds-ember text-white' : 'bg-ds-blue-500 text-white') : (isLight ? 'bg-black/5 text-gray-500' : 'bg-white/8 text-gray-400')}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mt-2">
                    <span className={`text-[11px] block mb-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Total Portfolio Value</span>
                    <div className="flex items-baseline space-x-3">
                        <AnimatedCounter value={47832.94} prefix="$" suffix="" decimals={2} className="text-[28px] font-extrabold tracking-tight" />
                        <span className="flex items-center space-x-1 text-ds-success">
                            <Icon name="trending_up" className="text-[14px]" />
                            <AnimatedCounter value={3.14} prefix="+" suffix="%" decimals={2} className="text-[13px] font-bold" />
                        </span>
                    </div>
                    <span className={`text-[11px] mt-1 block ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                        +$1,452.18 today
                    </span>
                </div>
                {/* Mini portfolio chart */}
                <div className="mt-3 -mx-1">
                    <Sparkline data={[44200, 44800, 45100, 44900, 45500, 46200, 46800, 47100, 46900, 47400, 47600, 47832]} color="#16a34a" width={320} height={48} />
                </div>
            </motion.div>

            {/* ── AI Morning Briefing ── */}
            <motion.div variants={fadeUp} className={`relative overflow-hidden p-5 ${card}`}>
                {/* Gradient side accent */}
                <div className={`absolute top-4 bottom-4 left-0 w-[3px] rounded-full ${isIOS ? 'bg-gradient-to-b from-ds-blue-500 to-ds-indigo-500' : 'bg-gradient-to-b from-ds-blue-500 to-ds-blue-300'}`} />
                <div className="pl-3">
                    <div className="flex items-center space-x-2.5 mb-3">
                        <Icon name="auto_awesome" className={`text-xl ${isColorful ? 'text-ds-ember' : 'text-ds-blue-500'}`} />
                        <span className={`text-xs font-bold uppercase tracking-widest ${isColorful ? 'text-ds-ember-light' : isLight ? 'text-ds-blue-500' : isIOS ? 'text-ds-blue-400' : 'text-ds-blue-300'}`}>AI Morning Briefing</span>
                    </div>
                    <p className={`text-[14px] leading-[1.65] ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                        Markets are poised for a <span className="font-semibold text-ds-success">bullish open</span>. NVIDIA earnings beat estimates by 22%, driving AI sector momentum. Fed minutes suggest a <span className="font-semibold">rate pause</span> in Q2. Your watchlist is up 3.1% pre-market.
                    </p>
                    <button onClick={() => onNavigate('copilot')} className={`mt-3 flex items-center space-x-1.5 text-xs font-semibold ${isColorful ? 'text-ds-ember-light' : 'text-ds-blue-500'}`}>
                        <span>Ask follow-up</span><Icon name="arrow_forward" className="text-sm" />
                    </button>
                </div>
            </motion.div>

            {/* ── Watchlist Carousel ── */}
            <motion.div variants={fadeUp}>
                <div className="flex justify-between items-center mb-3 px-1">
                    <h3 className={`font-bold text-base ${isIOS ? 'tracking-tight' : ''}`}>Watchlist</h3>
                    <button className={`text-xs font-semibold ${isColorful ? 'text-ds-ember-light' : 'text-ds-blue-500'}`}>See All</button>
                </div>
                <div className="flex space-x-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                    {watchlist.map((s, i) => (
                        <motion.div key={s.ticker} initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 300, damping: 22, mass: 0.85 }}
                            whileTap={{ scale: 0.95 }}
                            className={`shrink-0 w-[155px] p-4 ${card} cursor-pointer relative overflow-hidden`}>
                            {/* Subtle top gradient accent */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] ${s.up ? 'bg-gradient-to-r from-ds-success/60 to-ds-success/30' : 'bg-gradient-to-r from-ds-error/60 to-ds-error/30'}`} />
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-[15px]">{s.ticker}</span>
                                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${s.up ? 'bg-ds-success/15 text-ds-success' : 'bg-ds-error/15 text-ds-error'}`}>{s.change}</span>
                            </div>
                            <span className={`text-[11px] block mb-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{s.name}</span>
                            <Sparkline data={s.data} color={s.up ? '#16a34a' : '#dc2626'} width={120} height={28} />
                            <span className={`text-[15px] font-semibold mt-2 block ${isLight ? 'text-gray-900' : 'text-white'}`}>{s.price}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── Market Movers ── */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[15px]">Market Movers</h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1 ${isColorful ? 'bg-ds-ember/20 text-ds-ember-light' : isLight ? 'bg-ds-blue-100 text-ds-blue-500' : 'bg-ds-blue-500/10 text-ds-blue-400'}`}>
                        <PulseBeacon color="blue" size="sm" />
                        <span className="ml-1">Live</span>
                    </span>
                </div>
                <div className="space-y-2.5">
                    {movers.map((m, i) => (
                        <motion.div key={m.ticker} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08, type: 'spring', stiffness: 300, damping: 24 }} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2.5">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold ${m.up ? (isLight ? 'bg-ds-success/10 text-ds-success' : 'bg-ds-success/15 text-ds-success') : (isLight ? 'bg-ds-error/10 text-ds-error' : 'bg-ds-error/15 text-ds-error')}`}>{i + 1}</div>
                                <span className="font-semibold text-[14px]">{m.ticker}</span>
                            </div>
                            <div className="flex-1 mx-3 h-2.5 rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(Math.abs(parseFloat(m.change)) * 5, 100)}%` }} transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                                    className={`h-full rounded-full ${m.up ? 'bg-gradient-to-r from-ds-success to-ds-success/60' : 'bg-gradient-to-r from-ds-error to-ds-error/60'}`} />
                            </div>
                            <span className={`font-bold text-[13px] w-16 text-right ${m.up ? 'text-ds-success' : 'text-ds-error'}`}>{m.change}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── Quick Actions ── */}
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-base mb-3 px-1">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: 'bolt', label: 'Earnings', desc: 'Q3 reports', gradient: 'from-ds-success to-ds-cyan-400', lightBg: 'bg-ds-success/10 border-ds-success/20' },
                        { icon: 'description', label: 'Filings', desc: 'SEC data', gradient: 'from-ds-blue-500 to-ds-indigo-500', lightBg: 'bg-ds-blue-100 border-ds-blue-200' },
                        { icon: 'analytics', label: 'Research', desc: 'Analyst notes', gradient: 'from-ds-purple-400 to-ds-fuchsia-400', lightBg: 'bg-ds-purple-400/10 border-ds-purple-400/20' },
                        { icon: 'grid_view', label: 'Sectors', desc: 'Heatmap', gradient: 'from-ds-ember to-ds-ember-dark', lightBg: 'bg-ds-ember/10 border-ds-ember/20' },
                    ].map((a) => (
                        <motion.button key={a.label} whileTap={{ scale: 0.96 }} onClick={() => onNavigate('copilot')}
                            className={`relative overflow-hidden flex flex-col text-left p-4 rounded-[20px] transition-all ${isLight ? `${a.lightBg} border` : isColorful ? `bg-gradient-to-br ${a.gradient}/10 border border-white/5` : 'bg-white/[0.04] border border-white/5'}`}>
                            {/* Subtle gradient overlay on dark themes */}
                            {!isLight && <div className={`absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-[0.06] rounded-[20px]`} />}
                            <div className="relative z-10">
                                <Icon name={a.icon} className={`mb-2 text-xl ${isLight ? 'text-gray-700' : 'text-gray-300'}`} />
                                <span className="font-semibold text-[14px] mb-0.5 block">{a.label}</span>
                                <span className="text-[11px] opacity-60">{a.desc}</span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// MARKETS VIEW
// ═══════════════════════════════════════════════════════════
function MarketsView({ os, theme, onNavigate }: { os: string, theme: string, onNavigate?: (t: TabType) => void }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [tickerExpanded, setTickerExpanded] = useState(false);
    const [alertSet, setAlertSet] = useState<string | null>(null);
    const [chartRange, setChartRange] = useState('1M');
    const [featuredIdx, setFeaturedIdx] = useState(0);
    useEffect(() => { setTickerExpanded(false); setAlertSet(null); }, [selectedTicker]);
    const card = isIOS
        ? (isLight ? 'bg-white/50 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/50 rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : isColorful ? 'bg-ds-card-colorful-from/35 backdrop-blur-[30px] backdrop-saturate-[200%] border border-ds-ember/20 rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]' : 'bg-ds-dark-2/55 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/8 rounded-[22px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-ds-gray-50/90 backdrop-blur-xl rounded-[28px] shadow-sm border border-ds-blue-100/50' : isColorful ? 'bg-ds-card-colorful-from/60 backdrop-blur-xl rounded-[28px] shadow-lg border border-ds-ember/20' : 'bg-ds-dark-3/90 backdrop-blur-xl rounded-[28px] shadow-lg border border-ds-gray-600/40');

    const indices = [
        { name: 'S&P 500', value: '5,234.18', change: '+0.87%', up: true, data: [5100, 5120, 5150, 5180, 5200, 5210, 5190, 5220, 5234] },
        { name: 'NASDAQ', value: '16,428.82', change: '+1.24%', up: true, data: [16000, 16100, 16200, 16150, 16300, 16350, 16400, 16380, 16428] },
        { name: 'DOW', value: '39,131.53', change: '+0.32%', up: true, data: [38800, 38900, 38950, 39000, 38980, 39050, 39100, 39080, 39131] },
    ];

    const sectors = [
        { name: 'Technology', short: 'Tech', change: '+2.8%', up: true, weight: 28 },
        { name: 'Healthcare', short: 'Health', change: '+1.2%', up: true, weight: 15 },
        { name: 'Financials', short: 'Finance', change: '-0.5%', up: false, weight: 13 },
        { name: 'Consumer', short: 'Cons.', change: '+0.9%', up: true, weight: 11 },
        { name: 'Energy', short: 'Energy', change: '-1.8%', up: false, weight: 10 },
        { name: 'Industrials', short: 'Indust.', change: '+0.3%', up: true, weight: 9 },
    ];

    const trending = [
        { ticker: 'NVDA', name: 'NVIDIA Corp', price: '$878.37', change: '+5.1%', up: true, data: [750, 780, 800, 820, 850, 870, 878], extData: [680, 710, 750, 780, 760, 800, 820, 835, 850, 840, 860, 870, 865, 878] },
        { ticker: 'SMCI', name: 'Super Micro', price: '$1,012.45', change: '+18.2%', up: true, data: [700, 750, 800, 850, 900, 980, 1012], extData: [550, 600, 650, 700, 720, 750, 800, 830, 850, 900, 940, 980, 1000, 1012] },
        { ticker: 'META', name: 'Meta Platforms', price: '$502.30', change: '+3.4%', up: true, data: [460, 470, 475, 480, 490, 495, 502], extData: [420, 430, 445, 460, 465, 470, 475, 478, 480, 485, 490, 495, 498, 502] },
        { ticker: 'TSLA', name: 'Tesla Inc', price: '$175.22', change: '-3.2%', up: false, data: [195, 190, 185, 180, 178, 176, 175], extData: [210, 205, 200, 195, 192, 190, 188, 185, 182, 180, 178, 176, 174, 175] },
        { ticker: 'AMZN', name: 'Amazon.com', price: '$178.25', change: '+1.9%', up: true, data: [168, 170, 172, 174, 175, 177, 178], extData: [155, 158, 162, 165, 168, 170, 171, 172, 173, 174, 175, 176, 177, 178] },
    ];

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } } };
    const fadeUp = { hidden: { opacity: 0, y: 36, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24, mass: 0.85 } } };
    const featured = trending[featuredIdx];

    return (
        <motion.div initial="hidden" animate="show" variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[110px] px-4 space-y-5">
            {/* ── Index Strip ── */}
            <motion.div variants={fadeUp} className="flex space-x-3 overflow-x-auto scrollbar-none pb-1">
                {indices.map((idx, i) => (
                    <motion.div key={idx.name} initial={{ opacity: 0, y: 20, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 300, damping: 22 }}
                        className={`shrink-0 flex items-center space-x-3 px-4 py-3 ${card}`}>
                        <div>
                            <span className={`text-[11px] font-semibold block ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{idx.name}</span>
                            <span className="font-bold text-[14px]">{idx.value}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <Sparkline data={idx.data} color={idx.up ? '#16a34a' : '#dc2626'} width={50} height={20} />
                            <span className={`text-[11px] font-bold mt-1 ${idx.up ? 'text-ds-success' : 'text-ds-error'}`}>{idx.change}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* ── Featured Stock Chart ── */}
            <motion.div variants={fadeUp} className={`p-5 ${card} relative overflow-hidden`}>
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-50 ${isColorful ? 'from-ds-ember to-ds-ember-dark' : isIOS ? 'from-ds-blue-500 to-ds-indigo-500' : 'from-ds-blue-500 to-ds-blue-300'}`} />
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="font-bold text-[18px]">{featured.ticker}</span>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${featured.up ? 'bg-ds-success/15 text-ds-success' : 'bg-ds-error/15 text-ds-error'}`}>{featured.change}</span>
                        </div>
                        <span className={`text-[12px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{featured.name}</span>
                    </div>
                    <span className="text-[22px] font-extrabold">{featured.price}</span>
                </div>
                {/* Interactive Chart */}
                <div className="mb-3">
                    <AreaChart data={featured.extData} color={featured.up ? '#16a34a' : '#dc2626'} width={320} height={100} />
                </div>
                {/* Time Range Selector */}
                <div className="flex justify-between items-center">
                    <div className="flex space-x-1.5">
                        {['1D', '1W', '1M', '3M', '1Y'].map(r => (
                            <button key={r} onClick={() => setChartRange(r)}
                                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${chartRange === r ? (isColorful ? 'bg-ds-ember text-white' : 'bg-ds-blue-500 text-white') : (isLight ? 'bg-black/5 text-gray-500' : 'bg-white/8 text-gray-400')}`}>
                                {r}
                            </button>
                        ))}
                    </div>
                    {/* Ticker selector dots */}
                    <div className="flex space-x-1.5">
                        {trending.slice(0, 4).map((t, i) => (
                            <button key={t.ticker} onClick={() => setFeaturedIdx(i)}
                                className={`w-6 h-6 rounded-full text-[8px] font-bold flex items-center justify-center transition-all ${featuredIdx === i ? (isColorful ? 'bg-ds-ember text-white scale-110' : 'bg-ds-blue-500 text-white scale-110') : (isLight ? 'bg-black/5 text-gray-500' : 'bg-white/8 text-gray-400')}`}>
                                {t.ticker.slice(0, 2)}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ── Sector Heatmap ── */}
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-base mb-3 px-1">Sector Heatmap</h3>
                <div className="grid grid-cols-3 gap-2">
                    {sectors.map((s, i) => (
                        <motion.div key={s.short} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 280, damping: 20, mass: 0.85 }}
                            whileTap={{ scale: 0.93 }}
                            className={`relative overflow-hidden p-3 rounded-2xl text-center cursor-pointer ${i === 0 ? 'col-span-2 row-span-1' : ''} ${s.up
                                ? (isLight ? 'bg-ds-success/10 border border-ds-success/20' : 'bg-ds-success/25 border border-ds-success/20')
                                : (isLight ? 'bg-ds-error/10 border border-ds-error/20' : 'bg-ds-error/25 border border-ds-error/20')
                                }`}>
                            {/* Weight indicator bar */}
                            <div className={`absolute bottom-0 left-0 h-1 rounded-full transition-all ${s.up ? 'bg-ds-success/30' : 'bg-ds-error/30'}`} style={{ width: `${s.weight * 3}%` }} />
                            <span className="font-bold text-[13px] block">{i === 0 ? s.name : s.short}</span>
                            <span className={`text-[12px] font-semibold ${s.up ? 'text-ds-success' : 'text-ds-error'}`}>{s.change}</span>
                            {i === 0 && <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{s.weight}% of market</span>}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── Trending Tickers ── */}
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-base mb-3 px-1">Trending</h3>
                <div className="space-y-2">
                    {trending.map((t, i) => (
                        <motion.button key={t.ticker} initial={{ opacity: 0, x: -30, scale: 0.92 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 280, damping: 22 }}
                            onClick={() => setSelectedTicker(selectedTicker === t.ticker ? null : t.ticker)}
                            whileTap={{ scale: 0.96 }}
                            className={`w-full flex items-center justify-between p-4 transition-all ${card}`}>
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[11px] ${isIOS ? (t.up ? 'bg-ds-blue-500/10 text-ds-blue-500' : 'bg-ds-error/10 text-ds-error') : (t.up ? 'bg-ds-blue-300 text-ds-blue-900' : 'bg-ds-error/25 text-ds-error')}`}>{t.ticker.slice(0, 3)}</div>
                                <div className="text-left">
                                    <span className="font-semibold text-[14px] block">{t.ticker}</span>
                                    <span className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{t.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Sparkline data={t.data} color={t.up ? '#16a34a' : '#dc2626'} width={60} height={24} />
                                <div className="text-right">
                                    <span className="font-semibold text-[14px] block">{t.price}</span>
                                    <span className={`text-[11px] font-bold ${t.up ? 'text-ds-success' : 'text-ds-error'}`}>{t.change}</span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Sheet for Ticker Detail */}
            <AnimatePresence>
                {selectedTicker && (() => {
                    const t = trending.find(x => x.ticker === selectedTicker)!;
                    const metrics = [
                        { label: 'Market Cap', value: t.ticker === 'NVDA' ? '$2.15T' : t.ticker === 'META' ? '$1.25T' : t.ticker === 'TSLA' ? '$558B' : t.ticker === 'AMZN' ? '$1.87T' : '$58B' },
                        { label: 'P/E Ratio', value: t.ticker === 'NVDA' ? '64.2x' : t.ticker === 'META' ? '24.1x' : t.ticker === 'TSLA' ? '43.8x' : t.ticker === 'AMZN' ? '36.7x' : '18.3x' },
                        { label: '52W High', value: t.ticker === 'NVDA' ? '$974.00' : t.ticker === 'META' ? '$531.49' : t.ticker === 'TSLA' ? '$299.29' : t.ticker === 'AMZN' ? '$201.20' : '$1,229.15' },
                        { label: '52W Low', value: t.ticker === 'NVDA' ? '$373.54' : t.ticker === 'META' ? '$274.38' : t.ticker === 'TSLA' ? '$138.80' : t.ticker === 'AMZN' ? '$118.35' : '$406.32' },
                    ];
                    return (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setSelectedTicker(null)} />
                            <motion.div initial={{ y: '100%', scale: 0.95, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: '100%', scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 1 }}
                                className={`absolute bottom-0 left-0 right-0 rounded-t-[32px] pt-4 pb-28 ${isIOS ? (isLight ? 'bg-white' : isColorful ? 'bg-ds-card-colorful-from' : 'bg-ds-dark-2') : (isLight ? 'bg-ds-gray-50' : isColorful ? 'bg-ds-card-colorful-from' : 'bg-ds-dark-3')}`}>
                                {/* Drag handle — tap to expand */}
                                <button onClick={() => setTickerExpanded(e => !e)} className="w-full flex flex-col items-center pb-4 active:opacity-70">
                                    <div className="w-10 h-1 rounded-full bg-gray-400/30" />
                                    <Icon name={tickerExpanded ? 'expand_more' : 'expand_less'} className="text-[14px] opacity-30 mt-1" />
                                </button>
                                <div className="px-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div><h3 className="text-2xl font-bold">{t.ticker}</h3><p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{t.name}</p></div>
                                        <div className="text-right"><span className="text-2xl font-bold">{t.price}</span><span className={`block text-sm font-bold ${t.up ? 'text-ds-success' : 'text-ds-error'}`}>{t.change}</span></div>
                                    </div>
                                    <Sparkline data={t.data} color={t.up ? '#16a34a' : '#dc2626'} width={340} height={80} />
                                    {/* Expandable metrics */}
                                    <AnimatePresence>
                                        {tickerExpanded && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                                <div className="grid grid-cols-2 gap-2.5 mt-4 mb-4">
                                                    {metrics.map(m => (
                                                        <div key={m.label} className={`p-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                                                            <span className="text-[11px] opacity-50 block mb-0.5">{m.label}</span>
                                                            <span className="text-[15px] font-bold">{m.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className={`p-3 rounded-2xl mb-3 flex items-center space-x-3 ${isLight ? 'bg-ds-success/10 border border-ds-success/10' : 'bg-ds-success/20 border border-ds-success/15'}`}>
                                                    <Icon name="bar_chart" className="text-ds-success text-[20px] shrink-0" />
                                                    <div><span className="text-[11px] opacity-50 block">Analyst Consensus</span><span className="text-[14px] font-bold text-ds-success">{t.up ? 'Buy' : 'Hold'} · {t.up ? '72%' : '54%'} bullish</span></div>
                                                </div>
                                                <div className={`p-3 rounded-2xl mb-4 ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.05]'}`}>
                                                    <div className="flex items-center space-x-1.5 mb-1"><Icon name="auto_awesome" className={`text-[14px] ${isColorful ? 'text-ds-ember' : 'text-ds-blue-500'}`} /><span className="text-[11px] font-bold opacity-50">AI Insight</span></div>
                                                    <p className={`text-[12px] leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{t.up ? `${t.ticker} shows strong momentum with institutional buying pressure. Watch for resistance near ${metrics[2].value}.` : `${t.ticker} faces near-term headwinds. Support levels at ${metrics[3].value} remain key.`}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        {['Ask AI', 'Add Alert', 'Share'].map((label, i) => (
                                            <button key={label} onClick={() => {
                                                if (label === 'Ask AI') { setSelectedTicker(null); onNavigate?.('copilot'); }
                                                if (label === 'Add Alert') { setAlertSet(t.ticker); setTimeout(() => setAlertSet(null), 2500); }
                                            }} className={`py-3 rounded-2xl text-[13px] font-semibold transition-all active:scale-95 ${i === 0 ? (isColorful ? 'bg-ds-ember text-white' : 'bg-ds-blue-500 text-white') : label === 'Add Alert' && alertSet === t.ticker ? 'bg-ds-success text-white' : (isLight ? 'bg-gray-100 text-gray-800' : isColorful ? 'bg-white/10 text-white' : 'bg-white/10 text-white')}`}>
                                                {label === 'Add Alert' && alertSet === t.ticker ? '✓ Alert Set' : label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// COPILOT VIEW
// ═══════════════════════════════════════════════════════════
function CopilotView({ os, theme }: { os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<{ id: number, role: 'user' | 'assistant', text: string, citations?: { source: string, snippet: string }[] }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [streamText, setStreamText] = useState("");

    const mockResponses = [
        { text: "Based on the latest SEC filings, AAPL shows substantial QoQ growth in software services revenue (+18.3%). Our sentiment models indicate 94% confidence this trend sustains through Q4, driven by strong App Store and iCloud performance.", citations: [{ source: "SEC 10-Q Filing", snippet: "Services revenue reached $23.1B..." }, { source: "Earnings Call Transcript", snippet: "Tim Cook highlighted AI integration..." }] },
        { text: "The Federal Reserve's recent minutes suggest committee members are willing to pause rate hikes if housing data continues to cool. Bond markets are pricing in a 78% probability of a hold at the next FOMC meeting.", citations: [{ source: "FOMC Minutes", snippet: "Members noted inflation moderating..." }] },
        { text: "I found 3 recent analyst upgrades for NVDA, predominantly citing strong margin expansion (+340bps) and a robust supply chain recovery. Price targets range from $950 to $1,200 with a consensus of $1,050.", citations: [{ source: "Goldman Sachs Research", snippet: "Upgrading to Conviction Buy..." }, { source: "Morgan Stanley Note", snippet: "Data center revenue exceeding..." }] },
    ];

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => { if (messages.length > 0) scrollToBottom(); }, [messages]);

    const handleSend = (overrideText?: string) => {
        const txt = overrideText || input;
        if (!txt.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: txt }]);
        setInput(""); setIsTyping(true); setStreamText("");
        const resp = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        const fullText = resp.text;
        let charIndex = 0;
        const streamInterval = setInterval(() => {
            charIndex += 2;
            setStreamText(fullText.slice(0, charIndex));
            if (charIndex >= fullText.length) {
                clearInterval(streamInterval);
                setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: fullText, citations: resp.citations }]);
                setIsTyping(false); setStreamText("");
            }
        }, 20);
    };

    const userBubble = isColorful
        ? 'bg-gradient-to-br from-ds-ember to-ds-ember-dark text-white rounded-[22px] rounded-tr-md shadow-[0_6px_20px_rgba(255,140,66,0.3)]'
        : isIOS
            ? 'bg-gradient-to-br from-ds-blue-500 to-ds-indigo-500 text-white rounded-[22px] rounded-tr-md shadow-[0_6px_20px_rgba(0,122,255,0.3)]'
            : 'bg-gradient-to-br from-ds-blue-500 to-ds-indigo-400 text-white rounded-[22px] rounded-tr-md shadow-[0_4px_16px_rgba(103,80,164,0.3)]';
    const botBubble = isIOS
        ? (isLight ? 'bg-white/50 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/50 text-black rounded-[22px] rounded-tl-md shadow-[0_4px_20px_rgba(0,0,0,0.04)]' : isColorful ? 'bg-ds-card-colorful-from/50 backdrop-blur-[30px] backdrop-saturate-[200%] border border-ds-ember/20 text-white rounded-[22px] rounded-tl-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'bg-ds-dark-2/55 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/8 text-white rounded-[22px] rounded-tl-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]')
        : isColorful ? (isLight ? 'bg-[#ffecdf]/90 backdrop-blur-xl border border-ds-ember/20 text-ds-ember-dark rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-ds-card-colorful-from/60 backdrop-blur-xl border border-ds-ember/20 text-white rounded-[22px] rounded-tl-sm shadow-sm') : (isLight ? 'bg-ds-gray-50/90 backdrop-blur-xl border border-ds-blue-100/50 text-ds-blue-900 rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-ds-dark-3/90 backdrop-blur-xl border border-ds-gray-600/40 text-ds-blue-200 rounded-[22px] rounded-tl-sm shadow-sm');
    const inputArea = isIOS
        ? (isLight ? 'bg-white/40 backdrop-blur-[30px] backdrop-saturate-[200%] border-t border-black/5' : isColorful ? 'bg-ds-card-colorful-from/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-t border-ds-ember/20' : 'bg-ds-dark-2/45 backdrop-blur-[30px] backdrop-saturate-[200%] border-t border-white/8')
        : (isLight ? 'bg-ds-gray-100 rounded-t-[28px]' : isColorful ? 'bg-ds-colorful-bg/90 rounded-t-[28px]' : 'bg-ds-dark-3 rounded-t-[28px]');
    const inputBox = isIOS
        ? (isLight ? 'bg-black/5 rounded-full px-5 py-3 border border-black/5' : isColorful ? 'bg-ds-ember/10 rounded-full px-5 py-3 border border-ds-ember/20' : 'bg-white/8 rounded-full px-5 py-3 border border-white/8')
        : isColorful ? (isLight ? 'bg-ds-ember/20 text-ds-ember-dark rounded-[28px] px-5 py-3' : 'bg-ds-ember/15 text-white rounded-[28px] px-5 py-3') : (isLight ? 'bg-ds-blue-100 text-ds-blue-900 rounded-[28px] px-5 py-3' : 'bg-ds-blue-800 text-ds-blue-200 rounded-[28px] px-5 py-3');

    const prompts = [
        { icon: 'bolt', label: 'Earnings', prompt: 'Analyze AAPL Q3 Earnings Impact' },
        { icon: 'track_changes', label: 'Macro Risks', prompt: 'Macro risk factors for Q4' },
        { icon: 'topic', label: 'Filings', prompt: 'Summarize recent SEC filings' },
        { icon: 'school', label: 'Rates', prompt: 'Interest rate trend analysis' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
            className="absolute z-[10] inset-0 flex flex-col w-full h-full overflow-hidden pt-[110px] bg-transparent">
            {messages.length === 0 ? (
                <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto scrollbar-none">
                    <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 250, damping: 20, mass: 0.9 }}
                        className="flex flex-col items-center pt-[5vh] pb-8 shrink-0">
                        <div className="relative w-16 h-16 flex items-center justify-center mb-6">
                            <div className={`absolute inset-0 rounded-full animate-ping opacity-15 ${isColorful ? 'bg-ds-ember' : 'bg-ds-blue-500'}`} style={{ animationDuration: '2s', animationIterationCount: 2, animationFillMode: 'forwards' }} />
                            <Icon name="auto_awesome" className={`text-[36px] ${isColorful ? 'text-ds-ember' : 'text-ds-blue-500'}`} />
                        </div>
                        <h3 className="font-bold text-lg mb-1">Market Copilot</h3>
                        <p className={`text-sm text-center max-w-[240px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Ask anything about markets, earnings, filings, or macro trends.</p>
                    </motion.div>
                    <div className="w-full mt-auto pb-4 shrink-0">
                        <label className={`text-[10px] font-bold uppercase tracking-widest mb-3 block px-1 ${isLight ? 'text-black/40' : 'text-white/40'}`}>Suggested</label>
                        <div className="grid grid-cols-2 gap-2.5">
                            {prompts.map((p, i) => (
                                <motion.button key={p.label} whileTap={{ scale: 0.93 }} onClick={() => handleSend(p.prompt)}
                                    initial={{ opacity: 0, y: 24, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 280, damping: 22 }}
                                    className={`flex flex-col text-left p-3.5 rounded-[18px] transition-all ${isIOS ? (isLight ? 'bg-white/60 border border-black/5' : isColorful ? 'bg-ds-card-colorful-from/60 border border-ds-ember/20' : 'bg-ds-dark-2/60 border border-white/8') : isColorful ? (isLight ? 'bg-ds-ember/15 border border-ds-ember/20' : 'bg-ds-ember/10 border border-ds-ember/20') : (isLight ? 'bg-ds-blue-100 text-ds-blue-900' : 'bg-ds-blue-800 text-ds-blue-200')}`}>
                                    <Icon name={p.icon} className={`mb-1.5 text-lg ${isColorful ? 'text-ds-ember' : isIOS ? (isLight ? 'text-ds-blue-500' : 'text-ds-blue-400') : (isLight ? 'text-ds-blue-500' : 'text-ds-blue-400')}`} />
                                    <span className="font-semibold text-[13px]">{p.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none pb-24">
                    {messages.map(msg => (
                        <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className="flex flex-col max-w-[88%]">
                                <div className={`px-4 py-3 text-[14px] leading-relaxed ${msg.role === 'user' ? userBubble : botBubble}`}>{msg.text}</div>
                                {msg.role === 'assistant' && msg.citations && (
                                    <div className="mt-2 space-y-1.5 ml-1">
                                        {msg.citations.map((c, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, x: -20, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.15 + i * 0.12, type: 'spring', stiffness: 280, damping: 22 }}
                                                className={`flex items-start space-x-2 p-2.5 rounded-xl text-[11px] ${isLight ? 'bg-ds-blue-400/8 border border-ds-blue-400/10' : isColorful ? 'bg-ds-ember/8 border border-ds-ember/15' : 'bg-ds-indigo-600/20 border border-ds-indigo-500/15'}`}>
                                                <Icon name="verified" className={`text-sm shrink-0 mt-0.5 ${isColorful ? 'text-ds-ember' : 'text-ds-blue-500'}`} />
                                                <div><span className="font-semibold block">{c.source}</span><span className={`${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{c.snippet}</span></div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && streamText && (
                        <div className="flex justify-start"><div className={`max-w-[88%] px-4 py-3 text-[14px] leading-relaxed ${botBubble}`}>{streamText}<span className="inline-block w-0.5 h-4 ml-0.5 bg-current animate-pulse align-text-bottom" /></div></div>
                    )}
                    {isTyping && !streamText && (
                        <div className="flex justify-start"><div className={`px-4 py-3 flex space-x-1.5 ${botBubble}`}><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" /><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>
                    )}
                    {/* Post-chat actions */}
                    {messages.length > 0 && !isTyping && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-2 px-1 pb-2">
                            {[
                                { icon: 'bookmark', label: 'Save Summary' },
                                { icon: 'share', label: 'Share' },
                                { icon: 'add_comment', label: 'Follow-up' },
                            ].map((a) => (
                                <motion.button key={a.label} whileTap={{ scale: 0.95 }}
                                    className={`flex items-center space-x-1.5 px-3 py-2 rounded-2xl text-[12px] font-semibold ${isColorful ? (isLight ? 'bg-ds-ember/20 text-ds-ember-dark' : 'bg-ds-ember/15 text-ds-ember-light') : isIOS ? (isLight ? 'bg-black/5 text-ds-blue-500' : 'bg-white/8 text-ds-blue-400') : (isLight ? 'bg-ds-blue-100 text-ds-blue-900' : 'bg-ds-blue-800 text-ds-blue-200')}`}>
                                    <Icon name={a.icon} className="text-[14px]" /><span>{a.label}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                    <div className="pb-4" />
                </div>
            )}
            <div className={`px-4 pt-3 pb-[90px] flex items-end space-x-2 shrink-0 z-30 w-full ${inputArea}`}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about markets..." className={`flex-1 outline-none text-[14px] ${inputBox}`} />
                <button onClick={() => handleSend()} disabled={!input.trim()} className={`w-10 h-10 flex justify-center items-center shrink-0 transition-opacity disabled:opacity-40 ${isColorful ? 'bg-ds-ember text-white rounded-full' : isIOS ? 'bg-ds-blue-500 text-white rounded-full' : 'bg-ds-blue-500 text-white rounded-[14px]'}`}>
                    <Icon name="arrow_upward" className="text-lg" />
                </button>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// ALERTS VIEW
// ═══════════════════════════════════════════════════════════
function AlertsView({ os, theme }: { os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    const [expanded, setExpanded] = useState<number | null>(null);
    const card = isIOS
        ? (isLight ? 'bg-white/50 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/50 rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]' : isColorful ? 'bg-ds-card-colorful-from/35 backdrop-blur-[30px] backdrop-saturate-[200%] border border-ds-ember/20 rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'bg-ds-dark-2/55 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/8 rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-ds-gray-50/90 backdrop-blur-xl rounded-[28px] border border-ds-blue-100/50 shadow-sm' : isColorful ? 'bg-ds-card-colorful-from/60 backdrop-blur-xl rounded-[28px] shadow-lg border border-ds-ember/20' : 'bg-ds-dark-3/90 backdrop-blur-xl rounded-[28px] border border-ds-gray-600/40 shadow-lg');

    const alerts = [
        { id: 1, priority: 'critical', icon: 'trending_down', title: 'TSLA Dropped 5.2%', desc: 'Pre-market trading indicates a significant drop ahead of SEC quarterly earnings disclosure.', detail: 'Tesla shares fell sharply after reports of slowing EV deliveries in China and increased competition from BYD. Analyst consensus has shifted to a Hold rating.', time: '10 min ago', color: 'red' },
        { id: 2, priority: 'warning', icon: 'priority_high', title: 'Fed Rate Decision Imminent', desc: 'FOMC meeting concludes today at 2:00 PM ET with rate decision announcement.', detail: 'Markets are pricing in a 78% chance of a rate hold. Any hawkish surprise could trigger a 2-3% correction in growth stocks.', time: '32 min ago', color: 'amber' },
        { id: 3, priority: 'info', icon: 'rocket_launch', title: 'AI Sector Momentum', desc: 'NVIDIA supply chain partners report 40% surge in Q4 order fulfillment.', detail: 'SMCI, ARM, and AVGO are all reporting stronger-than-expected demand. The AI infrastructure buildout is accelerating faster than analyst models predicted.', time: '1 hour ago', color: 'green' },
        { id: 4, priority: 'info', icon: 'description', title: 'New SEC Filing: AAPL', desc: 'Apple filed a supplemental 8-K form regarding its services segment restructuring.', detail: 'The filing reveals Apple plans to separate its advertising revenue reporting from App Store services starting Q1 FY2026.', time: '3 hours ago', color: 'blue' },
        { id: 5, priority: 'info', icon: 'analytics', title: 'Watchlist Update: MSFT', desc: 'Microsoft surpassed analyst consensus by 12% on cloud revenue.', detail: 'Azure growth re-accelerated to 31% YoY, beating estimates of 26%. GitHub Copilot revenue exceeded $1B ARR for the first time.', time: '5 hours ago', color: 'purple' },
    ];

    const priorityBadge = (p: string) => {
        if (p === 'critical') return isLight ? 'bg-ds-error/10 text-ds-error border-ds-error/20' : 'bg-ds-error/15 text-ds-error border-ds-error/20';
        if (p === 'warning') return isLight ? 'bg-ds-warning/10 text-ds-warning border-ds-warning/25' : 'bg-ds-warning/15 text-ds-warning border-ds-warning/20';
        return isColorful ? (isLight ? 'bg-ds-ember/20 text-ds-ember-dark border-ds-ember/30' : 'bg-ds-ember/15 text-ds-ember border-ds-ember/30') : isLight ? 'bg-ds-blue-100 text-ds-blue-500 border-ds-blue-200' : 'bg-ds-blue-500/10 text-ds-blue-400 border-ds-blue-500/15';
    };

    const dotColor = (c: string) => {
        const map: Record<string, string> = { red: 'bg-ds-error', amber: 'bg-ds-warning', green: 'bg-ds-success', blue: 'bg-ds-blue-500', purple: 'bg-ds-purple-400' };
        return map[c] || 'bg-gray-400';
    };

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } } };
    const fadeUp = { hidden: { opacity: 0, y: 36, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24, mass: 0.85 } } };

    return (
        <motion.div initial="hidden" animate="show" variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[110px] px-4 space-y-0">
            {/* Header */}
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1 mb-4">
                <h2 className={`${isIOS ? 'text-2xl font-bold tracking-tight' : isColorful ? 'text-xl font-medium text-ds-ember-light' : 'text-xl font-medium text-ds-blue-500'}`}>Market Alerts</h2>
                <div className="flex items-center space-x-2">
                    <PulseBeacon color="red" />
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${priorityBadge('critical')}`}>2 urgent</span>
                </div>
            </motion.div>

            {/* Timeline Alert Cards */}
            <div className="relative">
                {/* Vertical timeline line */}
                <div className={`absolute left-[21px] top-4 bottom-4 w-[2px] ${isLight ? 'bg-gray-200' : 'bg-white/8'}`} />

                {alerts.map((a) => (
                    <motion.div key={a.id} variants={fadeUp} className="relative pl-12 pb-4">
                        {/* Timeline dot */}
                        <div className="absolute left-[14px] top-4 z-10">
                            <div className={`w-[16px] h-[16px] rounded-full border-[3px] ${isLight ? 'border-white' : isColorful ? 'border-ds-colorful-bg' : 'border-ds-dark-1'} ${dotColor(a.color)}`}>
                                {a.priority === 'critical' && (
                                    <div className={`absolute inset-[-4px] rounded-full ${dotColor(a.color)} animate-ping opacity-30`} />
                                )}
                            </div>
                        </div>
                        {/* Time label */}
                        <span className={`text-[10px] font-semibold block mb-1.5 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{a.time}</span>
                        {/* Alert card */}
                        <motion.div onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 ${card} cursor-pointer relative overflow-hidden`}>
                            {/* Priority color accent */}
                            <div className={`absolute top-0 left-0 w-1 h-full rounded-full ${dotColor(a.color)}`} />
                            <div className="pl-2">
                                <div className="flex items-start space-x-3">
                                    <div className={`w-10 h-10 shrink-0 rounded-2xl flex justify-center items-center ${a.color === 'red' ? (isLight ? 'bg-ds-error/10 text-ds-error' : 'bg-ds-error/15 text-ds-error') : a.color === 'amber' ? (isLight ? 'bg-ds-warning/10 text-ds-warning' : 'bg-ds-warning/15 text-ds-warning') : a.color === 'green' ? (isLight ? 'bg-ds-success/10 text-ds-success' : 'bg-ds-success/15 text-ds-success') : a.color === 'blue' ? (isColorful ? (isLight ? 'bg-ds-ember/20 text-ds-ember-dark' : 'bg-ds-ember/20 text-ds-ember') : (isLight ? 'bg-ds-blue-100 text-ds-blue-500' : 'bg-ds-blue-500/15 text-ds-blue-400')) : (isLight ? 'bg-ds-purple-400/10 text-ds-purple-500' : 'bg-ds-purple-400/15 text-ds-purple-400')}`}>
                                        <Icon name={a.icon} className="text-xl" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-semibold text-[14px] truncate pr-2">{a.title}</h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${priorityBadge(a.priority)}`}>{a.priority}</span>
                                        </div>
                                        <p className={`text-[13px] leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{a.desc}</p>
                                        <AnimatePresence>
                                            {expanded === a.id && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 340, damping: 30, mass: 0.9 }}>
                                                    <p className={`text-[13px] leading-relaxed mt-2 pt-2 border-t ${isLight ? 'text-gray-700 border-gray-200' : 'text-gray-300 border-white/5'}`}>{a.detail}</p>
                                                    <button className={`mt-3 flex items-center space-x-1.5 text-xs font-semibold ${isColorful ? 'text-ds-ember-light' : 'text-ds-blue-500'}`}>
                                                        <Icon name="auto_awesome" className="text-sm" /><span>Ask AI about this</span>
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// PROFILE VIEW
// ═══════════════════════════════════════════════════════════
function ProfileView({ os, theme, setTheme }: { os: string, theme: string, setTheme: (t: string) => void }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const card = isIOS
        ? (isLight ? 'bg-white/50 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/50 rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]' : isColorful ? 'bg-ds-card-colorful-from/35 backdrop-blur-[30px] backdrop-saturate-[200%] border border-ds-ember/20 rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : 'bg-ds-dark-2/55 backdrop-blur-[30px] backdrop-saturate-[200%] border border-white/8 rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-ds-gray-50/90 backdrop-blur-xl rounded-[28px] border border-ds-blue-100/50 shadow-sm' : isColorful ? 'bg-ds-card-colorful-from/60 backdrop-blur-xl rounded-[28px] shadow-lg border border-ds-ember/20' : 'bg-ds-dark-3/90 backdrop-blur-xl rounded-[28px] border border-ds-gray-600/40 shadow-lg');

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } } };
    const fadeUp = { hidden: { opacity: 0, y: 36, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24, mass: 0.85 } } };

    return (
        <motion.div initial="hidden" animate="show" variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[110px] px-4 space-y-5">
            {/* Header Row */}
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1">
                <h2 className="text-xl font-bold tracking-tight">My Space</h2>
                <button onClick={() => setIsThemeModalOpen(true)} className={`w-9 h-9 rounded-full flex items-center justify-center ${isIOS ? (isLight ? 'bg-black/5' : 'bg-white/10') : 'bg-ds-blue-100/50 dark:bg-ds-blue-800/50'}`}>
                    <Icon name="settings" className="opacity-70 text-[18px]" />
                </button>
            </motion.div>

            {/* Profile Card */}
            <motion.div variants={fadeUp} className="flex flex-col items-center py-4">
                <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden p-[3px] bg-gradient-to-tr from-ds-blue-400 to-ds-indigo-500 shadow-lg">
                        <div className="w-full h-full rounded-full bg-white dark:bg-black/80 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="Ali Al-Zuhairi" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Ali+Al-Zuhairi&background=f3f4f6" }} />
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-ds-success border-[3px] border-white dark:border-ds-dark-2 rounded-full" />
                </div>
                <h2 className="font-bold text-2xl tracking-tight">Ali Al-Zuhairi</h2>
                <p className={`text-sm font-medium mt-0.5 ${isColorful ? 'text-ds-ember-light' : 'text-ds-blue-500'}`}>Alux Space Founder</p>
            </motion.div>

            {/* Quick Stats Row */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2">
                {[
                    { label: 'Watchlist', value: 12, icon: 'visibility' },
                    { label: 'Alerts', value: 8, icon: 'notifications_active' },
                    { label: 'Insights', value: 34, icon: 'auto_awesome' },
                ].map((stat) => (
                    <div key={stat.label} className={`p-3 text-center ${card}`}>
                        <Icon name={stat.icon} className={`text-[18px] mb-1 ${isColorful ? 'text-ds-ember' : 'text-ds-blue-500'}`} />
                        <AnimatedCounter value={stat.value} className="text-[18px] font-extrabold block" />
                        <span className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</span>
                    </div>
                ))}
            </motion.div>

            {/* Portfolio Performance */}
            <motion.div variants={fadeUp} className={`p-5 ${card} relative overflow-hidden`}>
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r opacity-50 ${isColorful ? 'from-ds-ember to-ds-ember-dark' : isIOS ? 'from-ds-blue-500 to-ds-indigo-500' : 'from-ds-blue-500 to-ds-blue-300'}`} />
                <div className="flex justify-between items-start mb-4">
                    <div><h4 className="font-semibold text-[15px]">Portfolio Performance</h4><p className="text-[11px] opacity-50 mt-0.5">Last 30 days</p></div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg flex items-center space-x-1 ${isIOS ? 'bg-ds-success/10 text-ds-success' : 'bg-ds-success/10 text-ds-success'}`}>
                        <Icon name="trending_up" className="text-[12px]" />
                        <span>+12.4%</span>
                    </span>
                </div>
                <div className="h-24 flex items-end justify-between gap-2 px-1 relative">
                    <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none opacity-[0.04] z-0"><div className="border-t border-current w-full h-1/3" /><div className="border-t border-current w-full h-1/3" /><div className="border-t border-current w-full h-1/3" /></div>
                    {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                        <div key={i} className="w-full h-full relative group flex items-end justify-center z-10">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8, delay: i * 0.06 }}
                                className={`w-full max-w-[10px] rounded-t-full bg-gradient-to-t ${isColorful ? ['from-ds-ember/60 to-ds-ember', 'from-ds-ember/70 to-ds-ember-dark', 'from-ds-ember/50 to-ds-ember', 'from-ds-ember/80 to-ds-ember-dark', 'from-ds-ember/65 to-ds-ember', 'from-ds-ember to-ds-ember-dark', 'from-ds-ember/90 to-ds-ember-dark'][i] : ['from-ds-blue-400 to-ds-blue-600', 'from-ds-indigo-400 to-ds-indigo-600', 'from-ds-blue-300 to-ds-blue-500', 'from-ds-blue-500 to-ds-indigo-500', 'from-ds-indigo-400 to-ds-blue-600', 'from-ds-blue-400 to-ds-indigo-500', 'from-ds-indigo-500 to-ds-blue-500'][i]}`} />
                        </div>
                    ))}
                </div>
                {/* Day labels */}
                <div className="flex justify-between mt-2 px-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <span key={d} className={`text-[9px] font-medium ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{d}</span>
                    ))}
                </div>
            </motion.div>

            {/* Sentiment Donut */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <h4 className="font-semibold text-[15px] mb-4">Market Sentiment</h4>
                <div className="flex items-center space-x-5">
                    <div className="relative w-18 h-18 flex items-center justify-center shrink-0">
                        <svg className="w-[72px] h-[72px] transform -rotate-90" viewBox="0 0 36 36">
                            <path className={isLight ? "text-gray-200" : "text-white/10"} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "15, 100" }} transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 1.2 }} strokeDashoffset={"-85"} strokeLinecap="round" className="text-ds-warning" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "20, 100" }} transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 1.2 }} strokeDashoffset={"-65"} strokeLinecap="round" className="text-ds-pink-500" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "65, 100" }} transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 1.2 }} strokeLinecap="round" className="text-ds-blue-300" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <AnimatedCounter value={65} suffix="%" className="absolute text-[15px] font-extrabold text-ds-blue-300" />
                    </div>
                    <div className="flex-1 space-y-1.5">
                        {[{ label: 'Bullish', pct: 65, pctStr: '65%', color: 'bg-ds-blue-300' }, { label: 'Bearish', pct: 20, pctStr: '20%', color: 'bg-ds-pink-500' }, { label: 'Neutral', pct: 15, pctStr: '15%', color: 'bg-ds-warning' }].map(s => (
                            <div key={s.label} className={`flex justify-between text-[11px] items-center p-1.5 rounded-lg ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.04]'}`}>
                                <span className="opacity-70 flex items-center font-medium"><span className={`w-2 h-2 rounded-full mr-2 ${s.color}`} />{s.label}</span>
                                <div className="flex items-center space-x-2">
                                    <div className={`w-12 h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-gray-200' : 'bg-white/10'}`}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.9 }} className={`h-full rounded-full ${s.color}`} />
                                    </div>
                                    <span className="font-bold">{s.pctStr}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>



            {/* Theme Modal */}
            <AnimatePresence>
                {isThemeModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsThemeModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.7, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.7, y: 40 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.85 }}
                            className={`relative w-[85%] max-w-sm rounded-[28px] p-6 shadow-2xl ${isIOS ? (isLight ? 'bg-white/80 backdrop-blur-[30px] backdrop-saturate-[200%]' : 'bg-ds-dark-2/80 backdrop-blur-[30px] backdrop-saturate-[200%] text-white') : (isLight ? 'bg-ds-gray-50' : 'bg-ds-dark-3 text-ds-gray-200')}`}>
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-xl font-bold">App Theme</h3>
                                <button onClick={() => setIsThemeModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10"><Icon name="close" className="text-sm" /></button>
                            </div>
                            <div className="space-y-2.5">
                                {[{ value: 'light', label: 'Light', icon: 'light_mode', color: 'text-ds-ember' }, { value: 'dark', label: 'Dark', icon: 'dark_mode', color: 'text-ds-blue-400' }, { value: 'colorful', label: 'Colorful', icon: 'palette', color: 'text-ds-ember' }].map(t => {
                                    const active = theme === t.value;
                                    return (
                                        <motion.button key={t.value} onClick={() => { setTheme(t.value); setIsThemeModalOpen(false); }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all border ${active ? (isIOS ? (isLight ? 'bg-ds-blue-500/10 border-ds-blue-500/30' : 'bg-ds-blue-400/20 border-ds-blue-400/30') : (isLight ? 'bg-ds-blue-100 border-ds-blue-100' : 'bg-ds-blue-800 border-ds-blue-800')) : (isLight ? 'bg-black/[0.03] border-transparent' : 'bg-white/[0.04] border-transparent')}`}>
                                            <div className="flex items-center space-x-3">
                                                <Icon name={t.icon} className={active ? t.color : 'opacity-50'} />
                                                <span className={`font-medium ${active ? 'font-bold' : ''}`}>{t.label}</span>
                                            </div>
                                            {active && <Icon name="check_circle" className={t.color} />}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════
function BottomNav({ activeTab, setActiveTab, os, theme }: { activeTab: string, setActiveTab: (t: TabType) => void, os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    const navClass = isIOS
        ? (isLight ? 'bg-white/40 backdrop-blur-[30px] backdrop-saturate-[200%] border-t border-black/5 pb-5 h-[82px]' : isColorful ? 'bg-ds-card-colorful-from/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-t border-ds-ember/15 pb-5 h-[82px]' : 'bg-ds-dark-2/45 backdrop-blur-[30px] backdrop-saturate-[200%] border-t border-white/5 pb-5 h-[82px]')
        : (isLight ? 'bg-ds-gray-100 h-20 pb-2 border-t border-ds-blue-100/50' : isColorful ? 'bg-ds-card-colorful-from/80 h-20 pb-2 border-t border-ds-ember/20' : 'bg-ds-dark-3 h-20 pb-2 border-t border-ds-gray-600/50');

    const tabs: { key: TabType, icon: string, label: string }[] = [
        { key: 'dashboard', icon: 'space_dashboard', label: 'Home' },
        { key: 'markets', icon: 'candlestick_chart', label: 'Markets' },
        { key: 'copilot', icon: 'auto_awesome', label: 'Copilot' },
        { key: 'alerts', icon: 'notifications', label: 'Alerts' },
        { key: 'profile', icon: 'person', label: 'Profile' },
    ];

    return (
        <nav className={`absolute bottom-0 w-full flex justify-around items-center px-1 z-40 transition-all duration-300 ${navClass}`}>
            {tabs.map(t => (
                <NavBtn key={t.key} icon={t.icon} label={t.label} active={activeTab === t.key} onClick={() => setActiveTab(t.key)} os={os} theme={theme} />
            ))}
        </nav>
    );
}

function NavBtn({ icon, label, active, onClick, os, theme }: { icon: string, label: string, active: boolean, onClick: () => void, os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    if (isIOS) {
        const activeColor = isColorful ? 'text-ds-ember' : 'text-ds-blue-500';
        return (
            <motion.button onClick={onClick} className="flex flex-col items-center justify-center w-14 h-full pt-1" whileTap={{ scale: 0.78 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }}>
                <motion.span
                    animate={{ scale: active ? 1.25 : 1, y: active ? -2 : 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`material-symbols text-[26px] mb-0.5 transition-colors duration-200 ${active ? `${activeColor} font-variation-fill` : (isLight ? 'text-ds-gray-400' : 'text-ds-gray-400')}`}
                >
                    {icon}
                </motion.span>
                <motion.span animate={{ opacity: active ? 1 : 0.6 }} className={`text-[10px] font-medium transition-colors duration-200 ${active ? activeColor : (isLight ? 'text-ds-gray-400' : 'text-ds-gray-400')}`}>{label}</motion.span>
            </motion.button>
        );
    }
    const iconColor = active ? (isLight ? 'text-ds-blue-900' : isColorful ? 'text-ds-ember-light' : 'text-ds-blue-200') : (isLight ? 'text-ds-gray-600' : 'text-ds-gray-300');
    return (
        <motion.button onClick={onClick} className="flex flex-col items-center justify-center w-16 h-full relative pt-2" whileTap={{ scale: 0.82 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }}>
            <div className="relative w-16 h-8 rounded-full flex items-center justify-center">
                {active && (
                    <motion.div
                        layoutId="mi-nav-pill"
                        className={`absolute inset-0 rounded-full ${isColorful ? (isLight ? 'bg-ds-ember/25' : 'bg-ds-ember/25') : (isLight ? 'bg-ds-blue-100' : 'bg-ds-blue-700')}`}
                        transition={{ type: 'spring', stiffness: 350, damping: 24, mass: 0.8 }}
                    />
                )}
                <motion.span
                    animate={{ scale: active ? 1.2 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className={`relative material-symbols text-[22px] transition-colors duration-200 ${iconColor} ${active ? 'font-variation-fill' : ''}`}
                >
                    {icon}
                </motion.span>
            </div>
            <motion.span animate={{ opacity: active ? 1 : 0.6 }} className={`text-[11px] mt-0.5 font-medium transition-colors duration-200 ${iconColor}`}>{label}</motion.span>
        </motion.button>
    );
}
