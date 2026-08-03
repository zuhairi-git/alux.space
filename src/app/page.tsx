import type { Metadata } from 'next';
import LocaleRedirect from '@/components/ui/LocaleRedirect';
import { i18n } from '@/i18n';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

/**
 * Entry point for the bare domain. Not indexable — it exists only to send
 * visitors to their language. `/{defaultLocale}` is the canonical homepage.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: `${baseUrl}/${i18n.defaultLocale}` },
};

export default function RootRedirectPage() {
  return <LocaleRedirect path="" />;
}
