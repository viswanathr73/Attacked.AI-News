export const INCIDENT_TYPES = {
  'cyberattack': 'Cyber Attack',
  'natural-disaster': 'Natural Disaster',
  'political-unrest': 'Political Unrest',
  'infrastructure-failure': 'Infrastructure Failure',
  'security-breach': 'Security Breach',
  'pandemic': 'Pandemic'
} as const;

export const SEVERITY_LEVELS = {
  'low': 'Low',
  'medium': 'Medium',
  'high': 'High',
  'critical': 'Critical'
} as const;

export const STATUS_TYPES = {
  'active': 'Active',
  'resolved': 'Resolved',
  'investigating': 'Investigating'
} as const;

export const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v11';
export const DEFAULT_ZOOM = 2;
export const DEFAULT_CENTER: [number, number] = [0, 20];

export const DEFAULT_MAP_CONFIG = {
  center: [0, 20], // Adjusted for global view
  zoom: 2
};