import type { MetricStat } from '../../../shared/types';
import { cn } from '@/shared/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  stat: MetricStat;
}

export function StatCard({ stat }: StatCardProps) {
  const isUp = stat.trend === 'up';

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/8">
      <div
        className={cn(
          'absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-80',
          isUp ? 'bg-emerald-500/10' : 'bg-red-500/10',
        )}
      />

      <p className="text-sm font-medium text-white/50">{stat.label}</p>

      <p className="mt-3 text-3xl font-bold tracking-tight text-white">{stat.value}</p>

      <div
        className={cn(
          'mt-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
          isUp
            ? 'bg-emerald-500/15 text-emerald-400'
            : 'bg-red-500/15 text-red-400',
        )}
      >
        {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {isUp ? '+' : ''}{stat.change}%
        <span className="font-normal text-white/30 ml-1">vs last month</span>
      </div>
    </div>
  );
}
