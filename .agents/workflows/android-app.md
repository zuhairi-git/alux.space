---
description: How to build and develop the Android mobile app prototype for the Collaboration Workflow Platform
---

# Android Mobile App — Collaboration Workflow Platform

## Overview

Build the Android-specific prototype of the Collaboration Workflow Platform as a Next.js page at `/mobile/android`. This draws from the collaboration portfolio and the Market Intelligence mobile plan in `mobile.md`.

---

## 1. Project Setup

1. Create the route at `src/app/mobile/android/page.tsx` and `src/app/mobile/android/layout.tsx`
2. Reuse the existing mobile layout shell from `src/app/mobile/layout.tsx` (device frame simulation)
3. URL: `/mobile/android` — renders at 390×844 on desktop, full-screen on mobile

---

## 2. Design System — Material You (Android 16)

Apply these Android-native patterns:

- **Dynamic color** — Use Material You color tokens (`#6750A4`, `#D0BCFF`, `#E8DEF8`, `#4A4458`, etc.)
- **Rounded containers** — `rounded-[28px]` for cards, `rounded-[24px]` for input fields
- **Edge-to-edge layouts** — Content extends behind status/nav bars
- **Bottom navigation** — Material 3 pill-indicator bottom nav (active state: pill background)
- **Modal bottom sheets** — `rounded-t-[28px]` sheets with handle bar
- **Predictive back nav** — Swipe-to-go-back animation with scale-down
- **Typography** — Use Google Fonts (Outfit or Roboto), with Material type scale
- **Elevation** — Subtle shadows via `shadow-sm`, `shadow-lg`, glassmorphism-lite backgrounds

---

## 3. Screen Architecture (5 Tabs)

### Tab 1: Dashboard
- Greeting header with user avatar
- AI Morning Briefing card (AI-generated collaboration summary)
- Team Activity feed (live collaboration items)
- Quick Actions grid (2×2: New Doc, Join Room, Schedule, Analytics)

### Tab 2: Workspaces
- Workspace list with search/filter
- Cards showing: workspace name, members count, last activity, status badge
- Sector/category heatmap showing workspace activity levels
- Trending workspaces carousel

### Tab 3: Copilot (AI Assistant)
- Conversational AI chat interface
- Suggested prompts grid (2×2)
- Streaming response with character-by-character render
- Source citations with verified badges
- Follow-up question capability

### Tab 4: Notifications
- Priority-based alert cards (critical/warning/info)
- Expandable alert details
- "Ask AI about this" action buttons
- Time-based grouping

### Tab 5: Profile / Settings
- User profile card with avatar
- Collaboration stats (documents created, hours collaborated)
- Sentiment/activity donut chart
- Theme switcher modal (Light, Dark, Colorful)

---

## 4. Key Components to Build

```
AndroidApp/
├── AndroidDashboard      — Tab 1 with briefing card + activity feed
├── AndroidWorkspaces     — Tab 2 workspace list + heatmap
├── AndroidCopilot        — Tab 3 AI chat with streaming
├── AndroidNotifications  — Tab 4 prioritized alerts
├── AndroidProfile        — Tab 5 user settings + stats
├── AndroidBottomNav      — Material 3 bottom navigation
└── AndroidHeader         — Top bar with avatar + AI button
```

---

## 5. Animations & Interactions

- **Framer Motion** for all transitions
- Staggered card reveals (`staggerChildren: 0.06`)
- Spring-based transitions (`stiffness: 400, damping: 30`)
- `active:scale-95` tap feedback on all interactive items
- Bottom sheet slide-up with spring physics
- `AnimatePresence mode="wait"` for tab switching
- Progress bar animations with easing

---

## 6. Theme Support

Support 3 themes via URL param `?theme=dark|light|colorful`:

| Theme    | Background       | Cards                | Accent         |
|----------|-----------------|---------------------|----------------|
| Dark     | `#111114`       | `#2B2930` glass     | `#D0BCFF`      |
| Light    | `#FAF8FC`       | `#FEF7FF` glass     | `#6750A4`      |
| Colorful | `#050023`       | Gradient glass      | `#D0BCFF`      |

---

## 7. Data Sources (Mock)

Use realistic static data:
- Team members with roles and avatars
- Workspace items with collaboration metrics
- AI responses with source citations
- Notification items with priority levels
- User activity stats

---

## 8. Accessibility

- Minimum touch target: 48×48dp
- Color contrast: WCAG 2.2 AA
- Semantic HTML elements
- `aria-label` on all icon-only buttons
- Reduced motion support via `prefers-reduced-motion`

---

## 9. Testing & Verification

// turbo
1. Run `npm run dev` and navigate to `http://localhost:3000/mobile/android`
2. Test all 5 tabs render correctly
3. Test theme switching (light/dark/colorful)
4. Test AI copilot message sending and streaming
5. Test responsive layout in browser DevTools mobile emulation
6. Test bottom sheet interactions
7. Verify no console errors
