import React from 'react';
import Navigation from '@/components/Navigation';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostClient from '@/components/blog/BlogPostClient';
import BlogContent from '@/components/blog/BlogContent';
import Card from '@/components/Card';
import { posts } from '../posts/data';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Image from 'next/image';
import { Metadata } from 'next';
import { i18n } from '@/i18n';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  // Generate paths for all posts
  const paths = [];
  
  // For direct /blog/[slug] access (non-localized route)
  posts.forEach((post) => {
    paths.push({ slug: post.slug });
  });
  
  return paths;
}

// Updated Props type to match Next.js expectations
type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const locale = i18n.defaultLocale;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  // Safer content access
  if (!post.content) {
    return {
      title: 'Post Content Not Available',
      description: 'Content structure is missing',
    };
  }
  
  // Get content for current locale or fall back to English
  const localeContent = post.content[locale as keyof typeof post.content] || post.content.en || {
    title: 'Content Not Available',
    description: 'This content is not available in your language.',
  };
  
  return {
    title: localeContent.title || 'Blog Post',
    description: localeContent.description || '',
    openGraph: {
      title: localeContent.title,
      description: localeContent.description,
      images: [{ url: post.image }]
    }
  };
}

export default function BlogPost({ params }: Props) {
  const { slug } = params;
  const locale = i18n.defaultLocale;
  
  // Redirect to the localized version of the blog post
  redirect(`/${locale}/blog/${slug}`);
}
