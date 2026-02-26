'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon, Sparkline, stagger, fadeUp, workspaces, teamActivity, type TabType } from '../shared';
import type { MobileTheme } from '../themes';

interface DashboardViewProps {
    card: string;
    isLight: boolean;
    isColorful?: boolean;
    onNav: (t: TabType) => void;
    theme: MobileTheme;
}

export function DashboardView({ card, isLight, isColorful = false, onNav, theme }: DashboardViewProps) {
    const d = theme.dashboard;
    const accentColor = isColorful ? 'text-fuchsia-400' : d.briefingAccent(isLight);
    const highlightColor = isColorful ? 'text-fuchsia-300' : d.briefingHighlight;
    const followUpColor = isColorful ? 'text-fuchsia-400' : d.followUpColor;
    const seeAllColor = isColorful ? 'text-fuchsia-400' : d.seeAllColor;
    const quickActions = [
        { icon: 'edit_document', label: 'New Doc', desc: 'Create document', g: theme.platform === 'android' ? 'from-purple-500/20 to-fuchsia-500/20' : 'from-blue-500/10 to-indigo-500/10 border-blue-500/20' },
        { icon: 'groups', label: 'Join Room', desc: 'Live session', g: theme.platform === 'android' ? 'from-blue-500/20 to-cyan-500/20' : 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20' },
        { icon: 'calendar_today', label: 'Schedule', desc: 'Plan meeting', g: theme.platform === 'android' ? 'from-emerald-500/20 to-teal-500/20' : 'from-purple-500/10 to-fuchsia-500/10 border-purple-500/20' },
        { icon: 'analytics', label: 'Analytics', desc: 'View stats', g: theme.platform === 'android' ? 'from-amber-500/20 to-orange-500/20' : 'from-orange-500/10 to-amber-500/10 border-orange-500/20' },
    ];

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: 20 }} variants={stagger} className={`absolute inset-0 overflow-y-auto scrollbar-none pb-28 ${theme.contentPaddingTop} px-4 space-y-5`}>
            {/* AI Briefing Card */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <div className="flex items-center space-x-2.5 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${theme.platform === 'android' ? 'bg-[#D0BCFF]' : isColorful ? 'bg-gradient-to-br from-fuchsia-500 to-purple-600' : 'bg-gradient-to-br from-[#007AFF] to-[#5856D6]'}`}><Icon name="auto_awesome" className={`text-base ${theme.platform === 'android' ? 'text-[#381E72]' : 'text-white'}`} /></div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${accentColor}`}>AI Collaboration Briefing</span>
                </div>
                <p className={`text-[14px] leading-[1.65] ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>Your team had a <span className={`font-semibold ${highlightColor}`}>productive sprint</span> — 14 documents updated, 3 design reviews completed. Sara&apos;s design system update needs your review. <span className="font-semibold">2 pending approvals</span> in the content pipeline.</p>
                <button onClick={() => onNav('copilot')} className={`mt-3 flex items-center space-x-1.5 text-xs font-semibold ${followUpColor}`}><span>Ask follow-up</span><Icon name="arrow_forward" className="text-sm" /></button>
            </motion.div>

            {/* Workspace Activity Carousel */}
            <motion.div variants={fadeUp}>
                <div className="flex justify-between items-center mb-3 px-1"><h3 className={`font-bold text-base ${theme.platform === 'ios' ? 'tracking-tight' : ''}`}>Workspace Activity</h3><button className={`text-xs font-semibold ${seeAllColor}`}>See All</button></div>
                <div className="flex space-x-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                    {workspaces.slice(0, 4).map((ws, i) => (
                        <motion.div key={ws.id} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 400, damping: 30 }}
                            className={`shrink-0 w-[155px] p-4 ${card} active:scale-[0.97] transition-transform`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-[13px] truncate max-w-[80px]">{ws.name.split(' ')[0]}</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${ws.status === 'Active' ? theme.workspace.statusActive : ws.status === 'Review' ? 'bg-amber-500/15 text-amber-400' : 'bg-gray-500/15 text-gray-400'}`}>{ws.status}</span>
                            </div>
                            <span className={`text-[11px] block mb-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{ws.members} members</span>
                            <Sparkline data={ws.data} color={ws.activity > 70 ? theme.workspace.sparklineHigh : ws.activity > 50 ? theme.workspace.sparklineMid : theme.workspace.sparklineLow} width={120} height={28} />
                            <span className="text-[14px] font-semibold mt-2 block">{ws.activity}% active</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Team Activity */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <h3 className="font-bold text-[15px] mb-3">Team Activity</h3>
                <div className="space-y-2.5">
                    {teamActivity.map((a, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${d.teamColorMap[a.color] || 'bg-gray-500/15 text-gray-400'}`}><Icon name={a.icon} className="text-sm" /></div>
                                <span className="text-[13px] truncate"><span className="font-semibold">{a.user}</span> {a.action}</span>
                            </div>
                            <span className="text-[11px] text-gray-500 shrink-0 ml-2">{a.time}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-base mb-3 px-1">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    {quickActions.map(a => (
                        <motion.button key={a.label} whileTap={{ scale: 0.96 }} onClick={() => onNav('copilot')}
                            className={`flex flex-col text-left p-4 ${theme.platform === 'android' ? 'rounded-[20px]' : 'rounded-[18px]'} ${d.quickActionBg(isLight, a.g)}`}>
                            <Icon name={a.icon} className={`mb-2 text-xl ${d.quickActionIconColor(isLight)}`} /><span className="font-semibold text-[14px] mb-0.5">{a.label}</span><span className="text-[11px] opacity-60">{a.desc}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
