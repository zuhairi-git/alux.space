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
    const [activeTab, setActiveTab] = useState<TabType>('assistant');

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

    // Header Styling
    const headerClass = isIOS
        ? (isLight ? 'bg-white/70 backdrop-blur-2xl border-b border-black/5' : 'bg-black/70 backdrop-blur-2xl border-b border-white/10')
        : (isLight ? 'bg-[#F3EDF7] text-[#1D192B]' : 'bg-[#2B2930] text-[#E6E1E5]'); // Android surface variants

    const brandColor = isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]';

    return (
        <div className={`flex flex-col min-h-[100dvh] w-full relative ${bgClass} transition-colors duration-500 font-sans`}>
            {/* Header */}
            <header className={`pt-12 pb-4 px-6 flex justify-between items-end sticky top-0 z-40 transition-all duration-300 ${headerClass} ${isIOS ? '' : 'shadow-sm'}`}>
                <div className="flex flex-col">
                    <p className={`text-[10px] font-medium tracking-wider uppercase mb-1 ${isIOS ? 'text-gray-500' : 'text-[#6750A4]'}`}>Updated just now</p>
                    <h1 className={`${isIOS ? 'text-2xl font-bold tracking-tight' : 'text-[28px] font-medium tracking-normal'}`}>
                        Market<span className={isLight && !isIOS ? 'text-[#6750A4]' : brandColor}>Intelligence</span>
                    </h1>
                </div>
                <div className="flex items-center space-x-3 pb-1">
                    {/* Avatar/Profile */}
                    <button className={`w-9 h-9 rounded-full overflow-hidden border-2 ${isIOS ? 'border-transparent' : 'border-[#6750A4] p-0.5'}`}>
                        <div className="w-full h-full rounded-full bg-slate-300">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://ui-avatars.com/api/?name=AI&background=random" alt="Profile" className="w-full h-full object-cover rounded-full" />
                        </div>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-hidden w-full z-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'home' && <HomeView key="home" os={os} theme={theme} onNavigate={(tab) => setActiveTab(tab)} />}
                    {activeTab === 'alerts' && <AlertsView key="alerts" os={os} theme={theme} />}
                    {activeTab === 'profile' && <ProfileView key="profile" os={os} theme={theme} />}
                </AnimatePresence>
            </main>

            {/* Bottom Navigation */}
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} os={os} theme={theme} />

            {/* AI Assistant Overlay */}
            <AnimatePresence>
                {activeTab === 'assistant' && (
                    <AssistantView key="assistant" os={os} theme={theme} onClose={() => setActiveTab('home')} />
                )}
            </AnimatePresence>
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

    // Prompts Dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [promptSearch, setPromptSearch] = useState("");
    const allPrompts = ['AAPL Q3 Earnings Impact', 'Semiconductor Sector Sentiment', 'Macro Risk Factors Q4', 'Fed Interest Rates History', 'Global Supply Chain Risks'];
    const filteredPrompts = allPrompts.filter(p => p.toLowerCase().includes(promptSearch.toLowerCase()));

    const cardClass = isIOS
        ? (isLight ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px]' : 'bg-[#1C1C1E] rounded-[24px]')
        : (isLight ? 'bg-[#FEF7FF] rounded-[28px] shadow-md border border-[#EADDFF]/50' : 'bg-[#2B2930] rounded-[28px] shadow-lg');

    const btnClass = isIOS
        ? (isLight ? 'bg-[#F2F2F7] text-black rounded-xl font-semibold' : 'bg-[#2C2C2E] text-white rounded-xl font-semibold')
        : (isLight ? 'bg-[#E8DEF8] text-[#1D192B] rounded-full font-medium' : 'bg-[#4A4458] text-[#E8DEF8] rounded-full font-medium');

    const pillClass = isIOS
        ? (isLight ? 'bg-white border border-black/10 shadow-sm' : 'bg-[#2C2C2E] border border-white/5')
        : (isLight ? 'bg-[#F3EDF7] border border-[#79747E]' : 'bg-[#4A4458] border border-[#938F99]');

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
                    <span className="truncate flex-1 text-[15px] opacity-70 pl-1">Ask market intelligence...</span>
                    <div className={`w-8 h-8 rounded-full flex justify-center items-center ${isIOS ? 'bg-white shadow-sm' : 'bg-[#6750A4] text-white'}`}>
                        <Icon name="mic" className={`text-lg ${isIOS ? 'text-[#007AFF]' : ''}`} />
                    </div>
                </div>

                {/* Dropdown Search Wrapper */}
                <div className="w-full relative z-20">
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className={`w-full p-3.5 flex justify-between items-center rounded-xl transition-all ${pillClass}`}
                        >
                            <span className="opacity-80 font-medium text-[15px]">Select predefined prompt...</span>
                            <Icon name={dropdownOpen ? "expand_less" : "expand_more"} />
                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-60 z-50 ${isIOS ? (isLight ? 'bg-white border border-black/10' : 'bg-[#2C2C2E] border border-white/10') : (isLight ? 'bg-[#FEF7FF] border border-[#EADDFF]' : 'bg-[#2B2930] border border-[#4A4458]')}`}
                                >
                                    <div className={`p-2 border-b ${isIOS ? 'border-black/5 dark:border-white/5' : 'border-[#EADDFF] dark:border-[#4A4458]'}`}>
                                        <div className={`flex items-center px-3 rounded-lg ${isIOS ? 'bg-black/5 dark:bg-white/5' : 'bg-[#E8DEF8] dark:bg-[#4A4458]'}`}>
                                            <Icon name="search" className="text-sm opacity-50" />
                                            <input
                                                type="text"
                                                value={promptSearch}
                                                onChange={(e) => setPromptSearch(e.target.value)}
                                                placeholder="Search prompts..."
                                                className="w-full p-2 bg-transparent outline-none text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="overflow-y-auto scrollbar-none flex-1 p-2">
                                        {filteredPrompts.length === 0 ? (
                                            <div className="p-4 text-center text-sm opacity-50">No prompts found.</div>
                                        ) : (
                                            filteredPrompts.map((p, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => handlePromptSelect()}
                                                    className={`p-3 text-sm rounded-lg cursor-pointer transition-colors active:scale-95 ${isIOS ? 'active:bg-black/5 dark:active:bg-white/5' : 'active:bg-[#EADDFF]/50 dark:active:bg-[#4A4458]/50'}`}
                                                >
                                                    {p}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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

function AssistantView({ os, theme, onClose }: { os: string, theme: string, onClose: () => void }) {
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

    // Prompts Dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [promptSearch, setPromptSearch] = useState("");
    const allPrompts = ['AAPL Q3 Earnings Impact', 'Semiconductor Sector Sentiment', 'Macro Risk Factors Q4', 'Fed Interest Rates History', 'Global Supply Chain Risks'];
    const filteredPrompts = allPrompts.filter(p => p.toLowerCase().includes(promptSearch.toLowerCase()));

    const mockResponses = [
        "Analyzing the latest SEC filings... The data indicates substantial QoQ growth in software services.",
        "Based on recent macro trends, commodity prices are expected to stabilize over the next quarter.",
        "I found 3 recent analyst upgrades for that ticker, predominantly citing strong margin expansion."
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
        setDropdownOpen(false);
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
        ? (isLight ? 'bg-black/5 rounded-full px-4 py-2 border border-black/5' : 'bg-white/10 rounded-full px-4 py-2 border border-white/10')
        : (isLight ? 'bg-[#EADDFF] text-[#1D192B] rounded-[28px] px-5 py-3' : 'bg-[#4A4458] text-[#E8DEF8] rounded-[28px] px-5 py-3');

    const userBubbleClass = isIOS
        ? 'bg-[#007AFF] text-white rounded-2xl rounded-tr-sm'
        : 'bg-[#6750A4] text-white rounded-3xl rounded-tr-md';

    const botBubbleClass = isIOS
        ? (isLight ? 'bg-[#E5E5EA] text-black rounded-2xl rounded-tl-sm' : 'bg-[#2C2C2E] text-white rounded-2xl rounded-tl-sm')
        : (isLight ? 'bg-[#E8DEF8] text-[#1D192B] rounded-3xl rounded-tl-md' : 'bg-[#4A4458] text-[#E8DEF8] rounded-3xl rounded-tl-md');

    const headerClass = isIOS
        ? (isLight ? 'border-b border-black/10' : 'border-b border-white/10')
        : '';

    const pillClass = isIOS
        ? (isLight ? 'bg-white border border-black/10 shadow-sm' : 'bg-[#2C2C2E] border border-white/5')
        : (isLight ? 'bg-[#F3EDF7] border border-[#79747E]' : 'bg-[#4A4458] border border-[#938F99]');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0, stiffness: 300, damping: 30 }}
            className={`absolute z-[100] inset-0 flex flex-col w-full h-full overflow-hidden ${bgOverlayClass}`}
        >
            {/* Header */}
            <div className={`p-4 pt-14 flex justify-between items-center z-10 ${headerClass}`}>
                <div className="flex gap-2 items-center">
                    <Icon name="smart_toy" className={`text-2xl ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`} />
                    <h2 className="text-xl font-bold tracking-tight">AI Assistant</h2>
                </div>
                <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 active:scale-95 transition-transform">
                    <Icon name="close" className="text-xl" />
                </button>
            </div>

            {/* Content Area */}
            {messages.length === 0 ? (
                // Empty State / Voice Prompt UI
                <div className="flex-1 flex flex-col p-6 items-center justify-center -mt-16 relative">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex flex-col items-center mb-12 relative"
                    >
                        {/* Voice Pulse Effect */}
                        <div className={`absolute -inset-8 rounded-full opacity-20 animate-ping ${isIOS ? 'bg-[#007AFF]' : 'bg-[#6750A4]'}`} style={{ animationDuration: '3s' }} />
                        <div className={`absolute -inset-4 rounded-full opacity-40 animate-ping ${isIOS ? 'bg-[#007AFF]' : 'bg-[#6750A4]'}`} style={{ animationDuration: '2s' }} />

                        <button className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl z-10 transition-transform active:scale-90 ${isIOS ? 'bg-gradient-to-br from-[#007AFF] to-[#5856D6]' : 'bg-[#6750A4]'}`}>
                            <Icon name="mic" className="text-5xl text-white drop-shadow-md" />
                        </button>
                        <h3 className="mt-8 font-medium text-lg opacity-80">Listening...</h3>
                    </motion.div>

                    {/* Prompts Dropdown Widget */}
                    <div className="w-full max-w-sm relative z-20">
                        <label className="text-xs font-semibold uppercase tracking-wider opacity-60 ml-2 mb-2 block">Quick Prompts</label>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={`w-full p-4 flex justify-between items-center rounded-xl transition-all ${pillClass}`}
                            >
                                <span className="opacity-80 font-medium">Select predefined prompt...</span>
                                <Icon name={dropdownOpen ? "expand_less" : "expand_more"} />
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-60 z-50 ${isIOS ? (isLight ? 'bg-white border border-black/10' : 'bg-[#2C2C2E] border border-white/10') : (isLight ? 'bg-[#FEF7FF] border border-[#EADDFF]' : 'bg-[#2B2930] border border-[#4A4458]')}`}
                                    >
                                        <div className={`p-2 border-b ${isIOS ? 'border-black/5 dark:border-white/5' : 'border-[#EADDFF] dark:border-[#4A4458]'}`}>
                                            <div className={`flex items-center px-3 rounded-lg ${isIOS ? 'bg-black/5 dark:bg-white/5' : 'bg-[#E8DEF8] dark:bg-[#4A4458]'}`}>
                                                <Icon name="search" className="text-sm opacity-50" />
                                                <input
                                                    type="text"
                                                    value={promptSearch}
                                                    onChange={(e) => setPromptSearch(e.target.value)}
                                                    placeholder="Search prompts..."
                                                    className="w-full p-2 bg-transparent outline-none text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="overflow-y-auto scrollbar-none flex-1 p-2">
                                            {filteredPrompts.length === 0 ? (
                                                <div className="p-4 text-center text-sm opacity-50">No prompts found.</div>
                                            ) : (
                                                filteredPrompts.map((p, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => handleSend(p)}
                                                        className={`p-3 text-sm rounded-lg cursor-pointer transition-colors active:scale-95 ${isIOS ? 'active:bg-black/5 dark:active:bg-white/5' : 'active:bg-[#EADDFF]/50 dark:active:bg-[#4A4458]/50'}`}
                                                    >
                                                        {p}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            ) : (
                // Chat Feed
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none pb-24">
                    {messages.map(msg => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? userBubbleClass : botBubbleClass}`}>
                                {msg.text}
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
            <div className={`p-4 flex items-end space-x-2 shrink-0 z-30 w-full mb-5 ${inputAreaClass}`}>
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
        ? (isLight ? 'bg-white shadow-sm border border-black/5 rounded-[20px]' : 'bg-[#1C1C1E] rounded-[20px]')
        : (isLight ? 'bg-[#FEF7FF] rounded-[24px] border border-[#EADDFF]' : 'bg-[#2B2930] rounded-[24px]');

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
        ? (isLight ? 'bg-white shadow-sm border border-black/5 rounded-2xl' : 'bg-[#1C1C1E] rounded-2xl')
        : (isLight ? 'bg-[#FEF7FF] rounded-[24px] border border-[#EADDFF]' : 'bg-[#2B2930] rounded-[24px]');

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`absolute inset-0 overflow-y-auto p-4 pb-32 scrollbar-none ${isIOS ? 'pt-4' : 'pt-6'}`}
        >
            <div className="flex flex-col items-center mt-6 mb-10">
                <div className="relative mb-4">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-tr overflow-hidden ${isIOS ? 'from-blue-500 to-indigo-500' : 'from-[#6750A4] to-[#D0BCFF]'} p-1`}>
                        <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="https://ui-avatars.com/api/?name=AI&background=random" className="w-full h-full object-cover" alt="Profile" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white dark:border-[#1C1C1E] rounded-full"></div>
                </div>
                <h2 className={`font-bold ${isIOS ? 'text-2xl tracking-tight' : 'text-xl'}`}>Alice Investor</h2>
                <p className={`text-sm font-medium mt-1 ${isIOS ? 'text-[#007AFF]' : 'text-[#6750A4]'}`}>Pro Enterprise Tier</p>
            </div>

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
