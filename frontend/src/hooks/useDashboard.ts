import { useCallback, useEffect, useState } from 'react';
import { dashboardService } from '../services/dashboardService';
import type { DashboardStats } from '../types/dashboard';

export function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setDashboard(await dashboardService.getStats());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { dashboard, loading, error, refetch };
}
