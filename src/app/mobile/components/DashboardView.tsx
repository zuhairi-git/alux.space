'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, Sparkline, stagger, fadeUp, workspaces, teamActivity, type TabType } from '../shared';
import type { MobileTheme } from '../themes';

interface DashboardViewProps {
    card: string;
    isLight: boolean;
    isColorful?: boolean;
    onNav: (t: TabType) => void;
    theme: MobileTheme;
}

type QuickActionKey = 'new-doc' | 'join-room' | 'schedule' | 'analytics' | null;

// ─── New Doc Sheet ────────────────────────────────────────────────────────────
function NewDocSheet({ isLight, isColorful, theme, onClose }: { isLight: boolean; isColorful: boolean; theme: MobileTheme; onClose: () => void }) {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Document');
    const [created, setCreated] = useState(false);
    const sheetBg = isColorful ? 'bg-[#050023]/95 backdrop-blur-2xl' : theme.workspace.sheetBg(isLight);
    const docTypes = ['Document', 'Meeting Notes', 'Design Brief', 'Sprint Plan', 'Retrospective'];
    if (created) return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-[28px] bg-indigo-500/15 flex items-center justify-center mb-4">
                <Icon name="check_circle" className="text-5xl text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Document Created!</h3>
            <p className={`text-[14px] text-center mb-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}><strong>{title || 'Untitled Document'}</strong> has been added to your workspace.</p>
            <button onClick={onClose} className="px-6 py-3 rounded-2xl bg-indigo-500 text-white font-semibold text-[14px] active:scale-95">Open Document</button>
        </motion.div>
    );
    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mr-3 ${isColorful ? 'bg-indigo-500/20' : isLight ? 'bg-indigo-100' : 'bg-indigo-500/15'}`}>
                    <Icon name="edit_document" className="text-[18px] text-indigo-400" />
                </div>
                <h3 className="text-[18px] font-bold">New Document</h3>
            </div>
            <div className="space-y-3 mb-5">
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-1 uppercase tracking-wide">Document Title</span>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Untitled Document" className="w-full bg-transparent outline-none text-[15px] font-medium placeholder:opacity-30" />
                </div>
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Type</span>
                    <div className="flex flex-wrap gap-2">
                        {docTypes.map(t => (
                            <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors active:scale-95 ${type === t ? (isColorful ? 'bg-indigo-500 text-white' : isLight ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') : (isLight ? 'bg-black/5 text-gray-700' : 'bg-white/8 text-gray-300')}`}>{t}</button>
                        ))}
                    </div>
                </div>
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-1 uppercase tracking-wide">Workspace</span>
                    <div className="flex items-center justify-between">
                        <span className="text-[14px] font-medium">Design System v3</span>
                        <Icon name="keyboard_arrow_down" className="text-[18px] opacity-40" />
                    </div>
                </div>
            </div>
            <button onClick={() => setCreated(true)} className={`w-full py-4 rounded-2xl text-[15px] font-bold active:scale-95 transition-transform ${isColorful ? 'bg-gradient-to-r from-indigo-500 to-violet-600' : 'bg-gradient-to-r from-indigo-500 to-violet-500'} text-white`}>
                Create Document
            </button>
        </motion.div>
    );
    void sheetBg;
}

// ─── Join Room Sheet ──────────────────────────────────────────────────────────
function JoinRoomSheet({ isLight, isColorful, theme, onClose }: { isLight: boolean; isColorful: boolean; theme: MobileTheme; onClose: () => void }) {
    const [code, setCode] = useState('');
    const [joined, setJoined] = useState(false);
    const liveRooms = [
        { name: 'Design Review — DS v3', host: 'Sara K.', participants: 4, tag: 'Live', color: 'emerald' },
        { name: 'Sprint Planning Q2', host: 'James L.', participants: 7, tag: 'Starting soon', color: 'amber' },
        { name: 'UX Research Debrief', host: 'Mia R.', participants: 3, tag: 'Live', color: 'blue' },
    ];
    const colorMap: Record<string, string> = { emerald: 'bg-emerald-500/15 text-emerald-400', amber: 'bg-amber-500/15 text-amber-400', blue: 'bg-blue-500/15 text-blue-400' };
    if (joined) return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                <Icon name="groups" className="text-5xl text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">You&apos;re Live!</h3>
            <p className={`text-[13px] text-center mb-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>You&apos;ve joined the session. Your camera and mic are ready.</p>
            <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-2xl bg-red-500/15 text-red-400 font-semibold text-[13px]"><Icon name="mic_off" className="mr-1" />Mute</button>
                <button onClick={onClose} className="px-5 py-2.5 rounded-2xl bg-emerald-500 text-white font-semibold text-[13px]">Enter Room</button>
            </div>
        </motion.div>
    );
    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mr-3 ${isColorful ? 'bg-blue-500/20' : isLight ? 'bg-blue-100' : 'bg-blue-500/15'}`}>
                    <Icon name="groups" className="text-[18px] text-blue-400" />
                </div>
                <h3 className="text-[18px] font-bold">Join Live Session</h3>
            </div>
            <div className="space-y-2.5 mb-5">
                <p className={`text-[12px] font-bold uppercase tracking-wider opacity-50 px-1 mb-2`}>Active Rooms</p>
                {liveRooms.map((room, i) => (
                    <motion.button key={i} whileTap={{ scale: 0.98 }} onClick={() => setJoined(true)}
                        className={`w-full flex items-center text-left p-4 rounded-2xl ${isLight ? 'bg-black/[0.04] hover:bg-black/[0.07]' : 'bg-white/[0.06] hover:bg-white/[0.09]'} transition-colors`}>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mr-3 ${colorMap[room.color]}`}>
                            <Icon name={room.tag === 'Live' ? 'radio_button_checked' : 'schedule'} className="text-[18px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-semibold truncate">{room.name}</p>
                            <p className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-white/40'}`}>{room.host} · {room.participants} participants</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 ${colorMap[room.color]}`}>{room.tag}</span>
                    </motion.button>
                ))}
            </div>
            <div className={`px-4 py-3 rounded-2xl mb-4 ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                <span className="text-[10px] opacity-50 block mb-1 uppercase tracking-wide">Or enter a room code</span>
                <div className="flex items-center gap-3">
                    <input value={code} onChange={e => setCode(e.target.value)} placeholder="e.g. WF-2024-XK9" className="flex-1 bg-transparent outline-none text-[14px] font-medium placeholder:opacity-30" />
                    {code && <button onClick={() => setJoined(true)} className="px-3 py-1.5 rounded-xl bg-blue-500 text-white text-[12px] font-bold active:scale-95">Join</button>}
                </div>
            </div>
        </motion.div>
    );
    void theme; void onClose;
}

// ─── Schedule Sheet ───────────────────────────────────────────────────────────
function ScheduleSheet({ isLight, isColorful, theme, onClose }: { isLight: boolean; isColorful: boolean; theme: MobileTheme; onClose: () => void }) {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [title, setTitle] = useState('');
    const [selectedDay, setSelectedDay] = useState(2);
    const [selectedTime, setSelectedTime] = useState('10:00');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
    if (step === 'success') return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-[28px] bg-purple-500/15 flex items-center justify-center mb-4">
                <Icon name="event_available" className="text-5xl text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-1">Meeting Scheduled!</h3>
            <p className={`text-[13px] text-center mb-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}><strong>{title || 'Team Meeting'}</strong> on {days[selectedDay]}, {selectedTime}.<br />Invites sent to your team.</p>
            <button onClick={onClose} className="px-6 py-3 rounded-2xl bg-purple-500 text-white font-semibold text-[14px] active:scale-95">View Calendar</button>
        </motion.div>
    );
    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mr-3 ${isColorful ? 'bg-purple-500/20' : isLight ? 'bg-purple-100' : 'bg-purple-500/15'}`}>
                    <Icon name="calendar_today" className="text-[18px] text-purple-400" />
                </div>
                <h3 className="text-[18px] font-bold">Schedule Meeting</h3>
            </div>
            <div className="space-y-3 mb-5">
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-1 uppercase tracking-wide">Meeting Title</span>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sprint Review" className="w-full bg-transparent outline-none text-[15px] font-medium placeholder:opacity-30" />
                </div>
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Day</span>
                    <div className="flex gap-2">
                        {days.map((d, i) => (
                            <button key={d} onClick={() => setSelectedDay(i)} className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-colors active:scale-95 ${selectedDay === i ? (isColorful ? 'bg-purple-500 text-white' : 'bg-purple-500 text-white') : (isLight ? 'bg-black/5' : 'bg-white/8')}`}>{d}</button>
                        ))}
                    </div>
                </div>
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Time</span>
                    <div className="flex flex-wrap gap-2">
                        {times.map(t => (
                            <button key={t} onClick={() => setSelectedTime(t)} className={`px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-colors active:scale-95 ${selectedTime === t ? (isColorful ? 'bg-purple-500 text-white' : 'bg-purple-500 text-white') : (isLight ? 'bg-black/5' : 'bg-white/8')}`}>{t}</button>
                        ))}
                    </div>
                </div>
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Invite</span>
                    <div className="flex -space-x-2">
                        {['S', 'J', 'M'].map((initl, i) => (
                            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white border-2 ${isLight ? 'border-gray-100' : 'border-gray-800'} ${['bg-blue-500', 'bg-emerald-500', 'bg-purple-500'][i]}`}>{initl}</div>
                        ))}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 ${isLight ? 'border-gray-100 bg-gray-100 text-gray-500' : 'border-gray-800 bg-white/10 text-white/50'}`}>+3</div>
                    </div>
                </div>
            </div>
            <button onClick={() => setStep('success')} className={`w-full py-4 rounded-2xl text-[15px] font-bold active:scale-95 transition-transform bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white`}>
                Schedule Meeting
            </button>
        </motion.div>
    );
    void theme; void onClose;
}

// ─── Analytics Sheet ──────────────────────────────────────────────────────────
function AnalyticsSheet({ isLight, isColorful, theme }: { isLight: boolean; isColorful: boolean; theme: MobileTheme }) {
    const stats = [
        { label: 'Active Workspaces', value: '12', change: '+2', positive: true, icon: 'workspaces' },
        { label: 'Docs Created', value: '48', change: '+14', positive: true, icon: 'description' },
        { label: 'AI Copilot Queries', value: '183', change: '+31%', positive: true, icon: 'auto_awesome' },
        { label: 'Team Velocity', value: '87%', change: '+5%', positive: true, icon: 'speed' },
    ];
    const barData = [40, 65, 52, 78, 91, 83, 95];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mr-3 ${isColorful ? 'bg-amber-500/20' : isLight ? 'bg-amber-100' : 'bg-amber-500/15'}`}>
                    <Icon name="analytics" className="text-[18px] text-amber-400" />
                </div>
                <div>
                    <h3 className="text-[18px] font-bold">Platform Analytics</h3>
                    <p className={`text-[11px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>This week · Updated just now</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
                {stats.map((s, i) => (
                    <div key={i} className={`p-3.5 rounded-2xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.05]'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <Icon name={s.icon} className={`text-[16px] ${isColorful ? 'text-fuchsia-400' : isLight ? 'text-indigo-500' : 'text-indigo-400'}`} />
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-lg ${s.positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>{s.change}</span>
                        </div>
                        <p className="text-[22px] font-bold leading-none mb-1">{s.value}</p>
                        <p className={`text-[11px] leading-tight ${isLight ? 'text-gray-500' : 'text-white/40'}`}>{s.label}</p>
                    </div>
                ))}
            </div>
            <div className={`p-4 rounded-2xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.05]'}`}>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-[13px] font-semibold">Weekly Activity</p>
                    <span className={`text-[11px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Engagement Score</span>
                </div>
                <div className="flex items-end gap-1.5 h-16">
                    {barData.map((v, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 30 }}
                                className={`w-full rounded-t-lg ${i === 6 ? (isColorful ? 'bg-fuchsia-500' : 'bg-indigo-500') : isColorful ? 'bg-fuchsia-500/40' : isLight ? 'bg-indigo-400/40' : 'bg-indigo-500/35'}`}
                                style={{ minHeight: '4px' }} />
                        </div>
                    ))}
                </div>
                <div className="flex gap-1.5 mt-2">
                    {days.map((d, i) => (
                        <div key={i} className="flex-1 text-center">
                            <span className={`text-[10px] font-medium ${i === 6 ? (isColorful ? 'text-fuchsia-400' : 'text-indigo-400') : 'opacity-40'}`}>{d}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
    void theme;
}

export function DashboardView({ card, isLight, isColorful = false, onNav, theme }: DashboardViewProps) {
    const d = theme.dashboard;
    const accentColor = isColorful ? 'text-fuchsia-400' : d.briefingAccent(isLight);
    const highlightColor = isColorful ? 'text-fuchsia-300' : d.briefingHighlight;
    const followUpColor = isColorful ? 'text-fuchsia-400' : d.followUpColor;
    const seeAllColor = isColorful ? 'text-fuchsia-400' : d.seeAllColor;
    const [activeAction, setActiveAction] = useState<QuickActionKey>(null);
    const sheetBg = isColorful ? 'bg-[#050023]/95 backdrop-blur-2xl' : theme.workspace.sheetBg(isLight);

    const quickActions = [
        { key: 'new-doc' as QuickActionKey, icon: 'edit_document', label: 'New Doc', desc: 'Create document', g: theme.platform === 'android' ? 'from-purple-500/20 to-fuchsia-500/20' : 'from-blue-500/10 to-indigo-500/10 border-blue-500/20' },
        { key: 'join-room' as QuickActionKey, icon: 'groups', label: 'Join Room', desc: 'Live session', g: theme.platform === 'android' ? 'from-blue-500/20 to-cyan-500/20' : 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20' },
        { key: 'schedule' as QuickActionKey, icon: 'calendar_today', label: 'Schedule', desc: 'Plan meeting', g: theme.platform === 'android' ? 'from-emerald-500/20 to-teal-500/20' : 'from-purple-500/10 to-fuchsia-500/10 border-purple-500/20' },
        { key: 'analytics' as QuickActionKey, icon: 'analytics', label: 'Analytics', desc: 'View stats', g: theme.platform === 'android' ? 'from-amber-500/20 to-orange-500/20' : 'from-orange-500/10 to-amber-500/10 border-orange-500/20' },
    ];

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: 20 }} variants={stagger} className="absolute inset-0">
            {/* Scrollable content — isolated from overlay so bottom sheet always anchors to frame */}
            <div className={`absolute inset-0 overflow-y-auto scrollbar-none pb-28 ${theme.contentPaddingTop} px-4 space-y-5`}>
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
                            <motion.button key={a.label} whileTap={{ scale: 0.96 }} onClick={() => setActiveAction(a.key)}
                                className={`flex flex-col text-left p-4 ${theme.platform === 'android' ? 'rounded-[20px]' : 'rounded-[18px]'} ${d.quickActionBg(isLight, a.g)}`}>
                                <Icon name={a.icon} className={`mb-2 text-xl ${d.quickActionIconColor(isLight)}`} /><span className="font-semibold text-[14px] mb-0.5">{a.label}</span><span className="text-[11px] opacity-60">{a.desc}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Action Sheets — sibling of scroller so they anchor to the frame, not scroll content */}
            <AnimatePresence>
                {activeAction && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActiveAction(null)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`absolute bottom-0 left-0 right-0 ${theme.platform === 'ios' ? 'rounded-t-[32px]' : 'rounded-t-[28px]'} p-6 pb-10 overflow-y-auto max-h-[85%] ${sheetBg}`}>
                            <div className="w-10 h-1 rounded-full bg-gray-400/30 mx-auto mb-5" />
                            <button onClick={() => setActiveAction(null)} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center active:scale-95">
                                <Icon name="close" className="text-[16px] opacity-60" />
                            </button>
                            {activeAction === 'new-doc' && <NewDocSheet isLight={isLight} isColorful={isColorful} theme={theme} onClose={() => setActiveAction(null)} />}
                            {activeAction === 'join-room' && <JoinRoomSheet isLight={isLight} isColorful={isColorful} theme={theme} onClose={() => setActiveAction(null)} />}
                            {activeAction === 'schedule' && <ScheduleSheet isLight={isLight} isColorful={isColorful} theme={theme} onClose={() => setActiveAction(null)} />}
                            {activeAction === 'analytics' && <AnalyticsSheet isLight={isLight} isColorful={isColorful} theme={theme} />}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
