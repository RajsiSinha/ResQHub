import { useState } from "react";

export default function Responders() {
  const [responders, setResponders] = useState([
    {
      id: "RSP-101",
      name: "Officer Miller",
      status: "ONLINE",
      assigned: "INC-4092",
      rating: 4.8,
    },
    {
      id: "RSP-102",
      name: "Dr. Sarah W.",
      status: "OFFLINE",
      assigned: null,
      rating: 4.6,
    },
    {
      id: "RSP-103",
      name: "Fire Unit Alpha",
      status: "ONLINE",
      assigned: "INC-4101",
      rating: 4.9,
    },
  ]);

  const toggleStatus = (id) => {
    setResponders((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: r.status === "ONLINE" ? "OFFLINE" : "ONLINE",
            }
          : r
      )
    );
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Responders Management
        </h1>
        <p className="text-slate-400 text-sm">
          Monitor field teams and manage operational readiness.
        </p>
      </div>

      {/* Table */}
      <div className="bg-[#121f32] rounded-2xl border border-blue-500/10 overflow-hidden shadow-xl">

        <table className="w-full text-sm">
          <thead className="bg-[#0f1b2a] text-slate-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Assigned Case</th>
              <th className="px-6 py-4 text-left">Performance</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {responders.map((responder) => (
              <tr
                key={responder.id}
                className="border-t border-blue-500/5 hover:bg-[#162435]/40 transition"
              >
                <td className="px-6 py-4 text-blue-400 font-semibold">
                  {responder.id}
                </td>

                <td className="px-6 py-4 text-white">
                  {responder.name}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      responder.status === "ONLINE"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {responder.status}
                  </span>
                </td>

                {/* Assigned */}
                <td className="px-6 py-4 text-slate-400">
                  {responder.assigned || "Available"}
                </td>

                {/* Rating */}
                <td className="px-6 py-4 text-yellow-400 font-semibold">
                  ⭐ {responder.rating}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => toggleStatus(responder.id)}
                    className="px-3 py-1 text-xs rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                  >
                    Toggle Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}
