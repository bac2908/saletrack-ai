import { Download, Filter, Plus, Search, TrendingUp } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import ActionButtons from '../components/ui/ActionButtons';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import PaginationControls from '../components/ui/PaginationControls';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { useDashboard } from '../hooks/useDashboard';
import { useTrackRecords } from '../hooks/useTrackRecords';
import { agenciesService } from '../services/agenciesService';
import { trackRecordsService, type TrackRecordPayload } from '../services/trackRecordsService';
import type { Agency } from '../types/agency';
import type { TrackRecord, TrackRecordStatus } from '../types/trackRecord';
import { formatCompactCurrency } from '../utils/formatCompactCurrency';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

const pageSize = 10;

const initialForm: TrackRecordPayload = {
  agencyId: 0,
  customerName: '',
  expectedRevenue: 0,
  note: '',
  status: 'NEW',
};

const statusLabels: Record<TrackRecordStatus, string> = {
  CLOSED: 'Closed',
  CONTACTED: 'Contacted',
  LOST: 'Lost',
  NEW: 'New',
  POTENTIAL: 'Potential',
};

function PipelineLegend({ color, label }: { color: string; label: ReactNode }) {
  return (
    <span className="flex items-center gap-2 font-mono text-base text-text-muted">
      <i className={`h-2.5 w-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: TrackRecordStatus }) {
  const classes =
    status === 'CLOSED'
      ? 'border-accent-mint/35 bg-accent-mint/10 text-accent-mint'
      : status === 'POTENTIAL'
        ? 'border-accent-amber/35 bg-accent-amber/10 text-accent-amber'
        : status === 'LOST'
          ? 'border-danger-soft/35 bg-danger-soft/10 text-danger-soft'
          : 'border-accent-ice/30 bg-accent-ice/10 text-accent-ice';

  return (
    <span className={`inline-flex rounded border px-3 py-2 font-mono text-xs font-bold uppercase tracking-normal ${classes}`}>
      {statusLabels[status]}
    </span>
  );
}

function percent(part: number, total: number) {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

export default function TrackRecordsPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState<TrackRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<TrackRecord | null>(null);
  const [form, setForm] = useState<TrackRecordPayload>(initialForm);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { dashboard, refetch: refetchDashboard } = useDashboard();
  const { error, loading, pagination, refetch, trackRecords } = useTrackRecords({ limit: pageSize, page, search });

  const stats = dashboard?.trackRecordsByStatus;
  const totalRecords = dashboard?.totalTrackRecords ?? 0;
  const closed = stats?.CLOSED ?? 0;
  const negotiation = (stats?.CONTACTED ?? 0) + (stats?.POTENTIAL ?? 0);
  const lead = (stats?.NEW ?? 0) + (stats?.LOST ?? 0);
  const closedPercent = percent(closed, totalRecords);
  const negotiationPercent = percent(negotiation, totalRecords);
  const leadPercent = Math.max(0, 100 - closedPercent - negotiationPercent);
  const activeDeals = totalRecords - closed - (stats?.LOST ?? 0);

  const agencyOptions = useMemo(
    () => agencies.map((agency) => ({ label: `${agency.name} - ${agency.area}`, value: String(agency.id) })),
    [agencies],
  );

  useEffect(() => {
    agenciesService.getAll({ limit: 100 }).then((result) => {
      setAgencies(result.items);
      setForm((current) => ({ ...current, agencyId: current.agencyId || result.items[0]?.id || 0 }));
    });
  }, []);

  function openCreateTrackRecord() {
    setEditingRecord(null);
    setForm({ ...initialForm, agencyId: agencies[0]?.id ?? 0 });
    setSubmitError(null);
    setCreateOpen(true);
  }

  function openEditTrackRecord(record: TrackRecord) {
    setEditingRecord(record);
    setForm({
      agencyId: record.agencyId,
      customerName: record.customerName,
      expectedRevenue: record.expectedRevenue,
      note: record.note ?? '',
      status: record.status,
    });
    setSubmitError(null);
    setCreateOpen(true);
  }

  async function handleSubmitTrackRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (!form.agencyId) {
        throw new Error('Vui lòng chọn đại lý');
      }

      const payload = {
        ...form,
        expectedRevenue: Number(form.expectedRevenue),
        note: form.note?.trim() || undefined,
      };

      if (editingRecord) {
        await trackRecordsService.update(editingRecord.id, payload);
      } else {
        await trackRecordsService.create(payload);
      }

      setForm({ ...initialForm, agencyId: agencies[0]?.id ?? 0 });
      setEditingRecord(null);
      setCreateOpen(false);
      setPage(1);
      await Promise.all([refetch(), refetchDashboard()]);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Không thể tạo track record');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteTrackRecord() {
    if (!deletingRecord) {
      return;
    }

    setDeleting(true);
    try {
      await trackRecordsService.remove(deletingRecord.id);
      setDeletingRecord(null);
      await Promise.all([refetch(), refetchDashboard()]);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-y-auto bg-background px-10 py-12">
      <div className="mx-auto max-w-[1200px]">
        <section className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h2 className="font-display text-[58px] font-bold leading-none text-text-strong">Track Records</h2>
            <p className="mt-6 text-[21px] text-text-muted">Theo dõi khách hàng, doanh thu dự kiến và kết quả bán hàng.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              className="inline-flex h-12 items-center gap-3 rounded border border-surface-line bg-surface px-6 font-mono text-sm uppercase tracking-[0.16em] text-text-strong transition hover:border-accent-mint"
              type="button"
            >
              <Download className="h-5 w-5" />
              Export
            </button>
            <button
              className="inline-flex h-12 items-center gap-3 rounded border border-accent-mint bg-surface px-6 font-mono text-sm uppercase tracking-[0.16em] text-text-strong transition hover:bg-accent-mint hover:text-background"
              onClick={openCreateTrackRecord}
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
              <span className="font-display text-[62px] font-bold leading-none text-text-strong">
                {formatCompactCurrency(dashboard?.totalExpectedRevenue ?? 0)}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-base text-accent-mint">
                <TrendingUp className="h-4 w-4" />
                {closedPercent}% closed
              </span>
            </div>

            <div className="mt-10 flex h-1.5 overflow-hidden rounded-full bg-surface-line">
              <span className="h-full bg-accent-mint" style={{ width: `${closedPercent}%` }} />
              <span className="h-full bg-accent-amber" style={{ width: `${negotiationPercent}%` }} />
              <span className="h-full bg-accent-ice" style={{ width: `${leadPercent}%` }} />
            </div>

            <div className="mt-5 flex flex-wrap justify-between gap-4">
              <PipelineLegend color="bg-accent-mint" label={<>Closed ({closed})</>} />
              <PipelineLegend color="bg-accent-amber" label={<>Contacted/Potential ({negotiation})</>} />
              <PipelineLegend color="bg-accent-ice" label={<>New/Lost ({lead})</>} />
            </div>
          </div>

          <div className="flex min-h-[230px] flex-col justify-center rounded-lg border-t-[3px] border-t-accent-amber bg-surface-card p-8 text-center">
            <p className="text-left font-mono text-base tracking-[0.14em] text-text-muted">Active Deals</p>
            <p className="mt-8 font-display text-[62px] font-bold leading-none text-text-strong">{activeDeals}</p>
            <p className="mt-5 font-mono text-base tracking-[0.08em] text-text-muted">Across Vietnam Agencies</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-surface-line bg-surface-card">
          <div className="flex flex-col gap-5 border-b border-surface-line p-5 xl:flex-row xl:items-center xl:justify-between">
            <label className="relative block w-full max-w-[320px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                className="h-12 w-full rounded border border-surface-line bg-background pl-12 pr-4 text-lg text-text-strong outline-none placeholder:text-text-muted focus:border-accent-mint focus:ring-1 focus:ring-accent-mint"
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search records..."
                type="search"
                value={search}
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
            <table className="min-w-[960px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-surface-line">
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Record ID</th>
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Customer / Agency</th>
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Value</th>
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Status</th>
                  <th className="px-6 py-5 font-mono text-sm tracking-[0.06em] text-text-strong">Sale</th>
                  <th className="px-6 py-5 text-right font-mono text-sm tracking-[0.06em] text-text-strong">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-6 py-10 text-text-muted" colSpan={6}>
                      Loading track records...
                    </td>
                  </tr>
                ) : null}
                {!loading && error ? (
                  <tr>
                    <td className="px-6 py-10 text-danger-soft" colSpan={6}>
                      {error}
                    </td>
                  </tr>
                ) : null}
                {!loading && !error
                  ? trackRecords.map((record) => (
                      <tr className="h-[76px] border-b border-surface-line transition last:border-b-0 hover:bg-surface-low/70" key={record.id}>
                        <td className="px-6 py-5 font-mono text-base text-text-muted">TRX-{record.id.toString().padStart(4, '0')}</td>
                        <td className="px-6 py-5">
                          <p className="font-mono text-base text-text-strong">{record.customerName}</p>
                          <p className="mt-1 text-sm text-text-muted">{record.agency?.name ?? 'Chưa rõ đại lý'}</p>
                        </td>
                        <td className="px-6 py-5 font-mono text-base text-text-strong">{formatCurrency(record.expectedRevenue)}</td>
                        <td className="px-6 py-5">
                          <StatusBadge status={record.status} />
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-text-strong">{record.agency?.sale?.name ?? 'Chưa gán'}</p>
                          <p className="mt-1 font-mono text-sm text-text-muted">{formatDate(record.createdAt)}</p>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <ActionButtons
                            deleteLabel={`Delete ${record.customerName}`}
                            editLabel={`Edit ${record.customerName}`}
                            onDelete={() => setDeletingRecord(record)}
                            onEdit={() => openEditTrackRecord(record)}
                          />
                        </td>
                      </tr>
                    ))
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
          setEditingRecord(null);
        }}
        open={createOpen}
        title={editingRecord ? 'Sửa track record' : 'Tạo track record mới'}
      >
        <form className="space-y-4" onSubmit={handleSubmitTrackRecord}>
          <Input
            label="Tên khách hàng"
            onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))}
            placeholder="Công ty TNHH Việt Phát"
            required
            value={form.customerName}
          />
          <Input
            label="Doanh thu dự kiến"
            min={0}
            onChange={(event) => setForm((current) => ({ ...current, expectedRevenue: Number(event.target.value) }))}
            placeholder="15000000"
            required
            type="number"
            value={form.expectedRevenue || ''}
          />
          <Select
            label="Trạng thái"
            onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as TrackRecordStatus }))}
            options={[
              { label: 'Mới', value: 'NEW' },
              { label: 'Đã liên hệ', value: 'CONTACTED' },
              { label: 'Tiềm năng', value: 'POTENTIAL' },
              { label: 'Đã chốt', value: 'CLOSED' },
              { label: 'Thất bại', value: 'LOST' },
            ]}
            value={form.status}
          />
          <Select
            label="Đại lý"
            onChange={(event) => setForm((current) => ({ ...current, agencyId: Number(event.target.value) }))}
            options={agencyOptions}
            value={String(form.agencyId)}
          />
          <Textarea
            label="Ghi chú"
            onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
            placeholder="Khách quan tâm, hẹn gọi lại tuần sau"
            value={form.note ?? ''}
          />
          {submitError ? <p className="text-sm text-danger-soft">{submitError}</p> : null}
          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={() => setCreateOpen(false)} type="button" variant="secondary">
              Hủy
            </Button>
            <Button disabled={submitting} type="submit">
              {submitting ? 'Đang lưu...' : editingRecord ? 'Lưu thay đổi' : 'Tạo track'}
            </Button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog
        description={deletingRecord ? `Bạn chắc chắn muốn xóa track record của ${deletingRecord.customerName}?` : ''}
        loading={deleting}
        onClose={() => setDeletingRecord(null)}
        onConfirm={handleDeleteTrackRecord}
        open={Boolean(deletingRecord)}
        title="Xóa track record"
      />
    </main>
  );
}
