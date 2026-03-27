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
  success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  error:   'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20',
  info:    'bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20',
  outline: 'bg-transparent text-[var(--foreground)] border border-[var(--card-border)]',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[var(--btn-primary-bg)]',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error:   'bg-red-500',
  info:    'bg-sky-500',
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
