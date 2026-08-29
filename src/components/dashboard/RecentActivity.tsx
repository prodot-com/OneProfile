export default function RecentActivity() {
  const activities = [
    { title: "Added 'Private Project Draft'", date: "2 hours ago", type: "link" },
    { title: "Edited bio description", date: "Yesterday", type: "profile" },
    { title: "Changed theme to 'Minimal Light'", date: "3 days ago", type: "theme" },
    { title: "Profile created", date: "Last week", type: "system" },
  ];

  return (
    <div className="bg-white border border-zinc-200/80 rounded-3xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
      <h2 className="text-base font-semibold text-zinc-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-6">
        {activities.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="relative flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 ring-4 ring-white z-10"></div>
              {i !== activities.length - 1 && (
                <div className="absolute top-2.5 w-[1px] h-full bg-zinc-200 -z-0"></div>
              )}
            </div>
            <div className="pb-2">
              <p className="text-sm font-medium text-zinc-800">{item.title}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}