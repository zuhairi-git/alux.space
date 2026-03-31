'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import ThemeSwitch from './ThemeSwitch';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { i18n } from '@/i18n';
import { useAnalyticsTracking } from '../../seo/AnalyticsProvider';

// --- Types ---

interface NavItem {
  href: string;
  labelKey: string;
  icon: string;
  type?: 'link' | 'dropdown';
  children?: NavItem[];
  category?: 'case-study' | 'prototype';
}

// --- Configuration ---

const navItems: NavItem[] = [
  {
    href: '/',
    labelKey: 'nav.home',
    icon: 'home',
    type: 'dropdown',
    children: [
      { href: '/', labelKey: 'nav.home', icon: 'home' },
      { href: '/#work-experience', labelKey: 'nav.workExperience', icon: 'work' },
      { href: '/#digital-dreams', labelKey: 'nav.digitalDreams', icon: 'auto_awesome' },
      { href: '/#strengths-skills', labelKey: 'nav.strengthsSkills', icon: 'psychology' },
      { href: '/#testimonials', labelKey: 'nav.testimonials', icon: 'format_quote' },
    ]
  },
  {
    href: '/portfolio',
    labelKey: 'nav.portfolio',
    icon: 'work',
    type: 'dropdown',
    children: [
      { href: '/portfolio', labelKey: 'portfolio.overview', icon: 'dashboard' },
      { href: '/portfolio/healthcare-prioritization', labelKey: 'portfolio.cases.healthcare', icon: 'health_and_safety', category: 'case-study' },
      { href: '/portfolio/accessibility', labelKey: 'portfolio.cases.accessibility', icon: 'accessibility_new', category: 'case-study' },
      { href: '/portfolio/workflow', labelKey: 'portfolio.cases.collaboration', icon: 'groups', category: 'prototype' },
      { href: '/portfolio/jobseeking', labelKey: 'portfolio.cases.jobseeking', icon: 'work_history', category: 'prototype' },
      { href: '/portfolio/market-intelligence', labelKey: 'portfolio.cases.marketIntelligence', icon: 'smartphone', category: 'prototype' },
      { href: '/portfolio/game-strategy', labelKey: 'portfolio.cases.gameStrategy', icon: 'sports_esports', category: 'case-study' },
    ]
  },
  { href: '/blog', labelKey: 'nav.blog', icon: 'article' },
  { href: '/audio', labelKey: 'nav.audio', icon: 'audio_file' },
  { href: '/prompt', labelKey: 'nav.prompts', icon: 'smart_toy' },
];

// --- Components ---

const Navigation = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const { trackEvent } = useAnalyticsTracking();
  const pathname = usePathname();

  // Handle scroll to hide/show nav
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(latest);
  });

  // Helper for localized paths
  const localizedHref = (path: string) => {
    if (path.startsWith('/') && i18n.locales.some(loc => path.startsWith(`/${loc}/`))) {
      return path;
    }
    if (path.startsWith('#') || path.startsWith('/#')) {
      return path.startsWith('/#') ? `/${locale}${path}` : `/${locale}/${path}`;
    }
    return `/${locale}${path}`;
  };

  // Helper to check if a nav item is active
  const isNavItemActive = (item: NavItem): boolean => {
    const itemPath = localizedHref(item.href);

    // Remove hash anchors for comparison (e.g., /#work-experience -> /)
    const cleanPathname = pathname.split('#')[0];
    const cleanItemPath = itemPath.split('#')[0];

    // Exact match for home page
    if (cleanItemPath === `/${locale}` || cleanItemPath === `/${locale}/`) {
      return cleanPathname === `/${locale}` || cleanPathname === `/${locale}/`;
    }

    // For other pages, check if current path starts with item path
    // This handles both exact matches and child pages
    return cleanPathname.startsWith(cleanItemPath);
  };

  return (
    <>
      {/* Desktop Navigation (Top Pill) */}
      <DesktopNav
        hidden={hidden}
        theme={theme}
        t={t}
        localizedHref={localizedHref}
        trackEvent={trackEvent}
        pathname={pathname}
        isNavItemActive={isNavItemActive}
      />

      {/* Mobile Navigation (Bottom Dock) */}
      <MobileNav
        hidden={hidden}
        theme={theme}
        t={t}
        localizedHref={localizedHref}
        pathname={pathname}
        isNavItemActive={isNavItemActive}
      />
    </>
  );
};

// --- Desktop Navigation Component ---

interface DesktopNavProps {
  hidden: boolean;
  theme: string;
  t: (key: string) => string;
  localizedHref: (path: string) => string;
  trackEvent: (action: string, category: string, label: string) => void;
  pathname: string;
  isNavItemActive: (item: NavItem) => boolean;
}

const DesktopNav = ({ hidden, theme, t, localizedHref, trackEvent, pathname, isNavItemActive }: DesktopNavProps) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center gap-2 p-2 rounded-full border backdrop-blur-xl shadow-lg shadow-black/5"
      style={{
        backgroundColor: 'var(--nav-bg)',
        borderColor: 'var(--nav-border)',
      }}
    >
      {/* Logo/Avatar */}
      <Link
        href={localizedHref('/')}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ml-1 mr-2 shadow-md transition-all duration-300
          ${theme === 'colorful'
            ? 'bg-gradient-to-br from-primary to-[var(--color-cobalt-700)] text-white shadow-primary/25'
            : theme === 'light'
              ? 'bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white shadow-[var(--primary)]/25'
              : 'bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white shadow-[var(--primary)]/25'
          }
        `}
        aria-label="Home"
      >
        A
      </Link>

      {/* Nav Items */}
      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <DesktopNavItem
            key={item.href}
            item={item}
            theme={theme}
            t={t}
            localizedHref={localizedHref}
            trackEvent={trackEvent}
            isActive={isNavItemActive(item)}
            hoveredTab={hoveredTab}
            setHoveredTab={setHoveredTab}
            pathname={pathname}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 mx-2 bg-[var(--card-border)]" />

      {/* Settings */}
      <div className="flex items-center gap-1 pr-2">
        <LanguageSwitcher />
        <ThemeSwitch />
      </div>
    </motion.nav>
  );
};

interface DesktopNavItemProps {
  item: NavItem;
  theme: string;
  t: (key: string) => string;
  localizedHref: (path: string) => string;
  trackEvent: (action: string, category: string, label: string) => void;
  isActive: boolean;
  hoveredTab: string | null;
  setHoveredTab: (href: string | null) => void;
  pathname: string;
}

const DesktopNavItem = ({ item, theme, t, localizedHref, trackEvent, isActive, hoveredTab, setHoveredTab, pathname }: DesktopNavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isHovered = hoveredTab === item.href;

  // Helper to check if a dropdown child item is active
  const isChildActive = (childHref: string): boolean => {
    const cleanPathname = pathname.split('#')[0];
    const cleanChildPath = localizedHref(childHref).split('#')[0];

    // Exact match
    return cleanPathname === cleanChildPath;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setHoveredTab(item.href);
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setHoveredTab(null);
        setIsOpen(false);
      }}
    >
      <Link
        href={localizedHref(item.href)}
        onClick={() => trackEvent('desktop_nav_click', 'navigation', item.labelKey)}
        className={`
          relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap
          ${isActive
            ? 'text-[var(--primary)] bg-[var(--primary)]/15'
            : 'text-[var(--foreground)]/70 hover:text-[var(--foreground)]'
          }
        `}
      >
        {isHovered && (
          <motion.div
            layoutId="nav-pill"
            className="absolute inset-0 rounded-full bg-[var(--card-from-bg)]"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {/* <span className="material-symbols text-[18px]">{item.icon}</span> */}
          {t(item.labelKey)}
          {item.children && <span className="material-symbols text-[14px]" aria-hidden="true">expand_more</span>}
        </span>
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {item.children && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 rounded-2xl border shadow-xl backdrop-blur-xl overflow-hidden
              ${theme === 'colorful'
                ? 'bg-[var(--background)]/90 border-[var(--card-border)]'
                : theme === 'light'
                  ? 'bg-white/90 border-ds-gray-200'
                  : 'bg-ds-gray-900/90 border-ds-gray-700'
              }
            `}
          >
            {/* Overview items Ã¢â‚¬â€ no category */}
            {item.children.filter((c) => !c.category).map((child, idx) => (
              <Link
                key={`ov-${idx}`}
                href={localizedHref(child.href)}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  isChildActive(child.href)
                    ? (theme === 'colorful' ? 'bg-[var(--primary)]/15 text-[var(--primary)] font-medium' : theme === 'light' ? 'bg-primary/10 text-accent font-medium' : 'bg-primary/15 text-accent font-medium')
                    : (theme === 'colorful' ? 'text-[var(--foreground)]/70 hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]' : theme === 'light' ? 'text-ds-gray-700 hover:bg-ds-gray-100 hover:text-accent' : 'text-ds-gray-300 hover:bg-ds-gray-800 hover:text-accent')
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${theme === 'colorful' ? 'bg-[var(--card-from-bg)]' : theme === 'light' ? 'bg-ds-gray-100' : 'bg-ds-gray-800'}`}>
                  <span className="material-symbols text-[15px]" aria-hidden="true">{child.icon}</span>
                </div>
                <span className="flex-1 font-medium">{t(child.labelKey)}</span>
              </Link>
            ))}

            {/* Case Studies section */}
            {item.children.some((c) => c.category === 'case-study') && (
              <div className={`mt-1 pt-2 border-t ${theme === 'colorful' ? 'border-[var(--card-border)]' : theme === 'light' ? 'border-ds-gray-100' : 'border-ds-gray-800'}`}>
                <div className="px-2 pb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ds-violet-400">Case Studies</span>
                </div>
                {item.children.filter((c) => c.category === 'case-study').map((child, idx) => (
                  <Link
                    key={`cs-${idx}`}
                    href={localizedHref(child.href)}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      isChildActive(child.href)
                        ? (theme === 'colorful' ? 'bg-ds-violet-500/15 text-ds-violet-300 font-medium' : theme === 'light' ? 'bg-ds-violet-50 text-ds-violet-700 font-medium' : 'bg-ds-violet-900/30 text-ds-violet-300 font-medium')
                        : (theme === 'colorful' ? 'text-[var(--foreground)]/70 hover:bg-ds-violet-900/30 hover:text-ds-violet-300' : theme === 'light' ? 'text-ds-gray-700 hover:bg-ds-violet-50 hover:text-ds-violet-700' : 'text-ds-gray-300 hover:bg-ds-violet-900/20 hover:text-ds-violet-300')
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-ds-violet-500/15">
                      <span className="material-symbols text-[15px] text-ds-violet-400" aria-hidden="true">{child.icon}</span>
                    </div>
                    <span className="flex-1 font-medium">{t(child.labelKey)}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Prototypes section */}
            {item.children.some((c) => c.category === 'prototype') && (
              <div className={`mt-1 pt-2 border-t ${theme === 'colorful' ? 'border-[var(--card-border)]' : theme === 'light' ? 'border-ds-gray-100' : 'border-ds-gray-800'}`}>
                <div className="px-2 pb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ds-cyan-400">Prototypes</span>
                </div>
                {item.children.filter((c) => c.category === 'prototype').map((child, idx) => (
                  <Link
                    key={`pt-${idx}`}
                    href={localizedHref(child.href)}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      isChildActive(child.href)
                        ? (theme === 'colorful' ? 'bg-ds-cyan-500/15 text-ds-cyan-400 font-medium' : theme === 'light' ? 'bg-ds-cyan-400/5 text-ds-cyan-500 font-medium' : 'bg-ds-cyan-500/30 text-ds-cyan-400 font-medium')
                        : (theme === 'colorful' ? 'text-[var(--foreground)]/70 hover:bg-ds-cyan-500/30 hover:text-ds-cyan-400' : theme === 'light' ? 'text-ds-gray-700 hover:bg-ds-cyan-400/5 hover:text-ds-cyan-500' : 'text-ds-gray-300 hover:bg-ds-cyan-500/20 hover:text-ds-cyan-400')
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-ds-cyan-500/15">
                      <span className="material-symbols text-[15px] text-ds-cyan-400" aria-hidden="true">{child.icon}</span>
                    </div>
                    <span className="flex-1 font-medium">{t(child.labelKey)}</span>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Mobile Navigation Component ---

interface MobileNavProps {
  hidden: boolean;
  theme: string;
  t: (key: string) => string;
  localizedHref: (path: string) => string;
  pathname: string;
  isNavItemActive: (item: NavItem) => boolean;
}

const MobileNav = ({ hidden, theme, t, localizedHref, pathname, isNavItemActive }: MobileNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <>
      {/* Bottom Dock */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: 100, opacity: 0 }
        }}
        animate={hidden && !isMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          md:hidden fixed bottom-6 left-4 right-4 z-50 h-16 rounded-2xl border backdrop-blur-xl shadow-lg shadow-black/10 flex items-center justify-between px-2
          ${theme === 'colorful'
            ? 'bg-[var(--background)]/80 border-[var(--card-border)]'
            : theme === 'light'
              ? 'bg-white/80 border-white/50'
              : 'bg-ds-gray-900/80 border-ds-gray-800/50'
          }
        `}
      >
        {/* Main Links */}
        <div className="flex items-center justify-around w-full">
          <MobileDockItem
            href="/"
            icon="home"
            label={t('nav.home')}
            isActive={pathname === localizedHref('/') || pathname === localizedHref('/')}
            theme={theme}
            localizedHref={localizedHref}
          />
          <MobileDockItem
            href="/portfolio"
            icon="work"
            label={t('nav.portfolio')}
            isActive={isNavItemActive({ href: '/portfolio', labelKey: 'nav.portfolio', icon: 'work' })}
            theme={theme}
            localizedHref={localizedHref}
          />

          {/* Center Action Button (Menu) */}
          {/* eslint-disable-next-line design-system/no-raw-html-elements -- custom FAB with round shape, rotation animation, and gradient that doesn't map to DS Button */}
          <button
            onClick={() => { if (isMenuOpen) setExpandedItem(null); setIsMenuOpen(!isMenuOpen); }}
            className={`
              relative -top-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95
              ${isMenuOpen
                ? 'bg-ds-error text-white rotate-90'
                : theme === 'colorful'
                  ? 'bg-gradient-to-br from-primary to-[var(--color-cobalt-700)] text-white'
                  : 'bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white'
              }
            `}
            aria-label="Menu"
          >
            <span className="material-symbols text-2xl" aria-hidden="true">{isMenuOpen ? 'close' : 'grid_view'}</span>
          </button>

          <MobileDockItem
            href="/blog"
            icon="article"
            label={t('nav.blog')}
            isActive={isNavItemActive({ href: '/blog', labelKey: 'nav.blog', icon: 'article' })}
            theme={theme}
            localizedHref={localizedHref}
          />
          <MobileDockItem
            href="/audio"
            icon="audio_file"
            label={t('nav.audio')}
            isActive={isNavItemActive({ href: '/audio', labelKey: 'nav.audio', icon: 'audio_file' })}
            theme={theme}
            localizedHref={localizedHref}
          />
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`
              fixed inset-0 z-40 flex flex-col pt-20 pb-28 px-6 overflow-y-auto
              ${theme === 'colorful' ? 'bg-[var(--background)]/95' : theme === 'light' ? 'bg-white/95' : 'bg-ds-gray-900/95'}
              backdrop-blur-xl
            `}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={`flex items-center mb-5 pb-4 border-b ${theme === 'colorful' ? 'border-[var(--card-border)]' : theme === 'light' ? 'border-ds-gray-100' : 'border-ds-gray-800'}`}>
                <span className={`text-xs font-bold uppercase tracking-widest ${theme === 'colorful' ? 'text-[var(--muted-foreground)]' : theme === 'light' ? 'text-ds-gray-400' : 'text-white/30'}`}>Navigation</span>
              </div>

              {/* Nav List */}
              <div className="flex flex-col gap-0.5">
                {navItems.map((item) => {
                  const itemIsActive = isNavItemActive(item);
                  const isExpanded = expandedItem === item.href;

                  if (item.type === 'dropdown' && item.children) {
                    return (
                      <div key={item.href}>
                        {/* eslint-disable-next-line design-system/no-raw-html-elements -- nav menu item with custom active/theme styles and icon layout */}
                        <button
                          onClick={() => setExpandedItem(isExpanded ? null : item.href)}
                          className={`w-full flex items-center gap-4 px-3 py-3 rounded-2xl transition-all active:scale-[0.98] text-left ${
                            itemIsActive
                              ? (theme === 'colorful' ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : theme === 'light' ? 'bg-primary/10 text-accent' : 'bg-primary/15 text-accent')
                              : (theme === 'colorful' ? 'text-[var(--foreground)]/80 hover:bg-[var(--primary)]/10' : theme === 'light' ? 'text-ds-gray-800 hover:bg-ds-gray-50' : 'text-ds-gray-200 hover:bg-ds-gray-800/50')
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            itemIsActive
                              ? (theme === 'colorful' ? 'bg-[var(--primary)]/20' : theme === 'light' ? 'bg-primary/20' : 'bg-primary/30')
                              : (theme === 'colorful' ? 'bg-[var(--card-from-bg)]' : theme === 'light' ? 'bg-ds-gray-100' : 'bg-ds-gray-800')
                          }`}>
                            <span aria-hidden="true" className={`material-symbols text-xl ${
                              itemIsActive
                                ? (theme === 'colorful' ? 'text-[var(--primary)]' : theme === 'light' ? 'text-accent' : 'text-accent')
                                : (theme === 'colorful' ? 'text-[var(--muted-foreground)]' : theme === 'light' ? 'text-ds-gray-600' : 'text-ds-gray-400')
                            }`}>{item.icon}</span>
                          </div>
                          <span className="flex-1 font-semibold text-[15px]">{t(item.labelKey)}</span>
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            aria-hidden="true"
                            className={`material-symbols text-[18px] shrink-0 ${
                              theme === 'colorful' ? 'text-[var(--muted-foreground)]' : theme === 'light' ? 'text-ds-gray-400' : 'text-white/30'
                            }`}
                          >expand_more</motion.span>
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pt-1 pb-2 pl-4 pr-1 flex flex-col gap-0.5">
                                {item.children.map((child, cidx) => {
                                  const childIsActive = pathname.split('#')[0] === localizedHref(child.href).split('#')[0];
                                  return (
                                    <Link
                                      key={cidx}
                                      href={localizedHref(child.href)}
                                      onClick={() => { setIsMenuOpen(false); setExpandedItem(null); }}
                                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all active:scale-[0.98] ${
                                        childIsActive
                                          ? (theme === 'colorful'
                                            ? (child.category === 'case-study'
                                              ? 'bg-ds-violet-500/15 text-ds-violet-300 font-medium'
                                              : child.category === 'prototype'
                                                ? 'bg-ds-cyan-500/15 text-ds-cyan-400 font-medium'
                                                : 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium')
                                            : child.category === 'case-study'
                                              ? (theme === 'light' ? 'bg-ds-violet-50 text-ds-violet-700 font-medium' : 'bg-ds-violet-900/20 text-ds-violet-300 font-medium')
                                              : child.category === 'prototype'
                                                ? (theme === 'light' ? 'bg-ds-cyan-400/5 text-ds-cyan-500 font-medium' : 'bg-ds-cyan-500/20 text-ds-cyan-400 font-medium')
                                                : (theme === 'light' ? 'bg-primary/10 text-accent font-medium' : 'bg-primary/15 text-accent font-medium'))
                                          : (theme === 'colorful' ? 'text-[var(--foreground)]/70 hover:bg-[var(--primary)]/10' : theme === 'light' ? 'text-ds-gray-700 hover:bg-ds-gray-50' : 'text-ds-gray-300 hover:bg-ds-gray-800/40')
                                      }`}
                                    >
                                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                        child.category === 'case-study' ? 'bg-ds-violet-500/15'
                                        : child.category === 'prototype' ? 'bg-ds-cyan-500/15'
                                        : (theme === 'colorful' ? 'bg-[var(--card-from-bg)]' : theme === 'light' ? 'bg-ds-gray-100' : 'bg-ds-gray-800')
                                      }`}>
                                        <span aria-hidden="true" className={`material-symbols text-[13px] ${
                                          child.category === 'case-study' ? 'text-ds-violet-400'
                                          : child.category === 'prototype' ? 'text-ds-cyan-400'
                                          : (theme === 'colorful' ? 'text-[var(--muted-foreground)]' : theme === 'light' ? 'text-ds-gray-500' : 'text-ds-gray-400')
                                        }`}>{child.icon}</span>
                                      </div>
                                      <span className="flex-1">{t(child.labelKey)}</span>
                                      {child.category === 'case-study' && (
                                        <span className="text-[9px] font-semibold text-ds-violet-400 bg-ds-violet-500/10 border border-ds-violet-500/20 px-1.5 py-0.5 rounded-full shrink-0">Study</span>
                                      )}
                                      {child.category === 'prototype' && (
                                        <span className="text-[9px] font-semibold text-ds-cyan-400 bg-ds-cyan-400/50/10 border border-ds-cyan-500/20 px-1.5 py-0.5 rounded-full shrink-0">Proto</span>
                                      )}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={localizedHref(item.href)}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-4 px-3 py-3 rounded-2xl transition-all active:scale-[0.98] ${
                        itemIsActive
                          ? (theme === 'colorful' ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : theme === 'light' ? 'bg-primary/10 text-accent' : 'bg-primary/15 text-accent')
                          : (theme === 'colorful' ? 'text-[var(--foreground)]/80 hover:bg-[var(--primary)]/10' : theme === 'light' ? 'text-ds-gray-800 hover:bg-ds-gray-50' : 'text-ds-gray-200 hover:bg-ds-gray-800/50')
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        itemIsActive
                          ? (theme === 'colorful' ? 'bg-[var(--primary)]/20' : theme === 'light' ? 'bg-primary/20' : 'bg-primary/30')
                          : (theme === 'colorful' ? 'bg-[var(--card-from-bg)]' : theme === 'light' ? 'bg-ds-gray-100' : 'bg-ds-gray-800')
                      }`}>
                        <span aria-hidden="true" className={`material-symbols text-xl ${
                          itemIsActive
                            ? (theme === 'colorful' ? 'text-[var(--primary)]' : theme === 'light' ? 'text-accent' : 'text-accent')
                            : (theme === 'colorful' ? 'text-[var(--muted-foreground)]' : theme === 'light' ? 'text-ds-gray-600' : 'text-ds-gray-400')
                        }`}>{item.icon}</span>
                      </div>
                      <span className="flex-1 font-semibold text-[15px]">{t(item.labelKey)}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Settings */}
              <div className={`mt-auto pt-4 border-t flex items-center justify-between ${
                theme === 'colorful' ? 'border-[var(--card-border)]' : theme === 'light' ? 'border-ds-gray-100' : 'border-ds-gray-800'
              }`}>
                <LanguageSwitcher />
                <ThemeSwitch />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface MobileDockItemProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
  theme: string;
  localizedHref: (path: string) => string;
}

const MobileDockItem = ({ href, icon, label, isActive, theme, localizedHref }: MobileDockItemProps) => {
  return (
    <Link
      href={localizedHref(href)}
      aria-label={label}
      className={`
        flex flex-col items-center justify-center w-14 h-full gap-1 transition-colors
        ${isActive
          ? (theme === 'colorful' ? 'text-[var(--primary)]' : theme === 'light' ? 'text-accent' : 'text-accent')
          : (theme === 'colorful' ? 'text-[var(--muted-foreground)]' : theme === 'light' ? 'text-ds-gray-500' : 'text-ds-gray-400')
        }
      `}
    >
      <span aria-hidden="true" className={`material-symbols text-2xl transition-transform ${isActive ? '-translate-y-1' : ''}`}>
        {icon}
      </span>
      {/* <span className="text-[10px] font-medium">{label}</span> */}
      {isActive && (
        <motion.div
          layoutId="dock-dot"
          className={`w-1 h-1 rounded-full ${theme === 'colorful' ? 'bg-[var(--primary)]' : theme === 'light' ? 'bg-accent' : 'bg-accent'}`}
        />
      )}
    </Link>
  );
};

export default Navigation;
