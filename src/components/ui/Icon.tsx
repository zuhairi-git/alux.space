'use client';

import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

/**
 * Icon component
 * 
 * This component handles Material Symbols icons.
 */
export default function Icon({ name, className = '' }: IconProps) {
  return (
    <span className={`material-symbols ${className}`}>
      {name}
    </span>
  );
}
