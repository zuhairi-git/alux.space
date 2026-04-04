'use client';

import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'display';
export type IconVariant = 'outline' | 'filled';
/** decorative: aria-hidden="true" | standalone: renders aria-label, requires label prop */
export type IconPurpose = 'decorative' | 'standalone';
export type IconSurfaceSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconTone = 'current' | 'default' | 'muted' | 'primary' | 'accent' | 'inverse';
export type IconSurfaceTone = 'neutral' | 'primary' | 'accent' | 'inverse';
type IconSurfaceShape = 'square' | 'circle';

export interface IconProps {
  /** Material Symbols icon name, e.g. "home", "settings" */
  name: string;
  /** Semantic size token — maps to font size + opsz axis correction */
  size?: IconSize;
  /** Fill axis: 'outline' (default) or 'filled' */
  variant?: IconVariant;
  /** Accessibility behaviour. Default: 'decorative' (aria-hidden="true") */
  purpose?: IconPurpose;
  /** Theme-resolved semantic icon color */
  tone?: IconTone;
  /** Required when purpose="standalone" */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<IconSize, { fontSize: string; opsz: string; wght: number }> = {
  xs:      { fontSize: 'var(--icon-size-xs)', opsz: 'var(--icon-opsz-xs)', wght: 100 },
  sm:      { fontSize: 'var(--icon-size-sm)', opsz: 'var(--icon-opsz-sm)', wght: 100 },
  md:      { fontSize: 'var(--icon-size-md)', opsz: 'var(--icon-opsz-md)', wght: 100 },
  lg:      { fontSize: 'var(--icon-size-lg)', opsz: 'var(--icon-opsz-lg)', wght: 100 },
  xl:      { fontSize: 'var(--icon-size-xl)', opsz: 'var(--icon-opsz-xl)', wght: 100 },
  '2xl':   { fontSize: 'var(--icon-size-2xl)', opsz: 'var(--icon-opsz-2xl)', wght: 100 },
  display: { fontSize: 'var(--icon-size-display)', opsz: 'var(--icon-opsz-display)', wght: 300 },
};

const surfaceMap: Record<IconSurfaceSize, { boxSize: string; radius: string; iconSize: IconSize }> = {
  xs: { boxSize: 'var(--icon-surface-size-xs)', radius: 'var(--icon-surface-radius-xs)', iconSize: 'xs' },
  sm: { boxSize: 'var(--icon-surface-size-sm)', radius: 'var(--icon-surface-radius-sm)', iconSize: 'sm' },
  md: { boxSize: 'var(--icon-surface-size-md)', radius: 'var(--icon-surface-radius-md)', iconSize: 'md' },
  lg: { boxSize: 'var(--icon-surface-size-lg)', radius: 'var(--icon-surface-radius-lg)', iconSize: 'lg' },
  xl: { boxSize: 'var(--icon-surface-size-xl)', radius: 'var(--icon-surface-radius-xl)', iconSize: 'xl' },
};

const toneMap: Record<IconTone, string> = {
  current: 'currentColor',
  default: 'var(--foreground)',
  muted: 'var(--muted-foreground)',
  primary: 'var(--primary)',
  accent: 'var(--accent-text)',
  inverse: 'var(--text-on-primary)',
};

const surfaceToneMap: Record<IconSurfaceTone, { background: string; border: string; iconTone: IconTone }> = {
  neutral: {
    background: 'color-mix(in srgb, var(--foreground) 8%, transparent)',
    border: 'color-mix(in srgb, var(--foreground) 10%, transparent)',
    iconTone: 'default',
  },
  primary: {
    background: 'color-mix(in srgb, var(--primary) 14%, transparent)',
    border: 'color-mix(in srgb, var(--primary) 22%, transparent)',
    iconTone: 'primary',
  },
  accent: {
    background: 'color-mix(in srgb, var(--accent-text) 14%, transparent)',
    border: 'color-mix(in srgb, var(--accent-text) 22%, transparent)',
    iconTone: 'accent',
  },
  inverse: {
    background: 'var(--primary)',
    border: 'transparent',
    iconTone: 'inverse',
  },
};

export interface IconSurfaceProps extends Omit<IconProps, 'className' | 'style'> {
  surfaceSize?: IconSurfaceSize;
  surfaceTone?: IconSurfaceTone;
  shape?: IconSurfaceShape;
  className?: string;
  surfaceStyle?: React.CSSProperties;
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export default function Icon({
  name,
  size,
  variant = 'outline',
  purpose = 'decorative',
  tone,
  label,
  className = '',
  style,
}: IconProps) {
  const fill = variant === 'filled' ? 1 : 0;
  const sizeEntry = size ? sizeMap[size] : undefined;
  const toneColor = tone ? toneMap[tone] : undefined;
  const inlineStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1em',
    height: '1em',
    lineHeight: 1,
    flexShrink: 0,
    ...(toneColor ? { color: toneColor } : null),
    ...(sizeEntry ? { fontSize: sizeEntry.fontSize } : null),
    fontVariationSettings: `'FILL' ${fill}, 'wght' ${sizeEntry?.wght ?? 'var(--material-symbols-weight)'}, 'GRAD' var(--material-symbols-grade), 'opsz' ${sizeEntry?.opsz ?? 'var(--material-symbols-optical-size)'}`,
    ...style,
  };

  return (
    <span
      className={joinClassNames('material-symbols', className)}
      style={inlineStyle}
      aria-hidden={purpose === 'decorative' ? 'true' : undefined}
      aria-label={purpose === 'standalone' ? label : undefined}
      role={purpose === 'standalone' ? 'img' : undefined}
    >
      {name}
    </span>
  );
}

export function IconSurface({
  surfaceSize = 'md',
  surfaceTone,
  shape = 'square',
  className,
  surfaceStyle,
  iconClassName,
  iconStyle,
  size,
  tone,
  ...iconProps
}: IconSurfaceProps) {
  const surfaceEntry = surfaceMap[surfaceSize];
  const surfaceToneEntry = surfaceTone ? surfaceToneMap[surfaceTone] : undefined;

  return (
    <span
      className={className}
      data-icon-surface={surfaceSize}
      data-icon-surface-tone={surfaceTone}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: surfaceEntry.boxSize,
        height: surfaceEntry.boxSize,
        minWidth: surfaceEntry.boxSize,
        minHeight: surfaceEntry.boxSize,
        borderRadius: shape === 'circle' ? '9999px' : surfaceEntry.radius,
        flexShrink: 0,
        ...(surfaceToneEntry
          ? {
              backgroundColor: surfaceToneEntry.background,
              border: `1px solid ${surfaceToneEntry.border}`,
            }
          : null),
        ...surfaceStyle,
      }}
    >
      <Icon
        {...iconProps}
        size={size ?? surfaceEntry.iconSize}
        tone={tone ?? surfaceToneEntry?.iconTone}
        className={iconClassName}
        style={iconStyle}
      />
    </span>
  );
}
