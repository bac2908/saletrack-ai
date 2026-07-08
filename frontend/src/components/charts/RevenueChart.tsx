import type { RevenuePoint } from '../../types/dashboard';
import { formatCurrency } from '../../utils/formatCurrency';

interface RevenueChartProps {
  data: RevenuePoint[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <section className="rounded-lg border border-surface-line bg-surface-card p-5">
      <h2 className="text-base font-semibold text-text-strong">Doanh thu</h2>
      <div className="mt-5 flex h-56 items-end gap-3">
        {data.map((item) => {
          const height = `${Math.max((item.value / maxValue) * 100, 8)}%`;

          return (
            <div className="flex flex-1 flex-col items-center gap-2" key={item.label}>
              <div className="flex h-full w-full items-end">
                <div
                  className="w-full rounded-t-md bg-accent-mint"
                  style={{ height }}
                  title={formatCurrency(item.value)}
                />
              </div>
              <span className="text-xs text-text-muted">{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
