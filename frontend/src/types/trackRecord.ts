import type { Agency } from './agency';

export type TrackRecordStatus = 'NEW' | 'CONTACTED' | 'POTENTIAL' | 'CLOSED' | 'LOST';

export interface TrackRecord {
  agency?: Agency;
  agencyId: number;
  createdAt: string;
  customerName: string;
  expectedRevenue: number;
  id: number;
  note?: string | null;
  status: TrackRecordStatus;
  updatedAt: string;
}
