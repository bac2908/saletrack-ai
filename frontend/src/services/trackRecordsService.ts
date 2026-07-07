import { api } from './api';
import type { TrackRecord } from '../types/trackRecord';
import type { ListParams, PaginatedResult } from '../types/api';

export type TrackRecordPayload = Pick<
  TrackRecord,
  'agencyId' | 'customerName' | 'expectedRevenue' | 'note' | 'status'
>;

export const trackRecordsService = {
  getAll: (params?: ListParams) => api.get<PaginatedResult<TrackRecord>>('/track-records', params),
  getById: (id: number) => api.get<TrackRecord>(`/track-records/${id}`),
  create: (payload: TrackRecordPayload) => api.post<TrackRecord>('/track-records', payload),
  update: (id: number, payload: Partial<TrackRecordPayload>) =>
    api.put<TrackRecord>(`/track-records/${id}`, payload),
  remove: (id: number) => api.delete<TrackRecord>(`/track-records/${id}`),
};
