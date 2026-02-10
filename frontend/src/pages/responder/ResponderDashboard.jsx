import BottomStats from "../../components/responder/BottomStats";
import AlertBanner from "../../components/responder/AlertBanner";
import MapView from "../../components/responder/MapView";

export default function ResponderDashboard() {
  return (
    <div className="flex flex-col w-full h-full">

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-96 bg-[#0f1b2a] border-r border-blue-500/10 p-4 overflow-y-auto">
          <h2 className="text-sm font-bold mb-4 text-slate-400 uppercase">
            Incoming Incidents
          </h2>

          <div className="bg-[#162435] p-4 rounded-xl border border-red-500/20">
            <span className="text-xs bg-red-600 px-2 py-1 rounded text-white">
              HIGH
            </span>

            <h3 className="font-semibold mt-3">
              Structural Fire - Industrial Zone
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Smoke reported. Thermal imaging confirms hotspot.
            </p>

            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold">
              ACCEPT CASE
            </button>
          </div>
        </div>

        {/* CENTER MAP */}
        <div className="flex-1 relative">

          {/* Leaflet needs full height */}
          <div className="absolute inset-0">
            <MapView />
          </div>

          {/* Bottom Stats Overlay */}
          <BottomStats />

        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 bg-[#0f1b2a] border-l border-blue-500/10 p-4 overflow-y-auto">
          <h2 className="text-sm font-bold mb-4 text-slate-400 uppercase">
            Dynamic Routing
          </h2>

          <div className="bg-[#162435] p-4 rounded-xl">
            <p className="text-xs text-slate-400">
              Recommended route adjusted due to traffic congestion.
            </p>

            <p className="mt-4 text-sm font-bold text-green-400">
              ETA: 7.5 mins
            </p>
          </div>
        </div>

      </div>

      {/* ALERT BANNER */}
      <AlertBanner />

    </div>
  );
}
