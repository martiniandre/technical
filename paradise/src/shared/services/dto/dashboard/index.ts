export interface PlantInfoDTO {
  name: string;
  author: string;
  createdAt: string;
  description: string;
}

export interface EquipmentItemDTO {
  type: string;
  count: number;
}

export interface ReliefDeviceItemDTO {
  type: string;
  count: number;
}

export interface SizingCalculationTypeDTO {
  name: string;
  value: number;
}

export interface ScenarioItemDTO {
  type: string;
  count: number;
}

export interface DashboardDTO {
  plantInfo: PlantInfoDTO;
  equipments: EquipmentItemDTO[];
  reliefDevices: ReliefDeviceItemDTO[];
  sizingCalculationTypes: SizingCalculationTypeDTO[];
  scenarios: ScenarioItemDTO[];
}
