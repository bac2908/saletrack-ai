import type { ReactNode } from 'react';

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string;
}

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p>
        </div>
        {icon ? <div className="text-teal-600">{icon}</div> : null}
      </div>
    </section>
  );
}
