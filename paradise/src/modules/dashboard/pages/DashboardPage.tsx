import { Factory, FlaskConical, Layers, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { ServerStatus, useServerHealth } from '../../../shared/hooks/useServerHealth';
import { type UserRoles } from '../../../shared/services/dto/auth';
import { useAuthStore } from '../../../shared/store/useAuthStore';
import { cn } from '@/shared/lib/utils';
import { useRealtimeDashboard } from '../hooks/useRealtimeDashboard';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Badge } from '@/shared/components/ui/badge';
import { DataTableSection } from '../components/DataTableSection';
import { EquipmentChart } from '../components/EquipmentChart';
import { ReliefDeviceChart } from '../components/ReliefDeviceChart';
import { ScenarioCard } from '../components/ScenarioCard';
import { SizingChart } from '../components/SizingChart';


const TabItems = {
  EQUIPMENTS: "Equipment",
  RELIEF_DEVICES: "Relief Devices",
  SIZING_CALCULATION_TYPES: "Sizing Calculations",
  SCENARIOS: "Scenarios",
} as const

type TabOption = typeof TabItems[keyof typeof TabItems]

const statusConfig: Record<ServerStatus, { label: string; dotClass: string; variant: "success" | "warning" | "error" }> = {
  [ServerStatus.CHECKING]: {
    label: 'Checking...',
    dotClass: 'bg-amber-400 animate-pulse',
    variant: 'warning',
  },
  [ServerStatus.ONLINE]: {
    label: 'Server online',
    dotClass: 'bg-emerald-400 animate-pulse',
    variant: 'success',
  },
  [ServerStatus.OFFLINE]: {
    label: 'Server offline',
    dotClass: 'bg-red-400',
    variant: 'error',
  },
};

const summaryStats = (data: ReturnType<typeof useRealtimeDashboard>['data']) => {
  if (!data) return [];
  const totalEquip = data.equipments.reduce((a, e) => a + e.count, 0);
  const totalRelief = data.reliefDevices.reduce((a, r) => a + r.count, 0);
  const totalSizing = data.sizingCalculationTypes.reduce((a, s) => a + s.value, 0);
  const totalScenarios = data.scenarios.reduce((a, s) => a + s.count, 0);
  return [
    { label: TabItems.EQUIPMENTS, value: totalEquip, icon: Factory },
    { label: TabItems.RELIEF_DEVICES, value: totalRelief, icon: ShieldCheck },
    { label: TabItems.SIZING_CALCULATION_TYPES, value: totalSizing, icon: Layers },
    { label: TabItems.SCENARIOS, value: totalScenarios, icon: FlaskConical },
  ];
};

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabOption>(TabItems.EQUIPMENTS);
  const { data, isLoading, lastUpdated, error } = useRealtimeDashboard();
  const { serverStatus, health } = useServerHealth();
  const { user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-sm text-white/40">Loading plant data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
          <p className="text-red-400 font-medium">{error ?? 'Data unavailable'}</p>
        </div>
      </div>
    );
  }

  const status = statusConfig[serverStatus];
  const stats = summaryStats(data);

  function showHealth() {
    const canViewHealth: UserRoles = "administrator"
    if (canViewHealth !== user?.role) return null
    return (
      <>
        {health && (
          <p className="text-muted-sm">
            Uptime: {Math.floor(health.uptime / 60)}m {Math.floor(health.uptime % 60)}s
          </p>
        )}
        {lastUpdated && (
          <p className="text-muted-sm">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{data.plantInfo.name}</h1>
          <p className="mt-0.5 text-sm font-medium text-white/80">{data.plantInfo.description}</p>
          <p className="mt-1 text-muted-sm">
            Author: {data.plantInfo.author} · Created: {new Date(data.plantInfo.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <Badge variant={status.variant} className="gap-2 rounded-full px-3 py-1 text-xs font-semibold">
            <span className={cn('h-2 w-2 rounded-full', status.dotClass)} />
            {status.label}
          </Badge>
          {showHealth()}
        </div>
      </header>

      <section aria-label="Main Statistics" className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="group transition-all hover:bg-theme-comp-1-hover border-none">
            <CardContent>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-theme-primary/20">
                <Icon size={18} className="text-theme-primary" />
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="mt-0.5 text-xs text-white/40">{label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section aria-label="Detailed Analysis" className="flex flex-col">
        <Tabs defaultValue={TabItems.EQUIPMENTS} className="w-full" onValueChange={(v) => setActiveTab(v as TabOption)}>
          <TabsList>
            <TabsTrigger value={TabItems.EQUIPMENTS}>Equipment</TabsTrigger>
            <TabsTrigger value={TabItems.RELIEF_DEVICES}>Relief Devices</TabsTrigger>
            <TabsTrigger value={TabItems.SIZING_CALCULATION_TYPES}>Sizing</TabsTrigger>
            <TabsTrigger value={TabItems.SCENARIOS}>Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 pt-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                {activeTab === TabItems.EQUIPMENTS && <EquipmentChart data={data.equipments} />}
                {activeTab === TabItems.RELIEF_DEVICES && <ReliefDeviceChart data={data.reliefDevices} />}
                {activeTab === TabItems.SIZING_CALCULATION_TYPES && <SizingChart data={data.sizingCalculationTypes} />}
                {activeTab === TabItems.SCENARIOS && <ScenarioCard scenarios={data.scenarios} />}
              </div>
              <div>
                <DataTableSection data={data.equipments} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
