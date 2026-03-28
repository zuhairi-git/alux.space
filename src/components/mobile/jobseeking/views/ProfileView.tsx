import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';

interface ViewProps {
    card?: string;
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
    themeMode: string;
    setThemeMode: (mode: string) => void;
}

type ActivePanel = 'cv' | 'shifts' | 'analytics' | null;

export function ProfileView({ card, isLight, isColorful, theme, themeMode, setThemeMode }: ViewProps) {
    const settingsBgClass = isColorful ? 'bg-white/10' : theme.profile.settingsBg(isLight);
    const [activePanel, setActivePanel] = useState<ActivePanel>(null);
    const sheetBg = isColorful ? 'bg-[#06040c]/97 backdrop-blur-2xl' : theme.workspace.sheetBg(isLight);

    // CV skills state
    const [skills, setSkills] = useState(['Customer Service', 'Barista', 'Event Staff']);
    const allSkills = ['Customer Service', 'Bartending', 'Barista', 'Sales', 'Event Staff', 'Driving', 'Catering'];
    const [bio, setBio] = useState('Motivated hospitality professional with 3+ years of weekend and part-time experience.');

    // Shifts state
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const slots = ['Morn', 'Aft', 'Eve', 'All'];
    const slotFull: Record<string, string> = { Morn: 'Morning', Aft: 'Afternoon', Eve: 'Evening', All: 'All Day' };
    const slotColors: Record<string, string> = { Morn: 'bg-ds-ember', Aft: 'bg-[#3b82f6]', Eve: 'bg-[#a855f7]', All: 'bg-[#06b6d4]' };
    const [availability, setAvailability] = useState<Record<string, string[]>>({
        Mon: [], Tue: [], Wed: ['Eve'], Thu: [], Fri: ['Eve'], Sat: ['All'], Sun: ['All']
    });
    const toggleSlot = (day: string, slot: string) => {
        setAvailability(prev => {
            const cur = prev[day] ?? [];
            return { ...prev, [day]: cur.includes(slot) ? cur.filter(s => s !== slot) : [...cur, slot] };
        });
    };

    const profileScore = skills.length >= 5 ? 91 : skills.length >= 3 ? 68 : 45;
    const inputBg = isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]';

    const sectionVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 26, mass: 0.8 } }
    };

    // Analytics data
    const analyticsStats = [
        { label: 'Profile Views', value: '142', icon: 'visibility', color: 'text-[#22d3ee]', bg: 'bg-[#06b6d4]/15' },
        { label: 'Applications', value: '7', icon: 'send', color: 'text-blue-400', bg: 'bg-blue-500/15' },
        { label: 'Avg Match', value: '88%', icon: 'target', color: 'text-purple-400', bg: 'bg-purple-500/15' },
    ];

    return (
        <div className={`h-full w-full overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>

            {/* ─── Profile Card ─── */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible"
                className={`${card} p-6 flex flex-col items-center mb-5 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#06b6d4]/10 to-transparent pointer-events-none" />
                {/* Avatar + score ring */}
                <div className="relative mb-4">
                    <div className="relative w-[88px] h-[88px]">
                        <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 88 88">
                            <circle cx="44" cy="44" r="40" fill="none" stroke={isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} strokeWidth="4" />
                            <motion.circle cx="44" cy="44" r="40" fill="none" stroke="url(#pScoreGrad)" strokeWidth="4" strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 40}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - profileScore / 100) }}
                                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.15 }}
                            />
                            <defs>
                                <linearGradient id="pScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#6366f1" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className={`absolute inset-[6px] ${theme.platform === 'ios' ? 'rounded-[18px]' : 'rounded-full'} bg-gradient-to-tr from-[#3b82f6] to-[#22d3ee] overflow-hidden border-2 ${theme.accent.avatarBorder(isLight)}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="Ali Al-Zuhairi" />
                        </div>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-xl flex items-center justify-center text-[11px] font-black text-white shadow-lg ${profileScore >= 80 ? 'bg-[#06b6d4]' : 'bg-ds-ember'}`}>{profileScore}</div>
                </div>
                <h2 className={`text-[22px] font-bold tracking-tight mb-0.5`}>Ali Al-Zuhairi</h2>
                <div className={`text-[14px] font-medium mb-4 ${theme.profile.roleColor}`}>Hospitality & Retail Enthusiast</div>
                <div className="flex space-x-2.5 w-full">
                    {[{ label: 'Jobs Saved', value: '12' }, { label: 'Applications', value: '7' }, { label: 'Avg Match', value: '88%' }].map((s, i) => (
                        <div key={i} className={`flex flex-col items-center p-3 rounded-2xl flex-1 ${settingsBgClass}`}>
                            <span className="font-bold text-[17px]">{s.value}</span>
                            <span className="text-[11px] opacity-60 text-center leading-tight">{s.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ─── Action Cards ─── */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="grid grid-cols-3 gap-2.5 mb-5">
                {[
                    { key: 'cv' as ActivePanel, icon: 'description', label: 'Update CV', grad: 'from-[#06b6d4] to-[#3b82f6]', bg: 'from-[#06b6d4]/15 to-[#3b82f6]/15' },
                    { key: 'shifts' as ActivePanel, icon: 'event', label: 'Shifts', grad: 'from-[#ff8c42] to-[#d96820]', bg: 'from-[#ff8c42]/15 to-[#d96820]/15' },
                    { key: 'analytics' as ActivePanel, icon: 'insights', label: 'Stats', grad: 'from-purple-500 to-fuchsia-500', bg: 'from-purple-500/15 to-fuchsia-500/15' },
                ].map((a, i) => (
                    <motion.button key={i} whileTap={{ scale: 0.94 }} onClick={() => setActivePanel(a.key)}
                        className={`flex flex-col items-center p-4 rounded-[20px] bg-gradient-to-br ${a.bg} border ${isLight ? 'border-black/5' : 'border-white/8'} active:brightness-110`}>
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${a.grad} flex items-center justify-center mb-2 shadow-sm`}>
                            <Icon name={a.icon} className="text-[16px] text-white" />
                        </div>
                        <span className="text-[12px] font-bold text-center leading-tight">{a.label}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* ─── CV Preview ─── */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-5">
                <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="text-[15px] font-bold">CV Summary</h3>
                    <button onClick={() => setActivePanel('cv')} className={`text-[12px] font-bold ${isColorful ? 'text-[#e879f9]' : isLight ? 'text-[#06b6d4]' : 'text-[#22d3ee]'}`}>Edit</button>
                </div>
                <div className={`${card} p-4`}>
                    <p className={`text-[13px] leading-relaxed mb-3 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                        {skills.map((s, i) => (
                            <span key={i} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${isColorful ? 'bg-[#06b6d4]/20 text-[#22d3ee]' : isLight ? 'bg-[#22d3ee]/15 text-[#06b6d4]' : 'bg-[#06b6d4]/15 text-[#22d3ee]'}`}>{s}</span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ─── Availability Preview ─── */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-5">
                <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="text-[15px] font-bold">Availability</h3>
                    <button onClick={() => setActivePanel('shifts')} className={`text-[12px] font-bold ${isColorful ? 'text-fuchsia-400' : isLight ? 'text-[#d96820]' : 'text-[#ffb07a]'}`}>Edit</button>
                </div>
                <div className={`${card} overflow-hidden p-4`}>
                    <div className="space-y-2">
                        {days.map((day, i) => {
                            const slots_ = availability[day] ?? [];
                            return (
                                <div key={i} className="flex items-center gap-2">
                                    <span className={`w-8 text-[12px] font-bold ${isLight ? 'text-gray-400' : 'text-white/30'}`}>{day}</span>
                                    <div className="flex gap-1.5 flex-1">
                                        {slots_.length === 0 ? (
                                            <span className={`text-[11px] ${isLight ? 'text-gray-300' : 'text-white/20'}`}>—</span>
                                        ) : slots_.map((s, j) => (
                                            <span key={j} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold text-white ${slotColors[s] ?? 'bg-gray-500'}`}>{slotFull[s] ?? s}</span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* ─── Analytics Preview ─── */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-5">
                <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="text-[15px] font-bold">Analytics</h3>
                    <button onClick={() => setActivePanel('analytics')} className={`text-[12px] font-bold ${isColorful ? 'text-fuchsia-400' : isLight ? 'text-purple-500' : 'text-purple-400'}`}>Details</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {analyticsStats.map((s, i) => (
                        <div key={i} className={`${card} p-3 flex flex-col items-center text-center`}>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 ${s.bg}`}>
                                <Icon name={s.icon} className={`text-[14px] ${s.color}`} />
                            </div>
                            <span className="font-black text-[18px] leading-tight">{s.value}</span>
                            <span className={`text-[10px] leading-tight ${isLight ? 'text-gray-500' : 'text-white/40'}`}>{s.label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ─── App Settings ─── */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-8">
                <h3 className="text-[15px] font-bold tracking-wider uppercase opacity-60 mb-3 px-2">App Appearance</h3>
                <div className={`${card} overflow-hidden`}>
                    {[
                        { label: 'Light Theme', value: 'light', icon: 'light_mode' },
                        { label: 'Dark Theme', value: 'dark', icon: 'dark_mode' },
                        { label: 'Colorful Theme', value: 'colorful', icon: 'palette' }
                    ].map((t, i) => (
                        <button key={i} onClick={() => setThemeMode(t.value)}
                            className={`w-full flex items-center justify-between p-4 active:bg-black/5 dark:active:bg-white/5 transition-colors ${i !== 0 ? 'border-t border-black/5 border-white/5' : ''}`}
                        >
                            <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${themeMode === t.value ? theme.profile.engagementActiveBg : theme.profile.settingsBg(isLight)}`}>
                                    <Icon name={t.icon} className={`text-[18px] ${themeMode === t.value ? 'text-white' : ''}`} />
                                </div>
                                <span className={`text-[16px] font-medium ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>{t.label}</span>
                            </div>
                            {themeMode === t.value && <Icon name="check" className={`text-[20px] ${theme.platform === 'ios' ? 'text-blue-500' : 'text-purple-500'}`} />}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* ─── Panel Sheets ─── */}
            <AnimatePresence>
                {activePanel && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActivePanel(null)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`absolute bottom-0 left-0 right-0 ${theme.platform === 'ios' ? 'rounded-t-[32px]' : 'rounded-t-[28px]'} p-6 pb-10 max-h-[88vh] overflow-y-auto no-scrollbar ${sheetBg}`}>
                            <div className="w-10 h-1 rounded-full bg-gray-400/30 mx-auto mb-5" />
                            <button onClick={() => setActivePanel(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center active:scale-95">
                                <Icon name="close" className="text-[16px] opacity-60" />
                            </button>

                            {/* CV Panel */}
                            {activePanel === 'cv' && (
                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className="flex items-center mb-5">
                                        <div className="w-9 h-9 rounded-2xl bg-[#06b6d4]/20 flex items-center justify-center mr-3">
                                            <Icon name="edit_document" className="text-[18px] text-[#22d3ee]" />
                                        </div>
                                        <div>
                                            <h3 className="text-[18px] font-bold">Update CV</h3>
                                            <p className={`text-[11px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Profile score: <span className="text-[#22d3ee] font-bold">{profileScore}%</span></p>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mb-5">
                                        <div className={`px-4 py-3 rounded-2xl ${inputBg}`}>
                                            <span className="text-[10px] opacity-50 block mb-1 uppercase tracking-wide">Bio</span>
                                            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full bg-transparent outline-none text-[13px] leading-relaxed resize-none" />
                                        </div>
                                        <div className={`px-4 py-3 rounded-2xl ${inputBg}`}>
                                            <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Skills (tap to toggle)</span>
                                            <div className="flex flex-wrap gap-2">
                                                {allSkills.map(s => (
                                                    <button key={s} onClick={() => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                                                        className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors active:scale-95 ${skills.includes(s) ? 'bg-[#06b6d4] text-white' : (isLight ? 'bg-black/5 text-gray-600' : 'bg-white/8 text-gray-300')}`}>{s}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setActivePanel(null)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[15px] font-bold active:scale-95">Save Profile</button>
                                </motion.div>
                            )}

                            {/* Shifts Panel */}
                            {activePanel === 'shifts' && (
                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className="flex items-center mb-4">
                                        <div className="w-9 h-9 rounded-2xl bg-ds-ember/20 flex items-center justify-center mr-3">
                                            <Icon name="schedule" className="text-[18px] text-[#ffb07a]" />
                                        </div>
                                        <h3 className="text-[18px] font-bold">Manage Shifts</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {slots.map(s => <div key={s} className="flex items-center gap-1.5"><div className={`w-2.5 h-2.5 rounded-full ${slotColors[s]}`} /><span className={`text-[11px] font-medium ${isLight ? 'text-gray-500' : 'text-white/50'}`}>{slotFull[s]}</span></div>)}
                                    </div>
                                    <div className="space-y-2 mb-5">
                                        {days.map(day => (
                                            <div key={day} className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.04]'}`}>
                                                <span className={`w-8 text-[13px] font-bold ${isLight ? 'text-gray-500' : 'text-white/40'}`}>{day}</span>
                                                <div className="flex gap-1.5 flex-1">
                                                    {slots.map(slot => {
                                                        const active = (availability[day] ?? []).includes(slot);
                                                        return (
                                                            <button key={slot} onClick={() => toggleSlot(day, slot)}
                                                                className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all active:scale-95 ${active ? `${slotColors[slot]} text-white` : `${isLight ? 'bg-black/5 text-gray-400' : 'bg-white/8 text-white/30'}`}`}>
                                                                {slot}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setActivePanel(null)} className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ff8c42] to-[#d96820] text-white text-[15px] font-bold active:scale-95">Save Availability</button>
                                </motion.div>
                            )}

                            {/* Analytics Panel */}
                            {activePanel === 'analytics' && (
                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className="flex items-center mb-5">
                                        <div className="w-9 h-9 rounded-2xl bg-purple-500/20 flex items-center justify-center mr-3">
                                            <Icon name="insights" className="text-[18px] text-purple-400" />
                                        </div>
                                        <h3 className="text-[18px] font-bold">My Analytics</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5 mb-5">
                                        {[
                                            { label: 'Profile Views', value: '142', change: '+28%', icon: 'visibility', colorText: 'text-cyan-400', colorBg: 'bg-cyan-500/15' },
                                            { label: 'Applications', value: '7', change: '+3 this week', icon: 'send', colorText: 'text-blue-400', colorBg: 'bg-blue-500/15' },
                                            { label: 'Interviews', value: '2', change: 'Active', icon: 'record_voice_over', colorText: 'text-green-400', colorBg: 'bg-green-400/15' },
                                            { label: 'Avg Match', value: '88%', change: '+4%', icon: 'target', colorText: 'text-purple-400', colorBg: 'bg-purple-500/15' },
                                        ].map((s, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                                                className={`p-3.5 rounded-2xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.05]'}`}>
                                                <div className={`w-7 h-7 rounded-xl flex items-center justify-center mb-2 ${s.colorBg}`}>
                                                    <Icon name={s.icon} className={`text-[14px] ${s.colorText}`} />
                                                </div>
                                                <p className="text-[22px] font-black leading-none mb-1">{s.value}</p>
                                                <div className="flex items-center justify-between">
                                                    <p className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-white/40'}`}>{s.label}</p>
                                                    <span className="text-[10px] font-bold text-green-400">{s.change}</span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className={`p-4 rounded-2xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.05]'} mb-3`}>
                                        <p className="text-[13px] font-bold mb-3">Views This Week</p>
                                        <div className="flex items-end gap-1.5 h-12">
                                            {[25, 50, 40, 66, 80, 72, 90].map((v, i) => (
                                                <div key={i} className="flex-1">
                                                    <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 28 }}
                                                        className={`w-full rounded-t-lg ${i === 6 ? 'bg-cyan-500' : isColorful ? 'bg-fuchsia-500/35' : 'bg-cyan-500/30'}`}
                                                        style={{ minHeight: '3px' }} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-1.5 mt-1.5">
                                            {['M','T','W','T','F','S','S'].map((l, i) => <div key={i} className="flex-1 text-center"><span className={`text-[9px] ${i === 6 ? 'text-cyan-400 font-bold' : 'opacity-25'}`}>{l}</span></div>)}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

