import { api } from './api';
import type { Sale } from '../types/sale';

export type SalePayload = Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>;

export const salesService = {
  getAll: () => api.get<Sale[]>('/sales'),
  getById: (id: string) => api.get<Sale>(`/sales/${id}`),
  create: (payload: SalePayload) => api.post<Sale>('/sales', payload),
  update: (id: string, payload: Partial<SalePayload>) => api.put<Sale>(`/sales/${id}`, payload),
  remove: (id: string) => api.delete<void>(`/sales/${id}`),
};
