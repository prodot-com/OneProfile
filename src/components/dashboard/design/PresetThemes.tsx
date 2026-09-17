"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface PresetTheme {
  name: string;
  theme: any; 
  accentColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonStyle: any;
  fontFamily: any;
}

const PRESETS: PresetTheme[] = [
  {
    name: "Minimal",
    theme: "MINIMAL",
    accentColor: "#18181b",
    buttonColor: "#18181b",
    buttonTextColor: "#ffffff",
    buttonStyle: "ROUNDED",
    fontFamily: "INTER",
  },
  {
    name: "Creator",
    theme: "DARK",
    accentColor: "#f97316",
    buttonColor: "#f97316",
    buttonTextColor: "#ffffff",
    buttonStyle: "PILL",
    fontFamily: "POPPINS",
  },
  {
    name: "Developer",
    theme: "DARK",
    accentColor: "#8b5cf6",
    buttonColor: "#18181b",
    buttonTextColor: "#8b5cf6",
    buttonStyle: "SQUARE",
    fontFamily: "MONO",
  },
  {
    name: "Glass",
    theme: "GLASS",
    accentColor: "#ec4899",
    buttonColor: "#ffffff",
    buttonTextColor: "#000000",
    buttonStyle: "PILL",
    fontFamily: "INTER",
  },
  {
    name: "Cyber",
    theme: "DARK",
    accentColor: "#06b6d4",
    buttonColor: "#000000",
    buttonTextColor: "#06b6d4",
    buttonStyle: "SQUARE",
    fontFamily: "MONO",
  },
];

interface PresetThemesProps {
  onSelect: (preset: PresetTheme) => void;
}

export function PresetThemes({ onSelect }: PresetThemesProps) {
  return (
    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 pt-1 px-1">
      {PRESETS.map((p) => (
        <button
          key={p.name}
          onClick={() => onSelect(p)}
          className="group relative flex w-[120px] shrink-0 flex-col gap-3 rounded-[1.25rem] border border-black/5 bg-white p-3 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-95"
        >
          {/* Preset Visual Identity block */}
          <div 
            className="flex h-16 w-full flex-col justify-end overflow-hidden rounded-[0.75rem] p-2 ring-1 ring-black/5 transition-transform"
            style={{ 
              backgroundColor: p.theme === "DARK" ? "#0a0a0a" : p.theme === "GLASS" ? "#f3f4f6" : "#fafafa",
            }}
          >
           {/* Mock Button */}
           <div 
             className="h-4 w-full"
             style={{ 
               backgroundColor: p.buttonColor, 
               borderRadius: p.buttonStyle === "PILL" ? "99px" : p.buttonStyle === "ROUNDED" ? "6px" : "0px" 
             }}
           />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full shadow-inner" style={{ backgroundColor: p.accentColor }} />
            <span className="text-xs font-semibold text-zinc-700 font-sans">{p.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
