'use client';

import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
};

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[var(--btn-primary-bg)]/15 text-[var(--btn-primary-bg)] border border-[var(--btn-primary-bg)]/20',
  success: 'bg-[var(--color-success-bg)] text-[var(--color-success)] border border-[var(--color-success-border)]',
  warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)] border border-[var(--color-warning-border)]',
  error:   'bg-[var(--color-error-bg)] text-[var(--color-error)] border border-[var(--color-error-border)]',
  info:    'bg-[var(--color-info-bg)] text-[var(--color-info)] border border-[var(--color-info-border)]',
  outline: 'bg-transparent text-[var(--foreground)] border border-[var(--card-border)]',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[var(--btn-primary-bg)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  error:   'bg-[var(--color-error)]',
  info:    'bg-[var(--color-info)]',
  outline: 'bg-[var(--foreground)]',
};

export default function Badge({
  variant = 'default',
  size = 'md',
  dot = false,
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
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
