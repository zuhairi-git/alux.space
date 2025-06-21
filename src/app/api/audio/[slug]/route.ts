import { NextRequest, NextResponse } from 'next/server';
import { posts } from '@/app/blog/posts/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  // Find the blog post that corresponds to this audio
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
  const audioMap: Record<string, string> = {
    'primitive-human': '/audio/blog/blog03.mp3',
    'sharpened-by-machine': '/audio/blog/Sharpened-by-the-Machine_ AI-and-Human-Development.wav',
  };

  const audioCategoryMap: Record<string, string> = {
    'sharpened-by-machine': 'Deep Dive Podcast',
  };

  if (!audioMap[slug]) {
    return NextResponse.redirect(new URL('/', request.url));
  }  const content = post.content.en;
  const audioSrc = audioMap[slug];
  const category = audioCategoryMap[slug] || 'Audio';
  
  // Use the blog post's specific image for better social sharing
  const audioImageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
  
  // Determine audio file type and duration estimate
  const audioType = audioSrc.endsWith('.wav') ? 'audio/wav' : 'audio/mpeg';
  const estimatedDuration = slug === 'sharpened-by-machine' ? 'PT25M' : 'PT15M'; // ISO 8601 duration

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Primary Meta Tags -->
  <title>${category}: ${content.title}</title>
  <meta name="title" content="${category}: ${content.title}">
  <meta name="description" content="${content.description}">
  <meta name="author" content="${post.author}">
  <meta name="keywords" content="${post.tags.join(', ')}, podcast, audio, ${category.toLowerCase()}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="music.song">
  <meta property="og:url" content="${baseUrl}/api/audio/${slug}">
  <meta property="og:title" content="${category}: ${content.title}">
  <meta property="og:description" content="${content.description}">
  <meta property="og:image" content="${audioImageUrl}">
  <meta property="og:image:alt" content="${category} cover art for ${content.title}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="1200">
  <meta property="og:audio" content="${baseUrl}${audioSrc}">
  <meta property="og:audio:type" content="${audioType}">
  <meta property="og:site_name" content="Ali Al-Zuhairi">
  <meta property="music:duration" content="${estimatedDuration}">
  <meta property="music:musician" content="${post.author}">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="player">
  <meta property="twitter:url" content="${baseUrl}/api/audio/${slug}">
  <meta property="twitter:title" content="${category}: ${content.title}">
  <meta property="twitter:description" content="${content.description}">
  <meta property="twitter:image" content="${audioImageUrl}">
  <meta property="twitter:image:alt" content="${category} cover art for ${content.title}">
  <meta property="twitter:player" content="${baseUrl}/api/audio/${slug}/player">
  <meta property="twitter:player:width" content="600">
  <meta property="twitter:player:height" content="200">
  <meta property="twitter:creator" content="@alialzuhairi">
  
  <!-- Additional Meta -->
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#667eea">
  <link rel="canonical" href="${baseUrl}/api/audio/${slug}">
  <link rel="alternate" type="application/rss+xml" title="Ali Al-Zuhairi Podcast" href="${baseUrl}/podcast/rss">
  
  <!-- Structured Data for Podcast Episode -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": "${content.title}",
    "description": "${content.description}",
    "url": "${baseUrl}/api/audio/${slug}",
    "datePublished": "${content.publishedDate}",
    "duration": "${estimatedDuration}",
    "associatedMedia": {
      "@type": "MediaObject",
      "contentUrl": "${baseUrl}${audioSrc}",
      "encodingFormat": "${audioType}",
      "duration": "${estimatedDuration}"
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "${category}",
      "url": "${baseUrl}/podcast"
    },
    "author": {
      "@type": "Person",
      "name": "${post.author}",
      "url": "${baseUrl}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ali Al-Zuhairi",
      "url": "${baseUrl}",      "logo": {
        "@type": "ImageObject",
        "url": "${baseUrl}/images/logo/AluxLogo.svg"
      }
    },
    "image": "${audioImageUrl}",
    "thumbnailUrl": "${audioImageUrl}"
  }
  </script>
  <link rel="canonical" href="${baseUrl}/api/audio/${slug}">
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
    .container {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 40px;
      max-width: 600px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .category {
      background: rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
      display: inline-block;
    }
    
    h1 {
      font-size: 2.5rem;
      margin: 20px 0;
      line-height: 1.2;
    }
    
    .description {
      font-size: 1.1rem;
      opacity: 0.9;
      margin: 20px 0;
      line-height: 1.6;
    }
    
    .audio-player {
      margin: 30px 0;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 20px;
    }
    
    audio {
      width: 100%;
      border-radius: 10px;
    }
    
    .cta {
      background: linear-gradient(45deg, #ff6b6b, #ee5a52);
      color: white;
      padding: 15px 30px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;
      margin-top: 20px;
      transition: transform 0.2s;
    }
    
    .cta:hover {
      transform: translateY(-2px);
    }
    
    .author {
      margin-top: 30px;
      opacity: 0.8;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="category">${category}</div>
    <h1>${content.title}</h1>
    <p class="description">${content.description}</p>
    
    <div class="audio-player">
      <audio controls preload="metadata">
        <source src="${baseUrl}${audioSrc}" type="audio/wav">
        Your browser does not support the audio element.
      </audio>
    </div>
    
    <a href="${baseUrl}/en/blog/${slug}" class="cta">Read Full Article</a>
    
    <div class="author">
      By ${post.author} • ${content.readTime}
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
