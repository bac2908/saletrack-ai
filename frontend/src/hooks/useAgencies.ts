import { useCallback, useEffect, useState } from 'react';
import { agenciesService } from '../services/agenciesService';
import type { Agency } from '../types/agency';

export function useAgencies() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setAgencies(await agenciesService.getAll());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load agencies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { agencies, loading, error, refetch };
}
