"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, TrendingUp } from "lucide-react";

interface TopLink {
  id: string;
  title: string;
  url: string;
  clicks: number;
}

interface TopLinksWidgetProps {
  links: TopLink[];
}

export default function TopLinksWidget({ links }: TopLinksWidgetProps) {
  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);
  const topLinks = links.slice(0, 5);

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-violet-500" />
          <div>
            <h3 className="text-sm font-semibold text-zinc-800">
              Top Performing Links
            </h3>
            <p className="text-xs text-zinc-400">Ranked by click count</p>
          </div>
        </div>
        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          View all
          <ArrowRight className="size-3" />
        </Link>
      </div>

      {/* Links */}
      {topLinks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100">
            <TrendingUp className="size-5 text-zinc-300" />
          </div>
          <p className="text-sm text-zinc-400">
            No links yet. Add your first link!
          </p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-50">
          {topLinks.map((link, i) => {
            const pct =
              totalClicks > 0
                ? Math.round((link.clicks / totalClicks) * 100)
                : 0;
            const barColors = [
              "from-violet-500 to-indigo-500",
              "from-blue-500 to-cyan-500",
              "from-emerald-500 to-teal-500",
              "from-amber-500 to-orange-500",
              "from-rose-500 to-pink-500",
            ];

            return (
              <div
                key={link.id}
                className="group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-zinc-50/50"
              >
                {/* Rank */}
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-[11px] font-bold text-zinc-400 group-hover:bg-zinc-200 transition-colors">
                  {i + 1}
                </span>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="truncate text-sm font-medium text-zinc-800">
                      {link.title}
                    </p>
                    <span className="shrink-0 text-xs font-semibold text-violet-600">
                      {link.clicks.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${barColors[i]} transition-all duration-700 ease-out`}
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                </div>

                {/* External link icon */}
                <ExternalLink className="size-3.5 shrink-0 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
