import {
  BarChart3,
  ChevronLeft,
  MoreHorizontal,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { ReactNode } from 'react';

const representatives = [
  {
    avatar: 'https://i.pravatar.cc/80?img=47',
    id: '#SJ-8492',
    name: 'Sarah Jenkins',
    region: 'North America - East',
    revenue: '$1.4M',
    status: 'Active',
    tone: 'mint',
  },
  {
    initials: 'MR',
    id: '#MR-2104',
    name: 'Marcus Reyes',
    region: 'EMEA',
    revenue: '$890K',
    status: 'Active',
    tone: 'mint',
  },
  {
    avatar: 'https://i.pravatar.cc/80?img=12',
    id: '#DC-5511',
    name: 'David Chen',
    region: 'APAC',
    revenue: '$420K',
    status: 'Inactive',
    tone: 'muted',
  },
  {
    initials: 'AL',
    id: '#AL-9022',
    name: 'Amina Lodi',
    region: 'North America - West',
    revenue: '$2.1M',
    status: 'On Leave',
    tone: 'amber',
  },
];

function MetricCard({
  accent,
  icon,
  label,
  trend,
  trendIcon,
  trendTone = 'text-accent-mint',
  value,
}: {
  accent: string;
  icon: ReactNode;
  label: string;
  trend: string;
  trendIcon: ReactNode;
  trendTone?: string;
  value: string;
}) {
  return (
    <section className={`relative h-[220px] overflow-hidden bg-surface-card p-8 shadow-[0_28px_80px_rgba(0,0,0,0.18)] ${accent}`}>
      <div className="absolute right-8 top-9 opacity-90">{icon}</div>
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-muted">{label}</p>
      <div className="mt-10">
        <p className="font-display text-[60px] font-bold leading-none text-text-strong">{value}</p>
        <p className={`mt-6 flex items-center gap-2 font-mono text-base ${trendTone}`}>
          {trendIcon}
          {trend}
        </p>
      </div>
    </section>
  );
}

function StatusBadge({ status, tone }: { status: string; tone: string }) {
  const classes =
    tone === 'mint'
      ? 'border-accent-mint/35 bg-accent-mint/10 text-accent-mint'
      : tone === 'amber'
        ? 'border-accent-amber/35 bg-accent-amber/10 text-accent-amber'
        : 'border-surface-line bg-surface-card-high text-text-muted';

  return (
    <span className={`inline-flex rounded border px-4 py-2 font-mono text-sm uppercase tracking-[0.2em] ${classes}`}>
      {status}
    </span>
  );
}

export default function SalesPage() {
  return (
    <main className="min-h-screen overflow-y-auto bg-background px-10 py-12">
      <div className="mx-auto max-w-[1200px]">
        <section className="mb-9 flex flex-col gap-8 border-b border-surface-line pb-9 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-[860px]">
            <h2 className="font-display text-[58px] font-bold leading-none text-text-strong">Sales Team Management</h2>
            <p className="mt-6 text-[21px] leading-8 text-text-muted">
              Overview and administration of active personnel, performance metrics, and current lead allocations across
              the enterprise network.
            </p>
          </div>
          <button
            className="inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded border border-accent-mint bg-[#071024] px-8 font-mono text-sm uppercase tracking-[0.18em] text-text-strong transition hover:bg-accent-mint hover:text-background"
            type="button"
          >
            <Plus className="h-5 w-5" />
            Create Sale
          </button>
        </section>

        <section className="mb-14 grid gap-8 xl:grid-cols-3">
          <MetricCard
            accent="border-t-[3px] border-t-accent-mint"
            icon={<Users className="h-8 w-8 text-accent-mint" />}
            label="Total Reps"
            trend="+12% vs last quarter"
            trendIcon={<TrendingUp className="h-4 w-4" />}
            value="142"
          />
          <MetricCard
            accent="border-t-[3px] border-t-accent-amber"
            icon={<TrendingUp className="h-8 w-8 text-accent-amber" />}
            label="Active Hot Leads"
            trend="+5% this week"
            trendIcon={<TrendingUp className="h-4 w-4" />}
            trendTone="text-accent-amber"
            value="847"
          />
          <MetricCard
            accent="border-t-[3px] border-t-accent-ice"
            icon={<BarChart3 className="h-8 w-8 text-accent-ice" />}
            label="Conversion Rate"
            trend="-1.2% this month"
            trendIcon={<TrendingDown className="h-4 w-4" />}
            trendTone="text-danger-soft"
            value="24.8%"
          />
        </section>

        <section className="overflow-hidden rounded-lg border border-surface-line bg-surface-card">
          <div className="flex flex-col gap-6 border-b border-surface-line p-8 xl:flex-row xl:items-center xl:justify-between">
            <h3 className="font-display text-3xl font-semibold text-text-strong">Personnel Directory</h3>
            <label className="relative block w-full max-w-[360px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                className="h-14 w-full rounded border border-surface-line bg-background pl-12 pr-4 text-lg text-text-strong outline-none placeholder:text-text-muted focus:border-accent-mint focus:ring-1 focus:ring-accent-mint"
                placeholder="Search representatives..."
                type="search"
              />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[960px] w-full border-collapse text-left">
              <thead className="bg-surface-card-high">
                <tr className="border-b border-surface-line">
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">
                    Representative
                  </th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Region</th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">
                    YTD Revenue
                  </th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Status</th>
                  <th className="px-8 py-5 text-right font-mono text-sm uppercase tracking-[0.18em] text-text-muted">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {representatives.map((representative) => (
                  <tr className="h-24 border-b border-surface-line transition hover:bg-surface-low/70" key={representative.id}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        {representative.avatar ? (
                          <img
                            alt={representative.name}
                            className="h-12 w-12 rounded-full border border-surface-line object-cover"
                            src={representative.avatar}
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-surface-line bg-surface-card-high font-mono text-lg text-text-strong">
                            {representative.initials}
                          </div>
                        )}
                        <div>
                          <p className="text-xl font-medium text-text-strong">{representative.name}</p>
                          <p className="mt-1 font-mono text-sm text-text-muted">ID: {representative.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xl text-text-muted">{representative.region}</td>
                    <td className="px-8 py-6 font-mono text-lg text-text-strong">{representative.revenue}</td>
                    <td className="px-8 py-6">
                      <StatusBadge status={representative.status} tone={representative.tone} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded border border-transparent text-text-muted transition hover:border-surface-line hover:text-text-strong"
                        type="button"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 bg-surface-low px-6 py-5 font-mono text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>Showing 1 to 4 of 142 entries</span>
            <div className="flex items-center gap-3">
              <button className="inline-flex h-10 items-center gap-2 rounded border border-surface-line px-4 text-text-muted opacity-60">
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button className="h-10 w-10 rounded border border-surface-line bg-surface-card-high text-text-strong">1</button>
              <button className="h-10 w-10 rounded border border-transparent text-text-muted">2</button>
              <button className="h-10 w-10 rounded border border-transparent text-text-muted">3</button>
              <span className="px-2">...</span>
              <button className="h-10 rounded border border-surface-line px-5 text-text-strong">Next</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
