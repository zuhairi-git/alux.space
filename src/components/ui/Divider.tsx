import React from 'react';

type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps {
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
}

export default function Divider({
  orientation = 'horizontal',
  label,
  className = '',
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`inline-block w-px self-stretch bg-[var(--card-border)] ${className}`}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={`flex items-center gap-4 ${className}`}
      >
        <div className="flex-1 h-px bg-[var(--card-border)]" />
        <span className="text-xs font-medium text-[var(--foreground)] opacity-40 uppercase tracking-wider whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-px bg-[var(--card-border)]" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={`border-0 h-px bg-[var(--card-border)] ${className}`}
    />
  );
}
