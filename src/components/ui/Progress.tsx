'use client';

import React from 'react';

type ProgressVariant = 'linear' | 'circular';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressProps {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
  className?: string;
}

const linearHeight: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const circularSizes: Record<ProgressSize, { size: number; stroke: number }> = {
  sm: { size: 32, stroke: 3 },
  md: { size: 48, stroke: 4 },
  lg: { size: 64, stroke: 5 },
};

export default function Progress({
  value,
  max = 100,
  variant = 'linear',
  size = 'md',
  label,
  showValue = false,
  className = '',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  if (variant === 'circular') {
    const { size: svgSize, stroke } = circularSizes[size];
    const radius = (svgSize - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `${Math.round(percentage)}% complete`}
        className={`relative inline-flex items-center justify-center ${className}`}
      >
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="var(--card-border)"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {showValue && (
          <span className="absolute text-[10px] font-semibold text-[var(--foreground)]">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }

  // Linear variant
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm font-medium text-[var(--foreground)] opacity-80">{label}</span>}
          {showValue && (
            <span className="text-xs font-medium text-[var(--foreground)] opacity-60">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `${Math.round(percentage)}% complete`}
        className={`w-full bg-[var(--card-border)] rounded-full overflow-hidden ${linearHeight[size]}`}
      >
        <div
          className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
