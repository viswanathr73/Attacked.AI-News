import { Incident } from "@/types/incident";
import { IncidentCard } from "./incident-card";
import { RefreshCw, Activity, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface IncidentFeedProps {
  incidents: Incident[];
  onIncidentClick: (incident: Incident) => void;
  autoRefresh?: boolean;
  maxItems?: number;
}

export function IncidentFeed({
  incidents,
  onIncidentClick,
  autoRefresh = false,
  maxItems = 10,
}: IncidentFeedProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  const sortedIncidents = incidents
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, maxItems);

  const handleRefresh = () => {
    const now = new Date();
    setIsRefreshing(true);
    setLastUpdate(now);
    setFormattedTime(now.toLocaleTimeString());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        const now = new Date();
        setLastUpdate(now);
        setFormattedTime(now.toLocaleTimeString());
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  useEffect(() => {
    // Client-only time formatting
    setFormattedTime(lastUpdate.toLocaleTimeString());
  }, [lastUpdate]);

  const getStatsData = () => {
    const total = incidents.length;
    const active = incidents.filter((i) => i.status === "active").length;
    const critical = incidents.filter((i) => i.severity === "critical").length;
    return { total, active, critical };
  };

  const stats = getStatsData();

  return (
    <div className="bg-neutral-dark/30 rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-gold" />
          <h2 className="text-lg font-semibold text-neutral-light">
            Live Feed
          </h2>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-neutral-light/10 rounded-md transition-colors"
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`w-4 h-4 text-neutral-light/60 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-neutral-dark/50 rounded-md p-2 text-center">
          <div className="text-lg font-bold text-neutral-light">
            {stats.total}
          </div>
          <div className="text-xs text-neutral-light/60">Total</div>
        </div>
        <div className="bg-neutral-dark/50 rounded-md p-2 text-center">
          <div className="text-lg font-bold text-alert-amber">
            {stats.active}
          </div>
          <div className="text-xs text-neutral-light/60">Active</div>
        </div>
        <div className="bg-neutral-dark/50 rounded-md p-2 text-center">
          <div className="text-lg font-bold text-adversary-red">
            {stats.critical}
          </div>
          <div className="text-xs text-neutral-light/60">Critical</div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center justify-between mb-4 text-xs text-neutral-light/60">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-secure-teal rounded-full animate-pulse"></div>
          <span>Live Updates</span>
        </div>
        <span>Last updated: {formattedTime ?? "..."}</span>
      </div>

      {/* Incident Feed */}
      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {sortedIncidents.length === 0 ? (
          <div className="text-center py-8 text-neutral-light/60">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No recent incidents</p>
          </div>
        ) : (
          sortedIncidents.map((incident) => (
            <IncidentCard
              key={incident.id}
              incident={incident}
              onClick={onIncidentClick}
              variant="compact"
            />
          ))
        )}
      </div>

      {incidents.length > maxItems && (
        <div className="mt-4 text-center">
          <button className="text-sm text-gold hover:text-gold/80 transition-colors">
            View all {incidents.length} incidents →
          </button>
        </div>
      )}
    </div>
  );
}
