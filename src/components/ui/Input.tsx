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
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-40 pointer-events-none">
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
              'w-full px-3.5 py-2.5 text-sm',
              'bg-[var(--background)] text-[var(--foreground)]',
              'border rounded-[var(--radius-md)]',
              'transition-all duration-200 ease-out',
              'placeholder:text-[var(--foreground)]/30',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-red-500 focus:ring-red-500/30'
                : 'border-[var(--card-border)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/30',
              disabled && 'opacity-50 cursor-not-allowed',
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)] opacity-40 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs text-red-500 dark:text-red-400" role="alert">
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
