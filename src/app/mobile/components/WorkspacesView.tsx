'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, Sparkline, stagger, fadeUp, workspaces } from '../shared';
import type { MobileTheme } from '../themes';

interface WorkspacesViewProps {
    card: string;
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
    onNav?: (tab: string) => void;
}

export function WorkspacesView({ card, isLight, isColorful = false, theme, onNav }: WorkspacesViewProps) {
    const [sel, setSel] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);
    const ws = theme.workspace;
    const searchBarClass = isColorful ? 'bg-white/10 backdrop-blur-lg' : ws.searchBar(isLight);
    const sheetBgClass = isColorful ? 'bg-ds-colorful-bg/95 backdrop-blur-2xl' : ws.sheetBg(isLight);
    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className={`absolute inset-0 ${theme.contentPaddingTop}`}>
            {/* Scrollable list */}
            <div className="overflow-y-auto scrollbar-none h-full pb-28 px-5 space-y-6">
                {/* Search Bar */}
                <motion.div variants={fadeUp}>
                    <div className={`flex items-center space-x-3.5 px-5 ${theme.platform === 'ios' ? 'py-3' : 'py-3.5'} ${theme.radii.search} ${searchBarClass}`}>
                        <Icon name="search" className={`text-lg ${theme.platform === 'ios' ? ws.searchText(isLight) : 'opacity-50'}`} />
                        <span className={`${theme.platform === 'ios' ? 'text-[16px]' : 'text-[15px]'} ${ws.searchText(isLight)}`}>{theme.platform === 'ios' ? 'Search' : 'Search workspaces...'}</span>
                    </div>
                </motion.div>

                {/* Workspace List */}
                <motion.div variants={fadeUp}>
                    <h3 className={`font-bold text-[17px] mb-4 px-1 ${theme.platform === 'ios' ? 'tracking-tight' : ''}`}>{theme.platform === 'ios' ? 'All Spaces' : 'All Workspaces'}</h3>
                    <div className="space-y-3">
                        {workspaces.map((w, i) => (
                            <motion.button key={w.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                                onClick={() => setSel(sel === w.id ? null : w.id)} className={`w-full flex items-center justify-between p-4.5 ${card} active:scale-[0.98]`}>
                                <div className="flex items-center space-x-3.5">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isColorful ? 'bg-primary/20' : ws.iconBg(isLight)}`}><Icon name={w.icon} className={`text-xl ${isColorful ? 'text-primary' : ws.iconColor(isLight)}`} /></div>
                                    <div className="text-left"><span className="font-semibold text-[15px] block">{w.name}</span><span className={`text-[12px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{w.members} members · {w.docs} docs</span></div>
                                </div>
                                <div className="flex items-center space-x-2.5">
                                    <Sparkline data={w.data} color={w.activity > 70 ? ws.sparklineHigh : ws.sparklineMid} width={44} height={18} />
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${w.status === 'Active' ? ws.statusActive : w.status === 'Review' ? 'bg-ds-warning/15 text-ds-warning' : 'bg-gray-500/15 text-gray-400'}`}>{w.status}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Sheet — positioned absolute to the full-screen motion.div, NOT inside the scrollable area */}
            <AnimatePresence>{sel && (() => {
                const w = workspaces.find(x => x.id === sel)!; return (
                    <motion.div key="ws-sheet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 z-[60]">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setSel(null); setExpanded(false); }} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 340, damping: 32, mass: 1 }}
                            className={`absolute bottom-0 left-0 right-0 ${theme.radii.sheet} pt-5 pb-10 ${sheetBgClass}`}>
                            {/* Drag handle — tap to expand */}
                            <button onClick={() => setExpanded(e => !e)} className="w-full flex flex-col items-center pb-5 active:opacity-70">
                                <div className="w-10 h-1 rounded-full bg-gray-400/30" />
                                <Icon name={expanded ? 'expand_more' : 'expand_less'} className="text-[14px] opacity-30 mt-1.5" />
                            </button>
                            <div className="px-7">
                            <div className="flex items-center space-x-4 mb-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isColorful ? 'bg-primary/20' : ws.iconBg(isLight)}`}><Icon name={w.icon} className={`text-2xl ${isColorful ? 'text-primary' : ws.iconColor(isLight)}`} /></div>
                                <div><h3 className="text-xl font-bold">{w.name}</h3><p className={`text-[13px] mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{w.members} members · {w.docs} docs</p></div>
                            </div>
                            <div className="mb-5 flex items-center space-x-4"><Sparkline data={w.data} color={ws.sheetAccent} width={180} height={44} /><span className="font-bold text-xl" style={{ color: ws.sheetAccent }}>{w.activity}%</span></div>

                            {/* Expandable details */}
                            <AnimatePresence>
                            {expanded && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                                    <div className={`mb-4 p-4 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.05]'}`}>
                                        <h4 className="text-[12px] font-bold uppercase tracking-widest opacity-50 mb-3">Recent Documents</h4>
                                        {['Q4 Sprint Plan', 'Design Tokens v2', 'API Integration Notes'].map((doc, i) => (
                                            <div key={i} className="flex items-center space-x-2.5 py-2">
                                                <Icon name="description" className="text-[16px] opacity-40" />
                                                <span className="text-[14px] font-medium">{doc}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`mb-4 p-4 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.05]'}`}>
                                        <h4 className="text-[12px] font-bold uppercase tracking-widest opacity-50 mb-3">Activity</h4>
                                        {['Sara updated Design Tokens', 'James added 3 tasks', 'AI generated sprint summary'].map((act, i) => (
                                            <div key={i} className="flex items-center space-x-2.5 py-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30 shrink-0" />
                                                <span className={`text-[13px] ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{act}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`mb-4 p-4 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.05]'}`}>
                                        <h4 className="text-[12px] font-bold uppercase tracking-widest opacity-50 mb-3">Status</h4>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[13px] ${ws.statusActive} px-2 py-0.5 rounded-full font-semibold`}>{w.status}</span>
                                            <span className={`text-[12px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Updated 2h ago</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            </AnimatePresence>

                            <div className="grid grid-cols-3 gap-3.5 mt-3">
                                {['Open', 'Ask AI', 'Share'].map((l, i) => (<button key={l} onClick={() => {
                                    if (l === 'Ask AI') { setSel(null); setExpanded(false); onNav?.('copilot'); }
                                }} className={`py-3.5 ${theme.radii.sheetButton} text-[14px] font-semibold active:scale-95 ${i === 0 ? (isColorful ? 'bg-primary text-white' : ws.primaryButton) : ws.secondaryButton(isLight)}`}>{l}</button>))}
                            </div>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })()}</AnimatePresence>
        </motion.div>
    );
}
