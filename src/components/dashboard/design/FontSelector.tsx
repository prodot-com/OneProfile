"use client";

import { FontFamily } from "@prisma/client";

interface FontSelectorProps {
  value: FontFamily;
  onChange: (val: FontFamily) => void;
}

const FONTS: { value: FontFamily; label: string; class: string; desc: string }[] = [
  { value: "INTER", label: "Inter", class: "font-sans", desc: "Clean & Modern" },
  { value: "POPPINS", label: "Poppins", class: "font-serif", desc: "Friendly" },
  { value: "ROBOTO", label: "Roboto", class: "font-sans", desc: "Technical" },
  { value: "MONO", label: "Mono", class: "font-mono", desc: "Developer" },
];

export function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {FONTS.map((font) => {
        const isSelected = value === font.value;
        return (
          <button
            key={font.value}
            type="button"
            onClick={() => onChange(font.value)}
            className={`flex items-center justify-between rounded-[1.25rem] border p-4 text-left transition-all hover:border-zinc-300 ${
              isSelected ? "border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900" : "border-[#e5e2dc] bg-[#fafafa]"
            }`}
          >
            <div>
              <p className={`text-base font-bold text-zinc-900 ${font.class}`}>{font.label}</p>
              <p className="text-[11px] font-medium text-zinc-500 mt-0.5">{font.desc}</p>
            </div>
            <div className={`flex size-10 items-center justify-center rounded-full bg-white text-lg shadow-sm ring-1 ring-black/5 ${font.class}`}>
              Aa
            </div>
          </button>
        );
      })}
    </div>
  );
}
