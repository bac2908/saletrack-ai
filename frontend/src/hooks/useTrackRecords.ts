import { useCallback, useEffect, useState } from 'react';
import { trackRecordsService } from '../services/trackRecordsService';
import type { ListParams, PaginationMeta } from '../types/api';
import type { TrackRecord } from '../types/trackRecord';

const emptyPagination: PaginationMeta = {
  hasNextPage: false,
  hasPreviousPage: false,
  limit: 10,
  page: 1,
  total: 0,
  totalPages: 1,
};

export function useTrackRecords(params: ListParams = {}) {
  const [trackRecords, setTrackRecords] = useState<TrackRecord[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>(emptyPagination);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await trackRecordsService.getAll(params);
      setTrackRecords(result.items);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load track records');
    } finally {
      setLoading(false);
    }
  }, [params.limit, params.page, params.search]);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { error, loading, pagination, refetch, trackRecords };
}
