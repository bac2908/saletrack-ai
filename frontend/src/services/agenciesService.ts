import { api } from './api';
import type { Agency } from '../types/agency';
import type { ListParams, PaginatedResult } from '../types/api';

export type AgencyPayload = Pick<Agency, 'address' | 'area' | 'name' | 'saleId'>;

export const agenciesService = {
  getAll: (params?: ListParams) => api.get<PaginatedResult<Agency>>('/agencies', params),
  getById: (id: number) => api.get<Agency>(`/agencies/${id}`),
  create: (payload: AgencyPayload) => api.post<Agency>('/agencies', payload),
  update: (id: number, payload: Partial<AgencyPayload>) => api.put<Agency>(`/agencies/${id}`, payload),
  remove: (id: number) => api.delete<Agency>(`/agencies/${id}`),
};
