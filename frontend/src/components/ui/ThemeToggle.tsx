import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  showLabel?: boolean;
}

export default function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? 'Giao diện sáng' : 'Giao diện tối';

  return (
    <button
      aria-label={label}
      className={
        showLabel
          ? 'flex w-full items-center gap-5 px-8 py-4 font-mono text-sm uppercase tracking-[0.14em] text-text-muted transition hover:bg-surface-card hover:text-text-strong'
          : 'relative inline-flex h-11 w-11 items-center justify-center rounded border border-surface-line bg-surface-card text-text-muted transition hover:border-accent-mint hover:text-accent-mint'
      }
      onClick={toggleTheme}
      title={label}
      type="button"
    >
      <Icon className="h-5 w-5" />
      {showLabel ? label : null}
    </button>
  );
}
