'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, mockResponses, suggestedPrompts } from '../shared';
import type { MobileTheme } from '../themes';

interface CopilotViewProps {
    isLight: boolean;
    theme: MobileTheme;
}

export function CopilotView({ isLight, theme }: CopilotViewProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [msgs, setMsgs] = useState<{ id: number, role: 'user' | 'assistant', text: string, citations?: { source: string, snippet: string }[] }[]>([]);
    const [input, setInput] = useState(""); const [typing, setTyping] = useState(false); const [stream, setStream] = useState("");
    const ub = theme.copilot.userBubble;
    const bb = theme.copilot.botBubble(isLight);
    useEffect(() => { if (msgs.length > 0) ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing, stream]);

    const send = (txt?: string) => {
        const t = txt || input; if (!t.trim()) return;
        setMsgs(p => [...p, { id: Date.now(), role: 'user', text: t }]); setInput(""); setTyping(true); setStream("");
        const r = mockResponses[Math.floor(Math.random() * mockResponses.length)]; let ci = 0;
        const iv = setInterval(() => { ci += 2; setStream(r.text.slice(0, ci)); if (ci >= r.text.length) { clearInterval(iv); setMsgs(p => [...p, { id: Date.now() + 1, role: 'assistant', text: r.text, citations: r.citations }]); setTyping(false); setStream(""); } }, 20);
    };

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className={`absolute z-[10] inset-0 flex flex-col w-full h-full overflow-hidden ${theme.contentPaddingTop} bg-transparent`}>
            {msgs.length === 0 ? (
                <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto scrollbar-none">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pt-[5vh] pb-8 shrink-0">
                        <div className="relative w-20 h-20 flex items-center justify-center mb-6"><div className={`absolute inset-0 rounded-full animate-ping opacity-15 ${theme.copilot.pingBg}`} style={{ animationDuration: '2s', animationIterationCount: 2 }} /><div className={`w-full h-full rounded-full flex items-center justify-center shadow-2xl ${theme.copilot.heroGradient}`}><Icon name="auto_awesome" className="text-4xl text-white" /></div></div>
                        <h3 className="font-bold text-lg mb-1">Collaboration Copilot</h3><p className={`text-sm text-center max-w-[240px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Ask about workspaces, team activity, sprint status, or design reviews.</p>
                    </motion.div>
                    <div className="w-full mt-auto pb-4 shrink-0">
                        <label className="text-[10px] font-bold uppercase tracking-widest mb-3 block px-1 text-white/40">Suggested</label>
                        <div className="grid grid-cols-2 gap-2.5">
                            {suggestedPrompts.map((p, i) => (<motion.button key={p.label} whileTap={{ scale: 0.96 }} onClick={() => send(p.prompt)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }} className={`flex flex-col text-left p-3.5 ${theme.platform === 'ios' ? 'rounded-[16px]' : 'rounded-[18px]'} ${theme.copilot.promptCard(isLight)}`}><Icon name={p.icon} className={`mb-1.5 text-lg ${theme.copilot.promptIconColor}`} /><span className="font-semibold text-[13px]">{p.label}</span></motion.button>))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none pb-24">
                    {msgs.map(m => (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex flex-col max-w-[88%]"><div className={`px-4 py-3 text-[14px] leading-relaxed ${m.role === 'user' ? ub : bb}`}>{m.text}</div>
                            {m.role === 'assistant' && m.citations && <div className="mt-2 space-y-1.5 ml-1">{m.citations.map((c, i) => (<motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className={`flex items-start space-x-2 p-2.5 rounded-xl text-[11px] ${theme.copilot.citationCard(isLight)}`}><Icon name="verified" className={`text-sm shrink-0 mt-0.5 ${theme.copilot.citationIcon}`} /><div><span className="font-semibold block">{c.source}</span><span className="text-gray-400">{c.snippet}</span></div></motion.div>))}</div>}
                        </div></motion.div>))}
                    {typing && stream && <div className="flex justify-start"><div className={`max-w-[88%] px-4 py-3 text-[14px] leading-relaxed ${bb}`}>{stream}<span className="inline-block w-0.5 h-4 ml-0.5 bg-current animate-pulse align-text-bottom" /></div></div>}
                    {typing && !stream && <div className="flex justify-start"><div className={`px-4 py-3 flex space-x-1.5 ${bb}`}><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" /><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>}
                    <div ref={ref} className="pb-4" />
                </div>
            )}
            <div className={`px-4 pt-3 pb-[90px] flex items-end space-x-2 shrink-0 z-30 w-full ${theme.copilot.inputBar(isLight)}`}>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about your team..." className={`flex-1 outline-none text-[14px] ${theme.copilot.inputField(isLight)}`} />
                <button onClick={() => send()} disabled={!input.trim()} className={`w-10 h-10 flex justify-center items-center shrink-0 disabled:opacity-40 ${theme.radii.sendButtonBg} text-white ${theme.radii.sendButton}`}><Icon name="arrow_upward" className="text-lg" /></button>
            </div>
        </motion.div>
    );
}
