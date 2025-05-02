import React from 'react';
import Navigation from '@/components/Navigation';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostClient from '@/components/blog/BlogPostClient';
import BlogContent from '@/components/blog/BlogContent';
import Card from '@/components/Card';
import { posts } from '../../../blog/posts/data';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Image from 'next/image';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

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

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const { slug, locale } = params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  const localeContent = post.content[locale as keyof typeof post.content] || post.content.en;
  
  return {
    title: localeContent.title,
    description: localeContent.description,
  };
}

// Using the exact function signature expected by Next.js for pages
export default function BlogPost({ 
  params,
}: {
  params: { slug: string; locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { slug, locale } = params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return null;

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${locale}/blog/${slug}`;

  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <BlogPostContent post={post} shareUrl={shareUrl} locale={locale} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

function BlogPostContent({ post, shareUrl, locale }: { post: typeof posts[0], shareUrl: string, locale: string }) {
  // Get the content for the current locale or fall back to English
  const localeContent = post.content[locale as keyof typeof post.content] || post.content.en;
  
  // Get author biography description based on locale
  const getAuthorDescription = (locale: string) => {
    switch(locale) {
      case 'fi':
        return 'Tuoteomistaja ja design-johtaja, jolla on asiantuntemusta UX-suunnittelussa, ketterissä menetelmissä ja luovassa innovaatiossa.';
      case 'ar':
        return 'مالك المنتج وقائد التصميم مع خبرة في تصميم UX والمنهجيات الرشيقة والابتكار الإبداعي.';
      default:
        return 'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.';
    }
  };

  // Translate "About the Author" text based on locale
  const getAboutAuthorText = (locale: string) => {
    switch(locale) {
      case 'fi':
        return 'Tietoa kirjoittajasta';
      case 'ar':
        return 'عن الكاتب';
      default:
        return 'About the Author';
    }
  };

  return (
    <main className="min-h-screen bg-theme text-theme overflow-hidden">
      <Navigation />

      <BlogPostBackground />

      <article className="pt-24 pb-16 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <BlogPostClient shareUrl={shareUrl} title={localeContent.title}>
            <BlogPostHeader
              title={localeContent.title}
              description={localeContent.description}
              publishedDate={localeContent.publishedDate}
              readTime={localeContent.readTime}
              author={post.author}
              tags={post.tags}
              image={post.image}
            />

            <BlogContent content={localeContent.content} />

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