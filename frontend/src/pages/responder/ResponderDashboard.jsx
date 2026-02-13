import { useState, useEffect, useRef } from "react";
import BottomStats from "../../components/responder/BottomStats";
import AlertBanner from "../../components/responder/AlertBanner";
import MapView from "../../components/responder/MapView";
import LayerToggle from "../../components/responder/LayerToggle";
import RoutingCard from "../../components/responder/RoutingCard";
import { useIncidents } from "../../context/IncidentContext";

export default function ResponderDashboard() {

  const { incidents, updateStatus } = useIncidents();

  const [statusTab, setStatusTab] = useState("PENDING");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [highlightedId, setHighlightedId] = useState(null);
  const [previousCount, setPreviousCount] = useState(incidents.length);
  const [lastPlayedId, setLastPlayedId] = useState(null);

  const audioRef = useRef(null);

  // 👤 Current Logged In Responder
  const currentResponder = JSON.parse(
    localStorage.getItem("currentUser")
  );

  // 📊 Smart Status Counts
  const counts = {
    PENDING: incidents.filter(i => i.status === "PENDING").length,

    ASSIGNED: incidents.filter(
      i =>
        i.status === "ASSIGNED" &&
        i.assignedTo === currentResponder?.name
    ).length,

    RESOLVED: incidents.filter(
      i =>
        i.status === "RESOLVED" &&
        i.assignedTo === currentResponder?.name
    ).length,
  };

  // 🔥 Smart Status Filtering
  const statusFiltered = incidents.filter((incident) => {

    if (statusTab === "ASSIGNED") {
      return (
        incident.status === "ASSIGNED" &&
        incident.assignedTo === currentResponder?.name
      );
    }

    if (statusTab === "RESOLVED") {
      return (
        incident.status === "RESOLVED" &&
        incident.assignedTo === currentResponder?.name
      );
    }

    return incident.status === statusTab;
  });

  // 🔎 Severity + Search Filter
  const filteredIncidents = statusFiltered.filter((incident) => {
    const matchesSeverity =
      severityFilter === "ALL" || incident.severity === severityFilter;

    const matchesSearch =
      incident.title.toLowerCase().includes(search.toLowerCase()) ||
      String(incident.id).toLowerCase().includes(search.toLowerCase());

    return matchesSeverity && matchesSearch;
  });

  useEffect(() => {

  const assignedToMe = incidents.filter(
    i =>
      i.status === "ASSIGNED" &&
      i.assignedTo === currentResponder?.name
  );

  if (assignedToMe.length === 0) return;

  const latest = assignedToMe[assignedToMe.length - 1];

  // 🔥 Only trigger if new assignment
  if (latest.id !== lastPlayedId) {

    setLastPlayedId(latest.id);
    setHighlightedId(latest.id);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    const timer = setTimeout(() => {
      setHighlightedId(null);
    }, 3000);

    return () => clearTimeout(timer);
  }

}, [incidents]);


  return (
    <div className="flex flex-col w-full h-full bg-gradient-to-br from-[#0b1420] to-[#0e1c2f]">

      {/* 🔊 Sound Alert */}
      <audio ref={audioRef} src="/alert.wav" preload="auto" />

      <div className="flex flex-1">

        {/* ================= LEFT PANEL ================= */}
        <div className="w-[460px] bg-[#0f1b2a] border-r border-blue-500/10 p-6 space-y-4 overflow-y-auto relative z-20">

          <h2 className="text-slate-400 text-sm font-semibold tracking-wide">
            INCIDENT CONTROL CENTER
          </h2>

          {/* STATUS TABS */}
          <div className="flex gap-3">
            {["PENDING", "ASSIGNED", "RESOLVED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusTab(status)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition flex items-center gap-2 ${
                  statusTab === status
                    ? "bg-blue-600 text-white"
                    : "bg-[#162435] text-slate-400"
                }`}
              >
                {status}
                <span className="text-[10px] opacity-80">
                  ({counts[status]})
                </span>
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#162435] p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* SEVERITY FILTER */}
          <div className="flex gap-3">
            {["ALL", "HIGH", "MEDIUM", "LOW"].map((level) => (
              <button
                key={level}
                onClick={() => setSeverityFilter(level)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition ${
                  severityFilter === level
                    ? "bg-purple-600 text-white"
                    : "bg-[#162435] text-slate-400"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* INCIDENT LIST */}
          {filteredIncidents.length === 0 ? (
            <p className="text-slate-500 text-sm">
              No incidents in {statusTab}.
            </p>
          ) : (
            filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className={`p-5 rounded-2xl border shadow-lg transition-all duration-300 ${
                  highlightedId === incident.id
                    ? "ring-2 ring-green-500 animate-pulse"
                    : ""
                } ${
                  incident.severity === "HIGH"
                    ? "bg-[#162435] border-red-500/30"
                    : incident.severity === "MEDIUM"
                    ? "bg-[#162435] border-orange-400/20"
                    : "bg-[#162435] border-slate-500/20"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-bold text-blue-400">
                    #{incident.id}
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      incident.severity === "HIGH"
                        ? "text-red-400"
                        : incident.severity === "MEDIUM"
                        ? "text-orange-400"
                        : "text-slate-400"
                    }`}
                  >
                    {incident.severity}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mt-2">
                  {incident.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2">
                  {incident.description}
                </p>

                {/* 👤 Assigned Display */}
                {incident.assignedTo && (
                  <p className="text-[11px] text-green-400 mt-1">
                    👤 Assigned To: {incident.assignedTo}
                  </p>
                )}

                {/* LOCATION */}
                {incident.location && (
                  <p className="text-[11px] text-blue-300 mt-2">
                    📍 {incident.location.manual || "GPS Location Provided"}
                  </p>
                )}

                {/* ACTION BUTTONS */}
                {incident.status === "PENDING" && (
                  <button
                    onClick={() => {
                      updateStatus(
                        incident.id,
                        "ASSIGNED",
                        currentResponder?.name
                      );
                      setStatusTab("ASSIGNED");
                    }}
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
                  >
                    ACCEPT CASE
                  </button>
                )}

                {incident.status === "ASSIGNED" &&
                  incident.assignedTo === currentResponder?.name && (
                    <button
                      onClick={() =>
                        updateStatus(incident.id, "RESOLVED")
                      }
                      className="mt-5 w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
                    >
                      MARK RESOLVED
                    </button>
                  )}
              </div>
            ))
          )}

        </div>

        {/* ================= MAP ================= */}
        <div className="flex-1 relative min-h-[650px]">
          <div className="absolute inset-0 z-0">
            <MapView incidents={incidents} />
          </div>

          <LayerToggle />
          <RoutingCard />
          <BottomStats incidents={incidents} />
        </div>

      </div>

      <AlertBanner />
    </div>
  );
}
