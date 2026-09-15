"use client";

import { useState, useRef, useEffect } from "react";
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

  // useEffect(()=>console.log(form), [form])

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
    } as any);

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
      <section className="hide-scrollbar py-8 space-y-8 min-w-0 lg:min-h-0 lg:overflow-y-auto lg:h-full lg:pr-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-[#1a1a1a]">Appearance</h1>
          <p className="mt-2 text-lg text-[#6b6b6b]">Manage your profile info and visual styling.</p>
        </div>

        <div className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm overflow-hidden">
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

            <div className="absolute -bottom-12 left-6">
              <div className="relative">
                <div className="size-24 rounded-[1.25rem] border-4 border-white bg-[#fafafa] shadow-md overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#f0f0f0] text-2xl font-serif font-bold text-[#b4b0a4]">
                      {form.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => avatarRef.current?.click()}
                  disabled={avatarUploading}
                  className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-[#1a1a1a] text-white shadow-md transition hover:bg-[#333] cursor-pointer"
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

        <div className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm">
          <div className="border-b border-[#f0f0f0] px-6 py-5">
            <h2 className="text-lg font-serif font-semibold text-[#1a1a1a]">Profile Details</h2>
          </div>
          <div className="space-y-6 p-6">
            <Field icon={<User className="size-4.5 text-[#1a1a1a]" />} label="Display Name" desc="Your full name or brand name">
              <input type="text" value={form.displayName} onChange={(e) => updateForm({ displayName: e.target.value })} className="w-full rounded-[1.25rem] border border-[#e5e2dc] bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-[#c2410c] focus:ring-2 focus:ring-[#f97316]/10 text-[#1a1a1a]" />
            </Field>

            <Field icon={<AtSign className="size-4.5 text-[#1a1a1a]" />} label="Username" desc="oneprofile.me/username">
              <div className="flex items-center gap-0 rounded-[1.25rem] border border-[#e5e2dc] bg-[#fafafa] transition focus-within:border-[#c2410c] focus-within:ring-2 focus-within:ring-[#f97316]/10 text-[#1a1a1a]">
                <span className="pl-4 text-sm text-[#b4b0a4]">@</span>
                <input type="text" value={form.username} onChange={(e) => updateForm({ username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })} className="w-full bg-transparent px-2 py-3 text-sm outline-none text-[#1a1a1a]" maxLength={30} />
              </div>
            </Field>

            <Field icon={<FileText className="size-4.5 text-[#1a1a1a]" />} label="Bio" desc="Tell visitors about yourself">
              <textarea value={form.bio || ""} onChange={(e) => updateForm({ bio: e.target.value.slice(0, 200) })} rows={3} className="w-full resize-none rounded-[1.25rem] border border-[#e5e2dc] bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-[#c2410c] focus:ring-2 focus:ring-[#f97316]/10 text-[#1a1a1a]" />
              <p className="mt-1 text-right text-xs text-[#b4b0a4]">{(form.bio || "").length}/200</p>
            </Field>

            <Field icon={<Link2 className="size-4.5 text-[#1a1a1a]" />} label="Website" desc="Your personal or company website">
              <input type="url" value={form.website || ""} onChange={(e) => updateForm({ website: e.target.value })} className="w-full rounded-[1.25rem] border border-[#e5e2dc] bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-[#c2410c] focus:ring-2 focus:ring-[#f97316]/10 text-[#1a1a1a]" />
            </Field>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm">
          <div className="border-b border-[#f0f0f0] px-6 py-5">
            <h2 className="text-lg font-serif font-semibold text-[#1a1a1a]">Design</h2>
            <p className="text-xs text-[#6b6b6b]">Adjust the visual styles of your page</p>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#1a1a1a]">Theme Base</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {THEMES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => updateForm({ theme: t.value })}
                    className={`group relative flex flex-col items-center gap-2 rounded-[1.25rem] border-2 p-4 transition-all duration-200 ${
                      form.theme === t.value
                        ? "border-[#f97316] bg-[#f97316]/5 shadow-sm"
                        : "border-[#e5e2dc] bg-[#fafafa] hover:border-[#d8d5ce]"
                    }`}
                  >
                    {form.theme === t.value && (
                      <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-[#f97316]">
                        <Check className="size-3 text-white" />
                      </div>
                    )}
                    <span className={`text-xs font-semibold ${form.theme === t.value ? "text-[#f97316]" : "text-[#b4b0a4]"}`}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Font Family</label>
                <select
                  value={form.fontFamily}
                  onChange={(e) => updateForm({ fontFamily: e.target.value as FontFamily })}
                  className="w-full rounded-[1.25rem] border border-[#e5e2dc] bg-[#fafafa] py-3 px-4 text-sm outline-none text-[#1a1a1a]"
                >
                  <option value="INTER">Inter</option>
                  <option value="POPPINS">Poppins</option>
                  <option value="ROBOTO">Roboto</option>
                  <option value="MONO">Mono</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Button Style</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["ROUNDED", "PILL", "SQUARE"] as ButtonStyle[]).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => updateForm({ buttonStyle: style })}
                      className={`py-2 px-3 border transition-colors ${
                        form.buttonStyle === style
                          ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                          : "border-[#e5e2dc] bg-[#fafafa] text-[#6b6b6b]"
                      } ${
                        style === "ROUNDED" ? "rounded-[1rem]" : style === "PILL" ? "rounded-full" : "rounded-none"
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

        <div className="rounded-[1.5rem] border border-[#e5e2dc] bg-white/70 backdrop-blur-md shadow-sm p-8">
           <label className="block text-sm font-medium text-[#1a1a1a] mb-4">Visibility</label>
           <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => updateForm({ isPublic: true })}
              className={`flex flex-1 items-center justify-center text-sm font-semibold gap-3 rounded-[1.25rem] border-2 p-4 transition-all ${
                form.isPublic ? "border-[#f97316] bg-[#f97316]/5 text-[#c2410c]" : "border-[#e5e2dc] bg-[#fafafa] text-[#6b6b6b]"
              }`}
            >
              Public
            </button>
            <button
              type="button"
              onClick={() => updateForm({ isPublic: false })}
              className={`flex flex-1 items-center justify-center text-sm font-semibold gap-3 rounded-[1.25rem] border-2 p-4 transition-all ${
                !form.isPublic ? "border-amber-500 bg-amber-50/50 text-amber-700" : "border-[#e5e2dc] bg-[#fafafa] text-[#6b6b6b]"
              }`}
            >
              Private 
            </button>
          </div>
        </div>

        <div className="sticky bottom-4 flex items-center justify-between rounded-[1.5rem] border border-[#e5e2dc] bg-white/90 p-4 shadow-xl backdrop-blur-md">
          <div className="text-sm font-medium pl-2">
            {error && <span className="text-red-500">{error}</span>}
            {success && <span className="text-emerald-500">Saved successfully!</span>}
            {!error && !success && <span className="text-[#b4b0a4]">Unsaved changes will be lost</span>}
          </div>
          <button
            onClick={handleSave}
            disabled={saving || avatarUploading || bannerUploading}
            className="flex items-center gap-2 rounded-xl bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
          </button>
        </div>
      </section>

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
        <label className="text-sm font-bold text-[#1a1a1a]">{label}</label>
      </div>
      <p className="text-xs font-medium text-[#b4b0a4]">{desc}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#1a1a1a] mb-2">{label}</label>
      <div className="flex flex-col gap-2 relative">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-10 opacity-0 absolute cursor-pointer" />
        <div className="w-full h-10 rounded-[1rem] border border-[#e5e2dc] flex items-center justify-center font-mono text-xs font-bold shadow-sm" style={{ backgroundColor: value || "#000000", color: ['#FFF', '#FFFFFF'].includes((value || '').toUpperCase()) ? '#000' : '#fff' }}>{value}</div>
      </div>
    </div>
  );
}
