import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import type { SizingCalculationTypeDTO } from '../../../shared/services/dto/dashboard';

interface SizingChartProps {
  data: SizingCalculationTypeDTO[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-white/20 bg-theme-comp-1 p-3 text-xs shadow-lg backdrop-blur-md">
        <p className="font-semibold text-white/90">{payload[0].payload.name}</p>
        <p className="mt-1 font-bold text-theme-dynamic-alt">
          Value: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function SizingChart({ data }: SizingChartProps) {
  return (
    <Card aria-label="Sizing Chart" className="border-none shadow-black/10">
      <CardHeader className="pb-6">
        <CardTitle>Sizing</CardTitle>
        <CardDescription>Calculation types</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 500 }}
            />
            <Radar
              name="Value"
              dataKey="value"
              stroke="var(--color-theme-primary)"
              strokeWidth={3}
              fill="var(--color-theme-primary)"
              fillOpacity={0.4}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
