"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/profile";
import {
  Camera,
  ImagePlus,
  Loader2,
  Check,
  Globe,
  Lock,
  User,
  AtSign,
  FileText,
  Link2,
  Palette,
  Eye,
} from "lucide-react";

const THEMES = [
  { value: "DEFAULT", label: "Default", colors: ["#3b82f6", "#6366f1"] },
  { value: "DARK", label: "Dark", colors: ["#18181b", "#27272a"] },
  { value: "LIGHT", label: "Light", colors: ["#f4f4f5", "#ffffff"] },
  { value: "MINIMAL", label: "Minimal", colors: ["#fafafa", "#e4e4e7"] },
  { value: "GLASS", label: "Glass", colors: ["#8b5cf6", "#06b6d4"] },
  { value: "GRADIENT", label: "Gradient", colors: ["#ec4899", "#f59e0b"] },
];

export interface ProfileData {
  id: string;
  username: string;
  displayName: string;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
  website: string | null;
  theme: string;
  isPublic: boolean;
}

export default function ProfileEditForm({
  profile,
}: {
  profile: ProfileData;
}) {
  const router = useRouter();

  const [displayName, setDisplayName] = useState(profile.displayName);
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio ?? "");
  const [website, setWebsite] = useState(profile.website ?? "");
  const [theme, setTheme] = useState(profile.theme);
  const [isPublic, setIsPublic] = useState(profile.isPublic);
  const [avatar, setAvatar] = useState(profile.avatar ?? "");
  const [banner, setBanner] = useState(profile.banner ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);

  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  async function uploadImage(
    file: File,
    setUrl: (url: string) => void,
    setLoading: (v: boolean) => void
  ) {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (json.success && json.url) {
        setUrl(json.url);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess(false);

    const result = await updateProfile({
      displayName,
      username,
      bio,
      website,
      avatar,
      banner,
      theme,
      isPublic,
    });

    setSaving(false);

    if (result.success) {
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 2500);
    } else {
      setError(result.error ?? "Something went wrong.");
    }
  }

  return (
    <section className="space-y-8">

      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="relative h-40 sm:h-52 bg-gradient-to-br from-violet-100 to-indigo-100">
          {banner && (
            <img
              src={banner}
              alt="Banner"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={() => bannerRef.current?.click()}
            disabled={bannerUploading}
            className="absolute right-4 top-4 flex items-center gap-2 rounded-xl bg-white/80 px-2 py-2 text-xs font-medium text-zinc-700 shadow backdrop-blur transition hover:bg-white"
          >
            {bannerUploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ImagePlus className="size-4" />
            )}
            {/* {bannerUploading ? "Uploading…" : "Change Banner"} */}
          </button>
          <input
            ref={bannerRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file, setBanner, setBannerUploading);
            }}
          />

          {/* Avatar overlapping banner */}
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <div className="size-24 rounded-2xl border-4 border-white bg-zinc-100 shadow-md overflow-hidden">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-500 text-2xl font-bold text-white">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => avatarRef.current?.click()}
                disabled={avatarUploading}
                className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-zinc-900 text-white shadow-md transition hover:bg-zinc-700"
              >
                {avatarUploading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Camera className="size-3.5" />
                )}
              </button>
              <input
                ref={avatarRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file, setAvatar, setAvatarUploading);
                }}
              />
            </div>
          </div>
        </div>

        {/* Spacer for avatar overflow */}
        <div className="h-16" />
      </div>

      {/* Form Fields */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-6 py-4">
          <h2 className="text-sm font-semibold text-zinc-800">Profile Information</h2>
          <p className="text-xs text-zinc-400">This is publicly visible on your profile page</p>
        </div>
        <div className="space-y-5 p-6">
          <Field
            icon={<User className="size-4 text-violet-500" />}
            label="Display Name"
            desc="Your full name or brand name"
          >
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              placeholder="John Doe"
            />
          </Field>

          <Field
            icon={<AtSign className="size-4 text-blue-500" />}
            label="Username"
            desc="oneprofile.com/your-username"
          >
            <div className="flex items-center gap-0 rounded-xl border border-zinc-200 bg-zinc-50/50 transition focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100">
              <span className="pl-4 text-sm text-zinc-400">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                }
                className="w-full bg-transparent px-2 py-2.5 text-sm text-zinc-900 outline-none"
                placeholder="johndoe"
                maxLength={30}
              />
            </div>
          </Field>

          <Field
            icon={<FileText className="size-4 text-emerald-500" />}
            label="Bio"
            desc="Tell visitors about yourself (max 200 chars)"
          >
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 200))}
              rows={3}
              className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              placeholder="Developer, designer, creator..."
            />
            <p className="mt-1 text-right text-xs text-zinc-300">{bio.length}/200</p>
          </Field>

          <Field
            icon={<Link2 className="size-4 text-cyan-500" />}
            label="Website"
            desc="Your personal or company website"
          >
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
              placeholder="https://example.com"
            />
          </Field>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Palette className="size-4 text-violet-500" />
            <div>
              <h2 className="text-sm font-semibold text-zinc-800">Theme</h2>
              <p className="text-xs text-zinc-400">Choose how your profile looks to visitors</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3">
          {THEMES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTheme(t.value)}
              className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
                theme === t.value
                  ? "border-violet-500 bg-violet-50/50 shadow-sm"
                  : "border-zinc-100 bg-zinc-50/30 hover:border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              {theme === t.value && (
                <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-violet-500">
                  <Check className="size-3 text-white" />
                </div>
              )}
              <div className="flex gap-1">
                {t.colors.map((c, i) => (
                  <div
                    key={i}
                    className="size-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span
                className={`text-xs font-medium ${
                  theme === t.value ? "text-violet-700" : "text-zinc-500"
                }`}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Visibility Toggle */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
        <div className="border-b border-zinc-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Eye className="size-4 text-amber-500" />
            <div>
              <h2 className="text-sm font-semibold text-zinc-800">Visibility</h2>
              <p className="text-xs text-zinc-400">Control who can see your profile</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6">
          <button
            type="button"
            onClick={() => setIsPublic(true)}
            className={`flex flex-1 items-center gap-3 rounded-xl border-2 p-4 transition-all ${
              isPublic
                ? "border-emerald-500 bg-emerald-50/50"
                : "border-zinc-100 hover:border-zinc-200"
            }`}
          >
            <div
              className={`flex size-10 items-center justify-center rounded-xl ${
                isPublic ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-400"
              }`}
            >
              <Globe className="size-5" />
            </div>
            <div className="text-left">
              <p
                className={`text-sm font-semibold ${
                  isPublic ? "text-emerald-700" : "text-zinc-600"
                }`}
              >
                Public
              </p>
              <p className="text-xs text-zinc-400">Anyone can view</p>
            </div>
            {isPublic && (
              <Check className="ml-auto size-5 text-emerald-500" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsPublic(false)}
            className={`flex flex-1 items-center gap-3 rounded-xl border-2 p-4 transition-all ${
              !isPublic
                ? "border-amber-500 bg-amber-50/50"
                : "border-zinc-100 hover:border-zinc-200"
            }`}
          >
            <div
              className={`flex size-10 items-center justify-center rounded-xl ${
                !isPublic ? "bg-amber-100 text-amber-600" : "bg-zinc-100 text-zinc-400"
              }`}
            >
              <Lock className="size-5" />
            </div>
            <div className="text-left">
              <p
                className={`text-sm font-semibold ${
                  !isPublic ? "text-amber-700" : "text-zinc-600"
                }`}
              >
                Private
              </p>
              <p className="text-xs text-zinc-400">Only you can view</p>
            </div>
            {!isPublic && (
              <Check className="ml-auto size-5 text-amber-500" />
            )}
          </button>
        </div>
      </div>

      {/* Error / Success feedback + Save Button */}
      <div className="flex flex-col items-end gap-3">
        {error && (
          <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-600">
            Profile updated successfully!
          </div>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || avatarUploading || bannerUploading}
          className="flex items-center gap-2 rounded-xl bg-zinc-900 px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </section>
  );
}

/* ─── Field wrapper ─── */
function Field({
  icon,
  label,
  desc,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        {icon}
        <label className="text-sm font-medium text-zinc-700">{label}</label>
      </div>
      <p className="text-xs text-zinc-400">{desc}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
