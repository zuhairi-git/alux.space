import { redirect } from 'next/navigation';
import { i18n } from '@/i18n';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function ComingSoonDesignPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Stay inside the locale — redirecting to the bare /coming-soon would bounce
  // through the legacy locale-detection stub for no reason.
  redirect(`/${locale}/coming-soon`);
}
