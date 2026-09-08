import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import {
  Globe,
  ExternalLink,
  GitFork,
  Link2,
  AtSign,
  Share2,
  Film,
  X,
  MessageCircle,
  Music,
  BookOpen,
  Tv,
  Hash,
  Headphones,
  Newspaper,
} from "lucide-react";
import { Theme } from "@prisma/client";
import { getFontClass } from "@/lib/fonts";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

/* ─── Social icon map ─── */
const SOCIAL_ICON: Record<string, React.ReactNode> = {
  WEBSITE: <Globe className="size-[18px]" />,
  GITHUB: <GitFork className="size-[18px]" />,
  X: <X className="size-[18px]" />,
  LINKEDIN: <Link2 className="size-[18px]" />,
  INSTAGRAM: <AtSign className="size-[18px]" />,
  FACEBOOK: <Share2 className="size-[18px]" />,
  YOUTUBE: <Film className="size-[18px]" />,
  DISCORD: <MessageCircle className="size-[18px]" />,
  THREADS: <Hash className="size-[18px]" />,
  TIKTOK: <Music className="size-[18px]" />,
  REDDIT: <Newspaper className="size-[18px]" />,
  TWITCH: <Tv className="size-[18px]" />,
  SPOTIFY: <Headphones className="size-[18px]" />,
  MEDIUM: <BookOpen className="size-[18px]" />,
  HASHNODE: <Hash className="size-[18px]" />,
};

export default async function PublicProfile({ params }: Props) {
  const { username } = await params;

  const profile = await prisma.profile.findUnique({
    where: { username },
    include: {
      links: {
        where: { active: true },
        orderBy: { position: "asc" },
      },
      socials: {
        orderBy: { platform: "asc" },
      },
    },
  });

  if (!profile) {
    notFound();
  }

  if (!profile.isPublic) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-zinc-50 border border-zinc-100">
            <Globe className="size-6 text-zinc-400" />
          </div>
          <h1 className="text-lg font-medium text-zinc-900">Private Profile</h1>
          <p className="mt-1.5 text-sm text-zinc-500">This profile is not publicly visible.</p>
        </div>
      </main>
    );
  }

  // Increment view count (fire-and-forget)
  prisma.profile
    .update({ where: { id: profile.id }, data: { views: { increment: 1 } } })
    .catch(() => {});

  // Styling Variables
  const bgColor = profile.backgroundColor || "#FFFFFF";
  const accColor = profile.accentColor || "#18181B";
  const btnColor = profile.buttonColor || "#18181B";
  const btnTextColor = profile.buttonTextColor || "#FFFFFF";
  const fontClass = getFontClass(profile.fontFamily || "INTER");

  let btnRadius = "1rem"; // rounded-2xl roughly
  if (profile.buttonStyle === "PILL") btnRadius = "9999px";
  if (profile.buttonStyle === "SQUARE") btnRadius = "0px";

  const getThemeClasses = (theme: Theme = "DEFAULT") => {
    switch (theme) {
      case "DARK":
        return "bg-zinc-900 text-white selection:bg-zinc-800";
      case "LIGHT":
        return "bg-white text-zinc-900 selection:bg-zinc-100";
      case "MINIMAL":
        return "bg-transparent text-zinc-800";
      case "GLASS":
        return "bg-white/40 backdrop-blur-md text-zinc-800";
      case "GRADIENT":
        return "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white";
      case "DEFAULT":
      default:
        return "bg-white text-zinc-900 selection:bg-zinc-100";
    }
  };

  const themeClasses = getThemeClasses(profile.theme);
  const customBackgroundStyle = 
    profile.theme === "GRADIENT" || profile.theme === "GLASS"
      ? {}
      : { backgroundColor: bgColor };

  return (
    <main 
      className={`min-h-screen ${themeClasses} ${fontClass}`}
      style={customBackgroundStyle}
    >
      <div className="mx-auto max-w-2xl pb-20">
        
        {/* ── Banner ── */}
        <div className="relative h-32 sm:h-48 w-full" style={{ backgroundColor: accColor }}>
          {profile.banner ? (
            <Image
              src={profile.banner}
              alt="Banner"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          )}
        </div>

        {/* ── Profile Header ── */}
        <div className="relative -mt-12 flex flex-col items-center px-6 sm:-mt-16 sm:px-12">
          
          {/* Avatar */}
          <div className="relative">
            <div className="size-24 sm:size-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm ring-1 ring-zinc-900/5">
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.displayName}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-3xl font-medium text-zinc-400">
                  {profile.displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name & Bio */}
          <div className="mt-4 flex flex-col items-center text-center">
            <h1 className="flex items-center gap-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
              {profile.displayName}
              {profile.verified && (
                <svg className="size-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              )}
            </h1>
            <p className="mt-1 text-sm font-medium opacity-70">@{profile.username}</p>

            {profile.bio && (
              <p className="mt-4 max-w-md text-sm leading-relaxed opacity-80">
                {profile.bio}
              </p>
            )}

            {/* Website Badge */}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 px-4 py-1.5 text-xs font-medium transition-colors hover:opacity-80 shadow-sm"
                style={{ backgroundColor: btnColor, color: btnTextColor, borderRadius: btnRadius }}
              >
                <Globe className="size-3.5" />
                {profile.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            )}
          </div>

          {/* ── Social Links ── */}
          {profile.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.platform}
                  className="flex size-11 items-center justify-center shadow-sm transition-all hover:scale-105 hover:brightness-110"
                  style={{ backgroundColor: btnColor, color: btnTextColor, borderRadius: btnRadius }}
                >
                  {SOCIAL_ICON[social.platform] ?? <Globe className="size-[18px]" />}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ── Links Section ── */}
        <div className="mt-10 flex flex-col gap-3 px-6 sm:px-12">
          {profile.links.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-200 py-12 text-center opacity-50">
              <p className="text-sm">No links available right now.</p>
            </div>
          ) : (
            profile.links.map((link) => (
              <a
                key={link.id}
                href={`/r/${link.id}`}
                className="group relative flex items-center justify-between p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all hover:brightness-110"
                style={{ backgroundColor: btnColor, color: btnTextColor, borderRadius: btnRadius }}
              >
                <div className="flex flex-col pr-6">
                  <h2 className="text-sm font-semibold">
                    {link.title}
                  </h2>
                  {link.description && (
                    <p className="mt-1 line-clamp-1 text-xs opacity-70">
                      {link.description}
                    </p>
                  )}
                </div>
                
                {/* Arrow icon that reveals on hover */}
                <div 
                  className="flex size-8 shrink-0 items-center justify-center rounded-full opacity-50 transition-all group-hover:opacity-100"
                  style={{ backgroundColor: accColor }}
                >
                  <ExternalLink className="size-4" style={{ color: btnTextColor }} />
                </div>
              </a>
            ))
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mt-16 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-600"
          >
            Powered by <span className="text-zinc-900">OneProfile</span>
          </a>
        </div>
        
      </div>
    </main>
  );
}