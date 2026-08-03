'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { i18n, isLocale, getLocaleConfig } from '@/i18n';

/**
 * Bounces an un-prefixed legacy URL (e.g. /blog) to its localised equivalent
 * (e.g. /fi/blog).
 *
 * Locale detection used to live in middleware, but next.config.js sets
 * `output: 'export'` — which disables middleware entirely — so every one of
 * those un-prefixed paths was being exported as a second, permanently-English
 * copy of the page. Same job, done client-side, without the duplicate content.
 */
export default function LocaleRedirect({ path = '' }: { path?: string }) {
  const router = useRouter();
  const [target, setTarget] = useState(`/${i18n.defaultLocale}${path}`);

  useEffect(() => {
    const preferred = detectLocale();
    const destination = `/${preferred}${path}`;
    setTarget(destination);
    router.replace(destination);
  }, [router, path]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="text-center px-6">
        <div
          className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"
          role="status"
          aria-label="Redirecting"
        />
        <p className="text-ds-gray-400 font-medium">
          Redirecting…{' '}
          <Link href={target} className="underline">
            Continue
          </Link>
        </p>
      </div>
    </div>
  );
}

/** Saved preference first, then browser languages, then the default locale. */
function detectLocale(): string {
  try {
    const saved = localStorage.getItem('locale');
    if (isLocale(saved)) return saved;
  } catch {
    // storage unavailable — fall through to language negotiation
  }

  if (typeof navigator !== 'undefined') {
    const candidates = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    for (const candidate of candidates) {
      if (!candidate) continue;
      const base = candidate.toLowerCase().split('-')[0];
      const match = i18n.locales.find(
        (locale) => getLocaleConfig(locale).htmlLang.toLowerCase().split('-')[0] === base
      );
      if (match) return match;
    }
  }

  return i18n.defaultLocale;
}
