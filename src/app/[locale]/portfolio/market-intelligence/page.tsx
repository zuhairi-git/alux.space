import MarketIntelligenceClient from '@/components/portfolio/MarketIntelligenceClient';
import { Metadata } from 'next';
import { i18n, alternateLanguages } from '@/i18n';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

  const localizedMetadata = {
    en: {
      title: 'AI-Powered Market Intelligence Mobile App | Portfolio',
      description: 'A comprehensive case study on designing a mobile-first, AI-powered market intelligence application for enterprise users relying on trusted financial content.',
    },
    fi: {
      title: 'Tekoälypohjainen markkinatiedon mobiilisovellus | Portfolio',
      description: 'Kattava tapaustutkimus mobiililähtöisen, tekoälypohjaisen markkinatietosovelluksen suunnittelusta yrityskäyttäjille, jotka luottavat luotettavaan taloudelliseen sisältöön.',
    }
  };
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  const imageUrl = `${baseUrl}/images/portfolio/market/market-intellegence.jpg`;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/portfolio/market-intelligence`,
      siteName: 'Ali Al-Zuhairi',
      locale: locale,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metadata.title,
          type: 'image/jpeg'
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      creator: '@alialzuhairi',
      site: '@alialzuhairi',
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/portfolio/market-intelligence`,
      languages: alternateLanguages(baseUrl, '/portfolio/market-intelligence'),
    },
  };
}

export default async function MarketIntelligencePage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // locale is provided by root layout context
  return <MarketIntelligenceClient />;
}
