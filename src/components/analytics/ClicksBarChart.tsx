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
      <div className="rounded-xl border border-white/10 bg-zinc-900/90 px-4 py-3 shadow-xl backdrop-blur">
        <p className="mb-1 text-xs text-zinc-400">{label}</p>
        <p className="text-lg font-bold text-violet-400">
          {payload[0].value}{" "}
          <span className="text-sm font-normal text-zinc-300">clicks</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ClicksBarChart({ data }: ClicksBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center text-sm text-zinc-500">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f4f4f5"
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f4f4f5", opacity: 0.5 }} />
        <Bar dataKey="clicks" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}
