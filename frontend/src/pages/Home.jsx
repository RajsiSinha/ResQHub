import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#0b1420] to-[#0e1c2f] text-slate-100 min-h-screen">

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b1420]/80 border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <span className="text-xl font-semibold">
              ResQ<span className="text-blue-400">Hub</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-8 text-sm text-slate-400">
            <a href="#platform" className="hover:text-white transition">Platform</a>
            <a href="#workflow" className="hover:text-white transition">Workflow</a>
            <a href="#capabilities" className="hover:text-white transition">Capabilities</a>
            <a href="#about" className="hover:text-white transition">About</a>
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm text-slate-400 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/victim/dashboard"
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl text-sm font-semibold transition shadow-lg shadow-red-600/20"
            >
              🚨 REPORT EMERGENCY
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* LEFT */}
        <div>
          <span className="text-xs bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full font-semibold">
            🟢 LIVE RESPONSE NETWORK ACTIVE
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mt-6 leading-tight">
            Real-Time Disaster <br />
            <span className="text-blue-400">
              Intelligence Network
            </span>
          </h1>

          <p className="text-slate-400 mt-6 text-base md:text-lg max-w-xl">
            AI-powered emergency coordination connecting citizens,
            command centers, and responders in one unified operational grid.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/admin/dashboard"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 transition"
            >
              Launch Live Demo
            </Link>

            <Link
              to="/admin/command-center"
              className="bg-[#162435] hover:bg-[#1e2f44] px-6 py-3 rounded-xl font-semibold transition"
            >
              View Command Center
            </Link>
          </div>

          <p className="text-slate-500 text-sm mt-6">
            Trusted by 500+ Emergency Response Units
          </p>
        </div>

        {/* RIGHT - Live Preview Card */}
        <div className="bg-[#121f32] border border-blue-500/10 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">

          <div className="h-80 bg-gradient-to-br from-[#0e1a2b] to-[#111c2d] rounded-2xl flex items-center justify-center text-slate-500 text-sm">
            Live Operations Map Preview
          </div>

        </div>
      </section>

      {/* ================= LIVE STATUS STRIP ================= */}
      <section className="bg-[#0f1b2a] border-y border-blue-500/10 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">

          <div>
            <p className="text-slate-400">Active Incidents</p>
            <p className="text-blue-400 text-xl font-bold mt-1">128</p>
          </div>

          <div>
            <p className="text-slate-400">Responders Online</p>
            <p className="text-green-400 text-xl font-bold mt-1">42</p>
          </div>

          <div>
            <p className="text-slate-400">Critical Alerts</p>
            <p className="text-red-400 text-xl font-bold mt-1">7</p>
          </div>

          <div>
            <p className="text-slate-400">Resolution Rate</p>
            <p className="text-blue-400 text-xl font-bold mt-1">96%</p>
          </div>

        </div>
      </section>

      {/* ================= CAPABILITIES ================= */}
      <section id="capabilities" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">

        <h2 className="text-3xl font-bold text-center">
          Core Emergency Capabilities
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">

          {[
            "AI Severity Classification",
            "Geo-Spatial Risk Mapping",
            "Smart Dispatch Engine",
            "Operational Analytics",
          ].map((title, index) => (
            <div
              key={index}
              className="bg-[#121f32] border border-blue-500/10 p-8 rounded-2xl hover:border-blue-500/40 transition"
            >
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-slate-400 text-sm mt-3">
                Intelligent automation and predictive response
                coordination for high-impact emergency scenarios.
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= WORKFLOW ================= */}
      <section id="workflow" className="bg-[#0f1b2a] py-16 md:py-24 border-y border-blue-500/10">

        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">

          <h2 className="text-3xl font-bold">
            From Signal to Resolution
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-12 md:mt-16">

            {[
              "Report",
              "AI Analysis",
              "Command Review",
              "Dispatch",
              "Resolved",
            ].map((step, index) => (
              <div key={index}>
                <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center mx-auto font-bold text-blue-400">
                  {index + 1}
                </div>
                <p className="mt-4 text-sm text-slate-300">{step}</p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center shadow-2xl shadow-blue-600/20">

          <h2 className="text-3xl font-bold">
            Deploy Smarter Emergency Intelligence Today
          </h2>

          <p className="mt-4 text-blue-100">
            Join the next generation of AI-powered disaster response systems.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">

            <Link
              to="/admin/dashboard"
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold"
            >
              Access Admin Console
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded-xl font-semibold"
            >
              Schedule Demo
            </Link>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
<footer className="bg-[#0b1420] border-t border-blue-500/10 pt-16 pb-10 mt-24">

  <div className="max-w-7xl mx-auto px-4 md:px-8 grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">

    {/* Brand Column */}
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold">
          ⚡
        </div>
        <span className="text-xl font-semibold">
          ResQ<span className="text-blue-400">Hub</span>
        </span>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed">
        AI-powered disaster response infrastructure enabling
        real-time coordination between citizens, command centers,
        and first responders.
      </p>

      <p className="text-slate-500 text-xs mt-6">
        Built for modern emergency operations.
      </p>
    </div>

    {/* Platform Links */}
    <div>
      <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
        Platform
      </h3>

      <ul className="space-y-3 text-sm text-slate-400">
        <li><a href="#" className="hover:text-white transition">Command Center</a></li>
        <li><a href="#" className="hover:text-white transition">Victim Portal</a></li>
        <li><a href="#" className="hover:text-white transition">Responder Network</a></li>
        <li><a href="#" className="hover:text-white transition">AI Analytics</a></li>
      </ul>
    </div>

    {/* Solutions */}
    <div>
      <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
        Solutions
      </h3>

      <ul className="space-y-3 text-sm text-slate-400">
        <li><a href="#" className="hover:text-white transition">Municipal Response</a></li>
        <li><a href="#" className="hover:text-white transition">Disaster Relief</a></li>
        <li><a href="#" className="hover:text-white transition">NGO Coordination</a></li>
        <li><a href="#" className="hover:text-white transition">Crisis Monitoring</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">
        Contact
      </h3>

      <ul className="space-y-3 text-sm text-slate-400">
        <li>📍 Global Operations Network</li>
        <li>📧 contact@resqhub.io</li>
        <li>📞 +91 00000 00000</li>
      </ul>

      {/* Social Icons */}
      <div className="flex gap-4 mt-6">
        <div className="w-9 h-9 bg-[#162435] hover:bg-blue-600 transition rounded-lg flex items-center justify-center cursor-pointer">
          🌐
        </div>
        <div className="w-9 h-9 bg-[#162435] hover:bg-blue-600 transition rounded-lg flex items-center justify-center cursor-pointer">
          🐦
        </div>
        <div className="w-9 h-9 bg-[#162435] hover:bg-blue-600 transition rounded-lg flex items-center justify-center cursor-pointer">
          🔗
        </div>
      </div>
    </div>

  </div>

  {/* Bottom Bar */}
  <div className="border-t border-blue-500/10 mt-14 pt-6 text-center text-xs text-slate-500">
    © 2026 ResQHub Systems. All rights reserved.
    <span className="mx-4">|</span>
    <a href="#" className="hover:text-white transition">Privacy Policy</a>
    <span className="mx-4">|</span>
    <a href="#" className="hover:text-white transition">Terms of Service</a>
  </div>

</footer>

    </div>
  );
}

