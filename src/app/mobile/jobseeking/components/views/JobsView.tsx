import React, { useState } from 'react';
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

const JOB_ICONS: Record<string, string> = {
    'Weekend Bartender': 'sports_bar',
    'Retail Assistant': 'shopping_bag',
    'Event Security': 'security',
    'Tutor (Math)': 'school',
    'Cafe Barista': 'local_cafe',
};

const JOBS = [
    { title: 'Weekend Bartender', company: 'The Local Pub', location: '1.2 km away', wage: '€14-16/h', match: 95, tag: 'High Match', type: 'Weekend' },
    { title: 'Retail Assistant', company: 'Tech Store M', location: 'City Center', wage: '€12.5/h', match: 88, tag: 'New', type: 'Retail' },
    { title: 'Event Security', company: 'SafeGuard Co.', location: 'Stadium', wage: '€16/h', match: 82, tag: '', type: 'Evening' },
    { title: 'Tutor (Math)', company: 'Freelance', location: 'Remote', wage: '€20/h', match: 75, tag: '', type: 'Remote' },
    { title: 'Cafe Barista', company: 'Morning Brew', location: '0.8 km away', wage: '€13/h', match: 91, tag: 'High Match', type: 'Weekend' },
];

const FILTERS = ['All', 'Weekend', 'Evening', 'Remote', 'Retail'];

type SheetMode = 'detail' | 'form' | 'success';

export function JobsView({ card, isLight, isColorful, theme, onNav }: ViewProps) {
    const searchBarClass = isColorful ? 'bg-white/10 backdrop-blur-lg' : theme.workspace.searchBar(isLight);
    const sheetBgClass = isColorful ? 'bg-ds-colorful-bg/95 backdrop-blur-2xl' : theme.workspace.sheetBg(isLight);
    const primaryBtnClass = isColorful ? 'bg-primary text-white rounded-full' : theme.workspace.primaryButton;
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);
    const [sheetMode, setSheetMode] = useState<SheetMode>('detail');
    const [coverNote, setCoverNote] = useState('');

    const filteredJobs = activeFilter === 'All' ? JOBS : JOBS.filter(j => j.type === activeFilter);

    const openSheet = (job: typeof JOBS[0]) => { setSelectedJob(job); setSheetMode('detail'); setCoverNote(`I am interested in the ${job.title} role at ${job.company}. I have relevant experience and I am available for ${job.type.toLowerCase()} shifts. Looking forward to discussing the opportunity.`); };

    const listVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 26, mass: 0.8 } }
    };

    return (
        <div className={`absolute inset-0 overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>
            {/* Search Bar */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex items-center px-4 py-3 mb-6 ${theme.radii.search} ${searchBarClass}`}
            >
                <Icon name="search" className={`text-[20px] mr-3 ${theme.workspace.searchText(isLight)}`} />
                <input type="text" placeholder="Search jobs, skills, companies..." className="bg-transparent border-none outline-none flex-1 text-[16px] placeholder:opacity-40" readOnly />
            </motion.div>

            {/* Quick Filters */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex space-x-3 mb-6 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
                {FILTERS.map((filter) => (
                    <button key={filter} onClick={() => setActiveFilter(filter)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[14px] font-medium transition-colors active:scale-95 ${filter === activeFilter ? primaryBtnClass : theme.workspace.secondaryButton(isLight)}`}>
                        {filter}
                    </button>
                ))}
            </motion.div>

            <motion.div key={activeFilter} variants={listVariants} initial="hidden" animate="visible" className="space-y-4">
                {filteredJobs.length === 0 ? (
                    <motion.div variants={itemVariants} className={`${card} p-8 text-center`}>
                        <Icon name="search_off" className="text-4xl opacity-30 mb-2" />
                        <p className={`text-[14px] ${isLight ? 'text-ds-gray-500' : 'text-ds-gray-400'}`}>No jobs found for &quot;{activeFilter}&quot;</p>
                    </motion.div>
                ) : filteredJobs.map((job, i) => (
                    <motion.div key={i} variants={itemVariants} onClick={() => openSheet(job)}
                        className={`${card} overflow-hidden active:scale-[0.99] transition-transform cursor-pointer`}>
                        {/* Top row */}
                        <div className="p-4 pb-3">
                            <div className="flex items-start gap-3">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isColorful ? 'bg-primary/15' : theme.workspace.iconBg(isLight)}`}>
                                    <Icon name={JOB_ICONS[job.title] || 'work'} className={`text-[22px] ${isColorful ? 'text-primary' : theme.workspace.iconColor(isLight)}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="text-[16px] font-bold leading-tight">{job.title}</h3>
                                        {job.tag && (
                                            <span className={`shrink-0 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${job.tag === 'High Match' ? 'bg-ds-success/15 text-ds-success' : 'bg-primary/15 text-primary'}`}>
                                                {job.tag}
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-[13px] mt-0.5 ${isLight ? 'text-ds-gray-500' : 'text-white/50'}`}>{job.company}</p>
                                </div>
                            </div>

                            {/* Meta row */}
                            <div className={`flex items-center gap-4 mt-3 pt-3 border-t ${isLight ? 'border-black/5' : 'border-white/8'}`}>
                                <div className="flex items-center gap-1">
                                    <Icon name="location_on" className={`text-[14px] ${isLight ? 'text-ds-gray-400' : 'text-white/30'}`} />
                                    <span className={`text-[12px] ${isLight ? 'text-ds-gray-500' : 'text-white/50'}`}>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Icon name="payments" className={`text-[14px] ${isLight ? 'text-ds-gray-400' : 'text-white/30'}`} />
                                    <span className={`text-[12px] font-semibold ${isLight ? 'text-ds-gray-700' : 'text-white/70'}`}>{job.wage}</span>
                                </div>
                                <span className={`ml-auto text-[11px] font-medium px-2 py-0.5 rounded-full ${isLight ? 'bg-ds-gray-100 text-ds-gray-500' : 'bg-white/8 text-white/40'}`}>{job.type}</span>
                            </div>
                        </div>

                        {/* Footer action row */}
                        <div className={`flex items-center justify-between px-4 py-3 ${isLight ? 'bg-black/[0.025]' : 'bg-white/[0.03]'}`}>
                            <div className="flex items-center gap-2">
                                <div className={`h-1.5 w-20 rounded-full overflow-hidden ${isLight ? 'bg-ds-gray-200' : 'bg-white/10'}`}>
                                    <div className={`h-full rounded-full ${job.match >= 90 ? 'bg-ds-success' : job.match >= 80 ? 'bg-primary' : 'bg-ds-gold-400'}`}
                                        style={{ width: `${job.match}%` }} />
                                </div>
                                <span className={`text-[12px] font-semibold ${job.match >= 90 ? 'text-ds-success' : job.match >= 80 ? 'text-primary' : 'text-ds-gold-400'}`}>{job.match}% match</span>
                            </div>
                            <button onClick={e => { e.stopPropagation(); openSheet(job); }}
                                className={`px-4 py-1.5 ${theme.radii.sendButton} font-semibold text-[13px] bg-gradient-to-r from-gradient-start to-gradient-mid text-white active:scale-95 transition-transform`}>
                                Quick Apply
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Job Detail / Apply Sheet */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 z-50">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 bg-ds-dark-1/40 backdrop-blur-sm" onClick={() => setSelectedJob(null)} />
                        <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 340, damping: 32, mass: 1 }}
                            className={`absolute bottom-0 left-0 right-0 ${theme.radii.sheet} p-6 pb-10 ${sheetBgClass}`}>
                            <div className="w-10 h-1 rounded-full bg-ds-gray-400/30 mx-auto mb-5" />

                            {/* SUCCESS */}
                            {sheetMode === 'success' && (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-4">
                                    <div className="w-20 h-20 rounded-full bg-ds-success/15 flex items-center justify-center mb-4">
                                        <Icon name="task_alt" className="text-5xl text-ds-success" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">Application Sent!</h3>
                                    <p className={`text-[14px] text-center mb-6 ${isLight ? 'text-ds-gray-600' : 'text-ds-gray-400'}`}>Your application to <strong>{selectedJob.company}</strong> has been submitted.</p>
                                    <button onClick={() => { setSelectedJob(null); onNav?.('notifications'); }}
                                        className="px-6 py-3 rounded-2xl bg-ds-success text-white font-semibold text-[14px] active:scale-95">
                                        View in Notifications
                                    </button>
                                </motion.div>
                            )}

                            {/* FORM */}
                            {sheetMode === 'form' && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className="flex items-center mb-5">
                                        <button onClick={() => setSheetMode('detail')} className="mr-3 opacity-60 active:opacity-40">
                                            <Icon name="arrow_back" className="text-[20px]" />
                                        </button>
                                        <h3 className="text-[18px] font-bold">Quick Apply</h3>
                                        <span className={`ml-auto text-[12px] font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary`}>{selectedJob.match}% match</span>
                                    </div>
                                    <div className="space-y-3 mb-5">
                                        {[
                                            { label: 'Full Name', value: 'Ali Al-Zuhairi', icon: 'person' },
                                            { label: 'Phone', value: '+358 40 123 4567', icon: 'phone' },
                                            { label: 'Available From', value: `${selectedJob.type} shifts · Immediate`, icon: 'event_available' },
                                        ].map((f) => (
                                            <div key={f.label} className={`flex items-center px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.05]'}`}>
                                                <Icon name={f.icon} className="text-[16px] opacity-40 mr-3" />
                                                <div className="flex-1">
                                                    <span className="text-[10px] opacity-50 block">{f.label}</span>
                                                    <span className="text-[14px] font-semibold">{f.value}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.05]'}`}>
                                            <span className="text-[10px] opacity-50 block mb-1">Cover Note</span>
                                            <textarea
                                                value={coverNote}
                                                onChange={e => setCoverNote(e.target.value)}
                                                rows={3}
                                                className="w-full bg-transparent outline-none text-[13px] leading-relaxed resize-none"
                                            />
                                        </div>
                                    </div>
                                    <button onClick={() => setSheetMode('success')}
                                        className={`w-full py-4 rounded-2xl text-[15px] font-bold active:scale-95 transition-transform bg-gradient-to-r from-gradient-start to-gradient-mid text-white`}>
                                        Submit Application
                                    </button>
                                </motion.div>
                            )}

                            {/* DETAIL */}
                            {sheetMode === 'detail' && (
                                <>
                                    <div className="flex items-start mb-5">
                                        <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center mr-4 ${isColorful ? 'bg-primary/15' : theme.workspace.iconBg(isLight)}`}>
                                            <Icon name="work" className={`text-2xl ${isColorful ? 'text-primary' : theme.workspace.iconColor(isLight)}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-0.5">{selectedJob.title}</h3>
                                            <p className={`text-[14px] ${isLight ? 'text-ds-gray-600' : 'text-ds-gray-400'}`}>{selectedJob.company}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full font-bold text-[13px] bg-primary/15 text-primary`}>{selectedJob.match}% match</span>
                                    </div>
                                    <div className={`p-4 rounded-2xl mb-5 ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.05]'}`}>
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-2"><Icon name="location_on" className="text-[16px] opacity-50" /><span className={`text-[13px] ${isLight ? 'text-ds-gray-600' : 'text-ds-gray-400'}`}>{selectedJob.location}</span></div>
                                            <div className="flex items-center space-x-2"><Icon name="payments" className="text-[16px] opacity-50" /><span className="text-[13px] font-semibold">{selectedJob.wage}</span></div>
                                        </div>
                                        <div className="flex items-center space-x-2"><Icon name="category" className="text-[16px] opacity-50" /><span className={`text-[13px] ${isLight ? 'text-ds-gray-600' : 'text-ds-gray-400'}`}>{selectedJob.type} · Part-time flexible</span></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => { onNav?.('copilot'); setSelectedJob(null); }}
                                            className={`py-3 rounded-2xl text-[13px] font-semibold flex items-center justify-center space-x-2 ${theme.workspace.secondaryButton(isLight)} active:scale-95 transition-transform`}>
                                            <Icon name="auto_awesome" className="text-[16px]" /><span>Ask AI to Prep</span>
                                        </button>
                                        <button onClick={() => setSheetMode('form')}
                                            className={`py-3 rounded-2xl text-[13px] font-semibold active:scale-95 transition-transform ${primaryBtnClass}`}>
                                            Quick Apply
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
