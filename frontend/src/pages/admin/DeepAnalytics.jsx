import { useMemo } from "react";
import { useIncidents } from "../../context/IncidentContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function DeepAnalytics() {
  const { incidents } = useIncidents();

  // ================= TREND DATA =================
  const trendData = useMemo(() => {
    const grouped = {};

    incidents.forEach((incident) => {
      const date = new Date(incident.createdAt).toLocaleDateString();
      if (!grouped[date]) grouped[date] = 0;
      grouped[date]++;
    });

    return Object.entries(grouped).map(([date, count]) => ({
      date,
      incidents: count,
    }));
  }, [incidents]);

  // ================= SEVERITY DATA =================
  const severityData = useMemo(() => {
    const counts = { HIGH: 0, MEDIUM: 0, LOW: 0 };

    incidents.forEach((i) => {
      counts[i.severity]++;
    });

    return Object.keys(counts).map((key) => ({
      severity: key,
      count: counts[key],
    }));
  }, [incidents]);

  // ================= STATUS DATA =================
  const statusData = useMemo(() => {
    const counts = { PENDING: 0, ASSIGNED: 0, RESOLVED: 0 };

    incidents.forEach((i) => {
      counts[i.status]++;
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key],
    }));
  }, [incidents]);

  const COLORS = ["#f97316", "#3b82f6", "#22c55e"];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Deep Analytics
        </h1>
        <p className="text-slate-400 text-sm">
          Advanced system-wide emergency data insights.
        </p>
      </div>

      {/* ================= INCIDENT TREND ================= */}
      <div className="bg-[#121f32] rounded-2xl p-6 border border-blue-500/10 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-6">
          Incident Trend Over Time
        </h2>

        <div className="h-[300px]">
          <ResponsiveContainer>
            <LineChart data={trendData}>
              <CartesianGrid stroke="#1e2f44" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="incidents"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
                isAnimationActive={true}
                animationDuration={1200}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= TWO COLUMN CHARTS ================= */}
      <div className="grid grid-cols-12 gap-8">

        {/* Severity Bar */}
        <div className="col-span-6 bg-[#121f32] rounded-2xl p-6 border border-blue-500/10 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-6">
            Severity Distribution
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={severityData}>
                <CartesianGrid stroke="#1e2f44" />
                <XAxis dataKey="severity" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#f97316"
                  radius={[8, 8, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationEasing="ease-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Donut */}
        <div className="col-span-6 bg-[#121f32] rounded-2xl p-6 border border-blue-500/10 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-6">
            Status Distribution
          </h2>

          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  isAnimationActive={true}
                  animationDuration={1200}
                  animationEasing="ease-in-out"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
