import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'border border-accent-mint bg-accent-mint text-background hover:bg-accent-mint/90',
  secondary: 'border border-surface-line bg-surface text-text-strong hover:border-accent-mint',
  ghost: 'text-text-muted hover:bg-surface-card-high hover:text-text-strong',
  danger: 'border border-danger-soft bg-danger-soft text-background hover:bg-danger-soft/90',
};

export default function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
