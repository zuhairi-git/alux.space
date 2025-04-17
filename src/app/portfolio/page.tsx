import { getUnsplashPhoto } from '@/utils/unsplash';
import PortfolioClient from './PortfolioClient';

interface PortfolioItem {
  title: string;
  type: string;
  desc: string;
  link: string;
  gradient: string;
  photo?: {
    url: string;
    author?: {
      name: string;
      username: string;
      link: string;
    };
  };
}

export default async function PortfolioPage() {
  const portfolioItems: PortfolioItem[] = [
    {
      title: 'Collaboration & Leadership',
      type: 'Team Management',
      desc: 'Building bridges between design, development, and business through effective collaboration.',
      link: '/portfolio/collaboration',
      gradient: 'from-blue-400 to-purple-500',
      photo: {
        url: '/images/portfolio/collaboration/cover.jpg'
      }
    },
    {
      title: 'Career Development',
      type: 'Professional Growth',
      desc: 'Continuous learning and evolution in product design and leadership roles.',
      link: '/portfolio/jobseeking',
      gradient: 'from-purple-400 to-pink-500',
      photo: {
        url: '/images/portfolio/jobseeking/cover.jpeg'
      }
    }
  ];

  // Fetch Unsplash photos as fallback if local images fail to load
  const itemsWithPhotos = await Promise.all(
    portfolioItems.map(async (item) => {
      // If we already have a local image, use it
      if (item.photo) {
        return item;
      }
      
      // Otherwise try to get an Unsplash photo
      const photo = await getUnsplashPhoto(item.title.toLowerCase());
      if (photo) {
        return {
          ...item,
          photo: {
            url: photo.urls.regular,
            author: {
              name: photo.user.name,
              username: photo.user.username,
              link: photo.user.links.html,
            }
          }
        };
      }
      return item;
    })
  );

  return <PortfolioClient items={itemsWithPhotos} />;
}