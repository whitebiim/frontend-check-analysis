export interface Metric {
  id: string;
  title: string;
  value: number;
  change: number;
  currency?: string;
  updatedAt: string;
}

export interface DailyStats {
  lastUpdated: string;
  timezone: string;
  metrics: Metric[];
}