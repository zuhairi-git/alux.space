'use client';

import React, { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'cosmic';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-md',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-lg',
  lg: 'px-7 py-3.5 text-base gap-2.5 rounded-xl',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]',
    'text-white font-semibold',
    'shadow-md hover:shadow-lg hover:-translate-y-0.5',
    'active:translate-y-0 active:shadow-sm',
  ].join(' '),
  secondary: [
    'bg-[var(--card-from-bg)] border border-[var(--card-border)]',
    'text-[var(--foreground)] font-medium',
    'hover:border-[var(--card-border-hover)] hover:shadow-md',
    'active:shadow-sm',
  ].join(' '),
  outline: [
    'bg-transparent border-2 border-[var(--primary)]',
    'text-[var(--primary)] font-medium',
    'hover:bg-[var(--primary)] hover:text-white',
    'active:opacity-80',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-[var(--foreground)] font-medium',
    'hover:bg-[var(--card-from-bg)]',
    'active:bg-[var(--card-to-bg)]',
  ].join(' '),
  // eslint-disable-next-line design-system/no-hardcoded-colors -- cosmic gradient matches btn-cosmic in tailwind.config.js; can't use var() in class strings
  cosmic: [
    'bg-gradient-to-r from-[#00ffff] via-[#ff00cc] to-[#3b82f6]',
    'bg-[length:200%_200%] animate-gradient-shift',
    'text-white font-medium',
    'rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    'active:translate-y-0',
  ].join(' '),
};

function Spinner({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`animate-spin h-4 w-4 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={[
          'inline-flex items-center justify-center',
          'transition-all duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
          'cursor-pointer',
          sizeClasses[size],
          variantClasses[variant],
          isDisabled && 'opacity-50 pointer-events-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading ? <Spinner /> : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
