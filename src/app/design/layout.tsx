'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback, Suspense } from 'react';
import ThemeSwitch from '@/components/ThemeSwitch';

/* ── Sidebar nav structure ──────────────────────────────── */

interface NavItem {
  label: string;
  /** For hash sections on /design: just the key, e.g. 'colors'. For pages: full path. */
  section?: string;
  href?: string;
  icon: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const sidebarNav: NavGroup[] = [
  {
    title: 'Foundations',
    items: [
      { label: 'Backgrounds', section: 'backgrounds', icon: 'wallpaper' },
      { label: 'Colors',      section: 'colors',      icon: 'palette' },
      { label: 'Gradients',   section: 'gradients',   icon: 'gradient' },
      { label: 'Motion',      section: 'motion',      icon: 'animation' },
      { label: 'Radius',      section: 'radius',      icon: 'rounded_corner' },
      { label: 'Shadows',     section: 'shadows',     icon: 'layers' },
      { label: 'Spacing',     section: 'spacing',     icon: 'space_bar' },
      { label: 'Typography',  section: 'typography',  icon: 'text_fields' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Alerts',          section: 'alerts',          icon: 'notification_important' },
      { label: 'Animations',      section: 'animations',      icon: 'motion_photos_auto' },
      { label: 'Avatars',         section: 'avatars',         icon: 'account_circle' },
      { label: 'Badges',          section: 'badges',          icon: 'label' },
      { label: 'Breadcrumbs',     section: 'breadcrumbs',     icon: 'more_horiz' },
      { label: 'Buttons',         section: 'buttons',         icon: 'smart_button' },
      { label: 'Chapter Divider', section: 'chapter-divider', icon: 'format_list_numbered' },
      { label: 'Code Snippet',    section: 'code-snippet',    icon: 'code' },
      { label: 'Dividers',        section: 'dividers',        icon: 'horizontal_rule' },
      { label: 'Icons',           section: 'icons',           icon: 'emoji_symbols' },
      { label: 'Inputs',          section: 'inputs',          icon: 'text_fields' },
      { label: 'Modals',          section: 'modals',          icon: 'open_in_new' },
      { label: 'Podcast Player',  section: 'podcast-player',  icon: 'podcasts' },
      { label: 'Progress',        section: 'progress',        icon: 'donut_large' },
      { label: 'Quotes',          section: 'quotes',          icon: 'format_quote' },
      { label: 'Selects',         section: 'selects',         icon: 'arrow_drop_down_circle' },
      { label: 'Skeletons',       section: 'skeletons',       icon: 'hourglass_empty' },
      { label: 'Tabs',            section: 'tabs',            icon: 'tab' },
      { label: 'Text',            section: 'text',            icon: 'title' },
      { label: 'Toggles',         section: 'toggles',         icon: 'toggle_on' },
      { label: 'Tooltips',        section: 'tooltips',        icon: 'info' },
    ],
  },
  {
    title: 'Cards',
    items: [
      { label: 'Content',  section: 'cards-content',   icon: 'apps' },
      { label: 'Media',    section: 'cards-media',     icon: 'perm_media' },
      { label: 'Surface',  section: 'cards-surface',   icon: 'dashboard' },
      { label: 'Timeline', section: 'cards-timeline',  icon: 'view_timeline' },
    ],
  },
  {
    title: 'Registry',
    items: [
      { label: 'Accessibility', section: 'a11y',       icon: 'accessibility_new' },
      { label: 'Composite',     section: 'composite',  icon: 'view_module' },
      { label: 'Layout',        section: 'layout',     icon: 'grid_view' },
      { label: 'Primitives',    section: 'primitives', icon: 'widgets' },
      { label: 'Section-Level', section: 'section',    icon: 'view_agenda' },
    ],
  },
  {
    title: 'Governance',
    items: [
      { label: 'Contributing',  section: 'contributing',  icon: 'handshake' },
      { label: 'Conventions',   section: 'conventions',   icon: 'gavel' },
      { label: 'Lint Rules',    section: 'lint-rules',    icon: 'rule' },
    ],
  },
];

/* ── Inner layout (needs Suspense for useSearchParams) ── */

function DesignLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSection = searchParams.get('s') ?? '';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const normalizedPathname = pathname.replace(/\/$/, '');

  const isActiveLink = useCallback(
    (item: NavItem) => {
      if (item.href) return normalizedPathname.endsWith(item.href.replace(/\/$/, ''));
      if (item.section) return normalizedPathname.endsWith('/design') && activeSection === item.section;
      return false;
    },
    [normalizedPathname, activeSection],
  );

  const handleNavClick = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="h-screen flex flex-col">

      {/* Mobile header */}
      <div className="lg:hidden shrink-0 flex items-center gap-3 px-4 py-3 border-b border-[var(--card-border)] bg-[var(--background)]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-foreground/8 transition-colors"
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols text-xl">{sidebarOpen ? 'close' : 'menu'}</span>
        </button>
        <h1 className="font-heading text-lg font-bold flex-1" style={{ textShadow: 'none' }}>
          Design System
        </h1>
        <Link href="/" className="p-1.5 rounded-lg hover:bg-foreground/8 transition-colors opacity-60 hover:opacity-100" aria-label="Back to site">
          <span className="material-symbols text-xl">home</span>
        </Link>
        <ThemeSwitch />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar — fixed height, independent scroll */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-out
            lg:relative lg:translate-x-0 lg:z-auto lg:shrink-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            flex flex-col border-r border-[var(--card-border)]
            bg-[var(--background)]
          `}
        >
          {/* Desktop header */}
          <div className="hidden lg:block shrink-0 px-5 pt-6 pb-4">
            <Link href="/design" className="block" onClick={handleNavClick}>
              <h1 className="font-heading text-xl font-bold" style={{ textShadow: 'none' }}>
                Design System
              </h1>
              <p className="text-xs opacity-50 mt-1">alux.space tokens &amp; components</p>
            </Link>
          </div>

          {/* Nav groups — scrollable independently */}
          <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-4 lg:py-0 space-y-5">
            {sidebarNav.map((group) => (
              <div key={group.title}>
                <span className="px-2 text-[11px] font-semibold uppercase tracking-wider opacity-40">
                  {group.title}
                </span>
                <ul className="mt-1.5 space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActiveLink(item);
                    const resolvedHref = item.href ?? `/design?s=${item.section}`;
                    return (
                      <li key={item.label}>
                        <Link
                          href={resolvedHref}
                          onClick={handleNavClick}
                          className={`
                            flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors
                            ${active
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-foreground/8 opacity-70 hover:opacity-100'
                            }
                          `}
                        >
                          <span className="material-symbols text-[18px]">{item.icon}</span>
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
            <div className="shrink-0 px-4 py-4 border-t border-[var(--card-border)]">
            <div className="flex items-center justify-between px-2.5">
              <Link
                href="/"
                className="p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-foreground/8 transition-colors"
                aria-label="Back to site"
              >
                <span className="material-symbols text-[20px]">home</span>
              </Link>
              <ThemeSwitch />
            </div>
            <p className="text-[10px] opacity-30 px-2.5 mt-3">
              Tokens in <code>design-system/tokens.css</code>
            </p>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content — scrollable independently */}
        <main className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Layout wrapper (Suspense boundary for searchParams) ── */

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <DesignLayoutInner>{children}</DesignLayoutInner>
    </Suspense>
  );
}
