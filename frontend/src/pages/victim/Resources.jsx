export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Emergency Resources</h1>
        <p className="text-slate-400 text-sm">
          Access important contacts, safety guides, and emergency support.
        </p>
      </div>

      {/* Emergency Contacts */}
      <section className="bg-slate-900 rounded-xl p-6 border border-blue-500/10">
        <h2 className="text-lg font-bold mb-6 uppercase tracking-tight">
          Emergency Contacts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-red-600/10 border border-red-600/20 p-5 rounded-xl">
            <h3 className="font-bold text-red-400 mb-2">National Emergency</h3>
            <p className="text-2xl font-bold text-white">112</p>
            <p className="text-xs text-slate-400 mt-1">
              All-in-one emergency helpline
            </p>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/20 p-5 rounded-xl">
            <h3 className="font-bold text-blue-400 mb-2">Ambulance</h3>
            <p className="text-2xl font-bold text-white">108</p>
            <p className="text-xs text-slate-400 mt-1">
              Medical emergency support
            </p>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-xl">
            <h3 className="font-bold text-orange-400 mb-2">Disaster Management</h3>
            <p className="text-2xl font-bold text-white">1078</p>
            <p className="text-xs text-slate-400 mt-1">
              Natural disaster assistance
            </p>
          </div>

        </div>
      </section>

      {/* Safety Guides */}
      <section className="bg-slate-900 rounded-xl p-6 border border-blue-500/10">
        <h2 className="text-lg font-bold mb-6 uppercase tracking-tight">
          Safety Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
            <h3 className="font-semibold mb-2">First Aid Basics</h3>
            <p className="text-xs text-slate-400">
              Learn essential first aid steps before help arrives.
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
            <h3 className="font-semibold mb-2">Fire Safety Tips</h3>
            <p className="text-xs text-slate-400">
              Steps to take during a fire emergency.
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
            <h3 className="font-semibold mb-2">Earthquake Preparedness</h3>
            <p className="text-xs text-slate-400">
              What to do before, during, and after an earthquake.
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
            <h3 className="font-semibold mb-2">Flood Survival Guide</h3>
            <p className="text-xs text-slate-400">
              Protect yourself during heavy rainfall and flooding.
            </p>
          </div>

        </div>
      </section>

      {/* Download Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
        <h2 className="font-bold text-sm uppercase tracking-wider mb-4">
          Download Emergency Kit Checklist
        </h2>

        <p className="text-xs mb-6">
          Prepare a basic emergency kit with essential supplies.
        </p>

        <button className="bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold hover:bg-slate-200 transition">
          Download PDF
        </button>
      </section>

    </div>
  );
}
