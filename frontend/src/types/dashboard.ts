export type TrackStatus = 'NEW' | 'CONTACTED' | 'POTENTIAL' | 'CLOSED' | 'LOST';

export interface TrackStatusSummary {
  status: string;
  count: number;
}

export interface RevenuePoint {
  label: string;
  value: number;
}

export interface DashboardStats {
  activeSalesCount: number;
  totalAgencies: number;
  totalTrackRecords: number;
  totalExpectedRevenue: number;
  trackRecordsByStatus: Record<TrackStatus, number>;
}
