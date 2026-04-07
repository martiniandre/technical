import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dashboardResource } from '../../../shared/services/resources/dashboard';
import { wsService } from '../../../shared/services/websocketService';
import type { DashboardDTO } from '../../../shared/services/dto/dashboard';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseRealtimeDashboardReturn {
  data: DashboardDTO | undefined;
  isLoading: boolean;
  connectionStatus: ConnectionStatus;
  lastUpdated: Date | null;
  error: string | null;
}

export const DASHBOARD_QUERY_KEY = ['dashboard'] as const;

export function useRealtimeDashboard(): UseRealtimeDashboardReturn {
  const queryClient = useQueryClient();
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery<DashboardDTO>({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: () => dashboardResource.getSnapshot(),
    staleTime: Infinity,
  });

  useEffect(() => {
    const offConnect = wsService.on('connect', () => setConnectionStatus('connected'));
    const offDisconnect = wsService.on('disconnect', () => setConnectionStatus('disconnected'));
    const offError = wsService.on('error', () => setConnectionStatus('error'));
    const offUpdate = wsService.on<DashboardDTO>('dashboard:update', (updated) => {
      queryClient.setQueryData<DashboardDTO>(DASHBOARD_QUERY_KEY, updated);
      setLastUpdated(new Date());
    });

    return () => {
      offConnect();
      offDisconnect();
      offError();
      offUpdate();
      wsService.disconnect();
    };
  }, [queryClient]);

  useEffect(() => {
    if (isSuccess) wsService.connect();
  }, [isSuccess]);

  return {
    data,
    isLoading,
    connectionStatus,
    lastUpdated,
    error: isError ? 'Erro ao carregar dados do servidor' : null,
  };
}

