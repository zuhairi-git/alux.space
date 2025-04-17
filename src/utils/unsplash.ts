import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '',
});

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  alt_description: string;
}

export async function getUnsplashPhoto(query: string): Promise<UnsplashPhoto | null> {
  try {
    const result = await unsplash.photos.getRandom({
      query,
      orientation: 'landscape',
    });

    if (result.errors) {
      console.error('Error fetching Unsplash photo:', result.errors[0]);
      return null;
    }

    return result.response as UnsplashPhoto;
  } catch (error) {
    console.error('Error fetching Unsplash photo:', error);
    return null;
  }
}

export function buildUnsplashSrcSet(photo: UnsplashPhoto, width: number): string {
  return `${photo.urls.raw}&w=${width}&fit=max&q=80`;
}