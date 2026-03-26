/**
 * Design System Tokens — typed JS mirror of tokens.css
 *
 * Use these when you need token values in JS/TS (e.g. Framer Motion,
 * canvas drawing, inline styles). For CSS / Tailwind, use the
 * CSS custom properties from tokens.css directly.
 *
 * The runtime values resolve against the current theme because they
 * reference `var(--…)` — except for the palette, which contains
 * raw hex values for contexts that can't read CSS variables
 * (canvas, SVG fills computed in JS, etc.).
 */

// ─── Color Palette (raw hex) ────────────────────────────────

export const palette = {
  blue: {
    50:  '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1e40af',
    800: '#1e3a8a',
    900: '#1e2756',
  },
  purple: {
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6d28d9',
  },
  indigo: {
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
  },
  pink: {
    400: '#f472b6',
    500: '#ec4899',
  },
  fuchsia: {
    400: '#e879f9',
    500: '#d946ef',
  },
  cyan: {
    400: '#22d3ee',
    500: '#06b6d4',
    pure: '#00ffff',
  },
  magenta: {
    DEFAULT: '#ff00cc',
    dark:    '#d100ff',
  },
  gray: {
    50:  '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#0a0a0a',
  },
  white: '#ffffff',
  black: '#000000',
  violet: {
    500: '#8b5cf6',
  },
  yellow: { 500: '#eab308' },
  orange: { 500: '#ff9500' },
  colorfulBg: '#050023',
} as const;

// ─── Semantic CSS-variable references ───────────────────────
// Use these strings in inline `style` props — they resolve at runtime.

export const semantic = {
  background:       'var(--background)',
  foreground:       'var(--foreground)',
  primary:          'var(--primary)',
  primaryHover:     'var(--primary-hover)',
  primaryGlow:      'var(--primary-glow)',
  gradientStart:    'var(--gradient-start)',
  gradientMid:      'var(--gradient-mid)',
  gradientEnd:      'var(--gradient-end)',
  cardFromBg:       'var(--card-from-bg)',
  cardToBg:         'var(--card-to-bg)',
  cardBorder:       'var(--card-border)',
  cardBorderHover:  'var(--card-border-hover)',
  cardShadow:       'var(--card-shadow-color)',
  navBg:            'var(--nav-bg)',
  navBorder:        'var(--nav-border)',
  scrollbarThumb:   'var(--scrollbar-thumb)',
  scrollbarHover:   'var(--scrollbar-thumb-hover)',
} as const;

// ─── Typography ─────────────────────────────────────────────

export const fontFamily = {
  poppins:  'var(--font-poppins)',
  roboto:   'var(--font-roboto)',
  tajawal:  'var(--font-tajawal)',
} as const;

export const fontSize = {
  xs:   '0.75rem',
  sm:   '0.875rem',
  base: '1rem',
  lg:   '1.125rem',
  xl:   '1.25rem',
  '2xl':'1.5rem',
  '3xl':'1.875rem',
  '4xl':'2.25rem',
  '5xl':'3rem',
} as const;

// ─── Spacing ────────────────────────────────────────────────

export const space = {
  0:  '0',
  1:  '0.25rem',
  2:  '0.5rem',
  3:  '0.75rem',
  4:  '1rem',
  5:  '1.25rem',
  6:  '1.5rem',
  8:  '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

// ─── Radius ─────────────────────────────────────────────────

export const radius = {
  sm:   '0.375rem',
  md:   '0.5rem',
  lg:   '0.75rem',
  xl:   '1rem',
  '2xl':'1.25rem',
  '3xl':'2rem',
  full: '9999px',
} as const;

// ─── Shadows ────────────────────────────────────────────────

export const shadow = {
  sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
  xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
  glowSm:     '0 0 10px rgba(59,130,246,0.3)',
  glow:       '0 0 20px rgba(59,130,246,0.4)',
  glowLg:     '0 0 30px rgba(59,130,246,0.5)',
  glowPurple: '0 0 20px rgba(168,85,247,0.4)',
  glowPink:   '0 0 20px rgba(255,0,204,0.4)',
  glowCyan:   '0 0 20px rgba(0,255,255,0.4)',
} as const;

// ─── Motion ─────────────────────────────────────────────────

export const duration = {
  instant: '100ms',
  fast:    '150ms',
  normal:  '300ms',
  slow:    '500ms',
  slower:  '600ms',
  glacial: '1000ms',
} as const;

/** Numeric seconds — use with Framer Motion `transition.duration` */
export const durationSeconds = {
  instant: 0.1,
  fast:    0.15,
  brisk:   0.2,
  normal:  0.3,
  ease:    0.4,
  slow:    0.5,
  slower:  0.6,
  dramatic:0.8,
  glacial: 1,
  ultra:   1.5,
  cinematic: 2,
  ambient: 4,
} as const;

/** Standard delay values (seconds) for Framer Motion */
export const delaySeconds = {
  none:  0,
  xs:    0.1,
  sm:    0.15,
  md:    0.2,
  lg:    0.3,
  xl:    0.4,
  '2xl': 0.5,
  '3xl': 0.6,
  '4xl': 0.8,
  '5xl': 1,
} as const;

/** Stagger multipliers for staggered list animations (seconds per item) */
export const stagger = {
  fast:   0.06,
  normal: 0.08,
  slow:   0.1,
  relaxed:0.12,
  lazy:   0.15,
  dramatic: 0.2,
} as const;

/** Easing curves as CSS and as Framer Motion tuples */
export const easing = {
  out:      { css: 'cubic-bezier(0.22,1,0.36,1)',   array: [0.22, 1, 0.36, 1] as const },
  standard: { css: 'cubic-bezier(0.4,0,0.2,1)',     array: [0.4, 0, 0.2, 1]   as const },
  gentle:   { css: 'cubic-bezier(0.16,1,0.3,1)',    array: [0.16, 1, 0.3, 1]  as const },
} as const;

// ─── Framer Motion Transition Presets ───────────────────────
// Drop-in `transition` objects for the most common animation patterns.

/** Fade/slide in — standard page content entrance */
export const transition = {
  /** duration: 0.6s, ease-out — hero text, section entrances */
  enterSlow: { duration: durationSeconds.slower, ease: easing.out.array },
  /** duration: 0.5s, ease-out — cards, blocks */
  enter:     { duration: durationSeconds.slow,   ease: easing.out.array },
  /** duration: 0.3s, standard — toggles, small UI */
  snap:      { duration: durationSeconds.normal, ease: easing.standard.array },
  /** duration: 0.2s — micro-interactions, hover feedback */
  micro:     { duration: durationSeconds.brisk },
  /** spring — bouncy interactive elements */
  spring:    { type: 'spring' as const, stiffness: 400, damping: 30 },
  /** spring — softer, modal/sheet reveals */
  springGentle: { type: 'spring' as const, stiffness: 300, damping: 30 },
} as const;

// ─── Z-Index ────────────────────────────────────────────────

export const zIndex = {
  behind:   -1,
  base:      0,
  content:   1,
  elevated: 10,
  overlay:  20,
  dropdown: 30,
  modal:    40,
  tooltip:  50,
} as const;
