'use client';

import React from 'react';

export type CardElevation = 'flat' | 'raised' | 'floating';
export type CardGlow = 'primary' | 'secondary' | 'tertiary' | 'muted';

interface CardProps {
  /** Visual elevation level.
   * - `flat`     — borderless surface, no outer glow wrapper
   * - `raised`   — standard `.theme-card` + `.theme-card-content` (default)
   * - `floating` — raised + animated glow overlay
   */
  elevation?: CardElevation;
  /** Glow accent colour; only visible when `elevation="floating"`. */
  glow?: CardGlow;
  /** className applied to the outermost element. */
  className?: string;
  /** className applied to the inner content element (raised/floating only). */
  contentClassName?: string;
  children: React.ReactNode;
}

export default function Card({
  elevation = 'raised',
  glow = 'primary',
  className,
  contentClassName,
  children,
}: CardProps) {
  if (elevation === 'flat') {
    return (
      <div className={['theme-card-flex', className].filter(Boolean).join(' ')}>
        {children}
      </div>
    );
  }

  return (
    <div className={['theme-card', className].filter(Boolean).join(' ')}>
      {elevation === 'floating' && (
        <div
          className={`theme-card-glow theme-card-glow-${glow}`}
          aria-hidden="true"
        />
      )}
      <div className={['theme-card-content', contentClassName].filter(Boolean).join(' ')}>
        {children}
      </div>
    </div>
  );
}
