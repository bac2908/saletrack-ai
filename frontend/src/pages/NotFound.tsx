import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

export default function NotFound() {
  return (
    <PageContainer title="Không tìm thấy trang">
      <div className="rounded-lg border border-surface-line bg-surface-card p-6">
        <p className="mb-4 text-sm text-text-muted">Trang bạn yêu cầu không tồn tại.</p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-surface-line bg-surface px-4 text-sm font-medium text-text-strong transition hover:border-accent-mint"
          to="/"
        >
          Quay lại Dashboard
        </Link>
      </div>
    </PageContainer>
  );
}
