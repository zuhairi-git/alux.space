import { createApi } from 'unsplash-js';

// Validate Unsplash API key at initialization
const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '';
if (!accessKey && typeof window !== 'undefined') {
  console.warn('Warning: NEXT_PUBLIC_UNSPLASH_ACCESS_KEY is not defined. Unsplash API will not work properly.');
}

const unsplash = createApi({
  accessKey,
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
    // Check if access key is configured
    if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
      console.error('Error: NEXT_PUBLIC_UNSPLASH_ACCESS_KEY is not defined in environment variables');
      return null;
    }
    
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
    // Display more detailed error for debugging
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return null;
  }
}

export function buildUnsplashSrcSet(photo: UnsplashPhoto, width: number): string {
  return `${photo.urls.raw}&w=${width}&fit=max&q=80`;
}