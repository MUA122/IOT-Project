export type SensorStatus = "safe" | "warning" | "danger";

export interface SensorReading {
  id: string;
  label: string;
  value: number;
  unit: string;
  status: SensorStatus;
  updatedAt: string;
}

export interface DashboardStats {
  systemStatus: SensorStatus;
  alertsToday: number;
  incidentsThisWeek: number;
  uptimePercentage: number;
}
