"use client";

import { ProfileCustomizationState } from "./CustomizeClient";

interface ColorPickersProps {
  config: ProfileCustomizationState;
  onChange: (updates: Partial<ProfileCustomizationState>) => void;
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative size-8 overflow-hidden rounded-lg border border-zinc-200 shadow-sm">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-2 size-12 cursor-pointer opacity-0"
            style={{ width: "200%", height: "200%" }} 
          />
          <div className="pointer-events-none h-full w-full" style={{ backgroundColor: value }} />
        </div>
        <span className="text-sm font-medium text-zinc-700">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-zinc-400">HEX</span>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (v.startsWith("#") && v.length <= 7) onChange(v);
          }}
          className="w-20 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-700 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-colors uppercase"
        />
      </div>
    </div>
  );
}

export default function ColorPickers({ config, onChange }: ColorPickersProps) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-zinc-900 mb-3">Colors</h2>
      <div className="space-y-3">
        <ColorField
          label="Accent Color"
          value={config.accentColor}
          onChange={(v) => onChange({ accentColor: v })}
        />
        <ColorField
          label="Button Background"
          value={config.buttonColor}
          onChange={(v) => onChange({ buttonColor: v })}
        />
        <ColorField
          label="Button Text"
          value={config.buttonTextColor}
          onChange={(v) => onChange({ buttonTextColor: v })}
        />
      </div>
    </section>
  );
}
