"use client";

import { Theme } from "@prisma/client";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const THEMES: { value: Theme; label: string; previewClass: string }[] = [
  { value: "DEFAULT", label: "Default", previewClass: "bg-[#18181B]" },
  { value: "DARK", label: "Dark", previewClass: "bg-[#0a0a0a]" },
  { value: "LIGHT", label: "Light", previewClass: "bg-[#f4f4f5]" },
  { value: "MINIMAL", label: "Minimal", previewClass: "bg-white border border-gray-200" },
  { value: "GLASS", label: "Glass", previewClass: "bg-gradient-to-br from-blue-400/20 to-pink-400/20 backdrop-blur-md" },
  { value: "GRADIENT", label: "Gradient", previewClass: "bg-gradient-to-tr from-orange-400 to-rose-500" },
];

interface ThemeSelectorProps {
  value: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {THEMES.map((t) => {
        const isSelected = value === t.value;
        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className="group relative flex flex-col gap-2 rounded-[1.25rem] border border-transparent p-1 transition-all outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            {/* Visual Preview Box */}
            <div
              className={`relative h-20 w-full overflow-hidden rounded-[1rem] shadow-sm transition-all duration-300 group-hover:scale-[0.98] ${
                isSelected ? "ring-2 ring-zinc-900 ring-offset-2" : "ring-1 ring-black/5"
              } ${t.previewClass}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-50">
                <div className="h-1.5 w-1/3 rounded-full bg-current mix-blend-overlay" />
                <div className="h-1.5 w-1/4 rounded-full bg-current mix-blend-overlay" />
              </div>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-zinc-900 shadow-md"
                >
                  <Check className="size-3 text-white" />
                </motion.div>
              )}
            </div>
            
            <span
              className={`text-center text-xs font-semibold mx-auto transition-colors ${
                isSelected ? "text-zinc-900" : "text-zinc-500 group-hover:text-zinc-900"
              }`}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
