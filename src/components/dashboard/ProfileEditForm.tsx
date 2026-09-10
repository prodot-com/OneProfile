"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/profile";
import { Link as PrismaLink, SocialLink, Theme, ButtonStyle, FontFamily } from "@prisma/client";
import PhonePreview from "@/components/LinkPage/PhonePreview";
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

const THEMES: { value: Theme; label: string; colors: string[] }[] = [
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
  theme: Theme;
  accentColor: string;
  backgroundColor?: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: FontFamily;
  isPublic: boolean;
}

export default function ProfileEditForm({
  profile,
  links,
  socials,
}: {
  profile: ProfileData;
  links: PrismaLink[];
  socials: SocialLink[];
}) {
  const router = useRouter();

  const [form, setForm] = useState<Partial<ProfileData>>({
    displayName: profile.displayName,
    username: profile.username,
    bio: profile.bio ?? "",
    website: profile.website ?? "",
    theme: profile.theme,
    accentColor: profile.accentColor,
    buttonColor: profile.buttonColor,
    buttonTextColor: profile.buttonTextColor,
    buttonStyle: profile.buttonStyle,
    fontFamily: profile.fontFamily,
    isPublic: profile.isPublic,
  });

  const [avatar, setAvatar] = useState(profile.avatar ?? "");
  const [banner, setBanner] = useState(profile.banner ?? "");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [avatarUploading, setAvatarUploading] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);

  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const updateForm = (updates: Partial<ProfileData>) => {
    setForm((prev) => ({ ...prev, ...updates }));
    setSuccess(false);
  };

  async function uploadImage(
    file: File,
    setUrl: (url: string) => void,
    setLoading: (v: boolean) => void
  ) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
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
      ...form,
      avatar,
      banner,
    } as any); // Cast as any or manually map due to Partial type on form

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
    <div className="flex-1 w-full h-full min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:overflow-hidden">
      {/* Left: Editor */}
      <section className="hide-scrollbar py-8 space-y-8 min-w-0 lg:min-h-0 lg:overflow-y-auto lg:h-full lg:pr-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Appearance</h1>
          <p className="mt-1.5 text-zinc-500">Manage your profile info and visual styling.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
          {/* Banner */}
          <div className="relative h-40 sm:h-52" style={{ backgroundColor: form.accentColor }}>
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
                    <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-2xl font-bold text-zinc-400">
                      {form.displayName?.charAt(0).toUpperCase()}
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
          <div className="h-16" />
        </div>

        {/* Profile Details */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-6 py-4">
            <h2 className="text-sm font-semibold text-zinc-800">Profile Details</h2>
          </div>
          <div className="space-y-5 p-6">
            <Field icon={<User className="size-4 text-violet-500" />} label="Display Name" desc="Your full name or brand name">
              <input type="text" value={form.displayName} onChange={(e) => updateForm({ displayName: e.target.value })} className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
            </Field>

            <Field icon={<AtSign className="size-4 text-blue-500" />} label="Username" desc="oneprofile.me/username">
              <div className="flex items-center gap-0 rounded-xl border border-zinc-200 bg-zinc-50/50 transition focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100">
                <span className="pl-4 text-sm text-zinc-400">@</span>
                <input type="text" value={form.username} onChange={(e) => updateForm({ username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })} className="w-full bg-transparent px-2 py-2.5 text-sm outline-none" maxLength={30} />
              </div>
            </Field>

            <Field icon={<FileText className="size-4 text-emerald-500" />} label="Bio" desc="Tell visitors about yourself">
              <textarea value={form.bio || ""} onChange={(e) => updateForm({ bio: e.target.value.slice(0, 200) })} rows={3} className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
              <p className="mt-1 text-right text-xs text-zinc-300">{(form.bio || "").length}/200</p>
            </Field>

            <Field icon={<Link2 className="size-4 text-cyan-500" />} label="Website" desc="Your personal or company website">
              <input type="url" value={form.website || ""} onChange={(e) => updateForm({ website: e.target.value })} className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100" />
            </Field>
          </div>
        </div>

        {/* Customization Details */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-6 py-4">
            <h2 className="text-sm font-semibold text-zinc-800">Design</h2>
            <p className="text-xs text-zinc-400">Adjust the visual styles of your page</p>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-zinc-700">Theme Base</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {THEMES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => updateForm({ theme: t.value })}
                    className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
                      form.theme === t.value
                        ? "border-violet-500 bg-violet-50/50 shadow-sm"
                        : "border-zinc-100 bg-zinc-50/30 hover:border-zinc-200 hover:bg-zinc-50"
                    }`}
                  >
                    {form.theme === t.value && (
                      <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-violet-500">
                        <Check className="size-3 text-white" />
                      </div>
                    )}
                    <span className={`text-xs font-medium ${form.theme === t.value ? "text-violet-700" : "text-zinc-500"}`}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Font Family</label>
                <select
                  value={form.fontFamily}
                  onChange={(e) => updateForm({ fontFamily: e.target.value as FontFamily })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 px-4 text-sm outline-none"
                >
                  <option value="INTER">Inter</option>
                  <option value="POPPINS">Poppins</option>
                  <option value="ROBOTO">Roboto</option>
                  <option value="MONO">Mono</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Button Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["ROUNDED", "PILL", "SQUARE"] as ButtonStyle[]).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => updateForm({ buttonStyle: style })}
                      className={`py-2 px-3 border transition-colors ${
                        form.buttonStyle === style
                          ? "border-zinc-900 bg-zinc-900 text-white"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700"
                      } ${
                        style === "ROUNDED" ? "rounded-xl" : style === "PILL" ? "rounded-full" : "rounded-none"
                      }`}
                    >
                      <span className="text-xs font-semibold">{style}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ColorPicker label="Accent Color" value={form.accentColor!} onChange={(val) => updateForm({ accentColor: val })} />
              <ColorPicker label="Btn Background" value={form.buttonColor!} onChange={(val) => updateForm({ buttonColor: val })} />
              <ColorPicker label="Btn Text" value={form.buttonTextColor!} onChange={(val) => updateForm({ buttonTextColor: val })} />
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm p-6">
           <label className="block text-sm font-medium text-zinc-700 mb-3">Visibility</label>
           <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => updateForm({ isPublic: true })}
              className={`flex flex-1 items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                form.isPublic ? "border-emerald-500 bg-emerald-50/50" : "border-zinc-100"
              }`}
            >
              Public
            </button>
            <button
              type="button"
              onClick={() => updateForm({ isPublic: false })}
              className={`flex flex-1 items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                !form.isPublic ? "border-amber-500 bg-amber-50/50" : "border-zinc-100"
              }`}
            >
              Private 
            </button>
          </div>
        </div>

        {/* Sticky Save Bar */}
        <div className="sticky bottom-4 flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-lg backdrop-blur-md">
          <div className="text-sm font-medium">
            {error && <span className="text-red-500">{error}</span>}
            {success && <span className="text-emerald-500">Saved successfully!</span>}
            {!error && !success && <span className="text-zinc-500">Unsaved changes will be lost</span>}
          </div>
          <button
            onClick={handleSave}
            disabled={saving || avatarUploading || bannerUploading}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
          </button>
        </div>
      </section>

      {/* Right: Phone Preview */}
      <div className="hidden lg:flex lg:h-full lg:flex-col lg:items-center lg:justify-start lg:overflow-hidden">
        <PhonePreview
          profile={{
            ...profile,
            ...form,
            avatar,
            banner,
          } as any}
          links={links}
          socials={socials}
        />
      </div>
    </div>
  );
}

function Field({ icon, label, desc, children }: { icon: React.ReactNode; label: string; desc: string; children: React.ReactNode }) {
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

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-700 mb-2">{label}</label>
      <div className="flex flex-col gap-2 relative">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-8 opacity-0 absolute cursor-pointer" />
        <div className="w-full h-8 rounded-lg border flex items-center justify-center font-mono text-[10px]" style={{ backgroundColor: value || "#000000", color: ['#FFF', '#FFFFFF'].includes((value || '').toUpperCase()) ? '#000' : '#fff' }}>{value}</div>
      </div>
    </div>
  );
}
