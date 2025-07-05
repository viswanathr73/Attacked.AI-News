import { Incident } from "@/types/incident";
import { IncidentCard } from "./incident-card";
import { Filter, SortAsc, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface IncidentListProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
  showFilters?: boolean;
  title?: string;
  variant?: "default" | "compact";
}

export function IncidentList({
  incidents,
  onIncidentClick,
  showFilters = false,
  title = "Recent Incidents",
  variant = "default",
}: IncidentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"timestamp" | "severity">("timestamp");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredIncidents = incidents
    .filter((incident) => {
      const matchesSearch =
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || incident.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "timestamp") {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      } else {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-light">{title}</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-light/60">
            {filteredIncidents.length} incidents
          </span>
          {showFilters && (
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-4 p-4 bg-neutral-dark/30 rounded-lg">
          <div className="flex-1 min-w-48">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-light/60" />
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-neutral-dark border border-neutral-light/20 rounded-md text-neutral-light placeholder-neutral-light/60 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-neutral-dark border border-neutral-light/20 rounded-md text-neutral-light focus:outline-none focus:border-gold"
          >
            <option value="all">All Types</option>
            <option value="cyberattack">Cyberattacks</option>
            <option value="natural-disaster">Natural Disasters</option>
            <option value="political-unrest">Political Unrest</option>
            <option value="infrastructure-failure">Infrastructure</option>
            <option value="security-breach">Security Breach</option>
            <option value="pandemic">Pandemic</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "timestamp" | "severity")
            }
            className="px-3 py-2 bg-neutral-dark border border-neutral-light/20 rounded-md text-neutral-light focus:outline-none focus:border-gold"
          >
            <option value="timestamp">Latest First</option>
            <option value="severity">Severity</option>
          </select>
        </div>
      )}

      <div className="space-y-3">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-8 text-neutral-light/60">
            <p>No incidents found matching your criteria.</p>
          </div>
        ) : (
          filteredIncidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onClick={onIncidentClick}
              variant={variant}
            />
          ))
        )}
      </div>
    </div>
  );
}
