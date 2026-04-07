export interface EquipmentItem {
  type: string;
  count: number;
}

export interface ReliefDeviceItem {
  type: string;
  count: number;
}

export interface SizingCalculationType {
  name: string;
  value: number;
}

export interface ScenarioItem {
  type: string;
  count: number;
}

export interface PlantInfo {
  name: string;
  author: string;
  createdAt: string;
  description: string;
}

export interface MockUser {
  id: number;
  username: string;
  password: string;
  name: string;
  role: string;
}

export interface MockData {
  plantInfo: PlantInfo;
  equipments: EquipmentItem[];
  reliefDevices: ReliefDeviceItem[];
  sizingCalculationTypes: SizingCalculationType[];
  scenarios: ScenarioItem[];
  users: MockUser[];
}

export type DashboardData = Omit<MockData, 'users'>;

export interface JwtPayload {
  id: number;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface WsMessage {
  event: 'initial' | 'update' | 'error';
  data?: DashboardData;
  message?: string;
  timestamp: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
