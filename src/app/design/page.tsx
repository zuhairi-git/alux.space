'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import QuoteBlock from '@/components/ui/QuoteBlock';
import Icon from '@/components/ui/Icon';
import Tooltip from '@/components/ui/Tooltip';
import AnimatedSection from '@/components/AnimatedSection';
import { getByCategory } from '@/design-system/components';
import type { ComponentEntry } from '@/design-system/components';

/* ── Token swatch data ─────────────────────────────────── */

const colorTokenSections = [
  {
    title: 'Semantic (theme-resolved)',
    tokens: [
      { name: '--background',        label: 'Background' },
      { name: '--foreground',        label: 'Foreground' },
      { name: '--primary',           label: 'Primary' },
      { name: '--primary-hover',     label: 'Primary Hover' },
      { name: '--gradient-start',    label: 'Gradient Start' },
      { name: '--gradient-mid',      label: 'Gradient Mid' },
      { name: '--gradient-end',      label: 'Gradient End' },
      { name: '--card-from-bg',      label: 'Card From' },
      { name: '--card-to-bg',        label: 'Card To' },
      { name: '--card-border',       label: 'Card Border' },
      { name: '--card-border-hover', label: 'Card Border Hover' },
      { name: '--nav-bg',            label: 'Nav Background' },
      { name: '--nav-border',        label: 'Nav Border' },
    ],
  },
  {
    title: 'Palette — Blues',
    tokens: [
      { name: '--color-blue-50',  label: '50' },
      { name: '--color-blue-100', label: '100' },
      { name: '--color-blue-200', label: '200' },
      { name: '--color-blue-300', label: '300' },
      { name: '--color-blue-400', label: '400' },
      { name: '--color-blue-500', label: '500' },
      { name: '--color-blue-600', label: '600' },
      { name: '--color-blue-700', label: '700' },
    ],
  },
  {
    title: 'Palette — Purples',
    tokens: [
      { name: '--color-purple-300', label: '300' },
      { name: '--color-purple-400', label: '400' },
      { name: '--color-purple-500', label: '500' },
      { name: '--color-purple-600', label: '600' },
      { name: '--color-purple-700', label: '700' },
    ],
  },
  {
    title: 'Palette — Grays',
    tokens: [
      { name: '--color-gray-50',  label: '50' },
      { name: '--color-gray-100', label: '100' },
      { name: '--color-gray-200', label: '200' },
      { name: '--color-gray-400', label: '400' },
      { name: '--color-gray-600', label: '600' },
      { name: '--color-gray-800', label: '800' },
      { name: '--color-gray-950', label: '950' },
    ],
  },
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

/* ── Small sub-components ──────────────────────────────── */

function Swatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <span className="text-[10px] text-center opacity-70 leading-tight">{label}</span>
    </div>
  );
}

function ShadowSwatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-16 h-16 rounded-lg bg-white dark:bg-gray-800"
        style={{ boxShadow: `var(${cssVar})` }}
      />
      <span className="text-[10px] text-center opacity-70">{label}</span>
    </div>
  );
}

function SpacingSwatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-4 bg-primary/40 rounded"
        style={{ width: `var(${cssVar})` }}
      />
      <span className="text-xs opacity-70 whitespace-nowrap">{label}</span>
    </div>
  );
}

function RadiusSwatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-14 h-14 border-2 border-primary/50 bg-primary/10"
        style={{ borderRadius: `var(${cssVar})` }}
      />
      <span className="text-[10px] text-center opacity-70">{label}</span>
    </div>
  );
}

function PropsTable({ entry }: { entry: ComponentEntry }) {
  if (!entry.props.length) return <p className="text-sm opacity-60 italic">No configurable props.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-200 dark:border-gray-700">
            <th className="py-1.5 pr-4 font-medium">Prop</th>
            <th className="py-1.5 pr-4 font-medium">Type</th>
            <th className="py-1.5 pr-4 font-medium">Default</th>
            <th className="py-1.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {entry.props.map(p => (
            <tr key={p.name} className="border-b border-gray-100 dark:border-gray-800">
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
                  <code key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">{t}</code>
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

/* ── Main Page ─────────────────────────────────────────── */

const registryCategories: { key: ComponentEntry['category']; label: string }[] = [
  { key: 'primitive', label: 'Primitives' },
  { key: 'composite', label: 'Composite Components' },
  { key: 'section',   label: 'Section-Level' },
  { key: 'a11y',      label: 'Accessibility' },
  { key: 'layout',    label: 'Layout & Providers' },
];

/* ── Individual section renderers ─────────────────────── */

function ColorsSection() {
  return (
    <div className="space-y-6">
      {colorTokenSections.map(section => (
        <div key={section.title}>
          <h4 className="text-sm font-medium mb-2 opacity-60">{section.title}</h4>
          <div className="flex flex-wrap gap-3">
            {section.tokens.map(t => (
              <Swatch key={t.name} cssVar={t.name} label={t.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographySection() {
  return (
    <div className="space-y-3">
      {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].map(size => (
        <div key={size} className="flex items-baseline gap-4">
          <span className="w-12 text-right text-xs opacity-50 font-mono">{size}</span>
          <span style={{ fontSize: `var(--font-size-${size})` }}>
            The quick brown fox
          </span>
        </div>
      ))}
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { name: 'ease-out (smooth deceleration)', var: '--ease-out', dur: '--duration-normal' },
        { name: 'ease-standard', var: '--ease-standard', dur: '--duration-normal' },
        { name: 'ease-gentle (spring-like)', var: '--ease-gentle', dur: '--duration-slow' },
      ].map(e => (
        <div key={e.name} className="theme-card-flex p-4 rounded-xl group">
          <span className="text-xs font-mono opacity-60 mb-2">{e.name}</span>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full w-0 group-hover:w-full"
              style={{
                transitionProperty: 'width',
                transitionDuration: `var(${e.dur})`,
                transitionTimingFunction: `var(${e.var})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CardsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {(['primary', 'secondary', 'tertiary', 'muted'] as const).map(variant => (
        <Card key={variant} variant={variant}>
          <CardContent title={variant} subtitle="Card variant">
            <p className="text-sm opacity-70">
              A sample card using the <code className="text-xs">{variant}</code> variant.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function QuotesSection() {
  return (
    <div className="space-y-4">
      <QuoteBlock quote="Design is thinking made visual." author="Saul Bass" variant="default" />
      <QuoteBlock quote="Good design is obvious. Great design is transparent." author="Joe Sparano" variant="simple" />
      <QuoteBlock quote="Simplicity is the ultimate sophistication." author="Leonardo da Vinci" variant="minimal" />
    </div>
  );
}

function IconsSection() {
  return (
    <div className="flex flex-wrap gap-4">
      {['home', 'search', 'settings', 'favorite', 'star', 'palette', 'code', 'dark_mode', 'light_mode', 'accessibility_new'].map(name => (
        <Tooltip key={name} text={name}>
          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Icon name={name} />
          </div>
        </Tooltip>
      ))}
    </div>
  );
}

function AnimationsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {(['slide-up', 'slide-left', 'slide-right'] as const).map((anim, i) => (
        <AnimatedSection key={anim} animation={anim} delay={i * 0.1} once={false}>
          <div className="theme-card-flex p-4 rounded-xl text-center">
            <span className="text-sm font-mono opacity-60">{anim}</span>
          </div>
        </AnimatedSection>
      ))}
    </div>
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

/* ── Section map ──────────────────────────────────────── */

interface SectionDef {
  key: string;
  title: string;
  render: () => React.ReactNode;
}

const allSections: SectionDef[] = [
  { key: 'colors',     title: 'Color Tokens',             render: () => <ColorsSection /> },
  { key: 'typography', title: 'Typography Scale',          render: () => <TypographySection /> },
  { key: 'spacing',    title: 'Spacing Scale',             render: () => <SpacingSection /> },
  { key: 'radius',     title: 'Border Radius',             render: () => <RadiusSection /> },
  { key: 'shadows',    title: 'Shadows & Elevation',       render: () => <ShadowsSection /> },
  { key: 'motion',     title: 'Motion & Easing',           render: () => <MotionSection /> },
  { key: 'cards',      title: 'Card Variants',             render: () => <CardsSection /> },
  { key: 'quotes',     title: 'QuoteBlock Variants',       render: () => <QuotesSection /> },
  { key: 'icons',      title: 'Icons (Material Symbols)',   render: () => <IconsSection /> },
  { key: 'animations', title: 'AnimatedSection',           render: () => <AnimationsSection /> },
  ...registryCategories.map(c => ({
    key: c.key === 'primitive' ? 'primitives' : c.key,
    title: c.label,
    render: () => <RegistrySection categoryKey={c.key} />,
  })),
];

/* ── Overview (landing when no section selected) ─────── */

function OverviewGrid() {
  const groups = [
    {
      title: 'Foundations',
      items: [
        { key: 'colors',     icon: 'palette',         label: 'Colors' },
        { key: 'typography', icon: 'text_fields',     label: 'Typography' },
        { key: 'spacing',    icon: 'space_bar',       label: 'Spacing' },
        { key: 'radius',     icon: 'rounded_corner',  label: 'Radius' },
        { key: 'shadows',    icon: 'layers',          label: 'Shadows' },
        { key: 'motion',     icon: 'animation',       label: 'Motion' },
      ],
    },
    {
      title: 'Components',
      items: [
        { key: 'cards',      icon: 'dashboard',           label: 'Cards' },
        { key: 'quotes',     icon: 'format_quote',        label: 'Quotes' },
        { key: 'icons',      icon: 'emoji_symbols',       label: 'Icons' },
        { key: 'animations', icon: 'motion_photos_auto',  label: 'Animations' },
      ],
    },
    {
      title: 'Component Registry',
      items: [
        { key: 'primitives', icon: 'widgets',          label: 'Primitives' },
        { key: 'composite',  icon: 'view_module',      label: 'Composite' },
        { key: 'section',    icon: 'view_agenda',      label: 'Section-Level' },
        { key: 'a11y',       icon: 'accessibility_new',label: 'Accessibility' },
        { key: 'layout',     icon: 'grid_view',        label: 'Layout' },
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

/* ── Page content (reads ?s= param) ───────────────────── */

function DesignPageContent() {
  const searchParams = useSearchParams();
  const activeKey = searchParams.get('s') ?? '';
  const activeDef = allSections.find(s => s.key === activeKey);

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
      <h2 className="text-2xl font-bold mb-6" style={{ textShadow: 'none' }}>
        {activeDef.title}
      </h2>
      {activeDef.render()}
    </div>
  );
}

/* ── Exported page (Suspense boundary) ────────────────── */

export default function DesignSystemPage() {
  return (
    <Suspense>
      <DesignPageContent />
    </Suspense>
  );
}
