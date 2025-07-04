import React from 'react';
import Navigation from '@/components/Navigation';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostClient from '@/components/blog/BlogPostClient';
import BlogContent from '@/components/blog/BlogContent';
import Card from '@/components/Card';
import { posts } from '../../../blog/posts/data';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';
import Image from 'next/image';
import { Metadata } from 'next';
import { i18n } from '@/i18n';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const staticParams = [];
  
  // Generate all combinations of locales and slugs
  for (const locale of i18n.locales) {
    for (const post of posts) {
      staticParams.push({
        locale,
        slug: post.slug,
      });
    }
  }
  
  return staticParams;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
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
    publishedDate: new Date().toISOString(),
    readTime: '5 min read',
    content: ''
  };
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
  const postUrl = `${baseUrl}/${locale}/blog/${slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  
  return {
    title: `${localeContent.title} | Ali Al-Zuhairi`,
    description: localeContent.description || '',
    keywords: ['UX Design', 'Product Design', 'AI', 'Innovation', 'Helsinki', 'Design Leadership'],
    authors: [{ name: 'Ali Al-Zuhairi', url: baseUrl }],
    openGraph: {
      title: localeContent.title,
      description: localeContent.description,
      type: 'article',
      url: postUrl,
      siteName: 'Ali Al-Zuhairi',
      locale: locale === 'en' ? 'en_US' : 'fi_FI',
      publishedTime: localeContent.publishedDate,
      authors: ['Ali Al-Zuhairi'],
      tags: post.tags || [],
      images: [{ 
        url: imageUrl,
        width: 1500,
        height: 1000,
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
    },
    alternates: {
      canonical: postUrl,
      languages: {
        'en': `${baseUrl}/en/blog/${slug}`,
        'fi': `${baseUrl}/fi/blog/${slug}`,
      },
    },
  };
}

// Using the exact function signature expected by Next.js for pages
export default async function BlogPost({ 
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug, locale } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    // Use Next.js notFound() for proper 404 handling
    notFound();
    // Fallback return in case notFound isn't called immediately
    return null;
  }

  // Validate content existence
  if (!post.content) {
    console.error(`Post ${slug} is missing content property`);
  // Fallback to prevent rendering errors
    return (
      <main className="min-h-screen bg-theme text-theme">
        <Navigation />
        <div className="pt-32 pb-16 container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Content Not Available</h1>
          <p>The content for this post is not properly structured.</p>
        </div>
      </main>
    );
  }

  // Use a safer approach to get base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
  const shareUrl = `${baseUrl}/${locale}/blog/${slug}`;
  return (
    <BlogPostContent post={post} shareUrl={shareUrl} locale={locale} />
  );
}

function BlogPostContent({ post, shareUrl, locale }: { post: typeof posts[0], shareUrl: string, locale: string }) {
  // Safely get the content for the current locale or fall back to English
  const localeContent = post.content 
    ? (post.content[locale as keyof typeof post.content] || post.content.en || {
        title: 'Content Not Available',
        description: 'This content is not available in your language.',
        publishedDate: '',
        content: 'Content not available.',
        readTime: ''
      })
    : {
        title: 'Content Not Available',
        description: 'This content is not available.',
        publishedDate: '',
        content: 'Content not available.',
        readTime: ''
      };
  
  const isUsingFallback = post.content && !post.content[locale as keyof typeof post.content];
    // Get author biography description based on locale
  const getAuthorDescription = (locale: string) => {
    switch(locale) {
      case 'fi':
        return 'Tuoteomistaja ja design-johtaja, jolla on asiantuntemusta UX-suunnittelussa, ketterissä menetelmissä ja luovassa innovaatiossa.';
      default:
        return 'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.';
    }
  };
  // Translate "About the Author" text based on locale
  const getAboutAuthorText = (locale: string) => {
    switch(locale) {
      case 'fi':
        return 'Tietoa kirjoittajasta';
      default:
        return 'About the Author';
    }
  };
    // Get translation notice text if using fallback content
  const getTranslationNoticeText = () => {
    switch(locale) {
      case 'fi':
        return 'Tätä artikkelia ei ole vielä saatavilla suomeksi. Näytetään englanninkielinen versio.';
      default:
        return '';
    }
  };

  // Safely access properties with fallbacks
  const title = localeContent.title || 'Blog Post';
  const description = localeContent.description || '';
  const publishedDate = localeContent.publishedDate || '';
  const readTime = localeContent.readTime || '';
  const content = localeContent.content || '';

  return (
    <main className="min-h-screen bg-theme text-theme overflow-hidden">
      <Navigation />

      <BlogPostBackground />

      <article className="pt-24 pb-16 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <BlogPostClient shareUrl={shareUrl} title={title}>
            {/* Translation notice - only show if using fallback */}
            {isUsingFallback && locale !== 'en' && (
              <div className="mb-8 p-4 rounded-lg bg-yellow-50 border border-yellow-100 text-yellow-800">
                <p>{getTranslationNoticeText()}</p>
              </div>
            )}
            
            <BlogPostHeader
              title={title}
              description={description}
              publishedDate={publishedDate}
              readTime={readTime}
              author={post.author}
              tags={post.tags}
              image={post.image}
              slug={post.slug}  // Add slug for audio mapping
            />

            <BlogContent content={content} />

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-primary">{getAboutAuthorText(locale)}</h3>
              <Card variant="primary">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="w-24 h-24 relative rounded-full overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <Image
                      src="/images/me/ali.png"
                      alt={post.author}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{post.author}</h4>
                    <p className="opacity-80">
                      {getAuthorDescription(locale)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </BlogPostClient>
        </div>
      </article>
    </main>
  );
}

// This component handles different background styling based on theme
function BlogPostBackground() {
  return (
    <>
      {/* Light theme background - only visible in light theme */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0"></div>
      </div>

      {/* Dark/Colorful theme background - visible in dark and colorful themes */}
      <div className="absolute inset-0 z-0">
        <BackgroundEffect type="gradient" />
        <div className="absolute inset-0 pointer-events-none"></div>
      </div>
    </>
  );
}