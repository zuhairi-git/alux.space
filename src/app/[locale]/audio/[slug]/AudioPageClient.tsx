'use client';

import React from 'react';
import { AudioMetadata } from '@/types/audio';
import AudioPage from '@/components/audio/AudioPage';
import Navigation from '@/components/Navigation';

interface AudioPageClientProps {
  audio: AudioMetadata;
}

const AudioPageClient: React.FC<AudioPageClientProps> = ({ audio }) => {
  const handlePlayAudio = (audioToPlay: AudioMetadata) => {
    // You could implement a global audio player state here
    console.log('Playing audio:', audioToPlay.title);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <AudioPage audio={audio} onPlayAudio={handlePlayAudio} />
      </main>
    </div>
  );
};

export default AudioPageClient;
