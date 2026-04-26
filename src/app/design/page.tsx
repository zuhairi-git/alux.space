'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  SurfaceCard,
  TimelineCard,
  MediaCard,
  QuoteBlock,
  TestimonialCarousel,
  Icon,
  IconSurface,
  ButtonIcon,
  Tooltip,
  Button,
  Badge,
  BrandLogo,
  Input,
  Toggle,
  Avatar,
  Divider,
  ChapterDivider,
  Select,
  Modal,
  Tabs,
  Alert,
  Skeleton,
  Progress,
  Breadcrumb,
  Text,
  delaySeconds,
  durationSeconds,
  easing,
  getByCategory,
  motionDistance,
} from '@/design-system';
import type { ComponentEntry } from '@/design-system';
import AnimatedSection from '@/components/AnimatedSection';
import CodeSnippet from '@/components/CodeSnippet';
import PodcastPlayer from '@/components/PodcastPlayer';
import SectionAccents from '@/components/SectionAccents';
import { useTheme } from '@/context/ThemeContext';

/* -- Token swatch data ---------------------------------- */

/* -- 1. Semantic tokens -- theme-resolved, use these first ------------------- */
const semanticColorGroups: { group: string; tokens: { name: string; label: string; description?: string }[] }[] = [
  {
    group: 'Surface & Text',
    tokens: [
      { name: '--background',        label: 'Background' },
      { name: '--foreground',        label: 'Foreground' },
      { name: '--muted-foreground',  label: 'Muted Text' },
      { name: '--accent-text',       label: 'Accent Text' },
      { name: '--accent-text-2',     label: 'Accent Text 2' },
      { name: '--text-on-cosmic',    label: 'Text On Cosmic', description: 'Accessible foreground for the fixed cosmic gradient button and surface.' },
      { name: '--card-from-bg',      label: 'Card From' },
      { name: '--card-to-bg',        label: 'Card To' },
      { name: '--section-alt',      label: 'Section Alt' },
      { name: '--section-alt-2',    label: 'Section Alt 2' },
    ],
  },
  {
    group: 'Primary Scale  (--primary-50 — --primary-950)  light=indigo · dark=emerald · colorful=violet',
    tokens: [
      { name: '--primary-50',  label: '50',  description: 'palest tint' },
      { name: '--primary-100', label: '100' },
      { name: '--primary-200', label: '200' },
      { name: '--primary-300', label: '300' },
      { name: '--primary-400', label: '400', description: 'dark/colorful interactive' },
      { name: '--primary-500', label: '500' },
      { name: '--primary-600', label: '600', description: 'light interactive' },
      { name: '--primary-700', label: '700', description: 'light hover' },
      { name: '--primary-800', label: '800' },
      { name: '--primary-900', label: '900' },
      { name: '--primary-950', label: '950', description: 'deepest' },
    ],
  },
  {
    group: 'Gradient',
    tokens: [
      { name: '--gradient-start', label: 'Start' },
      { name: '--gradient-mid',   label: 'Mid' },
      { name: '--gradient-end',   label: 'End' },
      { name: '--gradient-cosmic', label: 'Cosmic', description: 'Theme-invariant indigo → violet → blue gradient for premium actions.' },
    ],
  },
  {
    group: 'Borders & Shadows',
    tokens: [
      { name: '--card-border',         label: 'Card Border' },
      { name: '--card-border-hover',   label: 'Card Border Hover' },
      { name: '--card-shadow-color',   label: 'Card Shadow' },
    ],
  },
  {
    group: 'Navigation',
    tokens: [
      { name: '--nav-bg',     label: 'Nav Bg' },
      { name: '--nav-border', label: 'Nav Border' },
    ],
  },
  {
    group: 'Buttons',
    tokens: [
      { name: '--btn-primary-bg',    label: 'Primary Bg' },
      { name: '--btn-primary-hover', label: 'Primary Hover' },
    ],
  },
  {
    group: 'Overlay & Badge',
    tokens: [
      { name: '--dropdown-bg',       label: 'Dropdown Bg' },
      { name: '--dropdown-border',   label: 'Dropdown Border' },
      { name: '--badge-overlay-bg',  label: 'Badge Overlay' },
      { name: '--badge-accent-bg',   label: 'Badge Accent' },
      { name: '--badge-glass-bg',    label: 'Badge Glass' },
    ],
  },
];

/* -- 2. State colors --------------------------------------------------------- */

/* -- 3. Raw palette (--color-*) -- use only when semantic tokens don't cover - */
const rawPaletteGroups: { group: string; tokens: { name: string; label: string; description?: string }[] }[] = [
  {
    group: 'Blues',
    tokens: [
      { name: '--color-blue-50',         label: '50' },
      { name: '--color-blue-100',        label: '100' },
      { name: '--color-blue-200',        label: '200' },
      { name: '--color-blue-300',        label: '300' },
      { name: '--color-blue-400',        label: '400' },
      { name: '--color-blue-500',        label: '500' },
      { name: '--color-blue-600',        label: '600' },
      { name: '--color-blue-700',        label: '700' },
      { name: '--color-blue-800',        label: '800' },
      { name: '--color-blue-900',        label: '900' },
      { name: '--color-blue-950',        label: '950' },
    ],
  },
  {
    group: 'Emeralds — dark theme primary',
    tokens: [
      { name: '--color-emerald-50',  label: '50' },
      { name: '--color-emerald-100', label: '100' },
      { name: '--color-emerald-200', label: '200' },
      { name: '--color-emerald-300', label: '300' },
      { name: '--color-emerald-400', label: '400', description: 'dark primary' },
      { name: '--color-emerald-500', label: '500' },
      { name: '--color-emerald-600', label: '600' },
      { name: '--color-emerald-700', label: '700' },
      { name: '--color-emerald-800', label: '800' },
      { name: '--color-emerald-900', label: '900' },
      { name: '--color-emerald-950', label: '950' },
    ],
  },
  {
    group: 'Violets — colorful theme primary',
    tokens: [
      { name: '--color-violet-50',  label: '50',  description: 'palest lavender' },
      { name: '--color-violet-100', label: '100' },
      { name: '--color-violet-200', label: '200' },
      { name: '--color-violet-300', label: '300' },
      { name: '--color-violet-400', label: '400', description: 'colorful primary' },
      { name: '--color-violet-500', label: '500' },
      { name: '--color-violet-600', label: '600' },
      { name: '--color-violet-700', label: '700' },
      { name: '--color-violet-800', label: '800' },
      { name: '--color-violet-900', label: '900' },
      { name: '--color-violet-950', label: '950', description: 'deepest' },
    ],
  },
  {
    group: 'Indigos — light theme primary',
    tokens: [
      { name: '--color-indigo-50',  label: '50' },
      { name: '--color-indigo-100', label: '100' },
      { name: '--color-indigo-200', label: '200' },
      { name: '--color-indigo-300', label: '300' },
      { name: '--color-indigo-400', label: '400' },
      { name: '--color-indigo-500', label: '500' },
      { name: '--color-indigo-600', label: '600', description: 'light primary' },
      { name: '--color-indigo-700', label: '700', description: 'light hover' },
      { name: '--color-indigo-800', label: '800' },
      { name: '--color-indigo-900', label: '900' },
      { name: '--color-indigo-950', label: '950' },
    ],
  },
  {
    group: 'Purples',
    tokens: [
      { name: '--color-purple-50',  label: '50' },
      { name: '--color-purple-100', label: '100' },
      { name: '--color-purple-200', label: '200' },
      { name: '--color-purple-300', label: '300' },
      { name: '--color-purple-400', label: '400' },
      { name: '--color-purple-500', label: '500' },
      { name: '--color-purple-600', label: '600' },
      { name: '--color-purple-700', label: '700' },
      { name: '--color-purple-800', label: '800' },
      { name: '--color-purple-900', label: '900' },
      { name: '--color-purple-950', label: '950' },
    ],
  },
  {
    group: 'Pinks',
    tokens: [
      { name: '--color-pink-50',  label: '50' },
      { name: '--color-pink-100', label: '100' },
      { name: '--color-pink-200', label: '200' },
      { name: '--color-pink-300', label: '300' },
      { name: '--color-pink-400', label: '400' },
      { name: '--color-pink-500', label: '500' },
      { name: '--color-pink-600', label: '600' },
      { name: '--color-pink-700', label: '700' },
      { name: '--color-pink-800', label: '800' },
      { name: '--color-pink-900', label: '900' },
      { name: '--color-pink-950', label: '950' },
    ],
  },
  {
    group: 'Fuchsias',
    tokens: [
      { name: '--color-fuchsia-50',  label: '50' },
      { name: '--color-fuchsia-100', label: '100' },
      { name: '--color-fuchsia-200', label: '200' },
      { name: '--color-fuchsia-300', label: '300' },
      { name: '--color-fuchsia-400', label: '400' },
      { name: '--color-fuchsia-500', label: '500' },
      { name: '--color-fuchsia-600', label: '600' },
      { name: '--color-fuchsia-700', label: '700' },
      { name: '--color-fuchsia-800', label: '800' },
      { name: '--color-fuchsia-900', label: '900' },
      { name: '--color-fuchsia-950', label: '950' },
    ],
  },
  {
    group: 'Grays',
    tokens: [
      { name: '--color-gray-50',  label: '50' },
      { name: '--color-gray-100', label: '100' },
      { name: '--color-gray-200', label: '200' },
      { name: '--color-gray-300', label: '300' },
      { name: '--color-gray-400', label: '400' },
      { name: '--color-gray-500', label: '500' },
      { name: '--color-gray-600', label: '600' },
      { name: '--color-gray-700', label: '700' },
      { name: '--color-gray-800', label: '800' },
      { name: '--color-gray-900', label: '900' },
      { name: '--color-gray-950', label: '950' },
    ],
  },
  {
    group: 'Ember',
    tokens: [
      { name: '--color-ember-50',  label: '50' },
      { name: '--color-ember-100', label: '100' },
      { name: '--color-ember-200', label: '200' },
      { name: '--color-ember-300', label: '300' },
      { name: '--color-ember-400', label: '400' },
      { name: '--color-ember-500', label: '500' },
      { name: '--color-ember-600', label: '600' },
      { name: '--color-ember-700', label: '700' },
      { name: '--color-ember-800', label: '800' },
      { name: '--color-ember-900', label: '900' },
      { name: '--color-ember-950', label: '950' },
    ],
  },
  {
    group: 'Golds',
    tokens: [
      { name: '--color-gold-50',  label: '50' },
      { name: '--color-gold-100', label: '100' },
      { name: '--color-gold-200', label: '200' },
      { name: '--color-gold-300', label: '300' },
      { name: '--color-gold-400', label: '400' },
      { name: '--color-gold-500', label: '500', description: 'metallic gold' },
      { name: '--color-gold-600', label: '600' },
      { name: '--color-gold-700', label: '700' },
      { name: '--color-gold-800', label: '800' },
      { name: '--color-gold-900', label: '900' },
      { name: '--color-gold-950', label: '950' },
    ],
  },
  {
    group: 'Accents',
    tokens: [
      { name: '--color-cyan-500',   label: 'Cyan 500' },
      { name: '--color-cyan-400',   label: 'Cyan 400' },
      { name: '--color-magenta',    label: 'Magenta' },
      { name: '--color-yellow-500', label: 'Yellow 500' },
      { name: '--color-orange-500', label: 'Orange 500' },
      { name: '--color-cobalt-700', label: 'Cobalt 700' },
    ],
  },
];

/* -- Tonal Palette data (mirrors tokens.css Section 1b) ------------------ */
const TONAL_TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100] as const;

const tonalPaletteRoles: { name: string; label: string; description: string }[] = [
  { name: 'primary',   label: 'Primary',   description: 'Violet — unified primary across all themes. Tone 40 (violet-700) — light default; tone 70 (violet-400) — dark/colorful default' },
  { name: 'secondary', label: 'Secondary', description: 'Muted violet-grey — supporting / secondary actions' },
  { name: 'tertiary',  label: 'Tertiary',  description: 'Rose-pink — complementary accent role' },
  { name: 'error',     label: 'Error',     description: 'Red spectrum — danger, destructive, error states' },
  { name: 'neutral',   label: 'Neutral',   description: 'Warm-grey — backgrounds, borders, surfaces' },
];

const spacingTokens = [
  { name: '--space-1',  label: '1 (4px)' },
  { name: '--space-2',  label: '2 (8px)' },
  { name: '--space-4',  label: '4 (16px)' },
  { name: '--space-6',  label: '6 (24px)' },
  { name: '--space-8',  label: '8 (32px)' },
  { name: '--space-12', label: '12 (48px)' },
  { name: '--space-16', label: '16 (64px)' },
  { name: '--space-24', label: '24 (96px)' },
];

const radiusTokens = [
  { name: '--radius-sm',   label: 'sm (6px)' },
  { name: '--radius-md',   label: 'md (8px)' },
  { name: '--radius-lg',   label: 'lg (12px)' },
  { name: '--radius-xl',   label: 'xl (16px)' },
  { name: '--radius-2xl',  label: '2xl (20px)' },
  { name: '--radius-3xl',  label: '3xl (32px)' },
  { name: '--radius-full', label: 'full' },
];

const shadowTokens = [
  { name: '--shadow-sm',         label: 'sm' },
  { name: '--shadow-md',         label: 'md' },
  { name: '--shadow-lg',         label: 'lg' },
  { name: '--shadow-xl',         label: 'xl' },
  { name: '--shadow-glow-sm',    label: 'glow-sm' },
  { name: '--shadow-glow',       label: 'glow' },
  { name: '--shadow-glow-lg',    label: 'glow-lg' },
  { name: '--shadow-glow-purple',label: 'glow-purple' },
];

/* -- Helper: copy-to-clipboard --------------------------- */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="text-[10px] opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity font-mono cursor-pointer"
      title={`Copy ${text}`}
    >
      {copied ? '?' : 'copy'}
    </button>
  );
}

/* -- Small sub-components -------------------------------- */

function Swatch({ cssVar, label, description }: { cssVar: string; label: string; description?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div
        className="w-12 h-12 rounded-lg border border-[var(--card-border)] shadow-sm"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <span className="text-[10px] text-center opacity-70 leading-tight">{label}</span>
      {description && <span className="text-[9px] text-center opacity-40 leading-tight -mt-0.5">{description}</span>}
      <CopyButton text={cssVar} />
    </div>
  );
}

function ShadowSwatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div
        className="w-16 h-16 rounded-lg bg-[var(--card-from-bg)] border border-[var(--card-border)]"
        style={{ boxShadow: `var(${cssVar})` }}
      />
      <span className="text-[10px] text-center opacity-70">{label}</span>
      <CopyButton text={cssVar} />
    </div>
  );
}

function SpacingSwatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex items-center gap-2 group">
      <div
        className="h-4 bg-primary/40 rounded"
        style={{ width: `var(${cssVar})` }}
      />
      <span className="text-xs opacity-70 whitespace-nowrap">{label}</span>
      <CopyButton text={cssVar} />
    </div>
  );
}

function RadiusSwatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div
        className="w-14 h-14 border-2 border-primary/50 bg-primary/10"
        style={{ borderRadius: `var(${cssVar})` }}
      />
      <span className="text-[10px] text-center opacity-70">{label}</span>
      <CopyButton text={cssVar} />
    </div>
  );
}

function PropsTable({ entry }: { entry: ComponentEntry }) {
  if (!entry.props.length) return <p className="text-sm opacity-60 italic">No configurable props.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-[var(--card-border)]">
            <th className="py-1.5 pr-4 font-medium">Prop</th>
            <th className="py-1.5 pr-4 font-medium">Type</th>
            <th className="py-1.5 pr-4 font-medium">Default</th>
            <th className="py-1.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {entry.props.map(p => (
            <tr key={p.name} className="border-b border-[var(--card-border)]/60">
              <td className="py-1.5 pr-4 font-mono text-xs text-primary">{p.name}</td>
              <td className="py-1.5 pr-4 font-mono text-xs opacity-70">{p.type}</td>
              <td className="py-1.5 pr-4 text-xs opacity-60">{p.default}</td>
              <td className="py-1.5 text-xs">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ComponentCard({ entry }: { entry: ComponentEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="theme-card-flex p-5 rounded-xl">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <div>
          <h4 className="font-semibold text-base">{entry.name}</h4>
          <span className="text-xs opacity-50 font-mono">{entry.path}</span>
        </div>
        <span className="material-symbols text-sm opacity-40">{open ? 'expand_less' : 'expand_more'}</span>
      </button>

      {open && (
        <div className="mt-4 space-y-3">
          {/* Variants */}
          {entry.variants.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {entry.variants.map(v => (
                <span key={v} className="px-2 py-0.5 text-[11px] font-mono rounded-full bg-primary/10 text-primary">
                  {v}
                </span>
              ))}
            </div>
          )}

          {/* Props table */}
          <PropsTable entry={entry} />

          {/* Tokens used */}
          {entry.tokens.length > 0 && (
            <div>
              <span className="text-xs font-medium opacity-60">Tokens:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {entry.tokens.map(t => (
                  <code key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/8 font-mono">{t}</code>
                ))}
              </div>
            </div>
          )}

          {/* A11y */}
          {entry.a11y.length > 0 && (
            <div>
              <span className="text-xs font-medium opacity-60">Accessibility:</span>
              <ul className="mt-1 list-disc list-inside text-xs opacity-70">
                {entry.a11y.map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* -- Code-toggle wrapper -------------------------------- */

function DemoSection({ children, code, language = 'tsx' }: { children: React.ReactNode; code: string; language?: string }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="rounded-xl border border-[var(--card-border)] overflow-hidden">
      <div className="p-6">
        {children}
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--card-border)] bg-foreground/[0.025]">
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-30">Preview</span>
        <button
          onClick={() => setShowCode(!showCode)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <span className="material-symbols text-sm">{showCode ? 'visibility_off' : 'code'}</span>
          {showCode ? 'Hide code' : 'View code'}
        </button>
      </div>
      {showCode && <CodeSnippet code={code} language={language} />}
    </div>
  );
}

/* -- Main Page ------------------------------------------- */

const registryCategories: { key: ComponentEntry['category']; label: string }[] = [
  { key: 'primitive', label: 'Primitives' },
  { key: 'composite', label: 'Composite Components' },
  { key: 'section',   label: 'Section-Level' },
  { key: 'a11y',      label: 'Accessibility' },
  { key: 'layout',    label: 'Layout & Providers' },
];

/* -- Individual section renderers ----------------------- */

function StateBadgesShowcase() {
  const states: { key: 'success' | 'warning' | 'error' | 'info'; label: string; dotLabel: string }[] = [
    { key: 'success', label: 'Success', dotLabel: 'Active'   },
    { key: 'warning', label: 'Warning', dotLabel: 'Pending'  },
    { key: 'error',   label: 'Error',   dotLabel: 'Critical' },
    { key: 'info',    label: 'Info',    dotLabel: 'New'      },
  ];
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] overflow-hidden">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-[var(--card-border)] bg-[var(--card-from-bg)]">
            <th className="text-left font-mono font-normal opacity-40 py-3 pr-4 pl-4 w-20" />
            <th className="font-mono font-normal opacity-40 py-3 px-4 text-center">Filled</th>
            <th className="font-mono font-normal opacity-40 py-3 px-4 text-center">Outline</th>
            <th className="font-mono font-normal opacity-40 py-3 px-4 text-center">With dot</th>
            <th className="text-left font-mono font-normal opacity-40 py-3 pl-4 pr-4">Token stem</th>
          </tr>
        </thead>
        <tbody>
          {states.map(s => (
            <tr key={s.key} className="border-t border-[var(--card-border)]">
              <td className="py-3 pr-4 pl-4 opacity-60 font-medium">{s.label}</td>
              {/* Filled — uses exact Badge component, identical to real usage */}
              <td className="py-3 px-4 text-center">
                <Badge variant={s.key}>{s.label}</Badge>
              </td>
              {/* Outline — border-only, transparent bg */}
              <td className="py-3 px-4 text-center">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full font-medium border text-xs"
                  style={{
                    color:           `var(--color-${s.key})`,
                    backgroundColor: `transparent`,
                    borderColor:     `var(--color-${s.key}-border)`,
                  }}
                >
                  {s.label}
                </span>
              </td>
              {/* With animated dot — uses Badge component with dot prop */}
              <td className="py-3 px-4 text-center">
                <Badge variant={s.key} dot>{s.dotLabel}</Badge>
              </td>
              <td className="py-3 pl-4 opacity-35 font-mono text-[10px]">--color-{s.key}-*</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ColorGroupBlock({ group, tokens }: { group: string; tokens: { name: string; label: string; description?: string }[] }) {
  return (
    <div>
      <h5 className="text-xs font-mono mb-2 opacity-50">{group}</h5>
      <div className="flex flex-wrap gap-3">
        {tokens.map(t => (
          <Swatch key={t.name} cssVar={t.name} label={t.label} description={t.description} />
        ))}
      </div>
    </div>
  );
}

function ColorsSection() {
  return (
    <div className="space-y-10">

      {/* 1 — Semantic tokens */}
      <section>
        <div className="mb-4 p-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-from-bg)] text-xs opacity-70">
          <strong>Semantic tokens</strong> are theme-resolved — they automatically switch value across light / dark / colorful themes.
          Primary tokens reference <code className="font-mono">--palette-primary-{'{tone}'}</code> and update with the active tonal palette.
        </div>
        <div className="space-y-6">
          {semanticColorGroups.map(g => (
            <ColorGroupBlock key={g.group} group={g.group} tokens={g.tokens} />
          ))}
        </div>
      </section>

      {/* 2 — Raw palette */}
      <section>
        <h4 className="text-sm font-semibold mb-1">Raw Palette</h4>
        <p className="text-xs opacity-50 mb-4">Fixed <code className="font-mono">--color-*</code> tokens — prefer semantic tokens unless you need a specific shade.</p>
        <div className="space-y-6">
          {rawPaletteGroups.map(g => (
            <ColorGroupBlock key={g.group} group={g.group} tokens={g.tokens} />
          ))}
        </div>
      </section>

      {/* 3 — State colors */}
      <section>
        <h4 className="text-sm font-semibold mb-1">State Colors</h4>
        <p className="text-xs opacity-50 mb-4">Theme-resolved status feedback tokens. Error is wired to <code className="font-mono">--palette-error-40</code>.</p>
        <div className="overflow-x-auto">
          <div className="min-w-[520px]">
            {/* Column headers */}
            <div className="grid grid-cols-[88px_1fr_1fr_1fr] gap-x-4 mb-2 px-2">
              <div />
              {['Filled', 'Outline', 'Soft'].map(v => (
                <div key={v} className="text-xs font-semibold uppercase tracking-wider opacity-50">{v}</div>
              ))}
            </div>
            {/* Rows */}
            <div className="divide-y divide-[var(--card-border)]">
              {['success', 'warning', 'error', 'info'].map(state => (
                <div key={state} className="grid grid-cols-[88px_1fr_1fr_1fr] gap-x-4 items-center py-3 px-2">
                  <div className="text-xs font-semibold capitalize opacity-70">{state}</div>
                  {/* Filled */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 shrink-0 rounded-md" style={{ background: `var(--color-${state}-bg)` }} />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] opacity-50 truncate">--color-{state}-bg</div>
                      <div className="font-mono text-[10px] truncate" style={{ color: `var(--color-${state})` }}>--color-{state}</div>
                    </div>
                  </div>
                  {/* Outline */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 shrink-0 rounded-md" style={{ border: `2px solid var(--color-${state}-border)` }} />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] opacity-50 truncate">--color-{state}-border</div>
                      <div className="font-mono text-[10px] truncate" style={{ color: `var(--color-${state})` }}>--color-{state}</div>
                    </div>
                  </div>
                  {/* Soft */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 shrink-0 rounded-md" style={{ background: `var(--color-${state}-soft-bg)` }} />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] opacity-50 truncate">--color-{state}-soft-bg</div>
                      <div className="font-mono text-[10px] truncate" style={{ color: `var(--color-${state}-soft)` }}>--color-{state}-soft</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function TonalPaletteStrip({ role, label, description }: { role: string; label: string; description: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <span className="text-sm font-semibold capitalize">{label}</span>
        <span className="text-xs opacity-50">{description}</span>
      </div>
      {/* Colour strip */}
      <div className="flex rounded-xl overflow-hidden border border-[var(--card-border)] h-16">
        {TONAL_TONES.map(tone => (
          <div
            key={tone}
            className="flex-1 relative group flex items-end justify-center pb-1"
            style={{ backgroundColor: `var(--palette-${role}-${tone})` }}
          >
            {/* Tone number — always shown */}
            <span
              className="text-[8px] font-mono leading-none select-none"
              style={{ color: tone <= 50 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }}
            >
              {tone}
            </span>
            {/* "40" default marker */}
            {tone === 40 && (
              <span
                className="absolute top-1 left-0 right-0 text-center text-[7px] font-bold uppercase tracking-widest leading-none select-none"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                default
              </span>
            )}
            {/* Copyable token on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="text-[9px] font-mono px-1 py-0.5 rounded"
                style={{
                  background: tone <= 50 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                  color: tone <= 50 ? '#ffffff' : '#000000', // eslint-disable-line design-system/no-hardcoded-colors -- swatch contrast
                }}
              >
                --palette-{role}-{tone}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Token name hint */}
      <p className="text-[10px] font-mono text-[var(--primary)] opacity-60">
        --palette-{role}-40 (per-theme overridden in tokens.css)
      </p>
    </div>
  );
}

function TonalPalettesSection() {
  return (
    <div className="space-y-8">
      {/* Intro card */}
      <div className="theme-card-flex p-5 rounded-xl">
        <p className="text-sm opacity-70 leading-relaxed">
          Material Design 3-compatible tonal palettes sourced from{' '}
          <span className="font-semibold">Figma — Design System Ali</span> (node 1307-2340).
          Each palette has <strong>13 tone steps</strong> from 0 (black) to 100 (white).
          {' '}
          <span className="font-medium text-[var(--primary)]">Tone 40</span> is the light-theme interactive default;
          {' '}
          <span className="font-medium text-[var(--primary)]">tone 80</span> is the dark-theme default.
          Per-theme overrides in <code className="text-xs">tokens.css</code> remap the roles to each theme&apos;s actual color family (blue / indigo / purple) so visual appearance is unchanged.
        </p>
      </div>

      {/* Palette strips */}
      <div className="space-y-6">
        {tonalPaletteRoles.map(role => (
          <TonalPaletteStrip key={role.name} role={role.name} label={role.label} description={role.description} />
        ))}
      </div>

      {/* Usage snippet */}
      <div className="theme-card-flex p-4 rounded-xl">
        <p className="text-xs font-mono opacity-50 mb-2">Token usage examples</p>
        <pre className="text-xs opacity-70 whitespace-pre-wrap">{`/* Primary — light theme interactive default */
var(--palette-primary-40)

/* Error — on-dark background (high contrast) */
var(--palette-error-80)

/* Neutral — light surface tint */
var(--palette-neutral-90)

/* Secondary — muted border */
var(--palette-secondary-70)`}</pre>
      </div>

      {/* Role reference table */}
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-3">Role Reference</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[var(--card-border)]">
                <th className="py-1.5 pr-4 font-medium">Role</th>
                <th className="py-1.5 pr-4 font-medium">Token prefix</th>
                <th className="py-1.5 pr-4 font-medium">Light default (tone)</th>
                <th className="py-1.5 font-medium">Dark default (tone)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { role: 'primary',   prefix: '--palette-primary-{tone}',   light: '40', dark: '80' },
                { role: 'secondary', prefix: '--palette-secondary-{tone}', light: '40', dark: '80' },
                { role: 'tertiary',  prefix: '--palette-tertiary-{tone}',  light: '40', dark: '80' },
                { role: 'error',     prefix: '--palette-error-{tone}',     light: '40', dark: '80' },
                { role: 'neutral',   prefix: '--palette-neutral-{tone}',   light: '40', dark: '80' },
              ].map(r => (
                <tr key={r.role} className="border-b border-[var(--card-border)]/60">
                  <td className="py-1.5 pr-4 font-medium capitalize">{r.role}</td>
                  <td className="py-1.5 pr-4 font-mono text-xs text-[var(--primary)]">{r.prefix}</td>
                  <td className="py-1.5 pr-4 text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-sm border border-[var(--card-border)] inline-block"
                        style={{ background: `var(--palette-${r.role}-40)` }}
                      />
                      {r.light}
                    </span>
                  </td>
                  <td className="py-1.5 text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-sm border border-[var(--card-border)] inline-block"
                        style={{ background: `var(--palette-${r.role}-80)` }}
                      />
                      {r.dark}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Text Colors Section ─────────────────────────────────── */

const textColorTokens: {
  token: string;
  label: string;
  tailwind: string;
  description: string;
  bgToken: string;
  bgLabel: string;
  sample: string;
}[] = [
  {
    token: '--foreground',
    label: 'Foreground',
    tailwind: 'text-foreground',
    description: 'Primary body / paragraph text. Theme-resolved main text colour.',
    bgToken: '--background',
    bgLabel: 'page bg',
    sample: 'The quick brown fox jumps over the lazy dog.',
  },
  {
    token: '--muted-foreground',
    label: 'Muted Foreground',
    tailwind: 'text-muted-foreground',
    description: 'Secondary / supplemental text. Labels, captions, helper strings.',
    bgToken: '--background',
    bgLabel: 'page bg',
    sample: 'Secondary text — labels, captions, helper copy.',
  },
  {
    token: '--accent-text',
    label: 'Accent Text',
    tailwind: 'text-accent',
    description: 'Accent/interactive inline text. Resolves to the primary scale.',
    bgToken: '--background',
    bgLabel: 'page bg',
    sample: 'Accent label or interactive text link.',
  },
  {
    token: '--accent-text-2',
    label: 'Accent Text 2',
    tailwind: 'text-accent-2',
    description: 'Second accent tone — used for secondary interactive labels.',
    bgToken: '--background',
    bgLabel: 'page bg',
    sample: 'Second accent — sub-labels and variant text.',
  },
  {
    token: '--text-subtle',
    label: 'Text Subtle',
    tailwind: 'text-ds-text-subtle',
    description: 'Decorative low-emphasis text. Intentionally below WCAG AA — do NOT use for essential content.',
    bgToken: '--background',
    bgLabel: 'page bg',
    sample: 'Decorative hint · timestamp · overline divider',
  },
  {
    token: '--dropdown-text',
    label: 'Dropdown Text',
    tailwind: 'text-dropdown-text',
    description: 'Text inside overlay panels (dropdowns, menus, popovers).',
    bgToken: '--dropdown-bg',
    bgLabel: 'dropdown bg',
    sample: 'Menu item · Dropdown option · Popover content',
  },
  {
    token: '--text-on-primary',
    label: 'Text on Primary',
    tailwind: 'text-on-primary',
    description: 'Text placed ON a primary-coloured fill (filled buttons, accent badges).',
    bgToken: '--btn-primary-bg',
    bgLabel: 'primary btn bg',
    sample: 'Save changes  ·  Confirm  ·  Get started',
  },
  {
    token: '--text-on-dark',
    label: 'Text on Dark',
    tailwind: 'text-on-dark',
    description: 'Text placed ON a dark or gradient surface (gradient buttons, image overlays, social icons).',
    bgToken: '--gradient-start',
    bgLabel: 'gradient bg',
    sample: 'Subscribe  ·  On image  ·  Glass badge',
  },
  {
    token: '--badge-glass-text',
    label: 'Badge Glass Text',
    tailwind: 'text-[var(--badge-glass-text)]',
    description: 'Text inside frosted-glass badges placed on dark images or overlays. References --text-on-dark.',
    bgToken: '--badge-glass-bg',
    bgLabel: 'glass badge bg',
    sample: 'Design  ·  On Image  ·  Category',
  },
  {
    token: '--badge-accent-text',
    label: 'Badge Accent Text',
    tailwind: 'text-[var(--badge-accent-text)]',
    description: 'Text inside solid accent badges. References --text-on-primary.',
    bgToken: '--badge-accent-bg',
    bgLabel: 'accent badge bg',
    sample: 'Case Study  ·  Featured  ·  New',
  },
  {
    token: '--btn-overlay-text',
    label: 'Button Overlay Text',
    tailwind: 'text-[var(--btn-overlay-text)]',
    description: 'Text inside dark-frosted overlay buttons placed on images. References --text-on-dark.',
    bgToken: '--btn-overlay-bg',
    bgLabel: 'overlay btn bg',
    sample: 'Bookmark  ·  Share  ·  Watch',
  },
];

function TextColorsSection() {
  return (
    <div className="space-y-10">
      {/* Intro */}
      <div className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] text-sm opacity-70 leading-relaxed">
        Semantic text-colour tokens — use these instead of raw hex or opacity hacks.
        Three token families:
        <strong className="opacity-100 ml-1">on-surface</strong> (foreground, muted, accent),
        <strong className="opacity-100 ml-1">on-coloured</strong> (on-primary, on-dark), and
        <strong className="opacity-100 ml-1">low-emphasis</strong> (subtle).
        All resolve correctly across all three themes.
      </div>

      {/* Token table */}
      <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--card-border)] bg-[var(--card-from-bg)]">
              <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider opacity-50 w-44">Preview</th>
              <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider opacity-50">Token</th>
              <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider opacity-50 hidden md:table-cell">Tailwind utility</th>
              <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider opacity-50 hidden lg:table-cell">Usage</th>
            </tr>
          </thead>
          <tbody>
            {textColorTokens.map(t => (
              <tr key={t.token} className="border-t border-[var(--card-border)] hover:bg-[var(--row-hover-bg)] transition-colors">
                {/* Preview cell — text on its intended background */}
                <td className="py-3 px-4">
                  <div
                    className="rounded-lg px-3 py-2 text-xs font-medium leading-snug"
                    style={{
                      backgroundColor: `var(${t.bgToken})`,
                      color: `var(${t.token})`,
                      border: '1px solid var(--card-border)',
                      minHeight: '2.5rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {t.sample.split(' · ')[0]}
                  </div>
                </td>
                {/* Token name */}
                <td className="py-3 px-4">
                  <code className="text-xs font-mono text-[var(--primary)] block">{t.token}</code>
                  <span className="text-xs opacity-50 block mt-0.5">{t.label}</span>
                  <span className="text-xs opacity-40 block mt-0.5">bg: {t.bgLabel}</span>
                </td>
                {/* Tailwind */}
                <td className="py-3 px-4 hidden md:table-cell">
                  <code className="text-xs font-mono opacity-60">{t.tailwind}</code>
                </td>
                {/* Description */}
                <td className="py-3 px-4 hidden lg:table-cell">
                  <span className="text-xs opacity-60 leading-relaxed">{t.description}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Live demo grid */}
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-4">Live Preview — text on intended background</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {textColorTokens.map(t => (
            <div key={t.token} className="rounded-xl border border-[var(--card-border)] overflow-hidden">
              {/* Colour preview strip */}
              <div
                className="px-4 py-5 text-sm font-medium leading-relaxed"
                style={{
                  backgroundColor: `var(${t.bgToken})`,
                  color: `var(${t.token})`,
                }}
              >
                {t.sample}
              </div>
              {/* Token info strip */}
              <div className="px-4 py-3 bg-[var(--card-from-bg)] border-t border-[var(--card-border)]">
                <code className="text-[11px] font-mono text-[var(--primary)] opacity-80 block">{t.token}</code>
                <span className="text-[10px] opacity-40 font-mono block mt-0.5">{t.tailwind}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage snippet */}
      <div className="theme-card-flex p-4 rounded-xl">
        <p className="text-xs font-mono opacity-50 mb-3">Usage examples</p>
        <pre className="text-xs opacity-70 whitespace-pre-wrap leading-relaxed">{`/* CSS / inline styles */
color: var(--foreground);           /* body text */
color: var(--muted-foreground);     /* secondary text */
color: var(--text-on-primary);      /* text on primary-bg buttons */
color: var(--text-on-dark);         /* text on dark/gradient surfaces */
color: var(--text-subtle);          /* decorative hint text */

/* Tailwind utilities */
className="text-foreground"          /* body text */
className="text-muted-foreground"    /* secondary text */
className="text-on-primary"          /* text on primary bg */
className="text-on-dark"             /* text on dark bg */
className="text-ds-text-subtle"      /* decorative hint */
className="text-accent"              /* accent text */
className="text-accent-2"            /* second accent */`}</pre>
      </div>
    </div>
  );
}

function TypographySection() {
  return (
    <div className="space-y-8">
      {/* Scale */}
      <div>
        <h4 className="text-sm font-medium mb-3 opacity-60">Type Scale</h4>
        <div className="space-y-3">
          {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].map(size => (
            <div key={size} className="flex items-baseline gap-4 group">
              <span className="w-12 text-right text-xs opacity-50 font-mono">{size}</span>
              <span style={{ fontSize: `var(--font-size-${size})` }}>
                The quick brown fox
              </span>
              <CopyButton text={`--font-size-${size}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Weights */}
      <div>
        <h4 className="text-sm font-medium mb-3 opacity-60">Font Weights</h4>
        <div className="space-y-2">
          {[
            { label: 'Normal (400)', weight: 'var(--font-normal)' },
            { label: 'Medium (500)', weight: 'var(--font-medium)' },
            { label: 'Semibold (600)', weight: 'var(--font-semibold)' },
            { label: 'Bold (700)', weight: 'var(--font-bold)' },
          ].map(w => (
            <div key={w.label} className="flex items-baseline gap-4">
              <span className="w-28 text-right text-xs opacity-50 font-mono">{w.label}</span>
              <span className="text-lg" style={{ fontWeight: w.weight }}>
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Line heights */}
      <div>
        <h4 className="text-sm font-medium mb-3 opacity-60">Line Heights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'tight (1.25)', value: 'var(--leading-tight)' },
            { label: 'snug (1.375)', value: 'var(--leading-snug)' },
            { label: 'normal (1.5)', value: 'var(--leading-normal)' },
            { label: 'relaxed (1.625)', value: 'var(--leading-relaxed)' },
          ].map(lh => (
            <div key={lh.label} className="theme-card-flex p-4 rounded-lg">
              <span className="text-xs font-mono opacity-50 block mb-2">{lh.label}</span>
              <p className="text-sm" style={{ lineHeight: lh.value }}>
                The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                How vexingly quick daft zebras jump.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TextSection() {
  const variants: Array<{
    variant: React.ComponentProps<typeof Text>['variant'];
    label: string;
    sample: string;
  }> = [
    { variant: 'hero',     label: 'hero',     sample: 'Hero Display Heading' },
    { variant: 'h1',      label: 'h1',       sample: 'Heading 1 — Page Title' },
    { variant: 'h2',      label: 'h2',       sample: 'Heading 2 — Section Title' },
    { variant: 'h3',      label: 'h3',       sample: 'Heading 3 — Sub-section' },
    { variant: 'h4',      label: 'h4',       sample: 'Heading 4 — Card Title' },
    { variant: 'body',    label: 'body',     sample: 'Body text — the main reading size used for paragraphs and content.' },
    { variant: 'body-sm', label: 'body-sm',  sample: 'Body small — slightly reduced for dense layouts and captions.' },
    { variant: 'caption', label: 'caption',  sample: 'Caption text — muted supplemental information.' },
    { variant: 'label',   label: 'label',    sample: 'Label / Form Field' },
    { variant: 'overline',label: 'overline', sample: 'Overline Category Tag' },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm opacity-60">
        All 10 typography variants from the <code className="text-xs opacity-80">Text</code> component.
        Each renders the semantic HTML tag for its scale by default.
      </p>
      <div className="space-y-4">
        {variants.map(({ variant, label, sample }) => (
          <div key={variant} className="flex items-baseline gap-4 group">
            <span className="w-20 flex-shrink-0 text-right text-xs font-mono opacity-40">{label}</span>
            <div className="flex-1 min-w-0">
              <Text variant={variant}>{sample}</Text>
            </div>
          </div>
        ))}
      </div>

      <div className="theme-card-flex p-4 rounded-xl mt-4">
        <p className="text-xs font-mono opacity-50 mb-3">Usage</p>
        <pre className="text-xs opacity-70 whitespace-pre-wrap">{`import { Text } from '@/design-system';

<Text variant="h2">Section Title</Text>
<Text variant="body">Paragraph content here.</Text>
<Text variant="overline">Category</Text>
<Text variant="label" as="span">Form label without <label> semantics</Text>`}</pre>
      </div>
    </div>
  );
}

function SpacingSection() {
  return (
    <div className="space-y-2">
      {spacingTokens.map(t => (
        <SpacingSwatch key={t.name} cssVar={t.name} label={t.label} />
      ))}
    </div>
  );
}

function RadiusSection() {
  return (
    <div className="flex flex-wrap gap-4">
      {radiusTokens.map(t => (
        <RadiusSwatch key={t.name} cssVar={t.name} label={t.label} />
      ))}
    </div>
  );
}

function ShadowsSection() {
  return (
    <div className="flex flex-wrap gap-6">
      {shadowTokens.map(t => (
        <ShadowSwatch key={t.name} cssVar={t.name} label={t.label} />
      ))}
    </div>
  );
}

function MotionSection() {
  return (
    <div className="space-y-4">
      <div className="theme-card-flex rounded-xl p-4">
        <p className="text-sm leading-6 opacity-80">
          Motion is intentionally limited: the hero keeps the quantum canvas, count-up feedback stays available for KPI moments,
          and in-page reveal uses AnimatedSection with token-driven fade, slide-up, and slide-down variants only. Background motion
          is removed outside hero/header contexts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { name: 'ease-out', value: easing.out.css, token: '--ease-out' },
          { name: 'gentle', value: easing.gentle.css, token: '--ease-gentle' },
          { name: 'enter duration', value: `${durationSeconds.slow}s`, token: '--duration-slow' },
          { name: 'reveal offset', value: `${motionDistance.reveal}px`, token: '--motion-reveal-offset' },
        ].map(item => (
          <div key={item.name} className="theme-card-flex p-4 rounded-xl group">
            <span className="mb-1 text-xs font-mono opacity-60">{item.name}</span>
            <span className="text-sm font-medium">{item.value}</span>
            <span className="mt-2 text-[11px] font-mono opacity-45">{item.token}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GradientsSection() {
  const gradients = [
    {
      label: 'Primary',
      css: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
      token: '--gradient-start → --gradient-end',
    },
    {
      label: 'Card',
      css: 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))',
      token: '--card-from-bg → --card-to-bg',
    },
    {
      label: 'Cosmic',
      css: 'var(--gradient-cosmic)',
      token: '--gradient-cosmic',
      foreground: 'var(--text-on-cosmic)',
      foregroundToken: '--text-on-cosmic',
      note: 'Unchanged across themes. Darker stops keep the surface modern while the dedicated foreground token stays readable.',
    },
    {
      label: 'Ember (Colorful)',
      css: 'linear-gradient(135deg, var(--color-ember-400) 0%, var(--color-ember-600) 55%, var(--color-cobalt-700) 100%)',
      token: '--color-ember-400 → --color-cobalt-700',
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {gradients.map(g => (
        <div key={g.label} className="flex flex-col items-center gap-2">
          <div
            className="relative w-full h-24 rounded-xl border border-[var(--card-border)] overflow-hidden"
            style={{ background: g.css }}
          >
            {g.foreground ? (
              <div className="absolute inset-0 flex items-end justify-between p-3" style={{ color: g.foreground }}>
                <span className="text-sm font-semibold">Readable cosmic text</span>
                <span className="text-[11px] font-mono opacity-80">{g.foregroundToken}</span>
              </div>
            ) : null}
          </div>
          <span className="text-xs font-medium opacity-60">{g.label}</span>
          <span className="text-[11px] font-mono opacity-45 text-center">{g.token}</span>
          {g.note ? <span className="text-[11px] leading-5 opacity-55 text-center">{g.note}</span> : null}
        </div>
      ))}
    </div>
  );
}

function BackgroundsSection() {
  const semanticBgs = [
    {
      label: 'Page Background',
      cssVar: '--background',
      description: 'Base page background. White in Light, near-black in Dark, void-purple in Colorful.',
      usage: 'bg-[var(--background)]',
    },
    {
      label: 'Card Surface (from)',
      cssVar: '--card-from-bg',
      description: 'Starting stop of card/surface gradients.',
      usage: 'from-[var(--card-from-bg)]',
    },
    {
      label: 'Card Surface (to)',
      cssVar: '--card-to-bg',
      description: 'Ending stop of card/surface gradients.',
      usage: 'to-[var(--card-to-bg)]',
    },
    {
      label: 'Nav Background',
      cssVar: '--nav-bg',
      description: 'Navigation bar / header backdrop.',
      usage: 'bg-[var(--nav-bg)]',
    },
    {
      label: 'Section Alt',
      cssVar: '--section-alt',
      description: 'Alternate section background — used on About, second content sections, etc.',
      usage: 'bg-ds-section-alt',
    },
    {
      label: 'Section Alt 2',
      cssVar: '--section-alt-2',
      description: 'Second alternate — creates visual rhythm between page content sections.',
      usage: 'bg-ds-section-alt-2',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Semantic tokens */}
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-4">Semantic Background Tokens</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {semanticBgs.map(bg => (
            <div key={bg.cssVar} className="space-y-2">
              <div
                className="w-full h-20 rounded-xl border border-[var(--card-border)]"
                style={{ background: `var(${bg.cssVar})` }}
              />
              <div className="text-sm font-semibold">{bg.label}</div>
              <div className="text-xs font-mono text-[var(--primary)] mt-0.5">{bg.cssVar}</div>
              <div className="text-xs opacity-50 leading-snug">{bg.description}</div>
              <div className="text-xs font-mono opacity-40 truncate">{bg.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Card gradient preview */}
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-4">Card Gradient Preview</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div
            className="h-24 rounded-xl border border-[var(--card-border)]"
            style={{ background: 'linear-gradient(135deg, var(--card-from-bg), var(--card-to-bg))' }}
          />
          <div className="col-span-2 space-y-1">
            <div className="text-sm font-semibold">Card Gradient</div>
            <div className="text-xs font-mono text-[var(--primary)]">
              from-[var(--card-from-bg)] to-[var(--card-to-bg)]
            </div>
            <div className="text-xs opacity-50 mt-1">
              Applied via <span className="font-mono">bg-gradient-to-br</span> on all card surfaces \u2014 adapts across all three themes.
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium opacity-60 mb-4">Case Study Canvas</h4>
        <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-4 items-start">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--card-border)] bg-[var(--background)] p-5">
            <div className="absolute inset-0 bg-[linear-gradient(var(--grid-line-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line-color)_1px,transparent_1px)] bg-[size:48px_48px] opacity-80" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              {['Problem framing', 'Trust layer'].map(label => (
                <div key={label} className="rounded-2xl border border-[var(--card-border)] bg-gradient-to-br from-[var(--card-from-bg)] to-[var(--card-to-bg)] p-4 shadow-card">
                  <div className="mb-3 h-[2px] rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--gradient-mid)]" />
                  <p className="text-sm font-semibold">{label}</p>
                  <p className="mt-2 text-xs opacity-60">Use the grid token canvas and card surfaces only. Decorative blur orbs stay out of case-study backgrounds.</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold">Grid-only case study surface</div>
            <div className="text-xs font-mono text-[var(--primary)]">--background · --grid-line-color · --card-from-bg · --card-to-bg · --card-border</div>
            <div className="text-xs opacity-50 mt-1">Portfolio canvases like Market Intelligence should rely on tokenized grid structure and card gradients rather than decorative glow or blur backgrounds.</div>
          </div>
        </div>
      </div>

      {/* Nav preview */}
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-4">Nav Background Preview</h4>
        <div
          className="w-full h-14 rounded-xl border border-[var(--nav-border)] flex items-center px-5 gap-3"
          style={{ background: 'var(--nav-bg)' }}
        >
          <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
          <div className="text-sm font-medium opacity-70">
            Navigation surface —{' '}
            <span className="font-mono text-[var(--primary)] text-xs">var(--nav-bg)</span>
          </div>
        </div>
      </div>

      {/* Section backgrounds preview */}
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-4">Section Background Preview</h4>
        <p className="text-xs opacity-50 mb-4">Alternating section backgrounds with the shared <code className="font-mono text-[var(--primary)]">SectionAccents</code> decoration layer.</p>
        <div className="rounded-xl overflow-hidden border border-[var(--card-border)] divide-y divide-[var(--card-border)]">
          {[
            { cssVar: '--background',   label: 'Base page background',     token: '--background',                        desc: 'Between alternating sections — the default surface.' },
            { cssVar: '--section-alt',  label: 'First alternate section',  token: '--section-alt · bg-ds-section-alt',   desc: 'Used for About, Podcast, prominent content sections.' },
            { cssVar: '--background',   label: 'Base (repeat)',             token: '--background',                        desc: 'Alternating rhythm continues.' },
            { cssVar: '--section-alt-2',label: 'Second alternate section', token: '--section-alt-2 · bg-ds-section-alt-2', desc: 'Used for Testimonials, closing sections.' },
          ].map(({ cssVar, label, token, desc }) => (
            <div key={label} className="relative overflow-hidden px-6 py-8" style={{ background: `var(${cssVar})` }}>
              <SectionAccents />
              <div className="relative z-10">
                <div className="text-xs font-mono text-[var(--primary)] mb-1">{token}</div>
                <div className="text-sm font-semibold mb-1">{label}</div>
                <div className="text-xs opacity-50">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SectionAccents component doc */}
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-4">SectionAccents Component</h4>
        <p className="text-xs opacity-50 mb-4">
          Drop <code className="font-mono text-[var(--primary)]">{'<SectionAccents />'}</code> as the first child of any{' '}
          <code className="font-mono text-[var(--primary)]">relative overflow-hidden</code> section. It renders tiny
          scattered shapes — dots, rings, diamonds, squares, crosses — using design tokens exclusively.
        </p>
        <div className="relative h-36 rounded-xl overflow-hidden border border-[var(--card-border)] bg-[var(--section-alt)]">
          <SectionAccents />
          <div className="relative z-10 flex items-center justify-center h-full">
            <code className="text-xs font-mono text-[var(--muted-foreground)] bg-[var(--card-from-bg)] px-3 py-1.5 rounded-lg border border-[var(--card-border)]">
              {'<SectionAccents />'}
            </code>
          </div>
        </div>
        <div className="mt-3 text-xs font-mono opacity-50">
          import SectionAccents from &apos;@/components/SectionAccents&apos;
        </div>
      </div>
    </div>
  );
}

/* -- Component demo sections --------------------------- */

function ButtonsSection() {
  const iconButtonSizes = ['sm', 'md', 'lg'] as const;

  return (
    <DemoSection code={`import { Button, ButtonIcon } from '@/design-system';

// Primary — filled, highest emphasis
<Button variant="primary">Save changes</Button>
<Button variant="primary" leftIcon={<ButtonIcon name="add" />}>New project</Button>

// Secondary — outlined, medium emphasis
<Button variant="secondary">Cancel</Button>
<Button variant="secondary" rightIcon={<ButtonIcon name="arrow_forward" />}>View all</Button>

// Tertiary — text-only, low emphasis
<Button variant="tertiary">Learn more</Button>
<Button variant="tertiary" leftIcon={<ButtonIcon name="info" />}>Details</Button>

// Icon-only buttons — tokenized square sizing
<Button variant="icon" size="sm" aria-label="Close"><ButtonIcon name="close" emphasis="icon-only" /></Button>
<Button variant="icon" aria-label="More actions"><ButtonIcon name="more_vert" emphasis="icon-only" /></Button>
<Button variant="icon" size="lg" aria-label="Settings"><ButtonIcon name="settings" emphasis="icon-only" /></Button>

// On-image — glass / overlay plus DS-token icon button styling
<Button variant="glass" leftIcon={<ButtonIcon name="star" />}>Feature</Button>
<Button variant="overlay" leftIcon={<ButtonIcon name="bookmark" />}>Save</Button>
<Button
  variant="icon"
  size="sm"
  aria-label="Share"
  className="border-[var(--btn-overlay-border)] bg-[var(--btn-overlay-bg)] text-[var(--btn-overlay-text)] backdrop-blur-sm hover:bg-[var(--btn-overlay-bg-hover)] hover:border-[var(--btn-overlay-border)]"
>
  <ButtonIcon name="share" emphasis="icon-only" />
</Button>

// States — loading is active (full opacity), disabled is inactive (dimmed)
<Button loading>Saving…</Button>
<Button variant="secondary" loading>Loading…</Button>
<Button disabled>Disabled</Button>`}>
      <div className="space-y-6">
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Button Icon Standard</h4>
            <p className="text-sm opacity-70">
              Button icons now inherit tokenized DS sizing from the shared Button component. Use ButtonIcon for authored examples; existing Icon children inside Button slots stay aligned with the same sizing rules.
            </p>
          </div>
        </div>
        {/* Primary */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Primary — Filled</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Save changes</Button>
            <Button variant="primary" leftIcon={<ButtonIcon name="add" />}>New project</Button>
            <Button variant="primary" rightIcon={<ButtonIcon name="arrow_forward" />}>Get started</Button>
          </div>
        </div>
        <Divider />
        {/* Secondary */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Secondary — Outlined</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary" leftIcon={<ButtonIcon name="download" />}>Export</Button>
            <Button variant="secondary" rightIcon={<ButtonIcon name="arrow_forward" />}>View all</Button>
          </div>
        </div>
        <Divider />
        {/* Tertiary */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Tertiary — Text only</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="tertiary">Learn more</Button>
            <Button variant="tertiary" leftIcon={<ButtonIcon name="info" />}>Details</Button>
            <Button variant="tertiary" rightIcon={<ButtonIcon name="open_in_new" />}>Open link</Button>
          </div>
        </div>
        <Divider />
        {/* Icon */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Icon Buttons — Tokenized Square Sizes</h4>
          <div className="grid gap-3 sm:grid-cols-3">
            {iconButtonSizes.map(size => (
              <div key={size} className="rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-4">
                <div className="mb-3 text-[11px] font-mono opacity-50">size=&quot;{size}&quot;</div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="icon" size={size} aria-label="Close">
                    <ButtonIcon name="close" buttonSize={size} emphasis="icon-only" />
                  </Button>
                  <Button variant="icon" size={size} aria-label="Share">
                    <ButtonIcon name="share" buttonSize={size} emphasis="icon-only" />
                  </Button>
                  <Button variant="icon" size={size} aria-label="Bookmark">
                    <ButtonIcon name="bookmark" buttonSize={size} emphasis="icon-only" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        {/* Sizes */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Sizes</h4>
          <div className="flex flex-wrap items-end gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button variant="secondary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="secondary" size="lg">Large</Button>
          </div>
          <p className="text-[11px] opacity-40 mt-2">Inline button icons follow <span className="font-mono">--btn-content-icon-size-*</span>; icon-only buttons follow <span className="font-mono">--btn-icon-only-icon-size-*</span>.</p>
        </div>
        <Divider />
        {/* On-image */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">On Image — Glass &amp; Overlay</h4>
          <div className="relative overflow-hidden rounded-xl h-28">
            <Image
              src="/images/portfolio/collaboration/cover.jpg"
              alt="Button on image demo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex flex-wrap gap-2 p-4 h-full items-end">
              <Button variant="glass" size="sm" leftIcon={<ButtonIcon name="star" buttonSize="sm" />}>Feature</Button>
              <Button variant="overlay" size="sm" leftIcon={<ButtonIcon name="bookmark" buttonSize="sm" />}>Save</Button>
              <Button variant="icon" size="sm" aria-label="Share" className="border-[var(--btn-overlay-border)] bg-[var(--btn-overlay-bg)] text-[var(--btn-overlay-text)] backdrop-blur-sm hover:bg-[var(--btn-overlay-bg-hover)] hover:border-[var(--btn-overlay-border)]">
                <ButtonIcon name="share" buttonSize="sm" emphasis="icon-only" />
              </Button>
            </div>
          </div>
          <p className="text-[11px] opacity-40 mt-2">Glass and overlay continue to handle text buttons. Icon-only buttons can use the same DS overlay tokens without raw color values.</p>
        </div>
        <Divider />
        {/* States */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">States</h4>
          <div className="space-y-3">
            <div>
              <p className="text-[11px] opacity-40 mb-2">Loading — active state, full opacity</p>
              <div className="flex flex-wrap gap-3">
                <Button loading>Saving…</Button>
                <Button variant="secondary" loading>Loading…</Button>
                <Button variant="tertiary" loading>Processing…</Button>
                <Button variant="icon" loading aria-label="Refreshing"><ButtonIcon name="refresh" emphasis="icon-only" /></Button>
              </div>
            </div>
            <div>
              <p className="text-[11px] opacity-40 mb-2">Disabled — inactive state, dimmed</p>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="tertiary" disabled>Disabled</Button>
                <Button variant="icon" disabled aria-label="Disabled settings"><ButtonIcon name="settings" emphasis="icon-only" /></Button>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        {/* Special */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Special — Cosmic</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="cosmic">Cosmic</Button>
            <Button variant="cosmic" leftIcon={<ButtonIcon name="auto_awesome" />}>Magic</Button>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function BadgesSection() {
  return (
    <>
    <DemoSection code={`import { Badge } from '@/design-system';

// Semantic state
<Badge variant="default">Default</Badge>
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Critical</Badge>
<Badge variant="info">New</Badge>
<Badge variant="outline">v2.0.1</Badge>

// Visual context
<Badge variant="gradient">Category</Badge>
<Badge variant="glass">On Image</Badge>
<Badge variant="overlay">Attribution</Badge>
<Badge variant="accent">Case Study</Badge>`}>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Semantic State</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Visual Context (on images / overlays)</h4>
          <div className="relative overflow-hidden rounded-xl h-28">
            <Image
              src="/images/portfolio/collaboration/cover.jpg"
              alt="Badge on image demo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 flex flex-wrap gap-2 p-4 h-full items-end">
              <Badge variant="gradient">Category</Badge>
              <Badge variant="glass">On Image</Badge>
              <Badge variant="overlay">Attribution</Badge>
              <Badge variant="accent">Case Study</Badge>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">With Status Dot</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success" dot>Active</Badge>
            <Badge variant="error" dot>Critical</Badge>
            <Badge variant="warning" dot>Pending</Badge>
            <Badge variant="info" dot>New</Badge>
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Sizes</h4>
          <div className="flex flex-wrap items-center gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
          </div>
        </div>
      </div>
    </DemoSection>

    {/* State Colors */}
    <div className="mt-8">
      <h4 className="text-sm font-semibold mb-1">State Colors</h4>
      <p className="text-xs opacity-50 mb-4">Theme-resolved status feedback tokens in three variants: <strong>filled</strong> (coloured bg), <strong>outline</strong> (theme bg, coloured border), <strong>soft</strong> (tinted bg, high-contrast text). Error is wired to <code className="font-mono">--palette-error-40</code>.</p>
      <StateBadgesShowcase />
    </div>

    {/* Project Status Badges */}
    <div className="mt-8">
      <h4 className="text-sm font-semibold mb-1">Project Status</h4>
      <p className="text-xs opacity-50 mb-4">
        Used on portfolio cards to signal work completion. <strong>Accomplished</strong> adds a verified checkmark icon;{' '}
        <strong>In Progress</strong> uses a pulsing dot; <strong>Coming Soon</strong> uses the info variant.
        All colours resolve through <code className="font-mono">--color-success/warning/info-*</code> tokens.
      </p>
      <div className="flex flex-wrap gap-3 p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)]">
        {/* Accomplished */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border"
          style={{
            color: 'var(--color-success)',
            backgroundColor: 'var(--color-success-bg)',
            borderColor: 'var(--color-success-border)',
            boxShadow: '0 0 14px var(--color-success-bg)',
          }}
        >
          <span className="material-symbols !text-[11px]" aria-hidden="true">verified</span>
          Accomplished
        </span>
        {/* In Progress */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border"
          style={{
            color: 'var(--color-warning)',
            backgroundColor: 'var(--color-warning-bg)',
            borderColor: 'var(--color-warning-border)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block animate-pulse shrink-0"
            style={{ background: 'var(--color-warning)' }}
          />
          In Progress
        </span>
        {/* Coming Soon */}
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border"
          style={{
            color: 'var(--color-info)',
            backgroundColor: 'var(--color-info-bg)',
            borderColor: 'var(--color-info-border)',
          }}
        >
          <span className="material-symbols !text-[11px]" aria-hidden="true">schedule</span>
          Coming Soon
        </span>
      </div>
    </div>
    </>
  );
}

function InputsSection() {
  const [value, setValue] = useState('');
  return (
    <DemoSection code={`import { Input } from '@/design-system';

<Input label="Email" placeholder="you@example.com" />
<Input label="Search" leftIcon={<Icon name="search" />} />
<Input error="This field is required" label="Name" />
<Input helperText="We'll never share your email" label="Email" />`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        <Input label="Email" placeholder="you@example.com" type="email" />
        <Input
          label="Search"
          placeholder="Search..."
          leftIcon={<span className="material-symbols text-[18px]">search</span>}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          rightIcon={<span className="material-symbols text-[18px]">visibility</span>}
        />
        <Input
          label="Name"
          placeholder="Enter name"
          error="This field is required"
        />
        <Input
          label="With helper"
          placeholder="you@example.com"
          helperText="We'll never share your email"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Input
          label="Disabled"
          placeholder="Can't edit this"
          disabled
        />
      </div>
    </DemoSection>
  );
}

function TogglesSection() {
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(true);
  return (
    <DemoSection code={`import { Toggle } from '@/design-system';

<Toggle checked={enabled} onChange={setEnabled} label="Notifications" />
<Toggle checked={false} onChange={() => {}} label="Disabled" disabled />
<Toggle checked={true} onChange={() => {}} size="sm" label="Small" />`}>
      <div className="flex flex-col gap-3">
        <Toggle checked={t1} onChange={setT1} label="Enable notifications" />
        <Toggle checked={t2} onChange={setT2} label="Dark mode" />
        <Toggle checked={t3} onChange={setT3} label="Auto-save" size="sm" />
        <Toggle checked={false} onChange={() => {}} label="Disabled toggle" disabled />
      </div>
    </DemoSection>
  );
}

function AvatarsSection() {
  return (
    <DemoSection code={`import { Avatar } from '@/design-system';

<Avatar initials="AZ" size="lg" status="online" />
<Avatar initials="JD" size="md" />
<Avatar size="sm" />  // icon fallback`}>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Sizes</h4>
          <div className="flex items-end gap-4">
            <Avatar initials="SM" size="sm" />
            <Avatar initials="MD" size="md" />
            <Avatar initials="LG" size="lg" />
            <Avatar initials="XL" size="xl" />
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Fallbacks</h4>
          <div className="flex items-center gap-4">
            <Avatar initials="AZ" size="lg" />
            <Avatar size="lg" />
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">With Status</h4>
          <div className="flex items-center gap-4">
            <Avatar initials="ON" size="lg" status="online" />
            <Avatar initials="AW" size="lg" status="away" />
            <Avatar initials="OF" size="lg" status="offline" />
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function LogoSection() {
  const sizeLabelPairs = [
    { size: 'sm' as const, label: 'none' as const },
    { size: 'sm' as const, label: 'brand' as const },
    { size: 'md' as const, label: 'none' as const },
    { size: 'md' as const, label: 'brand' as const },
    { size: 'lg' as const, label: 'none' as const },
    { size: 'lg' as const, label: 'brand' as const },
    { size: 'xl' as const, label: 'none' as const },
    { size: 'xl' as const, label: 'brand' as const },
  ];

  return (
    <DemoSection code={`import { BrandLogo } from '@/design-system';

<BrandLogo size="sm" label="none" />
  <BrandLogo size="sm" label="brand" />
  <BrandLogo size="md" label="none" />
  <BrandLogo size="md" label="brand" />
<BrandLogo size="lg" label="none" />
  <BrandLogo size="lg" label="brand" />
  <BrandLogo size="xl" label="none" />
<BrandLogo size="xl" label="brand" />
<BrandLogo size="xl" label="signature" />`}>
      <div className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
            <h4 className="text-sm font-semibold mb-2">Shared Identity Primitive</h4>
            <p className="text-sm opacity-70">
              The logo component now renders the uploaded mark and full lockup directly, while preserving shared DS sizing and tone behavior.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
            <h4 className="text-sm font-semibold mb-2">Label Strategy</h4>
            <p className="text-sm opacity-70">
              Use `label=&quot;none&quot;` where the mark needs to sit inside compact surfaces. Use `label=&quot;brand&quot;` where the full logo should carry the placement on its own.
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">All Sizes / Brand And Mark</h4>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {sizeLabelPairs.map(({ size, label }) => (
              <div key={`${size}-${label}`} className="rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5">
                <div className="text-[11px] font-mono opacity-45">size=&quot;{size}&quot; label=&quot;{label}&quot;</div>
                <div className="mt-2 text-xs opacity-55">{label === 'none' ? 'Mark only' : 'Brand lockup'}</div>
                <div className="mt-6 flex min-h-24 items-center">
                  <BrandLogo size={size} tone="primary" label={label} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Signature Variant</h4>
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
            <div className="text-[11px] font-mono opacity-45">size=&quot;xl&quot; label=&quot;signature&quot;</div>
            <div className="mt-2 text-xs opacity-55">Extended authored lockup for personal identity placements.</div>
            <div className="mt-6 flex min-h-24 items-center">
              <BrandLogo size="xl" tone="primary" label="signature" />
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Theme-Resolved Tones</h4>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5">
              <div className="text-[11px] font-mono opacity-45 mb-4">tone=&quot;primary&quot;</div>
              <BrandLogo size="lg" tone="primary" label="brand" />
            </div>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5">
              <div className="text-[11px] font-mono opacity-45 mb-4">tone=&quot;accent&quot;</div>
              <BrandLogo size="lg" tone="accent" label="brand" />
            </div>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5">
              <div className="text-[11px] font-mono opacity-45 mb-4">tone=&quot;foreground&quot;</div>
              <BrandLogo size="lg" tone="foreground" label="brand" />
            </div>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function DividersSection() {
  return (
    <DemoSection code={`import { Divider } from '@/design-system';

<Divider />
<Divider label="Or continue with" />

// Vertical (inside a flex row)
<div className="flex items-center gap-4 h-10">
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`}>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Horizontal</h4>
          <Divider />
        </div>
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">With Label</h4>
          <Divider label="Or continue with" />
        </div>
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Vertical</h4>
          <div className="flex items-center gap-4 h-10">
            <span className="text-sm opacity-70">Section A</span>
            <Divider orientation="vertical" />
            <span className="text-sm opacity-70">Section B</span>
            <Divider orientation="vertical" />
            <span className="text-sm opacity-70">Section C</span>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function TooltipsSection() {
  return (
    <DemoSection code={`import { Tooltip } from '@/design-system';

<Tooltip text="I appear on hover">
  <button>Hover me</button>
</Tooltip>`}>
      <div>
        <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-4">Hover over each button</h4>
        <div className="flex flex-wrap gap-4">
          {['Top tooltip', 'Another tooltip', 'With longer text that wraps nicely', 'Quick tip'].map(text => (
            <Tooltip key={text} text={text}>
              <button className="px-4 py-2 text-sm rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                {text.split(' ').slice(0, 2).join(' ')}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </DemoSection>
  );
}

function CardsSurfaceSection() {
  return (
    <DemoSection code={`import { Card, SurfaceCard, CardContent } from '@/design-system';
// DS shell — elevation levels: flat | raised (default) | floating

<Card elevation="raised">
  <p className="p-4">Standard raised card</p>
</Card>

<Card elevation="floating" glow="primary">
  <p className="p-4">Floating card with primary glow</p>
</Card>

// SurfaceCard — motion wrapper with theme variants
import { SurfaceCard } from '@/design-system';
<SurfaceCard variant="primary">...</SurfaceCard>`}>
      <div className="space-y-6">
        {/* DS shell — elevation levels */}
        <div>
          <p className="text-xs font-mono opacity-50 mb-3">Card (DS shell) — elevation</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['flat', 'raised', 'floating'] as const).map(elevation => (
              <Card key={elevation} elevation={elevation} glow="primary">
                <div className="p-4">
                  <p className="text-sm font-semibold mb-1">{elevation}</p>
                  <p className="text-xs opacity-60">elevation=&quot;{elevation}&quot;</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        {/* SurfaceCard — theme variant colours */}
        <div>
          <p className="text-xs font-mono opacity-50 mb-3">SurfaceCard — variant colours</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(['primary', 'secondary', 'tertiary', 'muted'] as const).map(variant => (
              <SurfaceCard key={variant} variant={variant}>
                <CardContent title={variant} subtitle="Card variant">
                  <p className="text-sm opacity-70">
                    variant=&quot;{variant}&quot;
                  </p>
                </CardContent>
              </SurfaceCard>
            ))}
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function CardsTimelineSection() {
  const { theme } = useTheme();
  const phaseTimeline = [
    {
      step: '01',
      title: 'Concept',
      icon: 'lightbulb',
      body: 'Frame the player fantasy, audience, and launch strategy before writing production requirements.',
    },
    {
      step: '02',
      title: 'Prototype',
      icon: 'science',
      body: 'Validate the core loop with fast feedback and surface the interaction risks early.',
    },
    {
      step: '03',
      title: 'Launch',
      icon: 'rocket_launch',
      body: 'Carry the same marker treatment into rollout planning, KPI tracking, and live-ops checkpoints.',
    },
  ] as const;
  const railStyle = {
    backgroundImage:
      'linear-gradient(to bottom, color-mix(in srgb, var(--primary) 30%, transparent) 0%, color-mix(in srgb, var(--primary) 14%, transparent) 72%, transparent 100%)',
  } satisfies React.CSSProperties;

  return (
    <div className="space-y-6">
      <p className="text-sm opacity-60">
        Animated entry cards with floating particles and phase markers. The same tokenized surface treatment now anchors the Game Strategy timeline as well.
      </p>
      <DemoSection code={`import { TimelineCard } from '@/design-system';

<TimelineCard
  theme="${theme}"
  iconName="rocket_launch"
  title="Product Designer"
  date="2023 — Present"
  location="Helsinki, Finland"
  description="Product vision and design system ownership."
/>`}>
        <div className="max-w-xs mx-auto">
          <TimelineCard
            theme={theme}
            iconName="rocket_launch"
            title="Product Designer"
            date="2023 — Present"
            location="Helsinki, Finland"
            description="Product vision, design system ownership, and developer handoff."
          />
        </div>
      </DemoSection>

      <DemoSection code={`const phases = [
  { step: '01', title: 'Concept', icon: 'lightbulb' },
  { step: '02', title: 'Prototype', icon: 'science' },
  { step: '03', title: 'Launch', icon: 'rocket_launch' },
];

<div className="relative">
  {phases.map((phase) => (
    <article key={phase.step} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)]">
      <IconSurface name={phase.icon} surfaceSize="md" surfaceTone="primary" />
    </article>
  ))}
</div>`}>
        <div className="rounded-[1.75rem] border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
          <div className="mb-5">
            <h4 className="text-sm font-semibold">Phase Timeline</h4>
            <p className="mt-1 text-sm opacity-65">
              Use IconSurface markers to keep roadmap and milestone timelines aligned with the rest of the DS.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 hidden w-px md:block" style={railStyle} />
            <div className="space-y-4">
              {phaseTimeline.map((phase) => (
                <article key={phase.step} className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--background)]/55 p-5 md:ml-16">
                  <div className="absolute -left-[4.9rem] top-4 hidden md:flex flex-col items-center gap-2">
                    <IconSurface
                      name={phase.icon}
                      surfaceSize="md"
                      surfaceTone="primary"
                      className="shadow-[0_18px_34px_-24px_color-mix(in_srgb,var(--primary)_70%,transparent)]"
                    />
                    <span className="rounded-full border border-[color:color-mix(in_srgb,var(--primary)_20%,var(--card-border))] bg-[color:color-mix(in_srgb,var(--primary)_9%,transparent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                      {phase.step}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="md:hidden flex items-center gap-2 pt-0.5">
                      <IconSurface
                        name={phase.icon}
                        surfaceSize="sm"
                        surfaceTone="primary"
                        className="shadow-[0_16px_28px_-24px_color-mix(in_srgb,var(--primary)_70%,transparent)]"
                      />
                      <span className="rounded-full border border-[color:color-mix(in_srgb,var(--primary)_20%,var(--card-border))] bg-[color:color-mix(in_srgb,var(--primary)_9%,transparent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                        {phase.step}
                      </span>
                    </div>
                    <div>
                      <h5 className="text-base font-semibold text-[var(--foreground)]">{phase.title}</h5>
                      <p className="mt-2 text-sm leading-relaxed opacity-75">{phase.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </DemoSection>
    </div>
  );
}

function CardsMediaSection() {
  return (
    <div className="space-y-4">
      <p className="text-sm opacity-60">
        Image-first cards with three layout variants. Use the same source that powers the Sharpened by the Machine blog entry to verify the crop stays full-bleed across card layouts.
      </p>
      <DemoSection code={`import { MediaCard } from '@/design-system';

<MediaCard
  variant="basic"
  title="Sharpened by the Machine"
  description="Human-vs-machine framing image used in the live blog article."
  imagePath="/images/blog/AI/female-ai.jpg"
  tags={['AI', 'Editorial']}
/>
// variant="overlay"  — text overlaid on image
// variant="horizontal" — image left, content right`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['basic', 'overlay', 'horizontal'] as const).map(v => (
            <MediaCard
              key={v}
              variant={v}
              title="Sharpened by the Machine"
              description="Shared image framing for the editorial card variants."
              imagePath="/images/blog/AI/female-ai.jpg"
              tags={['AI', v === 'overlay' ? 'Overlay' : v === 'horizontal' ? 'Horizontal' : 'Standard']}
            />
          ))}
        </div>
      </DemoSection>
    </div>
  );
}

function CardsContentSection() {
  const statItems = [
    { years: '10', title: 'Product Design',      icon: 'palette' },
    { years: '8',  title: 'Product Management',  icon: 'group' },
    { years: '8',  title: 'UX Research',         icon: 'psychology' },
    { years: '5',  title: 'Frontend Dev',        icon: 'code' },
  ];

  const skillItems = [
    { title: 'Team Leadership',      desc: 'Leading cross-functional teams',                icon: 'groups' },
    { title: 'Product Strategy',     desc: 'Strategic planning and roadmapping',            icon: 'lightbulb' },
    { title: 'Design & Prototyping', desc: 'Figma, Adobe CC, Design Systems',              icon: 'palette' },
    { title: 'User Research',        desc: 'Research and test management',                 icon: 'science' },
    { title: 'Development',          desc: 'React, WordPress, HubSpot',                   icon: 'code' },
  ];

  const domainItems = [
    {
      label: 'BlogCard',
      icon: 'article',
      desc: 'Article card with featured/standard/overlay view modes, tags, and read-time.',
      href: '/blog',
      importLine: "import { BlogCard } from '@/design-system';",
      prop: 'viewMode="standard | overlay | featured"',
    },
    {
      label: 'StatusCard',
      icon: 'dashboard',
      desc: 'Status and system cards for published, archived, or upcoming states with semantic accents.',
      href: '/design',
      importLine: "import { StatusCard } from '@/design-system';",
      prop: 'displayState="published | archived | coming-soon"',
    },
    {
      label: 'AudioCard',
      icon: 'headphones',
      desc: 'Podcast/audio episode card with cover image, category, and language badges.',
      href: '/podcast',
      importLine: "import { AudioCard } from '@/design-system';",
      prop: 'variant="grid | list"',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Stat cards */}
      <div>
        <p className="text-xs font-mono opacity-50 mb-3">Stat Cards — years of experience with hover accent line</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statItems.map((item, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl border bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--primary)]/40 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--primary)]/5" />
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-[var(--primary)]/20">
                <Icon name={item.icon} size="lg" className="text-[var(--accent-text)]" />
              </div>
              <div className="text-4xl font-bold leading-none bg-gradient-to-r bg-clip-text text-transparent from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] mb-2">
                {item.years}
                <span className="text-base ml-1 text-[var(--muted-foreground)]">yrs</span>
              </div>
              <div className="text-sm font-semibold leading-tight text-foreground">{item.title}</div>
              <div className="absolute bottom-0 left-[15%] right-[15%] h-px scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 bg-[var(--primary)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Skill cards */}
      <div>
        <p className="text-xs font-mono opacity-50 mb-3">Skill Cards — feature grid with icon badge and hover accent</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden p-6 rounded-xl border bg-[var(--card-from-bg)] border-[var(--card-border)] hover:border-[var(--primary)]/40 transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[var(--primary)]/5" />
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20 transition-colors duration-300">
                <Icon name={item.icon} size="lg" className="text-[var(--accent-text)]" />
              </div>
              <div className="relative z-10">
                <h4 className="text-base font-semibold mb-1 leading-tight text-foreground">{item.title}</h4>
                <p className="text-xs leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
              </div>
              <div className="absolute bottom-0 left-[15%] right-[15%] h-px scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 bg-[var(--primary)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Page-specific domain cards */}
      <div>
        <p className="text-xs font-mono opacity-50 mb-3">
          Page-Specific Domain Cards — rich localized schemas from{' '}
          <code className="bg-foreground/8 px-1 rounded">@/design-system</code>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {domainItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="theme-card-flex p-5 rounded-xl hover:border-primary/40 transition-colors group"
            >
              <span className="material-symbols text-2xl text-primary/60 group-hover:text-primary mb-3 block">
                {item.icon}
              </span>
              <h4 className="font-semibold text-sm font-mono mb-1">{item.label}</h4>
              <p className="text-xs opacity-60 leading-relaxed mb-3">{item.desc}</p>
              <code className="text-[10px] px-1.5 py-0.5 rounded bg-foreground/8 font-mono block truncate opacity-70 mb-1">
                {item.importLine}
              </code>
              <code className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono block truncate">
                {item.prop}
              </code>
              <span className="text-xs text-primary mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View live examples{' '}
                <span className="material-symbols text-sm">arrow_forward</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuotesSection() {
  return (
    <DemoSection code={`import { QuoteBlock } from '@/design-system';

<QuoteBlock
  quote="Design is thinking made visual."
  author="Saul Bass"
  variant="default"
/>`}>
      <div className="space-y-4">
        <QuoteBlock quote="Design is thinking made visual." author="Saul Bass" variant="default" />
        <QuoteBlock quote="Good design is obvious. Great design is transparent." author="Joe Sparano" variant="simple" />
        <QuoteBlock quote="Simplicity is the ultimate sophistication." author="Leonardo da Vinci" variant="minimal" />
      </div>
    </DemoSection>
  );
}

function TestimonialsSection() {
  const samples = [
    {
      text: "Ali is a creative product designer. He has this cunning ability to solve complex problem with simple solutions using his design skills. His arts speaks visually, does the job perfectly and leaves a long lasting impression.",
      name: "Fahad M",
      position: "IT Contractor | Travelodge Hotels Limited",
      initials: "FM",
      highlights: ["creative product designer", "solve complex problem with simple solutions", "long lasting impression"],
    },
    {
      text: "Ali is an exceptional and experienced UI/UX designer with more than ten years of professional experience. He always delivers on time and on budget.",
      name: "Constantin Buda",
      position: "CMO at Vidalico Digital",
      initials: "CB",
      highlights: ["exceptional and experienced", "more than ten years", "delivers on time and on budget"],
    },
  ];
  return (
    <DemoSection code={`import { TestimonialCarousel } from '@/design-system';

<TestimonialCarousel testimonials={[
  { text: "...", name: "Fahad M", position: "IT Contractor", highlights: ["creative"] }
]} />`}>
      <div className="py-4 space-y-4">
        <p className="text-sm opacity-60">
          Testimonial selectors keep the same avatar shape, avatar size, and name size. Selection is expressed with opacity only.
        </p>
        <TestimonialCarousel testimonials={samples} autoPlayInterval={5000} />
      </div>
    </DemoSection>
  );
}

function IconsSection() {
  const { theme } = useTheme();
  const iconGroups = [
    {
      label: 'Navigation',
      icons: ['home', 'menu', 'close', 'arrow_back', 'arrow_forward', 'arrow_upward', 'expand_more', 'expand_less', 'chevron_right'],
    },
    {
      label: 'Actions',
      icons: ['search', 'settings', 'edit', 'delete_sweep', 'download', 'upload', 'share', 'link', 'add_circle'],
    },
    {
      label: 'Content',
      icons: ['article', 'description', 'folder', 'code', 'language', 'lightbulb', 'format_quote', 'bookmark'],
    },
    {
      label: 'Status',
      icons: ['check_circle', 'error', 'info', 'visibility', 'schedule', 'star', 'favorite', 'verified'],
    },
    {
      label: 'People & Social',
      icons: ['person', 'groups', 'account_circle', 'forum', 'chat', 'notifications_active', 'handshake'],
    },
    {
      label: 'Design & Dev',
      icons: ['palette', 'design_services', 'animation', 'dark_mode', 'light_mode', 'devices', 'smart_toy', 'rocket_launch'],
    },
  ];

  const sizeScale = [
    { token: 'xs', preview: 'xs' },
    { token: 'sm', preview: 'sm' },
    { token: 'md', preview: 'md' },
    { token: 'lg', preview: 'lg' },
    { token: 'xl', preview: 'xl' },
    { token: '2xl', preview: '2xl' },
    { token: 'display', preview: 'display' },
  ] as const;

  const surfaceScale = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const toneScale = ['default', 'muted', 'primary', 'accent', 'inverse'] as const;
  const surfaceTones = ['neutral', 'primary', 'accent', 'inverse'] as const;
  const themeIcons = [
    { themeKey: 'light', label: 'Light', icon: 'light_mode' },
    { themeKey: 'dark', label: 'Dark', icon: 'dark_mode' },
    { themeKey: 'colorful', label: 'Colorful', icon: 'palette' },
  ] as const;

  return (
    <DemoSection code={`import { Icon, IconSurface } from '@/design-system';

<Icon name="home" size="md" tone="primary" />
<Icon name="light_mode" size="lg" tone="accent" variant="filled" />
<IconSurface name="palette" surfaceSize="md" surfaceTone="primary" />
<IconSurface name="dark_mode" surfaceSize="sm" surfaceTone="inverse" shape="circle" />`}>
      <div className="space-y-8">
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Shared Icon Standard</h4>
              <p className="max-w-2xl text-sm opacity-70">
                Material Symbols now scale through semantic size tokens, and boxed icons can inherit theme-resolved tones through the shared IconSurface primitive.
              </p>
            </div>
            <Badge variant="glass">Current theme: {theme}</Badge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] opacity-45">Sizing</div>
              <p className="text-sm opacity-70">Use size tokens so Material Symbols keeps the correct optical size at each scale.</p>
            </div>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] opacity-45">Surface Ratio</div>
              <p className="text-sm opacity-70">Use IconSurface when the icon sits inside a chip, card badge, CTA bubble, or stat tile.</p>
            </div>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] opacity-45">Theme Tones</div>
              <p className="text-sm opacity-70">Primary and accent tones resolve through the active theme, not hard-coded colors.</p>
            </div>
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-4">
              <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] opacity-45">Accessibility</div>
              <p className="text-sm opacity-70">Decorative icons stay aria-hidden by default; standalone icons can expose a label.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold">Semantic Size Scale</h4>
                <p className="text-sm opacity-65">Use tokens instead of raw text classes for consistent glyph proportions.</p>
              </div>
              <Icon name="photo_size_select_large" tone="muted" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {sizeScale.map(({ token, preview }) => (
                <div key={token} className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-4 text-center">
                  <div className="flex min-h-16 items-center justify-center">
                    <Icon name="stack_star" size={token} tone="primary" />
                  </div>
                  <div className="mt-2 text-sm font-medium">{preview}</div>
                  <div className="text-xs font-mono opacity-55">size=&quot;{token}&quot;</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold">Icon Surface Scale</h4>
                <p className="text-sm opacity-65">Use tokenized boxes when the icon needs balanced padding inside a background.</p>
              </div>
              <Icon name="crop_square" tone="muted" />
            </div>
            <div className="flex flex-wrap gap-3">
              {surfaceScale.map(scale => (
                <div key={scale} className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-4 py-4 text-center">
                  <div className="flex items-center justify-center">
                    <IconSurface name="token" surfaceSize={scale} surfaceTone="primary" />
                  </div>
                  <div className="mt-3 text-xs font-mono opacity-60">surfaceSize=&quot;{scale}&quot;</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold">Theme-Resolved Tones</h4>
                <p className="text-sm opacity-65">These tones follow the active theme through semantic tokens.</p>
              </div>
              <Icon name="colors" tone="accent" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {toneScale.map(tone => (
                <div key={tone} className={`rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-4 text-center ${tone === 'inverse' ? 'bg-[var(--primary)] border-transparent' : ''}`}>
                  <div className="flex items-center justify-center gap-3">
                    <Icon name="contrast" tone={tone} size="lg" />
                    <Icon name="contrast" tone={tone} variant="filled" size="lg" />
                  </div>
                  <div className={`mt-3 text-xs font-mono ${tone === 'inverse' ? 'text-[var(--text-on-primary)]/80' : 'opacity-60'}`}>tone=&quot;{tone}&quot;</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold">Theme Icons</h4>
                <p className="text-sm opacity-65">Use system icons that match the active theme state without hard-coding color values.</p>
              </div>
              <Icon name="routine" tone="muted" />
            </div>
            <div className="space-y-3">
              {themeIcons.map(item => {
                const isActive = item.themeKey === theme;
                return (
                  <div key={item.themeKey} className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${isActive ? 'border-[var(--primary)] bg-[var(--primary)]/10' : 'border-[var(--card-border)] bg-[var(--background)]'}`}>
                    <div className="flex items-center gap-3">
                      <IconSurface
                        name={item.icon}
                        surfaceSize="sm"
                        surfaceTone={isActive ? 'primary' : 'neutral'}
                        shape="circle"
                        tone={isActive ? 'inverse' : 'default'}
                      />
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs opacity-60">{isActive ? 'Current theme token family' : 'Available theme mode icon'}</div>
                      </div>
                    </div>
                    {isActive && <Badge variant="accent">Active</Badge>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-from-bg)] p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold">Boxed Icon Tones</h4>
              <p className="text-sm opacity-65">Use surface tones when icons need a background, not ad hoc width, height, and text-size utilities.</p>
            </div>
            <Icon name="deployed_code" tone="muted" />
          </div>
          <div className="flex flex-wrap gap-3">
            {surfaceTones.map(surfaceTone => (
              <div key={surfaceTone} className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-4 py-4 text-center">
                <div className="flex items-center justify-center">
                  <IconSurface name="apps" surfaceSize="md" surfaceTone={surfaceTone} />
                </div>
                <div className="mt-3 text-xs font-mono opacity-60">surfaceTone=&quot;{surfaceTone}&quot;</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
        {iconGroups.map(group => (
          <div key={group.label}>
            <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">{group.label}</h4>
            <div className="flex flex-wrap gap-3">
              {group.icons.map(name => (
                <Tooltip key={name} text={name}>
                  <div className="cursor-default">
                    <IconSurface name={name} surfaceSize="sm" surfaceTone="neutral" className="transition-colors hover:[background-color:color-mix(in_srgb,var(--primary)_14%,transparent)] hover:[border-color:color-mix(in_srgb,var(--primary)_22%,transparent)]" />
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </DemoSection>
  );
}

function AnimationsSection() {
  return (
    <DemoSection code={`import { delaySeconds } from '@/design-system';
import AnimatedSection from '@/components/AnimatedSection';

<AnimatedSection animation="slide-up" delay={delaySeconds.sm}>
  <div>Content slides up on scroll</div>
</AnimatedSection>`}>
      <div className="mb-4 text-sm opacity-70">
        Approved reveal patterns: fade-in, slide-up, and slide-down. Use these for content entering the viewport; avoid decorative
        looping background motion outside hero sections.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['fade-in', 'slide-up', 'slide-down'] as const).map((anim, i) => (
          <AnimatedSection key={anim} animation={anim} delay={i * delaySeconds.xs} once={false}>
            <div className="rounded-[var(--radius-lg)] border border-card-border bg-background-secondary p-6 text-center shadow-card">
              <span className="text-sm font-mono opacity-60">{anim}</span>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </DemoSection>
  );
}

function CodeSnippetSection() {
  return (
    <DemoSection code={`import CodeSnippet from '@/components/CodeSnippet';

<CodeSnippet
  code="const greeting = 'Hello, World!';"
  language="javascript"
/>`}>
      <div className="space-y-4">
        <CodeSnippet
          code={`import { palette, semantic, transition } from '@/design-system';

// Use tokens in Framer Motion
const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: transition.enter,
};`}
          language="typescript"
        />
      </div>
    </DemoSection>
  );
}

function ChapterDividerSection() {
  return (
    <DemoSection code={`import { ChapterDivider } from '@/design-system';

<ChapterDivider title="Getting Started" number={1} />
<ChapterDivider title="Architecture" icon="architecture" />`}>
      <div className="space-y-6">
        <ChapterDivider title="Getting Started" number={1} />
        <p className="text-sm opacity-60 pl-4">Section content would go here...</p>
        <ChapterDivider title="Architecture" icon="architecture" />
        <p className="text-sm opacity-60 pl-4">More content...</p>
      </div>
    </DemoSection>
  );
}

function DoubleDiamondSection() {
  const phases = [
    {
      title: 'Discover',
      icon: 'search',
      body: 'Research user needs, accessibility challenges, and current limitations in design systems.',
      surface: 'linear-gradient(180deg, color-mix(in srgb, var(--primary) 12%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 92%, transparent) 100%)',
      iconSurface: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-500) 100%)',
    },
    {
      title: 'Define',
      icon: 'target',
      body: 'Synthesize insights into clear accessibility requirements and design principles.',
      surface: 'linear-gradient(180deg, color-mix(in srgb, var(--gradient-start) 14%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 92%, transparent) 100%)',
      iconSurface: 'linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-mid) 100%)',
    },
    {
      title: 'Develop',
      icon: 'build',
      body: 'Create accessible components, test with users, and iterate based on feedback.',
      surface: 'linear-gradient(180deg, color-mix(in srgb, var(--gradient-mid) 14%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 92%, transparent) 100%)',
      iconSurface: 'linear-gradient(135deg, var(--gradient-mid) 0%, var(--gradient-end) 100%)',
    },
    {
      title: 'Deliver',
      icon: 'rocket_launch',
      body: 'Launch the design system with documentation, training, and handoff support.',
      surface: 'linear-gradient(180deg, color-mix(in srgb, var(--gradient-end) 14%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 92%, transparent) 100%)',
      iconSurface: 'linear-gradient(135deg, var(--gradient-end) 0%, var(--primary) 100%)',
    },
  ];

  return (
    <DemoSection code={`const phases = [
  { title: 'Discover', icon: 'search' },
  { title: 'Define', icon: 'target' },
  { title: 'Develop', icon: 'build' },
  { title: 'Deliver', icon: 'rocket_launch' },
];

<div className="rounded-[1.75rem] border border-[var(--card-border)] bg-[var(--background)]/30 p-5">
  {phases.map((phase) => (
    <article key={phase.title} className="rounded-2xl border border-[var(--card-border)]">
      <Icon name={phase.icon} size="lg" />
    </article>
  ))}
</div>`}>
      <div className="rounded-[1.75rem] border border-[var(--card-border)] bg-[var(--background)]/30 p-5">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border bg-[var(--card-from-bg)] border-[var(--card-border)]">
            <span className="text-xs font-medium text-[var(--primary)]">Problem Discovery</span>
            <div className="w-px h-4 bg-[var(--card-border)]"></div>
            <span className="text-xs font-medium text-[var(--primary)]">Solution Creation</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
          {phases.map((phase, index) => (
            <article
              key={phase.title}
              className="group relative rounded-2xl border border-[var(--card-border)] p-5 transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundImage: phase.surface }}
            >
              <div className={`mb-4 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
                  style={{ backgroundImage: phase.iconSurface, boxShadow: '0 12px 28px -18px color-mix(in srgb, var(--primary) 45%, transparent)' }}
                >
                  <Icon name={phase.icon} size="lg" className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">{phase.title}</h3>
              <p className="text-sm leading-relaxed opacity-80 text-[var(--foreground)]">{phase.body}</p>
              {index < phases.length - 1 ? (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-gradient-to-r from-[var(--primary)] to-transparent opacity-30">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--primary)]"></div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </DemoSection>
  );
}

function SelectSection() {
  const [selected, setSelected] = useState('');
  const options = [
    { value: 'react', label: 'React' },
    { value: 'next', label: 'Next.js' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];
  return (
    <DemoSection code={`import { Select } from '@/design-system';

<Select
  label="Framework"
  placeholder="Choose a framework"
  options={[
    { value: 'react', label: 'React' },
    { value: 'next', label: 'Next.js' },
  ]}
  value={selected}
  onChange={setSelected}
/>
<Select label="With error" error="Selection required" options={options} />
<Select label="Disabled" disabled options={options} />`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <Select
          label="Framework"
          placeholder="Choose a framework"
          options={options}
          value={selected}
          onChange={setSelected}
        />
        <Select
          label="With error"
          placeholder="Select..."
          options={options}
          error="This field is required"
        />
        <Select
          label="Disabled"
          placeholder="Can't select"
          options={options}
          disabled
        />
      </div>
    </DemoSection>
  );
}

function ModalSection() {
  const [openSm, setOpenSm] = useState(false);
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  return (
    <DemoSection code={`import { Modal } from '@/design-system';

<Modal open={isOpen} onClose={() => setOpen(false)} title="Dialog Title" size="md">
  <p>Modal content goes here.</p>
</Modal>`}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm" onClick={() => setOpenSm(true)}>Open Small</Button>
          <Button variant="secondary" size="sm" onClick={() => setOpenMd(true)}>Open Medium</Button>
          <Button variant="outline" size="sm" onClick={() => setOpenLg(true)}>Open Large</Button>
        </div>
        <Modal open={openSm} onClose={() => setOpenSm(false)} title="Small Dialog" size="sm">
          <p className="text-sm opacity-70">This is a small modal. Press Escape or click the backdrop to close.</p>
        </Modal>
        <Modal open={openMd} onClose={() => setOpenMd(false)} title="Medium Dialog" size="md">
          <p className="text-sm opacity-70">This is the default medium-sized modal with focus trapping and keyboard dismissal.</p>
        </Modal>
        <Modal open={openLg} onClose={() => setOpenLg(false)} title="Large Dialog" size="lg">
          <p className="text-sm opacity-70">A larger modal for content-heavy dialogs. Supports all three themes automatically.</p>
        </Modal>
      </div>
    </DemoSection>
  );
}

function TabsSection() {
  return (
    <DemoSection code={`import { Tabs } from '@/design-system';

<Tabs tabs={[
  { key: 'overview', label: 'Overview', content: <p>Overview content</p> },
  { key: 'specs', label: 'Specs', content: <p>Specs content</p> },
  { key: 'reviews', label: 'Reviews', content: <p>Reviews content</p> },
]} />`}>
      <Tabs tabs={[
        { key: 'overview', label: 'Overview', content: <p className="text-sm opacity-70">Overview tab content. Navigate between tabs using arrow keys.</p> },
        { key: 'features', label: 'Features', content: <p className="text-sm opacity-70">Features tab content with full keyboard support (Arrow Left/Right, Home, End).</p> },
        { key: 'pricing', label: 'Pricing', content: <p className="text-sm opacity-70">Pricing tab content. Each tab panel is properly associated with its tab via ARIA attributes.</p> },
      ]} />
    </DemoSection>
  );
}

function AlertsSection() {
  return (
    <DemoSection code={`import { Alert } from '@/design-system';

<Alert variant="info" title="Info">Informational message.</Alert>
<Alert variant="success" title="Success">Operation completed.</Alert>
<Alert variant="warning" title="Warning">Proceed with caution.</Alert>
<Alert variant="error" title="Error" dismissible>Something went wrong.</Alert>`}>
      <div className="space-y-3 max-w-2xl">
        <Alert variant="info" title="Information">This is an informational alert using semantic state tokens.</Alert>
        <Alert variant="success" title="Success">Operation completed successfully. All changes have been saved.</Alert>
        <Alert variant="warning" title="Warning">Your session will expire in 5 minutes. Please save your work.</Alert>
        <Alert variant="error" title="Error" dismissible>Something went wrong. Please try again or contact support.</Alert>
      </div>
    </DemoSection>
  );
}

function SkeletonSection() {
  return (
    <DemoSection code={`import { Skeleton } from '@/design-system';

<Skeleton variant="text" lines={3} />
<Skeleton variant="circular" width={48} />
<Skeleton variant="rectangular" height={120} />`}>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Text Lines</h4>
          <div className="max-w-md">
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Circular</h4>
          <div className="flex gap-4">
            <Skeleton variant="circular" width={32} />
            <Skeleton variant="circular" width={48} />
            <Skeleton variant="circular" width={64} />
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Rectangular</h4>
          <Skeleton variant="rectangular" height={100} />
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Card Placeholder</h4>
          <div className="flex gap-4 items-start">
            <Skeleton variant="circular" width={48} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" lines={2} />
            </div>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function ProgressSection() {
  return (
    <DemoSection code={`import { Progress } from '@/design-system';

// Linear
<Progress value={65} label="Upload" showValue />

// Circular
<Progress value={75} variant="circular" size="lg" showValue />`}>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Linear</h4>
          <div className="space-y-4 max-w-md">
            <Progress value={25} size="sm" label="Basic (sm)" showValue />
            <Progress value={65} size="md" label="Upload progress" showValue />
            <Progress value={90} size="lg" label="Almost done (lg)" showValue />
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Circular</h4>
          <div className="flex items-end gap-6">
            <Progress value={33} variant="circular" size="sm" showValue />
            <Progress value={65} variant="circular" size="md" showValue />
            <Progress value={88} variant="circular" size="lg" showValue />
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function BreadcrumbSection() {
  return (
    <DemoSection code={`import { Breadcrumb } from '@/design-system';

<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Design', href: '/design' },
  { label: 'Components' },
]} />`}>
      <div className="space-y-4">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Design', href: '/design' },
          { label: 'Components' },
        ]} />
        <Breadcrumb items={[
          { label: 'Dashboard', href: '/' },
          { label: 'Projects', href: '/' },
          { label: 'alux.space', href: '/' },
          { label: 'Settings' },
        ]} />
      </div>
    </DemoSection>
  );
}

function RegistrySection({ categoryKey }: { categoryKey: ComponentEntry['category'] }) {
  const entries = getByCategory(categoryKey);
  if (!entries.length) return <p className="text-sm opacity-60 italic">No components in this category.</p>;
  return (
    <div className="space-y-2">
      {entries.map(entry => (
        <ComponentCard key={entry.name} entry={entry} />
      ))}
    </div>
  );
}

/* -- Governance sections -------------------------------- */

function PodcastPlayerSection() {
  return (
    <div className="space-y-10">
      <div>
        <h4 className="text-sm font-medium mb-3 opacity-60">Live Demo</h4>
        <p className="text-sm opacity-70 mb-4">
          Full-featured podcast player used in the hero section. All colors adapt via{' '}
          <code className="font-mono text-xs bg-[var(--card-from-bg)] px-1.5 py-0.5 rounded">--primary</code>{' '}
          and{' '}
          <code className="font-mono text-xs bg-[var(--card-from-bg)] px-1.5 py-0.5 rounded">--gradient-*</code>{' '}
          semantic tokens — switch the theme to see the palette adapt automatically.
        </p>
        <DemoSection code={`<PodcastPlayer />`}>
          <div className="max-w-sm mx-auto">
            <PodcastPlayer />
          </div>
        </DemoSection>
      </div>
    </div>
  );
}

function ConventionsSection() {
  return (
    <div className="space-y-6">
      <div className="theme-card-flex p-5 rounded-xl space-y-4">
        <h4 className="text-sm font-semibold">Token Usage Rules</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[var(--card-border)]">
                <th className="py-1.5 pr-4 font-medium">Context</th>
                <th className="py-1.5 pr-4 font-medium">Use</th>
                <th className="py-1.5 font-medium">Avoid</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {/* eslint-disable design-system/no-hardcoded-colors -- example content showing what to avoid */}
              {[
                ['CSS / Tailwind', 'var(--primary), bg-primary', '#3b82f6, bg-[#3b82f6]'],
                ['Inline styles', 'var(--space-4)', '16px'],
                ['Framer Motion', 'tokens.durationSeconds.normal', '0.3'],
                ['Canvas / SVG JS', 'palette.blue[500]', "'#3b82f6'"],
              ].map(([ctx, use, avoid]) => (
              /* eslint-enable design-system/no-hardcoded-colors */
                <tr key={ctx} className="border-b border-[var(--card-border)]/60">
                  <td className="py-1.5 pr-4 font-sans text-sm">{ctx}</td>
                  <td className="py-1.5 pr-4 text-[var(--color-success)]">{use}</td>
                  <td className="py-1.5 text-[var(--color-error)] line-through opacity-70">{avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="theme-card-flex p-5 rounded-xl space-y-3">
        <h4 className="text-sm font-semibold">Token Files</h4>
        <ul className="space-y-2 text-sm">
          {[
            ['tokens.css', 'Single source of truth — CSS custom properties'],
            ['tokens.ts', 'Typed JS mirror for Framer Motion / canvas'],
            ['components.ts', 'Component registry (props, tokens, a11y)'],
          ].map(([file, desc]) => (
            <li key={file} className="flex gap-2">
              <code className="text-xs px-1.5 py-0.5 rounded bg-foreground/8 shrink-0">{file}</code>
              <span className="opacity-70">{desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="theme-card-flex p-5 rounded-xl space-y-3">
        <h4 className="text-sm font-semibold">Theme Compatibility</h4>
        <p className="text-sm opacity-70">Every new color must work across all three themes:</p>
        <div className="flex gap-2">
          {['Light', 'Dark', 'Colorful'].map(t => (
            <span key={t} className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">{t}</span>
          ))}
        </div>
        <p className="text-sm opacity-70">
          Define defaults in <code className="text-xs bg-foreground/8 px-1 rounded">:root</code> and
          override in each <code className="text-xs bg-foreground/8 px-1 rounded">.theme-*</code> block.
        </p>
      </div>

      <div className="theme-card-flex p-5 rounded-xl space-y-3">
        <h4 className="text-sm font-semibold">Naming Conventions</h4>
        <ul className="space-y-1 text-sm opacity-70">
          <li><strong>Components:</strong> PascalCase — <code className="text-xs">CardContent.tsx</code></li>
          <li><strong>Hooks/utils:</strong> camelCase — <code className="text-xs">useTheme.ts</code></li>
          <li><strong>Routes:</strong> kebab-case — <code className="text-xs">timeline-cards/page.tsx</code></li>
          <li><strong>Tokens:</strong> --category-name — <code className="text-xs">--color-blue-500</code>, <code className="text-xs">--space-4</code></li>
        </ul>
      </div>
    </div>
  );
}

function ContributingSection() {
  const steps = [
    {
      title: 'Adding a Token',
      icon: 'add_circle',
      items: [
        'Define the CSS custom property in tokens.css under the correct category',
        'Add theme overrides in .theme-light, .theme-dark, .theme-colorful if needed',
        'Mirror in tokens.ts for programmatic access',
        'Extend tailwind.config.js if it needs utility classes',
        'Add a swatch to the design system showcase page',
      ],
    },
    {
      title: 'Adding a Component',
      icon: 'widgets',
      items: [
        'Create the file under src/components/ (use tokens, not hardcoded values)',
        'Register in components.ts with props, tokens, a11y, and variants',
        'Add a live demo section in the showcase page',
        'Add a sidebar link in layout.tsx if significant',
      ],
    },
    {
      title: 'Adding a Demo Page',
      icon: 'web',
      items: [
        'Create src/app/design/<slug>/page.tsx',
        'Add a sidebar entry under Pages in layout.tsx',
        'The page inherits the sidebar layout automatically',
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {steps.map(step => (
        <div key={step.title} className="theme-card-flex p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols text-primary text-xl">{step.icon}</span>
            <h4 className="text-sm font-semibold">{step.title}</h4>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-sm opacity-70">
            {step.items.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </div>
      ))}
    </div>
  );
}

function LintRulesSection() {
  return (
    <div className="space-y-4">
      <div className="theme-card-flex p-5 rounded-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols text-primary">rule</span>
          <h4 className="text-sm font-semibold">design-system/no-hardcoded-colors</h4>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs font-medium opacity-50">Severity</span>
            <p><span className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-warning-bg)] text-[var(--color-warning)]">warn</span></p>
          </div>
          <div>
            <span className="text-xs font-medium opacity-50">Scope</span>
            <p className="font-mono text-xs">src/components/** &amp; src/app/**</p>
          </div>
        </div>
        <div className="text-sm space-y-1">
          <span className="text-xs font-medium opacity-50">What it flags</span>
          <p className="opacity-70">Hex color literals (<code className="text-xs bg-foreground/8 px-1 rounded">#xxx</code>, <code className="text-xs bg-foreground/8 px-1 rounded">#xxxxxx</code>, <code className="text-xs bg-foreground/8 px-1 rounded">#xxxxxxxx</code>) in string and template literals.</p>
        </div>
        <div className="text-sm space-y-1">
          <span className="text-xs font-medium opacity-50">How to fix</span>
          <p className="opacity-70">Replace with <code className="text-xs bg-foreground/8 px-1 rounded">var(--token-name)</code> or import from <code className="text-xs bg-foreground/8 px-1 rounded">@/design-system</code>.</p>
        </div>
        <div className="text-sm space-y-1">
          <span className="text-xs font-medium opacity-50">Exceptions</span>
          <p className="opacity-70">For canvas/SVG contexts that can&apos;t read CSS variables, use <code className="text-xs bg-foreground/8 px-1 rounded">palette.*</code> from tokens.ts and add an eslint-disable comment with reason.</p>
        </div>
      </div>

      <div className="theme-card-flex p-5 rounded-xl space-y-3">
        <h4 className="text-sm font-semibold">Pre-commit Checklist</h4>
        <ul className="space-y-2 text-sm">
          {[
            'No new hardcoded hex colors (npm run lint)',
            'New tokens added to both tokens.css and tokens.ts',
            'Component works in all 3 themes',
            'Component registered in components.ts (if reusable)',
            'Accessibility: keyboard navigable, screen reader tested',
            'Build passes: npm run build',
          ].map(item => (
            <li key={item} className="flex items-start gap-2">
              <span className="material-symbols text-[16px] text-primary mt-0.5">check_box_outline_blank</span>
              <span className="opacity-70">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* -- Section map ---------------------------------------- */

interface SectionDef {
  key: string;
  title: string;
  render: () => React.ReactNode;
}

type PreviewBackgroundMode = 'theme' | 'image';

const backgroundPreviewSections = new Set([
  'colors',
  'gradients',
  'buttons',
  'avatars',
  'badges',
  'icons',
]);

function BackgroundPreviewToggle({
  mode,
  onModeChange,
}: {
  mode: PreviewBackgroundMode;
  onModeChange: (mode: PreviewBackgroundMode) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--card-border)] bg-[var(--card-from-bg)] p-1">
      <button
        onClick={() => onModeChange('theme')}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          mode === 'theme'
            ? 'bg-primary text-white'
            : 'text-[var(--muted-foreground)] hover:bg-foreground/10'
        }`}
        aria-pressed={mode === 'theme'}
      >
        <span className="material-symbols text-sm">palette</span>
        Theme BG
      </button>
      <button
        onClick={() => onModeChange('image')}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
          mode === 'image'
            ? 'bg-primary text-white'
            : 'text-[var(--muted-foreground)] hover:bg-foreground/10'
        }`}
        aria-pressed={mode === 'image'}
      >
        <span className="material-symbols text-sm">image</span>
        Image BG
      </button>
    </div>
  );
}

function BackgroundPreviewFrame({
  mode,
  children,
}: {
  mode: PreviewBackgroundMode;
  children: React.ReactNode;
}) {
  if (mode === 'theme') {
    return (
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--background)] p-4 sm:p-6">
        {children}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--card-border)] p-4 sm:p-6">
      <Image
        src="/images/bgs/ds-bg.jpg"
        alt="Image background preview"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

const allSections: SectionDef[] = [
  // Foundations
  { key: 'colors',          title: 'Color Tokens',             render: () => <ColorsSection /> },
  { key: 'text-colors',     title: 'Text Colors',              render: () => <TextColorsSection /> },
  { key: 'tonal-palettes',  title: 'Tonal Palettes (Figma)',   render: () => <TonalPalettesSection /> },
  { key: 'typography',      title: 'Typography Scale',          render: () => <TypographySection /> },
  { key: 'spacing',    title: 'Spacing Scale',             render: () => <SpacingSection /> },
  { key: 'radius',     title: 'Border Radius',             render: () => <RadiusSection /> },
  { key: 'shadows',    title: 'Shadows & Elevation',       render: () => <ShadowsSection /> },
  { key: 'motion',     title: 'Motion & Easing',           render: () => <MotionSection /> },
  { key: 'gradients',    title: 'Gradients',                 render: () => <GradientsSection /> },
  { key: 'backgrounds', title: 'Backgrounds',               render: () => <BackgroundsSection /> },
  // Components
  { key: 'buttons',    title: 'Buttons',                   render: () => <ButtonsSection /> },
  { key: 'badges',     title: 'Badges',                    render: () => <BadgesSection /> },
  { key: 'inputs',     title: 'Inputs',                    render: () => <InputsSection /> },
  { key: 'toggles',    title: 'Toggles',                   render: () => <TogglesSection /> },
  { key: 'avatars',    title: 'Avatars',                   render: () => <AvatarsSection /> },
  { key: 'logo',       title: 'Logo',                      render: () => <LogoSection /> },
  { key: 'dividers',   title: 'Dividers',                  render: () => <DividersSection /> },
  { key: 'tooltips',        title: 'Tooltips',                  render: () => <TooltipsSection /> },
  // -- Cards (per category) ----------------------------
  { key: 'cards-surface',  title: 'Cards — Surface',           render: () => <CardsSurfaceSection /> },
  { key: 'cards-timeline', title: 'Cards — Timeline',          render: () => <CardsTimelineSection /> },
  { key: 'cards-media',    title: 'Cards — Media',             render: () => <CardsMediaSection /> },
  { key: 'cards-content',  title: 'Cards — Content',           render: () => <CardsContentSection /> },
  { key: 'quotes',         title: 'QuoteBlock Variants',       render: () => <QuotesSection /> },
  { key: 'testimonials',   title: 'Testimonial Carousel',      render: () => <TestimonialsSection /> },
  { key: 'icons',      title: 'Icons (Material Symbols)',   render: () => <IconsSection /> },
  { key: 'animations', title: 'AnimatedSection',           render: () => <AnimationsSection /> },
  { key: 'code-snippet', title: 'Code Snippet',            render: () => <CodeSnippetSection /> },
  { key: 'chapter-divider', title: 'Chapter Divider',      render: () => <ChapterDividerSection /> },
  { key: 'double-diamond', title: 'Double Diamond',        render: () => <DoubleDiamondSection /> },
  { key: 'selects',    title: 'Selects',                   render: () => <SelectSection /> },
  { key: 'modals',     title: 'Modals',                     render: () => <ModalSection /> },
  { key: 'tabs',       title: 'Tabs',                       render: () => <TabsSection /> },
  { key: 'alerts',     title: 'Alerts',                     render: () => <AlertsSection /> },
  { key: 'skeletons',  title: 'Skeletons',                  render: () => <SkeletonSection /> },
  { key: 'progress',   title: 'Progress',                   render: () => <ProgressSection /> },
  { key: 'breadcrumbs',title: 'Breadcrumbs',                render: () => <BreadcrumbSection /> },
  { key: 'text',       title: 'Text Component',             render: () => <TextSection /> },
  // Section-Level
  { key: 'podcast-player', title: 'Podcast Player',           render: () => <PodcastPlayerSection /> },
  // Registry
  ...registryCategories.map(c => ({
    key: c.key === 'primitive' ? 'primitives' : c.key,
    title: c.label,
    render: () => <RegistrySection categoryKey={c.key} />,
  })),
  // Governance
  { key: 'conventions',  title: 'Conventions',   render: () => <ConventionsSection /> },
  { key: 'contributing', title: 'Contributing',  render: () => <ContributingSection /> },
  { key: 'lint-rules',   title: 'Lint Rules',    render: () => <LintRulesSection /> },
];

/* -- Overview (landing when no section selected) ------- */

function OverviewGrid() {
  const groups = [
    {
      title: 'Foundations',
      items: [
        { key: 'backgrounds',     icon: 'wallpaper',      label: 'Backgrounds' },
        { key: 'colors',           icon: 'palette',        label: 'Colors' },
        { key: 'text-colors',      icon: 'format_color_text', label: 'Text Colors' },
        { key: 'tonal-palettes',   icon: 'color_lens',     label: 'Tonal Palettes' },
        { key: 'gradients',        icon: 'gradient',       label: 'Gradients' },
        { key: 'motion',      icon: 'animation',      label: 'Motion' },
        { key: 'radius',      icon: 'rounded_corner', label: 'Radius' },
        { key: 'shadows',     icon: 'layers',         label: 'Shadows' },
        { key: 'spacing',     icon: 'space_bar',      label: 'Spacing' },
        { key: 'typography',  icon: 'text_fields',    label: 'Typography' },
      ],
    },
    {
      title: 'Components',
      items: [
        { key: 'alerts',          icon: 'notification_important', label: 'Alerts' },
        { key: 'animations',      icon: 'motion_photos_auto',     label: 'Animations' },
        { key: 'avatars',         icon: 'account_circle',         label: 'Avatars' },
        { key: 'badges',          icon: 'label',                  label: 'Badges' },
        { key: 'breadcrumbs',     icon: 'more_horiz',             label: 'Breadcrumbs' },
        { key: 'buttons',         icon: 'smart_button',           label: 'Buttons' },
        { key: 'chapter-divider', icon: 'format_list_numbered',   label: 'Chapter Divider' },
        { key: 'code-snippet',    icon: 'code',                   label: 'Code Snippet' },
        { key: 'double-diamond',  icon: 'diamond',                label: 'Double Diamond' },
        { key: 'dividers',        icon: 'horizontal_rule',        label: 'Dividers' },
        { key: 'icons',           icon: 'emoji_symbols',          label: 'Icons' },
        { key: 'inputs',          icon: 'text_fields',            label: 'Inputs' },
        { key: 'logo',            icon: 'branding_watermark',     label: 'Logo' },
        { key: 'modals',          icon: 'open_in_new',            label: 'Modals' },
        { key: 'podcast-player',  icon: 'podcasts',               label: 'Podcast Player' },
        { key: 'progress',        icon: 'donut_large',            label: 'Progress' },
        { key: 'quotes',          icon: 'format_quote',           label: 'Quotes' },
        { key: 'testimonials',    icon: 'chat_bubble',            label: 'Testimonials' },
        { key: 'selects',         icon: 'arrow_drop_down_circle', label: 'Selects' },
        { key: 'skeletons',       icon: 'hourglass_empty',        label: 'Skeletons' },
        { key: 'tabs',            icon: 'tab',                    label: 'Tabs' },
        { key: 'text',            icon: 'title',                  label: 'Text' },
        { key: 'toggles',         icon: 'toggle_on',              label: 'Toggles' },
        { key: 'tooltips',        icon: 'info',                   label: 'Tooltips' },
      ],
    },
    {
      title: 'Cards',
      items: [
        { key: 'cards-content',  icon: 'apps',          label: 'Content' },
        { key: 'cards-media',    icon: 'perm_media',    label: 'Media' },
        { key: 'cards-surface',  icon: 'dashboard',     label: 'Surface' },
        { key: 'cards-timeline', icon: 'view_timeline', label: 'Timeline' },
      ],
    },
    {
      title: 'Component Registry',
      items: [
        { key: 'a11y',       icon: 'accessibility_new', label: 'Accessibility' },
        { key: 'composite',  icon: 'view_module',       label: 'Composite' },
        { key: 'layout',     icon: 'grid_view',         label: 'Layout' },
        { key: 'primitives', icon: 'widgets',           label: 'Primitives' },
        { key: 'section',    icon: 'view_agenda',       label: 'Section-Level' },
      ],
    },
    {
      title: 'Governance',
      items: [
        { key: 'contributing', icon: 'handshake', label: 'Contributing' },
        { key: 'conventions',  icon: 'gavel',     label: 'Conventions' },
        { key: 'lint-rules',   icon: 'rule',      label: 'Lint Rules' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {groups.map(group => (
        <div key={group.title}>
          <h3 className="text-sm font-semibold uppercase tracking-wider opacity-40 mb-3">
            {group.title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {group.items.map(item => (
              <a
                key={item.key}
                href={`/design?s=${item.key}`}
                className="theme-card-flex p-4 rounded-xl flex flex-col items-center gap-2 text-center
                           hover:border-primary/40 transition-colors group"
              >
                <span className="material-symbols text-2xl opacity-50 group-hover:opacity-100 group-hover:text-primary transition-all">
                  {item.icon}
                </span>
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -- Page content (reads ?s= param) --------------------- */

function DesignPageContent() {
  const searchParams = useSearchParams();
  const activeKey = searchParams.get('s') ?? '';
  const activeDef = allSections.find(s => s.key === activeKey);
  const [previewBackgroundMode, setPreviewBackgroundMode] = useState<PreviewBackgroundMode>('theme');

  const canTogglePreviewBackground = Boolean(activeDef && backgroundPreviewSections.has(activeDef.key));

  if (!activeDef) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ textShadow: 'none' }}>
          Design System
        </h2>
        <p className="opacity-70 max-w-2xl text-sm mb-8">
          A living catalogue of design tokens, components, and patterns used across alux.space.
          Select a section from the sidebar, or browse below.
        </p>
        <OverviewGrid />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold" style={{ textShadow: 'none' }}>
          {activeDef.title}
        </h2>
        {canTogglePreviewBackground && (
          <BackgroundPreviewToggle mode={previewBackgroundMode} onModeChange={setPreviewBackgroundMode} />
        )}
      </div>

      {canTogglePreviewBackground ? (
        <BackgroundPreviewFrame mode={previewBackgroundMode}>
          {activeDef.render()}
        </BackgroundPreviewFrame>
      ) : (
        activeDef.render()
      )}
    </div>
  );
}

/* -- Exported page (Suspense boundary) ------------------ */

export default function DesignSystemPage() {
  return (
    <Suspense>
      <DesignPageContent />
    </Suspense>
  );
}
