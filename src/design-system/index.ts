/**
 * Design System — public API
 *
 * Import from '@/design-system' to access typed tokens.
 * CSS custom properties are loaded via tokens.css (imported in globals.css).
 */

export {
  palette,
  semantic,
  fontFamily,
  fontSize,
  space,
  radius,
  shadow,
  duration,
  durationSeconds,
  delaySeconds,
  stagger,
  easing,
  transition,
  zIndex,
} from './tokens';

export {
  componentRegistry,
  getComponent,
  getByCategory,
} from './components';

export type { ComponentEntry, ComponentProp } from './components';

// ── Actions & Inputs ──────────────────────────────────────────────────────
export { default as Button }   from '@/components/ui/Button';
export { default as Input }    from '@/components/ui/Input';
export { default as Select }   from '@/components/ui/Select';
export { default as Toggle }   from '@/components/ui/Toggle';
export type { SelectOption }   from '@/components/ui/Select';

// ── Overlays ──────────────────────────────────────────────────────────────
export { default as Modal }    from '@/components/ui/Modal';
export { default as Tooltip }  from '@/components/ui/Tooltip';

// ── Feedback & Status ─────────────────────────────────────────────────────
export { default as Alert }    from '@/components/ui/Alert';
export { default as Badge }    from '@/components/ui/Badge';
export { default as Skeleton } from '@/components/ui/Skeleton';

// ── Navigation ────────────────────────────────────────────────────────────
export { default as Tabs }     from '@/components/ui/Tabs';
export type { TabItem }        from '@/components/ui/Tabs';

// ── Media & Identity ──────────────────────────────────────────────────────
export { default as Avatar }   from '@/components/ui/Avatar';
export { default as Icon }     from '@/components/ui/Icon';

// ── Typography ────────────────────────────────────────────────────────────
export { default as Text }     from '@/components/ui/Text';
export type { TextVariant }    from '@/components/ui/Text';

// ── Cards ─────────────────────────────────────────────────────────────────
// Surface (structural shells)
//   Card         — DS base shell: elevation="flat|raised|floating"
//   SurfaceCard  — generic motion wrapper with variant-tinted glow/shadow
//   CardContent  — icon + title + meta layout slot
export { default as Card }     from '@/components/ui/Card';
export type { CardElevation, CardGlow } from '@/components/ui/Card';
export {
  SurfaceCard,
  CardContent,
  // Timeline
  //   TimelineCard — animated experience/education entry card with particles
  TimelineCard,
  // Media
  //   MediaCard         — image-first card: variant="basic|overlay|horizontal"
  //   MediaCardsShowcase — dev showcase of all MediaCard variants
  MediaCard,
  MediaCardsShowcase,
  // Blog
  //   BlogCard — article card: viewMode="standard|overlay|featured"
  BlogCard,
  // Portfolio
  //   PortfolioCard — project card with localized content, status badge, tags
  PortfolioCard,
  // Audio
  //   AudioCard — podcast/audio card: variant="grid|list"
  AudioCard,
} from '@/components/ui/cards';
