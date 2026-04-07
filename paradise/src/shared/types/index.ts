import type { DashboardDTO } from '../services/dto/dashboard';

type WsMessageEvent = 'initial' | 'update' | 'error' | 'logout';

export interface WsMessage {
  event: WsMessageEvent;
  data?: DashboardDTO;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export interface UserActivityDataPoint {
  day: string;
  activeUsers: number;
  newUsers: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface MetricStat {
  label: string;
  value: string | number;
  change: string | number;
  trend: 'up' | 'down';
}
