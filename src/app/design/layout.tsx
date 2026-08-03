import type { Metadata } from 'next';
import DesignShell from './DesignShell';

/**
 * The design-system showcase is an internal reference, not public content —
 * it has no locale prefix and must stay out of search results. Declaring that
 * needs a server component, which is why the interactive sidebar lives in
 * DesignShell.tsx and this file only carries metadata.
 *
 * Caveat: DesignShell calls useSearchParams(), which opts this whole route out
 * of static rendering, and a client-rendered route emits no <head> metadata at
 * all under `output: 'export'` — so the robots directive below never reaches
 * the exported HTML. public/robots.txt disallows /design/ as the actual
 * safeguard. Swapping useSearchParams() for a location.search read would
 * restore metadata here.
 */
export const metadata: Metadata = {
  title: 'Design System',
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return <DesignShell>{children}</DesignShell>;
}
