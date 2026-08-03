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

/* Track outer dimensions */
const trackSize: Record<ToggleSize, string> = {
  sm: 'w-9 h-5',
  md: 'w-11 h-6',
};

/* Thumb circle */
const thumbSize: Record<ToggleSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4.5 h-4.5',
};

/* Checked → slide to right end (track-width − thumb-width − 2×padding) */
const thumbTranslate: Record<ToggleSize, string> = {
  sm: 'translate-x-4',        /* 36 − 14 − 2×3 = 16px */
  md: 'translate-x-[22px]',   /* 44 − 18 − 2×2 ≈ 22px */
};

/* Padding inside the track (space between edge and thumb) */
const thumbOffset: Record<ToggleSize, string> = {
  sm: 'top-[3px] start-[3px]',
  md: 'top-[3px] start-[2px]',
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
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'cursor-pointer',
          trackSize[size],
          checked
            ? 'bg-primary'
            : 'bg-foreground/25',
          disabled && 'opacity-50 cursor-not-allowed',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span
          aria-hidden="true"
          className={[
            'absolute rounded-full bg-white shadow-sm',
            'transition-transform duration-200 ease-out',
            thumbOffset[size],
            thumbSize[size],
            checked ? thumbTranslate[size] : 'translate-x-0',
          ].join(' ')}
        />
      </button>
      {label && (
        <span
          className={`text-sm text-foreground ${disabled ? 'opacity-50' : 'opacity-80'}`}
          onClick={handleClick}
          role="presentation"
        >
          {label}
        </span>
      )}
    </div>
  );
}
