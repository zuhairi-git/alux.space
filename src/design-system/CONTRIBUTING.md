# Contributing to the Design System

Quick-start guide for adding tokens, components, or pages to the alux.space design system.

---

## Setup

```bash
npm install
npm run dev          # Start dev server with Turbopack
npm run lint         # Run ESLint (includes design-system/no-hardcoded-colors)
npm run build        # Production build — must pass before committing
```

---

## Adding a Token

1. **Define** the CSS custom property in `src/design-system/tokens.css`:
   - Palette values go under `:root` in the **Color Palette** section.
   - Theme-dependent values get a default in `:root` plus overrides in `.theme-light`, `.theme-dark`, `.theme-colorful`.

2. **Mirror** in `src/design-system/tokens.ts` if the token needs programmatic access (Framer Motion, canvas, etc.).

3. **Extend Tailwind** in `tailwind.config.js` if the token should generate utility classes (e.g. `bg-*`, `shadow-*`).

4. **Document** by adding a swatch to the relevant section in `src/app/design/page.tsx`.

---

## Adding a Component

1. **Create** the component file under `src/components/` (or appropriate subfolder).

2. **Use tokens** — reference `var(--*)` in CSS/Tailwind, or import from `@/design-system` for JS.

3. **Register** in `src/design-system/components.ts`:
   ```ts
   {
     name: 'MyComponent',
     path: 'src/components/MyComponent.tsx',
     category: 'composite',   // primitive | composite | section | a11y | layout
     props: [{ name: 'variant', type: "'a' | 'b'", default: "'a'", description: '...' }],
     tokens: ['--primary', '--radius-lg'],
     a11y: ['role="button"', 'keyboard navigable'],
     variants: ['a', 'b'],
   }
   ```

4. **Add a demo** in the design system showcase (`src/app/design/page.tsx`) — add a section renderer and wire it into `allSections`.

5. **Add sidebar link** in `src/app/design/layout.tsx` if the component is significant enough to have its own page section.

---

## Adding a Design System Page

For standalone pages (like Timeline Cards or Media Cards):

1. Create `src/app/design/<slug>/page.tsx`.
2. Add a sidebar entry under the **Pages** group in `layout.tsx` with `href: '/design/<slug>'`.
3. The page inherits the sidebar layout automatically.

---

## Governance Rules

### ESLint: `design-system/no-hardcoded-colors`

- **Severity**: `warn` (set to `error` when migration is complete)
- **Scope**: `src/components/**` and `src/app/**`
- **What it flags**: Hex color literals (`#xxx`, `#xxxxxx`, `#xxxxxxxx`)
- **How to fix**: Replace with `var(--token-name)` or import from `@/design-system`
- **Exceptions**: Add `// eslint-disable-next-line design-system/no-hardcoded-colors -- <reason>` for canvas/SVG contexts that can't use `var()`

### Pre-commit

The `precommit` script runs `npm run lint && npm run seo:audit`. Add it to your git hooks or run manually before pushing.

---

## File Map

```
src/design-system/
  tokens.css         ← CSS custom properties (source of truth)
  tokens.ts          ← JS/TS typed mirror
  components.ts      ← Component registry
  index.ts           ← Barrel export
  CONVENTIONS.md     ← Detailed style & governance rules
  CONTRIBUTING.md    ← This file

eslint-rules/
  no-hardcoded-colors.js  ← Custom ESLint rule

src/app/design/
  layout.tsx         ← Sidebar layout
  page.tsx           ← Token & component showcase (single-section view)
  timeline-cards/    ← Standalone demo page
  media-cards/       ← Standalone demo page
```
