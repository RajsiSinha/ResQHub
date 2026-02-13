import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useEffect, useState, useRef } from "react";

export default function ResponderLayout() {

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [onlineCount, setOnlineCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  // 🔥 Real Online Responders Count
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const responders = users.filter((u) =>
      ["responder", "volunteer", "ngo", "authority"].includes(u.role)
    );

    setOnlineCount(responders.length);
  }, []);

  // 🔔 Real-Time Incident Listener
  useEffect(() => {

    const updateIncidents = () => {
      const incidents =
        JSON.parse(localStorage.getItem("incidents")) || [];

      const pending = incidents.filter(
        (i) => i.status === "PENDING"
      );

      setPendingCount(pending.length);

      const sorted = [...incidents].reverse();
      setRecentIncidents(sorted.slice(0, 5));
    };

    updateIncidents();

    window.addEventListener("storage", updateIncidents);

    return () =>
      window.removeEventListener("storage", updateIncidents);

  }, []);

  // 🔽 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0b1420] text-slate-100 flex flex-col">

      {/* ================= HEADER ================= */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-blue-500/10 bg-[#0f1b2a]">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="ResQHub Logo"
            className="w-8 h-8 object-contain"
          />

          <span className="text-lg font-semibold tracking-tight">
            ResQ<span className="text-blue-400">Hub</span>
            <span className="text-slate-400 ml-1 text-sm font-medium">
              Responder
            </span>
          </span>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6 text-sm text-slate-400">

          {/* 🔔 Notification Bell */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() =>
                setShowNotifications(!showNotifications)
              }
              className="relative"
            >
              <span className="material-icons text-slate-300">
                notifications
              </span>

              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-[#121f32] border border-blue-500/20 rounded-xl shadow-xl z-50 p-4 space-y-3">

                <h3 className="text-sm font-semibold text-white">
                  Recent Incidents
                </h3>

                {recentIncidents.length === 0 ? (
                  <p className="text-xs text-slate-400">
                    No recent activity.
                  </p>
                ) : (
                  recentIncidents.map((inc) => (
                    <div
                      key={inc.id}
                      className={`p-3 rounded-lg text-xs ${
                        inc.severity === "HIGH"
                          ? "bg-red-500/10 border border-red-500/30"
                          : "bg-slate-800"
                      }`}
                    >
                      <p className="font-semibold">
                        {inc.title}
                      </p>
                      <p className="text-slate-400">
                        {inc.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Online Toggle */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-3 py-1 text-xs rounded-lg font-semibold transition ${
              isOnline
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {isOnline ? "ONLINE" : "OFFLINE"}
          </button>

          {/* Online Count */}
          <span className="text-green-400 font-semibold">
            🟢 {onlineCount} Responders
          </span>

          {/* Profile */}
          <div className="flex items-center gap-3">

            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
              {currentUser?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-sm text-white font-semibold">
                {currentUser?.name}
              </span>
              <span className="text-[10px] text-blue-400 uppercase">
                {currentUser?.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="ml-3 text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>

          </div>

        </div>
      </header>

      {/* CONTENT */}
      <div className="flex flex-1">
        <Outlet />
      </div>

    </div>
  );
}
