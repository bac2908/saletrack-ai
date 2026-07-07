import {
  Bell,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Globe2,
  MoreVertical,
  Plus,
  Search,
  SortAsc,
  TrendingUp,
  TriangleAlert,
  UserPlus,
  UserRound,
} from 'lucide-react';
import type { ReactNode } from 'react';

const mapImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBaAnhZj5gpy8nyEEluoWkC59mUXI-unSyQUI0AehKE79-aS3Kqy5PHi7oLaHXAS2OXq-n8q5zsqJ-Fxx9-9bCb3T26XcV-WifWccxdowdkjW2KDuaLIkEDus52OLvrgEw9yLmhhwUSIP7Fk47gol0cO32222KzX0QttJWeCkRn_IEPIrtTlKbkYeadEfukkH9guGUG5ueHPC1rpcBfqmqZXY7zkFFWF5qwV_PbnM5REakGazWIXhI1ynPzOTg-aKPbhdzsJG2TuIM';

const agencies = [
  {
    id: '8492',
    initials: 'AP',
    name: 'Apex Partners Global',
    area: 'North America (East)',
    sale: 'J. Reynolds',
    status: 'Active',
    statusTone: 'mint',
  },
  {
    id: '3310',
    initials: 'NV',
    name: 'Nexus Vanguard',
    area: 'EMEA Central',
    sale: 'S. Chen',
    status: 'Under Review',
    statusTone: 'amber',
  },
  {
    id: '9012',
    initials: 'OS',
    name: 'Omni Strategies Ltd.',
    area: 'APAC (South)',
    sale: 'Pending',
    status: 'Active',
    statusTone: 'mint',
  },
  {
    id: '1109',
    initials: 'VQ',
    name: 'Vanguard Quant',
    area: 'North America (West)',
    sale: 'M. Davies',
    status: 'Suspended',
    statusTone: 'danger',
  },
];

function StatusBadge({ status, tone }: { status: string; tone: string }) {
  const classes =
    tone === 'mint'
      ? 'border-accent-mint/30 bg-accent-mint/10 text-accent-mint'
      : tone === 'amber'
        ? 'border-accent-amber/30 bg-accent-amber/10 text-accent-amber'
        : 'border-danger-soft/30 bg-danger-soft/10 text-danger-soft';

  return (
    <span className={`inline-flex rounded px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] ${classes}`}>
      {status}
    </span>
  );
}

export default function AgenciesPage() {
  return (
    <main className="min-h-screen overflow-y-auto bg-background px-10 py-6">
      <section className="mb-9 flex items-start justify-between gap-8">
        <div>
          <h2 className="font-display text-[38px] font-bold leading-none text-text-strong">Agencies Management</h2>
          <p className="mt-4 text-lg text-text-muted">Global Partner Network Overview</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative hidden w-[400px] xl:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
            <input
              className="h-14 w-full rounded border border-surface-line bg-surface-card pl-12 pr-16 text-lg text-text-strong outline-none placeholder:text-text-muted focus:border-accent-mint focus:ring-1 focus:ring-accent-mint"
              placeholder="Search agencies, regions, or IDs... (Cmd+K)"
              type="search"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded border border-surface-line px-2 py-1 font-mono text-[10px] text-text-muted">
              Cmd+K
            </span>
          </div>
          <button className="relative flex h-12 w-12 items-center justify-center border border-surface-line bg-surface-card text-text-muted">
            <Bell className="h-6 w-6" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-accent-mint" />
          </button>
          <div className="h-12 w-12 overflow-hidden rounded-full border border-surface-line bg-surface-card-high" />
        </div>
      </section>

      <section className="mb-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative h-[170px] overflow-hidden rounded-lg border border-accent-mint bg-surface-card p-8">
          <Building2 className="absolute right-8 top-11 h-14 w-14 text-accent-mint opacity-10" />
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Total Active Agencies</p>
          <div className="mt-7 flex items-baseline gap-3">
            <span className="font-display text-[56px] font-bold leading-none text-text-strong">1,482</span>
            <span className="font-mono text-sm text-accent-mint">↑12%</span>
          </div>
        </div>
        <div className="relative h-[170px] overflow-hidden rounded-lg border border-accent-amber bg-surface-card p-8">
          <Globe2 className="absolute right-8 top-9 h-16 w-16 text-accent-amber opacity-10" />
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Global Coverage</p>
          <div className="mt-7 flex items-baseline gap-4">
            <span className="font-display text-[56px] font-bold leading-none text-text-strong">84</span>
            <span className="font-mono text-sm text-text-muted">Countries</span>
          </div>
        </div>
        <div className="relative h-[170px] overflow-hidden rounded-lg border border-surface-line bg-surface-card p-8">
          <TrendingUp className="absolute right-8 top-10 h-16 w-16 text-text-muted opacity-10" />
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Avg Perf Score</p>
          <div className="mt-7 flex items-baseline gap-4">
            <span className="font-display text-[56px] font-bold leading-none text-text-strong">92.4</span>
            <span className="font-mono text-sm text-text-muted">/ 100</span>
          </div>
        </div>
        <button className="flex h-[170px] flex-col items-center justify-center rounded-lg border border-surface-line bg-surface-card p-8 transition hover:border-accent-mint">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-card-high text-text-strong">
            <Plus className="h-8 w-8" />
          </span>
          <span className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-text-strong">Onboard New Agency</span>
        </button>
      </section>

      <section className="grid gap-8 xl:grid-cols-12">
        <div className="overflow-hidden rounded-lg border border-surface-line bg-surface-card xl:col-span-8">
          <div className="flex items-center justify-between border-b border-surface-line p-8">
            <h3 className="font-display text-3xl font-semibold text-text-strong">Agency Directory</h3>
            <div className="flex items-center gap-3">
              <button className="inline-flex h-10 items-center gap-3 border border-surface-line px-4 font-mono text-sm text-text-muted">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="inline-flex h-10 items-center gap-3 border border-surface-line px-4 font-mono text-sm text-text-muted">
                <SortAsc className="h-4 w-4" />
                Sort
              </button>
              <button className="inline-flex h-10 items-center gap-3 border border-surface-line px-4 font-mono text-sm text-text-muted">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-card-high">
              <tr className="border-b border-surface-line">
                <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Agency Name</th>
                <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Area</th>
                <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Assigned Sale</th>
                <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Status</th>
                <th className="px-8 py-5 text-right font-mono text-sm uppercase tracking-[0.18em] text-text-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {agencies.map((agency, index) => (
                <tr className={`h-[155px] border-b border-surface-line ${index % 2 ? 'bg-background/20' : ''}`} key={agency.id}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-surface-card-high font-mono font-bold text-text-strong">
                        {agency.initials}
                      </div>
                      <div>
                        <p className="max-w-[150px] text-lg leading-7 text-text-strong">{agency.name}</p>
                        <p className="mt-1 font-mono text-sm text-text-muted">ID: AGY-{agency.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-lg leading-7 text-text-muted">{agency.area}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-surface-line bg-surface font-mono text-[10px] text-text-muted">
                        {agency.sale === 'Pending' ? 'ssig' : <UserRound className="h-3.5 w-3.5" />}
                      </div>
                      <span className={`text-lg ${agency.sale === 'Pending' ? 'italic text-text-muted' : 'text-text-strong'}`}>
                        {agency.sale}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={agency.status} tone={agency.statusTone} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <MoreVertical className="ml-auto h-5 w-5 text-text-muted" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between bg-surface-low px-6 py-5 font-mono text-sm text-text-muted">
            <span>Showing 1-10 of 1,482</span>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded border border-surface-line">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded border border-accent-mint bg-accent-mint/10 text-accent-mint">1</button>
              <button className="h-10 w-10 rounded border border-surface-line">2</button>
              <button className="h-10 w-10 rounded border border-surface-line">3</button>
              <span className="px-2">...</span>
              <button className="flex h-10 w-10 items-center justify-center rounded border border-surface-line">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-8 xl:col-span-4">
          <section className="rounded-lg border border-surface-line bg-surface-card p-8">
            <h3 className="font-display text-2xl font-semibold text-text-strong">Geographic Distribution</h3>
            <div
              className="relative mt-6 h-[320px] overflow-hidden rounded border border-surface-line bg-cover bg-center opacity-80"
              style={{ backgroundImage: `url("${mapImage}")` }}
            >
              <div className="absolute right-3 top-3 flex flex-col gap-2">
                <button className="flex h-8 w-8 items-center justify-center border border-surface-line bg-surface-card text-text-strong">
                  +
                </button>
                <button className="flex h-8 w-8 items-center justify-center border border-surface-line bg-surface-card text-text-strong">
                  -
                </button>
              </div>
              <span className="absolute left-[28%] top-[38%] h-4 w-4 rounded-full bg-accent-mint shadow-glow" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full bg-accent-mint" /> North America
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full bg-accent-amber" /> EMEA
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full bg-surface-line" /> APAC
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full bg-surface-card-high" /> LATAM
              </span>
            </div>
          </section>

          <section className="rounded-lg border border-surface-line bg-surface-card p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold text-text-strong">Recent Activity</h3>
              <button className="font-mono text-xs uppercase tracking-[0.18em] text-accent-mint">View All</button>
            </div>
            <div className="space-y-8">
              <ActivityItem
                icon={<Check className="h-4 w-4" />}
                tone="mint"
                text={<><strong>Apex Partners Global</strong> contract renewed.</>}
                time="2 hours ago - by System"
              />
              <ActivityItem
                icon={<TriangleAlert className="h-4 w-4" />}
                tone="amber"
                text={<>Performance alert triggered for <strong>Nexus Vanguard</strong>.</>}
                time="5 hours ago - Automated"
              />
              <ActivityItem
                icon={<UserPlus className="h-4 w-4" />}
                tone="muted"
                text={<>New agency onboarded: <strong>Omni Strategies Ltd.</strong></>}
                time="Yesterday, 14:30 - by M. Davies"
              />
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

function ActivityItem({
  icon,
  text,
  time,
  tone,
}: {
  icon: ReactNode;
  text: ReactNode;
  time: string;
  tone: 'mint' | 'amber' | 'muted';
}) {
  const color = tone === 'mint' ? 'border-accent-mint text-accent-mint' : tone === 'amber' ? 'border-accent-amber text-accent-amber' : 'border-surface-line text-text-muted';

  return (
    <div className="flex gap-4">
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${color}`}>{icon}</div>
      <div>
        <p className="text-lg leading-7 text-text-strong">{text}</p>
        <p className="mt-2 font-mono text-sm text-text-muted">{time}</p>
      </div>
    </div>
  );
}
