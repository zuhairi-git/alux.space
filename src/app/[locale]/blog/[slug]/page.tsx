import React from 'react';
import Navigation from '@/components/Navigation';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostClient from '@/components/blog/BlogPostClient';
import BlogContent from '@/components/blog/BlogContent';
import { posts } from '../../../blog/posts/data';
import BlogPostBackground from '@/components/blog/BlogPostBackground';
import Image from 'next/image';
import { Metadata } from 'next';
import { i18n, alternateLanguages, getLocaleConfig } from '@/i18n';
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
      locale: getLocaleConfig(locale).ogLocale,
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
      languages: alternateLanguages(baseUrl, `/blog/${slug}`),
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
      <main className="min-h-screen bg-background text-foreground">
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
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navigation />

      <BlogPostBackground />

      <article className="pt-24 pb-16 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <BlogPostClient shareUrl={shareUrl} title={title}>
            {/* Translation notice - only show if using fallback */}
            {isUsingFallback && locale !== 'en' && (
              <div className="mb-8 p-4 rounded-lg bg-ds-gold-50 border border-ds-gold-100 text-ds-gold-800">
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

            {/* ── About the Author ─────────────────────────────────── */}
            <section className="mt-16 pt-10 border-t border-[var(--card-border)]" aria-labelledby="author-heading">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {getAboutAuthorText(locale)}
              </p>

              <div className="relative rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card-from-bg)] p-6 md:p-8">
                {/* Decorative gradient accent */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-60" aria-hidden="true" />
                <div className="absolute -top-24 -end-24 w-64 h-64 rounded-full bg-[var(--primary-glow)] blur-3xl opacity-10 pointer-events-none" aria-hidden="true" />

                <div className="relative flex flex-col sm:flex-row gap-6 items-start">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-2xl overflow-hidden ring-2 ring-[var(--primary)]/20 shadow-[0_0_24px_var(--primary-glow)]">
                      <Image
                        src="/images/me/ali.png"
                        alt={post.author}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 id="author-heading" className="text-xl font-bold text-foreground mb-0.5">
                      {post.author}
                    </h2>
                    <p className="text-sm text-primary font-medium mb-3">
                      {locale === 'fi' ? 'Tuoteomistaja & Design-johtaja' : 'Product Owner & Design Leader'}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      {getAuthorDescription(locale)}
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-3">
                      <a
                        href="https://www.linkedin.com/in/ali-zuhairi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-[var(--card-border)] text-muted-foreground hover:text-primary hover:border-[var(--primary)]/40 transition-colors duration-200"
                        aria-label="LinkedIn profile"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </BlogPostClient>
        </div>
      </article>
    </main>
  );
}
