import type { ScenarioItemDTO } from '../../../shared/services/dto/dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';

interface ScenarioCardProps {
  scenarios: ScenarioItemDTO[];
}

export function ScenarioCard({ scenarios }: ScenarioCardProps) {
  const total = scenarios.reduce((acc, scenario) => acc + scenario.count, 0);

  return (
    <Card aria-label="Scenario Metrics" className="border-none shadow-black/10">
      <CardHeader className="pb-4">
        <CardTitle>Scenarios</CardTitle>
        <CardDescription>Total: {total}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col gap-4">
        {scenarios.map((scenario, index) => {
          const pct = total > 0 ? Math.round((scenario.count / total) * 100) : 0;
          const color = index === 0 ? 'from-theme-primary to-theme-dynamic' : 'from-theme-comp-3 to-white/30';
          return (
            <div key={scenario.type}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium text-white/70">{scenario.type}</span>
                <span className="font-bold text-white">{scenario.count} <span className="font-normal text-white/30">({pct}%)</span></span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/8 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
