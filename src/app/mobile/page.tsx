'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const Icon = ({ name, className = "" }: { name: string, className?: string }) => (
    <span className={`material-symbols ${className}`}>{name}</span>
);

function MobilePrototypeContent() {
    type TabType = 'assistant' | 'home' | 'alerts' | 'profile';
    const searchParams = useSearchParams();
    const initialOs = searchParams.get('os') === 'android' ? 'android' : 'ios';
    const initialTheme = searchParams.get('theme') || 'dark';

    const [os] = useState<'ios' | 'android'>(initialOs);
    const [theme, setTheme] = useState(initialTheme);
    const [activeTab, setActiveTab] = useState<TabType>('home');

    // Sync theme param changes if the URL gets updated
    useEffect(() => {
        const urlTheme = searchParams.get('theme');
        if (urlTheme) setTheme(urlTheme);
    }, [searchParams]);

    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';

    // Top-level Background
    const bgClass = isLight
        ? (isIOS ? 'bg-[#F2F2F7] text-black' : 'bg-[#FAF8FC] text-[#1C1B1F]') // iOS light grey vs Android Material You surface
        : isColorful
            ? 'bg-[#050023] text-white'
            : (isIOS ? 'bg-black text-white' : 'bg-[#111114] text-[#E2E2E6]'); // True black iOS vs dark grey Android

    return (
        <div className={`flex flex-col min-h-[100dvh] w-full relative ${bgClass} transition-colors duration-500 font-sans`}>
            {/* Elegant Header Redesign */}
            <header className={`pt-12 pb-3 px-5 sticky top-0 z-40 transition-all duration-300 ${isIOS
                ? (isLight ? 'bg-white/80 backdrop-blur-3xl border-b border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-[#1C1C1E]/80 backdrop-blur-3xl border-b border-white/5 shadow-[0_2px_10px_rgba(0,0,0,0.2)]')
                : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-2xl border-b border-[#EADDFF]/50 shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-2xl border-b border-[#4A4458]/50 shadow-md')
                }`}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-3.5">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className="relative group transition-transform active:scale-95"
                        >
                            <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center overflow-hidden border-2 mb-0.5 ${isLight ? 'border-white shadow-sm' : 'border-[#2C2C2E] shadow-md'} bg-gradient-to-tr from-indigo-500 to-purple-500`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover" alt="User" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=User&background=random" }} />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[2.5px] ${isLight ? 'border-white bg-[#34C759]' : 'border-[#1C1C1E] bg-[#32D74B]'}`}></div>
                        </button>

                        <div className="flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeTab + "-sub"}
                                    initial={{ opacity: 0, y: -2 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 2 }}
                                    transition={{ duration: 0.2 }}
                                    className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${isLight ? 'text-black/40' : 'text-white/40'}`}
                                >
                                    {activeTab === 'home' ? 'Welcome Back' :
                                        activeTab === 'alerts' ? 'Live Updates' :
                                            activeTab === 'profile' ? 'Settings' : 'Copilot'}
                                </motion.span>
                            </AnimatePresence>
                            <AnimatePresence mode="wait">
                                <motion.h1
                                    key={activeTab + "-title"}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 5 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                    className={`text-[18px] font-extrabold tracking-tight leading-none ${isLight ? 'text-black' : 'text-white'}`}
                                >
                                    {activeTab === 'home' ? 'Ali Al-Zuhairi' :
                                        activeTab === 'alerts' ? 'Market Alerts' :
                                            activeTab === 'profile' ? 'Your Space' : 'AI Assistant'}
                                </motion.h1>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={() => setActiveTab('assistant')}
                            className={`relative w-10 h-10 rounded-full flex justify-center items-center transition-transform active:scale-95 ${isIOS
                                ? (isLight ? 'bg-black/5 text-black hover:bg-black/10' : 'bg-white/10 text-white hover:bg-white/20')
                                : (isLight ? 'bg-[#EADDFF]/50 text-[#1D192B] hover:bg-[#EADDFF]' : 'bg-[#4A4458]/50 text-[#E8DEF8] hover:bg-[#4A4458]')
                                }`}
                        >
                            <Icon name="auto_awesome" className="text-[20px]" />
                            <span className="absolute top-[9px] right-[9px] w-[5.5px] h-[5.5px] bg-[#FF9500] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,149,0,0.8)]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-hidden w-full z-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'home' && <HomeView key="home" os={os} theme={theme} onNavigate={(tab) => setActiveTab(tab)} />}
                    {activeTab === 'alerts' && <AlertsView key="alerts" os={os} theme={theme} />}
                    {activeTab === 'profile' && <ProfileView key="profile" os={os} theme={theme} />}
                    {activeTab === 'assistant' && <AssistantView key="assistant" os={os} theme={theme} />}
                </AnimatePresence>
            </main>

            {/* Bottom Navigation */}
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

// ---------------------------------------------------------
// View Components
// ---------------------------------------------------------

type TabType = 'assistant' | 'home' | 'alerts' | 'profile';

function HomeView({ os, theme, onNavigate }: { os: string, theme: string, onNavigate: (t: TabType) => void }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const cardClass = isIOS
        ? (isLight ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5 rounded-[24px]' : 'bg-[#1C1C1E]/80 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.2)]')
        : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[28px] shadow-sm border border-[#EADDFF]/50' : 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[28px] shadow-lg border border-[#4A4458]/50');

    const btnClass = isIOS
        ? (isLight ? 'bg-black/5 hover:bg-black/10 text-black rounded-xl font-semibold backdrop-blur-md' : 'bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold backdrop-blur-md')
        : (isLight ? 'bg-[#EADDFF]/50 hover:bg-[#EADDFF] text-[#1D192B] rounded-full font-medium' : 'bg-[#4A4458]/50 hover:bg-[#4A4458] text-[#E8DEF8] rounded-full font-medium');

    const handlePromptSelect = () => {
        // Here we could pass the prompt to the assistant view, but for now we just navigate
        onNavigate('assistant');
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 overflow-y-auto p-4 space-y-6 scrollbar-none pb-32 ${isIOS ? 'pt-4' : 'pt-6'}`}
        >
            {/* AI Assistant Entry point */}
            <div className={`p-5 shadow-sm ${isIOS ? (isLight ? 'bg-white border-black/5 rounded-3xl' : 'bg-[#1C1C1E] border-white/5 rounded-3xl') : (isLight ? 'bg-[#F3EDF7] rounded-[28px]' : 'bg-[#2B2930] rounded-[28px]')}`}>
                <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isIOS ? 'bg-[#007AFF] text-white' : 'bg-[#D0BCFF] text-[#381E72]'}`}>
                        <Icon name="smart_toy" className="text-lg" />
                    </div>
                    <h2 className={`font-semibold text-lg ${isIOS ? 'tracking-tight' : ''}`}>AI Assistant</h2>
                </div>

                {/* Search Bar with Voice */}
                <div
                    onClick={() => onNavigate('assistant')}
                    className={`flex items-center justify-between p-3.5 mb-4 rounded-xl cursor-pointer transition-all active:scale-95 ${isIOS ? (isLight ? 'bg-[#F2F2F7]' : 'bg-[#2C2C2E]') : (isLight ? 'bg-[#EADDFF] rounded-full' : 'bg-[#4A4458] rounded-full')}`}
                >
                    <span className="truncate flex-1 text-[15px] opacity-70 pl-1">Message AI...</span>
                    <div className={`w-8 h-8 rounded-full flex justify-center items-center ${isIOS ? 'bg-white shadow-sm' : 'bg-[#6750A4] text-white'}`}>
                        <Icon name="mic" className={`text-lg ${isIOS ? 'text-[#007AFF]' : ''}`} />
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="w-full relative z-20 mt-6">
                    <div className="flex justify-between items-center mb-3">
                        <label className="text-xs font-bold uppercase tracking-widest opacity-50 ml-1">Discover Topics</label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handlePromptSelect()}
                            className={`flex flex-col text-left p-4 rounded-[20px] transition-all hover:shadow-md ${isIOS ? (isLight ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-emerald-100' : 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30') : (isLight ? 'bg-[#E8DEF8] text-[#1D192B]' : 'bg-[#4A4458] text-[#E8DEF8]')}`}
                        >
                            <Icon name="bolt" className={`mb-2 text-xl ${isIOS ? (isLight ? 'text-emerald-500' : 'text-emerald-400') : ''}`} />
                            <span className={`font-semibold mb-1 text-[15px] ${isIOS ? (isLight ? 'text-emerald-900' : 'text-emerald-100') : ''}`}>Earnings</span>
                            <span className="text-[12px] opacity-70 leading-snug line-clamp-2">&quot;Analyze AAPL Q3 Impact&quot;</span>
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handlePromptSelect()}
                            className={`flex flex-col text-left p-4 rounded-[20px] transition-all hover:shadow-md ${isIOS ? (isLight ? 'bg-white border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-[#1C1C1E] border border-white/5') : (isLight ? 'bg-[#F3EDF7] text-[#1D192B]' : 'bg-[#2B2930] text-[#E6E1E5]')}`}
                        >
                            <Icon name="track_changes" className={`mb-2 text-xl ${isIOS ? (isLight ? 'text-orange-500' : 'text-orange-400') : 'text-[#B3261E]'}`} />
                            <span className="font-semibold mb-1 text-[15px]">Macro Risks</span>
                            <span className="text-[12px] opacity-70 leading-snug line-clamp-2">&quot;Risk factors for Q4&quot;</span>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Feed */}
            <div className="space-y-4">
                <h2 className={`${isIOS ? 'text-xl font-bold tracking-tight px-1' : 'text-lg font-medium px-2 text-[#6750A4]'}`}>
                    Daily Briefing
                </h2>

                <div className={`p-5 ${cardClass}`}>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 flex items-center justify-center font-bold ${isIOS ? 'rounded-2xl bg-[#007AFF]/10 text-[#007AFF]' : 'rounded-full bg-[#D0BCFF] text-[#381E72]'}`}>
                                AAPL
                            </div>
                            <div>
                                <h3 className={`font-semibold ${isIOS ? 'text-base' : 'text-lg font-medium'}`}>Apple Inc.</h3>
                                <div className={`flex items-center text-xs font-medium ${isIOS ? 'text-[#34C759]' : 'text-[#146C2E]'}`}>
                                    <Icon name="trending_up" className="text-[14px] mr-1" />
                                    +2.4% Pre-market
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={`text-sm leading-relaxed mb-4 ${isIOS ? (isLight ? 'text-gray-600' : 'text-gray-300') : (isLight ? 'text-[#49454F]' : 'text-[#CAC4D0]')}`}>
                        Supply chain reports indicate a 15% increase in component orders for the upcoming Vision Pro 2 cycle. This aligns with recent AI integration announcements.
                    </p>
                    <div className="flex space-x-2">
                        <button className={`flex-1 py-2.5 text-xs transition flex items-center justify-center ${btnClass}`}>
                            <Icon name="summarize" className="text-[16px] mr-1.5" />
                            Summary
                        </button>
                    </div>
                </div>

                <div className={`p-5 ${cardClass}`}>
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 flex items-center justify-center font-bold ${isIOS ? 'rounded-2xl bg-[#AF52DE]/10 text-[#AF52DE]' : 'rounded-full bg-[#F2B8B5] text-[#601410]'}`}>
                                FED
                            </div>
                            <div>
                                <h3 className={`font-semibold ${isIOS ? 'text-base' : 'text-lg font-medium'}`}>Federal Reserve</h3>
                                <div className={`flex items-center text-xs font-medium ${isIOS ? 'text-[#AF52DE]' : 'text-[#8C1D18]'}`}>
                                    <Icon name="info" className="text-[14px] mr-1" />
                                    Interest Rates
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={`text-sm leading-relaxed ${isIOS ? (isLight ? 'text-gray-600' : 'text-gray-300') : (isLight ? 'text-[#49454F]' : 'text-[#CAC4D0]')}`}>
                        Committee members signaled a willingness to pause rate hikes in the next quarter due to cooling inflation data in the housing sector.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function AssistantView({ os, theme }: { os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const bgOverlayClass = isLight
        ? (isIOS ? 'bg-white/95 backdrop-blur-3xl' : 'bg-[#FAF8FC]/98 backdrop-blur-2xl')
        : isColorful
            ? 'bg-[#050023]/95 backdrop-blur-3xl'
            : (isIOS ? 'bg-black/95 backdrop-blur-3xl' : 'bg-[#111114]/98 backdrop-blur-2xl');

    const [messages, setMessages] = useState<{ id: number, role: 'user' | 'assistant', text: string }[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const allPrompts = [
        'Analyze AAPL Q3 Earnings Impact',
        'Summarize SEC filings on semiconductor constraints',
        'Macro risk factors for Q4 according to the Fed',
        'Global supply chain risks affecting TSLA',
        'Provide insights on interest rate history'
    ];

    const mockResponses = [
        "Analyzing the latest SEC filings... The data indicates substantial QoQ growth in software services. Our sentiment models show a 94% confidence that this trend will sustain through Q4.",
        "Based on recent macro trends, commodity prices are expected to stabilize over the next quarter. The Federal Reserve's recent minutes suggest members are willing to pause rate hikes if housing data continues to cool.",
        "I found 3 recent analyst upgrades for that ticker, predominantly citing strong margin expansion and a surprisingly robust supply chain recovery against global headwinds."
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages, isTyping]);

    const handleSend = (overrideText?: string) => {
        const txt = overrideText || input;
        if (!txt.trim()) return;
        const newMsg = { id: Date.now(), role: 'user' as const, text: txt };
        setMessages(prev => [...prev, newMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                role: 'assistant' as const,
                text: mockResponses[Math.floor(Math.random() * mockResponses.length)]
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    // Styling
    const inputAreaClass = isIOS
        ? (isLight ? 'bg-white/90 backdrop-blur-xl border-t border-black/5' : 'bg-black/90 backdrop-blur-xl border-t border-white/10')
        : (isLight ? 'bg-[#F3EDF7] rounded-t-[32px] pt-4 px-4 pb-0' : 'bg-[#2B2930] rounded-t-[32px] pt-4 px-4 pb-0');

    const textInputClass = isIOS
        ? (isLight ? 'bg-black/5 rounded-full px-5 py-3 border border-black/5 text-[15px]' : 'bg-white/10 rounded-full px-5 py-3 border border-white/10 text-[15px]')
        : (isLight ? 'bg-[#EADDFF] text-[#1D192B] rounded-[28px] px-6 py-3.5 text-[15px]' : 'bg-[#4A4458] text-[#E8DEF8] rounded-[28px] px-6 py-3.5 text-[15px]');

    const userBubbleClass = isIOS
        ? 'bg-gradient-to-br from-[#007AFF] to-[#5856D6] text-white rounded-3xl rounded-tr-md shadow-[0_8px_16px_rgba(0,122,255,0.25)]'
        : 'bg-gradient-to-br from-[#6750A4] to-[#B3261E] text-white rounded-3xl rounded-tr-md shadow-[0_4px_12px_rgba(103,80,164,0.3)]';

    const botBubbleClass = isIOS
        ? (isLight ? 'bg-white/60 backdrop-blur-xl border border-white/40 text-black rounded-3xl rounded-tl-md shadow-[0_8px_30px_rgb(0,0,0,0.06)]' : 'bg-[#1C1C1E]/60 backdrop-blur-xl border border-white/10 text-white rounded-3xl rounded-tl-md shadow-[0_8px_30px_rgb(0,0,0,0.2)]')
        : (isLight ? 'bg-[#FEF7FF]/80 backdrop-blur-xl border border-[#EADDFF]/50 text-[#1D192B] rounded-3xl rounded-tl-sm shadow-sm' : 'bg-[#2B2930]/80 backdrop-blur-xl border border-[#4A4458]/50 text-[#E8DEF8] rounded-3xl rounded-tl-sm shadow-sm');

    const headerClass = isIOS
        ? (isLight ? 'border-b border-black/5' : 'border-b border-white/5')
        : '';



    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={`absolute z-[10] inset-0 flex flex-col w-full h-full overflow-hidden pb-[84px] ${bgOverlayClass}`}
        >
            {/* Header */}
            <div className={`p-4 flex justify-between items-center shrink-0 ${headerClass} ${isIOS ? 'pt-4' : 'pt-6'}`}>
                <div className="flex gap-2 items-center">
                    <Icon name="smart_toy" className={`text-2xl ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`} />
                    <h2 className="text-xl font-bold tracking-tight">AI Assistant</h2>
                </div>
            </div>

            {/* Content Area */}
            {messages.length === 0 ? (
                // Empty State / Voice Prompt UI
                <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto mobile-scrollbar">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex flex-col items-center pt-[6vh] pb-10 shrink-0"
                    >
                        {/* Voice Pulse Effect Wrapper */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className={`absolute inset-0 rounded-full opacity-20 animate-ping ${isIOS ? 'bg-[#007AFF]' : 'bg-[#6750A4]'}`} style={{ animationDuration: '1.5s', animationIterationCount: 2, animationFillMode: 'forwards' }} />
                            <div className={`absolute inset-0 rounded-full opacity-40 animate-ping ${isIOS ? 'bg-[#007AFF]' : 'bg-[#6750A4]'}`} style={{ animationDuration: '1s', animationIterationCount: 2, animationDelay: '0.2s', animationFillMode: 'forwards' }} />

                            <button className={`relative w-full h-full rounded-full flex items-center justify-center shadow-2xl z-10 transition-transform active:scale-90 ${isIOS ? 'bg-gradient-to-br from-[#007AFF] to-[#5856D6]' : 'bg-[#6750A4]'}`}>
                                <Icon name="mic" className="text-5xl text-white drop-shadow-md" />
                            </button>
                        </div>
                        <h3 className={`mt-8 font-medium text-lg opacity-80 ${isIOS ? 'pt-8' : ''}`}>Listening...</h3>
                    </motion.div>

                    {/* Prompts Layout Widget */}
                    <div className="w-full relative z-20 px-2 mt-auto pb-4 shrink-0">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-50">Topics</label>
                            <button className={`text-xs font-semibold ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`}>See All</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <motion.button
                                whileTap={{ scale: 0.96 }}
                                onClick={() => handleSend(allPrompts[0])}
                                className={`flex flex-col text-left p-4 rounded-[20px] transition-all hover:shadow-md ${isIOS ? (isLight ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-emerald-100' : 'bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30') : (isLight ? 'bg-[#E8DEF8] text-[#1D192B]' : 'bg-[#4A4458] text-[#E8DEF8]')}`}
                            >
                                <Icon name="bolt" className={`mb-2 text-xl ${isIOS ? (isLight ? 'text-emerald-500' : 'text-emerald-400') : ''}`} />
                                <span className={`font-semibold mb-1 text-[15px] ${isIOS ? (isLight ? 'text-emerald-900' : 'text-emerald-100') : ''}`}>Earnings</span>
                                <span className="text-[12px] opacity-70 leading-snug line-clamp-2">&quot;Analyze AAPL Q3 Impact&quot;</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.96 }}
                                onClick={() => handleSend(allPrompts[2])}
                                className={`flex flex-col text-left p-4 rounded-[20px] transition-all hover:shadow-md ${isIOS ? (isLight ? 'bg-white border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-[#1C1C1E] border border-white/5') : (isLight ? 'bg-[#F3EDF7] text-[#1D192B]' : 'bg-[#2B2930] text-[#E6E1E5]')}`}
                            >
                                <Icon name="track_changes" className={`mb-2 text-xl ${isIOS ? (isLight ? 'text-orange-500' : 'text-orange-400') : 'text-[#B3261E]'}`} />
                                <span className="font-semibold mb-1 text-[15px]">Macro Risks</span>
                                <span className="text-[12px] opacity-70 leading-snug line-clamp-2">&quot;Risk factors for Q4&quot;</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.96 }}
                                onClick={() => handleSend(allPrompts[1])}
                                className={`flex flex-col text-left p-4 rounded-[20px] transition-all hover:shadow-md ${isIOS ? (isLight ? 'bg-white border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-[#1C1C1E] border border-white/5') : (isLight ? 'bg-[#F3EDF7] text-[#1D192B]' : 'bg-[#2B2930] text-[#E6E1E5]')}`}
                            >
                                <Icon name="topic" className={`mb-2 text-xl ${isIOS ? (isLight ? 'text-purple-500' : 'text-purple-400') : 'text-[#6750A4]'}`} />
                                <span className="font-semibold mb-1 text-[15px]">Filings</span>
                                <span className="text-[12px] opacity-70 leading-snug line-clamp-2">&quot;Summarize SEC filings&quot;</span>
                            </motion.button>

                            <motion.button
                                whileTap={{ scale: 0.96 }}
                                onClick={() => handleSend(allPrompts[4])}
                                className={`flex flex-col text-left p-4 rounded-[20px] transition-all hover:shadow-md ${isIOS ? (isLight ? 'bg-white border border-black/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]' : 'bg-[#1C1C1E] border border-white/5') : (isLight ? 'bg-[#F3EDF7] text-[#1D192B]' : 'bg-[#2B2930] text-[#E6E1E5]')}`}
                            >
                                <Icon name="school" className={`mb-2 text-xl ${isIOS ? (isLight ? 'text-blue-500' : 'text-blue-400') : 'text-[#006A6A]'}`} />
                                <span className="font-semibold mb-1 text-[15px]">Rates</span>
                                <span className="text-[12px] opacity-70 leading-snug line-clamp-2">&quot;Interest rate history&quot;</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            ) : (
                // Chat Feed
                <div className="flex-1 overflow-y-auto p-4 space-y-4 mobile-scrollbar pb-24">
                    {messages.map(msg => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex flex-col">
                                <div className={`max-w-[85%] px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? userBubbleClass + ' self-end' : botBubbleClass + ' self-start'}`}>
                                    {msg.text}
                                </div>
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center space-x-2 mt-2 ml-1 text-xs opacity-70">
                                        <button className={`flex items-center space-x-1 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${isIOS ? (isLight ? 'bg-black/5 hover:bg-black/10' : 'bg-white/10 hover:bg-white/20') : (isLight ? 'bg-[#EADDFF]/50 hover:bg-[#EADDFF]' : 'bg-[#4A4458]/50 hover:bg-[#4A4458]')}`}>
                                            <Icon name="ios_share" className="text-[14px]" />
                                            <span>Share</span>
                                        </button>
                                        <button className={`flex items-center space-x-1 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${isIOS ? (isLight ? 'bg-black/5 hover:bg-black/10' : 'bg-white/10 hover:bg-white/20') : (isLight ? 'bg-[#EADDFF]/50 hover:bg-[#EADDFF]' : 'bg-[#4A4458]/50 hover:bg-[#4A4458]')}`}>
                                            <Icon name="groups" className="text-[14px]" />
                                            <span>Connect</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className={`px-4 py-3 flex space-x-1 shadow-sm ${botBubbleClass}`}>
                                <div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" />
                                <div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="pb-4" />
                </div>
            )}

            {/* Always Input area for typing manually */}
            <div className={`p-4 flex items-end space-x-2 shrink-0 z-30 w-full mb-[76px] sm:mb-[84px] ${inputAreaClass}`}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Message AI..."
                    className={`flex-1 outline-none ${textInputClass}`}
                />
                <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className={`w-11 h-11 flex justify-center items-center shrink-0 transition-opacity disabled:opacity-50 shadow-sm ${isIOS ? 'bg-[#007AFF] text-white rounded-full' : 'bg-[#6750A4] text-white rounded-[16px]'}`}
                >
                    <Icon name="arrow_upward" className="text-xl" />
                </button>
            </div>
        </motion.div>
    );
}

function AlertsView({ os, theme }: { os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';

    const cardClass = isIOS
        ? (isLight ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5 rounded-[20px]' : 'bg-[#1C1C1E]/80 backdrop-blur-xl border border-white/10 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.2)]')
        : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[24px] border border-[#EADDFF]/50 shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[24px] border border-[#4A4458]/50 shadow-lg');

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`absolute inset-0 overflow-y-auto p-4 space-y-4 pb-32 scrollbar-none ${isIOS ? 'pt-4' : 'pt-6'}`}
        >
            <h2 className={`${isIOS ? 'text-2xl font-bold tracking-tight px-1' : 'text-xl font-medium px-2 text-[#6750A4]'}`}>
                Market Alerts
            </h2>
            <div className={`p-4 ${cardClass} flex items-start space-x-4`}>
                <div className="w-12 h-12 shrink-0 rounded-full bg-red-500/10 text-red-500 flex justify-center items-center">
                    <Icon name="trending_down" className="text-2xl" />
                </div>
                <div>
                    <h3 className="font-semibold text-[15px] mb-1">TSLA Dropped 5%</h3>
                    <p className={`text-sm ${isLight ? (isIOS ? 'text-gray-500' : 'text-[#49454F]') : 'opacity-70'}`}>
                        Pre-market trading indicates a significant drop ahead of the upcoming SEC quarterly earnings disclosure.
                    </p>
                    <p className="text-xs font-semibold opacity-50 mt-2 uppercase tracking-wide">10 mins ago</p>
                </div>
            </div>

            <div className={`p-4 ${cardClass} flex items-start space-x-4`}>
                <div className="w-12 h-12 shrink-0 rounded-full bg-green-500/10 text-green-500 flex justify-center items-center">
                    <Icon name="rocket_launch" className="text-2xl" />
                </div>
                <div>
                    <h3 className="font-semibold text-[15px] mb-1">AI Sector Boom</h3>
                    <p className={`text-sm ${isLight ? (isIOS ? 'text-gray-500' : 'text-[#49454F]') : 'opacity-70'}`}>
                        NVIDIA supply chain partners report a 40% surge in Q4 order fulfillments.
                    </p>
                    <p className="text-xs font-semibold opacity-50 mt-2 uppercase tracking-wide">3 hours ago</p>
                </div>
            </div>
        </motion.div>
    );
}

function ProfileView({ os, theme }: { os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';

    const cardClass = isIOS
        ? (isLight ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5 rounded-[20px]' : 'bg-[#1C1C1E]/80 backdrop-blur-xl border border-white/10 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.2)]')
        : (isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[24px] border border-[#EADDFF]/50 shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[24px] border border-[#4A4458]/50 shadow-lg');

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`absolute inset-0 overflow-y-auto p-4 pb-32 scrollbar-none ${isIOS ? 'pt-4' : 'pt-6'}`}
        >
            <div className={`p-4 flex justify-between items-center shrink-0 mb-2 ${isIOS ? (isLight ? 'border-b border-black/5' : 'border-b border-white/5') : ''}`}>
                <h2 className="text-xl font-bold tracking-tight">Profile</h2>
                <div className="flex gap-3">
                    <Icon name="settings" className="opacity-70 text-xl" />
                </div>
            </div>

            <div className="flex flex-col items-center mt-4 mb-8">
                <div className="relative mb-4">
                    <div className={`w-28 h-28 rounded-full bg-gradient-to-tr overflow-hidden ${isIOS ? 'from-blue-500 to-indigo-500' : 'from-[#6750A4] to-[#D0BCFF]'} p-1 shadow-lg`}>
                        <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/me/ali.png" className="w-full h-full object-cover" alt="Ali Al-Zuhairi" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Ali+Al-Zuhairi&background=random" }} />
                        </div>
                    </div>
                    <div className="absolute bottom-1 right-1 w-7 h-7 bg-green-500 border-[3px] border-white dark:border-[#1C1C1E] rounded-full shadow-sm"></div>
                </div>
                <h2 className={`font-bold ${isIOS ? 'text-[26px] tracking-tight' : 'text-2xl'}`}>Ali Al-Zuhairi</h2>
                <p className={`text-[15px] font-medium mt-1 drop-shadow-sm ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`}>Alux Space Founder</p>
            </div>

            {/* My Dashboards Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className={`${isIOS ? 'text-lg font-bold tracking-tight' : 'text-base font-medium text-[#6750A4]'}`}>My Dashboards</h3>
                    <button className={`text-xs font-semibold ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`}>Edit</button>
                </div>

                <div className="space-y-4">
                    {/* Graph Card 1 */}
                    <div className={`p-5 relative overflow-hidden ${cardClass}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-semibold text-[15px]">Portfolio Performance</h4>
                                <p className="text-xs opacity-60 mt-0.5">Last 30 days</p>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${isIOS ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-[#146C2E]/10 text-[#146C2E]'}`}>+12.4%</span>
                        </div>

                        {/* Mock Graph Bars */}
                        <div className="h-24 flex items-end justify-between gap-1.5 px-1 mt-6">
                            {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                                <div key={i} className="w-full h-full relative group flex items-end">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className={`w-full rounded-t-md transition-all group-hover:opacity-80 shadow-sm ${i === 6 ? (isIOS ? 'bg-[#007AFF]' : 'bg-[#6750A4]') : (isLight ? 'bg-black/20' : 'bg-white/20')}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Graph Card 2 */}
                    <div className={`p-5 relative overflow-hidden ${cardClass}`}>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-semibold text-[15px]">Market Sentiment</h4>
                                <p className="text-xs opacity-60 mt-0.5">Real-time aggregate</p>
                            </div>
                        </div>

                        {/* Mock Donut Chart / Progress */}
                        <div className="flex items-center space-x-6 mt-4">
                            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                    <path className={isLight ? "text-black/5" : "text-white/5"} stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <motion.path
                                        initial={{ strokeDasharray: "0, 100" }}
                                        animate={{ strokeDasharray: "75, 100" }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={isIOS ? "text-[#AF52DE]" : "text-[#D0BCFF]"} stroke="currentColor" strokeWidth="4" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <span className="absolute text-sm font-bold">75%</span>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="opacity-70 flex items-center"><span className={`w-2 h-2 rounded-full mr-1.5 ${isIOS ? 'bg-[#AF52DE]' : 'bg-[#D0BCFF]'}`}></span>Bullish</span>
                                    <span className="font-semibold">75%</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="opacity-70 flex items-center"><span className={`w-2 h-2 rounded-full mr-1.5 ${isLight ? 'bg-black/10' : 'bg-white/10'}`}></span>Bearish</span>
                                    <span className="font-semibold">25%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Options */}
            <div className="space-y-3">
                <button className={`w-full p-4 flex justify-between items-center transition-transform active:scale-95 ${cardClass}`}>
                    <div className="flex items-center space-x-3">
                        <Icon name="tune" className="opacity-70" />
                        <span className="font-medium text-[15px]">Preferences</span>
                    </div>
                    <Icon name="chevron_right" className="opacity-40" />
                </button>
                <button className={`w-full p-4 flex justify-between items-center transition-transform active:scale-95 ${cardClass}`}>
                    <div className="flex items-center space-x-3">
                        <Icon name="security" className="opacity-70" />
                        <span className="font-medium text-[15px]">Security & Login</span>
                    </div>
                    <Icon name="chevron_right" className="opacity-40" />
                </button>
                <button className={`w-full p-4 flex justify-between items-center transition-transform active:scale-95 ${cardClass}`}>
                    <div className="flex items-center space-x-3 text-red-500">
                        <Icon name="logout" className="" />
                        <span className="font-medium text-[15px]">Sign Out</span>
                    </div>
                </button>
            </div>
        </motion.div>
    );
}

// ---------------------------------------------------------
// Navigation Components
// ---------------------------------------------------------

function BottomNav({ activeTab, setActiveTab, os, theme }: { activeTab: string, setActiveTab: (t: TabType) => void, os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';

    const navClass = isIOS
        ? (isLight ? 'bg-white/80 backdrop-blur-2xl border-t border-black/5 pb-5 h-20' : 'bg-[#1C1C1E]/80 backdrop-blur-2xl border-t border-white/5 pb-5 h-20')
        : (isLight ? 'bg-[#F3EDF7] h-20 pb-2 border-t border-[#EADDFF]/50' : 'bg-[#2B2930] h-20 pb-2 border-t border-[#4A4458]/50');

    return (
        <nav className={`absolute bottom-0 w-full flex justify-around items-center px-2 z-40 transition-all duration-300 ${navClass}`}>
            <NavBtn icon="home" label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} os={os} theme={theme} />
            <NavBtn icon="smart_toy" label="Assistant" active={activeTab === 'assistant'} onClick={() => setActiveTab('assistant')} os={os} theme={theme} />
            <NavBtn icon="notifications" label="Alerts" active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} os={os} theme={theme} />
            <NavBtn icon="sentiment_satisfied" label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} os={os} theme={theme} />
        </nav>
    );
}

function NavBtn({ icon, label, active, onClick, os, theme }: { icon: string, label: string, active: boolean, onClick: () => void, os: string, theme: string }) {
    const isIOS = os === 'ios';
    const isLight = theme === 'light';

    // iOS Style: Blue active, grey inactive. Text is smaller.
    if (isIOS) {
        return (
            <button onClick={onClick} className="flex flex-col items-center justify-center w-16 h-full pt-1 transition-transform active:scale-90">
                <span className={`material-symbols text-[28px] mb-0.5 transition-colors ${active ? 'text-[#007AFF] font-variation-fill' : (isLight ? 'text-[#8E8E93]' : 'text-[#98989D]')}`}>
                    {icon}
                </span>
                <span className={`text-[10px] font-medium transition-colors tracking-wide ${active ? 'text-[#007AFF]' : (isLight ? 'text-[#8E8E93]' : 'text-[#98989D]')}`}>
                    {label}
                </span>
            </button>
        );
    }

    // Android Style (Material You): Pill active background, active icon inside pill.
    const androidPillBg = active ? (isLight ? 'bg-[#E8DEF8]' : 'bg-[#4A4458]') : 'bg-transparent';
    const androidIconColor = active ? (isLight ? 'text-[#1D192B]' : 'text-[#E8DEF8]') : (isLight ? 'text-[#49454F]' : 'text-[#CAC4D0]');

    return (
        <button onClick={onClick} className="flex flex-col items-center justify-center w-20 h-full relative pt-2 transition-transform active:scale-95">
            <div className={`w-16 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${androidPillBg}`}>
                <span className={`material-symbols text-2xl transition-colors ${androidIconColor} ${active ? 'font-variation-fill' : ''}`}>
                    {icon}
                </span>
            </div>
            <span className={`text-[12px] mt-1 font-medium transition-colors ${androidIconColor}`}>
                {label}
            </span>
        </button>
    );
}
