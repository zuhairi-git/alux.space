import React from 'react';
import { Metadata } from 'next';
import ClientBlogPage from '@/components/blog/ClientBlogPage';
import { posts } from './posts/data';
import Navigation from '@/components/Navigation';
import { i18n } from '@/i18n';

// Ensure absolute URL for images
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
const ogImage = `${baseUrl}/images/blog/blog-cover.jpg`;

export async function generateMetadata({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> {
  const { locale: paramLocale } = await params;
  const locale = paramLocale || i18n.defaultLocale;
  const url = `${baseUrl}/${locale}/blog`;
    const localizedMetadata = {
    en: {
      title: 'Blog & Insights | Ali Al-Zuhairi',
      description: 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    },
    fi: {
      title: 'Blogi & Näkemykset | Ali Al-Zuhairi',
      description: 'Ajatuksia, oppimista ja näkökulmia suunnittelujohtajuuteen, tuotehallintaan ja luovuuden ja teknologian risteyskohtaan.',
    }
  };
  
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
    return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      url: url,
      siteName: 'Ali Al-Zuhairi',
      locale: locale === 'en' ? 'en_US' : locale === 'fi' ? 'fi_FI' : 'ar_SA',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
          type: 'image/jpeg'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      site: '@alialzuhairi',
      creator: '@alialzuhairi',
      images: [ogImage]
    },
    alternates: {
      canonical: url,
      languages: i18n.locales.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}/blog`;
        return acc;
      }, {} as Record<string, string>),
    }
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale?: string }> }) {
  await params; // locale is provided by root layout context

  return (
    <>
      <Navigation />
      <ClientBlogPage posts={posts} />
    </>
  );
}