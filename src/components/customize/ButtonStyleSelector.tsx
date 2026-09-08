"use client";

import { ButtonStyle } from "@prisma/client";
import { Check } from "lucide-react";

interface ButtonStyleSelectorProps {
  selected: ButtonStyle;
  onChange: (style: ButtonStyle) => void;
  accentColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

export default function ButtonStyleSelector({
  selected,
  onChange,
  accentColor,
  buttonColor,
  buttonTextColor,
}: ButtonStyleSelectorProps) {
  
  const styles: { id: ButtonStyle; label: string; borderRadius: string }[] = [
    { id: "ROUNDED", label: "Rounded", borderRadius: "8px" }, // Tailwind rounded-lg
    { id: "PILL", label: "Pill", borderRadius: "9999px" }, // Tailwind rounded-full
    { id: "SQUARE", label: "Square", borderRadius: "0px" }, // Tailwind rounded-none
  ];

  return (
    <section>
      <h2 className="text-sm font-semibold text-zinc-900 mb-3">Button Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {styles.map((style) => {
          const isSelected = selected === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onChange(style.id)}
              className={`relative flex items-center justify-center h-20 rounded-xl border-2 transition-all overflow-hidden ${
                isSelected
                  ? "border-zinc-900 ring-2 ring-zinc-900/10 bg-zinc-50"
                  : "border-transparent bg-white shadow-sm hover:border-zinc-200"
              }`}
            >
              {isSelected && (
                <div className="absolute right-2 top-2 rounded-full bg-zinc-900 p-0.5 text-white z-10">
                  <Check className="size-3" />
                </div>
              )}
              
              <div 
                className="w-3/4 py-2 px-4 shadow-sm border border-black/5 flex items-center justify-center transition-all"
                style={{ 
                  borderRadius: style.borderRadius,
                  backgroundColor: buttonColor,
                  color: buttonTextColor
                }}
              >
                <span className="text-[10px] font-medium tracking-wide">
                  {style.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
