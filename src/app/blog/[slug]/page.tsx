import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import BlogPostClient from '@/components/blog/BlogPostClient';
import { posts } from '../posts/data';

// Add generateStaticParams export
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Helper function to convert markdown-style content to JSX
function formatContent(content: string) {
  return content.split('\n\n').map((block, index) => {
    const trimmedBlock = block.trim();
    if (trimmedBlock.startsWith('##')) {
      return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-blue-400">{trimmedBlock.replace('## ', '')}</h2>;
    }
    if (trimmedBlock.startsWith('###')) {
      return <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-blue-300">{trimmedBlock.replace('### ', '')}</h3>;
    }
    if (trimmedBlock.startsWith('*')) {
      return (
        <ul key={index} className="list-disc pl-6 mb-4 space-y-2">
          {trimmedBlock.split('\n').map((item, i) => (
            <li key={i} className="text-gray-300">{item.replace('* ', '')}</li>
          ))}
        </ul>
      );
    }
    if (trimmedBlock.match(/^\d\./)) {
      return (
        <div key={index} className="mb-4">
          <strong className="text-blue-300">{trimmedBlock.split('\n')[0]}</strong>
          <p className="text-gray-300 mt-1">{trimmedBlock.split('\n')[1]}</p>
        </div>
      );
    }
    return <p key={index} className="mb-4 text-lg text-gray-300 leading-relaxed">{trimmedBlock}</p>;
  });
}

type Props = {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: Props) {
  const resolvedParams = await params;
  const post = posts.find(p => p.slug === resolvedParams.slug);

  if (!post) {
    return null;
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/blog/${post.slug}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navigation />
      
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <BlogPostClient shareUrl={shareUrl} title={post.title}>
            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                  </svg>
                  {post.author}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  {post.publishedDate}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  {post.readTime}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-invert max-w-none">
              {formatContent(post.content)}
            </div>
          </BlogPostClient>
        </div>
      </article>

      <footer className="bg-black/40 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ali Al-Zuhairi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}