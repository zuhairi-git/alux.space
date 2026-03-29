'use client';

import React from 'react';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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

/** Maps size tokens to font-size class, opsz optical size axis, and weight axis */
const sizeMap: Record<IconSize, { cls: string; opsz: number; wght: number }> = {
  xs:    { cls: 'text-[14px]', opsz: 20, wght: 300 },
  sm:    { cls: 'text-[16px]', opsz: 20, wght: 300 },
  md:    { cls: 'text-[20px]', opsz: 24, wght: 300 },
  lg:    { cls: 'text-[24px]', opsz: 24, wght: 300 },
  xl:    { cls: 'text-[32px]', opsz: 40, wght: 200 },
  '2xl': { cls: 'text-[48px]', opsz: 48, wght: 200 },
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

  // Only apply opsz-correct inline fontVariationSettings when size is explicitly provided.
  // When size is omitted, the Tailwind .material-symbols plugin class handles it via CSS vars.
  const sizeEntry = size ? sizeMap[size] : undefined;
  const inlineStyle = sizeEntry
    ? { fontVariationSettings: `'FILL' ${fill}, 'wght' ${sizeEntry.wght}, 'GRAD' 0, 'opsz' ${sizeEntry.opsz}`, ...style }
    : style;

  return (
    <span
      className={`material-symbols${sizeEntry ? ` ${sizeEntry.cls}` : ''} ${className}`}
      style={inlineStyle}
      aria-hidden={purpose === 'decorative' ? 'true' : undefined}
      aria-label={purpose === 'standalone' ? label : undefined}
      role={purpose === 'standalone' ? 'img' : undefined}
    >
      {name}
    </span>
  );
}
