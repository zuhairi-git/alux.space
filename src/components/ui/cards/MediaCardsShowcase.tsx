'use client';

import React from 'react';
import MediaCard from './MediaCard';

const MediaCardsShowcase = () => {
  
  // Sample data for the cards
  const cardData = [
    {
      title: 'Basic Image Card',
      description: 'Simple card with an image at the top and content below.',
      imagePath: '/images/blog/ai-brain.jpg',
      tags: ['Design', 'UI/UX'],
      date: 'May 10, 2025',
      imageAttribution: {
        name: 'John Doe',
        username: 'johndoe',
        link: 'https://unsplash.com/@johndoe',
      }
    },
    {
      title: 'Overlay Text Card',
      description: 'Card with text overlay on the image for a more dramatic effect.',
      imagePath: '/images/blog/ai-future.jpg',
      tags: ['Development', 'Web'],
      date: 'May 12, 2025',
      imageAttribution: {
        name: 'Jane Smith',
        username: 'janesmith',
        link: 'https://unsplash.com/@janesmith',
      }
    },
    {
      title: 'Horizontal Card',
      description: 'Card with image on the side for a balanced layout. This card has a longer description to demonstrate how the text wraps and fills the available space alongside the image.',
      imagePath: '/images/blog/human-ai.jpg',
      tags: ['Technology', 'Future'],
      date: 'May 15, 2025',
      imageAttribution: {
        name: 'Alex Johnson',
        username: 'alexj',
        link: 'https://unsplash.com/@alexj',
      }
    }
  ];
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Media Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <MediaCard
            variant="basic"
            title={cardData[0].title}
            description={cardData[0].description}
            imagePath={cardData[0].imagePath}
            tags={cardData[0].tags}
            date={cardData[0].date}
            imageAttribution={cardData[0].imageAttribution}
          />
          <MediaCard
            variant="overlay"
            title={cardData[1].title}
            description={cardData[1].description}
            imagePath={cardData[1].imagePath}
            tags={cardData[1].tags}
            date={cardData[1].date}
            imageAttribution={cardData[1].imageAttribution}
          />
          <div className="h-full">
            <MediaCard
              variant="horizontal"
              title={cardData[2].title}
              description={cardData[2].description}
              imagePath={cardData[2].imagePath}
              tags={cardData[2].tags}
              date={cardData[2].date}
              imageAttribution={cardData[2].imageAttribution}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCardsShowcase;

