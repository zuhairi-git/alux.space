'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

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
      <MaterialSymbol className={`text-xl shrink-0 mt-0.5 ${styles.text}`}>
        {styles.icon}
      </MaterialSymbol>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`text-sm font-semibold mb-1 ${styles.text}`}>{title}</h4>
        )}
        <div className="text-sm text-[var(--foreground)] opacity-80">{children}</div>
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <Button variant="icon" size="sm" onClick={handleDismiss} aria-label="Dismiss alert" className="shrink-0 -mr-1 -mt-0.5">
          <Icon name="close" />
        </Button>
      )}
    </div>
  );
}
