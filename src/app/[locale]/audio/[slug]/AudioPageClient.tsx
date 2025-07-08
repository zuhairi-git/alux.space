'use client';

import React from 'react';
import { AudioMetadata } from '@/types/audio';
import AudioPage from '@/components/audio/AudioPage';
import Navigation from '@/components/Navigation';

interface AudioPageClientProps {
  audio: AudioMetadata;
}

const AudioPageClient: React.FC<AudioPageClientProps> = ({ audio }) => {
  const handlePlayAudio = () => {
    // Scroll to the audio player and start playing
    const audioPlayerElement = document.querySelector('[data-audio-player]');
    if (audioPlayerElement) {
      audioPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Try to trigger play on the audio player
      setTimeout(() => {
        const playButton = audioPlayerElement.querySelector('button[aria-label*="play"], button[aria-label*="Play"]');
        if (playButton && !playButton.getAttribute('aria-label')?.includes('pause')) {
          (playButton as HTMLButtonElement).click();
        }
      }, 500);
    }
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
