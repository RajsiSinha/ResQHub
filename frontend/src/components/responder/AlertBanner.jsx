export default function AlertBanner() {
  return (
    <div className="h-10 bg-red-600 flex items-center justify-between px-6 text-sm font-semibold text-white">
      <span>
        CRITICAL SYSTEM ALERT: Severe weather warning issued for North Sector.
      </span>

      <button className="underline text-white/80 hover:text-white">
        Acknowledge
      </button>
    </div>
  );
}
