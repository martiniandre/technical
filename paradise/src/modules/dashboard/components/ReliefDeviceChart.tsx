import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import type { ReliefDeviceItemDTO } from '../../../shared/services/dto/dashboard';

interface ReliefDeviceChartProps {
  data: ReliefDeviceItemDTO[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-white/20 bg-theme-comp-1 p-3 text-xs shadow-lg backdrop-blur-md">
        <p className="font-semibold text-white/90">{payload[0].name}</p>
        <p className="mt-1 font-bold text-theme-dynamic-hover">
          Count: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function ReliefDeviceChart({ data }: ReliefDeviceChartProps) {
  return (
    <Card aria-label="Relief Device Chart" className="border-none shadow-black/10">
      <CardHeader className="pb-2">
        <CardTitle>Relief Devices</CardTitle>
        <CardDescription>Count by severity</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={310}>
          <PieChart margin={{
            top: 40,
            left: 0,
            right: 0,
            bottom: 10
          }}>
            <Pie
              data={data}
              dataKey="count"
              nameKey="type"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={`cell-${i}`} fill={['var(--color-theme-primary)', 'var(--color-theme-dynamic)', 'var(--color-theme-primary-hover)', 'var(--color-theme-dynamic-hover)', 'var(--color-theme-primary-active)', 'var(--color-theme-dynamic-active)'][i % 6]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              startOffset={40}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-white/60 font-medium">{value}</span>
              )}
              align='left'
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
