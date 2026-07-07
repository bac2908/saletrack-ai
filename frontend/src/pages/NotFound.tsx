import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

export default function NotFound() {
  return (
    <PageContainer title="Page not found">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <p className="mb-4 text-sm text-slate-500">The page you requested does not exist.</p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          to="/"
        >
          Back to dashboard
        </Link>
      </div>
    </PageContainer>
  );
}
