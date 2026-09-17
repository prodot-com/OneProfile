"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/services/profile";
import { Link as PrismaLink, SocialLink, Theme, ButtonStyle, FontFamily } from "@prisma/client";
import PhonePreview from "@/components/LinkPage/PhonePreview";
import { Globe, User, AtSign, FileText, Link2 } from "lucide-react";

import { DesignSectionCard } from "./DesignSectionCard";
import { StickySaveBar } from "./StickySaveBar";
import { PresetThemes, PresetTheme } from "./PresetThemes";
import { ThemeSelector } from "./ThemeSelector";
import { AccentSelector } from "./AccentSelector";
import { ColorPickerCard } from "./ColorPickerCard";
import { FontSelector } from "./FontSelector";
import { ButtonStyleSelector } from "./ButtonStyleSelector";
import { AvatarUploader } from "./AvatarUploader";
import { BannerUploader } from "./BannerUploader";

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

export function DesignPage({
  profile,
  links,
  socials,
}: {
  profile: ProfileData;
  links: PrismaLink[];
  socials: SocialLink[];
}) {
  const router = useRouter();
  
  // Initial Snapshot
  const getInitialState = () => ({
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
    avatar: profile.avatar ?? "",
    banner: profile.banner ?? "",
  });

  const [history, setHistory] = useState<any[]>([getInitialState()]);
  const [historyPtr, setHistoryPtr] = useState(0);
  
  const [saving, setSaving] = useState(false);

  const currentForm = history[historyPtr];

  const pushState = useCallback((updates: Partial<typeof currentForm>) => {
    setHistory((prev) => {
      const newStack = prev.slice(0, historyPtr + 1);
      newStack.push({ ...newStack[newStack.length - 1], ...updates });
      setHistoryPtr(newStack.length - 1);
      return newStack;
    });
  }, [historyPtr]);

  const undo = () => {
    if (historyPtr > 0) setHistoryPtr(historyPtr - 1);
  };

  const redo = () => {
    if (historyPtr < history.length - 1) setHistoryPtr(historyPtr + 1);
  };

  const reset = () => {
    setHistory([getInitialState()]);
    setHistoryPtr(0);
  };

  const hasUnsavedChanges = historyPtr > 0;

  async function uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json();
    if (json.success && json.url) return json.url;
    throw new Error("Upload failed");
  }

  const handleAvatarUpload = async (file: File) => {
    try {
      const url = await uploadImage(file);
      pushState({ avatar: url });
      return true;
    } catch {
      return false;
    }
  };

  const handleBannerUpload = async (file: File) => {
    try {
      const url = await uploadImage(file);
      pushState({ banner: url });
      return true;
    } catch {
      return false;
    }
  };

  const applyPreset = (p: PresetTheme) => {
    pushState({
      theme: p.theme,
      accentColor: p.accentColor,
      buttonColor: p.buttonColor,
      buttonTextColor: p.buttonTextColor,
      buttonStyle: p.buttonStyle,
      fontFamily: p.fontFamily,
    });
  };

  async function handleSave() {
    setSaving(true);
    const result = await updateProfile({
      ...currentForm,
      id: profile.id, // explicitly inject to satisfy API
    } as any);

    if (result.success) {
      // Re-anchor history
      setHistory([currentForm]);
      setHistoryPtr(0);
      router.refresh();
    }
    setSaving(false);
  }

  return (
    <div className="flex-1 w-full h-[calc(100vh-2rem)] min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_400px] gap-8">
      {/* Left Scrollable pane */}
      <div className="relative hide-scrollbar flex flex-col min-w-0 lg:overflow-y-auto lg:h-full lg:pr-2">
        
        <div className="py-6 px-2 lg:px-4 space-y-6 max-w-4xl w-full mx-auto pb-40">
          
          <div className="mb-4">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-zinc-900">Customization Studio</h1>
            <p className="mt-1 text-sm text-zinc-500">Design your perfect profile appearance.</p>
          </div>

          <DesignSectionCard title="Profile Details" description="Your core identity.">
             {/* Integrated Hero banner/avatar block */}
             <div className="relative mb-10">
               <BannerUploader 
                 value={currentForm.banner} 
                 onChange={(url) => pushState({ banner: url })} 
                 onUpload={handleBannerUpload} 
               />
               <div className="absolute -bottom-10 left-6">
                 <AvatarUploader 
                   value={currentForm.avatar} 
                   fallbackLetter={currentForm.displayName || "U"}
                   onChange={(url) => pushState({ avatar: url })} 
                   onUpload={handleAvatarUpload} 
                 />
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field icon={<User className="size-4" />} label="Display Name">
                  <input type="text" value={currentForm.displayName} onChange={(e) => pushState({ displayName: e.target.value })} className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900" />
                </Field>
                <Field icon={<AtSign className="size-4" />} label="Username">
                  <input type="text" value={currentForm.username} onChange={(e) => pushState({ username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })} className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900" />
                </Field>
                <div className="md:col-span-2">
                  <Field icon={<FileText className="size-4" />} label="Bio">
                    <textarea value={currentForm.bio} onChange={(e) => pushState({ bio: e.target.value })} rows={2} className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-sm outline-none transition focus:border-zinc-900 focus:bg-white focus:ring-1 focus:ring-zinc-900" />
                  </Field>
                </div>
             </div>
          </DesignSectionCard>

          <DesignSectionCard title="Design Presets" description="Instantly apply curated premium aesthetics.">
             <PresetThemes onSelect={applyPreset} />
          </DesignSectionCard>

          <DesignSectionCard title="Theme & Tone" description="Select the core background and lighting style.">
             <ThemeSelector value={currentForm.theme} onChange={(t) => pushState({ theme: t })} />
          </DesignSectionCard>

          <DesignSectionCard title="Colors" description="Personalize the primary accents of your page.">
             {/* <div className="mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 block">Accent Color</label>
                <AccentSelector value={currentForm.accentColor} onChange={(c) => pushState({ accentColor: c })} />
             </div> */}
             
             <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
               <ColorPickerCard label="Button Background" value={currentForm.buttonColor} onChange={(c) => pushState({ buttonColor: c })} />
               <ColorPickerCard label="Button Text" value={currentForm.buttonTextColor} onChange={(c) => pushState({ buttonTextColor: c })} />
             </div>
          </DesignSectionCard>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <DesignSectionCard title="Typography">
               <FontSelector value={currentForm.fontFamily} onChange={(f) => pushState({ fontFamily: f })} />
            </DesignSectionCard>

            <DesignSectionCard title="Button Layout">
               <ButtonStyleSelector value={currentForm.buttonStyle} onChange={(s) => pushState({ buttonStyle: s })} />
            </DesignSectionCard>
          </div>

          <DesignSectionCard title="Visibility" description="Control who can see your profile online.">
            <div className="flex bg-zinc-100 p-1 rounded-2xl w-full max-w-sm">
              <button
                type="button"
                onClick={() => pushState({ isPublic: true })}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${currentForm.isPublic ? "bg-white shadow-sm ring-1 ring-black/5 text-zinc-900" : "text-zinc-500"}`}
              >
                Public
              </button>
              <button
                type="button"
                onClick={() => pushState({ isPublic: false })}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${!currentForm.isPublic ? "bg-white shadow-sm ring-1 ring-black/5 text-zinc-900" : "text-zinc-500"}`}
              >
                Private
              </button>
            </div>
          </DesignSectionCard>

        </div>
        
        <div className="fixed bottom-6 left-137 z-50 pointer-events-none pr-4" style={{ width: "inherit" }}>
          <div className="pointer-events-auto">
            <StickySaveBar 
              hasUnsavedChanges={hasUnsavedChanges}
              saving={saving}
              canUndo={historyPtr > 0}
              canRedo={historyPtr < history.length - 1}
              onUndo={undo}
              onRedo={redo}
              onReset={reset}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>

      {/* Right sticky live phone preview pane */}
      <div className="hidden lg:flex lg:h-full lg:flex-col lg:items-center lg:justify-start lg:overflow-hidden sticky top-8">
        <PhonePreview
          profile={{
            ...profile,
            ...currentForm,
          } as any}
          links={links}
          socials={socials}
        />
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 flex flex-col">
      <div className="flex items-center gap-1.5 px-1">
        <div className="opacity-50">{icon}</div>
        <label className="text-xs font-semibold text-zinc-700">{label}</label>
      </div>
      <div>{children}</div>
    </div>
  );
}
