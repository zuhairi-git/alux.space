import React from 'react';
import { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import { i18n, getLocaleConfig, alternateLanguages } from '@/i18n';

// Required for static site generation with internationalized routes
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

  const localizedMetadata: Record<string, { title: string; description: string }> = {
    en: {
      title: 'Ali Al-Zuhairi | Product Designer & UX Leader',
      description:
        'Personal portfolio showcasing product design, UX leadership, and creative project work.',
    },
    fi: {
      title: 'Ali Al-Zuhairi | Tuotesuunnittelija & UX-johtaja',
      description:
        'Henkilökohtainen portfolio, joka esittelee tuotesuunnittelua, UX-johtajuutta ja luovia projektitöitä.',
    },
  };

  const metadata = localizedMetadata[config.code] ?? localizedMetadata.en;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${config.code}`,
      locale: config.ogLocale,
    },
    alternates: {
      canonical: `${baseUrl}/${config.code}`,
      languages: alternateLanguages(baseUrl),
    },
  };
}

export default function LocalizedHomePage() {
  return <HomePage />;
}
