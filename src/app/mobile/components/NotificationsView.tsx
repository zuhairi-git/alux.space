'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, stagger, fadeUp, alerts } from '../shared';
import type { MobileTheme } from '../themes';

interface NotificationsViewProps {
    card: string;
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
}

export function NotificationsView({ card, isLight, isColorful = false, theme }: NotificationsViewProps) {
    const [exp, setExp] = useState<number | null>(null);
    const badge = (p: string) => p === 'critical' ? (isLight ? 'bg-ds-error/10 text-ds-error border-ds-error/25' : 'bg-ds-error/15 text-ds-error border-ds-error/20') : p === 'warning' ? (isLight ? 'bg-ds-warning/10 text-ds-warning border-ds-warning/25' : 'bg-ds-warning/15 text-ds-warning border-ds-warning/20') : isColorful ? (isLight ? 'bg-primary/20 text-primary-dark border-primary/30' : 'bg-primary/15 text-primary border-primary/30') : (isLight ? 'bg-primary-100 text-primary-500 border-primary-200' : 'bg-primary-500/10 text-primary-400 border-primary-500/15');
    const nt = theme.notification;
    const headerAccentClass = isColorful
        ? (theme.platform === 'ios' ? 'text-xl font-bold tracking-tight text-primary' : 'text-xl font-medium text-primary')
        : nt.headerAccent(isLight);
    const askAiColor = isColorful ? 'text-primary' : nt.askAiColor;

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className={`absolute inset-0 overflow-y-auto scrollbar-none pb-28 ${theme.contentPaddingTop} px-5 space-y-3.5`}>
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1 mb-2"><h2 className={headerAccentClass}>Notifications</h2><span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badge('critical')}`}>1 urgent</span></motion.div>
            {alerts.map(a => (<motion.div key={a.id} variants={fadeUp} onClick={() => setExp(exp === a.id ? null : a.id)} className={`p-5 ${card} active:scale-[0.98] cursor-pointer`}>
                <div className="flex items-start space-x-3.5">
                    <div className={`w-1 self-stretch rounded-full shrink-0 ${a.priority === 'critical' ? (isLight ? 'bg-ds-error' : 'bg-ds-error/80') : a.priority === 'warning' ? (isLight ? 'bg-ds-warning' : 'bg-ds-warning/80') : (isLight ? 'bg-ds-info' : 'bg-ds-info/60')}`} />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5"><h3 className="font-semibold text-[15px] truncate pr-2">{a.title}</h3><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badge(a.priority)}`}>{a.priority}</span></div>
                        <p className={`text-[14px] leading-relaxed ${isLight ? 'text-ds-gray-600' : 'text-ds-gray-400'}`}>{a.desc}</p>
                        <AnimatePresence>{exp === a.id && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className={`text-[14px] leading-relaxed mt-3 pt-3 border-t ${isLight ? 'text-ds-gray-700 border-ds-gray-200' : 'text-ds-gray-300 border-white/5'}`}>{a.detail}</p><button className={`mt-3.5 flex items-center space-x-2 text-[13px] font-semibold ${askAiColor}`}><Icon name="auto_awesome" className="text-sm" /><span>Ask AI about this</span></button></motion.div>}</AnimatePresence>
                        <span className={`text-[12px] mt-2.5 block font-medium ${isLight ? 'text-ds-gray-400' : 'text-ds-gray-500'}`}>{a.time}</span>
                    </div>
                </div>
            </motion.div>))}
        </motion.div>
    );
}
