import {
  Bell,
  Building2,
  Check,
  Download,
  Filter,
  Globe2,
  Plus,
  Search,
  SortAsc,
  TrendingUp,
  TriangleAlert,
  UserPlus,
  UserRound,
} from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ActionButtons from '../components/ui/ActionButtons';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import PaginationControls from '../components/ui/PaginationControls';
import Select from '../components/ui/Select';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useAgencies } from '../hooks/useAgencies';
import { useDashboard } from '../hooks/useDashboard';
import { agenciesService, type AgencyPayload } from '../services/agenciesService';
import { salesService } from '../services/salesService';
import type { Agency } from '../types/agency';
import type { Sale } from '../types/sale';

const pageSize = 8;

const initialForm: AgencyPayload = {
  address: '',
  area: '',
  name: '',
  saleId: 0,
};

export default function AgenciesPage() {
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') ?? '';
  const [createOpen, setCreateOpen] = useState(false);
  const [coverageCount, setCoverageCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [deletingAgency, setDeletingAgency] = useState<Agency | null>(null);
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  const [form, setForm] = useState<AgencyPayload>(initialForm);
  const [page, setPage] = useState(1);
  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState(searchFromUrl);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { dashboard, refetch: refetchDashboard } = useDashboard();
  const { agencies, error, loading, pagination, refetch } = useAgencies({ limit: pageSize, page, search });

  const closedCount = dashboard?.trackRecordsByStatus.CLOSED ?? 0;
  const performanceScore =
    dashboard && dashboard.totalTrackRecords > 0 ? ((closedCount / dashboard.totalTrackRecords) * 100).toFixed(1) : '0.0';

  useEffect(() => {
    setSearch(searchFromUrl);
    setPage(1);
  }, [searchFromUrl]);

  useEffect(() => {
    salesService.getAll({ limit: 100 }).then((result) => {
      setSales(result.items);
      setForm((current) => ({ ...current, saleId: current.saleId || result.items[0]?.id || 0 }));
    });
    agenciesService.getAll({ limit: 100 }).then((result) => {
      setCoverageCount(new Set(result.items.map((agency) => agency.area)).size);
    });
  }, []);

  async function refreshCoverage() {
    const result = await agenciesService.getAll({ limit: 100 });
    setCoverageCount(new Set(result.items.map((agency) => agency.area)).size);
  }

  function openCreateAgency() {
    setEditingAgency(null);
    setForm({ ...initialForm, saleId: sales[0]?.id ?? 0 });
    setSubmitError(null);
    setCreateOpen(true);
  }

  function openEditAgency(agency: Agency) {
    setEditingAgency(agency);
    setForm({
      address: agency.address,
      area: agency.area,
      name: agency.name,
      saleId: agency.saleId,
    });
    setSubmitError(null);
    setCreateOpen(true);
  }

  async function handleSubmitAgency(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (!form.saleId) {
        throw new Error('Vui lòng chọn sale phụ trách');
      }

      if (editingAgency) {
        await agenciesService.update(editingAgency.id, form);
      } else {
        await agenciesService.create(form);
      }

      setForm({ ...initialForm, saleId: sales[0]?.id ?? 0 });
      setEditingAgency(null);
      setCreateOpen(false);
      setPage(1);
      await Promise.all([refetch(), refreshCoverage(), refetchDashboard()]);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Không thể lưu đại lý');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteAgency() {
    if (!deletingAgency) {
      return;
    }

    setDeleting(true);
    try {
      await agenciesService.remove(deletingAgency.id);
      setDeletingAgency(null);
      await Promise.all([refetch(), refreshCoverage(), refetchDashboard()]);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-y-auto bg-background px-10 py-6">
      <section className="mb-9 flex items-start justify-between gap-8">
        <div>
          <h2 className="font-display text-[38px] font-bold leading-none text-text-strong">Quản lý đại lý</h2>
          <p className="mt-4 text-lg text-text-muted">Mạng lưới đại lý tại Việt Nam</p>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative hidden w-[400px] xl:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
            <input
              className="h-14 w-full rounded border border-surface-line bg-surface-card pl-12 pr-16 text-lg text-text-strong outline-none placeholder:text-text-muted focus:border-accent-mint focus:ring-1 focus:ring-accent-mint"
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Tìm đại lý, khu vực hoặc Sale..."
              type="search"
              value={search}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded border border-surface-line px-2 py-1 font-mono text-[10px] text-text-muted">
              Ctrl+K
            </span>
          </div>
          <ThemeToggle />
          <button
            className="relative flex h-12 w-12 items-center justify-center border border-surface-line bg-surface-card text-text-muted"
            type="button"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-accent-mint" />
          </button>
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-surface-line bg-surface-card-high font-mono text-xs text-text-strong">
            GS
          </div>
        </div>
      </section>

      <section className="mb-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative h-[170px] overflow-hidden rounded-lg border border-accent-mint bg-surface-card p-8">
          <Building2 className="absolute right-8 top-11 h-14 w-14 text-accent-mint opacity-10" />
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Tổng đại lý</p>
          <div className="mt-7 flex items-baseline gap-3">
            <span className="font-display text-[56px] font-bold leading-none text-text-strong">
              {dashboard?.totalAgencies ?? pagination.total}
            </span>
            <span className="font-mono text-sm text-accent-mint">VN</span>
          </div>
        </div>
        <div className="relative h-[170px] overflow-hidden rounded-lg border border-accent-amber bg-surface-card p-8">
          <Globe2 className="absolute right-8 top-9 h-16 w-16 text-accent-amber opacity-10" />
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Độ phủ Việt Nam</p>
          <div className="mt-7 flex items-baseline gap-4">
            <span className="font-display text-[56px] font-bold leading-none text-text-strong">{coverageCount || 21}</span>
            <span className="font-mono text-sm text-text-muted">khu vực</span>
          </div>
        </div>
        <div className="relative h-[170px] overflow-hidden rounded-lg border border-surface-line bg-surface-card p-8">
          <TrendingUp className="absolute right-8 top-10 h-16 w-16 text-text-muted opacity-10" />
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Tỷ lệ chốt</p>
          <div className="mt-7 flex items-baseline gap-4">
            <span className="font-display text-[56px] font-bold leading-none text-text-strong">{performanceScore}</span>
            <span className="font-mono text-sm text-text-muted">%</span>
          </div>
        </div>
        <button
          className="flex h-[170px] flex-col items-center justify-center rounded-lg border border-surface-line bg-surface-card p-8 transition hover:border-accent-mint"
          onClick={openCreateAgency}
          type="button"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-card-high text-text-strong">
            <Plus className="h-8 w-8" />
          </span>
          <span className="mt-5 font-mono text-sm uppercase tracking-[0.18em] text-text-strong">Thêm đại lý mới</span>
        </button>
      </section>

      <section className="grid gap-8 xl:grid-cols-12">
        <div className="overflow-hidden rounded-lg border border-surface-line bg-surface-card xl:col-span-8">
          <div className="flex items-center justify-between border-b border-surface-line p-8">
            <h3 className="font-display text-3xl font-semibold text-text-strong">Danh sách đại lý</h3>
            <div className="flex items-center gap-3">
              <button className="inline-flex h-10 items-center gap-3 border border-surface-line px-4 font-mono text-sm text-text-muted">
                <Filter className="h-4 w-4" />
                Lọc
              </button>
              <button className="inline-flex h-10 items-center gap-3 border border-surface-line px-4 font-mono text-sm text-text-muted">
                <SortAsc className="h-4 w-4" />
                Sắp xếp
              </button>
              <button className="inline-flex h-10 items-center gap-3 border border-surface-line px-4 font-mono text-sm text-text-muted">
                <Download className="h-4 w-4" />
                Xuất
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[780px] w-full border-collapse text-left">
              <thead className="bg-surface-card-high">
                <tr className="border-b border-surface-line">
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Tên đại lý</th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Khu vực</th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Sale phụ trách</th>
                  <th className="px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-text-muted">Track</th>
                  <th className="w-28 px-4 py-5 text-right font-mono text-xs uppercase tracking-[0.12em] text-text-muted">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-8 py-10 text-text-muted" colSpan={5}>
                      Đang tải danh sách đại lý...
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
                {!loading && !error
                  ? agencies.map((agency, index) => (
                      <tr className={`h-[120px] border-b border-surface-line ${index % 2 ? 'bg-background/20' : ''}`} key={agency.id}>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded bg-surface-card-high font-mono font-bold text-text-strong">
                              {agency.name
                                .replace('Đại lý ', '')
                                .split(' ')
                                .slice(0, 2)
                                .map((word) => word[0])
                                .join('')}
                            </div>
                            <div>
                              <p className="max-w-[170px] text-lg leading-7 text-text-strong">{agency.name}</p>
                              <p className="mt-1 font-mono text-sm text-text-muted">ID: AGY-{agency.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-lg leading-7 text-text-muted">
                          <p>{agency.area}</p>
                          <p className="mt-1 max-w-[170px] text-sm text-text-muted">{agency.address}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-surface-line bg-surface font-mono text-[10px] text-text-muted">
                              <UserRound className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-lg text-text-strong">{agency.sale?.name ?? 'Chưa gán'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col items-start gap-2">
                            <span className="font-mono text-lg text-text-strong">{agency._count?.trackRecords ?? 0}</span>
                            <Link
                              className="inline-flex h-8 items-center gap-2 rounded border border-accent-mint px-3 font-mono text-[11px] uppercase tracking-[0.1em] text-accent-mint transition hover:bg-accent-mint hover:text-background"
                              to={`/track-records?create=1&agencyId=${agency.id}`}
                            >
                              <Plus className="h-3.5 w-3.5" />
                              Tạo Track
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-6 text-right">
                          <ActionButtons
                            deleteLabel={`Xóa ${agency.name}`}
                            editLabel={`Chỉnh sửa ${agency.name}`}
                            onDelete={() => setDeletingAgency(agency)}
                            onEdit={() => openEditAgency(agency)}
                          />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>

          <PaginationControls onPageChange={setPage} pagination={pagination} />
        </div>

        <aside className="flex flex-col gap-8 xl:col-span-4">
          <section className="rounded-lg border border-surface-line bg-surface-card p-8">
            <h3 className="font-display text-2xl font-semibold text-text-strong">Phân bố tại Việt Nam</h3>
            <div className="mt-6 rounded border border-surface-line bg-background/50 p-6">
              <div className="grid grid-cols-2 gap-3 font-mono text-sm text-text-muted">
                {['TP.HCM', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Đồng Nai', 'Bình Dương', 'Khánh Hòa'].map(
                  (area) => (
                    <span className="flex items-center gap-2" key={area}>
                      <i className="h-2.5 w-2.5 rounded-full bg-accent-mint" /> {area}
                    </span>
                  ),
                )}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-surface-line bg-surface-card p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold text-text-strong">Hoạt động gần đây</h3>
              <button className="font-mono text-xs uppercase tracking-[0.18em] text-accent-mint">Xem tất cả</button>
            </div>
            <div className="space-y-8">
              <ActivityItem
                icon={<Check className="h-4 w-4" />}
                tone="mint"
                text={<><strong>{agencies[0]?.name ?? 'Đại lý mới'}</strong> đã được cập nhật dữ liệu.</>}
                time="2 giờ trước - bởi Hệ thống"
              />
              <ActivityItem
                icon={<TriangleAlert className="h-4 w-4" />}
                tone="amber"
                text={<>Cần rà soát các track record trạng thái <strong>Thất bại</strong>.</>}
                time="5 giờ trước - Tự động"
              />
              <ActivityItem
                icon={<UserPlus className="h-4 w-4" />}
                tone="muted"
                text={<>Thêm mới dữ liệu đại lý Việt Nam để demo phân trang.</>}
                time="Hôm nay - bởi SaleTrack AI"
              />
            </div>
          </section>
        </aside>
      </section>

      <Modal
        onClose={() => {
          setCreateOpen(false);
          setEditingAgency(null);
        }}
        open={createOpen}
        title={editingAgency ? 'Sửa đại lý' : 'Tạo đại lý mới'}
      >
        <form className="space-y-4" onSubmit={handleSubmitAgency}>
          <Input
            label="Tên đại lý"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            placeholder="Đại lý An Phát"
            required
            value={form.name}
          />
          <Input
            label="Địa chỉ"
            onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
            placeholder="123 Lê Lợi, Quận 1, TP.HCM"
            required
            value={form.address}
          />
          <Input
            label="Khu vực"
            onChange={(event) => setForm((current) => ({ ...current, area: event.target.value }))}
            placeholder="TP.HCM"
            required
            value={form.area}
          />
          <Select
            label="Sale phụ trách"
            onChange={(event) => setForm((current) => ({ ...current, saleId: Number(event.target.value) }))}
            options={sales.map((sale) => ({ label: sale.name, value: String(sale.id) }))}
            value={String(form.saleId)}
          />
          {submitError ? <p className="text-sm text-danger-soft">{submitError}</p> : null}
          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={() => setCreateOpen(false)} type="button" variant="secondary">
              Hủy
            </Button>
            <Button disabled={submitting} type="submit">
              {submitting ? 'Đang lưu...' : editingAgency ? 'Lưu thay đổi' : 'Tạo đại lý'}
            </Button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        description={
          deletingAgency
            ? `Bạn chắc chắn muốn xóa ${deletingAgency.name}? Các track record thuộc đại lý này cũng sẽ bị xóa.`
            : ''
        }
        loading={deleting}
        onClose={() => setDeletingAgency(null)}
        onConfirm={handleDeleteAgency}
        open={Boolean(deletingAgency)}
        title="Xóa đại lý"
      />
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
  const color =
    tone === 'mint'
      ? 'border-accent-mint text-accent-mint'
      : tone === 'amber'
        ? 'border-accent-amber text-accent-amber'
        : 'border-surface-line text-text-muted';

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
