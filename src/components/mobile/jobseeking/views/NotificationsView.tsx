import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';

interface ViewProps {
    card?: string;
    isLight: boolean;
    theme: MobileTheme;
}

export function NotificationsView({ card, isLight, theme }: ViewProps) {
    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div className={`h-full w-full overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>
            <AnimatePresence>
                <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">

                    {/* Priority Alert */}
                    <motion.div variants={itemVariants} className={`${card} p-5 border-l-4 border-emerald-500`}>
                        <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-emerald-500/15 shrink-0">
                                <Icon name="task_alt" className="text-[20px] text-emerald-500" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-[16px]">Application Accepted</h3>
                                    <span className="text-[12px] opacity-60">Just now</span>
                                </div>
                                <p className={`text-[14px] leading-snug mb-3 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                                    Cafe Local wants to schedule an interview for the Weekend Barista position.
                                </p>
                                <div className="flex space-x-2 border-t border-black/5 border-white/10 pt-3">
                                    <button className={`text-[13px] font-semibold flex items-center ${theme.notification.askAiColor} active:scale-95 transition-transform`}>
                                        <Icon name="auto_awesome" className="text-[14px] mr-1.5" /> Prep with AI
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Standard Alert */}
                    <motion.div variants={itemVariants} className={`${card} p-5`}>
                        <div className="flex items-start">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 shrink-0 ${theme.notification.infoIconBg}`}>
                                <Icon name="work" className={`text-[20px] ${theme.notification.infoIconColor}`} />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-[16px]">New AI Match</h3>
                                    <span className="text-[12px] opacity-60">2h ago</span>
                                </div>
                                <p className={`text-[14px] leading-snug mb-3 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                                    Found a 95% match for &apos;Retail Assistant&apos; matching your weekend availability.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Weekly Report */}
                    <motion.div variants={itemVariants} className={`${card} p-5`}>
                        <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-purple-500/10 shrink-0">
                                <Icon name="insights" className="text-[20px] text-purple-500" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-[16px]">Weekly Insights</h3>
                                    <span className="text-[12px] opacity-60">1d ago</span>
                                </div>
                                <p className={`text-[14px] leading-snug ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                                    Your profile views are up 20% this week. Keep your availability updated!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
