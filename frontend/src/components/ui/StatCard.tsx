import type { ReactNode } from 'react';

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string;
}

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <section className="rounded-lg border border-surface-line bg-surface-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-text-muted">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-text-strong">{value}</p>
        </div>
        {icon ? <div className="text-accent-mint">{icon}</div> : null}
      </div>
    </section>
  );
}
