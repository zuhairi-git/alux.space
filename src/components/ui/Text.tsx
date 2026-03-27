'use client';

import React from 'react';

export type TextVariant =
  | 'hero'
  | 'h1' | 'h2' | 'h3' | 'h4'
  | 'body' | 'body-sm'
  | 'caption' | 'label' | 'overline';

interface TextProps {
  variant?: TextVariant;
  /** Override the rendered HTML element. Defaults to the semantic tag for each variant. */
  as?: React.ElementType;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

const variantDefaults: Record<TextVariant, { tag: React.ElementType; cls: string }> = {
  hero:     { tag: 'h1',    cls: 'text-[length:var(--text-hero)] font-bold    leading-[var(--leading-tight)]   tracking-[var(--ls-tight)]  font-[family-name:var(--font-poppins)]' },
  h1:       { tag: 'h1',    cls: 'text-[length:var(--text-h1)]  font-bold    leading-[var(--leading-tight)]   tracking-[var(--ls-tight)]  font-[family-name:var(--font-poppins)]' },
  h2:       { tag: 'h2',    cls: 'text-[length:var(--text-h2)]  font-semibold leading-[var(--leading-tight)]  tracking-[var(--ls-tight)]  font-[family-name:var(--font-poppins)]' },
  h3:       { tag: 'h3',    cls: 'text-[length:var(--text-h3)]  font-semibold leading-[var(--leading-snug)]   tracking-[var(--ls-tight)]  font-[family-name:var(--font-poppins)]' },
  h4:       { tag: 'h4',    cls: 'text-[length:var(--text-h4)]  font-medium   leading-[var(--leading-snug)]   font-[family-name:var(--font-poppins)]' },
  body:     { tag: 'p',     cls: 'text-[length:var(--font-size-base)] leading-[var(--leading-normal)]' },
  'body-sm':{ tag: 'p',     cls: 'text-[length:var(--font-size-sm)]  leading-[var(--leading-normal)]' },
  caption:  { tag: 'span',  cls: 'text-[length:var(--font-size-xs)]  leading-[var(--leading-normal)] opacity-70' },
  label:    { tag: 'label', cls: 'text-[length:var(--font-size-xs)]  font-medium   tracking-[var(--ls-wide)]  uppercase' },
  overline: { tag: 'span',  cls: 'text-[length:var(--font-size-xs)]  font-semibold tracking-[var(--ls-wider)] uppercase opacity-60' },
};

export default function Text({ variant = 'body', as, className, id, children }: TextProps) {
  const { tag: DefaultTag, cls } = variantDefaults[variant];
  const Tag = as ?? DefaultTag;
  return (
    <Tag id={id} className={[cls, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
