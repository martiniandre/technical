import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import type { EquipmentItemDTO } from '../../../shared/services/dto/dashboard';

interface EquipmentChartProps {
  data: EquipmentItemDTO[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-white/20 bg-theme-comp-1 p-3 text-xs shadow-lg backdrop-blur-md">
        <p className="mb-1 font-semibold text-white/90">{label}</p>
        <p className="font-bold text-theme-primary-hover">
          Qtd: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
}

export function EquipmentChart({ data }: EquipmentChartProps) {
  return (
    <Card aria-label="Equipment Chart" className="border-none shadow-black/10">
      <CardHeader className="pb-2">
        <CardTitle>Equipments</CardTitle>
        <CardDescription>Count by type</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={310}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="type"
              width={130}
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={18} fill="var(--color-theme-primary)">
              {data.map((_, index) => (
                <Cell key={index} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
