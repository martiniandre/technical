import { useQuery } from '@tanstack/react-query';
import { http } from '../helpers/api';

interface HealthData {
  status: string;
  uptime: number;
  timestamp: string;
}

export const ServerStatus = {
  CHECKING: 'checking',
  ONLINE: 'online',
  OFFLINE: 'offline',
} as const;

export type ServerStatus = (typeof ServerStatus)[keyof typeof ServerStatus];

interface UseServerHealthReturn {
  serverStatus: ServerStatus;
  health: HealthData | null | undefined;
}

export function useServerHealth(): UseServerHealthReturn {
  const { data, isLoading, isError } = useQuery<HealthData>({
    queryKey: ['server-health'],
    queryFn: () => http.get<HealthData>('/health'),
    refetchInterval: 10_000,
  });

  const serverStatus: ServerStatus = isLoading
    ? ServerStatus.CHECKING
    : isError
      ? ServerStatus.OFFLINE
      : ServerStatus.ONLINE;

  return { serverStatus, health: data };
}
