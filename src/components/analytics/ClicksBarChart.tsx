"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ClicksBarChartProps {
  data: { name: string; clicks: number }[];
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-[1.25rem] border border-[#e5e2dc] bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
        <p className="mb-1 text-xs font-semibold text-[#6b6b6b]">{label}</p>
        <p className="text-lg font-serif font-bold text-[#c2410c]">
          {payload[0].value}{" "}
          <span className="text-sm font-normal text-[#1a1a1a]">clicks</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ClicksBarChart({ data }: ClicksBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center text-sm font-medium text-[#b4b0a4]">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity={1} />
            <stop offset="100%" stopColor="#ea580c" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0f0f0"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: "#71717a", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: string) =>
            v.length > 10 ? v.slice(0, 10) + "…" : v
          }
        />
        <YAxis
          tick={{ fill: "#71717a", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fafafa", opacity: 0.8 }} />
        <Bar dataKey="clicks" fill="url(#barGradient)" radius={[8, 8, 0, 0]} barSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}
