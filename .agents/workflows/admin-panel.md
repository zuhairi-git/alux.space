---
description: How to build and develop the Admin Panel / Portal for the Collaboration Workflow Platform
---

# Admin Panel / Portal — Collaboration Workflow Platform

## Overview

Build a full-featured admin panel/portal as a Next.js page at `/admin`. This is the web-based management interface for the Collaboration Workflow Platform, providing team management, analytics, content moderation, and platform configuration.

---

## 1. Project Setup

1. Create the route at `src/app/admin/page.tsx` and `src/app/admin/layout.tsx`
2. The admin panel is a **desktop-first** design (min-width: 1024px) with responsive fallback
3. URL: `/admin` — full-width desktop layout with collapsible sidebar

---

## 2. Design System — Enterprise Admin

- **Sidebar navigation** — Collapsible left sidebar with icon-only mode
- **Dark mode first** — Deep dark background (`#0A0A0F`) with card surfaces (`#12121A`)
- **Premium glassmorphism** — Frosted glass cards with subtle borders
- **Data-rich tables** — Sortable, filterable data tables
- **Chart visualizations** — Animated SVG charts and donut graphs
- **Color palette** — Purple primary (`#7C3AED` → `#A78BFA`), emerald for success, rose for errors
- **Typography** — Inter or Outfit from Google Fonts, clean readable hierarchy
- **Spacing** — Generous padding (24-32px), clear visual hierarchy

---

## 3. Page Architecture

### 3.1 Sidebar Navigation

```
📊 Dashboard     — Platform overview + KPIs
👥 Users         — User management + roles
🏢 Workspaces    — Workspace administration
💬 Copilot Logs  — AI conversation monitoring
🔔 Alerts Config — Alert rules management
📈 Analytics     — Usage analytics + reports
⚙️ Settings      — Platform configuration
```

### 3.2 Dashboard (Default View)

**Top KPI Cards Row (4 cards):**
- Total Users (with trend %)
- Active Workspaces (with trend %)
- AI Queries Today (with trend %)
- Platform Uptime (with status dot)

**Main Content Grid:**
- **User Activity Chart** — Time-series line chart (last 30 days)
- **Workspace Heatmap** — Activity grid showing busy hours
- **AI Copilot Usage** — Donut chart (queries by category)
- **Recent Activity Feed** — Real-time log of platform actions

### 3.3 Users Management

- Searchable, sortable user table
- Columns: Avatar, Name, Email, Role, Status, Last Active, Actions
- Role badges: Admin (purple), Editor (blue), Viewer (gray)
- Bulk actions: Activate, Deactivate, Change Role
- User detail side panel (slide-out)

### 3.4 Workspace Administration

- Workspace grid/list toggle view
- Cards showing: name, member count, document count, AI queries, status
- Create workspace modal
- Workspace settings panel

### 3.5 Copilot Logs

- AI conversation log viewer
- Filters: date range, user, category, confidence score
- Expandable conversation threads
- Citation verification status
- Flagged responses highlight

### 3.6 Alert Configuration

- Alert rule builder
- Trigger types: activity threshold, system health, content flag
- Notification channels: email, push, webhook
- Alert history log with status

### 3.7 Analytics

- Date range picker
- User engagement metrics
- Workspace collaboration metrics
- AI usage analytics (queries, response time, satisfaction)
- Export to CSV button

### 3.8 Settings

- Platform name and branding
- Authentication providers toggle
- Feature flags
- API key management
- Backup and data export

---

## 4. Key Components to Build

```
AdminPanel/
├── AdminSidebar          — Collapsible nav with icons
├── AdminHeader           — Top bar with search, notifications, profile
├── DashboardView         — KPI cards + charts
├── UsersView             — User management table
├── WorkspacesView        — Workspace administration
├── CopilotLogsView       — AI conversation viewer
├── AlertsConfigView      — Alert rule management
├── AnalyticsView         — Usage analytics + charts
├── SettingsView          — Platform configuration
├── DataTable             — Reusable sortable/filterable table
├── KPICard               — Metric card with trend indicator
├── ChartCard             — Container for SVG charts
└── SlidePanel            — Right-side detail panel
```

---

## 5. Charts & Visualizations (Pure SVG)

Build custom SVG chart components:
- **Line Chart** — Time-series with gradient fill
- **Bar Chart** — Vertical bars with labels
- **Donut Chart** — Segmented ring with center label
- **Heatmap** — Grid of colored cells
- **Sparkline** — Inline mini chart for table rows

All charts animated with Framer Motion on mount.

---

## 6. Animations & Interactions

- Sidebar collapse/expand with smooth width transition
- Card hover effects (`hover:scale-[1.02]`, shadow increase)
- Staggered card reveals on page load
- Smooth tab/page transitions
- Table row hover highlighting
- Slide panel entrance from right
- Modal fade + scale entrance
- Loading skeletons for async data

---

## 7. Theme Support

Support 3 themes synced with the main site:

| Theme    | Background   | Sidebar         | Cards              | Accent       |
|----------|-------------|----------------|--------------------|-------------|
| Dark     | `#0A0A0F`   | `#12121A`      | `#1A1A24` glass    | `#A78BFA`   |
| Light    | `#F8F9FA`   | White          | White + shadow     | `#7C3AED`   |
| Colorful | `#050023`   | Gradient dark  | Neon glass         | `#D0BCFF`   |

---

## 8. Responsive Behavior

| Breakpoint  | Sidebar        | Layout         |
|-------------|---------------|----------------|
| ≥1280px     | Full sidebar   | 3-col grid     |
| 1024-1279px | Icon sidebar   | 2-col grid     |
| <1024px     | Hidden (hamburger) | Stack       |

---

## 9. Data Sources (Mock)

All data is mock/static for the prototype:
- 25+ user records with varied roles and statuses
- 10+ workspace records with metrics
- AI conversation logs (5-10 sample threads)
- Alert configurations (5+ rules)
- Time-series activity data (30 days)
- System health metrics

---

## 10. Testing & Verification

// turbo
1. Run `npm run dev` and navigate to `http://localhost:3000/admin`
2. Test sidebar navigation between all sections
3. Test sidebar collapse/expand
4. Test theme switching
5. Test user table sorting and search
6. Test responsive layout at different breakpoints
7. Test modal and slide panel interactions
8. Verify no console errors

---

## 11. SEO & Metadata

- Title: "Admin Panel | Collaboration Workflow Platform"
- Description: "Platform administration dashboard for managing users, workspaces, and AI collaboration tools"
- No indexing (robots: noindex, nofollow) — admin pages should not be indexed
