'use client';

import React from 'react';

/**
 * SectionAccents
 *
 * Decorative background layer for sections.
 * Scatters tiny geometric shapes — dots, rings, diamonds, squares, crosses —
 * using design tokens exclusively. No animations; no scroll effects.
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
  // ── top-left cluster ────────────────────────────────
  { type: 'dot',     size: 4,  position: { top: '8%',   left: '4%' },   opacity: 0.14, color: 'primary' },
  { type: 'ring',    size: 10, position: { top: '13%',  left: '7%' },   opacity: 0.09, color: 'primary' },
  { type: 'diamond', size: 5,  position: { top: '5%',   left: '13%' },  opacity: 0.10, color: 'gradient-mid' },
  { type: 'square',  size: 3,  position: { top: '20%',  left: '2%' },   opacity: 0.12, color: 'gradient-end' },
  { type: 'dot',     size: 2,  position: { top: '22%',  left: '10%' },  opacity: 0.16, color: 'gradient-mid' },
  { type: 'cross',   size: 7,  position: { top: '28%',  left: '5%' },   opacity: 0.08, color: 'card-border' },

  // ── top-right cluster ───────────────────────────────
  { type: 'ring',    size: 12, position: { top: '6%',   right: '5%' },  opacity: 0.09, color: 'primary' },
  { type: 'dot',     size: 3,  position: { top: '11%',  right: '11%' }, opacity: 0.16, color: 'gradient-mid' },
  { type: 'diamond', size: 4,  position: { top: '7%',   right: '18%' }, opacity: 0.10, color: 'primary' },
  { type: 'cross',   size: 8,  position: { top: '16%',  right: '7%' },  opacity: 0.08, color: 'gradient-end' },
  { type: 'square',  size: 2,  position: { top: '4%',   right: '25%' }, opacity: 0.14, color: 'gradient-mid' },
  { type: 'ring',    size: 6,  position: { top: '22%',  right: '14%' }, opacity: 0.08, color: 'card-border' },

  // ── mid-left ────────────────────────────────────────
  { type: 'dot',     size: 2,  position: { top: '44%',  left: '1.5%' }, opacity: 0.12, color: 'primary' },
  { type: 'ring',    size: 8,  position: { top: '48%',  left: '5%' },   opacity: 0.08, color: 'gradient-mid' },
  { type: 'diamond', size: 3,  position: { top: '38%',  left: '9%' },   opacity: 0.10, color: 'gradient-end' },
  { type: 'square',  size: 2,  position: { top: '55%',  left: '3%' },   opacity: 0.09, color: 'gradient-mid' },

  // ── mid-right ───────────────────────────────────────
  { type: 'diamond', size: 4,  position: { top: '40%',  right: '3%' },  opacity: 0.09, color: 'gradient-end' },
  { type: 'square',  size: 3,  position: { top: '52%',  right: '8%' },  opacity: 0.10, color: 'primary' },
  { type: 'dot',     size: 2,  position: { top: '35%',  right: '14%' }, opacity: 0.14, color: 'gradient-mid' },
  { type: 'cross',   size: 7,  position: { top: '60%',  right: '3%' },  opacity: 0.07, color: 'card-border' },

  // ── bottom-left cluster ─────────────────────────────
  { type: 'ring',    size: 14, position: { bottom: '9%',  left: '4%' },   opacity: 0.08, color: 'gradient-end' },
  { type: 'dot',     size: 3,  position: { bottom: '5%',  left: '12%' },  opacity: 0.14, color: 'primary' },
  { type: 'diamond', size: 4,  position: { bottom: '15%', left: '7%' },   opacity: 0.10, color: 'gradient-mid' },
  { type: 'cross',   size: 7,  position: { bottom: '18%', left: '3%' },   opacity: 0.07, color: 'primary' },
  { type: 'square',  size: 2,  position: { bottom: '22%', left: '14%' },  opacity: 0.11, color: 'gradient-end' },

  // ── bottom-right cluster ────────────────────────────
  { type: 'dot',     size: 4,  position: { bottom: '8%',  right: '5%' },  opacity: 0.12, color: 'gradient-mid' },
  { type: 'ring',    size: 10, position: { bottom: '12%', right: '9%' },  opacity: 0.09, color: 'primary' },
  { type: 'square',  size: 3,  position: { bottom: '4%',  right: '4%' },  opacity: 0.14, color: 'gradient-end' },
  { type: 'diamond', size: 5,  position: { bottom: '18%', right: '16%' }, opacity: 0.08, color: 'primary' },
  { type: 'ring',    size: 6,  position: { bottom: '24%', right: '3%' },  opacity: 0.09, color: 'card-border' },

  // ── scattered interior drifts ───────────────────────
  { type: 'dot',     size: 2,  position: { top: '70%',  left: '18%' },  opacity: 0.09, color: 'gradient-end' },
  { type: 'diamond', size: 3,  position: { top: '62%',  right: '22%' }, opacity: 0.09, color: 'primary' },
  { type: 'square',  size: 2,  position: { top: '78%',  left: '28%' },  opacity: 0.08, color: 'gradient-mid' },
  { type: 'dot',     size: 2,  position: { top: '82%',  right: '30%' }, opacity: 0.10, color: 'gradient-end' },
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
