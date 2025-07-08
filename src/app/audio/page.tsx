import React from 'react';
import type { Metadata } from 'next';
import AudioLibraryClient from './AudioLibraryClient';
import { audioLibraryConfig } from '@/data/audioLibrary';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

export async function generateMetadata(): Promise<Metadata> {
  const ogImage = `${baseUrl}/images/main.jpg`;
  
  return {
    title: `${audioLibraryConfig.title} | Ali Al-Zuhairi`,
    description: audioLibraryConfig.description,
    keywords: ['audio', 'podcast', 'AI', 'technology', 'design', 'innovation', 'narration'],
    authors: [{ name: audioLibraryConfig.author, url: baseUrl }],
    openGraph: {
      title: audioLibraryConfig.title,
      description: audioLibraryConfig.description,
      type: 'website',
      url: `${baseUrl}/audio`,
      siteName: 'Ali Al-Zuhairi',
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: audioLibraryConfig.title,
          type: 'image/jpeg'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: audioLibraryConfig.title,
      description: audioLibraryConfig.description,
      creator: '@alialzuhairi',
      site: '@alialzuhairi',
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/audio`,
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
  };
}

export default function AudioLibraryPage() {
  return <AudioLibraryClient />;
}
