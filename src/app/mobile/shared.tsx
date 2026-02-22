'use client';
import React from 'react';

export const Icon = ({ name, className = "" }: { name: string, className?: string }) => (
    <span className={`material-symbols ${className}`}>{name}</span>
);

export const Sparkline = ({ data, color, width = 80, height = 32 }: { data: number[], color: string, width?: number, height?: number }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
    return (
        <svg width={width} height={height} className="overflow-visible">
            <defs>
                <linearGradient id={`grad-${color.replace(/[^a-z0-9]/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#grad-${color.replace(/[^a-z0-9]/g, '')})`} />
            <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
export const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 30 } } };

export type TabType = 'dashboard' | 'workspaces' | 'copilot' | 'notifications' | 'profile';

export const workspaces = [
    { id: 'ds', name: 'Design System v3', members: 8, docs: 24, activity: 95, status: 'Active', icon: 'palette', data: [40, 55, 60, 58, 72, 80, 88, 90, 95] },
    { id: 'ux', name: 'UX Research Q4', members: 5, docs: 12, activity: 78, status: 'Active', icon: 'psychology', data: [30, 40, 45, 50, 58, 65, 70, 75, 78] },
    { id: 'mk', name: 'Marketing Launch', members: 12, docs: 36, activity: 88, status: 'Active', icon: 'campaign', data: [50, 60, 55, 65, 70, 75, 80, 85, 88] },
    { id: 'pr', name: 'Product Roadmap', members: 6, docs: 8, activity: 62, status: 'Review', icon: 'map', data: [40, 45, 50, 55, 52, 58, 60, 61, 62] },
    { id: 'qa', name: 'QA Testing Sprint', members: 4, docs: 15, activity: 45, status: 'Paused', icon: 'bug_report', data: [60, 55, 50, 48, 46, 45, 44, 45, 45] },
];

export const teamActivity = [
    { user: 'Sara K.', action: 'updated Design System v3', icon: 'edit', time: '5m', color: 'purple' },
    { user: 'James L.', action: 'commented on Sprint Review', icon: 'chat', time: '12m', color: 'blue' },
    { user: 'Mia C.', action: 'completed UX Research', icon: 'check_circle', time: '28m', color: 'emerald' },
    { user: 'Alex R.', action: 'created new workspace', icon: 'add_circle', time: '1h', color: 'amber' },
];

export const mockResponses = [
    { text: "Based on the latest sprint metrics, your Design System v3 workspace is 87% complete. Sara's recent updates to the color token system align with WCAG 2.2 AA. I recommend prioritizing the component library review before the Friday deadline.", citations: [{ source: "Sprint Dashboard", snippet: "Design System v3 progress: 87%..." }, { source: "Sara's Notes", snippet: "Color tokens updated..." }] },
    { text: "The UX Research Q4 findings show a 34% improvement in task completion rates after implementing the new navigation pattern. Three user personas were validated with statistically significant sample sizes.", citations: [{ source: "Maze Results", snippet: "Task completion: 89% (up from 55%)..." }] },
    { text: "Your team's collaboration efficiency has increased 22% this quarter. Key driver: async document reviews reduced meeting time by 5.2 hours/week. However, the Marketing Launch workspace shows declining engagement.", citations: [{ source: "Analytics", snippet: "Async reviews: +22% efficiency..." }, { source: "Workspace Metrics", snippet: "Marketing engagement: -12% WoW..." }] },
];

export const alerts = [
    { id: 1, priority: 'critical' as const, icon: 'error', title: 'Design Review Overdue', desc: 'Design System v3 review is 2 days past deadline.', detail: 'Sara submitted 14 components for review. Typography scale and elevation tokens need sign-off before Monday dev handoff.', time: '10m ago' },
    { id: 2, priority: 'warning' as const, icon: 'schedule', title: 'Sprint Ending Tomorrow', desc: 'Current sprint closes at 5:00 PM. 3 items in progress.', detail: 'Remaining: UX Research presentation, Mobile wireframes, and API docs. Consider scope adjustments.', time: '32m ago' },
    { id: 3, priority: 'info' as const, icon: 'rocket_launch', title: 'New Workspace Created', desc: 'Alex R. created "Q1 Planning 2026" workspace.', detail: 'Cross-functional team from Design, Engineering, and Product. Initial docs and templates set up.', time: '1h ago' },
    { id: 4, priority: 'info' as const, icon: 'chat', title: 'Comment Thread Active', desc: 'James L. started discussion on nav patterns.', detail: '4 team members contributed. Key debate: bottom nav vs. sidebar for tablet.', time: '3h ago' },
    { id: 5, priority: 'info' as const, icon: 'check_circle', title: 'UX Research Complete', desc: 'Mia C. finalized Q4 research with 24 participants.', detail: '78% prefer card-based workspace view. Accessibility scores improved by 22%.', time: '5h ago' },
];

export const suggestedPrompts = [
    { icon: 'bolt', label: 'Sprint Status', prompt: 'What is the current sprint status?' },
    { icon: 'groups', label: 'Team Activity', prompt: 'Summarize team activity this week' },
    { icon: 'topic', label: 'Design Review', prompt: 'What needs design review?' },
    { icon: 'analytics', label: 'Metrics', prompt: 'Show collaboration metrics' },
];
