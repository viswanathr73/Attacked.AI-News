"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { AttackMap } from "@/components/map/attack-map";
import { IncidentFeed } from "@/components/incidents/incident-feed";
import { FeaturedStories } from "@/components/news/featured-stories";
import { mockIncidents, mockNews as mockNewsStories } from "@/lib/mock-data";
import { Incident } from "@/types/incident";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const router = useRouter();

  const handleIncidentClick = (incident: Incident) => {
    router.push(`/incident/${incident.id}`);
  };

  return (
    <div className="min-h-screen bg-neutral-dark">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section with Map */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-light mb-4">
              Global Threat
              <span className="text-gold"> Intelligence</span>
            </h1>
            <p className="text-xl text-neutral-light/80 max-w-3xl mx-auto">
              Real-time monitoring and analysis of cyber attacks, natural
              disasters, and global incidents as they unfold worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map - Main Feature */}
            <div className="lg:col-span-2">
              <AttackMap
                incidents={mockIncidents}
                onIncidentClick={handleIncidentClick}
                className="h-96 lg:h-[500px]"
              />
            </div>

            {/* Live Incident Feed */}
            <div className="lg:col-span-1">
              <IncidentFeed
                incidents={mockIncidents.slice(0, 5)}
                onIncidentClick={handleIncidentClick}
              />
            </div>
          </div>
        </section>

        {/* Featured Stories */}
        <section>
          <FeaturedStories stories={mockNewsStories} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
