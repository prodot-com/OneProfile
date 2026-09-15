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
    <div className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f0f0f0] px-6 py-5">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-violet-500" />
          <div>
            <h3 className="flex items-center text-lg font-serif font-semibold text-[#1a1a1a]">
              Top Performing Links
            </h3>
            <p className="text-xs text-[#6b6b6b] mt-0.5">Ranked by click count</p>
          </div>
        </div>
        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-1 text-xs font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
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
        <div className="divide-y divide-[#f0f0f0]">
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
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#fafafa] text-[11px] font-bold text-[#b4b0a4] group-hover:bg-[#f0f0f0] transition-colors">
                  {i + 1}
                </span>

                {/* Info */}
                <div className="min-w-0 flex-1 ml-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="truncate text-sm font-medium text-[#1a1a1a]">
                      {link.title}
                    </p>
                    <span className="shrink-0 text-xs font-semibold text-[#f97316]">
                      {link.clicks.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f0f0f0]">
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
