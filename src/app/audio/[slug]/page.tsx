import { getAllAudioFiles, getAudioFileBySlug } from '@/utils/serverAudioUtils';
import { notFound } from 'next/navigation';
import StandaloneAudioPlayer from '@/components/ui/StandaloneAudioPlayer';
import AudioShareButton from '@/components/ui/AudioShareButton';
import { Metadata } from 'next';
import { formatDate } from '@/utils/audioUtils';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LabelIcon from '@mui/icons-material/Label';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface AudioPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const audioFiles = await getAllAudioFiles();
  return audioFiles.map((file) => ({
    slug: file.slug,
  }));
}

export async function generateMetadata({ params }: AudioPageProps): Promise<Metadata> {
  const { slug } = await params;
  const audioFile = await getAudioFileBySlug(slug);
  
  if (!audioFile) {
    return {
      title: 'Audio Not Found',
      description: 'The requested audio file could not be found.',
    };
  }

  return {
    title: audioFile.title,
    description: audioFile.description,
    openGraph: {
      title: audioFile.title,
      description: audioFile.description,
      type: 'music.song',
      url: `/audio/${audioFile.slug}`,
      images: [
        {
          url: '/images/audio-default.jpg',
          width: 1200,
          height: 630,
          alt: audioFile.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: audioFile.title,
      description: audioFile.description,
      images: ['/images/audio-default.jpg'],
    },
  };
}

export default async function AudioPage({ params }: AudioPageProps) {
  const { slug } = await params;
  const audioFile = await getAudioFileBySlug(slug);

  if (!audioFile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/audio-library"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowBackIcon className="w-5 h-5 mr-2" />
          Back to Audio Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {audioFile.title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {audioFile.description}
              </p>
            </div>

            {/* Audio Player */}
            <div className="mb-8">
              <StandaloneAudioPlayer 
                src={audioFile.filePath} 
                title={audioFile.title}
                description={audioFile.description}
              />
            </div>

            {/* Metadata */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <LabelIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                    <p className="font-medium text-gray-900 dark:text-white">{audioFile.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                    <CalendarTodayIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(audioFile.publishedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {audioFile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Share */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Share This Audio
              </h3>
              <AudioShareButton 
                url={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/audio/${audioFile.slug}`}
                title={audioFile.title}
                description={audioFile.description}
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">File Size</span>
                  <span className="font-medium text-gray-900 dark:text-white">~5.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Quality</span>
                  <span className="font-medium text-gray-900 dark:text-white">MP3 128kbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Mono/Stereo</span>
                  <span className="font-medium text-gray-900 dark:text-white">Stereo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
