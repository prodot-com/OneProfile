"use client";

interface ColorPickerCardProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export function ColorPickerCard({ label, value, onChange }: ColorPickerCardProps) {
  return (
    <div className="flex flex-1 items-center justify-between rounded-[1.25rem] border border-[#e5e2dc] bg-[#fafafa] p-3 transition-colors hover:border-[#d8d5ce]">
      <label className="text-sm font-semibold text-[#1a1a1a] ml-2">{label}</label>
      <div className="relative flex h-8 w-14 items-center justify-center rounded-xl overflow-hidden shadow-sm ring-1 ring-black/10 transition-transform active:scale-95">
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          className="absolute -inset-2 h-12 w-20 cursor-pointer opacity-0" 
        />
        <div className="pointer-events-none h-full w-full" style={{ backgroundColor: value }} />
      </div>
    </div>
  );
}
