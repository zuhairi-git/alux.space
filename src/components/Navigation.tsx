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
      { href: '/portfolio/accessibility', labelKey: 'portfolio.cases.accessibility', icon: 'accessibility_new' },
      { href: '/portfolio/collaboration', labelKey: 'portfolio.cases.collaboration', icon: 'groups' },
      { href: '/portfolio/jobseeking', labelKey: 'portfolio.cases.jobseeking', icon: 'work_history' },
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
        backgroundColor: theme === 'colorful' ? 'rgba(5, 0, 35, 0.8)' : theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(17, 24, 39, 0.8)',
        borderColor: theme === 'colorful' ? 'rgba(255, 0, 204, 0.3)' : theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Logo/Avatar */}
      <Link 
        href={localizedHref('/')}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ml-1 mr-2 shadow-md transition-all duration-300
          ${theme === 'colorful' 
            ? 'bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow-fuchsia-500/25' 
            : theme === 'light' 
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/25' 
              : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-blue-400/25'
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
      <div className={`w-px h-6 mx-2 ${theme === 'colorful' ? 'bg-purple-500/30' : theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`} />

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
            ? (theme === 'colorful' ? 'text-fuchsia-400 bg-fuchsia-500/20' : theme === 'light' ? 'text-blue-600 bg-blue-50' : 'text-blue-400 bg-blue-900/20') 
            : (theme === 'colorful' ? 'text-purple-200 hover:text-white' : theme === 'light' ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-gray-100')
          }
        `}
      >
        {isHovered && (
          <motion.div
            layoutId="nav-pill"
            className={`absolute inset-0 rounded-full ${theme === 'colorful' ? 'bg-purple-900/40' : theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {/* <span className="material-symbols text-[18px]">{item.icon}</span> */}
          {t(item.labelKey)}
          {item.children && <span className="material-symbols text-[14px]">expand_more</span>}
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
              absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 p-2 rounded-2xl border shadow-xl backdrop-blur-xl overflow-hidden
              ${theme === 'colorful'
                ? 'bg-[#050023]/90 border-purple-500/30'
                : theme === 'light' 
                  ? 'bg-white/90 border-gray-200' 
                  : 'bg-gray-900/90 border-gray-700'
              }
            `}
          >
            {item.children.map((child: NavItem, idx: number) => (
              <Link
                key={idx}
                href={localizedHref(child.href)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap
                  ${isChildActive(child.href)
                    ? (theme === 'colorful'
                      ? 'bg-fuchsia-500/20 text-fuchsia-400 font-medium'
                      : theme === 'light'
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'bg-blue-900/30 text-blue-400 font-medium')
                    : (theme === 'colorful'
                      ? 'text-purple-200 hover:bg-purple-900/40 hover:text-fuchsia-400'
                      : theme === 'light' 
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-blue-600' 
                        : 'text-gray-300 hover:bg-gray-800 hover:text-blue-400')
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                <span className="material-symbols text-[18px] opacity-70">{child.icon}</span>
                {t(child.labelKey)}
              </Link>
            ))}
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
            ? 'bg-[#050023]/80 border-purple-500/30'
            : theme === 'light' 
              ? 'bg-white/80 border-white/50' 
              : 'bg-gray-900/80 border-gray-800/50'
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
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`
              relative -top-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95
              ${isMenuOpen 
                ? 'bg-red-500 text-white rotate-90' 
                : theme === 'colorful'
                  ? 'bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
              }
            `}
            aria-label="Menu"
          >
            <span className="material-symbols text-2xl">{isMenuOpen ? 'close' : 'grid_view'}</span>
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
              ${theme === 'colorful' ? 'bg-[#050023]/95' : theme === 'light' ? 'bg-white/95' : 'bg-gray-900/95'}
              backdrop-blur-xl
            `}
          >
            <div className="flex flex-col gap-6">
              {/* Menu Header */}
              <div className="text-center mb-4">
                <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Menu
                </h2>
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-2 gap-4">
                {navItems.map((item) => {
                  const itemIsActive = isNavItemActive(item);
                  return (
                    <Link
                      key={item.href}
                      href={localizedHref(item.href)}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                        flex flex-col items-center justify-center p-6 rounded-2xl border transition-all active:scale-95 whitespace-nowrap
                        ${itemIsActive
                          ? (theme === 'colorful'
                            ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300 ring-2 ring-fuchsia-500/30'
                            : theme === 'light'
                              ? 'bg-blue-50 border-blue-300 text-blue-800 ring-2 ring-blue-200'
                              : 'bg-blue-900/30 border-blue-600/50 text-blue-300 ring-2 ring-blue-600/30')
                          : (theme === 'colorful'
                            ? 'bg-purple-900/20 border-purple-500/30 text-purple-100'
                            : theme === 'light' 
                              ? 'bg-gray-50 border-gray-200 text-gray-800' 
                              : 'bg-gray-800/50 border-gray-700 text-gray-200')
                        }
                      `}
                    >
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center mb-3 text-2xl
                        ${itemIsActive
                          ? (theme === 'colorful'
                            ? 'bg-fuchsia-500/30 text-fuchsia-400'
                            : theme === 'light' ? 'bg-blue-100 shadow-sm text-blue-600' : 'bg-blue-800/50 text-blue-400')
                          : (theme === 'colorful'
                            ? 'bg-purple-800/50 text-fuchsia-400'
                            : theme === 'light' ? 'bg-white shadow-sm text-blue-600' : 'bg-gray-700 text-blue-400')
                        }
                      `}>
                        <span className="material-symbols">{item.icon}</span>
                      </div>
                      <span className={`font-medium ${itemIsActive ? 'font-semibold' : ''}`}>{t(item.labelKey)}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Settings Section */}
              <div className={`
                mt-auto p-4 rounded-2xl border flex items-center justify-between
                ${theme === 'colorful'
                  ? 'bg-purple-900/20 border-purple-500/30'
                  : theme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-gray-800/50 border-gray-700'}
              `}>
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

const MobileDockItem = ({ href, icon, isActive, theme, localizedHref }: MobileDockItemProps) => {
  return (
    <Link
      href={localizedHref(href)}
      className={`
        flex flex-col items-center justify-center w-14 h-full gap-1 transition-colors
        ${isActive 
          ? (theme === 'colorful' ? 'text-fuchsia-400' : theme === 'light' ? 'text-blue-600' : 'text-blue-400') 
          : (theme === 'colorful' ? 'text-purple-300' : theme === 'light' ? 'text-gray-500' : 'text-gray-400')
        }
      `}
    >
      <span className={`material-symbols text-2xl transition-transform ${isActive ? '-translate-y-1' : ''}`}>
        {icon}
      </span>
      {/* <span className="text-[10px] font-medium">{label}</span> */}
      {isActive && (
        <motion.div 
          layoutId="dock-dot"
          className={`w-1 h-1 rounded-full ${theme === 'colorful' ? 'bg-fuchsia-400' : theme === 'light' ? 'bg-blue-600' : 'bg-blue-400'}`}
        />
      )}
    </Link>
  );
};

export default Navigation;
