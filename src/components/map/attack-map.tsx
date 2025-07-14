"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Incident } from "@/types/incident";
import { MAPBOX_STYLE, DEFAULT_MAP_CONFIG } from "@/lib/constants";
import { getSeverityColor } from "@/lib/utils";

interface AttackMapProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
  className?: string;
}

export function AttackMap({
  incidents,
  onIncidentClick,
  className,
}: AttackMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clean up existing map if it exists
    if (map.current) {
      map.current.remove();
      map.current = null;
      setMapLoaded(false);
    }

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_STYLE,
      center: DEFAULT_MAP_CONFIG.center as [number, number],
      zoom: DEFAULT_MAP_CONFIG.zoom,
      projection: "globe",
    });

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setMapLoaded(false);
    };
  }, []); // Empty dependency array - only run on mount/unmount

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    const markers = document.querySelectorAll(".mapboxgl-marker");
    markers.forEach((marker) => marker.remove());

    // Add incident markers
    incidents.forEach((incident) => {
      const el = document.createElement("div");
      el.className = "incident-marker";
      el.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${getSeverityColor(incident.severity).replace(
          "bg-",
          "#"
        )};
        border: 2px solid white;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      `;

      el.addEventListener("click", () => onIncidentClick(incident));

      new mapboxgl.Marker(el)
        .setLngLat(incident.location.coordinates)
        .addTo(map.current!);
    });
  }, [incidents, mapLoaded, onIncidentClick]);

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}
