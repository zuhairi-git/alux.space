import AccessibilityClient from '@/components/portfolio/AccessibilityClient';
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
      title: 'Inclusive Design System Case Study | Portfolio',
      description: 'A comprehensive case study on building accessible design systems from the ground up—research-driven approach to creating inclusive digital products that work for everyone.',
    },
    fi: {
      title: 'Inklusiivinen suunnittelujärjestelmä tapaustutkimus | Portfolio',
      description: 'Kattava tapaustutkimus saavutettavien suunnittelujärjestelmien rakentamisesta alusta alkaen—tutkimuspohjainen lähestymistapa inklusiivisten digitaalisten tuotteiden luomiseen, jotka toimivat kaikille.',
    }
  };
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  const imageUrl = `${baseUrl}/images/portfolio/accessibility/accessiblity-showcase.jpg`;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/portfolio/accessibility`,
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
      canonical: `${baseUrl}/${locale}/portfolio/accessibility`,
      languages: {
        en: `${baseUrl}/en/portfolio/accessibility`,
        fi: `${baseUrl}/fi/portfolio/accessibility`,
      },
    },
  };
}

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // locale is provided by root layout context
  return <AccessibilityClient />;
}
