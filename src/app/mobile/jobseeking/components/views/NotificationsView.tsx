import React from 'react';
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

export function NotificationsView({ card, isLight, isColorful, theme, onNav }: ViewProps) {
    const notification = theme.notification;
    const primaryHeaderClass = isColorful
        ? 'bg-ds-card-colorful-from/80 border-b border-primary/15 text-primary'
        : notification.sectionHeader('primary', isLight);
    const successHeaderClass = notification.sectionHeader('success', isLight);
    const secondaryActionClass = isColorful
        ? 'bg-ds-card-colorful-from/80 border border-primary/15 text-primary'
        : notification.secondaryAction(isLight);
    const statSurfaceClass = isColorful
        ? 'bg-ds-card-colorful-from/80 border border-primary/15'
        : notification.statSurface(isLight);
    const mutedTextClass = notification.mutedText(isLight);
    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 380, damping: 26, mass: 0.8 } }
    };

    return (
        <div className={`absolute inset-0 overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>
            <AnimatePresence>
                <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-3">

                    {/* Priority Alert - Interview Invite */}
                    <motion.div variants={itemVariants} className={`${card} overflow-hidden`}>
                        <div className={`px-4 py-2 flex items-center gap-2 ${successHeaderClass}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-ds-success animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Action Required</span>
                            <span className={`ms-auto text-[11px] ${mutedTextClass}`}>Just now</span>
                        </div>
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${notification.successIconBg}`}>
                                    <Icon name="celebration" className={`text-[20px] ${notification.successIconColor}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[15px] mb-0.5">Interview Invite</h3>
                                    <p className={`text-[13px] leading-snug ${isLight ? 'text-ds-gray-600' : 'text-ds-gray-300'}`}>
                                        <strong>Cafe Local</strong> wants to schedule your Weekend Barista interview.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button onClick={() => onNav?.('copilot')}
                                    className={`flex-1 py-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 ${secondaryActionClass} active:scale-95 transition-transform`}>
                                    <Icon name="auto_awesome" className="text-[13px]" /> Prep with AI
                                </button>
                                <button className={`flex-1 py-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 ${notification.successAction} active:scale-95 transition-transform`}>
                                    <Icon name="event" className="text-[13px]" /> Schedule
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Match */}
                    <motion.div variants={itemVariants} className={`${card} overflow-hidden`}>
                        <div className={`px-4 py-2 flex items-center gap-2 ${primaryHeaderClass}`}>
                            <Icon name="auto_awesome" className="text-[13px]" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">New AI Match</span>
                            <span className={`ms-auto text-[11px] ${mutedTextClass}`}>2h ago</span>
                        </div>
                        <div className="p-4">
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${theme.notification.infoIconBg}`}>
                                    <Icon name="shopping_bag" className={`text-[20px] ${theme.notification.infoIconColor}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="font-bold text-[15px]">Retail Assistant</h3>
                                        <span className={`text-[12px] font-bold px-2 py-0.5 rounded-lg ${notification.matchBadge}`}>95% match</span>
                                    </div>
                                    <p className={`text-[13px] ${mutedTextClass}`}>City Center · €12.5/h · Weekend shifts</p>
                                </div>
                            </div>
                            <button onClick={() => onNav?.('jobs')}
                                className={`mt-3 w-full py-2 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 ${secondaryActionClass} active:scale-95 transition-transform`}>
                                <Icon name="work" className="text-[13px]" /> View Job
                            </button>
                        </div>
                    </motion.div>

                    {/* Weekly Insights */}
                    <motion.div variants={itemVariants} className={`${card} overflow-hidden`}>
                        <div className={`px-4 py-2 flex items-center gap-2 ${primaryHeaderClass}`}>
                            <Icon name="insights" className="text-[13px]" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Weekly Insights</span>
                            <span className={`ms-auto text-[11px] ${mutedTextClass}`}>1d ago</span>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {[
                                    { label: 'Profile Views', value: '+20%', icon: 'visibility', color: notification.statAccent },
                                    { label: 'Applications', value: '4', icon: 'send', color: notification.statAccent },
                                    { label: 'Avg Match', value: '88%', icon: 'stars', color: 'text-ds-gold-400' },
                                ].map(stat => (
                                    <div key={stat.label} className={`flex flex-col items-center py-2.5 rounded-xl ${statSurfaceClass}`}>
                                        <Icon name={stat.icon} className={`text-[16px] mb-1 ${stat.color}`} />
                                        <span className="font-bold text-[14px]">{stat.value}</span>
                                        <span className={`text-[10px] text-center leading-tight mt-0.5 ${mutedTextClass}`}>{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                            <p className={`text-[13px] leading-snug ${mutedTextClass}`}>
                                Keep your availability updated to boost your match rate.
                            </p>
                        </div>
                    </motion.div>

                </motion.div>
            </AnimatePresence>
        </div>
    );
}
