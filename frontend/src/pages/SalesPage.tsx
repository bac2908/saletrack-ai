import { BarChart3, Plus, Search, TrendingDown, TrendingUp, Users } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ActionButtons from '../components/ui/ActionButtons';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import PaginationControls from '../components/ui/PaginationControls';
import Select from '../components/ui/Select';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useDashboard } from '../hooks/useDashboard';
import { useSales } from '../hooks/useSales';
import { salesService, type SalePayload } from '../services/salesService';
import type { Sale } from '../types/sale';
import { formatDate } from '../utils/formatDate';

const pageSize = 8;

const initialForm: SalePayload = {
  email: '',
  name: '',
  phone: '',
  status: 'ACTIVE',
};

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
    <section className={`relative h-[220px] overflow-hidden bg-surface-card p-8 shadow-panel ${accent}`}>
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

function StatusBadge({ status }: { status: 'ACTIVE' | 'INACTIVE' }) {
  const classes =
    status === 'ACTIVE'
      ? 'border-accent-mint/35 bg-accent-mint/10 text-accent-mint'
      : 'border-danger-soft/35 bg-danger-soft/10 text-danger-soft';

  return (
    <span className={`inline-flex rounded border px-4 py-2 font-mono text-sm uppercase tracking-[0.2em] ${classes}`}>
      {status === 'ACTIVE' ? 'Đang hoạt động' : 'Tạm ngưng'}
    </span>
  );
}

export default function SalesPage() {
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') ?? '';
  const [createOpen, setCreateOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingSale, setDeletingSale] = useState<Sale | null>(null);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [form, setForm] = useState<SalePayload>(initialForm);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(searchFromUrl);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { dashboard, refetch: refetchDashboard } = useDashboard();
  const { error, loading, pagination, refetch, sales } = useSales({ limit: pageSize, page, search });

  const closedCount = dashboard?.trackRecordsByStatus.CLOSED ?? 0;
  const totalTrackRecords = dashboard?.totalTrackRecords ?? 0;
  const conversionRate = totalTrackRecords > 0 ? `${((closedCount / totalTrackRecords) * 100).toFixed(1)}%` : '0%';

  useEffect(() => {
    setSearch(searchFromUrl);
    setPage(1);
  }, [searchFromUrl]);

  function openCreateSale() {
    setEditingSale(null);
    setForm(initialForm);
    setSubmitError(null);
    setCreateOpen(true);
  }

  function openEditSale(sale: Sale) {
    setEditingSale(sale);
    setForm({
      email: sale.email ?? '',
      name: sale.name,
      phone: sale.phone ?? '',
      status: sale.status,
    });
    setSubmitError(null);
    setCreateOpen(true);
  }

  async function handleSubmitSale(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        ...form,
        email: form.email?.trim() || undefined,
        phone: form.phone?.trim() || undefined,
      };

      if (editingSale) {
        await salesService.update(editingSale.id, payload);
      } else {
        await salesService.create(payload);
      }

      setForm(initialForm);
      setEditingSale(null);
      setCreateOpen(false);
      setPage(1);
      await Promise.all([refetch(), refetchDashboard()]);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Không thể tạo sale');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteSale() {
    if (!deletingSale) {
      return;
    }

    setDeleting(true);
    try {
      await salesService.remove(deletingSale.id);
      setDeletingSale(null);
      await Promise.all([refetch(), refetchDashboard()]);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-y-auto bg-background px-10 py-12">
      <div className="mx-auto max-w-[1200px]">
        <section className="mb-9 flex flex-col gap-8 border-b border-surface-line pb-9 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-[860px]">
            <h2 className="font-display text-[58px] font-bold leading-none text-text-strong">Quản lý đội ngũ Sale</h2>
            <p className="mt-6 text-[21px] leading-8 text-text-muted">
              Quản lý đội ngũ sale Việt Nam, số lượng đại lý phụ trách và hiệu suất chốt track record.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <ThemeToggle />
            <button
              className="inline-flex h-14 shrink-0 items-center justify-center gap-3 rounded border border-accent-mint bg-surface px-8 font-mono text-sm uppercase tracking-[0.18em] text-text-strong transition hover:bg-accent-mint hover:text-background"
              onClick={openCreateSale}
              type="button"
            >
              <Plus className="h-5 w-5" />
              Tạo Sale
            </button>
          </div>
        </section>

        <section className="mb-14 grid gap-8 xl:grid-cols-3">
          <MetricCard
            accent="border-t-[3px] border-t-accent-mint"
            icon={<Users className="h-8 w-8 text-accent-mint" />}
            label="Tổng Sale"
            trend={`${dashboard?.activeSalesCount ?? 0} đang hoạt động`}
            trendIcon={<TrendingUp className="h-4 w-4" />}
            value={String(pagination.total)}
          />
          <MetricCard
            accent="border-t-[3px] border-t-accent-amber"
            icon={<TrendingUp className="h-8 w-8 text-accent-amber" />}
            label="Đại lý phụ trách"
            trend="Mạng lưới Việt Nam"
            trendIcon={<TrendingUp className="h-4 w-4" />}
            trendTone="text-accent-amber"
            value={String(dashboard?.totalAgencies ?? 0)}
          />
          <MetricCard
            accent="border-t-[3px] border-t-accent-ice"
            icon={<BarChart3 className="h-8 w-8 text-accent-ice" />}
            label="Tỷ lệ chốt"
            trend={`${closedCount} track đã chốt`}
            trendIcon={<TrendingDown className="h-4 w-4" />}
            trendTone="text-accent-ice"
            value={conversionRate}
          />
        </section>

        <section className="overflow-hidden rounded-lg border border-surface-line bg-surface-card">
          <div className="flex flex-col gap-6 border-b border-surface-line p-8 xl:flex-row xl:items-center xl:justify-between">
            <h3 className="font-display text-3xl font-semibold text-text-strong">Danh sách Sale</h3>
            <label className="relative block w-full max-w-[360px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                className="h-14 w-full rounded border border-surface-line bg-background pl-12 pr-4 text-lg text-text-strong outline-none placeholder:text-text-muted focus:border-accent-mint focus:ring-1 focus:ring-accent-mint"
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Tìm Sale theo tên, SĐT..."
                type="search"
                value={search}
              />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[960px] w-full border-collapse text-left">
              <thead className="bg-surface-card-high">
                <tr className="border-b border-surface-line">
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Sale</th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Khu vực</th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Đại lý</th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Trạng thái</th>
                  <th className="px-8 py-5 text-right font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-8 py-10 text-text-muted" colSpan={5}>
                      Đang tải danh sách Sale...
                    </td>
                  </tr>
                ) : null}
                {!loading && error ? (
                  <tr>
                    <td className="px-8 py-10 text-danger-soft" colSpan={5}>
                      {error}
                    </td>
                  </tr>
                ) : null}
                {!loading && !error && sales.length === 0 ? (
                  <tr>
                    <td className="px-8 py-10 text-text-muted" colSpan={5}>
                      Không có sale phù hợp.
                    </td>
                  </tr>
                ) : null}
                {!loading && !error
                  ? sales.map((sale) => {
                      const areas = Array.from(new Set(sale.agencies?.map((agency) => agency.area) ?? []));
                      const initials = sale.name
                        .split(' ')
                        .slice(-2)
                        .map((part) => part[0])
                        .join('');

                      return (
                        <tr className="h-24 border-b border-surface-line transition hover:bg-surface-low/70" key={sale.id}>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-surface-line bg-surface-card-high font-mono text-lg text-text-strong">
                                {initials}
                              </div>
                              <div>
                                <p className="text-xl font-medium text-text-strong">{sale.name}</p>
                                <p className="mt-1 font-mono text-sm text-text-muted">
                                  {sale.phone ?? 'Chưa có SĐT'} - {formatDate(sale.createdAt)}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-lg leading-7 text-text-muted">
                            {areas.slice(0, 3).join(', ') || 'Chưa gán đại lý'}
                          </td>
                          <td className="px-8 py-6 font-mono text-lg text-text-strong">
                            {sale._count?.agencies ?? sale.agencies?.length ?? 0}
                          </td>
                          <td className="px-8 py-6">
                            <StatusBadge status={sale.status} />
                          </td>
                          <td className="px-8 py-6 text-right">
                            <ActionButtons
                              deleteLabel={`Xóa ${sale.name}`}
                              editLabel={`Chỉnh sửa ${sale.name}`}
                              onDelete={() => setDeletingSale(sale)}
                              onEdit={() => openEditSale(sale)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
          </div>

          <PaginationControls onPageChange={setPage} pagination={pagination} />
        </section>
      </div>

      <Modal
        onClose={() => {
          setCreateOpen(false);
          setEditingSale(null);
        }}
        open={createOpen}
        title={editingSale ? 'Sửa Sale' : 'Tạo Sale mới'}
      >
        <form className="space-y-4" onSubmit={handleSubmitSale}>
          <Input
            label="Tên sale"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Nguyễn Văn An"
            required
            value={form.name}
          />
          <Input
            label="Số điện thoại"
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            placeholder="0901234567"
            value={form.phone ?? ''}
          />
          <Input
            label="Email"
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            placeholder="sale@example.com"
            type="email"
            value={form.email ?? ''}
          />
          <Select
            label="Trạng thái"
            onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as SalePayload['status'] }))}
            options={[
              { label: 'Đang hoạt động', value: 'ACTIVE' },
              { label: 'Tạm ngưng', value: 'INACTIVE' },
            ]}
            value={form.status}
          />
          {submitError ? <p className="text-sm text-danger-soft">{submitError}</p> : null}
          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={() => setCreateOpen(false)} type="button" variant="secondary">
              Hủy
            </Button>
            <Button disabled={submitting} type="submit">
              {submitting ? 'Đang lưu...' : editingSale ? 'Lưu thay đổi' : 'Tạo Sale'}
            </Button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        description={
          deletingSale
            ? `Bạn chắc chắn muốn xóa ${deletingSale.name}? Các đại lý và track record liên quan cũng sẽ bị xóa.`
            : ''
        }
        loading={deleting}
        onClose={() => setDeletingSale(null)}
        onConfirm={handleDeleteSale}
        open={Boolean(deletingSale)}
        title="Xóa Sale"
      />
    </main>
  );
}
