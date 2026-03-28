'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { durationSeconds, Button, Icon } from '@/design-system';

interface AppArchitectureModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme: string;
}

export default function AppArchitectureModal({ isOpen, onClose, theme }: AppArchitectureModalProps) {
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`relative w-full max-w-6xl h-[90vh] sm:h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border ${isLight ? 'bg-gray-50 border-gray-300' : 'bg-gray-950 border-gray-800'}`}
                    >
                        {/* Modal Header */}
                        <div className={`flex justify-between items-center p-4 sm:p-6 border-b shrink-0 ${isLight ? 'bg-white/80 border-gray-200' : 'bg-black/40 border-gray-800'} backdrop-blur-md z-20 relative`}>
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isColorful ? 'bg-purple-500/20 text-purple-400' : isLight ? 'bg-purple-100 text-purple-600' : 'bg-purple-900/50 text-purple-400'}`}>
                                    <span className="material-symbols text-2xl">account_tree</span>
                                </div>
                                <div>
                                    <h3 className={`text-lg sm:text-xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>App Architecture</h3>
                                    <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>System Workflow Diagram</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                            <Button
                                    variant="icon"
                                    size="md"
                                    onClick={onClose}
                                    aria-label="Close modal"
                                >
                                    <Icon name="close" />
                                </Button>
                            </div>
                        </div>

                        {/* Diagram Content */}
                        <div className="flex-1 overflow-auto relative custom-scrollbar">
                            {/* Ambient Background Glows */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                                <div className={`absolute top-0 -left-64 w-96 h-96 rounded-full blur-3xl opacity-20 ${isColorful ? 'bg-purple-600' : 'bg-indigo-600'}`}></div>
                                <div className={`absolute bottom-0 -right-64 w-96 h-96 rounded-full blur-3xl opacity-20 ${isColorful ? 'bg-ds-success' : 'bg-cyan-500'}`}></div>
                            </div>

                            <WorkflowDiagram theme={theme} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// ------------------------------------------------------------------------------------------------
// Workflow Diagram Component (FigJam Style)
// ------------------------------------------------------------------------------------------------
function WorkflowDiagram({ theme }: { theme: string }) {
    const isLight = theme === 'light';

    const FlowNode = ({ icon, title, desc, bgLight, bgDark, colorLight, colorDark, delay = 0, isLarge = false }: { icon: string, title: string, desc: string, bgLight: string, bgDark: string, colorLight: string, colorDark: string, delay?: number, isLarge?: boolean }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ delay, duration: durationSeconds.slow, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className={`flex items-start gap-4 p-5 sm:p-6 rounded-3xl shadow-md border backdrop-blur-md w-full ${isLight ? bgLight : bgDark} ${isLight ? 'border-black/5' : 'border-white/5'} ${isLarge ? 'md:w-[450px] mx-auto' : ''} z-10 relative`}
        >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${isLight ? colorLight : colorDark}`}>
                <span className="material-symbols text-2xl">{icon}</span>
            </div>
            <div>
                <h3 className={`font-bold text-[15px] mb-1.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>{title}</h3>
                <p className={`text-[13px] leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{desc}</p>
            </div>
        </motion.div>
    );

    const connectorsColor = isLight ? 'border-gray-300' : 'border-gray-600';
    const arrowColor = isLight ? 'text-gray-400' : 'text-gray-500';

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative py-10 px-4 sm:px-8 z-10">

            {/* 1. Data Integrations */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <FlowNode delay={0.1} icon="article" title="News & Media" desc="Real-time global financial news streams via APIs." bgLight="bg-blue-50" bgDark="bg-blue-900/30" colorLight="bg-blue-100 text-blue-600" colorDark="bg-blue-800 text-blue-200" />
                <FlowNode delay={0.2} icon="account_balance" title="SEC Filings" desc="Automated parsing of 10-K, 10-Q & 8-K reports." bgLight="bg-indigo-50" bgDark="bg-indigo-900/30" colorLight="bg-indigo-100 text-indigo-600" colorDark="bg-indigo-800 text-indigo-200" />
                <FlowNode delay={0.3} icon="record_voice_over" title="Earnings Calls" desc="Live audio transcriptions & NLP semantic extraction." bgLight="bg-purple-50" bgDark="bg-purple-900/30" colorLight="bg-purple-100 text-purple-600" colorDark="bg-purple-800 text-purple-200" />
            </div>

            {/* Connector 1 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 left-[16.66%] right-[16.66%] border-t-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-[16.66%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-1/2 h-full border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 right-[16.66%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 left-1/2 -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 2. Core Engine */}
            <div className="relative z-10 w-full flex justify-center">
                <FlowNode isLarge delay={0.4} icon="psychology" title="AI Orchestration Engine" desc="RAG pipeline that retrieves market data, summarizes dense content, and cross-references citations using LLMs." bgLight="bg-fuchsia-50" bgDark="bg-fuchsia-900/30" colorLight="bg-fuchsia-200 text-fuchsia-700" colorDark="bg-fuchsia-800 text-fuchsia-200" />
            </div>

            {/* Connector 2 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 left-[12.5%] right-[12.5%] border-t-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-1/2 h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>

                <div className={`absolute top-1/2 left-[12.5%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 left-[37.5%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 right-[37.5%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 right-[12.5%] h-1/2 border-l-[2.5px] border-dashed ${connectorsColor}`}></div>

                <div className={`absolute bottom-0 left-[12.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 left-[37.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 right-[37.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 right-[12.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-l-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 3. Features */}
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
                <FlowNode delay={0.5} icon="space_dashboard" title="Dashboard & Watchlist" desc="AI morning briefing, sparkline charts, market movers." bgLight="bg-cyan-400/5" bgDark="bg-cyan-500/30" colorLight="bg-cyan-400/10 text-cyan-500" colorDark="bg-cyan-500 text-cyan-400" />
                <FlowNode delay={0.6} icon="candlestick_chart" title="Live Markets" desc="Index tracking, sector heatmap, trending tickers." bgLight="bg-green-600/5" bgDark="bg-green-600/30" colorLight="bg-green-600/10 text-ds-success" colorDark="bg-ds-success text-green-400" />
                <FlowNode delay={0.7} icon="auto_awesome" title="AI Copilot" desc="Streaming responses with verified citation cards." bgLight="bg-ds-ember/5" bgDark="bg-ds-ember/30" colorLight="bg-ds-ember/10 text-ds-ember" colorDark="bg-[var(--color-ember-dark)] text-[var(--color-ember-light)]" />
                <FlowNode delay={0.8} icon="notifications_active" title="Smart Alerts" desc="Priority-coded, expandable, with AI follow-up." bgLight="bg-pink-400/5" bgDark="bg-pink-500/30" colorLight="bg-pink-400/10 text-pink-500" colorDark="bg-pink-500 text-pink-400" />
            </div>

            {/* Connector 3 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 left-[12.5%] right-[12.5%] border-t-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute top-0 left-[12.5%] h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-[37.5%] h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 right-[37.5%] h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 right-[12.5%] h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute top-1/2 left-1/2 h-1/2 border-l-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute bottom-0 left-1/2 -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-l-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 4. End User App */}
            <div className="relative z-10 w-full flex justify-center pb-8">
                <FlowNode isLarge delay={0.9} icon="smartphone" title="Mobile Client (5-Tab Architecture)" desc="Dashboard, Markets, Copilot, Alerts & Profile — corporate-grade iOS & Android experience." bgLight="bg-slate-100" bgDark="bg-zinc-800/90" colorLight="bg-white text-slate-700 shadow-md" colorDark="bg-zinc-700 text-slate-200 shadow-md" />
            </div>

        </div>
    );
}
