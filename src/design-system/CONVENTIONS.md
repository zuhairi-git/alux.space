# Design System — Conventions & Governance

> Rules and guidelines for maintaining design-system consistency across alux.space.

---

## 1. Token Usage

### Rule: Always use tokens, never hardcode

| Context | Use | Avoid |
|---------|-----|-------|
| CSS / Tailwind | `var(--primary)`, `bg-primary` | `#3b82f6`, `bg-[#3b82f6]` |
| Inline styles | `var(--space-4)` | `16px` |
| Framer Motion | `tokens.durationSeconds.normal` | `0.3` |
| Canvas / SVG JS | `palette.blue[500]` | `'#3b82f6'` |

### Where tokens live

| File | Purpose |
|------|---------|
| `src/design-system/tokens.css` | Single source of truth — CSS custom properties |
| `src/design-system/tokens.ts` | Typed JS mirror for Framer Motion / canvas / inline styles |
| `src/design-system/components.ts` | Component registry (props, tokens, a11y) |

### Adding a new token

1. Add the CSS custom property to `tokens.css` under the correct category section.
2. If the token is theme-dependent, add it under `:root` (default) **and** each `.theme-*` block.
3. Add the JS mirror to `tokens.ts` if needed for programmatic access.
4. Update `tailwind.config.js` if the token should be available as a Tailwind utility.

### Known exceptions

Some contexts can't resolve `var()` at runtime (e.g. canvas `fillStyle`, SVG computed in JS, Tailwind opacity modifiers). In these cases:

- Use the raw hex from `palette` in `tokens.ts` — never from a magic string.
- Leave a comment: `// palette.blue[500] — can't use var() here`

---

## 2. Color Guidelines

### Semantic first

Use semantic tokens (`--primary`, `--background`, `--card-border`) over palette tokens (`--color-blue-500`). Semantic tokens auto-switch across themes.

### Tonal palette convention

The design system includes Material Design 3-compatible tonal palettes sourced from Figma ("Design System - Ali" → node `1307-2340`). These are **raw, theme-independent** tokens and mirror the vocabulary used in Figma for a shared design ↔ code language:

| Token pattern | Example | Role |
|---------------|---------|------|
| `--palette-primary-{tone}` | `--palette-primary-40` | Violet-purple |
| `--palette-secondary-{tone}` | `--palette-secondary-80` | Muted violet-grey |
| `--palette-tertiary-{tone}` | `--palette-tertiary-70` | Rose-pink |
| `--palette-error-{tone}` | `--palette-error-40` | Red |
| `--palette-neutral-{tone}` | `--palette-neutral-90` | Warm-grey |

Tones available: **0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100**.

Lower tones are darker (0 = black), higher tones are lighter (100 = white). Light-theme on-surface defaults sit at tone **40**; dark-theme on-surface defaults sit at tone **80**.

> These do **not** replace semantic tokens — they are a vocabulary bridge between Figma and code. Semantic tokens (Section 2 of `tokens.css`) continue to drive theming.

### Theme compatibility

Every new color must work across all three themes: **light**, **dark**, **colorful**. Add overrides in each `.theme-*` block in `tokens.css`.

### Hardcoded hex audit

Run the lint rule to find violations:

```bash
npm run lint
```

The custom ESLint rule `no-hardcoded-colors` flags any hex color (`#xxx`, `#xxxxxx`, `#xxxxxxxx`) in `.tsx` and `.ts` files under `src/components/`. Known exceptions (canvas, SVG) should use a `// eslint-disable-next-line` with explanation.

---

## 3. Component Standards

### File structure

```
src/components/
  ui/           ← primitives (Icon, Tooltip, QuoteBlock)
  hero/         ← hero section variants
  portfolio/    ← portfolio page components
  mobile/       ← mobile app mockups
  blog/         ← blog-specific components
  *.tsx         ← shared/section-level components
```

### Naming

- **PascalCase** for component files and exports: `CardContent.tsx` → `export default function CardContent`
- **camelCase** for hooks, utils, config files: `useTheme.ts`, `animations.ts`
- **kebab-case** for route segments: `timeline-cards/page.tsx`

### Required patterns

| Pattern | Rule |
|---------|------|
| `'use client'` | All components using hooks, event handlers, or browser APIs |
| Token consumption | Reference `var(--token)` or import from `@/design-system` |
| Accessibility | Semantic HTML, ARIA attributes where needed, keyboard support |
| Animation | Use `AnimatedSection` or Framer Motion with `tokens.durationSeconds` and `tokens.easing` |

### Registering a new component

When adding a component that is reusable beyond a single page:

1. Add an entry to `src/design-system/components.ts` with `name`, `path`, `category`, `props`, `tokens`, `a11y`, and `variants`.
2. Add a live demo section in the design system showcase page (`src/app/design/page.tsx`).
3. Add a sidebar link in `src/app/design/layout.tsx` if it deserves its own section.

---

## 4. Spacing & Layout

- Use the spacing scale tokens: `--space-1` (4px) through `--space-24` (96px).
- Prefer Tailwind spacing utilities mapped to tokens where possible.
- Use `gap-*` over manual margins for flex/grid layouts.

---

## 5. Typography

- **Headings**: `font-heading` (Poppins)
- **Body**: `font-body` (Roboto)
- **Arabic**: `font-arabic` (Tajawal)
- **Code/mono**: `font-mono`
- Use the font-size scale tokens: `--font-size-xs` through `--font-size-5xl`.

---

## 6. Motion

- Prefer `var(--duration-fast)` / `var(--duration-normal)` / `var(--duration-slow)` over hardcoded ms values.
- Use `var(--ease-out)` / `var(--ease-standard)` / `var(--ease-gentle)` for timing functions.
- In Framer Motion, import from `@/design-system`:
  ```ts
  import { durationSeconds, easing } from '@/design-system';
  ```
- `prefers-reduced-motion` — animations should respect this. `AnimatedSection` handles it automatically.

---

## 7. Theming

### Three themes

| Class | Theme |
|-------|-------|
| `.theme-light` | Light backgrounds, dark text |
| `.theme-dark` | Dark backgrounds, light text |
| `.theme-colorful` | Deep purple/blue gradients, vivid accents |

### Adding theme-aware styles

1. Define the default in `:root` in `tokens.css`.
2. Override in `.theme-light`, `.theme-dark`, `.theme-colorful` blocks.
3. Components should **never** check theme class directly — use CSS custom properties so they resolve automatically.

---

## 8. Pre-commit Checklist

Before committing changes that touch components or tokens:

- [ ] No new hardcoded hex colors (run `npm run lint`)
- [ ] No raw `<button>`, `<input>`, or `<select>` — use DS components
- [ ] New tokens added to both `tokens.css` and `tokens.ts` (if needed)
- [ ] Component works in all 3 themes
- [ ] Component registered in `components.ts` (if reusable)
- [ ] Accessibility: keyboard navigable, screen reader tested
- [ ] Build passes: `npm run build`

---

## 9. Component Usage

### Rule: Always use design-system components

Do **not** use raw HTML interactive elements when a design-system equivalent exists:

| HTML element | DS component | Import |
|-------------|-------------|--------|
| `<button>` | `Button` | `@/components/ui/Button` |
| `<input>` | `Input` | `@/components/ui/Input` |
| `<select>` | `Select` | `@/components/ui/Select` |

### ESLint enforcement

The custom rule `design-system/no-raw-html-elements` flags violations. Run:

```bash
npm run lint
```

### Exceptions

Some cases legitimately need raw elements (e.g. internal toggle thumb, audio `<input type="range">`). Use:

```ts
// eslint-disable-next-line design-system/no-raw-html-elements -- <reason>
```

### Excluded paths

- `src/components/ui/` — the DS component sources themselves
- `src/app/mobile/`, `src/components/mobile/` — prototype mockups
- `src/app/design/` — showcase page
