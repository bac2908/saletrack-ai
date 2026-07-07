import { Download, Filter, MoreVertical, Plus, Search, TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';

const records = [
  {
    client: 'Acme Corp Global',
    id: 'TRX-8921',
    status: 'Closed',
    tone: 'mint',
    updatedAt: 'Today, 09:41 AM',
    value: '$1.2M',
  },
  {
    client: 'Nexus Industries',
    id: 'TRX-8920',
    status: 'Negotiation',
    tone: 'amber',
    updatedAt: 'Yesterday',
    value: '$850K',
  },
  {
    client: 'Stark Logistics',
    id: 'TRX-8919',
    status: 'Lead',
    tone: 'muted',
    updatedAt: 'Oct 24, 2023',
    value: '$2.1M',
  },
  {
    client: 'Globex Corporation',
    id: 'TRX-8918',
    status: 'Closed',
    tone: 'mint',
    updatedAt: 'Oct 22, 2023',
    value: '$400K',
  },
  {
    client: 'Initech Solutions',
    id: 'TRX-8917',
    status: 'Negotiation',
    tone: 'amber',
    updatedAt: 'Oct 20, 2023',
    value: '$1.5M',
  },
];

function PipelineLegend({ color, label }: { color: string; label: ReactNode }) {
  return (
    <span className="flex items-center gap-2 font-mono text-base text-text-muted">
      <i className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function StatusBadge({ status, tone }: { status: string; tone: string }) {
  const classes =
    tone === 'mint'
      ? 'border-accent-mint/35 bg-accent-mint/10 text-accent-mint'
      : tone === 'amber'
        ? 'border-accent-amber/35 bg-accent-amber/10 text-accent-amber'
        : 'border-accent-ice/30 bg-accent-ice/10 text-accent-ice';

  return (
    <span className={`inline-flex rounded border px-3 py-2 font-mono text-xs font-bold uppercase tracking-normal ${classes}`}>
      {status}
    </span>
  );
}

export default function TrackRecordsPage() {
  return (
    <main className="min-h-screen overflow-y-auto bg-background px-10 py-12">
      <div className="mx-auto max-w-[1200px]">
        <section className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h2 className="font-display text-[58px] font-bold leading-none text-text-strong">Track Records</h2>
            <p className="mt-6 text-[21px] text-text-muted">High-fidelity transaction ledger and pipeline overview.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              className="inline-flex h-12 items-center gap-3 rounded border border-surface-line bg-[#071024] px-6 font-mono text-sm uppercase tracking-[0.16em] text-text-strong transition hover:border-accent-mint"
              type="button"
            >
              <Download className="h-5 w-5" />
              Export
            </button>
            <button
              className="inline-flex h-12 items-center gap-3 rounded border border-accent-mint bg-[#071024] px-6 font-mono text-sm uppercase tracking-[0.16em] text-text-strong transition hover:bg-accent-mint hover:text-background"
              type="button"
            >
              <Plus className="h-5 w-5" />
              Quick Add Lead
            </button>
          </div>
        </section>

        <section className="mb-14 grid gap-8 xl:grid-cols-[1fr_380px]">
          <div className="rounded-lg border-t-[3px] border-t-accent-mint bg-surface-card p-8 shadow-[0_28px_80px_rgba(0,0,0,0.18)]">
            <p className="font-mono text-base tracking-[0.14em] text-text-muted">Total Pipeline Value</p>
            <div className="mt-4 flex flex-wrap items-baseline gap-4">
              <span className="font-display text-[62px] font-bold leading-none text-text-strong">$42.8M</span>
              <span className="inline-flex items-center gap-2 font-mono text-base text-accent-mint">
                <TrendingUp className="h-4 w-4" />
                12.4%
              </span>
            </div>

            <div className="mt-10 flex h-1.5 overflow-hidden rounded-full bg-surface-line">
              <span className="h-full w-[45%] bg-accent-mint" />
              <span className="h-full w-[30%] bg-accent-amber" />
              <span className="h-full w-[25%] bg-accent-ice" />
            </div>

            <div className="mt-5 flex flex-wrap justify-between gap-4">
              <PipelineLegend color="bg-accent-mint" label={<>Closed ($19.2M)</>} />
              <PipelineLegend color="bg-accent-amber" label={<>Negotiation ($12.8M)</>} />
              <PipelineLegend color="bg-accent-ice" label={<>Lead ($10.8M)</>} />
            </div>
          </div>

          <div className="flex min-h-[230px] flex-col justify-center rounded-lg border-t-[3px] border-t-accent-amber bg-surface-card p-8 text-center">
            <p className="text-left font-mono text-base tracking-[0.14em] text-text-muted">Active Deals</p>
            <p className="mt-8 font-display text-[62px] font-bold leading-none text-text-strong">148</p>
            <p className="mt-5 font-mono text-base tracking-[0.08em] text-text-muted">Across 12 Global Agencies</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-surface-line bg-surface-card">
          <div className="flex flex-col gap-5 border-b border-surface-line p-5 xl:flex-row xl:items-center xl:justify-between">
            <label className="relative block w-full max-w-[320px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                className="h-12 w-full rounded border border-surface-line bg-background pl-12 pr-4 text-lg text-text-strong outline-none placeholder:text-text-muted focus:border-accent-mint focus:ring-1 focus:ring-accent-mint"
                placeholder="Search records..."
                type="search"
              />
            </label>
            <button
              className="inline-flex h-10 items-center justify-center gap-3 rounded border border-surface-line px-5 font-mono text-sm text-text-strong transition hover:border-accent-mint"
              type="button"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[920px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-surface-line">
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Record ID</th>
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Client / Entity</th>
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Value</th>
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Status</th>
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Last Updated</th>
                  <th className="px-6 py-5 text-right font-mono text-sm tracking-[0.06em] text-text-strong">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr className="h-[72px] border-b border-surface-line transition last:border-b-0 hover:bg-surface-low/70" key={record.id}>
                    <td className="px-6 py-5 font-mono text-base text-text-muted">{record.id}</td>
                    <td className="px-6 py-5 font-mono text-base text-text-strong">{record.client}</td>
                    <td className="px-6 py-5 font-mono text-base text-text-strong">{record.value}</td>
                    <td className="px-6 py-5">
                      <StatusBadge status={record.status} tone={record.tone} />
                    </td>
                    <td className="px-6 py-5 font-mono text-base text-text-muted">{record.updatedAt}</td>
                    <td className="px-6 py-5 text-right">
                      <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded border border-transparent text-text-muted transition hover:border-surface-line hover:text-text-strong"
                        type="button"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
