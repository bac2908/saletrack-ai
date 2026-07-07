import type { TrackStatusSummary } from '../../types/dashboard';

interface TrackStatusChartProps {
  data: TrackStatusSummary[];
}

export default function TrackStatusChart({ data }: TrackStatusChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0) || 1;

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-base font-semibold text-slate-950">Track Status</h2>
      <div className="mt-5 space-y-4">
        {data.map((item) => {
          const width = `${Math.round((item.count / total) * 100)}%`;

          return (
            <div key={item.status}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{item.status}</span>
                <span className="text-slate-500">{item.count}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-teal-600" style={{ width }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
