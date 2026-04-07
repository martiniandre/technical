import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import type { RevenueDataPoint } from '../../../shared/types';

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0f0f2a]/90 p-3 shadow-xl backdrop-blur-sm text-xs">
        <p className="mb-2 font-semibold text-white/70">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-white/50">{entry.name === 'revenue' ? 'Revenue' : 'Expenses'}:</span>
            <span className="font-bold text-white">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card aria-label="Revenue Analysis" className="border-none shadow-black/10">
      <CardHeader className="pb-6">
        <CardTitle>Revenue Analysis</CardTitle>
        <CardDescription>Billing trend over time</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
            <Legend
              formatter={(value) => (
                <span className="text-xs text-white/50">
                  {value === 'revenue' ? 'Revenue' : 'Expenses'}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              strokeWidth={2.5}
              fill="url(#gradRevenue)"
              dot={false}
              activeDot={{ r: 5, fill: '#7c3aed', stroke: '#0f0f2a', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#gradExpenses)"
              dot={false}
              activeDot={{ r: 5, fill: '#6366f1', stroke: '#0f0f2a', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
