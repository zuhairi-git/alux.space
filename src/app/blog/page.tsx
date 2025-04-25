import React from 'react';
import { Metadata } from 'next';
import ClientBlogPage from '@/components/blog/ClientBlogPage';

export const metadata: Metadata = {
  title: 'Blog & Insights | Ali Al-Zuhairi',
  description: 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
  openGraph: {
    title: 'Blog & Insights | Ali Al-Zuhairi',
    description: 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    siteName: 'Ali Al-Zuhairi',
    locale: 'en_US',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/images/blog/blog-cover.jpg`,
        width: 1200,
        height: 630,
        alt: 'Blog & Insights | Ali Al-Zuhairi'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights | Ali Al-Zuhairi',
    description: 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    site: '@alialzuhairi',
    creator: '@alialzuhairi',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/images/blog/blog-cover.jpg`]
  },
  other: {
    'og:url': `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    'og:title': 'Blog & Insights | Ali Al-Zuhairi',
    'og:description': 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    'og:image': `${process.env.NEXT_PUBLIC_BASE_URL}/images/blog/blog-cover.jpg`,
    'og:image:alt': 'Blog & Insights | Ali Al-Zuhairi',
    'og:site_name': 'Ali Al-Zuhairi',
    'og:type': 'website',
    'og:locale': 'en_US',
    'twitter:url': `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    'twitter:card': 'summary_large_image',
    'twitter:site': '@alialzuhairi',
    'twitter:creator': '@alialzuhairi',
    'twitter:title': 'Blog & Insights | Ali Al-Zuhairi',
    'twitter:description': 'Thoughts, learnings, and perspectives on design leadership, product management, and the intersection of creativity and technology.',
    'twitter:image': `${process.env.NEXT_PUBLIC_BASE_URL}/images/blog/blog-cover.jpg`,
    'twitter:image:alt': 'Blog & Insights | Ali Al-Zuhairi'
  }
};

export default function BlogPage() {
  return <ClientBlogPage />;
}