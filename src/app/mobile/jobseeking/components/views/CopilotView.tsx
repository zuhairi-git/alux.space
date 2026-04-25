import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../../../shared';
import type { MobileTheme } from '../../../shared';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    typing?: boolean;
    citations?: { title: string; source: string; match?: number }[];
}

interface ViewProps {
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
}

export function CopilotView({ isLight, isColorful, theme }: ViewProps) {
    const promptCardClass = isColorful
        ? 'rounded-2xl bg-primary/10 text-white backdrop-blur-xl border border-primary/20'
        : theme.copilot.promptCard(isLight);
    const promptIconColor = isColorful ? 'text-primary' : theme.copilot.promptIconColor;
    const inputBarClass = isColorful ? 'bg-ds-colorful-bg/90 rounded-t-[28px]' : theme.copilot.inputBar(isLight);
    const inputFieldClass = isColorful
        ? 'bg-ds-card-colorful-from/80 text-white border border-primary/15'
        : theme.copilot.inputField(isLight);
    const bb = isColorful
        ? 'bg-ds-card-colorful-from/60 backdrop-blur-[20px] border border-primary/20 text-white rounded-2xl'
        : theme.copilot.botBubble(isLight);
    const pingBgClass = isColorful ? 'bg-primary' : theme.copilot.pingBg;
    const heroGradientClass = isColorful ? 'bg-gradient-to-br from-primary to-primary-dark' : theme.copilot.heroGradient;
    const userBubbleClass = isColorful
        ? `bg-gradient-to-br from-primary to-primary-dark text-white ${theme.platform === 'ios' ? 'rounded-[22px] rounded-tr-md' : 'rounded-[24px] rounded-tr-md'} shadow-[0_2px_8px_rgba(255,140,66,0.25)]`
        : theme.copilot.userBubble;
    const defaultMessages: Message[] = [
        {
            id: '1',
            text: "Hi! I'm your AI Career Coach. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ];

    const [messages, setMessages] = useState<Message[]>(defaultMessages);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const newMsg: Message = { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, newMsg]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Based on your availability, I found a matching shift at 'The Local Pub' this weekend. It aligns well with your previous hospitality experience. Would you like me to tailor your resume for this specific role?",
                sender: 'bot',
                timestamp: new Date(),
                citations: [
                    { title: "Weekend Bartender", source: "The Local Pub", match: 95 }
                ]
            }]);
        }, 1500);
    };

    const suggestedPrompts = [
        { icon: 'search', label: 'Find Jobs', prompt: 'Find weekend jobs near me' },
        { icon: 'description', label: 'Tailor CV', prompt: 'Tailor my CV for Hospitality' },
        { icon: 'record_voice_over', label: 'Interview Prep', prompt: 'Prep for a Barista interview' },
        { icon: 'bolt', label: 'Update Skills', prompt: 'Update my skills profile' },
    ];

    return (
        <div className={`absolute inset-0 flex flex-col ${theme.contentPaddingTop}`}>
            {/* Scrollable Chat Area */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-5 pb-8 pt-4 no-scrollbar">
                {messages.length === 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8 pt-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${heroGradientClass}`}>
                            <Icon name="auto_awesome" className="text-white text-[32px]" />
                        </div>
                        <h2 className="text-center font-bold text-[28px] mb-2">Job Copilot</h2>
                        <p className={`text-center text-[15px] mb-8 ${isLight ? 'text-ds-gray-500' : 'text-ds-gray-400'}`}>Smart AI matchmaking & CV tailoring</p>

                        <div className="grid grid-cols-2 gap-3">
                            {suggestedPrompts.map((p, i) => (
                                <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => handleSend(p.prompt)}
                                    className={`flex flex-col text-left p-3.5 ${promptCardClass}`}
                                >
                                    <Icon name={p.icon} className={`mb-1.5 text-lg ${promptIconColor}`} />
                                    <span className="font-semibold text-[13px]">{p.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div key={msg.id} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`mb-6 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'bot' && (
                                <div className={`mr-3 mt-1 shrink-0 `}>
                                    <Icon name="auto_awesome" className={`text-[16px] text-primary`} />
                                </div>
                            )}
                            <div className={`max-w-[75%] px-4 py-3 text-[16px] leading-relaxed ${msg.sender === 'user' ? userBubbleClass : bb}`}>
                                <p>{msg.text}</p>
                                {msg.citations && msg.citations.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-black/5 border-white/10 flex gap-2 overflow-x-auto no-scrollbar pb-1">
                                        {msg.citations.map((cit, i) => (
                                            <div key={i} className={`flex items-center whitespace-nowrap px-2.5 py-1.5 rounded-lg text-[11px] font-semibold ${theme.copilot.citationCard(isLight)}`}>
                                                <Icon name="work" className={`text-[13px] mr-1.5 ${theme.copilot.citationIcon}`} />
                                                <span>{cit.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start mb-6">
                            <div className={`mr-3 mt-1 shrink-0`}>
                                <Icon name="auto_awesome" className={`text-[16px] text-primary`} />
                            </div>
                            <div className={`px-5 py-3.5 flex items-center space-x-1.5 w-[72px] h-[48px] ${bb}`}>
                                {[0, 1, 2].map((i) => (
                                    <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                        className={`w-2 h-2 rounded-full ${isLight ? 'bg-ds-gray-400' : 'bg-ds-gray-500'}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-4" />
                </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div className={`w-full p-4 pb-[100px] border-t border-black/5 border-white/5 ${inputBarClass}`}>
                <div className={`flex items-center p-1.5 w-full ${theme.radii.search} ${inputFieldClass}`}>
                    <button className={`w-10 h-10 rounded-full flex items-center justify-center ${isLight ? 'text-ds-gray-500' : 'text-ds-gray-400'}`}>
                        <Icon name="add" className="text-[24px]" />
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                        placeholder="Ask Copilot..."
                        className="flex-1 bg-transparent border-none outline-none px-2 text-[16px] placeholder:text-ds-gray-500 min-w-0"
                    />
                    <button onClick={() => handleSend(inputValue)} disabled={!inputValue.trim()}
                        className={`w-10 h-10 ${theme.radii.sendButton} flex items-center justify-center transition-all ${inputValue.trim() ? `${pingBgClass} text-white shadow-md active:scale-90` : 'text-ds-gray-400 bg-transparent'}`}
                    >
                        <Icon name="arrow_upward" className="text-[20px]" />
                    </button>
                </div>
            </div>
        </div>
    );
}
