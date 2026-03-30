'use client';

import React, { forwardRef } from 'react';

type ButtonVariant =
  | 'primary'    // Filled — highest emphasis
  | 'secondary'  // Outlined — medium emphasis
  | 'tertiary'   // Text-only — low emphasis
  | 'icon'       // Square icon-only button
  | 'ghost'      // Alias for tertiary (backward compat)
  | 'outline'    // Alias for secondary (backward compat)
  | 'cosmic'     // Special animated gradient
  | 'glass'      // Frosted-glass — for on-image placement
  | 'overlay';   // Dark frosted — for on-image placement

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Standard button sizes — height-anchored; precision padding for a premium feel
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9  px-4   text-[13px] gap-1.5 rounded-md',
  md: 'h-10 px-5   text-[14px] gap-2   rounded-md',
  lg: 'h-12 px-6   text-[15px] gap-2.5 rounded-lg',
};

// Icon variant sizes — square; matching radius
const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9  w-9  rounded-md',
  md: 'h-10 w-10 rounded-md',
  lg: 'h-12 w-12 rounded-lg',
};

const variantClasses: Record<ButtonVariant, string> = {
  // ── Primary: uses gradient token (solid in light/dark, vivid gradient in colorful) ──
  primary: [
    'relative [background:var(--btn-primary-gradient)] text-white font-[500]',
    'shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_var(--btn-primary-bg)]/20',
    'overflow-hidden',
    'hover:[background:var(--btn-primary-gradient-hover)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.15),0_6px_20px_var(--btn-primary-bg)]/30 hover:-translate-y-[1px]',
    'active:translate-y-0 active:scale-[0.98] active:shadow-sm',
  ].join(' '),

  // ── Secondary: gradient-tinted, primary-bordered — mirrors hero CTA style ──
  secondary: [
    'bg-gradient-to-r from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 backdrop-blur-sm',
    'border border-[var(--card-border)]',
    'text-[var(--primary)] font-[500]',
    'hover:from-[var(--primary)]/20 hover:to-[var(--gradient-mid)]/20 hover:border-[var(--primary)]/50 hover:-translate-y-[1px]',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),

  // ── Tertiary: refined text-only ─────────────────────
  tertiary: [
    'bg-transparent',
    'text-[var(--foreground)]/70 font-[500]',
    'hover:text-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg)]/[0.06]',
    'active:bg-[var(--btn-primary-bg)]/[0.10] active:scale-[0.98]',
  ].join(' '),

  // ── Icon: premium square button ───────────────────────────────
  icon: [
    'bg-transparent p-0',
    'border border-transparent text-[var(--foreground)]/60',
    'hover:text-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg)]/[0.06] hover:border-[var(--btn-primary-bg)]/20',
    'active:bg-[var(--btn-primary-bg)]/[0.10] active:scale-[0.98]',
  ].join(' '),

  // ── Backward-compat aliases ────────────────────────────────
  outline: [
    'bg-gradient-to-r from-[var(--primary)]/10 to-[var(--gradient-mid)]/10 backdrop-blur-sm',
    'border border-[var(--card-border)]',
    'text-[var(--primary)] font-[500]',
    'hover:from-[var(--primary)]/20 hover:to-[var(--gradient-mid)]/20 hover:border-[var(--primary)]/50 hover:-translate-y-[1px]',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent',
    'text-[var(--foreground)]/70 font-[500]',
    'hover:text-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg)]/[0.06]',
    'active:bg-[var(--btn-primary-bg)]/[0.10] active:scale-[0.98]',
  ].join(' '),

  // ── Cosmic: animated gradient — special decoration ─────────
  cosmic: [
    'bg-gradient-to-r from-[#00ffff] via-[#ff00cc] to-[#3b82f6]', // eslint-disable-line design-system/no-hardcoded-colors -- gradient art-direction literals; var() not usable inside Tailwind arbitrary value strings
    'bg-[length:200%_200%] animate-gradient-shift',
    'text-white font-medium',
    'rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    'active:translate-y-0',
  ].join(' '),

  // ── Glass: theme-primary frosted — primary-tinted, white text, on images ──
  glass: [
    'bg-[var(--primary)]/30 backdrop-blur-sm',
    'border border-[var(--primary)]/40',
    'text-white font-[500]',
    'hover:bg-[var(--primary)]/45 hover:border-[var(--primary)]/55 hover:-translate-y-[1px]',
    'active:translate-y-0 active:scale-[0.98]',
  ].join(' '),

  // ── Overlay: dark frosted — for buttons placed on images ──────
  overlay: [
    'bg-[var(--btn-overlay-bg)] backdrop-blur-sm',
    'border border-[var(--btn-overlay-border)]',
    'text-[var(--btn-overlay-text)] font-[500]',
    'hover:bg-[var(--btn-overlay-bg-hover)] hover:border-[var(--btn-overlay-border)] hover:-translate-y-[1px]',
    'active:translate-y-0 active:scale-[0.98]',
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
    const isDisabled = disabled;
    const isIcon = variant === 'icon';

    return (
      <button
        ref={ref}
        disabled={isDisabled || loading}
        aria-disabled={isDisabled || loading}
        aria-busy={loading}
        className={[
          'inline-flex items-center justify-center shrink-0',
          'transition-all duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 focus-visible:ring-offset-2',
          'cursor-pointer select-none',
          isIcon ? iconSizeClasses[size] : sizeClasses[size],
          variantClasses[variant],
          isDisabled && 'opacity-50 pointer-events-none',
          loading && !isDisabled && 'pointer-events-none',
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
