'use client';

import React from 'react';
import Link from 'next/link';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export default function Breadcrumb({
  items,
  separator,
  className = '',
}: BreadcrumbProps) {
  const separatorEl = separator || (
    <MaterialSymbol className="text-[14px] opacity-30">
      chevron_right
    </MaterialSymbol>
  );

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 && separatorEl}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={[
                    'font-medium',
                    isLast
                      ? 'text-[var(--foreground)]'
                      : 'text-[var(--foreground)] opacity-60',
                  ].join(' ')}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[var(--foreground)] opacity-60 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
