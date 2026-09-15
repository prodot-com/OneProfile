"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin, Activity } from "lucide-react";

export interface RecentClick {
  id: string;
  linkTitle: string;
  country: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  createdAtFormatted: string;
}

interface RecentActivityWidgetProps {
  clicks: RecentClick[];
}

export default function RecentActivityWidget({
  clicks,
}: RecentActivityWidgetProps) {
  return (
    <div className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f0f0f0] px-6 py-5">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-amber-500" />
          <div>
            <h3 className="text-lg font-serif font-semibold text-[#1a1a1a]">
              Recent Activity
            </h3>
            <p className="text-xs text-[#6b6b6b]">Latest clicks on your links</p>
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

      {/* Activity List */}
      {clicks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100">
            <Activity className="size-5 text-zinc-300" />
          </div>
          <p className="text-sm text-zinc-400">No activity recorded yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-[#f0f0f0]">
          {clicks.map((click, i) => (
            <div
              key={click.id}
              className="flex items-start gap-3 px-6 py-4 transition-colors hover:bg-[#fafafa]/50"
            >
              {/* Animated dot */}
              <div className="mt-1.5 relative">
                <span
                  className={`block size-2 rounded-full ${
                    i === 0 ? "bg-emerald-400" : "bg-zinc-300"
                  }`}
                />
                {i === 0 && (
                  <span className="absolute inset-0 size-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 ml-1">
                <p className="truncate text-sm font-medium text-[#1a1a1a]">
                  {click.linkTitle}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-[#6b6b6b]">
                  {click.country && (
                    <span className="flex items-center gap-0.5">
                      <MapPin className="size-3" />
                      {click.city ? `${click.city}, ` : ""}
                      {click.country}
                    </span>
                  )}
                  {click.device && <span>· {click.device}</span>}
                  {click.browser && <span>· {click.browser}</span>}
                </div>
              </div>

              {/* Timestamp */}
              <time className="shrink-0 text-[11px] text-[#b4b0a4] mt-0.5 font-medium">
                {click.createdAtFormatted}
              </time>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
