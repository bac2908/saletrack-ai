import { useCallback, useEffect, useState } from 'react';
import { salesService } from '../services/salesService';
import type { Sale } from '../types/sale';

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setSales(await salesService.getAll());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load sales');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { sales, loading, error, refetch };
}
