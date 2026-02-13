import { useEffect, useState, useMemo } from "react";
import { useIncidents } from "../../context/IncidentContext";

export default function Responders() {
  const [responders, setResponders] = useState([]);
  const { incidents, overrideAssign } = useIncidents();

  // ================= LOAD RESPONDERS =================
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const responderUsers = users
      .filter((u) =>
        ["responder", "volunteer", "ngo", "authority"].includes(u.role)
      )
      .map((u) => ({
        id: u.id,
        name: u.name,
        role: u.role,
        lastActive: Date.now(),
      }));

    setResponders(responderUsers);
  }, []);

  // ================= BUILD STATS =================
  const responderStats = useMemo(() => {
    const stats = {};

    incidents.forEach((incident) => {
      if (!incident.assignedTo) return;

      if (!stats[incident.assignedTo]) {
        stats[incident.assignedTo] = {
          assigned: 0,
          resolved: 0,
          responseTimes: [],
          lastHandled: 0,
        };
      }

      if (incident.status === "ASSIGNED") {
        stats[incident.assignedTo].assigned++;
      }

      if (incident.status === "RESOLVED") {
        stats[incident.assignedTo].resolved++;

        const time =
          new Date(incident.updatedAt) -
          new Date(incident.createdAt);

        stats[incident.assignedTo].responseTimes.push(time);

        stats[incident.assignedTo].lastHandled =
          new Date(incident.updatedAt).getTime();
      }
    });

    return stats;
  }, [incidents]);

  // ================= CALCULATIONS =================
  const getAvgResponseTime = (name) => {
    const times = responderStats[name]?.responseTimes || [];
    if (!times.length) return "—";

    const avg =
      times.reduce((a, b) => a + b, 0) /
      times.length /
      60000;

    return `${Math.round(avg)} min`;
  };

  const getEfficiencyScore = (name) => {
    const stats = responderStats[name];
    if (!stats || !stats.resolved) return 0;

    const avgTime =
      stats.responseTimes.reduce((a, b) => a + b, 0) /
      stats.responseTimes.length;

    return Math.max(100 - avgTime / 60000, 0).toFixed(0);
  };

  const getIdleTime = (name) => {
    const last = responderStats[name]?.lastHandled;
    if (!last) return "—";

    const diff = Date.now() - last;
    return `${Math.floor(diff / 60000)} min ago`;
  };

  // ================= DYNAMIC OVERLOAD =================
  const avgLoad =
    incidents.filter((i) => i.status === "ASSIGNED").length /
    (responders.length || 1);

  const OVERLOAD_LIMIT = Math.ceil(avgLoad * 1.5);

  // ================= TOP PERFORMER =================
  const topPerformer = useMemo(() => {
    let top = null;
    let max = 0;

    Object.entries(responderStats).forEach(([name, data]) => {
      if (data.resolved > max) {
        max = data.resolved;
        top = name;
      }
    });

    return top;
  }, [responderStats]);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl font-bold text-white">
          Responders Management
        </h1>
        <p className="text-slate-400 text-sm">
          Operational workload & performance intelligence.
        </p>
      </div>

      <div className="bg-[#121f32] rounded-2xl border border-blue-500/10 overflow-hidden shadow-xl">

        <table className="w-full text-sm">
          <thead className="bg-[#0f1b2a] text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Assigned</th>
              <th className="px-6 py-4 text-left">Resolved</th>
              <th className="px-6 py-4 text-left">Efficiency</th>
              <th className="px-6 py-4 text-left">Idle</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Reassign</th>
            </tr>
          </thead>

          <tbody>
            {responders.map((responder) => {
              const stats = responderStats[responder.name] || {
                assigned: 0,
                resolved: 0,
              };

              const activeIncidents = incidents.filter(
                (i) =>
                  i.status === "ASSIGNED" &&
                  i.assignedTo === responder.name
              );

              const isOverloaded =
                stats.assigned >= OVERLOAD_LIMIT;

              const isTop =
                responder.name === topPerformer;

              return (
                <tr
                  key={responder.id}
                  className={`border-t border-blue-500/5 ${
                    isTop ? "bg-yellow-500/5" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-white font-semibold">
                    {isTop && "🥇 "}
                    {responder.name}
                  </td>

                  <td className="px-6 py-4 text-purple-400 uppercase text-xs font-semibold">
                    {responder.role}
                  </td>

                  <td className="px-6 py-4 text-blue-400 font-semibold">
                    {stats.assigned}
                  </td>

                  <td className="px-6 py-4 text-green-400 font-semibold">
                    {stats.resolved}
                  </td>

                  <td className="px-6 py-4 text-cyan-400 font-semibold">
                    {getEfficiencyScore(responder.name)}%
                  </td>

                  <td className="px-6 py-4 text-slate-400 text-xs">
                    {getIdleTime(responder.name)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        isOverloaded
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {isOverloaded ? "OVERLOADED" : "ACTIVE"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {activeIncidents.map((incident) => (
                      <select
                        key={incident.id}
                        onChange={(e) =>
                          overrideAssign(
                            incident.id,
                            e.target.value
                          )
                        }
                        className="bg-[#0f1b2a] text-white text-xs p-2 rounded-lg border border-blue-500/10"
                        defaultValue={responder.name}
                      >
                        {responders.map((r) => (
                          <option key={r.id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
}
