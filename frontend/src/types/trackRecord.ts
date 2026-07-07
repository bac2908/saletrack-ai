export type TrackRecordStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface TrackRecord {
  id: string;
  title: string;
  status: TrackRecordStatus;
  notes?: string;
  agencyId?: string;
  createdAt: string;
  updatedAt: string;
}
