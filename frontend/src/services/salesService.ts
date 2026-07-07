import { api } from './api';
import type { Sale } from '../types/sale';
import type { ListParams, PaginatedResult } from '../types/api';

export type SalePayload = Pick<Sale, 'email' | 'name' | 'phone' | 'status'>;

export const salesService = {
  getAll: (params?: ListParams) => api.get<PaginatedResult<Sale>>('/sales', params),
  getById: (id: number) => api.get<Sale>(`/sales/${id}`),
  create: (payload: SalePayload) => api.post<Sale>('/sales', payload),
  update: (id: number, payload: Partial<SalePayload>) => api.put<Sale>(`/sales/${id}`, payload),
  remove: (id: number) => api.delete<Sale>(`/sales/${id}`),
};
