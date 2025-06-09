import CollaborationClient from '@/components/portfolio/CollaborationClient';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
    const localizedMetadata = {
    en: {
      title: 'Collaboration Workflow Platform Case Study | Portfolio',
      description: 'A case study on building a platform for seamless team collaboration, improving communication, and content delivery across devices and time zones.',
    },
    fi: {
      title: 'Yhteistyön työnkulkualustan tapaustutkimus | Portfolio',
      description: 'Tapaustutkimus alustasta saumattomaan tiimityöskentelyyn, viestinnän parantamiseen ja sisällön toimittamiseen eri laitteilla ja aikavyöhykkeillä.',
    }
  };
    const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  const imageUrl = `${baseUrl}/images/portfolio/collaboration/cover.jpg`;
  
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/portfolio/collaboration`,
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
      canonical: `${baseUrl}/${locale}/portfolio/collaboration`,
      languages: i18n.locales.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}/portfolio/collaboration`;
        return acc;
      }, {} as Record<string, string>),
    }
  };
}

export default async function CollaborationPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // locale is provided by root layout context
  return <CollaborationClient />;
}