import { api } from './api';
import type { Agency } from '../types/agency';

export type AgencyPayload = Pick<Agency, 'address' | 'area' | 'name' | 'saleId'>;

export const agenciesService = {
  getAll: () => api.get<Agency[]>('/agencies'),
  create: (payload: AgencyPayload) => api.post<Agency>('/agencies', payload),
};
