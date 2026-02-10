export default function Map() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Safety Map</h1>
        <p className="text-slate-400 text-sm">
          View nearby incidents and safety alerts in your area.
        </p>
      </div>

      {/* Map Container */}
      <div className="bg-slate-900 rounded-xl border border-blue-500/10 p-4">

        <div className="h-[500px] w-full rounded-lg bg-slate-800 flex items-center justify-center relative overflow-hidden">

          {/* Placeholder */}
          <div className="text-center">
            <span className="material-icons text-blue-500 text-5xl mb-3">
              map
            </span>
            <p className="text-slate-400 text-sm">
              Map preview will be integrated here
            </p>
          </div>

          {/* Sample Markers */}
          <div className="absolute top-24 left-40 bg-red-600 w-4 h-4 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-56 bg-orange-500 w-4 h-4 rounded-full animate-pulse"></div>

        </div>

      </div>

      {/* Legend */}
      <div className="bg-slate-900 rounded-xl p-6 border border-blue-500/10">
        <h2 className="text-sm font-bold uppercase tracking-wider mb-4">
          Legend
        </h2>

        <div className="flex gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            Critical Incident
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            Medium Priority
          </div>
        </div>
      </div>

    </div>
  );
}
