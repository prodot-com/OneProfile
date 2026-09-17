"use client";

import { ButtonStyle } from "@prisma/client";
import { Check } from "lucide-react";

interface ButtonStyleSelectorProps {
  value: ButtonStyle;
  onChange: (val: ButtonStyle) => void;
}

export function ButtonStyleSelector({ value, onChange }: ButtonStyleSelectorProps) {
  const styles: { value: ButtonStyle; label: string; roundedClass: string }[] = [
    { value: "SQUARE", label: "Square", roundedClass: "rounded-none" },
    { value: "ROUNDED", label: "Rounded", roundedClass: "rounded-2xl" },
    { value: "PILL", label: "Pill", roundedClass: "rounded-full" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {styles.map((s) => {
        const isSelected = value === s.value;
        return (
          <button
            key={s.value}
            type="button"
            onClick={() => onChange(s.value)}
            className="group flex flex-col items-center gap-3 outline-none"
          >
            <div
              className={`flex h-14 w-full items-center justify-center bg-zinc-900 transition-all group-hover:bg-zinc-800 ${
                s.roundedClass
              } ${isSelected ? "ring-2 ring-zinc-900 ring-offset-2" : "opacity-80 ring-1 ring-black/5"}`}
            >
              {isSelected && <Check className="size-4 text-white" />}
            </div>
            <span className={`text-xs font-semibold ${isSelected ? "text-zinc-900" : "text-zinc-500 group-hover:text-zinc-900"}`}>
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
