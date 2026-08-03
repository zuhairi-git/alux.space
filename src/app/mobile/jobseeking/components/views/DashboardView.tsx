'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../../../shared';
import type { MobileTheme } from '../../../shared';

interface ViewProps {
    card?: string;
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
    onNav?: (tab: string) => void;
}

type ActiveSheet = 'cv' | 'shifts' | 'analytics' | null;

// ─── CV Builder Sheet ─────────────────────────────────────────────────────────
function CVBuilderSheet({ isLight, isColorful, theme, onClose }: { isLight: boolean; isColorful: boolean; theme: MobileTheme; onClose: () => void }) {
    const [step, setStep] = useState<'edit' | 'preview' | 'done'>('edit');
    const [aiOptimizing, setAiOptimizing] = useState(false);
    const [bio, setBio] = useState("Motivated and adaptable hospitality professional with 3+ years of weekend and part-time experience.");
    const skills = ['Customer Service', 'Bartending', 'Barista', 'Sales', 'Event Staff'];
    const [selectedSkills, setSelectedSkills] = useState(['Customer Service', 'Barista', 'Event Staff']);
    const inputBg = isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]';

    const runAI = () => {
        setAiOptimizing(true);
        setTimeout(() => {
            setBio("Dynamic hospitality professional with 3+ years of proven experience in high-volume customer environments. Known for exceptional service delivery, quick adaptability, and a collaborative team spirit — optimised for local part-time and weekend roles.");
            setAiOptimizing(false);
            setStep('preview');
        }, 1800);
    };

    if (step === 'done') return (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 text-center">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br from-primary-400/20 to-primary/20 flex items-center justify-center mb-4 shadow-lg`}>
                <Icon name="verified" className="text-5xl text-ds-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Profile Updated!</h3>
            <p className={`text-[13px] mb-1 ${isLight ? 'text-ds-gray-500' : 'text-white/50'}`}>Your CV score jumped from <span className="text-ds-gold-400 font-bold">68%</span> to <span className="text-ds-emerald-400 font-bold">91%</span></p>
            <div className="flex items-center gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Icon key={i} name="star" className={`text-[16px] ${i <= 4 ? 'text-ds-gold-400' : 'text-ds-gold-400/30'}`} />)}
            </div>
            <div className="flex gap-3">
                <button onClick={onClose} className="px-4 py-2.5 rounded-2xl bg-white/10 text-sm font-semibold active:scale-95">Close</button>
                <button onClick={() => onClose()} className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gradient-start to-gradient-mid text-white text-sm font-bold active:scale-95">View Profile</button>
            </div>
        </motion.div>
    );

    if (step === 'preview') return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-4">
                <button onClick={() => setStep('edit')} className="me-3 opacity-60 active:opacity-40"><Icon name="arrow_back" className="text-[20px]" /></button>
                <h3 className="text-[18px] font-bold flex-1">AI Preview</h3>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-ds-success/15 text-ds-emerald-400">+23 pts</span>
            </div>
            <div className={`p-4 rounded-2xl mb-4 ${inputBg} border border-ds-cyan-500/20`}>
                <p className={`text-[13px] leading-relaxed ${isLight ? 'text-ds-gray-700' : 'text-ds-gray-200'}`}>{bio}</p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                    <Icon name="auto_awesome" className="text-[14px] text-ds-cyan-400" />
                    <span className="text-[11px] text-ds-cyan-400 font-semibold">AI-enhanced with keywords for your target roles</span>
                </div>
            </div>
            <div className="flex gap-3">
                <button onClick={() => setStep('edit')} className={`flex-1 py-3 rounded-2xl text-[14px] font-semibold ${inputBg} active:scale-95`}>Edit Again</button>
                <button onClick={() => setStep('done')} className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-gradient-start to-gradient-mid text-white text-[14px] font-bold active:scale-95">Save Profile</button>
            </div>
        </motion.div>
    );

    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center me-3 ${isColorful ? 'bg-primary/15' : isLight ? 'bg-ds-cyan-400/15' : 'bg-ds-cyan-500/15'}`}>
                    <Icon name="edit_document" className={`text-[18px] ${isColorful ? 'text-primary' : 'text-ds-cyan-400'}`} />
                </div>
                <div>
                    <h3 className="text-[18px] font-bold">Update CV</h3>
                    <p className={`text-[11px] ${isLight ? 'text-ds-gray-400' : 'text-white/40'}`}>Current score: <span className="text-ds-gold-400 font-bold">68%</span></p>
                </div>
            </div>
            <div className="space-y-3 mb-5">
                <div className={`px-4 py-3 rounded-2xl ${inputBg}`}>
                    <span className="text-[10px] opacity-50 block mb-1 uppercase tracking-wide">Professional Bio</span>
                    <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full bg-transparent outline-none text-[13px] leading-relaxed resize-none" />
                </div>
                <div className={`px-4 py-3 rounded-2xl ${inputBg}`}>
                    <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Skills</span>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(s => (
                            <button key={s} onClick={() => setSelectedSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                                className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors active:scale-95 ${selectedSkills.includes(s) ? `${isColorful ? 'bg-primary' : 'bg-ds-cyan-500'} text-white` : (isLight ? 'bg-black/5 text-ds-gray-600' : 'bg-white/8 text-ds-gray-300')}`}>{s}</button>
                        ))}
                    </div>
                </div>
                <div className={`px-4 py-3 rounded-2xl ${inputBg}`}>
                    <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Experience</span>
                    {[{ role: 'Weekend Barista', place: 'Morning Brew Café', duration: '8 months' }, { role: 'Event Staff', place: 'City Events Co.', duration: '2 events' }].map((e, i) => (
                        <div key={i} className={`flex items-center justify-between ${i > 0 ? 'pt-2 mt-2 border-t border-white/5' : ''}`}>
                            <div><p className="text-[13px] font-semibold">{e.role}</p><p className={`text-[11px] ${isLight ? 'text-ds-gray-500' : 'text-white/40'}`}>{e.place}</p></div>
                            <span className={`text-[11px] ${isLight ? 'text-ds-gray-400' : 'text-white/30'}`}>{e.duration}</span>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={runAI} disabled={aiOptimizing}
                className={`w-full py-4 rounded-2xl text-[15px] font-bold active:scale-95 transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-gradient-start to-gradient-mid text-white ${aiOptimizing ? 'opacity-70' : ''}`}>
                {aiOptimizing ? (<><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Icon name="autorenew" className="text-[18px]" /></motion.span> AI Optimising…</>) : (<><Icon name="auto_awesome" className="text-[18px]" />Improve with AI</>)}
            </button>
        </motion.div>
    );
    void theme;
}

// ─── Shift Manager Sheet ──────────────────────────────────────────────────────
function ShiftManagerSheet({ isLight, isColorful, theme, onClose }: { isLight: boolean; isColorful: boolean; theme: MobileTheme; onClose: () => void }) {
    const [saved, setSaved] = useState(false);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [availability, setAvailability] = useState<Record<string, string[]>>({
        Mon: [], Tue: [], Wed: ['Eve'], Thu: [], Fri: ['Eve'], Sat: ['All Day'], Sun: ['All Day']
    });
    const slots = ['Morning', 'Afternoon', 'Eve', 'All Day'];
    const slotColors: Record<string, string> = { Morning: 'bg-ds-warning', Afternoon: 'bg-primary', Eve: 'bg-ds-violet-500', 'All Day': 'bg-ds-success' };

    const toggle = (day: string, slot: string) => {
        setAvailability(prev => {
            const current = prev[day] ?? [];
            return { ...prev, [day]: current.includes(slot) ? current.filter(s => s !== slot) : [...current, slot] };
        });
    };

    if (saved) return (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ds-gold-500/20 to-ds-gold-500/20 flex items-center justify-center mb-4">
                <Icon name="event_available" className="text-5xl text-ds-gold-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Availability Saved!</h3>
            <p className={`text-[13px] mb-6 ${isLight ? 'text-ds-gray-500' : 'text-white/50'}`}>Employers can now see when you&apos;re free — 3 new matches incoming!</p>
            <button onClick={onClose} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-ds-gold-500 to-ds-gold-500 text-white font-bold text-[14px] active:scale-95">Done</button>
        </motion.div>
    );

    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-4">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center me-3 ${isColorful ? 'bg-primary/20' : isLight ? 'bg-primary/10' : 'bg-primary/15'}`}>
                    <Icon name="schedule" className="text-[18px] text-ds-gold-400" />
                </div>
                <div>
                    <h3 className="text-[18px] font-bold">Manage Shifts</h3>
                    <p className={`text-[11px] ${isLight ? 'text-ds-gray-400' : 'text-white/40'}`}>Tap to toggle availability</p>
                </div>
            </div>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 mb-4">
                {slots.map(s => <div key={s} className="flex items-center gap-1.5"><div className={`w-2.5 h-2.5 rounded-full ${slotColors[s]}`} /><span className={`text-[11px] font-medium ${isLight ? 'text-ds-gray-500' : 'text-white/50'}`}>{s}</span></div>)}
            </div>
            {/* Day grid */}
            <div className="space-y-2 mb-5">
                {days.map(day => (
                    <div key={day} className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.04]'}`}>
                        <span className={`w-8 text-[13px] font-bold ${isLight ? 'text-ds-gray-500' : 'text-white/40'}`}>{day}</span>
                        <div className="flex gap-1.5 flex-1">
                            {slots.map(slot => {
                                const active = (availability[day] ?? []).includes(slot);
                                return (
                                    <button key={slot} onClick={() => toggle(day, slot)}
                                        className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all active:scale-95 ${active ? `${slotColors[slot]} text-white shadow-sm` : `${isLight ? 'bg-black/5 text-ds-gray-400' : 'bg-white/8 text-white/30'}`}`}>
                                        {slot.slice(0, 3)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => setSaved(true)} className={`w-full py-4 rounded-2xl text-[15px] font-bold active:scale-95 transition-transform bg-gradient-to-r from-ds-gold-500 to-ds-gold-500 text-white`}>
                Save Availability
            </button>
        </motion.div>
    );
    void theme; void onClose;
}

// ─── Analytics Sheet ─────────────────────────────────────────────────────────
function AnalyticsSheet({ isLight, isColorful, theme }: { isLight: boolean; isColorful: boolean; theme: MobileTheme }) {
    const stats = [
        { label: 'Profile Views', value: '142', change: '+28%', icon: 'visibility', color: isColorful ? 'text-primary' : 'text-ds-cyan-400', bg: isColorful ? 'bg-primary/15' : 'bg-ds-cyan-500/15' },
        { label: 'Applications', value: '7', change: '+3', icon: 'send', color: 'text-primary', bg: 'bg-primary/15' },
        { label: 'Interviews', value: '2', change: '↑ new', icon: 'record_voice_over', color: 'text-ds-emerald-400', bg: 'bg-ds-success/15' },
        { label: 'Avg Match', value: '88%', change: '+4%', icon: 'target', color: 'text-primary', bg: 'bg-primary/15' },
    ];
    const barData = [25, 50, 40, 66, 80, 72, 90];
    const barLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const badges = [
        { icon: 'star', label: 'Fast Responder', earned: true },
        { icon: 'military_tech', label: 'Top Matchee', earned: true },
        { icon: 'trending_up', label: 'Rising Talent', earned: false },
    ];
    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center me-3 ${isColorful ? 'bg-ds-success/20' : isLight ? 'bg-ds-emerald-600/10' : 'bg-ds-success/15'}`}>
                    <Icon name="insights" className="text-[18px] text-ds-emerald-400" />
                </div>
                <div>
                    <h3 className="text-[18px] font-bold">Your Analytics</h3>
                    <p className={`text-[11px] ${isLight ? 'text-ds-gray-400' : 'text-white/40'}`}>Last 7 days · Updated now</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
                {stats.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className={`p-3.5 rounded-2xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.05]'}`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${s.bg}`}>
                            <Icon name={s.icon} className={`text-[16px] ${s.color}`} />
                        </div>
                        <p className="text-[24px] font-black leading-none mb-1">{s.value}</p>
                        <div className="flex items-center justify-between">
                            <p className={`text-[11px] ${isLight ? 'text-ds-gray-500' : 'text-white/40'}`}>{s.label}</p>
                            <span className={`text-[10px] font-bold ${isLight ? 'text-ds-success' : 'text-ds-emerald-400'}`}>{s.change}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* Weekly chart */}
            <div className={`p-4 rounded-2xl mb-4 ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.05]'}`}>
                <p className="text-[13px] font-bold mb-3">Profile Views This Week</p>
                <div className="flex items-end gap-1.5 h-14">
                    {barData.map((v, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 28 }}
                                className={`w-full rounded-t-lg ${i === 6 ? 'bg-ds-success' : isColorful ? 'bg-ds-fuchsia-500/40' : 'bg-ds-success/35'}`}
                                style={{ minHeight: '4px' }} />
                        </div>
                    ))}
                </div>
                <div className="flex gap-1.5 mt-1.5">
                    {barLabels.map((l, i) => <div key={i} className="flex-1 text-center"><span className={`text-[10px] ${i === 6 ? 'text-ds-emerald-400 font-bold' : 'opacity-30'}`}>{l}</span></div>)}
                </div>
            </div>
            {/* Badges */}
            <div>
                <p className="text-[12px] font-bold uppercase tracking-wide opacity-50 mb-3">Achievements</p>
                <div className="flex gap-2">
                    {badges.map((b, i) => (
                        <div key={i} className={`flex-1 flex flex-col items-center p-3 rounded-2xl text-center ${b.earned ? (isColorful ? 'bg-ds-fuchsia-500/15 border border-ds-fuchsia-500/20' : isLight ? 'bg-ds-gold-600/5 border border-ds-gold-600/10' : 'bg-ds-gold-600/10 border border-ds-gold-600/20') : `${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.03]'} opacity-40`}`}>
                            <Icon name={b.icon} className={`text-[22px] mb-1 ${b.earned ? 'text-ds-gold-400' : 'opacity-30'}`} />
                            <span className="text-[10px] font-semibold leading-tight">{b.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
    void theme;
}

export function DashboardView({ card, isLight, isColorful, theme, onNav }: ViewProps) {
    const accentColor = 'text-[var(--primary)]';
    const followUpColor = 'text-[var(--primary)]';
    const seeAllColor = isColorful ? 'text-ds-fuchsia-400' : theme.dashboard.seeAllColor;
    const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);
    const sheetBg = isColorful ? 'bg-ds-colorful-bg/95 backdrop-blur-2xl' : theme.workspace.sheetBg(isLight);

    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 26, mass: 0.8 } }
    };

    const quickActions = [
        {
            key: 'cv' as ActiveSheet,
            icon: 'description',
            label: 'Update CV',
            desc: 'Improve profile',
            gradient: 'from-gradient-start to-gradient-mid',
            bg: 'from-primary/20 to-primary-dark/20',
            iconColor: isColorful ? 'text-accent' : 'text-ds-cyan-400',
            glow: isColorful ? 'shadow-primary/20' : '',
        },
        {
            key: 'shifts' as ActiveSheet,
            icon: 'event',
            label: 'Availability',
            desc: 'Manage shifts',
            gradient: 'from-ds-gold-500 to-ds-gold-500',
            bg: isColorful ? 'from-ds-gold-500/25 to-ds-gold-500/25' : isLight ? 'from-ds-gold-500/15 to-ds-gold-500/15' : 'from-ds-gold-500/20 to-ds-gold-500/20',
            iconColor: 'text-ds-gold-400',
            glow: isColorful ? 'shadow-ds-gold-500/20' : '',
        },
        {
            key: 'analytics' as ActiveSheet,
            icon: 'insights',
            label: 'Analytics',
            desc: 'View my stats',
            gradient: 'from-ds-emerald-600 to-ds-cyan-500',
            bg: isColorful ? 'from-ds-emerald-600/25 to-ds-cyan-500/25' : isLight ? 'from-ds-emerald-600/15 to-ds-cyan-500/15' : 'from-ds-emerald-600/20 to-ds-cyan-500/20',
            iconColor: 'text-ds-emerald-400',
            glow: isColorful ? 'shadow-ds-emerald-600/20' : '',
        },
        {
            key: null as ActiveSheet,
            icon: 'search',
            label: 'Browse Jobs',
            desc: 'Find local gigs',
            gradient: 'from-primary-500 to-ds-fuchsia-500',
            bg: isColorful ? 'from-primary-500/25 to-ds-fuchsia-500/25' : isLight ? 'from-primary-500/15 to-ds-fuchsia-500/15' : 'from-primary-500/20 to-ds-fuchsia-500/20',
            iconColor: 'text-primary',
            glow: isColorful ? 'shadow-primary-500/20' : '',
            navTo: 'jobs',
        },
    ];

    const profileScore = 68;

    return (
        <div className={`absolute inset-0 overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>

            {/* ─── Profile Score Hero ─── */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className={`relative overflow-hidden rounded-[28px] p-5 mb-5 bg-gradient-to-br from-primary/20 to-primary-dark/20 border border-primary/20`}
            >
                {/* Decorative blobs */}
                <div className="absolute top-0 end-0 w-28 h-28 bg-gradient-to-bl from-ds-cyan-400/20 to-transparent rounded-es-full pointer-events-none" />
                <div className="absolute bottom-0 start-0 w-20 h-20 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                <div className="flex items-center gap-4 relative z-10">
                    {/* Circular score ring */}
                    <div className="relative w-[68px] h-[68px] shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 68 68">
                            <circle cx="34" cy="34" r="28" fill="none" stroke={isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'} strokeWidth="5" />
                            <motion.circle cx="34" cy="34" r="28" fill="none"
                                stroke="url(#scoreGrad)" strokeWidth="5" strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 28}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - profileScore / 100) }}
                                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                            />
                            <defs>
                                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="var(--gradient-start)" />
                                    <stop offset="100%" stopColor="var(--gradient-mid)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-[18px] font-black leading-none ${isLight ? 'text-ds-gray-800' : 'text-white'}`}>{profileScore}</span>
                            <span className={`text-[9px] font-bold ${isLight ? 'text-ds-gray-400' : 'text-white/40'}`}>SCORE</span>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className={`text-[17px] font-extrabold tracking-tight mb-0.5 ${isLight ? 'text-ds-gray-800' : 'text-white'}`}>Hi, Ali! 👋</h2>
                        <p className={`text-[13px] mb-3 leading-tight ${isLight ? 'text-ds-gray-500' : 'text-white/50'}`}>Profile at <strong className="text-ds-cyan-400">{profileScore}%</strong> — boost it to get <em>3× more matches</em></p>
                        <button onClick={() => setActiveSheet('cv')}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-gradient-start to-gradient-mid text-white text-[12px] font-bold active:scale-95 transition-transform shadow-md">
                            <Icon name="auto_awesome" className="text-[13px]" />Improve Profile
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* ─── AI Briefing ─── */}
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 350, damping: 30 }}
                className={`${card} p-5 mb-5 relative overflow-hidden`}
            >
                <div className="absolute top-0 end-0 w-24 h-24 bg-gradient-to-bl from-ds-fuchsia-500/15 to-transparent rounded-es-full pointer-events-none" />
                <div className="flex items-center mb-3">
                    <Icon name="auto_awesome" className={`text-[18px] me-2 ${accentColor}`} />
                    <h2 className="text-[12px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">Daily Match Briefing</h2>
                </div>
                <p className="text-[16px] leading-relaxed font-semibold mb-3">
                    🎯 You have <span className="text-[var(--primary)]">3 new local jobs</span> matching your availability, and your resume score improved by <span className="text-[var(--color-success)]">+15%</span> after AI tweaks.
                </p>
                <div className="flex gap-2">
                    <button onClick={() => onNav?.('jobs')} className={`flex items-center px-3 py-1.5 rounded-full text-[12px] font-semibold ${isLight ? 'bg-black/5 text-ds-gray-700' : 'bg-white/8 text-white/70'} active:scale-95`}>
                        <Icon name="work" className="text-[14px] me-1.5" />View Jobs
                    </button>
                    <button onClick={() => onNav?.('copilot')} className={`flex items-center px-3 py-1.5 rounded-full text-[12px] font-semibold ${followUpColor} ${isLight ? 'bg-black/5' : 'bg-white/8'} active:scale-95`}>
                        <Icon name="smart_toy" className="text-[14px] me-1.5" />Ask Copilot
                    </button>
                </div>
            </motion.div>

            {/* ─── Quick Actions ─── */}
            <motion.div variants={listVariants} initial="hidden" animate="visible" className="grid grid-cols-2 gap-3 mb-6">
                {quickActions.map((action, i) => (
                    <motion.button key={i} variants={itemVariants} whileTap={{ scale: 0.94 }}
                        onClick={() => action.key ? setActiveSheet(action.key) : onNav?.(action.navTo ?? 'jobs')}
                        className={`flex flex-col text-start p-4 ${theme.platform === 'android' ? 'rounded-[22px]' : 'rounded-[20px]'} bg-gradient-to-br ${action.bg} ${action.glow ? `shadow-lg ${action.glow}` : ''} border ${isLight ? 'border-black/5' : 'border-white/8'} active:brightness-110 transition-all`}
                    >
                        {/* Icon bubble */}
                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 shadow-md`}>
                            <Icon name={action.icon} className="text-[18px] text-white" />
                        </div>
                        <span className="font-bold text-[14px] mb-0.5">{action.label}</span>
                        <span className={`text-[11px] ${isLight ? 'text-ds-gray-500' : 'text-white/40'}`}>{action.desc}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* ─── Recent Applications ─── */}
            <div className="flex justify-between items-center mb-3">
                <h3 className={`text-[18px] font-extrabold tracking-tight ${theme.platform === 'ios' ? '' : ''}`}>Recent Applications</h3>
                <button onClick={() => onNav?.('jobs')} className={`text-[13px] font-bold ${seeAllColor}`}>See All</button>
            </div>
            <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-3">
                {[
                    { company: 'Cafe Local', role: 'Weekend Barista', time: '2h ago', status: 'Interview', icon: 'local_cafe', color: 'amber', match: 95, wage: '€13/h' },
                    { company: 'City Events Co.', role: 'Event Staff', time: '1d ago', status: 'Applied', icon: 'celebration', color: 'purple', match: 82, wage: '€16/h' },
                    { company: 'Bookstore Downtown', role: 'Retail Assistant', time: '3d ago', status: 'Viewed', icon: 'menu_book', color: 'blue', match: 75, wage: '€12.5/h' }
                ].map((item, i) => {
                    const statusStyle = item.status === 'Interview'
                        ? 'bg-ds-success/15 text-ds-success border-ds-emerald-600/30'
                        : item.status === 'Applied'
                        ? (isColorful ? 'bg-primary/10 text-primary border-primary/30' : isLight ? 'bg-primary/10 text-accent border-[var(--primary)]/20' : 'bg-primary/15 text-accent border-[var(--primary)]/30')
                        : (isLight ? 'bg-ds-gray-100 text-ds-gray-500 border-ds-gray-200' : 'bg-white/8 text-white/50 border-white/10');
                    const matchColor = item.match >= 90 ? 'text-ds-success' : item.match >= 80 ? 'text-primary' : 'text-ds-gold-400';
                    const matchBg = item.match >= 90 ? 'bg-ds-success/10' : item.match >= 80 ? 'bg-primary/10' : 'bg-ds-gold-600/10';
                    const iconBg = theme.dashboard.teamColorMap[item.color] ?? 'bg-ds-gray-500/15 text-ds-gray-400';
                    return (
                        <motion.div key={i} variants={itemVariants} onClick={() => onNav?.('jobs')}
                            className={`${card} p-4 flex items-center gap-3 active:scale-[0.98] transition-all cursor-pointer group`}>
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
                                <Icon name={item.icon} className="text-[20px]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <h4 className="font-semibold text-[15px] truncate me-2">{item.role}</h4>
                                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border shrink-0 ${statusStyle}`}>{item.status}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={`text-[12px] ${isLight ? 'text-ds-gray-500' : 'text-white/50'}`}>{item.company} · {item.time}</span>
                                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-lg ${matchBg}`}>
                                        <span className={`text-[11px] font-bold ${matchColor}`}>{item.match}%</span>
                                    </div>
                                </div>
                            </div>
                            <Icon name="chevron_right" className="text-[18px] opacity-20 group-hover:opacity-50 transition-opacity shrink-0" />
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* ─── Sheet overlay ─── */}
            <AnimatePresence>
                {activeSheet && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 z-50">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-ds-dark-1/40 backdrop-blur-sm" onClick={() => setActiveSheet(null)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 340, damping: 32, mass: 1 }}
                            className={`absolute bottom-0 start-0 end-0 ${theme.platform === 'ios' ? 'rounded-t-[32px]' : 'rounded-t-[28px]'} p-6 pb-10 max-h-[85vh] overflow-y-auto no-scrollbar ${sheetBg}`}>
                            <div className="w-10 h-1 rounded-full bg-ds-gray-400/30 mx-auto mb-5" />
                            <button onClick={() => setActiveSheet(null)} className="absolute top-5 end-5 w-8 h-8 rounded-full bg-ds-gray-500/20 flex items-center justify-center active:scale-95 z-10">
                                <Icon name="close" className="text-[16px] opacity-60" />
                            </button>
                            {activeSheet === 'cv' && <CVBuilderSheet isLight={isLight} isColorful={isColorful ?? false} theme={theme} onClose={() => setActiveSheet(null)} />}
                            {activeSheet === 'shifts' && <ShiftManagerSheet isLight={isLight} isColorful={isColorful ?? false} theme={theme} onClose={() => setActiveSheet(null)} />}
                            {activeSheet === 'analytics' && <AnalyticsSheet isLight={isLight} isColorful={isColorful ?? false} theme={theme} />}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

