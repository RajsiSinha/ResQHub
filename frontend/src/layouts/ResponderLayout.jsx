import { Outlet } from "react-router-dom";

export default function ResponderLayout() {
  return (
    <div className="min-h-screen bg-[#0b1420] text-slate-100 flex flex-col">

      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-blue-500/10 bg-[#0f1b2a]">

        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <span className="material-icons text-white text-sm">
              
            </span>
          </div>
          <span className="font-bold text-lg">
            ResQHub <span className="text-blue-400">Responder</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-400">
          <span>🟢 42 Responders Online</span>
          <span>Avg. Response: 4.2m</span>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
              OM
            </div>
            <span>Officer Miller</span>
          </div>
        </div>

      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Outlet />
      </div>

    </div>
  );
}
