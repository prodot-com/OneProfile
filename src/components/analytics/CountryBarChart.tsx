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
      <div className="rounded-[1.25rem] border border-[#e5e2dc] bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
        <p className="mb-1 text-xs font-semibold text-[#6b6b6b]">{label}</p>
        <p className="text-lg font-bold font-serif text-[#c2410c]">
          {payload[0].value}{" "}
          <span className="text-sm font-normal text-[#1a1a1a]">visits</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function CountryBarChart({ data }: CountryBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center text-sm font-medium text-[#b4b0a4]">
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
            <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#ea580c" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#f0f0f0"
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
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#fafafa", opacity: 0.8 }} />
        <Bar
          dataKey="value"
          fill="url(#countryGradient)"
          radius={[0, 8, 8, 0]}
          barSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
