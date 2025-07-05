import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MiniMap } from '@/components/map/mini-map';
import { StoryGrid } from '@/components/news/story-grid';
import { mockIncidents, mockNews as mockNewsStories } from '@/lib/mock-data';
import { formatDateTime, getSeverityColor, getIncidentTypeIcon } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

interface IncidentPageProps {
  params: { id: string };
}

export default function IncidentPage({ params }: IncidentPageProps) {
  const incident = mockIncidents.find((i) => i.id === params.id);

  if (!incident) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-dark">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-neutral-light/80 hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Incident Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl">{getIncidentTypeIcon(incident.type)}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                  incident.severity
                )} text-white`}
              >
                {incident.severity.toUpperCase()}
              </span>
              <span className="text-neutral-light/60">
                {formatDateTime(incident.timestamp)}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-light mb-4">
              {incident.title}
            </h1>
            <p className="text-xl text-neutral-light/80 leading-relaxed">
              {incident.description}
            </p>
          </div>

          {/* Mini Map */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-light mb-2">Incident Location</h3>
            <MiniMap incident={incident} className="h-64 rounded-lg" />
          </div>

          {/* Incident Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-light mb-2">Location</h3>
                <p className="text-neutral-light/80">
                  {incident.location.city}, {incident.location.country}
                </p>
              </div>
              {incident.source && (
                <div>
                  <h3 className="text-lg font-semibold text-neutral-light mb-2">Source</h3>
                  <p className="text-neutral-light/80">{incident.source}</p>
                </div>
              )}
              {incident.target && (
                <div>
                  <h3 className="text-lg font-semibold text-neutral-light mb-2">Target</h3>
                  <p className="text-neutral-light/80">{incident.target}</p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-light mb-2">Status</h3>
                <p className="text-neutral-light/80 capitalize">{incident.status}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-light mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {incident.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-light/10 rounded text-sm text-neutral-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Stories */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-light mb-4">Related Stories</h3>
            <StoryGrid
              stories={mockNewsStories.filter((story) =>
                story.relatedIncidents?.includes(incident.id)
              )}
              maxItems={3}
              showControls={false}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}