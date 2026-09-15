"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DeviceDonutChartProps {
  data: { name: string; value: number }[];
}

const COLORS = ["#f97316", "#c2410c", "#ffedd5", "#1a1a1a", "#6b6b6b"];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-[1.25rem] border border-[#e5e2dc] bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md">
        <p className="text-sm font-semibold text-[#1a1a1a]">{payload[0].name}</p>
        <p className="text-[#c2410c] font-serif font-bold">{payload[0].value} clicks</p>
      </div>
    );
  }
  return null;
};

export default function DeviceDonutChart({ data }: DeviceDonutChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-52 items-center justify-center text-sm text-[#b4b0a4]">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((_, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
              className="drop-shadow-sm transition-all hover:opacity-80 hover:stroke-[#fafafa] hover:stroke-2"
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
          formatter={(value: string) => (
            <span className="text-[#6b6b6b] font-medium">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
