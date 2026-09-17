"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PRESET_COLORS = [
  "#18181b", // Zinc 900
  "#3b82f6", // Blue
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#f97316", // Orange
  "#f59e0b", // Amber
  "#84cc16", // Lime
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#64748b", // Slate
];

interface AccentSelectorProps {
  value: string;
  onChange: (color: string) => void;
}

export function AccentSelector({ value, onChange }: AccentSelectorProps) {
  const normalizedValue = value?.toLowerCase();
  
  return (
    <div className="flex flex-wrap gap-4">
      {PRESET_COLORS.map((color) => {
        const isSelected = normalizedValue === color;
        return (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`relative flex size-10 items-center justify-center rounded-full shadow-sm transition-all hover:scale-110 active:scale-95 ${
              isSelected ? "ring-2 ring-zinc-900 ring-offset-2 scale-110" : "ring-1 ring-black/10"
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          >
            {isSelected && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <Check className="size-4 text-white drop-shadow-md" />
              </motion.div>
            )}
          </button>
        );
      })}

      {/* Custom Color Input */}
      <div className="relative flex size-10 items-center justify-center rounded-full overflow-hidden shadow-sm ring-1 ring-black/10 transition-all hover:scale-110 focus-within:ring-2 focus-within:ring-zinc-900 focus-within:ring-offset-2">
        <div className="absolute inset-0 bg-[conic-gradient(red,yellow,green,cyan,blue,magenta,red)] opacity-80" />
        <div className="absolute inset-0.5 rounded-full bg-white" />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -inset-2 h-14 w-14 opacity-0 cursor-pointer"
          title="Custom Color"
        />
        <div 
          className="absolute inset-[3px] rounded-full shadow-inner pointer-events-none ring-1 ring-black/5" 
          style={{ backgroundColor: value }}
        />
      </div>
    </div>
  );
}
