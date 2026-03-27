'use client';

import React from 'react';

type ToggleSize = 'sm' | 'md';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: ToggleSize;
  className?: string;
}

const trackSize: Record<ToggleSize, string> = {
  sm: 'w-8 h-[18px]',
  md: 'w-11 h-6',
};

const thumbSize: Record<ToggleSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-5 h-5',
};

const thumbTranslate: Record<ToggleSize, string> = {
  sm: 'translate-x-[14px]',
  md: 'translate-x-5',
};

export default function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
}: ToggleProps) {
  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle'}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={[
          'relative inline-flex shrink-0 rounded-full',
          'transition-colors duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--btn-primary-bg)] focus-visible:ring-offset-2',
          'cursor-pointer',
          trackSize[size],
          checked
            ? 'bg-[var(--btn-primary-bg)]'
            : 'bg-[var(--foreground)]/15',
          disabled && 'opacity-50 cursor-not-allowed',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            'inline-block rounded-full bg-white shadow-sm',
            'transform transition-transform duration-200 ease-out',
            'mt-[2px] ml-[2px]',
            thumbSize[size],
            checked ? thumbTranslate[size] : 'translate-x-0',
          ].join(' ')}
        />
      </button>
      {label && (
        <span
          className={`text-sm text-[var(--foreground)] ${disabled ? 'opacity-50' : 'opacity-80'}`}
          onClick={handleClick}
          role="presentation"
        >
          {label}
        </span>
      )}
    </div>
  );
}
