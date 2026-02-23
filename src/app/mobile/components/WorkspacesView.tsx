'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, Sparkline, stagger, fadeUp, workspaces } from '../shared';
import type { MobileTheme } from '../themes';

interface WorkspacesViewProps {
    card: string;
    isLight: boolean;
    theme: MobileTheme;
}

export function WorkspacesView({ card, isLight, theme }: WorkspacesViewProps) {
    const [sel, setSel] = useState<string | null>(null);
    const ws = theme.workspace;
    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className={`absolute inset-0 ${theme.contentPaddingTop}`}>
            {/* Scrollable list */}
            <div className="overflow-y-auto scrollbar-none h-full pb-28 px-4 space-y-5">
                {/* Search Bar */}
                <motion.div variants={fadeUp}>
                    <div className={`flex items-center space-x-3 px-4 ${theme.platform === 'ios' ? 'py-2.5' : 'py-3'} ${theme.radii.search} ${ws.searchBar(isLight)}`}>
                        <Icon name="search" className={`text-lg ${theme.platform === 'ios' ? ws.searchText(isLight) : 'opacity-50'}`} />
                        <span className={`${theme.platform === 'ios' ? 'text-[16px]' : 'text-[14px]'} ${ws.searchText(isLight)}`}>{theme.platform === 'ios' ? 'Search' : 'Search workspaces...'}</span>
                    </div>
                </motion.div>

                {/* Workspace List */}
                <motion.div variants={fadeUp}>
                    <h3 className={`font-bold text-base mb-3 px-1 ${theme.platform === 'ios' ? 'tracking-tight' : ''}`}>{theme.platform === 'ios' ? 'All Spaces' : 'All Workspaces'}</h3>
                    <div className="space-y-2">
                        {workspaces.map((w, i) => (
                            <motion.button key={w.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                                onClick={() => setSel(sel === w.id ? null : w.id)} className={`w-full flex items-center justify-between p-4 ${card} active:scale-[0.98]`}>
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ws.iconBg(isLight)}`}><Icon name={w.icon} className={`text-lg ${ws.iconColor(isLight)}`} /></div>
                                    <div className="text-left"><span className="font-semibold text-[14px] block">{w.name}</span><span className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{w.members} members · {w.docs} docs</span></div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Sparkline data={w.data} color={w.activity > 70 ? ws.sparklineHigh : ws.sparklineMid} width={40} height={16} />
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${w.status === 'Active' ? ws.statusActive : w.status === 'Review' ? 'bg-amber-500/15 text-amber-400' : 'bg-gray-500/15 text-gray-400'}`}>{w.status}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Sheet — positioned absolute to the full-screen motion.div, NOT inside the scrollable area */}
            <AnimatePresence>{sel && (() => {
                const w = workspaces.find(x => x.id === sel)!; return (
                    <motion.div key="ws-sheet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[60]">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSel(null)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`absolute bottom-0 left-0 right-0 ${theme.radii.sheet} p-6 pb-10 ${ws.sheetBg(isLight)}`}>
                            <div className="w-10 h-1 rounded-full bg-gray-400/30 mx-auto mb-6" />
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${ws.iconBg(isLight)}`}><Icon name={w.icon} className={`text-2xl ${ws.iconColor(isLight)}`} /></div>
                                <div><h3 className="text-xl font-bold">{w.name}</h3><p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{w.members} members · {w.docs} docs</p></div>
                            </div>
                            <div className="mb-4 flex items-center space-x-4"><Sparkline data={w.data} color={ws.sheetAccent} width={180} height={40} /><span className="font-bold text-xl" style={{ color: ws.sheetAccent }}>{w.activity}%</span></div>
                            <div className="grid grid-cols-3 gap-3">
                                {['Open', 'Ask AI', 'Share'].map((l, i) => (<button key={l} className={`py-3 ${theme.radii.sheetButton} text-[13px] font-semibold active:scale-95 ${i === 0 ? ws.primaryButton : ws.secondaryButton(isLight)}`}>{l}</button>))}
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })()}</AnimatePresence>
        </motion.div>
    );
}
