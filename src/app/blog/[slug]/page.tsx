import React from 'react';
import Navigation from '@/components/Navigation';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostClient from '@/components/blog/BlogPostClient';
import BlogContent from '@/components/blog/BlogContent';
import Card from '@/components/Card';
import { posts } from '../posts/data';
import BackgroundEffect from '@/components/hero/effects/BackgroundEffect';
import { ThemeProvider } from '@/context/ThemeContext';
import Image from 'next/image';
import { Metadata } from 'next';

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPost(props: Props) {
  const { slug } = await props.params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return null;

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${slug}`;

  return (
    <ThemeProvider>
      <BlogPostContent post={post} shareUrl={shareUrl} />
    </ThemeProvider>
  );
}

function BlogPostContent({ post, shareUrl }: { post: typeof posts[0], shareUrl: string }) {
  return (
    <main className="min-h-screen bg-theme text-theme overflow-hidden">
      <Navigation />

      <BlogPostBackground />

      <article className="pt-24 pb-16 relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <BlogPostClient shareUrl={shareUrl} title={post.title}>
            <BlogPostHeader
              title={post.title}
              description={post.description}
              publishedDate={post.publishedDate}
              readTime={post.readTime}
              author={post.author}
              tags={post.tags}
              image={post.image}
            />

            <BlogContent content={post.content} />

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-primary">About the Author</h3>
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
                      Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </BlogPostClient>
        </div>
      </article>

      <footer className="bg-theme text-theme opacity-70 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
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
