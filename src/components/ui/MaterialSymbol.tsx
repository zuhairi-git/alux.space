/**
 * MaterialSymbol component
 * 
 * This component wraps Material Symbols icons.
 */

import React from 'react';

interface MaterialSymbolProps {
  name: string;
  className?: string;
}

export default function MaterialSymbol({ name, className = '' }: MaterialSymbolProps) {
  return (
    <span className={`material-symbols ${className}`}>
      {name}
    </span>
  );
}
