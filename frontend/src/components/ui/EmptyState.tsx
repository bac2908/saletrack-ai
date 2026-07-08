import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-surface-line bg-surface-card px-6 py-12 text-center">
      <h2 className="text-base font-semibold text-text-strong">{title}</h2>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
