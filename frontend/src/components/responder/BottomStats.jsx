export default function BottomStats() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[600px] bg-[#162435] border border-blue-500/10 rounded-xl p-6 flex justify-between text-center shadow-lg">

      <div>
        <p className="text-xs text-slate-400">Pending Requests</p>
        <h2 className="text-red-400 text-2xl font-bold mt-2">12</h2>
      </div>

      <div>
        <p className="text-xs text-slate-400">Active Dispatches</p>
        <h2 className="text-white text-2xl font-bold mt-2">28</h2>
      </div>

      <div>
        <p className="text-xs text-slate-400">Hospital Capacity</p>
        <h2 className="text-green-400 text-2xl font-bold mt-2">68%</h2>
      </div>

    </div>
  );
}
