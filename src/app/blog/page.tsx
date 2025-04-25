import React from 'react';
import { Metadata } from 'next';
import ClientBlogPage from '@/components/blog/ClientBlogPage';

// Ensure absolute URL for images
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cvlanes.com';
const ogImage = `${baseUrl}/images/blog/blog-cover.jpg`;
const url = `${baseUrl}/blog`;

export const metadata: Metadata = {
  title: 'Blog & Insights | Ali Al-Zuhairi',
  description: 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: 'Blog & Insights | Ali Al-Zuhairi',
    description: 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    type: 'website',
    url: url,
    siteName: 'Ali Al-Zuhairi',
    locale: 'en_US',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Blog & Insights | Ali Al-Zuhairi',
        type: 'image/jpeg',
        secureUrl: ogImage.replace('http://', 'https://')
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights | Ali Al-Zuhairi',
    description: 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    site: '@alialzuhairi',
    creator: '@alialzuhairi',
    images: [ogImage]
  },
  other: {
    // Standard Open Graph
    'og:url': url,
    'og:title': 'Blog & Insights | Ali Al-Zuhairi',
    'og:description': 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    'og:image': ogImage,
    'og:image:secure_url': ogImage.replace('http://', 'https://'),
    'og:image:type': 'image/jpeg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Blog & Insights | Ali Al-Zuhairi',
    'og:site_name': 'Ali Al-Zuhairi',
    'og:type': 'website',
    'og:locale': 'en_US',
    
    // WhatsApp specific tags
    'og:image:url': ogImage,
    
    // Twitter
    'twitter:url': url,
    'twitter:card': 'summary_large_image',
    'twitter:site': '@alialzuhairi',
    'twitter:creator': '@alialzuhairi',
    'twitter:title': 'Blog & Insights | Ali Al-Zuhairi',
    'twitter:description': 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    'twitter:image': ogImage,
    'twitter:image:alt': 'Blog & Insights | Ali Al-Zuhairi'
  }
};

export default function BlogPage() {
  return <ClientBlogPage />;
}