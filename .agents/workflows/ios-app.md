---
description: How to build and develop the iOS mobile app prototype for the Collaboration Workflow Platform
---

# iOS Mobile App — Collaboration Workflow Platform

## Overview

Build the iOS-specific prototype of the Collaboration Workflow Platform as a Next.js page at `/mobile/ios`. This draws from the collaboration portfolio and the Market Intelligence mobile plan in `mobile.md`.

---

## 1. Project Setup

1. Create the route at `src/app/mobile/ios/page.tsx` and `src/app/mobile/ios/layout.tsx`
2. Reuse the existing mobile layout shell from `src/app/mobile/layout.tsx` (device frame simulation)
3. URL: `/mobile/ios` — renders at 390×844 on desktop, full-screen on mobile

---

## 2. Design System — iOS 26 / Human Interface Guidelines

Apply these iOS-native patterns:

- **Large title navigation** — Bold section titles that collapse on scroll
- **SF Symbols style** — Use Material Symbols with iOS-appropriate sizing
- **Vibrancy / Blur** — `backdrop-blur-[20px] backdrop-saturate-[180%]` for frosted glass
- **Rounded cards** — `rounded-[24px]` with soft shadows
- **Tab bar** — Native iOS tab bar with tinted active icons
- **Bottom sheets** — Pull-down dismissible sheets with rounded top corners
- **Typography** — SF Pro-like system font, bold tracking-tight headings
- **System colors** — `#007AFF` (blue), `#34C759` (green), `#FF3B30` (red), `#FF9500` (orange)
- **Grouped table view** — iOS Settings-style grouped lists for profile/settings
- **Dynamic Island** — Simulated notch via layout

---

## 3. Screen Architecture (5 Tabs)

### Tab 1: Dashboard
- Welcome greeting with user avatar and status indicator
- AI Collaboration Briefing card (gradient background)
- Team Activity feed with time labels
- Quick Actions grid (2×2: New Doc, Join Room, Schedule, Analytics)

### Tab 2: Workspaces
- Large title "Workspaces" that collapses on scroll
- Search bar at top
- Grouped workspace cards with member avatars
- Activity sparklines for each workspace
- Workspace detail bottom sheet

### Tab 3: Copilot (AI Assistant)
- Full chat interface with user/assistant bubbles
- Gradient user message bubbles (`from-[#007AFF] to-[#5856D6]`)
- Frosted glass assistant bubbles
- Streaming typewriter effect with blinking cursor
- Citation cards with verified source badges
- Suggested prompt pills on empty state

### Tab 4: Notifications
- Grouped by priority (Critical, Warning, Info)
- Expandable alert cards
- Color-coded priority badges
- "Ask AI about this" follow-up action

### Tab 5: My Space (Profile)
- Large profile photo with gradient ring
- Collaboration performance chart (bar chart)
- Activity donut chart
- Settings button → Theme picker modal
- iOS-style grouped settings list

---

## 4. Key Components to Build

```
iOSApp/
├── iOSDashboard        — Tab 1 with AI briefing + activity
├── iOSWorkspaces       — Tab 2 workspace browser
├── iOSCopilot          — Tab 3 AI chat with streaming
├── iOSNotifications    — Tab 4 priority alerts
├── iOSProfile          — Tab 5 user settings + stats
├── iOSTabBar           — Native iOS tab bar
└── iOSHeader           — Navigation bar with avatar
```

---

## 5. Animations & Interactions

- **Framer Motion** for all transitions
- iOS physics-based spring animations (subtle easing curves)
- Staggered reveal for lists (`staggerChildren: 0.06`)
- `active:scale-90` tap feedback (iOS squeeze feel)
- Smooth tab transitions via `AnimatePresence mode="wait"`
- Pull-down sheet dismissal animation
- Live Activity-style pulse animations on badges

---

## 6. Theme Support

Support 3 themes via URL param `?theme=dark|light|colorful`:

| Theme    | Background                              | Cards                        | Accent     |
|----------|-----------------------------------------|------------------------------|------------|
| Dark     | `bg-black`                             | `#1C1C1E` frosted glass     | `#0A84FF`  |
| Light    | `bg-gradient-to-br from-slate-50`      | White frosted glass          | `#007AFF`  |
| Colorful | `#050023`                              | Gradient/neon glass          | `#0A84FF`  |

---

## 7. Data Sources (Mock)

Use realistic static data:
- Team members with roles and avatars
- Workspace items with collaboration metrics
- AI responses with document citations
- Priority-based notifications
- User performance stats

---

## 8. Accessibility

- Minimum touch target: 44×44pt
- VoiceOver-friendly semantic elements
- Dynamic Type support via relative font sizes
- High contrast mode support
- `aria-label` on icon buttons

---

## 9. Testing & Verification

// turbo
1. Run `npm run dev` and navigate to `http://localhost:3000/mobile/ios`
2. Test all 5 tabs render correctly
3. Test theme switching (light/dark/colorful)
4. Test AI copilot message sending and streaming
5. Test responsive layout in browser DevTools (iPhone 14 Pro emulation)
6. Test bottom sheet interactions
7. Verify no console errors
