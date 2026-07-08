import { ArrowRight, BrainCircuit, Building2, Database, Download, MoreHorizontal, TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { formatCompactCurrency } from '../utils/formatCompactCurrency';
import { formatCurrency } from '../utils/formatCurrency';

function MetricCard({
  accent,
  icon,
  label,
  trend,
  trendColor = 'text-accent-mint',
  value,
}: {
  accent: string;
  icon: ReactNode;
  label: string;
  trend: string;
  trendColor?: string;
  value: string;
}) {
  return (
    <section className={`relative h-48 overflow-hidden rounded-lg border border-surface-line bg-surface p-8 ${accent}`}>
      <div className="absolute right-8 top-9 text-accent-mint">{icon}</div>
      <p className="font-mono text-sm uppercase tracking-[0.22em] text-text-muted">{label}</p>
      <div className="mt-12 flex items-baseline gap-4">
        <span className="font-display text-[58px] font-bold leading-none text-text-strong">{value}</span>
        <span className={`font-mono text-base ${trendColor}`}>{trend}</span>
      </div>
    </section>
  );
}

function PipelineRow({
  color,
  label,
  value,
  width,
}: {
  color: string;
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between font-mono text-sm uppercase tracking-[0.16em]">
        <span className="text-text-strong">{label}</span>
        <span className={color}>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-card-high">
        <div className={`h-full rounded-full ${color.replace('text-', 'bg-')}`} style={{ width }} />
      </div>
    </div>
  );
}

function percent(part: number, total: number) {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

export default function Dashboard() {
  const { dashboard, error, loading } = useDashboard();
  const totalTrackRecords = dashboard?.totalTrackRecords ?? 0;
  const stats = dashboard?.trackRecordsByStatus;
  const closed = stats?.CLOSED ?? 0;
  const contacted = stats?.CONTACTED ?? 0;
  const potential = stats?.POTENTIAL ?? 0;
  const openPipeline = (stats?.NEW ?? 0) + contacted + potential;
  const lost = stats?.LOST ?? 0;
  const closedPercent = percent(closed, totalTrackRecords);
  const pipelinePercent = percent(openPipeline, totalTrackRecords);
  const lostPercent = percent(lost, totalTrackRecords);

  return (
    <main className="min-h-[calc(100vh-5rem)] overflow-y-auto bg-background px-10 py-12">
      <div className="mx-auto max-w-[1200px]">
        <section className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[58px] font-bold leading-none tracking-normal text-text-strong">
              Tổng quan Dashboard
            </h2>
            <p className="mt-6 text-[21px] leading-8 text-text-muted">
              Theo dõi thời gian thực đội ngũ Sale, đại lý và Track Record tại Việt Nam.
            </p>
          </div>
          <button
            className="inline-flex h-12 items-center gap-4 rounded border border-accent-mint bg-surface px-8 font-mono text-sm uppercase tracking-[0.18em] text-text-muted transition hover:bg-accent-mint hover:text-background"
            type="button"
          >
            <Download className="h-5 w-5" />
            Xuất báo cáo
          </button>
        </section>

        <section className="mb-8 grid gap-8 md:grid-cols-3">
          <MetricCard
            accent="border-t-2 border-t-accent-mint"
            icon={<TrendingUp className="h-8 w-8" />}
            label="Sale đang hoạt động"
            trend={loading ? 'Đang tải' : 'Việt Nam'}
            value={String(dashboard?.activeSalesCount ?? 0)}
          />
          <MetricCard
            accent="border-t-2 border-t-accent-ice"
            icon={<Building2 className="h-8 w-8 text-accent-ice" />}
            label="Tổng số đại lý"
            trend="Toàn quốc"
            trendColor="text-text-muted"
            value={String(dashboard?.totalAgencies ?? 0)}
          />
          <MetricCard
            accent="border-t-2 border-t-accent-amber"
            icon={<Database className="h-8 w-8 text-accent-amber" />}
            label="Tổng Track Record"
            trend={formatCompactCurrency(dashboard?.totalExpectedRevenue ?? 0)}
            trendColor="text-accent-amber"
            value={String(totalTrackRecords)}
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <section className="min-h-[720px] rounded-lg border border-surface-line bg-surface p-8">
              <div className="mb-12 flex items-center justify-between border-b border-surface-line pb-6">
                <h3 className="font-display text-3xl font-semibold text-text-strong">Tốc độ Pipeline & Trạng thái</h3>
                <MoreHorizontal className="h-6 w-6 text-text-muted" />
              </div>
              {error ? <p className="mb-6 text-danger-soft">{error}</p> : null}
              <div className="space-y-10">
                <PipelineRow
                  color="text-accent-mint"
                  label="Đã chốt"
                  value={`${closedPercent}% (${closed} bản ghi)`}
                  width={`${closedPercent}%`}
                />
                <PipelineRow
                  color="text-accent-ice"
                  label="Pipeline đang xử lý"
                  value={`${pipelinePercent}% (${openPipeline} bản ghi)`}
                  width={`${pipelinePercent}%`}
                />
                <PipelineRow
                  color="text-accent-amber"
                  label="Thất bại / Cần chú ý"
                  value={`${lostPercent}% (${lost} bản ghi)`}
                  width={`${lostPercent}%`}
                />
              </div>

              <div className="relative mt-10 flex h-40 items-center justify-center overflow-hidden rounded border border-dashed border-surface-line bg-surface-card/30">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                <span className="relative font-mono text-sm tracking-[0.14em] text-text-muted">
                  [Luồng dữ liệu Sale Việt Nam - SQLite / Prisma đang hoạt động]
                </span>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <section className="min-h-[720px] rounded-lg border border-surface-line bg-surface-card p-8">
              <h3 className="flex items-center gap-3 font-display text-3xl font-semibold text-text-strong">
                <BrainCircuit className="h-6 w-6 text-accent-mint" />
                Tóm tắt điều hành
              </h3>
              <div className="mt-10 space-y-8 text-lg leading-8 text-text-muted">
                <p>
                  Hệ thống hiện có{' '}
                  <strong className="font-semibold text-text-strong">{dashboard?.activeSalesCount ?? 0}</strong> sale
                  đang hoạt động, quản lý{' '}
                  <strong className="font-semibold text-text-strong">{dashboard?.totalAgencies ?? 0}</strong> đại lý tại
                  Việt Nam và theo dõi <span className="font-mono text-accent-mint">{totalTrackRecords}</span> track
                  record.
                </p>
                <p>
                  Tổng doanh thu dự kiến đang là{' '}
                  <span className="font-mono text-text-strong">{formatCurrency(dashboard?.totalExpectedRevenue ?? 0)}</span>.
                  Tỷ lệ đã chốt hiện đạt <span className="font-mono text-accent-mint">{closedPercent}%</span>, trong khi
                  nhóm cần theo dõi thêm chiếm <span className="font-mono text-accent-amber">{lostPercent}%</span>.
                </p>
              </div>

              <div className="mt-10 rounded border border-surface-line bg-surface p-5">
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-strong">Hành động đề xuất</p>
                <p className="mt-4 text-base leading-7 text-text-muted">
                  Ưu tiên gọi lại các track record trạng thái Đã liên hệ/Tiềm năng để tăng tỷ lệ chốt trong kỳ demo.
                </p>
                <button className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] text-accent-mint">
                  Thực hiện
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
