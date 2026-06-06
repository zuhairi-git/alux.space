'use client';

import React from 'react';
import { resolveFontAwesomeName } from './Icon';

export interface MaterialSymbolProps {
  /** Legacy Material Symbols ligature name, e.g. "home", "arrow_forward" — translated to Font Awesome */
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Drop-in replacement for raw span icon elements using the legacy icon-naming convention.
 * Renders the Font Awesome glyph that corresponds to the legacy semantic name,
 * so call sites that pass the icon name as text content keep working unchanged.
 */
export default function MaterialSymbol({ children, className = '', style }: MaterialSymbolProps) {
  const faName = resolveFontAwesomeName(children);
  return (
    <span
      className={`icon-glyph fa-duotone fa-thin fa-${faName} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  );
}
