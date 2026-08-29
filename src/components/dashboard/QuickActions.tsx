import Link from "next/link";

export default function QuickActions() {
  const actions = [
    { label: "+ Add Link", href: "#add-link", primary: true },
    { label: "Edit Profile", href: "/dashboard/settings" },
    { label: "Appearance", href: "/dashboard/appearance" },
    { label: "Analytics", href: "/dashboard/analytics" },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {actions.map((action, i) => (
        <Link
          key={i}
          href={action.href}
          className={`px-5 py-3 rounded-2xl font-medium text-sm whitespace-nowrap transition-all shadow-sm ${
            action.primary 
              ? "bg-zinc-900 text-white hover:bg-zinc-800" 
              : "bg-white text-zinc-700 border border-zinc-200/80 hover:bg-zinc-50 hover:border-zinc-300"
          }`}
        >
          {action.label}
        </Link>
      ))}
    </div>
  );
}