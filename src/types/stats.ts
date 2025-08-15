export interface DailyStatsData {
    updated: string;
    data: {
      revenue: number;
      avg_receipt: number;
      receipts_count: number;
      customers: number;
      changes: {
        revenue: number;
        avg_receipt: number;
        receipts_count: number;
        customers: number;
      };
    };
  }
  
  export interface MetricItem {
    id: string;
    title: string;
    value: number;
    change: number;
    icon: string;
    currency?: string;
  }

  