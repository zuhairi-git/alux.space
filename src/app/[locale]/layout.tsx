import { i18n } from '@/i18n';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate that the locale is supported
  if (!i18n.locales.includes(locale)) {
    notFound();
  }

  return children;
}
