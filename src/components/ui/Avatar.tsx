'use client';

import React from 'react';
import Image from 'next/image';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'away' | undefined;

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

const sizeMap: Record<AvatarSize, { container: string; text: string; px: number; statusDot: string }> = {
  sm: { container: 'w-8 h-8',   text: 'text-xs',   px: 32,  statusDot: 'w-2 h-2 border' },
  md: { container: 'w-10 h-10', text: 'text-sm',   px: 40,  statusDot: 'w-2.5 h-2.5 border-2' },
  lg: { container: 'w-14 h-14', text: 'text-lg',   px: 56,  statusDot: 'w-3 h-3 border-2' },
  xl: { container: 'w-20 h-20', text: 'text-2xl',  px: 80,  statusDot: 'w-4 h-4 border-2' },
};

const statusColors: Record<string, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
  away: 'bg-amber-500',
};

export default function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  status,
  className = '',
}: AvatarProps) {
  const s = sizeMap[size];

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={[
          s.container,
          'rounded-full overflow-hidden',
          'bg-[var(--primary)]/15',
          'flex items-center justify-center',
          'border-2 border-[var(--card-border)]',
        ].join(' ')}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={s.px}
            height={s.px}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span
            role="img"
            aria-label={alt || initials}
            className={`font-semibold text-[var(--primary)] select-none ${s.text}`}
          >
            {initials.slice(0, 2).toUpperCase()}
          </span>
        ) : (
          <span className={`material-symbols text-[var(--primary)] opacity-60 ${s.text}`} aria-hidden="true">
            person
          </span>
        )}
      </div>

      {status && (
        <span
          className={[
            'absolute bottom-0 right-0 rounded-full',
            'border-[var(--background)]',
            s.statusDot,
            statusColors[status],
          ].join(' ')}
          aria-label={status}
        />
      )}
    </div>
  );
}
