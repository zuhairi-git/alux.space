'use client';

import React, { forwardRef, useId } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, leftIcon, rightIcon, className = '', id, disabled, ...props }, ref) => {
    const autoId = useId();
    const inputId = id || autoId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const describedBy = [error ? errorId : null, helperText && !error ? helperId : null]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--foreground)] opacity-80"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-40 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            className={[
              'w-full h-10 px-3.5 text-[14px]',
              'bg-[var(--background)] text-[var(--foreground)]',
              'border rounded-md',
              'shadow-sm',
              'transition-all duration-150 ease-out',
              'placeholder:text-[var(--foreground)]/30',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]/30 focus:border-[var(--color-error)]'
                : 'border-[var(--card-border)] hover:border-[var(--btn-primary-bg)]/40 focus:border-[var(--btn-primary-bg)] focus:ring-[var(--btn-primary-bg)]/25',
              disabled && 'opacity-50 cursor-not-allowed',
              leftIcon ? 'ps-10' : '',
              rightIcon ? 'pe-10' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />

          {rightIcon && (
            <span className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-40 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-xs text-[var(--foreground)] opacity-50">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
