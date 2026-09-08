"use client";

import { TrendingUp, Eye, Link2, Trophy } from "lucide-react";

interface QuickStatsBarProps {
  totalClicks: number;
  profileViews: number;
  activeLinks: number;
  topLink: string | null;
}

const stats = [
  {
    key: "clicks",
    label: "Total Clicks",
    icon: TrendingUp,
    gradient: "from-violet-500 to-indigo-500",
    bg: "bg-violet-50",
    ring: "ring-violet-100",
    text: "text-violet-600",
    blob: "bg-violet-400",
  },
  {
    key: "views",
    label: "Profile Views",
    icon: Eye,
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
    ring: "ring-blue-100",
    text: "text-blue-600",
    blob: "bg-blue-400",
  },
  {
    key: "links",
    label: "Active Links",
    icon: Link2,
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    text: "text-emerald-600",
    blob: "bg-emerald-400",
  },
  {
    key: "top",
    label: "Top Performer",
    icon: Trophy,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    ring: "ring-amber-100",
    text: "text-amber-600",
    blob: "bg-amber-400",
  },
] as const;

export default function QuickStatsBar({
  totalClicks,
  profileViews,
  activeLinks,
  topLink,
}: QuickStatsBarProps) {
  const values: Record<string, string> = {
    clicks: totalClicks.toLocaleString(),
    views: profileViews.toLocaleString(),
    links: activeLinks.toString(),
    top: topLink ?? "—",
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={s.key}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Decorative blob */}
            <div
              className={`absolute -right-4 -top-4 size-24 rounded-full ${s.blob} opacity-[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.14]`}
            />

            {/* Icon */}
            <div
              className={`inline-flex size-10 items-center justify-center rounded-xl ${s.bg} ring-1 ${s.ring} ${s.text}`}
            >
              <Icon className="size-5" />
            </div>

            {/* Label */}
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              {s.label}
            </p>

            {/* Value */}
            <p
              className={`mt-1 ${
                s.key === "top" ? "text-lg truncate" : "text-2xl"
              } font-bold tracking-tight text-zinc-900`}
            >
              {values[s.key]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
