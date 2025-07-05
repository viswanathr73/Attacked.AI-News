'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Incident } from '@/types/incident';
import { MAPBOX_STYLE } from '@/lib/constants';
import { getSeverityColor } from '@/lib/utils';

interface MiniMapProps {
  incident: Incident;
  className?: string;
  zoom?: number;
}

export function MiniMap({ incident, className, zoom = 10 }: MiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !incident?.location?.coordinates) return;

    console.log("Coordinates:", incident.location.coordinates);

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      center: incident.location.coordinates,
      zoom,
      interactive: false,
    });

    const markerEl = document.createElement('div');
    markerEl.className = 'incident-marker';
    markerEl.style.cssText = `
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: ${getSeverityColor(incident.severity).replace('bg-', '#')};
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;

    new mapboxgl.Marker(markerEl)
      .setLngLat(incident.location.coordinates)
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, [incident, zoom]);

  return (
    <div className={className}>
      <div ref={containerRef} className="w-full h-full rounded-lg shadow-md" />
    </div>
  );
}