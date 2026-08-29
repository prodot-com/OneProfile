export default function AnalyticsCard() {
  // Dummy graph data heights
  const heights = [30, 45, 20, 60, 40, 80, 50, 70, 90, 65, 85, 40, 100, 60];

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">Clicks Last 30 Days</h2>
          <p className="text-sm text-zinc-500 mt-1">+12% from previous period</p>
        </div>
        <a href="/dashboard/analytics" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
          View details &rarr;
        </a>
      </div>

      <div className="h-40 flex items-end justify-between gap-1 mt-4">
        {heights.map((h, i) => (
          <div key={i} className="w-full relative group">
            <div 
              className="bg-zinc-200 rounded-t-sm transition-all duration-300 group-hover:bg-zinc-900 w-full"
              style={{ height: `${h}%` }}
            ></div>
            {/* Tooltip placeholder on hover */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {Math.floor(h * 15.3)} clicks
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}