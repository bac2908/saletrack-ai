import { useCallback, useEffect, useState } from 'react';
import { agenciesService } from '../services/agenciesService';
import type { ListParams, PaginationMeta } from '../types/api';
import type { Agency } from '../types/agency';

const emptyPagination: PaginationMeta = {
  hasNextPage: false,
  hasPreviousPage: false,
  limit: 10,
  page: 1,
  total: 0,
  totalPages: 1,
};

export function useAgencies(params: ListParams = {}) {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(emptyPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await agenciesService.getAll(params);
      setAgencies(result.items);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load agencies');
    } finally {
      setLoading(false);
    }
  }, [params.limit, params.page, params.search]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { agencies, error, loading, pagination, refetch };
}
