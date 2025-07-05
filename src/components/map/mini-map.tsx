// src/components/map/mini-map.tsx
"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_STYLE } from "@/lib/constants";

interface MiniMapProps {
  coordinates: [number, number];
  zoom?: number;
}

export function MiniMap({ coordinates, zoom = 5 }: MiniMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    const map = new mapboxgl.Map({
      container: containerRef.current!,
      style: MAPBOX_STYLE,
      center: coordinates,
      zoom,
      interactive: false,
    });

    new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

    return () => map.remove();
  }, [coordinates, zoom]);

  return (
    <div ref={containerRef} className="w-full h-64 rounded-lg shadow-md" />
  );
}
