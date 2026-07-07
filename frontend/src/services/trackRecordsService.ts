import { api } from './api';
import type { TrackRecord } from '../types/trackRecord';

export type TrackRecordPayload = Omit<TrackRecord, 'id' | 'createdAt' | 'updatedAt'>;

export const trackRecordsService = {
  getAll: () => api.get<TrackRecord[]>('/track-records'),
  getById: (id: string) => api.get<TrackRecord>(`/track-records/${id}`),
  create: (payload: TrackRecordPayload) => api.post<TrackRecord>('/track-records', payload),
  update: (id: string, payload: Partial<TrackRecordPayload>) =>
    api.put<TrackRecord>(`/track-records/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/track-records/${id}`),
};
