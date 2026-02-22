'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Icon = ({ name, className = "" }: { name: string, className?: string }) => (
    <span className={`material-symbols ${className}`}>{name}</span>
);

type Section = 'dashboard' | 'users' | 'workspaces' | 'copilot-logs' | 'alerts-config' | 'analytics' | 'settings';

const sections: { key: Section, icon: string, label: string }[] = [
    { key: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { key: 'users', icon: 'group', label: 'Users' },
    { key: 'workspaces', icon: 'workspaces', label: 'Workspaces' },
    { key: 'copilot-logs', icon: 'smart_toy', label: 'Copilot Logs' },
    { key: 'alerts-config', icon: 'notifications_active', label: 'Alerts Config' },
    { key: 'analytics', icon: 'analytics', label: 'Analytics' },
    { key: 'settings', icon: 'settings', label: 'Settings' },
];

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════
export default function AdminPanel() {
    const [activeSection, setActiveSection] = useState<Section>('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState('dark');

    const isLight = theme === 'light';

    const bg = isLight ? 'bg-[#F8F9FA] text-[#1C1B1F]' : 'bg-[#0A0A0F] text-[#E2E2E6]';
    const sidebarBg = isLight ? 'bg-white border-r border-gray-200' : 'bg-[#12121A] border-r border-white/5';
    const cardClass = isLight
        ? 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6'
        : 'bg-[#1A1A24]/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/5 p-6';

    return (
        <div className={`flex min-h-screen w-full ${bg} transition-colors duration-300`}>
            {/* Sidebar */}
            <aside className={`${sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'} ${sidebarBg} flex flex-col shrink-0 transition-all duration-300 sticky top-0 h-screen overflow-hidden`}>
                <div className={`flex items-center h-16 px-4 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    {!sidebarCollapsed && <span className="text-lg font-bold bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] bg-clip-text text-transparent">CollabAdmin</span>}
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/5 ${isLight ? 'hover:bg-black/5' : ''}`}>
                        <Icon name={sidebarCollapsed ? "menu" : "menu_open"} className="text-lg opacity-60" />
                    </button>
                </div>

                <nav className="flex-1 py-2 px-2 space-y-1">
                    {sections.map(s => {
                        const active = activeSection === s.key;
                        return (
                            <button key={s.key} onClick={() => setActiveSection(s.key)}
                                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2.5 rounded-xl transition-all text-[14px] ${active
                                    ? (isLight ? 'bg-[#7C3AED]/10 text-[#7C3AED] font-semibold' : 'bg-[#A78BFA]/10 text-[#A78BFA] font-semibold')
                                    : (isLight ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/5')}`}>
                                <Icon name={s.icon} className={`text-xl ${sidebarCollapsed ? '' : 'mr-3'} ${active ? '' : 'opacity-60'}`} />
                                {!sidebarCollapsed && <span>{s.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                {/* Theme Toggle */}
                <div className={`py-3 px-2 border-t ${isLight ? 'border-gray-200' : 'border-white/5'}`}>
                    <button onClick={() => setTheme(isLight ? 'dark' : 'light')}
                        className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-3'} py-2.5 rounded-xl text-[14px] transition-all ${isLight ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 hover:bg-white/5'}`}>
                        <Icon name={isLight ? 'dark_mode' : 'light_mode'} className={`text-xl ${sidebarCollapsed ? '' : 'mr-3'} opacity-60`} />
                        {!sidebarCollapsed && <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
                {/* Top Bar */}
                <header className={`h-16 flex items-center justify-between px-8 sticky top-0 z-30 ${isLight ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200' : 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5'}`}>
                    <h1 className="text-xl font-bold capitalize">{activeSection.replace('-', ' ')}</h1>
                    <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                            <Icon name="search" className="text-base opacity-40" />
                            <span className="opacity-40">Search...</span>
                        </div>
                        <button className={`relative w-9 h-9 rounded-xl flex items-center justify-center ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                            <Icon name="notifications" className="text-lg opacity-60" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className={`w-9 h-9 rounded-xl overflow-hidden border-2 ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/images/me/ali.png" className="w-full h-full object-cover" alt="Admin" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Admin&background=7C3AED&color=fff" }} />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8">
                    <AnimatePresence mode="wait">
                        {activeSection === 'dashboard' && <DashboardSection key="dash" card={cardClass} isLight={isLight} />}
                        {activeSection === 'users' && <UsersSection key="users" card={cardClass} isLight={isLight} />}
                        {activeSection === 'workspaces' && <WorkspacesSection key="ws" card={cardClass} isLight={isLight} />}
                        {activeSection === 'copilot-logs' && <CopilotLogsSection key="logs" card={cardClass} isLight={isLight} />}
                        {activeSection === 'alerts-config' && <AlertsConfigSection key="alerts" card={cardClass} isLight={isLight} />}
                        {activeSection === 'analytics' && <AnalyticsSection key="analytics" card={cardClass} isLight={isLight} />}
                        {activeSection === 'settings' && <SettingsSection key="settings" card={cardClass} isLight={isLight} />}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// SHARED
// ═══════════════════════════════════════════════════════════
const pageVariants = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.06 } }, exit: { opacity: 0, y: -12 } };
const itemVariants = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

function KPICard({ icon, label, value, trend, trendUp, isLight }: { icon: string, label: string, value: string, trend: string, trendUp: boolean, isLight: boolean }) {
    return (
        <motion.div variants={itemVariants} className={`${isLight ? 'bg-white border border-gray-100 shadow-sm' : 'bg-[#1A1A24]/80 border border-white/5'} rounded-2xl p-5 flex flex-col`}>
            <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLight ? 'bg-[#7C3AED]/10' : 'bg-[#A78BFA]/10'}`}>
                    <Icon name={icon} className={`text-lg ${isLight ? 'text-[#7C3AED]' : 'text-[#A78BFA]'}`} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>{trend}</span>
            </div>
            <span className="text-2xl font-bold">{value}</span>
            <span className={`text-sm mt-1 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════
function DashboardSection({ card, isLight }: { card: string, isLight: boolean }) {
    const recentActivity = [
        { user: 'Sara K.', action: 'Updated design system tokens', time: '5 min ago', icon: 'palette' },
        { user: 'James L.', action: 'Added 3 comments to Sprint Review', time: '12 min ago', icon: 'chat' },
        { user: 'Mia C.', action: 'Completed UX research report', time: '28 min ago', icon: 'description' },
        { user: 'Alex R.', action: 'Created Q1 Planning workspace', time: '1h ago', icon: 'add_circle' },
        { user: 'Lena T.', action: 'Asked Copilot about metrics', time: '2h ago', icon: 'auto_awesome' },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <KPICard icon="group" label="Total Users" value="1,247" trend="+12.4%" trendUp={true} isLight={isLight} />
                <KPICard icon="workspaces" label="Active Workspaces" value="38" trend="+8.2%" trendUp={true} isLight={isLight} />
                <KPICard icon="auto_awesome" label="AI Queries Today" value="2,891" trend="+24.1%" trendUp={true} isLight={isLight} />
                <KPICard icon="speed" label="Platform Uptime" value="99.97%" trend="+0.02%" trendUp={true} isLight={isLight} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Activity Chart */}
                <motion.div variants={itemVariants} className={`${card} col-span-2`}>
                    <h3 className="font-semibold text-lg mb-4">User Activity (30 Days)</h3>
                    <div className="h-48 flex items-end justify-between gap-1 px-2">
                        {Array.from({ length: 30 }, (_, i) => {
                            const h = 20 + Math.sin(i * 0.5) * 30 + Math.random() * 30;
                            return (
                                <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: i * 0.02 }}
                                    className={`w-full rounded-t-sm ${isLight ? 'bg-[#7C3AED]/60 hover:bg-[#7C3AED]' : 'bg-[#A78BFA]/40 hover:bg-[#A78BFA]'} transition-colors cursor-pointer`} />
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] opacity-40 px-2">
                        <span>Jan 23</span><span>Feb 1</span><span>Feb 8</span><span>Feb 15</span><span>Feb 22</span>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="flex items-start space-x-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                                    <Icon name={a.icon} className="text-sm opacity-60" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[13px]"><span className="font-semibold">{a.user}</span> {a.action}</p>
                                    <span className="text-[11px] opacity-40">{a.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* AI Usage Donut + Workspace Heatmap */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">AI Copilot Usage</h3>
                    <div className="flex items-center space-x-8">
                        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path className={isLight ? "text-gray-100" : "text-white/5"} stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "35, 100" }} transition={{ duration: 1.2 }} strokeLinecap="round" className="text-[#A78BFA]" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "25, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-35" strokeLinecap="round" className="text-emerald-500" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "20, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-60" strokeLinecap="round" className="text-amber-500" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "20, 100" }} transition={{ duration: 1.2 }} strokeDashoffset="-80" strokeLinecap="round" className="text-rose-500" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <span className="absolute text-xl font-bold">2,891</span>
                        </div>
                        <div className="flex-1 space-y-2">
                            {[{ label: 'Sprint Queries', pct: '35%', color: 'bg-[#A78BFA]' }, { label: 'Design Reviews', pct: '25%', color: 'bg-emerald-500' }, { label: 'Analytics', pct: '20%', color: 'bg-amber-500' }, { label: 'General', pct: '20%', color: 'bg-rose-500' }].map(s => (
                                <div key={s.label} className={`flex justify-between text-sm items-center p-2 rounded-lg ${isLight ? 'bg-gray-50' : 'bg-white/[0.03]'}`}>
                                    <span className="flex items-center opacity-70"><span className={`w-2.5 h-2.5 rounded-full mr-2.5 ${s.color}`} />{s.label}</span>
                                    <span className="font-semibold">{s.pct}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">Workspace Activity Heatmap</h3>
                    <div className="grid grid-cols-7 gap-1.5">
                        {Array.from({ length: 35 }, (_, i) => {
                            const intensity = Math.random();
                            const bg = intensity > 0.7 ? (isLight ? 'bg-[#7C3AED]' : 'bg-[#A78BFA]') : intensity > 0.4 ? (isLight ? 'bg-[#7C3AED]/50' : 'bg-[#A78BFA]/40') : intensity > 0.1 ? (isLight ? 'bg-[#7C3AED]/20' : 'bg-[#A78BFA]/15') : (isLight ? 'bg-gray-100' : 'bg-white/5');
                            return <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.01 }} className={`aspect-square rounded-md ${bg}`} />;
                        })}
                    </div>
                    <div className="flex justify-between items-center mt-3 text-[11px] opacity-40">
                        <span>Less active</span>
                        <div className="flex space-x-1">
                            {[isLight ? 'bg-gray-100' : 'bg-white/5', isLight ? 'bg-[#7C3AED]/20' : 'bg-[#A78BFA]/15', isLight ? 'bg-[#7C3AED]/50' : 'bg-[#A78BFA]/40', isLight ? 'bg-[#7C3AED]' : 'bg-[#A78BFA]'].map((c, i) => (
                                <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
                            ))}
                        </div>
                        <span>More active</span>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// USERS
// ═══════════════════════════════════════════════════════════
function UsersSection({ card, isLight }: { card: string, isLight: boolean }) {
    const users = [
        { name: 'Sara Kim', email: 'sara@company.com', role: 'Admin', status: 'Active', lastActive: '5 min ago' },
        { name: 'James Lee', email: 'james@company.com', role: 'Editor', status: 'Active', lastActive: '12 min ago' },
        { name: 'Mia Chen', email: 'mia@company.com', role: 'Editor', status: 'Active', lastActive: '28 min ago' },
        { name: 'Alex Rivera', email: 'alex@company.com', role: 'Viewer', status: 'Active', lastActive: '1h ago' },
        { name: 'Lena Torres', email: 'lena@company.com', role: 'Editor', status: 'Inactive', lastActive: '3 days ago' },
        { name: 'Noah Park', email: 'noah@company.com', role: 'Viewer', status: 'Active', lastActive: '2h ago' },
        { name: 'Isla Wang', email: 'isla@company.com', role: 'Admin', status: 'Active', lastActive: '15 min ago' },
        { name: 'Ethan Patel', email: 'ethan@company.com', role: 'Editor', status: 'Invited', lastActive: 'Never' },
    ];

    const roleBadge = (r: string) => r === 'Admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : r === 'Editor' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    const statusDot = (s: string) => s === 'Active' ? 'bg-emerald-500' : s === 'Invited' ? 'bg-amber-500' : 'bg-gray-400';

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold">User Management</h2>
                    <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{users.length} total users</p>
                </div>
                <button className="px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors flex items-center space-x-2">
                    <Icon name="person_add" className="text-base" /><span>Add User</span>
                </button>
            </div>

            <motion.div variants={itemVariants} className={card}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className={`text-left text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                <th className="pb-4 font-medium">User</th>
                                <th className="pb-4 font-medium">Role</th>
                                <th className="pb-4 font-medium">Status</th>
                                <th className="pb-4 font-medium">Last Active</th>
                                <th className="pb-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((u, i) => (
                                <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                                    className={`${isLight ? 'hover:bg-gray-50 divide-gray-100' : 'hover:bg-white/[0.02]'} transition-colors`}>
                                    <td className="py-3">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${isLight ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'bg-[#A78BFA]/10 text-[#A78BFA]'}`}>
                                                {u.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <span className="font-medium text-sm block">{u.name}</span>
                                                <span className="text-xs opacity-50">{u.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${roleBadge(u.role)}`}>{u.role}</span></td>
                                    <td className="py-3"><span className="flex items-center text-sm"><span className={`w-2 h-2 rounded-full mr-2 ${statusDot(u.status)}`} />{u.status}</span></td>
                                    <td className="py-3 text-sm opacity-60">{u.lastActive}</td>
                                    <td className="py-3 text-right">
                                        <button className={`w-8 h-8 rounded-lg inline-flex items-center justify-center ${isLight ? 'hover:bg-gray-100' : 'hover:bg-white/5'} transition-colors`}>
                                            <Icon name="more_horiz" className="text-base opacity-50" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// WORKSPACES
// ═══════════════════════════════════════════════════════════
function WorkspacesSection({ card, isLight }: { card: string, isLight: boolean }) {
    const workspaces = [
        { name: 'Design System v3', members: 8, docs: 24, queries: 156, status: 'Active' },
        { name: 'UX Research Q4', members: 5, docs: 12, queries: 89, status: 'Active' },
        { name: 'Marketing Launch', members: 12, docs: 36, queries: 234, status: 'Active' },
        { name: 'Product Roadmap', members: 6, docs: 8, queries: 45, status: 'Review' },
        { name: 'QA Testing Sprint', members: 4, docs: 15, queries: 67, status: 'Paused' },
        { name: 'Q1 Planning 2026', members: 6, docs: 3, queries: 12, status: 'Active' },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Workspace Administration</h2>
                <button className="px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors flex items-center space-x-2">
                    <Icon name="add" className="text-base" /><span>New Workspace</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {workspaces.map((ws, i) => (
                    <motion.div key={i} variants={itemVariants} className={`${card} hover:scale-[1.02] transition-transform cursor-pointer`}>
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold">{ws.name}</h3>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${ws.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : ws.status === 'Review' ? 'bg-amber-500/10 text-amber-500' : 'bg-gray-500/10 text-gray-400'}`}>{ws.status}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            {[{ v: ws.members, l: 'Members' }, { v: ws.docs, l: 'Docs' }, { v: ws.queries, l: 'AI Queries' }].map(s => (
                                <div key={s.l} className={`p-2 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/[0.03]'}`}>
                                    <span className="text-lg font-bold block">{s.v}</span>
                                    <span className="text-[10px] opacity-50">{s.l}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// COPILOT LOGS
// ═══════════════════════════════════════════════════════════
function CopilotLogsSection({ card, isLight }: { card: string, isLight: boolean }) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const logs = [
        { id: 1, user: 'Sara K.', query: 'What are the latest design system changes?', response: 'The Design System v3 has 14 new component updates including typography scale, elevation tokens, and color palette adjustments aligned with WCAG 2.2 AA.', confidence: 94, time: '10 min ago', citations: 2 },
        { id: 2, user: 'James L.', query: 'Summarize sprint review feedback', response: 'The sprint review received positive feedback on navigation improvements. 3 action items were created for the next sprint related to mobile responsiveness.', confidence: 88, time: '32 min ago', citations: 3 },
        { id: 3, user: 'Mia C.', query: 'Show UX research completion status', response: 'Q4 UX research is 100% complete with 24 participants. Key findings: 78% prefer card-based views, accessibility scores improved 22%.', confidence: 96, time: '1h ago', citations: 1 },
        { id: 4, user: 'Alex R.', query: 'What metrics should I track for Q1?', response: 'Recommended Q1 metrics: user engagement rate, workspace creation frequency, AI query volume, and collaboration session duration.', confidence: 82, time: '3h ago', citations: 2 },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h2 className="text-lg font-bold">AI Copilot Conversation Logs</h2>

            <div className="space-y-3">
                {logs.map((log) => (
                    <motion.div key={log.id} variants={itemVariants} onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                        className={`${card} cursor-pointer hover:scale-[1.005] transition-transform`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${isLight ? 'bg-[#7C3AED]/10 text-[#7C3AED]' : 'bg-[#A78BFA]/10 text-[#A78BFA]'}`}>
                                    {log.user.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <span className="font-medium text-sm">{log.user}</span>
                                    <span className="text-xs opacity-40 ml-2">{log.time}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${log.confidence >= 90 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{log.confidence}% conf.</span>
                                <span className={`text-xs px-2 py-1 rounded-lg ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>{log.citations} sources</span>
                            </div>
                        </div>
                        <p className={`mt-3 text-sm font-medium ${isLight ? 'text-[#7C3AED]' : 'text-[#A78BFA]'}`}>&ldquo;{log.query}&rdquo;</p>
                        <AnimatePresence>
                            {expanded === log.id && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                    <p className={`mt-3 pt-3 text-sm border-t ${isLight ? 'text-gray-600 border-gray-200' : 'text-gray-300 border-white/5'}`}>{log.response}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// ALERTS CONFIG
// ═══════════════════════════════════════════════════════════
function AlertsConfigSection({ card, isLight }: { card: string, isLight: boolean }) {
    const [toggles, setToggles] = useState<Record<string, boolean>>({ overdue: true, sprint: true, workspace: false, copilot: true, system: true });

    const rules = [
        { id: 'overdue', name: 'Overdue Reviews', desc: 'Trigger when design reviews exceed deadline', trigger: '> 24 hours', channel: 'Email + Push', priority: 'Critical' },
        { id: 'sprint', name: 'Sprint Ending', desc: 'Alert before sprint deadline', trigger: '24 hours before', channel: 'Push', priority: 'Warning' },
        { id: 'workspace', name: 'Workspace Inactivity', desc: 'Alert on workspace with no activity', trigger: '> 7 days', channel: 'Email', priority: 'Info' },
        { id: 'copilot', name: 'Low Confidence Response', desc: 'Flag AI responses below threshold', trigger: '< 80% confidence', channel: 'Dashboard', priority: 'Warning' },
        { id: 'system', name: 'System Health', desc: 'Monitor uptime and performance', trigger: '< 99.5% uptime', channel: 'Email + Webhook', priority: 'Critical' },
    ];

    const priorityColor = (p: string) => p === 'Critical' ? 'text-red-400 bg-red-500/10' : p === 'Warning' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10';

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <h2 className="text-lg font-bold">Alert Configuration</h2>

            <div className="space-y-3">
                {rules.map((r) => (
                    <motion.div key={r.id} variants={itemVariants} className={card}>
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                    <h3 className="font-semibold text-sm">{r.name}</h3>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColor(r.priority)}`}>{r.priority}</span>
                                </div>
                                <p className="text-xs opacity-50 mb-2">{r.desc}</p>
                                <div className="flex items-center space-x-4 text-xs opacity-60">
                                    <span className="flex items-center"><Icon name="bolt" className="text-xs mr-1" />{r.trigger}</span>
                                    <span className="flex items-center"><Icon name="send" className="text-xs mr-1" />{r.channel}</span>
                                </div>
                            </div>
                            <button onClick={() => setToggles(prev => ({ ...prev, [r.id]: !prev[r.id] }))}
                                className={`w-12 h-7 rounded-full transition-colors relative ${toggles[r.id] ? 'bg-[#7C3AED]' : (isLight ? 'bg-gray-300' : 'bg-white/10')}`}>
                                <motion.div animate={{ x: toggles[r.id] ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════════════════════════
function AnalyticsSection({ card, isLight }: { card: string, isLight: boolean }) {
    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Usage Analytics</h2>
                <button className="px-4 py-2 bg-[#7C3AED]/10 text-[#A78BFA] rounded-xl text-sm font-semibold hover:bg-[#7C3AED]/20 transition-colors flex items-center space-x-2">
                    <Icon name="download" className="text-base" /><span>Export CSV</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <KPICard icon="visibility" label="Page Views" value="48.2K" trend="+18%" trendUp={true} isLight={isLight} />
                <KPICard icon="schedule" label="Avg. Session" value="12m 34s" trend="+8%" trendUp={true} isLight={isLight} />
                <KPICard icon="thumb_up" label="Satisfaction" value="4.7/5" trend="+0.3" trendUp={true} isLight={isLight} />
                <KPICard icon="bolt" label="Avg. Response" value="1.2s" trend="-15%" trendUp={true} isLight={isLight} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">Engagement by Feature</h3>
                    <div className="space-y-3">
                        {[
                            { feature: 'AI Copilot', usage: 82 },
                            { feature: 'Workspaces', usage: 74 },
                            { feature: 'Document Editor', usage: 68 },
                            { feature: 'Notifications', usage: 56 },
                            { feature: 'Analytics', usage: 42 },
                        ].map((f, i) => (
                            <div key={f.feature}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{f.feature}</span>
                                    <span className="font-semibold">{f.usage}%</span>
                                </div>
                                <div className={`h-2 rounded-full overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${f.usage}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className={card}>
                    <h3 className="font-semibold text-lg mb-4">Weekly Active Users</h3>
                    <div className="h-48 flex items-end justify-between gap-3 px-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                            const h = [65, 78, 82, 90, 85, 40, 35][i];
                            return (
                                <div key={day} className="flex-1 flex flex-col items-center">
                                    <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.6, delay: i * 0.06 }}
                                        className={`w-full max-w-[32px] rounded-t-lg ${isLight ? 'bg-[#7C3AED]/60 hover:bg-[#7C3AED]' : 'bg-[#A78BFA]/40 hover:bg-[#A78BFA]'} transition-colors cursor-pointer`} />
                                    <span className="text-[10px] mt-2 opacity-40">{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// ═══════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════
function SettingsSection({ card, isLight }: { card: string, isLight: boolean }) {
    const [toggles, setToggles] = useState<Record<string, boolean>>({ sso: true, '2fa': true, copilot: true, analytics: true, beta: false });

    const settingGroups = [
        {
            title: 'Authentication', items: [
                { id: 'sso', name: 'SSO Provider', desc: 'Enable Single Sign-On via SAML/OIDC' },
                { id: 'twofa', name: 'Two-Factor Authentication', desc: 'Require 2FA for all admin users' },
            ]
        },
        {
            title: 'Features', items: [
                { id: 'copilot', name: 'AI Copilot', desc: 'Enable AI-powered collaboration assistant' },
                { id: 'analytics', name: 'Usage Analytics', desc: 'Collect anonymous usage data for insights' },
                { id: 'beta', name: 'Beta Features', desc: 'Enable experimental features for testing' },
            ]
        },
    ];

    return (
        <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 max-w-3xl">
            <h2 className="text-lg font-bold">Platform Settings</h2>

            {settingGroups.map((group) => (
                <motion.div key={group.title} variants={itemVariants} className={card}>
                    <h3 className="font-semibold mb-4">{group.title}</h3>
                    <div className={`space-y-0 divide-y ${isLight ? 'divide-gray-100' : 'divide-white/5'}`}>
                        {group.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                                <div>
                                    <span className="font-medium text-sm block">{item.name}</span>
                                    <span className="text-xs opacity-50">{item.desc}</span>
                                </div>
                                <button onClick={() => setToggles(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                    className={`w-12 h-7 rounded-full transition-colors relative shrink-0 ml-4 ${toggles[item.id] ? 'bg-[#7C3AED]' : (isLight ? 'bg-gray-300' : 'bg-white/10')}`}>
                                    <motion.div animate={{ x: toggles[item.id] ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm" />
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}

            <motion.div variants={itemVariants} className={card}>
                <h3 className="font-semibold mb-4">Platform</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium block mb-1.5">Platform Name</label>
                        <input type="text" defaultValue="Collaboration Workflow Platform" className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${isLight ? 'bg-gray-50 border border-gray-200 focus:border-[#7C3AED]' : 'bg-white/5 border border-white/10 focus:border-[#A78BFA]'} transition-colors`} />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-1.5">Support Email</label>
                        <input type="email" defaultValue="admin@collabplatform.com" className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none ${isLight ? 'bg-gray-50 border border-gray-200 focus:border-[#7C3AED]' : 'bg-white/5 border border-white/10 focus:border-[#A78BFA]'} transition-colors`} />
                    </div>
                    <button className="px-6 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors">Save Changes</button>
                </div>
            </motion.div>
        </motion.div>
    );
}
