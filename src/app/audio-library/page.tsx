import { getAllAudioFiles } from '@/utils/serverAudioUtils';
import AudioLibrary from '@/components/AudioLibrary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audio Library - Unlisted',
  description: 'Browse all available audio content',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function UnlistedAudioPage() {
  const audioFiles = await getAllAudioFiles();

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover and listen to our collection of audio content. Each track is carefully curated to provide valuable insights and entertainment.
          </p>
        </div>

        <AudioLibrary audioFiles={audioFiles} />
      </div>
    </div>
  );
}
