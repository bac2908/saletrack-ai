import type { TrackStatusSummary } from '../../types/dashboard';
import { STATUS_LABELS } from '../../constants/statuses';

interface TrackStatusChartProps {
  data: TrackStatusSummary[];
}

export default function TrackStatusChart({ data }: TrackStatusChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <section className="rounded-lg border border-surface-line bg-surface-card p-5">
      <h2 className="text-base font-semibold text-text-strong">Trạng thái Track</h2>
      <div className="mt-5 space-y-4">
        {data.map((item) => {
          const width = `${Math.round((item.count / total) * 100)}%`;

          return (
            <div key={item.status}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-text-strong">{STATUS_LABELS[item.status] ?? item.status}</span>
                <span className="text-text-muted">{item.count}</span>
              </div>
              <div className="h-2 rounded-full bg-surface-card-high">
                <div className="h-2 rounded-full bg-accent-mint" style={{ width }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
