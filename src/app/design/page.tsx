'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import QuoteBlock from '@/components/ui/QuoteBlock';
import Icon from '@/components/ui/Icon';
import Tooltip from '@/components/ui/Tooltip';
import AnimatedSection from '@/components/AnimatedSection';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import Avatar from '@/components/ui/Avatar';
import Divider from '@/components/ui/Divider';
import CodeSnippet from '@/components/CodeSnippet';
import ChapterDivider from '@/components/ui/ChapterDivider';
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

/* ── Helper: copy-to-clipboard ─────────────────────────── */

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
      {copied ? '✓' : 'copy'}
    </button>
  );
}

/* ── Small sub-components ──────────────────────────────── */

function Swatch({ cssVar, label }: { cssVar: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div
        className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm"
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
        className="w-16 h-16 rounded-lg bg-white dark:bg-gray-800"
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

/* ── Code-toggle wrapper ──────────────────────────────── */

function DemoSection({ children, code, language = 'tsx' }: { children: React.ReactNode; code: string; language?: string }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="space-y-4">
      <div className="theme-card-flex p-6 rounded-xl">
        {children}
      </div>
      <div className="flex justify-end">
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

function GradientsSection() {
  const gradients = [
    { label: 'Primary', css: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))' },
    { label: 'Card', css: 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))' },
    { label: 'Cosmic', css: 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {gradients.map(g => (
        <div key={g.label} className="flex flex-col items-center gap-2">
          <div
            className="w-full h-24 rounded-xl border border-gray-200 dark:border-gray-700"
            style={{ background: g.css }}
          />
          <span className="text-xs font-medium opacity-60">{g.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Component demo sections ─────────────────────────── */

function ButtonsSection() {
  return (
    <DemoSection code={`import Button from '@/components/ui/Button';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="cosmic">Cosmic</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// With icons
<Button leftIcon={<Icon name="add" />}>Create</Button>`}>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Variants</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="cosmic">Cosmic</Button>
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Sizes</h4>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">States</h4>
          <div className="flex flex-wrap gap-3">
            <Button loading>Loading...</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
        <Divider />
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">With Icons</h4>
          <div className="flex flex-wrap gap-3">
            <Button leftIcon={<Icon name="add" />}>Create New</Button>
            <Button variant="outline" rightIcon={<Icon name="arrow_forward" />}>Continue</Button>
            <Button variant="secondary" leftIcon={<Icon name="download" />}>Download</Button>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

function BadgesSection() {
  return (
    <DemoSection code={`import Badge from '@/components/ui/Badge';

<Badge variant="default">Default</Badge>
<Badge variant="success" dot>Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Critical</Badge>
<Badge variant="info">New</Badge>
<Badge variant="outline">v2.0.1</Badge>`}>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-medium opacity-50 uppercase tracking-wider mb-3">Variants</h4>
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
    <DemoSection code={`import Input from '@/components/ui/Input';

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
    <DemoSection code={`import Toggle from '@/components/ui/Toggle';

<Toggle checked={enabled} onChange={setEnabled} label="Notifications" />
<Toggle checked={false} onChange={() => {}} label="Disabled" disabled />
<Toggle checked={true} onChange={() => {}} size="sm" label="Small" />`}>
      <div className="space-y-4">
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
    <DemoSection code={`import Avatar from '@/components/ui/Avatar';

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
    <DemoSection code={`import Divider from '@/components/ui/Divider';

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
    <DemoSection code={`import Tooltip from '@/components/ui/Tooltip';

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

function CardsSection() {
  return (
    <DemoSection code={`import Card from '@/components/Card';
import CardContent from '@/components/CardContent';

<Card variant="primary">
  <CardContent title="Title" subtitle="Subtitle">
    <p>Card content goes here.</p>
  </CardContent>
</Card>`}>
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
    </DemoSection>
  );
}

function QuotesSection() {
  return (
    <DemoSection code={`import QuoteBlock from '@/components/ui/QuoteBlock';

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
  return (
    <DemoSection code={`import Icon from '@/components/ui/Icon';

<Icon name="home" />
<Icon name="search" />
<Icon name="settings" className="text-primary" />`}>
      <div className="flex flex-wrap gap-4">
        {['home', 'search', 'settings', 'favorite', 'star', 'palette', 'code', 'dark_mode', 'light_mode', 'accessibility_new', 'add', 'delete', 'edit', 'visibility', 'download', 'upload'].map(name => (
          <Tooltip key={name} text={name}>
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
              <Icon name={name} />
            </div>
          </Tooltip>
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
    <DemoSection code={`import ChapterDivider from '@/components/ui/ChapterDivider';

<ChapterDivider title="Getting Started" number={1} />`}>
      <div className="space-y-6">
        <ChapterDivider title="Getting Started" number={1} />
        <p className="text-sm opacity-60 pl-4">Section content would go here...</p>
        <ChapterDivider title="Advanced Usage" number={2} />
        <p className="text-sm opacity-60 pl-4">More content...</p>
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

/* ── Governance sections ──────────────────────────────── */

function ConventionsSection() {
  return (
    <div className="space-y-6">
      <div className="theme-card-flex p-5 rounded-xl space-y-4">
        <h4 className="text-sm font-semibold">Token Usage Rules</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-gray-700">
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
                <tr key={ctx} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-1.5 pr-4 font-sans text-sm">{ctx}</td>
                  <td className="py-1.5 pr-4 text-green-600 dark:text-green-400">{use}</td>
                  <td className="py-1.5 text-red-500 dark:text-red-400 line-through opacity-70">{avoid}</td>
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
              <code className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 shrink-0">{file}</code>
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
          Define defaults in <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">:root</code> and
          override in each <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">.theme-*</code> block.
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
            <p><span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">warn</span></p>
          </div>
          <div>
            <span className="text-xs font-medium opacity-50">Scope</span>
            <p className="font-mono text-xs">src/components/** &amp; src/app/**</p>
          </div>
        </div>
        <div className="text-sm space-y-1">
          <span className="text-xs font-medium opacity-50">What it flags</span>
          <p className="opacity-70">Hex color literals (<code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">#xxx</code>, <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">#xxxxxx</code>, <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">#xxxxxxxx</code>) in string and template literals.</p>
        </div>
        <div className="text-sm space-y-1">
          <span className="text-xs font-medium opacity-50">How to fix</span>
          <p className="opacity-70">Replace with <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">var(--token-name)</code> or import from <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">@/design-system</code>.</p>
        </div>
        <div className="text-sm space-y-1">
          <span className="text-xs font-medium opacity-50">Exceptions</span>
          <p className="opacity-70">For canvas/SVG contexts that can&apos;t read CSS variables, use <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">palette.*</code> from tokens.ts and add an eslint-disable comment with reason.</p>
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

/* ── Section map ──────────────────────────────────────── */

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
  { key: 'gradients',  title: 'Gradients',                 render: () => <GradientsSection /> },
  // Components
  { key: 'buttons',    title: 'Buttons',                   render: () => <ButtonsSection /> },
  { key: 'badges',     title: 'Badges',                    render: () => <BadgesSection /> },
  { key: 'inputs',     title: 'Inputs',                    render: () => <InputsSection /> },
  { key: 'toggles',    title: 'Toggles',                   render: () => <TogglesSection /> },
  { key: 'avatars',    title: 'Avatars',                   render: () => <AvatarsSection /> },
  { key: 'dividers',   title: 'Dividers',                  render: () => <DividersSection /> },
  { key: 'tooltips',   title: 'Tooltips',                  render: () => <TooltipsSection /> },
  { key: 'cards',      title: 'Card Variants',             render: () => <CardsSection /> },
  { key: 'quotes',     title: 'QuoteBlock Variants',       render: () => <QuotesSection /> },
  { key: 'icons',      title: 'Icons (Material Symbols)',   render: () => <IconsSection /> },
  { key: 'animations', title: 'AnimatedSection',           render: () => <AnimationsSection /> },
  { key: 'code-snippet', title: 'Code Snippet',            render: () => <CodeSnippetSection /> },
  { key: 'chapter-divider', title: 'Chapter Divider',      render: () => <ChapterDividerSection /> },
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
        { key: 'gradients',  icon: 'gradient',        label: 'Gradients' },
      ],
    },
    {
      title: 'Components',
      items: [
        { key: 'buttons',    icon: 'smart_button',       label: 'Buttons' },
        { key: 'badges',     icon: 'label',              label: 'Badges' },
        { key: 'inputs',     icon: 'text_fields',        label: 'Inputs' },
        { key: 'toggles',    icon: 'toggle_on',          label: 'Toggles' },
        { key: 'avatars',    icon: 'account_circle',     label: 'Avatars' },
        { key: 'dividers',   icon: 'horizontal_rule',    label: 'Dividers' },
        { key: 'tooltips',   icon: 'info',               label: 'Tooltips' },
        { key: 'cards',      icon: 'dashboard',          label: 'Cards' },
        { key: 'quotes',     icon: 'format_quote',       label: 'Quotes' },
        { key: 'icons',      icon: 'emoji_symbols',      label: 'Icons' },
        { key: 'animations', icon: 'motion_photos_auto', label: 'Animations' },
        { key: 'code-snippet', icon: 'code',             label: 'Code Snippet' },
        { key: 'chapter-divider', icon: 'format_list_numbered', label: 'Chapter Divider' },
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
    {
      title: 'Governance',
      items: [
        { key: 'conventions',  icon: 'gavel',     label: 'Conventions' },
        { key: 'contributing', icon: 'handshake',  label: 'Contributing' },
        { key: 'lint-rules',   icon: 'rule',       label: 'Lint Rules' },
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
