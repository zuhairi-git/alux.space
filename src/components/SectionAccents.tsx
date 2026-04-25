'use client';

import React from 'react';

/**
 * SectionAccents
 *
 * Decorative background layer for sections.
 * Scatters a small number of low-contrast geometric shapes using design
 * tokens exclusively. No animations; no scroll effects.
 *
 * Reflected in the Design System at /design?s=backgrounds
 */

type ShapeType = 'dot' | 'ring' | 'diamond' | 'square' | 'cross';
type ColorToken = 'primary' | 'gradient-mid' | 'gradient-end' | 'card-border';

interface Shape {
  type: ShapeType;
  size: number; // px
  position: Record<string, string>;
  opacity: number;
  color: ColorToken;
}

const SHAPES: Shape[] = [
  { type: 'ring',    size: 10, position: { top: '12%',  left: '7%' },    opacity: 0.04, color: 'primary' },
  { type: 'dot',     size: 3,  position: { top: '18%',  right: '10%' },  opacity: 0.05, color: 'gradient-mid' },
  { type: 'diamond', size: 4,  position: { top: '42%',  left: '5%' },    opacity: 0.04, color: 'gradient-end' },
  { type: 'ring',    size: 12, position: { top: '48%',  right: '6%' },   opacity: 0.035, color: 'card-border' },
  { type: 'dot',     size: 2,  position: { bottom: '18%', left: '13%' }, opacity: 0.05, color: 'primary' },
  { type: 'square',  size: 3,  position: { bottom: '13%', right: '12%' }, opacity: 0.04, color: 'gradient-end' },
  { type: 'cross',   size: 7,  position: { bottom: '28%', left: '28%' }, opacity: 0.03, color: 'card-border' },
  { type: 'ring',    size: 8,  position: { top: '72%', right: '28%' },   opacity: 0.035, color: 'primary' },
];

function colorVar(token: ColorToken): string {
  return `var(--${token})`;
}

export default function SectionAccents() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {SHAPES.map((shape, i) => {
        const color = colorVar(shape.color);
        const pos: React.CSSProperties = {
          position: 'absolute',
          ...Object.fromEntries(
            Object.entries(shape.position).map(([k, v]) => [k, v])
          ),
        };

        if (shape.type === 'dot') {
          return (
            <div
              key={i}
              style={{
                ...pos,
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                background: color,
                opacity: shape.opacity,
              }}
            />
          );
        }

        if (shape.type === 'ring') {
          return (
            <div
              key={i}
              style={{
                ...pos,
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                border: `1px solid ${color}`,
                opacity: shape.opacity,
              }}
            />
          );
        }

        if (shape.type === 'diamond') {
          return (
            <div
              key={i}
              style={{
                ...pos,
                width: shape.size,
                height: shape.size,
                background: color,
                opacity: shape.opacity,
                transform: 'rotate(45deg)',
              }}
            />
          );
        }

        if (shape.type === 'square') {
          return (
            <div
              key={i}
              style={{
                ...pos,
                width: shape.size,
                height: shape.size,
                background: color,
                opacity: shape.opacity,
              }}
            />
          );
        }

        if (shape.type === 'cross') {
          return (
            <div
              key={i}
              style={{ ...pos, width: shape.size, height: shape.size, opacity: shape.opacity }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '1px',
                  top: '50%',
                  left: 0,
                  background: color,
                  transform: 'translateY(-50%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '100%',
                  left: '50%',
                  top: 0,
                  background: color,
                  transform: 'translateX(-50%)',
                }}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
