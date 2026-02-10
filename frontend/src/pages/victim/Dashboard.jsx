
import { useState } from "react";

export default function Dashboard() {
  const [incidentType, setIncidentType] = useState("Medical Emergency");
  const [urgency, setUrgency] = useState("medium");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [reports, setReports] = useState([]);

  // Detect Location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to retrieve location");
      }
    );
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !location) {
      alert("Please add description and detect location");
      return;
    }

    const newReport = {
      id: Date.now(),
      incidentType,
      urgency,
      description,
      location,
      status: "Pending",
    };

    setReports([newReport, ...reports]);

    // Reset form
    setDescription("");
    setLocation(null);
    setUrgency("medium");
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* LEFT SECTION */}
      <div className="lg:col-span-7 space-y-6">

        <section className="bg-slate-900 rounded-xl p-6 border border-blue-500/10">
          <h2 className="text-lg font-bold mb-6 uppercase tracking-tight">
            Report New Emergency
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Incident Type + Urgency */}
            <div className="grid grid-cols-2 gap-4">

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Incident Type
                </label>

                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm py-3 px-4"
                >
                  <option>Medical Emergency</option>
                  <option>Fire Incident</option>
                  <option>Natural Disaster</option>
                  <option>Security Threat</option>
                  <option>Missing Person</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Urgency Level
                </label>

                <div className="flex gap-2">
                  {["medium", "critical"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUrgency(level)}
                      className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold transition ${
                        urgency === level
                          ? level === "critical"
                            ? "bg-red-600 text-white ring-4 ring-red-600/10"
                            : "bg-orange-500 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {level.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
                Description
                <span className="text-blue-400 normal-case font-normal italic">
                  AI-assisted detection active
                </span>
              </label>

              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm p-4"
                placeholder="Describe what's happening..."
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Current Location
              </label>

              <div className="h-40 w-full rounded-lg bg-slate-800 border border-blue-500/10 flex items-center justify-center">
                {location ? (
                  <p className="text-blue-400 text-sm">
                    Lat: {location.lat.toFixed(4)} | Lng:{" "}
                    {location.lng.toFixed(4)}
                  </p>
                ) : (
                  <span className="text-slate-500 text-sm">
                    Location Preview will appear here
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={detectLocation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-blue-600/20"
              >
                Detect My Location
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all"
            >
              SUBMIT EMERGENCY REPORT
            </button>

          </form>
        </section>

      </div>

      {/* RIGHT SECTION */}
      <div className="lg:col-span-5 space-y-6">

        {/* Active Reports */}
        <section className="bg-slate-900 rounded-xl p-6 border border-blue-500/10">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-tight">
            Active Reports
          </h2>

          {reports.length === 0 ? (
            <p className="text-slate-400 text-sm">
              No active reports yet.
            </p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-xl bg-slate-800 border border-blue-500/10"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-blue-400">
                      #{report.id}
                    </span>

                    <span
                      className={`text-xs font-bold ${
                        report.urgency === "critical"
                          ? "text-red-400"
                          : "text-orange-400"
                      }`}
                    >
                      {report.urgency.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm font-semibold">
                    {report.incidentType}
                  </p>

                  <p className="text-xs text-slate-400 line-clamp-1">
                    {report.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Immediate Actions */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
          <h2 className="font-bold text-sm uppercase tracking-wider mb-4">
            Immediate Actions
          </h2>

          <ul className="space-y-3 text-xs">
            <li>1. Move to a safe location.</li>
            <li>2. Keep phone volume high.</li>
            <li>3. Gather important documents.</li>
          </ul>
        </section>

      </div>

    </div>
  );
}
