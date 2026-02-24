'use client';

import type { TabType } from './shared';

// ─── Theme Interface ────────────────────────────────────────────────
export interface MobileTheme {
    platform: 'android' | 'ios';

    // Background + text classes per theme mode
    bg: { dark: string; light: string; colorful: string };
    // Card style per theme mode
    card: { dark: string; light: string; colorful: string };
    // Header chrome per theme mode
    header: { dark: string; light: string; colorful: string };
    // Nav bar container
    nav: { dark: string; light: string; colorful?: string };
    // Nav tab item styles
    navTab: {
        active: (isLight: boolean) => string;
        inactive: (isLight: boolean) => string;
        // Android uses pill indicator, iOS uses tinted icon
        pill?: (isLight: boolean) => string;
        iconSize: string;
        labelSize: string;
    };

    // Accent tokens
    accent: {
        primary: string;         // main accent color
        primaryLight: string;    // used in dark mode text
        success: string;         // green
        successLight: string;    // green (light-mode friendly)
        avatarGradient: string;  // from-X to-Y for avatar ring
        avatarBorder: (isLight: boolean) => string;
        statusDot: (isLight: boolean) => string;
        aiButton: (isLight: boolean) => string;
        fallbackAvatar: string;  // bg color for fallback
    };

    // Border radii
    radii: {
        card: string;
        sheet: string;
        search: string;
        modal: string;
        sendButton: string;
        sendButtonBg: string;
        sheetButton: string;
    };

    // Copilot chat styles
    copilot: {
        userBubble: string;
        botBubble: (isLight: boolean) => string;
        inputBar: (isLight: boolean) => string;
        inputField: (isLight: boolean) => string;
        promptCard: (isLight: boolean) => string;
        promptIconColor: string;
        citationCard: (isLight: boolean) => string;
        citationIcon: string;
        pingBg: string;
        heroGradient: string;
    };

    // Workspace-specific
    workspace: {
        iconBg: (isLight: boolean) => string;
        iconColor: (isLight: boolean) => string;
        searchBar: (isLight: boolean) => string;
        searchText: (isLight: boolean) => string;
        sparklineHigh: string;
        sparklineMid: string;
        sparklineLow: string;
        statusActive: string;
        sheetAccent: string;
        sheetBg: (isLight: boolean) => string;
        primaryButton: string;
        secondaryButton: (isLight: boolean) => string;
    };

    // Notification-specific
    notification: {
        headerAccent: (isLight: boolean) => string;
        infoIconBg: string;
        infoIconColor: string;
        askAiColor: string;
    };

    // Profile-specific
    profile: {
        roleColor: string;
        statBadge: string;
        donutPrimary: string;
        donutLabel: string;
        engagementActiveBg: string;
        barGradients: string[];
        settingsBg: (isLight: boolean) => string;
        modalBg: (isLight: boolean) => string;
        modalActiveItem: (isLight: boolean) => string;
        checkColor: string;
    };

    // Dashboard
    dashboard: {
        briefingAccent: (isLight: boolean) => string;
        briefingHighlight: string;
        followUpColor: string;
        seeAllColor: string;
        quickActionBg: (isLight: boolean, gradient: string) => string;
        quickActionIconColor: (isLight: boolean) => string;
        teamColorMap: Record<string, string>;
    };

    // Tab titles
    titles: Record<TabType, { sub: string; title: string }>;
    // Tab bar items
    tabs: [TabType, string, string][];
    // Content padding top
    headerPaddingTop: string;
    contentPaddingTop: string;
}

// ─── Android Material You Theme ─────────────────────────────────────
export const androidTheme: MobileTheme = {
    platform: 'android',
    bg: {
        dark: 'bg-[#111114] text-[#E2E2E6]',
        light: 'bg-[#FAF8FC] text-[#1C1B1F]',
        colorful: 'bg-[#050023] text-white',
    },
    card: {
        dark: 'bg-[#2B2930]/90 backdrop-blur-xl rounded-[24px] shadow-lg border border-[#4A4458]/40',
        light: 'bg-[#FEF7FF]/90 backdrop-blur-xl rounded-[24px] shadow-sm border border-[#EADDFF]/50',
        colorful: 'bg-[#1a0040]/60 backdrop-blur-xl rounded-[24px] shadow-lg border border-purple-500/20',
    },
    header: {
        dark: 'bg-[#2B2930]/90 backdrop-blur-2xl border-b border-[#4A4458]/50 shadow-md',
        light: 'bg-[#FEF7FF]/90 backdrop-blur-2xl border-b border-[#EADDFF]/50 shadow-sm',
        colorful: 'bg-[#1a0040]/80 backdrop-blur-2xl border-b border-purple-500/20',
    },
    nav: {
        dark: 'bg-[#2B2930] border-[#4A4458]/50',
        light: 'bg-[#F3EDF7] border-[#EADDFF]/50',
        colorful: 'bg-[#0A0138]/80 backdrop-blur-xl border-purple-500/20',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-[#1D192B] font-variation-fill' : 'text-[#E8DEF8] font-variation-fill',
        inactive: (isLight) => isLight ? 'text-[#49454F]' : 'text-[#CAC4D0]',
        pill: (isLight) => isLight ? 'bg-[#E8DEF8]' : 'bg-[#4A4458]',
        iconSize: 'text-[22px]',
        labelSize: 'text-[11px]',
    },
    accent: {
        primary: '#6750A4',
        primaryLight: '#D0BCFF',
        success: '#4CAF50',
        successLight: '#146C2E',
        avatarGradient: 'bg-gradient-to-tr from-[#6750A4] to-[#D0BCFF]',
        avatarBorder: (isLight) => isLight ? 'border-[#EADDFF]' : 'border-[#4A4458]',
        statusDot: (isLight) => isLight ? 'border-[#FEF7FF] bg-[#146C2E]' : 'border-[#111114] bg-[#4CAF50]',
        aiButton: (isLight) => isLight ? 'bg-[#EADDFF]/50 text-[#1D192B]' : 'bg-[#4A4458]/50 text-[#E8DEF8]',
        fallbackAvatar: '6750A4',
    },
    radii: {
        card: 'rounded-[24px]', sheet: 'rounded-t-[32px]', search: 'rounded-full',
        modal: 'rounded-[28px]', sendButton: 'rounded-[14px]', sendButtonBg: 'bg-[#6750A4]', sheetButton: 'rounded-2xl',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-[#6750A4] to-[#9a82db] text-white rounded-[22px] rounded-tr-md shadow-[0_4px_16px_rgba(103,80,164,0.3)]',
        botBubble: (isLight) => isLight ? 'bg-[#FEF7FF]/90 backdrop-blur-xl border border-[#EADDFF]/50 text-[#1D192B] rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-[#2B2930]/90 backdrop-blur-xl border border-[#4A4458]/40 text-[#E8DEF8] rounded-[22px] rounded-tl-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-[#F3EDF7] rounded-t-[28px]' : 'bg-[#2B2930] rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-[#EADDFF] text-[#1D192B] rounded-[24px] px-5 py-3' : 'bg-[#4A4458] text-[#E8DEF8] rounded-[24px] px-5 py-3',
        promptCard: (isLight) => isLight ? 'bg-[#E8DEF8] text-[#1D192B]' : 'bg-[#4A4458] text-[#E8DEF8]',
        promptIconColor: '',
        citationCard: (isLight) => isLight ? 'bg-purple-50/80 border border-purple-100' : 'bg-purple-900/20 border border-purple-500/15',
        citationIcon: 'text-[#6750A4]',
        pingBg: 'bg-[#6750A4]',
        heroGradient: 'bg-[#6750A4]',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-[#EADDFF]' : 'bg-[#4A4458]',
        iconColor: () => 'text-[#D0BCFF]',
        searchBar: (isLight) => isLight ? 'bg-[#EADDFF]/50' : 'bg-[#4A4458]/40',
        searchText: () => 'opacity-40',
        sparklineHigh: '#4CAF50', sparklineMid: '#FF9800', sparklineLow: '#F44336',
        statusActive: 'bg-[#146C2E]/15 text-emerald-400',
        sheetAccent: '#D0BCFF',
        sheetBg: (isLight) => isLight ? 'bg-[#FEF7FF]' : 'bg-[#2B2930]',
        primaryButton: 'bg-[#6750A4] text-white',
        secondaryButton: (isLight) => isLight ? 'bg-[#EADDFF] text-[#1D192B]' : 'bg-white/10 text-white',
    },
    notification: {
        headerAccent: () => 'text-xl font-medium text-[#D0BCFF]',
        infoIconBg: 'bg-blue-500/10', infoIconColor: 'text-blue-400',
        askAiColor: 'text-[#D0BCFF]',
    },
    profile: {
        roleColor: 'text-[#D0BCFF]',
        statBadge: 'bg-[#146C2E]/10 text-[#4CAF50]',
        donutPrimary: 'text-[#D0BCFF]', donutLabel: 'text-[#D0BCFF]',
        engagementActiveBg: 'bg-[#D0BCFF]',
        barGradients: ['from-purple-400 to-purple-600', 'from-fuchsia-400 to-fuchsia-600', 'from-pink-400 to-pink-600', 'from-rose-400 to-rose-600', 'from-orange-400 to-orange-600', 'from-amber-400 to-amber-600', 'from-indigo-400 to-indigo-600'],
        settingsBg: (isLight) => isLight ? 'bg-[#EADDFF]/50' : 'bg-[#4A4458]/50',
        modalBg: (isLight) => isLight ? 'bg-[#FEF7FF]' : 'bg-[#2B2930] text-[#E6E1E5]',
        modalActiveItem: (isLight) => isLight ? 'bg-[#EADDFF] border-[#EADDFF]' : 'bg-[#4A4458] border-[#4A4458]',
        checkColor: '',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-[#6750A4]' : 'text-[#D0BCFF]',
        briefingHighlight: 'text-[#D0BCFF]',
        followUpColor: 'text-[#D0BCFF]',
        seeAllColor: 'text-[#D0BCFF]',
        quickActionBg: (isLight, g) => isLight ? 'bg-[#EADDFF] text-[#1D192B]' : `bg-gradient-to-br ${g} border border-white/5`,
        quickActionIconColor: () => 'text-[#D0BCFF]',
        teamColorMap: { purple: 'bg-purple-500/15 text-purple-400', blue: 'bg-blue-500/15 text-blue-400', emerald: 'bg-emerald-500/15 text-emerald-400', amber: 'bg-amber-500/15 text-amber-400' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Workspaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Notifications' }, profile: { sub: 'Settings', title: 'My Space' },
    },
    tabs: [['dashboard', 'space_dashboard', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-10',
    contentPaddingTop: 'pt-[100px]',
};

// ─── iOS Human Interface Guidelines Theme ───────────────────────────
export const iosTheme: MobileTheme = {
    platform: 'ios',
    bg: {
        dark: 'bg-black text-white',
        light: 'bg-[#F2F2F7] text-black',
        colorful: 'bg-[#050023] text-white',
    },
    card: {
        dark: 'bg-[#1C1C1E]/70 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/8 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
        light: 'bg-white/60 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/60 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.04)]',
        colorful: 'bg-[#1a0040]/40 backdrop-blur-[20px] backdrop-saturate-[180%] border border-purple-500/20 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
    },
    header: {
        dark: 'bg-[#2C2C2E]/60 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-white/5',
        light: 'bg-white/50 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-black/5',
        colorful: 'bg-[#1a0040]/60 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-purple-500/15',
    },
    nav: {
        dark: 'bg-[#1C1C1E]/80 backdrop-blur-[20px] backdrop-saturate-[180%] border-white/10',
        light: 'bg-[#F2F2F7]/80 backdrop-blur-[20px] backdrop-saturate-[180%] border-black/5',
        colorful: 'bg-[#1a0040]/70 backdrop-blur-[20px] border-purple-500/15',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-[#007AFF]' : 'text-[#0A84FF]',
        inactive: (isLight) => isLight ? 'text-[#8E8E93]' : 'text-[#636366]',
        iconSize: 'text-[24px]',
        labelSize: 'text-[10px]',
    },
    accent: {
        primary: '#007AFF',
        primaryLight: '#0A84FF',
        success: '#34C759',
        successLight: '#34C759',
        avatarGradient: '',
        avatarBorder: (isLight) => isLight ? 'border-white shadow-sm' : 'border-[#2C2C2E] shadow-md',
        statusDot: (isLight) => isLight ? 'border-white bg-[#34C759]' : 'border-[#1C1C1E] bg-[#32D74B]',
        aiButton: (isLight) => isLight ? 'bg-black/5 text-black' : 'bg-white/10 text-white',
        fallbackAvatar: '007AFF',
    },
    radii: {
        card: 'rounded-[20px]', sheet: 'rounded-t-[24px]', search: 'rounded-[14px]',
        modal: 'rounded-[20px]', sendButton: 'rounded-full', sendButtonBg: 'bg-[#007AFF]', sheetButton: 'rounded-[14px]',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-[#007AFF] to-[#5856D6] text-white rounded-[22px] rounded-tr-md shadow-[0_4px_16px_rgba(0,122,255,0.3)]',
        botBubble: (isLight) => isLight ? 'bg-white/60 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/60 text-black rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-[#1C1C1E]/70 backdrop-blur-[20px] backdrop-saturate-[180%] border border-white/8 text-white rounded-[22px] rounded-tl-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-[#F2F2F7] rounded-t-[28px]' : 'bg-[#1C1C1E] rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-[#E5E5EA] rounded-[18px] px-5 py-3 text-black' : 'bg-[#2C2C2E] rounded-[18px] px-5 py-3 text-white',
        promptCard: (isLight) => isLight ? 'bg-white/60 backdrop-blur-xl border border-white/60' : 'bg-[#1C1C1E]/70 backdrop-blur-xl border border-white/8',
        promptIconColor: 'text-[#007AFF]',
        citationCard: (isLight) => isLight ? 'bg-blue-50/80 border border-blue-100' : 'bg-blue-900/20 border border-blue-500/15',
        citationIcon: 'text-[#007AFF]',
        pingBg: 'bg-[#007AFF]',
        heroGradient: 'bg-gradient-to-br from-[#007AFF] to-[#5856D6]',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-[#007AFF]/10' : 'bg-[#0A84FF]/10',
        iconColor: (isLight) => isLight ? 'text-[#007AFF]' : 'text-[#0A84FF]',
        searchBar: (isLight) => isLight ? 'bg-[#E5E5EA]' : 'bg-[#1C1C1E]',
        searchText: (isLight) => isLight ? 'text-[#8E8E93]' : 'text-[#636366]',
        sparklineHigh: '#34C759', sparklineMid: '#FF9500', sparklineLow: '#FF3B30',
        statusActive: 'bg-[#34C759]/15 text-[#34C759]',
        sheetAccent: '#0A84FF',
        sheetBg: (isLight) => isLight ? 'bg-[#F2F2F7]' : 'bg-[#2C2C2E]',
        primaryButton: 'bg-[#007AFF] text-white',
        secondaryButton: (isLight) => isLight ? 'bg-[#E5E5EA] text-[#007AFF]' : 'bg-white/10 text-white',
    },
    notification: {
        headerAccent: () => 'text-xl font-bold tracking-tight text-[#0A84FF]',
        infoIconBg: 'bg-[#007AFF]/10', infoIconColor: 'text-[#007AFF]',
        askAiColor: 'text-[#007AFF]',
    },
    profile: {
        roleColor: 'text-[#0A84FF]',
        statBadge: 'bg-[#34C759]/10 text-[#34C759]',
        donutPrimary: 'text-[#007AFF]', donutLabel: 'text-[#007AFF]',
        engagementActiveBg: 'bg-[#007AFF]',
        barGradients: ['from-blue-400 to-blue-600', 'from-indigo-400 to-indigo-600', 'from-cyan-400 to-cyan-600', 'from-teal-400 to-teal-600', 'from-violet-400 to-violet-600', 'from-sky-400 to-sky-600', 'from-purple-400 to-purple-600'],
        settingsBg: (isLight) => isLight ? 'bg-black/5' : 'bg-white/10',
        modalBg: (isLight) => isLight ? 'bg-white' : 'bg-[#2C2C2E] text-white',
        modalActiveItem: (isLight) => isLight ? 'bg-[#E5E5EA]' : 'bg-white/10',
        checkColor: 'text-[#007AFF]',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-[#007AFF]' : 'text-[#0A84FF]',
        briefingHighlight: 'text-[#0A84FF]',
        followUpColor: 'text-[#007AFF]',
        seeAllColor: 'text-[#007AFF]',
        quickActionBg: (isLight, g) => isLight ? `bg-gradient-to-br ${g} border` : `bg-gradient-to-br ${g.replace('/10', '/20').replace('/20', '/30')} border`,
        quickActionIconColor: (isLight) => isLight ? 'text-gray-700' : 'text-gray-300',
        teamColorMap: { purple: 'bg-purple-500/15 text-purple-400', blue: 'bg-[#007AFF]/15 text-[#007AFF]', emerald: 'bg-[#34C759]/15 text-[#34C759]', amber: 'bg-[#FF9500]/15 text-[#FF9500]' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Spaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Alerts' }, profile: { sub: 'Settings', title: 'Profile' },
    },
    tabs: [['dashboard', 'grid_view', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-14',
    contentPaddingTop: 'pt-[120px]',
};
