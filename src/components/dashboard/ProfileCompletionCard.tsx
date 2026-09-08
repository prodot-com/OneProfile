"use client";

import Link from "next/link";
import { Check, Camera, Image, FileText, Globe, Users } from "lucide-react";

interface ProfileCompletionCardProps {
  hasAvatar: boolean;
  hasBanner: boolean;
  hasBio: boolean;
  hasWebsite: boolean;
  hasSocials: boolean;
}

const items = [
  {
    key: "hasAvatar",
    label: "Profile photo",
    icon: Camera,
    href: "/dashboard/appearance",
  },
  {
    key: "hasBanner",
    label: "Cover banner",
    icon: Image,
    href: "/dashboard/appearance",
  },
  {
    key: "hasBio",
    label: "Bio description",
    icon: FileText,
    href: "/dashboard/appearance",
  },
  {
    key: "hasWebsite",
    label: "Website URL",
    icon: Globe,
    href: "/dashboard/appearance",
  },
  {
    key: "hasSocials",
    label: "Social links",
    icon: Users,
    href: "/dashboard/links",
  },
] as const;

export default function ProfileCompletionCard(
  props: ProfileCompletionCardProps
) {
  const completed = items.filter(
    (item) => props[item.key as keyof ProfileCompletionCardProps]
  ).length;
  const total = items.length;
  const percentage = Math.round((completed / total) * 100);

  // Don't render if 100% complete
  if (completed === total) return null;

  // SVG circle calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4 mb-5">
        {/* Progress ring */}
        <div className="relative shrink-0">
          <svg className="size-20 -rotate-90" viewBox="0 0 88 88">
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              strokeWidth="6"
              className="stroke-zinc-100"
            />
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              className="stroke-violet-500 transition-all duration-1000 ease-out"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
              }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-zinc-900">
            {percentage}%
          </span>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-800">
            Complete Your Profile
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {completed}/{total} items done — profiles that are 100% complete get
            more views!
          </p>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {items.map((item) => {
          const done = props[item.key as keyof ProfileCompletionCardProps];
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                done
                  ? "bg-emerald-50/60"
                  : "bg-zinc-50 hover:bg-zinc-100/70"
              }`}
            >
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${
                  done
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-white border border-zinc-200 text-zinc-400"
                }`}
              >
                {done ? (
                  <Check className="size-3.5" />
                ) : (
                  <Icon className="size-3.5" />
                )}
              </div>
              <span
                className={`flex-1 text-sm ${
                  done
                    ? "text-zinc-500 line-through decoration-zinc-300"
                    : "text-zinc-700 font-medium"
                }`}
              >
                {item.label}
              </span>
              {!done && (
                <Link
                  href={item.href}
                  className="text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors"
                >
                  Add →
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
