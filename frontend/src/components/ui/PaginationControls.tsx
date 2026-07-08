import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationMeta } from '../../types/api';

interface PaginationControlsProps {
  onPageChange: (page: number) => void;
  pagination: PaginationMeta;
}

function visiblePages(currentPage: number, totalPages: number) {
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, start + 2);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export default function PaginationControls({ onPageChange, pagination }: PaginationControlsProps) {
  const pages = visiblePages(pagination.page, pagination.totalPages);

  return (
    <div className="flex flex-col gap-4 bg-surface-low px-6 py-5 font-mono text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
      <span>
        Trang {pagination.page}/{pagination.totalPages} - {pagination.total} bản ghi
      </span>
      <div className="flex items-center gap-2">
        <button
          className="flex h-10 w-10 items-center justify-center rounded border border-surface-line disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!pagination.hasPreviousPage}
          onClick={() => onPageChange(pagination.page - 1)}
          type="button"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {pagination.page > 2 ? <span className="px-2">...</span> : null}
        {pages.map((page) => (
          <button
            className={`h-10 w-10 rounded border ${
              page === pagination.page
                ? 'border-accent-mint bg-accent-mint/10 text-accent-mint'
                : 'border-surface-line text-text-muted'
            }`}
            key={page}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        ))}
        {pagination.page < pagination.totalPages - 1 ? <span className="px-2">...</span> : null}
        <button
          className="flex h-10 w-10 items-center justify-center rounded border border-surface-line disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(pagination.page + 1)}
          type="button"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
