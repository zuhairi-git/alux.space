import JobSeekingClient from '@/components/portfolio/JobSeekingClient';
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
      title: 'Job Seeking Application Case Study | Portfolio',
      description: 'A mobile app designed to streamline job searches—especially for local, part-time, and weekend work.',
    },
    fi: {
      title: 'Työnhakusovelluksen tapaustutkimus | Portfolio',
      description: 'Mobiilisovellus, joka on suunniteltu helpottamaan työnhakua—erityisesti paikallisia, osa-aikaisia ja viikonlopputöitä.',
    }
  };
    const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  const imageUrl = `${baseUrl}/images/portfolio/jobseeking/cover.jpg`;
  
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/portfolio/jobseeking`,
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
      canonical: `${baseUrl}/${locale}/portfolio/jobseeking`,
      languages: i18n.locales.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}/portfolio/jobseeking`;
        return acc;
      }, {} as Record<string, string>),
    }
  };
}

export default async function JobSeekingPage({ params }: { params: Promise<{ locale: string }> }) {
  await params; // locale is provided by root layout context
  
  return <JobSeekingClient />;
}