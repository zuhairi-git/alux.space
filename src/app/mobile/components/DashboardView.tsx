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
    const sheetBg = isColorful ? 'bg-ds-colorful-bg/95 backdrop-blur-2xl' : theme.workspace.sheetBg(isLight);
    const docTypes = ['Document', 'Meeting Notes', 'Design Brief', 'Sprint Plan', 'Retrospective'];
    if (created) return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6">
            <div className={`w-20 h-20 rounded-[28px] ${isColorful ? 'bg-ds-ember/15' : 'bg-ds-blue-500/15'} flex items-center justify-center mb-4`}>
                <Icon name="check_circle" className={`text-5xl ${isColorful ? 'text-ds-ember' : 'text-ds-blue-400'}`} />
            </div>
            <h3 className="text-xl font-bold mb-1">Document Created!</h3>
            <p className={`text-[14px] text-center mb-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}><strong>{title || 'Untitled Document'}</strong> has been added to your workspace.</p>
            <button onClick={onClose} className={`px-6 py-3 rounded-2xl ${isColorful ? 'bg-ds-ember' : 'bg-ds-blue-500'} text-white font-semibold text-[14px] active:scale-95`}>Open Document</button>
        </motion.div>
    );
    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mr-3 ${isColorful ? 'bg-ds-ember/20' : isLight ? 'bg-ds-blue-400/10' : 'bg-ds-blue-500/15'}`}>
                    <Icon name="edit_document" className={`text-[18px] ${isColorful ? 'text-ds-ember' : 'text-ds-blue-400'}`} />
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
                            <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors active:scale-95 ${type === t ? (isColorful ? 'bg-ds-ember text-white' : 'bg-ds-blue-500 text-white') : (isLight ? 'bg-black/5 text-gray-700' : 'bg-white/8 text-gray-300')}`}>{t}</button>
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
                        <button onClick={() => setCreated(true)} className={`w-full py-4 rounded-2xl text-[15px] font-bold active:scale-95 transition-transform ${isColorful ? 'bg-gradient-to-r from-ds-ember to-ds-ember-dark' : 'bg-gradient-to-r from-ds-blue-500 to-ds-indigo-500'} text-white`}>
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
        { name: 'Design Review — DS v3', host: 'Sara K.', participants: 4, tag: 'Live', color: 'green' },
        { name: 'Sprint Planning Q2', host: 'James L.', participants: 7, tag: 'Starting soon', color: 'amber' },
        { name: 'UX Research Debrief', host: 'Mia R.', participants: 3, tag: 'Live', color: 'blue' },
    ];
    const colorMap: Record<string, string> = { green: 'bg-ds-success/15 text-ds-success', amber: 'bg-ds-warning/15 text-ds-warning', blue: 'bg-ds-blue-500/15 text-ds-blue-400' };
    if (joined) return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-full bg-ds-success/15 flex items-center justify-center mb-4">
                <Icon name="groups" className="text-5xl text-ds-success" />
            </div>
            <h3 className="text-xl font-bold mb-1">You&apos;re Live!</h3>
            <p className={`text-[13px] text-center mb-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>You&apos;ve joined the session. Your camera and mic are ready.</p>
            <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-2xl bg-ds-error/15 text-ds-error font-semibold text-[13px]"><Icon name="mic_off" className="mr-1" />Mute</button>
                <button onClick={onClose} className="px-5 py-2.5 rounded-2xl bg-ds-success text-white font-semibold text-[13px]">Enter Room</button>
            </div>
        </motion.div>
    );
    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mr-3 ${isColorful ? 'bg-ds-ember/20' : isLight ? 'bg-ds-blue-100' : 'bg-ds-blue-500/15'}`}>
                    <Icon name="groups" className={`text-[18px] ${isColorful ? 'text-ds-ember' : 'text-ds-blue-400'}`} />
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
                    {code && <button onClick={() => setJoined(true)} className={`px-3 py-1.5 rounded-xl ${isColorful ? 'bg-ds-ember' : 'bg-ds-blue-500'} text-white text-[12px] font-bold active:scale-95`}>Join</button>}
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
            <div className={`w-20 h-20 rounded-[28px] ${isColorful ? 'bg-ds-ember/15' : 'bg-ds-blue-500/15'} flex items-center justify-center mb-4`}>
                <Icon name="event_available" className={`text-5xl ${isColorful ? 'text-ds-ember' : 'text-ds-blue-400'}`} />
            </div>
            <h3 className="text-xl font-bold mb-1">Meeting Scheduled!</h3>
            <p className={`text-[13px] text-center mb-6 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}><strong>{title || 'Team Meeting'}</strong> on {days[selectedDay]}, {selectedTime}.<br />Invites sent to your team.</p>
            <button onClick={onClose} className={`px-6 py-3 rounded-2xl ${isColorful ? 'bg-ds-ember' : 'bg-ds-blue-500'} text-white font-semibold text-[14px] active:scale-95`}>View Calendar</button>
        </motion.div>
    );
    return (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center mb-5">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center mr-3 ${isColorful ? 'bg-ds-ember/20' : isLight ? 'bg-ds-blue-400/10' : 'bg-ds-blue-500/15'}`}>
                    <Icon name="calendar_today" className={`text-[18px] ${isColorful ? 'text-ds-ember' : 'text-ds-blue-400'}`} />
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
                            <button key={d} onClick={() => setSelectedDay(i)} className={`flex-1 py-2 rounded-xl text-[13px] font-bold transition-colors active:scale-95 ${selectedDay === i ? (isColorful ? 'bg-ds-ember text-white' : 'bg-ds-blue-500 text-white') : (isLight ? 'bg-black/5' : 'bg-white/8')}`}>{d}</button>
                        ))}
                    </div>
                </div>
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Time</span>
                    <div className="flex flex-wrap gap-2">
                        {times.map(t => (
                            <button key={t} onClick={() => setSelectedTime(t)} className={`px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-colors active:scale-95 ${selectedTime === t ? (isColorful ? 'bg-ds-ember text-white' : 'bg-ds-blue-500 text-white') : (isLight ? 'bg-black/5' : 'bg-white/8')}`}>{t}</button>
                        ))}
                    </div>
                </div>
                <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                    <span className="text-[10px] opacity-50 block mb-2 uppercase tracking-wide">Invite</span>
                    <div className="flex -space-x-2">
                        {['S', 'J', 'M'].map((initl, i) => (
                            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white border-2 ${isLight ? 'border-gray-100' : 'border-gray-800'} ${['bg-ds-blue-500', 'bg-ds-success', 'bg-ds-purple-400'][i]}`}>{initl}</div>
                        ))}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border-2 ${isLight ? 'border-gray-100 bg-gray-100 text-gray-500' : 'border-gray-800 bg-white/10 text-white/50'}`}>+3</div>
                    </div>
                </div>
            </div>
            <button onClick={() => setStep('success')} className={`w-full py-4 rounded-2xl text-[15px] font-bold active:scale-95 transition-transform ${isColorful ? 'bg-gradient-to-r from-ds-ember to-ds-ember-dark' : 'bg-gradient-to-r from-ds-blue-500 to-ds-indigo-500'} text-white`}>
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
                <div>
                    <h3 className="text-[18px] font-bold">Platform Analytics</h3>
                    <p className={`text-[11px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>This week · Updated just now</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
                {stats.map((s, i) => (
                    <div key={i} className={`p-3.5 rounded-2xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.05]'}`}>
                        <div className="flex items-center justify-end mb-2">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-lg ${s.positive ? 'bg-ds-success/15 text-ds-success' : 'bg-ds-error/15 text-ds-error'}`}>{s.change}</span>
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
                                className={`w-full rounded-t-lg ${i === 6 ? (isColorful ? 'bg-ds-ember' : 'bg-ds-blue-500') : isColorful ? 'bg-ds-ember/40' : isLight ? 'bg-ds-blue-400/40' : 'bg-ds-blue-500/35'}`}
                                style={{ minHeight: '4px' }} />
                        </div>
                    ))}
                </div>
                <div className="flex gap-1.5 mt-2">
                    {days.map((d, i) => (
                        <div key={i} className="flex-1 text-center">
                            <span className={`text-[10px] font-medium ${i === 6 ? (isColorful ? 'text-ds-ember' : 'text-ds-blue-400') : 'opacity-40'}`}>{d}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
    void theme;
}

// ─── Layout Mode Types ────────────────────────────────────────────────────────
type LayoutMode = 'bento' | 'feed' | 'cards' | 'pulse';

const layoutMeta: { key: LayoutMode; icon: string; label: string }[] = [
    { key: 'bento', icon: 'grid_view', label: 'Bento' },
    { key: 'feed', icon: 'view_stream', label: 'Feed' },
    { key: 'cards', icon: 'filter_center_focus', label: 'Focus' },
    { key: 'pulse', icon: 'blur_circular', label: 'Pulse' },
];

// ─── Layout Picker ────────────────────────────────────────────────────────────
function LayoutPicker({ active, onChange, isLight, isColorful, theme }: {
    active: LayoutMode; onChange: (m: LayoutMode) => void; isLight: boolean; isColorful: boolean; theme: MobileTheme;
}) {
    return (
        <motion.div variants={fadeUp} className="flex justify-center">
            <div className={`inline-flex items-center p-1 gap-0.5 ${theme.platform === 'ios' ? 'rounded-[14px]' : 'rounded-full'} ${isLight ? 'bg-black/[0.05]' : isColorful ? 'bg-white/[0.06] border border-ds-ember/10' : 'bg-white/[0.08]'}`}>
                {layoutMeta.map(l => {
                    const isActive = active === l.key;
                    return (
                        <button key={l.key} onClick={() => onChange(l.key)}
                            className={`relative px-4 py-[7px] rounded-full text-[11px] font-semibold transition-all duration-300 active:scale-95 ${isActive
                                ? (isColorful ? 'text-ds-ember-light' : isLight ? 'text-gray-900' : 'text-white')
                                : (isLight ? 'text-gray-400' : 'text-white/30')}`}>
                            {isActive && (
                                <motion.div layoutId="layout-pill" className={`absolute inset-0 ${theme.platform === 'ios' ? 'rounded-[10px]' : 'rounded-full'} ${isColorful ? 'bg-ds-ember/25' : isLight ? 'bg-white shadow-sm' : 'bg-white/12'}`}
                                    transition={{ type: 'spring', stiffness: 500, damping: 35 }} />
                            )}
                            <span className="relative z-10">{l.label}</span>
                        </button>
                    );
                })}
            </div>
        </motion.div>
    );
}

// ─── Shared layout props ──────────────────────────────────────────────────────
interface LayoutProps {
    card: string; isLight: boolean; isColorful: boolean; theme: MobileTheme;
    onNav: (t: TabType) => void; onAction: (a: QuickActionKey) => void;
}

const quickActionDefs = (theme: MobileTheme): { key: QuickActionKey; icon: string; label: string; desc: string; color: string }[] => [
    { key: 'new-doc', icon: 'edit_document', label: 'New Doc', desc: 'Create document', color: theme.platform === 'android' ? 'from-ds-purple-400/20 to-ds-fuchsia-400/20' : 'from-ds-blue-500/10 to-ds-indigo-500/10 border-ds-blue-500/20' },
    { key: 'join-room', icon: 'groups', label: 'Join Room', desc: 'Live session', color: theme.platform === 'android' ? 'from-ds-blue-500/20 to-ds-cyan-400/20' : 'from-ds-success/10 to-ds-cyan-400/10 border-ds-success/20' },
    { key: 'schedule', icon: 'calendar_today', label: 'Schedule', desc: 'Plan meeting', color: theme.platform === 'android' ? 'from-ds-success/20 to-ds-cyan-400/20' : 'from-ds-purple-400/10 to-ds-fuchsia-400/10 border-ds-purple-400/20' },
    { key: 'analytics', icon: 'analytics', label: 'Analytics', desc: 'View stats', color: theme.platform === 'android' ? 'from-ds-warning/20 to-ds-ember/20' : 'from-ds-ember/10 to-ds-warning/10 border-ds-ember/20' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// BENTO LAYOUT — Asymmetric grid with varied-size tiles
// ═══════════════════════════════════════════════════════════════════════════════
function BentoLayout({ card, isLight, isColorful, theme, onNav, onAction }: LayoutProps) {
    const d = theme.dashboard;
    const accent = isColorful ? 'text-ds-ember' : d.briefingAccent(isLight);
    const highlight = isColorful ? 'text-ds-ember-light' : d.briefingHighlight;
    const actions = quickActionDefs(theme);

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, scale: 0.97 }} variants={stagger} className="space-y-3">
            {/* AI Hero — full width */}
            <motion.button variants={fadeUp} onClick={() => onNav('copilot')} className={`w-full text-left p-5 ${card} relative overflow-hidden group active:scale-[0.98] transition-transform`}>
                <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-ds-indigo-500/10 to-ds-purple-400/10 blur-2xl group-active:scale-110 transition-transform`} />
                <div className="flex items-center space-x-2.5 mb-3 relative z-10">
                    <Icon name="auto_awesome" className={`text-xl ${isColorful ? 'text-ds-ember' : 'text-ds-blue-500'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${accent}`}>AI Briefing</span>
                    <span className="ml-auto text-[10px] font-medium opacity-30">Just now</span>
                </div>
                <p className={`text-[14px] leading-[1.7] relative z-10 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                    Your team had a <span className={`font-semibold ${highlight}`}>productive sprint</span> — 14 docs updated, 3 design reviews completed. <span className="font-semibold">2 pending approvals</span> await.
                </p>
                <span className={`mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold ${isColorful ? 'text-ds-ember' : d.followUpColor}`}>
                    Ask follow-up <Icon name="arrow_forward" className="text-[12px]" />
                </span>
            </motion.button>

            {/* Bento Grid — 4 columns, asymmetric tiles */}
            <div className="grid grid-cols-4 gap-2.5">
                {/* Workspace 1 — 2 cols, tall */}
                <motion.button variants={fadeUp} onClick={() => onNav('workspaces')} className={`col-span-2 row-span-2 text-left p-4 ${card} active:scale-[0.97] transition-transform`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${isColorful ? 'bg-ds-ember/20' : theme.workspace.iconBg(isLight)}`}>
                        <Icon name={workspaces[0].icon} className={`text-xl ${isColorful ? 'text-ds-ember' : theme.workspace.iconColor(isLight)}`} />
                    </div>
                    <span className="font-bold text-[14px] block mb-1">{workspaces[0].name.split(' ').slice(0, 2).join(' ')}</span>
                    <span className={`text-[11px] block mb-3 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{workspaces[0].members} members · {workspaces[0].docs} docs</span>
                    <Sparkline data={workspaces[0].data} color={theme.workspace.sparklineHigh} width={130} height={36} />
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-[16px] font-bold">{workspaces[0].activity}%</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${theme.workspace.statusActive}`}>{workspaces[0].status}</span>
                    </div>
                </motion.button>

                {/* Workspace 2 — 2 cols, short */}
                <motion.button variants={fadeUp} onClick={() => onNav('workspaces')} className={`col-span-2 text-left p-3.5 ${card} active:scale-[0.97] transition-transform`}>
                    <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isColorful ? 'bg-ds-ember/20' : theme.workspace.iconBg(isLight)}`}>
                            <Icon name={workspaces[1].icon} className={`text-[16px] ${isColorful ? 'text-ds-ember' : theme.workspace.iconColor(isLight)}`} />
                        </div>
                        <div>
                            <span className="font-semibold text-[13px] block leading-tight">{workspaces[1].name.split(' ').slice(0, 2).join(' ')}</span>
                            <span className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{workspaces[1].members} members</span>
                        </div>
                    </div>
                    <Sparkline data={workspaces[1].data} color={theme.workspace.sparklineMid} width={120} height={24} />
                </motion.button>

                {/* Workspace 3 — 2 cols, short */}
                <motion.button variants={fadeUp} onClick={() => onNav('workspaces')} className={`col-span-2 text-left p-3.5 ${card} active:scale-[0.97] transition-transform`}>
                    <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isColorful ? 'bg-ds-ember/20' : theme.workspace.iconBg(isLight)}`}>
                            <Icon name={workspaces[2].icon} className={`text-[16px] ${isColorful ? 'text-ds-ember' : theme.workspace.iconColor(isLight)}`} />
                        </div>
                        <div>
                            <span className="font-semibold text-[13px] block leading-tight">{workspaces[2].name.split(' ').slice(0, 2).join(' ')}</span>
                            <span className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{workspaces[2].members} members</span>
                        </div>
                    </div>
                    <Sparkline data={workspaces[2].data} color={theme.workspace.sparklineHigh} width={120} height={24} />
                </motion.button>
            </div>

            {/* Quick Action Capsules — horizontal scroll */}
            <motion.div variants={fadeUp}>
                <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                    {actions.map((a, i) => (
                        <motion.button key={a.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                            onClick={() => onAction(a.key)} className={`shrink-0 px-4 py-2.5 ${theme.platform === 'ios' ? 'rounded-[14px]' : 'rounded-full'} active:scale-95 transition-transform ${isLight ? 'bg-black/[0.04]' : isColorful ? 'bg-white/[0.06] border border-ds-ember/10' : 'bg-white/[0.07]'}`}>
                            <span className="text-[12px] font-semibold whitespace-nowrap">{a.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Team Activity */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-[15px]">Team Activity</h3>
                    <button onClick={() => onNav('notifications')} className={`text-[12px] font-semibold ${isColorful ? 'text-ds-ember' : d.seeAllColor}`}>See All</button>
                </div>
                <div className="space-y-3">
                    {teamActivity.map((a, i) => (
                        <motion.button key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.05 }}
                            onClick={() => onNav('workspaces')} className="w-full flex items-center justify-between active:opacity-70 transition-opacity">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[12px] font-bold ${d.teamColorMap[a.color] || 'bg-gray-500/15 text-gray-400'}`}>{a.user[0]}</div>
                                <span className="text-[13px] truncate"><span className="font-semibold">{a.user}</span> {a.action}</span>
                            </div>
                            <span className="text-[11px] text-gray-500 shrink-0 ml-2">{a.time}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEED LAYOUT — Classic vertical stream with rich cards
// ═══════════════════════════════════════════════════════════════════════════════
function FeedLayout({ card, isLight, isColorful, theme, onNav, onAction }: LayoutProps) {
    const d = theme.dashboard;
    const accent = isColorful ? 'text-ds-ember' : d.briefingAccent(isLight);
    const highlight = isColorful ? 'text-ds-ember-light' : d.briefingHighlight;
    const actions = quickActionDefs(theme);

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, y: 12 }} variants={stagger} className="space-y-5">
            {/* AI Briefing Card */}
            <motion.div variants={fadeUp} className={`p-6 ${card}`}>
                <div className="flex items-center space-x-3 mb-4">
                    <Icon name="auto_awesome" className={`text-2xl ${isColorful ? 'text-ds-ember' : 'text-ds-blue-500'}`} />
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${accent}`}>AI Collaboration Briefing</span>
                </div>
                <p className={`text-[15px] leading-[1.75] ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                    Your team had a <span className={`font-semibold ${highlight}`}>productive sprint</span> — 14 documents updated, 3 design reviews completed. Sara&apos;s design system update needs your review. <span className="font-semibold">2 pending approvals</span> in the content pipeline.
                </p>
                <button onClick={() => onNav('copilot')} className={`mt-4 flex items-center space-x-2 text-[13px] font-semibold ${isColorful ? 'text-ds-ember' : d.followUpColor}`}>
                    <span>Ask follow-up</span><Icon name="arrow_forward" className="text-sm" />
                </button>
            </motion.div>

            {/* Workspace Activity Carousel */}
            <motion.div variants={fadeUp}>
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className={`font-bold text-[17px] ${theme.platform === 'ios' ? 'tracking-tight' : ''}`}>Workspace Activity</h3>
                    <button onClick={() => onNav('workspaces')} className={`text-[13px] font-semibold ${isColorful ? 'text-ds-ember' : d.seeAllColor}`}>See All</button>
                </div>
                <div className="flex space-x-3.5 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                    {workspaces.slice(0, 4).map((ws, i) => (
                        <motion.button key={ws.id} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 400, damping: 30 }}
                            onClick={() => onNav('workspaces')} className={`shrink-0 w-[160px] p-5 ${card} active:scale-[0.97] transition-transform text-left`}>
                            <div className="flex justify-between items-start mb-1.5">
                                <span className="font-bold text-[14px] truncate max-w-[80px]">{ws.name.split(' ')[0]}</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${ws.status === 'Active' ? theme.workspace.statusActive : ws.status === 'Review' ? 'bg-ds-warning/15 text-ds-warning' : 'bg-gray-500/15 text-gray-400'}`}>{ws.status}</span>
                            </div>
                            <span className={`text-[12px] block mb-3 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{ws.members} members</span>
                            <Sparkline data={ws.data} color={ws.activity > 70 ? theme.workspace.sparklineHigh : ws.activity > 50 ? theme.workspace.sparklineMid : theme.workspace.sparklineLow} width={120} height={32} />
                            <span className="text-[15px] font-semibold mt-2.5 block">{ws.activity}% active</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Team Activity */}
            <motion.div variants={fadeUp} className={`p-6 ${card}`}>
                <h3 className="font-bold text-[16px] mb-4">Team Activity</h3>
                <div className="space-y-3.5">
                    {teamActivity.map((a, i) => (
                        <motion.button key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                            onClick={() => onNav('workspaces')} className="w-full flex items-center justify-between active:opacity-70">
                            <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[12px] font-bold ${d.teamColorMap[a.color] || 'bg-gray-500/15 text-gray-400'}`}>{a.user[0]}</div>
                                <span className="text-[14px] truncate"><span className="font-semibold">{a.user}</span> {a.action}</span>
                            </div>
                            <span className="text-[12px] text-gray-500 shrink-0 ml-2">{a.time}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-[17px] mb-4 px-1">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3.5">
                    {actions.map(a => (
                        <motion.button key={a.label} whileTap={{ scale: 0.96 }} onClick={() => onAction(a.key)}
                            className={`flex flex-col text-left p-5 ${theme.platform === 'android' ? 'rounded-[20px]' : 'rounded-[18px]'} ${d.quickActionBg(isLight, a.color)}`}>
                            <span className="font-semibold text-[15px] mb-1">{a.label}</span>
                            <span className="text-[12px] opacity-50">{a.desc}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CARDS LAYOUT — Full-screen focus cards, one at a time
// ═══════════════════════════════════════════════════════════════════════════════
function CardsLayout({ card, isLight, isColorful, theme, onNav, onAction }: LayoutProps) {
    const [idx, setIdx] = useState(0);
    const d = theme.dashboard;
    const accent = isColorful ? 'text-ds-ember' : d.briefingAccent(isLight);
    const highlight = isColorful ? 'text-ds-ember-light' : d.briefingHighlight;
    const actions = quickActionDefs(theme);

    const cards = [
        // Card 0: AI Briefing
        {
            key: 'briefing',
            render: () => (
                <div className={`h-full flex flex-col justify-between p-6 ${card}`}>
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <Icon name="auto_awesome" className={`text-[32px] ${isColorful ? 'text-ds-ember' : 'text-ds-blue-500'}`} />
                            <div>
                                <span className={`text-[10px] font-bold uppercase tracking-[0.15em] block ${accent}`}>AI Briefing</span>
                                <span className="text-[18px] font-bold block">Good morning</span>
                            </div>
                        </div>
                        <p className={`text-[16px] leading-[1.8] ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                            Your team had a <span className={`font-semibold ${highlight}`}>productive sprint</span> — 14 documents updated, 3 design reviews completed. Sara&apos;s design system update needs your review. <span className="font-semibold">2 pending approvals</span> in the content pipeline.
                        </p>
                    </div>
                    <button onClick={() => onNav('copilot')} className={`mt-6 w-full py-4 rounded-2xl text-[15px] font-bold active:scale-[0.97] transition-transform ${isColorful ? 'bg-gradient-to-r from-ds-ember to-ds-ember-dark text-white' : theme.workspace.primaryButton}`}>
                        <Icon name="auto_awesome" className="mr-2 text-[16px]" />Ask Copilot
                    </button>
                </div>
            ),
        },
        // Card 1: Workspaces Overview
        {
            key: 'workspaces',
            render: () => (
                <div className={`h-full flex flex-col p-6 ${card}`}>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[18px] font-bold">Workspaces</h3>
                        <button onClick={() => onNav('workspaces')} className={`text-[12px] font-semibold ${isColorful ? 'text-ds-ember' : d.seeAllColor}`}>View All</button>
                    </div>
                    <div className="flex-1 space-y-3 overflow-y-auto scrollbar-none">
                        {workspaces.map((ws, i) => (
                            <motion.button key={ws.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                                onClick={() => onNav('workspaces')} className={`w-full flex items-center justify-between p-4 ${card} active:scale-[0.98] transition-transform`}>
                                <div className="flex items-center space-x-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isColorful ? 'bg-ds-ember/20' : theme.workspace.iconBg(isLight)}`}>
                                        <Icon name={ws.icon} className={`text-lg ${isColorful ? 'text-ds-ember' : theme.workspace.iconColor(isLight)}`} />
                                    </div>
                                    <div className="text-left">
                                        <span className="font-semibold text-[14px] block">{ws.name}</span>
                                        <span className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{ws.members} members · {ws.docs} docs</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkline data={ws.data} color={ws.activity > 70 ? theme.workspace.sparklineHigh : theme.workspace.sparklineMid} width={44} height={18} />
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${ws.status === 'Active' ? theme.workspace.statusActive : 'bg-ds-warning/15 text-ds-warning'}`}>{ws.status}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            ),
        },
        // Card 2: Team Activity
        {
            key: 'activity',
            render: () => (
                <div className={`h-full flex flex-col p-6 ${card}`}>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[18px] font-bold">Team Activity</h3>
                        <button onClick={() => onNav('notifications')} className={`text-[12px] font-semibold ${isColorful ? 'text-ds-ember' : d.seeAllColor}`}>Alerts</button>
                    </div>
                    <div className="flex-1 space-y-4 overflow-y-auto scrollbar-none">
                        {teamActivity.map((a, i) => (
                            <motion.button key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                onClick={() => onNav('workspaces')} className="w-full flex items-start gap-3.5 active:opacity-70">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[12px] font-bold ${d.teamColorMap[a.color] || 'bg-gray-500/15 text-gray-400'}`}>{a.user[0]}</div>
                                <div className="flex-1 text-left">
                                    <span className="text-[14px] block"><span className="font-semibold">{a.user}</span> {a.action}</span>
                                    <span className={`text-[12px] mt-1 block ${isLight ? 'text-gray-400' : 'text-white/30'}`}>{a.time} ago</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                    <button onClick={() => onNav('notifications')} className={`mt-4 w-full py-3 rounded-2xl text-[13px] font-semibold text-center active:scale-[0.97] transition-transform ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.06]'}`}>
                        View All Notifications
                    </button>
                </div>
            ),
        },
        // Card 3: Quick Actions
        {
            key: 'actions',
            render: () => (
                <div className={`h-full flex flex-col p-6 ${card}`}>
                    <h3 className="text-[18px] font-bold mb-5">Quick Actions</h3>
                    <div className="flex-1 grid grid-cols-2 gap-3 content-start">
                        {actions.map((a, i) => (
                            <motion.button key={a.key} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                                onClick={() => onAction(a.key)} className={`flex flex-col items-start text-left p-5 ${theme.platform === 'android' ? 'rounded-[20px]' : 'rounded-[18px]'} active:scale-95 transition-transform ${d.quickActionBg(isLight, a.color)}`}>
                                <span className="font-semibold text-[14px] mb-1">{a.label}</span>
                                <span className="text-[11px] opacity-50">{a.desc}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            ),
        },
    ];

    const totalCards = cards.length;
    const goNext = () => setIdx(i => Math.min(i + 1, totalCards - 1));
    const goPrev = () => setIdx(i => Math.max(i - 1, 0));

    return (
        <div className="relative h-[calc(100dvh-200px)] flex flex-col">
            {/* Card viewport */}
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div key={cards[idx].key}
                        initial={{ opacity: 0, x: 60, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -60, scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32, mass: 0.8 }}
                        className="absolute inset-0">
                        {cards[idx].render()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 py-4">
                <button onClick={goPrev} disabled={idx === 0}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${idx === 0 ? 'opacity-20' : isLight ? 'bg-black/[0.05] active:bg-black/10' : 'bg-white/[0.08] active:bg-white/15'}`}>
                    <Icon name="chevron_left" className="text-[20px]" />
                </button>
                <div className="flex gap-2">
                    {cards.map((c, i) => (
                        <button key={c.key} onClick={() => setIdx(i)}
                            className={`rounded-full transition-all duration-300 ${i === idx ? `w-6 h-2 ${isColorful ? 'bg-ds-ember' : theme.platform === 'ios' ? 'bg-ds-blue-500' : 'bg-ds-blue-300'}` : `w-2 h-2 ${isLight ? 'bg-black/15' : 'bg-white/15'}`}`} />
                    ))}
                </div>
                <button onClick={goNext} disabled={idx === totalCards - 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${idx === totalCards - 1 ? 'opacity-20' : isLight ? 'bg-black/[0.05] active:bg-black/10' : 'bg-white/[0.08] active:bg-white/15'}`}>
                    <Icon name="chevron_right" className="text-[20px]" />
                </button>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PULSE LAYOUT — Radial hub with concentric data rings
// ═══════════════════════════════════════════════════════════════════════════════
function PulseLayout({ card, isLight, isColorful, theme, onNav, onAction }: LayoutProps) {
    const d = theme.dashboard;
    const actions = quickActionDefs(theme);

    const stats = [
        { label: 'Active', value: '12', icon: 'workspaces', color: 'green' },
        { label: 'Docs', value: '48', icon: 'description', color: 'blue' },
        { label: 'AI Queries', value: '183', icon: 'auto_awesome', color: 'purple' },
    ];

    const colorMap: Record<string, string> = {
        green: isColorful ? 'bg-ds-success/20 text-ds-success border-ds-success/20' : isLight ? 'bg-ds-success/10 text-ds-success border-ds-success/20' : 'bg-ds-success/20 text-ds-success border-ds-success/20',
        blue: isColorful ? 'bg-ds-blue-500/20 text-ds-blue-400 border-ds-blue-500/20' : isLight ? 'bg-ds-blue-100 text-ds-blue-500 border-ds-blue-200' : 'bg-ds-blue-500/15 text-ds-blue-400 border-ds-blue-500/20',
        purple: isColorful ? 'bg-ds-ember/20 text-ds-ember border-ds-ember/20' : isLight ? 'bg-ds-purple-400/10 text-ds-purple-500 border-ds-purple-400/20' : 'bg-ds-purple-400/15 text-ds-purple-400 border-ds-purple-400/20',
    };

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, scale: 0.95 }} variants={stagger} className="space-y-6 flex flex-col items-center">
            {/* Central AI Hub */}
            <motion.button variants={fadeUp} onClick={() => onNav('copilot')}
                className="relative w-36 h-36 flex items-center justify-center active:scale-95 transition-transform">
                {/* Outer pulse rings */}
                <div className={`absolute inset-0 rounded-full animate-ping opacity-10 ${isColorful ? 'bg-ds-ember' : theme.platform === 'ios' ? 'bg-ds-blue-500' : 'bg-ds-blue-500'}`} style={{ animationDuration: '3s' }} />
                <div className={`absolute inset-3 rounded-full animate-ping opacity-10 ${isColorful ? 'bg-ds-ember-dark' : theme.platform === 'ios' ? 'bg-ds-indigo-500' : 'bg-ds-blue-300'}`} style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                {/* Gradient ring */}
                <div className={`absolute inset-4 rounded-full ${isColorful ? 'bg-gradient-to-br from-ds-ember/20 to-ds-ember-dark/20' : isLight ? 'bg-gradient-to-br from-ds-blue-500/10 to-ds-indigo-500/10' : 'bg-gradient-to-br from-ds-indigo-500/15 to-ds-purple-400/15'} border ${isColorful ? 'border-ds-ember/20' : isLight ? 'border-ds-blue-200' : 'border-ds-indigo-500/20'}`} />
                {/* Inner hub */}
                <div className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center ${isColorful ? 'bg-gradient-to-br from-ds-ember to-ds-ember-dark' : theme.platform === 'ios' ? 'bg-gradient-to-br from-ds-blue-500 to-ds-indigo-500' : 'bg-ds-blue-300'} shadow-lg`}>
                    <Icon name="auto_awesome" className={`text-2xl ${theme.platform === 'android' && !isColorful ? 'text-ds-blue-900' : 'text-white'}`} />
                    <span className={`text-[9px] font-bold mt-0.5 ${theme.platform === 'android' && !isColorful ? 'text-ds-blue-900' : 'text-white/80'}`}>ASK AI</span>
                </div>
            </motion.button>

            {/* Stats Ring */}
            <motion.div variants={fadeUp} className="flex justify-center gap-3 w-full px-4">
                {stats.map((s, i) => (
                    <motion.button key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}
                        onClick={() => onAction('analytics')} className={`flex-1 flex flex-col items-center p-4 rounded-2xl border active:scale-95 transition-transform ${colorMap[s.color]}`}>
                        <Icon name={s.icon} className="text-[20px] mb-1.5" />
                        <span className="text-[20px] font-bold">{s.value}</span>
                        <span className={`text-[10px] font-medium mt-0.5 ${isLight ? 'opacity-60' : 'opacity-50'}`}>{s.label}</span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Workspace Orbit */}
            <motion.div variants={fadeUp} className="w-full px-1">
                <div className="flex justify-between items-center mb-3 px-3">
                    <h3 className="font-bold text-[15px]">Workspaces</h3>
                    <button onClick={() => onNav('workspaces')} className={`text-[12px] font-semibold ${isColorful ? 'text-ds-ember' : d.seeAllColor}`}>See All</button>
                </div>
                <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-1 px-3">
                    {workspaces.slice(0, 4).map((ws, i) => (
                        <motion.button key={ws.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.06 }}
                            onClick={() => onNav('workspaces')} className={`shrink-0 w-[130px] p-4 ${card} active:scale-[0.96] transition-transform text-center`}>
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-2 ${theme.workspace.iconBg(isLight)}`}>
                                <Icon name={ws.icon} className={`text-xl ${theme.workspace.iconColor(isLight)}`} />
                            </div>
                            <span className="font-semibold text-[12px] block truncate">{ws.name.split(' ')[0]}</span>
                            <span className={`text-[10px] block mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{ws.activity}% active</span>
                            <Sparkline data={ws.data} color={ws.activity > 70 ? theme.workspace.sparklineHigh : theme.workspace.sparklineMid} width={90} height={20} />
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Quick Action Ring */}
            <motion.div variants={fadeUp} className="w-full px-4">
                <div className="flex gap-2">
                    {actions.map((a, i) => (
                        <motion.button key={a.key} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.06 }}
                            onClick={() => onAction(a.key)} className={`flex-1 flex flex-col items-center p-3 rounded-2xl active:scale-95 transition-transform ${isLight ? 'bg-black/[0.03]' : isColorful ? 'bg-white/[0.04] border border-ds-ember/10' : 'bg-white/[0.05]'}`}>
                            <span className="text-[11px] font-semibold">{a.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div variants={fadeUp} className={`w-full p-5 ${card}`}>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-[15px]">Recent Activity</h3>
                    <button onClick={() => onNav('notifications')} className={`text-[12px] font-semibold ${isColorful ? 'text-ds-ember' : d.seeAllColor}`}>All</button>
                </div>
                {teamActivity.slice(0, 3).map((a, i) => (
                    <motion.button key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.05 }}
                        onClick={() => onNav('workspaces')} className="w-full flex items-center gap-3 py-2 active:opacity-70">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${d.teamColorMap[a.color]}`}>{a.user[0]}</div>
                        <span className="text-[12px] truncate flex-1 text-left"><span className="font-semibold">{a.user}</span> {a.action}</span>
                        <span className="text-[10px] opacity-40 shrink-0">{a.time}</span>
                    </motion.button>
                ))}
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD VIEW — Configurable layout orchestrator
// ═══════════════════════════════════════════════════════════════════════════════
export function DashboardView({ card, isLight, isColorful = false, onNav, theme }: DashboardViewProps) {
    const [layout, setLayout] = useState<LayoutMode>('bento');
    const [activeAction, setActiveAction] = useState<QuickActionKey>(null);
    const sheetBg = isColorful ? 'bg-ds-colorful-bg/95 backdrop-blur-2xl' : theme.workspace.sheetBg(isLight);
    const layoutProps: LayoutProps = { card, isLight, isColorful: isColorful ?? false, theme, onNav, onAction: setActiveAction };

    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: 20 }} variants={stagger} className="absolute inset-0">
            {/* Scrollable content */}
            <div className={`absolute inset-0 overflow-y-auto scrollbar-none pb-28 ${theme.contentPaddingTop} px-5 space-y-5`}>
                {/* Layout Picker */}
                <LayoutPicker active={layout} onChange={setLayout} isLight={isLight} isColorful={isColorful ?? false} theme={theme} />

                {/* Active Layout */}
                <AnimatePresence mode="wait">
                    {layout === 'bento' && <BentoLayout key="bento" {...layoutProps} />}
                    {layout === 'feed' && <FeedLayout key="feed" {...layoutProps} />}
                    {layout === 'cards' && <CardsLayout key="cards" {...layoutProps} />}
                    {layout === 'pulse' && <PulseLayout key="pulse" {...layoutProps} />}
                </AnimatePresence>
            </div>

            {/* Quick Action Sheets */}
            <AnimatePresence>
                {activeAction && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 z-50">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActiveAction(null)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 340, damping: 32, mass: 1 }}
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
