'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, Sparkline, stagger, fadeUp, workspaces, teamActivity, mockResponses, alerts, suggestedPrompts, TabType } from '../shared';

export default function AndroidApp() {
    const [theme, setTheme] = useState('dark');
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const isLight = theme === 'light';
    const isColorful = theme === 'colorful';
    const bgClass = isLight ? 'bg-[#FAF8FC] text-[#1C1B1F]' : isColorful ? 'bg-[#050023] text-white' : 'bg-[#111114] text-[#E2E2E6]';
    const card = isColorful ? 'bg-[#1a0040]/60 backdrop-blur-xl rounded-[24px] shadow-lg border border-purple-500/20'
        : isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[24px] shadow-sm border border-[#EADDFF]/50'
            : 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[24px] shadow-lg border border-[#4A4458]/40';

    const titles: Record<TabType, { sub: string, title: string }> = {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Workspaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Notifications' }, profile: { sub: 'Settings', title: 'My Space' },
    };

    return (
        <div className={`flex flex-col h-full w-full relative ${bgClass} transition-colors duration-500 font-sans`}>
            <header className={`absolute top-0 w-full pt-10 pb-3 px-5 z-40 ${isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-2xl border-b border-[#EADDFF]/50 shadow-sm' : isColorful ? 'bg-[#1a0040]/80 backdrop-blur-2xl border-b border-purple-500/20' : 'bg-[#2B2930]/90 backdrop-blur-2xl border-b border-[#4A4458]/50 shadow-md'}`}>
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-3.5">
                        <button onClick={() => setActiveTab('profile')} className="relative active:scale-95 transition-transform">
                            <div className={`w-11 h-11 rounded-full overflow-hidden border-2 ${isLight ? 'border-[#EADDFF]' : 'border-[#4A4458]'} bg-gradient-to-tr from-[#6750A4] to-[#D0BCFF]`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="User" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Ali&background=6750A4&color=fff" }} />
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-[2.5px] ${isLight ? 'border-[#FEF7FF] bg-[#146C2E]' : 'border-[#111114] bg-[#4CAF50]'}`} />
                        </button>
                        <div className="flex flex-col">
                            <AnimatePresence mode="wait"><motion.span key={activeTab + "-s"} initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 2 }} className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${isLight ? 'text-[#49454F]' : 'text-white/40'}`}>{titles[activeTab].sub}</motion.span></AnimatePresence>
                            <AnimatePresence mode="wait"><motion.h1 key={activeTab + "-t"} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }} transition={{ delay: 0.05 }} className="text-[18px] font-extrabold tracking-tight leading-none">{titles[activeTab].title}</motion.h1></AnimatePresence>
                        </div>
                    </div>
                    <button onClick={() => setActiveTab('copilot')} className={`relative w-10 h-10 rounded-full flex justify-center items-center active:scale-95 ${isLight ? 'bg-[#EADDFF]/50 text-[#1D192B]' : 'bg-[#4A4458]/50 text-[#E8DEF8]'}`}>
                        <Icon name="auto_awesome" className="text-[20px]" />
                        <span className="absolute top-[9px] right-[9px] w-[5.5px] h-[5.5px] bg-[#FF9500] rounded-full animate-pulse" />
                    </button>
                </div>
            </header>
            <main className="flex-1 relative overflow-hidden w-full z-10">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && <DashboardView key="d" card={card} isLight={isLight} onNav={setActiveTab} />}
                    {activeTab === 'workspaces' && <WorkspacesView key="w" card={card} isLight={isLight} />}
                    {activeTab === 'copilot' && <CopilotView key="c" isLight={isLight} />}
                    {activeTab === 'notifications' && <NotificationsView key="n" card={card} isLight={isLight} />}
                    {activeTab === 'profile' && <ProfileView key="p" card={card} isLight={isLight} theme={theme} setTheme={setTheme} />}
                </AnimatePresence>
            </main>
            <nav className={`absolute bottom-0 w-full flex justify-around items-center px-1 z-40 h-20 pb-2 border-t ${isLight ? 'bg-[#F3EDF7] border-[#EADDFF]/50' : 'bg-[#2B2930] border-[#4A4458]/50'}`}>
                {([['dashboard', 'space_dashboard', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']] as [TabType, string, string][]).map(([k, ic, lb]) => {
                    const a = activeTab === k;
                    return (<button key={k} onClick={() => setActiveTab(k)} className="flex flex-col items-center w-16 h-full pt-2 active:scale-95">
                        <div className={`w-14 h-8 rounded-full flex items-center justify-center ${a ? (isLight ? 'bg-[#E8DEF8]' : 'bg-[#4A4458]') : ''}`}>
                            <span className={`material-symbols text-[22px] ${a ? (isLight ? 'text-[#1D192B] font-variation-fill' : 'text-[#E8DEF8] font-variation-fill') : (isLight ? 'text-[#49454F]' : 'text-[#CAC4D0]')}`}>{ic}</span>
                        </div>
                        <span className={`text-[11px] mt-0.5 font-medium ${a ? (isLight ? 'text-[#1D192B]' : 'text-[#E8DEF8]') : (isLight ? 'text-[#49454F]' : 'text-[#CAC4D0]')}`}>{lb}</span>
                    </button>);
                })}
            </nav>
        </div>
    );
}

function DashboardView({ card, isLight, onNav }: { card: string, isLight: boolean, onNav: (t: TabType) => void }) {
    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: 20 }} variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[100px] px-4 space-y-5">
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <div className="flex items-center space-x-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#D0BCFF]"><Icon name="auto_awesome" className="text-base text-[#381E72]" /></div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${isLight ? 'text-[#6750A4]' : 'text-[#D0BCFF]'}`}>AI Collaboration Briefing</span>
                </div>
                <p className={`text-[14px] leading-[1.65] ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>Your team had a <span className="font-semibold text-[#D0BCFF]">productive sprint</span> — 14 documents updated, 3 design reviews completed. Sara&apos;s design system update needs your review. <span className="font-semibold">2 pending approvals</span> in the content pipeline.</p>
                <button onClick={() => onNav('copilot')} className="mt-3 flex items-center space-x-1.5 text-xs font-semibold text-[#D0BCFF]"><span>Ask follow-up</span><Icon name="arrow_forward" className="text-sm" /></button>
            </motion.div>

            {/* Workspace Activity Carousel */}
            <motion.div variants={fadeUp}>
                <div className="flex justify-between items-center mb-3 px-1"><h3 className="font-bold text-base">Workspace Activity</h3><button className="text-xs font-semibold text-[#D0BCFF]">See All</button></div>
                <div className="flex space-x-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
                    {workspaces.slice(0, 4).map((ws, i) => (
                        <motion.div key={ws.id} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 400, damping: 30 }}
                            className={`shrink-0 w-[155px] p-4 ${card} active:scale-[0.97] transition-transform`}>
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-[13px] truncate max-w-[80px]">{ws.name.split(' ')[0]}</span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${ws.status === 'Active' ? 'bg-[#146C2E]/15 text-emerald-400' : ws.status === 'Review' ? 'bg-amber-500/15 text-amber-400' : 'bg-gray-500/15 text-gray-400'}`}>{ws.status}</span>
                            </div>
                            <span className={`text-[11px] block mb-2 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{ws.members} members</span>
                            <Sparkline data={ws.data} color={ws.activity > 70 ? '#4CAF50' : ws.activity > 50 ? '#FF9800' : '#F44336'} width={120} height={28} />
                            <span className="text-[14px] font-semibold mt-2 block">{ws.activity}% active</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Team Activity with progress bars */}
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <h3 className="font-bold text-[15px] mb-3">Team Activity</h3>
                <div className="space-y-2.5">
                    {teamActivity.map((a, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.color === 'purple' ? 'bg-purple-500/15 text-purple-400' : a.color === 'blue' ? 'bg-blue-500/15 text-blue-400' : a.color === 'emerald' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}><Icon name={a.icon} className="text-sm" /></div>
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
                    {[{ icon: 'edit_document', label: 'New Doc', desc: 'Create document', g: 'from-purple-500/20 to-fuchsia-500/20' },
                    { icon: 'groups', label: 'Join Room', desc: 'Live session', g: 'from-blue-500/20 to-cyan-500/20' },
                    { icon: 'calendar_today', label: 'Schedule', desc: 'Plan meeting', g: 'from-emerald-500/20 to-teal-500/20' },
                    { icon: 'analytics', label: 'Analytics', desc: 'View stats', g: 'from-amber-500/20 to-orange-500/20' },
                    ].map(a => (
                        <motion.button key={a.label} whileTap={{ scale: 0.96 }} onClick={() => onNav('copilot')}
                            className={`flex flex-col text-left p-4 rounded-[20px] ${isLight ? 'bg-[#EADDFF] text-[#1D192B]' : `bg-gradient-to-br ${a.g} border border-white/5`}`}>
                            <Icon name={a.icon} className="mb-2 text-xl text-[#D0BCFF]" /><span className="font-semibold text-[14px] mb-0.5">{a.label}</span><span className="text-[11px] opacity-60">{a.desc}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

function WorkspacesView({ card, isLight }: { card: string, isLight: boolean }) {
    const [sel, setSel] = useState<string | null>(null);
    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[100px] px-4 space-y-5">
            <motion.div variants={fadeUp}><div className={`flex items-center space-x-3 px-4 py-3 rounded-full ${isLight ? 'bg-[#EADDFF]/50' : 'bg-[#4A4458]/40'}`}><Icon name="search" className="text-lg opacity-50" /><span className="text-[14px] opacity-40">Search workspaces...</span></div></motion.div>
            <motion.div variants={fadeUp}>
                <h3 className="font-bold text-base mb-3 px-1">All Workspaces</h3>
                <div className="space-y-2">
                    {workspaces.map((ws, i) => (
                        <motion.button key={ws.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                            onClick={() => setSel(sel === ws.id ? null : ws.id)} className={`w-full flex items-center justify-between p-4 ${card} active:scale-[0.98]`}>
                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLight ? 'bg-[#EADDFF]' : 'bg-[#4A4458]'}`}><Icon name={ws.icon} className="text-lg text-[#D0BCFF]" /></div>
                                <div className="text-left"><span className="font-semibold text-[14px] block">{ws.name}</span><span className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{ws.members} members · {ws.docs} docs</span></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Sparkline data={ws.data} color={ws.activity > 70 ? '#4CAF50' : '#FF9800'} width={40} height={16} />
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${ws.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' : ws.status === 'Review' ? 'bg-amber-500/15 text-amber-400' : 'bg-gray-500/15 text-gray-400'}`}>{ws.status}</span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </motion.div>
            <AnimatePresence>{sel && (() => {
                const ws = workspaces.find(w => w.id === sel)!; return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSel(null)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`absolute bottom-0 left-0 right-0 rounded-t-[32px] p-6 pb-10 ${isLight ? 'bg-[#FEF7FF]' : 'bg-[#2B2930]'}`}>
                            <div className="w-10 h-1 rounded-full bg-gray-400/30 mx-auto mb-6" />
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isLight ? 'bg-[#EADDFF]' : 'bg-[#4A4458]'}`}><Icon name={ws.icon} className="text-2xl text-[#D0BCFF]" /></div>
                                <div><h3 className="text-xl font-bold">{ws.name}</h3><p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{ws.members} members · {ws.docs} docs</p></div>
                            </div>
                            <div className="mb-4 flex items-center space-x-4"><Sparkline data={ws.data} color="#D0BCFF" width={180} height={40} /><span className="font-bold text-xl text-[#D0BCFF]">{ws.activity}%</span></div>
                            <div className="grid grid-cols-3 gap-3">
                                {['Open', 'Ask AI', 'Share'].map((l, i) => (<button key={l} className={`py-3 rounded-2xl text-[13px] font-semibold active:scale-95 ${i === 0 ? 'bg-[#6750A4] text-white' : isLight ? 'bg-[#EADDFF] text-[#1D192B]' : 'bg-white/10 text-white'}`}>{l}</button>))}
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })()}</AnimatePresence>
        </motion.div>
    );
}

function CopilotView({ isLight }: { isLight: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const [msgs, setMsgs] = useState<{ id: number, role: 'user' | 'assistant', text: string, citations?: { source: string, snippet: string }[] }[]>([]);
    const [input, setInput] = useState(""); const [typing, setTyping] = useState(false); const [stream, setStream] = useState("");
    const ub = 'bg-gradient-to-br from-[#6750A4] to-[#9a82db] text-white rounded-[22px] rounded-tr-md shadow-[0_4px_16px_rgba(103,80,164,0.3)]';
    const bb = isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl border border-[#EADDFF]/50 text-[#1D192B] rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-xl border border-[#4A4458]/40 text-[#E8DEF8] rounded-[22px] rounded-tl-sm shadow-sm';
    useEffect(() => { if (msgs.length > 0) ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing, stream]);

    const send = (txt?: string) => {
        const t = txt || input; if (!t.trim()) return;
        setMsgs(p => [...p, { id: Date.now(), role: 'user', text: t }]); setInput(""); setTyping(true); setStream("");
        const r = mockResponses[Math.floor(Math.random() * mockResponses.length)]; let ci = 0;
        const iv = setInterval(() => { ci += 2; setStream(r.text.slice(0, ci)); if (ci >= r.text.length) { clearInterval(iv); setMsgs(p => [...p, { id: Date.now() + 1, role: 'assistant', text: r.text, citations: r.citations }]); setTyping(false); setStream(""); } }, 20);
    };

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute z-[10] inset-0 flex flex-col w-full h-full overflow-hidden pt-[100px] bg-transparent">
            {msgs.length === 0 ? (
                <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto scrollbar-none">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pt-[5vh] pb-8 shrink-0">
                        <div className="relative w-20 h-20 flex items-center justify-center mb-6"><div className="absolute inset-0 rounded-full animate-ping opacity-15 bg-[#6750A4]" style={{ animationDuration: '2s', animationIterationCount: 2 }} /><div className="w-full h-full rounded-full flex items-center justify-center shadow-2xl bg-[#6750A4]"><Icon name="auto_awesome" className="text-4xl text-white" /></div></div>
                        <h3 className="font-bold text-lg mb-1">Collaboration Copilot</h3><p className={`text-sm text-center max-w-[240px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Ask about workspaces, team activity, sprint status, or design reviews.</p>
                    </motion.div>
                    <div className="w-full mt-auto pb-4 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-widest mb-3 block px-1 text-white/40">Suggested</label>
                        <div className="grid grid-cols-2 gap-2.5">
                            {suggestedPrompts.map((p, i) => (<motion.button key={p.label} whileTap={{ scale: 0.96 }} onClick={() => send(p.prompt)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }} className={`flex flex-col text-left p-3.5 rounded-[18px] ${isLight ? 'bg-[#E8DEF8] text-[#1D192B]' : 'bg-[#4A4458] text-[#E8DEF8]'}`}><Icon name={p.icon} className="mb-1.5 text-lg" /><span className="font-semibold text-[13px]">{p.label}</span></motion.button>))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none pb-24">
                    {msgs.map(m => (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex flex-col max-w-[88%]"><div className={`px-4 py-3 text-[14px] leading-relaxed ${m.role === 'user' ? ub : bb}`}>{m.text}</div>
                            {m.role === 'assistant' && m.citations && <div className="mt-2 space-y-1.5 ml-1">{m.citations.map((c, i) => (<motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className={`flex items-start space-x-2 p-2.5 rounded-xl text-[11px] ${isLight ? 'bg-purple-50/80 border border-purple-100' : 'bg-purple-900/20 border border-purple-500/15'}`}><Icon name="verified" className="text-sm shrink-0 mt-0.5 text-[#6750A4]" /><div><span className="font-semibold block">{c.source}</span><span className="text-gray-400">{c.snippet}</span></div></motion.div>))}</div>}
                        </div></motion.div>))}
                    {typing && stream && <div className="flex justify-start"><div className={`max-w-[88%] px-4 py-3 text-[14px] leading-relaxed ${bb}`}>{stream}<span className="inline-block w-0.5 h-4 ml-0.5 bg-current animate-pulse align-text-bottom" /></div></div>}
                    {typing && !stream && <div className="flex justify-start"><div className={`px-4 py-3 flex space-x-1.5 ${bb}`}><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" /><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>}
                    <div ref={ref} className="pb-4" />
                </div>
            )}
            <div className={`px-4 pt-3 pb-[90px] flex items-end space-x-2 shrink-0 z-30 w-full ${isLight ? 'bg-[#F3EDF7] rounded-t-[28px]' : 'bg-[#2B2930] rounded-t-[28px]'}`}>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about your team..." className={`flex-1 outline-none text-[14px] ${isLight ? 'bg-[#EADDFF] text-[#1D192B] rounded-[24px] px-5 py-3' : 'bg-[#4A4458] text-[#E8DEF8] rounded-[24px] px-5 py-3'}`} />
                <button onClick={() => send()} disabled={!input.trim()} className="w-10 h-10 flex justify-center items-center shrink-0 disabled:opacity-40 bg-[#6750A4] text-white rounded-[14px]"><Icon name="arrow_upward" className="text-lg" /></button>
            </div>
        </motion.div>
    );
}

function NotificationsView({ card, isLight }: { card: string, isLight: boolean }) {
    const [exp, setExp] = useState<number | null>(null);
    const badge = (p: string) => p === 'critical' ? (isLight ? 'bg-red-100 text-red-700 border-red-200' : 'bg-red-500/15 text-red-400 border-red-500/20') : p === 'warning' ? (isLight ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-amber-500/15 text-amber-400 border-amber-500/20') : (isLight ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-blue-500/10 text-blue-400 border-blue-500/15');
    const iconBg = (c: string) => isLight ? `bg-${c}-100 text-${c}-600` : `bg-${c}-500/15 text-${c}-400`;
    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[100px] px-4 space-y-3">
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1 mb-1"><h2 className="text-xl font-medium text-[#D0BCFF]">Notifications</h2><span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${badge('critical')}`}>1 urgent</span></motion.div>
            {alerts.map(a => (<motion.div key={a.id} variants={fadeUp} onClick={() => setExp(exp === a.id ? null : a.id)} className={`p-4 ${card} active:scale-[0.98] cursor-pointer`}>
                <div className="flex items-start space-x-3">
                    <div className={`w-11 h-11 shrink-0 rounded-2xl flex justify-center items-center ${a.priority === 'critical' ? iconBg('red') : a.priority === 'warning' ? iconBg('amber') : iconBg('blue')}`}><Icon name={a.icon} className="text-xl" /></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1"><h3 className="font-semibold text-[14px] truncate pr-2">{a.title}</h3><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badge(a.priority)}`}>{a.priority}</span></div>
                        <p className={`text-[13px] leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{a.desc}</p>
                        <AnimatePresence>{exp === a.id && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p className={`text-[13px] leading-relaxed mt-2 pt-2 border-t ${isLight ? 'text-gray-700 border-gray-200' : 'text-gray-300 border-white/5'}`}>{a.detail}</p><button className="mt-3 flex items-center space-x-1.5 text-xs font-semibold text-[#D0BCFF]"><Icon name="auto_awesome" className="text-sm" /><span>Ask AI about this</span></button></motion.div>}</AnimatePresence>
                        <span className={`text-[11px] mt-2 block font-medium ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{a.time}</span>
                    </div>
                </div>
            </motion.div>))}
        </motion.div>
    );
}

function ProfileView({ card, isLight, theme, setTheme }: { card: string, isLight: boolean, theme: string, setTheme: (t: string) => void }) {
    const [modal, setModal] = useState(false);
    return (
        <motion.div initial="hidden" animate="show" exit={{ opacity: 0, x: -20 }} variants={stagger} className="absolute inset-0 overflow-y-auto scrollbar-none pb-28 pt-[100px] px-4 space-y-5">
            <motion.div variants={fadeUp} className="flex justify-between items-center px-1"><h2 className="text-xl font-bold">My Space</h2><button onClick={() => setModal(true)} className={`w-9 h-9 rounded-full flex items-center justify-center ${isLight ? 'bg-[#EADDFF]/50' : 'bg-[#4A4458]/50'}`}><Icon name="settings" className="opacity-70 text-[18px]" /></button></motion.div>
            <motion.div variants={fadeUp} className="flex flex-col items-center py-4">
                <div className="relative mb-3"><div className="w-24 h-24 rounded-full overflow-hidden p-[3px] bg-gradient-to-tr from-[#6750A4] to-[#D0BCFF] shadow-lg"><div className={`w-full h-full rounded-full overflow-hidden ${isLight ? 'bg-white' : 'bg-black/80'}`}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="Ali" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Ali&background=6750A4&color=fff" }} /></div></div><div className={`absolute bottom-0 right-0 w-6 h-6 bg-[#4CAF50] border-[3px] rounded-full ${isLight ? 'border-[#FAF8FC]' : 'border-[#111114]'}`} /></div>
                <h2 className="font-bold text-2xl">Ali Al-Zuhairi</h2><p className="text-sm font-medium mt-0.5 text-[#D0BCFF]">Platform Administrator</p>
            </motion.div>
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <div className="flex justify-between items-start mb-4"><div><h4 className="font-semibold text-[15px]">Collaboration Stats</h4><p className="text-[11px] opacity-50 mt-0.5">This month</p></div><span className="text-xs font-bold px-2 py-1 rounded-lg bg-[#146C2E]/10 text-[#4CAF50]">+22%</span></div>
                <div className="h-24 flex items-end justify-between gap-2 px-1">{[40, 65, 45, 80, 55, 90, 75].map((h, i) => (<div key={i} className="w-full h-full flex items-end justify-center"><motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.8, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }} className={`w-full max-w-[10px] rounded-t-full bg-gradient-to-t ${['from-purple-400 to-purple-600', 'from-fuchsia-400 to-fuchsia-600', 'from-pink-400 to-pink-600', 'from-rose-400 to-rose-600', 'from-orange-400 to-orange-600', 'from-amber-400 to-amber-600', 'from-indigo-400 to-indigo-600'][i]}`} /></div>))}</div>
            </motion.div>
            <motion.div variants={fadeUp} className={`p-5 ${card}`}>
                <h4 className="font-semibold text-[15px] mb-4">Team Engagement</h4>
                <div className="flex items-center space-x-5"><div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-[72px] h-[72px] -rotate-90" viewBox="0 0 36 36"><path className={isLight ? "text-gray-200" : "text-white/10"} stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "72, 100" }} transition={{ duration: 1.2 }} strokeLinecap="round" className="text-[#D0BCFF]" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "18, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-72" strokeLinecap="round" className="text-rose-500" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "10, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-90" strokeLinecap="round" className="text-amber-500" stroke="currentColor" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                    <span className="absolute text-[15px] font-extrabold text-[#D0BCFF]">72%</span></div>
                    <div className="flex-1 space-y-1.5">{[{ l: 'Active', p: '72%', c: 'bg-[#D0BCFF]' }, { l: 'Reviewing', p: '18%', c: 'bg-rose-500' }, { l: 'Idle', p: '10%', c: 'bg-amber-500' }].map(s => (<div key={s.l} className={`flex justify-between text-[11px] items-center p-1.5 rounded-lg ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.04]'}`}><span className="opacity-70 flex items-center font-medium"><span className={`w-2 h-2 rounded-full mr-2 ${s.c}`} />{s.l}</span><span className="font-bold">{s.p}</span></div>))}</div>
                </div>
            </motion.div>
            <AnimatePresence>{modal && <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-auto"><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" /><motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className={`relative w-[85%] max-w-sm rounded-[28px] p-6 shadow-2xl ${isLight ? 'bg-[#FEF7FF]' : 'bg-[#2B2930] text-[#E6E1E5]'}`}>
                <div className="flex justify-between items-center mb-5"><h3 className="text-xl font-bold">App Theme</h3><button onClick={() => setModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10"><Icon name="close" className="text-sm" /></button></div>
                <div className="space-y-2.5">{[{ v: 'light', l: 'Light', i: 'light_mode', c: 'text-orange-500' }, { v: 'dark', l: 'Dark', i: 'dark_mode', c: 'text-blue-400' }, { v: 'colorful', l: 'Colorful', i: 'palette', c: 'text-purple-500' }].map(t => { const a = theme === t.v; return (<button key={t.v} onClick={() => { setTheme(t.v); setModal(false); }} className={`w-full flex items-center justify-between p-3.5 rounded-2xl border ${a ? (isLight ? 'bg-[#EADDFF] border-[#EADDFF]' : 'bg-[#4A4458] border-[#4A4458]') : 'bg-transparent border-transparent'}`}><div className="flex items-center space-x-3"><Icon name={t.i} className={a ? t.c : 'opacity-50'} /><span className={a ? 'font-bold' : 'font-medium'}>{t.l}</span></div>{a && <Icon name="check_circle" className={t.c} />}</button>); })}</div>
            </motion.div></div>}</AnimatePresence>
        </motion.div>
    );
}
