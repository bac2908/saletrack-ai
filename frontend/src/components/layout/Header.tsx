import { Bell, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { agenciesService } from '../../services/agenciesService';
import { salesService } from '../../services/salesService';
import { trackRecordsService } from '../../services/trackRecordsService';
import { formatCurrency } from '../../utils/formatCurrency';
import ThemeToggle from '../ui/ThemeToggle';

interface QuickSearchItem {
  description: string;
  label: string;
  path: string;
}

interface QuickSearchGroup {
  items: QuickSearchItem[];
  title: string;
}

export default function Header() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState<QuickSearchGroup[]>([]);

  const trimmedQuery = query.trim();
  const hasResults = groups.some((group) => group.items.length > 0);
  const showDropdown = focused && trimmedQuery.length >= 2;
  const encodedQuery = useMemo(() => encodeURIComponent(trimmedQuery), [trimmedQuery]);

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      setGroups([]);
      setError(null);
      setLoading(false);
      return;
    }

    let active = true;
    const timeoutId = window.setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const [sales, agencies, trackRecords] = await Promise.all([
          salesService.getAll({ limit: 4, page: 1, search: trimmedQuery }),
          agenciesService.getAll({ limit: 4, page: 1, search: trimmedQuery }),
          trackRecordsService.getAll({ limit: 4, page: 1, search: trimmedQuery }),
        ]);

        if (!active) {
          return;
        }

        setGroups([
          {
            title: 'Sale',
            items: sales.items.map((sale) => ({
              label: sale.name,
              description: `${sale.phone ?? 'Chưa có SĐT'} · ${sale._count?.agencies ?? 0} đại lý`,
              path: `/sales?search=${encodeURIComponent(sale.name)}`,
            })),
          },
          {
            title: 'Đại lý',
            items: agencies.items.map((agency) => ({
              label: agency.name,
              description: `${agency.area} · Sale: ${agency.sale?.name ?? 'Chưa gán'}`,
              path: `/agencies?search=${encodeURIComponent(agency.name)}`,
            })),
          },
          {
            title: 'Track Record',
            items: trackRecords.items.map((record) => ({
              label: record.customerName,
              description: `${record.agency?.name ?? 'Chưa rõ đại lý'} · ${formatCurrency(record.expectedRevenue)}`,
              path: `/track-records?search=${encodeURIComponent(record.customerName)}`,
            })),
          },
        ]);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Không tải được kết quả tìm kiếm');
          setGroups([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [trimmedQuery]);

  function submitSearch() {
    if (trimmedQuery.length > 0) {
      navigate(`/track-records?search=${encodedQuery}`);
      setFocused(false);
    }
  }

  return (
    <header className="flex h-20 items-center justify-between border-b border-surface-line bg-surface-card px-4 sm:px-10">
      <div className="relative hidden w-[440px] md:block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
        <input
          className="h-11 w-full rounded border border-surface-line bg-surface-card-high pl-12 pr-4 font-body text-lg text-text-strong outline-none transition placeholder:text-text-muted focus:border-accent-mint focus:ring-1 focus:ring-accent-mint"
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              submitSearch();
            }
            if (event.key === 'Escape') {
              setFocused(false);
            }
          }}
          placeholder="Tìm Sale, đại lý, khách hàng..."
          type="search"
          value={query}
        />
        {showDropdown ? (
          <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-lg border border-surface-line bg-surface-card shadow-panel">
            <div className="border-b border-surface-line px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
              Tìm nhanh trong hệ thống
            </div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {loading ? <p className="px-3 py-4 text-sm text-text-muted">Đang tìm kiếm...</p> : null}
              {!loading && error ? <p className="px-3 py-4 text-sm text-danger-soft">{error}</p> : null}
              {!loading && !error && !hasResults ? (
                <p className="px-3 py-4 text-sm text-text-muted">Không tìm thấy kết quả phù hợp.</p>
              ) : null}
              {!loading && !error
                ? groups.map((group) =>
                    group.items.length > 0 ? (
                      <div className="py-2" key={group.title}>
                        <p className="px-3 pb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent-mint">
                          {group.title}
                        </p>
                        <div className="space-y-1">
                          {group.items.map((item) => (
                            <Link
                              className="block rounded px-3 py-2 transition hover:bg-surface-card-high"
                              key={`${group.title}-${item.path}`}
                              onClick={() => {
                                setFocused(false);
                                setQuery('');
                              }}
                              to={item.path}
                            >
                              <span className="block text-sm font-semibold text-text-strong">{item.label}</span>
                              <span className="mt-1 block text-xs text-text-muted">{item.description}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null,
                  )
                : null}
            </div>
            <button
              className="flex w-full items-center justify-between border-t border-surface-line px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.14em] text-accent-mint transition hover:bg-surface-card-high"
              onMouseDown={(event) => event.preventDefault()}
              onClick={submitSearch}
              type="button"
            >
              Tìm trong Track Record
              <span>Enter</span>
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 justify-center md:flex-none">
        <h1 className="truncate font-display text-3xl font-semibold text-text-strong">SaleTrack AI</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          className="relative inline-flex h-11 w-11 items-center justify-center rounded border border-transparent text-text-muted transition hover:border-accent-mint hover:text-accent-mint"
          type="button"
          title="Thông báo"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-accent-mint" />
        </button>
        <div className="hidden h-10 w-10 items-center justify-center rounded border border-surface-line bg-surface-card-high font-mono text-xs text-text-strong sm:flex">
          GS
        </div>
      </div>
    </header>
  );
}
