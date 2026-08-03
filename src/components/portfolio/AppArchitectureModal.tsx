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
                        className={`relative w-full max-w-6xl h-[90vh] sm:h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border ${isLight ? 'bg-ds-gray-50 border-ds-gray-300' : 'bg-ds-gray-950 border-ds-gray-800'}`}
                    >
                        {/* Modal Header */}
                        <div className={`flex justify-between items-center p-4 sm:p-6 border-b shrink-0 ${isLight ? 'bg-white/80 border-ds-gray-200' : 'bg-black/40 border-ds-gray-800'} backdrop-blur-md z-20 relative`}>
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isColorful ? 'bg-primary-500/20 text-primary-400' : isLight ? 'bg-primary-100 text-primary-600' : 'bg-primary-900/50 text-primary-400'}`}>
                                    <Icon name="account_tree" size="lg" />
                                </div>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground">App Architecture</h3>
                                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">System Workflow Diagram</p>
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
                                <div className={`absolute top-0 -start-64 w-96 h-96 rounded-full blur-3xl opacity-20 ${isColorful ? 'bg-primary-600' : 'bg-ds-indigo-600'}`}></div>
                                <div className={`absolute bottom-0 -end-64 w-96 h-96 rounded-full blur-3xl opacity-20 ${isColorful ? 'bg-ds-success' : 'bg-ds-cyan-500'}`}></div>
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
                <Icon name={icon} size="lg" />
            </div>
            <div>
                <h3 className="font-bold text-[15px] mb-1.5 text-foreground">{title}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
            </div>
        </motion.div>
    );

    const connectorsColor = isLight ? 'border-ds-gray-300' : 'border-ds-gray-600';
    const arrowColor = isLight ? 'text-ds-gray-400' : 'text-ds-gray-500';

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative py-10 px-4 sm:px-8 z-10">

            {/* 1. Data Integrations */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <FlowNode delay={0.1} icon="article" title="News & Media" desc="Real-time global financial news streams via APIs." bgLight="bg-ds-blue-50" bgDark="bg-ds-blue-900/30" colorLight="bg-ds-blue-100 text-ds-blue-600" colorDark="bg-ds-blue-800 text-ds-blue-200" />
                <FlowNode delay={0.2} icon="account_balance" title="SEC Filings" desc="Automated parsing of 10-K, 10-Q & 8-K reports." bgLight="bg-ds-indigo-50" bgDark="bg-ds-indigo-900/30" colorLight="bg-ds-indigo-100 text-ds-indigo-600" colorDark="bg-ds-indigo-800 text-ds-indigo-200" />
                <FlowNode delay={0.3} icon="record_voice_over" title="Earnings Calls" desc="Live audio transcriptions & NLP semantic extraction." bgLight="bg-primary-50" bgDark="bg-primary-900/30" colorLight="bg-primary-100 text-primary-600" colorDark="bg-primary-800 text-primary-200" />
            </div>

            {/* Connector 1 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 start-[16.66%] end-[16.66%] border-t-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 start-[16.66%] h-1/2 border-s-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-1/2 h-full border-s-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 end-[16.66%] h-1/2 border-s-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 left-1/2 -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-s-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 2. Core Engine */}
            <div className="relative z-10 w-full flex justify-center">
                <FlowNode isLarge delay={0.4} icon="psychology" title="AI Orchestration Engine" desc="RAG pipeline that retrieves market data, summarizes dense content, and cross-references citations using LLMs." bgLight="bg-ds-fuchsia-50" bgDark="bg-ds-fuchsia-900/30" colorLight="bg-ds-fuchsia-200 text-ds-fuchsia-700" colorDark="bg-ds-fuchsia-800 text-ds-fuchsia-200" />
            </div>

            {/* Connector 2 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 start-[12.5%] end-[12.5%] border-t-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-0 left-1/2 h-1/2 border-s-[2.5px] border-dashed ${connectorsColor}`}></div>

                <div className={`absolute top-1/2 start-[12.5%] h-1/2 border-s-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 start-[37.5%] h-1/2 border-s-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 end-[37.5%] h-1/2 border-s-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute top-1/2 end-[12.5%] h-1/2 border-s-[2.5px] border-dashed ${connectorsColor}`}></div>

                <div className={`absolute bottom-0 start-[12.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 start-[37.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 end-[37.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
                <div className={`absolute bottom-0 end-[12.5%] -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-s-[2.5px] border-dashed ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 3. Features */}
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
                <FlowNode delay={0.5} icon="space_dashboard" title="Dashboard & Watchlist" desc="AI morning briefing, sparkline charts, market movers." bgLight="bg-ds-cyan-400/5" bgDark="bg-ds-cyan-500/30" colorLight="bg-ds-cyan-400/10 text-ds-cyan-500" colorDark="bg-ds-cyan-500 text-ds-cyan-400" />
                <FlowNode delay={0.6} icon="candlestick_chart" title="Live Markets" desc="Index tracking, sector heatmap, trending tickers." bgLight="bg-ds-emerald-600/5" bgDark="bg-ds-emerald-600/30" colorLight="bg-ds-emerald-600/10 text-ds-success" colorDark="bg-ds-success text-ds-emerald-400" />
                <FlowNode delay={0.7} icon="auto_awesome" title="AI Copilot" desc="Streaming responses with verified citation cards." bgLight="bg-primary/5" bgDark="bg-primary/30" colorLight="bg-primary/10 text-primary" colorDark="bg-primary-dark text-accent" />
                <FlowNode delay={0.8} icon="notifications_active" title="Smart Alerts" desc="Priority-coded, expandable, with AI follow-up." bgLight="bg-ds-pink-400/5" bgDark="bg-ds-pink-500/30" colorLight="bg-ds-pink-400/10 text-ds-pink-500" colorDark="bg-ds-pink-500 text-ds-pink-400" />
            </div>

            {/* Connector 3 */}
            <div className="hidden md:block w-full h-16 relative z-0">
                <div className={`absolute top-1/2 start-[12.5%] end-[12.5%] border-t-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute top-0 start-[12.5%] h-1/2 border-s-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 start-[37.5%] h-1/2 border-s-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 end-[37.5%] h-1/2 border-s-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute top-0 end-[12.5%] h-1/2 border-s-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute top-1/2 left-1/2 h-1/2 border-s-[2.5px] border-solid ${connectorsColor}`}></div>

                <div className={`absolute bottom-0 left-1/2 -translate-x-[6px] translate-y-1/2 text-sm ${arrowColor}`}>▼</div>
            </div>
            <div className="md:hidden h-12 relative flex justify-center w-full z-0">
                <div className={`absolute top-0 h-full border-s-[2.5px] border-solid ${connectorsColor}`}></div>
                <div className={`absolute bottom-0 -translate-x-1/2 translate-y-[6px] text-sm ${arrowColor}`}>▼</div>
            </div>

            {/* 4. End User App */}
            <div className="relative z-10 w-full flex justify-center pb-8">
                <FlowNode isLarge delay={0.9} icon="smartphone" title="Mobile Client (5-Tab Architecture)" desc="Dashboard, Markets, Copilot, Alerts & Profile — corporate-grade iOS & Android experience." bgLight="bg-ds-gray-100" bgDark="bg-ds-gray-800/90" colorLight="bg-white text-ds-gray-700 shadow-md" colorDark="bg-ds-gray-700 text-ds-gray-200 shadow-md" />
            </div>

        </div>
    );
}
