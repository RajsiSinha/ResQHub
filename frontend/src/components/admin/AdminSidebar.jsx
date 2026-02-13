import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useIncidents } from "../../context/IncidentContext";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { incidents } = useIncidents();
  
  const navItem = (path, label) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all
        ${
          active
            ? "bg-blue-600/20 text-blue-400"
            : "text-slate-400 hover:bg-[#162435]"
        }`}
      >
        {label}
      </Link>
    );
  };

  // ================= REAL AI INSIGHT =================
  const aiInsight = useMemo(() => {
    if (!incidents.length) return "System stable. No active alerts.";

    const pending = incidents.filter(
      (i) => i.status === "PENDING"
    ).length;

    const highSeverity = incidents.filter(
      (i) =>
        i.severity === "HIGH" &&
        i.status !== "RESOLVED"
    ).length;

    if (highSeverity > 3)
      return "Multiple high-severity incidents active.";

    if (pending > 5)
      return "Rising pending cases. Consider resource redistribution.";

    return "Operational load within safe limits.";
  }, [incidents]);

  return (
    <div className="w-72 bg-[#0f1b2a] border-r border-blue-500/10 flex flex-col justify-between">

      {/* ================= TOP ================= */}
      <div>
        <div className="h-20 flex items-center px-6 border-b border-blue-500/10">
          <div className="flex items-center gap-0">
            <img
              src={Logo}
              alt="ResQHub Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="ml-1 text-lg font-semibold tracking-tight">
              <span className="text-white">ResQ</span>
              <span className="text-blue-400">Hub</span>
            </h1>
          </div>
        </div>

        <nav className="px-4 mt-6 space-y-2">
          {navItem("/admin/dashboard", "Command Center")}
          {navItem("/admin/victim-registry", "Victim Registry")}
          {navItem("/admin/responders", "Responders")}
          {navItem("/admin/deep-analytics", "Deep Analytics")}
          {navItem("/admin/zone-management", "Zone Management")}
        </nav>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="p-4 border-t border-blue-500/10 space-y-6">

        {/* AI INSIGHT (REAL DATA) */}
        <div className="bg-[#162435] p-4 rounded-xl text-xs text-slate-300">
          <p className="text-blue-400 font-semibold mb-1">
            AI Insight
          </p>
          {aiInsight}
        </div>

        {/* REAL LOGGED-IN USER */}
        {user && (
  <div className="space-y-4 mt-6">

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
        {user.name?.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">
          {user.name}
        </p>
        <p className="text-xs text-slate-400 capitalize">
          {user.role}
        </p>
      </div>
    </div>

    <button
      onClick={logout}
      className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-xs font-semibold transition"
    >
      Logout
    </button>

  </div>
)}

      </div>
    </div>
  );
}
