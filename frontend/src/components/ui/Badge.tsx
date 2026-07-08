import type { ReactNode } from 'react';

type BadgeTone = 'default' | 'success' | 'warning' | 'danger';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const tones: Record<BadgeTone, string> = {
  default: 'border border-surface-line bg-surface-card-high text-text-muted',
  success: 'border border-accent-mint/40 bg-accent-mint/10 text-accent-mint',
  warning: 'border border-accent-amber/40 bg-accent-amber/10 text-accent-amber',
  danger: 'border border-danger-soft/40 bg-danger-soft/10 text-danger-soft',
};

export default function Badge({ children, tone = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex rounded px-2 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
