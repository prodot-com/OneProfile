"use client";

import { FontFamily } from "@prisma/client";
import { Check } from "lucide-react";
import { getFontClass } from "@/lib/fonts";

interface FontSelectorProps {
  selected: FontFamily;
  onChange: (font: FontFamily) => void;
}

const FONTS: { id: FontFamily; label: string }[] = [
  { id: "INTER", label: "Inter (Default)" },
  { id: "POPPINS", label: "Poppins" },
  { id: "ROBOTO", label: "Roboto" },
  { id: "MONO", label: "Monospace" },
];

export default function FontSelector({ selected, onChange }: FontSelectorProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-zinc-900 mb-3">Typography Selection</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FONTS.map((font) => {
          const isSelected = selected === font.id;
          const fontClassName = getFontClass(font.id);
          
          return (
            <button
              key={font.id}
              onClick={() => onChange(font.id)}
              className={`relative flex h-16 items-center justify-center rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-zinc-900 ring-2 ring-zinc-900/10 bg-zinc-50"
                  : "border-transparent bg-white shadow-sm hover:border-zinc-200"
              }`}
            >
              {isSelected && (
                <div className="absolute right-1.5 top-1.5 rounded-full bg-zinc-900 p-0.5 text-white">
                  <Check className="size-2.5" />
                </div>
              )}
              <span className={`text-sm ${fontClassName}`}>
                {font.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
