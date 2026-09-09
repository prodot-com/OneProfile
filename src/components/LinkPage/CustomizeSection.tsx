"use client";

import { useState } from "react";
import { Theme, ButtonStyle, FontFamily } from "@prisma/client";
import { updateCustomization } from "@/services/clientProfileCustomization";
import { Loader2, Check } from "lucide-react";

export interface CustomizationState {
  theme: Theme;
  accentColor: string;
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonStyle: ButtonStyle;
  fontFamily: FontFamily;
}

interface CustomizeSectionProps {
  customization: CustomizationState;
  onChange: (updates: Partial<CustomizationState>) => void;
  onSave: () => void;
}

export default function CustomizeSection({
  customization,
  onChange,
  onSave,
}: CustomizeSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateCustomization(customization);
      onSave(); // Optional callback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to save customization");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden mt-8 mb-8">
      <div className="border-b border-zinc-200/80 bg-zinc-50/50 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">Customize Profile</h2>
          <p className="text-sm text-zinc-500">
            Personalize your public page appearance
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : showSuccess ? (
            <Check className="size-4 text-green-400" />
          ) : null}
          {isSaving ? "Saving..." : showSuccess ? "Saved!" : "Save"}
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Theme & Font Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Theme
            </label>
            <select
              value={customization.theme}
              onChange={(e) => onChange({ theme: e.target.value as Theme })}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm outline-none transition-all focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
            >
              <option value="DEFAULT">Default</option>
              <option value="DARK">Dark</option>
              <option value="LIGHT">Light</option>
              <option value="MINIMAL">Minimal</option>
              <option value="GLASS">Glass</option>
              <option value="GRADIENT">Gradient</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Font Family
            </label>
            <select
              value={customization.fontFamily}
              onChange={(e) =>
                onChange({ fontFamily: e.target.value as FontFamily })
              }
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm outline-none transition-all focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
            >
              <option value="INTER">Inter</option>
              <option value="POPPINS">Poppins</option>
              <option value="ROBOTO">Roboto</option>
              <option value="MONO">Mono</option>
            </select>
          </div>
        </div>

        {/* Buttons Style */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Button Style
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["ROUNDED", "PILL", "SQUARE"] as ButtonStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => onChange({ buttonStyle: style })}
                className={`py-2 px-3 border transition-colors ${
                  customization.buttonStyle === style
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                } ${
                  style === "ROUNDED"
                    ? "rounded-xl"
                    : style === "PILL"
                    ? "rounded-full"
                    : "rounded-none"
                }`}
              >
                <span className="text-xs font-semibold">{style}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Background Color"
            value={customization.backgroundColor}
            onChange={(val) => onChange({ backgroundColor: val })}
          />
          <ColorPicker
            label="Accent Color"
            value={customization.accentColor}
            onChange={(val) => onChange({ accentColor: val })}
          />
          <ColorPicker
            label="Button Color"
            value={customization.buttonColor}
            onChange={(val) => onChange({ buttonColor: val })}
          />
          <ColorPicker
            label="Button Text Color"
            value={customization.buttonTextColor}
            onChange={(val) => onChange({ buttonTextColor: val })}
          />
        </div>
      </div>
    </div>
  );
}

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="size-10 cursor-pointer rounded-lg border-2 border-zinc-200 p-0.5 outline-none bg-white transition-all focus:border-zinc-400"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full flex-1 rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm uppercase outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/5"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
