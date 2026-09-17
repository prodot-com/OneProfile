import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import {
  Globe,
  ExternalLink,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { Theme } from "@prisma/client";
import { getFontClass } from "@/lib/fonts";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaDiscord,
  FaReddit,
  FaTwitch,
  FaSpotify,
  FaMedium,
  FaTiktok,
} from "react-icons/fa";
import { FaHashnode, FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

/* ─── Social icon map ─── */
const SOCIAL_ICON: Record<string, React.ReactNode> = {
  WEBSITE: <Globe className="size-[22px]" />,
  GITHUB: <FaGithub className="size-[22px]" />,
  X: <FaXTwitter className="size-[22px]" />,
  LINKEDIN: <FaLinkedin className="size-[22px]" />,
  INSTAGRAM: <FaInstagram className="size-[22px]" />,
  FACEBOOK: <FaFacebook className="size-[22px]" />,
  YOUTUBE: <FaYoutube className="size-[22px]" />,
  DISCORD: <FaDiscord className="size-[22px]" />,
  THREADS: <SiThreads className="size-[22px]" />,
  TIKTOK: <FaTiktok className="size-[22px]" />,
  REDDIT: <FaReddit className="size-[22px]" />,
  TWITCH: <FaTwitch className="size-[22px]" />,
  SPOTIFY: <FaSpotify className="size-[22px]" />,
  MEDIUM: <FaMedium className="size-[22px]" />,
  HASHNODE: <FaHashnode className="size-[22px]" />,
};

const PLATFORM_BG: Record<string, string> = {
  GITHUB: "bg-[#18181b]",
  X: "bg-[#000000]",
  LINKEDIN: "bg-[#0a66c2]",
  INSTAGRAM: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
  FACEBOOK: "bg-[#1877f2]",
  YOUTUBE: "bg-[#ff0000]",
  DISCORD: "bg-[#5865f2]",
  THREADS: "bg-[#000000]",
  TIKTOK: "bg-[#000000]",
  REDDIT: "bg-[#ff4500]",
  TWITCH: "bg-[#9146ff]",
  SPOTIFY: "bg-[#1ed760]",
  MEDIUM: "bg-[#000000]",
  HASHNODE: "bg-[#2962ff]",
  WEBSITE: "bg-[#f97316]",
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

  // console.log("profile: ", profile)

  if (!profile.isPublic) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
        <div className="absolute inset-0 bg-[url('/back.png')] bg-cover bg-left opacity-30 mix-blend-multiply pointer-events-none" />
        <div className="text-center relative z-10 animate-in fade-in zoom-in duration-500">
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-white shadow-xl border border-[#e5e2dc]">
            <Globe className="size-7 text-[#b4b0a4]" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#1a1a1a]">Private Profile</h1>
          <p className="mt-2 text-[15px] text-[#6b6b6b]">This profile is not publicly visible.</p>
        </div>
      </main>
    );
  }

  // Increment view count (fire-and-forget)
  prisma.profile
    .update({ where: { id: profile.id }, data: { views: { increment: 1 } } })
    .catch(() => {});

  // Styling Variables
  const accColor = profile.accentColor || "#18181B";
  const btnColor = profile.buttonColor || "#18181B";
  const btnTextColor = profile.buttonTextColor || "#FFFFFF";
  const fontClass = getFontClass(profile.fontFamily || "INTER");

  let btnRadius = "1rem"; // rounded-2xl roughly
  if (profile.buttonStyle === "PILL") btnRadius = "9999px";
  if (profile.buttonStyle === "SQUARE") btnRadius = "0px";

  // Complex themes processing
  const getThemeSetup = (theme: Theme = "DEFAULT") => {
    switch (theme) {
      case "DARK":
        return {
          wrapper: "bg-[#0a0a0a] text-zinc-100 selection:bg-zinc-800",
          bgLayer: null,
          cardBg: "bg-[#151515] md:rounded-[2.5rem] border border-zinc-800/50 shadow-xl",
        };
      case "GLASS":
        return {
          wrapper: "bg-[#f3f4f6] text-zinc-900",
          bgLayer: (
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/30 blur-[120px]" />
              <div className="absolute top-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-pink-400/30 blur-[120px]" />
              <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-orange-400/30 blur-[120px]" />
            </div>
          ),
          cardBg: "bg-white/60 backdrop-blur-3xl md:rounded-[2.5rem] border border-white/50 shadow-2xl",
        };
      case "GRADIENT":
        return {
          wrapper: "bg-gradient-to-br from-[#ffafbd] to-[#ffc3a0] text-zinc-900 selection:bg-black/10",
          bgLayer: null,
          cardBg: "bg-white/50 backdrop-blur-xl md:rounded-[2.5rem] border border-white/30 shadow-2xl",
        };
      case "MINIMAL":
        return {
          wrapper: "bg-[#faf9f6] text-zinc-900",
          bgLayer: null,
          cardBg: "md:p-8", 
        };
      case "LIGHT":
      case "DEFAULT":
      default:
        return {
          wrapper: "bg-[var(--background)] lg:bg-[#f2f2f0] text-zinc-900 selection:bg-[#f97316]/20",
          bgLayer: null,
          cardBg: "bg-[var(--background)] md:rounded-[2.5rem] md:shadow-[0_8px_40px_rgb(0,0,0,0.04)] ring-1 ring-black/5", 
        };
    }
  };

  const themeSetup = getThemeSetup(profile.theme);

  return (
    <main className={`min-h-screen relative overflow-x-hidden ${themeSetup.wrapper} ${fontClass}`}>
      {themeSetup.bgLayer}

      {/* Main container with standard entrance animation */}
      <div className="mx-auto w-full max-w-[680px] min-h-screen md:py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both flex flex-col relative z-10">
        
        {/* Unified Card Wrapper */}
        <div className={`relative flex-1 flex flex-col overflow-hidden w-full ${themeSetup.cardBg}`}>
          
          {/* Top Actions Navbar */}
          <div className="absolute top-0 inset-x-4 flex justify-between items-center py-5 z-50">
            <div className="size-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/50 transition">
              <Globe className="size-5 text-[#f97316]" />
            </div>
            <div className="size-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/50 transition">
              <Share2 className="size-4 text-zinc-700" />
            </div>
          </div>

          {/* ── Banner ── */}
          <div 
            className="relative h-44 sm:h-56 w-full shrink-0" 
            style={{ backgroundColor: profile.banner ? 'transparent' : accColor }}
          >
            {profile.banner ? (
              <Image
                src={profile.banner}
                alt="Banner"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15]" />
            )}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* ── Profile Header ── */}
          <div className="relative -mt-16 flex flex-col items-center px-6 sm:-mt-20 sm:px-12 pb-6 shrink-0">
            
            {/* Avatar (with its own staggered animation) */}
            <div className="relative animate-in zoom-in-75 fade-in duration-500 delay-200 fill-mode-both">
              <div 
                className={`size-28 sm:size-36 overflow-hidden rounded-full border-4 shadow-xl ring-1 ring-black/5 border-[var(--background)] bg-[var(--background)]`}
              >
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.displayName}
                    width={144}
                    height={144}
                    className="h-full w-full object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-serif opacity-30">
                    {profile.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {/* Verified Badge */}
              {profile.verified && (
                <div 
                  className="absolute bottom-1 right-1 rounded-full bg-white p-0.5 shadow-sm"
                  title="Verified Account"
                >
                  <CheckCircle2 className="size-7 text-[#0095F6] fill-white" />
                </div>
              )}
            </div>

            {/* Name & Bio */}
            <div className="mt-5 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {profile.displayName}
              </h1>
              <p className="mt-1 text-sm font-medium opacity-60">@{profile.username}</p>

            {profile.bio && (
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed opacity-80 whitespace-pre-wrap">
                {profile.bio}
              </p>
            )}

            {/* Website Badge */}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center gap-2.5 px-5 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                style={{ backgroundColor: btnColor, color: btnTextColor, borderRadius: btnRadius }}
              >
                <Globe className="size-4 opacity-80" />
                {profile.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            )}
          </div>

            {/* ── Social Links ── */}
            {profile.socials.length > 0 && (
              <div className="mt-7 flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
                {profile.socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.platform}
                    className={`flex size-[48px] items-center justify-center transition-all hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-lg shadow-black/5 rounded-full text-white ${PLATFORM_BG[social.platform] || "bg-zinc-800"}`}
                  >
                    {SOCIAL_ICON[social.platform] ?? <Globe className="size-[22px]" />}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ── Links Section ── */}
          <div className="flex-1 flex flex-col gap-4 px-6 sm:px-10 pb-16 list-none m-0">
          {profile.links.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-zinc-200/50 py-16 text-center opacity-50 animate-in fade-in duration-700 delay-500 fill-mode-both">
              <p className="text-[15px]">No links available right now.</p>
            </div>
          ) : (
            profile.links.map((link, index) => (
              <a
                key={link.id}
                href={`/r/${link.id}`}
                className="group relative flex items-center justify-between p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden"
                style={{ 
                  backgroundColor: btnColor, 
                  color: btnTextColor, 
                  borderRadius: btnRadius,
                  /* Staggered entry animation */
                  animation: `slide-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.5 + index * 0.05}s both`
                }}
              >
                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                
                <div className="flex flex-col pr-6 shrink relative z-10 w-full text-center items-center justify-center">
                  <h2 className="text-[15px] sm:text-base font-semibold tracking-tight">
                    {link.title}
                  </h2>
                  {link.description && (
                    <p className="mt-1 text-xs sm:text-sm opacity-70 font-medium">
                      {link.description}
                    </p>
                  )}
                </div>
                
                {/* Hover Arrow */}
                <div 
                  className="absolute right-4 flex size-8 shrink-0 items-center justify-center rounded-full opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                  style={{ backgroundColor: accColor }}
                >
                  <ExternalLink className="size-4" style={{ color: btnTextColor }} />
                </div>
              </a>
            ))
          )}
          </div>
        </div>
      </div>

      {/* Floating Pill Footer (outside card) */}
      <div className="relative z-10 w-full text-center animate-in fade-in duration-700 delay-700 fill-mode-both pb-10 pt-4">
        <a
          href="/"
          className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 text-[11px] font-semibold tracking-wide shadow-xl ring-1 ring-black/5 hover:scale-105 transition-all text-zinc-900"
        >
          <Globe className="size-3 text-[#f97316]" />
          oneprofile.me/{profile.username}
        </a>
      </div>
      
      {/* Add raw CSS for the custom staggered animation since Tailwind doesn't have native index loops */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}