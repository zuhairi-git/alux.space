'use client';

import React, { useState } from 'react';
import { AudioMetadata } from '@/types/audio';
import AudioLibrary from '@/components/audio/AudioLibrary';
import Navigation from '@/components/Navigation';

const AudioLibraryClient: React.FC = () => {
  const [currentAudio, setCurrentAudio] = useState<AudioMetadata | null>(null);

  const handlePlayAudio = (audio: AudioMetadata) => {
    setCurrentAudio(audio);
    // You could implement a global audio player state here
    console.log('Playing audio:', audio.title);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <AudioLibrary onPlayAudio={handlePlayAudio} />
      </main>
    </div>
  );
};

export default AudioLibraryClient;
