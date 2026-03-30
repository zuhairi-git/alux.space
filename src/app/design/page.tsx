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
  Icon,
  Tooltip,
  Button,
  Badge,
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
  getByCategory,
} from '@/design-system';
import type { ComponentEntry } from '@/design-system';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AnimatedSection from '@/components/AnimatedSection';
import CodeSnippet from '@/components/CodeSnippet';
import PodcastPlayer from '@/components/PodcastPlayer';
import { useTheme } from '@/context/ThemeContext';

/* ── Token swatch data ────────────────────────────────── */

const colorTokenSections = [
  {
    title: 'Semantic (theme-resolved)',
    tokens: [
      { name: '--background',        label: 'Background' },
      { name: '--foreground',        label: 'Foreground' },
      { name: '--primary',           label: 'Primary' },
      { name: '--primary-hover',     label: 'Primary Hover' },
      { name: '--primary-glow',      label: 'Primary Glow' },
      { name: '--btn-primary-bg',    label: 'Button Primary Bg' },
      { name: '--muted-foreground',  label: 'Muted Text' },
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
    title: 'State Colors (theme-resolved)',
    tokens: [
      { name: '--color-success',        label: 'Success' },
      { name: '--color-success-bg',     label: 'Success Bg' },
      { name: '--color-success-border', label: 'Success Border' },
      { name: '--color-warning',        label: 'Warning' },
      { name: '--color-warning-bg',     label: 'Warning Bg' },
      { name: '--color-warning-border', label: 'Warning Border' },
      { name: '--color-error',          label: 'Error' },
      { name: '--color-error-bg',       label: 'Error Bg' },
      { name: '--color-error-border',   label: 'Error Border' },
      { name: '--color-info',           label: 'Info' },
      { name: '--color-info-bg',        label: 'Info Bg' },
      { name: '--color-info-border',    label: 'Info Border' },
    ],
  },
  {
    title: 'Palette — Colorful / Ember',
    tokens: [
      { name: '--color-ember',       label: 'Ember (primary)' },
      { name: '--color-ember-dark',  label: 'Ember Dark' },
      { name: '--color-ember-light', label: 'Ember Light' },
      { name: '--color-colorful-bg', label: 'Colorful Bg' },
      { name: '--color-cobalt-700',  label: 'Cobalt 700' },
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
  {
    title: 'Palette — Accents',
    tokens: [
      { name: '--color-indigo-400', label: 'Indigo 400' },
      { name: '--color-indigo-500', label: 'Indigo 500' },
      { name: '--color-pink-400',   label: 'Pink 400' },
      { name: '--color-pink-500',   label: 'Pink 500' },
      { name: '--color-fuchsia-400',label: 'Fuchsia 400' },
      { name: '--color-fuchsia-500',label: 'Fuchsia 500' },
      { name: '--color-cyan-400',   label: 'Cyan 400' },
      { name: '--color-cyan-500',   label: 'Cyan 500' },
      { name: '--color-magenta',    label: 'Magenta' },
      { name: '--color-yellow-500', label: 'Yellow 500' },
      { name: '--color-orange-500', label: 'Orange 500' },
    ],
  },
  {
    title: 'Audio Player Tokens',
    tokens: [
      { name: '--player-bg',            label: 'Player Bg' },
      { name: '--player-border',        label: 'Player Border' },
      { name: '--player-accent',        label: 'Player Accent' },
      { name: '--player-progress-from', label: 'Progress Start' },
      { name: '--player-progress-via',  label: 'Progress Mid' },
      { name: '--player-progress-to',   label: 'Progress End' },
      { name: '--player-btn-from',      label: 'Button Start' },
      { name: '--player-btn-to',        label: 'Button End' },
      { name: '--player-btn-glow',      label: 'Button Glow' },
      { name: '--player-ctrl-bg',       label: 'Control Bg' },
      { name: '--player-ctrl-border',   label: 'Control Border' },
      { name: '--player-ctrl-text',     label: 'Control Text' },
      { name: '--player-tag-bg',        label: 'Tag Bg' },
      { name: '--player-tag-text',      label: 'Tag Text' },
      { name: '--player-tag-border',    label: 'Tag Border' },
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

/* â”€â”€ Helper: copy-to-clipboard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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
      {copied ? 'âœ“' : 'copy'}
    </button>
  );
}

/* â”€â”€ Small sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function Swatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div
        className="w-12 h-12 rounded-lg border border-[var(--card-border)] shadow-sm"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <span className="text-[10px] text-center opacity-70 leading-tight">{label}</span>
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

/* â”€â”€ Code-toggle wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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

/* â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const registryCategories: { key: ComponentEntry['category']; label: string }[] = [
  { key: 'primitive', label: 'Primitives' },
  { key: 'composite', label: 'Composite Components' },
  { key: 'section',   label: 'Section-Level' },
  { key: 'a11y',      label: 'Accessibility' },
  { key: 'layout',    label: 'Layout & Providers' },
];

/* â”€â”€ Individual section renderers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { name: 'ease-out (smooth deceleration)', var: '--ease-out', dur: '--duration-normal' },
        { name: 'ease-standard', var: '--ease-standard', dur: '--duration-normal' },
        { name: 'ease-gentle (spring-like)', var: '--ease-gentle', dur: '--duration-slow' },
      ].map(e => (
        <div key={e.name} className="theme-card-flex p-4 rounded-xl group">
          <span className="text-xs font-mono opacity-60 mb-2">{e.name}</span>
          <div className="h-2 bg-foreground/15 rounded-full overflow-hidden">
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

function GradientsSection() {
  const gradients = [
    { label: 'Primary', css: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))' },
    { label: 'Card', css: 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))' },
    // eslint-disable-next-line design-system/no-hardcoded-colors
    { label: 'Cosmic', css: 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)' },
    { label: 'Ember (Colorful)', css: 'linear-gradient(135deg, var(--color-ember) 0%, var(--color-purple-700) 55%, var(--color-cobalt-700) 100%)' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {gradients.map(g => (
        <div key={g.label} className="flex flex-col items-center gap-2">
          <div
            className="w-full h-24 rounded-xl border border-[var(--card-border)]"
            style={{ background: g.css }}
          />
          <span className="text-xs font-medium opacity-60">{g.label}</span>
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

      {/* Nav preview */}
      <div>
        <h4 className="text-sm font-medium opacity-60 mb-4">Nav Background Preview</h4>
        <div
          className="w-full h-14 rounded-xl border border-[var(--nav-border)] flex items-center px-5 gap-3"
          style={{ background: 'var(--nav-bg)' }}
        >
          <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
          <div className="text-sm font-medium opacity-70">
            Navigation surface \u2014{' '}
            <span className="font-mono text-[var(--primary)] text-xs">var(--nav-bg)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* â”€â”€ Component demo sections â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function ButtonsSection() {
  return (
    <DemoSection code={`import { Button, Icon } from '@/design-system';

// Primary — filled, highest emphasis
<Button variant="primary">Save changes</Button>
<Button variant="primary" leftIcon={<Icon name="add" />}>New project</Button>

// Secondary — outlined, medium emphasis
<Button variant="secondary">Cancel</Button>
<Button variant="secondary" rightIcon={<Icon name="arrow_forward" />}>View all</Button>

// Tertiary — text-only, low emphasis
<Button variant="tertiary">Learn more</Button>
<Button variant="tertiary" leftIcon={<Icon name="info" />}>Details</Button>

// Icon — square, icon-only
<Button variant="icon" size="sm"><Icon name="close" /></Button>
<Button variant="icon"><Icon name="more_vert" /></Button>
<Button variant="icon" size="lg"><Icon name="settings" /></Button>

// Sizes (all variants)
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Saving…</Button>
<Button disabled>Disabled</Button>`}>
      <div className="space-y-6">
        {/* Primary */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Primary — Filled</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Save changes</Button>
            <Button variant="primary" leftIcon={<Icon name="add" />}>New project</Button>
            <Button variant="primary" rightIcon={<Icon name="arrow_forward" />}>Get started</Button>
          </div>
        </div>
        <Divider />
        {/* Secondary */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Secondary — Outlined</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary" leftIcon={<Icon name="download" />}>Export</Button>
            <Button variant="secondary" rightIcon={<Icon name="arrow_forward" />}>View all</Button>
          </div>
        </div>
        <Divider />
        {/* Tertiary */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Tertiary — Text only</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="tertiary">Learn more</Button>
            <Button variant="tertiary" leftIcon={<Icon name="info" />}>Details</Button>
            <Button variant="tertiary" rightIcon={<Icon name="open_in_new" />}>Open link</Button>
          </div>
        </div>
        <Divider />
        {/* Icon */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Icon — Square</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="icon" size="sm"><Icon name="close" /></Button>
            <Button variant="icon"><Icon name="more_vert" /></Button>
            <Button variant="icon" size="lg"><Icon name="settings" /></Button>
            <Button variant="icon"><Icon name="share" /></Button>
            <Button variant="icon"><Icon name="bookmark" /></Button>
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
        </div>
        <Divider />
        {/* States */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">States</h4>
          <div className="flex flex-wrap gap-3">
            <Button loading>Saving…</Button>
            <Button variant="secondary" loading>Loading…</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled</Button>
            <Button variant="tertiary" disabled>Disabled</Button>
          </div>
        </div>
        <Divider />
        {/* Special */}
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Special — Cosmic</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="cosmic">Cosmic</Button>
            <Button variant="cosmic" leftIcon={<Icon name="auto_awesome" />}>Magic</Button>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function BadgesSection() {
  return (
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
  return (
    <div className="space-y-4">
      <p className="text-sm opacity-60">
        Animated entry cards with floating particles — designed for experience and education timelines.
      </p>
      <DemoSection code={`import { TimelineCard } from '@/design-system';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

<TimelineCard
  theme="${theme}"
  materialIcon={RocketLaunchIcon}
  title="Product Designer"
  date="2023 – Present"
  location="Helsinki, Finland"
  description="Product vision and design system ownership."
/>`}>
        <div className="max-w-xs mx-auto">
          <TimelineCard
            theme={theme}
            materialIcon={RocketLaunchIcon}
            title="Product Designer"
            date="2023 – Present"
            location="Helsinki, Finland"
            description="Product vision, design system ownership, and developer handoff."
          />
        </div>
      </DemoSection>
    </div>
  );
}

function CardsMediaSection() {
  return (
    <div className="space-y-4">
      <p className="text-sm opacity-60">
        Image-first cards with three layout variants.
      </p>
      <DemoSection code={`import { MediaCard } from '@/design-system';

<MediaCard
  variant="basic"
  title="Article Title"
  description="Short description of the content."
  imagePath="/images/blog/ai-brain.jpg"
  tags={['Design', 'AI']}
/>
// variant="overlay"  — text overlaid on image
// variant="horizontal" — image left, content right`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['basic', 'overlay', 'horizontal'] as const).map(v => (
            <MediaCard
              key={v}
              variant={v}
              title={`${v.charAt(0).toUpperCase() + v.slice(1)} variant`}
              description="A media card demonstrating the image layout pattern."
              imagePath="/images/blog/ai-brain.jpg"
              tags={['Design', 'UI']}
            />
          ))}
        </div>
      </DemoSection>
    </div>
  );
}

function CardsDomainSection() {
  const items = [
    {
      label: 'BlogCard',
      icon: 'article',
      desc: 'Article card with featured/standard/overlay view modes, tags, and read-time.',
      href: '/blog',
      importLine: "import { BlogCard } from '@/design-system';",
      prop: 'viewMode="standard | overlay | featured"',
    },
    {
      label: 'PortfolioCard',
      icon: 'work',
      desc: 'Project card with localized title/description, status badge, and tag chips.',
      href: '/portfolio',
      importLine: "import { PortfolioCard } from '@/design-system';",
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
    <div className="space-y-4">
      <p className="text-sm opacity-60">
        Page-specific cards with rich localized data schemas. All available from{' '}
        <code className="text-xs bg-foreground/8 px-1 rounded">@/design-system</code>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map(item => (
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

function IconsSection() {
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

  return (
    <DemoSection code={`import { Icon } from '@/design-system';

<Icon name="home" />
<Icon name="search" />
<Icon name="settings" className="text-primary" />`}>
      <div className="space-y-6">
        {iconGroups.map(group => (
          <div key={group.label}>
            <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">{group.label}</h4>
            <div className="flex flex-wrap gap-3">
              {group.icons.map(name => (
                <Tooltip key={name} text={name}>
                  <div className="w-10 h-10 rounded-lg bg-foreground/8 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                    <Icon name={name} />
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  );
}

function AnimationsSection() {
  return (
    <DemoSection code={`import AnimatedSection from '@/components/AnimatedSection';

<AnimatedSection animation="slide-up" delay={0.1}>
  <div>Content slides up on scroll</div>
</AnimatedSection>`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['slide-up', 'slide-left', 'slide-right'] as const).map((anim, i) => (
          <AnimatedSection key={anim} animation={anim} delay={i * 0.1} once={false}>
            <div className="theme-card-flex p-4 rounded-xl text-center">
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

/* â”€â”€ Governance sections â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function PodcastPlayerSection() {
  return (
    <div className="space-y-10">
      <div>
        <h4 className="text-sm font-medium mb-3 opacity-60">Live Demo</h4>
        <p className="text-sm opacity-70 mb-4">
          Full-featured podcast player used in the hero section. All colors adapt via{' '}
          <code className="font-mono text-xs bg-[var(--card-from-bg)] px-1.5 py-0.5 rounded">--player-*</code>{' '}
          CSS tokens — switch the theme to see the colorful ember palette.
        </p>
        <DemoSection code={`<PodcastPlayer />`}>
          <div className="max-w-sm mx-auto">
            <PodcastPlayer />
          </div>
        </DemoSection>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3 opacity-60">Theme Tokens</h4>
        <div className="flex flex-wrap gap-3">
          {[
            { name: '--player-bg',            label: 'Player Bg' },
            { name: '--player-border',        label: 'Player Border' },
            { name: '--player-accent',        label: 'Player Accent' },
            { name: '--player-progress-from', label: 'Progress Start' },
            { name: '--player-progress-via',  label: 'Progress Mid' },
            { name: '--player-progress-to',   label: 'Progress End' },
            { name: '--player-btn-from',      label: 'Button Start' },
            { name: '--player-btn-to',        label: 'Button End' },
            { name: '--player-btn-glow',      label: 'Button Glow' },
            { name: '--player-ctrl-bg',       label: 'Control Bg' },
            { name: '--player-ctrl-border',   label: 'Control Border' },
            { name: '--player-ctrl-text',     label: 'Control Text' },
            { name: '--player-tag-bg',        label: 'Tag Bg' },
            { name: '--player-tag-text',      label: 'Tag Text' },
            { name: '--player-tag-border',    label: 'Tag Border' },
          ].map(t => (
            <Swatch key={t.name} cssVar={t.name} label={t.label} />
          ))}
        </div>
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

/* â”€â”€ Section map â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

interface SectionDef {
  key: string;
  title: string;
  render: () => React.ReactNode;
}

const allSections: SectionDef[] = [
  // Foundations
  { key: 'colors',     title: 'Color Tokens',             render: () => <ColorsSection /> },
  { key: 'typography', title: 'Typography Scale',          render: () => <TypographySection /> },
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
  { key: 'dividers',   title: 'Dividers',                  render: () => <DividersSection /> },
  { key: 'tooltips',        title: 'Tooltips',                  render: () => <TooltipsSection /> },
  // â”€â”€ Cards (per category) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  { key: 'cards-surface',  title: 'Cards — Surface',           render: () => <CardsSurfaceSection /> },
  { key: 'cards-timeline', title: 'Cards — Timeline',          render: () => <CardsTimelineSection /> },
  { key: 'cards-media',    title: 'Cards — Media',             render: () => <CardsMediaSection /> },
  { key: 'cards-domain',   title: 'Cards — Domain',            render: () => <CardsDomainSection /> },
  { key: 'quotes',         title: 'QuoteBlock Variants',       render: () => <QuotesSection /> },
  { key: 'icons',      title: 'Icons (Material Symbols)',   render: () => <IconsSection /> },
  { key: 'animations', title: 'AnimatedSection',           render: () => <AnimationsSection /> },
  { key: 'code-snippet', title: 'Code Snippet',            render: () => <CodeSnippetSection /> },
  { key: 'chapter-divider', title: 'Chapter Divider',      render: () => <ChapterDividerSection /> },
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

/* â”€â”€ Overview (landing when no section selected) â”€â”€â”€â”€â”€â”€â”€ */

function OverviewGrid() {
  const groups = [
    {
      title: 'Foundations',
      items: [
        { key: 'backgrounds', icon: 'wallpaper',      label: 'Backgrounds' },
        { key: 'colors',      icon: 'palette',        label: 'Colors' },
        { key: 'gradients',   icon: 'gradient',       label: 'Gradients' },
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
        { key: 'dividers',        icon: 'horizontal_rule',        label: 'Dividers' },
        { key: 'icons',           icon: 'emoji_symbols',          label: 'Icons' },
        { key: 'inputs',          icon: 'text_fields',            label: 'Inputs' },
        { key: 'modals',          icon: 'open_in_new',            label: 'Modals' },
        { key: 'podcast-player',  icon: 'podcasts',               label: 'Podcast Player' },
        { key: 'progress',        icon: 'donut_large',            label: 'Progress' },
        { key: 'quotes',          icon: 'format_quote',           label: 'Quotes' },
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
        { key: 'cards-domain',   icon: 'apps',          label: 'Domain' },
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

/* â”€â”€ Page content (reads ?s= param) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

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

/* â”€â”€ Exported page (Suspense boundary) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default function DesignSystemPage() {
  return (
    <Suspense>
      <DesignPageContent />
    </Suspense>
  );
}
