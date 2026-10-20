"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { compactRupiah } from "@/lib/format";

export const chartColors = ["#19285e", "#b08d57", "#0f695c", "#34509f", "#dcc497", "#57370d"];

export function RevenueChart({ data }: { data: { month: string; revenue: number; patients: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b08d57" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#b08d57" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8a8f9c" }} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={70}
          tick={{ fontSize: 12, fill: "#8a8f9c" }}
          tickFormatter={(v: number) => compactRupiah(v)}
        />
        <Tooltip
          formatter={(v) => [compactRupiah(Number(v)), "Revenue"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }}
        />
        <Area type="monotone" dataKey="revenue" stroke="#8c6d3a" strokeWidth={2.5} fill="url(#rev)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ServiceMixChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
          {data.map((_, i) => (
            <Cell key={i} fill={chartColors[i % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function HorizontalBarChart({ data, dataKey, nameKey }: { data: object[]; dataKey: string; nameKey: string }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, data.length * 34)}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eef0f4" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis type="category" dataKey={nameKey} width={170} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#4b5060" }} />
        <Tooltip
          formatter={(v) => [compactRupiah(Number(v)), "Revenue"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #eee", fontSize: 12 }}
          cursor={{ fill: "#f4ecdc66" }}
        />
        <Bar dataKey={dataKey} radius={[0, 8, 8, 0]} barSize={16}>
          {data.map((_, i) => (
            <Cell key={i} fill={i === 0 ? "#b08d57" : "#19285e"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
