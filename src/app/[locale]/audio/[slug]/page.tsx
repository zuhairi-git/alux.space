import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAudioBySlug, audioLibrary, getAudioBySlugAndLanguage } from '@/data/audioLibrary';
import AudioPageClient from './AudioPageClient';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

interface AudioPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'fi'];
  const params = [];
  
  for (const locale of locales) {
    for (const audio of audioLibrary) {
      params.push({
        locale,
        slug: audio.slug,
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: AudioPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const audio = getAudioBySlugAndLanguage(slug, locale as 'en' | 'fi' | 'ar') || getAudioBySlug(slug);

  if (!audio) {
    return {
      title: 'Audio Not Found',
    };
  }

  const pageUrl = `${baseUrl}/${locale}/audio/${slug}`;
  const imageUrl = audio.socialImage || audio.coverImage;
  const ogImage = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

  return {
    title: audio.seoTitle || `${audio.title} | Ali Al-Zuhairi Audio Library`,
    description: audio.seoDescription || audio.description,
    keywords: [
      'audio',
      'podcast',
      'narration',
      ...audio.tags,
      audio.category,
      audio.author
    ],
    authors: [{ name: audio.author, url: baseUrl }],
    openGraph: {
      title: audio.title,
      description: audio.description,
      type: 'website',
      url: pageUrl,
      siteName: 'Ali Al-Zuhairi',
      locale: locale === 'fi' ? 'fi_FI' : 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 1200,
          alt: audio.title,
          type: 'image/jpeg'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: audio.title,
      description: audio.description,
      creator: '@alialzuhairi',
      site: '@alialzuhairi',
      images: [ogImage],
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      // Audio-specific metadata
      'audio:src': `${baseUrl}${audio.filePath}`,
      'audio:type': audio.format || 'audio/mpeg',
      
      // Structured data for audio
      'og:audio': `${baseUrl}${audio.filePath}`,
      'og:audio:type': audio.format === 'MP3' ? 'audio/mpeg' : 'audio/wav',
      
      // Additional metadata
      'article:published_time': audio.publishedDate,
      'article:author': audio.author,
      'article:tag': audio.tags.join(','),
      'article:section': audio.category,
    },
  };
}

export default async function AudioPage({ params }: AudioPageProps) {
  const { slug } = await params;
  const audio = getAudioBySlug(slug);

  if (!audio) {
    notFound();
  }

  return <AudioPageClient audio={audio} />;
}
