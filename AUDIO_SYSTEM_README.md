# Audio System Documentation

## Overview

This Next.js application features a comprehensive audio system with:
- **Unlisted Audio Library**: A centralized page displaying all audio files
- **Individual Audio Pages**: Dedicated pages for each audio file optimized for sharing
- **Embedded Audio Players**: Components that can be embedded in blog posts and content
- **Automatic Metadata Generation**: Script to scan and generate audio metadata

## Features

### 🎵 Audio Library (`/audio-library`)
- **Unlisted Page**: Not indexed by search engines but accessible via direct URL
- **Dynamic Filtering**: Search, filter by category/tags, and sort options
- **Responsive Design**: Grid and list view modes
- **Modern UI**: Clean, modern interface with smooth animations

### 🎯 Individual Audio Pages (`/audio/[slug]`)
- **Dedicated Pages**: Each audio file has its own shareable URL
- **SEO Optimized**: Proper meta tags and Open Graph data
- **Enhanced Player**: Full-featured audio player with waveform visualization
- **Social Sharing**: Built-in sharing functionality
- **Metadata Display**: Shows duration, category, tags, and publication date

### 🎧 Audio Components
- **StandaloneAudioPlayer**: Full-featured player for dedicated pages
- **EmbeddedAudioPlayer**: Compact player for embedding in content
- **AudioShareButton**: Social sharing component
- **AudioLibrary**: Main library browsing component

## File Structure

```
src/
├── app/
│   ├── audio-library/
│   │   ├── page.tsx          # Unlisted audio library page
│   │   └── layout.tsx        # Layout for audio library
│   └── audio/
│       ├── [slug]/
│       │   └── page.tsx      # Individual audio pages
│       └── layout.tsx        # Layout for audio pages
├── components/
│   ├── AudioLibrary.tsx      # Main library component
│   └── ui/
│       ├── StandaloneAudioPlayer.tsx   # Enhanced player
│       ├── EmbeddedAudioPlayer.tsx     # Compact player
│       └── AudioShareButton.tsx        # Sharing component
├── data/
│   └── audio.json            # Audio metadata
├── utils/
│   └── audioUtils.ts         # Audio utilities
└── scripts/
    └── generate-audio-metadata.js  # Metadata generation script
```

## Usage

### Adding New Audio Files

1. **Upload Audio**: Place audio files in `public/audio/` directory
2. **Generate Metadata**: Run `npm run audio:scan` to automatically scan and generate metadata
3. **Manual Editing**: Edit `src/data/audio.json` to customize titles, descriptions, and metadata

### Embedding Audio in Content

```tsx
import EmbeddedAudioPlayerWrapper from '@/components/ui/EmbeddedAudioPlayerWrapper';

// In your blog post or content
<EmbeddedAudioPlayerWrapper slug="your-audio-slug" />
```

**Example Usage:**
```tsx
// In your blog post component
import EmbeddedAudioPlayerWrapper from '@/components/ui/EmbeddedAudioPlayerWrapper';

export default function AIBlogPost() {
  return (
    <div className="prose max-w-none">
      <h1>The Future of AI in Development</h1>
      
      <p>
        Artificial Intelligence is transforming the way we develop software. 
        In this post, we'll explore the latest trends and innovations.
      </p>
      
      {/* Embed related audio content */}
      <div className="my-8">
        <EmbeddedAudioPlayerWrapper slug="embracing-ai" />
      </div>
      
      <p>
        As discussed in the audio above, AI tools are becoming increasingly 
        sophisticated and accessible to developers of all skill levels.
      </p>
    </div>
  );
}
```

### Direct Links

- **Audio Library**: `/audio-library` (unlisted)
- **Individual Audio**: `/audio/[slug]` (shareable)

## Audio Metadata Structure

Each audio file has the following metadata:

```json
{
  "id": "unique-id",
  "title": "Human-readable title",
  "description": "Audio description",
  "filePath": "/audio/path/to/file.mp3",
  "duration": "15:32",
  "category": "Technology",
  "tags": ["AI", "Technology"],
  "publishedAt": "2024-12-01T00:00:00Z",
  "slug": "url-friendly-slug"
}
```

## SEO & Sharing

### Open Graph Support
- Individual audio pages include Open Graph meta tags
- Optimized for social media sharing
- Custom audio artwork support

### URL Structure
- Clean, SEO-friendly URLs
- Proper canonical URLs
- Sitemap integration ready

## Performance Features

- **Static Generation**: Audio pages are statically generated at build time
- **Optimized Components**: Lazy loading and efficient rendering
- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Works without JavaScript

## Customization

### Styling
- Uses Tailwind CSS for styling
- Dark mode support
- Material-UI icons
- Framer Motion animations

### Audio Player Features
- Waveform visualization
- Playback speed control
- Volume control
- Skip forward/backward (10s)
- Progress bar with click-to-seek
- Responsive design

## Development

### Available Scripts
- `npm run audio:scan`: Regenerate audio metadata
- `npm run dev`: Start development server
- `npm run build`: Build for production

### Adding New Features
1. Update audio utilities in `src/utils/audioUtils.ts`
2. Modify components in `src/components/`
3. Update metadata structure in `src/data/audio.json`

## Browser Support

- Modern browsers with HTML5 audio support
- Progressive enhancement for older browsers
- Mobile-responsive design

## Future Enhancements

- [ ] Real-time waveform generation
- [ ] Playlist functionality
- [ ] Audio transcription support
- [ ] Analytics integration
- [ ] RSS feed for audio content
- [ ] Search functionality
- [ ] User favorites/bookmarks

## Accessibility

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- ARIA labels and descriptions
