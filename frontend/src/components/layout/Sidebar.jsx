import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-slate-400 hover:bg-blue-500/10 hover:text-blue-400";

  const active =
    "bg-blue-600 text-white shadow-lg shadow-blue-600/20";

  return (
    <aside className="w-64 bg-slate-900 border-r border-blue-500/10 flex flex-col">
      
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <span className="material-icons text-white"></span>
        </div>
        <span className="font-bold text-xl">ResQHub</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        <NavLink
          to="/victim/dashboard"
          className={({ isActive }) =>
            isActive ? `${navItem} ${active}` : navItem
          }
        >
          <span className="material-icons text-sm"></span>
          Dashboard
        </NavLink>

        <NavLink
          to="/victim/history"
          className={({ isActive }) =>
            isActive ? `${navItem} ${active}` : navItem
          }
        >
          <span className="material-icons text-sm"></span>
          Incident History
        </NavLink>

        <NavLink
          to="/victim/map"
          className={({ isActive }) =>
            isActive ? `${navItem} ${active}` : navItem
          }
        >
          <span className="material-icons text-sm"></span>
          Safety Map
        </NavLink>

        <NavLink
          to="/victim/resources"
          className={({ isActive }) =>
            isActive ? `${navItem} ${active}` : navItem
          }
        >
          <span className="material-icons text-sm"></span>
          Resources
        </NavLink>
      </nav>

      {/* Profile Section */}
      <div className="p-4 border-t border-blue-500/10">
        <div className="bg-blue-500/5 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-semibold">Alex Rivera</p>
              <p className="text-xs text-slate-500">ID: RQ-9942</p>
            </div>
          </div>

          <button className="w-full text-xs font-semibold py-2 border border-blue-500/20 hover:bg-blue-500/10 rounded-lg transition-all">
            LOGOUT
          </button>
        </div>
      </div>
    </aside>
  );
}
