import { Incident } from "@/types/incident";
import { NewsStory } from "@/types/news";

export const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "Major Ransomware Attack on Healthcare System",
    description:
      "A sophisticated ransomware attack has compromised multiple hospitals across the region, affecting patient care systems.",
    type: "cyberattack",
    severity: "critical",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    location: {
      country: "United States",
      city: "New York",
      coordinates: [-74.006, 40.7128],
    },
    source: "Unknown",
    target: "Healthcare Infrastructure",
    status: "active",
    tags: ["ransomware", "healthcare", "critical-infrastructure"],
  },
  {
    id: "2",
    title: "Government Database Breach",
    description:
      "Unauthorized access detected in government database containing citizen records.",
    type: "security-breach",
    severity: "high",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    location: {
      country: "United Kingdom",
      city: "London",
      coordinates: [-0.1276, 51.5074],
    },
    source: "Unknown",
    target: "Government Systems",
    status: "investigating",
    tags: ["data-breach", "government", "personal-data"],
  },
  {
    id: "3",
    title: "Power Grid Cyberattack",
    description:
      "Coordinated attack on electrical grid infrastructure causing widespread outages.",
    type: "infrastructure-failure",
    severity: "high",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    location: {
      country: "Germany",
      city: "Berlin",
      coordinates: [13.405, 52.52],
    },
    source: "State Actor",
    target: "Energy Infrastructure",
    status: "active",
    tags: ["power-grid", "infrastructure", "energy"],
  },
  {
    id: "4",
    title: "Financial Institution DDoS Attack",
    description:
      "Large-scale distributed denial of service attack targeting major banking institutions.",
    type: "cyberattack",
    severity: "medium",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    location: {
      country: "Japan",
      city: "Tokyo",
      coordinates: [139.6917, 35.6895],
    },
    source: "Hacktivist Group",
    target: "Financial Services",
    status: "resolved",
    tags: ["ddos", "financial", "banking"],
  },
  {
    id: "5",
    title: "Supply Chain Malware Incident",
    description:
      "Malicious code discovered in widely-used software supply chain affecting multiple organizations.",
    type: "cyberattack",
    severity: "critical",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    location: {
      country: "Russia",
      city: "Moscow",
      coordinates: [37.6176, 55.7558],
    },
    source: "APT Group",
    target: "Global Supply Chain",
    status: "investigating",
    tags: ["supply-chain", "malware", "apt"],
  },
];

export const mockNews: NewsStory[] = [
  {
    id: "news-1",
    headline: "Healthcare Ransomware Attack Affects 50+ Hospitals",
    summary:
      "A coordinated ransomware campaign has disrupted operations at over 50 hospitals across three states, forcing emergency departments to divert patients.",
    content:
      "The attack, which began early Tuesday morning, has crippled electronic health records systems and forced hospitals to revert to paper-based processes...",
    author: "Sarah Chen",
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    imageUrl:
      "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    category: "Cybersecurity",
    tags: ["ransomware", "healthcare", "breaking"],
    relatedIncidents: ["1"],
  },
  {
    id: "news-2",
    headline: "Government Confirms Data Breach Investigation",
    summary:
      "Officials acknowledge ongoing investigation into unauthorized access of citizen database containing personal information of millions.",
    content:
      "The breach was discovered during routine security monitoring and affects approximately 2.3 million citizen records...",
    author: "Michael Rodriguez",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    category: "Government",
    tags: ["data-breach", "privacy", "investigation"],
    relatedIncidents: ["2"],
  },
];
