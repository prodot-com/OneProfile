"use client";

import { useState } from "react";
import { Profile, Link as PrismaLink, SocialLink } from "@prisma/client";
import PhonePreview from "@/components/LinkPage/PhonePreview";
import ThemeSelector from "./ThemeSelector";
import ColorPickers from "./ColorPickers";
import ButtonStyleSelector from "./ButtonStyleSelector";
import FontSelector from "./FontSelector";
import { Save, AlertCircle, Loader2 } from "lucide-react";

export type ProfileCustomizationState = Pick<
  Profile,
  | "theme"
  | "accentColor"
  | "backgroundColor"
  | "buttonStyle"
  | "fontFamily"
  | "buttonColor"
  | "buttonTextColor"
>;

interface CustomizeClientProps {
  profile: Profile;
  links: PrismaLink[];
  socials: SocialLink[];
}

export default function CustomizeClient({ profile, links, socials }: CustomizeClientProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  
  const [config, setConfig] = useState<ProfileCustomizationState>({
    theme: profile.theme,
    accentColor: profile.accentColor,
    backgroundColor: profile.backgroundColor,
    buttonStyle: profile.buttonStyle,
    fontFamily: profile.fontFamily,
    buttonColor: profile.buttonColor,
    buttonTextColor: profile.buttonTextColor,
  });

  const updateConfig = (updates: Partial<ProfileCustomizationState>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
    setSaveStatus("idle");
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/profile/customize", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error("Failed to save");
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 w-full h-full min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:overflow-hidden">
      {/* Left: Editor */}
      <section className="hide-scrollbar py-8 space-y-8 min-w-0 lg:min-h-0 lg:overflow-y-auto lg:h-full lg:pr-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Customize Profile</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Personalize your public page. Changes appear immediately in the preview.
          </p>
        </div>

        <div className="space-y-10">
          <ThemeSelector
            selectedTheme={config.theme}
            onChange={(theme) => updateConfig({ theme })}
          />

          <ColorPickers
            config={config}
            onChange={updateConfig}
          />

          <ButtonStyleSelector
            selected={config.buttonStyle}
            onChange={(buttonStyle) => updateConfig({ buttonStyle })}
            accentColor={config.accentColor}
            buttonColor={config.buttonColor}
            buttonTextColor={config.buttonTextColor}
          />

          <FontSelector
            selected={config.fontFamily}
            onChange={(fontFamily) => updateConfig({ fontFamily })}
          />
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 mt-8 flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-lg backdrop-blur-md">
          <div className="text-sm font-medium">
            {saveStatus === "success" && <span className="text-emerald-500 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Changes saved</span>}
            {saveStatus === "error" && <span className="text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Error saving</span>}
            {saveStatus === "idle" && <span className="text-zinc-500">Unsaved changes will be lost</span>}
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving || saveStatus === "success"}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </section>

      {/* Right: Phone Preview */}
      <div className="hidden lg:flex lg:h-full lg:flex-col lg:items-center lg:justify-start lg:overflow-hidden">
        <PhonePreview
          profile={{ ...profile, ...config }}
          links={links}
          socials={socials}
        />
      </div>
    </div>
  );
}
