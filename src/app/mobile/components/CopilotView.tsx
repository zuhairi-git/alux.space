'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Icon, mockResponses, suggestedPrompts } from '../shared';
import type { MobileTheme } from '../themes';

interface CopilotViewProps {
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
}

export function CopilotView({ isLight, isColorful = false, theme }: CopilotViewProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [msgs, setMsgs] = useState<{ id: number, role: 'user' | 'assistant', text: string, citations?: { source: string, snippet: string }[] }[]>([]);
    const [input, setInput] = useState(""); const [typing, setTyping] = useState(false); const [stream, setStream] = useState("");
    const ub = isColorful
        ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-[22px] rounded-tr-md shadow-[0_4px_16px_rgb(var(--glow-primary-rgb)/0.3)]'
        : theme.copilot.userBubble;
    const bb = isColorful
        ? `${theme.platform === 'ios' ? 'bg-ds-card-colorful-from/60 backdrop-blur-[20px] border border-primary/20 text-white rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-ds-dark-1/40 backdrop-blur-xl border border-primary/20 text-white rounded-[22px] rounded-tl-sm shadow-sm'}`
        : theme.copilot.botBubble(isLight);
    const inputBarClass = isColorful ? 'bg-ds-colorful-bg/90 rounded-t-[28px]' : theme.copilot.inputBar(isLight);
    const inputFieldClass = isColorful
        ? `bg-white/10 text-white ${theme.platform === 'ios' ? 'rounded-[18px]' : 'rounded-[24px]'} px-5 py-3 placeholder:text-white/40`
        : theme.copilot.inputField(isLight);
    const promptCardClass = isColorful
        ? `${theme.platform === 'ios' ? 'rounded-[16px]' : 'rounded-[18px]'} bg-primary/10 text-white backdrop-blur-xl border border-primary/20`
        : theme.copilot.promptCard(isLight);
    const promptIconColor = isColorful ? 'text-primary' : theme.copilot.promptIconColor;
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
                <div className="flex-1 flex flex-col p-7 items-center overflow-y-auto scrollbar-none">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center pt-[5vh] pb-10 shrink-0">
                        <div className="relative w-16 h-16 flex items-center justify-center mb-7"><div className={`absolute inset-0 rounded-full animate-ping opacity-15 ${isColorful ? 'bg-primary' : theme.copilot.pingBg}`} style={{ animationDuration: '2s', animationIterationCount: 2 }} /><Icon name="auto_awesome" className={`text-[42px] ${isColorful ? 'text-primary' : 'text-ds-blue-500'}`} /></div>
                        <h3 className="font-bold text-xl mb-2">Collaboration Copilot</h3><p className={`text-[15px] text-center max-w-[260px] leading-relaxed ${isLight ? 'text-ds-gray-500' : 'text-ds-gray-400'}`}>Ask about workspaces, team activity, sprint status, or design reviews.</p>
                    </motion.div>
                    <div className="w-full mt-auto pb-5 shrink-0">
                        <label className={`text-[11px] font-bold uppercase tracking-widest mb-4 block px-1 ${isLight ? 'text-black/40' : 'text-white/40'}`}>Suggested</label>
                        <div className="grid grid-cols-2 gap-3">
                            {suggestedPrompts.map((p, i) => (<motion.button key={p.label} whileTap={{ scale: 0.96 }} onClick={() => send(p.prompt)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06 }} className={`flex flex-col text-left p-4 ${promptCardClass}`}><Icon name={p.icon} className={`mb-2 text-xl ${promptIconColor}`} /><span className="font-semibold text-[14px]">{p.label}</span></motion.button>))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none pb-24">
                    {msgs.map(m => (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex flex-col max-w-[85%]"><div className={`px-5 py-3.5 text-[15px] leading-[1.7] ${m.role === 'user' ? ub : bb}`}>{m.text}</div>
                            {m.role === 'assistant' && m.citations && <div className="mt-2.5 space-y-2 ml-1">{m.citations.map((c, i) => (<motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className={`flex items-start space-x-2.5 p-3 rounded-xl text-[12px] ${theme.copilot.citationCard(isLight)}`}><Icon name="verified" className={`text-[15px] shrink-0 mt-0.5 ${theme.copilot.citationIcon}`} /><div><span className="font-semibold block">{c.source}</span><span className="text-ds-gray-400">{c.snippet}</span></div></motion.div>))}</div>}
                        </div></motion.div>))}
                    {typing && stream && <div className="flex justify-start"><div className={`max-w-[85%] px-5 py-3.5 text-[15px] leading-[1.7] ${bb}`}>{stream}<span className="inline-block w-0.5 h-4 ml-0.5 bg-current animate-pulse align-text-bottom" /></div></div>}
                    {typing && !stream && <div className="flex justify-start"><div className={`px-5 py-3.5 flex space-x-2 ${bb}`}><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" /><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '150ms' }} /><div className="w-2 h-2 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '300ms' }} /></div></div>}
                    <div ref={ref} className="pb-5" />
                </div>
            )}
            <div className={`px-5 pt-3.5 pb-[90px] flex items-end space-x-2.5 shrink-0 z-30 w-full ${inputBarClass}`}>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about your team..." className={`flex-1 outline-none text-[15px] ${inputFieldClass}`} />
                <button onClick={() => send()} disabled={!input.trim()} className={`w-11 h-11 flex justify-center items-center shrink-0 disabled:opacity-40 ${isColorful ? 'bg-primary' : theme.radii.sendButtonBg} text-white ${theme.radii.sendButton}`}><Icon name="arrow_upward" className="text-lg" /></button>
            </div>
        </motion.div>
    );
}
