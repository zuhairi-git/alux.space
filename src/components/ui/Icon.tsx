'use client';

import React from 'react';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'display';
type IconVariant = 'outline' | 'filled';
/** decorative: aria-hidden="true" | standalone: renders aria-label, requires label prop */
type IconPurpose = 'decorative' | 'standalone';

interface IconProps {
  /** Material Symbols icon name, e.g. "home", "settings" */
  name: string;
  /** Semantic size token — maps to font size + opsz axis correction */
  size?: IconSize;
  /** Fill axis: 'outline' (default) or 'filled' */
  variant?: IconVariant;
  /** Accessibility behaviour. Default: 'decorative' (aria-hidden="true") */
  purpose?: IconPurpose;
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

export default function Icon({
  name,
  size,
  variant = 'outline',
  purpose = 'decorative',
  label,
  className = '',
  style,
}: IconProps) {
  const fill = variant === 'filled' ? 1 : 0;
  const sizeEntry = size ? sizeMap[size] : undefined;
  const inlineStyle: React.CSSProperties = {
    ...(sizeEntry ? { fontSize: sizeEntry.fontSize } : null),
    fontVariationSettings: `'FILL' ${fill}, 'wght' ${sizeEntry?.wght ?? 'var(--material-symbols-weight)'}, 'GRAD' var(--material-symbols-grade), 'opsz' ${sizeEntry?.opsz ?? 'var(--material-symbols-optical-size)'}`,
    ...style,
  };

  return (
    <span
      className={`material-symbols ${className}`.trim()}
      style={inlineStyle}
      aria-hidden={purpose === 'decorative' ? 'true' : undefined}
      aria-label={purpose === 'standalone' ? label : undefined}
      role={purpose === 'standalone' ? 'img' : undefined}
    >
      {name}
    </span>
  );
}
