import type { Metadata } from 'next';
import { i18n } from '@/i18n';
import LocaleRedirect from '@/components/ui/LocaleRedirect';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

/** Internal portal entry point — never indexed. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRedirectPage() {
  return <LocaleRedirect path="/portfolio/workflow/admin" />;
}
