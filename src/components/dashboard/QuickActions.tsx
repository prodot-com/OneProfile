"use client";

import Link from "next/link";
import { Plus, Palette, BarChart3, Share2 } from "lucide-react";
import { useState } from "react";

interface QuickActionsProps {
  profileUrl: string;
}

export default function QuickActions({ profileUrl }: QuickActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`https://${profileUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const actions = [
    {
      label: "Add Link",
      desc: "Create a new link",
      href: "/dashboard/links",
      icon: Plus,
      color: "from-violet-500 to-indigo-500",
      iconBg: "bg-violet-50 text-violet-600",
    },
    {
      label: "Edit Profile",
      desc: "Update appearance",
      href: "/dashboard/appearance",
      icon: Palette,
      color: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      label: "Analytics",
      desc: "View performance",
      href: "/dashboard/analytics",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-zinc-800 mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.label}
              href={a.href}
              className="group flex flex-col gap-3 rounded-xl border border-zinc-100 p-4 transition-all duration-300 hover:border-zinc-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`inline-flex size-9 items-center justify-center rounded-lg ${a.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="size-4.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">{a.label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{a.desc}</p>
              </div>
            </Link>
          );
        })}

        {/* Share button (not a Link) */}
        <button
          onClick={handleShare}
          className="group flex flex-col gap-3 rounded-xl border border-zinc-100 p-4 text-left transition-all duration-300 hover:border-zinc-200 hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="inline-flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition-transform duration-300 group-hover:scale-110">
            <Share2 className="size-4.5" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900">
              {copied ? "Copied!" : "Share Profile"}
            </p>
            <p className="text-xs text-zinc-400 mt-0.5">
              {copied ? "Link is in clipboard" : "Copy your URL"}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
