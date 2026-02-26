'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Icon, stagger, fadeUp } from '../shared';
import type { MobileTheme } from '../themes';

interface ProfileViewProps {
    card: string;
    isLight: boolean;
    isColorful?: boolean;
    themeMode: string;
    setThemeMode: (t: string) => void;
    theme: MobileTheme;
}

export function ProfileView({ card, isLight, isColorful = false, themeMode, setThemeMode, theme }: ProfileViewProps) {
    const [modal, setModal] = useState(false);
    const p = theme.profile;
    const modalBgClass = isColorful
        ? `${theme.radii.modal} p-6 shadow-2xl bg-[#1a0040] text-white`
        : `${theme.radii.modal} p-6 shadow-2xl ${p.modalBg(isLight)}`;
    const modalActiveItemClass = isColorful
        ? 'bg-purple-500/20 border border-purple-500/30'
        : p.modalActiveItem(isLight);
    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className={`absolute inset-0 overflow-y-auto scrollbar-none pb-28 ${theme.contentPaddingTop} px-4 space-y-5`}>
            {/* Header */}
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1"><h2 className={`text-xl font-bold ${theme.platform === 'ios' ? 'tracking-tight' : ''}`}>{theme.titles.profile.title}</h2><button onClick={() => setModal(true)} className={`w-9 h-9 rounded-full flex items-center justify-center ${p.settingsBg(isLight)}`}><Icon name="settings" className="opacity-70 text-[18px]" /></button></motion.div>

            {/* Avatar */}
            <motion.div variants={fadeUp} className="flex flex-col items-center py-4">
                <div className="relative mb-3">
                    <div className={`w-24 h-24 rounded-full overflow-hidden p-[3px] bg-gradient-to-tr ${theme.platform === 'android' ? 'from-[#6750A4] to-[#D0BCFF]' : 'from-[#007AFF] to-[#5856D6]'} shadow-lg`}>
                        <div className={`w-full h-full rounded-full overflow-hidden relative ${isLight ? 'bg-white' : 'bg-black/80'}`}>
                            <Image
                                src="/images/me/ali.png"
                                className="object-cover scale-110"
                                alt="Ali"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=Ali&background=${theme.accent.fallbackAvatar.replace('#', '')}&color=fff` }}
                            />
                        </div>
                    </div>
                    <div className={`absolute bottom-0 right-0 w-6 h-6 bg-[${theme.accent.success}] border-[3px] rounded-full ${theme.platform === 'android' ? (isLight ? 'border-[#FAF8FC]' : 'border-[#111114]') : (isLight ? 'border-[#F2F2F7]' : 'border-black')}`} />
                </div>
                <h2 className="font-bold text-2xl">Ali Al-Zuhairi</h2>
                <p className={`text-sm font-medium mt-0.5 ${p.roleColor}`}>Platform Lead</p>
            </motion.div>

            {/* Collaboration Stats */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <div className="flex justify-between items-start mb-4"><div><h4 className="font-semibold text-[15px]">Collaboration Stats</h4><p className="text-[11px] opacity-50 mt-0.5">This month</p></div><span className={`text-xs font-bold px-2 py-1 rounded-lg ${p.statBadge}`}>+22%</span></div>
                <div className="h-24 flex items-end justify-between gap-2 px-1">{[40, 65, 45, 80, 55, 90, 75].map((h, i) => (<div key={i} className="w-full h-full flex items-end justify-center"><motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }} className={`w-full max-w-[10px] rounded-t-full bg-gradient-to-t ${p.barGradients[i]}`} /></div>))}</div>
            </motion.div>

            {/* Team Engagement */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <h4 className="font-semibold text-[15px] mb-4">Team Engagement</h4>
                <div className="flex items-center space-x-5"><div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-[72px] h-[72px] -rotate-90" viewBox="0 0 36 36"><path className={isLight ? "text-gray-200" : "text-white/10"} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "72, 100" }} transition={{ duration: 1.2 }} strokeLinecap="round" className={p.donutPrimary} stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "18, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-72" strokeLinecap="round" className="text-rose-500" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "10, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-90" strokeLinecap="round" className="text-amber-500" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                    <span className={`absolute text-[15px] font-extrabold ${p.donutLabel}`}>72%</span></div>
                    <div className="flex-1 space-y-1.5">{[{ l: 'Active', pe: '72%', c: p.engagementActiveBg }, { l: 'Reviewing', pe: '18%', c: 'bg-rose-500' }, { l: 'Idle', pe: '10%', c: 'bg-amber-500' }].map(s => (<div key={s.l} className={`flex justify-between text-[11px] items-center p-1.5 rounded-lg ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.04]'}`}><span className="opacity-70 flex items-center font-medium"><span className={`w-2 h-2 rounded-full mr-2 ${s.c}`} />{s.l}</span><span className="font-bold">{s.pe}</span></div>))}</div>
                </div>
            </motion.div>

            {/* Theme Picker Modal */}
            <AnimatePresence>{modal && <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-auto"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" /><motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className={`relative w-[85%] max-w-sm ${modalBgClass}`}>
                <div className="flex justify-between items-center mb-5"><h3 className="text-xl font-bold">App Theme</h3><button onClick={() => setModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"><Icon name="close" className="text-sm" /></button></div>
                <div className="space-y-2.5">{[{ v: 'light', l: 'Light', i: 'light_mode', c: 'text-orange-500' }, { v: 'dark', l: 'Dark', i: 'dark_mode', c: 'text-blue-400' }, { v: 'colorful', l: 'Colorful', i: 'palette', c: 'text-purple-500' }].map(t => { const a = themeMode === t.v; return (<button key={t.v} onClick={() => { setThemeMode(t.v); setModal(false); }} className={`w-full flex items-center justify-between p-3.5 ${theme.platform === 'android' ? 'rounded-2xl border' : 'rounded-[14px] transition-all'} ${a ? modalActiveItemClass : (theme.platform === 'android' ? 'bg-transparent border-transparent' : '')}`}><div className="flex items-center space-x-3"><Icon name={t.i} className={a ? t.c : 'opacity-50'} /><span className={a ? 'font-bold' : 'font-medium'}>{t.l}</span></div>{a && <Icon name="check_circle" className={p.checkColor || t.c} />}</button>); })}</div>
            </motion.div></div>}</AnimatePresence>
        </motion.div>
    );
}
