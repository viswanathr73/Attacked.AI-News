export interface Incident {
  id: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: SeverityLevel;
  timestamp: string;
  location: {
    country: string;
    city: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  source?: string;
  target?: string;
  status: "active" | "resolved" | "investigating";
  tags: string[];
}

export type IncidentType =
  | "cyberattack"
  | "natural-disaster"
  | "political-unrest"
  | "infrastructure-failure"
  | "security-breach"
  | "pandemic";

export type SeverityLevel = "low" | "medium" | "high" | "critical";
