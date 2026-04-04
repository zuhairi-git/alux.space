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

const sizeMap: Record<BrandLogoSize, { emblem: string; brandText: string; signatureText: string; gap: string; radius: string }> = {
  sm: {
    emblem: '2.5rem',
    brandText: '0.95rem',
    signatureText: '0.8rem',
    gap: '0.625rem',
    radius: '0.875rem',
  },
  md: {
    emblem: '3rem',
    brandText: '1.1rem',
    signatureText: '0.95rem',
    gap: '0.75rem',
    radius: '1rem',
  },
  lg: {
    emblem: '4rem',
    brandText: '1.35rem',
    signatureText: '1.05rem',
    gap: '0.875rem',
    radius: '1.25rem',
  },
  xl: {
    emblem: '5rem',
    brandText: '1.6rem',
    signatureText: '1.15rem',
    gap: '1rem',
    radius: '1.5rem',
  },
};

const toneMap: Record<BrandLogoTone, { fill: string; text: string; shadow: string }> = {
  primary: {
    fill: 'var(--primary)',
    text: 'var(--primary)',
    shadow: 'color-mix(in srgb, var(--primary) 24%, transparent)',
  },
  accent: {
    fill: 'var(--accent-text)',
    text: 'var(--accent-text)',
    shadow: 'color-mix(in srgb, var(--accent-text) 24%, transparent)',
  },
  foreground: {
    fill: 'var(--color-gray-950)',
    text: 'var(--color-white)',
    shadow: 'color-mix(in srgb, var(--color-gray-950) 50%, transparent)',
  },
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

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
        boxShadow: `0 14px 32px ${toneEntry.shadow}`,
      }}
    >
      <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
        <rect width="512" height="512" fill={toneEntry.fill} />
        <path d="M212.913 113.693L255.595 73.6293L248.982 262.991L203.682 230.243L212.913 113.693Z" fill="white" />
        <path d="M299.017 113.685L255.769 73.6402L262.382 263.002L308.318 230.232L299.017 113.685Z" fill="white" />
        <path d="M207.595 113.984L158 90.5647L202.374 229.083L207.595 113.984Z" fill="white" />
        <path d="M304.405 113.984L354 90.5647L309.626 229.083L304.405 113.984Z" fill="white" />
        <path d="M118.163 334.438H120.339L130.451 369.51L115.731 422.502H90.131L118.163 334.438ZM146.963 406.886H125.587L130.963 387.174H141.203L126.099 334.438H149.523L177.555 422.502H151.443L146.963 406.886ZM186.07 334.438H211.67V422.502H186.07V334.438ZM217.046 401.894H244.438V422.502H217.046V401.894ZM291.16 423.526C282.2 423.526 275.288 422.8 270.424 421.35C265.56 419.899 261.976 417.552 259.672 414.31C257.539 411.323 256.216 407.526 255.704 402.918C255.192 398.31 254.936 391.44 254.936 382.31V334.438H280.536V387.43C280.536 390.587 280.621 393.616 280.792 396.518C280.963 398.822 281.347 400.486 281.944 401.51C282.541 402.534 283.565 403.174 285.016 403.43C286.296 403.771 288.344 403.942 291.16 403.942H294.104C294.787 403.942 295.555 403.856 296.408 403.686V423.398C295.811 423.483 294.957 423.526 293.848 423.526H291.16ZM301.784 334.438H327.384V382.31C327.384 390.672 327.213 396.987 326.872 401.254C326.531 405.52 325.592 409.104 324.056 412.006C322.349 415.334 319.747 417.894 316.248 419.686C312.749 421.478 307.928 422.63 301.784 423.142V334.438ZM336.527 334.438H365.583L421.519 422.502H392.335L336.527 334.438ZM383.375 352.358L393.103 334.438H421.135L396.815 373.606L383.375 352.358ZM360.591 382.566L373.903 403.686L364.047 422.502H336.015L360.591 382.566Z" fill="white" />
      </svg>
    </span>
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
      <BrandLogoMark size={size} tone={tone} className={emblemClassName} />
      {label !== 'none' && (
        <span
          className={joinClassNames('flex flex-col leading-none', textClassName)}
          style={{ color: toneEntry.text }}
        >
          <span
            style={{
              fontSize: label === 'signature' ? entry.signatureText : entry.brandText,
              fontWeight: 700,
              letterSpacing: label === 'signature' ? '-0.02em' : '0.08em',
              textTransform: label === 'signature' ? 'none' : 'uppercase',
            }}
          >
            {label === 'signature' ? 'Ali Al-Zuhairi' : 'Alux'}
          </span>
          {label === 'signature' && (
            <span style={{ fontSize: '0.75em', opacity: 0.72, marginTop: '0.3em' }}>
              Design system identity
            </span>
          )}
        </span>
      )}
    </span>
  );
}