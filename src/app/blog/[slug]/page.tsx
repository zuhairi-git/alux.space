import { posts } from '../posts/data';
import { Metadata } from 'next';
import { i18n } from '@/i18n';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  // Generate paths for all posts
  const paths: { slug: string }[] = [];
  
  // For direct /blog/[slug] access (non-localized route)
  posts.forEach((post) => {
    paths.push({ slug: post.slug });
  });
  
  return paths;
}

// Updated Props type to match Next.js expectations
type Props = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    const imageUrl = post.image.startsWith('http') ? post.image : `https://alux.space${post.image}`;
  
  return {
    title: localeContent.title || 'Blog Post',
    description: localeContent.description || '',
    openGraph: {
      title: localeContent.title,
      description: localeContent.description,
      type: 'article',
      url: `https://alux.space/blog/${slug}`,
      siteName: 'Ali Al-Zuhairi',
      locale: 'en_US',
      images: [{ 
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: localeContent.title,
        type: 'image/jpeg'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: localeContent.title,
      description: localeContent.description,
      creator: '@alialzuhairi',
      site: '@alialzuhairi',
      images: [imageUrl],
    }
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const locale = i18n.defaultLocale;
  
  // Redirect to the localized version of the blog post
  redirect(`/${locale}/blog/${slug}`);
}
