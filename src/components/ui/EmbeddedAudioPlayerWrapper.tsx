import { getAudioFileBySlug } from '@/utils/serverAudioUtils';
import EmbeddedAudioPlayer from './EmbeddedAudioPlayer';

interface EmbeddedAudioPlayerWrapperProps {
  slug: string;
  className?: string;
}

export default async function EmbeddedAudioPlayerWrapper({ 
  slug, 
  className = '' 
}: EmbeddedAudioPlayerWrapperProps) {
  const audioFile = await getAudioFileBySlug(slug);

  if (!audioFile) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 ${className}`}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          Audio file not found: {slug}
        </div>
      </div>
    );
  }

  return <EmbeddedAudioPlayer audioFile={audioFile} className={className} />;
}
