"use client";

import { Theme } from "@prisma/client";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  selectedTheme: Theme;
  onChange: (theme: Theme) => void;
}

const THEMES: { id: Theme; label: string; previewClass: string }[] = [
  { id: "DEFAULT", label: "Default", previewClass: "bg-zinc-50 border-zinc-200" },
  { id: "LIGHT", label: "Light", previewClass: "bg-white border-zinc-200" },
  { id: "DARK", label: "Dark", previewClass: "bg-zinc-900 border-zinc-800" },
  { id: "MINIMAL", label: "Minimal", previewClass: "bg-transparent border-dashed border-zinc-300" },
  { id: "GLASS", label: "Glass", previewClass: "bg-emerald-50 border-emerald-200" }, // Simple approximation
  { id: "GRADIENT", label: "Gradient", previewClass: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-transparent" },
];

export default function ThemeSelector({ selectedTheme, onChange }: ThemeSelectorProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-zinc-900 mb-3">Theme Variant</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {THEMES.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onChange(theme.id)}
              className={`relative flex flex-col items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                isSelected
                  ? "border-zinc-900 ring-2 ring-zinc-900/10"
                  : "border-transparent bg-white shadow-sm hover:border-zinc-200 hover:shadow"
              }`}
            >
              {isSelected && (
                <div className="absolute right-2 top-2 rounded-full bg-zinc-900 p-0.5 text-white">
                  <Check className="size-3" />
                </div>
              )}
              <div className={`h-12 w-full rounded-lg border shadow-sm ${theme.previewClass}`} />
              <span className="text-xs font-medium text-zinc-700">{theme.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
