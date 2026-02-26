'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';

interface ViewProps {
    card?: string;
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
    onNav?: (tab: string) => void;
}

export function DashboardView({ card, isLight, isColorful, theme, onNav }: ViewProps) {
    const accentColor = isColorful ? 'text-fuchsia-400' : theme.dashboard.briefingAccent(isLight);
    const highlightColor = isColorful ? 'text-fuchsia-300 font-semibold' : theme.dashboard.briefingHighlight;
    const followUpColor = isColorful ? 'text-fuchsia-400' : theme.dashboard.followUpColor;
    const seeAllColor = isColorful ? 'text-fuchsia-400' : theme.dashboard.seeAllColor;
    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div className={`h-full w-full overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>
            {/* AI Briefing Card */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 30 }}
                className={`${card} p-5 mb-6 relative overflow-hidden`}
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full pointer-events-none" />
                <div className="flex items-center mb-3">
                    <Icon name="auto_awesome" className={`text-[20px] mr-2 ${accentColor}`} />
                    <h2 className={`text-sm font-semibold tracking-wide uppercase ${isLight ? 'text-gray-500' : 'text-white/60'}`}>Daily Match Briefing</h2>
                </div>
                <p className="text-[17px] leading-relaxed mb-4 font-medium">
                    You have <span className={highlightColor}>3 new local jobs</span> matching your availability, and your resume score improved by 15% after recent AI tweaks.
                </p>
                <div className="flex space-x-3">
                    <button onClick={() => onNav?.('jobs')} className={`text-sm font-medium ${followUpColor} flex items-center bg-white/5 px-3 py-1.5 rounded-full active:scale-95 transition-transform`}>
                        <Icon name="work" className="text-[16px] mr-1.5" /> View Jobs
                    </button>
                    <button onClick={() => onNav?.('copilot')} className={`text-sm font-medium ${followUpColor} flex items-center bg-white/5 px-3 py-1.5 rounded-full active:scale-95 transition-transform`}>
                        <Icon name="edit_document" className="text-[16px] mr-1.5" /> Prep Interview
                    </button>
                </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <motion.div variants={listVariants} initial="hidden" animate="visible" className="grid grid-cols-2 gap-3 mb-8">
                {[
                    { icon: 'search', label: 'Local Jobs', desc: 'Browse nearby', bg: 'from-blue-500/20 to-cyan-500/20', nv: 'jobs' },
                    { icon: 'description', label: 'Update CV', desc: 'Improve profile', bg: 'from-purple-500/20 to-pink-500/20', nv: 'profile' },
                    { icon: 'schedule', label: 'Availability', desc: 'Manage shifts', bg: 'from-orange-500/20 to-amber-500/20', nv: 'profile' },
                    { icon: 'insights', label: 'Analytics', desc: 'View insights', bg: 'from-emerald-500/20 to-teal-500/20', nv: 'dashboard' },
                ].map((action, i) => (
                    <motion.button key={i} variants={itemVariants} whileTap={{ scale: 0.96 }} onClick={() => onNav?.(action.nv)}
                        className={`flex flex-col text-left p-4 ${theme.platform === 'android' ? 'rounded-[20px]' : 'rounded-[18px]'} ${theme.dashboard.quickActionBg(isLight, action.bg)}`}
                    >
                        <Icon name={action.icon as string} className={`mb-2 text-xl ${theme.dashboard.quickActionIconColor(isLight)}`} />
                        <span className="font-semibold text-[14px] mb-0.5">{action.label}</span>
                        <span className="text-[11px] opacity-60">{action.desc}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Recent Applications Feed */}
            <div className="mb-4 flex justify-between items-end">
                <h3 className={`text-[22px] font-bold tracking-tight ${theme.platform === 'ios' ? 'font-serif' : ''}`}>Recent Applications</h3>
                <button className={`text-[13px] font-semibold ${seeAllColor}`}>See All</button>
            </div>

            <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-3">
                {[
                    { company: 'Cafe Local', role: 'Weekend Barista', time: '2h ago', status: 'Applied', icon: 'local_cafe', color: 'amber' },
                    { company: 'City Events Co.', role: 'Event Staff', time: '1d ago', status: 'Interview', icon: 'celebration', color: 'purple' },
                    { company: 'Bookstore Downtown', role: 'Retail Assistant', time: '3d ago', status: 'Viewed', icon: 'menu_book', color: 'blue' }
                ].map((item, i) => (
                    <motion.div key={i} variants={itemVariants} className={`${card} p-4 flex items-center active:scale-[0.98] transition-all`}>
                        <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center mr-4 ${theme.dashboard.teamColorMap[item.color]}`}>
                            <Icon name={item.icon as string} className="text-[22px]" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-0.5">
                                <h4 className="font-semibold text-[16px] line-clamp-1">{item.role}</h4>
                                <span className={`text-[12px] whitespace-nowrap ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{item.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className={`text-[14px] line-clamp-1 ${isLight ? 'text-gray-600' : 'text-white/60'}`}>{item.company}</p>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${item.status === 'Interview' ? (isLight ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-purple-900/40 text-purple-300 border-purple-700/50') :
                                    (isLight ? 'bg-gray-100 text-gray-700 border-gray-200' : 'bg-white/10 text-white/70 border-white/10')
                                    }`}>{item.status}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
