'use client';

import React, { forwardRef } from 'react';
import Icon, { type IconProps, type IconSize, type IconTone } from './Icon';

export type ButtonVariant =
  | 'primary'    // Filled — highest emphasis
  | 'secondary'  // Outlined — medium emphasis
  | 'tertiary'   // Text-only — low emphasis
  | 'icon'       // Square icon-only button
  | 'ghost'      // Alias for tertiary (backward compat)
  | 'outline'    // Alias for secondary (backward compat)
  | 'cosmic'     // Special animated gradient
  | 'glass'      // Frosted-glass — for on-image placement
  | 'overlay';   // Dark frosted — for on-image placement

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface ButtonIconProps extends Omit<IconProps, 'size'> {
  buttonSize?: ButtonSize;
  emphasis?: 'inline' | 'icon-only';
  size?: IconSize;
  tone?: IconTone;
}

interface ButtonClassNameOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

const contentIconSizeMap: Record<ButtonSize, IconSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
};

const iconOnlyIconSizeMap: Record<ButtonSize, IconSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

function getButtonIconSize(buttonSize: ButtonSize, emphasis: 'inline' | 'icon-only') {
  return emphasis === 'icon-only' ? iconOnlyIconSizeMap[buttonSize] : contentIconSizeMap[buttonSize];
}

export function ButtonIcon({
  buttonSize = 'md',
  emphasis = 'inline',
  tone = 'current',
  size,
  ...props
}: ButtonIconProps) {
  return <Icon {...props} size={size ?? getButtonIconSize(buttonSize, emphasis)} tone={tone} />;
}

// Standard button sizes — height-anchored; precision padding for a premium feel
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[var(--btn-height-sm)] px-[var(--btn-padding-inline-sm)] text-[length:var(--btn-font-size-sm)] gap-[var(--btn-gap-sm)] rounded-[var(--btn-radius-sm)] [--button-icon-size:var(--btn-content-icon-size-sm)]',
  md: 'h-[var(--btn-height-md)] px-[var(--btn-padding-inline-md)] text-[length:var(--btn-font-size-md)] gap-[var(--btn-gap-md)] rounded-[var(--btn-radius-md)] [--button-icon-size:var(--btn-content-icon-size-md)]',
  lg: 'h-[var(--btn-height-lg)] px-[var(--btn-padding-inline-lg)] text-[length:var(--btn-font-size-lg)] gap-[var(--btn-gap-lg)] rounded-[var(--btn-radius-lg)] [--button-icon-size:var(--btn-content-icon-size-lg)]',
};

// Icon variant sizes — square; matching radius
const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-[var(--btn-icon-box-size-sm)] w-[var(--btn-icon-box-size-sm)] rounded-[var(--btn-radius-sm)] [--button-icon-size:var(--btn-icon-only-icon-size-sm)]',
  md: 'h-[var(--btn-icon-box-size-md)] w-[var(--btn-icon-box-size-md)] rounded-[var(--btn-radius-md)] [--button-icon-size:var(--btn-icon-only-icon-size-md)]',
  lg: 'h-[var(--btn-icon-box-size-lg)] w-[var(--btn-icon-box-size-lg)] rounded-[var(--btn-radius-lg)] [--button-icon-size:var(--btn-icon-only-icon-size-lg)]',
};

const buttonIconSlotClassName = [
  'inline-flex shrink-0 items-center justify-center leading-none text-current',
  '[&_svg]:h-[var(--button-icon-size)]',
  '[&_svg]:w-[var(--button-icon-size)]',
  '[&_svg]:shrink-0',
].join(' ');

const variantClasses: Record<ButtonVariant, string> = {
  // ── Primary: uses gradient token (solid in light/dark, vivid gradient in colorful) ──
  primary: [
    'relative [background:var(--btn-primary-gradient)] text-[var(--text-on-primary)] font-[500]',
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
    '[background:var(--gradient-cosmic)]',
    'bg-[length:200%_200%] animate-gradient-shift',
    'text-[var(--text-on-cosmic)] font-medium',
    'rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    'active:translate-y-0',
  ].join(' '),

  // ── Glass: theme-primary frosted — primary-tinted, white text, on images ──
  glass: [
    'bg-[var(--primary)]/30 backdrop-blur-sm',
    'border border-[var(--primary)]/40',
    'text-[var(--text-on-dark)] font-[500]',
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

export function getButtonClassName({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
}: ButtonClassNameOptions = {}) {
  const isIcon = variant === 'icon';

  return [
    'inline-flex items-center justify-center shrink-0',
    'transition-all duration-150 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50 focus-visible:ring-offset-2',
    'cursor-pointer select-none',
    isIcon ? iconSizeClasses[size] : sizeClasses[size],
    variantClasses[variant],
    disabled && 'opacity-50 pointer-events-none',
    loading && !disabled && 'pointer-events-none',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

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

function ButtonIconSlot({ children }: { children: React.ReactNode }) {
  if (!children) return null;

  return <span className={buttonIconSlotClassName}>{children}</span>;
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
    const iconOnlyContent = children ?? leftIcon ?? rightIcon;

    return (
      <button
        ref={ref}
        disabled={isDisabled || loading}
        aria-disabled={isDisabled || loading}
        aria-busy={loading}
        className={getButtonClassName({ variant, size, loading, disabled: isDisabled, className })}
        {...props}
      >
        {isIcon ? (
          loading ? <ButtonIconSlot><Spinner /></ButtonIconSlot> : <ButtonIconSlot>{iconOnlyContent}</ButtonIconSlot>
        ) : (
          <>
            {loading ? <ButtonIconSlot><Spinner /></ButtonIconSlot> : <ButtonIconSlot>{leftIcon}</ButtonIconSlot>}
            {children}
            {!loading && <ButtonIconSlot>{rightIcon}</ButtonIconSlot>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
