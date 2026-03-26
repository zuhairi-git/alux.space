import MediaCardsShowcase from '@/components/ui/MediaCardsShowcase';

export default function MediaCardsShowcasePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Media Cards</h1>
      <p className="text-sm opacity-60 mb-8">
        Showcase of different media card styles following our inclusive design system.
        These card components are designed for images, videos, and rich media content.
      </p>

      <MediaCardsShowcase />
    </div>
  );
}
