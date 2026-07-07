import { useCallback, useEffect, useState } from 'react';
import { trackRecordsService } from '../services/trackRecordsService';
import type { TrackRecord } from '../types/trackRecord';

export function useTrackRecords() {
  const [trackRecords, setTrackRecords] = useState<TrackRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setTrackRecords(await trackRecordsService.getAll());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load track records');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { trackRecords, loading, error, refetch };
}
