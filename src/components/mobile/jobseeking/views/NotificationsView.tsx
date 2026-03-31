import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';

interface ViewProps {
    card?: string;
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
    onNav?: (tab: string) => void;
}

export function NotificationsView({ card, isLight, isColorful, theme, onNav }: ViewProps) {
    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 380, damping: 26, mass: 0.8 } }
    };

    return (
        <div className={`h-full w-full overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>
            <AnimatePresence>
                <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-3">

                    {/* Priority Alert - Interview Invite */}
                    <motion.div variants={itemVariants} className={`${card} overflow-hidden`}>
                        <div className={`px-4 py-2 flex items-center gap-2 bg-ds-success/10 border-b ${isLight ? 'border-ds-success/15' : 'border-ds-success/20'}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-ds-success animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-ds-success">Action Required</span>
                            <span className={`ml-auto text-[11px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>Just now</span>
                        </div>
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-ds-success/15 shrink-0">
                                    <Icon name="celebration" className="text-[20px] text-ds-success" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[15px] mb-0.5">Interview Invite</h3>
                                    <p className={`text-[13px] leading-snug ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                                        <strong>Cafe Local</strong> wants to schedule your Weekend Barista interview.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button onClick={() => onNav?.('copilot')}
                                    className={`flex-1 py-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 ${isLight ? 'bg-black/5 text-gray-700' : 'bg-white/8 text-white/80'} active:scale-95 transition-transform`}>
                                    <Icon name="auto_awesome" className="text-[13px]" /> Prep with AI
                                </button>
                                <button className="flex-1 py-2 rounded-xl text-[12px] font-semibold bg-ds-success text-white flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
                                    <Icon name="event" className="text-[13px]" /> Schedule
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Match */}
                    <motion.div variants={itemVariants} className={`${card} overflow-hidden`}>
                        <div className={`px-4 py-2 flex items-center gap-2 ${isColorful ? 'bg-primary/10 border-b border-primary/20' : isLight ? 'bg-primary/8 border-b border-[var(--primary)]/10' : 'bg-primary/10 border-b border-[var(--primary)]/15'}`}>
                            <Icon name="auto_awesome" className={`text-[13px] ${isColorful ? 'text-primary' : isLight ? 'text-ds-blue-500' : 'text-ds-blue-400'}`} />
                            <span className={`text-[11px] font-bold uppercase tracking-wider ${isColorful ? 'text-primary' : isLight ? 'text-ds-blue-600' : 'text-ds-blue-400'}`}>New AI Match</span>
                            <span className={`ml-auto text-[11px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>2h ago</span>
                        </div>
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${theme.notification.infoIconBg}`}>
                                    <Icon name="shopping_bag" className={`text-[20px] ${theme.notification.infoIconColor}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="font-bold text-[15px]">Retail Assistant</h3>
                                        <span className="text-[12px] font-bold text-ds-success bg-ds-success/10 px-2 py-0.5 rounded-lg">95% match</span>
                                    </div>
                                    <p className={`text-[13px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>City Center Ã‚Â· Ã¢â€šÂ¬12.5/h Ã‚Â· Weekend shifts</p>
                                </div>
                            </div>
                            <button onClick={() => onNav?.('jobs')}
                                className={`mt-3 w-full py-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 ${isLight ? 'bg-black/5 text-gray-700' : 'bg-white/8 text-white/80'} active:scale-95 transition-transform`}>
                                <Icon name="work" className="text-[13px]" /> View Job
                            </button>
                        </div>
                    </motion.div>

                    {/* Weekly Insights */}
                    <motion.div variants={itemVariants} className={`${card} overflow-hidden`}>
                        <div className={`px-4 py-2 flex items-center gap-2 ${isLight ? 'bg-primary/5 border-b border-primary/10' : 'bg-primary/10 border-b border-primary/15'}`}>
                            <Icon name="insights" className="text-[13px] text-primary" />
                            <span className={`text-[11px] font-bold uppercase tracking-wider text-primary`}>Weekly Insights</span>
                            <span className={`ml-auto text-[11px] ${isLight ? 'text-gray-400' : 'text-white/40'}`}>1d ago</span>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {[
                                    { label: 'Profile Views', value: '+20%', icon: 'visibility', color: 'text-primary' },
                                    { label: 'Applications', value: '4', icon: 'send', color: isColorful ? 'text-primary' : isLight ? 'text-ds-blue-500' : 'text-ds-blue-400' },
                                    { label: 'Avg Match', value: '88%', icon: 'stars', color: 'text-amber-400' },
                                ].map(stat => (
                                    <div key={stat.label} className={`flex flex-col items-center py-2.5 rounded-xl ${isLight ? 'bg-black/[0.03]' : 'bg-white/[0.04]'}`}>
                                        <Icon name={stat.icon} className={`text-[16px] mb-1 ${stat.color}`} />
                                        <span className="font-bold text-[14px]">{stat.value}</span>
                                        <span className={`text-[10px] text-center leading-tight mt-0.5 ${isLight ? 'text-gray-500' : 'text-white/40'}`}>{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className={`text-[13px] leading-snug ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                Keep your availability updated to boost your match rate.
                            </p>
                        </div>
                    </motion.div>

                </motion.div>
            </AnimatePresence>
        </div>
    );
}
