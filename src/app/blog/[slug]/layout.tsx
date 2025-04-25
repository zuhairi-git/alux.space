import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts } from '../posts/data';

async function getPostMetadata(slug: string) {
  const post = posts.find(p => p.slug === slug);
  if (!post) return null;
  
  return {
    title: post.title,
    description: post.description,
    image: post.image,
    type: 'article' as const,
    publishedTime: new Date(post.publishedDate).toISOString(),
    author: post.author,
    tags: post.tags
  };
}

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostMetadata(resolvedParams.slug);
  
  if (!post) {
    return notFound();
  }

  const ogImage = post.image.startsWith('http') ? post.image : `${process.env.NEXT_PUBLIC_BASE_URL}${post.image}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${resolvedParams.slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: post.type,
      publishedTime: post.publishedTime,
      url: url,
      siteName: 'Ali Al-Zuhairi',
      locale: 'en_US',
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      site: '@alialzuhairi',
      creator: '@alialzuhairi',
      images: [ogImage],
    },
    other: {
      'og:url': url,
      'og:title': post.title,
      'og:description': post.description,
      'og:image': ogImage,
      'og:image:alt': post.title,
      'og:site_name': 'Ali Al-Zuhairi',
      'og:type': 'article',
      'og:locale': 'en_US',
      'article:published_time': post.publishedTime,
      'article:author': post.author,
      'article:tag': post.tags.join(','),
      'twitter:url': url,
      'twitter:card': 'summary_large_image',
      'twitter:site': '@alialzuhairi',
      'twitter:creator': '@alialzuhairi',
      'twitter:title': post.title,
      'twitter:description': post.description,
      'twitter:image': ogImage,
      'twitter:image:alt': post.title
    }
  };
}

export default async function BlogPostLayout({ children }: Props) {
  return children;
}