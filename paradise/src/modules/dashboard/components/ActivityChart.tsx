import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { UserActivityDataPoint } from '../../../shared/types';

interface ActivityChartProps {
  data: UserActivityDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-theme-comp-1 p-3 shadow-xl backdrop-blur-sm text-xs">
        <p className="mb-2 font-semibold text-white/70">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: entry.fill }} />
            <span className="text-white/50">
              {entry.name === 'activeUsers' ? 'Active Users' : 'New Users'}:
            </span>
            <span className="font-bold text-white">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <section aria-label="User Activity" className="rounded-2xl border border-theme-comp-5 bg-theme-comp-1 p-6 shadow-lg">
      <header className="mb-6">
        <h2 className="text-base font-semibold text-white">User Activity</h2>
        <p className="text-sm text-white/70">Active and new users by day of the week</p>
      </header>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Legend
            formatter={(value) => (
              <span className="text-xs text-white/70">
                {value === 'activeUsers' ? 'Active Users' : 'New Users'}
              </span>
            )}
          />
          <Bar
            dataKey="activeUsers"
            fill="var(--color-theme-primary)"
            radius={[6, 6, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="newUsers"
            fill="var(--color-theme-dynamic)"
            radius={[6, 6, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
