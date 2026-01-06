import HealthcarePrioritizationClient from '@/components/portfolio/HealthcarePrioritizationClient';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

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
      title: 'Healthcare Product Prioritization Case Study | Portfolio',
      description: 'A case study on resolving conflicts between QA and Engineering leadership while maintaining delivery momentum in a regulated healthcare environment.',
    },
    fi: {
      title: 'Terveydenhuollon tuotepriorisointi Tapaustutkimus | Portfolio',
      description: 'Tapaustutkimus konfliktien ratkaisemisesta QA:n ja teknisen johdon välillä säilyttäen samalla toimitusvarmuuden säännellyssä terveydenhuoltoympäristössä.',
    }
  };
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  // TODO: Add a real image
  const imageUrl = `${baseUrl}/images/portfolio/healthcare/cover.jpg`;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/portfolio/healthcare-prioritization`,
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
      canonical: `${baseUrl}/${locale}/portfolio/healthcare-prioritization`,
      languages: {
        en: `${baseUrl}/en/portfolio/healthcare-prioritization`,
        fi: `${baseUrl}/fi/portfolio/healthcare-prioritization`,
      },
    },
  };
}

export default async function HealthcarePrioritizationPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // locale is provided by root layout context
  return <HealthcarePrioritizationClient />;
}
