import GameStrategyClient from '@/components/portfolio/GameStrategyClient';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
  const localizedMetadata = {
    en: {
      title: 'Game Development & Marketing Strategy | Portfolio',
      description: 'A data-driven game development and marketing strategy case study — from user personas and gameplay mechanics to launch planning and long-term retention.',
    },
    fi: {
      title: 'Pelinkehitys- ja markkinointistrategia | Portfolio',
      description: 'Dataohjattu pelinkehitys- ja markkinointistrategian tapaustutkimus — käyttäjäpersoonista ja pelimekaniikasta julkaisusuunnitelmiin ja pitkäaikaiseen pysyvyyteen.',
    }
  };
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/portfolio/game-strategy`,
      siteName: 'Ali Al-Zuhairi',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/portfolio/game-strategy`,
      languages: i18n.locales.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}/portfolio/game-strategy`;
        return acc;
      }, {} as Record<string, string>),
    }
  };
}

export default async function GameStrategyPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return <GameStrategyClient />;
}
