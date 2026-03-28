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

// ─── Android Material Design 3 Expressive Theme (Android 16/17) ────────
export const androidTheme: MobileTheme = {
    platform: 'android',
    bg: {
        dark: 'bg-[#0b0b13] text-[#e5e7eb]',
        light: 'bg-[#f9fafb] text-[#111827]',
        colorful: 'bg-[#06040c] text-white',
    },
    card: {
        dark: 'bg-[#1a1a24]/90 backdrop-blur-xl rounded-[28px] shadow-lg border border-[#4b5563]/30',
        light: 'bg-[#f9fafb]/95 backdrop-blur-xl rounded-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)] border border-[#e5e7eb]/60',
        colorful: 'bg-[#0a0600]/60 backdrop-blur-xl rounded-[28px] shadow-lg border border-orange-500/20',
    },
    header: {
        dark: 'bg-[#12121a]/95 backdrop-blur-2xl border-b border-[#4b5563]/30',
        light: 'bg-[#f9fafb]/95 backdrop-blur-2xl border-b border-[#e5e7eb]/50 shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        colorful: 'bg-[#0a0600]/80 backdrop-blur-2xl border-b border-orange-500/20',
    },
    nav: {
        dark: 'bg-[#12121a] border-[#4b5563]/30',
        light: 'bg-[#f3f4f6] border-[#e5e7eb]/60',
        colorful: 'bg-[#0a0600]/80 backdrop-blur-xl border-orange-500/20',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-[#111827] font-variation-fill' : 'text-[#bfdbfe] font-variation-fill',
        inactive: (isLight) => isLight ? 'text-[#4b5563]' : 'text-[#d1d5db]',
        pill: (isLight) => isLight ? 'bg-[#dbeafe]' : 'bg-[#1e40af]',
        iconSize: 'text-[24px]',
        labelSize: 'text-[12px]',
    },
    accent: {
        primary: '#3b82f6',
        primaryLight: '#93c5fd',
        success: '#16a34a',
        successLight: '#16a34a',
        avatarGradient: 'bg-gradient-to-tr from-[#3b82f6] to-[#93c5fd]',
        avatarBorder: (isLight) => isLight ? 'border-[#e5e7eb]' : 'border-[#4b5563]',
        statusDot: (isLight) => isLight ? 'border-[#f9fafb] bg-[#16a34a]' : 'border-[#0b0b13] bg-[#4ade80]',
        aiButton: (isLight) => isLight ? 'bg-[#dbeafe]/60 text-[#111827]' : 'bg-[#1e40af]/50 text-[#bfdbfe]',
        fallbackAvatar: '3b82f6',
    },
    radii: {
        card: 'rounded-[28px]', sheet: 'rounded-t-[32px]', search: 'rounded-full',
        modal: 'rounded-[28px]', sendButton: 'rounded-[16px]', sendButtonBg: 'bg-[#3b82f6]', sheetButton: 'rounded-2xl',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-[#3b82f6] to-[#818cf8] text-white rounded-[24px] rounded-tr-md shadow-[0_2px_8px_rgba(59,130,246,0.25)]',
        botBubble: (isLight) => isLight ? 'bg-[#f9fafb]/95 backdrop-blur-xl border border-[#e5e7eb]/60 text-[#111827] rounded-[24px] rounded-tl-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'bg-[#1a1a24]/90 backdrop-blur-xl border border-[#4b5563]/30 text-[#bfdbfe] rounded-[24px] rounded-tl-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-[#f3f4f6] rounded-t-[28px]' : 'bg-[#12121a] rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-[#e5e7eb] text-[#111827] rounded-[28px] px-5 py-3.5' : 'bg-[#4b5563] text-[#bfdbfe] rounded-[28px] px-5 py-3.5',
        promptCard: (isLight) => isLight ? 'bg-[#dbeafe] text-[#111827] rounded-[16px]' : 'bg-[#1e40af] text-[#bfdbfe] rounded-[16px]',
        promptIconColor: '',
        citationCard: (isLight) => isLight ? 'bg-purple-50/80 border border-purple-100 rounded-[16px]' : 'bg-purple-900/20 border border-purple-500/15 rounded-[16px]',
        citationIcon: 'text-[#3b82f6]',
        pingBg: 'bg-[#3b82f6]',
        heroGradient: 'bg-[#3b82f6]',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-[#dbeafe]' : 'bg-[#1e40af]',
        iconColor: () => 'text-[#93c5fd]',
        searchBar: (isLight) => isLight ? 'bg-[#e5e7eb]/60' : 'bg-[#4b5563]/40',
        searchText: () => 'opacity-40',
        sparklineHigh: '#16a34a', sparklineMid: '#ff8c42', sparklineLow: '#dc2626',
        statusActive: 'bg-[#16a34a]/15 text-emerald-400',
        sheetAccent: '#93c5fd',
        sheetBg: (isLight) => isLight ? 'bg-[#f9fafb]' : 'bg-[#12121a]',
        primaryButton: 'bg-[#3b82f6] text-white rounded-full',
        secondaryButton: (isLight) => isLight ? 'bg-[#dbeafe] text-[#111827] rounded-full' : 'bg-white/10 text-white rounded-full',
    },
    notification: {
        headerAccent: () => 'text-xl font-medium text-[#93c5fd]',
        infoIconBg: 'bg-[#93c5fd]/10', infoIconColor: 'text-[#93c5fd]',
        askAiColor: 'text-[#93c5fd]',
    },
    profile: {
        roleColor: 'text-[#93c5fd]',
        statBadge: 'bg-[#16a34a]/10 text-[#4ade80]',
        donutPrimary: 'text-[#93c5fd]', donutLabel: 'text-[#93c5fd]',
        engagementActiveBg: 'bg-[#93c5fd]',
        barGradients: ['from-purple-400 to-purple-600', 'from-fuchsia-400 to-fuchsia-600', 'from-pink-400 to-pink-600', 'from-rose-400 to-rose-600', 'from-orange-400 to-orange-600', 'from-amber-400 to-amber-600', 'from-indigo-400 to-indigo-600'],
        settingsBg: (isLight) => isLight ? 'bg-[#e5e7eb]/50' : 'bg-[#4b5563]/40',
        modalBg: (isLight) => isLight ? 'bg-[#f9fafb]' : 'bg-[#12121a] text-[#e5e7eb]',
        modalActiveItem: (isLight) => isLight ? 'bg-[#dbeafe] border-[#dbeafe]' : 'bg-[#1e40af] border-[#1e40af]',
        checkColor: '',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-[#3b82f6]' : 'text-[#93c5fd]',
        briefingHighlight: 'text-[#93c5fd]',
        followUpColor: 'text-[#93c5fd]',
        seeAllColor: 'text-[#93c5fd]',
        quickActionBg: (isLight, g) => isLight ? 'bg-[#dbeafe] text-[#111827] rounded-[20px]' : `bg-gradient-to-br ${g} border border-white/5 rounded-[20px]`,
        quickActionIconColor: () => 'text-[#93c5fd]',
        teamColorMap: { purple: 'bg-purple-500/12 text-purple-400', blue: 'bg-blue-500/12 text-blue-400', emerald: 'bg-emerald-500/12 text-emerald-400', amber: 'bg-amber-500/12 text-amber-400' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Workspaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Notifications' }, profile: { sub: 'Settings', title: 'My Space' },
    },
    tabs: [['dashboard', 'space_dashboard', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-10',
    contentPaddingTop: 'pt-[100px]',
};

// ─── iOS 27 Liquid Glass Theme ──────────────────────────────────────
export const iosTheme: MobileTheme = {
    platform: 'ios',
    bg: {
        dark: 'bg-black text-white',
        light: 'bg-[#f3f4f6] text-black',
        colorful: 'bg-[#06040c] text-white',
    },
    card: {
        dark: 'bg-[#12121a]/65 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
        light: 'bg-white/55 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/70 rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.04)]',
        colorful: 'bg-[#0a0600]/35 backdrop-blur-[24px] backdrop-saturate-[200%] border border-orange-500/15 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
    },
    header: {
        dark: 'bg-[#12121a]/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-white/[0.06]',
        light: 'bg-white/40 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-black/[0.04]',
        colorful: 'bg-[#0a0600]/45 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-orange-500/10',
    },
    nav: {
        dark: 'bg-[#12121a]/60 backdrop-blur-[30px] backdrop-saturate-[200%] border-white/[0.08]',
        light: 'bg-[#f3f4f6]/60 backdrop-blur-[30px] backdrop-saturate-[200%] border-black/[0.04]',
        colorful: 'bg-[#0a0600]/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-orange-500/10',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-[#3b82f6]' : 'text-[#60a5fa]',
        inactive: (isLight) => isLight ? 'text-[#9ca3af]' : 'text-[#6b7280]',
        iconSize: 'text-[22px]',
        labelSize: 'text-[10px]',
    },
    accent: {
        primary: '#3b82f6',
        primaryLight: '#60a5fa',
        success: '#16a34a',
        successLight: '#16a34a',
        avatarGradient: '',
        avatarBorder: (isLight) => isLight ? 'border-white/80 shadow-sm' : 'border-white/[0.08] shadow-md',
        statusDot: (isLight) => isLight ? 'border-white bg-[#16a34a]' : 'border-black bg-[#4ade80]',
        aiButton: (isLight) => isLight ? 'bg-black/[0.04] backdrop-blur-xl text-black' : 'bg-white/[0.08] backdrop-blur-xl text-white',
        fallbackAvatar: '3b82f6',
    },
    radii: {
        card: 'rounded-[22px]', sheet: 'rounded-t-[24px]', search: 'rounded-[14px]',
        modal: 'rounded-[22px]', sendButton: 'rounded-full', sendButtonBg: 'bg-[#3b82f6]', sheetButton: 'rounded-[14px]',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-white rounded-[22px] rounded-tr-md shadow-[0_2px_12px_rgba(59,130,246,0.25)]',
        botBubble: (isLight) => isLight ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 text-black rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-[#12121a]/60 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] text-white rounded-[22px] rounded-tl-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-[#f3f4f6]/80 backdrop-blur-xl rounded-t-[28px]' : 'bg-[#12121a]/80 backdrop-blur-xl rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-[#e5e7eb]/80 rounded-[18px] px-5 py-3 text-black' : 'bg-[#1a1a24]/80 rounded-[18px] px-5 py-3 text-white',
        promptCard: (isLight) => isLight ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 rounded-[16px]' : 'bg-[#12121a]/60 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] rounded-[16px]',
        promptIconColor: 'text-[#3b82f6]',
        citationCard: (isLight) => isLight ? 'bg-blue-50/60 backdrop-blur-xl border border-blue-100/50 rounded-[14px]' : 'bg-blue-900/15 backdrop-blur-xl border border-blue-500/10 rounded-[14px]',
        citationIcon: 'text-[#3b82f6]',
        pingBg: 'bg-[#3b82f6]',
        heroGradient: 'bg-gradient-to-br from-[#3b82f6] to-[#6366f1]',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-[#3b82f6]/10' : 'bg-[#60a5fa]/10',
        iconColor: (isLight) => isLight ? 'text-[#3b82f6]' : 'text-[#60a5fa]',
        searchBar: (isLight) => isLight ? 'bg-[#e5e7eb]/80 backdrop-blur-lg' : 'bg-[#12121a]/80 backdrop-blur-lg',
        searchText: (isLight) => isLight ? 'text-[#9ca3af]' : 'text-[#6b7280]',
        sparklineHigh: '#16a34a', sparklineMid: '#FF9500', sparklineLow: '#dc2626',
        statusActive: 'bg-[#16a34a]/12 text-[#16a34a]',
        sheetAccent: '#60a5fa',
        sheetBg: (isLight) => isLight ? 'bg-[#f3f4f6]/95 backdrop-blur-2xl' : 'bg-[#1a1a24]/95 backdrop-blur-2xl',
        primaryButton: 'bg-[#3b82f6] text-white rounded-full',
        secondaryButton: (isLight) => isLight ? 'bg-[#e5e7eb]/80 text-[#3b82f6] rounded-full' : 'bg-white/10 text-white rounded-full',
    },
    notification: {
        headerAccent: () => 'text-xl font-bold tracking-tight text-[#60a5fa]',
        infoIconBg: 'bg-[#3b82f6]/10', infoIconColor: 'text-[#3b82f6]',
        askAiColor: 'text-[#3b82f6]',
    },
    profile: {
        roleColor: 'text-[#60a5fa]',
        statBadge: 'bg-[#16a34a]/10 text-[#16a34a]',
        donutPrimary: 'text-[#3b82f6]', donutLabel: 'text-[#3b82f6]',
        engagementActiveBg: 'bg-[#3b82f6]',
        barGradients: ['from-blue-400 to-blue-600', 'from-indigo-400 to-indigo-600', 'from-cyan-400 to-cyan-600', 'from-teal-400 to-teal-600', 'from-violet-400 to-violet-600', 'from-sky-400 to-sky-600', 'from-purple-400 to-purple-600'],
        settingsBg: (isLight) => isLight ? 'bg-black/[0.04] backdrop-blur-lg' : 'bg-white/[0.06] backdrop-blur-lg',
        modalBg: (isLight) => isLight ? 'bg-white/90 backdrop-blur-2xl' : 'bg-[#1a1a24]/95 backdrop-blur-2xl text-white',
        modalActiveItem: (isLight) => isLight ? 'bg-[#e5e7eb]/80' : 'bg-white/[0.08]',
        checkColor: 'text-[#3b82f6]',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-[#3b82f6]' : 'text-[#60a5fa]',
        briefingHighlight: 'text-[#60a5fa]',
        followUpColor: 'text-[#3b82f6]',
        seeAllColor: 'text-[#3b82f6]',
        quickActionBg: (isLight, g) => isLight ? `bg-gradient-to-br ${g} border rounded-[16px]` : `bg-gradient-to-br ${g.replace('/10', '/20').replace('/20', '/30')} border rounded-[16px]`,
        quickActionIconColor: (isLight) => isLight ? 'text-gray-700' : 'text-gray-300',
        teamColorMap: { purple: 'bg-purple-500/12 text-purple-400', blue: 'bg-[#3b82f6]/12 text-[#3b82f6]', emerald: 'bg-[#16a34a]/12 text-[#16a34a]', amber: 'bg-[#FF9500]/12 text-[#FF9500]' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Spaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Alerts' }, profile: { sub: 'Settings', title: 'Profile' },
    },
    tabs: [['dashboard', 'grid_view', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-14',
    contentPaddingTop: 'pt-[120px]',
};
