import { redirect } from 'next/navigation';
import { i18n } from '@/i18n';

export default async function DesignLocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/design/coming-soon`);
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
