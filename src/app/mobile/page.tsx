'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

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

type TabType = 'dashboard' | 'markets' | 'copilot' | 'alerts' | 'profile';

function MobilePrototypeContent() {
    const searchParams = useSearchParams();
    const initialOs = searchParams.get('os') === 'android' ? 'android' : 'ios';
    const initialTheme = searchParams.get('theme') || 'dark';

    const [os] = useState<'ios' | 'android'>(initialOs);
    const [theme, setTheme] = useState(initialTheme);
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');

    useEffect(() => {
        const urlTheme = searchParams.get('theme');
        if (urlTheme) setTheme(urlTheme);
    }, [searchParams]);

    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';

    const bgClass = isLight
        ? (isIOS ? 'bg-[#F2F2F7] text-black' : 'bg-[#FAF8FC] text-[#1C1B1F]')
        : isColorful
            ? 'bg-[#050023] text-white'
            : (isIOS ? 'bg-black text-white' : 'bg-[#111114] text-[#E2E2E6]');

    const headerTitles: Record<TabType, { sub: string, title: string }> = {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' },
        markets: { sub: 'Live Data', title: 'Markets' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' },
        alerts: { sub: 'Real-Time', title: 'Alerts' },
        profile: { sub: 'Settings', title: 'My Space' },
    };

    return (
        <div className={`flex flex-col min-h-[100dvh] w-full relative ${bgClass} transition-colors duration-500 font-sans`}>
            {/* Header */}
            <header className={`absolute top-0 w-full pt-12 pb-3 px-5 z-40 transition-all duration-300 ${isIOS
                ? (isLight ? 'bg-white/50 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-black/5' : 'bg-[#2C2C2E]/60 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-white/5')
                : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-2xl border-b border-[#EADDFF]/50 shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-2xl border-b border-[#4A4458]/50 shadow-md')
                }`}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-3.5">
                        <button onClick={() => setActiveTab('profile')} className="relative group transition-transform active:scale-95">
                            <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center overflow-hidden border-2 mb-0.5 ${isLight ? 'border-white shadow-sm' : 'border-[#2C2C2E] shadow-md'} bg-gradient-to-tr from-gray-50 to-gray-200 dark:from-white/10 dark:to-white/20`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="User" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=User&background=f3f4f6" }} />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[2.5px] ${isLight ? 'border-white bg-[#34C759]' : 'border-[#1C1C1E] bg-[#32D74B]'}`}></div>
                        </button>
                        <div className="flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span key={activeTab + "-sub"} initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 2 }} transition={{ duration: 0.2 }} className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${isLight ? 'text-black/40' : 'text-white/40'}`}>
                                    {headerTitles[activeTab].sub}
                                </motion.span>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.h1 key={activeTab + "-title"} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} transition={{ duration: 0.2, delay: 0.05 }} className={`text-[18px] font-extrabold tracking-tight leading-none ${isLight ? 'text-black' : 'text-white'}`}>
                                    {headerTitles[activeTab].title}
                                </motion.h1>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setActiveTab('copilot')} className={`relative w-10 h-10 rounded-full flex justify-center items-center transition-transform active:scale-95 ${isIOS ? (isLight ? 'bg-black/5 text-black' : 'bg-white/10 text-white') : (isLight ? 'bg-[#EADDFF]/50 text-[#1D192B]' : 'bg-[#4A4458]/50 text-[#E8DEF8]')}`}>
                            <Icon name="auto_awesome" className="text-[20px]" />
                            <span className="absolute top-[9px] right-[9px] w-[5.5px] h-[5.5px] bg-[#FF9500] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,149,0,0.8)]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative overflow-hidden w-full z-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && <DashboardView key="dash" os={os} theme={theme} onNavigate={setActiveTab} />}
                    {activeTab === 'markets' && <MarketsView key="markets" os={os} theme={theme} />}
                    {activeTab === 'copilot' && <CopilotView key="copilot" os={os} theme={theme} />}
                    {activeTab === 'alerts' && <AlertsView key="alerts" os={os} theme={theme} />}
                    {activeTab === 'profile' && <ProfileView key="profile" os={os} theme={theme} setTheme={setTheme} />}
                </AnimatePresence>
            </main>

            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} os={os} theme={theme} />
        </div>
    );
}

export default function MobilePrototypePage() {
    return (
        <Suspense fallback={<div className="min-h-[100dvh] w-full bg-[#111114]" />}>
            <MobilePrototypeContent />
        </Suspense>
    );
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════════════════════
function DashboardView({ os, theme, onNavigate }: { os: string, theme: string, onNavigate: (t: TabType) => void }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const card = isIOS
        ? (isLight ? 'bg-white/60 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/60 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : 'bg-[#1C1C1E]/70 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/8 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[24px] shadow-sm border border-[#EADDFF]/50' : 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[24px] shadow-lg border border-[#4A4458]/40');

    const watchlist = [
        { ticker: 'AAPL', name: 'Apple', price: '$198.11', change: '+2.4%', up: true, data: [140, 145, 142, 155, 160, 158, 170, 175, 180, 190, 185, 198] },
        { ticker: 'NVDA', name: 'NVIDIA', price: '$878.37', change: '+5.1%', up: true, data: [500, 520, 540, 580, 620, 700, 750, 800, 820, 860, 850, 878] },
        { ticker: 'TSLA', name: 'Tesla', price: '$175.22', change: '-3.2%', up: false, data: [220, 210, 200, 195, 190, 185, 180, 175, 178, 172, 170, 175] },
        { ticker: 'MSFT', name: 'Microsoft', price: '$415.60', change: '+1.8%', up: true, data: [370, 375, 380, 385, 390, 395, 400, 405, 410, 408, 412, 415] },
    ];

    const movers = [
        { ticker: 'SMCI', change: '+18.2%', up: true }, { ticker: 'ARM', change: '+12.4%', up: true },
        { ticker: 'PLTR', change: '+8.7%', up: true }, { ticker: 'RIVN', change: '-7.3%', up: false },
    ];

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
    const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } } };

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: 20 }} variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[110px] px-4 space-y-5">
            {/* AI Morning Briefing */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <div className="flex items-center space-x-2.5 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isIOS ? 'bg-gradient-to-br from-[#007AFF] to-[#5856D6]' : 'bg-[#D0BCFF]'}`}>
                        <Icon name="auto_awesome" className={`text-base ${isIOS ? 'text-white' : 'text-[#381E72]'}`} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${isIOS ? (isLight ? 'text-[#007AFF]' : 'text-[#0A84FF]') : (isLight ? 'text-[#6750A4]' : 'text-[#D0BCFF]')}`}>AI Morning Briefing</span>
                </div>
                <p className={`text-[14px] leading-[1.65] ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                    Markets are poised for a <span className="font-semibold text-green-500">bullish open</span>. NVIDIA earnings beat estimates by 22%, driving AI sector momentum. Fed minutes suggest a <span className="font-semibold">rate pause</span> in Q2. Your watchlist is up 3.1% pre-market.
                </p>
                <button onClick={() => onNavigate('copilot')} className={`mt-3 flex items-center space-x-1.5 text-xs font-semibold ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`}>
                    <span>Ask follow-up</span><Icon name="arrow_forward" className="text-sm" />
                </button>
            </motion.div>

            {/* Watchlist Carousel */}
            <motion.div variants={fadeUp}>
                <div className="flex justify-between items-center mb-3 px-1">
                    <h3 className={`font-bold text-base ${isIOS ? 'tracking-tight' : ''}`}>Watchlist</h3>
                    <button className={`text-xs font-semibold ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`}>See All</button>
                </div>
                <div className="flex space-x-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                    {watchlist.map((s, i) => (
                        <motion.div key={s.ticker} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 400, damping: 30 }}
                            className={`shrink-0 w-[155px] p-4 ${card} active:scale-[0.97] transition-transform`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-[15px]">{s.ticker}</span>
                                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${s.up ? (isIOS ? 'bg-[#34C759]/15 text-[#34C759]' : 'bg-[#146C2E]/15 text-[#146C2E]') : 'bg-red-500/15 text-red-500'}`}>{s.change}</span>
                            </div>
                            <span className={`text-[11px] block mb-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{s.name}</span>
                            <Sparkline data={s.data} color={s.up ? '#34C759' : '#FF3B30'} width={120} height={28} />
                            <span className={`text-[15px] font-semibold mt-2 block ${isLight ? 'text-gray-900' : 'text-white'}`}>{s.price}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Market Movers */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <h3 className="font-bold text-[15px] mb-3">Market Movers</h3>
                <div className="space-y-2.5">
                    {movers.map((m, i) => (
                        <motion.div key={m.ticker} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="flex items-center justify-between">
                            <span className="font-semibold text-[14px] w-14">{m.ticker}</span>
                            <div className="flex-1 mx-3 h-2 rounded-full overflow-hidden bg-black/5 dark:bg-white/5">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(Math.abs(parseFloat(m.change)) * 5, 100)}%` }} transition={{ delay: 0.4 + i * 0.08, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                                    className={`h-full rounded-full ${m.up ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-gradient-to-r from-red-400 to-red-600'}`} />
                            </div>
                            <span className={`font-bold text-[13px] w-16 text-right ${m.up ? 'text-emerald-500' : 'text-red-500'}`}>{m.change}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-base mb-3 px-1">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: 'bolt', label: 'Earnings', desc: 'Q3 reports', color: isIOS ? 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20' : 'bg-[#E8DEF8]' },
                        { icon: 'description', label: 'Filings', desc: 'SEC data', color: isIOS ? 'from-blue-500/10 to-indigo-500/10 border-blue-500/20' : 'bg-[#F3EDF7]' },
                        { icon: 'analytics', label: 'Research', desc: 'Analyst notes', color: isIOS ? 'from-purple-500/10 to-fuchsia-500/10 border-purple-500/20' : 'bg-[#E8DEF8]' },
                        { icon: 'grid_view', label: 'Sectors', desc: 'Heatmap', color: isIOS ? 'from-orange-500/10 to-amber-500/10 border-orange-500/20' : 'bg-[#F3EDF7]' },
                    ].map((a) => (
                        <motion.button key={a.label} whileTap={{ scale: 0.96 }} onClick={() => onNavigate('copilot')}
                            className={`flex flex-col text-left p-4 rounded-[20px] transition-all ${isIOS ? (isLight ? `bg-gradient-to-br ${a.color} border` : `bg-gradient-to-br ${a.color.replace('/10', '/20').replace('/20', '/30')} border`) : (isLight ? a.color + ' text-[#1D192B]' : 'bg-[#4A4458] text-[#E8DEF8]')}`}>
                            <Icon name={a.icon} className={`mb-2 text-xl ${isIOS ? (isLight ? 'text-gray-700' : 'text-gray-300') : ''}`} />
                            <span className="font-semibold text-[14px] mb-0.5">{a.label}</span>
                            <span className="text-[11px] opacity-60">{a.desc}</span>
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
function MarketsView({ os, theme }: { os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const card = isIOS
        ? (isLight ? 'bg-white/60 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/60 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]' : 'bg-[#1C1C1E]/70 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/8 rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[24px] shadow-sm border border-[#EADDFF]/50' : 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[24px] shadow-lg border border-[#4A4458]/40');

    const indices = [
        { name: 'S&P 500', value: '5,234.18', change: '+0.87%', up: true, data: [5100, 5120, 5150, 5180, 5200, 5210, 5190, 5220, 5234] },
        { name: 'NASDAQ', value: '16,428.82', change: '+1.24%', up: true, data: [16000, 16100, 16200, 16150, 16300, 16350, 16400, 16380, 16428] },
        { name: 'DOW', value: '39,131.53', change: '+0.32%', up: true, data: [38800, 38900, 38950, 39000, 38980, 39050, 39100, 39080, 39131] },
    ];

    const sectors = [
        { name: 'Tech', change: '+2.8%', up: true, weight: 28 }, { name: 'Health', change: '+1.2%', up: true, weight: 15 },
        { name: 'Finance', change: '-0.5%', up: false, weight: 13 }, { name: 'Energy', change: '-1.8%', up: false, weight: 10 },
        { name: 'Cons.', change: '+0.9%', up: true, weight: 11 }, { name: 'Indust.', change: '+0.3%', up: true, weight: 9 },
    ];

    const trending = [
        { ticker: 'NVDA', name: 'NVIDIA Corp', price: '$878.37', change: '+5.1%', up: true, data: [750, 780, 800, 820, 850, 870, 878] },
        { ticker: 'SMCI', name: 'Super Micro', price: '$1,012.45', change: '+18.2%', up: true, data: [700, 750, 800, 850, 900, 980, 1012] },
        { ticker: 'META', name: 'Meta Platforms', price: '$502.30', change: '+3.4%', up: true, data: [460, 470, 475, 480, 490, 495, 502] },
        { ticker: 'TSLA', name: 'Tesla Inc', price: '$175.22', change: '-3.2%', up: false, data: [195, 190, 185, 180, 178, 176, 175] },
        { ticker: 'AMZN', name: 'Amazon.com', price: '$178.25', change: '+1.9%', up: true, data: [168, 170, 172, 174, 175, 177, 178] },
    ];

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
    const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } } };

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[110px] px-4 space-y-5">
            {/* Index Strip */}
            <motion.div variants={fadeUp} className="flex space-x-3 overflow-x-auto scrollbar-none pb-1">
                {indices.map((idx, i) => (
                    <motion.div key={idx.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
                        className={`shrink-0 flex items-center space-x-3 px-4 py-3 ${card}`}>
                        <div>
                            <span className={`text-[11px] font-semibold block ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{idx.name}</span>
                            <span className="font-bold text-[14px]">{idx.value}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <Sparkline data={idx.data} color={idx.up ? '#34C759' : '#FF3B30'} width={50} height={20} />
                            <span className={`text-[11px] font-bold mt-1 ${idx.up ? 'text-emerald-500' : 'text-red-500'}`}>{idx.change}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Sector Heatmap */}
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-base mb-3 px-1">Sector Heatmap</h3>
                <div className="grid grid-cols-3 gap-2">
                    {sectors.map((s, i) => (
                        <motion.div key={s.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.04, type: 'spring' }}
                            className={`p-3 rounded-2xl text-center transition-transform active:scale-95 ${s.up
                                ? (isLight ? 'bg-emerald-50 border border-emerald-200' : 'bg-emerald-900/25 border border-emerald-500/20')
                                : (isLight ? 'bg-red-50 border border-red-200' : 'bg-red-900/25 border border-red-500/20')
                                }`} style={{ gridRow: s.weight > 12 ? 'span 1' : undefined }}>
                            <span className="font-bold text-[13px] block">{s.name}</span>
                            <span className={`text-[12px] font-semibold ${s.up ? 'text-emerald-500' : 'text-red-500'}`}>{s.change}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Trending Tickers */}
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-base mb-3 px-1">Trending</h3>
                <div className="space-y-2">
                    {trending.map((t, i) => (
                        <motion.button key={t.ticker} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}
                            onClick={() => setSelectedTicker(selectedTicker === t.ticker ? null : t.ticker)}
                            className={`w-full flex items-center justify-between p-4 transition-all active:scale-[0.98] ${card}`}>
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[11px] ${isIOS ? (t.up ? 'bg-[#007AFF]/10 text-[#007AFF]' : 'bg-red-500/10 text-red-500') : (t.up ? 'bg-[#D0BCFF] text-[#381E72]' : 'bg-[#F2B8B5] text-[#601410]')}`}>{t.ticker.slice(0, 3)}</div>
                                <div className="text-left">
                                    <span className="font-semibold text-[14px] block">{t.ticker}</span>
                                    <span className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{t.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Sparkline data={t.data} color={t.up ? '#34C759' : '#FF3B30'} width={60} height={24} />
                                <div className="text-right">
                                    <span className="font-semibold text-[14px] block">{t.price}</span>
                                    <span className={`text-[11px] font-bold ${t.up ? 'text-emerald-500' : 'text-red-500'}`}>{t.change}</span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Bottom Sheet for Ticker Detail */}
            <AnimatePresence>
                {selectedTicker && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedTicker(null)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`absolute bottom-0 left-0 right-0 rounded-t-[32px] p-6 pb-10 ${isIOS ? (isLight ? 'bg-white' : 'bg-[#1C1C1E]') : (isLight ? 'bg-[#FEF7FF]' : 'bg-[#2B2930]')}`}>
                            <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-6" />
                            {(() => {
                                const t = trending.find(x => x.ticker === selectedTicker)!; return (<>
                                    <div className="flex justify-between items-start mb-4">
                                        <div><h3 className="text-2xl font-bold">{t.ticker}</h3><p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{t.name}</p></div>
                                        <div className="text-right"><span className="text-2xl font-bold">{t.price}</span><span className={`block text-sm font-bold ${t.up ? 'text-emerald-500' : 'text-red-500'}`}>{t.change}</span></div>
                                    </div>
                                    <Sparkline data={t.data} color={t.up ? '#34C759' : '#FF3B30'} width={340} height={100} />
                                    <div className="grid grid-cols-3 gap-3 mt-6">
                                        {['Ask AI', 'Add Alert', 'Share'].map((label, i) => (
                                            <button key={label} className={`py-3 rounded-2xl text-[13px] font-semibold transition-all active:scale-95 ${i === 0 ? (isIOS ? 'bg-[#007AFF] text-white' : 'bg-[#6750A4] text-white') : (isLight ? 'bg-gray-100 text-gray-800' : 'bg-white/10 text-white')}`}>{label}</button>
                                        ))}
                                    </div>
                                </>);
                            })()}
                        </motion.div>
                    </motion.div>
                )}
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
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<{ id: number, role: 'user' | 'assistant', text: string, citations?: { source: string, snippet: string }[] }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [streamText, setStreamText] = useState("");

    const mockResponses = [
        { text: "Based on the latest SEC filings, AAPL shows substantial QoQ growth in software services revenue (+18.3%). Our sentiment models indicate 94% confidence this trend sustains through Q4, driven by strong App Store and iCloud performance.", citations: [{ source: "SEC 10-Q Filing", snippet: "Services revenue reached $23.1B..." }, { source: "Earnings Call Transcript", snippet: "Tim Cook highlighted AI integration..." }] },
        { text: "The Federal Reserve's recent minutes suggest committee members are willing to pause rate hikes if housing data continues to cool. Bond markets are pricing in a 78% probability of a hold at the next FOMC meeting.", citations: [{ source: "FOMC Minutes", snippet: "Members noted inflation moderating..." }] },
        { text: "I found 3 recent analyst upgrades for NVDA, predominantly citing strong margin expansion (+340bps) and a robust supply chain recovery. Price targets range from $950 to $1,200 with a consensus of $1,050.", citations: [{ source: "Goldman Sachs Research", snippet: "Upgrading to Conviction Buy..." }, { source: "Morgan Stanley Note", snippet: "Data center revenue exceeding..." }] },
    ];

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => { if (messages.length > 0) scrollToBottom(); }, [messages, isTyping, streamText]);

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

    const userBubble = isIOS
        ? 'bg-gradient-to-br from-[#007AFF] to-[#5856D6] text-white rounded-[22px] rounded-tr-md shadow-[0_6px_20px_rgba(0,122,255,0.3)]'
        : 'bg-gradient-to-br from-[#6750A4] to-[#9a82db] text-white rounded-[22px] rounded-tr-md shadow-[0_4px_16px_rgba(103,80,164,0.3)]';
    const botBubble = isIOS
        ? (isLight ? 'bg-white/70 backdrop-blur-xl border border-white/50 text-black rounded-[22px] rounded-tl-md shadow-[0_4px_20px_rgba(0,0,0,0.04)]' : 'bg-[#1C1C1E]/80 backdrop-blur-xl border border-white/8 text-white rounded-[22px] rounded-tl-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl border border-[#EADDFF]/50 text-[#1D192B] rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-xl border border-[#4A4458]/40 text-[#E8DEF8] rounded-[22px] rounded-tl-sm shadow-sm');
    const inputArea = isIOS
        ? (isLight ? 'bg-white/60 backdrop-blur-xl border-t border-black/5' : 'bg-[#1C1C1E]/60 backdrop-blur-xl border-t border-white/8')
        : (isLight ? 'bg-[#F3EDF7] rounded-t-[28px]' : 'bg-[#2B2930] rounded-t-[28px]');
    const inputBox = isIOS
        ? (isLight ? 'bg-black/5 rounded-full px-5 py-3 border border-black/5' : 'bg-white/8 rounded-full px-5 py-3 border border-white/8')
        : (isLight ? 'bg-[#EADDFF] text-[#1D192B] rounded-[24px] px-5 py-3' : 'bg-[#4A4458] text-[#E8DEF8] rounded-[24px] px-5 py-3');

    const prompts = [
        { icon: 'bolt', label: 'Earnings', prompt: 'Analyze AAPL Q3 Earnings Impact' },
        { icon: 'track_changes', label: 'Macro Risks', prompt: 'Macro risk factors for Q4' },
        { icon: 'topic', label: 'Filings', prompt: 'Summarize recent SEC filings' },
        { icon: 'school', label: 'Rates', prompt: 'Interest rate trend analysis' },
    ];

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
            className="absolute z-[10] inset-0 flex flex-col w-full h-full overflow-hidden pt-[110px] bg-transparent">
            {messages.length === 0 ? (
                <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto scrollbar-none">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex flex-col items-center pt-[5vh] pb-8 shrink-0">
                        <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                            <div className={`absolute inset-0 rounded-full animate-ping opacity-15 ${isIOS ? 'bg-[#007AFF]' : 'bg-[#6750A4]'}`} style={{ animationDuration: '2s', animationIterationCount: 2, animationFillMode: 'forwards' }} />
                            <div className={`w-full h-full rounded-full flex items-center justify-center shadow-2xl ${isIOS ? 'bg-gradient-to-br from-[#007AFF] to-[#5856D6]' : 'bg-[#6750A4]'}`}>
                                <Icon name="auto_awesome" className="text-4xl text-white" />
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Market Copilot</h3>
                        <p className={`text-sm text-center max-w-[240px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Ask anything about markets, earnings, filings, or macro trends.</p>
                    </motion.div>
                    <div className="w-full mt-auto pb-4 shrink-0">
                        <label className={`text-[10px] font-bold uppercase tracking-widest mb-3 block px-1 ${isLight ? 'text-black/40' : 'text-white/40'}`}>Suggested</label>
                        <div className="grid grid-cols-2 gap-2.5">
                            {prompts.map((p, i) => (
                                <motion.button key={p.label} whileTap={{ scale: 0.96 }} onClick={() => handleSend(p.prompt)}
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }}
                                    className={`flex flex-col text-left p-3.5 rounded-[18px] transition-all ${isIOS ? (isLight ? 'bg-white/60 border border-black/5' : 'bg-[#1C1C1E]/60 border border-white/8') : (isLight ? 'bg-[#E8DEF8] text-[#1D192B]' : 'bg-[#4A4458] text-[#E8DEF8]')}`}>
                                    <Icon name={p.icon} className={`mb-1.5 text-lg ${isIOS ? (isLight ? 'text-[#007AFF]' : 'text-[#0A84FF]') : ''}`} />
                                    <span className="font-semibold text-[13px]">{p.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none pb-24">
                    {messages.map(msg => (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className="flex flex-col max-w-[88%]">
                                <div className={`px-4 py-3 text-[14px] leading-relaxed ${msg.role === 'user' ? userBubble : botBubble}`}>{msg.text}</div>
                                {msg.role === 'assistant' && msg.citations && (
                                    <div className="mt-2 space-y-1.5 ml-1">
                                        {msg.citations.map((c, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
                                                className={`flex items-start space-x-2 p-2.5 rounded-xl text-[11px] ${isLight ? 'bg-indigo-50/80 border border-indigo-100' : 'bg-indigo-900/20 border border-indigo-500/15'}`}>
                                                <Icon name="verified" className={`text-sm shrink-0 mt-0.5 ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`} />
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
                    <div ref={messagesEndRef} className="pb-4" />
                </div>
            )}
            <div className={`px-4 pt-3 pb-[90px] flex items-end space-x-2 shrink-0 z-30 w-full ${inputArea}`}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about markets..." className={`flex-1 outline-none text-[14px] ${inputBox}`} />
                <button onClick={() => handleSend()} disabled={!input.trim()} className={`w-10 h-10 flex justify-center items-center shrink-0 transition-opacity disabled:opacity-40 ${isIOS ? 'bg-[#007AFF] text-white rounded-full' : 'bg-[#6750A4] text-white rounded-[14px]'}`}>
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
    const [expanded, setExpanded] = useState<number | null>(null);
    const card = isIOS
        ? (isLight ? 'bg-white/60 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/60 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]' : 'bg-[#1C1C1E]/70 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/8 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[20px] border border-[#EADDFF]/50 shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[20px] border border-[#4A4458]/40 shadow-lg');

    const alerts = [
        { id: 1, priority: 'critical', icon: 'trending_down', title: 'TSLA Dropped 5.2%', desc: 'Pre-market trading indicates a significant drop ahead of SEC quarterly earnings disclosure.', detail: 'Tesla shares fell sharply after reports of slowing EV deliveries in China and increased competition from BYD. Analyst consensus has shifted to a Hold rating.', time: '10 min ago', color: 'red' },
        { id: 2, priority: 'warning', icon: 'priority_high', title: 'Fed Rate Decision Imminent', desc: 'FOMC meeting concludes today at 2:00 PM ET with rate decision announcement.', detail: 'Markets are pricing in a 78% chance of a rate hold. Any hawkish surprise could trigger a 2-3% correction in growth stocks.', time: '32 min ago', color: 'amber' },
        { id: 3, priority: 'info', icon: 'rocket_launch', title: 'AI Sector Momentum', desc: 'NVIDIA supply chain partners report 40% surge in Q4 order fulfillment.', detail: 'SMCI, ARM, and AVGO are all reporting stronger-than-expected demand. The AI infrastructure buildout is accelerating faster than analyst models predicted.', time: '1 hour ago', color: 'emerald' },
        { id: 4, priority: 'info', icon: 'description', title: 'New SEC Filing: AAPL', desc: 'Apple filed a supplemental 8-K form regarding its services segment restructuring.', detail: 'The filing reveals Apple plans to separate its advertising revenue reporting from App Store services starting Q1 FY2026.', time: '3 hours ago', color: 'blue' },
        { id: 5, priority: 'info', icon: 'analytics', title: 'Watchlist Update: MSFT', desc: 'Microsoft surpassed analyst consensus by 12% on cloud revenue.', detail: 'Azure growth re-accelerated to 31% YoY, beating estimates of 26%. GitHub Copilot revenue exceeded $1B ARR for the first time.', time: '5 hours ago', color: 'purple' },
    ];

    const priorityBadge = (p: string) => {
        if (p === 'critical') return isLight ? 'bg-red-100 text-red-700 border-red-200' : 'bg-red-500/15 text-red-400 border-red-500/20';
        if (p === 'warning') return isLight ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-amber-500/15 text-amber-400 border-amber-500/20';
        return isLight ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-blue-500/10 text-blue-400 border-blue-500/15';
    };

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
    const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } } };

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[110px] px-4 space-y-3">
            {/* Header */}
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1 mb-1">
                <h2 className={`${isIOS ? 'text-2xl font-bold tracking-tight' : 'text-xl font-medium text-[#6750A4]'}`}>Market Alerts</h2>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${priorityBadge('critical')}`}>2 urgent</span>
            </motion.div>

            {/* Alert Cards */}
            {alerts.map((a) => (
                <motion.div key={a.id} variants={fadeUp} onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                    className={`p-4 ${card} transition-all active:scale-[0.98] cursor-pointer`}>
                    <div className="flex items-start space-x-3">
                        <div className={`w-11 h-11 shrink-0 rounded-2xl flex justify-center items-center ${a.color === 'red' ? (isLight ? 'bg-red-100 text-red-600' : 'bg-red-500/15 text-red-400') : a.color === 'amber' ? (isLight ? 'bg-amber-100 text-amber-600' : 'bg-amber-500/15 text-amber-400') : a.color === 'emerald' ? (isLight ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-500/15 text-emerald-400') : a.color === 'blue' ? (isLight ? 'bg-blue-100 text-blue-600' : 'bg-blue-500/15 text-blue-400') : (isLight ? 'bg-purple-100 text-purple-600' : 'bg-purple-500/15 text-purple-400')}`}>
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
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                                        <p className={`text-[13px] leading-relaxed mt-2 pt-2 border-t ${isLight ? 'text-gray-700 border-gray-200' : 'text-gray-300 border-white/5'}`}>{a.detail}</p>
                                        <button className={`mt-3 flex items-center space-x-1.5 text-xs font-semibold ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`}>
                                            <Icon name="auto_awesome" className="text-sm" /><span>Ask AI about this</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <span className={`text-[11px] mt-2 block font-medium ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{a.time}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// PROFILE VIEW
// ═══════════════════════════════════════════════════════════
function ProfileView({ os, theme, setTheme }: { os: string, theme: string, setTheme: (t: string) => void }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const card = isIOS
        ? (isLight ? 'bg-white/60 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/60 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.04)]' : 'bg-[#1C1C1E]/70 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/8 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]')
        : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[20px] border border-[#EADDFF]/50 shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[20px] border border-[#4A4458]/40 shadow-lg');

    const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
    const fadeUp = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } } };

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[110px] px-4 space-y-5">
            {/* Header Row */}
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1">
                <h2 className="text-xl font-bold tracking-tight">My Space</h2>
                <button onClick={() => setIsThemeModalOpen(true)} className={`w-9 h-9 rounded-full flex items-center justify-center ${isIOS ? (isLight ? 'bg-black/5' : 'bg-white/10') : 'bg-[#EADDFF]/50 dark:bg-[#4A4458]/50'}`}>
                    <Icon name="settings" className="opacity-70 text-[18px]" />
                </button>
            </motion.div>

            {/* Profile Card */}
            <motion.div variants={fadeUp} className="flex flex-col items-center py-4">
                <div className="relative mb-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden p-[3px] bg-gradient-to-tr from-indigo-400 to-purple-500 shadow-lg">
                        <div className="w-full h-full rounded-full bg-white dark:bg-black/80 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="Ali Al-Zuhairi" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Ali+Al-Zuhairi&background=f3f4f6" }} />
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-[3px] border-white dark:border-[#1C1C1E] rounded-full" />
                </div>
                <h2 className="font-bold text-2xl tracking-tight">Ali Al-Zuhairi</h2>
                <p className={`text-sm font-medium mt-0.5 ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`}>Alux Space Founder</p>
            </motion.div>

            {/* Portfolio Performance */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <div className="flex justify-between items-start mb-4">
                    <div><h4 className="font-semibold text-[15px]">Portfolio Performance</h4><p className="text-[11px] opacity-50 mt-0.5">Last 30 days</p></div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isIOS ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-[#146C2E]/10 text-[#146C2E]'}`}>+12.4%</span>
                </div>
                <div className="h-24 flex items-end justify-between gap-2 px-1 relative">
                    <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none opacity-[0.04] z-0"><div className="border-t border-current w-full h-1/3" /><div className="border-t border-current w-full h-1/3" /><div className="border-t border-current w-full h-1/3" /></div>
                    {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                        <div key={i} className="w-full h-full relative group flex items-end justify-center z-10">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                                className={`w-full max-w-[10px] rounded-t-full bg-gradient-to-t ${['from-purple-400 to-purple-600', 'from-fuchsia-400 to-fuchsia-600', 'from-pink-400 to-pink-600', 'from-rose-400 to-rose-600', 'from-orange-400 to-orange-600', 'from-amber-400 to-amber-600', 'from-indigo-400 to-indigo-600'][i]}`} />
                        </div>
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
                            <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "15, 100" }} transition={{ duration: 1.2, ease: "easeOut" }} strokeDashoffset={"-85"} strokeLinecap="round" className="text-amber-500" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "20, 100" }} transition={{ duration: 1.2, ease: "easeOut" }} strokeDashoffset={"-65"} strokeLinecap="round" className="text-rose-500" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "65, 100" }} transition={{ duration: 1.2, ease: "easeOut" }} strokeLinecap="round" className="text-[#D0BCFF]" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <span className="absolute text-[15px] font-extrabold text-[#D0BCFF]">65%</span>
                    </div>
                    <div className="flex-1 space-y-1.5">
                        {[{ label: 'Bullish', pct: '65%', color: 'bg-[#D0BCFF]' }, { label: 'Bearish', pct: '20%', color: 'bg-rose-500' }, { label: 'Neutral', pct: '15%', color: 'bg-amber-500' }].map(s => (
                            <div key={s.label} className={`flex justify-between text-[11px] items-center p-1.5 rounded-lg ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.04]'}`}>
                                <span className="opacity-70 flex items-center font-medium"><span className={`w-2 h-2 rounded-full mr-2 ${s.color}`} />{s.label}</span>
                                <span className="font-bold">{s.pct}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>



            {/* Theme Modal */}
            <AnimatePresence>
                {isThemeModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsThemeModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`relative w-[85%] max-w-sm rounded-[28px] p-6 shadow-2xl ${isIOS ? (isLight ? 'bg-white/90 backdrop-blur-xl' : 'bg-[#1C1C1E]/95 backdrop-blur-xl text-white') : (isLight ? 'bg-[#FEF7FF]' : 'bg-[#2B2930] text-[#E6E1E5]')}`}>
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-xl font-bold">App Theme</h3>
                                <button onClick={() => setIsThemeModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10"><Icon name="close" className="text-sm" /></button>
                            </div>
                            <div className="space-y-2.5">
                                {[{ value: 'light', label: 'Light', icon: 'light_mode', color: 'text-orange-500' }, { value: 'dark', label: 'Dark', icon: 'dark_mode', color: 'text-blue-400' }, { value: 'colorful', label: 'Colorful', icon: 'palette', color: 'text-purple-500' }].map(t => {
                                    const active = theme === t.value;
                                    return (
                                        <button key={t.value} onClick={() => { setTheme(t.value); setIsThemeModalOpen(false); }}
                                            className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all border ${active ? (isIOS ? (isLight ? 'bg-[#007AFF]/10 border-[#007AFF]/30' : 'bg-[#0A84FF]/20 border-[#0A84FF]/30') : (isLight ? 'bg-[#EADDFF] border-[#EADDFF]' : 'bg-[#4A4458] border-[#4A4458]')) : (isLight ? 'bg-black/[0.03] border-transparent' : 'bg-white/[0.04] border-transparent')}`}>
                                            <div className="flex items-center space-x-3">
                                                <Icon name={t.icon} className={active ? t.color : 'opacity-50'} />
                                                <span className={`font-medium ${active ? 'font-bold' : ''}`}>{t.label}</span>
                                            </div>
                                            {active && <Icon name="check_circle" className={t.color} />}
                                        </button>
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
    const navClass = isIOS
        ? (isLight ? 'bg-white/60 backdrop-blur-[20px] backdrop-saturate-[180%] border-t border-black/5 pb-5 h-[82px]' : 'bg-[#1C1C1E]/60 backdrop-blur-[20px] backdrop-saturate-[180%] border-t border-white/5 pb-5 h-[82px]')
        : (isLight ? 'bg-[#F3EDF7] h-20 pb-2 border-t border-[#EADDFF]/50' : 'bg-[#2B2930] h-20 pb-2 border-t border-[#4A4458]/50');

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
    if (isIOS) {
        return (
            <button onClick={onClick} className="flex flex-col items-center justify-center w-14 h-full pt-1 transition-transform active:scale-90">
                <span className={`material-symbols text-[26px] mb-0.5 transition-colors ${active ? 'text-[#007AFF] font-variation-fill' : (isLight ? 'text-[#8E8E93]' : 'text-[#98989D]')}`}>{icon}</span>
                <span className={`text-[10px] font-medium transition-colors ${active ? 'text-[#007AFF]' : (isLight ? 'text-[#8E8E93]' : 'text-[#98989D]')}`}>{label}</span>
            </button>
        );
    }
    const pillBg = active ? (isLight ? 'bg-[#E8DEF8]' : 'bg-[#4A4458]') : 'bg-transparent';
    const iconColor = active ? (isLight ? 'text-[#1D192B]' : 'text-[#E8DEF8]') : (isLight ? 'text-[#49454F]' : 'text-[#CAC4D0]');
    return (
        <button onClick={onClick} className="flex flex-col items-center justify-center w-16 h-full relative pt-2 transition-transform active:scale-95">
            <div className={`w-14 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${pillBg}`}>
                <span className={`material-symbols text-[22px] transition-colors ${iconColor} ${active ? 'font-variation-fill' : ''}`}>{icon}</span>
            </div>
            <span className={`text-[11px] mt-0.5 font-medium transition-colors ${iconColor}`}>{label}</span>
        </button>
    );
}
