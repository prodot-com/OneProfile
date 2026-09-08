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

interface CountryBarChartProps {
  data: { name: string; value: number }[];
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
        <p className="text-lg font-bold text-cyan-400">
          {payload[0].value}{" "}
          <span className="text-sm font-normal text-zinc-300">visits</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function CountryBarChart({ data }: CountryBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center text-sm text-zinc-500">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
      >
        <defs>
          <linearGradient id="countryGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f4f4f5"
          horizontal={false}
        />
        <XAxis
          type="number"
          tick={{ fill: "#71717a", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={90}
          tick={{ fill: "#a1a1aa", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f4f4f5", opacity: 0.5 }} />
        <Bar
          dataKey="value"
          fill="url(#countryGradient)"
          radius={[0, 6, 6, 0]}
          barSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
