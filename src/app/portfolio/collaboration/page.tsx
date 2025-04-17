import { getUnsplashPhoto } from '@/utils/unsplash';
import CollaborationClient from './CollaborationClient';

interface Achievement {
  title: string;
  description: string;
  metrics: string[];
  imageQuery: string;
  photo?: {
    url: string;
    author: {
      name: string;
      username: string;
      link: string;
    };
  };
}

export default async function CollaborationPage() {
  const achievements: Achievement[] = [
    {
      title: 'Cross-functional Team Leadership',
      description: 'Led diverse teams of designers, developers, and stakeholders to deliver complex projects on time and within budget.',
      metrics: [
        'Improved team efficiency by 40% through streamlined processes',
        'Successfully delivered 12 major projects in 2024'
      ],
      imageQuery: 'team collaboration meeting'
    },
    {
      title: 'Design System Implementation',
      description: 'Spearheaded the development and adoption of a comprehensive design system across multiple product teams.',
      metrics: [
        'Reduced design inconsistencies by 80%',
        'Decreased development time by 35%'
      ],
      imageQuery: 'design system interface'
    }
  ];

  const achievementsWithPhotos = await Promise.all(
    achievements.map(async (achievement) => {
      const photo = await getUnsplashPhoto(achievement.imageQuery);
      if (photo) {
        return {
          ...achievement,
          photo: {
            url: photo.urls.regular,
            author: {
              name: photo.user.name,
              username: photo.user.username,
              link: photo.user.links.html,
            },
          },
        };
      }
      return achievement;
    })
  );

  return <CollaborationClient achievements={achievementsWithPhotos} />;
}