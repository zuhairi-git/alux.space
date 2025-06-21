import { NextRequest, NextResponse } from 'next/server';
import { posts } from '@/app/blog/posts/data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
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
  }

  const content = post.content.en;
  const audioSrc = audioMap[slug];
  const category = audioCategoryMap[slug] || 'Audio';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${category}: ${content.title}</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 160px;
    }
    
    .player {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 15px;
      padding: 20px;
      width: 100%;
      max-width: 560px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .category {
      font-size: 12px;
      font-weight: 600;
      opacity: 0.8;
      margin-bottom: 10px;
    }
    
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
      line-height: 1.3;
    }
    
    audio {
      width: 100%;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="player">
    <div class="category">${category}</div>
    <div class="title">${content.title}</div>
    <audio controls preload="metadata">
      <source src="${baseUrl}${audioSrc}" type="audio/wav">
      Your browser does not support the audio element.
    </audio>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Frame-Options': 'ALLOWALL',
    },
  });
}
