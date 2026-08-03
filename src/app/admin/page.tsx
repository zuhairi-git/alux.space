import type { Metadata } from 'next';
import LocaleRedirect from '@/components/ui/LocaleRedirect';

/** Internal portal entry point — never indexed. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRedirectPage() {
  return <LocaleRedirect path="/portfolio/workflow/admin" />;
}
