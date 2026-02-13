import { useMemo } from "react";
import { useIncidents } from "../../context/IncidentContext";

import KPICards from "../../components/admin/KPICards";
import HeatmapSection from "../../components/admin/HeatmapSection";
import IncidentDistribution from "../../components/admin/IncidentDistribution";
import AssetPanel from "../../components/admin/AssetPanel";
import EscalationsSection from "../../components/admin/EscalationsSection";

export default function CommandCenter() {
  const { incidents } = useIncidents();

  // ================= MASTER ANALYTICS ENGINE =================
  const analytics = useMemo(() => {
    const data = {
      total: 0,
      pending: 0,
      assigned: 0,
      resolved: 0,
      high: 0,
      medium: 0,
      low: 0,
      criticalSeverity: 0,
      avgResolutionTime: 0,
      surgeDetected: false,
    };

    const now = Date.now();
    const THIRTY_MIN = 30 * 60 * 1000;

    let resolutionTimes = [];
    let recentCount = 0;

    incidents.forEach((incident) => {
      data.total++;

      // Status counts
      if (incident.status === "PENDING") data.pending++;
      if (incident.status === "ASSIGNED") data.assigned++;
      if (incident.status === "RESOLVED") data.resolved++;

      // Severity counts
      if (incident.severity === "HIGH") data.high++;
      if (incident.severity === "MEDIUM") data.medium++;
      if (incident.severity === "LOW") data.low++;

      if (incident.severity === "HIGH" && incident.status !== "RESOLVED") {
        data.criticalSeverity++;
      }

      // Resolution time
      if (incident.status === "RESOLVED") {
        const time =
          new Date(incident.updatedAt) -
          new Date(incident.createdAt);

        resolutionTimes.push(time);
      }

      // Surge detection (last 30 min)
      if (now - new Date(incident.createdAt).getTime() < THIRTY_MIN) {
        recentCount++;
      }
    });

    if (resolutionTimes.length) {
      data.avgResolutionTime = Math.round(
        resolutionTimes.reduce((a, b) => a + b, 0) /
          resolutionTimes.length /
          60000
      );
    }

    data.surgeDetected = recentCount >= 5;

    return data;
  }, [incidents]);

  // ================= ESCALATION DETECTION =================
  const ESCALATION_TIME = 10 * 60 * 1000;

  const escalatedIncidents = useMemo(() => {
    return incidents.filter(
      (i) =>
        i.status === "PENDING" &&
        Date.now() - new Date(i.createdAt).getTime() > ESCALATION_TIME
    );
  }, [incidents]);

  // ================= RESPONDER LOAD =================
  const responderLoad = useMemo(() => {
    return incidents.reduce((acc, curr) => {
      if (!curr.assignedTo) return acc;

      if (!acc[curr.assignedTo]) {
        acc[curr.assignedTo] = 0;
      }

      if (curr.status === "ASSIGNED") {
        acc[curr.assignedTo]++;
      }

      return acc;
    }, {});
  }, [incidents]);

  return (
    <div className="space-y-10">

      {/* KPI SECTION */}
      <KPICards analytics={analytics} />

      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-8">
          <HeatmapSection
            incidents={incidents}
            escalated={escalatedIncidents}
            surgeDetected={analytics.surgeDetected}
          />
        </div>

        <div className="col-span-4 space-y-8">
          <IncidentDistribution analytics={analytics} />
          <AssetPanel responderLoad={responderLoad} />
        </div>

      </div>

      <EscalationsSection escalated={escalatedIncidents} />

    </div>
  );
}
