import { useCallback, useEffect, useState } from 'react';
import { salesService } from '../services/salesService';
import type { ListParams, PaginationMeta } from '../types/api';
import type { Sale } from '../types/sale';

const emptyPagination: PaginationMeta = {
  hasNextPage: false,
  hasPreviousPage: false,
  limit: 10,
  page: 1,
  total: 0,
  totalPages: 1,
};

export function useSales(params: ListParams = {}) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(emptyPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await salesService.getAll(params);
      setSales(result.items);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không tải được danh sách Sale');
    } finally {
      setLoading(false);
    }
  }, [params.limit, params.page, params.search]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { error, loading, pagination, refetch, sales };
}
