import { Incident } from "./incident";

export interface MapMarker {
  id: string;
  coordinates: [number, number];
  incident: Incident;
  isActive: boolean;
}

export interface MapProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
  className?: string;
}
