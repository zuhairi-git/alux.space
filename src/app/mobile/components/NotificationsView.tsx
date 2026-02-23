'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, stagger, fadeUp, alerts } from '../shared';
import type { MobileTheme } from '../themes';

interface NotificationsViewProps {
    card: string;
    isLight: boolean;
    theme: MobileTheme;
}

export function NotificationsView({ card, isLight, theme }: NotificationsViewProps) {
    const [exp, setExp] = useState<number | null>(null);
    const badge = (p: string) => p === 'critical' ? (isLight ? 'bg-red-100 text-red-700 border-red-200' : 'bg-red-500/15 text-red-400 border-red-500/20') : p === 'warning' ? (isLight ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-amber-500/15 text-amber-400 border-amber-500/20') : (isLight ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-blue-500/10 text-blue-400 border-blue-500/15');
    const nt = theme.notification;

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className={`absolute inset-0 overflow-y-auto scrollbar-none pb-28 ${theme.contentPaddingTop} px-4 space-y-3`}>
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1 mb-1"><h2 className={nt.headerAccent(isLight)}>Notifications</h2><span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badge('critical')}`}>1 urgent</span></motion.div>
            {alerts.map(a => (<motion.div key={a.id} variants={fadeUp} onClick={() => setExp(exp === a.id ? null : a.id)} className={`p-4 ${card} active:scale-[0.98] cursor-pointer`}>
                <div className="flex items-start space-x-3">
                    <div className={`w-11 h-11 shrink-0 rounded-2xl flex justify-center items-center ${a.priority === 'critical' ? (isLight ? 'bg-red-100 text-red-600' : 'bg-red-500/15 text-red-400') : a.priority === 'warning' ? (isLight ? 'bg-amber-100 text-amber-600' : 'bg-amber-500/15 text-amber-400') : `${nt.infoIconBg} ${nt.infoIconColor}`}`}><Icon name={a.icon} className="text-xl" /></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1"><h3 className="font-semibold text-[14px] truncate pr-2">{a.title}</h3><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badge(a.priority)}`}>{a.priority}</span></div>
                        <p className={`text-[13px] leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{a.desc}</p>
                        <AnimatePresence>{exp === a.id && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className={`text-[13px] leading-relaxed mt-2 pt-2 border-t ${isLight ? 'text-gray-700 border-gray-200' : 'text-gray-300 border-white/5'}`}>{a.detail}</p><button className={`mt-3 flex items-center space-x-1.5 text-xs font-semibold ${nt.askAiColor}`}><Icon name="auto_awesome" className="text-sm" /><span>Ask AI about this</span></button></motion.div>}</AnimatePresence>
                        <span className={`text-[11px] mt-2 block font-medium ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{a.time}</span>
                    </div>
                </div>
            </motion.div>))}
        </motion.div>
    );
}
