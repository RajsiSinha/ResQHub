export default function Topbar() {
  return (
    <header className="h-20 border-b border-blue-500/10 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-8">
      
      <div>
        <h1 className="text-xl font-bold">Victim Portal</h1>
        <p className="text-sm text-slate-400">
          Stay calm. Help is a click away.
        </p>
      </div>

      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-red-600/20 transition-all">
        <span className="material-icons"></span>
        SOS CALL
      </button>

    </header>
  );
}
