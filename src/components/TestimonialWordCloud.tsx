'use client';

import React, { useMemo, useState } from 'react';
import { MotionDiv, Button } from '@/design-system';
import type { Testimonial } from './TestimonialCarousel';
import MaterialSymbol from '@/components/ui/MaterialSymbol';

// Words to exclude from the cloud
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'as','is','are','was','were','be','been','being','have','has','had',
  'do','does','did','will','would','could','should','may','might','shall',
  'not','no','nor','so','yet','both','either','neither','this','that',
  'these','those','it','its','he','she','they','we','you','i','me','him',
  'her','us','them','my','your','his','our','their','what','which','who',
  'whom','how','when','where','why','all','each','every','more','most',
  'other','into','than','then','there','about','from','also','very',
  'just','too','up','out','if','by','can','more','than','about','well',
]);

interface WordEntry {
  word: string;
  count: number;
  isHighlight: boolean;
}

function extractWords(testimonials: Testimonial[]): WordEntry[] {
  const freq: Record<string, number> = {};
  const highlightSet = new Set<string>();

  for (const t of testimonials) {
    for (const phrase of t.highlights ?? []) {
      phrase.toLowerCase().split(/\s+/).forEach(w => {
        const clean = w.replace(/[^a-zäöå]/gi, '');
        if (clean.length > 2) highlightSet.add(clean);
      });
    }
    t.text.toLowerCase().split(/\W+/).forEach(w => {
      if (w.length > 2 && !STOP_WORDS.has(w)) {
        freq[w] = (freq[w] ?? 0) + 1;
      }
    });
  }

  return Object.entries(freq)
    .filter(([, c]) => c > 0)
    .map(([word, count]) => ({ word, count, isHighlight: highlightSet.has(word) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 36);
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialWordCloud({ testimonials }: Props) {
  const [visible, setVisible] = useState(false);
  const words = useMemo(() => extractWords(testimonials), [testimonials]);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Keyword pills */}
      <MotionDiv
        id="testimonial-wordcloud"
        animate={{ opacity: visible ? 1 : 0, height: visible ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden w-full"
      >
        <div
          className="flex flex-wrap justify-center gap-x-2 gap-y-2 px-2 py-4"
          aria-label="Word cloud of testimonial keywords"
          role="list"
        >
          {words.map(({ word, count, isHighlight }, idx) => (
            <MotionDiv
              key={word}
              role="listitem"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{
                opacity: visible ? (isHighlight ? 0.95 : 0.35) : 0,
                scale: visible ? 1 : 0.75,
              }}
              transition={{ duration: 0.25, delay: visible ? idx * 0.018 : 0 }}
              title={`"${word}" — ${count} occurrence${count > 1 ? 's' : ''}`}
            >
              <span
                className="inline-flex items-center rounded-full text-[10px] font-medium px-2.5 py-1 border whitespace-nowrap cursor-default select-none transition-all duration-200 hover:opacity-100"
                style={{
                  color:       isHighlight ? 'var(--primary)' : 'var(--foreground)',
                  borderColor: isHighlight ? 'color-mix(in srgb, var(--primary) 40%, transparent)' : 'var(--card-border)',
                  background:  isHighlight ? 'color-mix(in srgb, var(--primary) 10%, transparent)' : 'var(--card-from-bg)',
                }}
              >
                {word}
              </span>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>

      {/* Toggle — matches hero style exactly */}
      <Button
        variant="tertiary"
        onClick={() => setVisible(v => !v)}
        aria-expanded={visible}
        aria-controls="testimonial-wordcloud"
        className="!h-auto !min-h-0 !rounded-full !text-[10px] uppercase tracking-widest !px-2.5 !py-1 !border gap-1.5"
        style={{
          color:       'var(--muted-foreground)',
          borderColor: 'var(--card-border)',
          background:  visible ? 'var(--card-from-bg)' : 'transparent',
        }}
      >
        <MaterialSymbol className="text-[13px]">
          {visible ? 'label_off' : 'label'}
        </MaterialSymbol>
        {visible ? 'Hide keywords' : 'Show keywords'}
      </Button>
    </div>
  );
}

