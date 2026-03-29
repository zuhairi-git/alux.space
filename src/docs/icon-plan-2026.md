# Icon Plan 2026 — alux.space
> A deep-dive audit and forward-looking strategy for icon usage across the portfolio, mobile prototypes, and admin prototype.

---

## 1. Current State Audit

### What the codebase is doing right now

| Source | Library | How used | Files |
|--------|---------|----------|-------|
| **Primary** | Material Symbols Rounded (variable font) | `<span className="material-symbols">name</span>` | ~every TSX file |
| **Secondary** | lucide-react | `<ChevronLeft />` JSX | `src/task/app/presentation/page.tsx` only |
| **Tertiary** | SVG files from `/dt-icons/` | `<Image src="/dt-icons/x.svg" />` | `src/task/app/` subtree |

### Problems found system-wide

#### Problem 1 — Three sources of truth for icons
- **Material Symbols** via font: 95% of the codebase
- **lucide-react**: 1 file, 2 icons (`ChevronLeft`, `ChevronRight`)
- **Local SVG files** in `/public/dt-icons/`: task prototype only

Every time a new person (or AI) adds icons, they may reach for any of these three. This creates bundle bloat, visual inconsistency, and maintenance cost.

#### Problem 2 — Four different `Icon` components exist
```
src/components/ui/Icon.tsx               ← official DS component
src/components/ui/MaterialSymbol.tsx     ← duplicate of Icon.tsx
src/app/page.tsx (line ~114)             ← inline local Icon const
src/app/[locale]/portfolio/workflow/admin/page.tsx (line ~11) ← inline local const
src/app/[locale]/portfolio/.../mobile   ← inline local const (in eslint.json evidence)
```
None of these components pass `aria-hidden` through, none handle fill states, none enforce sizing tokens.

#### Problem 3 — Sizing is inconsistent (16 different size strings)
Audit found: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-[14px]`, `text-[16px]`, `text-[18px]`, `text-[22px]`, `text-[24px]`, `text-[28px]`, `text-[32px]`, `text-[44px]`.

Material Symbols has a built-in optical size axis (`opsz`). At 20px it should render differently than at 48px. None of these raw class usages account for that.

#### Problem 4 — Accessibility is inconsistent
Good examples exist (Breadcrumb, BackToTop, Toggle, ThemeSwitch all properly use `aria-hidden="true"` on decorative icons). Bad examples also exist:
- Admin sidebar nav icons: no `aria-hidden`, no `aria-label` on the wrapping buttons
- Mobile prototype tab bar icons: raw `<span className="material-symbols">` with no ARIA
- Homepage skill-card icons: no `aria-hidden`
- Navigation dropdown icons: no `aria-hidden`

#### Problem 5 — Fill/weight state is ad-hoc
The mobile prototype nav correctly uses `font-variation-fill` for active state. But the admin prototype, navigation, and all components ignore the variable font axes. The design token system has them defined (`--material-symbols-fill: 0`, `--material-symbols-weight: 200`) but no component exposes a prop to change them.

#### Problem 6 — Icons are used where text alone would perform better
Several places use icons to decorate things already described by adjacent text with no cognitive gain:
- The homepage section title for "Work Experience" adds a `work` icon next to the text "Work Experience"
- The homepage section title for "Explore More" adds `psychology` and `explore` icons to text already explaining itself
- `arrow_forward` icon in a "View Portfolio" button where the text is already directional

---

## 2. The 2026 Icon Philosophy

### Core principle: Icons are UI, not decoration

In 2026, the question for every icon is not "does this look cool?" but "what work is this icon doing?"

Icons have exactly two legitimate functions:

```
1. FUNCTIONAL — replaces or reinforces a label where space or speed demands it
   Examples: nav tab bar, toolbar actions, status indicators, input adornments

2. SEMANTIC ACCENT — adds categorical meaning not already expressed in text
   Examples: skill type (palette for design, code for dev), alert severity badges
```

If an icon does neither — it should be removed.

### Icon ≠ Decoration in portfolios

Portfolio work is judged by sophistication. Overloading a page with icons:
- Dilutes the signal of intentional icon use
- Makes the case study feel like a slide deck, not a product
- Competes with the real content hierarchy (photos, metrics, text)

The visual language of 2026 product portfolios (Linear, Vercel, Craft) uses icons **sparingly** — primarily in navigation, action areas, and system-level UI (status, categories). Never decoratively in the narrative body.

---

## 3. Where to Use Icons — by Surface

### 3.1 Portfolio Case Studies (`/portfolio/**`)

**Use icons:**
- ✅ Category/type badges (e.g., `health_and_safety` for healthcare case study in nav)
- ✅ Status indicators (progress, done) — but prefer the dot Badge pattern already in DS
- ✅ Table-of-contents navigation (the tab system in case study pages)
- ✅ Data metric callouts (e.g., `trending_up`, `schedule`) — only when next to a number
- ✅ Tool/tech stack labels when the icon is universally recognized

**Do NOT use icons:**
- ❌ Decorating every section header (the text heading is enough)
- ❌ In body paragraphs or narrative text
- ❌ On the PortfolioCard listing (photos > icons for preview)
- ❌ As page filler / large hero decorative icons at 64-96px

**Specific fixes needed:**
```tsx
// ❌ Current — homepage page.tsx line ~305
<span className="material-symbols text-xl text-[var(--primary)]">auto_awesome</span>
"Digital Dreams & AI Experiments"

// ✅ Fix — the heading is expressive enough; remove the icon
"Digital Dreams & AI Experiments"
```

```tsx
// ❌ Current — section CTAs with redundant icons
<span className="material-symbols text-xl">work</span>  View Work Experience
<span className="material-symbols text-xl">arrow_forward</span> View Full Portfolio

// ✅ Fix — arrow_forward on a directional CTA is fine (adds affordance)
// "work" icon on a "Work Experience" label is redundant — remove it
```

---

### 3.2 Mobile Prototypes (`/portfolio/market-intelligence`, mobile sub-pages)

Mobile prototypes are UI artifacts — they **should** look like real iOS/Android apps. Icons are critical here.

**Use icons:**
- ✅ **Bottom tab bar** — required, follow platform conventions:
  - iOS: outlined icons for inactive, filled for active, 28px
  - Android: outlined icons in rectangular pill for inactive, filled in filled pill for active, 24px
- ✅ **List item leading icons** — for settings rows, menu items (24px)
- ✅ **Action buttons** within the prototype (send, mic, close, expand_more)
- ✅ **Status icons** inside data cards (trending_up, trending_down, info)
- ✅ **Empty states** — a single, centered, large icon (48–64px) with no label competition

**Do NOT use icons:**
- ❌ In the case-study *wrapper* surrounding the prototype (that is portfolio context, not product UI)
- ❌ As decorative section dividers in the case study narrative
- ❌ Mixing icon libraries (all mobile prototype icons must be Material Symbols only, since it faithfully represents both iOS-style and Android Material You)

**Fill axis — critical for mobile prototypes:**
```tsx
// ✅ Current mobile prototype does this correctly:
active ? 'font-variation-fill' : ''

// But the tailwind config needs a proper utility. Add to tailwind.config.js:
'font-variation-fill': { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
'font-variation-outline': { fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }
```

**Size tokens for mobile prototypes:**
```tsx
// iOS bottom nav: 28px icon + 10px label
// Android bottom nav: 24px icon + 12px label  
// List row leading icon: 24px
// FAB icon: 24px
// Input adornment: 20px
// Status chip icon: 16px
```

---

### 3.3 Admin Prototype (`/portfolio/workflow/admin`)

Admin interfaces are the most icon-dense surface by design. Dense data UIs rely on icons to compress information.

**Use icons:**
- ✅ **Sidebar navigation** — icon + label when expanded, icon alone when collapsed (with tooltip)
- ✅ **Header actions** — search, notifications (with badge), profile
- ✅ **Table row actions** — edit, delete, view (icon-only buttons with tooltip, 20px)
- ✅ **KPI cards** — one supporting icon per card (32px), top-left or accented
- ✅ **Status chips** — 16px leading icon (check_circle, warning, error, info)
- ✅ **Empty states** — 48px centered icon
- ✅ **Collapse/expand controls** — chevron_right, expand_more, menu, menu_open

**Do NOT use icons:**
- ❌ Multiple icons per paragraph of content (it becomes noise)
- ❌ Icons on every table column header (reserve for sortable columns: swap_vert)
- ❌ Large decorative icons in card bodies (48px+ outside of empty states)
- ❌ Redundant icons — if a button already says "Delete", the trash icon is redundant unless the button can be icon-only

**Admin-specific icon pattern:**
```tsx
// ✅ Correct — sidebar nav item with full a11y
<button aria-label={section.label} title={sidebarCollapsed ? section.label : undefined}>
  <span className="material-symbols text-[22px]" aria-hidden="true">{section.icon}</span>
  {!sidebarCollapsed && <span>{section.label}</span>}
</button>
```

---

### 3.4 Navigation (`Navigation.tsx`)

The current implementation has `icon: string` on every NavItem but the desktop nav doesn't render them. The mobile dropdown shows them.

**Rules:**
- ✅ Desktop nav: **no icons** — the nav is text-based and visually clean; icons would add weight without clarity
- ✅ Mobile drawer/dropdown: icons allowed (24px) as secondary orientation aids — but only if they add categoric meaning:
  - `home` for home: obvious ✅
  - `article` for blog: clear ✅  
  - `audio_file` for audio: clear ✅
  - `work` for portfolio: slightly generic ⚠️ consider `dashboard`
  - `smart_toy` for prompts: perfect ✅
- ❌ Never show both an icon and a label in the same nav item on desktop — pick one

---

### 3.5 Blog Posts (`/blog/**`)

**Use icons:**
- ✅ Metadata microlabels: `calendar_today` (date), `schedule` (read time) — already correct in BlogCard, keep `aria-hidden="true"`
- ✅ Filter/sort controls: `filter_list`, `grid_view`, `layers` — already done correctly
- ✅ Empty state search: `search_off` at 48px — already done correctly

**Do NOT use icons:**
- ❌ In the body of blog posts (this is an editorial surface)
- ❌ As decorative article heading prefixes

---

### 3.6 Audio Section (`/audio/**`)

**Use icons:**
- ✅ Playback controls: `play_arrow`, `pause`, `skip_next` — critical affordance
- ✅ Action buttons: `share`, `download` — already done, keep
- ✅ Metadata: `star` (rating), `calendar_today` (date)
- ✅ View toggle: `grid_view`, `list`

**Do NOT use icons:**
- ❌ Large decorative waveform/audio icons in headers (use the actual waveform visualization instead)

---

## 4. The Icon Component — What It Should Be in 2026

The current `Icon.tsx` and `MaterialSymbol.tsx` are functionally identical and neither is comprehensive. Both should be replaced by a single consolidated component.

### Recommended Icon component API

```tsx
// src/components/ui/Icon.tsx (replace current)

interface IconProps {
  /** Material Symbols icon name, e.g. "home", "settings" */
  name: string;
  
  /** Semantic size token — maps to px + opsz axis */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  /** Fill axis: 'outline' (default) or 'filled' */
  variant?: 'outline' | 'filled';
  
  /** 
   * Accessibility mode:
   * - 'decorative' (default): aria-hidden="true", no label needed
   * - 'standalone': requires label prop; renders aria-label
   */
  purpose?: 'decorative' | 'standalone';
  
  /** Required when purpose="standalone" */
  label?: string;
  
  className?: string;
}

// Size map: { tailwind size class, opsz value }
const sizeMap = {
  xs:  { cls: 'text-[14px]', opsz: 20 },
  sm:  { cls: 'text-[16px]', opsz: 20 },
  md:  { cls: 'text-[20px]', opsz: 24 },  // ← default
  lg:  { cls: 'text-[24px]', opsz: 24 },
  xl:  { cls: 'text-[32px]', opsz: 40 },
  '2xl': { cls: 'text-[48px]', opsz: 48 },
};
```

### Why opsz matters
Material Symbols variable font has an `opsz` (optical size) axis from 20–48. At small sizes (20), details are simplified for legibility. At large sizes (48), strokes are thinner and more detailed. All current usages set a pixel size but ignore `opsz`, meaning a `text-[48px]` icon renders with the wrong stroke weight. The new component should always set both together.

### Migration path
1. Keep `MaterialSymbol.tsx` as is but mark it `@deprecated`
2. Update `Icon.tsx` to the new API
3. Gradually replace inline `const Icon` patterns with imports from `@/components/ui/Icon`
4. Replace `MaterialSymbol` imports with `Icon`

---

## 5. Accessibility Rules (Non-Negotiable)

### Rule 1 — Every icon must be categorized
```tsx
// Decorative (the surrounding text provides the meaning)
<span className="material-symbols" aria-hidden="true">calendar_today</span>
Published March 2026

// Standalone (the icon IS the communication, no adjacent text)
<button>
  <span className="material-symbols" aria-hidden="true">close</span>
  <span className="sr-only">Close dialog</span>
</button>

// Or use aria-label on the button/link container — never on the span itself
<button aria-label="Close dialog">
  <span className="material-symbols" aria-hidden="true">close</span>
</button>
```

### Rule 2 — Icon-only buttons MUST have accessible names
The admin prototype has several icon-only action buttons without `aria-label`. Every one needs it.

### Rule 3 — Icon fill/weight changes must be handled in CSS, not via class string concatenation
```tsx
// ❌ Current (fragile string concatenation)
className={`material-symbols ${active ? 'font-variation-fill' : ''}`}

// ✅ Better (data attribute drives CSS)
<span 
  className="material-symbols"
  data-fill={active ? '1' : '0'}
  style={{ fontVariationSettings: `'FILL' ${active ? 1 : 0}, 'wght' 300, 'GRAD' 0, 'opsz' 24` }}
>
  {name}
</span>
```

---

## 6. Specific Removal / Reduction List

These are the concrete icons to remove or reconsider, ordered by impact:

| Location | Icon | Why Remove | Action |
|----------|------|-----------|--------|
| `page.tsx` ~L305 | `auto_awesome` next to "Digital Dreams" heading | Decorative | Remove |
| `page.tsx` ~L342 | `psychology` next to "Strengths" heading | Decorative | Remove |
| `page.tsx` ~L365 | `explore` next to "Explore" heading | Redundant with text | Remove |
| `page.tsx` ~L580 | `work` in "View Work Experience" CTA | Redundant with text | Remove |
| `page.tsx` ~L600 | `format_quote` 48px standalone decorative | Decorative only | Remove |
| Admin page sidebar | All icons | Missing `aria-hidden` | Add `aria-hidden="true"` |
| Admin header buttons | search, notifications, profile | Missing `aria-label` | Add `aria-label` to button |
| Mobile prototype tabs | Bottom nav icons | Missing `aria-hidden` on spans | Wrap properly |
| WorkExperienceWizard | `business`, `schedule` next to labeled text fields | Decorative | Remove or `aria-hidden` |
| Navigation dropdown | All nav icons | Missing `aria-hidden` | Add `aria-hidden="true"` |
| `/task/app/presentation` | `ChevronLeft`, `ChevronRight` from lucide-react | Wrong library | Replace with Material Symbols |

---

## 7. What to Keep and Double Down On

| Pattern | Why it works | Where |
|---------|-------------|-------|
| `aria-hidden="true"` on BlogCard metadata icons | Correct, clean | `BlogCard.tsx` |
| `aria-label` + `aria-pressed` on ThemeSwitch | Gold standard | `ThemeSwitch.tsx` |
| `aria-hidden` on Breadcrumb separator | Clean | `Breadcrumb.tsx` |
| `aria-hidden` on BackToTop icon | Clean | `BackToTop.tsx` |
| Material Symbols variable font for mobile prototype active state | Correct platform pattern | Mobile page |
| Icon + sr-only text pattern in `Button.tsx` | Correct | `Button.tsx` L105 |
| Status badge dot pattern (no icon) in `Badge.tsx` | Right call | `Badge.tsx` |
| Icon-free `PortfolioCard` | Lets the image carry the weight | `PortfolioCard.tsx` |

---

## 8. Icon Library Policy — Final Decision

```
PRIMARY LIBRARY:    Material Symbols Rounded (variable font, already in DS)
                    → All UI icons, navigation, prototypes

SECONDARY LIBRARY:  None

SVG EXCEPTIONS:     Only for brand logos (LinkedIn, GitHub) where
                    the brand mark is not replicable by an icon font
                    → Footer SVGs are correct and should stay

lucide-react:       To be removed. Replace the 2 usages in /task/ 
                    with Material Symbols equivalents:
                    ChevronLeft → chevron_left
                    ChevronRight → chevron_right
                    Then remove from package.json.

dt-icons SVGs:      Keep for task prototype (/task/app) only — they
                    are referenced as static assets and the prototype
                    is self-contained. Do not expand this pattern.
```

---

## 9. Token Additions Needed

Add to `tokens.css` or `tailwind.config.js`:

```css
/* Icon size + opsz pairs — add to :root */
--icon-size-xs:  14px;  --icon-opsz-xs:  20;
--icon-size-sm:  16px;  --icon-opsz-sm:  20;
--icon-size-md:  20px;  --icon-opsz-md:  24;
--icon-size-lg:  24px;  --icon-opsz-lg:  24;
--icon-size-xl:  32px;  --icon-opsz-xl:  40;
--icon-size-2xl: 48px;  --icon-opsz-2xl: 48;
```

```js
// tailwind.config.js additions
fontVariationSettings: {
  'icon-xs':   "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
  'icon-sm':   "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 20",
  'icon-md':   "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
  'icon-lg':   "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
  'icon-xl':   "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 40",
  'icon-2xl':  "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48",
  'icon-filled-md': "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
  'icon-filled-lg': "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
}
```

---

## 10. Quick-Reference Decision Tree

```
Am I adding an icon?
│
├─ Is there adjacent text that already communicates the same meaning?
│   ├─ YES → Do NOT add the icon. The text is enough.
│   └─ NO  → Continue ↓
│
├─ Is this a navigation element, action button, or status indicator?
│   ├─ YES → Icon is appropriate. Size: md (20px) to lg (24px).
│   └─ NO  → Continue ↓
│
├─ Is this for a prototype UI (mobile/admin)?
│   ├─ YES → Icons are expected. Follow platform conventions.
│   └─ NO  → Continue ↓
│
├─ Does the icon add categorical meaning not in the text?
│   ├─ YES → Icon is appropriate. Keep it small (sm–md). Add aria-hidden.
│   └─ NO  → Do NOT add the icon.
│
Does the icon need to stand alone (no label)?
│   ├─ YES → It MUST have an accessible name on its container.
│   └─ NO  → Add aria-hidden="true" to the <span>.
```

---

## 11. Summary — Priority Actions

### P0 — Do Now (Correctness/Accessibility)
1. Add `aria-hidden="true"` to all icon spans in admin sidebar nav
2. Add `aria-label` to all icon-only action buttons in admin prototype
3. Add `aria-hidden="true"` to all icon spans in Navigation dropdown items

### P1 — Do Soon (Cleanup/Quality)
4. Delete `MaterialSymbol.tsx` (duplicates `Icon.tsx`)
5. Replace `lucide-react` usages with Material Symbols and remove from `package.json`
6. Remove the three inline `const Icon` definitions in page files; import from `@/components/ui/Icon`
7. Update `Icon.tsx` to include `aria-hidden`, `purpose`, and `size` props

### P2 — Do This Sprint (Polish)
8. Remove decorative section-header icons from homepage (listed in Section 6)
9. Add `opsz` font-variation-settings to icon token system
10. Add `icon-filled-*` Tailwind font variation utilities for active states in mobile/admin

### P3 — Backlog (Nice to Have)
11. Audit all case study pages for icon overuse in body content
12. Document icon usage in `CONTRIBUTING.md` / design system docs
13. Consider a lint rule (`no-raw-icon-spans`) analogous to `no-raw-html-elements`
