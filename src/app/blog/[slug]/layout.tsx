import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts } from '../posts/data';

interface Props {
  params: { slug: string }
}

// Get metadata from our posts data
async function getPostMetadata(slug: string) {
  const post = posts.find(p => p.slug === slug);
  if (!post) return null;
  
  return {
    title: post.title,
    description: post.description,
    image: post.image,
    type: 'article' as const, // Explicitly type as OpenGraph type
    publishedTime: new Date(post.publishedDate).toISOString()
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostMetadata(params.slug);
  
  if (!post) {
    return notFound();
  }

  const ogImage = post.image.startsWith('http') ? post.image : `${process.env.NEXT_PUBLIC_BASE_URL}${post.image}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: post.type,
      publishedTime: post.publishedTime,
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
      images: [ogImage],
    }
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}