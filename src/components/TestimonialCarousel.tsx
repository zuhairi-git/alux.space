'use client';

import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MotionDiv, MotionSpan } from '@/design-system';
import TestimonialWordCloud from './TestimonialWordCloud';

export interface Testimonial {
  text: string;
  name: string;
  position: string;
  highlights?: string[];
  initials?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

function highlightText(text: string, highlights: string[]): React.ReactNode[] {
  if (!highlights.length) return [text];

  // Build a regex that matches any of the highlight phrases (case-insensitive)
  const escaped = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
    return isHighlight ? (
      <span key={i} className="text-[var(--primary)] font-semibold">
        {part}
      </span>
    ) : (
      part
    );
  });
}

export default function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 8000,
}: TestimonialCarouselProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setActive(prev => (prev + 1) % testimonials.length);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [testimonials.length, autoPlayInterval]);

  const current = testimonials[active];
  const highlights = current.highlights ?? [];
  const avatarShapeClass = 'rounded-[calc(var(--card-radius)-0.75rem)]';

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Quote card — fixed height so text scrolls without pushing surrounding content */}
      <div className="relative w-full max-w-3xl h-[380px] md:h-[320px]">
        <AnimatePresence mode="wait" custom={direction}>
          <MotionDiv
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col bg-gradient-to-br from-[var(--card-from-bg)] to-[var(--card-to-bg)] border border-[var(--card-border)] backdrop-blur-xl rounded-3xl px-8 md:px-14 py-8 md:py-10 overflow-hidden"
          >
            {/* Decorative open-quote mark — inside card, clipped safely */}
            <span
              aria-hidden="true"
              className="absolute -top-4 -start-2 text-[9rem] md:text-[12rem] leading-none font-serif text-[var(--primary)] opacity-10 select-none pointer-events-none"
            >
              &ldquo;
            </span>
            {/* Quote text — scrollable if text overflows */}
            <div className="flex-1 overflow-y-auto pe-1 mb-6 scrollbar-thin">
              <p className="text-xs md:text-sm leading-relaxed text-foreground">
                {highlightText(current.text, highlights)}
              </p>
            </div>

            {/* Author — pinned to bottom */}
            <div className="flex items-center gap-4 flex-shrink-0 pt-4 border-t border-[var(--card-border)]">
              {/* Avatar */}
              <div className={`w-10 h-10 ${avatarShapeClass} bg-gradient-to-tr from-[var(--gradient-start)]/30 to-[var(--gradient-end)]/30 border border-[var(--card-border)] flex items-center justify-center flex-shrink-0`}>
                <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
                  {current.initials ?? current.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{current.name}</p>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{current.position}</p>
              </div>
            </div>
          </MotionDiv>
        </AnimatePresence>
      </div>

      {/* Avatar selector row */}
      {testimonials.length > 1 && (
        <div className="flex items-end justify-center gap-4">
          {testimonials.map((t, i) => {
            const isActive = i === active;
            const initials = t.initials ?? t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            return (
              // eslint-disable-next-line design-system/no-raw-html-elements -- avatar selector uses Framer Motion child, can't wrap in Button component
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`View testimonial from ${t.name}`}
                className="relative flex flex-col items-center gap-2 transition-all duration-300 focus:outline-none"
              >
                <MotionDiv
                  animate={{ opacity: isActive ? 1 : 0.45 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    ${avatarShapeClass} flex items-center justify-center font-bold
                    bg-gradient-to-tr from-[var(--gradient-start)]/30 to-[var(--gradient-end)]/30
                    border border-[var(--card-border)] transition-opacity duration-300 w-12 h-12 text-sm
                  `}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
                    {initials}
                  </span>
                </MotionDiv>
                <MotionSpan
                  animate={{ opacity: isActive ? 1 : 0.45 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-medium text-[var(--foreground)] whitespace-nowrap"
                >
                  {t.name}
                </MotionSpan>
              </button>
            );
          })}
        </div>
      )}

      {/* Word cloud — below everything */}
      <TestimonialWordCloud testimonials={testimonials} />
    </div>
  );
}
