import type { Metadata } from 'next';
import { i18n, getLocaleConfig, alternateLanguages } from '@/i18n';
import ComingSoonPageContent from '@/components/coming-soon/ComingSoonContent';

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const config = getLocaleConfig(locale);

  return {
    alternates: {
      canonical: `${baseUrl}/${config.code}/coming-soon`,
      languages: alternateLanguages(baseUrl, '/coming-soon'),
    },
    openGraph: { locale: config.ogLocale },
  };
}

// This is a server component that wraps the client component
export default function LocalizedComingSoonPage() {
  return <ComingSoonPageContent />;
}
