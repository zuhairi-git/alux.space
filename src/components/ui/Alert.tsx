'use client';

import React, { useState } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: string }> = {
  info: {
    bg: 'bg-[var(--color-info-bg)]',
    border: 'border-[var(--color-info-border)]',
    text: 'text-[var(--color-info)]',
    icon: 'info',
  },
  success: {
    bg: 'bg-[var(--color-success-bg)]',
    border: 'border-[var(--color-success-border)]',
    text: 'text-[var(--color-success)]',
    icon: 'check_circle',
  },
  warning: {
    bg: 'bg-[var(--color-warning-bg)]',
    border: 'border-[var(--color-warning-border)]',
    text: 'text-[var(--color-warning)]',
    icon: 'warning',
  },
  error: {
    bg: 'bg-[var(--color-error-bg)]',
    border: 'border-[var(--color-error-border)]',
    text: 'text-[var(--color-error)]',
    icon: 'error',
  },
};

export default function Alert({
  variant = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  const styles = variantStyles[variant];

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      className={[
        'flex gap-3 p-4 rounded-[var(--radius-lg)]',
        'border',
        styles.bg,
        styles.border,
        className,
      ].join(' ')}
    >
      {/* Icon */}
      <span className={`material-symbols text-xl shrink-0 mt-0.5 ${styles.text}`} aria-hidden="true">
        {styles.icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`text-sm font-semibold mb-1 ${styles.text}`}>{title}</h4>
        )}
        <div className="text-sm text-[var(--foreground)] opacity-80">{children}</div>
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 p-0.5 rounded opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Dismiss alert"
        >
          <span className="material-symbols text-lg" aria-hidden="true">close</span>
        </button>
      )}
    </div>
  );
}
