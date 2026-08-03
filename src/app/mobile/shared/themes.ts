'use client';

import type { TabType } from './mobile-utils';

// --- Theme Interface ---
export interface MobileTheme {
    platform: 'android' | 'ios';

    // Background + text classes per theme mode
    bg: { dark: string; light: string; colorful: string };
    // Card style per theme mode
    card: { dark: string; light: string; colorful: string };
    // Header chrome per theme mode
    header: { dark: string; light: string; colorful: string };
    // Nav bar container
    nav: { dark: string; light: string; colorful: string };
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
        sectionHeader: (variant: 'success' | 'primary', isLight: boolean) => string;
        mutedText: (isLight: boolean) => string;
        secondaryAction: (isLight: boolean) => string;
        successIconBg: string;
        successIconColor: string;
        successAction: string;
        matchBadge: string;
        statSurface: (isLight: boolean) => string;
        statAccent: string;
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

// --- Android Material Design 3 Expressive Theme ---
export const androidTheme: MobileTheme = {
    platform: 'android',
    bg: {
        dark: 'bg-background text-foreground',
        light: 'bg-background text-foreground',
        colorful: 'bg-background text-foreground',
    },
    card: {
        dark: 'bg-ds-dark-3/90 backdrop-blur-xl rounded-[28px] shadow-lg border border-ds-gray-600/30',
        light: 'bg-ds-gray-50/95 backdrop-blur-xl rounded-[28px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)] border border-ds-gray-200/60',
        colorful: 'bg-ds-card-colorful-from/60 backdrop-blur-xl rounded-[28px] shadow-lg border border-primary/20',
    },
    header: {
        dark: 'bg-ds-dark-2/95 backdrop-blur-2xl border-b border-ds-gray-600/30',
        light: 'bg-ds-gray-50/95 backdrop-blur-2xl border-b border-ds-gray-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
        colorful: 'bg-ds-card-colorful-from/80 backdrop-blur-2xl border-b border-primary/20',
    },
    nav: {
        dark: 'bg-ds-dark-2/90 backdrop-blur-xl border-ds-gray-600/30',
        light: 'bg-ds-gray-100/90 backdrop-blur-xl border-ds-gray-200/60',
        colorful: 'bg-ds-card-colorful-from/80 backdrop-blur-xl border-primary/20',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-ds-gray-900 fa-swap-opacity' : 'text-primary-200 fa-swap-opacity',
        inactive: (isLight) => isLight ? 'text-ds-gray-600' : 'text-ds-gray-300',
        pill: (isLight) => isLight ? 'bg-primary-100' : 'bg-primary-700',
        iconSize: 'text-[24px]',
        labelSize: 'text-[12px]',
    },
    accent: {
        primary: 'var(--primary)',
        primaryLight: 'var(--primary-300)',
        success: 'var(--color-success)',
        successLight: 'var(--color-success)',
        avatarGradient: 'bg-gradient-to-tr from-primary-500 to-primary-300',
        avatarBorder: (isLight) => isLight ? 'border-ds-gray-200' : 'border-ds-gray-600',
        statusDot: (isLight) => isLight ? 'border-ds-gray-50 bg-ds-success' : 'border-ds-dark-1 bg-ds-success',
        aiButton: (isLight) => isLight ? 'bg-primary-100/60 text-primary-700' : 'bg-primary-900/45 text-primary-200',
        fallbackAvatar: '3b82f6',
    },
    radii: {
        card: 'rounded-[28px]', sheet: 'rounded-t-[32px]', search: 'rounded-full',
        modal: 'rounded-[28px]', sendButton: 'rounded-[16px]', sendButtonBg: 'bg-primary', sheetButton: 'rounded-2xl',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-[24px] rounded-se-md shadow-lg',
        botBubble: (isLight) => isLight ? 'bg-ds-gray-50/95 backdrop-blur-xl border border-ds-gray-200/60 text-ds-gray-900 rounded-[24px] rounded-ss-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'bg-ds-dark-3/90 backdrop-blur-xl border border-ds-gray-600/30 text-primary-200 rounded-[24px] rounded-ss-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-ds-gray-100 rounded-t-[28px]' : 'bg-ds-dark-2 rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-ds-gray-200 text-ds-gray-900 rounded-[28px] px-5 py-3.5' : 'bg-ds-gray-600 text-primary-200 rounded-[28px] px-5 py-3.5',
        promptCard: (isLight) => isLight ? 'bg-primary-100 text-ds-gray-900 rounded-[16px]' : 'bg-primary-700 text-primary-200 rounded-[16px]',
        promptIconColor: '',
        citationCard: (isLight) => isLight ? 'bg-primary-500/8 border border-primary-500/10 rounded-[16px]' : 'bg-primary/20 border border-primary/15 rounded-[16px]',
        citationIcon: 'text-primary-500',
        pingBg: 'bg-primary',
        heroGradient: 'bg-primary',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-primary-100' : 'bg-primary-700',
        iconColor: () => 'text-primary-300',
        searchBar: (isLight) => isLight ? 'bg-ds-gray-200/60' : 'bg-ds-gray-600/40',
        searchText: () => 'opacity-40',
        sparklineHigh: 'var(--color-success)', sparklineMid: 'var(--primary)', sparklineLow: 'var(--color-error)',
        statusActive: 'bg-ds-success/15 text-ds-success',
        sheetAccent: 'var(--primary-300)',
        sheetBg: (isLight) => isLight ? 'bg-ds-gray-50' : 'bg-ds-dark-2',
        primaryButton: 'bg-primary text-white rounded-full',
        secondaryButton: (isLight) => isLight ? 'bg-primary-100 text-primary-700 rounded-full' : 'bg-primary-900/45 text-primary-200 rounded-full',
    },
    notification: {
        headerAccent: () => 'text-xl font-medium text-primary-300',
        infoIconBg: 'bg-primary-300/10', infoIconColor: 'text-primary-300',
        askAiColor: 'text-primary-300',
        sectionHeader: (variant) => variant === 'success'
            ? 'bg-ds-success/10 border-b border-ds-success/20 text-ds-success'
            : 'bg-primary-900/45 border-b border-primary-700/40 text-primary-200',
        mutedText: (isLight) => isLight ? 'text-ds-gray-500' : 'text-ds-gray-400',
        secondaryAction: (isLight) => isLight ? 'bg-primary-100/60 text-primary-700' : 'bg-primary-900/45 text-primary-200',
        successIconBg: 'bg-ds-success/15',
        successIconColor: 'text-ds-success',
        successAction: 'bg-ds-success text-on-dark',
        matchBadge: 'bg-ds-success/10 text-ds-success',
        statSurface: (isLight) => isLight ? 'bg-primary-100/50' : 'bg-primary-900/35',
        statAccent: 'text-primary-300',
    },
    profile: {
        roleColor: 'text-primary-300',
        statBadge: 'bg-ds-success/10 text-ds-success',
        donutPrimary: 'text-primary-300', donutLabel: 'text-primary-300',
        engagementActiveBg: 'bg-primary-300',
        barGradients: ['from-primary-400 to-primary-600', 'from-primary-300 to-primary-500', 'from-primary-500 to-primary-700', 'from-primary-600 to-primary-800', 'from-primary-400 to-primary-700', 'from-primary-300 to-primary-600', 'from-primary-500 to-primary-800'],
        settingsBg: (isLight) => isLight ? 'bg-primary-100/60' : 'bg-primary-900/45',
        modalBg: (isLight) => isLight ? 'bg-ds-gray-50' : 'bg-ds-dark-2 text-ds-gray-200',
        modalActiveItem: (isLight) => isLight ? 'bg-primary-100 border-primary-200' : 'bg-primary-900/60 border-primary-700/50',
        checkColor: '',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-primary-500' : 'text-primary-300',
        briefingHighlight: 'text-primary-300',
        followUpColor: 'text-primary-300',
        seeAllColor: 'text-primary-300',
        quickActionBg: (isLight, g) => isLight ? 'bg-primary-100 text-ds-gray-900 rounded-[20px]' : `bg-gradient-to-br ${g} border border-white/5 rounded-[20px]`,
        quickActionIconColor: () => 'text-primary-300',
        teamColorMap: { purple: 'bg-ds-violet-500/12 text-ds-violet-400', blue: 'bg-primary-500/12 text-primary-400', emerald: 'bg-ds-success/12 text-ds-success', amber: 'bg-ds-warning/12 text-ds-warning' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Workspaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Notifications' }, profile: { sub: 'Settings', title: 'My Space' },
    },
    tabs: [['dashboard', 'space_dashboard', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-10',
    contentPaddingTop: 'pt-[100px]',
};

// --- iOS 27 Liquid Glass Theme ---
export const iosTheme: MobileTheme = {
    platform: 'ios',
    bg: {
        dark: 'bg-background text-foreground',
        light: 'bg-background text-foreground',
        colorful: 'bg-background text-foreground',
    },
    card: {
        dark: 'bg-ds-dark-2/65 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
        light: 'bg-white/55 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/70 rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.04)]',
        colorful: 'bg-ds-card-colorful-from/35 backdrop-blur-[24px] backdrop-saturate-[200%] border border-primary/15 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
    },
    header: {
        dark: 'bg-ds-dark-2/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-white/[0.06]',
        light: 'bg-white/40 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-ds-gray-900/[0.04]',
        colorful: 'bg-ds-card-colorful-from/45 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-primary/10',
    },
    nav: {
        dark: 'bg-ds-dark-2/60 backdrop-blur-[30px] backdrop-saturate-[200%] border-white/[0.08]',
        light: 'bg-ds-gray-100/60 backdrop-blur-[30px] backdrop-saturate-[200%] border-black/[0.04]',
        colorful: 'bg-ds-card-colorful-from/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-primary/10',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-primary-500' : 'text-primary-400',
        inactive: (isLight) => isLight ? 'text-ds-gray-400' : 'text-ds-gray-500',
        iconSize: 'text-[22px]',
        labelSize: 'text-[10px]',
    },
    accent: {
        primary: 'var(--primary)',
        primaryLight: 'var(--primary-400)',
        success: 'var(--color-success)',
        successLight: 'var(--color-success)',
        avatarGradient: 'bg-gradient-to-tr from-primary-500 to-primary-400',
        avatarBorder: (isLight) => isLight ? 'border-white/80 shadow-sm' : 'border-white/[0.08] shadow-md',
        statusDot: (isLight) => isLight ? 'border-white bg-ds-success' : 'border-ds-dark-1 bg-ds-success',
        aiButton: (isLight) => isLight ? 'bg-primary-50/80 backdrop-blur-xl text-primary-600' : 'bg-primary-950/45 backdrop-blur-xl text-primary-300',
        fallbackAvatar: '3b82f6',
    },
    radii: {
        card: 'rounded-[22px]', sheet: 'rounded-t-[24px]', search: 'rounded-[14px]',
        modal: 'rounded-[22px]', sendButton: 'rounded-full', sendButtonBg: 'bg-primary', sheetButton: 'rounded-[14px]',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-[22px] rounded-se-md shadow-lg',
        botBubble: (isLight) => isLight ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 text-ds-gray-900 rounded-[22px] rounded-ss-sm shadow-sm' : 'bg-ds-dark-2/60 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] text-ds-gray-100 rounded-[22px] rounded-ss-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-ds-gray-100/80 backdrop-blur-xl rounded-t-[28px]' : 'bg-ds-dark-2/80 backdrop-blur-xl rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-ds-gray-200/80 rounded-[18px] px-5 py-3 text-ds-gray-900' : 'bg-ds-dark-3/80 rounded-[18px] px-5 py-3 text-ds-gray-100',
        promptCard: (isLight) => isLight ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 rounded-[16px]' : 'bg-ds-dark-2/60 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] rounded-[16px]',
        promptIconColor: 'text-primary-500',
        citationCard: (isLight) => isLight ? 'bg-primary-500/8 backdrop-blur-xl border border-primary-500/10 rounded-[14px]' : 'bg-primary-500/15 backdrop-blur-xl border border-primary-500/10 rounded-[14px]',
        citationIcon: 'text-primary-500',
        pingBg: 'bg-primary',
        heroGradient: 'bg-gradient-to-br from-primary to-primary-dark',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-primary-500/10' : 'bg-primary-400/10',
        iconColor: (isLight) => isLight ? 'text-primary-500' : 'text-primary-400',
        searchBar: (isLight) => isLight ? 'bg-ds-gray-200/80 backdrop-blur-lg' : 'bg-ds-dark-2/80 backdrop-blur-lg',
        searchText: (isLight) => isLight ? 'text-ds-gray-400' : 'text-ds-gray-500',
        sparklineHigh: 'var(--color-success)', sparklineMid: 'var(--color-warning)', sparklineLow: 'var(--color-error)',
        statusActive: 'bg-ds-success/12 text-ds-success',
        sheetAccent: 'var(--primary-400)',
        sheetBg: (isLight) => isLight ? 'bg-ds-gray-100/95 backdrop-blur-2xl' : 'bg-ds-dark-3/95 backdrop-blur-2xl',
        primaryButton: 'bg-primary text-white rounded-full',
        secondaryButton: (isLight) => isLight ? 'bg-primary-50/80 text-primary-600 rounded-full' : 'bg-primary-950/45 text-primary-300 rounded-full',
    },
    notification: {
        headerAccent: () => 'text-xl font-bold tracking-tight text-primary-400',
        infoIconBg: 'bg-primary-500/10', infoIconColor: 'text-primary-500',
        askAiColor: 'text-primary-500',
        sectionHeader: (variant, isLight) => variant === 'success'
            ? `bg-ds-success/10 border-b ${isLight ? 'border-ds-success/15' : 'border-ds-success/20'} text-ds-success`
            : `bg-primary-500/10 border-b ${isLight ? 'border-primary-500/10' : 'border-primary-400/15'} text-primary-400`,
        mutedText: (isLight) => isLight ? 'text-ds-gray-500' : 'text-ds-gray-400',
        secondaryAction: (isLight) => isLight ? 'bg-primary-50/80 text-primary-600' : 'bg-primary-950/45 text-primary-300',
        successIconBg: 'bg-ds-success/15',
        successIconColor: 'text-ds-success',
        successAction: 'bg-ds-success text-on-dark',
        matchBadge: 'bg-ds-success/10 text-ds-success',
        statSurface: (isLight) => isLight ? 'bg-primary-50/70' : 'bg-primary-950/35',
        statAccent: 'text-primary-400',
    },
    profile: {
        roleColor: 'text-primary-400',
        statBadge: 'bg-ds-success/10 text-ds-success',
        donutPrimary: 'text-primary-500', donutLabel: 'text-primary-500',
        engagementActiveBg: 'bg-primary-500',
        barGradients: ['from-primary-400 to-primary-600', 'from-primary-300 to-primary-500', 'from-ds-cyan-400 to-ds-cyan-500', 'from-ds-fuchsia-300 to-ds-fuchsia-700', 'from-ds-fuchsia-400 to-ds-fuchsia-600', 'from-ds-pink-400 to-ds-pink-500', 'from-ds-purple-400 to-ds-purple-600'],
        settingsBg: (isLight) => isLight ? 'bg-primary-50/80 backdrop-blur-lg' : 'bg-primary-950/45 backdrop-blur-lg',
        modalBg: (isLight) => isLight ? 'bg-white/90 backdrop-blur-2xl' : 'bg-ds-dark-3/95 backdrop-blur-2xl text-ds-gray-100',
        modalActiveItem: (isLight) => isLight ? 'bg-primary-50/90 border border-primary-100' : 'bg-primary-950/50 border border-primary-800/50',
        checkColor: 'text-primary-500',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-primary-500' : 'text-primary-400',
        briefingHighlight: 'text-primary-400',
        followUpColor: 'text-primary-500',
        seeAllColor: 'text-primary-500',
        quickActionBg: (isLight, g) => isLight ? `bg-gradient-to-br ${g} border rounded-[16px]` : `bg-gradient-to-br ${g.replace('/10', '/20').replace('/20', '/30')} border rounded-[16px]`,
        quickActionIconColor: (isLight) => isLight ? 'text-ds-gray-700' : 'text-ds-gray-300',
        teamColorMap: { purple: 'bg-ds-violet-500/12 text-ds-violet-400', blue: 'bg-primary-500/12 text-primary-500', emerald: 'bg-ds-success/12 text-ds-success', amber: 'bg-ds-warning/12 text-ds-warning' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Spaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Alerts' }, profile: { sub: 'Settings', title: 'Profile' },
    },
    tabs: [['dashboard', 'grid_view', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-14',
    contentPaddingTop: 'pt-[120px]',
};
