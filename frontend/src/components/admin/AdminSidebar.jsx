import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

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

  return (
    <div className="w-72 bg-[#0f1b2a] border-r border-blue-500/10 flex flex-col justify-between">

      {/* Top */}
      <div>
        <div className="h-20 flex items-center px-6 border-b border-blue-500/10">
          <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center font-bold">
            *
          </div>
          <span className="ml-3 text-lg font-semibold">
            ResQHub
          </span>
        </div>

        <nav className="px-4 mt-6 space-y-2">

          {navItem("/admin/dashboard", "Command Center")}
          {navItem("/admin/victim-registry", "Victim Registry")}
          {navItem("/admin/responders", "Responders")}
          {navItem("/admin/deep-analytics", "Deep Analytics")}
          {navItem("/admin/zone-management", "Zone Management")}

        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-blue-500/10">

        <div className="bg-[#162435] p-4 rounded-xl text-xs text-slate-300">
          <p className="text-blue-400 font-semibold mb-1">AI Insight</p>
          Predicted storm surge escalation in Sector 7-G within 45 minutes.
        </div>

        <div className="mt-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
            DK
          </div>
          <div>
            <p className="text-sm font-semibold">Director Kane</p>
            <p className="text-xs text-slate-400">Senior Coordinator</p>
          </div>
        </div>

      </div>
    </div>
  );
}
