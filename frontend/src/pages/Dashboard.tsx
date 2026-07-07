import { ArrowRight, BrainCircuit, Building2, Database, Download, MoreHorizontal, TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';

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

export default function Dashboard() {
  return (
    <main className="min-h-[calc(100vh-5rem)] overflow-y-auto bg-background px-10 py-12">
      <div className="mx-auto max-w-[1200px]">
        <section className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-[58px] font-bold leading-none tracking-normal text-text-strong">
              Dashboard Overview
            </h2>
            <p className="mt-6 text-[21px] leading-8 text-text-muted">
              Real-time telemetry and executive insights for Q3 performance.
            </p>
          </div>
          <button
            className="inline-flex h-12 items-center gap-4 rounded border border-accent-mint bg-[#070f22] px-8 font-mono text-sm uppercase tracking-[0.18em] text-text-muted transition hover:bg-accent-mint hover:text-[#003824]"
            type="button"
          >
            <Download className="h-5 w-5" />
            Export Report
          </button>
        </section>

        <section className="mb-8 grid gap-8 md:grid-cols-3">
          <MetricCard
            accent="border-t-2 border-t-accent-mint"
            icon={<TrendingUp className="h-8 w-8" />}
            label="Active Sales Volume"
            trend="↑12.5%"
            value="142"
          />
          <MetricCard
            accent="border-t-2 border-t-accent-ice"
            icon={<Building2 className="h-8 w-8 text-accent-ice" />}
            label="Total Agencies Deployed"
            trend="Stable"
            trendColor="text-text-muted"
            value="38"
          />
          <MetricCard
            accent="border-t-2 border-t-accent-amber"
            icon={<Database className="h-8 w-8 text-accent-amber" />}
            label="Total Track Records"
            trend="↑4.2%"
            trendColor="text-accent-amber"
            value="1,024"
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <section className="min-h-[720px] rounded-lg border border-surface-line bg-surface p-8">
              <div className="mb-12 flex items-center justify-between border-b border-surface-line pb-6">
                <h3 className="font-display text-3xl font-semibold text-text-strong">Pipeline Velocity & Status</h3>
                <MoreHorizontal className="h-6 w-6 text-text-muted" />
              </div>
              <div className="space-y-10">
                <PipelineRow color="text-accent-mint" label="Execution Phase" value="68% (696 records)" width="68%" />
                <PipelineRow color="text-accent-ice" label="Review Pending" value="22% (225 records)" width="22%" />
                <PipelineRow color="text-accent-amber" label="Stalled / Flagged" value="10% (103 records)" width="10%" />
              </div>

              <div className="relative mt-10 flex h-40 items-center justify-center overflow-hidden rounded border border-dashed border-surface-line bg-surface-card/30">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                <span className="relative font-mono text-sm tracking-[0.14em] text-text-muted">
                  [Telemetry Node Active - Data Stream Optimal]
                </span>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <section className="min-h-[720px] rounded-lg border border-surface-line bg-surface-card p-8">
              <h3 className="flex items-center gap-3 font-display text-3xl font-semibold text-text-strong">
                <BrainCircuit className="h-6 w-6 text-accent-mint" />
                Executive Summary
              </h3>
              <div className="mt-10 space-y-8 text-lg leading-8 text-text-muted">
                <p>
                  Overall system health remains nominal with a distinct upward vector in{' '}
                  <strong className="font-semibold text-text-strong">Active Sales Volume</strong>, showing a{' '}
                  <span className="font-mono text-accent-mint">12.5%</span> increase over the previous quarter. Agency
                  deployment has stabilized at 38 operational nodes, providing a consistent processing grid.
                </p>
                <p>
                  Analysis of Track Records indicates a high throughput in the Execution Phase (
                  <span className="font-mono text-text-strong">68%</span>). However, attention is required for the{' '}
                  <span className="font-mono text-accent-amber">10%</span> flagged operations to prevent bottlenecking in
                  downstream reporting.
                </p>
              </div>

              <div className="mt-10 rounded border border-surface-line bg-surface p-5">
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-strong">Recommended Action</p>
                <p className="mt-4 text-base leading-7 text-text-muted">
                  Re-allocate processing bandwidth to 'Review Pending' queue to accelerate the 225 delayed records before
                  end-of-cycle.
                </p>
                <button className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] text-accent-mint">
                  Execute Directive
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
