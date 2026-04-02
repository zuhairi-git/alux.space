'use client';

import React from 'react';

/**
 * Badge — unified status/label chip
 *
 * Variants:
 *  default   — primary-tinted (semantic state)
 *  success   — green
 *  warning   — amber (also used for "Featured" stars)
 *  error     — red
 *  info      — cyan/blue
 *  outline   — border-only, transparent bg (tags, neutral chips)
 *  gradient  — theme gradient bg, white text (category labels)
 *  glass     — frosted-glass, white/muted bg + backdrop-blur (on-image badges)
 *  overlay   — dark frosted, uses --badge-overlay-* tokens (floating/attribution)
 *  accent    — violet/purple tinted (e.g. case-study category)
 */
export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline'
  | 'gradient'
  | 'glass'
  | 'overlay'
  | 'accent';

export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show a small status dot before the label */
  dot?: boolean;
  /** Animate the status dot with a pulse (e.g. "in-progress" states) */
  animateDot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
};

const variantClasses: Record<BadgeVariant, string> = {
  default:  'bg-[var(--btn-primary-bg)]/15 text-[var(--btn-primary-bg)] border border-[var(--btn-primary-bg)]/20',
  success:  'bg-[var(--color-success-bg)] text-[var(--color-success)] border border-[var(--color-success-border)]',
  warning:  'bg-[var(--color-warning-bg)] text-[var(--color-warning)] border border-[var(--color-warning-border)]',
  error:    'bg-[var(--color-error-bg)] text-[var(--color-error)] border border-[var(--color-error-border)]',
  info:     'bg-[var(--color-info-bg)] text-[var(--color-info)] border border-[var(--color-info-border)]',
  outline:  'bg-transparent text-[var(--foreground)] border border-[var(--card-border)]',
  gradient: 'bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] text-white border-0 shadow-md',
  glass:    'bg-[var(--badge-glass-bg)] backdrop-blur-sm text-[var(--badge-glass-text)] border border-[var(--badge-glass-border)]',
  overlay:  'bg-[var(--badge-overlay-bg)] backdrop-blur-sm text-white border border-[var(--badge-overlay-border)]',
  accent:   'bg-[var(--badge-accent-bg)] backdrop-blur-sm text-[var(--badge-accent-text)] border border-[var(--badge-accent-border)]',
};

const dotColors: Record<BadgeVariant, string> = {
  default:  'bg-[var(--btn-primary-bg)]',
  success:  'bg-[var(--color-success)]',
  warning:  'bg-[var(--color-warning)]',
  error:    'bg-[var(--color-error)]',
  info:     'bg-[var(--color-info)]',
  outline:  'bg-[var(--foreground)]',
  gradient: 'bg-white',
  glass:    'bg-white',
  overlay:  'bg-white',
  accent:   'bg-[var(--badge-accent-text)]',
};

export default function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
  animateDot = false,
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      role="status"
      className={[
        'inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap',
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}${animateDot ? ' animate-pulse' : ''}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
