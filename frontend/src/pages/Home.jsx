import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1420] to-[#0e1c2f] text-white">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">

        <h1 className="text-5xl font-bold leading-tight">
          Intelligent Disaster Response Platform
        </h1>

        <p className="text-slate-400 mt-6 text-lg max-w-3xl mx-auto">
          Real-time emergency coordination system connecting victims,
          responders, and command authorities through AI-powered
          situational awareness.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/admin/dashboard"
            className="bg-[#162435] hover:bg-[#1e2f44] px-6 py-3 rounded-xl"
          >
            View Command Center
          </Link>
        </div>

      </div>

      {/* ROLE CARDS */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-8 pb-20">

        <div className="bg-[#121f32] p-8 rounded-2xl border border-blue-500/10">
          <h3 className="text-xl font-semibold mb-4">
            Victim Portal
          </h3>
          <p className="text-slate-400 text-sm">
            Instantly report emergencies, share live location,
            and track response status.
          </p>
        </div>

        <div className="bg-[#121f32] p-8 rounded-2xl border border-blue-500/10">
          <h3 className="text-xl font-semibold mb-4">
            Responder Dashboard
          </h3>
          <p className="text-slate-400 text-sm">
            Receive incident alerts, navigate routes,
            and manage field operations.
          </p>
        </div>

        <div className="bg-[#121f32] p-8 rounded-2xl border border-blue-500/10">
          <h3 className="text-xl font-semibold mb-4">
            Admin Command Center
          </h3>
          <p className="text-slate-400 text-sm">
            Monitor zones, analyze trends, deploy assets,
            and coordinate disaster response.
          </p>
        </div>

      </div>

      {/* HOW IT WORKS */}
      <div className="bg-[#121f32] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-3 gap-8">

            <div>
              <h4 className="font-semibold text-blue-400">
                1. Report
              </h4>
              <p className="text-slate-400 text-sm mt-2">
                Victim submits emergency with live geolocation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-400">
                2. Dispatch
              </h4>
              <p className="text-slate-400 text-sm mt-2">
                Admin assigns nearest responder.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-400">
                3. Resolve
              </h4>
              <p className="text-slate-400 text-sm mt-2">
                Responder updates status until resolution.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="py-10 text-center text-slate-500 text-sm">
        © 2026 ResQHub – Intelligent Emergency Coordination System
      </div>

    </div>
  );
}
