import type { Metadata } from 'next';
import LocaleRedirect from '@/components/ui/LocaleRedirect';
import { i18n } from '@/i18n';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

/** Legacy un-prefixed URL, kept alive as a redirect so old links don't 404. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: `${baseUrl}/${i18n.defaultLocale}/blog` },
};

export default function BlogRedirectPage() {
  return <LocaleRedirect path="/blog" />;
}
