'use client';

import React, { useState, useRef, useEffect, useCallback, forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      label,
      error,
      helperText,
      disabled = false,
      className = '',
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find((o) => o.value === value);
    const enabledOptions = options.filter((o) => !o.disabled);

    const close = useCallback(() => {
      setOpen(false);
      setActiveIndex(-1);
    }, []);

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          close();
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [open, close]);

    // Scroll active option into view
    useEffect(() => {
      if (open && activeIndex >= 0 && listRef.current) {
        const items = listRef.current.querySelectorAll('[role="option"]');
        items[activeIndex]?.scrollIntoView({ block: 'nearest' });
      }
    }, [activeIndex, open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else if (activeIndex >= 0 && enabledOptions[activeIndex]) {
            onChange?.(enabledOptions[activeIndex].value);
            close();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            setActiveIndex((prev) => Math.min(prev + 1, enabledOptions.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (open) {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
      }
    };

    const selectId = `select-${label?.replace(/\s/g, '-').toLowerCase() ?? 'field'}`;
    const listboxId = `${selectId}-listbox`;
    const hasError = Boolean(error);

    return (
      <div ref={ref} className={`relative ${className}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[var(--foreground)] mb-1.5 opacity-80"
          >
            {label}
          </label>
        )}

        <div ref={containerRef}>
          <button
            id={selectId}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-invalid={hasError}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            disabled={disabled}
            onClick={() => !disabled && setOpen(!open)}
            onKeyDown={handleKeyDown}
            className={[
              'w-full h-10 flex items-center justify-between',
              'px-3.5 text-[14px] rounded-md',
              'border shadow-sm transition-all duration-150 ease-out',
              'bg-[var(--background)] text-[var(--foreground)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--btn-primary-bg)]/25 focus-visible:ring-offset-1',
              'cursor-pointer',
              hasError
                ? 'border-[var(--color-error)]'
                : open
                  ? 'border-[var(--btn-primary-bg)] ring-2 ring-[var(--btn-primary-bg)]/25'
                  : 'border-[var(--card-border)] hover:border-[var(--btn-primary-bg)]/40',
              disabled && 'opacity-50 cursor-not-allowed',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className={selectedOption ? '' : 'opacity-50'}>
              {selectedOption?.label ?? placeholder}
            </span>
            <span
              className={`material-symbols text-[18px] opacity-50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              expand_more
            </span>
          </button>

          {open && (
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={label || 'Options'}
              className={[
                'absolute z-[var(--z-dropdown)] w-full mt-1',
                'max-h-60 overflow-auto rounded-[var(--radius-lg)]',
                'border border-[var(--card-border)]',
                'bg-[var(--background)] shadow-lg',
                'py-1',
              ].join(' ')}
            >
              {enabledOptions.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  className={[
                    'px-3 py-2 text-sm cursor-pointer transition-colors',
                    index === activeIndex && 'bg-[var(--btn-primary-bg)]/10',
                    option.value === value && 'text-[var(--btn-primary-bg)] font-medium',
                    option.value !== value && 'text-[var(--foreground)]',
                    'hover:bg-[var(--btn-primary-bg)]/10',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    onChange?.(option.value);
                    close();
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && (
          <p id={`${selectId}-error`} role="alert" className="mt-1 text-xs text-[var(--color-error)]">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${selectId}-helper`} className="mt-1 text-xs opacity-60">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
export default Select;
