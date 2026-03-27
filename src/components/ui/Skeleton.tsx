'use client';

import React from 'react';

type SkeletonVariant = 'text' | 'circular' | 'rectangular';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

const shimmerClass =
  'animate-pulse bg-gradient-to-r from-[var(--card-from-bg)] via-[var(--card-border)] to-[var(--card-from-bg)] bg-[length:200%_100%]';

export default function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (variant === 'circular') {
    const size = width || height || 40;
    return (
      <div
        aria-busy="true"
        aria-label="Loading"
        role="status"
        className={`${shimmerClass} rounded-full shrink-0 ${className}`}
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
        }}
      />
    );
  }

  if (variant === 'rectangular') {
    return (
      <div
        aria-busy="true"
        aria-label="Loading"
        role="status"
        className={`${shimmerClass} rounded-[var(--radius-lg)] ${className}`}
        style={{ width: width ? style.width : '100%', height: height ? style.height : '120px' }}
      />
    );
  }

  // Text variant: renders multiple lines
  return (
    <div aria-busy="true" aria-label="Loading" role="status" className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${shimmerClass} rounded-[var(--radius-sm)]`}
          style={{
            width: i === lines - 1 && lines > 1 ? '75%' : width ? style.width : '100%',
            height: height ? style.height : '14px',
          }}
        />
      ))}
    </div>
  );
}
