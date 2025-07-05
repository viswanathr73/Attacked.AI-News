import { SeverityLevel } from "@/types/incident";
import { getSeverityColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const getSeverityIcon = (level: SeverityLevel) => {
    switch (level) {
      case "low":
        return "🟢";
      case "medium":
        return "🟡";
      case "high":
        return "🟠";
      case "critical":
        return "🔴";
      default:
        return "⚪";
    }
  };

  const getSeverityBgColor = (level: SeverityLevel) => {
    switch (level) {
      case "low":
        return "bg-secure-teal";
      case "medium":
        return "bg-alert-amber";
      case "high":
        return "bg-gold";
      case "critical":
        return "bg-adversary-red";
      default:
        return "bg-neutral-light";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white",
        getSeverityBgColor(severity),
        className
      )}
    >
      <span className="mr-1">{getSeverityIcon(severity)}</span>
      {severity.toUpperCase()}
    </span>
  );
}
