import type { ReactNode } from 'react';

type BadgeTone = 'default' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
};

export default function Badge({ children, tone = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex rounded px-2 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
