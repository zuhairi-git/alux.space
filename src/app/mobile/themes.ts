'use client';

import type { TabType } from './shared';

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Theme Interface Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
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

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ Android Material Design 3 Expressive Theme (Android 16/17) Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const androidTheme: MobileTheme = {
    platform: 'android',
    bg: {
        dark: 'bg-ds-dark-1 text-ds-gray-200',
        light: 'bg-ds-gray-50 text-ds-gray-900',
        colorful: 'bg-[var(--color-colorful-bg)] text-white',
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
        dark: 'bg-ds-dark-2 border-ds-gray-600/30',
        light: 'bg-ds-gray-100 border-ds-gray-200/60',
        colorful: 'bg-ds-card-colorful-from/80 backdrop-blur-xl border-primary/20',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-ds-gray-900 font-variation-fill' : 'text-ds-blue-200 font-variation-fill',
        inactive: (isLight) => isLight ? 'text-ds-gray-600' : 'text-ds-gray-300',
        pill: (isLight) => isLight ? 'bg-ds-blue-100' : 'bg-ds-blue-700',
        iconSize: 'text-[24px]',
        labelSize: 'text-[12px]',
    },
    accent: {
        primary: '#3b82f6',
        primaryLight: '#93c5fd',
        success: '#16a34a',
        successLight: '#16a34a',
        avatarGradient: 'bg-gradient-to-tr from-ds-blue-500 to-ds-blue-300',
        avatarBorder: (isLight) => isLight ? 'border-ds-gray-200' : 'border-ds-gray-600',
        statusDot: (isLight) => isLight ? 'border-ds-gray-50 bg-ds-success' : 'border-ds-dark-1 bg-ds-success',
        aiButton: (isLight) => isLight ? 'bg-ds-blue-100/60 text-ds-gray-900' : 'bg-ds-blue-700/50 text-ds-blue-200',
        fallbackAvatar: '3b82f6',
    },
    radii: {
        card: 'rounded-[28px]', sheet: 'rounded-t-[32px]', search: 'rounded-full',
        modal: 'rounded-[28px]', sendButton: 'rounded-[16px]', sendButtonBg: 'bg-ds-blue-500', sheetButton: 'rounded-2xl',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-ds-blue-500 to-ds-indigo-400 text-white rounded-[24px] rounded-tr-md shadow-[0_2px_8px_rgba(59,130,246,0.25)]',
        botBubble: (isLight) => isLight ? 'bg-ds-gray-50/95 backdrop-blur-xl border border-ds-gray-200/60 text-ds-gray-900 rounded-[24px] rounded-tl-sm shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'bg-ds-dark-3/90 backdrop-blur-xl border border-ds-gray-600/30 text-ds-blue-200 rounded-[24px] rounded-tl-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-ds-gray-100 rounded-t-[28px]' : 'bg-ds-dark-2 rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-ds-gray-200 text-ds-gray-900 rounded-[28px] px-5 py-3.5' : 'bg-ds-gray-600 text-ds-blue-200 rounded-[28px] px-5 py-3.5',
        promptCard: (isLight) => isLight ? 'bg-ds-blue-100 text-ds-gray-900 rounded-[16px]' : 'bg-ds-blue-700 text-ds-blue-200 rounded-[16px]',
        promptIconColor: '',
        citationCard: (isLight) => isLight ? 'bg-ds-indigo-500/8 border border-ds-indigo-500/10 rounded-[16px]' : 'bg-primary/20 border border-primary/15 rounded-[16px]',
        citationIcon: 'text-ds-blue-500',
        pingBg: 'bg-ds-blue-500',
        heroGradient: 'bg-ds-blue-500',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-ds-blue-100' : 'bg-ds-blue-700',
        iconColor: () => 'text-ds-blue-300',
        searchBar: (isLight) => isLight ? 'bg-ds-gray-200/60' : 'bg-ds-gray-600/40',
        searchText: () => 'opacity-40',
        sparklineHigh: '#16a34a', sparklineMid: 'var(--primary)', sparklineLow: '#dc2626',
        statusActive: 'bg-ds-success/15 text-ds-success',
        sheetAccent: '#93c5fd',
        sheetBg: (isLight) => isLight ? 'bg-ds-gray-50' : 'bg-ds-dark-2',
        primaryButton: 'bg-ds-blue-500 text-white rounded-full',
        secondaryButton: (isLight) => isLight ? 'bg-ds-blue-100 text-ds-gray-900 rounded-full' : 'bg-white/10 text-white rounded-full',
    },
    notification: {
        headerAccent: () => 'text-xl font-medium text-ds-blue-300',
        infoIconBg: 'bg-ds-blue-300/10', infoIconColor: 'text-ds-blue-300',
        askAiColor: 'text-ds-blue-300',
    },
    profile: {
        roleColor: 'text-ds-blue-300',
        statBadge: 'bg-ds-success/10 text-ds-success',
        donutPrimary: 'text-ds-blue-300', donutLabel: 'text-ds-blue-300',
        engagementActiveBg: 'bg-ds-blue-300',
        barGradients: ['from-ds-blue-400 to-ds-blue-600', 'from-ds-blue-300 to-ds-blue-500', 'from-ds-indigo-400 to-ds-indigo-600', 'from-ds-blue-500 to-ds-indigo-500', 'from-ds-indigo-400 to-ds-blue-600', 'from-ds-blue-400 to-ds-indigo-500', 'from-ds-indigo-500 to-ds-blue-500'],
        settingsBg: (isLight) => isLight ? 'bg-ds-gray-200/50' : 'bg-ds-gray-600/40',
        modalBg: (isLight) => isLight ? 'bg-ds-gray-50' : 'bg-ds-dark-2 text-ds-gray-200',
        modalActiveItem: (isLight) => isLight ? 'bg-ds-blue-100 border-ds-blue-100' : 'bg-ds-blue-700 border-ds-blue-700',
        checkColor: '',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-ds-blue-500' : 'text-ds-blue-300',
        briefingHighlight: 'text-ds-blue-300',
        followUpColor: 'text-ds-blue-300',
        seeAllColor: 'text-ds-blue-300',
        quickActionBg: (isLight, g) => isLight ? 'bg-ds-blue-100 text-ds-gray-900 rounded-[20px]' : `bg-gradient-to-br ${g} border border-white/5 rounded-[20px]`,
        quickActionIconColor: () => 'text-ds-blue-300',
        teamColorMap: { purple: 'bg-primary-500/12 text-primary-400', blue: 'bg-ds-blue-500/12 text-ds-blue-400', emerald: 'bg-ds-success/12 text-ds-success', amber: 'bg-ds-warning/12 text-ds-warning' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Workspaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Notifications' }, profile: { sub: 'Settings', title: 'My Space' },
    },
    tabs: [['dashboard', 'space_dashboard', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-10',
    contentPaddingTop: 'pt-[100px]',
};

// Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬ iOS 27 Liquid Glass Theme Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const iosTheme: MobileTheme = {
    platform: 'ios',
    bg: {
        dark: 'bg-black text-white',
        light: 'bg-ds-gray-100 text-black',
        colorful: 'bg-[var(--color-colorful-bg)] text-white',
    },
    card: {
        dark: 'bg-ds-dark-2/65 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
        light: 'bg-white/55 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/70 rounded-[22px] shadow-[0_2px_16px_rgba(0,0,0,0.04)]',
        colorful: 'bg-ds-card-colorful-from/35 backdrop-blur-[24px] backdrop-saturate-[200%] border border-primary/15 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
    },
    header: {
        dark: 'bg-ds-dark-2/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-white/[0.06]',
        light: 'bg-white/40 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-black/[0.04]',
        colorful: 'bg-ds-card-colorful-from/45 backdrop-blur-[30px] backdrop-saturate-[200%] border-b border-primary/10',
    },
    nav: {
        dark: 'bg-ds-dark-2/60 backdrop-blur-[30px] backdrop-saturate-[200%] border-white/[0.08]',
        light: 'bg-ds-gray-100/60 backdrop-blur-[30px] backdrop-saturate-[200%] border-black/[0.04]',
        colorful: 'bg-ds-card-colorful-from/50 backdrop-blur-[30px] backdrop-saturate-[200%] border-primary/10',
    },
    navTab: {
        active: (isLight) => isLight ? 'text-ds-blue-500' : 'text-ds-blue-400',
        inactive: (isLight) => isLight ? 'text-ds-gray-400' : 'text-ds-gray-500',
        iconSize: 'text-[22px]',
        labelSize: 'text-[10px]',
    },
    accent: {
        primary: '#3b82f6',
        primaryLight: '#60a5fa',
        success: '#16a34a',
        successLight: '#16a34a',
        avatarGradient: 'bg-gradient-to-tr from-ds-blue-500 to-ds-blue-400',
        avatarBorder: (isLight) => isLight ? 'border-white/80 shadow-sm' : 'border-white/[0.08] shadow-md',
        statusDot: (isLight) => isLight ? 'border-white bg-ds-success' : 'border-black bg-ds-success',
        aiButton: (isLight) => isLight ? 'bg-black/[0.04] backdrop-blur-xl text-black' : 'bg-white/[0.08] backdrop-blur-xl text-white',
        fallbackAvatar: '3b82f6',
    },
    radii: {
        card: 'rounded-[22px]', sheet: 'rounded-t-[24px]', search: 'rounded-[14px]',
        modal: 'rounded-[22px]', sendButton: 'rounded-full', sendButtonBg: 'bg-ds-blue-500', sheetButton: 'rounded-[14px]',
    },
    copilot: {
        userBubble: 'bg-gradient-to-br from-ds-blue-500 to-ds-indigo-500 text-white rounded-[22px] rounded-tr-md shadow-[0_2px_12px_rgba(59,130,246,0.25)]',
        botBubble: (isLight) => isLight ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 text-black rounded-[22px] rounded-tl-sm shadow-sm' : 'bg-ds-dark-2/60 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] text-white rounded-[22px] rounded-tl-sm shadow-sm',
        inputBar: (isLight) => isLight ? 'bg-ds-gray-100/80 backdrop-blur-xl rounded-t-[28px]' : 'bg-ds-dark-2/80 backdrop-blur-xl rounded-t-[28px]',
        inputField: (isLight) => isLight ? 'bg-ds-gray-200/80 rounded-[18px] px-5 py-3 text-black' : 'bg-ds-dark-3/80 rounded-[18px] px-5 py-3 text-white',
        promptCard: (isLight) => isLight ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 rounded-[16px]' : 'bg-ds-dark-2/60 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.06] rounded-[16px]',
        promptIconColor: 'text-ds-blue-500',
        citationCard: (isLight) => isLight ? 'bg-ds-blue-500/8 backdrop-blur-xl border border-ds-blue-500/10 rounded-[14px]' : 'bg-ds-blue-500/15 backdrop-blur-xl border border-ds-blue-500/10 rounded-[14px]',
        citationIcon: 'text-ds-blue-500',
        pingBg: 'bg-ds-blue-500',
        heroGradient: 'bg-gradient-to-br from-ds-blue-500 to-ds-indigo-500',
    },
    workspace: {
        iconBg: (isLight) => isLight ? 'bg-ds-blue-500/10' : 'bg-ds-blue-400/10',
        iconColor: (isLight) => isLight ? 'text-ds-blue-500' : 'text-ds-blue-400',
        searchBar: (isLight) => isLight ? 'bg-ds-gray-200/80 backdrop-blur-lg' : 'bg-ds-dark-2/80 backdrop-blur-lg',
        searchText: (isLight) => isLight ? 'text-ds-gray-400' : 'text-ds-gray-500',
        sparklineHigh: '#16a34a', sparklineMid: '#FF9500', sparklineLow: '#dc2626',
        statusActive: 'bg-ds-success/12 text-ds-success',
        sheetAccent: '#60a5fa',
        sheetBg: (isLight) => isLight ? 'bg-ds-gray-100/95 backdrop-blur-2xl' : 'bg-ds-dark-3/95 backdrop-blur-2xl',
        primaryButton: 'bg-ds-blue-500 text-white rounded-full',
        secondaryButton: (isLight) => isLight ? 'bg-ds-gray-200/80 text-ds-blue-500 rounded-full' : 'bg-white/10 text-white rounded-full',
    },
    notification: {
        headerAccent: () => 'text-xl font-bold tracking-tight text-ds-blue-400',
        infoIconBg: 'bg-ds-blue-500/10', infoIconColor: 'text-ds-blue-500',
        askAiColor: 'text-ds-blue-500',
    },
    profile: {
        roleColor: 'text-ds-blue-400',
        statBadge: 'bg-ds-success/10 text-ds-success',
        donutPrimary: 'text-ds-blue-500', donutLabel: 'text-ds-blue-500',
        engagementActiveBg: 'bg-ds-blue-500',
        barGradients: ['from-ds-blue-400 to-ds-blue-600', 'from-ds-indigo-400 to-ds-indigo-600', 'from-ds-cyan-400 to-ds-cyan-500', 'from-primary-300 to-primary-700', 'from-ds-fuchsia-400 to-ds-fuchsia-600', 'from-ds-pink-400 to-ds-pink-500', 'from-primary-400 to-primary-600'],
        settingsBg: (isLight) => isLight ? 'bg-black/[0.04] backdrop-blur-lg' : 'bg-white/[0.06] backdrop-blur-lg',
        modalBg: (isLight) => isLight ? 'bg-white/90 backdrop-blur-2xl' : 'bg-ds-dark-3/95 backdrop-blur-2xl text-white',
        modalActiveItem: (isLight) => isLight ? 'bg-ds-gray-200/80' : 'bg-white/[0.08]',
        checkColor: 'text-ds-blue-500',
    },
    dashboard: {
        briefingAccent: (isLight) => isLight ? 'text-ds-blue-500' : 'text-ds-blue-400',
        briefingHighlight: 'text-ds-blue-400',
        followUpColor: 'text-ds-blue-500',
        seeAllColor: 'text-ds-blue-500',
        quickActionBg: (isLight, g) => isLight ? `bg-gradient-to-br ${g} border rounded-[16px]` : `bg-gradient-to-br ${g.replace('/10', '/20').replace('/20', '/30')} border rounded-[16px]`,
        quickActionIconColor: (isLight) => isLight ? 'text-gray-700' : 'text-gray-300',
        teamColorMap: { purple: 'bg-primary-500/12 text-primary-400', blue: 'bg-ds-blue-500/12 text-ds-blue-500', emerald: 'bg-ds-success/12 text-ds-success', amber: 'bg-ds-warning/12 text-ds-warning' },
    },
    titles: {
        dashboard: { sub: 'Welcome Back', title: 'Ali Al-Zuhairi' }, workspaces: { sub: 'Collaborate', title: 'Spaces' },
        copilot: { sub: 'AI-Powered', title: 'Copilot' }, notifications: { sub: 'Real-Time', title: 'Alerts' }, profile: { sub: 'Settings', title: 'Profile' },
    },
    tabs: [['dashboard', 'grid_view', 'Home'], ['workspaces', 'workspaces', 'Spaces'], ['copilot', 'auto_awesome', 'Copilot'], ['notifications', 'notifications', 'Alerts'], ['profile', 'person', 'Profile']],
    headerPaddingTop: 'pt-14',
    contentPaddingTop: 'pt-[120px]',
};
