import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';

interface ViewProps {
    card?: string;
    isLight: boolean;
    theme: MobileTheme;
}

export function JobsView({ card, isLight, theme }: ViewProps) {
    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div className={`h-full w-full overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>
            {/* Search Bar */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex items-center px-4 py-3 mb-6 ${theme.radii.search} ${theme.workspace.searchBar(isLight)}`}
            >
                <Icon name="search" className={`text-[20px] mr-3 ${theme.workspace.searchText(isLight)}`} />
                <input
                    type="text"
                    placeholder="Search jobs, skills, companies..."
                    className="bg-transparent border-none outline-none flex-1 text-[16px] placeholder:opacity-40"
                    readOnly
                />
            </motion.div>

            {/* Quick Filters */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex space-x-3 mb-6 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
                {['All', 'Weekend', 'Evening', 'Remote', 'Hospitality', 'Retail'].map((filter, i) => (
                    <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors ${i === 1 ? theme.workspace.primaryButton : theme.workspace.secondaryButton(isLight)}`}>
                        {filter}
                    </button>
                ))}
            </motion.div>

            <motion.div variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
                {[
                    { title: 'Weekend Bartender', company: 'The Local Pub', location: '1.2 km away', wage: '€14-16/h', match: 95, tag: 'High Match' },
                    { title: 'Retail Assistant', company: 'Tech Store M', location: 'City Center', wage: '€12.5/h', match: 88, tag: 'New' },
                    { title: 'Event Security', company: 'SafeGuard Co.', location: 'Stadium', wage: '€16/h', match: 82, tag: '' },
                    { title: 'Tutor (Math)', company: 'Freelance', location: 'Remote', wage: '€20/h', match: 75, tag: '' }
                ].map((job, i) => (
                    <motion.div key={i} variants={itemVariants} className={`${card} p-5 relative overflow-hidden`}>
                        {job.tag && (
                            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-[16px] text-[11px] font-bold uppercase tracking-wider ${job.tag === 'High Match' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'}`}>
                                {job.tag}
                            </div>
                        )}
                        <div className="flex items-start mb-3">
                            <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center mr-4 ${theme.workspace.iconBg(isLight)}`}>
                                <Icon name="work" className={`text-[22px] ${theme.workspace.iconColor(isLight)}`} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[17px] font-bold mb-0.5">{job.title}</h3>
                                <p className={`text-[14px] ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{job.company}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center">
                                <Icon name="location_on" className={`text-[14px] mr-1 ${isLight ? 'text-gray-400' : 'text-white/40'}`} />
                                <span className={`text-[13px] ${isLight ? 'text-gray-600' : 'text-white/60'}`}>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                                <Icon name="payments" className={`text-[14px] mr-1 ${isLight ? 'text-gray-400' : 'text-white/40'}`} />
                                <span className={`text-[13px] font-semibold ${isLight ? 'text-gray-800' : 'text-white/80'}`}>{job.wage}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 border-black/5">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/10 mr-2">
                                    <span className="text-purple-500 font-bold text-[12px]">{job.match}%</span>
                                </div>
                                <span className={`text-[12px] ${isLight ? 'text-gray-500' : 'text-white/50'}`}>Match Score</span>
                            </div>
                            <button className={`px-4 py-2 ${theme.radii.sendButton} font-semibold text-[14px] bg-gradient-to-r from-blue-500 to-purple-500 text-white active:scale-95 transition-transform`}>
                                Quick Apply
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
