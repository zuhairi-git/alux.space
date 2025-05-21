# Podcast Audio Files

This directory contains MP3 files for the podcast player featured in the hero section.

## File Structure

Audio files should follow this naming convention:
- Use lowercase letters
- Replace spaces with hyphens
- Use descriptive names that match the episode title

## Adding New Episodes

1. Place new MP3 files in this directory
2. Update the `podcasts.ts` file in `src/data/podcasts.ts` with:
   - A unique ID
   - Episode title
   - Description
   - Audio file path (relative to `/public`)
   - Publish date
   - Duration (in format MM:SS)
   - Optional tags
   - Optional featured flag

## Example Entry

```typescript
{
  id: 'new-episode-id',
  title: 'New Episode Title',
  description: 'Episode description goes here...',
  audioFile: '/audio/podcasts/episode-filename.mp3',
  publishDate: '2025-06-01',
  duration: '18:30',
  tags: ['Tag1', 'Tag2'],
  featured: true // Optional
}
```
