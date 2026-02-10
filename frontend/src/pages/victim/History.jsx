import { useState } from "react";

export default function History() {
  const [filter, setFilter] = useState("all");

  const reports = [
    {
      id: "RQ-10294",
      title: "Severe Medical Emergency",
      status: "Assigned",
      date: "12 Feb 2026",
    },
    {
      id: "RQ-10281",
      title: "Minor Street Hazard",
      status: "Pending",
      date: "10 Feb 2026",
    },
    {
      id: "RQ-10275",
      title: "Basement Leakage",
      status: "Resolved",
      date: "5 Feb 2026",
    },
  ];

  const filteredReports =
    filter === "all"
      ? reports
      : reports.filter((r) => r.status.toLowerCase() === filter);

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Incident History</h1>
        <p className="text-slate-400 text-sm">
          View all your previous emergency reports.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3">
        {["all", "pending", "assigned", "resolved"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-blue-600/20"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Report List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <p className="text-slate-500 text-sm">
            No reports found.
          </p>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="p-5 rounded-xl bg-slate-900 border border-blue-500/10 flex justify-between items-center"
            >
              <div>
                <p className="text-xs text-blue-400 font-bold">
                  #{report.id}
                </p>
                <h3 className="text-sm font-semibold mt-1">
                  {report.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {report.date}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs font-bold rounded-full ${
                  report.status === "Resolved"
                    ? "bg-green-500/20 text-green-400"
                    : report.status === "Assigned"
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-slate-700 text-slate-400"
                }`}
              >
                {report.status}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
