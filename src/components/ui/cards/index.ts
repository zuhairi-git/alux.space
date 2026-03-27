/**
 * Cards — unified barrel export
 *
 * All card components and their prop types are available from this single
 * entry point.  Import by category:
 *
 *   import { Card, SurfaceCard, CardContent }          from '@/components/ui/cards';
 *   import { TimelineCard }                             from '@/components/ui/cards';
 *   import { MediaCard, MediaCardsShowcase }            from '@/components/ui/cards';
 *   import { BlogCard }                                 from '@/components/ui/cards';
 *   import { PortfolioCard }                            from '@/components/ui/cards';
 *   import { AudioCard }                                from '@/components/ui/cards';
 */

// ── CATEGORY: Surface (structural shells) ─────────────────────────────────
// Card         → DS base shell: elevation="flat|raised|floating"
// SurfaceCard  → generic motion wrapper with variant-tinted glow/shadow
// CardContent  → opinionated icon + title + meta content layout
export { default as Card }        from './Card';
export { default as SurfaceCard } from './SurfaceCard';
export { default as CardContent } from './CardContent';
export type { CardElevation, CardGlow } from './Card';

// ── CATEGORY: Timeline ────────────────────────────────────────────────────
// TimelineCard → animated entry card used in experience/education timelines
export { default as TimelineCard } from './TimelineCard';

// ── CATEGORY: Media ───────────────────────────────────────────────────────
// MediaCard         → image-first card; variant="basic|overlay|horizontal"
// MediaCardsShowcase → dev showcase of all MediaCard variants
export { default as MediaCard }          from './MediaCard';
export { default as MediaCardsShowcase } from './MediaCardsShowcase';

// ── CATEGORY: Blog ────────────────────────────────────────────────────────
// BlogCard → article card; viewMode="standard|overlay|featured"
export { default as BlogCard } from '@/components/blog/BlogCard';

// ── CATEGORY: Portfolio ───────────────────────────────────────────────────
// PortfolioCard → project card with localized title/desc, status badge, tags
export { default as PortfolioCard } from '@/components/portfolio/PortfolioCard';

// ── CATEGORY: Audio ───────────────────────────────────────────────────────
// AudioCard → podcast/audio card; variant="grid|list"
export { default as AudioCard } from '@/components/audio/AudioCard';
