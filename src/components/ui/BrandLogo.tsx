'use client';

import React from 'react';

export type BrandLogoSize = 'sm' | 'md' | 'lg' | 'xl';
export type BrandLogoTone = 'primary' | 'accent' | 'foreground';
export type BrandLogoLabel = 'none' | 'brand' | 'signature';

export interface BrandLogoProps {
  size?: BrandLogoSize;
  tone?: BrandLogoTone;
  label?: BrandLogoLabel;
  className?: string;
  emblemClassName?: string;
  textClassName?: string;
}

const sizeMap: Record<BrandLogoSize, { emblem: string; labelWidth: string; signatureText: string; gap: string; radius: string }> = {
  sm: {
    emblem: 'var(--icon-surface-size-sm)',
    labelWidth: '4.5rem',
    signatureText: '0.8rem',
    gap: '0.625rem',
    radius: 'var(--icon-surface-radius-sm)',
  },
  md: {
    emblem: 'var(--icon-surface-size-md)',
    labelWidth: '5.2rem',
    signatureText: '0.95rem',
    gap: '0.75rem',
    radius: 'var(--icon-surface-radius-md)',
  },
  lg: {
    emblem: 'var(--icon-surface-size-lg)',
    labelWidth: '6.2rem',
    signatureText: '1.05rem',
    gap: '0.875rem',
    radius: 'var(--icon-surface-radius-lg)',
  },
  xl: {
    emblem: 'var(--icon-surface-size-xl)',
    labelWidth: '7.15rem',
    signatureText: '1.15rem',
    gap: '1rem',
    radius: 'var(--icon-surface-radius-xl)',
  },
};

const toneMap: Record<BrandLogoTone, { fill: string; text: string; shadow: string; surface: string; border: string }> = {
  primary: {
    fill: 'var(--primary)',
    text: 'var(--primary)',
    shadow: 'color-mix(in srgb, var(--primary) 24%, transparent)',
    surface: 'linear-gradient(180deg, color-mix(in srgb, var(--primary) 16%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 96%, transparent) 100%)',
    border: 'color-mix(in srgb, var(--primary) 24%, var(--card-border))',
  },
  accent: {
    fill: 'var(--accent-text)',
    text: 'var(--accent-text)',
    shadow: 'color-mix(in srgb, var(--accent-text) 24%, transparent)',
    surface: 'linear-gradient(180deg, color-mix(in srgb, var(--accent-text) 16%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 96%, transparent) 100%)',
    border: 'color-mix(in srgb, var(--accent-text) 22%, var(--card-border))',
  },
  foreground: {
    fill: 'var(--foreground)',
    text: 'var(--foreground)',
    shadow: 'color-mix(in srgb, var(--foreground) 18%, transparent)',
    surface: 'linear-gradient(180deg, color-mix(in srgb, var(--foreground) 10%, var(--card-from-bg)) 0%, color-mix(in srgb, var(--card-from-bg) 96%, transparent) 100%)',
    border: 'color-mix(in srgb, var(--foreground) 12%, var(--card-border))',
  },
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

function createMaskStyle(path: string) {
  return {
    maskImage: `url(${path})`,
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    maskSize: 'contain',
    WebkitMaskImage: `url(${path})`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    WebkitMaskSize: 'contain',
  } satisfies React.CSSProperties;
}

const markMaskStyle = createMaskStyle('/images/logo/AluxLogo.svg');
const labelMaskStyle = createMaskStyle('/images/logo/AluxLogoLabel.svg');

function BrandLogoMark({ size, tone, className }: { size: BrandLogoSize; tone: BrandLogoTone; className?: string }) {
  const entry = sizeMap[size];
  const toneEntry = toneMap[tone];

  return (
    <span
      className={joinClassNames('inline-flex shrink-0 items-center justify-center', className)}
      aria-hidden="true"
      style={{
        width: entry.emblem,
        height: entry.emblem,
        borderRadius: entry.radius,
        overflow: 'hidden',
        backgroundImage: toneEntry.surface,
        border: `1px solid ${toneEntry.border}`,
        boxShadow: `0 16px 36px -24px ${toneEntry.shadow}`,
      }}
    >
      <span
        className="block h-[76%] w-[76%]"
        style={{
          ...markMaskStyle,
          backgroundColor: toneEntry.fill,
        }}
      />
    </span>
  );
}

function BrandLogoLabelMark({ size, tone, className }: { size: BrandLogoSize; tone: BrandLogoTone; className?: string }) {
  const entry = sizeMap[size];
  const toneEntry = toneMap[tone];

  return (
    <span
      className={joinClassNames('inline-flex shrink-0 items-center', className)}
      aria-hidden="true"
      style={{
        width: entry.labelWidth,
        height: `calc(${entry.labelWidth} * 0.17578125)`,
        ...labelMaskStyle,
        backgroundColor: toneEntry.text,
      }}
    />
  );
}

export default function BrandLogo({
  size = 'md',
  tone = 'primary',
  label = 'brand',
  className,
  emblemClassName,
  textClassName,
}: BrandLogoProps) {
  const entry = sizeMap[size];
  const toneEntry = toneMap[tone];

  return (
    <span
      className={joinClassNames('inline-flex items-center', className)}
      style={{ gap: entry.gap }}
    >
      {label === 'none' ? (
        <BrandLogoMark size={size} tone={tone} className={emblemClassName} />
      ) : (
        <BrandLogoLabelMark size={size} tone={tone} className={joinClassNames(emblemClassName, textClassName)} />
      )}
      {label === 'signature' && (
        <span
          className={joinClassNames('flex flex-col leading-none', textClassName)}
          style={{ color: toneEntry.text }}
        >
          <span
            style={{
              fontSize: entry.signatureText,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              textTransform: 'none',
            }}
          >
            Ali Al-Zuhairi
          </span>
          <span style={{ fontSize: '0.75em', opacity: 0.72, marginTop: '0.3em' }}>
            Design system identity
          </span>
        </span>
      )}
    </span>
  );
}