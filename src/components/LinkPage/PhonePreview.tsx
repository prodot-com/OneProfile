"use client";

import { Globe, ExternalLink } from "lucide-react";

interface PreviewLink {
  id: string;
  title: string;
  url: string;
  active: boolean;
  description?: string | null;
}

interface PreviewSocial {
  id: string;
  platform: string;
  url: string;
}

interface PreviewProfile {
  displayName: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
  website: string | null;
}

interface PhonePreviewProps {
  profile: PreviewProfile;
  links: PreviewLink[];
  socials: PreviewSocial[];
}

/* Platform initial color mapping */
const PLATFORM_BG: Record<string, string> = {
  GITHUB: "bg-zinc-900",
  X: "bg-zinc-900",
  LINKEDIN: "bg-blue-600",
  INSTAGRAM: "bg-gradient-to-br from-purple-500 to-pink-500",
  FACEBOOK: "bg-blue-500",
  YOUTUBE: "bg-red-600",
  DISCORD: "bg-indigo-500",
  THREADS: "bg-zinc-900",
  TIKTOK: "bg-zinc-900",
  REDDIT: "bg-orange-500",
  TWITCH: "bg-purple-600",
  SPOTIFY: "bg-green-500",
  MEDIUM: "bg-zinc-800",
  HASHNODE: "bg-blue-600",
  WEBSITE: "bg-emerald-500",
};

export default function PhonePreview({
  profile,
  links,
  socials,
}: PhonePreviewProps) {
  const activeLinks = links.filter((l) => l.active);

  return (
    <div className="sticky top-8">
      {/* URL bar */}
      <div className="mx-auto mb-3 flex max-w-[280px] items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 shadow-sm">
        <span className="truncate text-xs text-zinc-500">
          oneprofile.me/{profile.username}
        </span>
        <ExternalLink className="size-3 shrink-0 text-zinc-400" />
      </div>

      {/* Phone frame */}
      <div className="mx-auto w-[280px] rounded-[2.5rem] border-[6px] border-zinc-900 bg-white shadow-2xl shadow-zinc-900/20 overflow-hidden">
        {/* Notch */}
        <div className="relative flex justify-center bg-zinc-900 py-1.5">
          <div className="h-[18px] w-[90px] rounded-full bg-zinc-800" />
        </div>

        {/* Screen content — scrollable */}
        <div className="h-[520px] overflow-y-auto overflow-x-hidden scrollbar-none">
          {/* Banner */}
          <div className="relative h-20 w-full bg-zinc-50">
            {profile.banner ? (
              <img
                src={profile.banner}
                alt="Banner"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:10px_10px] opacity-30" />
            )}
          </div>

          {/* Avatar + Info */}
          <div className="relative -mt-8 flex flex-col items-center px-4">
            {/* Avatar */}
            <div className="size-16 overflow-hidden rounded-full border-[3px] border-white bg-white shadow-sm ring-1 ring-zinc-900/5">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-xl font-medium text-zinc-400">
                  {profile.displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name */}
            <h3 className="mt-2 text-sm font-semibold text-zinc-900 text-center leading-tight">
              {profile.displayName}
            </h3>
            <p className="text-[11px] text-zinc-500">@{profile.username}</p>

            {/* Bio */}
            {profile.bio && (
              <p className="mt-2 text-center text-[10px] leading-relaxed text-zinc-500 line-clamp-2 px-2">
                {profile.bio}
              </p>
            )}

            {/* Website */}
            {profile.website && (
              <div className="mt-2 flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[9px] text-zinc-500">
                <Globe className="size-2.5" />
                {profile.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </div>
            )}

            {/* Social icons */}
            {socials.length > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {socials.map((s) => (
                  <div
                    key={s.id}
                    className={`flex size-7 items-center justify-center rounded-full text-[9px] font-bold text-white ${
                      PLATFORM_BG[s.platform] || "bg-zinc-400"
                    }`}
                    title={s.platform}
                  >
                    {s.platform.charAt(0)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="mt-4 flex flex-col gap-2 px-4 pb-6">
            {activeLinks.length === 0 ? (
              <div className="py-6 text-center text-[10px] text-zinc-400">
                No active links to display.
              </div>
            ) : (
              activeLinks.map((link) => (
                <div
                  key={link.id}
                  className="group relative flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all hover:border-zinc-300 hover:bg-zinc-50/50"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="truncate text-[11px] font-medium text-zinc-900">
                      {link.title}
                    </p>
                    {link.description && (
                      <p className="truncate text-[9px] text-zinc-400 mt-0.5">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink className="size-2.5 text-zinc-500" />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="pb-4 text-center">
            <span className="text-[8px] text-zinc-400">
              Powered by{" "}
              <span className="font-medium text-zinc-600">OneProfile</span>
            </span>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center bg-white pb-2 pt-1">
          <div className="h-1 w-20 rounded-full bg-zinc-300" />
        </div>
      </div>
    </div>
  );
}
