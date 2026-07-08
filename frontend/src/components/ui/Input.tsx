import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ className = '', error, label, ...props }: InputProps) {
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-sm font-medium text-text-muted">{label}</span> : null}
      <input
        className={`h-10 w-full rounded-md border border-surface-line bg-background px-3 text-sm text-text-strong outline-none placeholder:text-text-muted focus:border-accent-mint ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-danger-soft">{error}</span> : null}
    </label>
  );
}
