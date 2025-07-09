'use client';

import React from 'react';
import AudioLibrary from '@/components/audio/AudioLibrary';
import Navigation from '@/components/Navigation';

const AudioLibraryClient: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <AudioLibrary />
      </main>
    </div>
  );
};

export default AudioLibraryClient;
