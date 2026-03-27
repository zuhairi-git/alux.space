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

// ─── Android Material Design 3 Expressive Theme (Android 16) ────────
export const androidTheme: MobileTheme = {
    platform: 'android',
    bg: {
        dark: 'bg-[#131316] text-[#E4E1E9]',
        light: 'bg-[#FDF7FF] text-[#1D1A22]',
        colorful: 'bg-[#050023] text-white',
    },
    card: {
        dark: 'bg-[#2D2B33]/90 backdrop-blur-xl rounded-[28px] shadow-lg border border-[#49454F]/30',
        light: 'bg-[#FEF7FF]/95 backdrop-blur-xl rounded-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)] border border-[#E7E0EC]/60',
        colorful: 'bg-[#1a0040]/60 backdrop-blur-xl rounded-[28px] shadow-lg border border-purple-500/20',
    },
    header: {
        dark: 'bg-[#1D1B20]/95 backdrop-blur-2xl border-b border-[#49454F]/30',
        light: 'bg-[#FEF7FF]/95 backdrop-blur-2xl border-b border-[#E7E0EC]/50 shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        colorful: 'bg-[#1a0040]/80 backdrop-blur-2xl border-b border-purple-500/20',
    },
    nav: {
        dark: 'bg-[#1D1B20] border-[#49454F]/30',
        light: 'bg-[#F3EDF7] border-[#E7E0EC]/60',
        colorful: 'bg-[#0A0138]/80 backdrop-blur-xl border-purple-500/20',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-[#1D1A22] font-variation-fill' : 'text-[#EADDFF] font-variation-fill',
        inactive: (isLight) => isLight ? 'text-[#49454F]' : 'text-[#CAC4D0]',
        pill: (isLight) => isLight ? 'bg-[#EADDFF]' : 'bg-[#4F378B]',
        iconSize: 'text-[24px]',
        labelSize: 'text-[12px]',
    },
    accent: {
        primary: '#6750A4',
        primaryLight: '#D0BCFF',
        success: '#386A20',
        successLight: '#386A20',
        avatarGradient: 'bg-gradient-to-tr from-[#6750A4] to-[#D0BCFF]',
        avatarBorder: (isLight) => isLight ? 'border-[#E7E0EC]' : 'border-[#49454F]',
        statusDot: (isLight) => isLight ? 'border-[#FEF7FF] bg-[#386A20]' : 'border-[#131316] bg-[#4CAF50]',
        aiButton: (isLight) => isLight ? 'bg-[#EADDFF]/60 text-[#1D1A22]' : 'bg-[#4F378B]/50 text-[#EADDFF]',
        fallbackAvatar: '6750A4',
    },
    radii: {
        card: 'rounded-[28px]', sheet: 'rounded-t-[32px]', search: 'rounded-full',
        modal: 'rounded-[28px]', sendButton: 'rounded-[16px]', sendButtonBg: 'bg-[#6750A4]', sheetButton: 'rounded-2xl',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-[#6750A4] to-[#9a82db] text-white rounded-[24px] rounded-tr-md shadow-[0_2px_8px_rgba(103,80,164,0.25)]',
        botBubble: (isLight) => isLight ? 'bg-[#FEF7FF]/95 backdrop-blur-xl border border-[#E7E0EC]/60 text-[#1D1A22] rounded-[24px] rounded-tl-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'bg-[#2D2B33]/90 backdrop-blur-xl border border-[#49454F]/30 text-[#EADDFF] rounded-[24px] rounded-tl-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-[#F3EDF7] rounded-t-[28px]' : 'bg-[#1D1B20] rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-[#E7E0EC] text-[#1D1A22] rounded-[28px] px-5 py-3.5' : 'bg-[#49454F] text-[#EADDFF] rounded-[28px] px-5 py-3.5',
        promptCard: (isLight) => isLight ? 'bg-[#EADDFF] text-[#1D1A22] rounded-[16px]' : 'bg-[#4F378B] text-[#EADDFF] rounded-[16px]',
        promptIconColor: '',
        citationCard: (isLight) => isLight ? 'bg-purple-50/80 border border-purple-100 rounded-[16px]' : 'bg-purple-900/20 border border-purple-500/15 rounded-[16px]',
        citationIcon: 'text-[#6750A4]',
        pingBg: 'bg-[#6750A4]',
        heroGradient: 'bg-[#6750A4]',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-[#EADDFF]' : 'bg-[#4F378B]',
        iconColor: () => 'text-[#D0BCFF]',
        searchBar: (isLight) => isLight ? 'bg-[#E7E0EC]/60' : 'bg-[#49454F]/40',
        searchText: () => 'opacity-40',
        sparklineHigh: '#386A20', sparklineMid: '#FF9800', sparklineLow: '#BA1A1A',
        statusActive: 'bg-[#386A20]/15 text-emerald-400',
        sheetAccent: '#D0BCFF',
        sheetBg: (isLight) => isLight ? 'bg-[#FEF7FF]' : 'bg-[#1D1B20]',
        primaryButton: 'bg-[#6750A4] text-white rounded-full',
        secondaryButton: (isLight) => isLight ? 'bg-[#E8DEF8] text-[#1D1A22] rounded-full' : 'bg-white/10 text-white rounded-full',
    },
    notification: {
        headerAccent: () => 'text-xl font-medium text-[#D0BCFF]',
        infoIconBg: 'bg-[#D0BCFF]/10', infoIconColor: 'text-[#D0BCFF]',
        askAiColor: 'text-[#D0BCFF]',
    },
    profile: {
        roleColor: 'text-[#D0BCFF]',
        statBadge: 'bg-[#386A20]/10 text-[#4CAF50]',
        donutPrimary: 'text-[#D0BCFF]', donutLabel: 'text-[#D0BCFF]',
        engagementActiveBg: 'bg-[#D0BCFF]',
        barGradients: ['from-purple-400 to-purple-600', 'from-fuchsia-400 to-fuchsia-600', 'from-pink-400 to-pink-600', 'from-rose-400 to-rose-600', 'from-orange-400 to-orange-600', 'from-amber-400 to-amber-600', 'from-indigo-400 to-indigo-600'],
        settingsBg: (isLight) => isLight ? 'bg-[#E7E0EC]/50' : 'bg-[#49454F]/40',
        modalBg: (isLight) => isLight ? 'bg-[#FEF7FF]' : 'bg-[#1D1B20] text-[#E4E1E9]',
        modalActiveItem: (isLight) => isLight ? 'bg-[#EADDFF] border-[#EADDFF]' : 'bg-[#4F378B] border-[#4F378B]',
        checkColor: '',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-[#6750A4]' : 'text-[#D0BCFF]',
        briefingHighlight: 'text-[#D0BCFF]',
        followUpColor: 'text-[#D0BCFF]',
        seeAllColor: 'text-[#D0BCFF]',
        quickActionBg: (isLight, g) => isLight ? 'bg-[#EADDFF] text-[#1D1A22] rounded-[20px]' : `bg-gradient-to-br ${g} border border-white/5 rounded-[20px]`,
        quickActionIconColor: () => 'text-[#D0BCFF]',
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

// ─── iOS 26 Liquid Glass Theme ──────────────────────────────────────
export const iosTheme: MobileTheme = {
    platform: 'ios',
    bg: {
        dark: 'bg-black text-white',
        light: 'bg-[#F2F2F7] text-black',
        colorful: 'bg-[#050023] text-white',
    },
    card: {
        dark: 'bg-[#1C1C1E]/65 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
        light: 'bg-white/55 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/70 rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.04)]',
        colorful: 'bg-[#1a0040]/35 backdrop-blur-[24px] backdrop-saturate-[200%] border border-purple-500/15 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
    },
    header: {
        dark: 'bg-[#1C1C1E]/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-white/[0.06]',
        light: 'bg-white/40 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-black/[0.04]',
        colorful: 'bg-[#1a0040]/45 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-purple-500/10',
    },
    nav: {
        dark: 'bg-[#1C1C1E]/60 backdrop-blur-[30px] backdrop-saturate-[200%] border-white/[0.08]',
        light: 'bg-[#F2F2F7]/60 backdrop-blur-[30px] backdrop-saturate-[200%] border-black/[0.04]',
        colorful: 'bg-[#1a0040]/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-purple-500/10',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-[#007AFF]' : 'text-[#0A84FF]',
        inactive: (isLight) => isLight ? 'text-[#8E8E93]' : 'text-[#636366]',
        iconSize: 'text-[22px]',
        labelSize: 'text-[10px]',
    },
    accent: {
        primary: '#007AFF',
        primaryLight: '#0A84FF',
        success: '#34C759',
        successLight: '#34C759',
        avatarGradient: '',
        avatarBorder: (isLight) => isLight ? 'border-white/80 shadow-sm' : 'border-white/[0.08] shadow-md',
        statusDot: (isLight) => isLight ? 'border-white bg-[#34C759]' : 'border-black bg-[#32D74B]',
        aiButton: (isLight) => isLight ? 'bg-black/[0.04] backdrop-blur-xl text-black' : 'bg-white/[0.08] backdrop-blur-xl text-white',
        fallbackAvatar: '007AFF',
    },
    radii: {
        card: 'rounded-[22px]', sheet: 'rounded-t-[24px]', search: 'rounded-[14px]',
        modal: 'rounded-[22px]', sendButton: 'rounded-full', sendButtonBg: 'bg-[#007AFF]', sheetButton: 'rounded-[14px]',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-[#007AFF] to-[#5856D6] text-white rounded-[22px] rounded-tr-md shadow-[0_2px_12px_rgba(0,122,255,0.25)]',
        botBubble: (isLight) => isLight ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 text-black rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-[#1C1C1E]/60 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] text-white rounded-[22px] rounded-tl-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-[#F2F2F7]/80 backdrop-blur-xl rounded-t-[28px]' : 'bg-[#1C1C1E]/80 backdrop-blur-xl rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-[#E5E5EA]/80 rounded-[18px] px-5 py-3 text-black' : 'bg-[#2C2C2E]/80 rounded-[18px] px-5 py-3 text-white',
        promptCard: (isLight) => isLight ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 rounded-[16px]' : 'bg-[#1C1C1E]/60 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] rounded-[16px]',
        promptIconColor: 'text-[#007AFF]',
        citationCard: (isLight) => isLight ? 'bg-blue-50/60 backdrop-blur-xl border border-blue-100/50 rounded-[14px]' : 'bg-blue-900/15 backdrop-blur-xl border border-blue-500/10 rounded-[14px]',
        citationIcon: 'text-[#007AFF]',
        pingBg: 'bg-[#007AFF]',
        heroGradient: 'bg-gradient-to-br from-[#007AFF] to-[#5856D6]',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-[#007AFF]/10' : 'bg-[#0A84FF]/10',
        iconColor: (isLight) => isLight ? 'text-[#007AFF]' : 'text-[#0A84FF]',
        searchBar: (isLight) => isLight ? 'bg-[#E5E5EA]/80 backdrop-blur-lg' : 'bg-[#1C1C1E]/80 backdrop-blur-lg',
        searchText: (isLight) => isLight ? 'text-[#8E8E93]' : 'text-[#636366]',
        sparklineHigh: '#34C759', sparklineMid: '#FF9500', sparklineLow: '#FF3B30',
        statusActive: 'bg-[#34C759]/12 text-[#34C759]',
        sheetAccent: '#0A84FF',
        sheetBg: (isLight) => isLight ? 'bg-[#F2F2F7]/95 backdrop-blur-2xl' : 'bg-[#2C2C2E]/95 backdrop-blur-2xl',
        primaryButton: 'bg-[#007AFF] text-white rounded-full',
        secondaryButton: (isLight) => isLight ? 'bg-[#E5E5EA]/80 text-[#007AFF] rounded-full' : 'bg-white/10 text-white rounded-full',
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
        settingsBg: (isLight) => isLight ? 'bg-black/[0.04] backdrop-blur-lg' : 'bg-white/[0.06] backdrop-blur-lg',
        modalBg: (isLight) => isLight ? 'bg-white/90 backdrop-blur-2xl' : 'bg-[#2C2C2E]/95 backdrop-blur-2xl text-white',
        modalActiveItem: (isLight) => isLight ? 'bg-[#E5E5EA]/80' : 'bg-white/[0.08]',
        checkColor: 'text-[#007AFF]',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-[#007AFF]' : 'text-[#0A84FF]',
        briefingHighlight: 'text-[#0A84FF]',
        followUpColor: 'text-[#007AFF]',
        seeAllColor: 'text-[#007AFF]',
        quickActionBg: (isLight, g) => isLight ? `bg-gradient-to-br ${g} border rounded-[16px]` : `bg-gradient-to-br ${g.replace('/10', '/20').replace('/20', '/30')} border rounded-[16px]`,
        quickActionIconColor: (isLight) => isLight ? 'text-gray-700' : 'text-gray-300',
        teamColorMap: { purple: 'bg-purple-500/12 text-purple-400', blue: 'bg-[#007AFF]/12 text-[#007AFF]', emerald: 'bg-[#34C759]/12 text-[#34C759]', amber: 'bg-[#FF9500]/12 text-[#FF9500]' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Spaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Alerts' }, profile: { sub: 'Settings', title: 'Profile' },
    },
    tabs: [['dashboard', 'grid_view', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-14',
    contentPaddingTop: 'pt-[120px]',
};
