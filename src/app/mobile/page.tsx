'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const Icon = ({ name, className = "" }: { name: string, className?: string }) => (
    <span className={`material-symbols ${className}`}>{name}</span>
);

export default function MobilePrototypePage() {
    const searchParams = useSearchParams();
    const initialOs = searchParams.get('os') === 'android' ? 'android' : 'ios';
    const [os, setOs] = useState<'ios' | 'android'>(initialOs);

    // OS-specific styling
    const isIOS = os === 'ios';
    const bgClass = isIOS ? 'bg-slate-950 text-slate-50' : 'bg-[#121212] text-[#E3E3E3]';
    const headerClass = isIOS
        ? 'backdrop-blur-md bg-slate-950/80 border-b border-white/5'
        : 'bg-[#1E1E1E] shadow-md';
    const cardClass = isIOS
        ? 'bg-slate-900/60 border border-white/5 rounded-2xl p-5 backdrop-blur-sm shadow-sm'
        : 'bg-[#1E1E1E] rounded-[28px] p-5 shadow-md border-transparent';
    const btnClass = isIOS
        ? 'bg-white/5 hover:bg-white/10 text-slate-300 py-2 rounded-xl border border-white/5'
        : 'bg-[#333333] hover:bg-[#4dd0e1]/20 text-[#4dd0e1] py-2 rounded-full font-medium';
    const inputWrapperClass = isIOS
        ? 'bg-slate-900/80 border border-white/10 rounded-2xl shadow-lg'
        : 'bg-[#1E1E1E] rounded-full shadow-md border border-[#333333]';
    const brandColor = isIOS ? 'text-indigo-400' : 'text-[#4dd0e1]';
    const accentBg = isIOS ? 'bg-indigo-500' : 'bg-[#4dd0e1]';
    const accentText = isIOS ? 'text-indigo-400' : 'text-[#4dd0e1]';

    return (
        <div className={`flex flex-col h-full ${bgClass} transition-colors duration-500`}>
            {/* Header */}
            <header className={`pt-12 pb-4 px-6 flex justify-between items-center sticky top-0 z-40 transition-all duration-300 ${headerClass}`}>
                <div>
                    <h1 className={`text-xl font-semibold tracking-tight ${isIOS ? '' : 'font-sans'}`}>
                        Market<span className={brandColor}>Intelligence</span>
                    </h1>
                    <p className="text-xs text-gray-400 font-medium tracking-wide">Updated just now</p>
                </div>
                <div className="flex items-center space-x-3">
                    {/* OS Toggle */}
                    <button
                        onClick={() => setOs(isIOS ? 'android' : 'ios')}
                        className={`text-xs px-2 py-1 rounded-md font-bold transition-colors ${isIOS ? 'bg-white/10 text-white' : 'bg-[#333] text-[#4dd0e1]'}`}
                    >
                        {isIOS ? 'iOS' : 'Android'}
                    </button>

                    {/* Notification Bell */}
                    <button className={`w-10 h-10 flex items-center justify-center relative shadow-inner overflow-hidden ${isIOS ? 'rounded-full bg-indigo-500/10 text-indigo-400' : 'rounded-full bg-[#333] text-[#4dd0e1]'}`}>
                        <Icon name="notifications" className="text-xl" />
                        <span className={`absolute top-2 right-2.5 w-2 h-2 rounded-full ${isIOS ? 'bg-red-500' : 'bg-[#ff5252]'}`}></span>
                        {isIOS && <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full"></div>}
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto px-4 py-6 pb-12 space-y-8 scrollbar-none">

                {/* Search / AI Query Box Context */}
                <section>
                    <div className="relative group">
                        {isIOS && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg transition duration-300 group-hover:blur-xl"></div>}
                        <div className={`relative flex items-center p-4 transition-all duration-300 ${inputWrapperClass}`}>
                            <Icon name="magic_button" className={`${accentText} mr-3 text-2xl`} />
                            <input
                                type="text"
                                placeholder="Ask about Q3 2025 earnings..."
                                className="bg-transparent border-none outline-none w-full text-gray-200 placeholder-gray-500 font-medium"
                                readOnly
                            />
                            <button className={`${accentBg} hover:opacity-80 text-white rounded-full p-2 ml-2 transition-opacity shadow-md ${isIOS ? 'rounded-xl' : 'rounded-full'}`}>
                                <Icon name="arrow_upward" className="text-lg block" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Personalized Feed */}
                <section className="space-y-4">
                    <div className="flex justify-between items-end px-2">
                        <h2 className="text-lg font-semibold tracking-tight">Daily Intelligence</h2>
                        <button className={`text-xs font-medium ${accentText}`}>Customize</button>
                    </div>

                    <div className="space-y-4">
                        {/* Feed Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`relative overflow-hidden transition-all duration-300 ${cardClass}`}
                        >
                            {isIOS && <div className={`absolute top-0 left-0 w-1 h-full ${accentBg}`}></div>}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 flex items-center justify-center text-xs font-bold ${isIOS ? 'rounded-lg border border-indigo-500/30 text-indigo-400 bg-indigo-500/10' : 'rounded-full bg-[#333] text-[#4dd0e1]'}`}>
                                        AAPL
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Apple Inc.</h3>
                                        <div className={`flex items-center text-xs font-medium ${isIOS ? 'text-emerald-400' : 'text-[#69f0ae]'}`}>
                                            <Icon name="trending_up" className="text-[14px] mr-1" />
                                            +2.4% Pre-market
                                        </div>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-medium px-2 py-1 ${isIOS ? 'bg-slate-800/80 text-slate-400 rounded' : 'text-gray-500'}`}>2m ago</span>
                            </div>

                            <p className="text-sm text-gray-300 leading-relaxed mb-4">
                                Supply chain reports indicate a 15% increase in component orders for the upcoming Vision Pro 2 cycle. This aligns with recent AI integration announcements.
                            </p>

                            <div className="flex space-x-2">
                                <button className={`flex-1 text-xs transition flex items-center justify-center ${btnClass}`}>
                                    <Icon name="summarize" className="text-sm mr-1" />
                                    Read Summary
                                </button>
                                <button className={`flex-1 text-xs transition flex items-center justify-center ${btnClass}`}>
                                    <Icon name="source" className="text-sm mr-1" />
                                    Sources (3)
                                </button>
                            </div>
                        </motion.div>

                        {/* Feed Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`relative overflow-hidden transition-all duration-300 ${cardClass}`}
                        >
                            {isIOS && <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 flex items-center justify-center text-xs font-bold ${isIOS ? 'rounded-lg border border-purple-500/30 text-purple-400 bg-purple-500/10' : 'rounded-full bg-[#333] text-[#b388ff]'}`}>
                                        FED
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Fed Minutes Alert</h3>
                                        <div className="flex items-center text-gray-400 text-xs font-medium">
                                            <Icon name="info" className="text-[14px] mr-1" />
                                            Interest Rates
                                        </div>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-medium px-2 py-1 ${isIOS ? 'bg-slate-800/80 text-slate-400 rounded' : 'text-gray-500'}`}>15m ago</span>
                            </div>

                            <p className="text-sm text-gray-300 leading-relaxed">
                                Committee members signaled a willingness to pause rate hikes in the next quarter due to cooling inflation data in the housing sector.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}
