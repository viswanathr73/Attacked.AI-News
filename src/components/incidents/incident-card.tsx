"use client";

import { useState, useEffect } from "react";
import { Incident } from "@/types/incident";
import { formatDateTime, getIncidentTypeIcon } from "@/lib/utils";
import { SeverityBadge } from "./severity-badge";
import { MapPin, Clock, Target, Shield } from "lucide-react";
import { clsx as cn } from "clsx";
interface IncidentCardProps {
  incident: Incident;
  onClick: (incident: Incident) => void;
  variant?: "default" | "compact";
}

export function IncidentCard({
  incident,
  onClick,
  variant = "default",
}: IncidentCardProps) {
  const isCompact = variant === "compact";
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    setFormattedTime(formatDateTime(incident.timestamp));
  }, [incident.timestamp]);
  return (
    <div
      className="bg-neutral-dark/50 border border-neutral-light/20 rounded-lg p-4 hover:bg-neutral-dark/70 transition-all duration-200 cursor-pointer hover:border-gold/50 group"
      onClick={() => onClick(incident)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getIncidentTypeIcon(incident.type)}</span>
          <SeverityBadge severity={incident.severity} />
        </div>
        <div className="flex items-center text-xs text-neutral-light/60">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formattedTime}</span>
        </div>
      </div>

      <h3
        className={cn(
          "font-semibold text-neutral-light group-hover:text-gold transition-colors mb-2",
          isCompact ? "text-sm" : "text-base"
        )}
      >
        {incident.title}
      </h3>

      {!isCompact && (
        <p className="text-sm text-neutral-light/80 mb-3 line-clamp-2">
          {incident.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-neutral-light/60">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {incident.location.city}, {incident.location.country}
          </div>

          {incident.source && (
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              <span className="truncate max-w-20">{incident.source}</span>
            </div>
          )}

          {incident.target && (
            <div className="flex items-center">
              <Target className="w-3 h-3 mr-1" />
              <span className="truncate max-w-20">{incident.target}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              incident.status === "active"
                ? "bg-adversary-red/20 text-adversary-red"
                : incident.status === "resolved"
                ? "bg-secure-teal/20 text-secure-teal"
                : "bg-alert-amber/20 text-alert-amber"
            )}
          >
            {incident.status.toUpperCase()}
          </span>
        </div>
      </div>

      {incident.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {incident.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-neutral-light/10 rounded text-xs text-neutral-light/70"
            >
              {tag}
            </span>
          ))}
          {incident.tags.length > 3 && (
            <span className="px-2 py-1 bg-neutral-light/10 rounded text-xs text-neutral-light/70">
              +{incident.tags.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
