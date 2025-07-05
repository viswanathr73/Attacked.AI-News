import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "critical":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

export function getIncidentTypeColor(type: string): string {
  switch (type) {
    case "cyberattack":
      return "bg-red-100 text-red-800";
    case "natural-disaster":
      return "bg-blue-100 text-blue-800";
    case "political-unrest":
      return "bg-purple-100 text-purple-800";
    case "infrastructure-failure":
      return "bg-orange-100 text-orange-800";
    case "security-breach":
      return "bg-pink-100 text-pink-800";
    case "pandemic":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
export function getIncidentTypeIcon(type: string) {
  switch (type) {
    case "fire":
      return "🔥";
    case "flood":
      return "🌊";
    case "earthquake":
      return "🌍";
    default:
      return "❓";
  }
}
export function formatDateTime(date: Date | string): string {
  if (typeof window === "undefined") return ""; // Prevent SSR mismatch
  return new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
