'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useCallback, Suspense } from 'react';
import Navigation from '@/components/Navigation';

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
      { label: 'Colors',     section: 'colors',     icon: 'palette' },
      { label: 'Typography', section: 'typography',  icon: 'text_fields' },
      { label: 'Spacing',    section: 'spacing',     icon: 'space_bar' },
      { label: 'Radius',     section: 'radius',      icon: 'rounded_corner' },
      { label: 'Shadows',    section: 'shadows',     icon: 'layers' },
      { label: 'Motion',     section: 'motion',      icon: 'animation' },
    ],
  },
  {
    title: 'Components',
    items: [
      { label: 'Cards',      section: 'cards',       icon: 'dashboard' },
      { label: 'Quotes',     section: 'quotes',      icon: 'format_quote' },
      { label: 'Icons',      section: 'icons',        icon: 'emoji_symbols' },
      { label: 'Animations', section: 'animations',   icon: 'motion_photos_auto' },
    ],
  },
  {
    title: 'Registry',
    items: [
      { label: 'Primitives',    section: 'primitives', icon: 'widgets' },
      { label: 'Composite',     section: 'composite',  icon: 'view_module' },
      { label: 'Section-Level', section: 'section',    icon: 'view_agenda' },
      { label: 'Accessibility', section: 'a11y',       icon: 'accessibility_new' },
      { label: 'Layout',        section: 'layout',     icon: 'grid_view' },
    ],
  },
  {
    title: 'Pages',
    items: [
      { label: 'Timeline Cards', href: '/design/timeline-cards', icon: 'view_timeline' },
      { label: 'Media Cards',    href: '/design/media-cards',    icon: 'perm_media' },
    ],
  },
  {
    title: 'Governance',
    items: [
      { label: 'Conventions',   section: 'conventions',   icon: 'gavel' },
      { label: 'Contributing',  section: 'contributing',  icon: 'handshake' },
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

  const isActiveLink = useCallback(
    (item: NavItem) => {
      if (item.href) return pathname === item.href;
      if (item.section) return pathname === '/design' && activeSection === item.section;
      return false;
    },
    [pathname, activeSection],
  );

  const handleNavClick = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Site navigation */}
      <Navigation />

      {/* Mobile header */}
      <div className="lg:hidden shrink-0 flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-[var(--background)]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols text-xl">{sidebarOpen ? 'close' : 'menu'}</span>
        </button>
        <h1 className="font-heading text-lg font-bold" style={{ textShadow: 'none' }}>
          Design System
        </h1>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar — fixed height, independent scroll */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-200 ease-out
            lg:relative lg:translate-x-0 lg:z-auto lg:shrink-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            flex flex-col border-r border-gray-200 dark:border-gray-800
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
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800 opacity-70 hover:opacity-100'
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
          <div className="shrink-0 px-5 py-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-[10px] opacity-30">
              Tokens defined in <code>design-system/tokens.css</code>
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
